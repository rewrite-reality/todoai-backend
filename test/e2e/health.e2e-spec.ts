import { createTestApp, TestApplication } from '../helpers/app';
import { PrismaService } from '../../src/prisma/prisma.service';
import { RedisService } from '../../src/common/redis/redis.service';

interface HealthErrorBody {
  error: {
    code: string;
    details: {
      database: 'up' | 'down';
      redis: 'up' | 'down';
    };
  };
}

describe('Health endpoint (e2e)', () => {
  let testApp: TestApplication;
  let prisma: PrismaService;
  let redis: RedisService;

  beforeAll(async () => {
    testApp = await createTestApp();
    prisma = testApp.app.get(PrismaService);
    redis = testApp.app.get(RedisService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await testApp.close();
  });

  it('returns 200 when all services are up', async () => {
    const res = await testApp.request.get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'ok',
      version: '0.1.0',
      services: { database: 'up', redis: 'up' },
    });
  });

  it('returns 503 when database is down', async () => {
    jest.spyOn(prisma, '$queryRaw').mockRejectedValueOnce(new Error('db down'));

    const res = await testApp.request.get('/health');
    const body = res.body as HealthErrorBody;

    expect(res.status).toBe(503);
    expect(body.error.code).toBe('HEALTH_DEGRADED');
    expect(body.error.details).toMatchObject({
      database: 'down',
      redis: 'up',
    });
  });

  it('returns 503 when redis is down', async () => {
    jest.spyOn(redis, 'ping').mockRejectedValueOnce(new Error('redis down'));

    const res = await testApp.request.get('/health');
    const body = res.body as HealthErrorBody;

    expect(res.status).toBe(503);
    expect(body.error.code).toBe('HEALTH_DEGRADED');
    expect(body.error.details).toMatchObject({
      database: 'up',
      redis: 'down',
    });
  });

  it('returns x-correlation-id response header', async () => {
    const correlationId = 'sprint0-health-correlation-id';

    const res = await testApp.request
      .get('/health')
      .set('x-correlation-id', correlationId);

    expect(res.status).toBe(200);
    expect(res.headers['x-correlation-id']).toBe(correlationId);
  });
});
