"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ── Types & data ── */

type Post = {
  slug: string;
  title: string;
  lede: string;
  location: string;
  category: string;
};

const POSTS: Post[] = [
  {
    slug: "what-is-fika",
    title: "What fika really is (and isn't)",
    lede:
      "People ask me constantly: what actually is fika? And every time, I pause. Because it's not the coffee. It's not the cinnamon bun. It's the deliberate stop — the choice to sit down, be present, and say that the people around you matter more than whatever is on your to-do list.",
    location: "Sweden",
    category: "Culture",
  },
  {
    slug: "best-cafes-stockholm",
    title: "10 cafés worth your fika in Stockholm",
    lede:
      "I have a rule: never trust a fika spot that's on TripAdvisor. These ten are the ones I've circled back to, sometimes three times in a week. One of them I only found because I got completely lost in Södermalm.",
    location: "Stockholm",
    category: "Places",
  },
  {
    slug: "weekend-gothenburg",
    title: "A perfect weekend in Gothenburg",
    lede:
      "I almost moved to Gothenburg once. I might still. The west coast does something to you — the salt air, the seafood, the way the light falls across the archipelago at six in the evening.",
    location: "Gothenburg",
    category: "Travel",
  },
  {
    slug: "en-ett-survival-guide",
    title: "The en/ett survival guide",
    lede:
      "Swedish will humble you fast. This is the thing that trips everyone up first — and the three patterns that quietly make it click.",
    location: "Language",
    category: "Language",
  },
  {
    slug: "first-50-words",
    title: "The 50 Swedish words I'd hand you first",
    lede:
      "If I could give you one thing before your first trip to Sweden, it would be this list. Not the textbook ones — the ones that actually come up.",
    location: "Language",
    category: "Language",
  },
  {
    slug: "why-lagom",
    title: "Why lagom is impossible to translate",
    lede:
      "'Just right' is the closest English gets, and it still misses the whole point. A short essay on the word that explains almost everything about how Sweden works.",
    location: "Culture",
    category: "Culture",
  },
  {
    slug: "swedish-summers",
    title: "The thing nobody tells you about Swedish summers",
    lede:
      "You plan for the long days. You don't plan for what they do to you — the slowness, the birch trees, the sudden compulsion to sit by the water for three hours doing absolutely nothing.",
    location: "Sweden",
    category: "Culture",
  },
];

const CATEGORIES = ["All", "Culture", "Travel", "Places", "Language", "Food"];

const CATEGORY_COLOR: Record<string, string> = {
  Places: "text-forest",
  Culture: "text-coral",
  Travel: "text-swedish-blue",
  Language: "text-golden",
  Food: "text-charcoal/50",
};

/* ── Main component ── */

export default function BlogContent() {
  const [active, setActive] = useState("All");

  const featured = POSTS[0];
  const filtered =
    active === "All" ? POSTS.slice(1) : POSTS.filter((p) => p.category === active);
  const showFeatured = active === "All" || featured.category === active;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] overflow-hidden bg-navy flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/blog-hero.jpg"
            alt="Red Swedish cabin on a still lake surrounded by pine forest"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-40">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            The Blog
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Sweden, up close.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            Places worth going, food worth eating, words worth knowing —
            and everything in between.
          </p>
        </div>
      </section>

      {/* ── Category filter ── */}
      <div className="border-b border-charcoal/[0.07] bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`group relative shrink-0 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  i > 0 ? "ml-6" : ""
                } ${
                  active === cat
                    ? "text-charcoal"
                    : "text-charcoal/35 hover:text-charcoal/70"
                }`}
              >
                {cat}
                {/* active underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-charcoal transition-transform origin-left ${
                    active === cat ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured article ── */}
      {showFeatured && (
        <section className="bg-cream border-b border-charcoal/[0.07]">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/35">
                Editor&rsquo;s pick &mdash; {featured.category}
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-charcoal transition-colors group-hover:text-swedish-blue sm:text-5xl lg:text-6xl">
                {featured.title}
              </h2>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-charcoal/10" />
                <p className="shrink-0 text-xs font-medium uppercase tracking-widest text-charcoal/30">
                  {featured.location}
                </p>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-charcoal/70">
                {featured.lede}
              </p>
              <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-swedish-blue">
                Read the essay
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </p>
            </Link>
          </div>
        </section>
      )}

      {/* ── Article grid ── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-charcoal/40">
            Nothing here yet — check back soon.
          </p>
        ) : (
          <>
            {/* Row 1 — two large */}
            {filtered.length >= 2 && (
              <div className="grid grid-cols-1 gap-px border border-charcoal/[0.07] bg-charcoal/[0.07] sm:grid-cols-2">
                {filtered.slice(0, 2).map((post) => (
                  <ArticleCard key={post.slug} post={post} size="large" />
                ))}
              </div>
            )}
            {filtered.length === 1 && (
              <div className="border border-charcoal/[0.07]">
                <ArticleCard post={filtered[0]} size="wide" />
              </div>
            )}

            {/* Row 2 — three smaller */}
            {filtered.length >= 5 && (
              <div className="mt-px grid grid-cols-1 gap-px border-x border-b border-charcoal/[0.07] bg-charcoal/[0.07] sm:grid-cols-3">
                {filtered.slice(2, 5).map((post) => (
                  <ArticleCard key={post.slug} post={post} size="small" />
                ))}
              </div>
            )}
            {filtered.length === 3 && (
              <div className="mt-px grid grid-cols-1 gap-px border-x border-b border-charcoal/[0.07] bg-charcoal/[0.07] sm:grid-cols-3">
                {filtered.slice(2).map((post) => (
                  <ArticleCard key={post.slug} post={post} size="small" />
                ))}
              </div>
            )}
            {filtered.length === 4 && (
              <div className="mt-px grid grid-cols-1 gap-px border-x border-b border-charcoal/[0.07] bg-charcoal/[0.07] sm:grid-cols-2">
                {filtered.slice(2, 4).map((post) => (
                  <ArticleCard key={post.slug} post={post} size="large" />
                ))}
              </div>
            )}

            {/* Row 3 — remaining wide */}
            {filtered.length >= 6 && (
              <div className="mt-px border-x border-b border-charcoal/[0.07]">
                <ArticleCard post={filtered[5]} size="wide" />
              </div>
            )}
          </>
        )}

        {/* Sign-off */}
        <div className="mt-20 border-t border-charcoal/[0.07] pt-10 text-center">
          <p className="font-display text-xl font-medium text-charcoal/50">
            More coming. I&rsquo;m writing as fast as I can.
          </p>
          <p className="mt-2 text-sm text-charcoal/35">
            Got a corner of Sweden you&rsquo;d love covered?{" "}
            <Link
              href="/community"
              className="underline underline-offset-4 transition-colors hover:text-swedish-blue"
            >
              Tell me in the community.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

/* ── Article card ── */

type CardSize = "large" | "small" | "wide";

function ArticleCard({ post, size }: { post: Post; size: CardSize }) {
  const catColor = CATEGORY_COLOR[post.category] ?? "text-charcoal/50";

  const padding =
    size === "small"
      ? "p-6 sm:p-7"
      : size === "wide"
      ? "p-8 sm:p-12 sm:flex sm:items-center sm:gap-16"
      : "p-7 sm:p-10";

  const titleSize =
    size === "small"
      ? "text-xl sm:text-2xl"
      : size === "wide"
      ? "text-2xl sm:text-3xl"
      : "text-2xl sm:text-[1.75rem]";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`card-hover group block bg-white ${padding}`}
    >
      {size === "wide" ? (
        <>
          <div className="sm:w-1/3 sm:shrink-0">
            <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${catColor}`}>
              {post.category}
            </p>
            <h2 className={`mt-3 font-display font-semibold leading-snug tracking-tight text-charcoal transition-colors group-hover:text-swedish-blue ${titleSize}`}>
              {post.title}
            </h2>
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-charcoal/30">
              {post.location}
            </p>
          </div>
          <div className="mt-5 sm:mt-0 sm:flex-1">
            <p className="text-base leading-[1.8] text-charcoal/60">{post.lede}</p>
            <p className="mt-5 text-xs font-semibold tracking-wide text-swedish-blue opacity-0 transition-opacity group-hover:opacity-100">
              Read →
            </p>
          </div>
        </>
      ) : (
        <>
          <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${catColor}`}>
            {post.category}
          </p>
          <h2 className={`mt-3 font-display font-semibold leading-snug tracking-tight text-charcoal transition-colors group-hover:text-swedish-blue ${titleSize}`}>
            {post.title}
          </h2>
          {size === "large" && (
            <p className="mt-3 text-sm leading-[1.75] text-charcoal/60">{post.lede}</p>
          )}
          <div className="mt-5 flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-widest text-charcoal/30">
              {post.location}
            </p>
            <p className="text-xs font-semibold tracking-wide text-swedish-blue opacity-0 transition-opacity group-hover:opacity-100">
              Read →
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
