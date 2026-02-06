import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request, { SuperTest, Test as SuperTestRequest } from 'supertest';
import { AppModule } from '../../src/app.module';
import { configureApp } from '../../src/app.bootstrap';

export interface TestApplication {
  app: INestApplication;
  request: SuperTest<SuperTestRequest>;
  close: () => Promise<void>;
}

export async function createTestApp(): Promise<TestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  await configureApp(app);
  await app.init();

  return {
    app,
    request: request(app.getHttpServer()),
    close: () => app.close(),
  };
}
