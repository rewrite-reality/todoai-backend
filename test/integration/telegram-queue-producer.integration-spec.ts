import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueModule } from '../../src/modules/queue/queue.module';
import { QUEUES } from '../../src/modules/queue/queues.config';
import { TelegramQueueProducerService } from '../../src/modules/telegram/telegram-queue-producer.service';

describe('TelegramQueueProducerService (integration)', () => {
  let moduleRef: TestingModule;
  let producer: TelegramQueueProducerService;
  let taskParsingQueue: Queue;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), QueueModule],
      providers: [TelegramQueueProducerService],
    }).compile();

    producer = moduleRef.get(TelegramQueueProducerService);
    taskParsingQueue = moduleRef.get<Queue>(getQueueToken(QUEUES.TASK_PARSING));
  });

  beforeEach(async () => {
    await taskParsingQueue.obliterate({ force: true });
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('deduplicates jobs by update_id through BullMQ jobId', async () => {
    const payload = {
      telegramUpdateId: 9001,
      telegramUserId: 10001,
      telegramChatId: 11001,
      telegramMessageId: 12001,
      text: 'First text',
      correlationId: 'integration-corr-1',
    };

    await producer.enqueueTaskParsing(payload);
    await producer.enqueueTaskParsing({ ...payload, text: 'Second text' });

    const jobId = `telegram-update-${payload.telegramUpdateId}`;
    const storedJob = await taskParsingQueue.getJob(jobId);
    expect(storedJob).toBeDefined();

    const allJobs = await taskParsingQueue.getJobs([
      'waiting',
      'active',
      'delayed',
      'completed',
      'failed',
      'paused',
    ]);
    const sameIdJobs = allJobs.filter((job) => job.id === jobId);

    expect(sameIdJobs).toHaveLength(1);
  });
});
