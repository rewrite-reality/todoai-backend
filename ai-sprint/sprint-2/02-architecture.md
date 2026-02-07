# Sprint 2 Target Architecture (Design-Only)

## 0. Source of Truth and Constraints
- Immutable inputs used: `ai-sprint/01-audit.md`, `prisma/schema.prisma`.
- Stack constraints: NestJS + BullMQ + Prisma only.
- Audit blockers are mandatory constraints, not optional improvements.

## 1. Mandatory BLOCKERS from Audit
- `B1` AI runtime path is non-operational (AI module not wired, AI processors empty).
- `B2` Queue processors are stubs (no Sprint 2 domain mutations).
- `B3` No explicit Prisma transaction boundaries for multi-entity workflows.
- `B4` Idempotency exists only at BullMQ `jobId` level; no domain-level idempotency.
- `B5` AI config contract mismatch (`AI_API_KEY` vs `OPENAI_API_KEY`) + missing env validation.
- `B6` Ambiguous ingress path (`telegram-updates` processor exists but is not active in `QueueModule`).
- `U1/BLOCKER` No single authoritative ingestion pattern (direct routing vs `telegram-updates` queue).
- `U2/BLOCKER` DB migration/runtime state per environment is unknown from repo snapshot.

## 2. Target Component Architecture (Sprint 2)
Single authoritative ingress: **Telegram webhook -> direct queue routing via `TelegramQueueProducerService`**.  
`TELEGRAM_UPDATES` processor path remains disabled in Sprint 2 to eliminate split-brain flow (`U1/BLOCKER`).

### 2.1 Module-Level Structure
- `TelegramModule`:
  - Validates webhook input/secret.
  - Upserts user.
  - Normalizes command/text/voice and enqueues one job per update.
- `QueueModule`:
  - Owns BullMQ workers (processors only orchestration + retry semantics).
  - No domain logic in processor beyond orchestration, idempotency check, and error mapping.
- `AiModule`:
  - Must be imported in `AppModule` (resolves `B1` design requirement).
  - Exposes AI abstraction interface, not provider-specific details.
- Domain services (application layer):
  - `TaskParsingService`
  - `VoiceTranscriptionService`
  - `InviteService`
  - `AssignmentService`
  - `NotificationService`
  - All DB mutations happen here, not in processors.
- `PrismaModule`:
  - Transaction ownership for each use-case unit.

### 2.2 Processor Boundaries (strict)
- Processor responsibilities:
  - Deserialize and validate job payload shape.
  - Establish correlation context.
  - Execute one application use-case.
  - Map thrown errors into retryable/non-retryable categories.
  - Emit terminal failure event for non-retryable cases.
- Processor non-responsibilities:
  - No prompt construction.
  - No direct multi-step domain mutation logic.
  - No Telegram message formatting rules.

## 3. AI Abstraction (Provider-Agnostic)
Define an internal port:

- `AiTaskParserPort.parse(input, context) -> ParsedTaskResult`
- `AiMutationPort.apply(plan, context) -> MutationResult`

`ParsedTaskResult` envelope:
- `status`: `SUCCESS | SOFT_FAIL | HARD_FAIL`
- `data`: parsed payload (when `SUCCESS`)
- `meta`: model, token usage, raw provider id
- `error`: normalized AI error code (when fail)

Adapters:
- `OpenAiAdapter` (current default).
- Future adapters allowed, but hidden behind same port.

Key design rule:
- **`AiService` never silently returns a fake success task on provider/schema failure**.  
  Current fallback behavior (generic task) is replaced by explicit `SOFT_FAIL` to avoid hidden data corruption.

## 4. Idempotency Model (Required for B4)
Queue `jobId` dedupe is not sufficient due retention window.

### 4.1 Inbound Idempotency Key
- Canonical key: `telegram-update-{update_id}` (already exists).
- Persist processing state in DB ledger (new design artifact): `InboundEvent`.
  - Fields: `externalKey`, `flowType`, `status`, `errorCode`, `startedAt`, `finishedAt`, `correlationId`.
  - Unique index on `externalKey`.

### 4.2 Worker Behavior
- Before domain mutation: `try begin processing` with unique key.
- If already `COMPLETED`: acknowledge and skip.
- If `IN_PROGRESS` with stale lock timeout: allow safe recovery (worker crash case).
- All domain writes and ledger finalization happen in one transaction boundary per use case.

## 5. End-to-End Data Flow (text -> AI -> DB -> notification)
1. Telegram webhook validates secret/payload and upserts user.
2. `TelegramQueueProducerService` enqueues `TASK_PARSING` with `jobId=telegram-update-{id}` and correlation id.
3. `TaskParsingProcessor` checks idempotency ledger.
4. Processor calls `TaskParsingService.execute(payload)`.
5. `TaskParsingService` calls `AiTaskParserPort.parse(...)`.
6. If `SUCCESS`, service writes task/subtasks/action history in one Prisma transaction.
7. Service enqueues notification command (or direct notify service call depending on latency budget; default queue-based).
8. `NotificationProcessor` formats and sends Telegram response.
9. Idempotency ledger marked `COMPLETED`.

Voice flow is identical except first stage is `VOICE_TRANSCRIPTION` -> transcription result -> `TASK_PARSING`.

## 6. Transaction Boundaries (Prisma)
Each use-case must define explicit `$transaction` scope:

### 6.1 Parse Text to Task
Single transaction:
- create task
- create subtasks
- write `ActionHistory` (`AI_MUTATION` or `CREATE`)
- mark idempotency event `COMPLETED`

### 6.2 Accept Invite / Connect User
Single transaction:
- lock invite by token/status
- transition invite `PENDING -> ACCEPTED` (or reject if invalid)
- resolve/update `TaskAssignee` (`PENDING -> CONNECTED`)
- optional `ProjectMember` creation (if scope requires)
- mark event `COMPLETED`

### 6.3 Decline Invite
Single transaction:
- validate invite state
- set invite `DECLINED` (or `REVOKED` per command semantics)
- update linked `TaskAssignee` to `DECLINED`
- mark event `COMPLETED`

### 6.4 Revoke Assignee
Single transaction:
- validate ownership/permission
- set `TaskAssignee.status=REVOKED`, `revokedAt`
- audit in `ActionHistory`
- mark event `COMPLETED`

## 7. Error Taxonomy (Normalized)
Errors are typed and mapped centrally:

- `VALIDATION_*` (payload/command/format): non-retryable.
- `AUTH_*` (webhook secret/permission): non-retryable.
- `AI_RATE_LIMIT`, `AI_TIMEOUT`, `AI_TEMPORARY_UNAVAILABLE`: retryable.
- `AI_SCHEMA_INVALID`: non-retryable for same payload (go to deterministic fallback branch).
- `DB_CONFLICT_RETRYABLE` (deadlock/transient): retryable.
- `DB_CONSTRAINT_*` (business invariant violated): non-retryable.
- `INTEGRATION_TELEGRAM_*`:
  - 5xx/timeouts: retryable
  - 4xx permanent: non-retryable.
- `IDEMPOTENCY_DUPLICATE`: success-noop (not failure).

## 8. Fallback Flow (Deterministic, Non-Magical)
Fallback decision order:
1. AI temporary error (`timeout`, `rate limit`) -> retry by BullMQ policy.
2. AI schema-invalid or hard fail -> deterministic parser fallback:
   - create one task with normalized original text and `aiProcessedAt = null`.
   - add metadata flag `ai_fallback=true` (in action payload / task summary marker).
3. DB/business invariant fail -> do not retry endlessly; emit failure notification to user/admin channel.
4. Notification send fail -> retries in notification queue; domain transaction must stay committed.

Important:
- Fallback must be explicit in persisted audit trail (`ActionHistory.payload`), never silent.

## 9. Queue Topology for Sprint 2
Keep active:
- `TASK_PARSING`
- `VOICE_TRANSCRIPTION`
- `NOTIFICATIONS`
- `USER_CONNECTION`
- `INVITE_ACCEPTANCE`
- `INVITE_DECLINE`
- `ASSIGNEE_REVOKE`
- `ASSIGNMENTS_LIST`

Deactivate as runtime path in Sprint 2:
- `TELEGRAM_UPDATES` worker route (retain queue registration only if needed for backward compatibility, but no parallel ingress).

## 10. Key Risks and Mitigations
- Risk: duplicate domain writes from retries/replays.
  - Mitigation: DB idempotency ledger + unique external key.
- Risk: AI provider instability.
  - Mitigation: typed retry policy + deterministic fallback + explicit audit marking.
- Risk: inconsistent config across envs (`B5`).
  - Mitigation: single canonical env contract validated in schema.
- Risk: migration drift (`U2/BLOCKER`).
  - Mitigation: explicit pre-release migration verification gate (blocking checklist item).

## 11. Sprint 2 Architectural Exit Criteria
- Exactly one ingress routing pattern is active (resolves `U1/BLOCKER`).
- AI abstraction is wired through module graph and used only via ports (resolves `B1` design target).
- Every mutation use-case has explicit transaction boundary (resolves `B3` design target).
- Domain-level idempotency exists beyond BullMQ retention window (resolves `B4` design target).
- Error taxonomy drives retry/fail decisions consistently across processors.
- All fallback branches are explicit and auditable.
