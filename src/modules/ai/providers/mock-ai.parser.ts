import { Injectable } from '@nestjs/common';
import {
  IAiParser,
  AiTextParseContext,
} from '../contracts/ai-parser.interface';
import type { ParsedTaskDto } from '../dto/parsed-task.dto';
import { AiParserError } from '../errors/ai-parser.error';
import {
  ParsedTaskSchema,
  SingleTask,
} from '../validators/ai-output.validator';

@Injectable()
export class MockAiParser implements IAiParser {
  readonly provider = 'mock' as const;

  parseText(
    input: string,
    context: AiTextParseContext,
  ): Promise<ParsedTaskDto> {
    const normalized = input.trim();

    if (!normalized) {
      throw new AiParserError(
        'AI_PARSE_ZOD_VALIDATION',
        'Input text cannot be empty for parser',
      );
    }

    if (normalized.includes('[[mock-provider-error]]')) {
      throw new AiParserError(
        'AI_PARSE_PROVIDER_ERROR',
        'Mock provider transient failure',
        { retriable: true },
      );
    }

    if (
      normalized.includes('[[mock-invalid-json]]') &&
      !context.correctivePrompt
    ) {
      throw new AiParserError(
        'AI_PARSE_INVALID_JSON',
        'Mock provider produced invalid JSON on first attempt',
      );
    }

    if (
      normalized.includes('[[mock-zod-error]]') &&
      !context.correctivePrompt
    ) {
      throw new AiParserError(
        'AI_PARSE_ZOD_VALIDATION',
        'Mock provider produced schema-invalid payload on first attempt',
      );
    }

    const sanitizedInput = normalized
      .replaceAll('[[mock-invalid-json]]', '')
      .replaceAll('[[mock-zod-error]]', '')
      .replaceAll('[[mock-provider-error]]', '')
      .trim();

    const chunks = sanitizedInput
      .split(/\n{2,}|\s*;\s*/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .slice(0, 5);

    const sourceChunks = chunks.length > 0 ? chunks : [sanitizedInput];

    const tasks: SingleTask[] = sourceChunks.map((chunk) => {
      const [rawTitle, rawSubtasks] = chunk.split(':', 2);
      const title = (rawTitle ?? chunk).trim();
      const subtasks =
        rawSubtasks
          ?.split(',')
          .map((subtask) => subtask.trim())
          .filter((subtask) => subtask.length > 0)
          .slice(0, 20)
          .map((subtask, index) => ({ title: subtask, order: index })) ?? [];

      return {
        title: title.length > 0 ? title : 'Untitled task',
        subtasks,
      };
    });

    return Promise.resolve(ParsedTaskSchema.parse({ tasks }));
  }
}
