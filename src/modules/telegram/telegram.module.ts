import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { UserModule } from '../user/user.module';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { TelegramWebhookService } from './telegram-webhook.service';
import { TelegramQueueProducerService } from './telegram-queue-producer.service';

@Module({
  imports: [QueueModule, UserModule],
  controllers: [TelegramController],
  providers: [TelegramService, TelegramWebhookService, TelegramQueueProducerService],
  exports: [TelegramService],
})
export class TelegramModule {}
