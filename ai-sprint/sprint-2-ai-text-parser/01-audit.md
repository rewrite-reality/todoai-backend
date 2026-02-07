# Sprint 2 Audit: AI Text Parser (Read-Only)

## Executive Summary
- Sprint 2 core pipeline `task-parsing` (ingestion -> AI -> Zod -> DB transaction -> notifications) is not implemented: processor is stub-only (`src/modules/queue/processors/task-parsing.processor.ts:8`).
- AI abstraction required by spec (`IAiParser`, provider switch `mock|deepseek`) is missing; only one concrete `AiService` exists and it is not wired into app modules (`src/modules/ai/ai.service.ts:9`, `src/app.module.ts:20`).
- DeepSeek contract is not implemented: no `DEEPSEEK_API_KEY`, no DeepSeek endpoint handling, no explicit 30s timeout/429 mapping (`src/config/validation.schema.ts:4`, `.env.example:30`).
- Zod schema exists but does not match Sprint 2 limits: subtasks max is 10 instead of 20; no tasks array min/max (1..5); no title length cap (1..500) (`src/modules/ai/validators/ai-output.validator.ts:16`, `src/modules/ai/validators/ai-output.validator.ts:23`).
- Required retry strategy on first `ZodError` with corrective prompt is absent.
- Fallback strategy from Sprint 2 is only partial: in-memory fallback object exists in `AiService`, but no DB fallback write with `Task.originalInput` from queue flow (`src/modules/ai/ai.service.ts:72`).
- Idempotency for webhook ingress exists via BullMQ `jobId=telegram-update-{update_id}`, but Sprint 2 idempotency for AI processing (`idempotencyKey = taskId + chatHash`) is not implemented (`src/modules/telegram/telegram-queue-producer.service.ts:110`).
- Correlation ID middleware exists for HTTP; queue processors only log `job.data.correlationId` and do not implement end-to-end propagation into AI/DB/audit records (`src/common/middleware/correlation-id.middleware.ts:6`).
- Prisma schema and migration for Sprint 2 data models (`TaskAssignee`, `Invite`, `ProjectMember`) are present, including important partial unique indexes via raw SQL (`prisma/migrations/20260206112047_v3_assignees_invites_members/migration.sql:132`).
- Sprint 2 tests are missing (no e2e/integration/unit for AI parser flow, DeepSeek client, Zod+fallback, transaction semantics, retry behavior).

## Current State Map
| Component | Path | Current behavior | Used now |
|---|---|---|---|
| Sprint 2 source-of-truth | `ai-sprint/sprint-roadmap/sprint-roadmap.md` | Defines Sprint 2 architecture/contracts/tests (DeepSeek, Zod, fallback, idempotency, errors). | Yes (audit baseline) |
| Task parsing worker | `src/modules/queue/processors/task-parsing.processor.ts` | Logs job receipt only, returns resolved promise, no AI/DB/notification logic. | Yes (registered in `QueueModule`) |
| Notifications worker | `src/modules/queue/processors/notification.processor.ts` | Logs only; no Telegram send/formatting. | Yes |
| Queue registration/options | `src/modules/queue/queue.module.ts`, `src/modules/queue/queues.config.ts` | Queues registered with attempts=3 + exponential backoff (global defaults). | Yes |
| Telegram ingress -> queues | `src/modules/telegram/telegram-webhook.service.ts`, `src/modules/telegram/telegram-queue-producer.service.ts` | Validates webhook, upserts user, enqueues text/voice/commands; dedupe by `jobId`. | Yes |
| AI service | `src/modules/ai/ai.service.ts` | Calls OpenAI SDK with `AI_API_KEY/AI_MODEL/AI_BASE_URL`; has generic fallback object. | No (not imported by app flow) |
| AI module wiring | `src/modules/ai/ai.module.ts`, `src/app.module.ts` | `AiModule` exists but not imported into `AppModule`. | No |
| AI schema validator | `src/modules/ai/validators/ai-output.validator.ts` | Defines `ParsedTaskSchema`/`SingleTaskSchema`; constraints differ from Sprint 2 contract. | Indirectly (only inside `AiService`) |
| AI prompt | `src/modules/ai/prompts/task-parser.prompt.ts` | Generic GTD prompt, not Sprint 2 DeepSeek contract prompt format. | Indirectly (`AiService`) |
| AI processors in ai module | `src/modules/ai/processors/task-parser.processor.ts`, `src/modules/ai/processors/mutation.processor.ts` | Empty files (0 bytes). | No |
| Error response format | `src/common/filters/all-exceptions.filter.ts` | Unified `{ error: { code, message, details? } }` implemented. | Yes |
| Error taxonomy registry | repo-wide | AUTH registry exists; no AI/TASK/QUEUE registry for Sprint 2 codes. | Partial |
| Correlation ID middleware | `src/common/middleware/correlation-id.middleware.ts` | Reads/generates `x-correlation-id`, sets response header, stores in ALS context. | Yes |
| Prisma schema core models | `prisma/schema.prisma` | `User/Project/Task/Subtask/ChatMessage` with `deletedAt` fields and indexes. | Yes |
| Sprint 2 DB models | `prisma/schema.prisma`, `prisma/migrations/20260206112047_v3_assignees_invites_members/migration.sql` | `TaskAssignee/Invite/ProjectMember` + partial unique indexes/check constraints/triggers are present. | Yes |
| Task original input columns | `prisma/schema.prisma`, `prisma/migrations/20260205165004_indexes_and_constraints/migration.sql` | `original_input` and `original_input_type` exist in baseline migration. | Yes |
| Additional original_input migration | `prisma/migrations/20260206163000_add_original_input/migration.sql` | Adds only `original_input` if missing (no `original_input_type`). | Yes (applied in test setup order) |
| Test harness | `test/setup-global.ts`, `docker-compose.test.yml` | Real Postgres/Redis used; migrations applied by SQL in setup. | Yes |
| Sprint 2 tests | `test/**` | No `task-parsing`/DeepSeek/Zod fallback/idempotency tests for Sprint 2 flow. | No |

## GAPs (P0/P1/P2)

### P0
1. `task-parsing` processor not implemented.
   - Evidence: `src/modules/queue/processors/task-parsing.processor.ts:14`.
   - Spec mismatch: Sprint 2 requires full ingestion -> AI -> validation -> DB write -> notifications pipeline.

2. No DB write transaction for parsed tasks/subtasks from queue processor.
   - Evidence: no `$transaction` usage in task parsing flow (`rg` on `src` returns none for parser path).
   - Spec mismatch: required atomic `Task.create + Subtask.createMany`.

3. No notification enqueue/send from parsing result.
   - Evidence: parser does not call notifications queue; notification processor is log-only (`src/modules/queue/processors/notification.processor.ts:14`).
   - Spec mismatch: success/fallback/error notification templates are mandatory.

4. Missing AI abstraction (`IAiParser`) and provider architecture (`mock/deepseek`).
   - Evidence: only `AiService` class exists (`src/modules/ai/ai.service.ts:9`), no interface/provider binding, no env provider switch.
   - Spec mismatch: Sprint 2 explicitly requires `IAiParser` and provider toggles.

5. DeepSeek integration contract missing.
   - Evidence: no `DEEPSEEK_API_KEY` in validated env (`src/config/validation.schema.ts`), `.env.example` has `OPENAI_API_KEY` only (`.env.example:30`).
   - Spec mismatch: must call `https://api.deepseek.com/v1/chat/completions` with timeout/rate-limit/error mapping.

6. No retry-on-first-ZodError corrective prompt logic.
   - Evidence: `AiService.parseTask` catches all errors and directly returns fallback (`src/modules/ai/ai.service.ts:72`).
   - Spec mismatch: one corrective retry on Zod failure is required before fallback.

7. No idempotency for Sprint 2 parsing jobs by business key.
   - Evidence: queue payloads do not carry `idempotencyKey` (`src/modules/telegram/telegram-queue-producer.service.ts`), no lookup-before-process in parser.
   - Spec mismatch: required idempotent AI processors.

8. Sprint 2 tests absent (critical verification gap).
   - Evidence: no `task-parsing.*`, `ai-service.integration-spec`, `deepseek-response-parser.*` in `test/`.
   - Spec mismatch: required unit/integration/e2e suite is missing.

### P1
1. `AiModule` not wired into runtime graph.
   - Evidence: not imported in `AppModule` (`src/app.module.ts:20`).
   - Impact: even current AI service cannot participate in queue flow.

2. Zod schema does not match Sprint 2 output contract.
   - Evidence:
     - subtasks max=10, spec requires up to 20 (`src/modules/ai/validators/ai-output.validator.ts:16`);
     - no tasks count limits 1..5 (`src/modules/ai/validators/ai-output.validator.ts:23`);
     - no explicit title length 1..500.
   - Impact: wrong accept/reject behavior and non-compliant parse validation.

3. Fallback behavior diverges from Sprint 2 invariants.
   - Evidence: fallback truncates title to 100 (`src/modules/ai/ai.service.ts:78`) and stores summary in memory only.
   - Impact: mismatch with required persistence of original input and parser-failure semantics.

4. Error taxonomy incomplete for Sprint 2 AI/queue domain.
   - Evidence: global format exists, but AI codes (`AI_PARSE_*`, `TASK_CREATE_FAILED`) and registry/tests are absent (`src/common/filters/all-exceptions.filter.ts`, repo search).
   - Impact: inconsistent operational diagnostics and contract drift.

5. Queue correlation propagation is partial.
   - Evidence: correlation ID arrives from HTTP and is placed in initial job data, but no downstream propagation strategy in parser/notification DB audit chain.
   - Impact: broken end-to-end tracing across async stages.

### P2
1. Sprint 2 ai processors under `src/modules/ai/processors/*` are empty files and unused.
   - Evidence: files are 0-byte; no imports/usages via `rg`.
   - Impact: dead scaffolding, maintainability noise.

2. Migration layering for `original_input` is redundant/inconsistent.
   - Evidence: baseline migration already creates `original_input` + `original_input_type`; later migration adds only `original_input`.
   - Impact: migration history ambiguity and maintenance risk.

3. Test harness differs from roadmap wording (docker-compose DB/Redis + custom migration runner, not testcontainers).
   - Evidence: `docker-compose.test.yml`, `test/setup-global.ts`.
   - Impact: acceptable technically, but diverges from declared approach.

## BLOCKERs
1. **BLOCKER: Sprint 2 core feature is non-functional.**
   - Condition to clear: implement and wire full `task-parsing` processor path (AI call, Zod, retry, fallback, DB transaction, notification enqueue) and validate by Sprint 2 e2e tests.

2. **BLOCKER: No production-safe AI provider contract for DeepSeek.**
   - Condition to clear: introduce provider abstraction (`IAiParser`), DeepSeek client with explicit timeout/429/5xx mapping, and config validation for required env keys.

3. **BLOCKER: No verification net for Sprint 2 behavior.**
   - Condition to clear: add required unit/integration/e2e coverage for parser schema, DeepSeek response parsing, retry/fallback/idempotency, and transactional writes.

## Recommended Change Plan
1. `config` layer: extend `EnvironmentSchema` and `.env.example` with Sprint 2 keys (`AI_TEXT_PROVIDER`, `AI_AUDIO_PROVIDER`, `DEEPSEEK_API_KEY`, `DEEPSEEK_BASE_URL`, `AI_TIMEOUT_MS`), keep strict validation.
2. `ai` layer: define `IAiParser` + DTO/contracts; implement `MockAiParser` and `DeepSeekTextParser`; bind via provider token and env switch.
3. `ai` layer: implement DeepSeek HTTP adapter according to Sprint 2 request/response contract (manual JSON extraction from `choices[0].message.content`, markdown codeblock stripping).
4. `ai` layer: align Zod schema to Sprint 2 limits (tasks 1..5, title 1..500, subtasks 0..20, summary <=2000, ISO deadline).
5. `ai` layer: implement retry policy for first `ZodError` with corrective prompt; second failure -> fallback path.
6. `queue` layer: replace stub in `TaskParsingProcessor` with orchestrated flow and strict typed job payload including `idempotencyKey` and `correlationId`.
7. `db` layer: persist parsed result inside Prisma `$transaction` (`Task.create` + `Subtask.createMany`); on fallback persist `Task.originalInput` and parser-failure metadata policy from spec.
8. `queue` layer: add idempotency guard in parser (lookup by business key before processing, skip duplicates deterministically).
9. `notifications` layer: enqueue formatted notification job after transaction; implement `NotificationProcessor` to call Telegram sender and include correlation context.
10. `error` layer: introduce Sprint 2 AI/TASK/QUEUE error registry + mapping (`AI_PARSE_INVALID_JSON`, `AI_PARSE_ZOD_VALIDATION`, `AI_PARSE_TIMEOUT`, `AI_PARSE_RATE_LIMIT`, `AI_PARSE_PROVIDER_ERROR`, `TASK_CREATE_FAILED`).
11. `observability` layer: standardize logs for parser lifecycle (start/success/retry/fallback/fail) with `correlationId`, `provider`, `attempt`, `jobId`, `idempotencyKey`.
12. `tests` layer (unit): add validator/prompt/response-parser tests including malformed JSON and markdown-wrapped JSON.
13. `tests` layer (integration): add DeepSeek client tests with network mocking (`nock`/`msw`) for 429/500/timeout and retry behavior.
14. `tests` layer (e2e processor-level): add `task-parsing.e2e-spec` using real Postgres+Redis verifying DB writes, fallback, notifications, and idempotency.
15. `db` layer: clean migration history for `original_input`/`original_input_type` consistency and document rationale for raw SQL partial indexes.

## Appendix: Files inspected
- `ai-sprint/sprint-roadmap/sprint-roadmap.md`
- `src/app.module.ts`
- `src/config/validation.schema.ts`
- `src/config/configuration.ts`
- `.env.example`
- `src/modules/queue/queue.module.ts`
- `src/modules/queue/queues.config.ts`
- `src/modules/queue/processors/task-parsing.processor.ts`
- `src/modules/queue/processors/notification.processor.ts`
- `src/modules/queue/processors/voice-transcription.processor.ts`
- `src/modules/queue/processors/user-connection.processor.ts`
- `src/modules/queue/processors/invite-acceptance.processor.ts`
- `src/modules/queue/processors/invite-decline.processor.ts`
- `src/modules/queue/processors/assignee-revoke.processor.ts`
- `src/modules/queue/processors/assignments-list.processor.ts`
- `src/modules/ai/ai.module.ts`
- `src/modules/ai/ai.service.ts`
- `src/modules/ai/validators/ai-output.validator.ts`
- `src/modules/ai/prompts/task-parser.prompt.ts`
- `src/modules/ai/processors/task-parser.processor.ts`
- `src/modules/ai/processors/mutation.processor.ts`
- `src/modules/telegram/telegram-webhook.service.ts`
- `src/modules/telegram/telegram-queue-producer.service.ts`
- `src/modules/telegram/telegram.module.ts`
- `src/modules/telegram/telegram.service.ts`
- `src/common/middleware/correlation-id.middleware.ts`
- `src/common/filters/all-exceptions.filter.ts`
- `src/common/logger/pino-logger.service.ts`
- `prisma/schema.prisma`
- `prisma/migrations/20260205165004_indexes_and_constraints/migration.sql`
- `prisma/migrations/20260205165319_indexes_and_constraints/migration.sql`
- `prisma/migrations/20260206112047_v3_assignees_invites_members/migration.sql`
- `prisma/migrations/20260206163000_add_original_input/migration.sql`
- `package.json`
- `docker-compose.test.yml`
- `README.md`
- `test/setup-global.ts`
- `test/setup-env.ts`
- `jest.e2e.config.ts`
- `jest.integration.config.ts`
- `test/helpers/app.ts`
- `test/e2e/telegram-webhook.e2e-spec.ts`
- `test/integration/telegram-queue-producer.integration-spec.ts`
- `test/integration/prisma-factory.integration-spec.ts`
- `test/factories/prisma.ts`
- `test/factories/task.factory.ts`
- `test/factories/task-assignee.factory.ts`
- `test/factories/invite.factory.ts`
- `test/factories/project-member.factory.ts`
