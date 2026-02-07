import { z } from 'zod';

export const StartNotificationCommandJobSchema = z.object({
  command: z.literal('/start'),
  telegramChatId: z.number().int(),
  correlationId: z.string().min(1),
});

export type StartNotificationCommandJobData = z.infer<
  typeof StartNotificationCommandJobSchema
>;
