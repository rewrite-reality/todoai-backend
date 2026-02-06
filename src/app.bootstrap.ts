import { INestApplication } from '@nestjs/common';
import { PinoLoggerService } from './common/logger/pino-logger.service';

export async function configureApp(app: INestApplication) {
  app.useLogger(app.get(PinoLoggerService));
  app.enableShutdownHooks();
}
