-- ============================================================
-- Allow guest community participation (no account needed)
-- Run this in the Supabase SQL editor:
--   Dashboard → SQL Editor → paste and run
-- ============================================================

-- Make user_id optional on posts
ALTER TABLE community_posts
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE community_posts
  ADD COLUMN IF NOT EXISTS guest_name TEXT;

-- Make user_id optional on replies
ALTER TABLE community_replies
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE community_replies
  ADD COLUMN IF NOT EXISTS guest_name TEXT;

-- Update RLS: allow anonymous inserts (service-role key bypasses anyway,
-- but this keeps the policy correct for the anon key too)
DROP POLICY IF EXISTS "Users can create posts" ON community_posts;
CREATE POLICY "Anyone can create posts" ON community_posts
  FOR INSERT WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (user_id IS NULL AND guest_name IS NOT NULL AND char_length(trim(guest_name)) >= 1)
  );

DROP POLICY IF EXISTS "Users can create replies" ON community_replies;
CREATE POLICY "Anyone can create replies" ON community_replies
  FOR INSERT WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (user_id IS NULL AND guest_name IS NOT NULL AND char_length(trim(guest_name)) >= 1)
  );
