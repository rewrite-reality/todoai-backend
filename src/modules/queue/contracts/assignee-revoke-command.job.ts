import { z } from 'zod';

export const AssigneeRevokeCommandJobSchema = z.object({
  telegramUpdateId: z.number().int().nonnegative(),
  telegramUserId: z.number().int(),
  telegramChatId: z.number().int(),
  telegramMessageId: z.number().int().nonnegative(),
  command: z.literal('/revoke_assignee'),
  rawText: z.string().trim().min(1),
  correlationId: z.string().min(1),
});

export type AssigneeRevokeCommandJobData = z.infer<
  typeof AssigneeRevokeCommandJobSchema
>;
