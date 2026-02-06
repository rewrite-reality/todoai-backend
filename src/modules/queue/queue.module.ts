import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUES, DEFAULT_JOB_OPTIONS } from './queues.config';
import { TelegramUpdateProcessor } from './processors/telegram-update.processor';

@Global() // Очереди нужны везде, делаем модуль глобальным
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    // Регистрация всех очередей системы
    BullModule.registerQueue(
      { name: QUEUES.TELEGRAM_UPDATES, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      {
        name: QUEUES.VOICE_TRANSCRIPTION,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
      },
      { name: QUEUES.TASK_PARSING, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      { name: QUEUES.NOTIFICATIONS, defaultJobOptions: DEFAULT_JOB_OPTIONS },
    ),
  ],
  providers: [TelegramUpdateProcessor],
  exports: [BullModule], // Экспортируем, чтобы @InjectQueue работал в других модулях
})
export class QueueModule {}
