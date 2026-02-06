import { Project } from '@prisma/client';
import { createTestUser } from './user.factory';
import { prisma } from './prisma';
import { randomEmoji, randomSentence } from './utils';

type ProjectOverride = Partial<Project> & { userId?: string };

export async function createTestProject(
  overrides: ProjectOverride = {},
): Promise<Project> {
  const userId = overrides.userId ?? (await createTestUser()).id;

  return prisma.project.create({
    data: {
      userId,
      name: overrides.name ?? `Project ${randomSentence(1)}`,
      description: overrides.description ?? randomSentence(8),
      emoji: overrides.emoji ?? randomEmoji(),
      color: overrides.color ?? '#3366ff',
      aiContext: overrides.aiContext ?? null,
      order: overrides.order ?? 0,
      parentId: overrides.parentId ?? null,
      isArchived: overrides.isArchived ?? false,
      deletedAt: overrides.deletedAt ?? null,
    },
  });
}
