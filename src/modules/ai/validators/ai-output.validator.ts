import { z } from 'zod';

const IsoDateTimeSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Deadline must be a valid ISO 8601 date string',
  });

export const SingleTaskSchema = z.object({
  title: z.string().trim().min(1).max(500),
  deadline: IsoDateTimeSchema.nullable().optional(),
  summary: z.string().trim().max(2000).optional(),
  projectHint: z.string().trim().max(255).nullable().optional(),
  subtasks: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(500),
        order: z.number().int().nonnegative().optional(),
      }),
    )
    .max(20)
    .default([]),
});

export const ParsedTaskSchema = z.object({
  tasks: z.array(SingleTaskSchema).min(1).max(5),
});

export type ParsedTask = z.infer<typeof ParsedTaskSchema>;
export type SingleTask = z.infer<typeof SingleTaskSchema>;

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
