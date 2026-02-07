import { randomUUID } from 'crypto';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AssigneeStatus, InviteStatus } from '@prisma/client';
import { ObservabilityModule } from '../../src/common/observability/observability.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Sprint 2 schema and migration checks (integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let telegramIdSeq = BigInt(991000000000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ObservabilityModule,
        PrismaModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  async function createUser(prefix: string) {
    telegramIdSeq += 1n;
    return prisma.user.create({
      data: {
        telegramId: telegramIdSeq,
        telegramName: `${prefix}-${telegramIdSeq.toString()}`,
      },
    });
  }

  it('TaskStatus enum contains PARSE_FAILED', async () => {
    const rows = await prisma.$queryRawUnsafe<Array<{ enumlabel: string }>>(`
      SELECT e.enumlabel
      FROM pg_type t
      JOIN pg_enum e ON e.enumtypid = t.oid
      WHERE t.typname = 'TaskStatus'
      ORDER BY e.enumsortorder
    `);

    expect(rows.map((row) => row.enumlabel)).toContain('PARSE_FAILED');
  });

  it('required Sprint 2 tables exist', async () => {
    const rows = await prisma.$queryRawUnsafe<Array<{ table_name: string }>>(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('task_assignees', 'invites', 'project_members')
      ORDER BY table_name
    `);

    expect(rows.map((row) => row.table_name)).toEqual([
      'invites',
      'project_members',
      'task_assignees',
    ]);
  });

  it('required partial indexes exist', async () => {
    const rows = await prisma.$queryRawUnsafe<Array<{ indexname: string }>>(`
      SELECT indexname
      FROM pg_indexes
      WHERE schemaname = 'public'
        AND indexname IN (
          'uq_task_assignee_active',
          'uq_task_assignee_pending_username',
          'uq_project_member_active'
        )
      ORDER BY indexname
    `);

    expect(rows.map((row) => row.indexname)).toEqual([
      'uq_project_member_active',
      'uq_task_assignee_active',
      'uq_task_assignee_pending_username',
    ]);
  });

  it('enforces uq_task_assignee_active uniqueness per active task assignment', async () => {
    const owner = await createUser('owner');
    const firstCandidate = await createUser('candidate-a');
    const secondCandidate = await createUser('candidate-b');
    const task = await prisma.task.create({
      data: {
        userId: owner.id,
        title: `Task ${randomUUID()}`,
      },
    });

    await prisma.taskAssignee.create({
      data: {
        taskId: task.id,
        assignedByUserId: owner.id,
        assigneeUserId: firstCandidate.id,
        status: AssigneeStatus.CONNECTED,
        telegramUsername: 'candidatea',
        connectedAt: new Date(),
      },
    });

    await expect(
      prisma.taskAssignee.create({
        data: {
          taskId: task.id,
          assignedByUserId: owner.id,
          assigneeUserId: secondCandidate.id,
          status: AssigneeStatus.CONNECTED,
          telegramUsername: 'candidateb',
          connectedAt: new Date(),
        },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('enforces uq_task_assignee_pending_username uniqueness for same task + username', async () => {
    const owner = await createUser('owner-pending');
    const task = await prisma.task.create({
      data: {
        userId: owner.id,
        title: `Task ${randomUUID()}`,
      },
    });

    await prisma.taskAssignee.create({
      data: {
        taskId: task.id,
        assignedByUserId: owner.id,
        status: AssigneeStatus.PENDING,
        telegramUsername: 'pending_user',
      },
    });

    await expect(
      prisma.taskAssignee.create({
        data: {
          taskId: task.id,
          assignedByUserId: owner.id,
          status: AssigneeStatus.PENDING,
          telegramUsername: 'pending_user',
        },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('enforces uq_project_member_active uniqueness for project + user pair', async () => {
    const owner = await createUser('project-owner');
    const project = await prisma.project.create({
      data: {
        name: `Project ${randomUUID()}`,
        userId: owner.id,
      },
    });

    await prisma.projectMember.create({
      data: {
        projectId: project.id,
        userId: owner.id,
      },
    });

    await expect(
      prisma.projectMember.create({
        data: {
          projectId: project.id,
          userId: owner.id,
        },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
  });

  it('stores invite status enum values from sprint schema', async () => {
    const owner = await createUser('invite-owner');
    const invite = await prisma.invite.create({
      data: {
        token: randomUUID(),
        createdByUserId: owner.id,
        targetTelegramUsername: 'invite_target',
        status: InviteStatus.PENDING,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    expect(invite.status).toBe(InviteStatus.PENDING);
  });
});
