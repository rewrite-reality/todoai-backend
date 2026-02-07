import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { Queue } from 'bullmq';
import { NotificationJobData } from '../../contracts/notification.job';
import { TaskParsingJobData } from '../../contracts/task-parsing.job';
import { QUEUES } from '../../queues.config';
import { ExistingTaskRecord } from './task-parsing.persistence.service';

@Injectable()
export class TaskParsingNotificationService {
  constructor(
    @InjectQueue(QUEUES.NOTIFICATIONS)
    private readonly notificationsQueue: Queue,
  ) {}

  async enqueueSuccessNotification(
    payload: TaskParsingJobData,
    titles: string[],
  ): Promise<void> {
    await this.enqueueNotification(
      {
        chatId: payload.telegramChatId,
        text: this.formatSuccessNotification(titles),
        parseMode: 'HTML',
        correlationId: payload.correlationId,
      },
      payload.idempotencyKey,
    );
  }

  async enqueueFallbackNotification(
    payload: TaskParsingJobData,
    reasonCode: string,
  ): Promise<void> {
    await this.enqueueNotification(
      {
        chatId: payload.telegramChatId,
        text: this.formatFallbackNotification(reasonCode),
        parseMode: 'HTML',
        correlationId: payload.correlationId,
      },
      payload.idempotencyKey,
    );
  }

  async enqueueExistingResultNotification(
    payload: TaskParsingJobData,
    tasks: ExistingTaskRecord[],
  ): Promise<void> {
    if (tasks.length === 0) {
      return;
    }

    const isFallbackResult =
      tasks.length === 1 && tasks[0].status === TaskStatus.PARSE_FAILED;

    await this.enqueueNotification(
      {
        chatId: payload.telegramChatId,
        text: isFallbackResult
          ? this.formatFallbackNotification('AI_PARSE_ZOD_VALIDATION')
          : this.formatSuccessNotification(tasks.map((task) => task.title)),
        parseMode: 'HTML',
        correlationId: payload.correlationId,
      },
      payload.idempotencyKey,
    );
  }

  private async enqueueNotification(
    payload: NotificationJobData,
    idempotencyKey: string,
  ): Promise<void> {
    await this.notificationsQueue.add('task-parse-notification', payload, {
      jobId: `task-parsing-notification-${idempotencyKey}`,
    });
  }

  private formatSuccessNotification(titles: string[]): string {
    if (titles.length === 1) {
      return `Task created: <b>${this.escapeHtml(titles[0])}</b>`;
    }

    const firstThree = titles
      .slice(0, 3)
      .map((title) => `- ${this.escapeHtml(title)}`)
      .join('\n');

    const extra =
      titles.length > 3 ? `\n... and ${titles.length - 3} more` : '';
    return `Tasks created: <b>${titles.length}</b>\n${firstThree}${extra}`;
  }

  private formatFallbackNotification(reasonCode: string): string {
    return `Could not parse the message (${this.escapeHtml(reasonCode)}). Saved as raw task.`;
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }
}
