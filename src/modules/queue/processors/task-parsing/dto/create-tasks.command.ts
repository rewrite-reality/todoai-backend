import type { InputType } from '@prisma/client';
import type { ParsedTaskDto } from '../../../../ai/dto/parsed-task.dto';

export type CreateTasksCommand = {
  userId: string;
  originalInput: string;
  originalInputType: InputType;
  idempotencyKey: string;
  tasks: ParsedTaskDto['tasks'];
};
