import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, UnrecoverableError } from 'bullmq';
import { RequestContextService } from '../../../../common/context/request-context.service';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import {
  NotificationJobData,
  NotificationJobSchema,
} from '../../contracts/notification.job';
import {
  StartNotificationCommandJobData,
  StartNotificationCommandJobSchema,
} from '../../contracts/start-notification-command.job';
import { QUEUES } from '../../queues.config';

@Injectable()
@Processor(QUEUES.NOTIFICATIONS)
export class NotificationProcessor extends WorkerHost {
  private readonly botToken: string;

  constructor(
    private readonly logger: PinoLoggerService,
    private readonly requestContext: RequestContextService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') ?? '';
  }

  async process(job: Job<Record<string, unknown>>): Promise<void> {
    const correlationId = this.extractCorrelationId(job.data);

    await this.requestContext.run({ correlationId }, async () => {
      const resolvedPayload = this.resolvePayload(job.data);
      if (!resolvedPayload) {
        this.logger.warn({
          msg: 'Notification job payload is invalid',
          queue: QUEUES.NOTIFICATIONS,
          jobId: job.id,
          payload: job.data,
        });
        throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
      }

      this.logger.log({
        msg: 'Notification job received',
        queue: QUEUES.NOTIFICATIONS,
        jobId: job.id,
        chatId: resolvedPayload.chatId,
      });

      await this.sendNotification(resolvedPayload);
    });
  }

  private resolvePayload(
    payload: Record<string, unknown>,
  ): NotificationJobData | null {
    const regularNotification = NotificationJobSchema.safeParse(payload);
    if (regularNotification.success) {
      return regularNotification.data;
    }

    const startNotification =
      StartNotificationCommandJobSchema.safeParse(payload);
    if (startNotification.success) {
      return this.mapStartCommandPayload(startNotification.data);
    }

    return null;
  }

  private mapStartCommandPayload(
    payload: StartNotificationCommandJobData,
  ): NotificationJobData {
    return {
      chatId: payload.telegramChatId,
      correlationId: payload.correlationId,
      parseMode: 'HTML',
      text: '👋 Привет! Отправь текст задачи, и я разобью его на план действий.',
    };
  }

  private async sendNotification(payload: NotificationJobData): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      this.logger.log({
        msg: 'Notification sending skipped in test environment',
        chatId: payload.chatId,
      });
      return;
    }

    if (!this.botToken) {
      throw new Error(
        'QUEUE_NOTIFICATION_SEND_FAILED: missing Telegram bot token',
      );
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: payload.chatId,
        text: payload.text,
        parse_mode: payload.parseMode,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `QUEUE_NOTIFICATION_SEND_FAILED: telegram response ${response.status} ${body}`,
      );
    }
  }

  private extractCorrelationId(payload: Record<string, unknown>): string {
    const maybeCorrelationId = payload.correlationId;
    return typeof maybeCorrelationId === 'string' &&
      maybeCorrelationId.length > 0
      ? maybeCorrelationId
      : 'unknown-correlation-id';
  }
}
