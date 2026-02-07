import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { TelegramUpdate } from '../../telegram/telegram.update';
import { QUEUES } from '../queues.config';

@Processor(QUEUES.TELEGRAM_UPDATES)
export class TelegramUpdateProcessor extends WorkerHost {
  private readonly logger = new Logger(TelegramUpdateProcessor.name);

  constructor(
    @InjectQueue(QUEUES.VOICE_TRANSCRIPTION) private readonly voiceQueue: Queue,
    @InjectQueue(QUEUES.TASK_PARSING) private readonly parsingQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<TelegramUpdate>): Promise<void> {
    const update = job.data;
    const message = update.message;

    if (!message || !message.from || !message.chat) {
      return;
    }

    const { from, chat } = message;

    this.logger.log(`Routing update ${update.update_id} from user ${from.id}`);

    if (message.voice?.file_id) {
      await this.voiceQueue.add('transcribe', {
        fileId: message.voice.file_id,
        userId: from.id,
        chatId: chat.id,
      });
      return;
    }

    if (typeof message.text === 'string' && message.text.length > 0) {
      if (message.text.startsWith('/')) {
        this.logger.log(
          `Command detected: ${message.text}, routing to command handler...`,
        );
        return;
      }

      await this.parsingQueue.add('parse-task', {
        text: message.text,
        userId: from.id,
        chatId: chat.id,
        messageId: message.message_id,
      });
    }
  }
}
