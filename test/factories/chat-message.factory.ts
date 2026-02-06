import { ChatMessage, ChatRole } from '@prisma/client';
import { prisma } from './prisma';
import { createTestTask } from './task.factory';
import { randomSentence } from './utils';

type ChatMessageOverride = Partial<ChatMessage> & { taskId?: string };

export async function createTestChatMessage(
  overrides: ChatMessageOverride = {},
): Promise<ChatMessage> {
  const taskId = overrides.taskId ?? (await createTestTask()).id;

  return prisma.chatMessage.create({
    data: {
      taskId,
      role: overrides.role ?? ChatRole.USER,
      content: overrides.content ?? randomSentence(12),
      isExcluded: overrides.isExcluded ?? false,
      aiModelUsed: overrides.aiModelUsed ?? null,
      aiTokensUsed: overrides.aiTokensUsed ?? null,
      appliedAt: overrides.appliedAt ?? null,
      mutationId: overrides.mutationId ?? null,
      deletedAt: overrides.deletedAt ?? null,
    },
  });
}
