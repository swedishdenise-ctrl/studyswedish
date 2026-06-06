"use client";

import { useState } from "react";
import type { Phrase, Situation } from "@/data/phrases";

const LEVEL_STYLES: Record<string, string> = {
  A1: "bg-swedish-blue/10 text-swedish-blue",
  A2: "bg-forest/15 text-forest",
  B1: "bg-coral/15 text-coral",
  B2: "bg-golden/25 text-charcoal",
};

export function PhraseSearch({
  phrases,
  situations,
}: {
  phrases: Phrase[];
  situations: Situation[];
}) {
  const [query, setQuery] = useState("");
  const [activeSituation, setActiveSituation] = useState<string | null>(null);

  const q = query.toLowerCase().trim();

  const filtered = phrases.filter((p) => {
    const matchesSituation =
      !activeSituation || p.situation === activeSituation;
    const matchesQuery =
      !q ||
      p.swedish.toLowerCase().includes(q) ||
      p.english.toLowerCase().includes(q) ||
      (p.literal && p.literal.toLowerCase().includes(q));
    return matchesSituation && matchesQuery;
  });

  // Group by situation
  const grouped = situations
    .filter((s) => (activeSituation ? s.slug === activeSituation : true))
    .map((s) => ({
      ...s,
      phrases: filtered.filter((p) => p.situation === s.slug),
    }))
    .filter((g) => g.phrases.length > 0);

  return (
    <>
      {/* Search + filter bar */}
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in Swedish or English, e.g. &quot;thank you&quot; or &quot;tack&quot;"
            className="w-full rounded-xl border border-black/10 bg-cream/50 px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-swedish-blue/40 focus:outline-none focus:ring-2 focus:ring-swedish-blue/20"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSituation(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                !activeSituation
                  ? "bg-swedish-blue text-white"
                  : "bg-cream text-charcoal/70 hover:bg-cream/80"
              }`}
            >
              All situations
            </button>
            {situations.map((s) => (
              <button
                key={s.slug}
                onClick={() =>
                  setActiveSituation(
                    activeSituation === s.slug ? null : s.slug
                  )
                }
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  activeSituation === s.slug
                    ? "bg-swedish-blue text-white"
                    : "bg-cream text-charcoal/70 hover:bg-cream/80"
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {grouped.length === 0 && (
          <p className="py-12 text-center text-charcoal/50">
            No phrases match your search. Try a different word or clear the
            filter.
          </p>
        )}

        {grouped.map((group) => (
          <div key={group.slug} className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                {group.icon}
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold">
                  {group.label}
                </h2>
                <p className="text-sm text-charcoal/60">
                  {group.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {group.phrases.map((phrase) => (
                <PhraseCard key={phrase.id} phrase={phrase} query={q} />
              ))}
            </div>
          </div>
        ))}

        <p className="mt-8 text-center text-sm text-charcoal/50">
          Showing {filtered.length} of {phrases.length} phrases
        </p>
      </div>
    </>
  );
}

function PhraseCard({ phrase, query }: { phrase: Phrase; query: string }) {
  const levelPill = LEVEL_STYLES[phrase.cefrLevel] ?? "";

  return (
    <div className="rounded-xl border border-black/5 bg-white p-5 transition hover:border-swedish-blue/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold text-charcoal">
            {highlight(phrase.swedish, query)}
          </p>
          <p className="mt-0.5 text-charcoal/70">
            {highlight(phrase.english, query)}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${levelPill}`}
        >
          {phrase.cefrLevel}
        </span>
      </div>

      {phrase.literal && (
        <p className="mt-2 text-sm italic text-charcoal/50">
          Literally: &ldquo;{highlight(phrase.literal, query)}&rdquo;
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-warm-gray">
        {phrase.pronunciation && (
          <span className="font-mono">{phrase.pronunciation}</span>
        )}
        {phrase.notes && (
          <span className="rounded-lg bg-cream/60 px-2 py-1">
            {phrase.notes}
          </span>
        )}
      </div>
    </div>
  );
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-golden/30 px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}
