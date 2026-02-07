import {
  buildDeepSeekTaskParserSystemPrompt,
  buildDeepSeekTaskParserUserPrompt,
  CORRECTIVE_TASK_PARSER_PROMPT,
} from '../../src/modules/ai/prompts/deepseek-task-parser.prompt';

describe('DeepSeek task parser prompt builder', () => {
  it('builds system prompt with schema and policy rules', () => {
    const nowIso = '2026-02-07T12:00:00.000Z';

    const prompt = buildDeepSeekTaskParserSystemPrompt(nowIso);

    expect(prompt).toContain(`Current timestamp: ${nowIso}`);
    expect(prompt).toContain('"tasks"');
    expect(prompt).toContain('tasks count must be 1..5');
    expect(prompt).toContain('subtasks per task must be 0..20');
    expect(prompt).toContain('preserve user language');
    expect(prompt).toContain('no markdown, no explanations, no extra keys');
  });

  it('returns raw user input when corrective prompt is absent', () => {
    const input = 'Сделай релиз завтра';

    const prompt = buildDeepSeekTaskParserUserPrompt(input, {
      correlationId: 'corr-1',
      attempt: 1,
    });

    expect(prompt).toBe(input);
  });

  it('builds corrective user prompt when corrective message is present', () => {
    const input = 'Разбей задачу на шаги';
    const corrective = 'Return strict JSON object';

    const prompt = buildDeepSeekTaskParserUserPrompt(input, {
      correlationId: 'corr-2',
      attempt: 2,
      correctivePrompt: corrective,
    });

    expect(prompt).toContain('Previous response was invalid JSON');
    expect(prompt).toContain(corrective);
    expect(prompt).toContain(input);
  });

  it('exports corrective prompt constant used for second attempt', () => {
    expect(CORRECTIVE_TASK_PARSER_PROMPT).toContain('"tasks"');
    expect(CORRECTIVE_TASK_PARSER_PROMPT).toContain('Do not wrap in markdown');
  });
});
