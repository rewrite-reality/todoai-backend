import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job, UnrecoverableError } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QUEUES } from '../../queues.config';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { VoiceTranscriptionJobSchema } from '../../contracts/voice-transcription.job';

@Injectable()
@Processor(QUEUES.VOICE_TRANSCRIPTION)
export class VoiceTranscriptionProcessor extends WorkerHost {
  constructor(private readonly logger: PinoLoggerService) {
    super();
  }

  process(job: Job<Record<string, unknown>>): Promise<void> {
    const parsed = VoiceTranscriptionJobSchema.safeParse(job.data);
    if (!parsed.success) {
      this.logger.warn({
        msg: 'Voice transcription job payload is invalid',
        queue: QUEUES.VOICE_TRANSCRIPTION,
        jobId: job.id,
        issues: parsed.error.issues,
      });
      throw new UnrecoverableError('QUEUE_JOB_PAYLOAD_INVALID');
    }

    this.logger.log({
      msg: 'Voice transcription job received',
      queue: QUEUES.VOICE_TRANSCRIPTION,
      jobId: job.id,
      correlationId: parsed.data.correlationId,
    });
    return Promise.resolve();
  }
}
