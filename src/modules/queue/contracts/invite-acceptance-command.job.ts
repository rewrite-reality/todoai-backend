import { z } from 'zod';

export const InviteAcceptanceCommandJobSchema = z.object({
  telegramUpdateId: z.number().int().nonnegative(),
  telegramUserId: z.number().int(),
  telegramChatId: z.number().int(),
  telegramMessageId: z.number().int().nonnegative(),
  command: z.literal('/accept_invite'),
  rawText: z.string().trim().min(1),
  correlationId: z.string().min(1),
});

export type InviteAcceptanceCommandJobData = z.infer<
  typeof InviteAcceptanceCommandJobSchema
>;
