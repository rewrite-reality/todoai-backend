import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../../queues.config';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { AssignmentsListCommandJobSchema } from '../../contracts/assignments-list-command.job';

@Injectable()
@Processor(QUEUES.ASSIGNMENTS_LIST)
export class AssignmentsListProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = AssignmentsListCommandJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'Assignments list command job payload is invalid',
        queue: QUEUES.ASSIGNMENTS_LIST,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    this.logger.log({
      msg: 'Assignments list command job received',
      queue: QUEUES.ASSIGNMENTS_LIST,
      jobId: job.id,
      correlationId: parsed.data.correlationId,
    });
    return Promise.resolve();
  }
}
