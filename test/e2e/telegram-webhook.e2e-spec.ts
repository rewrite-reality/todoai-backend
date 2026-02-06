import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../../src/prisma/prisma.service';
import { QUEUES } from '../../src/modules/queue/queues.config';
import { createTestApp, TestApplication } from '../helpers/app';

describe('Telegram webhook (e2e)', () => {
  let testApp: TestApplication;
  let prisma: PrismaService;
  let taskParsingQueue: Queue;
  let voiceQueue: Queue;
  let notificationsQueue: Queue;
  let userConnectionQueue: Queue;
  let inviteAcceptanceQueue: Queue;
  let inviteDeclineQueue: Queue;
  let assigneeRevokeQueue: Queue;
  let assignmentsListQueue: Queue;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET as string;

  beforeAll(async () => {
    testApp = await createTestApp();
    prisma = testApp.app.get(PrismaService);
    taskParsingQueue = testApp.app.get(getQueueToken(QUEUES.TASK_PARSING));
    voiceQueue = testApp.app.get(getQueueToken(QUEUES.VOICE_TRANSCRIPTION));
    notificationsQueue = testApp.app.get(getQueueToken(QUEUES.NOTIFICATIONS));
    userConnectionQueue = testApp.app.get(getQueueToken(QUEUES.USER_CONNECTION));
    inviteAcceptanceQueue = testApp.app.get(
      getQueueToken(QUEUES.INVITE_ACCEPTANCE),
    );
    inviteDeclineQueue = testApp.app.get(getQueueToken(QUEUES.INVITE_DECLINE));
    assigneeRevokeQueue = testApp.app.get(getQueueToken(QUEUES.ASSIGNEE_REVOKE));
    assignmentsListQueue = testApp.app.get(getQueueToken(QUEUES.ASSIGNMENTS_LIST));
  });

  beforeEach(async () => {
    await Promise.all([
      taskParsingQueue.obliterate({ force: true }),
      voiceQueue.obliterate({ force: true }),
      notificationsQueue.obliterate({ force: true }),
      userConnectionQueue.obliterate({ force: true }),
      inviteAcceptanceQueue.obliterate({ force: true }),
      inviteDeclineQueue.obliterate({ force: true }),
      assigneeRevokeQueue.obliterate({ force: true }),
      assignmentsListQueue.obliterate({ force: true }),
    ]);
  });

  afterAll(async () => {
    await testApp.close();
  });

  it('returns 403 TELEGRAM_INVALID_SECRET when header secret is invalid', async () => {
    const res = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', 'invalid-secret')
      .send({ update_id: 1 });

    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('TELEGRAM_INVALID_SECRET');
  });

  it('returns 400 TELEGRAM_INVALID_PAYLOAD for malformed payload', async () => {
    const res = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .send({ not_update: true });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('TELEGRAM_INVALID_PAYLOAD');
  });

  it('enqueues text update into task-parsing, upserts user, and responds under 200ms', async () => {
    const updateId = 5001;
    const telegramUserId = 777001;
    const correlationId = 'telegram-e2e-correlation-id';
    const startedAt = Date.now();

    const res = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .set('x-correlation-id', correlationId)
      .send({
        update_id: updateId,
        message: {
          message_id: 901,
          text: 'Prepare sprint retrospective',
          from: {
            id: telegramUserId,
            username: 'sprint_user',
            first_name: 'Sprint',
          },
          chat: { id: 88001 },
        },
      });
    const elapsedMs = Date.now() - startedAt;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(res.headers['x-correlation-id']).toBe(correlationId);
    expect(elapsedMs).toBeLessThan(200);

    const storedJob = await taskParsingQueue.getJob(`telegram-update-${updateId}`);
    expect(storedJob).toBeDefined();
    expect(storedJob?.data).toMatchObject({
      telegramUpdateId: updateId,
      correlationId,
      text: 'Prepare sprint retrospective',
    });

    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramUserId) },
    });
    expect(user).toBeTruthy();
    expect(user?.telegramName).toBe('sprint_user');
  });

  it('enqueues voice update into voice-transcription queue', async () => {
    const updateId = 5002;

    const res = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .send({
        update_id: updateId,
        message: {
          message_id: 902,
          voice: {
            file_id: 'voice-file-xyz',
          },
          from: { id: 777002, username: 'voice_user' },
          chat: { id: 88002 },
        },
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });

    const storedJob = await voiceQueue.getJob(`telegram-update-${updateId}`);
    expect(storedJob).toBeDefined();
    expect(storedJob?.data).toMatchObject({
      telegramUpdateId: updateId,
      telegramVoiceFileId: 'voice-file-xyz',
    });
  });

  it.each([
    ['/start', QUEUES.NOTIFICATIONS],
    ['/connect_user', QUEUES.USER_CONNECTION],
    ['/accept_invite', QUEUES.INVITE_ACCEPTANCE],
    ['/decline_invite', QUEUES.INVITE_DECLINE],
    ['/revoke_assignee', QUEUES.ASSIGNEE_REVOKE],
    ['/my_assignments', QUEUES.ASSIGNMENTS_LIST],
  ])('routes command %s to queue %s', async (command, queueName) => {
    const updateIdByCommand: Record<string, number> = {
      '/start': 6101,
      '/connect_user': 6102,
      '/accept_invite': 6103,
      '/decline_invite': 6104,
      '/revoke_assignee': 6105,
      '/my_assignments': 6106,
    };
    const updateId = updateIdByCommand[command];

    const res = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .send({
        update_id: updateId,
        message: {
          message_id: 990 + updateId,
          text: `${command} arg1 arg2`,
          from: { id: 777100 + updateId, username: 'command_user' },
          chat: { id: 88100 + updateId },
        },
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });

    const queueByName: Record<string, Queue> = {
      [QUEUES.NOTIFICATIONS]: notificationsQueue,
      [QUEUES.USER_CONNECTION]: userConnectionQueue,
      [QUEUES.INVITE_ACCEPTANCE]: inviteAcceptanceQueue,
      [QUEUES.INVITE_DECLINE]: inviteDeclineQueue,
      [QUEUES.ASSIGNEE_REVOKE]: assigneeRevokeQueue,
      [QUEUES.ASSIGNMENTS_LIST]: assignmentsListQueue,
    };

    const storedJob = await queueByName[queueName].getJob(
      `telegram-update-${updateId}`,
    );
    expect(storedJob).toBeDefined();
    expect(storedJob?.data.command).toBe(command);
  });

  it('prevents duplicate enqueue by update_id', async () => {
    const updateId = 7001;
    const payload = {
      update_id: updateId,
      message: {
        message_id: 303,
        text: 'Deduplicate me',
        from: { id: 770001, username: 'dedupe_user' },
        chat: { id: 870001 },
      },
    };

    const first = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .send(payload);
    const second = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .send(payload);

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);

    const jobs = await taskParsingQueue.getJobs([
      'waiting',
      'active',
      'delayed',
      'completed',
      'failed',
      'paused',
    ]);
    const duplicated = jobs.filter(
      (job) => job.id === `telegram-update-${updateId}`,
    );
    expect(duplicated).toHaveLength(1);
  });

  it('ignores unknown message types with safe 200 response', async () => {
    const updateId = 8001;

    const res = await testApp.request
      .post('/webhook/telegram')
      .set('x-telegram-bot-api-secret-token', secret)
      .send({
        update_id: updateId,
        message: {
          message_id: 812,
          from: { id: 700812, username: 'unknown_type_user' },
          chat: { id: 800812 },
        },
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(await taskParsingQueue.getJob(`telegram-update-${updateId}`)).toBeFalsy();
    expect(await voiceQueue.getJob(`telegram-update-${updateId}`)).toBeFalsy();
    expect(await notificationsQueue.getJob(`telegram-update-${updateId}`)).toBeFalsy();
  });
});
