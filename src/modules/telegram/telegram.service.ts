import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken: string;
  private readonly webhookUrl: string;
  private readonly webhookSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.botToken = this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN');
    this.webhookUrl = this.configService.get<string>('TELEGRAM_WEBHOOK_URL', '');
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
    const url = `https://api.telegram.org/bot${this.botToken}/setWebhook?url=${this.webhookUrl}&secret_token=${this.webhookSecret}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.ok) {
        this.logger.log(`Webhook set successfully to ${this.webhookUrl}`);
        return;
      }

      this.logger.error(`Failed to set webhook: ${data.description}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error setting webhook: ${message}`);
    }
  }

  async sendMessage(chatId: number, text: string) {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send message to ${chatId}: ${message}`);
    }
  }
}
