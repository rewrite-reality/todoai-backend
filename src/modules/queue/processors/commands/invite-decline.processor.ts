import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../../queues.config';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { InviteDeclineCommandJobSchema } from '../../contracts/invite-decline-command.job';

@Injectable()
@Processor(QUEUES.INVITE_DECLINE)
export class InviteDeclineProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = InviteDeclineCommandJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'Invite decline command job payload is invalid',
        queue: QUEUES.INVITE_DECLINE,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    this.logger.log({
      msg: 'Invite decline command job received',
      queue: QUEUES.INVITE_DECLINE,
      jobId: job.id,
      correlationId: parsed.data.correlationId,
    });
    return Promise.resolve();
  }
}
