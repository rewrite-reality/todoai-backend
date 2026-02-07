import { TaskStatus } from '@prisma/client';
import { Queue } from 'bullmq';
import { TaskParsingNotificationService } from '../../src/modules/queue/processors/task-parsing/task-parsing.notification.service';
import { TaskParsingJobData } from '../../src/modules/queue/contracts/task-parsing.job';

describe('TaskParsingNotificationService', () => {
  type QueuedNotificationPayload = {
    chatId: number;
    text: string;
    parseMode: 'HTML' | 'Markdown';
    correlationId: string;
  };

  const add = jest
    .fn<
      Promise<unknown>,
      [string, QueuedNotificationPayload, { jobId: string }]
    >()
    .mockResolvedValue(undefined);
  const queue = { add } as unknown as Queue;
  const service = new TaskParsingNotificationService(queue);

  const basePayload: TaskParsingJobData = {
    userId: '58e05e3f-e496-46fe-bd64-aa7dd772fc1a',
    text: 'Build parser',
    telegramMessageId: 100,
    telegramChatId: 200,
    correlationId: 'corr-test',
    idempotencyKey: 'task-parse:test',
  };

  beforeEach(() => {
    add.mockClear();
  });

  it('formats single task success notification', async () => {
    await service.enqueueSuccessNotification(basePayload, ['Plan sprint']);

    expect(add).toHaveBeenCalledWith(
      'task-parse-notification',
      expect.objectContaining({
        chatId: basePayload.telegramChatId,
        text: 'Task created: <b>Plan sprint</b>',
        parseMode: 'HTML',
        correlationId: basePayload.correlationId,
      }),
      { jobId: `task-parsing-notification-${basePayload.idempotencyKey}` },
    );
  });

  it('formats multi-task success notification and escapes HTML', async () => {
    await service.enqueueSuccessNotification(basePayload, [
      'A < B',
      'B > C',
      '"Quoted"',
      "John's task",
    ]);

    const firstCall = add.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (!firstCall) {
      throw new Error('Expected queue add call');
    }
    const queuedPayload = firstCall[1];
    expect(queuedPayload.text).toContain('Tasks created: <b>4</b>');
    expect(queuedPayload.text).toContain('- A &lt; B');
    expect(queuedPayload.text).toContain('- B &gt; C');
    expect(queuedPayload.text).toContain('- &quot;Quoted&quot;');
    expect(queuedPayload.text).toContain('\n... and 1 more');
  });

  it('formats fallback notification with reason code', async () => {
    await service.enqueueFallbackNotification(basePayload, 'AI_PARSE_TIMEOUT');

    const firstCall = add.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (!firstCall) {
      throw new Error('Expected queue add call');
    }
    expect(firstCall[0]).toBe('task-parse-notification');
    expect(firstCall[2]).toEqual({
      jobId: `task-parsing-notification-${basePayload.idempotencyKey}`,
    });
    expect(firstCall[1].text).toContain(
      'Could not parse the message (AI_PARSE_TIMEOUT). Saved as raw task.',
    );
  });

  it('uses fallback template for existing parse-failed result', async () => {
    await service.enqueueExistingResultNotification(basePayload, [
      {
        id: 'task-1',
        title: 'Raw fallback',
        status: TaskStatus.PARSE_FAILED,
      },
    ]);

    const firstCall = add.mock.calls[0];
    expect(firstCall).toBeDefined();
    if (!firstCall) {
      throw new Error('Expected queue add call');
    }
    const queuedPayload = firstCall[1];
    expect(queuedPayload.text).toContain('AI_PARSE_ZOD_VALIDATION');
    expect(queuedPayload.text).toContain('Saved as raw task');
  });

  it('does not enqueue notification when existing result list is empty', async () => {
    await service.enqueueExistingResultNotification(basePayload, []);

    expect(add).not.toHaveBeenCalled();
  });
});
