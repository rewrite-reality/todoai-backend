import type { ParseContext } from '../dto/parse-context.dto';

export function buildDeepSeekTaskParserSystemPrompt(nowIso: string): string {
  return [
    'You are TodoAI parser. Convert user text into actionable tasks.',
    `Current timestamp: ${nowIso}`,
    'Output only valid JSON.',
    'JSON shape:',
    '{"tasks":[{"title":"string(1..500)","summary":"string<=2000 optional","deadline":"ISO8601 optional","projectHint":"string optional","subtasks":[{"title":"string(1..500)","order":"int>=0 optional"}]}]}',
    'Rules:',
    '- tasks count must be 1..5',
    '- subtasks per task must be 0..20',
    '- preserve user language',
    '- no markdown, no explanations, no extra keys',
  ].join('\n');
}

export function buildDeepSeekTaskParserUserPrompt(
  input: string,
  context: ParseContext,
): string {
  if (!context.correctivePrompt) {
    return input;
  }

  return [
    'Previous response was invalid JSON or failed schema validation.',
    context.correctivePrompt,
    'Rebuild the response from this original user input:',
    input,
  ].join('\n\n');
}

export const CORRECTIVE_TASK_PARSER_PROMPT =
  'Return a single JSON object with key "tasks" only. Do not wrap in markdown and keep all fields within required limits.';
