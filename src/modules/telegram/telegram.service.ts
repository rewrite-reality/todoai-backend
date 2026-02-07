import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface TelegramApiResponse {
  ok: boolean;
  description?: string;
}

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken: string;
  private readonly webhookUrl: string;
  private readonly webhookSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.botToken = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    this.webhookUrl = this.configService.get<string>(
      'TELEGRAM_WEBHOOK_URL',
      '',
    );
    this.webhookSecret = this.configService.getOrThrow<string>(
      'TELEGRAM_WEBHOOK_SECRET',
    );
  }

  async onModuleInit() {
    if (this.webhookUrl && process.env.NODE_ENV !== 'test') {
      await this.setWebhook();
    }
  }

  async setWebhook() {
    const webhookEndpoint = new URL(
      `https://api.telegram.org/bot${this.botToken}/setWebhook`,
    );
    webhookEndpoint.search = new URLSearchParams({
      url: this.webhookUrl,
      secret_token: this.webhookSecret,
    }).toString();

    try {
      const response = await fetch(webhookEndpoint);
      const data: unknown = await response.json();

      if (this.isTelegramApiResponse(data) && data.ok) {
        this.logger.log(`Webhook set successfully to ${this.webhookUrl}`);
        return;
      }

      const description = this.getApiErrorDescription(data);
      this.logger.error(`Failed to set webhook: ${description}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error setting webhook: ${message}`);
    }
  }

  async sendMessage(chatId: number, text: string) {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      if (!response.ok) {
        const body = await response.text();
        this.logger.error(
          `Telegram sendMessage failed for ${chatId}: ${response.status} ${body}`,
        );
        throw new Error('TELEGRAM_SEND_MESSAGE_FAILED');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send message to ${chatId}: ${message}`);
      throw new Error('TELEGRAM_SEND_MESSAGE_FAILED');
    }
  }

  private isTelegramApiResponse(value: unknown): value is TelegramApiResponse {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const maybeResponse = value as Partial<TelegramApiResponse>;
    return typeof maybeResponse.ok === 'boolean';
  }

  private getApiErrorDescription(value: unknown): string {
    if (
      value &&
      typeof value === 'object' &&
      'description' in value &&
      typeof value.description === 'string'
    ) {
      return value.description;
    }

    return 'Unknown Telegram API response';
  }
}
