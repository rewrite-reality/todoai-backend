import { verify } from 'jsonwebtoken';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtPayload } from '../../src/modules/auth/interfaces/jwt-payload.interface';
import { createTestApp, TestApplication } from '../helpers/app';
import {
  generateTamperedInitData,
  generateValidInitData,
} from '../helpers/generate-valid-init-data';

interface ErrorResponseBody {
  error: {
    code: string;
  };
}

interface AuthTelegramSuccessBody {
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

describe('POST /auth/telegram (integration)', () => {
  let testApp: TestApplication;
  let prisma: PrismaService;

  const botToken =
    process.env.BOT_TOKEN ?? (process.env.TELEGRAM_BOT_TOKEN as string);
  const jwtSecret = process.env.JWT_SECRET as string;

  beforeAll(async () => {
    testApp = await createTestApp();
    prisma = testApp.app.get(PrismaService);
  });

  afterAll(async () => {
    if (testApp) {
      await testApp.close();
    }
  }, 10000);

  it('returns access token and upserts user for valid initData', async () => {
    const telegramId = Number(`77${Date.now().toString().slice(-8)}`);
    const correlationId = 'auth-integration-correlation-id';
    const initData = generateValidInitData(botToken, {
      id: telegramId,
      username: `mini_user_${telegramId}`,
      first_name: 'Mini',
      last_name: 'User',
      photo_url: 'https://example.com/avatar.png',
      language_code: 'EN-US',
    });

    const response = await testApp.request
      .post('/auth/telegram')
      .set('x-correlation-id', correlationId)
      .send({ initData });
    const body = response.body as AuthTelegramSuccessBody;

    expect(response.status).toBe(200);
    expect(response.headers['x-correlation-id']).toBe(correlationId);
    expect(body.tokenType).toBe('Bearer');
    expect(body.accessToken).toEqual(expect.any(String));
    expect(body.user).toMatchObject({
      telegramId: String(telegramId),
      telegramName: `mini_user_${telegramId}`,
      telegramPhoto: 'https://example.com/avatar.png',
      locale: 'en-us',
    });

    const decoded = verify(body.accessToken, jwtSecret, {
      algorithms: ['HS256'],
    }) as JwtPayload;
    expect(decoded.sub).toBe(String(telegramId));
    expect(decoded.uid).toBe(body.user.id);

    const storedUser = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });
    expect(storedUser).toBeTruthy();
    expect(storedUser?.telegramPhoto).toBe('https://example.com/avatar.png');
    expect(storedUser?.locale).toBe('en-us');
  });

  it('returns AUTH_INIT_DATA_HASH_MISMATCH for tampered initData', async () => {
    const telegramId = Number(`88${Date.now().toString().slice(-8)}`);
    const initData = generateTamperedInitData(botToken, {
      id: telegramId,
      username: `tampered_${telegramId}`,
    });

    const response = await testApp.request
      .post('/auth/telegram')
      .send({ initData });
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(401);
    expect(body.error.code).toBe('AUTH_INIT_DATA_HASH_MISMATCH');
  });

  it('returns AUTH_INVALID_INIT_DATA for malformed request body', async () => {
    const response = await testApp.request.post('/auth/telegram').send({});
    const body = response.body as ErrorResponseBody;

    expect(response.status).toBe(400);
    expect(body.error.code).toBe('AUTH_INVALID_INIT_DATA');
  });
});
