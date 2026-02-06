import { z } from 'zod';

export const EnvironmentSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.preprocess((val) => Number(val), z.number().int().positive()),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z
    .string()
    .length(32, 'ENCRYPTION_KEY must be 32 bytes long for AES-256-GCM'),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentSchema>;
