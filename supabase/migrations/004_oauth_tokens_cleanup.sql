-- Cleanup script for oauth_tokens migration
-- Run this FIRST if you get policy already exists errors

-- Drop all policies
DROP POLICY IF EXISTS "Users can view their own oauth tokens" ON oauth_tokens;
DROP POLICY IF EXISTS "Users can insert their own oauth tokens" ON oauth_tokens;
DROP POLICY IF EXISTS "Users can update their own oauth tokens" ON oauth_tokens;
DROP POLICY IF EXISTS "Users can delete their own oauth tokens" ON oauth_tokens;

-- Drop trigger
DROP TRIGGER IF EXISTS update_oauth_tokens_updated_at ON oauth_tokens;

-- Drop function
DROP FUNCTION IF EXISTS update_oauth_tokens_updated_at();

-- Drop indexes
DROP INDEX IF EXISTS idx_oauth_tokens_user_provider;
DROP INDEX IF EXISTS idx_oauth_tokens_org;

-- Drop table (WARNING: This deletes all OAuth tokens!)
DROP TABLE IF EXISTS oauth_tokens;


