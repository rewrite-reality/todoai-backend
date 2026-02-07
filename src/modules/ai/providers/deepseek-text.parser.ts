import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZodError } from 'zod';
import { PinoLoggerService } from '../../../common/logger/pino-logger.service';
import {
  IAiParser,
  AiTextParseContext,
} from '../contracts/ai-parser.interface';
import type { ParsedTaskDto } from '../dto/parsed-task.dto';
import { AiParserError } from '../errors/ai-parser.error';
import {
  buildDeepSeekTaskParserSystemPrompt,
  buildDeepSeekTaskParserUserPrompt,
} from '../prompts/deepseek-task-parser.prompt';
import { parseJsonFromContent } from '../parsers/json-content.parser';
import { ParsedTaskSchema } from '../validators/ai-output.validator';

interface DeepSeekChoice {
  message?: {
    content?: string;
  };
}

interface DeepSeekChatCompletionResponse {
  choices?: DeepSeekChoice[];
}

@Injectable()
export class DeepSeekTextParser implements IAiParser {
  readonly provider = 'deepseek' as const;

  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly model: string;
  private readonly timeoutMs: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLoggerService,
  ) {
    this.apiKey =
      this.configService.get<string>('ai.deepseekApiKey') ??
      this.configService.get<string>('DEEPSEEK_API_KEY') ??
      process.env.DEEPSEEK_API_KEY ??
      '';
    this.baseUrl =
      this.configService.get<string>('ai.deepseekBaseUrl') ??
      this.configService.get<string>('DEEPSEEK_BASE_URL') ??
      process.env.DEEPSEEK_BASE_URL ??
      '';
    this.model =
      this.configService.get<string>('ai.deepseekModel') ??
      this.configService.get<string>('DEEPSEEK_MODEL') ??
      process.env.DEEPSEEK_MODEL ??
      'deepseek-chat';
    const legacyTimeoutMs = Number(process.env.AI_TIMEOUT_MS);
    this.timeoutMs =
      this.configService.get<number>('ai.timeoutMs') ??
      this.configService.get<number>('AI_TIMEOUT_MS') ??
      (Number.isFinite(legacyTimeoutMs) ? legacyTimeoutMs : undefined) ??
      30000;
  }

  async parseText(
    input: string,
    context: AiTextParseContext,
  ): Promise<ParsedTaskDto> {
    const endpoint = `${this.baseUrl}/chat/completions`;

    const body = {
      model: this.model,
      temperature: 0.1,
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content: buildDeepSeekTaskParserSystemPrompt(
            new Date().toISOString(),
          ),
        },
        {
          role: 'user',
          content: buildDeepSeekTaskParserUserPrompt(input, context),
        },
      ],
    };

    this.logger.debug?.({
      msg: 'DeepSeek parse request prepared',
      provider: this.provider,
      model: this.model,
      promptLength: JSON.stringify(body.messages).length,
      attempt: context.attempt,
      correlationId: context.correlationId,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (error: unknown) {
      if (this.isAbortError(error)) {
        throw new AiParserError(
          'AI_PARSE_TIMEOUT',
          'AI provider request timed out',
          {
            retriable: true,
            cause: error,
          },
        );
      }

      throw new AiParserError(
        'AI_PARSE_PROVIDER_ERROR',
        'AI provider request failed',
        {
          retriable: true,
          cause: error,
        },
      );
    } finally {
      clearTimeout(timeout);
    }

    if (response.status === 429) {
      const responseBody = await this.safeReadResponseText(response);
      throw new AiParserError(
        'AI_PARSE_RATE_LIMIT',
        'AI provider rate limit exceeded',
        {
          retriable: true,
          details: {
            status: response.status,
            body: responseBody,
          },
        },
      );
    }

    if (response.status >= 500) {
      const responseBody = await this.safeReadResponseText(response);
      throw new AiParserError(
        'AI_PARSE_PROVIDER_ERROR',
        'AI provider server error',
        {
          retriable: true,
          details: {
            status: response.status,
            body: responseBody,
          },
        },
      );
    }

    if (!response.ok) {
      const responseBody = await this.safeReadResponseText(response);
      throw new AiParserError(
        'AI_PARSE_PROVIDER_ERROR',
        `AI provider returned status ${response.status}`,
        {
          retriable: false,
          details: {
            status: response.status,
            body: responseBody,
          },
        },
      );
    }

    let responseBody: DeepSeekChatCompletionResponse;
    try {
      responseBody = (await response.json()) as DeepSeekChatCompletionResponse;
    } catch (error: unknown) {
      throw new AiParserError(
        'AI_PARSE_PROVIDER_ERROR',
        'AI provider returned unreadable JSON response',
        {
          retriable: true,
          cause: error,
        },
      );
    }

    const content = responseBody.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new AiParserError(
        'AI_PARSE_PROVIDER_ERROR',
        'AI provider returned empty completion content',
        { retriable: true },
      );
    }

    const parsedJson = parseJsonFromContent(content);

    try {
      return ParsedTaskSchema.parse(parsedJson);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw new AiParserError(
          'AI_PARSE_ZOD_VALIDATION',
          'AI output does not match task schema',
          {
            retriable: false,
            details: error.issues,
          },
        );
      }

      throw error;
    }
  }

  private isAbortError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'AbortError'
    );
  }

  private async safeReadResponseText(response: Response): Promise<string> {
    try {
      const text = await response.text();
      return text.slice(0, 2000);
    } catch {
      return '';
    }
  }
}
