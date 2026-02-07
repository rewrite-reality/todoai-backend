import { sign, verify } from 'jsonwebtoken';
import type { Response } from 'supertest';
import type { JwtPayload as AuthJwtPayload } from '../../src/modules/auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createTestUser } from '../factories/user.factory';
import { closePrisma } from '../factories/prisma';
import { createTestApp, type TestApplication } from '../helpers/app';
import {
  generateTamperedInitData,
  generateValidInitData,
} from '../helpers/generate-valid-init-data';

interface AuthSuccessResponseBody {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: {
    id: string;
    telegramId: string;
    telegramName: string | null;
    telegramPhoto: string | null;
    locale: string;
  };
}

interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

function createUniqueTelegramId(prefix: string): number {
  return Number(`${prefix}${Date.now().toString().slice(-8)}`);
}

function expectCorrelationIdHeader(response: Response): void {
  expect(response.headers['x-correlation-id']).toEqual(expect.any(String));
}

describe('POST /auth/telegram (e2e)', () => {
  let testApp: TestApplication;
  let prisma: PrismaService;

  const botToken =
    process.env.BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKEN ?? '';
  const jwtSecret = process.env.JWT_SECRET ?? '';

  beforeAll(async () => {
    if (!botToken) {
      throw new Error('BOT_TOKEN or TELEGRAM_BOT_TOKEN is required for tests');
    }
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is required for tests');
    }

    testApp = await createTestApp();
    prisma = testApp.app.get(PrismaService);
  });

  afterAll(async () => {
    if (testApp) {
      await testApp.close();
    }
    await closePrisma();
  }, 15000);

  it('valid initData -> 200 + JWT + user object', async () => {
    const telegramId = createUniqueTelegramId('71');
    const initData = generateValidInitData(botToken, {
      id: telegramId,
      username: `auth_user_${telegramId}`,
      first_name: 'Auth',
      last_name: 'User',
      photo_url: 'https://example.com/avatar-auth.png',
      language_code: 'en',
    });

    const response = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const body = response.body as AuthSuccessResponseBody;

    expect(response.status).toBe(200);
    expectCorrelationIdHeader(response);
    expect(body.accessToken).toEqual(expect.any(String));
    expect(body.tokenType).toBe('Bearer');
    expect(body.expiresIn).toEqual(expect.any(String));
    expect(body.user.id).toEqual(expect.any(String));
    expect(body.user.telegramId).toEqual(expect.any(String));
    expect(body.user.telegramName).toEqual(expect.any(String));

    const decoded = verify(body.accessToken, jwtSecret, {
      algorithms: ['HS256'],
    });
    expect(typeof decoded).toBe('object');
    if (typeof decoded === 'string') {
      throw new Error('Expected JWT payload object');
    }

    const payload = decoded as AuthJwtPayload;
    expect(payload.sub).toBe(String(telegramId));
    expect(payload.uid).toBe(body.user.id);
  });

  it('valid initData for new user -> user created in DB', async () => {
    const telegramId = createUniqueTelegramId('72');
    const photoUrl = `https://example.com/new-${telegramId}.png`;
    const initData = generateValidInitData(botToken, {
      id: telegramId,
      username: `new_user_${telegramId}`,
      first_name: 'New',
      last_name: 'User',
      photo_url: photoUrl,
      language_code: 'RU',
    });

    const response = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const body = response.body as AuthSuccessResponseBody;

    expect(response.status).toBe(200);
    expectCorrelationIdHeader(response);
    expect(body.user.telegramId).toBe(String(telegramId));

    const storedUser = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });

    expect(storedUser).toBeTruthy();
    expect(storedUser?.telegramPhoto).toBe(photoUrl);
    expect(storedUser?.locale).toBe('ru');
  });

  it('valid initData for existing user -> user updated (firstName, username)', async () => {
    const telegramId = createUniqueTelegramId('73');
    const existingUser = await createTestUser({
      telegramId: BigInt(telegramId),
      telegramName: 'OldName',
      telegramPhoto: 'https://example.com/old-avatar.png',
    });

    const newPhotoUrl = `https://example.com/new-avatar-${telegramId}.png`;
    const initData = generateValidInitData(botToken, {
      id: telegramId,
      username: `new_name_${telegramId}`,
      first_name: 'NewFirst',
      photo_url: newPhotoUrl,
      language_code: 'EN',
    });

    const response = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const body = response.body as AuthSuccessResponseBody;

    expect(response.status).toBe(200);
    expectCorrelationIdHeader(response);
    expect(body.user.telegramName).toBe(`new_name_${telegramId}`);

    const storedUser = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });

    expect(storedUser).toBeTruthy();
    expect(storedUser?.id).toBe(existingUser.id);
    expect(storedUser?.telegramName).toBe(`new_name_${telegramId}`);
    expect(storedUser?.telegramPhoto).toBe(newPhotoUrl);
  });

  it('invalid hash -> 401 AUTH_INIT_DATA_HASH_MISMATCH', async () => {
    const telegramId = createUniqueTelegramId('74');
    const initData = generateTamperedInitData(botToken, {
      id: telegramId,
      username: `tampered_${telegramId}`,
    });

    const response = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(401);
    expectCorrelationIdHeader(response);
    expect(body.error.code).toBe('AUTH_INIT_DATA_HASH_MISMATCH');
    expect(body.error.message).toEqual(expect.any(String));
  });

  it('expired auth_date -> 401 AUTH_INIT_DATA_EXPIRED', async () => {
    const telegramId = createUniqueTelegramId('75');
    const staleAuthDate = Math.floor(Date.now() / 1000) - 301;
    const initData = generateValidInitData(
      botToken,
      {
        id: telegramId,
        username: `expired_${telegramId}`,
      },
      { authDate: staleAuthDate },
    );

    const response = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(401);
    expectCorrelationIdHeader(response);
    expect(body.error.code).toBe('AUTH_INIT_DATA_EXPIRED');
  });

  it('missing initData -> 400 AUTH_INVALID_INIT_DATA', async () => {
    const response = await testApp.request.post('/auth/telegram').send({});
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(400);
    expectCorrelationIdHeader(response);
    expect(body.error.code).toBe('AUTH_INVALID_INIT_DATA');
  });

  it('malformed initData (not URLSearchParams) -> 400', async () => {
    const response = await testApp.request.post('/auth/telegram').send({
      initData: 'not-a-valid-query-string-%%%garbage',
    });
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(400);
    expectCorrelationIdHeader(response);
    expect(body.error.code).toBe('AUTH_INVALID_INIT_DATA');
  });

  it('JWT from response works for a guarded endpoint -> not 401', async () => {
    const telegramId = createUniqueTelegramId('76');
    const initData = generateValidInitData(botToken, {
      id: telegramId,
      username: `guarded_${telegramId}`,
    });

    const authResponse = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const authBody = authResponse.body as AuthSuccessResponseBody;

    expect(authResponse.status).toBe(200);
    expectCorrelationIdHeader(authResponse);

    const guardedResponse = await testApp.request
      .get('/')
      .set('Authorization', `Bearer ${authBody.accessToken}`);

    expect(guardedResponse.status).not.toBe(401);
    expectCorrelationIdHeader(guardedResponse);
  });

  it('expired JWT -> 401 AUTH_UNAUTHORIZED', async () => {
    const expiredJwt = sign(
      { sub: '123', uid: 'test', username: 'test' },
      jwtSecret,
      {
        algorithm: 'HS256',
        expiresIn: '-1s',
      },
    );

    const response = await testApp.request
      .get('/')
      .set('Authorization', `Bearer ${expiredJwt}`);
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(401);
    expectCorrelationIdHeader(response);
    expect(body.error.code).toBe('AUTH_UNAUTHORIZED');
  });

  it('missing Authorization header -> 401 AUTH_UNAUTHORIZED', async () => {
    const response = await testApp.request.get('/');
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(401);
    expectCorrelationIdHeader(response);
    expect(body.error.code).toBe('AUTH_UNAUTHORIZED');
  });
});
