import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { QueueModule } from '../queue/queue.module';

@Module({
	imports: [QueueModule], // Импортируем, чтобы работали очереди
	controllers: [TelegramController],
	providers: [TelegramService],
	exports: [TelegramService],
})
export class TelegramModule { }
