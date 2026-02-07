import { Injectable } from '@nestjs/common';
import { InputType, Prisma, TaskStatus } from '@prisma/client';
import { PinoLoggerService } from '../../../../common/logger/pino-logger.service';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { ParsedTaskDto } from '../../../ai/dto/parsed-task.dto';
import { TaskParsingJobData } from '../../contracts/task-parsing.job';
import { buildTaskIdFromIdempotencyKey } from '../../utils/deterministic-uuid.util';
import type { CreateTasksCommand } from './dto/create-tasks.command';

export interface PersistedTaskRecord {
  id: string;
  title: string;
}

export interface ExistingTaskRecord extends PersistedTaskRecord {
  status: TaskStatus;
}

@Injectable()
export class TaskParsingPersistenceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: PinoLoggerService,
  ) {}

  async createParsedTasks(
    payload: TaskParsingJobData,
    parsedTask: ParsedTaskDto,
  ): Promise<PersistedTaskRecord[] | null> {
    const command: CreateTasksCommand = {
      userId: payload.userId,
      originalInput: payload.text,
      originalInputType: InputType.TEXT,
      idempotencyKey: payload.idempotencyKey,
      tasks: parsedTask.tasks,
    };

    return this.createTasks(command);
  }

  async createTasks(
    command: CreateTasksCommand,
  ): Promise<PersistedTaskRecord[] | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const createdTasks: PersistedTaskRecord[] = [];
        const nextOrder = await this.getNextInboxOrder(tx, command.userId);

        for (const [index, task] of command.tasks.entries()) {
          const taskId = buildTaskIdFromIdempotencyKey(
            command.idempotencyKey,
            index,
          );

          const createdTask = await tx.task.create({
            data: {
              id: taskId,
              userId: command.userId,
              title: task.title,
              summary: task.summary,
              deadline: task.deadline ? new Date(task.deadline) : null,
              order: nextOrder + index,
              status: TaskStatus.TODO,
              originalInput: command.originalInput,
              originalInputType: command.originalInputType,
            },
            select: {
              id: true,
              title: true,
            },
          });

          if (task.subtasks.length > 0) {
            await tx.subtask.createMany({
              data: task.subtasks.map((subtask, subtaskIndex) => ({
                taskId: createdTask.id,
                title: subtask.title,
                order: subtask.order ?? subtaskIndex,
              })),
            });
          }

          createdTasks.push(createdTask);
        }

        return createdTasks;
      });
    } catch (error: unknown) {
      if (this.isTaskIdDuplicate(error)) {
        return null;
      }

      this.logger.error({
        msg: 'Failed to persist parsed tasks',
        code: 'TASK_CREATE_FAILED',
        idempotencyKey: command.idempotencyKey,
        error,
      });
      throw new Error('TASK_CREATE_FAILED');
    }
  }

  async createFallbackTask(
    payload: TaskParsingJobData,
  ): Promise<{ id: string } | null> {
    const fallbackTaskId = buildTaskIdFromIdempotencyKey(
      payload.idempotencyKey,
      0,
    );

    try {
      return await this.prisma.$transaction(async (tx) => {
        const nextOrder = await this.getNextInboxOrder(tx, payload.userId);
        return tx.task.create({
          data: {
            id: fallbackTaskId,
            userId: payload.userId,
            title: this.buildFallbackTitle(payload.text),
            summary: null,
            order: nextOrder,
            status: TaskStatus.PARSE_FAILED,
            originalInput: payload.text,
            originalInputType: InputType.TEXT,
          },
          select: { id: true },
        });
      });
    } catch (error: unknown) {
      if (this.isTaskIdDuplicate(error)) {
        return null;
      }

      this.logger.error({
        msg: 'Failed to persist fallback task',
        code: 'TASK_CREATE_FAILED',
        idempotencyKey: payload.idempotencyKey,
        error,
      });
      throw new Error('TASK_CREATE_FAILED');
    }
  }

  async loadExistingTasksByIdempotencyKey(
    idempotencyKey: string,
  ): Promise<ExistingTaskRecord[]> {
    return this.prisma.task.findMany({
      where: {
        id: {
          in: Array.from({ length: 5 }, (_, index) =>
            buildTaskIdFromIdempotencyKey(idempotencyKey, index),
          ),
        },
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  private isPrismaDuplicate(error: unknown): boolean {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    );
  }

  private isTaskIdDuplicate(error: unknown): boolean {
    if (!this.isPrismaDuplicate(error)) {
      return false;
    }

    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    const target = prismaError.meta?.['target'];

    if (Array.isArray(target)) {
      return target.some((entry) => String(entry).toLowerCase().includes('id'));
    }

    if (typeof target === 'string') {
      const normalized = target.toLowerCase();
      return normalized.includes('id') || normalized.includes('pkey');
    }

    return false;
  }

  private buildFallbackTitle(text: string): string {
    const normalized = text.trim();
    if (normalized.length === 0) {
      return 'Untitled task';
    }

    return normalized.slice(0, 500);
  }

  private async getNextInboxOrder(
    tx: Prisma.TransactionClient,
    userId: string,
  ): Promise<number> {
    const lastInboxTask = await tx.task.findFirst({
      where: {
        userId,
        projectId: null,
        deletedAt: null,
      },
      select: {
        order: true,
      },
      orderBy: {
        order: 'desc',
      },
    });

    return (lastInboxTask?.order ?? -1) + 1;
  }
}
