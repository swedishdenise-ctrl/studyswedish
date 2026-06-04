import Image from "next/image";
import { getDailyWord, DAILY_WORDS } from "@/data/daily-words";
import { VOCABULARY } from "@/data/vocabulary";
import { DailyChallenge } from "./daily-challenge";

export const metadata = {
  title: "Swedish word of the day — StudySwedish",
  description:
    "A new Swedish word every day — with pronunciation, an example sentence, and a fun fact about Sweden. A tiny daily habit that adds up.",
};

export default function DailyWordPage() {
  const { word, daily } = getDailyWord();

  const recentWords = DAILY_WORDS.filter(
    (d) => d.featuredDate !== daily.featuredDate
  )
    .sort(
      (a, b) =>
        new Date(b.featuredDate).getTime() - new Date(a.featuredDate).getTime()
    )
    .slice(0, 6)
    .map((d) => ({
      daily: d,
      word: VOCABULARY.find((v) => v.id === d.vocabularyId)!,
    }))
    .filter((entry) => entry.word);

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Hero — background image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/northern-lights.jpg"
            alt="Northern lights (aurora borealis) reflected over a Swedish lake at night"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
          {/* Swedish cross motif */}
          <div className="mb-9 flex items-center justify-center gap-4">
            <div className="h-px w-14 bg-white/20" />
            <div className="relative h-6 w-6 shrink-0">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-golden/80" />
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-golden/80" />
            </div>
            <div className="h-px w-14 bg-white/20" />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
            Dagens ord
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
            Word of the Day
          </h1>
          <p className="mt-3 text-sm text-white/60">{formattedDate}</p>
          <p className="mt-2 text-sm text-white/40">
            One new word every morning — a tiny habit that adds up.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream min-h-screen">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <DailyChallenge word={word} daily={daily} allWords={VOCABULARY} />

          {/* Recent words */}
          {recentWords.length > 0 && (
            <div className="mt-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/35">
                Recent words
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {recentWords.map(({ word: w, daily: d }) => (
                  <div
                    key={d.featuredDate}
                    className="rounded-2xl border border-black/6 bg-white px-5 py-4 transition-shadow hover:shadow-sm"
                  >
                    <p className="text-[11px] text-charcoal/35">
                      {new Date(d.featuredDate + "T12:00:00").toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short" }
                      )}
                    </p>
                    <p className="mt-1.5 font-display text-xl font-semibold text-charcoal">
                      {w.swedish}
                    </p>
                    <p className="mt-0.5 text-sm text-charcoal/50">{w.english}</p>
                    <span className="mt-2.5 inline-block rounded-full bg-cream px-2.5 py-0.5 text-[10px] capitalize text-charcoal/40">
                      {w.wordClass}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Come back nudge */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-8 bg-charcoal/15" />
              <p className="text-sm text-charcoal/35">
                A new word every day — come back tomorrow.
              </p>
              <div className="h-px w-8 bg-charcoal/15" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
