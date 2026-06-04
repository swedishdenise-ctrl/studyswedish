import Link from "next/link";
import { GRAMMAR_TOPICS } from "@/data/grammar-topics";

export const metadata = {
  title: "Swedish Grammar — StudySwedish",
  description:
    "A complete reference to Swedish grammar. Every rule explained clearly, from A1 basics to B2 advanced topics.",
};

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

const LEVELS = ["A1", "A2", "B1", "B2"];

const LEVEL_STYLES: Record<string, { pill: string; dot: string }> = {
  A1: { pill: "bg-swedish-blue/10 text-swedish-blue", dot: "bg-swedish-blue" },
  A2: { pill: "bg-forest/15 text-forest", dot: "bg-forest" },
  B1: { pill: "bg-coral/15 text-coral", dot: "bg-coral" },
  B2: { pill: "bg-golden/25 text-charcoal", dot: "bg-golden-dark" },
};

const topicMap = Object.fromEntries(GRAMMAR_TOPICS.map((t) => [t.slug, t]));

type Props = { searchParams: Promise<{ level?: string }> };

export default async function GrammarPage({ searchParams }: Props) {
  const { level: activeLevel } = await searchParams;

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 pt-36 pb-16 sm:pt-44"
        style={{ background: "#FAF5EE" }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Grammar reference
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl" style={{ color: "#1A1208" }}>
            Swedish Grammar
          </h1>
          <p className="mt-4 max-w-lg text-[17px] leading-relaxed" style={{ color: "#3D2B1470" }}>
            Every rule you need, from first words to fluency. Free to read — no account required.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Level filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          <Link
            href="/grammar"
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !activeLevel
                ? "bg-charcoal text-white"
                : "text-charcoal/50 hover:bg-black/5 hover:text-[#1A1208]"
            }`}
          >
            All levels
          </Link>
          {LEVELS.map((lvl) => {
            const s = LEVEL_STYLES[lvl];
            return (
              <Link
                key={lvl}
                href={`/grammar?level=${lvl}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeLevel === lvl
                    ? s.pill + " ring-1 ring-inset ring-current/20"
                    : "text-charcoal/50 hover:bg-black/5 hover:text-[#1A1208]"
                }`}
              >
                {lvl}
              </Link>
            );
          })}
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {CATEGORIES.map((cat) => {
            const topics = cat.slugs
              .map((slug) => ({ slug, topic: topicMap[slug] ?? null }))
              .filter(({ topic }) => {
                if (!topic) return false;
                if (activeLevel && topic.level !== activeLevel) return false;
                return true;
              });

            const comingSoon = cat.slugs.filter((s) => !topicMap[s]).length;

            if (topics.length === 0 && activeLevel) return null;

            return (
              <div key={cat.title}>
                <h2 className="mb-3 font-display text-lg font-semibold text-charcoal">
                  {cat.title}
                </h2>
                <div className="overflow-hidden rounded-xl border border-black/5 bg-white">
                  {topics.map(({ slug, topic }, i) => {
                    if (!topic) return null;
                    const s = LEVEL_STYLES[topic.level] ?? LEVEL_STYLES.A1;
                    return (
                      <Link
                        key={slug}
                        href={`/grammar/${slug}`}
                        className={`group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[#F5EDE3] ${
                          i > 0 ? "border-t border-black/[0.04]" : ""
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${s.dot}`}
                        />
                        <span className="flex-1 font-medium text-charcoal group-hover:text-swedish-blue transition-colors">
                          {topic.title}
                        </span>
                        <span className="hidden text-sm text-charcoal/35 sm:block">
                          {topic.subtitle.length > 60
                            ? topic.subtitle.slice(0, 60) + "…"
                            : topic.subtitle}
                        </span>
                        <span
                          className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${s.pill}`}
                        >
                          {topic.level}
                        </span>
                      </Link>
                    );
                  })}

                  {!activeLevel && comingSoon > 0 && (
                    <div
                      className={`px-5 py-3 text-[12px] text-charcoal/30 ${
                        topics.length > 0 ? "border-t border-black/[0.04]" : ""
                      }`}
                    >
                      {comingSoon} more topic{comingSoon > 1 ? "s" : ""} coming
                      soon
                    </div>
                  )}

                  {topics.length === 0 && !activeLevel && (
                    <div className="px-5 py-3.5 text-sm text-charcoal/30">
                      Coming soon
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
