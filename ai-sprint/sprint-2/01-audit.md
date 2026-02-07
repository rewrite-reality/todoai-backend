# Sprint 2 Readiness Audit (AI + BullMQ + Prisma)

## Scope
- Reviewed: `prisma/schema.prisma`, `src/modules/ai/**`, `src/modules/queue/**`, `src/config/**`, related Telegram ingress and tests.
- Mode: read-only audit, facts only.

## 1) Current Data Flow (fact)
1. Telegram webhook enters `src/modules/telegram/telegram.controller.ts` and `src/modules/telegram/telegram-webhook.service.ts`.
2. Webhook validates secret/payload and upserts user (`src/modules/telegram/telegram-webhook.service.ts:39`, `src/modules/user/user.service.ts:18`).
3. Webhook enqueues BullMQ jobs with `jobId=telegram-update-{update_id}` (`src/modules/telegram/telegram-queue-producer.service.ts:91`, `src/modules/telegram/telegram-queue-producer.service.ts:99`, `src/modules/telegram/telegram-queue-producer.service.ts:106`).
4. Queue processors receive jobs but currently only log and resolve (`src/modules/queue/processors/task-parsing.processor.ts:14`, `src/modules/queue/processors/voice-transcription.processor.ts:14`, command processors at `src/modules/queue/processors/*.processor.ts`).
5. No AI parsing/mutation execution is connected in this runtime flow.

## 2) What Is Correct
- Webhook ingress validation exists:
  - invalid secret -> `TELEGRAM_INVALID_SECRET` (`src/modules/telegram/telegram-webhook.service.ts:132`)
  - malformed payload -> `TELEGRAM_INVALID_PAYLOAD` (`src/modules/telegram/telegram-webhook.service.ts:141`, `src/modules/telegram/telegram-webhook.service.ts:160`)
- Correlation ID propagation is implemented to HTTP and queue payloads (`src/common/middleware/correlation-id.middleware.ts`, `src/modules/telegram/telegram-webhook.service.ts`).
- Queue-level dedup key is present (`jobId` by Telegram update id) and covered by integration/e2e tests (`test/integration/telegram-queue-producer.integration-spec.ts:32`, `test/e2e/telegram-webhook.e2e-spec.ts:214`).
- Prisma schema contains Sprint 2 entities (`TaskAssignee`, `Invite`, `ProjectMember`) and related constraints/indexes in migrations (`prisma/schema.prisma:318`, `prisma/schema.prisma:368`, `prisma/schema.prisma:413`, `prisma/migrations/20260206112047_v3_assignees_invites_members/migration.sql:132`).

## 3) Broken / Missing vs Sprint 2
- AI module is not wired into app runtime:
  - `AiModule` exists but is not imported in `AppModule` (`src/modules/ai/ai.module.ts`, `src/app.module.ts:28`).
  - no usages of `AiService` outside AI files (`src/modules/ai/ai.service.ts`, repo search).
- AI processor files are empty:
  - `src/modules/ai/processors/task-parser.processor.ts` (size 0)
  - `src/modules/ai/processors/mutation.processor.ts` (size 0)
- Two AI prompt files are empty:
  - `src/modules/ai/prompts/apply-to-plan.prompt.ts` (size 0)
  - `src/modules/ai/prompts/summary-generator.prompt.ts` (size 0)
- Active BullMQ processors implement no business side effects (log + `Promise.resolve()`), so Sprint 2 command/task workflows are not executed (`src/modules/queue/processors/*.processor.ts`).
- `TELEGRAM_UPDATES` queue is registered (`src/modules/queue/queue.module.ts:31`) and `telegram-update.processor.ts` exists (`src/modules/queue/processors/telegram-update.processor.ts:7`), but this processor is not provided in `QueueModule` providers (`src/modules/queue/queue.module.ts:49-56`) and webhook flow enqueues directly to other queues.
- Prisma transaction boundaries for multi-entity workflows are absent in source (`rg` on `src` finds no `\$transaction` usage).

## 4) Risky Areas
- Idempotency is ingress-queue-level only (jobId dedupe), not domain-state-level:
  - no persistent processed-update ledger in Prisma models.
  - dedupe protection depends on BullMQ job retention settings (`removeOnComplete.age=3600`, `count=100`) in `src/modules/queue/queues.config.ts:9-11`.
- Retry policy is configured globally (`attempts=3`, exponential backoff) (`src/modules/queue/queues.config.ts:4-6`), but processor-side idempotent business operations are not present/verified.
- AI error handling in `AiService` swallows provider/schema failures into generic fallback task (`src/modules/ai/ai.service.ts:70-94`), which hides parsing failure from downstream consumers.
- Config mismatch risk:
  - AI service reads `AI_API_KEY`/`AI_MODEL`/`AI_BASE_URL` (`src/modules/ai/ai.service.ts:16-20`).
  - `.env.example` documents `OPENAI_API_KEY` (`.env.example:29`).
  - config schema does not validate AI env keys (`src/config/validation.schema.ts`).
- `TELEGRAM_WEBHOOK_URL` is used in runtime (`src/modules/telegram/telegram.service.ts:19`) but not validated in env schema.

## 5) Prisma Usage Audit
- Observed app-level Prisma usage in reviewed scope:
  - user upsert: `src/modules/user/user.service.ts:18`
  - health ping query: `src/modules/health/health.service.ts:71`
- No explicit transaction orchestration in application source for multi-step Sprint 2 operations (task assignee/invite/member lifecycle updates not present in runtime services/processors).

## 6) Error Handling / Fallback Audit
- HTTP layer has global exception mapping for Nest + Prisma known errors (`src/common/filters/all-exceptions.filter.ts`).
- Webhook path has explicit validation errors and safe ignore paths for unsupported Telegram updates (`src/modules/telegram/telegram-webhook.service.ts`).
- Queue worker-level failure strategy beyond BullMQ default retries is not implemented (no processor-specific failure mapping/recovery logic in reviewed processors).

## 7) BLOCKERS for Sprint 2
- `B1` AI execution path is non-operational in runtime (AI module not wired, AI processors empty, no queue-to-AI integration).
- `B2` Sprint 2 queue processors are stubs (no domain mutations for task parsing, transcription, invite/assignee commands).
- `B3` No explicit Prisma transaction boundaries for multi-entity workflows in source.
- `B4` Idempotency is limited to queue `jobId`; domain-level idempotency guarantees for retries/replays are not present in code.
- `B5` Config contract inconsistency for AI credentials (`AI_API_KEY` vs `OPENAI_API_KEY`) and missing AI env validation.
- `B6` Orphan/ambiguous queue path: `TELEGRAM_UPDATES` queue + processor file exist, but processor not registered and ingress bypasses this queue.

## 8) Uncertainties (treated as BLOCKER by audit rule)
- `U1/BLOCKER` Ambiguous intended architecture: coexistence of direct webhook routing and orphan `telegram-update.processor.ts` path does not provide a single authoritative ingestion pattern.
- `U2/BLOCKER` DB migration state per environment is not derivable from repository alone; readiness of runtime constraints/indexes outside code cannot be confirmed from source snapshot.
