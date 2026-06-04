"use client";

import { useState } from "react";
import Link from "next/link";
import type { VocabWord, CefrLevel } from "@/data/vocabulary";
import { CATEGORIES } from "@/data/vocabulary";
import { FlashcardPractice } from "./flashcard-practice";
import { MatchGame } from "./match-game";
import { SignupNudge } from "@/components/signup-nudge";

const LEVEL_STYLES: Record<string, string> = {
  A1: "bg-swedish-blue/10 text-swedish-blue",
  A2: "bg-forest/15 text-forest",
  B1: "bg-coral/15 text-coral",
  B2: "bg-golden/25 text-charcoal",
  C1: "bg-charcoal/10 text-charcoal",
};

const LEVEL_ACTIVE: Record<string, string> = {
  A1: "bg-swedish-blue text-white border-swedish-blue",
  A2: "bg-forest text-white border-forest",
  B1: "bg-coral text-white border-coral",
  B2: "bg-golden text-charcoal border-golden",
  C1: "bg-charcoal text-white border-charcoal",
};

const CEFR_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

type Tab = "practice" | "match" | "browse";

export function CategoryContent({
  words,
  slug,
}: {
  words: VocabWord[];
  slug: string;
}) {
  const [tab, setTab] = useState<Tab>("practice");
  const [practiceCount, setPracticeCount] = useState(0);
  const [levelFilter, setLevelFilter] = useState<CefrLevel | null>(null);

  // Only show level buttons for levels that actually exist in this category
  const availableLevels = CEFR_ORDER.filter((l) =>
    words.some((w) => w.cefrLevel === l)
  );

  const filteredWords = levelFilter
    ? words.filter((w) => w.cefrLevel === levelFilter)
    : words;

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      {/* Level filter — only shown when category has multiple levels */}
      {availableLevels.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal/35">
            Level:
          </span>
          <button
            onClick={() => setLevelFilter(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              levelFilter === null
                ? "border-charcoal bg-charcoal text-white"
                : "border-black/10 bg-white text-charcoal/60 hover:border-charcoal/20 hover:text-charcoal"
            }`}
          >
            All ({words.length})
          </button>
          {availableLevels.map((level) => {
            const count = words.filter((w) => w.cefrLevel === level).length;
            return (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  levelFilter === level
                    ? LEVEL_ACTIVE[level]
                    : "border-black/10 bg-white text-charcoal/60 hover:border-charcoal/20 hover:text-charcoal"
                }`}
              >
                {level} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Tab toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
          <button
            onClick={() => setTab("practice")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              tab === "practice"
                ? "bg-swedish-blue text-white"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => setTab("match")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              tab === "match"
                ? "bg-swedish-blue text-white"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            Match
          </button>
          <button
            onClick={() => setTab("browse")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              tab === "browse"
                ? "bg-swedish-blue text-white"
                : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            Browse
          </button>
        </div>
      </div>

      {tab === "practice" && (
        <FlashcardPractice
          words={filteredWords}
          categoryLabel=""
          onPracticeCount={setPracticeCount}
        />
      )}

      {tab === "match" && (
        <MatchGame
          words={filteredWords}
          onPracticeCount={setPracticeCount}
        />
      )}

      {tab === "browse" && (
        <>
          <p className="mb-4 text-center text-sm text-charcoal/45">
            Tap any card to reveal the translation.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filteredWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        </>
      )}

      {/* Signup nudge after practicing */}
      <SignupNudge practiceCount={practiceCount} />

      {/* Other categories */}
      <h2 className="mt-16 font-display text-xl font-semibold">
        Other categories
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
          <Link
            key={c.slug}
            href={`/vocabulary/${c.slug}`}
            className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-charcoal/80 transition hover:border-swedish-blue/30 hover:text-swedish-blue"
          >
            {c.icon} {c.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function WordCard({ word }: { word: VocabWord }) {
  const [flipped, setFlipped] = useState(false);
  const levelPill = LEVEL_STYLES[word.cefrLevel] ?? "";

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="w-full rounded-xl border border-black/5 bg-white p-5 text-left transition hover:border-swedish-blue/20 hover:shadow-sm"
    >
      {!flipped ? (
        /* Front: Swedish word only */
        <div>
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-xl font-semibold text-charcoal">
              {word.swedish}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              {word.gender && (
                <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-charcoal/70">
                  {word.gender}
                </span>
              )}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelPill}`}
              >
                {word.cefrLevel}
              </span>
            </div>
          </div>
          {word.pronunciationIpa && (
            <p className="mt-1.5 font-mono text-xs text-warm-gray">
              {word.pronunciationIpa}
            </p>
          )}
          <p className="mt-4 text-xs text-charcoal/30">Tap to reveal →</p>
        </div>
      ) : (
        /* Back: English + grammar + example */
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-charcoal/40">{word.swedish}</p>
              <p className="font-display text-xl font-semibold text-swedish-blue">
                {word.english}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${levelPill}`}
            >
              {word.cefrLevel}
            </span>
          </div>

          {word.wordClass === "noun" &&
            (word.definiteForm || word.pluralForm) && (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-charcoal/60">
                {word.definiteForm && (
                  <span>
                    <span className="text-charcoal/40">def.</span>{" "}
                    {word.definiteForm}
                  </span>
                )}
                {word.pluralForm && (
                  <span>
                    <span className="text-charcoal/40">pl.</span>{" "}
                    {word.pluralForm}
                  </span>
                )}
              </div>
            )}

          <div className="mt-3 rounded-lg bg-cream/60 px-3 py-2">
            <p className="text-sm italic text-charcoal/80">{word.exampleSv}</p>
            <p className="text-xs text-charcoal/60">{word.exampleEn}</p>
          </div>

          {word.notes && (
            <p className="mt-2 text-xs text-warm-gray">{word.notes}</p>
          )}

          <p className="mt-3 text-xs text-charcoal/30">Tap to flip back</p>
        </div>
      )}
    </button>
  );
}
