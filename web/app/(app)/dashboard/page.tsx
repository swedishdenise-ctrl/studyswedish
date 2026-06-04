import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard — StudySwedish" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Parallel queries for speed
  const [profileRes, subscriptionRes, unitsRes, progressRes] =
    await Promise.all([
      supabase
        .from("profiles")
        .select(
          "display_name, current_level, streak_count, total_xp, total_lessons_completed, total_exercises_completed, created_at"
        )
        .eq("id", user!.id)
        .single(),
      supabase
        .from("subscriptions")
        .select("tier, status")
        .eq("user_id", user!.id)
        .single(),
      supabase
        .from("units")
        .select(
          "id, level, unit_number, title, title_sv, icon_emoji, is_free, order_index"
        )
        .eq("status", "published")
        .order("order_index", { ascending: true }),
      supabase
        .from("user_lesson_progress")
        .select("lesson_id, completed_at")
        .eq("user_id", user!.id),
    ]);

  const profile = profileRes.data;
  const subscription = subscriptionRes.data;
  const units = unitsRes.data ?? [];
  const completedLessonIds = new Set(
    (progressRes.data ?? [])
      .filter((p) => p.completed_at)
      .map((p) => p.lesson_id)
  );

  // Get all published lessons so we can find the next one
  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, unit_id, title, title_sv, slug, summary, is_free, estimated_minutes, order_index")
    .eq("status", "published")
    .order("order_index", { ascending: true });

  // Group lessons by unit, preserving unit order
  const lessonsByUnit = new Map<string, typeof allLessons>();
  for (const unit of units) {
    lessonsByUnit.set(
      unit.id,
      (allLessons ?? []).filter((l) => l.unit_id === unit.id)
    );
  }

  // Find the next incomplete lesson (first lesson not yet completed, in unit order)
  let nextLesson: (typeof allLessons extends (infer T)[] | null ? T : never) | null = null;
  let nextUnit: (typeof units)[number] | null = null;
  for (const unit of units) {
    const unitLessons = lessonsByUnit.get(unit.id) ?? [];
    for (const lesson of unitLessons) {
      if (!completedLessonIds.has(lesson.id)) {
        nextLesson = lesson;
        nextUnit = unit;
        break;
      }
    }
    if (nextLesson) break;
  }

  // Get recently completed lessons (last 3)
  const { data: recentProgress } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id, completed_at")
    .eq("user_id", user!.id)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false })
    .limit(3);

  const recentLessonIds = (recentProgress ?? []).map((p) => p.lesson_id);
  const recentLessons = (allLessons ?? []).filter((l) =>
    recentLessonIds.includes(l.id)
  );
  // Maintain completion order
  const recentLessonsSorted = recentLessonIds
    .map((id) => recentLessons.find((l) => l.id === id))
    .filter(Boolean) as NonNullable<(typeof recentLessons)[number]>[];

  // Calculate overall progress
  const totalLessons = allLessons?.length ?? 0;
  const completedCount = completedLessonIds.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Build unit slug helper
  function unitSlug(unit: { level: string; unit_number: number }) {
    return `${unit.level.toLowerCase()}-${unit.unit_number}`;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Your dashboard
      </h1>
      <p className="mt-3 text-charcoal/70">
        Welcome back, {profile?.display_name || user!.email}.
      </p>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Level" value={profile?.current_level ?? "A1"} />
        <Stat label="Streak" value={`${profile?.streak_count ?? 0} days`} />
        <Stat label="XP" value={String(profile?.total_xp ?? 0)} />
        <Stat
          label="Plan"
          value={subscription?.tier ? capitalize(subscription.tier) : "Free"}
        />
      </div>

      {/* Continue learning */}
      {nextLesson && nextUnit && (
        <div className="mt-10 rounded-2xl border border-swedish-blue/20 bg-white p-6">
          <h2 className="font-display text-xl font-semibold">
            Continue learning
          </h2>
          <div className="mt-4 flex items-start gap-4">
            <div className="text-4xl">{nextUnit.icon_emoji ?? "📘"}</div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-warm-gray">
                {nextUnit.level} · Unit {nextUnit.unit_number}: {nextUnit.title}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-charcoal">
                {nextLesson.title}
              </h3>
              {nextLesson.title_sv && (
                <p className="mt-0.5 text-sm italic text-swedish-blue/80">
                  {nextLesson.title_sv}
                </p>
              )}
              {nextLesson.summary && (
                <p className="mt-2 text-sm text-charcoal/70">
                  {nextLesson.summary}
                </p>
              )}
              <Link
                href={`/learn/${unitSlug(nextUnit)}/${nextLesson.slug}`}
                className="mt-4 inline-block rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
              >
                Start lesson · {nextLesson.estimated_minutes} min
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Overall progress */}
      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold">
            Course progress
          </h2>
          <span className="text-sm text-warm-gray">
            {completedCount} of {totalLessons} lessons
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-swedish-blue transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-charcoal/60">
          {progressPercent}% complete
        </p>

        {/* Per-unit breakdown */}
        <div className="mt-6 space-y-3">
          {units.map((unit) => {
            const unitLessons = lessonsByUnit.get(unit.id) ?? [];
            const unitCompleted = unitLessons.filter((l) =>
              completedLessonIds.has(l.id)
            ).length;
            const unitTotal = unitLessons.length;
            const unitPercent =
              unitTotal > 0
                ? Math.round((unitCompleted / unitTotal) * 100)
                : 0;

            return (
              <Link
                key={unit.id}
                href={`/learn/${unitSlug(unit)}`}
                className="group flex items-center gap-4 rounded-xl px-3 py-2 transition hover:bg-cream"
              >
                <span className="text-2xl">{unit.icon_emoji ?? "📘"}</span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-medium text-charcoal group-hover:text-swedish-blue">
                      {unit.level} Unit {unit.unit_number}: {unit.title}
                    </p>
                    <span className="text-xs text-warm-gray">
                      {unitCompleted}/{unitTotal}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cream">
                    <div
                      className="h-full rounded-full bg-forest/60 transition-all"
                      style={{ width: `${unitPercent}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recently completed */}
      {recentLessonsSorted.length > 0 && (
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="font-display text-xl font-semibold">
            Recently completed
          </h2>
          <ul className="mt-4 space-y-3">
            {recentLessonsSorted.map((lesson) => {
              const lessonUnit = units.find((u) => u.id === lesson.unit_id);
              const completedAt = (recentProgress ?? []).find(
                (p) => p.lesson_id === lesson.id
              )?.completed_at;

              return (
                <li key={lesson.id}>
                  <Link
                    href={
                      lessonUnit
                        ? `/learn/${unitSlug(lessonUnit)}/${lesson.slug}`
                        : "#"
                    }
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-cream"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 text-forest text-sm">
                      ✓
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal group-hover:text-swedish-blue">
                        {lesson.title}
                      </p>
                      {lessonUnit && (
                        <p className="text-xs text-warm-gray">
                          {lessonUnit.level} · Unit {lessonUnit.unit_number}
                        </p>
                      )}
                    </div>
                    {completedAt && (
                      <span className="text-xs text-warm-gray">
                        {formatRelativeDate(completedAt)}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <QuickLink href="/learn" title="All units" description="Browse the full course" />
        <QuickLink href="/grammar" title="Grammar" description="Reference guides" />
        <QuickLink href="/recipes" title="Recipes" description="Cook in Swedish" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-warm-gray">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-charcoal">
        {value}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-black/5 bg-white p-5 transition hover:border-swedish-blue/30 hover:shadow-sm"
    >
      <p className="font-display text-lg font-semibold text-charcoal">
        {title}
      </p>
      <p className="mt-1 text-sm text-charcoal/60">{description}</p>
    </Link>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
