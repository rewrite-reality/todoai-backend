-- Ensure tasks table has original_input column
ALTER TABLE "tasks"
ADD COLUMN IF NOT EXISTS "original_input" TEXT;
