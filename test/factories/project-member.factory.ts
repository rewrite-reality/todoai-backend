import { ProjectMember, ProjectRole } from '@prisma/client';
import { prisma } from './prisma';
import { createTestProject } from './project.factory';
import { createTestUser } from './user.factory';

type ProjectMemberOverride = Partial<ProjectMember> & {
  projectId?: string;
  userId?: string;
  invitedByUserId?: string | null;
};

export async function createTestProjectMember(
  overrides: ProjectMemberOverride = {},
): Promise<ProjectMember> {
  const projectId = overrides.projectId ?? (await createTestProject()).id;
  const userId = overrides.userId ?? (await createTestUser()).id;

  return prisma.projectMember.create({
    data: {
      projectId,
      userId,
      role: overrides.role ?? ProjectRole.MEMBER,
      invitedByUserId: overrides.invitedByUserId ?? null,
      joinedAt: overrides.joinedAt ?? new Date(),
      deletedAt: overrides.deletedAt ?? null,
    },
  });
}
