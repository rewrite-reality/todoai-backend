-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('BACKLOG', 'TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "InputType" AS ENUM ('TEXT', 'VOICE');

-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'RESTORE', 'AI_MUTATION', 'REORDER');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('PROJECT', 'TASK', 'SUBTASK', 'CHAT_MESSAGE');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PRO', 'TEAM');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "telegram_id" BIGINT NOT NULL,
    "telegram_name" VARCHAR(255),
    "telegram_photo" VARCHAR(512),
    "encrypted_api_key" TEXT,
    "tier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
    "ai_credits_used" INTEGER NOT NULL DEFAULT 0,
    "ai_credits_reset_at" TIMESTAMP(3),
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'UTC',
    "locale" VARCHAR(10) NOT NULL DEFAULT 'en',
    "is_onboarded" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "emoji" VARCHAR(10),
    "color" VARCHAR(7),
    "ai_context" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "parent_id" UUID,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "user_id" UUID NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "summary" TEXT,
    "original_input" TEXT,
    "original_input_type" "InputType",
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'NONE',
    "deadline" TIMESTAMP(3),
    "start_date" TIMESTAMP(3),
    "estimated_minutes" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "ai_processed_at" TIMESTAMP(3),
    "ai_model_used" VARCHAR(50),
    "ai_tokens_used" INTEGER,
    "deleted_at" TIMESTAMP(3),
    "user_id" UUID NOT NULL,
    "project_id" UUID,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subtasks" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "task_id" UUID NOT NULL,

    CONSTRAINT "subtasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "is_excluded" BOOLEAN NOT NULL DEFAULT false,
    "ai_model_used" VARCHAR(50),
    "ai_tokens_used" INTEGER,
    "applied_at" TIMESTAMP(3),
    "mutation_id" UUID,
    "deleted_at" TIMESTAMP(3),
    "task_id" UUID NOT NULL,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action_history" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "action_type" "ActionType" NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "payload" JSONB NOT NULL,
    "ai_prompt_used" TEXT,
    "ai_model_used" VARCHAR(50),
    "ai_tokens_used" INTEGER,
    "is_undone" BOOLEAN NOT NULL DEFAULT false,
    "undone_at" TIMESTAMP(3),
    "undone_by_id" UUID,

    CONSTRAINT "action_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_id_key" ON "users"("telegram_id");

-- CreateIndex
CREATE INDEX "users_telegram_id_idx" ON "users"("telegram_id");

-- CreateIndex
CREATE INDEX "users_deleted_at_idx" ON "users"("deleted_at");

-- CreateIndex
CREATE INDEX "projects_user_id_deleted_at_idx" ON "projects"("user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "projects_user_id_order_idx" ON "projects"("user_id", "order");

-- CreateIndex
CREATE INDEX "tasks_user_id_deleted_at_idx" ON "tasks"("user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "tasks_user_id_status_deleted_at_idx" ON "tasks"("user_id", "status", "deleted_at");

-- CreateIndex
CREATE INDEX "tasks_user_id_deadline_deleted_at_idx" ON "tasks"("user_id", "deadline", "deleted_at");

-- CreateIndex
CREATE INDEX "tasks_project_id_order_idx" ON "tasks"("project_id", "order");

-- CreateIndex
CREATE INDEX "subtasks_task_id_deleted_at_order_idx" ON "subtasks"("task_id", "deleted_at", "order");

-- CreateIndex
CREATE INDEX "chat_messages_task_id_deleted_at_created_at_idx" ON "chat_messages"("task_id", "deleted_at", "created_at");

-- CreateIndex
CREATE INDEX "chat_messages_task_id_is_excluded_idx" ON "chat_messages"("task_id", "is_excluded");

-- CreateIndex
CREATE INDEX "chat_messages_mutation_id_idx" ON "chat_messages"("mutation_id");

-- CreateIndex
CREATE INDEX "action_history_user_id_created_at_idx" ON "action_history"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "action_history_entity_type_entity_id_created_at_idx" ON "action_history"("entity_type", "entity_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "action_history_is_undone_created_at_idx" ON "action_history"("is_undone", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subtasks" ADD CONSTRAINT "subtasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_mutation_id_fkey" FOREIGN KEY ("mutation_id") REFERENCES "action_history"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_history" ADD CONSTRAINT "action_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_history" ADD CONSTRAINT "action_history_undone_by_id_fkey" FOREIGN KEY ("undone_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 1. Partial Unique Indexes для сортировки (Защита от дублей order)
-- Для задач В ПРОЕКТАХ (project_id IS NOT NULL)
CREATE UNIQUE INDEX idx_tasks_order_in_project 
ON tasks(user_id, project_id, "order") 
WHERE deleted_at IS NULL AND project_id IS NOT NULL;

-- Для задач В INBOX (project_id IS NULL) - Решает проблему с NULL в уникальности
CREATE UNIQUE INDEX idx_tasks_order_inbox 
ON tasks(user_id, "order") 
WHERE deleted_at IS NULL AND project_id IS NULL;

-- Для Проектов
CREATE UNIQUE INDEX idx_projects_order_unique 
ON projects(user_id, "order") 
WHERE deleted_at IS NULL AND is_archived = false;

-- Для Сабтасков
CREATE UNIQUE INDEX idx_subtasks_order_unique 
ON subtasks(task_id, "order") 
WHERE deleted_at IS NULL;


-- 2. Partial Indexes для скорости (Оптимизатор запросов)
-- Users: только активные
CREATE INDEX idx_users_active 
ON users(telegram_id) 
WHERE deleted_at IS NULL;

-- Tasks: Today View (исключая архив и завершенные)
CREATE INDEX idx_tasks_today_view 
ON tasks(user_id, deadline, status) 
WHERE deleted_at IS NULL AND status NOT IN ('DONE', 'ARCHIVED');

-- Chat: Активный контекст для AI (исключая скрытые сообщения)
CREATE INDEX idx_chat_active_context 
ON chat_messages(task_id, created_at) 
WHERE deleted_at IS NULL AND is_excluded = false;

-- Trash: Эффективная корзина (только удаленные за последние 30 дней)
-- Trash: Эффективная корзина (просто все удаленные)
CREATE INDEX idx_tasks_trash_recent 
ON tasks(user_id, deleted_at DESC) 
WHERE deleted_at IS NOT NULL;



-- 3. GIN Index для JSON логов (Поиск по diff)
CREATE INDEX idx_action_history_payload_gin 
ON action_history USING GIN(payload);


-- 4. Safety Constraints (Защита данных)
-- Кредиты не могут быть отрицательными
ALTER TABLE users 
ADD CONSTRAINT check_credits_positive 
CHECK (ai_credits_used >= 0);

-- Валидация длины зашифрованного ключа (если он есть)
ALTER TABLE users 
ADD CONSTRAINT check_encrypted_key_len 
CHECK (encrypted_api_key IS NULL OR length(encrypted_api_key) BETWEEN 40 AND 1000);
