import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../queues.config';
import { PinoLoggerService } from '../../../common/logger/pino-logger.service';

@Injectable()
@Processor(QUEUES.INVITE_ACCEPTANCE)
export class InviteAcceptanceProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  async process(job: Job<Record<string, unknown>>): Promise<void> {
    this.logger.log({
      msg: 'Invite acceptance command job received',
      queue: QUEUES.INVITE_ACCEPTANCE,
      jobId: job.id,
      correlationId: job.data.correlationId,
    });
  }
}
