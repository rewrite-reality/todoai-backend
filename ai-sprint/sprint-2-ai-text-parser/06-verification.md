# Sprint 2 Verification Runbook (Production)

## Scope and Evidence
- Sprint: `Sprint 2 - AI Text Parser`
- Source documents reviewed:
- `ai-sprint/sprint-2-ai-text-parser/01-audit.md`
- `ai-sprint/sprint-2-ai-text-parser/02-architecture.md`
- `ai-sprint/sprint-2-ai-text-parser/03-database.sql`
- `ai-sprint/sprint-2-ai-text-parser/04-implementation.diff`
- `ai-sprint/sprint-2-ai-text-parser/05-tests.diff`
- `ai-sprint/sprint-roadmap/sprint-roadmap.md` (Sprint 2 DoD section)
- Repository runtime/tests verified on `2026-02-07`.

## 1. Prerequisites
### 1.1 Runtime
- Node.js `20+`
- npm `10+`
- PostgreSQL reachable from `DATABASE_URL`
- Redis reachable from `REDIS_HOST`/`REDIS_PORT`
- For local test infra: `docker compose -f docker-compose.test.yml up -d`

### 1.2 Required env variables for Sprint 2
- `AI_TEXT_PROVIDER`
- Allowed: `mock | deepseek`
- Default: `mock`
- `DEEPSEEK_API_KEY`
- Required only when `AI_TEXT_PROVIDER=deepseek`
- `DEEPSEEK_BASE_URL`
- Default: `https://api.deepseek.com/v1`
- `DEEPSEEK_MODEL`
- Default: `deepseek-chat`
- `AI_TIMEOUT_MS`
- Default: `30000`
- Core app vars must exist: `DATABASE_URL`, `REDIS_HOST`, `REDIS_PORT`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_URL`, `TELEGRAM_WEBHOOK_SECRET`, `JWT_SECRET`, `ENCRYPTION_KEY`

### 1.3 Provider profiles
- `mock` (recommended for verification pipeline):
```env
AI_TEXT_PROVIDER=mock
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
AI_TIMEOUT_MS=30000
```
- `deepseek` (staging/prod-like):
```env
AI_TEXT_PROVIDER=deepseek
DEEPSEEK_API_KEY=<set secret>
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
AI_TIMEOUT_MS=30000
```

## 2. BLOCKERs and Risks from Audit
From `ai-sprint/sprint-2-ai-text-parser/01-audit.md`:
1. BLOCKER: core `task-parsing` pipeline was non-functional (stub processor).
2. BLOCKER: no production-safe DeepSeek contract/provider switch.
3. BLOCKER: no verification net (unit/integration/e2e coverage).

Current repository status (2026-02-07):
- BLOCKER 1: resolved in code/tests (`task-parsing` orchestrator + persistence + notifications exist).
- BLOCKER 2: resolved in code/tests (`AI_TEXT_PROVIDER`, `DeepSeekTextParser`, timeout/rate-limit mappings exist).
- BLOCKER 3: largely resolved (unit/integration/e2e suites exist and pass), but one Sprint 2 scenario is still skipped (see `Known Risks`).

## 3. Migration and DB Verification
## 3.1 Current migration strategy in repo
- Production style: Prisma migrations in `prisma/migrations/*`.
- Test style: `test/setup-global.ts` drops schema and applies each SQL migration file in order.
- Sprint 2 raw SQL and index normalization are already included in migration `prisma/migrations/20260207191228_sprint2_db_patch/migration.sql`.

## 3.2 Safe migration sequence (prod)
1. Put service in maintenance mode (or scale down workers) before schema change.
2. Backup DB.
```bash
pg_dump "$DATABASE_URL" -Fc -f backup_pre_sprint2_$(date +%Y%m%d_%H%M%S).dump
```
3. Apply Prisma migrations.
- No npm script exists for Prisma migrations in `package.json`.
- Use explicit command:
```bash
npx prisma migrate deploy
```
4. Generate client.
- No npm script exists for client generation.
```bash
npx prisma generate
```
5. Verify migration state:
```bash
npx prisma migrate status
```
6. Run DB assertions (from `03-database.sql` verify block) to confirm:
- `TaskStatus` contains `PARSE_FAILED`
- tables `task_assignees`, `invites`, `project_members` exist
- partial indexes exist:
- `uq_task_assignee_active`
- `uq_task_assignee_pending_username`
- `uq_project_member_active`

## 3.3 Applying `03-database.sql` explicitly (raw SQL path)
Use only when needed (hotfix/manual sync), because repo already includes equivalent migration SQL.

- Dev/Test manual apply:
```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f ai-sprint/sprint-2-ai-text-parser/03-database.sql
```
- Prod manual apply:
```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -1 -f ai-sprint/sprint-2-ai-text-parser/03-database.sql
```

Notes:
- File is idempotent (`IF NOT EXISTS`, guarded enum/table/index changes).
- After manual SQL apply, sync Prisma migration history if needed:
```bash
npx prisma migrate resolve --applied 20260207191228_sprint2_db_patch
```

## 3.4 Environment-specific commands
- Dev (iterating schema): `npx prisma migrate dev`
- Test harness: `npm run test:integration` / `npm run test:e2e` auto-reset schema via `test/setup-global.ts`
- Prod: `npx prisma migrate deploy` only

## 4. Test Runbook
Order required by verification gate:
1. Lint
```bash
npm run lint
```
2. Unit
```bash
npm run test:unit
```
3. Integration
```bash
npm run test:integration
```
4. E2E
```bash
npm run test:e2e
```

Pass criteria:
- Exit code `0` for each command.
- No failed suites.
- For Sprint 2 specifically, green suites must include:
- `test/unit/parsed-task.validator.unit-spec.ts`
- `test/unit/deepseek-prompt.unit-spec.ts`
- `test/unit/deepseek-response-parser.unit-spec.ts`
- `test/unit/notification-formatter.unit-spec.ts`
- `test/integration/deepseek-text.parser.integration-spec.ts`
- `test/integration/task-write.integration-spec.ts`
- `test/integration/task-parsing.orchestrator.integration-spec.ts`
- `test/integration/schema-migration.integration-spec.ts`
- `test/e2e/task-parsing.e2e-spec.ts`

Observed on `2026-02-07`:
- `npm run lint`: pass
- `npm run test:unit`: pass (`10` suites, `50` tests)
- `npm run test:integration`: pass (`8` suites, `34` tests)
- `npm run test:e2e`: pass (`4` suites, `32` passed, `1` skipped)

## 5. Manual Verification Scenarios
## 5.1 Webhook latency invariant (< 1s)
Goal: confirm webhook path remains thin, heavy work in queue.

1. Start app:
```bash
npm run start:dev
```
2. Simulate Telegram update locally (no real Telegram required):
```bash
curl -X POST "http://127.0.0.1:3000/webhook/telegram" \
  -H "Content-Type: application/json" \
  -H "x-telegram-bot-api-secret-token: $TELEGRAM_WEBHOOK_SECRET" \
  -H "x-correlation-id: sprint2-manual-webhook-1" \
  -d '{"update_id":900001,"message":{"message_id":101,"text":"Prepare release: write changelog, run regression","from":{"id":777001,"username":"manual_user"},"chat":{"id":880001}}}'
```
3. Expect immediate HTTP `200 {"ok":true}` and low latency.
4. Confirm queue-side processing in logs (`task-parsing` and `notifications`).

Reference: existing e2e contract `test/e2e/telegram-webhook.e2e-spec.ts` asserts `<200ms`, which is a stricter proxy for `<1s`.

## 5.2 Manual scenario: `AI_TEXT_PROVIDER=mock`
Goal: verify success, fallback, idempotency without external AI.

1. Set env:
```env
AI_TEXT_PROVIDER=mock
```
2. Trigger parse via webhook simulation (example above).
3. Validate in DB:
- `tasks.status=TODO`
- subtasks persisted
- `original_input` filled
4. Validate notification job exists by id:
- `task-parsing-notification-<idempotencyKey>`
5. Fallback check:
- Send text containing marker `[[mock-invalid-json]]` (first attempt invalid -> corrective retry).
- Send text containing `[[mock-provider-error]]` to force provider error path.
- Confirm fallback task with `status=PARSE_FAILED` and fallback notification text containing error code.
6. Idempotency check:
- Re-submit same business payload (same `chatId/messageId/text`) and confirm no duplicate DB effects.

## 5.3 Manual scenario: `AI_TEXT_PROVIDER=deepseek`
Safe staging approach (preferred):
1. Set provider/env to deepseek.
2. Use mock HTTP endpoint for DeepSeek-compatible API where possible.
3. Run integration parser tests first:
```bash
npm run test:integration -- test/integration/deepseek-text.parser.integration-spec.ts
```
4. Run end-to-end parse flow with sample message and verify DB+notification outcomes.

Prod-like with real key:
1. Inject `DEEPSEEK_API_KEY` from secret manager, never commit to `.env`.
2. Send one controlled message via webhook simulation.
3. Check logs for:
- request metadata only (no full prompt)
- successful parse or mapped error (`AI_PARSE_RATE_LIMIT`, `AI_PARSE_TIMEOUT`, `AI_PARSE_PROVIDER_ERROR`)
4. Remove key from shell/session after test.

## 5.4 Direct queue injection (without webhook)
Use if webhook route is unavailable and you need pure processor verification.

1. Produce a valid `task-parsing` job payload matching `src/modules/queue/contracts/task-parsing.job.ts`:
- `userId` UUID
- `text` non-empty
- `telegramMessageId` int
- `telegramChatId` int
- `correlationId` string
- `idempotencyKey` string
2. Add job to queue name `task-parsing` with job name `parse-task`.
3. Verify terminal state and DB effects as in sections above.

Existing runnable reference for this path: `test/e2e/task-parsing.e2e-spec.ts` helper `enqueueTaskParsingJob`.

## 6. Observability Checklist
Expected log lines (or semantically equivalent):
- `Task parsing completed successfully`
- `AI output invalid, executing corrective retry`
- `Task parsing switched to fallback`
- `Task parsing fallback task persisted`
- `Task parsing skipped due to idempotency hit`
- `Notification job received`
- `Notification sending skipped in test environment` (test only)

Correlation propagation checks:
- `x-correlation-id` from HTTP response header must equal request header for webhook/auth flows.
- Same `correlationId` must appear in queue processor logs (`task-parsing`, `notifications`).

Expected error codes during negative checks:
- Webhook/API: `TELEGRAM_INVALID_SECRET`, `TELEGRAM_INVALID_PAYLOAD`
- Queue payload: `QUEUE_JOB_PAYLOAD_INVALID`
- AI parsing: `AI_PARSE_INVALID_JSON`, `AI_PARSE_ZOD_VALIDATION`, `AI_PARSE_TIMEOUT`, `AI_PARSE_RATE_LIMIT`, `AI_PARSE_PROVIDER_ERROR`
- Persistence: `TASK_CREATE_FAILED`
- Notification send path: `QUEUE_NOTIFICATION_SEND_FAILED`

## 7. Rollback Plan
## 7.1 Immediate mitigation (no schema rollback)
1. Stop traffic/workers (or scale service to zero workers).
2. Switch parser provider to mock:
```env
AI_TEXT_PROVIDER=mock
```
3. Restart service.
4. Verify webhook and queue stability with mock flow.

## 7.2 Application rollback
1. Deploy previous stable application artifact.
2. Keep DB at migrated state unless strict schema rollback is required.
3. Re-run smoke checks:
- webhook 200 path
- queue processing health
- health endpoint

## 7.3 Database rollback (strict)
Primary method (recommended): restore pre-migration backup.
```bash
pg_restore --clean --if-exists --no-owner -d "$DATABASE_URL" backup_pre_sprint2_<timestamp>.dump
```

Reason: Prisma migrations are forward-only; enum/value/index/table rollback is safest through backup restore in production.

## 8. Known Risks
1. `test/e2e/task-parsing.e2e-spec.ts` contains one skipped test for multi-task parse scenario (historical index/order conflict). Full DoD item for multi-task e2e is not explicitly green yet.
2. E2E logs show intermittent BullMQ `Missing key for job ... moveToFinished` console error while suite still passes; race condition risk exists in queue cleanup/obliterate flow.
3. Secrets are present in local `.env`/`.env.test`; rotate before production usage.

## 9. BLOCKERs (Current)
1. BLOCKER: `npx prisma migrate status` can fail in restricted network environments because Prisma engine download from `binaries.prisma.sh` is required on first run. For release gates, ensure outbound access or pre-cached Prisma engine binaries.
2. BLOCKER: Sprint 2 DoD item "mock AI returns multiple tasks -> all created in DB" is not fully represented by an active e2e test due skipped case; require unskip+green before strict DoD sign-off.

## 10. Acceptance Checklist (Sprint 2 DoD)
Checklist mirrored from `ai-sprint/sprint-roadmap/sprint-roadmap.md` Sprint 2 DoD.

- [x] Mock AI parser creates task + subtasks through processor.
- [x] DeepSeek parser called with correct prompt and `DEEPSEEK_API_KEY` contract.
- [x] DeepSeek parser handles JSON including markdown code-block wrapping.
- [x] Zod validation rejects invalid JSON payloads.
- [x] Retry with corrective prompt on first Zod/invalid JSON error.
- [x] Fallback on AI failure creates task with `originalInput` and `PARSE_FAILED`.
- [x] Notification job is created after DB write.
- [x] Idempotency prevents duplicate DB effects for same job key.
- [x] DeepSeek rate-limit (429) mapped correctly.
- [x] DeepSeek timeout (30s) mapped correctly.
- [x] Migration creates/keeps `task_assignees`, `invites`, `project_members` with expected structure.
- [x] Partial unique indexes verified by integration tests.
- [x] Prisma relations for Sprint 2 models exist in schema.
- [ ] All Sprint 2 e2e scenarios fully green with no skipped case (multi-task case still skipped).
