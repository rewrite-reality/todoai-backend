import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../queues.config';
import { PinoLoggerService } from '../../../common/logger/pino-logger.service';

@Injectable()
@Processor(QUEUES.INVITE_DECLINE)
export class InviteDeclineProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  async process(job: Job<Record<string, unknown>>): Promise<void> {
    this.logger.log({
      msg: 'Invite decline command job received',
      queue: QUEUES.INVITE_DECLINE,
      jobId: job.id,
      correlationId: job.data.correlationId,
    });
  }
}
