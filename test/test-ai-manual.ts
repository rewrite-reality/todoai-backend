// test-ai-manual.ts
import OpenAI from 'openai';
import { z } from 'zod';
import 'dotenv/config';

// 1. ОБНОВЛЕННАЯ СХЕМА (как в проекте)
const SingleTaskSchema = z.object({
	title: z.string(),
	deadline: z.string().nullable(),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
	subtasks: z.array(z.object({ title: z.string() })),
});

const ParsedTaskSchema = z.object({
	// Ожидаем массив задач
	tasks: z.array(SingleTaskSchema),
	isIgnored: z.boolean(),
});

async function main() {
	console.log('Testing with URL:', process.env.AI_BASE_URL);

	const openai = new OpenAI({
		apiKey: process.env.AI_API_KEY,
		baseURL: process.env.AI_BASE_URL,
	});

	const isGoogle = process.env.AI_BASE_URL?.includes('googleapis');

	// 2. ОБНОВЛЕННЫЙ ПРОМПТ (просим вернуть массив)
	const systemPrompt = `
  You are a GTD assistant.
  GOAL: Split the user input into DISTINCT tasks if they are unrelated (e.g. Work and Chores).
  
  Return ONLY valid JSON (no markdown).
  Required JSON Structure:
  {
    "tasks": [
       {
         "title": "string",
         "deadline": "string (ISO 8601) or null",
         "priority": "LOW" | "MEDIUM" | "HIGH",
         "subtasks": [{"title": "string"}]
       }
    ],
    "isIgnored": boolean
  }
  `;

	const params: any = {
		model: process.env.AI_MODEL || 'gemini-2.5-flash-lite',
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: 'С чего завтра начать и какие основные этапы разработки приятного Todo AI ты выделишь? Пока я вижу прототип так, две страницы Tasks и Finance, в Tasks идут основные задачи, в эти задачи можно провалиться и ты сверху видишь суммаризацию задачи разбитую на этапы выполнения и снизу под текстом будут как бы еще Todo в виде подзадач, когда ты все их закрываешь ставишь галочки, у тебя автоматически завершается основная задача либо появляется кнопка завершить таску, ИИ чат в данном случае выполняет роль советника как мы уже с тобой говорили у него будет функция копирования контекста для того что бы легко перенести в другую ИИ, так же Apply to Plan, что бы обновлять план и вместе с ним новые подзадачи или обновление старых, и так же частичное удаление вопрос - ответ от ии, и полное удаление чата если такой понадобится. Так же главная фича это надиктовка в гс бота или текстом планов на следующий день и вот он уже разбивает день на задачи а внутри каждой задачи делает изначальный Plan + подзадачи. Так же я иду на 2 пары нужно будет моделировать систему в Acsocad используя Аппроксимация функции одной переменной по точкам на графике. Вечером приготовить поесть и убраться' },
		],
	};

	if (!isGoogle) {
		params.response_format = { type: 'json_object' };
	}

	const response = await openai.chat.completions.create(params);
	const content = response.choices[0].message.content;
	console.log('Raw content:', content);

	if (content) {
		try {
			// Чистим markdown
			const cleaned = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
			const parsed = JSON.parse(cleaned);

			// 3. ВАЛИДАЦИЯ
			const validated = ParsedTaskSchema.parse(parsed);
			console.log('✅ Result (Validated):', JSON.stringify(validated, null, 2));
		} catch (e) {
			console.error('❌ Parsing Error:', e);
		}
	}
}

main();
