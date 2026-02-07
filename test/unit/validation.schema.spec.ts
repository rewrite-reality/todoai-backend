import { EnvironmentSchema } from '../../src/config/validation.schema';

describe('EnvironmentSchema', () => {
  it('fails when TELEGRAM_WEBHOOK_URL is missing', () => {
    const envWithoutWebhookUrl = {
      ...process.env,
      TELEGRAM_WEBHOOK_URL: undefined,
    };

    expect(() => EnvironmentSchema.parse(envWithoutWebhookUrl)).toThrow();
  });
});
