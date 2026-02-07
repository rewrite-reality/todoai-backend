import { z } from 'zod';

export const TaskParsingJobSchema = z.object({
  userId: z.string().uuid(),
  text: z.string().trim().min(1),
  telegramMessageId: z.number().int().nonnegative(),
  telegramChatId: z.number().int(),
  correlationId: z.string().min(1),
  idempotencyKey: z.string().min(1),
});

export type TaskParsingJobData = z.infer<typeof TaskParsingJobSchema>;
