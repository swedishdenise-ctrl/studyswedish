-- ============================================================
-- StudySwedish — initial schema
-- Source of truth: studyswedish-technical-spec.md §3
-- ============================================================

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE cefr_level AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'lifetime');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due', 'trialing', 'expired');
CREATE TYPE exercise_type AS ENUM (
  'multiple_choice', 'fill_blank', 'matching', 'drag_drop',
  'writing', 'speaking', 'translation', 'conjugation', 'listening'
);
CREATE TYPE word_class AS ENUM (
  'noun', 'verb', 'adjective', 'adverb', 'pronoun',
  'preposition', 'conjunction', 'interjection', 'numeral', 'particle'
);
CREATE TYPE ai_feature AS ENUM (
  'tutor', 'grammar_check', 'writing_coach',
  'sentence_builder', 'translation', 'story_generator'
);
CREATE TYPE content_status AS ENUM ('draft', 'review', 'published', 'archived');

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  current_level cefr_level DEFAULT 'A1',
  native_language TEXT DEFAULT 'en',
  learning_goal TEXT,
  daily_goal_minutes INTEGER DEFAULT 15,
  streak_count INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_xp INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  total_exercises_completed INTEGER DEFAULT 0,
  timezone TEXT DEFAULT 'UTC',
  email_notifications BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  trial_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- CONTENT: Units → Lessons → Exercises
-- ============================================
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level cefr_level NOT NULL,
  unit_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_sv TEXT,
  description TEXT,
  learning_objectives TEXT[],
  icon_emoji TEXT,
  is_free BOOLEAN DEFAULT FALSE,
  estimated_hours DECIMAL(3,1) DEFAULT 2.0,
  status content_status DEFAULT 'draft',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(level, unit_number)
);

CREATE INDEX idx_units_level ON units(level);
CREATE INDEX idx_units_order ON units(order_index);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_sv TEXT,
  slug TEXT NOT NULL UNIQUE,
  lesson_type TEXT DEFAULT 'standard',
  content_md TEXT,
  summary TEXT,
  video_url TEXT,
  video_duration_seconds INTEGER,
  audio_url TEXT,
  key_vocabulary UUID[],
  grammar_points TEXT[],
  is_free BOOLEAN DEFAULT FALSE,
  estimated_minutes INTEGER DEFAULT 20,
  order_index INTEGER NOT NULL,
  status content_status DEFAULT 'draft',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_unit ON lessons(unit_id);
CREATE INDEX idx_lessons_slug ON lessons(slug);
CREATE INDEX idx_lessons_free ON lessons(is_free) WHERE is_free = TRUE;

CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  exercise_type exercise_type NOT NULL,
  instruction TEXT NOT NULL,
  instruction_sv TEXT,
  question_data JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  explanation_sv TEXT,
  hint TEXT,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  xp_reward INTEGER DEFAULT 10,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
CREATE INDEX idx_exercises_type ON exercises(exercise_type);

-- ============================================
-- VOCABULARY
-- ============================================
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  swedish TEXT NOT NULL,
  english TEXT NOT NULL,
  word_class word_class NOT NULL,
  gender TEXT,
  plural_form TEXT,
  definite_form TEXT,
  pronunciation_ipa TEXT,
  audio_url TEXT,
  example_sv TEXT,
  example_en TEXT,
  example_audio_url TEXT,
  category TEXT NOT NULL,
  cefr_level cefr_level NOT NULL,
  frequency_rank INTEGER,
  notes TEXT,
  related_words UUID[],
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vocab_level ON vocabulary(cefr_level);
CREATE INDEX idx_vocab_category ON vocabulary(category);
CREATE INDEX idx_vocab_frequency ON vocabulary(frequency_rank);
CREATE INDEX idx_vocab_search ON vocabulary USING GIN (
  to_tsvector('simple', swedish || ' ' || english)
);
CREATE INDEX idx_vocab_trigram ON vocabulary USING GIN (swedish gin_trgm_ops);

-- ============================================
-- VERBS
-- ============================================
CREATE TABLE verbs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  infinitive TEXT NOT NULL UNIQUE,
  english TEXT NOT NULL,
  verb_group INTEGER CHECK (verb_group BETWEEN 1 AND 4),
  is_irregular BOOLEAN DEFAULT FALSE,
  imperative TEXT,
  present TEXT,
  preteritum TEXT,
  supinum TEXT,
  present_participle TEXT,
  past_participle TEXT,
  audio_url TEXT,
  example_sv TEXT,
  example_en TEXT,
  frequency_rank INTEGER,
  cefr_level cefr_level,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_verbs_search ON verbs USING GIN (
  to_tsvector('simple', infinitive || ' ' || english)
);
CREATE INDEX idx_verbs_group ON verbs(verb_group);

-- ============================================
-- GRAMMAR REFERENCE
-- ============================================
CREATE TABLE grammar_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_sv TEXT,
  slug TEXT NOT NULL UNIQUE,
  content_md TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL,
  cefr_level cefr_level NOT NULL,
  related_lessons UUID[],
  related_exercises UUID[],
  order_index INTEGER,
  seo_title TEXT,
  seo_description TEXT,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_grammar_slug ON grammar_topics(slug);
CREATE INDEX idx_grammar_category ON grammar_topics(category);
CREATE INDEX idx_grammar_level ON grammar_topics(cefr_level);
CREATE INDEX idx_grammar_search ON grammar_topics USING GIN (
  to_tsvector('english', title || ' ' || COALESCE(content_md, ''))
);

-- ============================================
-- USER PROGRESS
-- ============================================
CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  video_watched BOOLEAN DEFAULT FALSE,
  notes TEXT,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user ON user_lesson_progress(user_id);

CREATE TABLE user_exercise_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  answer_data JSONB NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  xp_earned INTEGER DEFAULT 0,
  ai_feedback TEXT,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exercise_attempts_user ON user_exercise_attempts(user_id);
CREATE INDEX idx_exercise_attempts_exercise ON user_exercise_attempts(exercise_id);
CREATE INDEX idx_exercise_attempts_date ON user_exercise_attempts(attempted_at);

CREATE TABLE user_unit_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  lessons_completed INTEGER DEFAULT 0,
  total_lessons INTEGER NOT NULL,
  quiz_score INTEGER,
  quiz_completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, unit_id)
);

CREATE INDEX idx_unit_progress_user ON user_unit_progress(user_id);

-- ============================================
-- SPACED REPETITION
-- ============================================
CREATE TABLE user_vocabulary_srs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,
  ease_factor DECIMAL(4,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  last_reviewed_at TIMESTAMPTZ,
  times_correct INTEGER DEFAULT 0,
  times_incorrect INTEGER DEFAULT 0,
  is_known BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, vocabulary_id)
);

CREATE INDEX idx_srs_user_next ON user_vocabulary_srs(user_id, next_review_at);

-- ============================================
-- AI CONVERSATIONS & USAGE
-- ============================================
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature ai_feature NOT NULL,
  scenario TEXT,
  level cefr_level,
  messages JSONB NOT NULL DEFAULT '[]',
  message_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_conv_user ON ai_conversations(user_id);
CREATE INDEX idx_ai_conv_feature ON ai_conversations(feature);
CREATE INDEX idx_ai_conv_date ON ai_conversations(created_at);

CREATE TABLE ai_usage_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature ai_feature NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  request_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  UNIQUE(user_id, feature, usage_date)
);

CREATE INDEX idx_ai_usage_user_date ON ai_usage_daily(user_id, usage_date);

-- ============================================
-- BLOG
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content_md TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'Denise',
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  reading_time_minutes INTEGER,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published_at) WHERE status = 'published';
CREATE INDEX idx_blog_category ON blog_posts(category);

-- ============================================
-- DAILY WORD
-- ============================================
CREATE TABLE daily_words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vocabulary_id UUID NOT NULL REFERENCES vocabulary(id),
  featured_date DATE NOT NULL UNIQUE,
  fun_fact TEXT,
  usage_tip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_daily_word_date ON daily_words(featured_date);

-- ============================================
-- ACHIEVEMENTS
-- ============================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_sv TEXT,
  description TEXT NOT NULL,
  icon_url TEXT,
  icon_emoji TEXT,
  category TEXT,
  criteria JSONB NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  is_secret BOOLEAN DEFAULT FALSE,
  order_index INTEGER
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);

-- ============================================
-- COMMUNITY
-- ============================================
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_pinned BOOLEAN DEFAULT FALSE,
  upvote_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvote_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_upvotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES community_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (post_id IS NOT NULL AND reply_id IS NULL) OR
    (post_id IS NULL AND reply_id IS NOT NULL)
  ),
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, reply_id)
);

-- ============================================
-- WAITLIST & FEEDBACK
-- ============================================
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT,
  referral_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT,
  category TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  lesson_id UUID REFERENCES lessons(id),
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profile created on signup" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Units readable by all" ON units FOR SELECT USING (TRUE);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons readable by all" ON lessons FOR SELECT USING (TRUE);
-- Note: free vs premium content_md/exercise gating happens in the application layer.

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercises readable by all" ON exercises FOR SELECT USING (TRUE);

ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vocab readable by all" ON vocabulary FOR SELECT USING (TRUE);

ALTER TABLE verbs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Verbs readable by all" ON verbs FOR SELECT USING (TRUE);

ALTER TABLE grammar_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Grammar readable by all" ON grammar_topics FOR SELECT USING (TRUE);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blogs readable" ON blog_posts FOR SELECT USING (status = 'published');

ALTER TABLE daily_words ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily words readable" ON daily_words FOR SELECT USING (TRUE);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements readable" ON achievements FOR SELECT USING (TRUE);

ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own progress only" ON user_lesson_progress FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_exercise_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own attempts only" ON user_exercise_attempts FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_unit_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own unit progress only" ON user_unit_progress FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_vocabulary_srs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own SRS only" ON user_vocabulary_srs FOR ALL USING (auth.uid() = user_id);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own conversations only" ON ai_conversations FOR ALL USING (auth.uid() = user_id);

ALTER TABLE ai_usage_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own usage only" ON ai_usage_daily FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own achievements only" ON user_achievements FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts readable by all" ON community_posts FOR SELECT USING (TRUE);
CREATE POLICY "Users can create posts" ON community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own posts" ON community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON community_posts FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Replies readable by all" ON community_replies FOR SELECT USING (TRUE);
CREATE POLICY "Users can create replies" ON community_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own replies" ON community_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own replies" ON community_replies FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE community_upvotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Upvotes readable" ON community_upvotes FOR SELECT USING (TRUE);
CREATE POLICY "Own upvotes manageable" ON community_upvotes FOR ALL USING (auth.uid() = user_id);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Waitlist insert allowed" ON waitlist FOR INSERT WITH CHECK (TRUE);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Feedback insert allowed" ON feedback FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile + free subscription on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  INSERT INTO subscriptions (user_id, tier, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Streak updater
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  current_streak INTEGER;
BEGIN
  SELECT last_activity_date, streak_count
  INTO last_date, current_streak
  FROM profiles WHERE id = NEW.user_id;

  IF last_date = CURRENT_DATE THEN
    RETURN NEW;
  ELSIF last_date = CURRENT_DATE - INTERVAL '1 day' THEN
    UPDATE profiles SET
      streak_count = current_streak + 1,
      longest_streak = GREATEST(longest_streak, current_streak + 1),
      last_activity_date = CURRENT_DATE,
      updated_at = NOW()
    WHERE id = NEW.user_id;
  ELSE
    UPDATE profiles SET
      streak_count = 1,
      last_activity_date = CURRENT_DATE,
      updated_at = NOW()
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_exercise_attempt
  AFTER INSERT ON user_exercise_attempts
  FOR EACH ROW EXECUTE FUNCTION update_streak();

CREATE TRIGGER on_lesson_progress
  AFTER INSERT OR UPDATE ON user_lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_streak();

-- Auto-update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_subscriptions BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_units BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_lessons BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_grammar_topics BEFORE UPDATE ON grammar_topics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_blog_posts BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_ai_conversations BEFORE UPDATE ON ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_community_posts BEFORE UPDATE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
