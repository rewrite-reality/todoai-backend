import { AssigneeStatus, InviteStatus, ProjectRole } from '@prisma/client';
import { closePrisma, prisma } from '../factories';
import {
  createTestInvite,
  createTestProjectMember,
  createTestTask,
  createTestTaskAssignee,
  createTestUser,
} from '../factories';

describe('Prisma factories', () => {
  afterAll(async () => {
    await closePrisma();
  });

  it('createTestUser creates user in DB and returns valid shape', async () => {
    const user = await createTestUser();
    const stored = await prisma.user.findUnique({ where: { id: user.id } });

    expect(stored).toBeDefined();
    expect(stored?.telegramId).toEqual(user.telegramId);
    expect(stored?.telegramName).toEqual(user.telegramName);
  });

  it('createTestTask with subtasks persists correctly', async () => {
    const task = await createTestTask({ subtasksCount: 3 });
    const subtasks = await prisma.subtask.findMany({
      where: { taskId: task.id },
    });

    expect(task.subtasks.length).toBe(3);
    expect(subtasks).toHaveLength(3);
  });

  it('createTestTaskAssignee creates assignee linked to task and users', async () => {
    const assignee = await createTestTaskAssignee({
      status: AssigneeStatus.CONNECTED,
    });

    const stored = await prisma.taskAssignee.findUnique({
      where: { id: assignee.id },
      include: {
        task: true,
        assignedBy: true,
        assignee: true,
      },
    });

    expect(stored).toBeDefined();
    expect(stored?.taskId).toBe(assignee.taskId);
    expect(stored?.assignedByUserId).toBe(assignee.assignedByUserId);
    expect(stored?.assigneeUserId).toBeDefined();
    expect(stored?.task).toBeDefined();
    expect(stored?.assignedBy).toBeDefined();
    expect(stored?.assignee).toBeDefined();
  });

  it('createTestInvite creates invite with valid token and expiry', async () => {
    const nowMs = Date.now();
    const invite = await createTestInvite({
      status: InviteStatus.PENDING,
    });

    expect(invite.token).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(invite.expiresAt.getTime()).toBeGreaterThan(nowMs);

    const stored = await prisma.invite.findUnique({
      where: { id: invite.id },
    });

    expect(stored).toBeDefined();
    expect(stored?.status).toBe(InviteStatus.PENDING);
  });

  it('createTestProjectMember creates membership with correct role', async () => {
    const projectMember = await createTestProjectMember({
      role: ProjectRole.ADMIN,
    });

    const stored = await prisma.projectMember.findUnique({
      where: { id: projectMember.id },
    });

    expect(stored).toBeDefined();
    expect(stored?.role).toBe(ProjectRole.ADMIN);
    expect(stored?.projectId).toBe(projectMember.projectId);
    expect(stored?.userId).toBe(projectMember.userId);
  });
});
