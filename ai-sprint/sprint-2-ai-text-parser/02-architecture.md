# Sprint 2 Architecture: AI Text Parser (Design-Only)

## Goals & Non-Goals

### Goals
- Реализовать production-grade pipeline `task-parsing`: queue ingress -> AI parse -> Zod validation -> DB transaction -> notification enqueue.
- Ввести контрактный AI-слой с `IAiParser` и провайдерным выбором `mock|deepseek` (и `gemini` как audio-stub).
- Закрыть P0/P1 GAP из `ai-sprint/sprint-2-ai-text-parser/01-audit.md` без ломки Sprint 0/1/1.5.
- Зафиксировать implementation-артефакты: модули, контракты jobs, тесты, миграции Prisma + raw SQL.

### Non-Goals
- Реализация голосового пайплайна Sprint 3 (Gemini audio, скачивание файла, транскрипция).
- Реализация бизнес-логики assignee/invite (Sprint 11), кроме сохранения существующих миграций и индексов.
- Изменение публичных HTTP контрактов Sprint 2 (новых REST endpoint не добавляется).

## Constraints from Audit

### Non-negotiables
1. `task-parsing` и `notifications` processors должны быть полноценными, а не log-only.
2. AI-слой обязан быть интерфейсным (`IAiParser`) с провайдерами `MockAiParser`, `DeepSeekTextParser`, `GeminiAudioParser` (audio-stub).
3. DeepSeek контракт обязателен: `POST https://api.deepseek.com/v1/chat/completions`, timeout 30s, маппинг 429/5xx/network.
4. Zod-контракт Sprint 2 обязателен: `tasks 1..5`, `title 1..500`, `summary <=2000`, `subtasks 0..20`, `deadline ISO8601`.
5. Retry на первом `invalid JSON`/`ZodError` обязателен ровно один раз с corrective prompt.
6. Fallback обязателен: raw text, `originalInput`, `status=PARSE_FAILED`, уведомление пользователю.
7. Idempotency обязателен на уровне processor по `idempotencyKey` (не только BullMQ `jobId`).
8. Correlation ID должен идти через queue job, AI, DB write, notification logs.
9. Ошибки обязаны быть namespaced (`AI_*`, `TASK_*`, `QUEUE_*`) и согласованы с глобальным форматом ошибки.
10. Sprint 2 тесты (unit/integration/e2e) обязательны и являются gate.

### Design Notes (разрешение конфликтов внутри spec/audit)
- `Task.status` в Sprint 2 секции roadmap указан как `TODO` для fallback, но архитектурный инвариант roadmap и текущий запрос требуют `PARSE_FAILED`; в дизайне принят `PARSE_FAILED` как приоритетный контракт.
- Формула idempotency из инварианта (`taskId + chatHash`) неприменима к create-new flow без `taskId`; для Sprint 2 используется эквивалент `create-new + chatHash(text, chatId, messageId)` и передается как `idempotencyKey`.

## Flow Diagram (ASCII)

```text
Telegram Webhook
  |
  | 1) validate secret, upsert user, build correlationId
  v
Queue: task-parsing
Job: { userId, text, telegramMessageId, telegramChatId, correlationId, idempotencyKey }
  |
  | 2) TaskParsingProcessor
  |    - payload validation
  |    - idempotency acquire (DB)
  |    - AI parse (provider router)
  |    - retry once on invalid JSON / ZodError
  |    - success or fallback decision
  v
DB Transaction (Prisma)
  |-- success: create N Task + Subtask.createMany
  |-- fallback: create 1 Task (status=PARSE_FAILED, originalInput=text)
  |-- idempotency record -> SUCCESS/FALLBACK
  v
Queue: notifications
Job: { chatId, text, parseMode, correlationId }
  |
  | 3) NotificationProcessor
  |    - sendMessage via Telegram API
  |    - retry by BullMQ on transient send errors
  v
Telegram User
```

## NestJS Module Design

### Target module graph

```text
AppModule
  |- ConfigModule (global)
  |- ObservabilityModule (global)
  |- PrismaModule (global)
  |- RedisModule (global)
  |- AiModule
  |- QueueModule
  |- TelegramModule

TelegramModule
  |- TelegramWebhookService
  |- TelegramQueueProducerService

AiModule
  |- provider tokens: AI_TEXT_PARSER, AI_AUDIO_PARSER
  |- MockAiParser
  |- DeepSeekTextParser
  |- GeminiAudioParser (audio-stub)
  |- DeepSeekPromptBuilder
  |- DeepSeekResponseParser
  |- ParsedTaskValidator
  |- AiProviderRouter

QueueModule
  |- TaskParsingProcessor
  |- NotificationProcessor
  |- TaskParsingOrchestrator
  |- TaskWriteService
  |- NotificationFormatter
  |- QueueIdempotencyService
```

### Providers and responsibilities
- `src/modules/ai/contracts/ai-parser.interface.ts`
  - Контракт `IAiParser`:
  - `parseText(text: string, context: ParseContext): Promise<ParsedTaskResult>`
  - `parseAudio(audio: Buffer, mimeType: string, context: ParseContext): Promise<ParsedTaskResult>`
- `src/modules/ai/providers/mock-ai.parser.ts`
  - Детерминированный parser для unit/e2e; поддерживает сценарии single/multi/fallback.
- `src/modules/ai/providers/deepseek-text.parser.ts`
  - HTTP-клиент DeepSeek + error mapping + timeout + безопасное логирование.
- `src/modules/ai/providers/gemini-audio.parser.ts`
  - Реализует контракт, но в Sprint 2 возвращает контролируемую ошибку `AI_AUDIO_PROVIDER_NOT_ENABLED`.
- `src/modules/ai/services/ai-provider.router.ts`
  - Выбор провайдера по env: `AI_TEXT_PROVIDER`, `AI_AUDIO_PROVIDER`.
- `src/modules/queue/services/task-parsing.orchestrator.ts`
  - Центральный pipeline: idempotency -> parse/retry -> transaction -> notification enqueue.
- `src/modules/queue/services/task-write.service.ts`
  - Prisma `$transaction`: `Task.create` + `Subtask.createMany`, fallback write.
- `src/modules/queue/services/queue-idempotency.service.ts`
  - Acquire/complete/fail idempotency records, skip duplicates deterministically.
- `src/modules/queue/services/notification-formatter.service.ts`
  - Форматирование success/fallback/error сообщений по шаблонам Sprint 2.

## AI Layer Design (DeepSeek + Mock)

### Env contract
- `AI_TEXT_PROVIDER=mock|deepseek`
- `AI_AUDIO_PROVIDER=mock|gemini`
- `DEEPSEEK_API_KEY` (required if `AI_TEXT_PROVIDER=deepseek`)
- `DEEPSEEK_BASE_URL` (default `https://api.deepseek.com/v1`)
- `AI_TIMEOUT_MS` (default `30000`)

### DeepSeek request contract
- Endpoint: `POST {DEEPSEEK_BASE_URL}/chat/completions`
- Headers: `Authorization: Bearer {DEEPSEEK_API_KEY}`, `Content-Type: application/json`
- Body: `model=deepseek-chat`, `messages=[system,user]`, `max_tokens=2000`, `temperature=0.1`
- Response parse source: `choices[0].message.content`

### Prompting and safe logging
- `DeepSeekPromptBuilder` собирает system prompt с schema + few-shot + language preservation rule.
- В production логируются только: `provider`, `model`, `promptLength`, `correlationId`, `attempt`.
- Prompt content и raw user text в лог не попадают.

### Response parser and validation
- `DeepSeekResponseParser` поддерживает:
- Чистый JSON.
- JSON внутри markdown code block ```json ... ```.
- Ошибка парсинга -> `AI_PARSE_INVALID_JSON`.
- `ParsedTaskSchema` валидирует финальную структуру.
- Первый `AI_PARSE_INVALID_JSON` или `AI_PARSE_ZOD_VALIDATION` -> corrective prompt retry.
- Второй fail -> fallback (без дополнительного queue retry).

### Zod schema (final)
- `tasks`: array, `min(1)`, `max(5)`
- `task.title`: string, `min(1)`, `max(500)`
- `task.summary`: optional string, `max(2000)`
- `task.deadline`: optional ISO8601 string
- `task.projectHint`: optional nullable string
- `task.subtasks`: array, `min(0)`, `max(20)`
- `subtask.title`: string, `min(1)`, `max(500)`
- `subtask.order`: int `>=0`

## Processor Design (task-parsing)

### Job contracts (strict by spec)

`Queue: task-parsing`

```ts
interface TaskParsingJobData {
  userId: string; // BigInt string-serialized (Telegram user id)
  text: string;
  telegramMessageId: number;
  telegramChatId: number;
  correlationId: string;
  idempotencyKey: string;
}
```

`Queue: notifications`

```ts
interface NotificationJobData {
  chatId: number;
  text: string;
  parseMode: 'HTML' | 'Markdown';
  correlationId: string;
}
```

### Pipeline steps
1. Валидировать payload через `TaskParsingJobSchema` (runtime guard).
2. Запустить `RequestContextService.run({ correlationId })` для логов worker-а.
3. `QueueIdempotencyService.acquire(queue='task-parsing', idempotencyKey)`.
4. Если ключ уже в `SUCCESS|FALLBACK` -> `QUEUE_IDEMPOTENCY_DUPLICATE`, skip.
5. Вызвать AI parser (`mock` или `deepseek`) с parse attempt=1.
6. На `AI_PARSE_INVALID_JSON`/`AI_PARSE_ZOD_VALIDATION` выполнить corrective retry (attempt=2).
7. При success: `TaskWriteService.createParsedTasksInTransaction(...)`.
8. При fallback: `TaskWriteService.createFallbackTaskInTransaction(...)` с `status=PARSE_FAILED`, `originalInput=text`, `originalInputType=TEXT`.
9. Обновить idempotency record (`SUCCESS` или `FALLBACK`) и сохранить result metadata.
10. Положить `notifications` job с шаблоном success/fallback/error.

### Retry/backoff policy
- BullMQ (уже есть): `attempts=3`, exponential backoff `1s/2s/4s`.
- Внутренний retry в одном processing-cycle: только 1 corrective retry на invalid JSON / Zod.
- `AI_PARSE_TIMEOUT`, `AI_PARSE_RATE_LIMIT`, `AI_PARSE_PROVIDER_ERROR`:
- попытки 1..N-1 -> бросаем retriable error в BullMQ.
- последняя попытка -> fallback write + fallback/error notification.
- `TASK_CREATE_FAILED` всегда retriable до исчерпания BullMQ attempts.

## DB & Migration Plan

### Schema changes for Sprint 2 implementation step
1. `TaskStatus` enum: добавить `PARSE_FAILED`.
2. Добавить таблицу idempotency для queue processors:
   - `queue_idempotency`
   - поля: `id`, `queue_name`, `idempotency_key`, `status`, `correlation_id`, `result_payload`, `created_at`, `updated_at`, `completed_at`, `deleted_at`.
3. Обеспечить консистентность `tasks.original_input` и `tasks.original_input_type` через `IF NOT EXISTS` migration patch.

### Raw SQL indexes
- Новый partial unique index для idempotency:

```sql
CREATE UNIQUE INDEX "uq_queue_idempotency_active"
ON "queue_idempotency" ("queue_name", "idempotency_key")
WHERE "deleted_at" IS NULL;
```

- Сохранить и верифицировать существующие partial unique indexes Sprint 2:
- `uq_task_assignee_active_per_task`
- `uq_task_assignee_pending_username`
- `uq_project_member_active`

### Migration artifact set
- `prisma/migrations/<ts>_add_parse_failed_status/migration.sql`
- `prisma/migrations/<ts>_add_queue_idempotency/migration.sql`
- `prisma/migrations/<ts>_normalize_original_input_columns/migration.sql`
- `prisma/migrations/<ts>_verify_partial_unique_indexes/migration.sql` (raw SQL guard with `IF NOT EXISTS`)

## Test Matrix

### Unit
- `test/unit/parsed-task.validator.unit-spec.ts`
  - valid payload passes
  - missing title / summary>2000 / title>500 / subtasks>20 / tasks>5 / empty tasks / invalid deadline
- `test/unit/deepseek-prompt.unit-spec.ts`
  - system prompt содержит schema, language rule, no-markdown rule
- `test/unit/deepseek-response-parser.unit-spec.ts`
  - clean JSON parse
  - markdown wrapped JSON parse
  - invalid JSON -> `AI_PARSE_INVALID_JSON`
- `test/unit/notification-formatter.unit-spec.ts`
  - single-task success
  - multi-task success
  - fallback
  - terminal error
- `test/unit/queue-idempotency.service.unit-spec.ts`
  - acquire new key
  - duplicate skip behavior
  - complete/fail transitions

### Integration
- `test/integration/ai-service.integration-spec.ts`
  - DeepSeek request format
  - uses `DEEPSEEK_API_KEY`
  - 429 -> `AI_PARSE_RATE_LIMIT`
  - 500/network -> `AI_PARSE_PROVIDER_ERROR`
  - timeout -> `AI_PARSE_TIMEOUT`
  - first Zod fail then corrective success
- `test/integration/task-write.integration-spec.ts`
  - transaction creates Task + Subtasks atomically
  - rollback on Subtask error
  - fallback write sets `PARSE_FAILED`, `originalInput`, empty subtasks
- `test/integration/schema-migration.integration-spec.ts`
  - partial indexes exist and enforce uniqueness
  - `TaskStatus` includes `PARSE_FAILED`
  - `queue_idempotency` unique active key works

### E2E
- `test/e2e/task-parsing.e2e-spec.ts`
  - mock valid -> Task + Subtasks
  - mock multi-task -> all tasks created
  - success -> notification enqueued
  - invalid JSON -> corrective retry -> success
  - double fail -> fallback task + fallback notification
  - timeout on final attempt -> fallback + error notification
  - same `idempotencyKey` twice -> only one DB effect

## Observability & Error Taxonomy

### Logs
- `info`: `Task parsed successfully` `{correlationId, jobId, provider, taskCount, source}`
- `warn`: `AI response invalid, corrective retry` `{correlationId, attempt, provider, responseLength}`
- `warn`: `Fallback used` `{correlationId, reasonCode, provider}`
- `error`: `AI provider error` `{correlationId, errorCode, attempt, provider}`
- `debug`: `DeepSeek request metadata` `{correlationId, model, promptLength}`

### Metrics
- `ai_parse_total{result=success|fallback|error,provider=mock|deepseek}`
- `ai_parse_duration_ms{provider}`
- `tasks_created_total{source=ai|fallback,sourceType=text}`
- `queue_idempotency_hits_total{queue=task-parsing}`

### Error code registry
- `AI_PARSE_INVALID_JSON` (non-retriable queue, corrective retry inside processor)
- `AI_PARSE_ZOD_VALIDATION` (non-retriable queue, corrective retry inside processor)
- `AI_PARSE_TIMEOUT` (retriable queue)
- `AI_PARSE_RATE_LIMIT` (retriable queue)
- `AI_PARSE_PROVIDER_ERROR` (retriable queue)
- `AI_AUDIO_PROVIDER_NOT_ENABLED` (non-retriable in Sprint 2)
- `TASK_CREATE_FAILED` (retriable queue)
- `QUEUE_JOB_PAYLOAD_INVALID` (non-retriable)
- `QUEUE_IDEMPOTENCY_DUPLICATE` (non-retriable skip)
- `QUEUE_NOTIFICATION_SEND_FAILED` (retriable queue)

## Implementation File Plan

### Files to modify
- `src/app.module.ts`
- `src/config/validation.schema.ts`
- `src/config/configuration.ts`
- `.env.example`
- `.env.test`
- `src/modules/telegram/telegram-queue-producer.service.ts`
- `src/modules/telegram/telegram-webhook.service.ts`
- `src/modules/ai/ai.module.ts`
- `src/modules/ai/validators/ai-output.validator.ts`
- `src/modules/queue/processors/task-parsing.processor.ts`
- `src/modules/queue/processors/notification.processor.ts`
- `src/modules/queue/queue.module.ts`
- `prisma/schema.prisma`
- `test/setup-global.ts`

### Files to add
- `src/modules/ai/contracts/ai-parser.interface.ts`
- `src/modules/ai/contracts/parsed-task-result.interface.ts`
- `src/modules/ai/constants/ai.tokens.ts`
- `src/modules/ai/providers/mock-ai.parser.ts`
- `src/modules/ai/providers/deepseek-text.parser.ts`
- `src/modules/ai/providers/gemini-audio.parser.ts`
- `src/modules/ai/prompts/deepseek-task-parser.prompt.ts`
- `src/modules/ai/parsers/deepseek-response.parser.ts`
- `src/modules/ai/errors/ai-error.registry.ts`
- `src/modules/queue/contracts/task-parsing.job.ts`
- `src/modules/queue/contracts/notification.job.ts`
- `src/modules/queue/services/task-parsing.orchestrator.ts`
- `src/modules/queue/services/task-write.service.ts`
- `src/modules/queue/services/queue-idempotency.service.ts`
- `src/modules/queue/services/notification-formatter.service.ts`
- `src/modules/queue/errors/queue-error.registry.ts`
- `src/modules/task/errors/task-error.registry.ts`
- `test/unit/parsed-task.validator.unit-spec.ts`
- `test/unit/deepseek-prompt.unit-spec.ts`
- `test/unit/deepseek-response-parser.unit-spec.ts`
- `test/unit/notification-formatter.unit-spec.ts`
- `test/unit/queue-idempotency.service.unit-spec.ts`
- `test/integration/ai-service.integration-spec.ts`
- `test/integration/task-write.integration-spec.ts`
- `test/integration/schema-migration.integration-spec.ts`
- `test/e2e/task-parsing.e2e-spec.ts`
- `prisma/migrations/<ts>_add_parse_failed_status/migration.sql`
- `prisma/migrations/<ts>_add_queue_idempotency/migration.sql`
- `prisma/migrations/<ts>_normalize_original_input_columns/migration.sql`
- `prisma/migrations/<ts>_verify_partial_unique_indexes/migration.sql`

## BLOCKER Resolution Plan

### BLOCKER 1: Sprint 2 core feature non-functional
- Implement `TaskParsingProcessor` orchestration end-to-end (AI -> Zod -> transaction -> notifications).
- Add processor e2e tests for success, fallback, idempotency.
- Exit criteria: `task-parsing.e2e-spec` green, notifications produced, DB writes atomic.

### BLOCKER 2: No production-safe DeepSeek contract
- Introduce `IAiParser` + provider tokens + env routing.
- Implement DeepSeek client with 30s timeout, 429/5xx/network mapping.
- Enforce safe logging and no prompt body leakage.
- Exit criteria: integration tests for DeepSeek request/timeout/429/500 green.

### BLOCKER 3: No verification net
- Add full Sprint 2 matrix (unit/integration/e2e) with migration assertions.
- Wire tests into existing `test:unit`, `test:integration`, `test:e2e` pipelines.
- Exit criteria: all Sprint 2 tests green, regressions in Sprint 0/1/1.5 absent.
