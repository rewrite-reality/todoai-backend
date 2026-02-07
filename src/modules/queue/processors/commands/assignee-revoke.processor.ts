import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../../queues.config';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { AssigneeRevokeCommandJobSchema } from '../../contracts/assignee-revoke-command.job';

@Injectable()
@Processor(QUEUES.ASSIGNEE_REVOKE)
export class AssigneeRevokeProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = AssigneeRevokeCommandJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'Assignee revoke command job payload is invalid',
        queue: QUEUES.ASSIGNEE_REVOKE,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    this.logger.log({
      msg: 'Assignee revoke command job received',
      queue: QUEUES.ASSIGNEE_REVOKE,
      jobId: job.id,
      correlationId: parsed.data.correlationId,
    });
    return Promise.resolve();
  }
}
