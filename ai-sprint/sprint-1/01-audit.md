# Sprint 1 Readiness Audit

## Scope & Method
- Audited Sprint 1 scope only: Telegram webhook ingress (`controller/service/update validator`), user upsert, BullMQ enqueue path, queue registration/processors, idempotency, correlationId propagation, Telegram-relevant config/env validation, and related tests.
- Evidence source: repository code under `src/**`, `prisma/schema.prisma`, `.env.example`, `.env.test`, and Sprint 1-related tests under `test/**`.
- Runtime verification executed:
  - `npm run test:unit -- test/unit/telegram-webhook.service.spec.ts test/unit/correlation-id.middleware.spec.ts` -> passed (14/14).
  - `npm run test:e2e -- test/e2e/telegram-webhook.e2e-spec.ts` -> passed (12/12).
  - `npm run test:integration -- test/integration/telegram-queue-producer.integration-spec.ts` -> failed in `test/setup-global.ts` with DB setup error: `duplicate key value violates unique constraint "pg_extension_name_index"`.

## Current Runtime Data Flow (Fact)
- `POST /webhook/telegram` enters `TelegramController.handleWebhook` and forwards body + `x-telegram-bot-api-secret-token` + `req.correlationId` to `TelegramWebhookService.ingestUpdate` (`src/modules/telegram/telegram.controller.ts:5`, `src/modules/telegram/telegram.controller.ts:13`).
- `ingestUpdate` performs:
  - Secret check against `TELEGRAM_WEBHOOK_SECRET` (`src/modules/telegram/telegram-webhook.service.ts:126`).
  - Payload shape validation (`update_id` integer + message sub-shape checks) (`src/modules/telegram/telegram-webhook.service.ts:138`).
  - Message context extraction (`from.id`, `chat.id`) (`src/modules/telegram/telegram-webhook.service.ts:172`).
  - User upsert by `telegramId` (`src/modules/telegram/telegram-webhook.service.ts:52`, `src/modules/user/user.service.ts:18`).
- Routing behavior:
  - Supported commands route to command queues via `enqueueCommand` (`/start`, `/connect_user`, `/accept_invite`, `/decline_invite`, `/revoke_assignee`, `/my_assignments`) (`src/modules/telegram/telegram.update.ts:30`, `src/modules/telegram/telegram-queue-producer.service.ts:59`).
  - Non-command text routes to `task-parsing` via `enqueueTaskParsing` (`src/modules/telegram/telegram-webhook.service.ts:82`).
  - Voice routes to `voice-transcription` via `enqueueVoiceTranscription` (`src/modules/telegram/telegram-webhook.service.ts:100`).
  - Unsupported/unknown shapes return `{ ok: true }` and log warning (`src/modules/telegram/telegram-webhook.service.ts:43`, `src/modules/telegram/telegram-webhook.service.ts:115`).
- Queue payloads include `correlationId`; queue job id is `telegram-update-{update_id}` (`src/modules/telegram/telegram-queue-producer.service.ts:11`, `src/modules/telegram/telegram-queue-producer.service.ts:111`).

## What Is Correct
- Webhook secret validation exists and returns typed error code:
  - `TELEGRAM_INVALID_SECRET` (`src/modules/telegram/telegram-webhook.service.ts:133`).
- Payload validation exists and returns typed error code:
  - `TELEGRAM_INVALID_PAYLOAD` (`src/modules/telegram/telegram-webhook.service.ts:143`, `src/modules/telegram/telegram-webhook.service.ts:162`).
- Global exception filter maps HttpException payload `{code,message}` into uniform `error` response body (`src/common/filters/all-exceptions.filter.ts:53`, `src/common/filters/all-exceptions.filter.ts:133`), and is globally registered (`src/app.module.ts:37`).
- User upsert path is implemented with unique key on `telegramId`:
  - upsert call (`src/modules/user/user.service.ts:18`),
  - schema uniqueness (`prisma/schema.prisma:111`).
- Queue ingress works in e2e for text, voice, and all supported commands (`test/e2e/telegram-webhook.e2e-spec.ts:86`, `test/e2e/telegram-webhook.e2e-spec.ts:133`, `test/e2e/telegram-webhook.e2e-spec.ts:169`).
- CorrelationId propagation is implemented HTTP -> request context -> logger and HTTP response header (`src/common/middleware/correlation-id.middleware.ts:18`, `src/common/middleware/correlation-id.middleware.ts:19`, `src/common/logger/pino-logger.service.ts:24`), and validated in tests (`test/unit/correlation-id.middleware.spec.ts:32`, `test/e2e/telegram-webhook.e2e-spec.ts:113`).
- Queue-level deduplication by `jobId` is implemented and verified in e2e (`src/modules/telegram/telegram-queue-producer.service.ts:91`, `test/e2e/telegram-webhook.e2e-spec.ts:214`).

## What Is Incomplete or Stubbed
- All registered command/text/voice processors are stubs that log and return `Promise.resolve()`:
  - `task-parsing`, `voice-transcription`, `notifications`, `user-connection`, `invite-acceptance`, `invite-decline`, `assignee-revoke`, `assignments-list` (`src/modules/queue/processors/task-parsing.processor.ts:14`, `src/modules/queue/processors/voice-transcription.processor.ts:14`, `src/modules/queue/processors/notification.processor.ts:14`, `src/modules/queue/processors/user-connection.processor.ts:14`, `src/modules/queue/processors/invite-acceptance.processor.ts:14`, `src/modules/queue/processors/invite-decline.processor.ts:14`, `src/modules/queue/processors/assignee-revoke.processor.ts:14`, `src/modules/queue/processors/assignments-list.processor.ts:14`).
- `TELEGRAM_UPDATES` queue is registered, and a `TelegramUpdateProcessor` file exists, but that processor is not provided in `QueueModule` and is not referenced elsewhere (`src/modules/queue/queue.module.ts:31`, `src/modules/queue/queue.module.ts:48`, `src/modules/queue/processors/telegram-update.processor.ts:7`).
- `TELEGRAM_WEBHOOK_URL` is consumed by `TelegramService` for `setWebhook`, but it is not part of `EnvironmentSchema` validation (`src/modules/telegram/telegram.service.ts:19`, `src/config/validation.schema.ts:3`).
- Sprint 1 integration test for queue dedup could not complete due DB global setup failure (`test/integration/telegram-queue-producer.integration-spec.ts:32`, `test/setup-global.ts:17` runtime failure).

## Risks & Architectural Smells
- Idempotency guarantee is limited to BullMQ jobId deduplication (`telegram-update-{update_id}`) at enqueue level; duplicate webhook deliveries still execute pre-enqueue logic (secret validation, payload validation, user upsert, enqueue call path) (`src/modules/telegram/telegram-webhook.service.ts:39`, `src/modules/telegram/telegram-webhook.service.ts:52`, `src/modules/telegram/telegram-queue-producer.service.ts:111`).
- Queue topology includes an inactive/ambiguous ingress artifact (`TELEGRAM_UPDATES` queue + processor file) while active ingress routes directly to downstream queues (`src/modules/queue/queue.module.ts:31`, `src/modules/telegram/telegram-queue-producer.service.ts:59`, `src/modules/queue/processors/telegram-update.processor.ts:7`).
- Processor layer currently provides no side-effect behavior beyond logging in the command path, including `/connect_user` (`src/modules/queue/processors/user-connection.processor.ts:16`).
- Test signal is asymmetric: unit and e2e pass, but integration suite entrypoint for Sprint 1 queue producer is currently not executable due setup failure.

## Sprint 1 DoD Status
- Sprint 1 DoD is **not fully met**.
- Facts supporting status:
  - Webhook ingress, validation taxonomy, user upsert, queue enqueue routing, queue dedupe key, and correlationId propagation are implemented and validated by unit/e2e tests.
  - Processor layer for queued jobs is stubbed (log-only) across all active Sprint 1 queues.
  - One Sprint 1 integration test target (`telegram-queue-producer.integration-spec.ts`) is not currently runnable due global setup DB error.
- Sprint 1 cannot be stated as safely preceding Sprint 1.5 under this audit.

## BLOCKERS for Sprint 1.5
- `BLOCKER`: `/connect_user` command path has enqueue + consumption, but the consumer is stubbed (log-only) and produces no persisted or externally consumable auth-linking artifact (`src/modules/telegram/telegram-queue-producer.service.ts:64`, `src/modules/queue/processors/user-connection.processor.ts:14`).
- `BLOCKER`: Sprint 1 queue-producer integration test path is currently failing during global DB setup, so queue-dedupe behavior lacks a passing integration signal in current state (`test/integration/telegram-queue-producer.integration-spec.ts:32`, runtime error from `test/setup-global.ts`).

## Explicit Unknowns
- `UNKNOWN`: Authoritative intended ingestion architecture between direct webhook routing and `TELEGRAM_UPDATES` queue path is not explicitly declared in Sprint 1 artifacts present in this repository snapshot.
- `UNKNOWN`: No `ai-sprint/sprint-1` planning/spec files existed before this audit run, so the exact original Sprint 1 acceptance text is not available for direct line-by-line DoD mapping.
