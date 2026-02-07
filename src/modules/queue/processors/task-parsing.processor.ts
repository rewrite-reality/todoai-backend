import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../queues.config';
import { PinoLoggerService } from '../../../common/logger/pino-logger.service';

@Injectable()
@Processor(QUEUES.TASK_PARSING)
export class TaskParsingProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    this.logger.log({
      msg: 'Task parsing job received',
      queue: QUEUES.TASK_PARSING,
      jobId: job.id,
      correlationId: job.data.correlationId,
    });
    return Promise.resolve();
  }
}
