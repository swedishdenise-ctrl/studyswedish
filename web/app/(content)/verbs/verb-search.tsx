"use client";

import { useState } from "react";
import Link from "next/link";
import type { Verb } from "@/data/verbs";

export function VerbSearch({ verbs }: { verbs: Verb[] }) {
  const [query, setQuery] = useState("");

  const results =
    query.length < 2
      ? []
      : verbs
          .filter((v) => {
            const q = query.toLowerCase();
            return (
              v.infinitive.toLowerCase().includes(q) ||
              v.english.toLowerCase().includes(q) ||
              v.present.toLowerCase().includes(q) ||
              v.preteritum.toLowerCase().includes(q) ||
              v.supinum.toLowerCase().includes(q)
            );
          })
          .slice(0, 6);

  return (
    <div className="relative">
      <label htmlFor="verb-search" className="sr-only">
        Search verbs
      </label>
      <input
        id="verb-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by infinitive, English, or any conjugated form — e.g. 'skrev' or 'to eat'"
        className="w-full rounded-xl border border-black/10 bg-cream/40 px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray focus:border-swedish-blue/40 focus:outline-none focus:ring-2 focus:ring-swedish-blue/20"
      />

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-[28rem] overflow-y-auto rounded-xl border border-black/10 bg-white shadow-lg">
          {results.map((v) => (
            <li
              key={v.id}
              className="border-b border-black/5 last:border-0"
            >
              <Link
                href={`/verbs/${v.infinitive}`}
                className="block px-4 py-3 hover:bg-cream/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="font-display font-semibold text-charcoal">
                      {v.infinitive}
                    </span>
                    <span className="ml-2 text-sm text-charcoal/60">
                      {v.english}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-cream px-2 py-0.5 text-xs font-medium text-charcoal/70">
                    {v.verbGroup
                      ? `Group ${v.verbGroup}`
                      : "Irregular"}
                  </span>
                </div>
                <div className="mt-1 flex gap-4 text-xs text-charcoal/50">
                  <span>
                    <span className="text-charcoal/40">pres.</span>{" "}
                    {v.present}
                  </span>
                  <span>
                    <span className="text-charcoal/40">past</span>{" "}
                    {v.preteritum}
                  </span>
                  <span>
                    <span className="text-charcoal/40">sup.</span>{" "}
                    {v.supinum}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-black/10 bg-white px-4 py-6 text-center shadow-lg">
          <p className="text-sm text-charcoal/60">
            No verbs match &ldquo;{query}&rdquo; — try the infinitive form
            or search in English.
          </p>
        </div>
      )}
    </div>
  );
}
