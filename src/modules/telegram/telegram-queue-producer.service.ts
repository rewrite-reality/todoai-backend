import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import type { TaskParsingJobData } from '../queue/contracts/task-parsing.job';
import { QUEUES } from '../queue/queues.config';
import { SupportedTelegramCommand } from './telegram.update';

export interface BaseTelegramJobPayload {
  telegramUpdateId: number;
  telegramUserId: number;
  telegramChatId: number;
  correlationId: string;
}

export interface TelegramTaskParsingJobPayload {
  telegramUpdateId: number;
  userId: string;
  telegramChatId: number;
  telegramMessageId: number;
  text: string;
  correlationId: string;
  idempotencyKey: string;
}

export interface TelegramVoiceJobPayload extends BaseTelegramJobPayload {
  telegramMessageId: number;
  telegramVoiceFileId: string;
}

export interface TelegramCommandJobPayload extends BaseTelegramJobPayload {
  telegramMessageId: number;
  command: SupportedTelegramCommand;
  rawText: string;
}

interface CommandQueueRoute {
  queue: Queue;
  jobName: string;
}

@Injectable()
export class TelegramQueueProducerService {
  private readonly commandRoutes: Record<
    SupportedTelegramCommand,
    CommandQueueRoute
  >;

  constructor(
    @InjectQueue(QUEUES.TASK_PARSING) private readonly taskParsingQueue: Queue,
    @InjectQueue(QUEUES.VOICE_TRANSCRIPTION)
    private readonly voiceTranscriptionQueue: Queue,
    @InjectQueue(QUEUES.NOTIFICATIONS)
    private readonly notificationsQueue: Queue,
    @InjectQueue(QUEUES.USER_CONNECTION)
    private readonly userConnectionQueue: Queue,
    @InjectQueue(QUEUES.INVITE_ACCEPTANCE)
    private readonly inviteAcceptanceQueue: Queue,
    @InjectQueue(QUEUES.INVITE_DECLINE)
    private readonly inviteDeclineQueue: Queue,
    @InjectQueue(QUEUES.ASSIGNEE_REVOKE)
    private readonly assigneeRevokeQueue: Queue,
    @InjectQueue(QUEUES.ASSIGNMENTS_LIST)
    private readonly assignmentsListQueue: Queue,
  ) {
    this.commandRoutes = {
      '/start': {
        queue: this.notificationsQueue,
        jobName: 'telegram-command-start',
      },
      '/connect_user': {
        queue: this.userConnectionQueue,
        jobName: 'telegram-command-connect-user',
      },
      '/accept_invite': {
        queue: this.inviteAcceptanceQueue,
        jobName: 'telegram-command-accept-invite',
      },
      '/decline_invite': {
        queue: this.inviteDeclineQueue,
        jobName: 'telegram-command-decline-invite',
      },
      '/revoke_assignee': {
        queue: this.assigneeRevokeQueue,
        jobName: 'telegram-command-revoke-assignee',
      },
      '/my_assignments': {
        queue: this.assignmentsListQueue,
        jobName: 'telegram-command-my-assignments',
      },
    };
  }

  async enqueueTaskParsing(
    payload: TelegramTaskParsingJobPayload,
  ): Promise<void> {
    const taskParsingPayload: TaskParsingJobData = {
      userId: payload.userId,
      text: payload.text,
      telegramMessageId: payload.telegramMessageId,
      telegramChatId: payload.telegramChatId,
      correlationId: payload.correlationId,
      idempotencyKey: payload.idempotencyKey,
    };

    await this.taskParsingQueue.add(
      'parse-task',
      {
        telegramUpdateId: payload.telegramUpdateId,
        ...taskParsingPayload,
      },
      {
        jobId: this.buildJobId(payload.telegramUpdateId),
      },
    );
  }

  async enqueueVoiceTranscription(
    payload: TelegramVoiceJobPayload,
  ): Promise<void> {
    await this.voiceTranscriptionQueue.add('transcribe-voice', payload, {
      jobId: this.buildJobId(payload.telegramUpdateId),
    });
  }

  async enqueueCommand(payload: TelegramCommandJobPayload): Promise<void> {
    const route = this.commandRoutes[payload.command];
    await route.queue.add(route.jobName, payload, {
      jobId: this.buildJobId(payload.telegramUpdateId),
    });
  }

  private buildJobId(updateId: number): string {
    return `telegram-update-${updateId}`;
  }
}
