import { Global, Module, OnModuleDestroy } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { DEFAULT_JOB_OPTIONS, QUEUES } from './queues.config';
import { ObservabilityModule } from '../../common/observability/observability.module';
import { TaskParsingProcessor } from './processors/task-parsing.processor';
import { VoiceTranscriptionProcessor } from './processors/voice-transcription.processor';
import { NotificationProcessor } from './processors/notification.processor';
import { UserConnectionProcessor } from './processors/user-connection.processor';
import { InviteAcceptanceProcessor } from './processors/invite-acceptance.processor';
import { InviteDeclineProcessor } from './processors/invite-decline.processor';
import { AssigneeRevokeProcessor } from './processors/assignee-revoke.processor';
import { AssignmentsListProcessor } from './processors/assignments-list.processor';

@Global()
@Module({
  imports: [
    ObservabilityModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      {
        name: QUEUES.VOICE_TRANSCRIPTION,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.TASK_PARSING,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.NOTIFICATIONS,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.USER_CONNECTION,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.INVITE_ACCEPTANCE,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.INVITE_DECLINE,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.ASSIGNEE_REVOKE,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
      {
        name: QUEUES.ASSIGNMENTS_LIST,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
        forceDisconnectOnShutdown: true,
      },
    ),
  ],
  providers: [
    TaskParsingProcessor,
    VoiceTranscriptionProcessor,
    NotificationProcessor,
    UserConnectionProcessor,
    InviteAcceptanceProcessor,
    InviteDeclineProcessor,
    AssigneeRevokeProcessor,
    AssignmentsListProcessor,
  ],
  exports: [BullModule],
})
export class QueueModule implements OnModuleDestroy {
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
    private readonly taskParsingProcessor: TaskParsingProcessor,
    private readonly voiceTranscriptionProcessor: VoiceTranscriptionProcessor,
    private readonly notificationProcessor: NotificationProcessor,
    private readonly userConnectionProcessor: UserConnectionProcessor,
    private readonly inviteAcceptanceProcessor: InviteAcceptanceProcessor,
    private readonly inviteDeclineProcessor: InviteDeclineProcessor,
    private readonly assigneeRevokeProcessor: AssigneeRevokeProcessor,
    private readonly assignmentsListProcessor: AssignmentsListProcessor,
  ) {}

  async onModuleDestroy() {
    const workerCloseTasks = [
      this.closeWorker(this.taskParsingProcessor),
      this.closeWorker(this.voiceTranscriptionProcessor),
      this.closeWorker(this.notificationProcessor),
      this.closeWorker(this.userConnectionProcessor),
      this.closeWorker(this.inviteAcceptanceProcessor),
      this.closeWorker(this.inviteDeclineProcessor),
      this.closeWorker(this.assigneeRevokeProcessor),
      this.closeWorker(this.assignmentsListProcessor),
    ];

    const queueCloseTasks = [
      this.taskParsingQueue?.close(),
      this.voiceTranscriptionQueue?.close(),
      this.notificationsQueue?.close(),
      this.userConnectionQueue?.close(),
      this.inviteAcceptanceQueue?.close(),
      this.inviteDeclineQueue?.close(),
      this.assigneeRevokeQueue?.close(),
      this.assignmentsListQueue?.close(),
    ];

    await Promise.allSettled([...workerCloseTasks, ...queueCloseTasks]);
  }

  private async closeWorker(processor: {
    worker: { close: (force?: boolean) => Promise<void> };
  }) {
    try {
      await processor.worker.close(true);
    } catch {
      // Worker might already be closed or not initialized.
    }
  }
}
