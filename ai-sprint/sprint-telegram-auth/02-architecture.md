# Sprint 1.5 Architecture - Telegram initData Authentication

## 1. Module Structure

### 1.1 Auth module composition
- `src/modules/auth/auth.module.ts`
  - Imports: `ConfigModule`, `UserModule`
  - Controllers: `AuthController`
  - Providers: `AuthService`, `InitDataValidationService`, `JwtTokenService`
  - Exports: `AuthService`, `JwtTokenService`

### 1.2 HTTP/API layer
- `src/modules/auth/auth.controller.ts`
  - Route: `POST /auth/telegram`
  - Marked public (guard exclusion)
  - Accepts body `{ initData: string }`
  - Returns `{ accessToken, tokenType: 'Bearer', expiresIn, user }`

### 1.3 Domain services
- `src/modules/auth/auth.service.ts`
  - Orchestrates: validate initData -> upsert user -> issue JWT
- `src/modules/auth/services/init-data-validation.service.ts`
  - Telegram WebApp initData validation and parsing
- `src/modules/auth/services/jwt-token.service.ts`
  - JWT sign/verify using `jsonwebtoken` (`HS256` only)

### 1.4 Guard/decorators/interfaces
- `src/common/guards/jwt-auth.guard.ts`
  - Global HTTP auth guard
- `src/common/decorators/public.decorator.ts`
  - `@Public()` metadata for excluded routes
- `src/common/interfaces/authenticated-request.interface.ts`
  - Typed request contract with `request.user`
- `src/types/express.d.ts` (modify)
  - Extend Express `Request` with `user?: JwtPayload`

### 1.5 Registration points
- `src/app.module.ts` (modify)
  - Add `AuthModule` to imports
  - Register global guard with `APP_GUARD -> JwtAuthGuard`

## 2. initData Validation Algorithm (Telegram Spec)

Input: raw initData query string from Mini App (`application/x-www-form-urlencoded` format)

1. Reject if empty/non-string -> `AUTH_INVALID_INIT_DATA`.
2. Parse via `URLSearchParams`.
3. Extract required params:
   - `hash` (required)
   - `auth_date` (required)
   - `user` (required JSON)
   Missing/invalid format -> `AUTH_INVALID_INIT_DATA`.
4. Build `data_check_string`:
   - Take all pairs except `hash`.
   - Keep original decoded values.
   - Sort by key in ascending lexicographic order.
   - Join as `key=value` lines with `\n`.
5. Compute secret key:
   - `secret_key = HMAC_SHA256(key='WebAppData', message=BOT_TOKEN)` (binary digest).
6. Compute expected hash:
   - `expected_hash = HMAC_SHA256(key=secret_key, message=data_check_string)` (hex lowercase).
7. Compare `expected_hash` vs provided `hash` with timing-safe comparison (`timingSafeEqual` on buffers).
   - Mismatch -> `AUTH_INIT_DATA_HASH_MISMATCH`.
8. Validate freshness:
   - Parse `auth_date` as Unix seconds.
   - `nowSeconds - auth_date <= INIT_DATA_MAX_AGE_SECONDS`.
   - If exceeded -> `AUTH_INIT_DATA_EXPIRED`.
9. Parse `user` JSON and validate minimum fields:
   - `id` (number), optional `username`, `first_name`, `last_name`, `photo_url`, `language_code`.
   - Invalid JSON/shape -> `AUTH_INVALID_INIT_DATA`.
10. Return normalized payload for auth flow.

Notes:
- HMAC is SHA-256 only.
- No SHA-512 and no plain hash operations.

## 3. JWT Strategy

### 3.1 Decision
Use manual `jsonwebtoken` (not `@nestjs/jwt`) because audit shows `@nestjs/jwt` is not installed.

### 3.2 Signing config
- Algorithm: `HS256` only
- Secret: `JWT_SECRET`
- Expiry: `JWT_EXPIRES_IN` (default `1h`)
- Token type: Bearer

### 3.3 Payload shape
- `sub`: stringified Telegram user id (`telegramId`) to preserve BigInt safety in JWT/JSON
- `uid`: internal DB UUID (`User.id`) to avoid DB lookup on every request
- `username`: optional Telegram username snapshot
- standard claims: `iat`, `exp`

### 3.4 Verification rules
- Accept only algorithm `HS256`
- Reject malformed/expired token -> `AUTH_UNAUTHORIZED`

## 4. AuthGuard Design

### 4.1 Scope
Global guard via `APP_GUARD`.

### 4.2 Excluded endpoints
- `GET /health`
- `POST /auth/telegram`
- `POST /webhook/telegram`

Exclusion mechanism:
- Primary: `@Public()` decorator on these handlers/controllers.
- Safety fallback in guard: path/method allowlist for the three endpoints above.

### 4.3 Runtime flow
1. If route is public -> `true`.
2. Read `Authorization: Bearer <token>`.
3. Missing/invalid header -> `AUTH_UNAUTHORIZED`.
4. Verify JWT via `JwtTokenService.verifyAccessToken()`.
5. Attach decoded payload to `request.user`.
6. Return `true`.

No per-request DB read in guard.

## 5. User Upsert Logic

## 5.1 Source mapping (`initData.user` -> Prisma `User`)
- `user.id` -> `User.telegramId` (`BigInt`)
- `user.username` / `user.first_name` / `user.last_name` -> `User.telegramName`
  - Rule: `username` first; else `first_name + last_name`; else `telegram:<id>`
- `user.photo_url` -> `User.telegramPhoto`
- `user.language_code` -> `User.locale`
  - normalize to lowercase, keep max 10 chars (fits schema)

### 5.2 Upsert behavior
- Lookup key: `telegramId` unique index.
- `create`:
  - `telegramId`, `telegramName`, `telegramPhoto` (if provided), `locale` (if provided else schema default).
- `update`:
  - always refresh `telegramName` from latest initData
  - update `telegramPhoto` only when provided non-empty
  - update `locale` only when provided non-empty
  - never overwrite with `null`/`undefined`

### 5.3 Conflict with Sprint 1 webhook upsert
Current Sprint 1 webhook path updates only `telegramName`. To avoid divergent behavior:
- Keep one canonical method in `UserService` used by both webhook and mini-app auth.
- Webhook calls same method with partial data (no photo/language).
- Mini-app auth calls same method with full user payload.
- This avoids two independent upsert implementations.

## 6. Migration Plan

### 6.1 Need for schema change
No schema change required.

Audit confirms required destination fields already exist:
- `telegram_photo` (`telegramPhoto`)
- `locale`

### 6.2 Migration artifact
- Migration name: `none` (do not create migration for Sprint 1.5)
- SQL: `none`

Rationale: No new columns/indexes are required for Sprint 1.5 scope.

## 7. Error Codes

All auth failures must follow global error envelope: `{ error: { code, message, details? } }`.

- `AUTH_INVALID_INIT_DATA`
  - malformed initData string, missing required fields, invalid JSON
  - HTTP 400
- `AUTH_INIT_DATA_EXPIRED`
  - `auth_date` older than allowed max age
  - HTTP 401
- `AUTH_INIT_DATA_HASH_MISMATCH`
  - HMAC verification failed
  - HTTP 401
- `AUTH_UNAUTHORIZED`
  - missing/invalid/expired bearer token
  - HTTP 401
- `AUTH_USER_NOT_FOUND`
  - reserved for future token->user resolution paths; not expected in guard path that trusts JWT claims
  - HTTP 404
- `AUTH_USER_CREATE_FAILED`
  - DB upsert/create failure in `/auth/telegram`
  - HTTP 500 (or mapped DB exception when available)

## 8. Env Vars

Required runtime vars for Sprint 1.5:
- `BOT_TOKEN`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `INIT_DATA_MAX_AGE_SECONDS` (default `300`)

Compatibility with audited current config:
- Current repo uses `TELEGRAM_BOT_TOKEN`.
- Design: `BOT_TOKEN` is canonical for initData validation, with fallback to `TELEGRAM_BOT_TOKEN` during migration period to avoid breaking current Sprint 1 webhook setup.

## 9. Test Helper Design

File: `test/helpers/generate-valid-init-data.ts`

Signature:
- `generateValidInitData(botToken: string, userData: InitDataUser, overrides?: Partial<{ authDate: number; queryId: string; startParam: string }>): string`

Behavior:
1. Build params map:
   - `auth_date` default: current Unix seconds
   - `query_id` default deterministic test value
   - `user` JSON-stringified `userData`
   - optional `start_param`
2. Build `data_check_string` with Telegram sort/join rules.
3. Derive `secret_key = HMAC_SHA256('WebAppData', botToken)`.
4. Derive `hash = HMAC_SHA256(secret_key, data_check_string)` hex.
5. Return URL-encoded query string containing all params plus `hash`.

Also provide companion helper for negative tests:
- tamper one field after hash generation to force `AUTH_INIT_DATA_HASH_MISMATCH`.

## 10. Interface Definitions

```ts
export interface InitDataUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
}
```

```ts
export interface InitDataPayload {
  auth_date: number;
  hash: string;
  query_id?: string;
  start_param?: string;
  chat_type?: string;
  chat_instance?: string;
  user: InitDataUser;
  raw: string;
  dataCheckString: string;
}
```

```ts
export interface JwtPayload {
  sub: string; // telegramId serialized from BigInt
  uid: string; // internal User.id UUID
  username?: string;
  iat?: number;
  exp?: number;
}
```

```ts
import type { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
```

## 11. Interaction with Existing Auth (Sprint 1 Webhook Secret)

Coexistence model:
- `/webhook/telegram` remains protected by Telegram header secret (`x-telegram-bot-api-secret-token`) inside `TelegramWebhookService.validateSecret`.
- Global JWT guard explicitly excludes `/webhook/telegram`.
- `/auth/telegram` is public because it is the JWT issuance endpoint.
- All other protected business endpoints use JWT bearer auth via global guard.

This prevents cross-interference:
- Webhook flow does not require JWT.
- Client API flow does not use webhook secret.

## 12. File Tree (Create/Modify)

```text
ai-sprint/
L- sprint-telegram-auth/
   L- 02-architecture.md                         (create) This document

src/
+- app.module.ts                                 (modify) Register AuthModule + APP_GUARD
+- config/
¦  +- configuration.ts                           (modify) Add BOT_TOKEN/JWT_EXPIRES_IN/INIT_DATA_MAX_AGE_SECONDS mapping (+ TELEGRAM_BOT_TOKEN fallback)
¦  L- validation.schema.ts                       (modify) Validate BOT_TOKEN/JWT_EXPIRES_IN/INIT_DATA_MAX_AGE_SECONDS
+- common/
¦  +- decorators/
¦  ¦  L- public.decorator.ts                     (create) Route-level public metadata
¦  +- guards/
¦  ¦  L- jwt-auth.guard.ts                       (create) Global bearer auth guard with exclusion logic
¦  L- interfaces/
¦     L- authenticated-request.interface.ts      (create) Typed authenticated request contract
+- modules/
¦  +- auth/
¦  ¦  +- auth.module.ts                          (modify from empty) Auth DI wiring
¦  ¦  +- auth.controller.ts                      (modify from empty) POST /auth/telegram
¦  ¦  +- auth.service.ts                         (modify from empty) Auth orchestration
¦  ¦  +- interfaces/
¦  ¦  ¦  +- init-data.interface.ts               (create) InitDataPayload + InitDataUser
¦  ¦  ¦  L- jwt-payload.interface.ts             (create) JwtPayload
¦  ¦  L- services/
¦  ¦     +- init-data-validation.service.ts      (create) Telegram initData validation
¦  ¦     L- jwt-token.service.ts                 (create) JWT sign/verify (HS256)
¦  +- health/
¦  ¦  L- health.controller.ts                    (modify) Mark route public
¦  +- telegram/
¦  ¦  L- telegram.controller.ts                  (modify) Mark webhook route public
¦  L- user/
¦     L- user.service.ts                         (modify) Canonical telegram upsert supporting photo/locale
L- types/
   L- express.d.ts                               (modify) Add `Request.user?: JwtPayload`

test/
+- helpers/
¦  L- generate-valid-init-data.ts                (create) cryptographically valid initData generator
+- integration/
¦  L- auth-telegram.integration-spec.ts          (create) /auth/telegram success/failure cases
L- unit/
   +- init-data-validation.service.spec.ts       (create) Hash, expiry, malformed cases
   L- jwt-auth.guard.spec.ts                     (create) Exclusion list + request.user population

package.json                                     (modify) add `jsonwebtoken` (+ `@types/jsonwebtoken`)
.env.example                                     (modify) add new auth env vars
.env.test                                        (modify) add new auth env vars for tests
```

### Audit blockers affecting design
- None (matches `01-audit.md`: `BLOCKER: None`).
- Design note: there is a naming mismatch between required `BOT_TOKEN` and currently implemented `TELEGRAM_BOT_TOKEN`; handled via compatibility fallback.
