import { z } from 'zod';

// Схема одной задачи (вспомогательная)
export const SingleTaskSchema = z.object({
  title: z.string().describe('Clear action title'),
  deadline: z.string().datetime().nullable().describe('ISO 8601 date or null'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  summary: z.string().optional().describe('Markdown description'),
  subtasks: z
    .array(
      z.object({
        title: z.string().describe('Concise subtask title'),
        order: z.number().int().optional(),
      }),
    )
    .max(10)
    .describe('List of steps/checklist'),
});

// Основная схема ответа (Экспортируем её)
export const ParsedTaskSchema = z.object({
  // Массив задач!
  tasks: z.array(SingleTaskSchema).describe('List of detected distinct tasks'),
  isIgnored: z.boolean().default(false).describe('True if input is garbage'),
});

export type ParsedTask = z.infer<typeof ParsedTaskSchema>;
export type SingleTask = z.infer<typeof SingleTaskSchema>;

// Остальные схемы (MutationResult) оставь как были
export const MutationResultSchema = z.object({
  newSummary: z.string(),
  subtasks: z.array(
    z.object({
      title: z.string(),
      action: z.enum(['keep', 'create', 'update', 'delete']),
      originalIndex: z.number().optional(),
    }),
  ),
});
export type MutationResult = z.infer<typeof MutationResultSchema>;
