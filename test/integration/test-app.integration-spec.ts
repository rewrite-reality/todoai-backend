import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

describe('Test application bootstrap', () => {
  let app: INestApplication;
  let http: ReturnType<typeof request>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    const httpServer = app.getHttpServer() as Parameters<typeof request>[0];
    http = request(httpServer);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  }, 10000);

  it('boots Nest app and responds to HTTP', async () => {
    const res = await http.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});
