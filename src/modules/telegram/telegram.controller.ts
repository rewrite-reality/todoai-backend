import { Body, Controller, Headers, HttpCode, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { TelegramWebhookService } from './telegram-webhook.service';

@Controller('webhook/telegram')
export class TelegramController {
  constructor(
    private readonly telegramWebhookService: TelegramWebhookService,
  ) {}

  @Post()
  @Public()
  @HttpCode(200)
  async handleWebhook(
    @Body() update: unknown,
    @Headers('x-telegram-bot-api-secret-token') secretToken: string | undefined,
    @Req() req: Request,
  ) {
    return this.telegramWebhookService.ingestUpdate(
      update,
      secretToken,
      req.correlationId ?? 'unknown-correlation-id',
    );
  }
}
