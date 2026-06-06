import Link from "next/link";
import Image from "next/image";
import { VOCABULARY, CATEGORIES } from "@/data/vocabulary";
import { VocabularySearch } from "./vocabulary-search";

export const metadata = {
  title: "Swedish vocabulary, StudySwedish",
  description:
    "Browse Swedish words by category and level. Each word includes pronunciation, gender, examples, and real usage, free, no account needed.",
};

const LEVEL_STYLES: Record<string, string> = {
  A1: "bg-swedish-blue/10 text-swedish-blue",
  A2: "bg-forest/15 text-forest",
  B1: "bg-coral/15 text-coral",
  B2: "bg-golden/25 text-charcoal",
  C1: "bg-charcoal/10 text-charcoal",
};

const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1"];

export default function VocabularyPage() {
  const wordsByCategory = CATEGORIES.map((cat) => {
    const words = VOCABULARY.filter((w) => w.category === cat.slug).sort(
      (a, b) => a.frequencyRank - b.frequencyRank
    );
    const levels = CEFR_ORDER.filter((l) =>
      words.some((w) => w.cefrLevel === l)
    );
    const preview = words.slice(0, 4).map((w) => w.swedish);
    return { ...cat, words, levels, preview };
  });

  return (
    <>
      {/* Hero with midsummer background */}
      <section className="relative overflow-hidden border-b border-black/5">
        {/* Background photo */}
        <Image
          src="/images/midsummer-hero.jpg"
          alt="Midsummer celebration in Vaxholm, Stockholm, Sweden"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Text content */}
        <div className="relative mx-auto max-w-3xl px-6 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Vocabulary
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Swedish words you&rsquo;ll actually use.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
            {VOCABULARY.length} words across 10 categories, with pronunciation,
            gender, and real examples. Practice with flashcards or the match
            game. Free, no account needed.
          </p>

          {/* Search, hero-size */}
          <div className="mx-auto mt-8 max-w-xl">
            <VocabularySearch words={VOCABULARY} levelStyles={LEVEL_STYLES} />
          </div>
        </div>

      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="font-display text-xl font-semibold text-charcoal">
          Browse by category
        </h2>
        <p className="mt-1 text-sm text-charcoal/45">
          Each category has flashcards, a match game, and a word list.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {wordsByCategory.map((cat) => (
            <Link
              key={cat.slug}
              href={`/vocabulary/${cat.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 transition hover:border-swedish-blue/25 hover:shadow-sm"
            >
              {/* Icon */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-2xl"
                aria-hidden
              >
                {cat.icon}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display font-semibold text-charcoal group-hover:text-swedish-blue transition-colors">
                    {cat.label}
                  </p>
                  <span className="shrink-0 text-charcoal/25 transition-colors group-hover:text-swedish-blue">
                    →
                  </span>
                </div>

                {/* Level pills */}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {cat.levels.map((level) => (
                    <span
                      key={level}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${LEVEL_STYLES[level]}`}
                    >
                      {level}
                    </span>
                  ))}
                  <span className="text-xs text-charcoal/35">
                    · {cat.words.length} words
                  </span>
                </div>

                {/* Word preview */}
                <p className="mt-2 truncate text-sm text-charcoal/40">
                  {cat.preview.join(" · ")}
                  {cat.words.length > 4 && (
                    <span className="text-charcoal/25"> · …</span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-charcoal/35">
          New words added weekly, currently at {VOCABULARY.length} and growing.
        </p>
      </section>
    </>
  );
}
