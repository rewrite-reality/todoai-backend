BEGIN;

-- Sprint 2 DB patch (idempotent): schema normalization + required partial unique indexes.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AssigneeStatus') THEN
    CREATE TYPE "AssigneeStatus" AS ENUM ('PENDING', 'CONNECTED', 'DECLINED', 'REVOKED');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InviteStatus') THEN
    CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'InviteScope') THEN
    CREATE TYPE "InviteScope" AS ENUM ('USER_ONLY', 'PROJECT_INVITE');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ProjectRole') THEN
    CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');
  END IF;
END
$$;

-- Sprint 2 fallback status
ALTER TYPE "TaskStatus" ADD VALUE IF NOT EXISTS 'PARSE_FAILED';

-- Keep EntityType compatible with TaskAssignee audit entity
ALTER TYPE "EntityType" ADD VALUE IF NOT EXISTS 'TASK_ASSIGNEE';

-- ---------------------------------------------------------------------------
-- CORE TASK COLUMNS
-- ---------------------------------------------------------------------------
ALTER TABLE "tasks"
  ADD COLUMN IF NOT EXISTS "original_input" TEXT,
  ADD COLUMN IF NOT EXISTS "original_input_type" "InputType";

-- ---------------------------------------------------------------------------
-- SPRINT 2 TABLES (create only if missing)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "task_assignees" (
  "id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "task_id" UUID NOT NULL,
  "assigned_by_user_id" UUID NOT NULL,
  "status" "AssigneeStatus" NOT NULL DEFAULT 'PENDING',
  "telegram_username" VARCHAR(255),
  "assignee_user_id" UUID,
  "invited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "connected_at" TIMESTAMP(3),
  "revoked_at" TIMESTAMP(3),
  "declined_at" TIMESTAMP(3),
  "note" TEXT,
  "deleted_at" TIMESTAMP(3),
  CONSTRAINT "task_assignees_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "invites" (
  "id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "token" VARCHAR(128) NOT NULL,
  "created_by_user_id" UUID NOT NULL,
  "target_telegram_username" VARCHAR(255) NOT NULL,
  "target_telegram_id" BIGINT,
  "status" "InviteStatus" NOT NULL DEFAULT 'PENDING',
  "expires_at" TIMESTAMP(3) NOT NULL,
  "used_at" TIMESTAMP(3),
  "revoked_at" TIMESTAMP(3),
  "scope" "InviteScope" NOT NULL DEFAULT 'USER_ONLY',
  "project_id" UUID,
  "metadata" JSONB,
  CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "project_members" (
  "id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "project_id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "role" "ProjectRole" NOT NULL DEFAULT 'MEMBER',
  "invited_by_user_id" UUID,
  "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMP(3),
  CONSTRAINT "project_members_pkey" PRIMARY KEY ("id")
);

-- ---------------------------------------------------------------------------
-- RELATION CONSTRAINTS FOR Task/User/Project<->new Sprint 2 models
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'task_assignees_task_id_fkey') THEN
    ALTER TABLE "task_assignees"
      ADD CONSTRAINT "task_assignees_task_id_fkey"
      FOREIGN KEY ("task_id") REFERENCES "tasks"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'task_assignees_assigned_by_user_id_fkey') THEN
    ALTER TABLE "task_assignees"
      ADD CONSTRAINT "task_assignees_assigned_by_user_id_fkey"
      FOREIGN KEY ("assigned_by_user_id") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'task_assignees_assignee_user_id_fkey') THEN
    ALTER TABLE "task_assignees"
      ADD CONSTRAINT "task_assignees_assignee_user_id_fkey"
      FOREIGN KEY ("assignee_user_id") REFERENCES "users"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'invites_created_by_user_id_fkey') THEN
    ALTER TABLE "invites"
      ADD CONSTRAINT "invites_created_by_user_id_fkey"
      FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'invites_project_id_fkey') THEN
    ALTER TABLE "invites"
      ADD CONSTRAINT "invites_project_id_fkey"
      FOREIGN KEY ("project_id") REFERENCES "projects"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'project_members_project_id_fkey') THEN
    ALTER TABLE "project_members"
      ADD CONSTRAINT "project_members_project_id_fkey"
      FOREIGN KEY ("project_id") REFERENCES "projects"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'project_members_user_id_fkey') THEN
    ALTER TABLE "project_members"
      ADD CONSTRAINT "project_members_user_id_fkey"
      FOREIGN KEY ("user_id") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'project_members_invited_by_user_id_fkey') THEN
    ALTER TABLE "project_members"
      ADD CONSTRAINT "project_members_invited_by_user_id_fkey"
      FOREIGN KEY ("invited_by_user_id") REFERENCES "users"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END
$$;

-- ---------------------------------------------------------------------------
-- REQUIRED PARTIAL UNIQUE INDEXES (Sprint 2 spec)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  -- Normalize legacy index name from previous migration.
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'uq_task_assignee_active_per_task')
     AND NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'uq_task_assignee_active') THEN
    ALTER INDEX "uq_task_assignee_active_per_task" RENAME TO "uq_task_assignee_active";
  END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS "uq_task_assignee_active"
  ON "task_assignees" ("task_id")
  WHERE "deleted_at" IS NULL
    AND "revoked_at" IS NULL
    AND "status" IN ('PENDING', 'CONNECTED');

CREATE UNIQUE INDEX IF NOT EXISTS "uq_project_member_active"
  ON "project_members" ("project_id", "user_id")
  WHERE "deleted_at" IS NULL;

-- ---------------------------------------------------------------------------
-- PERFORMANCE INDEXES (create only if missing; do not duplicate existing)
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS "tasks_user_id_status_deleted_at_idx"
  ON "tasks" ("user_id", "status", "deleted_at");

CREATE INDEX IF NOT EXISTS "tasks_user_id_deadline_deleted_at_idx"
  ON "tasks" ("user_id", "deadline", "deleted_at");

CREATE INDEX IF NOT EXISTS "subtasks_task_id_deleted_at_order_idx"
  ON "subtasks" ("task_id", "deleted_at", "order");

COMMIT;


