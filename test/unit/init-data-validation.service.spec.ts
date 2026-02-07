import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { InitDataValidationService } from '../../src/modules/auth/services/init-data-validation.service';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
} from '../../src/modules/auth/interfaces/jwt-payload.interface';
import {
  generateTamperedInitData,
  generateValidInitData,
} from '../helpers/generate-valid-init-data';

describe('InitDataValidationService', () => {
  const botToken = 'test-bot-token';
  const baseConfigValues: Record<string, unknown> = {
    botToken,
    initDataMaxAgeSeconds: 300,
    BOT_TOKEN: botToken,
    TELEGRAM_BOT_TOKEN: botToken,
    INIT_DATA_MAX_AGE_SECONDS: 300,
  };

  const configService = {
    get: jest.fn((key: string) => baseConfigValues[key]),
  } as unknown as ConfigService;

  const service = new InitDataValidationService(configService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates a cryptographically correct initData payload', () => {
    const initData = generateValidInitData(botToken, {
      id: 123456789,
      username: 'mini_user',
      first_name: 'Mini',
      last_name: 'User',
      language_code: 'en',
    });

    const result = service.validate(initData);

    expect(result.user.id).toBe(123456789);
    expect(result.user.username).toBe('mini_user');
    expect(result.hash).toHaveLength(64);
    expect(result.dataCheckString).toContain('auth_date=');
  });

  it('throws AUTH_INIT_DATA_HASH_MISMATCH on tampered payload', () => {
    const initData = generateTamperedInitData(botToken, {
      id: 123456790,
      username: 'tampered',
    });

    expect(() => service.validate(initData)).toThrow(HttpException);

    try {
      service.validate(initData);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      const httpError = error as HttpException;
      expect(httpError.getStatus()).toBe(
        AUTH_ERROR_REGISTRY.AUTH_INIT_DATA_HASH_MISMATCH.statusCode,
      );
      expect(httpError.getResponse()).toMatchObject({
        code: AUTH_ERROR_CODES.AUTH_INIT_DATA_HASH_MISMATCH,
      });
    }
  });

  it('throws AUTH_INIT_DATA_EXPIRED when auth_date is stale', () => {
    const staleAuthDate = Math.floor(Date.now() / 1000) - 301;
    const initData = generateValidInitData(
      botToken,
      {
        id: 123456791,
      },
      {
        authDate: staleAuthDate,
      },
    );

    expect(() => service.validate(initData)).toThrow(HttpException);

    try {
      service.validate(initData);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      const httpError = error as HttpException;
      expect(httpError.getStatus()).toBe(
        AUTH_ERROR_REGISTRY.AUTH_INIT_DATA_EXPIRED.statusCode,
      );
      expect(httpError.getResponse()).toMatchObject({
        code: AUTH_ERROR_CODES.AUTH_INIT_DATA_EXPIRED,
      });
    }
  });

  it('throws AUTH_INVALID_INIT_DATA on malformed initData payload', () => {
    const params = new URLSearchParams();
    params.set('auth_date', String(Math.floor(Date.now() / 1000)));
    params.set('query_id', 'query-id');
    params.set('hash', '0'.repeat(64));

    expect(() => service.validate(params.toString())).toThrow(HttpException);

    try {
      service.validate(params.toString());
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      const httpError = error as HttpException;
      expect(httpError.getStatus()).toBe(
        AUTH_ERROR_REGISTRY.AUTH_INVALID_INIT_DATA.statusCode,
      );
      expect(httpError.getResponse()).toMatchObject({
        code: AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA,
      });
    }
  });
});
