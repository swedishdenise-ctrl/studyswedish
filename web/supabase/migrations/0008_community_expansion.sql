-- ============================================================
-- Community Hub expansion
-- Upgrades the flat community_posts schema into a structured
-- channel-based community with locations, media, and ratings.
-- ============================================================

-- ============================================
-- CHANNELS
-- ============================================
CREATE TABLE community_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,                            -- emoji or icon name
  accent_color TEXT DEFAULT '#005B99',  -- hex color for UI theming
  sort_order INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SWEDISH LOCATIONS (reference table)
-- ============================================
CREATE TABLE swedish_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  region TEXT,                          -- e.g. 'Västra Götaland', 'Skåne'
  type TEXT DEFAULT 'city',             -- 'city', 'region', 'island', 'area'
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- EXPAND community_posts
-- ============================================

-- Add channel reference (required for new posts, nullable for migration)
ALTER TABLE community_posts
  ADD COLUMN channel_id UUID REFERENCES community_channels(id) ON DELETE SET NULL;

-- Add location tag (optional)
ALTER TABLE community_posts
  ADD COLUMN location_id UUID REFERENCES swedish_locations(id) ON DELETE SET NULL;

-- Slug for SEO-friendly URLs
ALTER TABLE community_posts
  ADD COLUMN slug TEXT;

-- Post type determines card layout
ALTER TABLE community_posts
  ADD COLUMN post_type TEXT DEFAULT 'discussion';
  -- 'discussion', 'review', 'event', 'listing'

-- Review fields (for restaurants, hotels, places)
ALTER TABLE community_posts
  ADD COLUMN rating SMALLINT CHECK (rating >= 1 AND rating <= 5);

ALTER TABLE community_posts
  ADD COLUMN price_range SMALLINT CHECK (price_range >= 1 AND price_range <= 4);
  -- 1=$, 2=$$, 3=$$$, 4=$$$$

-- Address / map link for place-based posts
ALTER TABLE community_posts
  ADD COLUMN address TEXT;

ALTER TABLE community_posts
  ADD COLUMN map_url TEXT;

-- Images (stored as array of URLs — Supabase Storage)
ALTER TABLE community_posts
  ADD COLUMN images TEXT[] DEFAULT '{}';

-- Event fields
ALTER TABLE community_posts
  ADD COLUMN event_date TIMESTAMPTZ;

ALTER TABLE community_posts
  ADD COLUMN event_location TEXT;

-- Tags for flexible categorization within a channel
ALTER TABLE community_posts
  ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Heart count replaces generic upvote_count for warmer feel
ALTER TABLE community_posts
  RENAME COLUMN upvote_count TO heart_count;

-- View count for trending algorithm
ALTER TABLE community_posts
  ADD COLUMN view_count INTEGER DEFAULT 0;

-- Best answer (for Q&A style posts)
ALTER TABLE community_posts
  ADD COLUMN best_reply_id UUID;
  -- FK added after community_replies is updated

-- Soft delete instead of hard delete (moderator tool)
ALTER TABLE community_posts
  ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

-- Drop the old flat 'category' column — channels replace it
ALTER TABLE community_posts
  DROP COLUMN IF EXISTS category;

-- ============================================
-- EXPAND community_replies
-- ============================================

ALTER TABLE community_replies
  RENAME COLUMN upvote_count TO heart_count;

ALTER TABLE community_replies
  ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

ALTER TABLE community_replies
  ADD COLUMN images TEXT[] DEFAULT '{}';

-- Now add the FK for best_reply_id
ALTER TABLE community_posts
  ADD CONSTRAINT fk_best_reply
  FOREIGN KEY (best_reply_id)
  REFERENCES community_replies(id)
  ON DELETE SET NULL;

-- ============================================
-- RENAME community_upvotes → community_hearts
-- ============================================
ALTER TABLE community_upvotes RENAME TO community_hearts;

-- ============================================
-- COMMUNITY BOOKMARKS (save posts for later)
-- ============================================
CREATE TABLE community_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Channel-based feed queries
CREATE INDEX idx_community_posts_channel ON community_posts(channel_id, created_at DESC);

-- Location-filtered queries
CREATE INDEX idx_community_posts_location ON community_posts(location_id);

-- Trending / popular queries
CREATE INDEX idx_community_posts_hearts ON community_posts(heart_count DESC);

-- Slug lookups
CREATE INDEX idx_community_posts_slug ON community_posts(slug);

-- Full-text search on posts
CREATE INDEX idx_community_posts_search ON community_posts
  USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || content));

-- Channel slug lookups
CREATE INDEX idx_community_channels_slug ON community_channels(slug);

-- Bookmarks per user
CREATE INDEX idx_community_bookmarks_user ON community_bookmarks(user_id);

-- ============================================
-- RLS for new tables
-- ============================================

-- Channels: readable by all, only admins modify (via service role)
ALTER TABLE community_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Channels readable by all"
  ON community_channels FOR SELECT USING (TRUE);

-- Locations: readable by all
ALTER TABLE swedish_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Locations readable by all"
  ON swedish_locations FOR SELECT USING (TRUE);

-- Bookmarks: users manage their own
ALTER TABLE community_bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own bookmarks"
  ON community_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookmarks"
  ON community_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks"
  ON community_bookmarks FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- UPDATE channel post_count via trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_channel_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_channels
      SET post_count = post_count + 1
      WHERE id = NEW.channel_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_channels
      SET post_count = post_count - 1
      WHERE id = OLD.channel_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_channel_post_count
  AFTER INSERT OR DELETE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_channel_post_count();

-- ============================================
-- UPDATE post reply_count via trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_post_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts
      SET reply_count = reply_count + 1
      WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts
      SET reply_count = reply_count - 1
      WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_post_reply_count
  AFTER INSERT OR DELETE ON community_replies
  FOR EACH ROW EXECUTE FUNCTION update_post_reply_count();
