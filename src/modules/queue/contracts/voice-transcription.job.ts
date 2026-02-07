import { z } from 'zod';

export const VoiceTranscriptionJobSchema = z.object({
  telegramUpdateId: z.number().int().nonnegative(),
  telegramUserId: z.number().int(),
  telegramChatId: z.number().int(),
  telegramMessageId: z.number().int().nonnegative(),
  telegramVoiceFileId: z.string().trim().min(1),
  correlationId: z.string().min(1),
});

export type VoiceTranscriptionJobData = z.infer<
  typeof VoiceTranscriptionJobSchema
>;
