import { z } from 'zod';

export const InviteDeclineCommandJobSchema = z.object({
  telegramUpdateId: z.number().int().nonnegative(),
  telegramUserId: z.number().int(),
  telegramChatId: z.number().int(),
  telegramMessageId: z.number().int().nonnegative(),
  command: z.literal('/decline_invite'),
  rawText: z.string().trim().min(1),
  correlationId: z.string().min(1),
});

export type InviteDeclineCommandJobData = z.infer<
  typeof InviteDeclineCommandJobSchema
>;
