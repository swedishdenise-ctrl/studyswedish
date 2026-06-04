import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { parseUnitSlug } from "@/lib/learn/unit-slug";
import { isLessonFree } from "@/lib/learn/is-lesson-free";

type Params = { unitSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { unitSlug } = await params;
  const parsed = parseUnitSlug(unitSlug);
  if (!parsed) return { title: "Unit not found" };
  return { title: `${parsed.level} Unit ${parsed.number} — StudySwedish` };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { unitSlug } = await params;
  const parsed = parseUnitSlug(unitSlug);
  if (!parsed) notFound();

  const supabase = await createClient();

  const { data: unit } = await supabase
    .from("units")
    .select(
      "id, level, unit_number, title, title_sv, description, learning_objectives, icon_emoji, is_free, estimated_hours"
    )
    .eq("level", parsed.level)
    .eq("unit_number", parsed.number)
    .eq("status", "published")
    .maybeSingle();

  if (!unit) notFound();

  const { data: lessons } = await supabase
    .from("lessons")
    .select(
      "id, title, title_sv, slug, summary, is_free, estimated_minutes, order_index"
    )
    .eq("unit_id", unit.id)
    .eq("status", "published")
    .order("order_index", { ascending: true });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPremium = false;
  const completedLessonIds = new Set<string>();

  if (user) {
    const [subscriptionRes, progressRes] = await Promise.all([
      supabase
        .from("subscriptions")
        .select("tier")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("user_lesson_progress")
        .select("lesson_id, completed_at")
        .eq("user_id", user.id),
    ]);
    isPremium =
      subscriptionRes.data?.tier === "premium" ||
      subscriptionRes.data?.tier === "lifetime";
    for (const p of progressRes.data ?? []) {
      if (p.completed_at) completedLessonIds.add(p.lesson_id);
    }
  }

  const isFreeUnit = unit.is_free || unit.level === "A1";
  const unitLocked = !isFreeUnit && !isPremium;

  const completedInUnit = (lessons ?? []).filter((l) =>
    completedLessonIds.has(l.id)
  ).length;
  const totalInUnit = lessons?.length ?? 0;
  const progressPercent =
    totalInUnit > 0 ? Math.round((completedInUnit / totalInUnit) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/learn"
        className="text-sm text-charcoal/60 hover:text-swedish-blue"
      >
        &larr; All units
      </Link>

      <div className="mt-6 flex items-start gap-4">
        <div className="text-5xl">{unit.icon_emoji ?? "📘"}</div>
        <div>
          <p className="text-sm uppercase tracking-wide text-warm-gray">
            {unit.level} &middot; Unit {unit.unit_number}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {unit.title}
          </h1>
          {unit.title_sv && (
            <p className="mt-1 font-display text-lg italic text-swedish-blue">
              {unit.title_sv}
            </p>
          )}
        </div>
      </div>

      {unit.description && (
        <p className="mt-6 text-lg text-charcoal/80">{unit.description}</p>
      )}

      {unit.learning_objectives?.length > 0 && (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="font-display text-lg font-semibold">
            What you&rsquo;ll learn
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-charcoal/80">
            {unit.learning_objectives.map((obj: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-swedish-blue">&check;</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {unitLocked && (
        <div className="mt-8 rounded-2xl border border-golden/40 bg-golden/10 p-6">
          <h2 className="font-display text-lg font-semibold">
            This unit is premium
          </h2>
          <p className="mt-2 text-sm text-charcoal/80">
            The first 2 lessons are free to preview. Upgrade to unlock the rest
            of this unit and the full course.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-full bg-swedish-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
          >
            See pricing
          </Link>
        </div>
      )}

      {/* Unit progress — only show if signed in */}
      <div className="mt-10 flex items-baseline justify-between">
        <h2 className="font-display text-xl font-semibold">Lessons</h2>
        {user ? (
          <span className="text-sm text-warm-gray">
            {completedInUnit} of {totalInUnit} complete
          </span>
        ) : (
          <span className="text-sm text-warm-gray">
            {totalInUnit} {totalInUnit === 1 ? "lesson" : "lessons"}
          </span>
        )}
      </div>
      {user && (
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-forest/60 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <ol className="mt-6 space-y-2">
        {(lessons ?? []).map((lesson, i) => {
          const free = isLessonFree(lesson, unit);
          const locked = !free && !isPremium;
          const completed = completedLessonIds.has(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/learn/${unitSlug}/${lesson.slug}`}
                className={`group flex items-center justify-between rounded-xl border bg-white px-5 py-4 transition hover:border-swedish-blue/30 ${
                  completed ? "border-forest/20" : "border-black/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  {completed ? (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 text-sm text-forest">
                      &check;
                    </span>
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream text-sm font-medium text-charcoal/70">
                      {i + 1}
                    </span>
                  )}
                  <div>
                    <p
                      className={`font-medium ${completed ? "text-charcoal/70" : "text-charcoal"}`}
                    >
                      {lesson.title}
                    </p>
                    {lesson.title_sv && (
                      <p className="text-sm italic text-swedish-blue/80">
                        {lesson.title_sv}
                      </p>
                    )}
                    {lesson.summary && (
                      <p className="mt-1 text-sm text-charcoal/60">
                        {lesson.summary}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-warm-gray">
                  <span>{lesson.estimated_minutes} min</span>
                  {completed && (
                    <span className="rounded-full bg-forest/10 px-2 py-0.5 font-medium text-forest">
                      Done
                    </span>
                  )}
                  {locked && !completed && (
                    <span className="rounded-full bg-golden/20 px-2 py-0.5 font-medium text-charcoal">
                      Premium
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Soft sign-in prompt for signed-out users */}
      {!user && (
        <div className="mt-8 rounded-2xl border border-swedish-blue/20 bg-swedish-blue/5 p-6 text-center">
          <p className="font-display text-lg font-semibold text-charcoal">
            Want to track your progress?
          </p>
          <p className="mt-1 text-sm text-charcoal/60">
            Create a free account to save your progress and pick up where you
            left off.
          </p>
          <Link
            href="/auth/login"
            className="mt-4 inline-block rounded-full bg-swedish-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
          >
            Create free account
          </Link>
        </div>
      )}
    </div>
  );
}
