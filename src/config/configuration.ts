import { EnvironmentSchema } from './validation.schema';

export default () => {
  const envVars = EnvironmentSchema.parse(process.env);
  return {
    databaseUrl: envVars.DATABASE_URL,
    redis: {
      host: envVars.REDIS_HOST,
      port: envVars.REDIS_PORT,
    },
    telegram: {
      botToken: envVars.TELEGRAM_BOT_TOKEN,
      webhookSecret: envVars.TELEGRAM_WEBHOOK_SECRET,
    },
    botToken: envVars.BOT_TOKEN ?? envVars.TELEGRAM_BOT_TOKEN,
    jwtSecret: envVars.JWT_SECRET,
    jwtExpiresIn: envVars.JWT_EXPIRES_IN,
    initDataMaxAgeSeconds: envVars.INIT_DATA_MAX_AGE_SECONDS,
    encryptionKey: envVars.ENCRYPTION_KEY,
    ai: {
      textProvider: envVars.AI_TEXT_PROVIDER,
      deepseekApiKey: envVars.DEEPSEEK_API_KEY,
      deepseekBaseUrl: envVars.DEEPSEEK_BASE_URL,
      deepseekModel: envVars.DEEPSEEK_MODEL,
      timeoutMs: envVars.AI_TIMEOUT_MS,
    },
  };
};
