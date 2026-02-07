import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard';
import { JwtTokenService } from '../../src/modules/auth/services/jwt-token.service';
import {
  AUTH_ERROR_CODES,
  JwtPayload,
} from '../../src/modules/auth/interfaces/jwt-payload.interface';

describe('JwtAuthGuard', () => {
  const verifyAccessTokenMock = jest.fn();
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;

  const jwtTokenService = {
    verifyAccessToken: verifyAccessTokenMock,
  } as unknown as JwtTokenService;

  const guard = new JwtAuthGuard(reflector, jwtTokenService);

  beforeEach(() => {
    jest.clearAllMocks();
    reflector.getAllAndOverride = jest.fn().mockReturnValue(false);
  });

  it('allows routes decorated with @Public metadata', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

    const context = createHttpContext({
      method: 'GET',
      path: '/private',
      headers: {},
    });

    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(verifyAccessTokenMock).not.toHaveBeenCalled();
  });

  it('allows safety-fallback public routes', () => {
    const context = createHttpContext({
      method: 'GET',
      path: '/health',
      headers: {},
    });

    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(verifyAccessTokenMock).not.toHaveBeenCalled();
  });

  it('verifies bearer token and attaches request.user', () => {
    const decodedPayload: JwtPayload = {
      sub: '123456789',
      uid: 'user-id',
      username: 'mini_user',
    };

    verifyAccessTokenMock.mockReturnValue(decodedPayload);

    const request = {
      method: 'GET',
      path: '/users',
      headers: { authorization: 'Bearer valid.jwt.token' },
    } as {
      method: string;
      path: string;
      headers: { authorization: string };
      user?: JwtPayload;
    };
    const context = createHttpContext(request);

    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(verifyAccessTokenMock).toHaveBeenCalledWith('valid.jwt.token');
    expect(request.user).toEqual(decodedPayload);
  });

  it('throws AUTH_UNAUTHORIZED when Authorization header is missing', () => {
    const context = createHttpContext({
      method: 'GET',
      path: '/users',
      headers: {},
    });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);

    try {
      guard.canActivate(context);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
      const unauthorized = error as UnauthorizedException;
      expect(unauthorized.getResponse()).toMatchObject({
        code: AUTH_ERROR_CODES.AUTH_UNAUTHORIZED,
      });
    }
  });
});

function createHttpContext(request: Record<string, unknown>): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => ({}),
      getNext: () => undefined,
    }),
    getHandler: () => ({}),
    getClass: () => class TestController {},
  } as unknown as ExecutionContext;
}
