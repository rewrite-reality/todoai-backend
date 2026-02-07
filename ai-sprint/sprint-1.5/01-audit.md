# Sprint 1.5 Audit - Telegram initData Authentication

## 1) Current User model in `prisma/schema.prisma` (exact fields/types/PK)
- File path: `prisma/schema.prisma`
- Code snippet (full model block):
```prisma
model User {
  id        String   @id @default(uuid()) @db.Uuid
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  telegramId    BigInt  @unique @map("telegram_id")
  telegramName  String? @map("telegram_name") @db.VarChar(255)
  telegramPhoto String? @map("telegram_photo") @db.VarChar(512)

  encryptedApiKey String? @map("encrypted_api_key") @db.Text

  tier             SubscriptionTier @default(FREE)
  aiCreditsUsed    Int              @default(0) @map("ai_credits_used")
  aiCreditsResetAt DateTime?        @map("ai_credits_reset_at")

  timezone    String  @default("UTC") @db.VarChar(50)
  locale      String  @default("en") @db.VarChar(10)
  isOnboarded Boolean @default(false) @map("is_onboarded")

  deletedAt DateTime? @map("deleted_at")

  projects      Project[]
  tasks         Task[]

  actionHistory ActionHistory[] @relation("ActionAuthor")
  undoneActions ActionHistory[] @relation("ActionUndoneBy")

  assignedTasks TaskAssignee[] @relation("Assignee")
  assignedByMe TaskAssignee[] @relation("AssignedBy")

  createdInvites Invite[] @relation("InviteCreator")

  projectMemberships ProjectMember[] @relation("MemberUser")

  invitedMembers ProjectMember[] @relation("MemberInvitedBy")

  @@index([telegramId])
  @@index([deletedAt])
  @@map("users")
}
```
- Current state: `EXISTS`

## 2) Whether `photoUrl` and `languageCode` exist on `User`
- File path: `prisma/schema.prisma`
- Code snippet:
```prisma
telegramPhoto String? @map("telegram_photo") @db.VarChar(512)
locale        String  @default("en") @db.VarChar(10)
```
- Current state: `EXISTS` for `telegramPhoto` and `locale`; `NOT FOUND` for exact fields `photoUrl` and `languageCode`.

## 3) Existing auth-related code (guards, middleware, decorators, JWT usage)
- File paths:
  - `src/common/guards/telegram-auth.guard.ts`
  - `src/common/decorators/telegram-user.decorator.ts`
  - `src/modules/auth/auth.module.ts`
  - `src/modules/auth/auth.controller.ts`
  - `src/modules/auth/auth.service.ts`
  - `src/modules/auth/strategies/telegram.strategy.ts`
  - `src/common/middleware/correlation-id.middleware.ts`
  - `src/config/configuration.ts`
- Code snippets:
```ts
// src/common/guards/telegram-auth.guard.ts
// empty file (0 bytes)

// src/common/decorators/telegram-user.decorator.ts
// empty file (0 bytes)

// src/modules/auth/auth.module.ts
// empty file (0 bytes)

// src/modules/auth/auth.controller.ts
// empty file (0 bytes)

// src/modules/auth/auth.service.ts
// empty file (0 bytes)

// src/modules/auth/strategies/telegram.strategy.ts
// empty file (0 bytes)
```
```ts
// src/common/middleware/correlation-id.middleware.ts
const CORRELATION_HEADER = 'x-correlation-id';
```
```ts
// src/config/configuration.ts
jwtSecret: envVars.JWT_SECRET,
```
- Current state: `EXISTS` for placeholder files and correlation middleware; `NOT FOUND` for implemented guards/decorators/strategies/JWT runtime usage in source.

## 4) How `POST /webhook/telegram` validates `X-Telegram-Bot-Api-Secret-Token`
- File paths:
  - `src/modules/telegram/telegram.controller.ts`
  - `src/modules/telegram/telegram-webhook.service.ts`
- Code snippets:
```ts
// src/modules/telegram/telegram.controller.ts
@Post()
@HttpCode(200)
async handleWebhook(
  @Body() update: unknown,
  @Headers('x-telegram-bot-api-secret-token') secretToken: string | undefined,
  @Req() req: Request,
) {
  return this.telegramWebhookService.ingestUpdate(
    update,
    secretToken,
    req.correlationId ?? 'unknown-correlation-id',
  );
}
```
```ts
// src/modules/telegram/telegram-webhook.service.ts
private validateSecret(secretToken: string | undefined): void {
  const expectedSecret = this.configService.get<string>(
    'TELEGRAM_WEBHOOK_SECRET',
  );

  if (!expectedSecret || secretToken !== expectedSecret) {
    throw new ForbiddenException({
      code: 'TELEGRAM_INVALID_SECRET',
      message: 'Invalid Telegram webhook secret',
    });
  }
}
```
- Current state: `EXISTS` (header is read in controller and strict equality-checked against `TELEGRAM_WEBHOOK_SECRET` in service).

## 5) Existing `AllExceptionsFilter` and error format `{ error: { code, message, details? } }`
- File path: `src/common/filters/all-exceptions.filter.ts`
- Code snippet:
```ts
type ErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

private formatError(
  code: string,
  message: string,
  details?: unknown,
): ErrorBody {
  const payload: ErrorBody['error'] = { code, message };
  if (details !== undefined) {
    payload.details = details;
  }
  return { error: payload };
}
```
- Current state: `EXISTS` (global filter formats errors as `{ error: { code, message, details? } }`).

## 6) Existing `CorrelationIdMiddleware` implementation
- File path: `src/common/middleware/correlation-id.middleware.ts`
- Code snippet:
```ts
const CORRELATION_HEADER = 'x-correlation-id';

use(req: Request, res: Response, next: NextFunction) {
  const incomingId = req.header(CORRELATION_HEADER);
  const correlationId =
    incomingId && incomingId.trim().length > 0 ? incomingId : randomUUID();

  req.correlationId = correlationId;
  res.setHeader(CORRELATION_HEADER, correlationId);

  this.context.run({ correlationId }, () => next());
}
```
- Current state: `EXISTS`.

## 7) Which endpoints currently exist and whether any already have auth guards
- File paths:
  - `src/app.controller.ts`
  - `src/modules/health/health.controller.ts`
  - `src/modules/telegram/telegram.controller.ts`
  - `src/modules/user/user.controller.ts`
  - `src/modules/chat/chat.controller.ts`
  - `src/modules/project/project.controller.ts`
  - `src/modules/task/task.controller.ts`
  - `src/modules/auth/auth.controller.ts`
- Code snippets:
```ts
// src/app.controller.ts
@Controller()
@Get()
getHello(): string
```
```ts
// src/modules/health/health.controller.ts
@Controller('health')
@Get()
async health()
```
```ts
// src/modules/telegram/telegram.controller.ts
@Controller('webhook/telegram')
@Post()
async handleWebhook(...)
```
```ts
// src/modules/user/user.controller.ts
@Controller('users')
export class UserController {}
```
```ts
// src/modules/chat/chat.controller.ts
// empty file (0 bytes)

// src/modules/project/project.controller.ts
// empty file (0 bytes)

// src/modules/task/task.controller.ts
// empty file (0 bytes)

// src/modules/auth/auth.controller.ts
// empty file (0 bytes)
```
- Current state: `EXISTS` endpoints are `GET /`, `GET /health`, `POST /webhook/telegram`; `NOT FOUND` any `@UseGuards(...)` on existing HTTP routes.

## 8) Existing test factories (`createTestUser`, etc.) signatures and accepted fields
- File paths:
  - `test/factories/user.factory.ts`
  - `test/factories/project.factory.ts`
  - `test/factories/task.factory.ts`
  - `test/factories/chat-message.factory.ts`
  - `test/factories/invite.factory.ts`
  - `test/factories/task-assignee.factory.ts`
  - `test/factories/project-member.factory.ts`
- Code snippets:
```ts
// user.factory.ts
type UserOverride = Partial<User>;
export async function createTestUser(overrides: UserOverride = {}): Promise<User>
// accepts User fields via Partial<User>; explicitly used in data:
// telegramId, telegramName, telegramPhoto, encryptedApiKey, tier,
// aiCreditsUsed, aiCreditsResetAt, timezone, locale, isOnboarded
```
```ts
// project.factory.ts
type ProjectOverride = Partial<Project> & { userId?: string };
export async function createTestProject(overrides: ProjectOverride = {}): Promise<Project>
```
```ts
// task.factory.ts
type TaskOverride = Partial<Task> & {
  userId?: string;
  projectId?: string;
  subtasksCount?: number;
};
export async function createTestTask(
  overrides: TaskOverride = {},
): Promise<Task & { subtasks: { id: string; title: string }[] }>
```
```ts
// chat-message.factory.ts
type ChatMessageOverride = Partial<ChatMessage> & { taskId?: string };
export async function createTestChatMessage(
  overrides: ChatMessageOverride = {},
): Promise<ChatMessage>
```
```ts
// invite.factory.ts
type InviteOverride = Partial<Invite> & { createdByUserId?: string };
export async function createTestInvite(overrides: InviteOverride = {}): Promise<Invite>
```
```ts
// task-assignee.factory.ts
type TaskAssigneeOverride = Partial<TaskAssignee> & {
  taskId?: string;
  assignedByUserId?: string;
  assigneeUserId?: string | null;
};
export async function createTestTaskAssignee(
  overrides: TaskAssigneeOverride = {},
): Promise<TaskAssignee>
```
```ts
// project-member.factory.ts
type ProjectMemberOverride = Partial<ProjectMember> & {
  projectId?: string;
  userId?: string;
  invitedByUserId?: string | null;
};
export async function createTestProjectMember(
  overrides: ProjectMemberOverride = {},
): Promise<ProjectMember>
```
- Current state: `EXISTS`.

## 9) How `app()` test helper works (NestJS test bootstrap)
- File path: `test/helpers/app.ts`
- Code snippet:
```ts
export async function createTestApp(): Promise<TestApplication> {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();

  const app = moduleRef.createNestApplication();
  app.useLogger(app.get(PinoLoggerService));
  await app.init();
  const httpServer = app.getHttpServer() as Parameters<typeof request>[0];

  return {
    app,
    request: request(httpServer),
    close: async () => {
      try {
        const queueModule = app.get<QueueModule>(QueueModule, { strict: false });
        if (queueModule) {
          await queueModule.onModuleDestroy();
        }
      } catch {
        // QueueModule may be absent in some test contexts.
      }
      await app.close();
    },
  };
}
```
- Current state: `EXISTS` (`createTestApp`, not `app()`).

## 10) Current `ConfigModule` / env var loading pattern
- File paths:
  - `src/app.module.ts`
  - `src/config/validation.schema.ts`
  - `src/config/configuration.ts`
  - `src/main.ts`
  - `test/setup-env.ts`
  - `.env.example`
  - `.env.test`
- Code snippets:
```ts
// src/app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  validate: (config) => EnvironmentSchema.parse(config),
})
```
```ts
// src/config/validation.schema.ts
z.object({
  DATABASE_URL: z.string().url(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.preprocess((val) => Number(val), z.number().int().positive()),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_WEBHOOK_URL: z.string().url(),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z.string().length(32),
})
```
```ts
// src/config/configuration.ts
return {
  databaseUrl: envVars.DATABASE_URL,
  redis: { host: envVars.REDIS_HOST, port: envVars.REDIS_PORT },
  telegram: {
    botToken: envVars.TELEGRAM_BOT_TOKEN,
    webhookSecret: envVars.TELEGRAM_WEBHOOK_SECRET,
  },
  jwtSecret: envVars.JWT_SECRET,
  encryptionKey: envVars.ENCRYPTION_KEY,
};
```
```ts
// src/main.ts
import 'dotenv/config';
```
```ts
// test/setup-env.ts
dotenv.config({ path: envPath });
process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
```
- Current state: `EXISTS`.

## 11) `package.json`: `@nestjs/jwt`, `@nestjs/passport`, or similar installed
- File path: `package.json`
- Code snippet:
```json
"dependencies": {
  "@nestjs/bullmq": "^11.0.4",
  "@nestjs/common": "^11.0.1",
  "@nestjs/config": "^4.0.3",
  "@nestjs/core": "^11.0.1",
  "@nestjs/platform-express": "^11.0.1"
}
```
- Current state: `NOT FOUND` for `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt` in `package.json`.

## 12) Any existing `/auth/*` routes or auth modules
- File paths:
  - `src/modules/auth/auth.module.ts`
  - `src/modules/auth/auth.controller.ts`
  - `src/modules/auth/auth.service.ts`
  - `src/modules/auth/strategies/telegram.strategy.ts`
  - `src/app.module.ts`
- Code snippets:
```ts
// src/modules/auth/auth.module.ts
// empty file (0 bytes)

// src/modules/auth/auth.controller.ts
// empty file (0 bytes)

// src/modules/auth/auth.service.ts
// empty file (0 bytes)

// src/modules/auth/strategies/telegram.strategy.ts
// empty file (0 bytes)
```
```ts
// src/app.module.ts imports
imports: [
  ConfigModule.forRoot(...),
  ObservabilityModule,
  RedisModule,
  PrismaModule,
  TelegramModule,
  QueueModule,
  HealthModule,
]
```
- Current state: `EXISTS` auth module files as empty placeholders; `NOT FOUND` any implemented `/auth/*` HTTP route and `NOT FOUND` `AuthModule` registration in `AppModule`.

## BLOCKERS
- `BLOCKER`: None. All 12 requested audit items were locatable in the current repository state.
