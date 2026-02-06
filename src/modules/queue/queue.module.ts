import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue(
      { name: QUEUES.TELEGRAM_UPDATES, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      {
        name: QUEUES.VOICE_TRANSCRIPTION,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
      },
      { name: QUEUES.TASK_PARSING, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      { name: QUEUES.NOTIFICATIONS, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      { name: QUEUES.USER_CONNECTION, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      {
        name: QUEUES.INVITE_ACCEPTANCE,
        defaultJobOptions: DEFAULT_JOB_OPTIONS,
      },
      { name: QUEUES.INVITE_DECLINE, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      { name: QUEUES.ASSIGNEE_REVOKE, defaultJobOptions: DEFAULT_JOB_OPTIONS },
      { name: QUEUES.ASSIGNMENTS_LIST, defaultJobOptions: DEFAULT_JOB_OPTIONS },
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
export class QueueModule {}
