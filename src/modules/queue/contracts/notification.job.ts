import { z } from 'zod';

export const NotificationJobSchema = z.object({
  chatId: z.number().int(),
  text: z.string().min(1),
  parseMode: z.enum(['HTML', 'Markdown']).default('HTML'),
  correlationId: z.string().min(1),
});

export type NotificationJobData = z.infer<typeof NotificationJobSchema>;
