import { randomUUID } from 'crypto';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { InputType, TaskStatus } from '@prisma/client';
import { ObservabilityModule } from '../../src/common/observability/observability.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { TaskParsingPersistenceService } from '../../src/modules/queue/processors/task-parsing/task-parsing.persistence.service';
import { buildTaskIdFromIdempotencyKey } from '../../src/modules/queue/utils/deterministic-uuid.util';

describe('TaskParsingPersistenceService (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let service: TaskParsingPersistenceService;
  let telegramIdSeq = BigInt(990000000000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ObservabilityModule,
        PrismaModule,
      ],
      providers: [TaskParsingPersistenceService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);
    service = app.get(TaskParsingPersistenceService);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  async function createUser() {
    telegramIdSeq += 1n;
    return prisma.user.create({
      data: {
        telegramId: telegramIdSeq,
        telegramName: `task-write-test-${telegramIdSeq.toString()}`,
      },
    });
  }

  it('creates task and subtasks atomically inside transaction', async () => {
    const user = await createUser();
    const idempotencyKey = `persist-ok-${randomUUID()}`;

    const result = await service.createTasks({
      userId: user.id,
      originalInput: 'Prepare release',
      originalInputType: InputType.TEXT,
      idempotencyKey,
      tasks: [
        {
          title: 'Prepare release',
          summary: 'Summarize release scope',
          deadline: null,
          subtasks: [
            { title: 'Write changelog' },
            { title: 'Run regression', order: 4 },
          ],
        },
      ],
    });

    expect(result).toHaveLength(1);
    expect(result?.[0].id).toBe(
      buildTaskIdFromIdempotencyKey(idempotencyKey, 0),
    );

    const storedTask = await prisma.task.findUnique({
      where: { id: buildTaskIdFromIdempotencyKey(idempotencyKey, 0) },
      include: {
        subtasks: { orderBy: { order: 'asc' } },
      },
    });

    expect(storedTask).toBeTruthy();
    expect(storedTask?.status).toBe(TaskStatus.TODO);
    expect(storedTask?.subtasks).toHaveLength(2);
    expect(storedTask?.subtasks[0].order).toBe(0);
    expect(storedTask?.subtasks[1].order).toBe(4);
  });

  it('rolls back entire transaction when one task insert fails', async () => {
    const user = await createUser();
    const idempotencyKey = `persist-rollback-${randomUUID()}`;

    await expect(
      service.createTasks({
        userId: user.id,
        originalInput: 'Broken payload',
        originalInputType: InputType.TEXT,
        idempotencyKey,
        tasks: [
          {
            title: 'Task 1',
            subtasks: [{ title: 'Subtask 1' }],
          },
          {
            title: 'x'.repeat(501),
            subtasks: [],
          },
        ],
      }),
    ).rejects.toThrow('TASK_CREATE_FAILED');

    const createdIds = [0, 1].map((index) =>
      buildTaskIdFromIdempotencyKey(idempotencyKey, index),
    );
    const createdTasks = await prisma.task.findMany({
      where: { id: { in: createdIds } },
    });

    expect(createdTasks).toHaveLength(0);
  });

  it('writes fallback task with PARSE_FAILED status and original input', async () => {
    const user = await createUser();
    const idempotencyKey = `persist-fallback-${randomUUID()}`;
    const originalInput = 'непонятный текст без структуры';

    const fallback = await service.createFallbackTask({
      userId: user.id,
      text: originalInput,
      telegramMessageId: 1,
      telegramChatId: 2,
      correlationId: 'corr-fallback',
      idempotencyKey,
    });

    expect(fallback).toBeTruthy();

    const taskId = buildTaskIdFromIdempotencyKey(idempotencyKey, 0);
    const storedTask = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        subtasks: true,
      },
    });

    expect(storedTask).toBeTruthy();
    expect(storedTask?.status).toBe(TaskStatus.PARSE_FAILED);
    expect(storedTask?.originalInput).toBe(originalInput);
    expect(storedTask?.originalInputType).toBe(InputType.TEXT);
    expect(storedTask?.subtasks).toHaveLength(0);
  });

  it('throws TASK_CREATE_FAILED on duplicate deterministic task id for same idempotency key', async () => {
    const user = await createUser();
    const idempotencyKey = `persist-duplicate-${randomUUID()}`;

    const first = await service.createTasks({
      userId: user.id,
      originalInput: 'Task once',
      originalInputType: InputType.TEXT,
      idempotencyKey,
      tasks: [{ title: 'Task once', subtasks: [] }],
    });
    expect(first).toHaveLength(1);
    await expect(
      service.createTasks({
        userId: user.id,
        originalInput: 'Task twice',
        originalInputType: InputType.TEXT,
        idempotencyKey,
        tasks: [{ title: 'Task twice', subtasks: [] }],
      }),
    ).rejects.toThrow('TASK_CREATE_FAILED');
  });

  it('creates multiple inbox tasks in one transaction', async () => {
    const user = await createUser();
    const idempotencyKey = `persist-multi-blocker-${randomUUID()}`;

    const result = await service.createTasks({
      userId: user.id,
      originalInput: 'Task one; Task two',
      originalInputType: InputType.TEXT,
      idempotencyKey,
      tasks: [
        { title: 'Task one', subtasks: [] },
        { title: 'Task two', subtasks: [] },
      ],
    });

    expect(result).toHaveLength(2);
    expect(result?.map((task) => task.title)).toEqual(['Task one', 'Task two']);
  });
});
