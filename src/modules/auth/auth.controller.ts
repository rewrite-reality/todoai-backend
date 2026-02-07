import {
  Body,
  Controller,
  HttpException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { PinoLoggerService } from '../../common/logger/pino-logger.service';
import {
  AUTH_ERROR_CODES,
  AUTH_ERROR_REGISTRY,
} from './interfaces/jwt-payload.interface';
import { TelegramAuthRequestDto } from './dto/telegram-auth-request.dto';
import { TelegramAuthResponseDto } from './dto/telegram-auth-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: PinoLoggerService,
  ) {}

  /**
   * Exchanges Telegram WebApp initData for an access token.
   */
  @Post('telegram')
  @Public()
  @HttpCode(HttpStatus.OK)
  async authenticateTelegram(
    @Body() body: TelegramAuthRequestDto,
    @Req() request: Request,
  ): Promise<TelegramAuthResponseDto> {
    const correlationId = request.correlationId ?? 'unknown-correlation-id';

    this.logger.log({
      msg: 'Telegram auth request received',
      correlationId,
    });

    try {
      return await this.authService.authenticateWithTelegramInitData(
        body.initData,
        correlationId,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        const response = error.getResponse();
        const payload =
          typeof response === 'string'
            ? { code: 'HTTP_ERROR', message: response }
            : (response as { code?: string; message?: string });

        this.logger.warn({
          msg: 'Telegram authentication failed',
          correlationId,
          code: payload.code ?? 'HTTP_ERROR',
          reason: payload.message ?? error.message,
        });
        throw error;
      }

      this.logger.error({
        msg: 'Unexpected error while authenticating Telegram initData',
        correlationId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw new InternalServerErrorException({
        code: AUTH_ERROR_CODES.AUTH_USER_CREATE_FAILED,
        message: AUTH_ERROR_REGISTRY.AUTH_USER_CREATE_FAILED.message,
      });
    }
  }
}
