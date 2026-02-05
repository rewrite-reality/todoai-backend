// test-ai-manual.ts
import OpenAI from 'openai';
import { z } from 'zod';
import 'dotenv/config';

// Схема для валидации
const ParsedTaskSchema = z.object({
	title: z.string(),
	deadline: z.string().nullable(),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
	subtasks: z.array(z.object({ title: z.string() })),
	isIgnored: z.boolean(),
});

async function main() {
	console.log('Testing with URL:', process.env.AI_BASE_URL);

	const openai = new OpenAI({
		apiKey: process.env.AI_API_KEY,
		baseURL: process.env.AI_BASE_URL,
	});

	const isGoogle = process.env.AI_BASE_URL?.includes('googleapis');

	const systemPrompt =
		'You are a task parser. Return ONLY valid JSON (no markdown). ' +
		'Required JSON Structure:\n' +
		'{\n' +
		'  "title": "string (task name)",\n' +
		'  "deadline": "string (ISO 8601 date) or null",\n' +
		'  "priority": "LOW" | "MEDIUM" | "HIGH",\n' +
		'  "subtasks": [{"title": "string"}],\n' +
		'  "isIgnored": boolean\n' +
		'}';

	const params: any = {
		model: process.env.AI_MODEL || 'gemini-2.5-flash',
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: 'С чего завтра начать и какие основные этапы разработки приятного Todo AI ты выделишь? Пока я вижу прототип так, две страницы Tasks и Finance, в Tasks идут основные задачи, в эти задачи можно провалиться и ты сверху видишь суммаризацию задачи разбитую на этапы выполнения и снизу под текстом будут как бы еще Todo в виде подзадач, когда ты все их закрываешь ставишь галочки, у тебя автоматически завершается основная задача либо появляется кнопка завершить таску, ИИ чат в данном случае выполняет роль советника как мы уже с тобой говорили у него будет функция копирования контекста для того что бы легко перенести в другую ИИ, так же Apply to Plan, что бы обновлять план и вместе с ним новые подзадачи или обновление старых, и так же частичное удаление вопрос - ответ от ии, и полное удаление чата если такой понадобится. Так же главная фича это надиктовка в гс бота или текстом планов на следующий день и вот он уже разбивает день на задачи а внутри каждой задачи делает изначальный Plan + подзадачи. Так же я иду на 2 пары нужно будет моделировать систему в Acsocad используя Аппроксимация функции одной переменной по точкам на графике. Вечером приготовить поесть и убраться' },
		],
	};

	// Для Gemini OpenAI-совместимый endpoint не поддерживает response_format.
	if (!isGoogle) {
		params.response_format = { type: 'json_object' };
	}

	const response = await openai.chat.completions.create(params);

	const content = response.choices[0].message.content;
	console.log('Raw content:', content);

	if (content) {
		try {
			const cleaned = content
				.replace(/^```(?:json)?\s*/i, '')
				.replace(/\s*```$/i, '');
			const parsed = JSON.parse(cleaned);
			// Проверяем через Zod, что структура верная
			const validated = ParsedTaskSchema.parse(parsed);
			console.log('✅ Result (Validated):', JSON.stringify(validated, null, 2));
		} catch (e) {
			console.error('❌ Parsing Error:', e);
		}
	}
}

main();
