import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PinoLoggerService } from '../../common/logger/pino-logger.service';
import { UserService } from '../user/user.service';
import {
  TelegramAuthResponseDto,
  TelegramAuthUserDto,
} from './dto/telegram-auth-response.dto';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
} from './interfaces/jwt-payload.interface';
import { InitDataValidationService } from './services/init-data-validation.service';
import { JwtTokenService } from './services/jwt-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly initDataValidationService: InitDataValidationService,
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly logger: PinoLoggerService,
  ) {}

  /**
   * Authenticates a Telegram Mini App user and returns JWT credentials.
   */
  async authenticateWithTelegramInitData(
    initDataRaw: string,
    correlationId: string,
  ): Promise<TelegramAuthResponseDto> {
    const payload = this.initDataValidationService.validate(initDataRaw);

    let user: User;
    try {
      user = await this.userService.upsertTelegramUser({
        telegramId: payload.user.id,
        username: payload.user.username,
        firstName: payload.user.first_name,
        lastName: payload.user.last_name,
        photoUrl: payload.user.photo_url,
        languageCode: payload.user.language_code,
      });
    } catch (error) {
      this.logger.error({
        msg: 'Failed to upsert Telegram user during authentication',
        correlationId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw new HttpException(
        {
          code: AUTH_ERROR_CODES.AUTH_USER_CREATE_FAILED,
          message: AUTH_ERROR_REGISTRY.AUTH_USER_CREATE_FAILED.message,
        },
        AUTH_ERROR_REGISTRY.AUTH_USER_CREATE_FAILED.statusCode,
      );
    }

    const accessToken = this.jwtTokenService.signAccessToken({
      sub: user.telegramId.toString(),
      uid: user.id,
      username: payload.user.username,
    });

    this.logger.log({
      msg: 'Telegram authentication succeeded',
      correlationId,
      userId: user.id,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: this.jwtTokenService.getAccessTokenExpiresIn(),
      user: this.mapUser(user),
    };
  }

  private mapUser(user: User): TelegramAuthUserDto {
    return {
      id: user.id,
      telegramId: user.telegramId.toString(),
      telegramName: user.telegramName,
      telegramPhoto: user.telegramPhoto,
      locale: user.locale,
    };
  }
}
