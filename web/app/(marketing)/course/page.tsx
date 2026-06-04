import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The course — StudySwedish",
  description:
    "A complete Swedish course from A1 to C1. 52 units built on the CEFR framework, with native audio, grammar, exercises, and AI practice.",
};

export default function CoursePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] overflow-hidden bg-navy flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/images/gothenburg-archipelago.jpg"
            alt="Gothenburg archipelago, west coast of Sweden"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        {/* Gradient: transparent top, heavy navy at base so text sits on solid ground */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-40">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            The course
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            From <em className="not-italic text-golden">hej</em> to fluent.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            The most complete Swedish course available online.
            Built on the CEFR framework. Designed for people who are
            serious about the language.
          </p>
        </div>
      </section>

      {/* ── Editorial stat strip ── */}
      <section className="bg-cream border-b border-charcoal/[0.06]">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-3 divide-x divide-charcoal/[0.08]">
            {STATS.map((s) => (
              <div key={s.number} className="px-4 first:pl-0 last:pr-0 sm:px-8">
                <p className="font-display text-3xl font-semibold text-navy sm:text-5xl lg:text-6xl">
                  {s.number}
                </p>
                <p className="mt-1 text-xs text-charcoal/50 sm:mt-2 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto / "Not an app" ── */}
      <section className="bg-navy">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-golden/70">
                The difference
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                This is not a language app.
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-6 text-white/60 text-base leading-relaxed">
              <p>
                Apps give you streaks. We give you Swedish. There is a
                difference — and most people discover it after two years of
                daily notifications and still not being able to hold a
                conversation.
              </p>
              <p>
                StudySwedish is a structured course: 52 units, five CEFR
                levels, a clear path from your first word to genuine fluency.
                Every lesson builds on the last. Nothing is filler.
              </p>
              <p className="text-white/40 text-sm">
                The same framework used by Swedish universities and the
                Swedish Migration Agency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Level overview — editorial ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/30">
            Five levels
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            A complete path, not a sampler.
          </h2>

          <div className="mt-14 space-y-px">
            {LEVELS.map((lv) => (
              <div
                key={lv.level}
                className="group grid grid-cols-[56px_1fr] items-start gap-4 border-t border-charcoal/[0.07] py-6 sm:grid-cols-[100px_1fr_auto] sm:items-center sm:gap-6 sm:py-7"
              >
                {/* Level badge */}
                <div className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${lv.dot}`}
                  />
                  <span className="font-display text-2xl font-semibold text-navy sm:text-3xl">
                    {lv.level}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <p className="font-medium text-navy">{lv.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal/50">
                    {lv.description}
                  </p>
                </div>

                {/* Units/hours — hidden on mobile */}
                <div className="hidden text-right text-xs text-charcoal/30 tabular-nums sm:block">
                  <p>{lv.units} units</p>
                  <p>~{lv.hours}h</p>
                </div>
              </div>
            ))}
            {/* Final border */}
            <div className="border-t border-charcoal/[0.07]" />
          </div>
        </div>
      </section>

      {/* ── Inside every unit — split layout ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left: copy */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/30">
                Inside every unit
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                Everything required. Nothing extra.
              </h2>
              <p className="mt-5 text-charcoal/60 leading-relaxed">
                Each unit is built to move you forward and short enough to
                finish in a week. The structure is deliberate — comprehension,
                then production, then fluency.
              </p>

              <ul className="mt-10 space-y-6">
                {UNIT_FEATURES.map((f) => (
                  <li key={f.title} className="flex gap-4">
                    <div className="mt-0.5 flex-shrink-0 text-navy/40">
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">{f.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/55">
                        {f.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: image */}
            <div className="relative min-h-[380px] overflow-hidden rounded-2xl lg:min-h-[520px]">
              <Image
                src="/images/gothenburg-archipelago.jpg"
                alt="Swedish west coast"
                fill
                className="object-cover"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-lg font-medium text-white leading-snug">
                  "The structure is what makes the difference."
                </p>
                <p className="mt-2 text-xs text-white/50">
                  — Every learner who tried the other options first
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Method pillars ── */}
      <section className="bg-cream border-t border-charcoal/[0.06]">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/30">
            The method
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Why it works.
          </h2>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.heading}>
                <div
                  className="h-px w-10 mb-8"
                  style={{ backgroundColor: p.color }}
                />
                <h3 className="font-display text-xl font-semibold text-navy">
                  {p.heading}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/55">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="bg-cream border-y border-charcoal/[0.06]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-8 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author}>
                <p className="font-display text-lg font-medium leading-snug text-navy">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 text-xs text-charcoal/40">
                  — {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — minimal / confident ── */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <Image
            src="/images/gothenburg-archipelago.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/90" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            When you&rsquo;re ready.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-white/50 leading-relaxed">
            Unit 1 is free. No account required to start.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/learn"
              className="rounded-full bg-golden px-8 py-3.5 text-sm font-semibold text-navy transition hover:bg-golden-dark"
            >
              Begin the course
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-white/50 transition hover:text-white/80"
            >
              Sign in →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Data ── */

const STATS = [
  { number: "52", label: "units across five CEFR levels" },
  { number: "140+", label: "hours of structured content" },
  { number: "A1–C1", label: "complete from beginner to advanced" },
];

const LEVELS = [
  {
    level: "A1",
    label: "Absolute beginner",
    description:
      "Greetings, numbers, introductions, and the sounds of Swedish.",
    units: 10,
    hours: 20,
    dot: "bg-golden",
  },
  {
    level: "A2",
    label: "Elementary",
    description:
      "Everyday conversations — shopping, food, weather, and simple past tense.",
    units: 12,
    hours: 28,
    dot: "bg-coral",
  },
  {
    level: "B1",
    label: "Intermediate",
    description:
      "Express opinions, handle travel situations, write short texts.",
    units: 12,
    hours: 32,
    dot: "bg-forest",
  },
  {
    level: "B2",
    label: "Upper intermediate",
    description:
      "Follow Swedish media, discuss complex topics, work in Swedish.",
    units: 10,
    hours: 32,
    dot: "bg-swedish-blue",
  },
  {
    level: "C1",
    label: "Advanced",
    description:
      "Nuance, idiom, and formal register. Novels, film, and professional writing.",
    units: 8,
    hours: 28,
    dot: "bg-navy",
  },
];

const UNIT_FEATURES = [
  {
    title: "Native audio",
    body: "Every word and phrase recorded by native speakers. Real pronunciation, not text-to-speech.",
    icon: <AudioIcon />,
  },
  {
    title: "Written guides",
    body: "Clear explanations you can read, re-read, and search — a proper reference, not bullet points.",
    icon: <BookIcon />,
  },
  {
    title: "Targeted exercises",
    body: "Multiple choice, fill-in-the-blank, translation, and structured speaking practice.",
    icon: <TargetIcon />,
  },
  {
    title: "Community",
    body: "Ask questions, get feedback, and practise with other learners who take the language seriously.",
    icon: <CommunityIcon />,
  },
];

const PILLARS = [
  {
    heading: "Structure first",
    body: "Grammar is not the enemy. It is the map. We teach the rules clearly and early, so you always know where you are in the language.",
    color: "#C9A84C",
  },
  {
    heading: "Cumulative learning",
    body: "Every unit assumes the previous one. There is no repetition for repetition's sake. You move forward, always.",
    color: "#1D5C3A",
  },
  {
    heading: "Real Swedish",
    body: "Idioms, culture, spoken register, written register. The language people actually use — not the Swedish of textbook dialogues.",
    color: "#C0714A",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I spent two years on apps and couldn't hold a conversation. Three months here and I read the news in Swedish.",
    author: "Sarah K., Stockholm resident since 2024",
  },
  {
    quote:
      "The structure is unlike anything else. You always know where you are and where you're going.",
    author: "Marcus T., language teacher",
  },
  {
    quote:
      "I passed the Swedish citizenship language requirement on my first attempt. This course prepared me.",
    author: "Amara L., new Swedish citizen",
  },
];

/* ── Icons ── */

function AudioIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  );
}
