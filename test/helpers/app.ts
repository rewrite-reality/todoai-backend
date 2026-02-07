import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PinoLoggerService } from '../../src/common/logger/pino-logger.service';
import { QueueModule } from '../../src/modules/queue/queue.module';

type TestHttpClient = ReturnType<typeof request>;

export interface TestApplication {
  app: INestApplication;
  request: TestHttpClient;
  close: () => Promise<void>;
}

export async function createTestApp(): Promise<TestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useLogger(app.get(PinoLoggerService));
  await app.init();
  const httpServer = app.getHttpServer() as Parameters<typeof request>[0];

  return {
    app,
    request: request(httpServer),
    close: async () => {
      try {
        const queueModule = app.get<QueueModule>(QueueModule, {
          strict: false,
        });
        if (queueModule) {
          await queueModule.onModuleDestroy();
        }
      } catch {
        // QueueModule may be absent in some test contexts.
      }
      await app.close();
    },
  };
}
