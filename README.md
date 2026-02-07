# todoai-backend

Backend-сервис для TodoAI на базе NestJS.

## Что умеет сервис

- REST API и WebSocket-слой для работы с задачами, проектами и чатами.
- Интеграция с Telegram (webhook, обработчики, onboarding-сцены).
- Фоновая обработка задач через BullMQ и Redis.
- Работа с PostgreSQL через Prisma.
- AI-модуль для парсинга и мутаций задач.

## Технологии

- Node.js + NestJS
- PostgreSQL
- Redis + BullMQ
- Prisma ORM
- Jest (unit/integration/e2e)

## Требования

- Node.js 20+
- npm 10+
- Docker + Docker Compose (для локальной инфраструктуры)

## Быстрый старт

### 1) Установить зависимости

```bash
npm install
```

### 2) Поднять PostgreSQL и Redis

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 3) Подготовить переменные окружения

Создайте файл `.env` в корне проекта. Минимально необходимые переменные:

```env
PORT=3000

DATABASE_URL=postgresql://todoai:todoai_password@localhost:5432/todoai_db

REDIS_HOST=localhost
REDIS_PORT=6379

TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_WEBHOOK_SECRET=your_webhook_secret

JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=12345678901234567890123456789012
```

`ENCRYPTION_KEY` должен быть длиной ровно 32 символа.

### 4) Применить миграции

```bash
npx prisma migrate deploy
```

Для локальной разработки также можно использовать:

```bash
npx prisma migrate dev
```

### 5) Запустить проект

```bash
npm run start:dev
```

По умолчанию сервис стартует на `http://localhost:3000`.

## Скрипты

```bash
# разработка
npm run start:dev

# production-сборка и запуск
npm run build
npm run start:prod

# линтер
npm run lint

# тесты
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:all
```

## Тестовое окружение

Для интеграционных и e2e тестов можно поднять отдельную инфраструктуру:

```bash
docker compose -f docker-compose.test.yml up -d
```

## Структура проекта

- `src/modules` — доменные модули приложения.
- `src/common` — общие компоненты (guards, middleware, logger, redis, metrics).
- `src/config` — конфигурация и валидация переменных окружения.
- `prisma` — схема базы данных, миграции и seed.
- `test` — unit, integration и e2e тесты.

## Лицензия

UNLICENSED

## Telegram routing

Webhook ingress routes updates directly to downstream BullMQ queues (`task-parsing`, `voice-transcription`, command queues). A separate ingress queue is intentionally not used.
