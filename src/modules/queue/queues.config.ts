import { RegisterQueueOptions } from '@nestjs/bullmq';

export const DEFAULT_JOB_OPTIONS: RegisterQueueOptions['defaultJobOptions'] = {
  attempts: 3, // 3 попытки при неудаче
  backoff: {
    type: 'exponential',
    delay: 1000, // 1s, 2s, 4s...
  },
  removeOnComplete: {
    age: 3600, // хранить час после успеха
    count: 100, // или максимум 100 последних
  },
  removeOnFail: {
    age: 24 * 3600, // хранить сутки после падения для дебага
  },
};

export const QUEUES = {
  TELEGRAM_UPDATES: 'telegram-updates',
  VOICE_TRANSCRIPTION: 'voice-transcription',
  TASK_PARSING: 'task-parsing',
  NOTIFICATIONS: 'notifications',
  USER_CONNECTION: 'user-connection',
  INVITE_ACCEPTANCE: 'invite-acceptance',
  INVITE_DECLINE: 'invite-decline',
  ASSIGNEE_REVOKE: 'assignee-revoke',
  ASSIGNMENTS_LIST: 'assignments-list',
} as const;
