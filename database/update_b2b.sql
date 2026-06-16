-- Add B2B and BYOK columns to retailers table
ALTER TABLE retailers 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'pending' CHECK (subscription_status IN ('pending', 'active', 'expired')),
ADD COLUMN IF NOT EXISTS subscription_tier TEXT CHECK (subscription_tier IN ('monthly', 'lifetime')),
ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS custom_display_name TEXT,
ADD COLUMN IF NOT EXISTS custom_logo_url TEXT,
ADD COLUMN IF NOT EXISTS hf_token TEXT,
ADD COLUMN IF NOT EXISTS r2_account_id TEXT,
ADD COLUMN IF NOT EXISTS r2_access_key TEXT,
ADD COLUMN IF NOT EXISTS r2_secret_key TEXT,
ADD COLUMN IF NOT EXISTS r2_bucket_name TEXT;

-- Index for status checks
CREATE INDEX IF NOT EXISTS idx_retailers_subscription ON retailers(subscription_status);
