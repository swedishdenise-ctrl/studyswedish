"use client";

import { useState } from "react";
import type { VocabWord } from "@/data/vocabulary";

export function VocabularySearch({
  words,
  levelStyles,
}: {
  words: VocabWord[];
  levelStyles: Record<string, string>;
}) {
  const [query, setQuery] = useState("");

  const results =
    query.length < 2
      ? []
      : words
          .filter((w) => {
            const q = query.toLowerCase();
            return (
              w.swedish.toLowerCase().includes(q) ||
              w.english.toLowerCase().includes(q)
            );
          })
          .slice(0, 8);

  return (
    <div className="relative">
      <label htmlFor="vocab-search" className="sr-only">
        Search vocabulary
      </label>
      <input
        id="vocab-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Swedish or English, e.g. 'kaffe' or 'thank you'"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-5 py-3.5 text-base text-charcoal placeholder:text-charcoal/35 focus:border-swedish-blue/40 focus:outline-none focus:ring-2 focus:ring-swedish-blue/20"
      />

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-96 overflow-y-auto rounded-xl border border-black/10 bg-white shadow-lg">
          {results.map((word) => (
            <li
              key={word.id}
              className="border-b border-black/5 px-4 py-3 last:border-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-display font-semibold text-charcoal">
                    {word.swedish}
                  </span>
                  <span className="ml-2 text-sm text-charcoal/60">
                    {word.english}
                  </span>
                  {word.pronunciationIpa && (
                    <span className="ml-2 font-mono text-xs text-warm-gray">
                      {word.pronunciationIpa}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  {word.gender && (
                    <span className="rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-charcoal/70">
                      {word.gender}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelStyles[word.cefrLevel] ?? ""}`}
                  >
                    {word.cefrLevel}
                  </span>
                </div>
              </div>
              <div className="mt-1.5 rounded-lg bg-cream/50 px-2.5 py-1.5">
                <p className="text-xs italic text-charcoal/70">
                  {word.exampleSv}
                </p>
                <p className="text-xs text-charcoal/50">{word.exampleEn}</p>
              </div>
              {word.notes && (
                <p className="mt-1 text-xs text-warm-gray">{word.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-black/10 bg-white px-4 py-6 text-center shadow-lg">
          <p className="text-sm text-charcoal/60">
            No words match &ldquo;{query}&rdquo;, try another search or browse
            by category below.
          </p>
        </div>
      )}
    </div>
  );
}
