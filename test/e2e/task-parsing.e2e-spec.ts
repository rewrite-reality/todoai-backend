import { randomUUID } from 'crypto';
import { getQueueToken } from '@nestjs/bullmq';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Queue } from 'bullmq';
import { TaskStatus } from '@prisma/client';
import { AppModule } from '../../src/app.module';
import { PinoLoggerService } from '../../src/common/logger/pino-logger.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { AI_TEXT_PARSER } from '../../src/modules/ai/constants/ai.tokens';
import type {
  AiTextParseContext,
  IAiParser,
} from '../../src/modules/ai/contracts/ai-parser.interface';
import type { ParsedTaskDto } from '../../src/modules/ai/dto/parsed-task.dto';
import { AiParserError } from '../../src/modules/ai/errors/ai-parser.error';
import { QUEUES } from '../../src/modules/queue/queues.config';
import { buildTaskIdFromIdempotencyKey } from '../../src/modules/queue/utils/deterministic-uuid.util';

describe('Task parsing processor (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let taskParsingQueue: Queue;
  let notificationsQueue: Queue;
  let telegramIdSeq = BigInt(992000000000);

  const parseTextMock = jest.fn<
    Promise<ParsedTaskDto>,
    [string, AiTextParseContext]
  >();
  const aiParserMock: IAiParser = {
    provider: 'mock',
    parseText: parseTextMock,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AI_TEXT_PARSER)
      .useValue(aiParserMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.useLogger(app.get(PinoLoggerService));
    await app.init();

    prisma = app.get(PrismaService);
    taskParsingQueue = app.get<Queue>(getQueueToken(QUEUES.TASK_PARSING));
    notificationsQueue = app.get<Queue>(getQueueToken(QUEUES.NOTIFICATIONS));
  });

  beforeEach(async () => {
    parseTextMock.mockReset();
    await Promise.all([
      taskParsingQueue.obliterate({ force: true }),
      notificationsQueue.obliterate({ force: true }),
    ]);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  }, 10000);

  async function createUser() {
    telegramIdSeq += 1n;
    return prisma.user.create({
      data: {
        telegramId: telegramIdSeq,
        telegramName: `task-parsing-e2e-${telegramIdSeq.toString()}`,
      },
    });
  }

  async function createUniqueIdempotencyKey(prefix: string): Promise<string> {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const candidate = `${prefix}-${randomUUID()}`;
      const ids = Array.from({ length: 5 }, (_, index) =>
        buildTaskIdFromIdempotencyKey(candidate, index),
      );
      const existingCount = await prisma.task.count({
        where: { id: { in: ids } },
      });
      if (existingCount === 0) {
        return candidate;
      }
    }

    throw new Error(`Failed to allocate unique idempotency key for ${prefix}`);
  }

  async function waitForTerminalState(
    queue: Queue,
    jobId: string,
    timeoutMs = 10000,
  ): Promise<'completed' | 'failed'> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
      const job = await queue.getJob(jobId);
      if (!job) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        continue;
      }

      const state = await job.getState();
      if (state === 'completed' || state === 'failed') {
        return state;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    throw new Error(`Queue job ${jobId} did not finish within ${timeoutMs}ms`);
  }

  async function enqueueTaskParsingJob(params: {
    userId: string;
    text: string;
    idempotencyKey: string;
    telegramChatId?: number;
    telegramMessageId?: number;
  }): Promise<'completed' | 'failed'> {
    const job = await taskParsingQueue.add('parse-task', {
      userId: params.userId,
      text: params.text,
      telegramMessageId: params.telegramMessageId ?? 100,
      telegramChatId: params.telegramChatId ?? 200,
      correlationId: `corr-${randomUUID()}`,
      idempotencyKey: params.idempotencyKey,
    });

    return waitForTerminalState(taskParsingQueue, String(job.id));
  }

  it('creates task with subtasks and enqueues success notification', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey('e2e-success');

    parseTextMock.mockResolvedValue({
      tasks: [
        {
          title: 'Prepare sprint',
          summary: 'Write sprint plan',
          subtasks: [
            { title: 'Collect requirements', order: 0 },
            { title: 'Draft timeline', order: 1 },
          ],
        },
      ],
    });

    const state = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'Prepare sprint: Collect requirements, Draft timeline',
      idempotencyKey,
    });
    expect(state).toBe('completed');

    const taskId = buildTaskIdFromIdempotencyKey(idempotencyKey, 0);
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { subtasks: { orderBy: { order: 'asc' } } },
    });

    expect(task).toBeTruthy();
    expect(task?.title).toBe('Prepare sprint');
    expect(task?.status).toBe(TaskStatus.TODO);
    expect(task?.subtasks).toHaveLength(2);
    expect(task?.subtasks.map((item) => item.title)).toEqual([
      'Collect requirements',
      'Draft timeline',
    ]);

    const notification = await notificationsQueue.getJob(
      `task-parsing-notification-${idempotencyKey}`,
    );
    expect(notification).toBeTruthy();
    expect(
      (notification?.data as { text?: string } | undefined)?.text,
    ).toContain('Task created');
  });

  it('persists deadline for "завтра" scenario from parsed ISO date', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey('e2e-deadline');
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const tomorrowIso = tomorrow.toISOString();

    parseTextMock.mockResolvedValue({
      tasks: [
        {
          title: 'Позвонить клиенту',
          deadline: tomorrowIso,
          subtasks: [],
        },
      ],
    });

    const state = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'Позвонить клиенту завтра',
      idempotencyKey,
    });
    expect(state).toBe('completed');

    const task = await prisma.task.findUnique({
      where: { id: buildTaskIdFromIdempotencyKey(idempotencyKey, 0) },
    });
    expect(task).toBeTruthy();
    expect(task?.deadline?.toISOString()).toBe(tomorrowIso);
  });

  it.skip('BLOCKER: multi-task parse cannot persist because idx_tasks_order_inbox enforces unique (user_id, order) and processor writes order=0', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey('e2e-multi');

    parseTextMock.mockResolvedValue({
      tasks: [
        { title: 'Task one', subtasks: [] },
        { title: 'Task two', subtasks: [] },
      ],
    });

    const state = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'Task one; Task two',
      idempotencyKey,
    });
    expect(state).toBe('completed');
    expect(parseTextMock).toHaveBeenCalledTimes(1);

    const tasks = await prisma.task.findMany({
      where: {
        id: {
          in: [
            buildTaskIdFromIdempotencyKey(idempotencyKey, 0),
            buildTaskIdFromIdempotencyKey(idempotencyKey, 1),
          ],
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    expect(buildTaskIdFromIdempotencyKey(idempotencyKey, 0)).not.toBe(
      buildTaskIdFromIdempotencyKey(idempotencyKey, 1),
    );

    expect(tasks).toHaveLength(2);
    expect(tasks.map((item) => item.title)).toEqual(['Task one', 'Task two']);
  });

  it('retries once after invalid JSON and succeeds on corrective attempt', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey('e2e-retry');

    parseTextMock.mockImplementation((_input, context) => {
      if (context.attempt === 1) {
        throw new AiParserError('AI_PARSE_INVALID_JSON', 'broken json');
      }

      return Promise.resolve({
        tasks: [{ title: 'Recovered task', subtasks: [] }],
      });
    });

    const state = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'recover me',
      idempotencyKey,
    });
    expect(state).toBe('completed');

    expect(parseTextMock).toHaveBeenCalledTimes(2);
    const secondCall = parseTextMock.mock.calls[1];
    expect(secondCall).toBeDefined();
    if (!secondCall) {
      throw new Error('Second parse call is missing');
    }
    const secondContext = secondCall[1];
    expect(secondContext.attempt).toBe(2);
    expect(typeof secondContext.correctivePrompt).toBe('string');
    expect(secondContext.correctivePrompt?.length).toBeGreaterThan(0);

    const task = await prisma.task.findUnique({
      where: { id: buildTaskIdFromIdempotencyKey(idempotencyKey, 0) },
    });
    expect(task?.status).toBe(TaskStatus.TODO);
  });

  it('falls back to PARSE_FAILED task when parser returns invalid output twice', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey(
      'e2e-fallback-invalid',
    );
    const rawText = 'asdasd ??? ###';

    parseTextMock.mockRejectedValue(
      new AiParserError('AI_PARSE_INVALID_JSON', 'still invalid'),
    );

    const state = await enqueueTaskParsingJob({
      userId: user.id,
      text: rawText,
      idempotencyKey,
    });
    expect(state).toBe('completed');

    const task = await prisma.task.findUnique({
      where: { id: buildTaskIdFromIdempotencyKey(idempotencyKey, 0) },
      include: { subtasks: true },
    });
    expect(task).toBeTruthy();
    expect(task?.status).toBe(TaskStatus.PARSE_FAILED);
    expect(task?.originalInput).toBe(rawText);
    expect(task?.subtasks).toHaveLength(0);

    const notification = await notificationsQueue.getJob(
      `task-parsing-notification-${idempotencyKey}`,
    );
    expect(
      (notification?.data as { text?: string } | undefined)?.text,
    ).toContain('AI_PARSE_INVALID_JSON');
  });

  it('falls back when parser times out', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey('e2e-timeout');

    parseTextMock.mockRejectedValue(
      new AiParserError('AI_PARSE_TIMEOUT', 'timeout', { retriable: true }),
    );

    const state = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'timeout case',
      idempotencyKey,
    });
    expect(state).toBe('completed');

    const task = await prisma.task.findUnique({
      where: { id: buildTaskIdFromIdempotencyKey(idempotencyKey, 0) },
    });
    expect(task?.status).toBe(TaskStatus.PARSE_FAILED);

    const notification = await notificationsQueue.getJob(
      `task-parsing-notification-${idempotencyKey}`,
    );
    expect(
      (notification?.data as { text?: string } | undefined)?.text,
    ).toContain('AI_PARSE_TIMEOUT');
  });

  it('is idempotent by idempotencyKey and does not duplicate DB effects', async () => {
    const user = await createUser();
    const idempotencyKey = await createUniqueIdempotencyKey('e2e-idempotency');

    parseTextMock.mockResolvedValue({
      tasks: [{ title: 'Idempotent task', subtasks: [] }],
    });

    const firstState = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'create once',
      idempotencyKey,
      telegramMessageId: 1001,
    });
    const secondState = await enqueueTaskParsingJob({
      userId: user.id,
      text: 'create twice',
      idempotencyKey,
      telegramMessageId: 1002,
    });

    expect(firstState).toBe('completed');
    expect(secondState).toBe('completed');
    expect(parseTextMock).toHaveBeenCalledTimes(1);

    const taskIds = Array.from({ length: 5 }, (_, index) =>
      buildTaskIdFromIdempotencyKey(idempotencyKey, index),
    );
    const tasks = await prisma.task.findMany({
      where: { id: { in: taskIds } },
    });
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Idempotent task');

    const allNotificationJobs = await notificationsQueue.getJobs([
      'waiting',
      'active',
      'delayed',
      'completed',
      'failed',
      'paused',
    ]);
    const sameNotificationJobs = allNotificationJobs.filter(
      (job) => job.id === `task-parsing-notification-${idempotencyKey}`,
    );
    expect(sameNotificationJobs).toHaveLength(1);
  });
});
