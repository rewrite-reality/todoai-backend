import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../queues.config';
import { PinoLoggerService } from '../../../common/logger/pino-logger.service';

@Injectable()
@Processor(QUEUES.ASSIGNMENTS_LIST)
export class AssignmentsListProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  async process(job: Job<Record<string, unknown>>): Promise<void> {
    this.logger.log({
      msg: 'Assignments list command job received',
      queue: QUEUES.ASSIGNMENTS_LIST,
      jobId: job.id,
      correlationId: job.data.correlationId,
    });
  }
}
