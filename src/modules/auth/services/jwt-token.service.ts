import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  JsonWebTokenError,
  type JwtPayload as JsonWebTokenPayload,
  type SignOptions,
  sign,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
  JwtPayload,
} from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtTokenService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: SignOptions['expiresIn'];
  private static readonly AUTH_CONFIG_ERROR_CODE = 'AUTH_CONFIG_INVALID';

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = this.getJwtSecret();
    this.jwtExpiresIn = this.getJwtExpiresIn();
  }

  /**
   * Signs an access token using HS256.
   */
  signAccessToken(payload: JwtPayload): string {
    return sign(payload, this.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: this.jwtExpiresIn,
    });
  }

  /**
   * Returns configured access token lifetime.
   */
  getAccessTokenExpiresIn(): string {
    return String(this.jwtExpiresIn);
  }

  /**
   * Verifies bearer token and returns decoded JWT payload.
   */
  verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = verify(token, this.jwtSecret, {
        algorithms: ['HS256'],
      });

      if (!decoded || typeof decoded === 'string') {
        throw this.createUnauthorizedException();
      }

      return this.normalizeDecodedPayload(decoded);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError
      ) {
        throw this.createUnauthorizedException();
      }

      throw error;
    }
  }

  private normalizeDecodedPayload(decoded: JsonWebTokenPayload): JwtPayload {
    const { sub, uid, username, iat, exp } = decoded as JsonWebTokenPayload & {
      uid?: unknown;
      username?: unknown;
    };

    if (typeof sub !== 'string' || typeof uid !== 'string') {
      throw this.createUnauthorizedException();
    }

    if (username !== undefined && typeof username !== 'string') {
      throw this.createUnauthorizedException();
    }

    return {
      sub,
      uid,
      username,
      iat: typeof iat === 'number' ? iat : undefined,
      exp: typeof exp === 'number' ? exp : undefined,
    };
  }

  private createUnauthorizedException(): UnauthorizedException {
    return new UnauthorizedException({
      code: AUTH_ERROR_CODES.AUTH_UNAUTHORIZED,
      message: AUTH_ERROR_REGISTRY.AUTH_UNAUTHORIZED.message,
    });
  }

  private getJwtSecret(): string {
    const jwtSecret = this.configService.get<string>('jwtSecret');

    if (!jwtSecret || jwtSecret.trim().length === 0) {
      throw this.createConfigException(
        'Authentication configuration is invalid: jwtSecret is missing',
      );
    }

    return jwtSecret;
  }

  private getJwtExpiresIn(): SignOptions['expiresIn'] {
    const jwtExpiresIn = this.configService.get<string>('jwtExpiresIn');

    if (!jwtExpiresIn || jwtExpiresIn.trim().length === 0) {
      throw this.createConfigException(
        'Authentication configuration is invalid: jwtExpiresIn is missing',
      );
    }

    return jwtExpiresIn as SignOptions['expiresIn'];
  }

  private createConfigException(message: string): InternalServerErrorException {
    return new InternalServerErrorException({
      code: JwtTokenService.AUTH_CONFIG_ERROR_CODE,
      message,
    });
  }
}
