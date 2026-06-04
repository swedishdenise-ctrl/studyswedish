"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitAttemptResult =
  | { ok: true; correct: boolean; explanation: string | null; xpEarned: number }
  | { ok: false; error: string };

export async function submitAttempt(
  exerciseId: string,
  answer: string
): Promise<SubmitAttemptResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { data: exercise, error: exErr } = await supabase
    .from("exercises")
    .select("id, exercise_type, correct_answer, explanation, xp_reward")
    .eq("id", exerciseId)
    .maybeSingle();

  if (exErr || !exercise) return { ok: false, error: "Exercise not found" };

  const correctRaw = exercise.correct_answer;
  const correct = checkAnswer(exercise.exercise_type, answer, correctRaw);
  const xpEarned = correct ? (exercise.xp_reward ?? 0) : 0;

  const { error: insertErr } = await supabase
    .from("user_exercise_attempts")
    .insert({
      user_id: user.id,
      exercise_id: exerciseId,
      answer_data: { answer },
      is_correct: correct,
      xp_earned: xpEarned,
    });

  if (insertErr) return { ok: false, error: insertErr.message };

  if (xpEarned > 0) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("total_xp, total_exercises_completed")
      .eq("id", user.id)
      .single();
    await supabase
      .from("profiles")
      .update({
        total_xp: (profile?.total_xp ?? 0) + xpEarned,
        total_exercises_completed:
          (profile?.total_exercises_completed ?? 0) + 1,
      })
      .eq("id", user.id);
  }

  return {
    ok: true,
    correct,
    explanation: exercise.explanation,
    xpEarned,
  };
}

export async function completeLesson(lessonId: string): Promise<
  { ok: true; alreadyCompleted: boolean } | { ok: false; error: string }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { data: existing } = await supabase
    .from("user_lesson_progress")
    .select("id, completed_at")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existing?.completed_at) {
    return { ok: true, alreadyCompleted: true };
  }

  if (existing) {
    await supabase
      .from("user_lesson_progress")
      .update({ completed_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("user_lesson_progress").insert({
      user_id: user.id,
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
    });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("total_lessons_completed")
    .eq("id", user.id)
    .single();
  await supabase
    .from("profiles")
    .update({
      total_lessons_completed: (profile?.total_lessons_completed ?? 0) + 1,
    })
    .eq("id", user.id);

  return { ok: true, alreadyCompleted: false };
}

function checkAnswer(
  exerciseType: string,
  answer: string,
  correctRaw: unknown
): boolean {
  switch (exerciseType) {
    case "multiple_choice": {
      const correctValue =
        typeof correctRaw === "string" ? correctRaw : String(correctRaw);
      return normalise(answer) === normalise(correctValue);
    }

    case "fill_blank":
    case "translation": {
      // Both support { answer, alternatives } or a plain string
      if (
        typeof correctRaw === "object" &&
        correctRaw !== null &&
        "answer" in correctRaw
      ) {
        const obj = correctRaw as { answer: string; alternatives?: string[] };
        const acceptable = [obj.answer, ...(obj.alternatives ?? [])];
        return acceptable.some(
          (a) => normalise(answer) === normalise(String(a))
        );
      }
      return normalise(answer) === normalise(String(correctRaw));
    }

    case "matching": {
      try {
        const userPairs: [string, string][] = JSON.parse(answer);
        const correctPairs: [string, string][] = Array.isArray(correctRaw)
          ? correctRaw
          : (correctRaw as { pairs: [string, string][] }).pairs;
        const norm = (pairs: [string, string][]) =>
          pairs
            .map(([a, b]) => [normalise(a), normalise(b)] as [string, string])
            .sort((a, b) => a[0].localeCompare(b[0]));
        return JSON.stringify(norm(userPairs)) === JSON.stringify(norm(correctPairs));
      } catch {
        return false;
      }
    }

    case "drag_drop":
    case "ordering": {
      try {
        const userOrder: string[] = JSON.parse(answer);
        const correctOrder: string[] = Array.isArray(correctRaw)
          ? correctRaw
          : (correctRaw as { answer: string[] }).answer;
        return (
          userOrder.length === correctOrder.length &&
          userOrder.every(
            (w, i) => normalise(w) === normalise(correctOrder[i])
          )
        );
      } catch {
        return false;
      }
    }

    default: {
      const correctValue =
        typeof correctRaw === "string"
          ? correctRaw
          : JSON.stringify(correctRaw);
      return normalise(answer) === normalise(correctValue);
    }
  }
}

function normalise(v: string): string {
  return v
    .trim()
    .toLowerCase()
    .replace(/^"|"$/g, "")
    .replace(/\s+/g, " ");
}
