"use client";

import { useState } from "react";
import Link from "next/link";
import { VERBS, VERB_GROUPS, type Verb } from "@/data/verbs";
import { VerbSearch } from "./verb-search";
import { ConjugationDrill } from "./conjugation-drill";

const GROUP_COLORS: Record<number, { dot: string; pill: string }> = {
  1: { dot: "bg-swedish-blue", pill: "bg-swedish-blue/10 text-swedish-blue" },
  2: { dot: "bg-forest", pill: "bg-forest/15 text-forest" },
  3: { dot: "bg-golden-dark", pill: "bg-golden/25 text-charcoal" },
  4: { dot: "bg-coral", pill: "bg-coral/15 text-coral" },
};

type Tab = "drill" | "browse";

export function VerbsContent() {
  const [tab, setTab] = useState<Tab>("drill");

  const grouped = VERB_GROUPS.map((g) => ({
    ...g,
    verbs: VERBS.filter((v) =>
      g.group === 4
        ? v.verbGroup === 4 || (v.isIrregular && v.verbGroup === null)
        : v.verbGroup === g.group
    ).sort((a, b) => a.frequencyRank - b.frequencyRank),
  }));

  return (
    <>
      {/* Search */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <VerbSearch verbs={VERBS} />
        </div>
      </section>

      {/* Tab toggle */}
      <section className="bg-cream/50 py-6">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
            <button
              onClick={() => setTab("drill")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tab === "drill"
                  ? "bg-swedish-blue text-white"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Conjugation drill
            </button>
            <button
              onClick={() => setTab("browse")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tab === "browse"
                  ? "bg-swedish-blue text-white"
                  : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Browse all verbs
            </button>
          </div>
        </div>
      </section>

      {tab === "drill" ? (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-semibold">
              Test your conjugations
            </h2>
            <p className="mt-2 text-charcoal/70">
              8 random verbs per round. Pick the right form, present, past,
              supinum, or imperative.
            </p>
          </div>
          <ConjugationDrill verbs={VERBS} />
        </section>
      ) : (
        <>
          {/* Verb groups explainer */}
          <section className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="font-display text-2xl font-semibold">
              The four verb groups
            </h2>
            <p className="mt-2 max-w-2xl text-charcoal/70">
              Swedish verbs fall into four groups based on how they form the past
              tense. Groups 1–3 are regular (predictable patterns). Group 4 verbs
              are irregular, but many of the most common verbs are here, so
              you&rsquo;ll learn them fast through use.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {VERB_GROUPS.map((g) => {
                const colors = GROUP_COLORS[g.group];
                return (
                  <div
                    key={g.group}
                    className="rounded-2xl border border-black/5 bg-white p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${colors.dot}`}
                        aria-hidden
                      />
                      <h3 className="font-display text-lg font-semibold">
                        {g.label}:{" "}
                        <span className="font-sans font-normal text-charcoal/60">
                          {g.pattern}
                        </span>
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-charcoal/70">
                      {g.description}
                    </p>
                    <p className="mt-2 font-mono text-xs text-warm-gray">
                      {g.example}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Verb list by group */}
          {grouped.map((g) => {
            const colors = GROUP_COLORS[g.group];
            return (
              <section
                key={g.group}
                className="mx-auto max-w-4xl px-6 pb-12"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${colors.dot}`}
                    aria-hidden
                  />
                  <h2 className="font-display text-2xl font-semibold">
                    {g.label}
                  </h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.pill}`}
                  >
                    {g.pattern}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-black/5 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-black/5 text-left text-xs uppercase tracking-wide text-warm-gray">
                        <th className="px-4 py-3 font-medium">Infinitive</th>
                        <th className="px-4 py-3 font-medium">English</th>
                        <th className="px-4 py-3 font-medium">Present</th>
                        <th className="px-4 py-3 font-medium">Past</th>
                        <th className="px-4 py-3 font-medium">Supinum</th>
                        <th className="hidden px-4 py-3 font-medium md:table-cell">
                          Imperative
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.verbs.map((v) => (
                        <tr
                          key={v.id}
                          className="border-b border-black/5 last:border-0 hover:bg-cream/40"
                        >
                          <td className="px-4 py-3">
                            <Link
                              href={`/verbs/${v.infinitive}`}
                              className="font-semibold text-charcoal hover:text-swedish-blue"
                            >
                              {v.infinitive}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-charcoal/70">
                            {v.english}
                          </td>
                          <td className="px-4 py-3 font-medium text-swedish-blue">
                            {v.present}
                          </td>
                          <td className="px-4 py-3 text-charcoal/80">
                            {v.preteritum}
                          </td>
                          <td className="px-4 py-3 text-charcoal/80">
                            {v.supinum}
                          </td>
                          <td className="hidden px-4 py-3 text-charcoal/60 md:table-cell">
                            {v.imperative}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}

          <section className="mx-auto max-w-4xl px-6 pb-16">
            <div className="rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center">
              <p className="text-charcoal/70">
                Currently covering <strong>{VERBS.length}</strong> common verbs
               , more being added regularly.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
