import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
} from '../../modules/auth/interfaces/jwt-payload.interface';
import { JwtTokenService } from '../../modules/auth/services/jwt-token.service';

const PUBLIC_ROUTE_ALLOWLIST = new Set<string>([
  'GET:/health',
  'POST:/auth/telegram',
  'POST:/webhook/telegram',
]);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  /**
   * Validates bearer token for protected routes and sets request.user.
   */
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (this.isAllowlisted(request)) {
      return true;
    }

    const token = this.extractBearerToken(request);
    if (!token) {
      throw this.createUnauthorizedException();
    }

    request.user = this.jwtTokenService.verifyAccessToken(token);
    return true;
  }

  private isAllowlisted(request: AuthenticatedRequest): boolean {
    const method = request.method.toUpperCase();
    const path = this.normalizePath(request.path ?? request.url ?? '');
    return PUBLIC_ROUTE_ALLOWLIST.has(`${method}:${path}`);
  }

  private normalizePath(rawPath: string): string {
    const pathWithoutQuery = rawPath.split('?')[0] ?? '';
    if (pathWithoutQuery.length <= 1) {
      return pathWithoutQuery || '/';
    }

    return pathWithoutQuery.endsWith('/')
      ? pathWithoutQuery.slice(0, -1)
      : pathWithoutQuery;
  }

  private extractBearerToken(
    request: AuthenticatedRequest,
  ): string | undefined {
    const authorizationHeader = request.headers.authorization as
      | string
      | string[]
      | undefined;
    const rawHeader = Array.isArray(authorizationHeader)
      ? authorizationHeader[0]
      : authorizationHeader;

    if (typeof rawHeader !== 'string') {
      return undefined;
    }

    const [scheme, token, ...rest] = rawHeader.trim().split(/\s+/);
    if (
      !scheme ||
      !token ||
      rest.length > 0 ||
      scheme.toLowerCase() !== 'bearer'
    ) {
      return undefined;
    }

    return token;
  }

  private createUnauthorizedException(): UnauthorizedException {
    return new UnauthorizedException({
      code: AUTH_ERROR_CODES.AUTH_UNAUTHORIZED,
      message: AUTH_ERROR_REGISTRY.AUTH_UNAUTHORIZED.message,
    });
  }
}
