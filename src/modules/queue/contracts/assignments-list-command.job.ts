import { z } from 'zod';

export const AssignmentsListCommandJobSchema = z.object({
  telegramUpdateId: z.number().int().nonnegative(),
  telegramUserId: z.number().int(),
  telegramChatId: z.number().int(),
  telegramMessageId: z.number().int().nonnegative(),
  command: z.literal('/my_assignments'),
  rawText: z.string().trim().min(1),
  correlationId: z.string().min(1),
});

export type AssignmentsListCommandJobData = z.infer<
  typeof AssignmentsListCommandJobSchema
>;
