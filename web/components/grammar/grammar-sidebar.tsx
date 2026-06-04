"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GRAMMAR_TOPICS } from "@/data/grammar-topics";

const CATEGORIES = [
  {
    title: "Nouns & Articles",
    slugs: ["en-vs-ett", "definite-form", "plurals", "genitive"],
  },
  {
    title: "Verbs",
    slugs: [
      "present-tense",
      "past-tense",
      "supinum-perfect",
      "pluperfect",
      "future-tense",
      "modal-verbs",
      "imperative",
      "passive-voice",
      "reflexive-verbs",
    ],
  },
  {
    title: "Sentence Structure",
    slugs: [
      "v2-word-order",
      "questions",
      "subordinate-clauses",
      "conjunctions",
      "negation",
    ],
  },
  {
    title: "Pronouns",
    slugs: [
      "personal-pronouns",
      "possessives",
      "reflexive-pronouns",
      "demonstrative-pronouns",
      "indefinite-pronouns",
      "relative-pronouns",
    ],
  },
  {
    title: "Adjectives & Adverbs",
    slugs: ["adjectives", "comparison", "adverbs"],
  },
  {
    title: "Prepositions",
    slugs: ["prepositions"],
  },
  {
    title: "Numbers & Time",
    slugs: ["numbers", "ordinal-numbers", "telling-the-time", "dates"],
  },
  {
    title: "Word Building",
    slugs: ["compound-words", "verbal-particles"],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  A1: "text-swedish-blue",
  A2: "text-forest",
  B1: "text-coral",
  B2: "text-golden-dark",
};

const topicMap = Object.fromEntries(GRAMMAR_TOPICS.map((t) => [t.slug, t]));

export function GrammarSidebar() {
  const pathname = usePathname();
  const currentSlug = pathname.startsWith("/grammar/")
    ? pathname.replace("/grammar/", "")
    : null;

  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 scrollbar-thin">
        <Link
          href="/grammar"
          className="mb-5 block text-[11px] font-semibold uppercase tracking-widest text-charcoal/35 hover:text-charcoal/60 transition-colors"
        >
          ← Grammar
        </Link>

        <div className="space-y-5">
          {CATEGORIES.map((cat) => {
            const existing = cat.slugs
              .map((s) => topicMap[s])
              .filter(Boolean);
            const coming = cat.slugs.filter((s) => !topicMap[s]);

            return (
              <div key={cat.title}>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-charcoal/25">
                  {cat.title}
                </p>
                <ul className="space-y-0.5">
                  {existing.map((topic) => {
                    const active = topic.slug === currentSlug;
                    return (
                      <li key={topic.slug}>
                        <Link
                          href={`/grammar/${topic.slug}`}
                          className={`flex items-center justify-between rounded-md px-2 py-1 text-[13px] transition-colors ${
                            active
                              ? "bg-swedish-blue/8 font-semibold text-swedish-blue"
                              : "text-charcoal/55 hover:text-charcoal/80 hover:bg-black/[0.03]"
                          }`}
                        >
                          <span>{topic.title}</span>
                          <span
                            className={`text-[10px] font-medium ${
                              active
                                ? "text-swedish-blue/60"
                                : (LEVEL_COLORS[topic.level] ?? "text-charcoal/30")
                            }`}
                          >
                            {topic.level}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                  {coming.length > 0 && existing.length > 0 && (
                    <li className="px-2 py-0.5 text-[11px] text-charcoal/25">
                      +{coming.length} coming soon
                    </li>
                  )}
                  {existing.length === 0 && (
                    <li className="px-2 py-0.5 text-[11px] text-charcoal/25">
                      Coming soon
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
