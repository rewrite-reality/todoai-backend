-- CreateEnum
CREATE TYPE "AssigneeStatus" AS ENUM ('PENDING', 'CONNECTED', 'DECLINED', 'REVOKED');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED');

-- CreateEnum
CREATE TYPE "InviteScope" AS ENUM ('USER_ONLY', 'PROJECT_INVITE');

-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');

-- AlterEnum
ALTER TYPE "EntityType" ADD VALUE 'TASK_ASSIGNEE';

-- CreateTable
CREATE TABLE "task_assignees" (
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

-- CreateTable
CREATE TABLE "invites" (
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

-- CreateTable
CREATE TABLE "project_members" (
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

-- CreateIndex
CREATE INDEX "task_assignees_assignee_user_id_deleted_at_idx" ON "task_assignees"("assignee_user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "task_assignees_telegram_username_status_deleted_at_idx" ON "task_assignees"("telegram_username", "status", "deleted_at");

-- CreateIndex
CREATE INDEX "task_assignees_task_id_deleted_at_idx" ON "task_assignees"("task_id", "deleted_at");

-- CreateIndex
CREATE INDEX "task_assignees_assigned_by_user_id_deleted_at_idx" ON "task_assignees"("assigned_by_user_id", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "invites_token_key" ON "invites"("token");

-- CreateIndex
CREATE INDEX "invites_target_telegram_username_status_idx" ON "invites"("target_telegram_username", "status");

-- CreateIndex
CREATE INDEX "invites_expires_at_status_idx" ON "invites"("expires_at", "status");

-- CreateIndex
CREATE INDEX "invites_created_by_user_id_idx" ON "invites"("created_by_user_id");

-- CreateIndex
CREATE INDEX "project_members_user_id_deleted_at_idx" ON "project_members"("user_id", "deleted_at");

-- CreateIndex
CREATE INDEX "project_members_project_id_deleted_at_idx" ON "project_members"("project_id", "deleted_at");

-- AddForeignKey
ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_assigned_by_user_id_fkey" FOREIGN KEY ("assigned_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_assignees" ADD CONSTRAINT "task_assignees_assignee_user_id_fkey" FOREIGN KEY ("assignee_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_invited_by_user_id_fkey" FOREIGN KEY ("invited_by_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================================================
-- Migration: Add partial indexes and constraints for v3.0.0
-- Run AFTER the Prisma-generated migration
-- ============================================================================

-- 1. TaskAssignee: At most ONE active (non-revoked, non-deleted) assignee per task (MVP).
--    When you're ready for multi-assignee, DROP this index.
CREATE UNIQUE INDEX "uq_task_assignee_active_per_task"
  ON "task_assignees" ("task_id")
  WHERE "deleted_at" IS NULL
    AND "revoked_at" IS NULL
    AND "status" IN ('PENDING', 'CONNECTED');

-- 2. TaskAssignee: Prevent duplicate pending assignments for the same username on the same task.
CREATE UNIQUE INDEX "uq_task_assignee_pending_username"
  ON "task_assignees" ("task_id", "telegram_username")
  WHERE "deleted_at" IS NULL
    AND "status" = 'PENDING';

-- 3. ProjectMember: One active membership per user per project.
CREATE UNIQUE INDEX "uq_project_member_active"
  ON "project_members" ("project_id", "user_id")
  WHERE "deleted_at" IS NULL;

-- 4. Invite: Prevent multiple active (PENDING) invites for the same username by the same user.
--    (Optional — depends on product decision. Uncomment if needed.)
-- CREATE UNIQUE INDEX "uq_invite_pending_per_creator_target"
--   ON "invites" ("created_by_user_id", "target_telegram_username")
--   WHERE "status" = 'PENDING';

-- 5. TaskAssignee: CHECK that PENDING rows always have a telegram_username.
ALTER TABLE "task_assignees"
  ADD CONSTRAINT "chk_pending_requires_username"
  CHECK (
    "status" != 'PENDING' OR "telegram_username" IS NOT NULL
  );

-- 6. TaskAssignee: CHECK that CONNECTED rows always have an assignee_user_id.
ALTER TABLE "task_assignees"
  ADD CONSTRAINT "chk_connected_requires_user_id"
  CHECK (
    "status" != 'CONNECTED' OR "assignee_user_id" IS NOT NULL
  );

-- 7. Invite: CHECK that expiration is in the future at creation (advisory, not strictly enforced at DB level).
--    Alternatively, enforce in application code.
-- ALTER TABLE "invites"
--   ADD CONSTRAINT "chk_invite_expires_future"
--   CHECK ("expires_at" > "created_at");

-- 8. Normalize telegram_username to lowercase via a trigger (optional but recommended).
CREATE OR REPLACE FUNCTION normalize_task_assignee_username()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.telegram_username IS NOT NULL THEN
    NEW.telegram_username := LOWER(TRIM(LEADING '@' FROM NEW.telegram_username));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION normalize_invite_target_username()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.target_telegram_username IS NOT NULL THEN
    NEW.target_telegram_username := LOWER(TRIM(LEADING '@' FROM NEW.target_telegram_username));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_task_assignee_normalize_username
  BEFORE INSERT OR UPDATE ON "task_assignees"
  FOR EACH ROW EXECUTE FUNCTION normalize_task_assignee_username();

CREATE TRIGGER trg_invite_normalize_username
  BEFORE INSERT OR UPDATE ON "invites"
  FOR EACH ROW EXECUTE FUNCTION normalize_invite_target_username();
