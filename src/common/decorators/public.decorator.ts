import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import type { JwtPayload } from '../../modules/auth/interfaces/jwt-payload.interface';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = (): MethodDecorator & ClassDecorator =>
  SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Returns authenticated JWT payload from request context.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload | undefined => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
