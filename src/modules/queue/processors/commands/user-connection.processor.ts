import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../../queues.config';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { UserConnectionCommandJobSchema } from '../../contracts/user-connection-command.job';

@Injectable()
@Processor(QUEUES.USER_CONNECTION)
export class UserConnectionProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = UserConnectionCommandJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'User connection command job payload is invalid',
        queue: QUEUES.USER_CONNECTION,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    this.logger.log({
      msg: 'User connection command job received',
      queue: QUEUES.USER_CONNECTION,
      jobId: job.id,
      correlationId: parsed.data.correlationId,
    });
    return Promise.resolve();
  }
}
