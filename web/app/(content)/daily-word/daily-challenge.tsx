"use client";

import { useState } from "react";
import Link from "next/link";
import type { VocabWord } from "@/data/vocabulary";
import type { DailyWord } from "@/data/daily-words";

export function DailyChallenge({
  word,
  daily,
}: {
  word: VocabWord;
  daily: DailyWord;
  allWords: VocabWord[];
}) {
  const [revealed, setRevealed] = useState(false);
  const [response, setResponse] = useState<"knew" | "learning" | null>(null);

  return (
    <div className="mx-auto max-w-xl">
      {/* Main card */}
      <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm">
        {/* Top accent stripe — thicker, more presence */}
        <div className="h-1 bg-gradient-to-r from-swedish-blue/30 via-golden to-swedish-blue/30" />

        {/* Swedish word — always visible */}
        <div className="px-10 pt-12 pb-9 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/30">
            Svenska
          </p>
          <p className="mt-4 font-display text-7xl font-bold tracking-tight text-charcoal sm:text-8xl">
            {word.swedish}
          </p>
          {word.pronunciationIpa && (
            <p className="mt-3 font-mono text-sm text-charcoal/35">
              {word.pronunciationIpa}
            </p>
          )}
          {/* Tags */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-swedish-blue/8 px-3 py-1 text-[11px] font-semibold text-swedish-blue">
              {word.cefrLevel}
            </span>
            <span className="rounded-full bg-cream px-3 py-1 text-[11px] capitalize text-charcoal/50">
              {word.wordClass}
            </span>
            {word.gender && (
              <span className="rounded-full bg-cream px-3 py-1 text-[11px] text-charcoal/50">
                {word.gender}-word
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-10 h-px bg-black/5" />

        {/* Translation area */}
        <div className="px-10 py-9 text-center">
          {!revealed ? (
            <div className="space-y-5">
              <p className="text-sm text-charcoal/40">
                Do you know what this means?
              </p>
              <button
                onClick={() => setRevealed(true)}
                className="rounded-full bg-swedish-blue px-10 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Reveal meaning
              </button>
            </div>
          ) : (
            <div className="space-y-7">
              {/* English meaning */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/30">
                  English
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-charcoal">
                  {word.english}
                </p>
              </div>

              {/* Noun forms */}
              {word.wordClass === "noun" &&
                (word.definiteForm || word.pluralForm) && (
                  <div className="flex justify-center gap-7 text-sm text-charcoal/60">
                    {word.definiteForm && (
                      <span>
                        <span className="text-charcoal/35">definite </span>
                        <strong className="font-semibold text-charcoal">
                          {word.definiteForm}
                        </strong>
                      </span>
                    )}
                    {word.pluralForm && (
                      <span>
                        <span className="text-charcoal/35">plural </span>
                        <strong className="font-semibold text-charcoal">
                          {word.pluralForm}
                        </strong>
                      </span>
                    )}
                  </div>
                )}

              {/* Example sentence */}
              {word.exampleSv && (
                <div className="rounded-2xl bg-cream px-6 py-5 text-center">
                  <p className="font-display text-lg italic leading-snug text-charcoal/75">
                    &ldquo;{word.exampleSv}&rdquo;
                  </p>
                  {word.exampleEn && (
                    <p className="mt-2 text-sm text-charcoal/45">
                      {word.exampleEn}
                    </p>
                  )}
                </div>
              )}

              {/* Self-assessment */}
              {!response ? (
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-widest text-charcoal/30">
                    Did you know it?
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setResponse("knew")}
                      className="rounded-full border border-forest/25 bg-forest/6 px-6 py-2.5 text-sm font-medium text-forest transition-opacity hover:opacity-75"
                    >
                      Yes, I knew it
                    </button>
                    <button
                      onClick={() => setResponse("learning")}
                      className="rounded-full border border-black/10 px-6 py-2.5 text-sm font-medium text-charcoal/55 transition-colors hover:border-black/20"
                    >
                      Still learning
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-display text-xl font-semibold text-charcoal">
                    {response === "knew"
                      ? "Bra jobbat — keep it up."
                      : "Det kommer — it'll stick soon."}
                  </p>
                  <p className="text-sm text-charcoal/40">See you tomorrow.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fun fact — after reveal */}
      {revealed && daily.funFact && (
        <div className="mt-4 rounded-2xl border border-golden/35 bg-golden/8 px-7 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/40">
            Did you know
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">
            {daily.funFact}
          </p>
        </div>
      )}

      {/* Usage tip — after reveal */}
      {revealed && daily.usageTip && (
        <div className="mt-3 rounded-2xl border border-swedish-blue/15 bg-swedish-blue/5 px-7 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-swedish-blue/60">
            Usage tip
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">
            {daily.usageTip}
          </p>
        </div>
      )}

      {/* Explore link — after reveal */}
      {revealed && (
        <div className="mt-7 text-center">
          <Link
            href={`/vocabulary/${word.category}`}
            className="text-sm font-medium text-swedish-blue hover:underline"
          >
            Explore more {word.category} vocabulary &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
