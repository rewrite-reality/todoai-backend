# Todo AI — Backend Development Sprint Plan

---

## Архитектурные инварианты (10 пунктов)

1. **Webhook < 1 с.** — `POST /webhook/telegram` отвечает `200 OK` мгновенно; любая логика тяжелее lookup/enqueue уходит в BullMQ. Валидация `X-Telegram-Bot-Api-Secret-Token` — единственная синхронная проверка.
    
2. **Zero-trust к LLM.** — Каждый ответ AI проходит Zod-валидацию. При `ZodError` — fallback: raw text сохраняется в `Task.originalInput`, задача создаётся с `status = PARSE_FAILED`, пользователь получает уведомление «Не удалось разобрать, сохранили как есть».
    
3. **BYOK (Bring Your Own Key).** — `User.encryptedApiKey` хранит AES-256-GCM + iv + authTag. Ключ расшифровывается **в памяти** на время единичного вызова OpenAI и сразу зануляется. Мастер-ключ `ENCRYPTION_KEY` — из env, не логируется, не сериализуется.
    
4. **Soft delete everywhere.** — Любой `DELETE` на уровне бизнес-сущностей → `SET deletedAt = NOW()`. Все SELECT-запросы по умолчанию добавляют `WHERE deletedAt IS NULL`. Физическое удаление — только cron после 30 дней.
    
5. **Idempotent processors.** — Каждый BullMQ job содержит уникальный `idempotencyKey` (для webhook: `telegramUpdateId`; для AI: `taskId + chatHash`). Processor перед работой делает `SELECT … WHERE idempotencyKey = ?`; если найден — skip.
    
6. **Apply-to-plan = транзакция + аудит.** — Внутри `$transaction`: snapshot текущих subtask/summary → запись в `ActionHistory.diff` → обновление `Task.summary` + upsert `Subtask[]`. Completed subtasks (`isCompleted = true`) **не удаляются и не переименовываются** (prompt constraint + post-validation).
    
7. **Selective exclusion (не deletion).** — Поле `ChatMessage.isExcluded` (boolean). Excluded-сообщения остаются в БД и видны пользователю (greyed-out), но **не включаются** в AI-контекст при apply-to-plan и copy-context.
    
8. **Correlation ID.** — Каждый входящий HTTP-запрос и каждый BullMQ job получает `x-correlation-id` (UUID v4). Он пробрасывается через все логи, в Telegram-уведомления (скрытым полем) и в `ActionHistory.correlationId`. Позволяет trace end-to-end.
    
9. **Ordering = fractional indexing.** — `Task.order` и `Subtask.order` — `String` (fractional index, напр. библиотека `fractional-indexing`). Reorder — single-row UPDATE без пересчёта всей таблицы. Cron `rebalance-order` нормализует индексы раз в сутки.
    
10. **Error taxonomy.** — Все ошибки возвращаются в формате `{ error: { code: string, message: string, details?: any } }`. Коды — namespaced: `TELEGRAM_*`, `AI_*`, `TASK_*`, `AUTH_*`, `QUEUE_*`. Каждый код задокументирован в error-registry и покрыт тестом.
    

---
## Sprint 0 — Test Harness & Contract Baseline

### Scope

Создать полную тестовую инфраструктуру, чтобы начиная со Sprint 1 каждый спринт мог писать тесты **до** реализации. Включает: test containers (Postgres + Redis), seed, фабрики сущностей, глобальные helpers, CI pipeline, health endpoint.

### Архитектурные решения

- **Test DB** — Testcontainers (Docker) для Postgres и Redis; перед каждым test suite — `prisma migrate reset --force` (или транзакция с rollback для ускорения).
- **Фабрики** — функции `createTestUser()`, `createTestTask()`, `createTestProject()` и т.д., возвращающие Prisma-объекты с дефолтами. Используют `faker` для случайных данных.
- `createTestTaskAssignee(overrides?)` — создаёт TaskAssignee с дефолтами (status=PENDING, telegramUsername=faker).
- `createTestInvite(overrides?)` — создаёт Invite с дефолтами (status=PENDING, token=uuid, expiresAt=+7d).
- `createTestProjectMember(overrides?)` — создаёт ProjectMember с дефолтами (role=MEMBER).
- **Supertest wrapper** — helper `app()` поднимает NestJS `INestApplication` один раз на suite, переиспользует между тестами.
- **Correlation ID** — middleware, который читает/генерирует `x-correlation-id` и кладёт в `AsyncLocalStorage`. Все последующие логи привязаны к нему.
- **Error response format** — глобальный `AllExceptionsFilter` приводит все ошибки к `{ error: { code, message, details? } }`.

### API Contracts

**`GET /health`**

text

text

```
Response 200:
{
  "status": "ok",
  "version": "0.1.0",
  "timestamp": "ISO8601",
  "services": {
    "database": "up",
    "redis": "up"
  }
}

Response 503:
{
  "error": {
    "code": "HEALTH_DEGRADED",
    "message": "One or more services unavailable",
    "details": { "database": "down", "redis": "up" }
  }
}
```

### Test Plan

**E2E:**

- `health.e2e-spec`: `GET /health → 200 when all services up`
- `health.e2e-spec`: `GET /health → 503 when Postgres is down` (stop container mid-test)
- `health.e2e-spec`: `GET /health → 503 when Redis is down`

**Integration:**

- `prisma-factory.integration-spec`: `createTestUser creates user in DB and returns valid shape`
- `prisma-factory.integration-spec`: `createTestTask with subtasks persists correctly`
- `prisma-factory.integration-spec`: `createTestTaskAssignee creates assignee linked to task and user`
- `prisma-factory.integration-spec`: `createTestInvite creates invite with valid token and expiry`
- `prisma-factory.integration-spec`: `createTestProjectMember creates membership with correct role`
- `test-app.integration-spec`: `NestJS test app boots and accepts HTTP requests`

**Unit:**

- `correlation-id.middleware.unit-spec`: `generates UUID if header missing`
- `correlation-id.middleware.unit-spec`: `reuses UUID from x-correlation-id header`

### Data / Migration Notes

- Начальная миграция уже существует (Prisma schema v2.2.0). Sprint 0 **не меняет** схему.
- Seed-скрипт `prisma/seed.ts` создаёт: 2 users, 3 projects, 5 tasks (с subtasks), 10 chat messages, 2 invites (1 PENDING, 1 ACCEPTED), 2 task assignees (1 PENDING, 1 CONNECTED), 1 project member (OWNER) — для ручного тестирования через Prisma Studio.
- Добавить поле `originalInput` в Task (text, nullable) — миграция `add-original-input`.

### Observability

- Pino logger с JSON-форматом, поле `correlationId` в каждом лог-сообщении.
- `GET /health` логирует `info` при 200, `warn` при 503.
- Метрика: `app_health_check_total{status=ok|degraded}` (placeholder counter, реальный Prometheus — Sprint 10).

### DoD

- [x]  `docker-compose -f docker-compose.test.yml up` поднимает Postgres + Redis в изолированных портах
- [x]  `npm run test:e2e` проходит green (≥ 8 тестов)
- [x]  `npm run test:unit` проходит green
- [x]  Фабрики `createTestUser`, `createTestTask`, `createTestProject`, `createTestChatMessage`, `createTestTaskAssignee`, `createTestInvite`, `createTestProjectMember` работают
- [x]  `GET /health` возвращает статус всех зависимостей
- [x]  Все ответы ошибок соответствуют формату `{ error: { code, message } }`
- [x]  `x-correlation-id` присутствует в response headers
- [x]  CI pipeline (GitHub Actions / etc.) запускает lint + unit + e2e
## Sprint 1 — Telegram Webhook + Queue Ingress + Security

### Scope

Принять Telegram Update через webhook, провалидировать secret header, определить тип сообщения (text / voice / command), auto-create User (upsert), положить job в BullMQ, ответить `200 OK` за < 100 мс. Никакой AI-обработки — только ingress.

### Архитектурные решения

- **Webhook secret** — при `setWebhook` Telegram получает `secret_token`. Каждый входящий запрос должен содержать `X-Telegram-Bot-Api-Secret-Token`. Если не совпадает — `403`.
- **User upsert** — по `message.from.id` (BigInt). Если юзера нет — создаём с `firstName`, `username` из update. Не блокирует основной flow.
- **Job routing** — processor `telegram-ingress` определяет тип:
    - `text` → добавляет job в `task-parsing` queue
    - `voice` → добавляет job в `voice-transcription` queue
    - `/start` → добавляет job в `notifications` queue (welcome message)
    - `/connect_user @username` → добавляет job в `user-connection` queue (stub: логирует `info` "Command recognized, handler not implemented yet", отправляет уведомление "Эта функция скоро будет доступна")
    - `/accept_invite <token>` → добавляет job в `invite-acceptance` queue (stub: аналогично)
    - `/decline_invite <token>` → добавляет job в `invite-decline` queue (stub: аналогично)
    - `/revoke_assignee <task_id>` → добавляет job в `assignee-revoke` queue (stub: аналогично)
    - `/my_assignments` → добавляет job в `assignments-list` queue (stub: аналогично)
    - Остальное → ignore, log `warn`
- **Idempotency** — `update_id` Telegram уникален. Job-id в BullMQ = `tg-${update_id}`. BullMQ по умолчанию дедуплицирует по jobId.

### API Contracts

**`POST /webhook/telegram`**

text

text

```
Headers (required):
  X-Telegram-Bot-Api-Secret-Token: string

Body: Telegram Update object (https://core.telegram.org/bots/api#update)

Response 200: { "ok": true }

Errors:
  403 TELEGRAM_INVALID_SECRET — "Invalid webhook secret token"
  400 TELEGRAM_INVALID_PAYLOAD — "Malformed Telegram update"
  429 TELEGRAM_RATE_LIMITED — "Too many requests from this user" (per-user, 10 req/s)
```

**Internal: Queue job schemas**

text

text

```
Queue: task-parsing
Job data: {
  userId: BigInt (string-serialized),
  text: string,
  telegramMessageId: number,
  telegramChatId: number,
  correlationId: string,
  idempotencyKey: string
}

Queue: voice-transcription
Job data: {
  userId: BigInt,
  fileId: string,
  telegramMessageId: number,
  telegramChatId: number,
  correlationId: string,
  idempotencyKey: string
}

Queue: notifications
Job data: {
  chatId: number,
  text: string,
  parseMode: "HTML" | "Markdown",
  correlationId: string
}

Queue: user-connection (stub — Sprint 11)
Job data: {
  userId: BigInt,
  targetUsername: string,
  taskId?: string,
  telegramChatId: number,
  correlationId: string,
  idempotencyKey: string
}

Queue: invite-acceptance (stub — Sprint 11)
Job data: {
  userId: BigInt,
  token: string,
  telegramChatId: number,
  correlationId: string,
  idempotencyKey: string
}
```

### Test Plan

**E2E:**

- `webhook.e2e-spec`: `valid text message → 200 + job in task-parsing queue`
- `webhook.e2e-spec`: `valid voice message → 200 + job in voice-transcription queue`
- `webhook.e2e-spec`: `/start command → 200 + job in notifications queue`
- `webhook.e2e-spec`: `/connect_user @username → 200 + job in user-connection queue`
- `webhook.e2e-spec`: `/accept_invite <token> → 200 + job in invite-acceptance queue`
- `webhook.e2e-spec`: `missing secret header → 403 TELEGRAM_INVALID_SECRET`
- `webhook.e2e-spec`: `wrong secret header → 403`
- `webhook.e2e-spec`: `malformed body (no message field) → 400 TELEGRAM_INVALID_PAYLOAD`
- `webhook.e2e-spec`: `duplicate update_id → 200 but no new job (idempotent)`
- `webhook.e2e-spec`: `response time < 200ms (perf assertion)`

**Integration:**

- `user-upsert.integration-spec`: `new telegram user → creates User in DB`
- `user-upsert.integration-spec`: `existing telegram user → updates firstName if changed`
- `queue-routing.integration-spec`: `text message routes to task-parsing queue`
- `queue-routing.integration-spec`: `voice message routes to voice-transcription queue`
- `queue-routing.integration-spec`: `/connect_user routes to user-connection queue`

**Unit:**

- `telegram-update.validator.unit-spec`: `validates text message shape`
- `telegram-update.validator.unit-spec`: `validates voice message shape`
- `telegram-update.validator.unit-spec`: `rejects update without message`
- `telegram-command.parser.unit-spec`: `parses /connect_user @username`
- `telegram-command.parser.unit-spec`: `parses /accept_invite <token>`
- `telegram-command.parser.unit-spec`: `parses /connect_user @username <task_id>`

### Data / Migration Notes

- Нет новых миграций. User-таблица уже есть.
- Индекс `User.id` — PK (BigInt = Telegram ID), уже существует.

### Observability

- Log `info`: `Webhook received`, `{correlationId, updateId, messageType, userId}`
- Log `info`: `Command recognized (stub)`, `{correlationId, command, userId}`
- Log `warn`: `Unknown message type`, `Rate limited user`
- Log `error`: `Invalid secret attempt` (с IP, если доступен)
- Counter: `webhook_received_total{type=text|voice|command|unknown}`
- Histogram: `webhook_response_time_ms`

### DoD

- [x]  `POST /webhook/telegram` с корректным secret → `200 { ok: true }` за < 200 мс
- [x]  Неправильный/отсутствующий secret → `403`
- [x]  Text-сообщение порождает job в `task-parsing` queue
- [ ]  Voice-сообщение порождает job в `voice-transcription` queue
- [ ]  `/start` → job в `notifications` queue
- [ ]  `/connect_user`, `/accept_invite`, `/decline_invite` → jobs в соответствующие queues (stub processors)
- [ ]  Повторный `update_id` не создаёт дубль
- [ ]  User создаётся/обновляется в БД
- [ ]  Все 17+ тестов green
- [ ]  Логи содержат `correlationId
## Sprint 1.5 — Telegram initData Authentication

### Scope

Реализовать авторизацию пользователей Web-приложения (Telegram Mini App) через валидацию `initData`. Фронтенд передаёт `window.Telegram.WebApp.initData` строку, бэкенд валидирует HMAC-SHA256 подпись, создаёт/обновляет User, выдаёт JWT. Все последующие REST-запросы защищены `AuthGuard`.

### Архитектурные решения

- **initData validation** — по спецификации Telegram: [https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)
    
    1. Парсим `initData` как URLSearchParams
    2. Извлекаем `hash`, сортируем остальные пары `key=value` по ключу, соединяем через `\n`
    3. `secret_key = HMAC-SHA256("WebAppData", BOT_TOKEN)`
    4. `computed_hash = HMAC-SHA256(secret_key, data_check_string)`
    5. Сравниваем `computed_hash === hash`
    6. Проверяем `auth_date` не старше 5 минут (configurable: `INIT_DATA_MAX_AGE_SECONDS=300`)
- **User upsert** — из `initData.user` (JSON): `id`, `first_name`, `username`, `language_code`, `photo_url`. Upsert по `telegramId` (BigInt, PK).
    
- **JWT** — payload: `{ sub: telegramId (string), iat, exp }`. Время жизни: `JWT_EXPIRES_IN=7d` (env). Подпись: `JWT_SECRET` (env, HS256). Refresh tokens — вне скоупа MVP, при истечении фронт заново вызывает `/auth/telegram`.
    
- **AuthGuard** — NestJS Guard, проверяет `Authorization: Bearer <jwt>`. Декодирует, проверяет `exp`, находит User по `sub`. Кладёт `request.user = { id: BigInt, ... }`. Все REST-эндпоинты (кроме `/health`, `/auth/telegram`, `/webhook/telegram`) защищены.
    
- **Связь с webhook auth** — webhook-эндпоинт использует `X-Telegram-Bot-Api-Secret-Token` (Sprint 1), REST API использует JWT из initData (этот спринт). Два независимых механизма.
    

### API Contracts

**`POST /auth/telegram`**

text

```
Body: {
  initData: string  // raw window.Telegram.WebApp.initData
}

Response 200:
{
  "token": "jwt-string",
  "user": {
    "id": "string (BigInt serialized)",
    "firstName": "string",
    "username": "string | null",
    "photoUrl": "string | null",
    "languageCode": "string | null",
    "createdAt": "ISO8601"
  }
}

Errors:
  400 AUTH_INVALID_INIT_DATA — "Missing or malformed initData"
  401 AUTH_INIT_DATA_EXPIRED — "initData auth_date is too old"
  401 AUTH_INIT_DATA_HASH_MISMATCH — "Invalid initData signature"
  500 AUTH_USER_CREATE_FAILED — "Failed to create/update user"
```

**Error codes:**

text

```
AUTH_INVALID_INIT_DATA — initData не парсится
AUTH_INIT_DATA_EXPIRED — auth_date старше MAX_AGE
AUTH_INIT_DATA_HASH_MISMATCH — HMAC не совпал
AUTH_UNAUTHORIZED — JWT отсутствует/невалиден/истёк (используется AuthGuard)
AUTH_USER_NOT_FOUND — User из JWT не найден в БД
```

### Test Plan

**E2E:**

- `auth.e2e-spec`: `valid initData → 200 + JWT + user object`
- `auth.e2e-spec`: `valid initData for new user → user created in DB`
- `auth.e2e-spec`: `valid initData for existing user → user updated (firstName, username)`
- `auth.e2e-spec`: `invalid hash → 401 AUTH_INIT_DATA_HASH_MISMATCH`
- `auth.e2e-spec`: `expired auth_date → 401 AUTH_INIT_DATA_EXPIRED`
- `auth.e2e-spec`: `missing initData → 400 AUTH_INVALID_INIT_DATA`
- `auth.e2e-spec`: `malformed initData (not URLSearchParams) → 400`
- `auth.e2e-spec`: `JWT from response works for GET /tasks/today → 200`
- `auth.e2e-spec`: `expired JWT → 401 AUTH_UNAUTHORIZED`
- `auth.e2e-spec`: `missing Authorization header → 401`

**Unit:**

- `init-data-validator.unit-spec`: `valid initData passes verification`
- `init-data-validator.unit-spec`: `tampered initData fails verification`
- `init-data-validator.unit-spec`: `auth_date older than maxAge → fails`
- `init-data-validator.unit-spec`: `parses user JSON from initData correctly`

### Data / Migration Notes

- Нет новых миграций. User-таблица уже существует с `telegramId` как PK.
- Добавить поля в User, если отсутствуют: `photoUrl` (String?, nullable), `languageCode` (String?, nullable) — миграция `add-user-profile-fields`.

### Observability

- Log `info`: `Auth successful`, `{correlationId, userId, isNewUser}`
- Log `warn`: `Auth failed`, `{correlationId, reason, ip}`
- Counter: `auth_attempts_total{result=success|invalid_hash|expired|malformed}`

### DoD

- [ ]  `POST /auth/telegram` с валидным initData → JWT + user
- [ ]  HMAC-SHA256 валидация по спецификации Telegram
- [ ]  auth_date проверяется на свежесть
- [ ]  User upsert при каждом логине
- [ ]  AuthGuard защищает все REST-эндпоинты
- [ ]  Все 14+ тестов green
## Sprint 2 — AI Text Parser (DeepSeek) + Zod Validation + Fallback + DB Write

### Scope

Реализовать `task-parsing` processor: достать job из очереди → вызвать AI (сначала mock, затем DeepSeek) → валидация Zod → создать Task + Subtasks в БД (транзакция) → положить job в `notifications` queue. При ошибке AI — fallback: сохранить raw text как `Task.title`. Также: добавить в Prisma schema все новые модели (TaskAssignee, Invite, ProjectMember) и выполнить миграцию — бизнес-логика для них будет в Sprint 11.

### Архитектурные решения

- **AI Service abstraction** — интерфейс `IAiParser` с методами:
    
    - `parseText(text: string, context?: ParseContext): Promise<ParsedTaskResult>` — для текстового ввода
    - `parseAudio(audioBuffer: Buffer, mimeType: string, context?: ParseContext): Promise<ParsedTaskResult>` — для голосового ввода (реализация в Sprint 3)
    
    Имплементации:
    
    - `MockAiParser` — детерминированный, для тестов. Возвращает предсказуемый результат на основе входного текста.
    - `DeepSeekTextParser` — для текстового ввода (Telegram text + Web UI). Вызывает DeepSeek API: `POST https://api.deepseek.com/v1/chat/completions`, model `deepseek-chat`. System key: `DEEPSEEK_API_KEY` из env.
    - `GeminiAudioParser` — stub в Sprint 2, реализация в Sprint 3.
    
    Переключение через `ConfigModule` / env `AI_TEXT_PROVIDER=mock|deepseek`, `AI_AUDIO_PROVIDER=mock|gemini`.
    
- **DeepSeek prompt** — system prompt содержит:
    
    1. Роль: «You are a task parser. Extract structured tasks from user messages.»
    2. JSON schema в prompt (для моделей без function calling)
    3. Примеры (few-shot): 2–3 примера input → output
    4. Язык: «Preserve the original language of the user message in title and summary.»
    5. Инструкция: «Return ONLY valid JSON, no markdown, no explanation.»
- **Zod schema `ParsedTaskSchema`** — определена в `ai/validators/ai-output.validator.ts`. При `ZodError` — retry 1 раз с уточняющим промптом «Your response was not valid JSON. Return ONLY valid JSON matching this exact schema: {schema}». Если повторный fail — fallback.
    
- **Fallback стратегия**: создать `Task` с `title = text.slice(0, 500)`, `status = 'TODO'`, `originalInput = text`, пустые subtasks. Уведомить пользователя: «Не удалось разобрать, сохранили как есть. Отредактируйте вручную.»
    
- **API Key flow**: `task-parsing` processor использует system key `DEEPSEEK_API_KEY` из env. BYOK отложен — поле `User.encryptedApiKey` остаётся в схеме, но не используется в MVP.
    
- **DB write** — `$transaction`: `Task.create` + `Subtask.createMany`. Если транзакция падает — job retry (BullMQ attempts: 3, backoff exponential).
    
- **Notification job** — после успешной записи: `notifications.add({ chatId, text: "✅ Создано: {title}. Подзадач: {count}" })`.
    
- **DeepSeek specifics**:
    
    - Timeout: 30 секунд
    - Rate limit handling: при 429 — exponential backoff через BullMQ retry
    - Max tokens: `max_tokens: 2000` (достаточно для JSON-ответа)
    - Temperature: `0.1` (низкая для детерминированного парсинга)
    - Response format: **не** используем `response_format: { type: "json_object" }` (не все модели DeepSeek поддерживают) — вместо этого парсим `choices[0].message.content` как JSON вручную

### API Contracts

Этот спринт не добавляет HTTP-эндпоинтов. Контракты — внутренние (queue job schemas).

**Zod Schema: ParsedTaskResult**

text

```
{
  tasks: [{
    title: string (1–500 chars),
    summary?: string (max 2000 chars),
    deadline?: string (ISO8601),
    projectHint?: string (название проекта для auto-assign, nullable),
    subtasks: [{
      title: string (1–500 chars),
      order: number (int, >= 0)
    }] (0–20 items)
  }] (1–5 items)
}
```

**DeepSeek Request Format:**

text

```
POST https://api.deepseek.com/v1/chat/completions
Headers:
  Authorization: Bearer {DEEPSEEK_API_KEY}
  Content-Type: application/json

Body:
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "You are a task parser. Extract structured tasks from user messages.\n\nReturn ONLY valid JSON matching this schema:\n{schema}\n\nRules:\n- Preserve original language\n- Extract deadline if mentioned (convert relative dates like 'завтра' to ISO8601)\n- Break complex tasks into subtasks\n- If multiple tasks mentioned, return multiple items in tasks array\n\nExamples:\n..."
    },
    {
      "role": "user",
      "content": "{userText}"
    }
  ],
  "max_tokens": 2000,
  "temperature": 0.1
}
```

**Notification templates:**

text

```
Успех (1 задача):
"✅ Создана задача: **{title}**\nДедлайн: {deadline}\nШагов: {subtaskCount}"

Успех (N задач):
"✅ Создано {n} задач:\n1. {title1}\n2. {title2}\n..."

Fallback:
"⚠️ Не удалось разобрать сообщение. Сохранили как задачу:\n«{rawText}»\nОтредактируйте вручную."

AI Error (после всех retry):
"❌ Ошибка обработки. Попробуйте ещё раз или переформулируйте."
```

**Error codes (internal):**

text

```
AI_PARSE_INVALID_JSON — AI returned non-JSON (content is not parseable as JSON)
AI_PARSE_ZOD_VALIDATION — JSON doesn't match ParsedTaskSchema
AI_PARSE_TIMEOUT — DeepSeek response > 30s
AI_PARSE_RATE_LIMIT — DeepSeek 429
AI_PARSE_PROVIDER_ERROR — DeepSeek API 5xx or network error
TASK_CREATE_FAILED — DB transaction failed
```

### Test Plan

**E2E (processor-level, с реальной БД):**

- `task-parsing.e2e-spec`: `mock AI returns valid JSON → Task + 3 Subtasks in DB`
- `task-parsing.e2e-spec`: `mock AI returns valid JSON with deadline "завтра" → Task.deadline = tomorrow`
- `task-parsing.e2e-spec`: `mock AI returns multiple tasks → all created in DB`
- `task-parsing.e2e-spec`: `after successful parse → notification job added to queue`
- `task-parsing.e2e-spec`: `fallback: AI returns garbage → Task created with title = raw text`
- `task-parsing.e2e-spec`: `fallback: AI timeout → Task created with raw text + error notification`
- `task-parsing.e2e-spec`: `idempotency: same job processed twice → only one Task in DB`

**Integration:**

- `ai-service.integration-spec`: `DeepSeekTextParser calls API with correct prompt structure` (with nock/msw mock)
- `ai-service.integration-spec`: `DeepSeekTextParser uses DEEPSEEK_API_KEY from env`
- `ai-service.integration-spec`: `DeepSeekTextParser handles 429 rate limit → throws AI_PARSE_RATE_LIMIT`
- `ai-service.integration-spec`: `DeepSeekTextParser handles 500 → throws AI_PARSE_PROVIDER_ERROR`
- `ai-service.integration-spec`: `DeepSeekTextParser handles timeout → throws AI_PARSE_TIMEOUT`
- `ai-service.integration-spec`: `retry on first ZodError, succeed on second attempt`
- `task-write.integration-spec`: `$transaction creates Task and Subtasks atomically`
- `task-write.integration-spec`: `$transaction rollback on Subtask error → no Task created`
- `schema-migration.integration-spec`: `TaskAssignee table exists with correct columns`
- `schema-migration.integration-spec`: `Invite table exists with unique token index`
- `schema-migration.integration-spec`: `ProjectMember table exists with partial unique index on (projectId, userId)`
- `schema-migration.integration-spec`: `TaskAssignee partial unique index prevents duplicate active assignees`

**Unit:**

- `parsed-task.validator.unit-spec`: `valid payload passes`
- `parsed-task.validator.unit-spec`: `missing title → ZodError`
- `parsed-task.validator.unit-spec`: `subtasks > 20 → ZodError`
- `parsed-task.validator.unit-spec`: `empty tasks array → ZodError`
- `parsed-task.validator.unit-spec`: `title > 500 chars → ZodError`
- `parsed-task.validator.unit-spec`: `summary > 2000 chars → ZodError`
- `parsed-task.validator.unit-spec`: `invalid deadline format → ZodError`
- `parsed-task.validator.unit-spec`: `tasks > 5 → ZodError`
- `deepseek-prompt.unit-spec`: `builds correct system prompt with schema`
- `deepseek-prompt.unit-spec`: `builds correct user message`
- `deepseek-response-parser.unit-spec`: `extracts JSON from clean response`
- `deepseek-response-parser.unit-spec`: `extracts JSON wrapped in markdown code block`
- `deepseek-response-parser.unit-spec`: `throws AI_PARSE_INVALID_JSON for non-JSON`
- `encryption.util.unit-spec`: `encrypt then decrypt returns original`
- `encryption.util.unit-spec`: `decrypt with wrong key throws`
- `notification-formatter.unit-spec`: `formats single task correctly`
- `notification-formatter.unit-spec`: `formats multiple tasks correctly`
- `notification-formatter.unit-spec`: `formats fallback correctly`

### Data / Migration Notes

- Миграция `add-task-original-input`: добавить `Task.originalInput` (Text, nullable). Индекс не нужен.
    
- Проверить что индекс `Task(userId, status, deadline)` существует.
    
- Проверить что `Subtask(taskId, order)` индекс существует.
    
- **Миграция `add-assignee-invite-member-models`** — добавляет все новые модели для будущей функциональности (бизнес-логика — Sprint 11):
    
    **Новые Enums:**
    
    - `TaskAssigneeStatus` — `PENDING | CONNECTED | DECLINED | REVOKED`
    - `InviteStatus` — `PENDING | ACCEPTED | EXPIRED | REVOKED`
    - `InviteScope` — `USER_ONLY | PROJECT_INVITE`
    - `ProjectRole` — `OWNER | ADMIN | MEMBER | VIEWER`
    
    **Модель `TaskAssignee`** (таблица `task_assignees`):
    
    - `id` — UUID, PK, `@default(uuid())`
        
    - `taskId` — UUID, FK → Task, `@map("task_id")`
        
    - `assignedByUserId` — BigInt, FK → User, `@map("assigned_by_user_id")`
        
    - `status` — `TaskAssigneeStatus`, default `PENDING`
        
    - `telegramUsername` — String?, `@map("telegram_username")`
        
    - `assigneeUserId` — BigInt?, FK → User, `@map("assignee_user_id")`
        
    - `connectedAt` — DateTime?, `@map("connected_at")`
        
    - `invitedAt` — DateTime, default `now()`, `@map("invited_at")`
        
    - `revokedAt` — DateTime?, `@map("revoked_at")`
        
    - `note` — String?
        
    - `createdAt` — DateTime, default `now()`, `@map("created_at")`
        
    - `updatedAt` — DateTime, `@updatedAt`, `@map("updated_at")`
        
    - `deletedAt` — DateTime?, `@map("deleted_at")`
        
    - Индексы (Prisma `@@index`):
        
        - `@@index([assigneeUserId, deletedAt])`
        - `@@index([telegramUsername, status, deletedAt])`
    - **Partial unique index** — через отдельную SQL-миграцию:
        
        SQL
        
        ```
        CREATE UNIQUE INDEX "uq_task_assignee_active"
        ON "task_assignees" ("task_id")
        WHERE "deleted_at" IS NULL
          AND "revoked_at" IS NULL
          AND "status" IN ('PENDING', 'CONNECTED');
        ```
        
    
    **Модель `Invite`** (таблица `invites`):
    
    - `id` — UUID, PK, `@default(uuid())`
    - `token` — String, `@unique`
    - `createdByUserId` — BigInt, FK → User, `@map("created_by_user_id")`
    - `targetTelegramUsername` — String, `@map("target_telegram_username")`
    - `targetTelegramId` — BigInt?, `@map("target_telegram_id")`
    - `status` — `InviteStatus`, default `PENDING`
    - `scope` — `InviteScope`, default `USER_ONLY`
    - `projectId` — UUID?, FK → Project, `@map("project_id")`
    - `expiresAt` — DateTime, `@map("expires_at")`
    - `usedAt` — DateTime?, `@map("used_at")`
    - `revokedAt` — DateTime?, `@map("revoked_at")`
    - `createdAt` — DateTime, default `now()`, `@map("created_at")`
    - `updatedAt` — DateTime, `@updatedAt`, `@map("updated_at")`
    - Индексы:
        - `@@index([targetTelegramUsername, status])`
        - `@@index([expiresAt])`
    
    **Модель `ProjectMember`** (таблица `project_members`):
    
    - `id` — UUID, PK, `@default(uuid())`
        
    - `projectId` — UUID, FK → Project, `@map("project_id")`
        
    - `userId` — BigInt, FK → User, `@map("user_id")`
        
    - `role` — `ProjectRole`, default `MEMBER`
        
    - `invitedByUserId` — BigInt?, FK → User, `@map("invited_by_user_id")`
        
    - `joinedAt` — DateTime, default `now()`, `@map("joined_at")`
        
    - `deletedAt` — DateTime?, `@map("deleted_at")`
        
    - Индексы:
        
        - `@@index([userId])`
    - **Partial unique index** — через SQL-миграцию:
        
        SQL
        
        ```
        CREATE UNIQUE INDEX "uq_project_member_active"
        ON "project_members" ("project_id", "user_id")
        WHERE "deleted_at" IS NULL;
        ```
        
    
    **Обновления существующих моделей (relations only):**
    
    - `Task` — добавить: `assignees TaskAssignee[]`
    - `User` — добавить:
        - `assignedTasks TaskAssignee[]` (relation по `assigneeUserId`)
        - `assignedByMe TaskAssignee[]` (relation по `assignedByUserId`)
        - `createdInvites Invite[]` (relation по `createdByUserId`)
        - `projectMemberships ProjectMember[]` (relation по `userId`)
    - `Project` — добавить: `members ProjectMember[]`

### Observability

- Log `info`: `Task parsed successfully`, `{correlationId, taskId, subtaskCount, source=ai|fallback, provider=deepseek|mock}`
- Log `warn`: `AI parse failed, using fallback`, `{correlationId, zodErrors, provider}`
- Log `warn`: `AI response not valid JSON, retrying with corrective prompt`, `{correlationId, attempt, rawResponsePreview}`
- Log `error`: `AI service error`, `{correlationId, errorCode, attempt, provider}`
- Log `debug`: `DeepSeek request`, `{correlationId, promptLength, model}` (не логировать содержимое промпта в production)
- Counter: `ai_parse_total{result=success|fallback|error, provider=deepseek|mock}`
- Histogram: `ai_parse_duration_ms{provider=deepseek|mock}`
- Counter: `tasks_created_total{source=ai|fallback, sourceType=text}`

### DoD

- [ ]  Mock AI parser создаёт задачу + subtasks в БД через processor
- [ ]  DeepSeek parser вызывается с корректным промптом и system key `DEEPSEEK_API_KEY`
- [ ]  DeepSeek parser корректно парсит JSON из ответа (включая случай markdown code block wrapping)
- [ ]  Zod-валидация отклоняет невалидный JSON
- [ ]  Retry с уточняющим промптом при первом ZodError
- [ ]  Fallback: при ошибке AI — задача создаётся из raw text с `originalInput`
- [ ]  Notification job создаётся после записи в БД
- [ ]  Idempotency: повторный job не дублирует данные
- [ ]  DeepSeek rate limit (429) обрабатывается корректно
- [ ]  DeepSeek timeout (30s) обрабатывается корректно
- [ ]  Миграция: таблицы `task_assignees`, `invites`, `project_members` существуют с корректными индексами
- [ ]  Partial unique indexes работают (проверено тестами)
- [ ]  Relations в Prisma schema корректны (Task.assignees, User.assignedTasks, etc.)
- [ ]  Все 24+ тестов green
## ## Sprint 3 — Voice Pipeline (Gemini native audio → parsed task)

### Scope

Реализовать `voice-transcription` processor: получить `fileId` из job → скачать аудиофайл через Telegram Bot API → отправить **аудио напрямую в Gemini 2.5 Flash Lite** с промптом для парсинга задачи → получить JSON с задачей (транскрипция + парсинг в одном вызове) → Zod-валидация → создать Task + Subtasks в БД → notification. **Отдельного Whisper нет** — Gemini обрабатывает аудио нативно.

### Архитектурные решения

- **File download** — через `GET https://api.telegram.org/bot{token}/getFile?file_id={fileId}` → `GET https://api.telegram.org/file/bot{token}/{file_path}`. Файл хранится **только в памяти** (Buffer), не на диске. Макс. размер: 20 MB (Telegram limit).
    
- **Gemini audio call** — `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`. Аудио передаётся как `inlineData` с `mimeType: "audio/ogg"` (Telegram voice) в `contents[].parts[]`. Промпт: «Listen to this voice message and extract task(s). Return JSON matching this schema: ...». System key: `GEMINI_API_KEY` из env.
    
- **Единый вызов** — в отличие от оригинального плана (Whisper → text → task-parsing), здесь **один вызов** Gemini делает и транскрипцию, и парсинг. Результат проходит ту же Zod-валидацию (`ParsedTaskSchema`), что и в Sprint 2.
    
- **Сохранение транскрипции** — Gemini возвращает JSON с задачей. Дополнительно в промпте запрашиваем поле `transcription: string` — исходный текст голосового. Сохраняется в `Task.originalInput` для аудита и fallback.
    
- **Empty/noise result** — если Gemini вернул пустую транскрипцию или не смог распознать речь → уведомить: «Не удалось распознать речь. Попробуй ещё раз в тихом месте.» Не создавать задачу.
    
- **Fallback** — при ошибке Gemini или невалидном JSON: сохранить `originalInput = "[voice message, transcription failed]"`, создать задачу с `title = "Голосовое сообщение (не распознано)"`, `status = 'PARSE_FAILED'`. Уведомить пользователя.
    
- **НЕ переиспользует task-parsing queue** — голосовое обрабатывается полностью в `voice-transcription` processor, включая DB write и notification. Это упрощает pipeline и убирает лишний hop.
    

### API Contracts

Нет новых HTTP-эндпоинтов. Внутренние контракты:

**Gemini Audio Response Zod Schema (расширенная `ParsedTaskSchema`):**

text

```
{
  transcription: string (min 2 chars, raw text from voice),
  tasks: [{
    title: string (1–500 chars),
    summary?: string (max 2000 chars),
    deadline?: string (ISO8601),
    projectHint?: string,
    subtasks: [{
      title: string (1–500 chars),
      order: number (int, >= 0)
    }] (0–20 items)
  }] (1–5 items)
}
```

**Error codes:**

text

```
VOICE_FILE_NOT_FOUND — Telegram file API returned 404
VOICE_FILE_TOO_LARGE — File > 20MB
VOICE_TRANSCRIPTION_EMPTY — Gemini returned empty/unrecognizable audio
VOICE_GEMINI_API_ERROR — Gemini API 5xx or timeout
VOICE_PARSE_ZOD_VALIDATION — Gemini JSON doesn't match schema
VOICE_PARSE_INVALID_JSON — Gemini returned non-JSON for audio
```

**Notification templates:**

text

```
Processing started:
"🎙 Распознаю голосовое сообщение..."

Success (same as Sprint 2):
"✅ Создана задача: **{title}**\nДедлайн: {deadline}\nШагов: {subtaskCount}"

Transcription failed (empty/noise):
"🔇 Не удалось распознать речь. Попробуйте записать в тихом месте."

Gemini API error:
"❌ Сервис обработки голоса временно недоступен. Попробуйте позже."

Fallback (parse failed but audio recognized):
"⚠️ Распознали речь, но не смогли разобрать задачу.\nТекст: «{transcription}»\nСохранили как есть."
```

### Test Plan

**E2E:**

- `voice-pipeline.e2e-spec`: `valid voice file → Gemini returns parsed task → Task + Subtasks in DB`
- `voice-pipeline.e2e-spec`: `Gemini returns transcription + tasks → originalInput contains transcription`
- `voice-pipeline.e2e-spec`: `Gemini returns empty transcription → notification "не удалось" + no task created`
- `voice-pipeline.e2e-spec`: `file download fails (404) → error notification to user`
- `voice-pipeline.e2e-spec`: `Gemini returns invalid JSON → fallback task created`
- `voice-pipeline.e2e-spec`: `Gemini timeout → error notification + retry`
- `voice-pipeline.e2e-spec`: `idempotency: same voice job processed twice → single Task in DB`
- `voice-pipeline.e2e-spec`: `notification sent after successful parse`

**Integration:**

- `telegram-file.integration-spec`: `downloads .ogg file from Telegram API` (nock mock)
- `gemini-audio.integration-spec`: `sends audio buffer to Gemini with correct multipart format` (nock mock)
- `gemini-audio.integration-spec`: `parses valid JSON response from Gemini`
- `gemini-audio.integration-spec`: `timeout after 60s → throws VOICE_GEMINI_API_ERROR`

**Unit:**

- `voice-result.validator.unit-spec`: `valid transcription + tasks passes`
- `voice-result.validator.unit-spec`: `empty transcription string fails`

### Data / Migration Notes

- Добавить `Task.sourceType` enum (`TEXT`, `VOICE`) — миграция `add-task-source-type`. Nullable, default `TEXT`. Голосовые задачи создаются с `sourceType = 'VOICE'`.
- Нет других новых миграций.

### Observability

- Log `info`: `Voice processed via Gemini`, `{correlationId, userId, durationMs, transcriptionLength, taskCount}`
- Log `warn`: `Voice transcription empty`, `{correlationId, userId}`
- Log `error`: `Gemini API error for audio`, `{correlationId, errorCode, attempt}`
- Counter: `voice_processing_total{result=success|empty|fallback|error}`
- Histogram: `voice_processing_duration_ms`

### DoD

- [ ]  Voice message → Telegram file download → Gemini (audio in, parsed task out) → DB write
- [ ]  Транскрипция сохраняется в `Task.originalInput`
- [ ]  `Task.sourceType = 'VOICE'` для голосовых задач
- [ ]  Empty/noise audio → user notification, no task created
- [ ]  Gemini API error → retry (3 attempts) → fallback notification
- [ ]  Fallback: при невалидном JSON от Gemini → задача с raw transcription
- [ ]  File stays in memory, never written to disk
- [ ]  All 14+ tests green

### Scope

Реализовать `voice-transcription` processor: получить `fileId` из job → скачать файл через Telegram Bot API → отправить в OpenAI Whisper API → получить текст → положить в `task-parsing` queue. Обработка ошибок: файл не найден, Whisper timeout, Whisper вернул пустую строку.

### Архитектурные решения

- **File download** — через `GET https://api.telegram.org/bot{token}/getFile?file_id={fileId}` → `GET https://api.telegram.org/file/bot{token}/{file_path}`. Файл хранится **только в памяти** (Buffer), не на диске. Макс. размер: 20 MB (Telegram limit).
- **Whisper call** — `POST https://api.openai.com/v1/audio/transcriptions`, form-data, model `whisper-1`. BYOK: если у юзера есть ключ — использовать его.
- **Empty/noise result** — если Whisper вернул пустую строку или `"..."` → уведомить: «Не удалось распознать речь. Попробуй ещё раз в тихом месте.» Не создавать job в `task-parsing`.
- **Chain** — voice-transcription → при успехе → `task-parsing.add({ text: transcribedText, ... })`. Весь дальнейший flow идентичен Sprint 2.

### API Contracts

Нет новых HTTP-эндпоинтов. Внутренние контракты:

**Whisper response validation (Zod):**

text

```
{
  text: string (min 2 chars, не может быть только "..." или пробелы)
}
```

**Error codes:**

text

```
WHISPER_FILE_NOT_FOUND — Telegram file API returned 404
WHISPER_FILE_TOO_LARGE — File > 20MB
WHISPER_TRANSCRIPTION_EMPTY — Whisper returned empty/noise
WHISPER_API_ERROR — Whisper API 5xx or timeout
WHISPER_BYOK_INVALID — User's key rejected by Whisper
```

**Notification templates:**

text

```
Transcription started:
"🎤 Распознаю голосовое сообщение..."

Transcription failed (empty):
"🔇 Не удалось распознать речь. Попробуйте записать в тихом месте."

Transcription failed (API error):
"❌ Сервис распознавания речи временно недоступен. Сообщение сохранено, обработаем позже."
```

### Test Plan

**E2E:**

- `voice-transcription.e2e-spec`: `valid voice file → transcribed text → job in task-parsing queue`
- `voice-transcription.e2e-spec`: `Whisper returns empty → notification "не удалось" + no task-parsing job`
- `voice-transcription.e2e-spec`: `Whisper returns "..." → treated as empty`
- `voice-transcription.e2e-spec`: `file download fails (404) → error notification to user`
- `voice-transcription.e2e-spec`: `idempotency: same voice job processed twice → single task-parsing job`

**Integration:**

- `telegram-file.integration-spec`: `downloads .ogg file from Telegram API` (nock mock)
- `whisper.integration-spec`: `sends audio buffer to Whisper and receives text` (nock mock)
- `whisper.integration-spec`: `BYOK key used for Whisper call`
- `whisper.integration-spec`: `timeout after 30s → throws WHISPER_API_ERROR`

**Unit:**

- `transcription-result.validator.unit-spec`: `non-empty text passes`
- `transcription-result.validator.unit-spec`: `empty string fails`
- `transcription-result.validator.unit-spec`: `"..." fails`

### Data / Migration Notes

- Нет новых миграций.
- Возможно добавить `Task.sourceType` enum (`TEXT`, `VOICE`) для аналитики — миграция `add-task-source-type`. Nullable, default `TEXT`.

### Observability

- Log `info`: `Voice transcribed`, `{correlationId, userId, durationMs, textLength}`
- Log `warn`: `Transcription empty`, `{correlationId, userId}`
- Log `error`: `Whisper API error`, `{correlationId, errorCode, attempt}`
- Counter: `whisper_transcription_total{result=success|empty|error}`
- Histogram: `whisper_transcription_duration_ms`

### DoD

- [ ]  Voice message → Telegram file download → Whisper → text → task-parsing job
- [ ]  Empty transcription → user notification, no task created
- [ ]  Whisper API error → retry (3 attempts) → fallback notification
- [ ]  BYOK key used for Whisper when available
- [ ]  File stays in memory, never written to disk
- [ ]  All 12+ tests green

---

## Sprint 4 — Task CRUD + Today View + Ordering + Audit Log

### Scope

REST API для задач: Today View query, task detail (с subtasks и chat), update (title/deadline/status), subtask toggle, reorder (fractional index), audit log через interceptor. Все мутации записываются в `ActionHistory`. Access-проверка вынесена в отдельный `TaskAccessService` для будущего расширения на assignees (Sprint 11).

### Архитектурные решения

- **Today View query** — `WHERE userId = ? AND deadline BETWEEN startOfDay AND endOfDay AND deletedAt IS NULL AND status NOT IN ('DONE', 'DELETED')`. Часовой пояс берётся из `User.timezone` (default UTC).
- **Fractional ordering** — `Task.order` и `Subtask.order` — `String`. При reorder: вычислить новый fractional index между соседями. Если коллизия — cron `rebalance-order` нормализует.
- **Audit log interceptor** — декоратор `@Audited()` на controller-методах. Interceptor: до вызова — snapshot entity; после — сохранить diff в `ActionHistory`.
- **TaskAccessService** — выделенный сервис `TaskAccessService.canAccess(userId, taskId): Promise<boolean>`. Текущая реализация: `task.userId === userId`. В Sprint 11 расширится на: `OR TaskAssignee(taskId, assigneeUserId=userId, status=CONNECTED, deletedAt=NULL)`. Все controller'ы используют этот сервис вместо прямой проверки, чтобы Sprint 11 не требовал рефакторинга.
- **Ownership vs Access** — разделить два уровня:
    - `canAccess(userId, taskId)` — может читать и редактировать (owner OR connected assignee). Используется для GET/PATCH.
    - `isOwner(userId, taskId)` — строго `task.userId === userId`. Используется для DELETE, assign, и операций только для владельца.

### API Contracts

**`GET /tasks/today`**

text

text

```
Query: { date?: string (ISO8601 date, default today), timezone?: string (IANA, default from user profile) }
Headers: Authorization: Bearer <jwt>

Response 200:
{
  "tasks": [{
    "id": "uuid",
    "title": "string",
    "summary": "string | null",
    "status": "TODO | IN_PROGRESS",
    "deadline": "ISO8601 | null",
    "order": "string",
    "subtasks": [{ "id": "uuid", "title": "string", "isCompleted": boolean, "order": "string" }],
    "project": { "id": "uuid", "title": "string" } | null,
    "createdAt": "ISO8601"
  }]
}

Errors:
  401 AUTH_UNAUTHORIZED
  400 TASK_INVALID_DATE — "Invalid date format"
```

**`GET /tasks/:id`**

text

text

```
Response 200:
{
  "task": { ...Task },
  "subtasks": [{ ...Subtask }],
  "chatMessages": [{ "id", "role", "content", "isExcluded", "createdAt" }],
  "project": { ...Project } | null
}

Errors:
  404 TASK_NOT_FOUND
  403 TASK_ACCESS_DENIED
```

**`PATCH /tasks/:id`**

text

text

```
Body: {
  title?: string (1–500),
  deadline?: string (ISO8601) | null,
  status?: "TODO" | "IN_PROGRESS" | "DONE",
  projectId?: string | null
}

Response 200: { "task": { ...Task } }

Errors:
  404 TASK_NOT_FOUND
  403 TASK_ACCESS_DENIED
  400 TASK_INVALID_STATUS_TRANSITION — e.g., DELETED → IN_PROGRESS
  422 TASK_VALIDATION_ERROR
```

**`PATCH /subtasks/:id/toggle`**

text

text

```
Response 200: { "subtask": { ...Subtask, "isCompleted": boolean } }

Errors:
  404 SUBTASK_NOT_FOUND
  403 TASK_ACCESS_DENIED (checked via parent task)
```

**`POST /tasks/reorder`**

text

text

```
Body: {
  taskId: string,
  afterId: string | null,  // null = move to top
  beforeId: string | null  // null = move to bottom
}

Response 200: { "task": { "id": string, "order": string } }

Errors:
  404 TASK_NOT_FOUND
  400 TASK_REORDER_CONFLICT — "Cannot compute order between given neighbors"
```

**`POST /subtasks/reorder`**

text

text

```
Body: {
  subtaskId: string,
  afterId: string | null,
  beforeId: string | null
}

Response 200: { "subtask": { "id": string, "order": string } }
```

### Test Plan

**E2E:**

- `today-view.e2e-spec`: `returns only today's tasks for authenticated user`
- `today-view.e2e-spec`: `does not return DONE tasks`
- `today-view.e2e-spec`: `does not return soft-deleted tasks`
- `today-view.e2e-spec`: `custom date param returns tasks for that date`
- `today-view.e2e-spec`: `unauthenticated → 401`
- `task-detail.e2e-spec`: `returns task with subtasks and chat messages`
- `task-detail.e2e-spec`: `other user's task → 403`
- `task-detail.e2e-spec`: `non-existent task → 404`
- `task-update.e2e-spec`: `update title → 200 + title changed`
- `task-update.e2e-spec`: `update deadline → 200 + deadline changed`
- `task-update.e2e-spec`: `update status TODO → IN_PROGRESS → 200`
- `task-update.e2e-spec`: `update status DELETED → TODO → 400 TASK_INVALID_STATUS_TRANSITION`
- `task-update.e2e-spec`: `empty body → 422`
- `subtask-toggle.e2e-spec`: `toggle false → true → 200`
- `subtask-toggle.e2e-spec`: `toggle true → false → 200`
- `reorder.e2e-spec`: `move task between two others → correct fractional order`
- `reorder.e2e-spec`: `move task to top → order < first task's order`

**Integration:**

- `audit-log.integration-spec`: `PATCH /tasks/:id creates ActionHistory entry with diff`
- `audit-log.integration-spec`: `ActionHistory contains before/after snapshots`
- `audit-log.integration-spec`: `ActionHistory.correlationId matches request`
- `task-access-service.integration-spec`: `canAccess returns true for task owner`
- `task-access-service.integration-spec`: `canAccess returns false for non-owner (no assignee yet)`
- `task-access-service.integration-spec`: `isOwner returns true only for task.userId`

**Unit:**

- `fractional-index.unit-spec`: `generates index between "a" and "b"`
- `fractional-index.unit-spec`: `generates index before "a" (move to top)`
- `fractional-index.unit-spec`: `generates index after "z" (move to bottom)`
- `status-transition.unit-spec`: `validates allowed transitions`
- `status-transition.unit-spec`: `rejects DELETED → IN_PROGRESS`

**Negative / Security:**

- `task-access.e2e-spec`: `PATCH other user's task → 403`
- `task-access.e2e-spec`: `expired JWT → 401`
- `task-access.e2e-spec`: `malformed JWT → 401`

### Data / Migration Notes

- Миграция `change-order-to-string`: изменить `Task.order` и `Subtask.order` с `Int` на `String`. Data migration: все существующие `order` конвертировать в fractional strings.
- Миграция `add-correlation-id-to-action-history`: добавить `ActionHistory.correlationId` (String, nullable).
- Индекс `ActionHistory(userId, createdAt)` — уже существует.
- Индекс `Task(userId, deadline, deletedAt)` — нужно добавить composite.

### Observability

- Log `info`: `Task updated`, `{correlationId, taskId, fields: [title, deadline, ...]}`
- Log `info`: `Today view queried`, `{correlationId, userId, date, resultCount}`
- Counter: `task_operations_total{operation=read|update|toggle|reorder}`
- Alert rule (placeholder): `task_operations_total{operation=update}` rate > 100/min per user → possible abuse

### DoD

- [ ]  `GET /tasks/today` возвращает задачи на сегодня с корректной фильтрацией
- [ ]  `GET /tasks/:id` возвращает task + subtasks + chat + project
- [ ]  `PATCH /tasks/:id` обновляет title/deadline/status с аудит-логом
- [ ]  `PATCH /subtasks/:id/toggle` переключает isCompleted
- [ ]  Reorder работает через fractional indexing
- [ ]  Все мутации создают `ActionHistory` запись
- [ ]  `TaskAccessService` используется во всех controllers (не прямая проверка `userId`)
- [ ]  Status transition validation
- [ ]  All 32+ tests green
## Sprint 5 — Chat Persistence + Streaming Endpoint Contract

### Scope

REST API для чат-сообщений задачи. Сохранение user-сообщений, вызов AI (mock → real), streaming response через SSE, сохранение assistant-ответа в БД после завершения стрима. Контракт SSE полностью определён, даже если real AI ещё mock.

### Архитектурные решения

- **SSE (Server-Sent Events)** — не WebSocket. Endpoint `POST /tasks/:id/chat` принимает сообщение, начинает SSE-стрим. Каждый chunk: `data: {"delta": "часть текста", "messageId": "uuid"}\n\n`. Финальный chunk: `data: {"done": true, "fullContent": "...", "messageId": "uuid"}\n\n`.
- **Chat context window** — при вызове AI для чата: берём последние N сообщений (N = 50 или по token budget ≈ 4000 tokens). Excluded-сообщения (`isExcluded = true`) не включаются.
- **Persist flow**: 1) Сохранить user message в DB. 2) Начать AI stream. 3) По завершении — сохранить assistant message в DB. 4) Если stream прервался — сохранить partial response с пометкой.

### API Contracts

**`POST /tasks/:id/chat`**

text

```
Headers: Authorization: Bearer <jwt>, Accept: text/event-stream
Body: { "message": "string (1–5000 chars)" }

Response: SSE stream (Content-Type: text/event-stream)
Events:
  data: { "type": "delta", "delta": "string", "messageId": "uuid" }
  data: { "type": "done", "messageId": "uuid", "fullContent": "string" }
  data: { "type": "error", "code": "AI_CHAT_ERROR", "message": "string" }

Errors (non-stream):
  404 TASK_NOT_FOUND
  403 TASK_ACCESS_DENIED
  400 CHAT_MESSAGE_EMPTY
  422 CHAT_MESSAGE_TOO_LONG
```

**`GET /tasks/:id/messages`**

text

```
Query: { limit?: number (default 50, max 100), before?: string (message ID for cursor pagination) }

Response 200:
{
  "messages": [{
    "id": "uuid",
    "role": "user" | "assistant" | "system",
    "content": "string",
    "isExcluded": boolean,
    "createdAt": "ISO8601"
  }],
  "hasMore": boolean,
  "nextCursor": "string | null"
}

Errors:
  404 TASK_NOT_FOUND
  403 TASK_ACCESS_DENIED
```

### Test Plan

**E2E:**

- `chat.e2e-spec`: `POST message → SSE stream with delta events + done event`
- `chat.e2e-spec`: `user message saved in DB before stream starts`
- `chat.e2e-spec`: `assistant message saved in DB after stream completes`
- `chat.e2e-spec`: `GET /messages returns messages in chronological order`
- `chat.e2e-spec`: `GET /messages with pagination (limit + cursor)`
- `chat.e2e-spec`: `empty message → 400 CHAT_MESSAGE_EMPTY`
- `chat.e2e-spec`: `message > 5000 chars → 422`
- `chat.e2e-spec`: `other user's task → 403`

**Integration:**

- `chat-context.integration-spec`: `builds context window excluding isExcluded messages`
- `chat-context.integration-spec`: `limits to 50 messages max`
- `chat-persist.integration-spec`: `both user and assistant messages persisted with correct roles`
- `sse-stream.integration-spec`: `SSE format complies with spec (data: prefix, double newline)`

**Unit:**

- `chat-message.validator.unit-spec`: `valid message passes`
- `chat-message.validator.unit-spec`: `empty string fails`
- `context-builder.unit-spec`: `excludes isExcluded messages`
- `context-builder.unit-spec`: `respects token budget`

### Data / Migration Notes

- Нет новых миграций. `ChatMessage` таблица существует.
- Убедиться: `ChatMessage.isDeleted` → переименовать в `isExcluded` (миграция `rename-isDeleted-to-isExcluded`). Это важно для семантической ясности: сообщение не удалено, а исключено из AI-контекста.

### Observability

- Log `info`: `Chat message received`, `{correlationId, taskId, messageLength}`
- Log `info`: `Chat stream completed`, `{correlationId, taskId, responseLength, durationMs}`
- Log `error`: `Chat stream error`, `{correlationId, taskId, errorCode}`
- Counter: `chat_messages_total{role=user|assistant}`
- Histogram: `chat_stream_duration_ms`

### DoD

- [ ]  `POST /tasks/:id/chat` начинает SSE-стрим с delta-событиями
- [ ]  User message сохраняется в DB до начала стрима
- [ ]  Assistant message сохраняется в DB после завершения стрима
- [ ]  `GET /tasks/:id/messages` с пагинацией
- [ ]  Excluded-сообщения не попадают в AI-контекст
- [ ]  Mock AI parser возвращает детерминированный ответ
- [ ]  All 18+ tests green

---

## Sprint 6 — Apply-to-Plan End-to-End

### Scope

Полный flow: кнопка «Apply to Plan» → собрать контекст (summary + subtasks + non-excluded chat) → AI mutation → Zod-валидация результата → DB transaction (update summary + upsert subtasks, сохранить completed) → ActionHistory с полным diff → вернуть результат.

### Архитектурные решения

- **Completed subtask protection** — после получения AI-ответа: пост-валидация проверяет, что все `isCompleted=true` subtasks из текущего состояния присутствуют в новом ответе **без изменения title**. Если AI удалил/переименовал completed subtask — reject + retry с уточняющим промптом.
- **Transaction scope**: `$transaction` включает: 1) Snapshot current state → `ActionHistory.diff.before`. 2) `Task.update({ summary })`. 3) Soft-delete всех **non-completed** subtasks. 4) Create new subtasks из AI-ответа. 5) Re-attach completed subtasks. 6) `ActionHistory.diff.after`.
- **Empty chat guard** — если нет non-excluded сообщений → `409 APPLY_NO_CHAT_CONTEXT`.
- **Concurrency** — optimistic locking через `Task.updatedAt`. Если `updatedAt` изменился между read и write → `409 APPLY_CONFLICT`.
- **Idempotency** — `idempotencyKey = taskId + md5(chatMessagesIds)`. Если уже есть `ActionHistory` с таким ключом → return cached result.

### API Contracts

**`POST /tasks/:id/apply-plan`**

text

```
Headers: Authorization: Bearer <jwt>
Body: {} (no body needed; context is computed server-side)

Response 200:
{
  "task": {
    "id": "uuid",
    "summary": "string (updated)",
    "updatedAt": "ISO8601"
  },
  "subtasks": [{
    "id": "uuid",
    "title": "string",
    "isCompleted": boolean,
    "order": "string",
    "isNew": boolean  // true if created by this mutation
  }],
  "actionHistoryId": "uuid",
  "diff": {
    "summaryChanged": boolean,
    "subtasksAdded": number,
    "subtasksRemoved": number,
    "subtasksKept": number
  }
}

Errors:
  404 TASK_NOT_FOUND
  403 TASK_ACCESS_DENIED
  409 APPLY_NO_CHAT_CONTEXT — "No chat messages to apply"
  409 APPLY_CONFLICT — "Task was modified concurrently, reload and retry"
  422 APPLY_AI_VALIDATION_ERROR — "AI returned invalid mutation"
  504 APPLY_AI_TIMEOUT — "AI processing timed out"
  500 APPLY_TRANSACTION_ERROR — "Failed to apply changes"
```

**Zod Schema: ApplyToPlanResult**

text

```
{
  summary: string (1–5000 chars),
  subtasks: [{
    title: string (1–500 chars),
    order: number (int),
    isCompleted: boolean
  }] (1–30 items)
}
```

### Test Plan

**E2E:**

- `apply-plan.e2e-spec`: `happy path: chat context → AI mutation → summary updated + subtasks changed`
- `apply-plan.e2e-spec`: `completed subtasks preserved after apply`
- `apply-plan.e2e-spec`: `excluded messages not sent to AI`
- `apply-plan.e2e-spec`: `no chat messages → 409 APPLY_NO_CHAT_CONTEXT`
- `apply-plan.e2e-spec`: `ActionHistory created with before/after diff`
- `apply-plan.e2e-spec`: `idempotent: same chat state → returns cached result`
- `apply-plan.e2e-spec`: `concurrent modification → 409 APPLY_CONFLICT`
- `apply-plan.e2e-spec`: `AI returns empty subtasks → 422 APPLY_AI_VALIDATION_ERROR`
- `apply-plan.e2e-spec`: `AI removes completed subtask → retry with corrective prompt → success`
- `apply-plan.e2e-spec`: `other user → 403`

**Integration:**

- `apply-transaction.integration-spec`: `transaction atomicity: if subtask create fails → summary not updated`
- `apply-transaction.integration-spec`: `ActionHistory.diff contains correct before/after snapshots`
- `apply-context.integration-spec`: `context builder includes summary + subtasks + non-excluded chat`
- `apply-context.integration-spec`: `context respects token budget (truncates oldest messages)`
- `completed-protection.integration-spec`: `detects when AI drops completed subtask`
- `completed-protection.integration-spec`: `detects when AI renames completed subtask`

**Unit:**

- `apply-plan-result.validator.unit-spec`: `valid mutation passes`
- `apply-plan-result.validator.unit-spec`: `empty subtasks → fails`
- `apply-plan-result.validator.unit-spec`: `summary > 5000 chars → fails`
- `completed-subtask-checker.unit-spec`: `all completed present → passes`
- `completed-subtask-checker.unit-spec`: `missing completed → fails`
- `idempotency-key.unit-spec`: `same messages → same key`

### Data / Migration Notes

- Миграция `add-action-history-idempotency-key`: добавить `ActionHistory.idempotencyKey` (String, nullable, unique).
- Миграция `add-action-history-type`: добавить `ActionHistory.type` enum (`APPLY_PLAN`, `MANUAL_EDIT`, `SOFT_DELETE`, `RESTORE`).

### Observability

- Log `info`: `Apply-to-plan started`, `{correlationId, taskId, chatMessageCount, completedSubtaskCount}`
- Log `info`: `Apply-to-plan completed`, `{correlationId, taskId, subtasksAdded, subtasksRemoved, durationMs}`
- Log `warn`: `Completed subtask protection triggered`, `{correlationId, taskId, missingSubtaskIds}`
- Log `error`: `Apply-to-plan failed`, `{correlationId, taskId, errorCode}`
- Counter: `apply_plan_total{result=success|conflict|validation_error|timeout}`
- Histogram: `apply_plan_duration_ms`

### DoD

- [ ]  Apply-to-plan обновляет summary и subtasks из чат-контекста
- [ ]  Completed subtasks никогда не удаляются и не переименовываются
- [ ]  Excluded chat messages не включаются в AI-контекст
- [ ]  ActionHistory содержит полный before/after diff
- [ ]  Optimistic locking предотвращает race condition
- [ ]  Idempotency: повторный apply с тем же контекстом → cached result
- [ ]  All 22+ tests green

---

## Sprint 7 — Selective Exclusion + Copy Context

### Scope

Реализовать toggle `isExcluded` для chat messages. Реализовать `GET /tasks/:id/export-context` — генерация Markdown-промпта для копирования в IDE/ChatGPT.

### Архитектурные решения

- **Exclusion toggle** — `PATCH /messages/:id/exclude` с body `{ isExcluded: boolean }`. Не soft delete: сообщение остаётся видимым (greyed-out), но исключено из AI-контекста.
- **Batch exclusion** — `PATCH /messages/exclude-batch` с body `{ ids: string[], isExcluded: boolean }`. Для массовой чистки контекста.
- **Export context template** — формат Markdown, секции: Task Title, Summary, Requirements (из project.description), Checklist (subtasks), Chat Highlights (последние 10 non-excluded messages). Параметризуемо: `?includeChatHistory=true&maxMessages=20`.

### API Contracts

**`PATCH /messages/:id/exclude`**

text

```
Body: { "isExcluded": boolean }
Response 200: { "message": { "id", "isExcluded": boolean } }

Errors:
  404 MESSAGE_NOT_FOUND
  403 TASK_ACCESS_DENIED
```

**`PATCH /messages/exclude-batch`**

text

```
Body: { "ids": string[] (1–100), "isExcluded": boolean }
Response 200: { "updated": number }

Errors:
  400 MESSAGE_BATCH_TOO_LARGE — "> 100 IDs"
  403 TASK_ACCESS_DENIED — "Some messages belong to another user"
```

**`GET /tasks/:id/export-context`**

text

```
Query: { includeChatHistory?: boolean (default true), maxMessages?: number (default 10, max 50) }

Response 200:
{
  "markdown": "string (full markdown text)",
  "tokenEstimate": number,
  "sections": ["title", "summary", "project", "checklist", "chat"]
}

Errors:
  404 TASK_NOT_FOUND
  403 TASK_ACCESS_DENIED
```

**Markdown template:**

Markdown

```
# Task: {task.title}

## Summary
{task.summary || "No summary yet"}

## Project Context
{project.description || "No project context"}

## Checklist
- [x] {completed subtask}
- [ ] {pending subtask}

## Chat History (recent)
**User:** {message1}
**AI:** {message2}
...
```

### Test Plan

**E2E:**

- `exclude.e2e-spec`: `toggle isExcluded true → 200 + message.isExcluded = true`
- `exclude.e2e-spec`: `toggle isExcluded false → 200 + message.isExcluded = false`
- `exclude.e2e-spec`: `other user's message → 403`
- `exclude.e2e-spec`: `non-existent message → 404`
- `exclude-batch.e2e-spec`: `batch exclude 5 messages → 200 + updated = 5`
- `exclude-batch.e2e-spec`: `batch > 100 → 400`
- `export-context.e2e-spec`: `returns valid markdown with all sections`
- `export-context.e2e-spec`: `excluded messages not in chat history section`
- `export-context.e2e-spec`: `no summary → section says "No summary yet"`
- `export-context.e2e-spec`: `no project → project section omitted`
- `export-context.e2e-spec`: `maxMessages=3 → only 3 chat messages in export`
- `export-context.e2e-spec`: `other user → 403`

**Unit:**

- `markdown-builder.unit-spec`: `generates correct markdown with all sections`
- `markdown-builder.unit-spec`: `omits empty sections`

### Data / Migration Notes

- Нет новых миграций (поле `isExcluded` добавлено в Sprint 5 при rename).

### Observability

- Log `info`: `Message excluded`, `{correlationId, messageId, taskId}`
- Log `info`: `Context exported`, `{correlationId, taskId, tokenEstimate}`
- Counter: `messages_excluded_total`
- Counter: `context_exported_total`

### DoD

- [ ]  Toggle `isExcluded` на одиночном сообщении
- [ ]  Batch toggle до 100 сообщений
- [ ]  Export context генерирует валидный Markdown
- [ ]  Excluded сообщения не попадают в export
- [ ]  Token estimate в ответе
- [ ]  All 14+ tests green

---

## Sprint 8 — Soft Delete + Trash Recovery + Cron Cleanup Contract

### Scope

Soft delete для задач (single + batch), просмотр корзины, restore (single + batch), cron job для физического удаления через 30 дней. Cascade: soft-deleted task скрывает свои subtasks и chat, но не удаляет их. При soft-delete задачи — все связанные TaskAssignee также получают `deletedAt`.

### API Contracts

**`DELETE /tasks/:id`**

text

text

```
Response 200: { "task": { "id", "deletedAt": "ISO8601" } }
Errors: 404, 403 (only owner via isOwner), 409 TASK_ALREADY_DELETED
```

**`POST /tasks/:id/restore`**

text

text

```
Response 200: { "task": { "id", "status": "TODO", "deletedAt": null } }
Errors: 404, 403, 409 TASK_NOT_DELETED — "Task is not in trash"
```

**`POST /tasks/restore-batch`**

text

text

```
Body: { "ids": string[] (1–50) }
Response 200: { "restored": number }
Errors: 400 BATCH_TOO_LARGE, 403
```

**`GET /tasks/trash`**

text

text

```
Query: { limit?: number (default 20), cursor?: string }
Response 200: {
  "tasks": [{ "id", "title", "deletedAt", "daysUntilPermanent": number }],
  "hasMore": boolean
}
```

**Cron contract (internal):**

text

text

```
Job: cleanup-deleted-tasks
Schedule: daily 03:00 UTC
Logic: DELETE FROM tasks WHERE deletedAt < NOW() - INTERVAL '30 days'
Also deletes: related subtasks, chat messages, task_assignees (CASCADE)
Logs: "Permanently deleted {count} tasks"

Job: cleanup-expired-invites
Schedule: daily 04:00 UTC
Logic: UPDATE invites SET status = 'EXPIRED' WHERE status = 'PENDING' AND expires_at < NOW()
Also: UPDATE task_assignees SET status = 'REVOKED', revoked_at = NOW()
  WHERE status = 'PENDING' AND id IN (
    SELECT ta.id FROM task_assignees ta
    JOIN invites i ON i.target_telegram_username = ta.telegram_username AND i.task_id_hint = ta.task_id
    WHERE i.status = 'EXPIRED'
  )
Logs: "Expired {count} invites, revoked {count} pending assignees"
```

### Test Plan

**E2E:**

- `soft-delete.e2e-spec`: `DELETE → task has deletedAt, not visible in today view`
- `soft-delete.e2e-spec`: `DELETE already deleted → 409`
- `soft-delete.e2e-spec`: `DELETE → associated TaskAssignees get deletedAt`
- `soft-delete.e2e-spec`: `restore → deletedAt = null, status = TODO`
- `soft-delete.e2e-spec`: `restore → associated TaskAssignees restored (deletedAt = null)`
- `soft-delete.e2e-spec`: `restore non-deleted → 409`
- `soft-delete.e2e-spec`: `trash endpoint returns only deleted tasks`
- `soft-delete.e2e-spec`: `batch restore 3 tasks → restored = 3`
- `soft-delete.e2e-spec`: `audit log created for delete and restore`
- `soft-delete.e2e-spec`: `other user → 403`
- `soft-delete.e2e-spec`: `assignee (non-owner) cannot delete → 403`

**Integration:**

- `cleanup-cron.integration-spec`: `tasks older than 30 days are permanently deleted`
- `cleanup-cron.integration-spec`: `cascade deletes subtasks, chat messages, and task_assignees`
- `cleanup-cron.integration-spec`: `tasks younger than 30 days are not deleted`
- `cleanup-cron.integration-spec`: `daysUntilPermanent calculation correct`
- `invite-expiry-cron.integration-spec`: `expired invites get status EXPIRED`
- `invite-expiry-cron.integration-spec`: `pending assignees linked to expired invites get status REVOKED`

**Unit:**

- `days-until-permanent.unit-spec`: `calculates correctly for various deletedAt values`
- `batch-ids.validator.unit-spec`: `rejects > 50 IDs`
- `batch-ids.validator.unit-spec`: `rejects empty array`

### Data / Migration Notes

- Нет новых миграций. `Task.deletedAt` уже существует.
- Добавить индекс `Task(deletedAt)` WHERE `deletedAt IS NOT NULL` (partial index) для эффективного cron query.

### Observability

- Log `info`: `Task soft-deleted`, `{correlationId, taskId, assigneesAffected: number}`
- Log `info`: `Task restored`, `{correlationId, taskId}`
- Log `info`: `Cleanup cron: permanently deleted {count} tasks`
- Log `info`: `Invite expiry cron: expired {count} invites, revoked {count} assignees`
- Counter: `tasks_soft_deleted_total`, `tasks_restored_total`, `tasks_permanently_deleted_total`
- Counter: `invites_expired_total`

### DoD

- [ ]  Soft delete скрывает задачу из all active queries
- [ ]  Soft delete каскадно проставляет `deletedAt` на связанные TaskAssignees
- [ ]  Restore возвращает задачу и связанные TaskAssignees
- [ ]  Batch restore работает
- [ ]  Trash endpoint с пагинацией
- [ ]  Cron job удаляет задачи старше 30 дней (cascade: subtasks, chat, assignees)
- [ ]  Cron job expiry для invites + revoke pending assignees
- [ ]  Delete доступен только owner (не assignee)
- [ ]  Audit log на все операции
- [ ]  All 18+ tests green
## Sprint 9 — Correction Flow via Telegram

### Scope

Пользователь пишет в Telegram «Не молоток, а молоко» — система определяет, что это **коррекция последней задачи**, а не новая задача. AI Router анализирует intent, находит последнюю созданную задачу, формирует correction prompt, обновляет задачу.

### Архитектурные решения

- **Intent detection** — AI Router (в `task-parsing` processor): перед парсингом задачи — определить intent: `CREATE_NEW` vs `CORRECT_LAST`. Heuristics + AI:
    - Если text начинается с «нет», «не», «исправь», «поменяй», «я имел в виду» → вероятно correction.
    - Подтвердить через AI: «Is this a correction of a previous task or a new task?» (cheap, fast prompt).
- **Last task lookup** — `SELECT * FROM tasks WHERE userId = ? AND deletedAt IS NULL ORDER BY createdAt DESC LIMIT 1`.
- **Correction prompt** — «Original task: {title}. User correction: {text}. Return updated title and summary.»
- **DB update** — `Task.update({ title, summary })` + `ActionHistory` с type `CORRECTION`.
- **Notification** — «✏️ Исправлено: «{oldTitle}» → «{newTitle}»».
- **Ambiguity** — если AI не уверен (confidence < 0.7) → create new task, уведомить: «Создали новую задачу. Если хотели исправить предыдущую, напишите /undo».

### API Contracts

Нет новых HTTP-эндпоинтов. Всё через webhook → queue pipeline.

**Internal: CorrectionResult Zod schema:**

text

```
{
  intent: "CORRECT_LAST" | "CREATE_NEW",
  confidence: number (0–1),
  correction?: {
    title: string,
    summary?: string,
    deadline?: string (ISO8601)
  }
}
```

**Notification templates:**

text

```
Correction applied:
"✏️ Исправлено:\n«{oldTitle}» → «{newTitle}»"

Ambiguous (created new):
"🆕 Создана задача: **{title}**\n_Если хотели исправить предыдущую, напишите /undo_"
```

**Error codes:**

text

```
CORRECTION_NO_RECENT_TASK — "No recent task to correct"
CORRECTION_AI_ERROR — "Failed to process correction"
```

### Test Plan

**E2E:**

- `correction.e2e-spec`: `"Не молоток, а молоко" → last task title updated`
- `correction.e2e-spec`: `"Исправь дедлайн на пятницу" → deadline updated`
- `correction.e2e-spec`: `correction notification sent with old → new`
- `correction.e2e-spec`: `ActionHistory created with type CORRECTION`
- `correction.e2e-spec`: `no recent task → CORRECTION_NO_RECENT_TASK notification`
- `correction.e2e-spec`: `ambiguous text → creates new task + hint notification`

**Integration:**

- `intent-detector.integration-spec`: `"не X, а Y" → CORRECT_LAST`
- `intent-detector.integration-spec`: `"Купить хлеб" → CREATE_NEW`
- `intent-detector.integration-spec`: `"Поменяй название на..." → CORRECT_LAST`
- `correction-apply.integration-spec`: `updates task and creates ActionHistory`

**Unit:**

- `correction-result.validator.unit-spec`: `valid correction passes`
- `correction-result.validator.unit-spec`: `intent without correction field when CORRECT_LAST → fails`
- `heuristic-detector.unit-spec`: `"нет" prefix → suggests correction`
- `heuristic-detector.unit-spec`: `"исправь" → suggests correction`

### Data / Migration Notes

- Нет новых миграций. `ActionHistory.type` добавлен в Sprint 6 (включает `CORRECTION`).

### Observability

- Log `info`: `Intent detected`, `{correlationId, intent, confidence}`
- Log `info`: `Correction applied`, `{correlationId, taskId, oldTitle, newTitle}`
- Counter: `intent_detection_total{intent=CORRECT_LAST|CREATE_NEW}`
- Counter: `corrections_applied_total`

### DoD

- [ ]  Correction intent detected from Telegram text
- [ ]  Last task updated with corrected title/summary/deadline
- [ ]  ActionHistory with type CORRECTION
- [ ]  Notification with old → new
- [ ]  Ambiguous case → new task created + hint
- [ ]  No recent task → error notification
- [ ]  All 14+ tests green

---

## Sprint 10 — Reliability Polish

### Scope

Production hardening: rate limiting (per-user + global), BullMQ retry config + DLQ (dead-letter queue), structured error monitoring, health endpoint v2, load test 100 parallel webhook requests.

### Архитектурные решения

- **Rate limiting** — `@nestjs/throttler`: per-user 10 req/s на webhook, 30 req/s на REST API. Global: 1000 req/s.
- **BullMQ retry** — все queues: `attempts: 3`, `backoff: { type: 'exponential', delay: 5000 }`. After max attempts → move to DLQ (`*-dlq`).
- **DLQ monitoring** — cron job каждые 5 мин: проверить DLQ sizes, log `warn` если > 0, counter для alerting.
- **Health v2** — `GET /health/detailed`: includes queue sizes, DLQ sizes, DB connection pool stats, Redis memory usage.
- **Load test** — artillery / k6 script: 100 parallel webhook requests с разными `update_id`. Acceptance criteria: 100% 200 OK, p95 < 500 мс, 0 duplicates в DB.

### API Contracts

**`GET /health/detailed`**

text

```
Response 200:
{
  "status": "ok",
  "version": "string",
  "uptime": number,
  "services": {
    "database": { "status": "up", "connectionPool": { "active": 5, "idle": 10 } },
    "redis": { "status": "up", "memoryUsageMb": 42 },
    "queues": {
      "task-parsing": { "waiting": 0, "active": 1, "delayed": 0, "failed": 0 },
      "voice-transcription": { "waiting": 0, "active": 0, "delayed": 0, "failed": 0 },
      "notifications": { "waiting": 2, "active": 1, "delayed": 0, "failed": 0 }
    },
    "dlq": {
      "task-parsing-dlq": { "size": 0 },
      "voice-transcription-dlq": { "size": 0 },
      "notifications-dlq": { "size": 1 }
    }
  }
}
```

### Test Plan

**E2E:**

- `rate-limit.e2e-spec`: `11th request within 1s → 429 with Retry-After header`
- `rate-limit.e2e-spec`: `different users → independent rate limits`
- `dlq.e2e-spec`: `job fails 3 times → moved to DLQ`
- `dlq.e2e-spec`: `DLQ size reflected in /health/detailed`
- `health-detailed.e2e-spec`: `returns queue stats and DB pool info`

**Load test:**

- `load-test.spec`: `100 parallel webhooks → 100% success, 0 duplicates, p95 < 500ms`
- `load-test.spec`: `50 parallel task-parsing jobs → all tasks created, no duplicates`
- `load-test.spec`: `mixed load (text + voice) → correct routing, no cross-contamination`

**Integration:**

- `retry.integration-spec`: `failed job retried 3 times with exponential backoff`
- `retry.integration-spec`: `after 3 failures → job in DLQ`
- `dlq-monitor.integration-spec`: `DLQ monitor detects non-empty queue and logs warning`

**Unit:**

- `rate-limit-key.unit-spec`: `generates correct key per user`
- `backoff-calculator.unit-spec`: `exponential delays: 5s, 10s, 20s`

### Data / Migration Notes

- Нет новых миграций.
- Ensure partial index `Task(deletedAt) WHERE deletedAt IS NOT NULL` exists (from Sprint 8).

### Observability

- Log `warn`: `DLQ non-empty`, `{queue, size}`
- Log `warn`: `Rate limit hit`, `{userId, endpoint}`
- Counters: `rate_limit_hits_total{endpoint}`, `dlq_size{queue}`, `job_retries_total{queue,attempt}`
- Histograms: `webhook_concurrent_requests`, `job_processing_time_ms{queue}`
- Alert rules (production):
    - `dlq_size > 10` → PagerDuty
    - `webhook_response_time_p95 > 1s` → Slack
    - `ai_parse_total{result=error}` rate > 20% → Slack

### DoD

- [ ]  Rate limiting: 10 req/s per user on webhook, 429 returned correctly
- [ ]  BullMQ retries: 3 attempts, exponential backoff, DLQ after failure
- [ ]  `GET /health/detailed` shows queue stats, DLQ sizes, DB pool
- [ ]  DLQ monitor cron logs warnings
- [ ]  Load test: 100 parallel webhooks → 100% success, 0 duplicates
- [ ]  Load test: p95 response time < 500 мс
- [ ]  All 15+ tests green
- [ ]  CI pipeline runs full test suite including load test

---

## Sprint 11 — Assignee & Invite Flow

### Scope

Полный flow назначения исполнителя на задачу через Telegram-бот: создание инвайта → отправка ссылки → принятие/отклонение → TaskAssignee CONNECTED → расширение доступа к задаче. Реализация бизнес-логики для моделей TaskAssignee, Invite, ProjectMember, добавленных в схему в Sprint 2.

### Архитектурные решения

- **Invite creation** — команда `/connect_user @username` в Telegram (stub из Sprint 1 → реализация):
    
    1. Найти задачу (последнюю или по ID: `/connect_user @username <task_id>`)
    2. Проверить: `isOwner(userId, taskId)` — только owner может назначать
    3. Проверить partial unique index: нет активного assignee на задачу (MVP — один assignee)
    4. Создать `Invite` (token=randomUUID, expiresAt=+7d, scope=USER_ONLY)
    5. Создать `TaskAssignee` (status=PENDING, telegramUsername=@username, assignedByUserId=owner)
    6. Отправить уведомление target-юзеру (если он уже зарегистрирован — по chatId; если нет — при следующем `/start` проверить pending invites по username)
- **Accept flow** — `/accept_invite <token>`:
    
    1. Найти `Invite` по token
    2. Валидация: `status === 'PENDING'`, `expiresAt > now()`
    3. `$transaction`:
        - `Invite.status = 'ACCEPTED'`, `usedAt = now()`, `targetTelegramId = accepter.telegramId`
        - `TaskAssignee.status = 'CONNECTED'`, `assigneeUserId = accepter.id`, `connectedAt = now()`
    4. Уведомление обеим сторонам
- **Decline flow** — `/decline_invite <token>`:
    
    1. `Invite.status = 'REVOKED'`, `revokedAt = now()`
    2. `TaskAssignee.status = 'DECLINED'`
    3. Уведомление создателю
- **Revoke** — владелец задачи может отозвать: `/revoke_assignee <task_id>`
    
    1. Проверить `isOwner`
    2. `TaskAssignee.status = 'REVOKED'`, `revokedAt = now()`
    3. Уведомление assignee
- **My assignments** — `/my_assignments`:
    
    1. `SELECT tasks.* FROM tasks JOIN task_assignees ON ... WHERE task_assignees.assignee_user_id = ? AND task_assignees.status = 'CONNECTED' AND task_assignees.deleted_at IS NULL AND tasks.deleted_at IS NULL`
    2. Форматировать список и отправить
- **Access expansion** — `TaskAccessService.canAccess` (из Sprint 4) расширяется:
    
    TypeScript
    
    ```
    async canAccess(userId: bigint, taskId: string): Promise<boolean> {
      const task = await this.prisma.task.findUnique({ where: { id: taskId } });
      if (!task || task.deletedAt) return false;
      if (task.userId === userId) return true;
      
      const assignee = await this.prisma.taskAssignee.findFirst({
        where: {
          taskId,
          assigneeUserId: userId,
          status: 'CONNECTED',
          deletedAt: null,
        }
      });
      return !!assignee;
    }
    ```
    
- **Username переиспользование** — после `CONNECTED` используется только `assigneeUserId`, `telegramUsername` игнорируется для access check. Это позволяет юзеру менять username без потери доступа.
    
- **ProjectMember auto-create** — при создании Project через существующие flows, автоматически создаётся `ProjectMember` с `role=OWNER` для `project.userId`. Это подготовка к shared projects, пока без дополнительной логики.
    

### API Contracts

Нет новых HTTP REST-эндпоинтов (всё через Telegram webhook → queue processors).

**Queue processors (реализация вместо stubs из Sprint 1):**

text

text

```
Processor: user-connection
Input: { userId, targetUsername, taskId?, telegramChatId, correlationId, idempotencyKey }
Logic:
  1. Resolve taskId (если не указан → последняя задача юзера)
  2. Validate isOwner
  3. Check no active assignee (partial unique index)
  4. Create Invite + TaskAssignee
  5. Notify target user
Output: notification job

Processor: invite-acceptance
Input: { userId, token, telegramChatId, correlationId, idempotencyKey }
Logic:
  1. Find invite by token
  2. Validate status + expiry
  3. Transaction: update Invite + TaskAssignee
  4. Notify both parties
Output: notification jobs (×2)

Processor: invite-decline
Input: { userId, token, telegramChatId, correlationId, idempotencyKey }
Logic: similar to acceptance but sets DECLINED/REVOKED

Processor: assignee-revoke
Input: { userId, taskId, telegramChatId, correlationId, idempotencyKey }
Logic:
  1. Validate isOwner
  2. Find active TaskAssignee
  3. Set REVOKED + revokedAt
  4. Notify assignee

Processor: assignments-list
Input: { userId, telegramChatId, correlationId }
Logic:
  1. Query connected assignments
  2. Format task list
  3. Send notification
```

**Notification templates:**

text

text

```
Invite sent:
"📨 Приглашение отправлено @{username} на задачу «{taskTitle}»"

Invite received (target user):
"📬 Вас приглашают на задачу «{taskTitle}» от @{ownerUsername}\n\nПринять: /accept_invite {token}\nОтклонить: /decline_invite {token}"

Invite accepted (owner notification):
"✅ @{username} принял(а) приглашение на задачу «{taskTitle}»"

Invite accepted (assignee notification):
"✅ Вы подключены к задаче «{taskTitle}»"

Invite declined (owner notification):
"❌ @{username} отклонил(а) приглашение на задачу «{taskTitle}»"

Assignee revoked:
"🚫 Ваш доступ к задаче «{taskTitle}» был отозван"

My assignments list:
"📋 Ваши назначения:\n1. {task1Title} (от @{owner1})\n2. {task2Title} (от @{owner2})\n..."

No assignments:
"📋 У вас пока нет назначенных задач"

Errors:
"❌ Инвайт не найден или истёк"
"❌ На этой задаче уже есть исполнитель"
"❌ Только владелец задачи может назначать исполнителей"
```

**Error codes (internal):**

text

text

```
INVITE_NOT_FOUND — token не найден
INVITE_EXPIRED — инвайт истёк
INVITE_ALREADY_USED — уже принят
ASSIGNEE_ALREADY_EXISTS — уже есть активный assignee на задачу (partial unique index violation)
ASSIGNEE_NOT_FOUND — assignee не найден
ASSIGNEE_CANNOT_REVOKE — только owner может отозвать
ASSIGNEE_SELF_ASSIGN — нельзя назначить себя
```

### Test Plan

**E2E (processor-level, с реальной БД):**

- `invite-create.e2e-spec`: `/connect_user @username → creates Invite(PENDING) + TaskAssignee(PENDING)`
- `invite-create.e2e-spec`: `/connect_user @username <task_id> → creates for specific task`
- `invite-create.e2e-spec`: `no recent task → CORRECTION_NO_RECENT_TASK notification`
- `invite-create.e2e-spec`: `non-owner tries to assign → ASSIGNEE_CANNOT_REVOKE notification`
- `invite-create.e2e-spec`: `duplicate active assignee → ASSIGNEE_ALREADY_EXISTS notification`
- `invite-create.e2e-spec`: `self-assign → ASSIGNEE_SELF_ASSIGN notification`
- `invite-accept.e2e-spec`: `/accept_invite → Invite(ACCEPTED) + TaskAssignee(CONNECTED) + assigneeUserId set`
- `invite-accept.e2e-spec`: `expired invite → INVITE_EXPIRED notification`
- `invite-accept.e2e-spec`: `already used invite → INVITE_ALREADY_USED notification`
- `invite-accept.e2e-spec`: `notifications sent to both parties`
- `invite-decline.e2e-spec`: `/decline_invite → TaskAssignee(DECLINED) + owner notified`
- `revoke.e2e-spec`: `/revoke_assignee → TaskAssignee(REVOKED) + revokedAt set + assignee notified`
- `revoke.e2e-spec`: `non-owner tries to revoke → 403`
- `access-expansion.e2e-spec`: `connected assignee can GET /tasks/:id → 200`
- `access-expansion.e2e-spec`: `connected assignee can PATCH /tasks/:id → 200`
- `access-expansion.e2e-spec`: `connected assignee cannot DELETE /tasks/:id → 403`
- `access-expansion.e2e-spec`: `revoked assignee cannot GET /tasks/:id → 403`
- `access-expansion.e2e-spec`: `pending assignee cannot GET /tasks/:id → 403`
- `access-expansion.e2e-spec`: `declined assignee cannot GET /tasks/:id → 403`
- `my-assignments.e2e-spec`: `/my_assignments → list of connected tasks`
- `my-assignments.e2e-spec`: `no assignments → "нет назначенных задач"`

**Integration:**

- `task-access-service.integration-spec`: `canAccess returns true for CONNECTED assignee`
- `task-access-service.integration-spec`: `canAccess returns false for DECLINED assignee`
- `task-access-service.integration-spec`: `canAccess returns false for REVOKED assignee`
- `task-access-service.integration-spec`: `canAccess returns false for PENDING assignee`
- `task-access-service.integration-spec`: `isOwner returns false for assignee`
- `invite-transaction.integration-spec`: `accept invite atomically updates Invite + TaskAssignee`
- `invite-transaction.integration-spec`: `transaction rollback if TaskAssignee update fails → Invite stays PENDING`
- `project-member-auto.integration-spec`: `creating project auto-creates ProjectMember(OWNER)`

**Unit:**

- `invite-token.unit-spec`: `generates valid UUID token`
- `assignee-status-transition.unit-spec`: `PENDING → CONNECTED allowed`
- `assignee-status-transition.unit-spec`: `PENDING → DECLINED allowed`
- `assignee-status-transition.unit-spec`: `PENDING → REVOKED allowed`
- `assignee-status-transition.unit-spec`: `CONNECTED → REVOKED allowed`
- `assignee-status-transition.unit-spec`: `CONNECTED → PENDING rejected`
- `assignee-status-transition.unit-spec`: `DECLINED → CONNECTED rejected`
- `assignee-status-transition.unit-spec`: `REVOKED → CONNECTED rejected`
- `invite-expiry.unit-spec`: `invite with expiresAt in past → isExpired = true`
- `invite-expiry.unit-spec`: `invite with expiresAt in future → isExpired = false`
- `connect-command-parser.unit-spec`: `"/connect_user @john" → { username: "john", taskId: undefined }`
- `connect-command-parser.unit-spec`: `"/connect_user @john abc-123" → { username: "john", taskId: "abc-123" }`

### Data / Migration Notes

- Все модели уже созданы в Sprint 2 миграции. Дополнительных миграций не требуется.
- Seed-скрипт (Sprint 0) уже включает тестовые данные для assignees и invites.
- При создании Project через существующие flows — добавить авто-создание `ProjectMember(role=OWNER)` для `project.userId`. Миграция backfill для существующих проектов:
    
    SQL
    
    ```
    INSERT INTO project_members (id, project_id, user_id, role, joined_at)
    SELECT gen_random_uuid(), id, user_id, 'OWNER', created_at
    FROM projects
    WHERE id NOT IN (SELECT project_id FROM project_members WHERE role = 'OWNER' AND deleted_at IS NULL);
    ```
    

### Observability

- Log `info`: `Invite created`, `{correlationId, inviteId, taskId, targetUsername, ownerUserId}`
- Log `info`: `Invite accepted`, `{correlationId, inviteId, assigneeUserId, taskId}`
- Log `info`: `Invite declined`, `{correlationId, inviteId, taskId}`
- Log `info`: `Assignee revoked`, `{correlationId, taskId, assigneeUserId, revokedByUserId}`
- Log `info`: `Assignments listed`, `{correlationId, userId, count}`
- Log `warn`: `Invite expired on accept attempt`, `{correlationId, inviteId}`
- Log `warn`: `Duplicate assignee blocked by index`, `{correlationId, taskId, targetUsername}`
- Counter: `invites_total{action=created|accepted|declined|expired}`
- Counter: `task_assignees_total{status=PENDING|CONNECTED|DECLINED|REVOKED}`
- Counter: `access_checks_total{result=owner|assignee|denied}`

### DoD

- [ ]  `/connect_user @username` создаёт Invite + TaskAssignee(PENDING)
- [ ]  `/connect_user @username <task_id>` работает для конкретной задачи
- [ ]  `/accept_invite <token>` подключает assignee (CONNECTED), проставляет `assigneeUserId`
- [ ]  `/decline_invite <token>` отклоняет (DECLINED)
- [ ]  `/revoke_assignee <task_id>` отзывает назначение (REVOKED), только owner
- [ ]  `/my_assignments` выводит список задач где юзер — CONNECTED assignee
- [ ]  Assignee (CONNECTED) может видеть и редактировать задачу через REST API
- [ ]  Assignee (CONNECTED) НЕ может удалять задачу
- [ ]  REVOKED/DECLINED/PENDING assignee не имеет доступа к задаче
- [ ]  Partial unique index предотвращает дубликаты активных assignees
- [ ]  Username переиспользование: после CONNECTED доступ по `assigneeUserId`, не по `telegramUsername`
- [ ]  Notifications отправляются обеим сторонам
- [ ]  ProjectMember(OWNER) авто-создаётся при создании проекта
- [ ]  All 25+ tests green
## Обновлённая итоговая карта зависимостей

```
Sprint 0 (foundation)
 └─► Sprint 1 (webhook + command stubs)
      ├─► Sprint 1.5 (Telegram initData Auth) ← НОВЫЙ
      │    └─► Sprint 4 (Task CRUD + TaskAccessService + AuthGuard required)
      └─► Sprint 2 (AI text parser DeepSeek + ALL new models migration)
           ├─► Sprint 3 (Voice pipeline Gemini — НЕ зависит от task-parsing)
           └─► Sprint 4 (Task CRUD + TaskAccessService)
                └─► Sprint 5 (Chat)
                     └─► Sprint 6 (Apply-to-plan)
                          ├─► Sprint 7 (Exclusion + Export)
                          └─► Sprint 8 (Soft delete + assignee cascade)
                               └─► Sprint 9 (Correction flow)
                                    └─► Sprint 11 (Assignee & Invite Flow)

Sprint 10 (reliability) — параллельно со Sprint 7+
```

Каждый спринт заканчивается **зелёным CI** и **прохождением всех тестов предыдущих спринтов** (regression). Любой red test блокирует merge.