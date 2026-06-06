import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Learn Swedish, StudySwedish",
  description:
    "A structured Swedish course from A1 to C1, built on the CEFR framework. Start free, progress at your own pace.",
};

type Unit = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  unit_number: number;
  title: string;
  title_sv: string | null;
  description: string | null;
  icon_emoji: string | null;
  is_free: boolean;
  estimated_hours: number;
  order_index: number;
};

export default async function LearnPage() {
  const supabase = await createClient();
  const { data: units } = await supabase
    .from("units")
    .select(
      "id, level, unit_number, title, title_sv, description, icon_emoji, is_free, estimated_hours, order_index"
    )
    .eq("status", "published")
    .order("order_index", { ascending: true });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPremium = false;
  const completedByUnit = new Map<string, number>();
  const lessonCountByUnit = new Map<string, number>();

  if (user) {
    const [subscriptionRes, lessonsRes, progressRes] = await Promise.all([
      supabase
        .from("subscriptions")
        .select("tier")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("lessons")
        .select("id, unit_id")
        .eq("status", "published"),
      supabase
        .from("user_lesson_progress")
        .select("lesson_id, completed_at")
        .eq("user_id", user.id),
    ]);

    isPremium =
      subscriptionRes.data?.tier === "premium" ||
      subscriptionRes.data?.tier === "lifetime";

    const allLessons = lessonsRes.data ?? [];
    const completedIds = new Set(
      (progressRes.data ?? [])
        .filter((p) => p.completed_at)
        .map((p) => p.lesson_id)
    );
    for (const l of allLessons) {
      lessonCountByUnit.set(
        l.unit_id,
        (lessonCountByUnit.get(l.unit_id) ?? 0) + 1
      );
      if (completedIds.has(l.id)) {
        completedByUnit.set(
          l.unit_id,
          (completedByUnit.get(l.unit_id) ?? 0) + 1
        );
      }
    }
  } else {
    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, unit_id")
      .eq("status", "published");
    for (const l of lessons ?? []) {
      lessonCountByUnit.set(
        l.unit_id,
        (lessonCountByUnit.get(l.unit_id) ?? 0) + 1
      );
    }
  }

  const grouped = (units ?? []).reduce<Record<string, Unit[]>>((acc, u) => {
    (acc[u.level] ??= []).push(u as Unit);
    return acc;
  }, {});

  const levelOrder: Unit["level"][] = ["A1", "A2", "B1", "B2", "C1"];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <Image
            src="/images/gothenburg-archipelago.jpg"
            alt="Gothenburg archipelago, west coast of Sweden"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/25 to-navy/70" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-28">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            The course
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            52 units. Five levels.
            <br />
            <span className="text-golden">One clear path to fluency.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            A structured course built on the CEFR framework, the same standard
            used by Swedish universities and SFI. Start at A1 and work through
            to C1, or place into the level that fits.
          </p>

          {!user && (
            <p className="mt-4 text-sm text-golden/80">
              The entire A1 level is free. No account required.
            </p>
          )}

          <div className="mt-10 flex items-center gap-6">
            <Link
              href="#levels"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/90"
            >
              Browse the course
            </Link>
            <div className="hidden items-center gap-4 text-sm text-white/40 sm:flex">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-golden" />
                A1–C1
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-golden" />
                140+ hours
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-golden" />
                Self-paced
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Course levels ── */}
      <section id="levels" className="bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-20">
          {/* Level overview strip */}
          <div className="mb-16 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {LEVELS.map((lv) => (
              <a
                key={lv.level}
                href={`#${lv.level}`}
                className="group rounded-xl border border-black/[0.04] bg-white px-4 py-4 transition hover:border-navy/10 hover:shadow-sm"
              >
                <p className="font-display text-2xl font-semibold text-navy">
                  {lv.level}
                </p>
                <p className="mt-0.5 text-xs font-medium text-charcoal/60">
                  {lv.label}
                </p>
                <p className="mt-2 text-xs text-charcoal/40">
                  {lv.units} units
                </p>
              </a>
            ))}
          </div>

          {/* Level sections */}
          {levelOrder.map((level) => {
            const levelUnits = grouped[level];
            if (!levelUnits?.length) return null;
            const meta = LEVELS.find((l) => l.level === level)!;
            return (
              <section key={level} id={level} className="mb-16 last:mb-0">
                {/* Level header */}
                <div className="mb-6 flex items-end justify-between border-b border-charcoal/[0.06] pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-3xl font-semibold text-navy">
                        {level}
                      </h2>
                      <span className="text-base text-charcoal/40">
                        {meta.label}
                      </span>
                      {level === "A1" && (
                        <span className="rounded border border-forest/20 bg-forest/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-forest">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-charcoal/50">
                      {meta.description}
                    </p>
                  </div>
                  <p className="hidden text-xs text-charcoal/30 sm:block">
                    {meta.units} units · ~{meta.hours}h
                  </p>
                </div>

                {/* Unit cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {levelUnits.map((unit) => (
                    <UnitCard
                      key={unit.id}
                      unit={unit}
                      isPremium={isPremium}
                      isSignedIn={!!user}
                      completed={completedByUnit.get(unit.id) ?? 0}
                      total={lessonCountByUnit.get(unit.id) ?? 0}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {(!units || units.length === 0) && (
            <div className="mt-12 rounded-xl border border-charcoal/[0.06] bg-white p-12 text-center">
              <p className="text-sm text-charcoal/50">
                Course content is being prepared. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
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
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to begin?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/60">
            Start with Unit 1 for free, no sign-up, no credit card. When
            you&rsquo;re ready for more, pick a plan that fits.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/learn/a1-1"
              className="rounded-full bg-golden px-8 py-3 text-sm font-semibold text-navy transition hover:bg-golden-dark"
            >
              Start Unit 1
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Unit card ── */

function UnitCard({
  unit,
  isPremium,
  isSignedIn,
  completed,
  total,
}: {
  unit: Unit;
  isPremium: boolean;
  isSignedIn: boolean;
  completed: number;
  total: number;
}) {
  const isFreeContent = unit.is_free || unit.level === "A1";
  const locked = !isFreeContent && !isPremium;
  const href = `/learn/${unit.level.toLowerCase()}-${unit.unit_number}`;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const allDone = total > 0 && completed === total;

  return (
    <Link
      href={href}
      className={`group relative block rounded-xl border bg-white p-6 transition-all duration-200 hover:shadow-md ${
        allDone
          ? "border-forest/15"
          : "border-charcoal/[0.06] hover:border-navy/15"
      }`}
    >
      {/* Top row: unit number + badge */}
      <div className="flex items-start justify-between">
        <span className="font-display text-sm font-semibold tracking-wide text-charcoal/30">
          {unit.level} · {String(unit.unit_number).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {allDone && (
            <span className="flex items-center gap-1 text-xs font-medium text-forest">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Complete
            </span>
          )}
          {locked && (
            <svg
              className="h-4 w-4 text-charcoal/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 font-display text-lg font-semibold text-navy group-hover:text-swedish-blue">
        {unit.title}
      </h3>
      {unit.title_sv && (
        <p className="mt-0.5 text-sm italic text-charcoal/40">
          {unit.title_sv}
        </p>
      )}

      {/* Description */}
      {unit.description && (
        <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
          {unit.description}
        </p>
      )}

      {/* Progress bar (signed in only) */}
      {isSignedIn && total > 0 && (
        <div className="mt-5 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-charcoal/[0.04]">
            <div
              className="h-full rounded-full bg-navy/50 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-charcoal/30">
            {completed}/{total}
          </span>
        </div>
      )}

      {/* Meta */}
      <p className="mt-3 text-xs text-charcoal/30">
        ~{unit.estimated_hours}h
        {total > 0 && !isSignedIn && ` · ${total} lessons`}
      </p>

      {/* Hover arrow */}
      <span className="absolute bottom-6 right-6 text-charcoal/0 transition-all duration-200 group-hover:text-navy/30">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </Link>
  );
}

/* ── Level metadata ── */

const LEVELS = [
  {
    level: "A1",
    label: "Absolute beginner",
    description:
      "Greetings, numbers, introductions, and the sounds of Swedish.",
    units: 10,
    hours: 20,
  },
  {
    level: "A2",
    label: "Elementary",
    description:
      "Everyday conversations, shopping, food, weather, and simple past tense.",
    units: 12,
    hours: 28,
  },
  {
    level: "B1",
    label: "Intermediate",
    description:
      "Express opinions, handle travel situations, write short texts with confidence.",
    units: 12,
    hours: 32,
  },
  {
    level: "B2",
    label: "Upper intermediate",
    description:
      "Follow Swedish media, discuss complex topics, work in Swedish.",
    units: 10,
    hours: 32,
  },
  {
    level: "C1",
    label: "Advanced",
    description:
      "Nuance, idiom, and formal register. Novels, film, and professional writing.",
    units: 8,
    hours: 28,
  },
];
