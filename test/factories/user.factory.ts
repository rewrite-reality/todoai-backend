import { prisma } from './prisma';
import { SubscriptionTier, User } from '@prisma/client';
import { randomSentence } from './utils';

type UserOverride = Partial<User>;

export async function createTestUser(
  overrides: UserOverride = {},
): Promise<User> {
  return prisma.user.create({
    data: {
      telegramId:
        overrides.telegramId ??
        BigInt(Math.floor(1_000_000_000 + Math.random() * 8_999_999_999)),
      telegramName: overrides.telegramName ?? randomSentence(2),
      telegramPhoto: overrides.telegramPhoto ?? null,
      encryptedApiKey: overrides.encryptedApiKey ?? null,
      tier: overrides.tier ?? SubscriptionTier.FREE,
      aiCreditsUsed: overrides.aiCreditsUsed ?? 0,
      aiCreditsResetAt: overrides.aiCreditsResetAt ?? null,
      timezone: overrides.timezone ?? 'UTC',
      locale: overrides.locale ?? 'en',
      isOnboarded: overrides.isOnboarded ?? true,
    },
  });
}
