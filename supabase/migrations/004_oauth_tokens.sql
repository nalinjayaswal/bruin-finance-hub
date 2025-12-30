-- OAuth tokens for external integrations (Gmail, Drive, etc.)

-- Drop existing policies first (if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'oauth_tokens') THEN
    DROP POLICY IF EXISTS "Users can view their own oauth tokens" ON oauth_tokens;
    DROP POLICY IF EXISTS "Users can insert their own oauth tokens" ON oauth_tokens;
    DROP POLICY IF EXISTS "Users can update their own oauth tokens" ON oauth_tokens;
    DROP POLICY IF EXISTS "Users can delete their own oauth tokens" ON oauth_tokens;
  END IF;
END $$;

-- Create table
CREATE TABLE IF NOT EXISTS oauth_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'google', 'microsoft', etc.
  scope TEXT NOT NULL, -- Space-separated scopes like 'gmail.readonly drive.file'
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Ensure one token set per user per provider
  UNIQUE(user_id, provider)
);

-- Index for quick lookups
CREATE INDEX IF NOT EXISTS idx_oauth_tokens_user_provider ON oauth_tokens(user_id, provider);
CREATE INDEX IF NOT EXISTS idx_oauth_tokens_org ON oauth_tokens(organization_id);

-- RLS Policies
ALTER TABLE oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Users can only see and manage their own tokens
CREATE POLICY "Users can view their own oauth tokens"
  ON oauth_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own oauth tokens"
  ON oauth_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own oauth tokens"
  ON oauth_tokens FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own oauth tokens"
  ON oauth_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_oauth_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_oauth_tokens_updated_at ON oauth_tokens;

CREATE TRIGGER update_oauth_tokens_updated_at
  BEFORE UPDATE ON oauth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_oauth_tokens_updated_at();

