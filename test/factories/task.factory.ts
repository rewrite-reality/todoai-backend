import { InputType, Task, TaskPriority, TaskStatus } from '@prisma/client';
import { prisma } from './prisma';
import { createTestProject } from './project.factory';
import { createTestUser } from './user.factory';
import { randomSentence } from './utils';

type TaskOverride = Partial<Task> & {
  userId?: string;
  projectId?: string;
  subtasksCount?: number;
};

export async function createTestTask(
  overrides: TaskOverride = {},
): Promise<Task & { subtasks: { id: string; title: string }[] }> {
  const userId = overrides.userId ?? (await createTestUser()).id;
  const projectId =
    overrides.projectId ?? (await createTestProject({ userId })).id;
  const subtasksCount = overrides.subtasksCount ?? 2;

  const task = await prisma.task.create({
    data: {
      userId,
      projectId,
      title: overrides.title ?? `Task ${randomSentence(3)}`,
      summary: overrides.summary ?? randomSentence(10),
      originalInput: overrides.originalInput ?? randomSentence(8),
      originalInputType: overrides.originalInputType ?? InputType.TEXT,
      status: overrides.status ?? TaskStatus.TODO,
      priority: overrides.priority ?? TaskPriority.MEDIUM,
      deadline: overrides.deadline ?? null,
      startDate: overrides.startDate ?? null,
      estimatedMinutes: overrides.estimatedMinutes ?? 30,
      order: overrides.order ?? 0,
      aiProcessedAt: overrides.aiProcessedAt ?? null,
      aiModelUsed: overrides.aiModelUsed ?? null,
      aiTokensUsed: overrides.aiTokensUsed ?? null,
      deletedAt: overrides.deletedAt ?? null,
    },
  });

  const subtasksData = Array.from({ length: subtasksCount }).map((_, idx) => ({
    title: `Subtask ${idx + 1} ${randomSentence(2)}`,
    order: idx,
    taskId: task.id,
  }));

  if (subtasksData.length > 0) {
    await prisma.subtask.createMany({ data: subtasksData });
  }

  const subtasks = await prisma.subtask.findMany({
    where: { taskId: task.id },
    orderBy: { order: 'asc' },
    select: { id: true, title: true },
  });

  return { ...task, subtasks };
}
