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
    jwtSecret: envVars.JWT_SECRET,
    encryptionKey: envVars.ENCRYPTION_KEY,
  };
};
