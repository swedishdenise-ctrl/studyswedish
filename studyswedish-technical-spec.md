# StudySwedish.com — Technical Specification & Implementation Roadmap

---

## 1. ARCHITECTURE OVERVIEW

### 1.1 High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│                                                                 │
│  Next.js App (Vercel)          PWA Support (offline lessons)    │
│  ├── Public Pages (SSR/SSG)    ├── Service Worker               │
│  │   ├── Home, Blog, Grammar   ├── Cached lesson content        │
│  │   ├── Pricing, About        └── Push notifications           │
│  │   └── SEO landing pages                                      │
│  ├── Auth Pages                                                 │
│  │   ├── Login / Register                                       │
│  │   └── OAuth (Google, Apple)                                  │
│  └── App Pages (Protected)                                      │
│      ├── Dashboard                                              │
│      ├── Lessons / Exercises                                    │
│      ├── AI Tools (Tutor, Grammar, Writing)                     │
│      ├── Vocabulary / Flashcards                                │
│      ├── Community                                              │
│      └── Profile / Settings                                     │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ HTTPS / WebSocket
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│                      SUPABASE LAYER                             │
│                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │    Auth      │  │  PostgreSQL   │  │   Edge Functions       │  │
│  │             │  │              │  │                        │  │
│  │ Email/Pass  │  │ All tables   │  │ /ai-tutor              │  │
│  │ Google OAuth│  │ RLS policies │  │ /ai-grammar-check      │  │
│  │ Apple OAuth │  │ Full-text    │  │ /ai-writing-feedback   │  │
│  │ Magic Links │  │ search       │  │ /ai-sentence-builder   │  │
│  │             │  │ pg_cron jobs │  │ /ai-translation        │  │
│  └─────────────┘  └──────────────┘  │ /ai-story-generator    │  │
│                                     │ /stripe-webhook         │  │
│  ┌─────────────┐  ┌──────────────┐  │ /send-email            │  │
│  │  Storage     │  │  Realtime    │  │ /daily-word            │  │
│  │             │  │              │  │ /spaced-repetition     │  │
│  │ Audio files │  │ Community    │  │ /progress-analytics    │  │
│  │ Video refs  │  │ Live chat    │  └────────────────────────┘  │
│  │ User files  │  │ Presence     │                              │
│  │ Images      │  │              │                              │
│  └─────────────┘  └──────────────┘                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
          ┌────────────┼────────────────────┐
          │            │                    │
          ▼            ▼                    ▼
   ┌────────────┐ ┌─────────┐    ┌──────────────────┐
   │  Anthropic  │ │ Stripe  │    │  External Services│
   │  Claude API │ │         │    │                  │
   │            │ │ Payments│    │ Resend (email)   │
   │ Sonnet 4   │ │ Subs    │    │ PostHog (analytics│
   │            │ │ Webhooks│    │ Cloudflare (CDN) │
   │            │ │         │    │ Mux (video)      │
   └────────────┘ └─────────┘    └──────────────────┘
```

### 1.2 Why This Stack

**Next.js (App Router) on Vercel**
- Server-side rendering for SEO — every grammar lesson, blog post, and vocabulary page needs to be crawlable. This is non-negotiable for the growth strategy.
- Static generation (SSG) for content pages means they load instantly and cost nothing to serve.
- App Router gives us server components, streaming, and parallel routes for the dashboard.
- Vercel's edge network means fast globally — learners in Sweden, US, UK, Asia all get sub-200ms loads.
- Built-in image optimization for all the content images.

**Supabase**
- You already know it, which eliminates ramp-up time.
- Auth handles everything: email/password, Google, Apple, magic links, session management.
- PostgreSQL gives us relational data integrity for the complex relationships between users, lessons, progress, vocabulary, and exercises.
- Row Level Security means we don't need a separate API layer for authorization — the database enforces it.
- Edge Functions for serverless API endpoints (AI features, Stripe webhooks).
- Realtime for community features and live Q&A.
- Storage for audio files and images.
- pg_cron for scheduled jobs (daily word, spaced repetition reminders, streak resets).

**Claude API (Anthropic)**
- Best-in-class language understanding for the AI tutor and grammar features.
- System prompts let us create a consistent "Denise-like" personality.
- Structured output for grammar corrections (JSON with error type, explanation, rule reference).
- Cost-effective for the volume we'll handle (more on costs below).

**Stripe**
- Industry standard for subscriptions.
- Customer portal (users manage their own billing).
- Webhook-driven — Supabase Edge Function handles all subscription lifecycle events.
- Supports trials, coupons, annual vs monthly, lifetime one-time payments.

---

## 2. DETAILED TECH STACK

### 2.1 Frontend

| Concern | Choice | Notes |
|---------|--------|-------|
| Framework | Next.js 15 (App Router) | SSR + SSG + Server Components |
| Language | TypeScript | Type safety across the entire app |
| Styling | Tailwind CSS 4 | Utility-first, custom design tokens |
| Component Library | Custom + shadcn/ui base | Extend shadcn for our design system |
| Animation | Framer Motion | Page transitions, exercise feedback, celebrations |
| State Management | Zustand + React Query (TanStack) | Zustand for UI state, React Query for server state & caching |
| Forms | React Hook Form + Zod | Validation for signup, exercises, writing submissions |
| Rich Text | MDX | Lesson content, blog posts, grammar reference |
| Audio Player | Custom (HTML5 Audio API) | For vocabulary pronunciation, lesson audio |
| Charts | Recharts | Progress dashboard visualizations |
| Icons | Lucide React | Consistent, lightweight icon set |
| Markdown Rendering | next-mdx-remote | For dynamic lesson and blog content |
| Date/Time | date-fns | Lightweight date manipulation |
| Internationalization | next-intl (future) | If we add UI in other languages later |

### 2.2 Backend (Supabase)

| Concern | Choice | Notes |
|---------|--------|-------|
| Database | PostgreSQL 15 (Supabase) | Core data store |
| Auth | Supabase Auth | Email, Google, Apple, magic link |
| API | Supabase auto-generated REST + Edge Functions | Auto REST for CRUD, Edge Functions for custom logic |
| Realtime | Supabase Realtime | Community chat, live Q&A |
| Storage | Supabase Storage | Audio, images, user uploads |
| Full-Text Search | PostgreSQL tsvector + GIN indexes | Grammar reference, vocabulary search |
| Scheduled Jobs | pg_cron (Supabase extension) | Daily word, streak resets, spaced repetition |
| Rate Limiting | Edge Function middleware | AI usage limits per tier |

### 2.3 External Services

| Service | Purpose | Cost Estimate |
|---------|---------|---------------|
| **Vercel** (Pro) | Hosting, CDN, edge | $20/mo |
| **Supabase** (Pro) | Database, auth, storage, functions | $25/mo (scales with usage) |
| **Anthropic Claude API** | All AI features | ~$50-300/mo (depends on user volume) |
| **Stripe** | Payments | 2.9% + $0.30 per transaction |
| **Resend** | Transactional + marketing email | $25/mo (up to 50k emails) |
| **PostHog** (Cloud) | Product analytics, funnels, session replay | Free tier → $0-50/mo |
| **Mux** (or Cloudflare Stream) | Video hosting & streaming | ~$20-100/mo (depends on views) |
| **Cloudflare** | DNS, DDoS protection, caching | Free tier |
| **GitHub** | Code repository, CI/CD | Free |
| **Dan.com** | Domain purchase (studyswedish.com) | One-time (negotiate price) |

**Estimated Monthly Running Cost (Early Stage): ~$150-300/mo**
**At Scale (1000+ premium users): ~$500-1000/mo**

### 2.4 AI Cost Analysis

Claude API pricing (using Sonnet for most features, which balances quality and cost):

| Feature | Avg Tokens/Request | Requests/Day (1000 users) | Daily Cost | Monthly Cost |
|---------|--------------------|---------------------------|------------|--------------|
| AI Tutor (conversation) | ~2000 in + 500 out | 500 | ~$1.50 | ~$45 |
| Grammar Checker | ~800 in + 400 out | 300 | ~$0.60 | ~$18 |
| Writing Coach | ~1500 in + 800 out | 100 | ~$0.50 | ~$15 |
| Sentence Builder | ~500 in + 300 out | 200 | ~$0.30 | ~$9 |
| Translation Helper | ~400 in + 400 out | 200 | ~$0.25 | ~$7.50 |
| Story Generator | ~500 in + 1500 out | 50 | ~$0.30 | ~$9 |
| **Total** | | **~1350/day** | **~$3.45/day** | **~$103/mo** |

This is very manageable. Even at 5x this volume, we're talking ~$500/mo in AI costs against potentially $13k+/mo in subscription revenue.

---

## 3. REFINED DATABASE SCHEMA

### 3.1 Complete Schema with Indexes and Constraints

```sql
-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- fuzzy text search
CREATE EXTENSION IF NOT EXISTS "pg_cron";       -- scheduled jobs

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
  learning_goal TEXT,  -- 'conversational', 'academic', 'travel', 'work', 'moving_to_sweden'
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
  UNIQUE(user_id)  -- one active subscription per user
);

CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- CONTENT STRUCTURE: Units → Lessons → Exercises
-- ============================================
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level cefr_level NOT NULL,
  unit_number INTEGER NOT NULL,  -- 1-12 within each level
  title TEXT NOT NULL,
  title_sv TEXT,                 -- Swedish title
  description TEXT,
  learning_objectives TEXT[],    -- array of objectives
  icon_emoji TEXT,               -- 📚 🗣️ ✍️ etc.
  is_free BOOLEAN DEFAULT FALSE,
  estimated_hours DECIMAL(3,1) DEFAULT 2.0,
  status content_status DEFAULT 'draft',
  order_index INTEGER NOT NULL,  -- global ordering across all levels
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
  slug TEXT NOT NULL UNIQUE,         -- URL slug: "swedish-vowels-pronunciation"
  lesson_type TEXT DEFAULT 'standard', -- 'standard', 'pronunciation', 'culture', 'review'
  content_md TEXT,                   -- full lesson text in MDX
  summary TEXT,                      -- short description for cards
  video_url TEXT,                    -- Mux/Cloudflare Stream URL
  video_duration_seconds INTEGER,
  audio_url TEXT,                    -- lesson audio (Denise narration)
  key_vocabulary UUID[],             -- references to vocabulary items
  grammar_points TEXT[],             -- grammar concepts covered
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
  instruction TEXT NOT NULL,         -- "Fill in the correct form of the verb"
  instruction_sv TEXT,
  question_data JSONB NOT NULL,      -- flexible per exercise type (see below)
  correct_answer JSONB NOT NULL,
  explanation TEXT,                   -- shown after answering
  explanation_sv TEXT,
  hint TEXT,                         -- optional hint
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  xp_reward INTEGER DEFAULT 10,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
CREATE INDEX idx_exercises_type ON exercises(exercise_type);

-- ============================================
-- EXERCISE QUESTION_DATA SCHEMAS (documented)
-- ============================================
-- 
-- multiple_choice:
--   { "question": "What does 'hund' mean?",
--     "options": ["cat", "dog", "bird", "fish"],
--     "audio_url": "..." }
--   correct_answer: { "index": 1 }
--
-- fill_blank:
--   { "sentence": "Jag ___ en bok.", "context": "I read a book.",
--     "blank_position": 1 }
--   correct_answer: { "answer": "läser", "alternatives": ["läste"] }
--
-- matching:
--   { "pairs": [{"left": "hund", "right": "dog"},
--               {"left": "katt", "right": "cat"}] }
--   correct_answer: { "pairs": [[0,0],[1,1]] }
--
-- translation:
--   { "source": "The dog is big.", "direction": "en_to_sv" }
--   correct_answer: { "answer": "Hunden är stor.",
--                     "alternatives": ["Hunden är stor"] }
--
-- conjugation:
--   { "verb": "springa", "tense": "preteritum",
--     "sentence_context": "Igår ___ jag till skolan." }
--   correct_answer: { "answer": "sprang" }
--
-- listening:
--   { "audio_url": "...", "question": "What did Denise say?" }
--   correct_answer: { "transcript": "Jag bor i Stockholm." }

-- ============================================
-- VOCABULARY
-- ============================================
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  swedish TEXT NOT NULL,
  english TEXT NOT NULL,
  word_class word_class NOT NULL,
  gender TEXT,                       -- 'en', 'ett', or null for non-nouns
  plural_form TEXT,                  -- for nouns
  definite_form TEXT,                -- for nouns
  pronunciation_ipa TEXT,            -- IPA notation
  audio_url TEXT,                    -- Denise's pronunciation
  example_sv TEXT,
  example_en TEXT,
  example_audio_url TEXT,
  category TEXT NOT NULL,            -- 'food', 'travel', 'body', 'work', etc.
  cefr_level cefr_level NOT NULL,
  frequency_rank INTEGER,            -- 1 = most common word
  notes TEXT,                        -- usage notes, common mistakes
  related_words UUID[],              -- references to related vocabulary
  image_url TEXT,                    -- optional illustration
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
-- VERB CONJUGATION REFERENCE
-- ============================================
CREATE TABLE verbs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  infinitive TEXT NOT NULL UNIQUE,   -- "springa"
  english TEXT NOT NULL,             -- "to run"
  verb_group INTEGER CHECK (verb_group BETWEEN 1 AND 4), -- null for irregular
  is_irregular BOOLEAN DEFAULT FALSE,
  imperative TEXT,                   -- "spring!"
  present TEXT,                      -- "springer"
  preteritum TEXT,                   -- "sprang"
  supinum TEXT,                      -- "sprungit"
  present_participle TEXT,           -- "springande"
  past_participle TEXT,              -- "sprungen"
  audio_url TEXT,                    -- pronunciation of infinitive
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
  content_md TEXT NOT NULL,          -- full reference article in MDX
  summary TEXT,
  category TEXT NOT NULL,            -- 'nouns', 'verbs', 'syntax', 'adjectives', etc.
  cefr_level cefr_level NOT NULL,
  related_lessons UUID[],           -- lessons that teach this grammar
  related_exercises UUID[],         -- exercises that practice this grammar
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
-- USER PROGRESS & LEARNING DATA
-- ============================================
CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  video_watched BOOLEAN DEFAULT FALSE,
  notes TEXT,                        -- user's personal notes on this lesson
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
  ai_feedback TEXT,                  -- for writing/speaking exercises
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
  quiz_score INTEGER,                -- final unit quiz score (0-100)
  quiz_completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, unit_id)
);

CREATE INDEX idx_unit_progress_user ON user_unit_progress(user_id);

-- ============================================
-- SPACED REPETITION (VOCABULARY)
-- ============================================
CREATE TABLE user_vocabulary_srs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vocabulary_id UUID NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,
  ease_factor DECIMAL(4,2) DEFAULT 2.50,   -- SM-2 algorithm
  interval_days INTEGER DEFAULT 1,
  repetitions INTEGER DEFAULT 0,
  next_review_at TIMESTAMPTZ DEFAULT NOW(),
  last_reviewed_at TIMESTAMPTZ,
  times_correct INTEGER DEFAULT 0,
  times_incorrect INTEGER DEFAULT 0,
  is_known BOOLEAN DEFAULT FALSE,          -- user marked as "known"
  UNIQUE(user_id, vocabulary_id)
);

CREATE INDEX idx_srs_user_next ON user_vocabulary_srs(user_id, next_review_at);

-- ============================================
-- AI CONVERSATIONS
-- ============================================
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature ai_feature NOT NULL,
  scenario TEXT,                     -- 'at_cafe', 'job_interview', 'free_chat'
  level cefr_level,
  messages JSONB NOT NULL DEFAULT '[]',
  -- messages format: [{ "role": "user"|"assistant", "content": "...", "timestamp": "..." }]
  message_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,     -- for cost tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_conv_user ON ai_conversations(user_id);
CREATE INDEX idx_ai_conv_feature ON ai_conversations(feature);
CREATE INDEX idx_ai_conv_date ON ai_conversations(created_at);

-- ============================================
-- AI USAGE TRACKING (for rate limiting)
-- ============================================
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
-- BLOG / CONTENT
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content_md TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT NOT NULL,            -- 'culture', 'grammar_tips', 'travel', 'life_in_sweden', 'learning_tips'
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
  fun_fact TEXT,                     -- interesting note about the word
  usage_tip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_daily_word_date ON daily_words(featured_date);

-- ============================================
-- ACHIEVEMENTS / GAMIFICATION
-- ============================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_sv TEXT,
  description TEXT NOT NULL,
  icon_url TEXT,
  icon_emoji TEXT,
  category TEXT,                     -- 'streak', 'completion', 'vocabulary', 'community', 'special'
  criteria JSONB NOT NULL,
  -- criteria examples:
  -- { "type": "streak", "value": 7 }
  -- { "type": "lessons_completed", "value": 10 }
  -- { "type": "vocabulary_mastered", "value": 100 }
  -- { "type": "level_reached", "value": "B1" }
  xp_reward INTEGER DEFAULT 0,
  is_secret BOOLEAN DEFAULT FALSE,   -- hidden until earned
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
  category TEXT DEFAULT 'general',   -- 'general', 'questions', 'practice', 'tips', 'introductions'
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
-- WAITLIST / LEADS (pre-launch)
-- ============================================
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT,                       -- 'tiktok', 'instagram', 'organic', 'referral'
  referral_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTACT / FEEDBACK
-- ============================================
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email TEXT,
  category TEXT,                     -- 'bug', 'feature_request', 'content_error', 'general'
  subject TEXT,
  message TEXT NOT NULL,
  lesson_id UUID REFERENCES lessons(id),  -- if reporting a lesson issue
  status TEXT DEFAULT 'new',         -- 'new', 'reviewed', 'resolved'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Profiles: users can read/update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profile created on signup" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Subscriptions: users can view their own
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Content tables: readable by all authenticated users (free check in app logic)
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Units readable by all" ON units FOR SELECT USING (TRUE);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons readable by all" ON lessons FOR SELECT USING (TRUE);
-- Note: free vs premium content gating happens in the application layer,
-- not RLS, because we want all lesson metadata visible (titles, descriptions)
-- but protect the actual content_md and exercises for premium lessons.

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

-- User data: users can only access their own
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

-- Community: readable by all, writable by own user
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts readable by all" ON community_posts FOR SELECT USING (TRUE);
CREATE POLICY "Users can create posts" ON community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own posts" ON community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON community_posts FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Replies readable by all" ON community_replies FOR SELECT USING (TRUE);
CREATE POLICY "Users can create replies" ON community_replies FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on user signup
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

-- Update streak on activity
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
    -- Already active today, no change
    RETURN NEW;
  ELSIF last_date = CURRENT_DATE - INTERVAL '1 day' THEN
    -- Consecutive day, increment streak
    UPDATE profiles SET
      streak_count = current_streak + 1,
      longest_streak = GREATEST(longest_streak, current_streak + 1),
      last_activity_date = CURRENT_DATE,
      updated_at = NOW()
    WHERE id = NEW.user_id;
  ELSE
    -- Streak broken, reset to 1
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

-- Auto-update updated_at
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
CREATE TRIGGER set_updated_at_lessons BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_units BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_blog_posts BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SCHEDULED JOBS (pg_cron)
-- ============================================

-- Reset streaks for users who missed a day (run daily at midnight UTC)
-- SELECT cron.schedule('reset-streaks', '0 0 * * *', $$
--   UPDATE profiles
--   SET streak_count = 0
--   WHERE last_activity_date < CURRENT_DATE - INTERVAL '1 day'
--     AND streak_count > 0;
-- $$);
```

---

## 4. EDGE FUNCTIONS (API ENDPOINTS)

### 4.1 AI Tutor Endpoint

```
POST /functions/v1/ai-tutor

Request:
{
  "conversation_id": "uuid" | null,  // null for new conversation
  "message": "Hej, jag vill öva svenska!",
  "scenario": "free_chat",           // or "at_cafe", "job_interview", etc.
  "level": "A2"
}

Response:
{
  "conversation_id": "uuid",
  "reply": "Hej! Vad roligt att du vill öva! Hur mår du idag?",
  "corrections": [
    {
      "original": "...",
      "corrected": "...",
      "explanation": "...",
      "grammar_topic_slug": "..."
    }
  ],
  "vocabulary_highlights": ["öva", "mår"],
  "remaining_daily_messages": 4
}

System Prompt for Claude:
"You are Denise, a friendly and encouraging Swedish language tutor on
StudySwedish.com. The student's current level is {level}. Adjust your
Swedish complexity accordingly:
- A1: Use only the most basic words and short sentences. Mostly English
  with Swedish phrases introduced gradually.
- A2: Simple Swedish sentences. Explain in English when needed.
- B1: Mostly Swedish. Switch to English only for complex grammar explanations.
- B2: Almost entirely Swedish. Only use English if explicitly asked.
- C1: Entirely Swedish unless the student requests English.

Always be warm, patient, and encouraging. Celebrate small wins. When the
student makes a mistake, correct it gently with a brief explanation. Use
the scenario context to keep conversations natural and practical.

If the student writes in English, gently encourage them to try in Swedish,
but don't refuse to help.

Respond in JSON format with fields: reply, corrections (array), vocabulary_highlights (array)."
```

### 4.2 AI Grammar Checker

```
POST /functions/v1/ai-grammar-check

Request:
{
  "text": "Jag har gått till skolan igår.",
  "level": "A2"
}

Response:
{
  "corrected_text": "Jag gick till skolan igår.",
  "errors": [
    {
      "original": "har gått",
      "corrected": "gick",
      "error_type": "tense",
      "explanation": "When you use 'igår' (yesterday), you need the simple past
        tense (preteritum), not the perfect tense. 'Har gått' = have gone (perfect).
        'Gick' = went (simple past).",
      "rule": "Use preteritum with specific past time markers (igår, förra veckan, etc.)",
      "grammar_topic_slug": "past-tense-preteritum",
      "severity": "error"
    }
  ],
  "overall_assessment": {
    "cefr_estimate": "A2",
    "strengths": ["Good word order", "Correct preposition usage"],
    "areas_to_improve": ["Tense selection"]
  },
  "remaining_daily_checks": 2
}
```

### 4.3 AI Writing Coach

```
POST /functions/v1/ai-writing-feedback

Request:
{
  "text": "...",
  "prompt": "Write about your daily routine",
  "level": "B1"
}

Response:
{
  "feedback": {
    "grammar": { "score": 7, "comments": "..." },
    "vocabulary": { "score": 6, "comments": "..." },
    "coherence": { "score": 8, "comments": "..." },
    "style": { "score": 5, "comments": "..." },
    "overall_score": 6.5,
    "cefr_estimate": "A2-B1"
  },
  "corrections": [...],
  "suggestions": ["Try using more connectors like 'sedan', 'dessutom'..."],
  "improved_version": "...",
  "encouragement": "Great effort! Your sentence structure is improving..."
}
```

### 4.4 Stripe Webhook Handler

```
POST /functions/v1/stripe-webhook

Handles events:
- checkout.session.completed → Create/update subscription
- customer.subscription.updated → Update tier/status
- customer.subscription.deleted → Downgrade to free
- invoice.payment_failed → Set status to past_due
- customer.subscription.trial_will_end → Send reminder email
```

### 4.5 Rate Limiting Logic

```typescript
// Pseudocode for rate limiting in Edge Functions
async function checkRateLimit(userId: string, feature: AiFeature): Promise<boolean> {
  const subscription = await getSubscription(userId);

  const limits = {
    free: { tutor: 5, grammar_check: 3, writing_coach: 0, sentence_builder: 5, translation: 5, story_generator: 0 },
    premium: { tutor: -1, grammar_check: -1, writing_coach: -1, sentence_builder: -1, translation: -1, story_generator: -1 },  // -1 = unlimited
    lifetime: { tutor: -1, grammar_check: -1, writing_coach: -1, sentence_builder: -1, translation: -1, story_generator: -1 },
  };

  const dailyLimit = limits[subscription.tier][feature];
  if (dailyLimit === -1) return true;  // unlimited
  if (dailyLimit === 0) return false;  // feature not available

  // Check today's usage
  const { data } = await supabase
    .from('ai_usage_daily')
    .select('request_count')
    .eq('user_id', userId)
    .eq('feature', feature)
    .eq('usage_date', today())
    .single();

  return (data?.request_count ?? 0) < dailyLimit;
}
```

---

## 5. FRONTEND ARCHITECTURE

### 5.1 Route Structure (Next.js App Router)

```
app/
├── (marketing)/                    # Public marketing pages
│   ├── page.tsx                    # Home
│   ├── pricing/page.tsx
│   ├── about/page.tsx
│   └── layout.tsx                  # Marketing layout (nav + footer)
│
├── (content)/                      # Public SEO content
│   ├── grammar/
│   │   ├── page.tsx                # Grammar index
│   │   └── [slug]/page.tsx         # Individual grammar topic (SSG)
│   ├── vocabulary/
│   │   ├── page.tsx                # Vocabulary index
│   │   └── [category]/page.tsx     # Vocabulary by category
│   ├── phrases/
│   │   ├── page.tsx
│   │   └── [category]/page.tsx
│   ├── blog/
│   │   ├── page.tsx                # Blog index
│   │   └── [slug]/page.tsx         # Blog post (SSG)
│   ├── verbs/
│   │   ├── page.tsx                # Verb conjugator
│   │   └── [verb]/page.tsx         # Individual verb page
│   ├── daily-word/page.tsx
│   └── layout.tsx                  # Content layout
│
├── (app)/                          # Protected app pages
│   ├── dashboard/page.tsx          # User dashboard
│   ├── learn/
│   │   ├── page.tsx                # Course overview (level map)
│   │   ├── [unitSlug]/
│   │   │   ├── page.tsx            # Unit overview
│   │   │   └── [lessonSlug]/
│   │   │       ├── page.tsx        # Lesson content
│   │   │       └── exercises/page.tsx  # Lesson exercises
│   ├── practice/
│   │   ├── flashcards/page.tsx     # SRS vocabulary review
│   │   ├── verb-drills/page.tsx    # Verb conjugation practice
│   │   └── listening/page.tsx      # Listening exercises
│   ├── ai/
│   │   ├── tutor/page.tsx          # AI conversation
│   │   ├── grammar-check/page.tsx  # Grammar checker tool
│   │   ├── writing/page.tsx        # Writing coach
│   │   ├── translate/page.tsx      # Translation helper
│   │   └── stories/page.tsx        # Story generator
│   ├── community/
│   │   ├── page.tsx                # Forum index
│   │   └── [postId]/page.tsx       # Forum post
│   ├── profile/page.tsx
│   ├── settings/page.tsx
│   └── layout.tsx                  # App layout (sidebar + top bar)
│
├── auth/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── callback/route.ts          # OAuth callback
│
├── api/                            # API routes (minimal — most logic in Supabase)
│   ├── stripe/
│   │   ├── create-checkout/route.ts
│   │   ├── create-portal/route.ts
│   │   └── webhook/route.ts
│   └── og/route.tsx               # OpenGraph image generation
│
├── layout.tsx                      # Root layout
├── globals.css
└── not-found.tsx
```

### 5.2 Key Component Architecture

```
components/
├── ui/                             # Base components (shadcn-extended)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── progress.tsx
│   ├── toast.tsx
│   └── ...
│
├── layout/
│   ├── marketing-nav.tsx
│   ├── app-sidebar.tsx
│   ├── app-topbar.tsx
│   ├── footer.tsx
│   └── mobile-nav.tsx
│
├── lesson/
│   ├── lesson-content.tsx          # MDX renderer with vocabulary highlights
│   ├── lesson-video.tsx            # Video player with chapters
│   ├── lesson-audio.tsx            # Audio player (Denise narration)
│   ├── lesson-nav.tsx              # Prev/Next lesson navigation
│   └── lesson-sidebar.tsx          # Outline, vocab list, grammar notes
│
├── exercise/
│   ├── exercise-renderer.tsx       # Routes to correct exercise component
│   ├── multiple-choice.tsx
│   ├── fill-blank.tsx
│   ├── matching.tsx
│   ├── drag-drop.tsx
│   ├── translation-input.tsx
│   ├── conjugation-drill.tsx
│   ├── listening-exercise.tsx
│   ├── writing-exercise.tsx        # With AI feedback integration
│   ├── exercise-feedback.tsx       # Correct/incorrect animation + explanation
│   └── exercise-progress-bar.tsx
│
├── ai/
│   ├── chat-interface.tsx          # The tutor chat UI
│   ├── chat-message.tsx            # Individual message bubble
│   ├── chat-input.tsx              # Input with send button
│   ├── grammar-checker.tsx         # Text input + annotated output
│   ├── writing-coach.tsx           # Writing submission + feedback display
│   ├── scenario-picker.tsx         # Choose conversation scenario
│   └── ai-usage-indicator.tsx      # Shows remaining daily uses
│
├── vocabulary/
│   ├── word-card.tsx               # Vocabulary display card with audio
│   ├── flashcard.tsx               # Flip card for SRS review
│   ├── flashcard-deck.tsx          # SRS session manager
│   ├── vocabulary-search.tsx
│   └── word-audio-button.tsx       # Play pronunciation
│
├── progress/
│   ├── level-map.tsx               # Visual path through levels (the hero component)
│   ├── streak-counter.tsx
│   ├── xp-display.tsx
│   ├── achievement-badge.tsx
│   ├── progress-chart.tsx          # Recharts activity over time
│   └── daily-goal-tracker.tsx
│
├── community/
│   ├── post-card.tsx
│   ├── post-form.tsx
│   ├── reply-list.tsx
│   └── upvote-button.tsx
│
├── marketing/
│   ├── hero-section.tsx
│   ├── feature-grid.tsx
│   ├── testimonial-carousel.tsx
│   ├── pricing-table.tsx
│   ├── cta-section.tsx
│   └── email-capture.tsx
│
└── shared/
    ├── swedish-text.tsx            # Highlighted Swedish text with hover translations
    ├── audio-player.tsx
    ├── premium-gate.tsx            # "Upgrade to Premium" overlay
    ├── loading-skeleton.tsx
    ├── seo-head.tsx
    └── share-button.tsx
```

---

## 6. DEVELOPMENT PHASES & SPRINT PLAN

### Phase 1: Foundation (Weeks 1-4)

**Sprint 1 (Week 1-2): Project Setup & Core Infrastructure**
- [ ] Purchase studyswedish.com domain
- [ ] Create GitHub repository, set up monorepo (if needed)
- [ ] Initialize Next.js project with TypeScript, Tailwind, App Router
- [ ] Set up Supabase project (production + staging)
- [ ] Run database migration (full schema from Section 3)
- [ ] Configure Supabase Auth (email/password + Google OAuth)
- [ ] Set up Vercel project, connect to GitHub, configure env vars
- [ ] Design system: implement color tokens, typography, base components
- [ ] Build marketing layout (nav, footer)
- [ ] Build app layout (sidebar, topbar, mobile nav)
- [ ] Set up PostHog analytics

**Sprint 2 (Week 3-4): Auth, Home Page & Content System**
- [ ] Build auth pages (login, register, forgot password, OAuth callback)
- [ ] Implement auth middleware (protected routes)
- [ ] Build home/landing page (hero, features, CTA, email capture)
- [ ] Build pricing page with tier comparison
- [ ] Set up MDX processing pipeline for lesson content
- [ ] Build lesson content renderer (MDX → beautiful UI)
- [ ] Create first 3 lessons of Unit 1 (content in MDX files or DB)
- [ ] Build lesson navigation (sidebar, prev/next)
- [ ] Set up Supabase Storage buckets (audio, images, videos)
- [ ] Waitlist/email capture with Resend integration

### Phase 2: Core Learning Experience (Weeks 5-10)

**Sprint 3 (Week 5-6): Exercises & Progress Tracking**
- [ ] Build exercise renderer (routes to correct component by type)
- [ ] Build multiple choice exercise component
- [ ] Build fill-in-the-blank exercise component
- [ ] Build matching exercise component
- [ ] Build translation input exercise component
- [ ] Exercise feedback component (correct/incorrect + explanation)
- [ ] Exercise progress bar
- [ ] User progress tracking (lesson started, completed, time spent)
- [ ] Unit progress tracking
- [ ] Dashboard page: progress overview, streak, XP, current unit

**Sprint 4 (Week 7-8): Vocabulary & Grammar Reference**
- [ ] Vocabulary database seeding (start with A1 vocabulary, ~300 words)
- [ ] Build vocabulary card component with audio playback
- [ ] Vocabulary search with fuzzy matching
- [ ] Vocabulary by category pages (SSG)
- [ ] Grammar reference pages (SSG from grammar_topics table)
- [ ] Grammar search
- [ ] Verb conjugator page (search, display, drill mode)
- [ ] Verb database seeding (top 200 verbs)
- [ ] Daily Word feature (with pg_cron job to rotate)

**Sprint 5 (Week 9-10): AI Tutor MVP**
- [ ] Build Edge Function: /ai-tutor
- [ ] System prompt engineering for Denise persona across all CEFR levels
- [ ] Chat interface component (messages, input, scenario picker)
- [ ] Rate limiting logic (5 messages/day free, unlimited premium)
- [ ] AI usage tracking table + display component
- [ ] Conversation history (saved to ai_conversations table)
- [ ] Build Edge Function: /ai-grammar-check
- [ ] Grammar checker UI (text input → annotated corrections)
- [ ] Link corrections to grammar reference pages

### Phase 3: Monetization & Premium (Weeks 11-14)

**Sprint 6 (Week 11-12): Stripe Integration & Premium Gating**
- [ ] Stripe account setup (products, prices: monthly, annual, lifetime)
- [ ] Build Edge Function: /stripe-webhook
- [ ] Checkout flow (create-checkout-session API route)
- [ ] Customer portal (manage subscription API route)
- [ ] Subscription status syncing (webhook → subscriptions table)
- [ ] Premium gate component (shown when free user hits premium content)
- [ ] Content gating logic: check subscription tier before serving premium lessons
- [ ] AI rate limiting enforcement (free vs premium)
- [ ] Pricing page: interactive comparison, Stripe Checkout integration
- [ ] Success/cancel pages after checkout
- [ ] Email: welcome to premium, subscription confirmation

**Sprint 7 (Week 13-14): Content Expansion & Polish**
- [ ] Complete all 12 units for A1 level (lessons, exercises, vocabulary)
- [ ] Build Level Map component (visual path through course)
- [ ] Achievements system (define 20+ achievements, badge UI)
- [ ] Achievement trigger logic (check after exercise completion, streaks, etc.)
- [ ] Build About page (Denise's story, mission)
- [ ] Cross-promotion: Kombus Sagas app banner, book promotion
- [ ] Shop page: links to Amazon book, app stores
- [ ] Mobile responsive polish across all pages
- [ ] Performance optimization (Core Web Vitals)
- [ ] SEO: meta tags, OG images, structured data (JSON-LD)

### Phase 4: Soft Launch (Weeks 15-16)

**Sprint 8 (Week 15-16): Launch Prep & Soft Launch**
- [ ] Write 10 SEO blog posts (target high-volume keywords)
- [ ] Build blog index + blog post pages (SSG)
- [ ] Set up email sequences in Resend (welcome, free trial nudge, weekly digest)
- [ ] Error handling, edge cases, loading states throughout
- [ ] 404 page, error boundaries
- [ ] Cookie consent / privacy policy / terms of service pages
- [ ] Lighthouse audit: aim for 90+ across all metrics
- [ ] Security review: RLS policies, API endpoint auth, input sanitization
- [ ] Announce to TikTok/Instagram following: "StudySwedish.com is live!"
- [ ] Founding member offer: 50% off annual plan for first 100 subscribers
- [ ] Collect feedback for 2 weeks, iterate

### Phase 5: Growth & Expansion (Weeks 17-28)

**Sprint 9-10 (Week 17-20): A2 Content + AI Expansion**
- [ ] A2 level content: 12 units, lessons, exercises, vocabulary
- [ ] AI Writing Coach (Edge Function + UI)
- [ ] AI Sentence Builder
- [ ] AI Translation Helper
- [ ] AI Story Generator
- [ ] Spaced Repetition flashcard system (SM-2 algorithm)
- [ ] Flashcard review session UI
- [ ] Push notifications (via email) for SRS review reminders

**Sprint 11-12 (Week 21-24): Community & B1 Content**
- [ ] Community forum (post, reply, upvote)
- [ ] B1 level content
- [ ] Phrasebook section (organized by scenario)
- [ ] Swedish culture section (traditions, Midsommar, Lucia, fika)
- [ ] Podcast integration (if Denise starts a podcast)
- [ ] YouTube embed support in lessons

**Sprint 13-14 (Week 25-28): Scale & Optimize**
- [ ] B2 + C1 content (ongoing)
- [ ] Live group class booking system
- [ ] Affiliate program setup
- [ ] A/B testing (pricing, CTAs, landing page variants)
- [ ] Referral program ("Invite a friend, get 1 month free")
- [ ] PWA support (offline lesson caching, install prompt)
- [ ] Performance monitoring and optimization
- [ ] Analytics review: funnel optimization, churn analysis

---

## 7. CONTENT PRODUCTION PIPELINE

### 7.1 Denise's Content Workflow

For each unit, Denise needs to produce:

| Asset | Format | Time Estimate | Tools |
|-------|--------|---------------|-------|
| Video lesson | MP4, 1080p, 5-15 min | 2-4 hours filming + editing | Camera, mic, editing software |
| Vocabulary audio | MP3, individual words + sentences | 1-2 hours recording | Mic, Audacity |
| Lesson narration audio | MP3, full lesson | 1 hour | Mic, Audacity |
| Written lesson review | Review MDX content for accuracy | 30 min | Browser |
| Cultural notes | Short written piece | 30 min | Any text editor |

**Content can be produced in batches** — record all audio for a full level in one session, film multiple videos in one day, etc.

**AI-assisted content creation**: Use Claude to draft initial lesson text, exercise questions, and vocabulary lists. Denise reviews, corrects, and adds her personality. This dramatically speeds up content production.

### 7.2 Content per Level

| Level | Units | Lessons (~3/unit) | Exercises (~8/lesson) | Vocabulary | Blog Posts |
|-------|-------|--------------------|-----------------------|------------|------------|
| A1 | 12 | 36 | 288 | 400 | 5 |
| A2 | 12 | 36 | 288 | 500 | 5 |
| B1 | 12 | 36 | 288 | 600 | 5 |
| B2 | 10 | 30 | 240 | 500 | 3 |
| C1 | 6 | 18 | 144 | 400 | 2 |
| **Total** | **52** | **156** | **1,248** | **2,400** | **20** |

---

## 8. KEY TECHNICAL DECISIONS & TRADE-OFFS

### 8.1 Content Storage: MDX Files vs Database

**Decision: Hybrid approach**
- Lesson content (long-form MDX) → stored in database (`content_md` column) + cached via ISR
- Blog posts → same approach
- This allows an admin UI for content editing without requiring code deploys
- Alternative: MDX files in the repo (simpler, but requires deploys for content changes)
- Start with database, build a simple admin panel in Phase 5

### 8.2 Video Hosting: Self-hosted vs Mux vs YouTube

**Decision: Start with YouTube (unlisted) → migrate to Mux**
- YouTube unlisted videos embedded on the site: free, reliable, good player
- Downside: no control over recommendations, potential for leaking
- At scale (~500+ premium users), migrate to Mux for full control, analytics, and DRM
- Mux cost: ~$0.005/min of video stored + $0.05/min delivered

### 8.3 Audio Files: Where to Store

**Decision: Supabase Storage**
- All audio files (vocabulary pronunciation, lesson narration) in Supabase Storage
- Organize: `audio/vocabulary/{word_id}.mp3`, `audio/lessons/{lesson_id}.mp3`
- Supabase Storage includes CDN, so delivery is fast
- Cost included in Supabase Pro plan (up to reasonable limits)

### 8.4 Search: PostgreSQL vs External Search

**Decision: PostgreSQL full-text search (to start)**
- tsvector + GIN indexes for grammar reference and vocabulary search
- pg_trgm for fuzzy matching (typo tolerance)
- This is sufficient for our data volume (thousands of items, not millions)
- If search quality becomes an issue, add Meilisearch later

### 8.5 Real-time Features: What Actually Needs WebSockets

**Only these need Supabase Realtime:**
- Community forum (new posts/replies appear live)
- Live Q&A sessions with Denise
- Achievement notifications (earned in another tab)

**Everything else uses standard HTTP** — exercises, AI chat, progress updates.

---

## 9. ENVIRONMENT & DEPLOYMENT

### 9.1 Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # Server-side only

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_MONTHLY=
STRIPE_PRICE_ANNUAL=
STRIPE_PRICE_LIFETIME=

# Anthropic
ANTHROPIC_API_KEY=

# Resend
RESEND_API_KEY=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Mux (when added)
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=

# General
NEXT_PUBLIC_SITE_URL=https://studyswedish.com
NEXT_PUBLIC_APP_ENV=production
```

### 9.2 CI/CD Pipeline (GitHub Actions → Vercel)

```
main branch     → Production (studyswedish.com)
staging branch  → Staging (staging.studyswedish.com)
PR branches     → Preview deployments (auto)
```

- Vercel handles deployments automatically on push
- GitHub Actions for: type checking, linting, tests before merge
- Supabase migrations applied manually or via supabase CLI in CI

### 9.3 Monitoring

| Concern | Tool |
|---------|------|
| Uptime | Vercel built-in + BetterStack (free tier) |
| Errors | Vercel logs + PostHog error tracking |
| Performance | Vercel Speed Insights + Lighthouse CI |
| Analytics | PostHog (funnels, retention, feature usage) |
| AI costs | Custom dashboard from ai_usage_daily table |
| Revenue | Stripe Dashboard |

---

## 10. LAUNCH CHECKLIST

### Pre-Launch (2 weeks before)
- [ ] All A1 content complete and reviewed by Denise
- [ ] AI Tutor tested across all A1 scenarios
- [ ] Stripe checkout tested (monthly, annual, lifetime)
- [ ] Email sequences tested (welcome, premium welcome, password reset)
- [ ] Mobile responsive on iPhone, Android, iPad, desktop
- [ ] Page speed: Lighthouse 90+ on all Core Web Vitals
- [ ] SEO: sitemap.xml, robots.txt, structured data, OG images
- [ ] Legal: Privacy policy, Terms of Service, Cookie consent
- [ ] Error pages: 404, 500, auth error
- [ ] Analytics: PostHog events tracking key actions
- [ ] Security: no exposed API keys, RLS policies tested, rate limits working

### Launch Day
- [ ] DNS pointed to Vercel
- [ ] SSL certificate active
- [ ] Announce on TikTok, Instagram (Denise posts video)
- [ ] Email waitlist with launch link
- [ ] Post on Reddit (r/svenska, r/languagelearning)
- [ ] Founding member pricing live (limited time)
- [ ] Monitor error logs, server performance, Stripe webhooks
- [ ] Respond to first user feedback immediately

### Post-Launch (first 2 weeks)
- [ ] Daily monitoring: signups, conversion, errors, AI usage
- [ ] Collect and prioritize user feedback
- [ ] Fix critical bugs within 24 hours
- [ ] Write 2-3 additional blog posts based on user questions
- [ ] Start A2 content production
- [ ] First weekly digest email to subscribers
