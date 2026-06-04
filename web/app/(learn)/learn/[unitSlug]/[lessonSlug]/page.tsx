import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { parseUnitSlug } from "@/lib/learn/unit-slug";
import { isLessonFree } from "@/lib/learn/is-lesson-free";
import { LessonContent } from "./lesson-content";
import { LessonExercises } from "./lesson-exercises";

type Params = { unitSlug: string; lessonSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lessonSlug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("lessons")
    .select("title, seo_title, seo_description, summary")
    .eq("slug", lessonSlug)
    .maybeSingle();
  if (!data) return { title: "Lesson not found" };
  return {
    title: data.seo_title ?? `${data.title} — StudySwedish`,
    description: data.seo_description ?? data.summary ?? undefined,
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { unitSlug, lessonSlug } = await params;
  const parsed = parseUnitSlug(unitSlug);
  if (!parsed) notFound();

  const supabase = await createClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select(
      "id, unit_id, title, title_sv, summary, content_md, is_free, estimated_minutes, order_index"
    )
    .eq("slug", lessonSlug)
    .eq("status", "published")
    .maybeSingle();

  if (!lesson) notFound();

  const { data: unit } = await supabase
    .from("units")
    .select("id, level, unit_number, title, is_free")
    .eq("id", lesson.unit_id)
    .maybeSingle();

  if (
    !unit ||
    unit.level !== parsed.level ||
    unit.unit_number !== parsed.number
  ) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isPremium = false;
  let alreadyCompleted = false;

  if (user) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("tier")
      .eq("user_id", user.id)
      .single();
    isPremium =
      subscription?.tier === "premium" || subscription?.tier === "lifetime";

    const { data: lessonProgress } = await supabase
      .from("user_lesson_progress")
      .select("completed_at")
      .eq("user_id", user.id)
      .eq("lesson_id", lesson.id)
      .maybeSingle();
    alreadyCompleted = !!lessonProgress?.completed_at;
  }

  const free = isLessonFree(lesson, unit);
  const locked = !free && !isPremium;

  const { data: siblings } = await supabase
    .from("lessons")
    .select("slug, title, order_index")
    .eq("unit_id", unit.id)
    .eq("status", "published")
    .order("order_index", { ascending: true });

  const { data: exercises } = locked
    ? { data: [] as never[] }
    : await supabase
        .from("exercises")
        .select(
          "id, exercise_type, instruction, instruction_sv, question_data, hint, xp_reward"
        )
        .eq("lesson_id", lesson.id)
        .order("order_index", { ascending: true });

  const currentIdx =
    siblings?.findIndex((s) => s.slug === lessonSlug) ?? -1;
  const prev = currentIdx > 0 ? siblings![currentIdx - 1] : null;
  const next =
    siblings && currentIdx >= 0 && currentIdx < siblings.length - 1
      ? siblings[currentIdx + 1]
      : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/learn/${unitSlug}`}
        className="text-sm text-charcoal/60 hover:text-swedish-blue"
      >
        &larr; {unit.title}
      </Link>

      <div className="mt-6">
        <p className="text-sm uppercase tracking-wide text-warm-gray">
          {unit.level} &middot; Unit {unit.unit_number} &middot; Lesson{" "}
          {lesson.order_index}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
          {lesson.title}
        </h1>
        {lesson.title_sv && (
          <p className="mt-2 font-display text-lg italic text-swedish-blue">
            {lesson.title_sv}
          </p>
        )}
        <p className="mt-4 text-sm text-warm-gray">
          ~{lesson.estimated_minutes} min
        </p>
      </div>

      {locked ? (
        <div className="mt-10 rounded-2xl border border-golden/40 bg-golden/10 p-8">
          <h2 className="font-display text-xl font-semibold">
            This lesson is part of Premium
          </h2>
          <p className="mt-2 text-charcoal/80">
            {lesson.summary ??
              "Unlock this lesson and the rest of the course with a Premium subscription."}
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-full bg-swedish-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
          >
            See pricing
          </Link>
        </div>
      ) : (
        <>
          <LessonContent markdown={lesson.content_md ?? ""} />
          <LessonExercises
            lessonId={lesson.id}
            exercises={(exercises ?? []) as never}
            alreadyCompleted={alreadyCompleted}
            isSignedIn={!!user}
          />
        </>
      )}

      <nav className="mt-16 flex items-center justify-between border-t border-black/5 pt-6 text-sm">
        {prev ? (
          <Link
            href={`/learn/${unitSlug}/${prev.slug}`}
            className="text-charcoal/70 hover:text-swedish-blue"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${unitSlug}/${next.slug}`}
            className="text-right text-charcoal/70 hover:text-swedish-blue"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <Link
            href={`/learn/${unitSlug}`}
            className="text-right text-charcoal/70 hover:text-swedish-blue"
          >
            Back to unit &rarr;
          </Link>
        )}
      </nav>
    </div>
  );
}
