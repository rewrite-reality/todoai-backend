import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { Logger } from '@nestjs/common';
import { QUEUES } from '../queues.config';

@Processor(QUEUES.TELEGRAM_UPDATES)
export class TelegramUpdateProcessor extends WorkerHost {
  private readonly logger = new Logger(TelegramUpdateProcessor.name);

  constructor(
    @InjectQueue(QUEUES.VOICE_TRANSCRIPTION) private voiceQueue: Queue,
    @InjectQueue(QUEUES.TASK_PARSING) private parsingQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const update = job.data;
    const message = update.message;

    if (!message) return;

    this.logger.log(
      `Routing update ${update.update_id} from user ${message.from.id}`,
    );

    // 1. Если это ГОЛОС
    if (message.voice) {
      await this.voiceQueue.add('transcribe', {
        fileId: message.voice.file_id,
        userId: message.from.id,
        chatId: message.chat.id,
      });
      return;
    }

    // 2. Если это ТЕКСТ
    if (message.text) {
      // Игнорируем команды (они обрабатываются в другом месте или отдельно)
      if (message.text.startsWith('/')) {
        this.logger.log(
          `Command detected: ${message.text}, routing to command handler...`,
        );
        // TODO: Добавить очередь для команд или обрабатывать тут
        return;
      }

      await this.parsingQueue.add('parse-task', {
        text: message.text,
        userId: message.from.id,
        chatId: message.chat.id,
        messageId: message.message_id,
      });
    }
  }
}
