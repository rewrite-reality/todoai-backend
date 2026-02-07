import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../../queues.config';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { InviteAcceptanceCommandJobSchema } from '../../contracts/invite-acceptance-command.job';

@Injectable()
@Processor(QUEUES.INVITE_ACCEPTANCE)
export class InviteAcceptanceProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = InviteAcceptanceCommandJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'Invite acceptance command job payload is invalid',
        queue: QUEUES.INVITE_ACCEPTANCE,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    this.logger.log({
      msg: 'Invite acceptance command job received',
      queue: QUEUES.INVITE_ACCEPTANCE,
      jobId: job.id,
      correlationId: parsed.data.correlationId,
    });
    return Promise.resolve();
  }
}
