import { AssigneeStatus, TaskAssignee } from '@prisma/client';
import { prisma } from './prisma';
import { createTestTask } from './task.factory';
import { createTestUser } from './user.factory';
import { randomWord } from './utils';

type TaskAssigneeOverride = Partial<TaskAssignee> & {
  taskId?: string;
  assignedByUserId?: string;
  assigneeUserId?: string | null;
};

function randomTelegramUsername() {
  return `${randomWord(6)}_${randomWord(4)}`.toLowerCase();
}

export async function createTestTaskAssignee(
  overrides: TaskAssigneeOverride = {},
): Promise<TaskAssignee> {
  const status = overrides.status ?? AssigneeStatus.PENDING;
  const taskId = overrides.taskId ?? (await createTestTask()).id;
  const assignedByUserId =
    overrides.assignedByUserId ?? (await createTestUser()).id;

  const assigneeUserId =
    overrides.assigneeUserId ??
    (status === AssigneeStatus.CONNECTED ? (await createTestUser()).id : null);

  return prisma.taskAssignee.create({
    data: {
      taskId,
      assignedByUserId,
      status,
      telegramUsername: overrides.telegramUsername ?? randomTelegramUsername(),
      assigneeUserId,
      invitedAt: overrides.invitedAt ?? new Date(),
      connectedAt:
        overrides.connectedAt ??
        (status === AssigneeStatus.CONNECTED ? new Date() : null),
      revokedAt: overrides.revokedAt ?? null,
      declinedAt: overrides.declinedAt ?? null,
      note: overrides.note ?? null,
      deletedAt: overrides.deletedAt ?? null,
    },
  });
}
