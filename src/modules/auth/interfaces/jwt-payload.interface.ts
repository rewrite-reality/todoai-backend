export interface JwtPayload {
  sub: string;
  uid: string;
  username?: string;
  iat?: number;
  exp?: number;
}

export const AUTH_ERROR_CODES = {
  AUTH_INVALID_INIT_DATA: 'AUTH_INVALID_INIT_DATA',
  AUTH_INIT_DATA_EXPIRED: 'AUTH_INIT_DATA_EXPIRED',
  AUTH_INIT_DATA_HASH_MISMATCH: 'AUTH_INIT_DATA_HASH_MISMATCH',
  AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_USER_CREATE_FAILED: 'AUTH_USER_CREATE_FAILED',
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];

export const AUTH_ERROR_REGISTRY: Record<
  AuthErrorCode,
  { message: string; statusCode: number }
> = {
  AUTH_INVALID_INIT_DATA: {
    message: 'Invalid Telegram initData payload',
    statusCode: 400,
  },
  AUTH_INIT_DATA_EXPIRED: {
    message: 'Telegram initData expired',
    statusCode: 401,
  },
  AUTH_INIT_DATA_HASH_MISMATCH: {
    message: 'Telegram initData hash mismatch',
    statusCode: 401,
  },
  AUTH_UNAUTHORIZED: {
    message: 'Unauthorized',
    statusCode: 401,
  },
  AUTH_USER_NOT_FOUND: {
    message: 'Authenticated user was not found',
    statusCode: 404,
  },
  AUTH_USER_CREATE_FAILED: {
    message: 'Unable to create or update authenticated user',
    statusCode: 500,
  },
};
