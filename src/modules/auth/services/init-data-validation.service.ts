import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';
import {
  InitDataPayload,
  InitDataUser,
} from '../interfaces/init-data.interface';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
} from '../interfaces/jwt-payload.interface';

const HASH_PARAM_NAME = 'hash';
const AUTH_DATE_PARAM_NAME = 'auth_date';
const USER_PARAM_NAME = 'user';
const TELEGRAM_SECRET_SEED = 'WebAppData';
const AUTH_CONFIG_ERROR_CODE = 'AUTH_CONFIG_INVALID';

@Injectable()
export class InitDataValidationService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Validates Telegram WebApp initData and returns normalized payload.
   */
  validate(initDataRaw: string): InitDataPayload {
    if (typeof initDataRaw !== 'string' || initDataRaw.trim().length === 0) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    const params = new URLSearchParams(initDataRaw);
    const hash = params.get(HASH_PARAM_NAME);
    const authDateRaw = params.get(AUTH_DATE_PARAM_NAME);
    const userRaw = params.get(USER_PARAM_NAME);

    if (!hash || !authDateRaw || !userRaw) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    if (!/^[0-9a-f]{64}$/i.test(hash)) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    const authDate = Number(authDateRaw);
    if (!Number.isInteger(authDate) || authDate <= 0) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    const dataCheckString = this.buildDataCheckString(params);
    this.assertHashMatches(dataCheckString, hash);
    this.assertFreshAuthDate(authDate);

    return {
      auth_date: authDate,
      hash,
      query_id: params.get('query_id') ?? undefined,
      start_param: params.get('start_param') ?? undefined,
      chat_type: params.get('chat_type') ?? undefined,
      chat_instance: params.get('chat_instance') ?? undefined,
      user: this.parseUser(userRaw),
      raw: initDataRaw,
      dataCheckString,
    };
  }

  private parseUser(userRaw: string): InitDataUser {
    let parsed: unknown;

    try {
      parsed = JSON.parse(userRaw);
    } catch {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    const user = parsed as Record<string, unknown>;
    const id = user.id;

    if (typeof id !== 'number' || !Number.isSafeInteger(id) || id <= 0) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    return {
      id,
      username: this.optionalString(user.username),
      first_name: this.optionalString(user.first_name),
      last_name: this.optionalString(user.last_name),
      photo_url: this.optionalString(user.photo_url),
      language_code: this.optionalString(user.language_code),
      allows_write_to_pm: this.optionalBoolean(user.allows_write_to_pm),
    };
  }

  private optionalString(value: unknown): string | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'string') {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    return value;
  }

  private optionalBoolean(value: unknown): boolean | undefined {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'boolean') {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INVALID_INIT_DATA);
    }

    return value;
  }

  private buildDataCheckString(params: URLSearchParams): string {
    return [...params.entries()]
      .filter(([key]) => key !== HASH_PARAM_NAME)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
  }

  private assertHashMatches(dataCheckString: string, hash: string): void {
    const botToken = this.getBotToken();

    let secretKeyBuffer: Buffer | undefined;
    let expectedHashBuffer: Buffer | undefined;
    let providedHashBuffer: Buffer | undefined;

    try {
      secretKeyBuffer = createHmac('sha256', TELEGRAM_SECRET_SEED)
        .update(botToken)
        .digest();
      expectedHashBuffer = createHmac('sha256', secretKeyBuffer)
        .update(dataCheckString)
        .digest();
      providedHashBuffer = Buffer.from(hash.toLowerCase(), 'hex');

      const sameLength =
        expectedHashBuffer.length === providedHashBuffer.length;
      const hashesMatch =
        sameLength && timingSafeEqual(expectedHashBuffer, providedHashBuffer);

      if (!hashesMatch) {
        throw this.createAuthException(
          AUTH_ERROR_CODES.AUTH_INIT_DATA_HASH_MISMATCH,
        );
      }
    } finally {
      secretKeyBuffer?.fill(0);
      expectedHashBuffer?.fill(0);
      providedHashBuffer?.fill(0);
    }
  }

  private assertFreshAuthDate(authDate: number): void {
    const maxAgeSeconds = this.getInitDataMaxAgeSeconds();
    const nowSeconds = Math.floor(Date.now() / 1000);

    if (nowSeconds - authDate > maxAgeSeconds) {
      throw this.createAuthException(AUTH_ERROR_CODES.AUTH_INIT_DATA_EXPIRED);
    }
  }

  private createAuthException(code: keyof typeof AUTH_ERROR_REGISTRY) {
    const error = AUTH_ERROR_REGISTRY[code];
    return new HttpException(
      {
        code,
        message: error.message,
      },
      error.statusCode,
    );
  }

  private getBotToken(): string {
    const botToken = this.configService.get<string>('botToken');

    if (!botToken || botToken.trim().length === 0) {
      throw this.createConfigException(
        'Authentication configuration is invalid: botToken is missing',
      );
    }

    return botToken;
  }

  private getInitDataMaxAgeSeconds(): number {
    const maxAgeSeconds = this.configService.get<number>(
      'initDataMaxAgeSeconds',
    );

    if (
      typeof maxAgeSeconds !== 'number' ||
      !Number.isInteger(maxAgeSeconds) ||
      maxAgeSeconds <= 0
    ) {
      throw this.createConfigException(
        'Authentication configuration is invalid: initDataMaxAgeSeconds must be a positive integer',
      );
    }

    return maxAgeSeconds;
  }

  private createConfigException(message: string): InternalServerErrorException {
    return new InternalServerErrorException({
      code: AUTH_CONFIG_ERROR_CODE,
      message,
    });
  }
}
