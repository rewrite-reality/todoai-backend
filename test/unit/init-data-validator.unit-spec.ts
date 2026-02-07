import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
} from '../../src/modules/auth/interfaces/jwt-payload.interface';
import type { InitDataUser } from '../../src/modules/auth/interfaces/init-data.interface';
import { InitDataValidationService } from '../../src/modules/auth/services/init-data-validation.service';
import {
  generateTamperedInitData,
  generateValidInitData,
} from '../helpers/generate-valid-init-data';

function createService(botToken: string): InitDataValidationService {
  const configValues: Record<string, string | number> = {
    botToken,
    initDataMaxAgeSeconds: 300,
    BOT_TOKEN: botToken,
    TELEGRAM_BOT_TOKEN: botToken,
    INIT_DATA_MAX_AGE_SECONDS: 300,
  };

  const configService = {
    get: jest.fn((key: string) => configValues[key]),
  } as unknown as ConfigService;

  return new InitDataValidationService(configService);
}

function expectAuthHttpException(
  execute: () => void,
  expectedStatus: number,
  expectedCode: string,
): void {
  try {
    execute();
    throw new Error('Expected HttpException to be thrown');
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(HttpException);

    const httpError = error as HttpException;
    expect(httpError.getStatus()).toBe(expectedStatus);

    const response = httpError.getResponse();
    if (typeof response === 'string') {
      throw new Error('Expected object HttpException response');
    }

    const payload = response as { code?: string; message?: string };
    expect(payload.code).toBe(expectedCode);
  }
}

describe('InitDataValidationService (unit)', () => {
  const botToken = 'test-bot-token';

  it('valid initData passes verification', () => {
    const service = createService(botToken);
    const userData: InitDataUser = {
      id: 123456789,
      username: 'telegram_user',
      first_name: 'Telegram',
      last_name: 'User',
    };
    const initData = generateValidInitData(botToken, userData);

    const result = service.validate(initData);

    expect(result.user.id).toBe(userData.id);
    expect(result.user.username).toBe(userData.username);
    expect(result.hash).toHaveLength(64);
    expect(result.dataCheckString).toContain('auth_date=');
  });

  it('tampered initData fails verification', () => {
    const service = createService(botToken);
    const userData: InitDataUser = {
      id: 123456790,
      username: 'tampered_user',
    };
    const initData = generateTamperedInitData(botToken, userData);

    expectAuthHttpException(
      () => service.validate(initData),
      AUTH_ERROR_REGISTRY.AUTH_INIT_DATA_HASH_MISMATCH.statusCode,
      AUTH_ERROR_CODES.AUTH_INIT_DATA_HASH_MISMATCH,
    );
  });

  it('auth_date older than maxAge -> fails', () => {
    const service = createService(botToken);
    const staleAuthDate = Math.floor(Date.now() / 1000) - 301;
    const userData: InitDataUser = {
      id: 123456791,
      username: 'expired_user',
    };
    const initData = generateValidInitData(botToken, userData, {
      authDate: staleAuthDate,
    });

    expectAuthHttpException(
      () => service.validate(initData),
      AUTH_ERROR_REGISTRY.AUTH_INIT_DATA_EXPIRED.statusCode,
      AUTH_ERROR_CODES.AUTH_INIT_DATA_EXPIRED,
    );
  });

  it('parses user JSON from initData correctly', () => {
    const service = createService(botToken);
    const userData: InitDataUser = {
      id: 123456792,
      username: 'full_user',
      first_name: 'First',
      last_name: 'Last',
      photo_url: 'https://example.com/full-user.png',
      language_code: 'en-US',
    };
    const initData = generateValidInitData(botToken, userData);

    const result = service.validate(initData);

    expect(result.user.id).toBe(userData.id);
    expect(result.user.username).toBe(userData.username);
    expect(result.user.first_name).toBe(userData.first_name);
    expect(result.user.last_name).toBe(userData.last_name);
    expect(result.user.photo_url).toBe(userData.photo_url);
    expect(result.user.language_code).toBe(userData.language_code);
  });
});
