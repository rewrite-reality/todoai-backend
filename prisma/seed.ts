import { PrismaClient, Task, ChatRole, InputType, TaskPriority, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.chatMessage.deleteMany();
  await prisma.subtask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const userAlice = await prisma.user.create({
    data: {
      telegramId: BigInt(10100000001),
      telegramName: 'Alice',
      telegramPhoto: null,
      timezone: 'UTC',
      locale: 'en',
      isOnboarded: true,
    },
  });

  const userBob = await prisma.user.create({
    data: {
      telegramId: BigInt(10100000002),
      telegramName: 'Bob',
      telegramPhoto: null,
      timezone: 'UTC',
      locale: 'en',
      isOnboarded: true,
    },
  });

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        userId: userAlice.id,
        name: 'Product Launch',
        description: 'Go-to-market launch tasks',
        emoji: '🚀',
        color: '#4f46e5',
      },
    }),
    prisma.project.create({
      data: {
        userId: userAlice.id,
        name: 'Tech Debt',
        description: 'Refactors and cleanup',
        emoji: '🧹',
        color: '#16a34a',
      },
    }),
    prisma.project.create({
      data: {
        userId: userBob.id,
        name: 'Growth Experiments',
        description: 'Weekly experiments',
        emoji: '📈',
        color: '#f59e0b',
      },
    }),
  ]);

  const taskSeeds = [
    {
      title: 'Prepare launch checklist',
      summary: 'Compile all required steps',
      userId: userAlice.id,
      projectId: projects[0].id,
      priority: TaskPriority.HIGH,
    },
    {
      title: 'Set up monitoring',
      summary: 'Baseline metrics for uptime',
      userId: userAlice.id,
      projectId: projects[0].id,
      priority: TaskPriority.URGENT,
    },
    {
      title: 'Refactor auth module',
      summary: 'Simplify guards and strategy wiring',
      userId: userAlice.id,
      projectId: projects[1].id,
      priority: TaskPriority.MEDIUM,
    },
    {
      title: 'Prototype onboarding experiment',
      summary: 'A/B test new onboarding copy',
      userId: userBob.id,
      projectId: projects[2].id,
      priority: TaskPriority.MEDIUM,
    },
    {
      title: 'Automate churn emails',
      summary: 'Triggered win-back flow',
      userId: userBob.id,
      projectId: projects[2].id,
      priority: TaskPriority.HIGH,
    },
  ];

  const tasks: Task[] = [];
  for (const seed of taskSeeds) {
    const task = await prisma.task.create({
      data: {
        ...seed,
        status: TaskStatus.TODO,
        originalInput: seed.summary,
        originalInputType: InputType.TEXT,
        estimatedMinutes: 60,
      },
    });

    await prisma.subtask.createMany({
      data: [
        {
          title: `${task.title} - step 1`,
          taskId: task.id,
          order: 0,
        },
        {
          title: `${task.title} - step 2`,
          taskId: task.id,
          order: 1,
        },
      ],
    });

    tasks.push(task);
  }

  const chatMessages = Array.from({ length: 10 }).map((_, idx) => ({
    taskId: tasks[idx % tasks.length].id,
    role: idx % 2 === 0 ? ChatRole.USER : ChatRole.ASSISTANT,
    content: idx % 2 === 0 ? 'User prompt #' + idx : 'Assistant reply #' + idx,
  }));

  await prisma.chatMessage.createMany({ data: chatMessages });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
