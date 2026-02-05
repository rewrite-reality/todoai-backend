import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { TASK_PARSER_SYSTEM_PROMPT } from './prompts/task-parser.prompt';
import {
	ParsedTask,
	ParsedTaskSchema,
} from './validators/ai-output.validator';

@Injectable()
export class AiService {
	private readonly logger = new Logger(AiService.name);
	private readonly openai: OpenAI;

	constructor(private readonly config: ConfigService) {
		this.openai = new OpenAI({
			apiKey: this.config.get<string>('AI_API_KEY'),
			baseURL: this.config.get<string>('AI_BASE_URL'),
		});
	}

	async parseTask(input: string, timezone = 'UTC'): Promise<ParsedTask> {
		try {
			// Проверяем, используем ли мы Google (костыль для тестов)
			const isGoogle = this.config.get('AI_BASE_URL')?.includes('googleapis');

			const params: any = {
				model: this.config.get<string>('AI_MODEL', 'deepseek-chat'),
				messages: [
					{
						role: 'system',
						// Для Google добавляем явную просьбу вернуть JSON в тексте промпта
						content: TASK_PARSER_SYSTEM_PROMPT(new Date().toISOString(), timezone) + (isGoogle ? " RETURN ONLY RAW JSON." : ""),
					},
					{ role: 'user', content: input },
				],
			};

			// Если это НЕ Google, включаем строгий режим (DeepSeek/Timeweb/OpenAI)
			if (!isGoogle) {
				params.response_format = zodResponseFormat(ParsedTaskSchema, 'parsed_task');
			} else {
				// Для Google просим JSON Mode (старый способ)
				params.response_format = { type: 'json_object' };
			}

			const response = await this.openai.chat.completions.create(params);

			// Магия получения результата
			let parsed: ParsedTask | null = null;
			const message = response.choices[0]?.message;

			if (!isGoogle) {
				// 1. Если сработал Zod (DeepSeek)
				parsed = (message as unknown as { parsed?: ParsedTask })?.parsed ?? null;
			}

			if (!parsed && message?.content) {
				// 2. Если пришел текст (Google), парсим руками
				try {
					parsed = JSON.parse(message.content);
				} catch (e) {
					throw new Error('Failed to parse JSON string from AI');
				}
			}

			if (!parsed) {
				throw new Error('AI response missing data');
			}

			// На всякий случай прогоняем через Zod валидацию еще раз (для Google)
			// Чтобы убедиться, что типы верные
			return ParsedTaskSchema.parse(parsed);

		} catch (error) {
			this.logger.error(
				'Failed to parse task with AI',
				error instanceof Error ? error.stack : undefined,
			);

			const isLongInput = input.length > 100;
			const fallbackTitle = isLongInput
				? `${input.slice(0, 100)}...`
				: input;

			return {
				title: fallbackTitle,
				summary: isLongInput ? input : undefined,
				subtasks: [],
				priority: 'MEDIUM',
				isIgnored: false,
				deadline: null,
			};
		}
	}

}
