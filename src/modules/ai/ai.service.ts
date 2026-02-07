import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import type { ParsedTaskDto } from './dto/parsed-task.dto';
import { buildDeepSeekTaskParserSystemPrompt } from './prompts/deepseek-task-parser.prompt';
import { ParsedTaskSchema } from './validators/ai-output.validator';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI;
  private readonly model: string;
  private readonly baseUrl: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('AI_BASE_URL');
    this.model = this.configService.get<string>('AI_MODEL') ?? 'gpt-4o-mini';

    this.client = new OpenAI({
      apiKey: this.configService.get<string>('AI_API_KEY'),
      baseURL: this.baseUrl,
    });
  }

  async parseTask(input: string, timezone = 'UTC'): Promise<ParsedTaskDto> {
    try {
      const isGoogle = this.baseUrl?.includes('googleapis') ?? false;
      const safeTimezone = timezone?.trim() || 'UTC';
      const systemPrompt = [
        buildDeepSeekTaskParserSystemPrompt(new Date().toISOString()),
        `User timezone: ${safeTimezone}`,
        isGoogle ? 'RETURN ONLY VALID JSON.' : '',
      ]
        .filter((line) => line.length > 0)
        .join('\n');

      if (isGoogle) {
        const response = await this.client.chat.completions.create({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input },
          ],
          response_format: { type: 'json_object' },
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error('Empty AI response content');
        }

        const cleaned = content
          .trim()
          .replace(/^```(?:json)?\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim();

        const parsed = JSON.parse(cleaned) as unknown;
        return ParsedTaskSchema.parse(parsed);
      }

      const response = await this.client.chat.completions.parse({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input },
        ],
        response_format: zodResponseFormat(ParsedTaskSchema, 'parsed_task'),
      });

      const parsed = response.choices[0]?.message?.parsed;
      return ParsedTaskSchema.parse(parsed);
    } catch (error) {
      this.logger.warn(
        `AI parseTask failed, using fallback: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );

      const normalizedInput = input?.trim() ?? '';
      const title = normalizedInput.slice(0, 100);
      const isTruncated = normalizedInput.length > 100;

      const fallback: ParsedTaskDto = {
        tasks: [
          {
            title: title || 'Untitled task',
            deadline: null,
            summary: isTruncated ? normalizedInput : undefined,
            subtasks: [],
          },
        ],
      };

      return fallback;
    }
  }
}
