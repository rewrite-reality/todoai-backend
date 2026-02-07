-- Migration: add-user-profile-fields
-- Purpose: Sprint 1.5 user profile field review for Telegram initData mapping.
-- Result: NO MIGRATION REQUIRED.
-- Reason:
-- 1) Architecture (immutable truth) maps initData.user.photo_url -> User.telegramPhoto and
--    initData.user.language_code -> User.locale.
-- 2) Audit (immutable truth) and current schema already contain:
--    - User.telegramPhoto mapped to users.telegram_photo (nullable)
--    - User.locale mapped to users.locale (non-null with default "en")
-- 3) Adding User.photoUrl/User.languageCode would conflict with the architecture mapping and
--    would introduce unnecessary duplicate fields.

/*
Prisma schema diff (NO-OP)
==========================
No changes to prisma/schema.prisma are required for Sprint 1.5.

Requested names in prompt:
- photoUrl
- languageCode

Architecture-approved destination fields for initData.user mapping:
- telegramPhoto (existing): String? @map("telegram_photo")
- locale (existing): String  @default("en") @db.VarChar(10)

Conclusion:
- NO MIGRATION REQUIRED
*/

-- Forward migration SQL (NO-OP)
SELECT 'NO MIGRATION REQUIRED: add-user-profile-fields' AS migration_status;

-- Rollback migration SQL (NO-OP)
SELECT 'NO ROLLBACK REQUIRED: add-user-profile-fields' AS rollback_status;

-- Verification query: confirm canonical Sprint 1.5 destination columns exist
SELECT
  c.table_name,
  c.column_name,
  c.is_nullable,
  c.data_type,
  c.character_maximum_length
FROM information_schema.columns c
WHERE c.table_schema = 'public'
  AND c.table_name = 'users'
  AND c.column_name IN ('telegram_photo', 'locale')
ORDER BY c.column_name;