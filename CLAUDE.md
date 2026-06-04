# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working With This User

The owner (Denise) is a non-coder. She owns `studyswedish.com` and is the subject-matter expert for Swedish content and brand, but she needs you to handle all technical work end-to-end:

- **Drive the implementation.** Don't ask her to run commands, debug errors, or make framework-level decisions she can't evaluate. Explain what you're about to do in plain language, do it, and report what happened.
- **Translate, don't assume.** When something fails, diagnose and fix it yourself rather than pasting a stack trace back at her. When you need a decision, frame it as a product question ("should the free tier include X?"), not a technical one ("Zustand or Jotai?").
- **Confirm before anything with blast radius.** Buying services, pushing to production, running Stripe in live mode, applying destructive DB migrations — always check first, in plain English, because she can't easily undo it.
- **Placeholders are fine.** If brand assets (logo, Denise's photo, exact copy) aren't ready, use obvious placeholders and flag them — don't block on assets.

## Planning Documents

- [studyswedish-master-plan.md](studyswedish-master-plan.md) — product vision, course structure (52 units across CEFR A1-C1), monetization, design direction, growth strategy. **Source of truth** for content scope, tone, and business rules (free-tier limits, pricing tiers, etc.).
- [studyswedish-technical-spec.md](studyswedish-technical-spec.md) — architecture, full Supabase schema with RLS, Edge Function contracts, Next.js route map, component tree, sprint-by-sprint roadmap. **Source of truth** for stack choices, schema shape, endpoint contracts, and route layout.

If the two conflict, ask Denise — don't pick silently.

## Commands

All commands run from the `web/` directory:

```bash
cd web
npm run dev      # Start Next.js dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

No test framework is installed yet.

Supabase migrations live in `web/supabase/migrations/` and are applied via one-off scripts in `web/scripts/` (e.g. `node scripts/apply-unit2.mjs`). These scripts use the service role key from `.env.local` to run SQL against the hosted Supabase instance.

## Project Structure

```
studyswedish/
  CLAUDE.md
  studyswedish-master-plan.md
  studyswedish-technical-spec.md
  web/                          # Next.js 16 app (the only deployable)
    app/
      layout.tsx                # Root layout (fonts: Playfair Display + Inter)
      globals.css               # Tailwind v4 theme (custom colors below)
      auth/                     # Login, register, email confirm, OAuth callback
      (marketing)/              # Public pages: home, pricing, about, course overview
      (content)/                # SEO/SSG pages: grammar, vocabulary, verbs, phrases, daily-word, blog, recipes, community
      (app)/                    # Auth-gated: dashboard, learn (units/lessons/exercises)
    components/                 # Shared components (site-header, site-footer, signup-nudge)
    data/                       # Static TypeScript data for content pages (vocabulary, verbs, phrases, grammar, daily-words)
    lib/
      supabase/                 # client.ts (browser), server.ts (RSC), middleware.ts (session refresh)
      auth/actions.ts           # Server actions: register, login, logout
      learn/actions.ts          # Server actions: submitAttempt, completeLesson
      learn/is-lesson-free.ts   # Free-tier gating logic
      learn/unit-slug.ts        # Slug generation utility
    supabase/
      config.toml
      migrations/               # 0001-0007: schema, triggers, seed data for Units 1-2
    scripts/                    # One-off migration runner scripts
```

## Stack

- **Frontend**: Next.js 16 App Router + TypeScript + Tailwind CSS 4 (no shadcn/ui yet). Forms use Zod for validation and `useActionState` for server actions. Content rendered with `react-markdown` + `remark-gfm`.
- **Backend**: Supabase (hosted Postgres, Auth, RLS). No separate API server — RLS enforces authorization at the DB layer.
- **Auth**: Supabase Auth via `@supabase/ssr`. Middleware refreshes sessions on every request. `(app)` layout redirects unauthenticated users to `/auth/login`.
- **AI** (not yet implemented): Anthropic Claude API via Supabase Edge Functions. Rate limiting per-tier enforced via `ai_usage_daily` table.
- **Payments** (not yet implemented): Stripe webhook -> Edge Function -> `subscriptions` table.

## Design Tokens

Defined in `web/app/globals.css` via Tailwind v4 `@theme`:

| Token | Class | Hex |
|-------|-------|-----|
| Swedish blue | `text-swedish-blue` / `bg-swedish-blue` | #005B99 |
| Golden (accent) | `text-golden` / `bg-golden` | #FFCB05 |
| Cream (background) | `bg-cream` | #FAF7F2 |
| Charcoal (text) | `text-charcoal` | #1A1A2E |
| Forest (success) | `text-forest` | #2D6A4F |
| Coral (error/CTA) | `text-coral` | #E07A5F |

Headings use `font-display` (Playfair Display). Body uses `font-sans` (Inter).

## Architectural Rules

Don't re-litigate these without asking:

- **Content gating happens in the application layer, not RLS.** Lesson metadata is public for SEO; content and exercises for premium lessons are withheld in app code. Free-tier logic is in `lib/learn/is-lesson-free.ts`: a lesson is free if `is_free`, unit is A1, unit is free, or lesson `order_index <= 2`.
- **Lesson content lives in the database** (`lessons.content_md`), not in MDX files. Static content pages (vocabulary, grammar, verbs, phrases) use TypeScript data files in `web/data/`.
- **Realtime is only for community forum, live Q&A, and cross-tab achievement notifications.** Exercises, AI chat, and progress updates use plain HTTP / server actions.
- **Free-tier AI limits**: 5 tutor messages/day, 3 grammar checks/day, writing coach and story generator are premium-only. Enforce via `ai_usage_daily`, never client-side.
- **Profile + free subscription rows are auto-created by the `handle_new_user()` trigger on `auth.users` insert** — don't duplicate this in application code.
- **Swedish-language content fields are suffixed `_sv`** (e.g. `title_sv`, `instruction_sv`) across `units`, `lessons`, `exercises`, `vocabulary`, `grammar_topics`, `achievements`.
- **Pre-launch: no public signup CTAs on marketing pages.** Only "Sign in" links. Don't re-add register CTAs without asking Denise.

## Route Layout Convention

Three route groups, each with its own layout:

- `(marketing)` — public, unauthenticated. Uses `SiteHeader` + `SiteFooter`. Pages: home, pricing, about, course overview.
- `(content)` — public, SEO-critical. Uses `SiteHeader` + `SiteFooter`. Pages: grammar, vocabulary, verbs, phrases, daily-word, blog, recipes, community.
- `(app)` — **auth-gated** (redirects to `/auth/login`). Has sidebar nav + user header. Pages: dashboard, learn, practice, AI tutor, community, profile.

## Supabase Auth Pattern

Three files, each for a different context:
- `lib/supabase/client.ts` — browser client (`createBrowserClient`)
- `lib/supabase/server.ts` — server components / server actions (`createServerClient` with cookies)
- `lib/supabase/middleware.ts` — session refresh in Next.js middleware

Server actions use `supabase.auth.getUser()` to verify the session, never `getSession()`.

## Edge Function Contracts

Request/response shapes for `/ai-tutor`, `/ai-grammar-check`, `/ai-writing-feedback`, and `/stripe-webhook` are defined in [studyswedish-technical-spec.md:866-994](studyswedish-technical-spec.md#L866-L994). Match these contracts exactly when implementing.

## Environment Variables

See `web/.env.local.example`. Required:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — used only by migration scripts
- `NEXT_PUBLIC_SITE_URL` — defaults to `http://localhost:3000`

## Image Handling

- When Denise asks to change/update an image, ALWAYS confirm whether she means the image file itself or related text/content before making changes.
- Check the project's `/public` or `/assets` folder first; if images are missing, ask where she placed them (common: Downloads folder).
- When sourcing images via WebFetch, verify the image actually matches the requested subject (location, object) before downloading — don't assume search results are correct. Show the URL and describe what's in it before downloading so Denise can confirm.

## Design Quality

- Avoid generic "AI-looking" layouts: no centered hero + 3-column feature grid + generic gradient combos. Aim for editorial, magazine-style layouts with asymmetry, real photography, and varied typography.
- This is a Swedish learning site — incorporate Scandinavian design sensibilities (whitespace, muted palettes, thoughtful typography) rather than generic SaaS styling.
- Before implementing any redesign, propose 2–3 distinct layout directions with real-world references and let Denise pick one before writing code.

## Swedish Content

- All seed data and content files must be UTF-8 encoded to preserve Swedish characters (å, ä, ö).
- When adding Tailwind classes for typography, verify the class exists in the current Tailwind/plugin version before using (e.g. `prose` requires `@tailwindcss/typography`, which is not installed).

## Database Deployment

- Supabase CLI is NOT linked in this project. Do not attempt `supabase db push` or any `supabase` CLI migration commands.
- To deploy schema/data changes, use a Node.js script that calls the Supabase REST API directly (see `web/scripts/` for examples).
