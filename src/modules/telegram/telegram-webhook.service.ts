import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLoggerService } from '../../common/logger/pino-logger.service';
import { UserService } from '../user/user.service';
import { TelegramQueueProducerService } from './telegram-queue-producer.service';
import {
  isTelegramUpdate,
  parseTelegramCommand,
  TelegramMessage,
  TelegramUpdate,
} from './telegram.update';

interface TelegramMessageContext {
  update: TelegramUpdate;
  message: TelegramMessage;
  telegramUserId: number;
  telegramChatId: number;
}

@Injectable()
export class TelegramWebhookService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly queueProducer: TelegramQueueProducerService,
    private readonly logger: PinoLoggerService,
  ) {}

  async ingestUpdate(
    rawUpdate: unknown,
    secretToken: string | undefined,
    correlationId: string,
  ): Promise<{ ok: true }> {
    this.validateSecret(secretToken);
    const update = this.validateAndNormalizeUpdate(rawUpdate);
    const context = this.extractMessageContext(update);

    if (!context) {
      this.logger.warn({
        msg: 'Telegram update ignored: unsupported update shape',
        updateId: update.update_id,
        correlationId,
      });
      return { ok: true };
    }

    await this.userService.upsertTelegramUser({
      telegramId: context.telegramUserId,
      username: context.message.from?.username,
      firstName: context.message.from?.first_name,
      lastName: context.message.from?.last_name,
    });

    if (context.message.text) {
      const command = parseTelegramCommand(context.message.text);

      if (command) {
        await this.queueProducer.enqueueCommand({
          telegramUpdateId: context.update.update_id,
          telegramUserId: context.telegramUserId,
          telegramChatId: context.telegramChatId,
          telegramMessageId: context.message.message_id,
          command,
          rawText: context.message.text,
          correlationId,
        });

        this.logger.log({
          msg: 'Telegram command enqueued',
          command,
          updateId: context.update.update_id,
          correlationId,
        });
        return { ok: true };
      }

      await this.queueProducer.enqueueTaskParsing({
        telegramUpdateId: context.update.update_id,
        telegramUserId: context.telegramUserId,
        telegramChatId: context.telegramChatId,
        telegramMessageId: context.message.message_id,
        text: context.message.text,
        correlationId,
      });

      this.logger.log({
        msg: 'Telegram text update enqueued for task parsing',
        updateId: context.update.update_id,
        correlationId,
      });
      return { ok: true };
    }

    if (context.message.voice?.file_id) {
      await this.queueProducer.enqueueVoiceTranscription({
        telegramUpdateId: context.update.update_id,
        telegramUserId: context.telegramUserId,
        telegramChatId: context.telegramChatId,
        telegramMessageId: context.message.message_id,
        telegramVoiceFileId: context.message.voice.file_id,
        correlationId,
      });

      this.logger.log({
        msg: 'Telegram voice update enqueued for transcription',
        updateId: context.update.update_id,
        correlationId,
      });
      return { ok: true };
    }

    this.logger.warn({
      msg: 'Telegram update ignored: unknown message type',
      updateId: context.update.update_id,
      correlationId,
    });

    return { ok: true };
  }

  private validateSecret(secretToken: string | undefined): void {
    const expectedSecret = this.configService.get<string>(
      'TELEGRAM_WEBHOOK_SECRET',
    );

    if (!expectedSecret || secretToken !== expectedSecret) {
      throw new ForbiddenException({
        code: 'TELEGRAM_INVALID_SECRET',
        message: 'Invalid Telegram webhook secret',
      });
    }
  }

  private validateAndNormalizeUpdate(rawUpdate: unknown): TelegramUpdate {
    if (!isTelegramUpdate(rawUpdate)) {
      throw new HttpException(
        {
          code: 'TELEGRAM_INVALID_PAYLOAD',
          message: 'Malformed Telegram update payload',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!rawUpdate.message) {
      return rawUpdate;
    }

    const message = rawUpdate.message;
    const hasMessageId = typeof message.message_id === 'number';
    const hasFromId = typeof message.from?.id === 'number';
    const hasChatId = typeof message.chat?.id === 'number';

    if (!hasMessageId || !hasFromId || !hasChatId) {
      throw new HttpException(
        {
          code: 'TELEGRAM_INVALID_PAYLOAD',
          message: 'Malformed Telegram message payload',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return rawUpdate;
  }

  private extractMessageContext(
    update: TelegramUpdate,
  ): TelegramMessageContext | undefined {
    const message = update.message;

    if (!message || !message.from || !message.chat) {
      return undefined;
    }

    return {
      update,
      message,
      telegramUserId: message.from.id,
      telegramChatId: message.chat.id,
    };
  }
}
