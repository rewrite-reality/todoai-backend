import { Global, Module } from '@nestjs/common';
import { ContextModule } from '../context/context.module';
import { MetricsService } from '../metrics/metrics.service';
import { PinoLoggerService } from '../logger/pino-logger.service';

@Global()
@Module({
  imports: [ContextModule],
  providers: [PinoLoggerService, MetricsService],
  exports: [PinoLoggerService, MetricsService],
})
export class ObservabilityModule {}
