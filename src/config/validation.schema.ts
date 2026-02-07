import { z } from 'zod';

export const EnvironmentSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.preprocess((val) => Number(val), z.number().int().positive()),
  BOT_TOKEN: z.string().min(1).optional(),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_WEBHOOK_URL: z.string().url(),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1).default('1h'),
  INIT_DATA_MAX_AGE_SECONDS: z
    .preprocess((val) => Number(val), z.number().int().positive())
    .default(300),
  ENCRYPTION_KEY: z
    .string()
    .length(32, 'ENCRYPTION_KEY must be 32 bytes long for AES-256-GCM'),
});

export type EnvironmentVariables = z.infer<typeof EnvironmentSchema>;
