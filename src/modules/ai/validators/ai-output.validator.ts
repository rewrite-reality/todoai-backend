import { z } from 'zod';

export const ParsedTaskSchema = z.object({
	title: z.string().min(1),
	deadline: z.string().datetime().nullable(),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
	summary: z.string().optional(),
	subtasks: z
		.array(
			z.object({
				title: z.string().min(1),
				order: z.number().int().optional(),
			}),
		)
		.max(10),
	isIgnored: z.boolean().default(false),
});

export type ParsedTask = z.infer<typeof ParsedTaskSchema>;

export const MutationResultSchema = z.object({
	newSummary: z.string(),
	subtasks: z.array(
		z.object({
			title: z.string().min(1),
			action: z.enum(['keep', 'create', 'update', 'delete']),
		}),
	),
});

export type MutationResult = z.infer<typeof MutationResultSchema>;
