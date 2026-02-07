import { z } from 'zod';

export const UserConnectionCommandJobSchema = z.object({
  telegramUpdateId: z.number().int().nonnegative(),
  telegramUserId: z.number().int(),
  telegramChatId: z.number().int(),
  telegramMessageId: z.number().int().nonnegative(),
  command: z.literal('/connect_user'),
  rawText: z.string().trim().min(1),
  correlationId: z.string().min(1),
});

export type UserConnectionCommandJobData = z.infer<
  typeof UserConnectionCommandJobSchema
>;
