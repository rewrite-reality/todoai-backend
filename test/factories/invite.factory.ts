import { Invite, InviteScope, InviteStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { prisma } from './prisma';
import { createTestUser } from './user.factory';
import { randomWord } from './utils';

type InviteOverride = Partial<Invite> & {
  createdByUserId?: string;
};

function randomTelegramUsername() {
  return `${randomWord(6)}_${randomWord(4)}`.toLowerCase();
}

function createFutureDate(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function randomTelegramId() {
  return BigInt(Math.floor(1_000_000_000 + Math.random() * 8_999_999_999));
}

export async function createTestInvite(
  overrides: InviteOverride = {},
): Promise<Invite> {
  const status = overrides.status ?? InviteStatus.PENDING;
  const createdByUserId =
    overrides.createdByUserId ?? (await createTestUser()).id;

  return prisma.invite.create({
    data: {
      token: overrides.token ?? randomUUID(),
      createdByUserId,
      targetTelegramUsername:
        overrides.targetTelegramUsername ?? randomTelegramUsername(),
      targetTelegramId:
        overrides.targetTelegramId ??
        (status === InviteStatus.ACCEPTED ? randomTelegramId() : null),
      status,
      expiresAt: overrides.expiresAt ?? createFutureDate(7),
      usedAt:
        overrides.usedAt ??
        (status === InviteStatus.ACCEPTED ? new Date() : null),
      revokedAt: overrides.revokedAt ?? null,
      scope: overrides.scope ?? InviteScope.USER_ONLY,
      projectId: overrides.projectId ?? null,
      metadata: overrides.metadata ?? null,
    },
  });
}
