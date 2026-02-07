import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../queues.config';
import { PinoLoggerService } from '../../../common/logger/pino-logger.service';

@Injectable()
@Processor(QUEUES.ASSIGNEE_REVOKE)
export class AssigneeRevokeProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    this.logger.log({
      msg: 'Assignee revoke command job received',
      queue: QUEUES.ASSIGNEE_REVOKE,
      jobId: job.id,
      correlationId: job.data.correlationId,
    });
    return Promise.resolve();
  }
}
