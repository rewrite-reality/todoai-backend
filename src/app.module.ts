import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { EnvironmentSchema } from './config/validation.schema';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { QueueModule } from './modules/queue/queue.module';
import { HealthModule } from './modules/health/health.module';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { ObservabilityModule } from './common/observability/observability.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { RedisModule } from './common/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: (config) => {
        return EnvironmentSchema.parse(config);
      },
    }),
    ObservabilityModule,
    RedisModule,
    PrismaModule,
    TelegramModule,
    QueueModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
