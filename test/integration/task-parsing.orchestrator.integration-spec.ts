import { Job } from 'bullmq';
import { TaskStatus } from '@prisma/client';
import { TaskParsingOrchestrator } from '../../src/modules/queue/processors/task-parsing/task-parsing.orchestrator';
import { AiParserError } from '../../src/modules/ai/errors/ai-parser.error';
import { TaskParsingJobData } from '../../src/modules/queue/contracts/task-parsing.job';
import type {
  AiTextParseContext,
  IAiParser,
} from '../../src/modules/ai/contracts/ai-parser.interface';
import type { ParsedTaskDto } from '../../src/modules/ai/dto/parsed-task.dto';

describe('TaskParsingOrchestrator (integration)', () => {
  const logger = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  };
  const metrics = {
    incrementQueueIdempotencyHit: jest.fn(),
    observeAiParseDuration: jest.fn(),
    incrementAiParse: jest.fn(),
    incrementTasksCreated: jest.fn(),
  };
  const persistence = {
    loadExistingTasksByIdempotencyKey: jest.fn(),
    createParsedTasks: jest.fn(),
    createFallbackTask: jest.fn(),
  };
  const notifications = {
    enqueueExistingResultNotification: jest.fn(),
    enqueueSuccessNotification: jest.fn(),
    enqueueFallbackNotification: jest.fn(),
  };
  const parseTextMock = jest.fn<
    Promise<ParsedTaskDto>,
    [string, AiTextParseContext]
  >();
  const aiParser: IAiParser = {
    provider: 'mock' as const,
    parseText: parseTextMock,
  };

  const orchestrator = new TaskParsingOrchestrator(
    aiParser,
    persistence,
    notifications,
    logger,
    metrics,
  );

  const payload: TaskParsingJobData = {
    userId: '68ba48ef-1367-4ba6-adb5-80ce113f02b0',
    text: 'Plan release',
    telegramMessageId: 1,
    telegramChatId: 2,
    correlationId: 'corr-1',
    idempotencyKey: 'idem-1',
  };

  const job = {
    id: 'job-1',
  } as Job<Record<string, unknown>>;

  beforeEach(() => {
    jest.clearAllMocks();
    persistence.loadExistingTasksByIdempotencyKey.mockResolvedValue([]);
    persistence.createParsedTasks.mockResolvedValue([
      { id: 'task-1', title: 'Parsed task' },
    ]);
    persistence.createFallbackTask.mockResolvedValue({ id: 'fallback-task' });
  });

  it('retries once on first AI_PARSE_ZOD_VALIDATION and succeeds on second attempt', async () => {
    parseTextMock.mockImplementationOnce(() => {
      throw new AiParserError(
        'AI_PARSE_ZOD_VALIDATION',
        'Schema validation failed',
      );
    });
    parseTextMock.mockResolvedValueOnce({
      tasks: [{ title: 'Parsed task', subtasks: [] }],
    });

    await orchestrator.handleJob(job, payload);

    expect(parseTextMock).toHaveBeenCalledTimes(2);
    expect(parseTextMock).toHaveBeenNthCalledWith(
      1,
      payload.text,
      expect.objectContaining({
        attempt: 1,
        correlationId: payload.correlationId,
      }),
    );
    const secondCall = parseTextMock.mock.calls[1];
    expect(secondCall).toBeDefined();
    if (!secondCall) {
      throw new Error('Second parse call is missing');
    }
    const secondContext = secondCall[1];
    expect(secondContext.attempt).toBe(2);
    expect(secondContext.correlationId).toBe(payload.correlationId);
    expect(typeof secondContext.correctivePrompt).toBe('string');
    expect(persistence.createParsedTasks).toHaveBeenCalled();
    expect(notifications.enqueueSuccessNotification).toHaveBeenCalled();
    expect(notifications.enqueueFallbackNotification).not.toHaveBeenCalled();
  });

  it('falls back immediately on timeout error without corrective retry', async () => {
    parseTextMock.mockRejectedValueOnce(
      new AiParserError('AI_PARSE_TIMEOUT', 'timeout', { retriable: true }),
    );

    await orchestrator.handleJob(job, payload);

    expect(parseTextMock).toHaveBeenCalledTimes(1);
    expect(persistence.createFallbackTask).toHaveBeenCalledWith(payload);
    expect(notifications.enqueueFallbackNotification).toHaveBeenCalledWith(
      payload,
      'AI_PARSE_TIMEOUT',
    );
    expect(notifications.enqueueSuccessNotification).not.toHaveBeenCalled();
  });

  it('skips parsing and reuses previous result when idempotency hit is found', async () => {
    persistence.loadExistingTasksByIdempotencyKey.mockResolvedValueOnce([
      {
        id: 'task-1',
        title: 'Existing task',
        status: TaskStatus.TODO,
      },
    ]);

    await orchestrator.handleJob(job, payload);

    expect(parseTextMock).not.toHaveBeenCalled();
    expect(
      notifications.enqueueExistingResultNotification,
    ).toHaveBeenCalledWith(payload, [
      {
        id: 'task-1',
        title: 'Existing task',
        status: TaskStatus.TODO,
      },
    ]);
  });
});
