import { INestApplication } from '@nestjs/common';
import { PinoLoggerService } from './common/logger/pino-logger.service';

export function configureApp(app: INestApplication): void {
  app.useLogger(app.get(PinoLoggerService));
  app.enableShutdownHooks();
}
