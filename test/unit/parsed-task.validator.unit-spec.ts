import { ParsedTaskSchema } from '../../src/modules/ai/validators/ai-output.validator';

describe('ParsedTaskSchema', () => {
  it('accepts a valid payload and defaults subtasks to empty array', () => {
    const parsed = ParsedTaskSchema.parse({
      tasks: [
        {
          title: 'Write sprint retrospective',
          summary: 'Collect notes from the whole team',
          deadline: '2026-02-08T10:00:00.000Z',
        },
      ],
    });

    expect(parsed.tasks).toHaveLength(1);
    expect(parsed.tasks[0].subtasks).toEqual([]);
  });

  it('rejects empty tasks list', () => {
    expect(() => ParsedTaskSchema.parse({ tasks: [] })).toThrow();
  });

  it('rejects more than 5 tasks', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: Array.from({ length: 6 }, (_, index) => ({
          title: `Task ${index + 1}`,
          subtasks: [],
        })),
      }),
    ).toThrow();
  });

  it('rejects title longer than 500 chars', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: [
          {
            title: 'a'.repeat(501),
            subtasks: [],
          },
        ],
      }),
    ).toThrow();
  });

  it('rejects summary longer than 2000 chars', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: [
          {
            title: 'Valid title',
            summary: 'a'.repeat(2001),
            subtasks: [],
          },
        ],
      }),
    ).toThrow();
  });

  it('rejects more than 20 subtasks in a task', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: [
          {
            title: 'Parent task',
            subtasks: Array.from({ length: 21 }, (_, index) => ({
              title: `Subtask ${index + 1}`,
              order: index,
            })),
          },
        ],
      }),
    ).toThrow();
  });

  it('rejects invalid deadline format', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: [
          {
            title: 'Prepare report',
            deadline: 'tomorrow',
            subtasks: [],
          },
        ],
      }),
    ).toThrow();
  });

  it('rejects subtask with empty title', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: [
          {
            title: 'Parent task',
            subtasks: [{ title: '   ', order: 0 }],
          },
        ],
      }),
    ).toThrow();
  });

  it('rejects subtask with negative order', () => {
    expect(() =>
      ParsedTaskSchema.parse({
        tasks: [
          {
            title: 'Parent task',
            subtasks: [{ title: 'Valid subtask', order: -1 }],
          },
        ],
      }),
    ).toThrow();
  });

  it('accepts nullable optional fields', () => {
    const parsed = ParsedTaskSchema.parse({
      tasks: [
        {
          title: 'Prepare release',
          deadline: null,
          projectHint: null,
          subtasks: [],
        },
      ],
    });

    expect(parsed.tasks[0].deadline).toBeNull();
    expect(parsed.tasks[0].projectHint).toBeNull();
  });
});
