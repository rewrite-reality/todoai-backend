import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, UnrecoverableError } from 'bullmq';
import { RequestContextService } from '../../../../common/context/request-context.service';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { TaskParsingJobSchema } from '../../contracts/task-parsing.job';
import { QUEUES } from '../../queues.config';
import { TaskParsingOrchestrator } from './task-parsing.orchestrator';

@Injectable()
@Processor(QUEUES.TASK_PARSING)
export class TaskParsingProcessor extends WorkerHost {
  constructor(
    private readonly logger: PinoLoggerService,
    private readonly requestContext: RequestContextService,
    private readonly orchestrator: TaskParsingOrchestrator,
  ) {
    super();
  }

  async process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = TaskParsingJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'Task parsing job payload is invalid',
        queue: QUEUES.TASK_PARSING,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    await this.requestContext.run(
      { correlationId: parsed.data.correlationId },
      async () => {
        await this.orchestrator.handleJob(job, parsed.data);
      },
    );
  }
}
