import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUES } from '../queue/queues.config';

@Controller('webhook/telegram')
export class TelegramController {
  constructor(
    private configService: ConfigService,
    @InjectQueue(QUEUES.TELEGRAM_UPDATES) private telegramQueue: Queue,
  ) {}

  @Post()
  @HttpCode(200)
  async handleWebhook(
    @Body() update: any,
    @Headers('x-telegram-bot-api-secret-token') secretToken: string,
  ) {
    // 1. Проверка безопасности (чтобы никто левый не слал фейковые апдейты)
    const expectedSecret = this.configService.get<string>(
      'TELEGRAM_WEBHOOK_SECRET',
    );
    if (secretToken !== expectedSecret) {
      throw new UnauthorizedException('Invalid secret token');
    }

    // 2. Отправка в очередь (асинхронно)
    await this.telegramQueue.add('process-update', update, {
      removeOnComplete: true,
      removeOnFail: 100, // храним последние 100 ошибок
    });

    return { ok: true };
  }
}
