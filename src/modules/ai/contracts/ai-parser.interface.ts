import type { ParseContext } from '../dto/parse-context.dto';
import type { ParsedTaskDto } from '../dto/parsed-task.dto';

export type AiTextParseContext = ParseContext;

export interface IAiParser {
  readonly provider: 'mock' | 'deepseek';
  parseText(input: string, context: AiTextParseContext): Promise<ParsedTaskDto>;
}
