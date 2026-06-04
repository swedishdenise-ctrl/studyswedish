"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { submitAttempt, completeLesson } from "@/lib/learn/actions";

type Exercise = {
  id: string;
  exercise_type: string;
  instruction: string;
  instruction_sv: string | null;
  question_data: Record<string, unknown>;
  hint: string | null;
  xp_reward: number;
};

type Feedback = {
  correct: boolean;
  explanation: string | null;
  xpEarned: number;
};

export function LessonExercises({
  lessonId,
  exercises,
  alreadyCompleted,
  isSignedIn,
}: {
  lessonId: string;
  exercises: Exercise[];
  alreadyCompleted: boolean;
  isSignedIn: boolean;
}) {
  const [queue, setQueue] = useState<Exercise[]>(exercises);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [xpTotal, setXpTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [retryCount, setRetryCount] = useState(0);

  if (exercises.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-black/5 bg-white p-6">
        <h2 className="font-display text-xl font-semibold">Practice</h2>
        <p className="mt-2 text-sm text-charcoal/70">
          No exercises for this lesson yet.
        </p>
        {isSignedIn && (
          <MarkCompleteButton
            lessonId={lessonId}
            alreadyCompleted={alreadyCompleted}
          />
        )}
      </div>
    );
  }

  const exercise = queue[index];
  const isLast = index === queue.length - 1;
  const isRetry = index >= exercises.length;
  const progress = Math.min(
    Math.round(((index + 1) / queue.length) * 100),
    100
  );

  function handleSubmit() {
    if (!answer.trim() || isPending) return;

    if (isSignedIn) {
      // Signed in — save attempt to DB
      startTransition(async () => {
        const result = await submitAttempt(exercise.id, answer);
        if (!result.ok) {
          alert(result.error);
          return;
        }
        if (!result.correct) {
          setQueue((q) => [...q, exercise]);
          setRetryCount((c) => c + 1);
        }
        setFeedback({
          correct: result.correct,
          explanation: result.explanation,
          xpEarned: result.xpEarned,
        });
        setXpTotal((x) => x + result.xpEarned);
      });
    } else {
      // Signed out — check locally, don't save
      const correct = checkAnswerLocally(exercise, answer);
      if (!correct) {
        setQueue((q) => [...q, exercise]);
        setRetryCount((c) => c + 1);
      }
      setFeedback({
        correct,
        explanation: null,
        xpEarned: 0,
      });
    }
  }

  function handleNext() {
    setFeedback(null);
    setAnswer("");
    if (isLast) {
      if (isSignedIn) {
        startTransition(async () => {
          await completeLesson(lessonId);
          setDone(true);
        });
      } else {
        setDone(true);
      }
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (done) {
    return (
      <div className="mt-12 space-y-6">
        <div className="rounded-2xl border border-forest/30 bg-forest/5 p-8 text-center">
          <p className="text-4xl">🎉</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-forest">
            Bra jobbat!
          </h2>
          {isSignedIn ? (
            <p className="mt-2 text-charcoal/70">
              Lesson complete — you earned {xpTotal} XP.
            </p>
          ) : (
            <p className="mt-2 text-charcoal/70">
              You finished all the exercises!
            </p>
          )}
          {retryCount > 0 && (
            <p className="mt-1 text-sm text-charcoal/50">
              You retried {retryCount}{" "}
              {retryCount === 1 ? "question" : "questions"} and got{" "}
              {retryCount === 1 ? "it" : "them"} right!
            </p>
          )}
        </div>

        {/* Soft sign-in prompt for signed-out users */}
        {!isSignedIn && (
          <div className="rounded-2xl border border-swedish-blue/20 bg-swedish-blue/5 p-6 text-center">
            <p className="font-display text-lg font-semibold text-charcoal">
              Want to save your progress?
            </p>
            <p className="mt-1 text-sm text-charcoal/60">
              Create a free account to track which lessons you&apos;ve finished,
              earn XP, and pick up where you left off.
            </p>
            <Link
              href="/auth/login"
              className="mt-4 inline-block rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
            >
              Create free account
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-xl font-semibold">Practice</h2>
        <span className="text-sm text-warm-gray">
          Question {index + 1} of {queue.length}
        </span>
      </div>

      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full bg-swedish-blue transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-2xl border border-black/5 bg-white p-6">
        {isRetry && (
          <p className="mb-3 rounded-lg bg-golden/10 px-3 py-1.5 text-xs font-medium text-golden-dark">
            Let&apos;s try this one again
          </p>
        )}

        <p className="text-charcoal">{exercise.instruction}</p>
        {exercise.instruction_sv && (
          <p className="mt-1 text-sm italic text-swedish-blue/80">
            {exercise.instruction_sv}
          </p>
        )}

        <div className="mt-5">
          {exercise.question_data.dialogue ? (
            <Conversation
              dialogue={(exercise.question_data.dialogue as string[]) ?? []}
              blankIndex={(exercise.question_data.blank_index as number) ?? 0}
              options={(exercise.question_data.options as string[]) ?? []}
              selected={answer}
              onSelect={setAnswer}
              disabled={!!feedback}
            />
          ) : exercise.exercise_type === "multiple_choice" ? (
            <MultipleChoice
              options={(exercise.question_data.options as string[]) ?? []}
              selected={answer}
              onSelect={setAnswer}
              disabled={!!feedback}
            />
          ) : exercise.exercise_type === "fill_blank" ? (
            <FillBlank
              sentence={(exercise.question_data.sentence as string) ?? ""}
              value={answer}
              onChange={setAnswer}
              disabled={!!feedback}
            />
          ) : exercise.exercise_type === "translation" ? (
            <Translation
              source={(exercise.question_data.source as string) ?? ""}
              direction={
                (exercise.question_data.direction as string) ?? "en_to_sv"
              }
              value={answer}
              onChange={setAnswer}
              disabled={!!feedback}
            />
          ) : exercise.exercise_type === "matching" ? (
            <Matching
              pairs={
                (exercise.question_data.pairs as {
                  left: string;
                  right: string;
                }[]) ?? []
              }
              value={answer}
              onChange={setAnswer}
              disabled={!!feedback}
            />
          ) : exercise.exercise_type === "drag_drop" ? (
            <Ordering
              words={(exercise.question_data.words as string[]) ?? []}
              hint={(exercise.question_data.hint as string) ?? ""}
              value={answer}
              onChange={setAnswer}
              disabled={!!feedback}
            />
          ) : (
            <p className="text-sm text-warm-gray">
              [Exercise type &ldquo;{exercise.exercise_type}&rdquo; not yet
              supported]
            </p>
          )}
        </div>

        {feedback && (
          <div
            className={`mt-5 rounded-xl p-4 text-sm ${
              feedback.correct
                ? "bg-forest/10 text-forest"
                : "bg-coral/10 text-coral"
            }`}
          >
            <p className="font-medium">
              {feedback.correct
                ? "✓ Correct!"
                : "✗ Not quite — this will come back later."}
              {feedback.xpEarned > 0 && (
                <span className="ml-2 text-xs font-normal opacity-80">
                  +{feedback.xpEarned} XP
                </span>
              )}
            </p>
            {feedback.explanation && (
              <p className="mt-1 text-charcoal/80">{feedback.explanation}</p>
            )}
          </div>
        )}

        <div className="mt-5 flex justify-end">
          {feedback ? (
            <button
              onClick={handleNext}
              disabled={isPending}
              className="rounded-full bg-swedish-blue px-6 py-2 text-sm font-medium text-white transition hover:bg-swedish-blue-dark disabled:opacity-50"
            >
              {isLast ? "Finish lesson" : "Next question"}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!answer.trim() || isPending}
              className="rounded-full bg-swedish-blue px-6 py-2 text-sm font-medium text-white transition hover:bg-swedish-blue-dark disabled:opacity-50"
            >
              {isPending ? "Checking…" : "Check answer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Client-side answer checking for signed-out users.
 * Uses the correct_answer embedded in question_data.
 */
function checkAnswerLocally(exercise: Exercise, answer: string): boolean {
  const correctRaw = exercise.question_data.correct_answer;
  if (!correctRaw) return false;

  const norm = (v: string) =>
    v
      .trim()
      .toLowerCase()
      .replace(/^"|"$/g, "")
      .replace(/\s+/g, " ");

  switch (exercise.exercise_type) {
    case "multiple_choice":
      return norm(answer) === norm(String(correctRaw));

    case "fill_blank":
    case "translation": {
      if (typeof correctRaw === "object" && correctRaw !== null && "answer" in correctRaw) {
        const obj = correctRaw as { answer: string; alternatives?: string[] };
        return [obj.answer, ...(obj.alternatives ?? [])].some(
          (a) => norm(answer) === norm(String(a))
        );
      }
      return norm(answer) === norm(String(correctRaw));
    }

    case "matching": {
      try {
        const userPairs: [string, string][] = JSON.parse(answer);
        const correctPairs: [string, string][] = Array.isArray(correctRaw)
          ? correctRaw
          : (correctRaw as { pairs: [string, string][] }).pairs;
        const sortPairs = (pairs: [string, string][]) =>
          pairs
            .map(([a, b]) => [norm(a), norm(b)] as [string, string])
            .sort((a, b) => a[0].localeCompare(b[0]));
        return (
          JSON.stringify(sortPairs(userPairs)) ===
          JSON.stringify(sortPairs(correctPairs))
        );
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
          userOrder.every((w, i) => norm(w) === norm(correctOrder[i]))
        );
      } catch {
        return false;
      }
    }

    default:
      return norm(answer) === norm(String(correctRaw));
  }
}

function MultipleChoice({
  options,
  selected,
  onSelect,
  disabled,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(opt)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
              isSelected
                ? "border-swedish-blue bg-swedish-blue/5 text-charcoal"
                : "border-black/10 bg-white text-charcoal hover:border-swedish-blue/40"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function FillBlank({
  sentence,
  value,
  onChange,
  disabled,
}: {
  sentence: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <p className="mb-3 font-display text-lg text-charcoal">{sentence}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your answer"
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-swedish-blue disabled:opacity-70"
        autoFocus
      />
    </div>
  );
}

function Translation({
  source,
  direction,
  value,
  onChange,
  disabled,
}: {
  source: string;
  direction: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const label =
    direction === "sv_to_en"
      ? "Translate to English:"
      : "Translate to Swedish:";
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-warm-gray">
        {label}
      </p>
      <p className="mb-3 font-display text-lg text-charcoal">{source}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Type your translation"
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-swedish-blue disabled:opacity-70"
        autoFocus
      />
    </div>
  );
}

function Matching({
  pairs,
  value,
  onChange,
  disabled,
}: {
  pairs: { left: string; right: string }[];
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<[string, string][]>([]);
  const [shuffledRight] = useState(() =>
    pairs.map((p) => p.right).sort(() => Math.random() - 0.5)
  );

  const matchedLefts = new Set(matched.map(([l]) => l));
  const matchedRights = new Set(matched.map(([, r]) => r));

  function handleLeftClick(item: string) {
    if (disabled || matchedLefts.has(item)) return;
    setSelectedLeft(item);
  }

  function handleRightClick(item: string) {
    if (disabled || matchedRights.has(item) || !selectedLeft) return;
    const newMatched = [...matched, [selectedLeft, item] as [string, string]];
    setMatched(newMatched);
    setSelectedLeft(null);
    onChange(JSON.stringify(newMatched));
  }

  function handleUndo() {
    if (disabled || matched.length === 0) return;
    const newMatched = matched.slice(0, -1);
    setMatched(newMatched);
    onChange(newMatched.length > 0 ? JSON.stringify(newMatched) : "");
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {pairs.map((p) => {
            const isMatched = matchedLefts.has(p.left);
            const isSelected = selectedLeft === p.left;
            return (
              <button
                key={p.left}
                type="button"
                disabled={disabled || isMatched}
                onClick={() => handleLeftClick(p.left)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isMatched
                    ? "border-forest/30 bg-forest/5 text-forest"
                    : isSelected
                      ? "border-swedish-blue bg-swedish-blue/5 text-charcoal"
                      : "border-black/10 bg-white text-charcoal hover:border-swedish-blue/40"
                } disabled:cursor-default`}
              >
                {p.left}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((item) => {
            const isMatched = matchedRights.has(item);
            return (
              <button
                key={item}
                type="button"
                disabled={disabled || isMatched || !selectedLeft}
                onClick={() => handleRightClick(item)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isMatched
                    ? "border-forest/30 bg-forest/5 text-forest"
                    : "border-black/10 bg-white text-charcoal hover:border-swedish-blue/40"
                } disabled:cursor-default disabled:opacity-60`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      {matched.length > 0 && !disabled && (
        <button
          type="button"
          onClick={handleUndo}
          className="mt-3 text-xs text-charcoal/50 hover:text-swedish-blue"
        >
          Undo last match
        </button>
      )}
    </div>
  );
}

function Ordering({
  words,
  hint,
  value,
  onChange,
  disabled,
}: {
  words: string[];
  hint: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const [placed, setPlaced] = useState<string[]>([]);
  const [scrambled] = useState(() =>
    [...words].sort(() => Math.random() - 0.5)
  );

  function handleAdd(word: string) {
    if (disabled) return;
    const newPlaced = [...placed, word];
    setPlaced(newPlaced);
    onChange(JSON.stringify(newPlaced));
  }

  function handleRemove(idx: number) {
    if (disabled) return;
    const newPlaced = placed.filter((_, i) => i !== idx);
    setPlaced(newPlaced);
    onChange(newPlaced.length > 0 ? JSON.stringify(newPlaced) : "");
  }

  const usedIndices = new Set<number>();
  for (const word of placed) {
    const idx = scrambled.findIndex(
      (w, i) => w === word && !usedIndices.has(i)
    );
    if (idx >= 0) usedIndices.add(idx);
  }

  return (
    <div>
      {hint && (
        <p className="mb-3 text-sm text-charcoal/60">Hint: {hint}</p>
      )}
      <div className="mb-4 min-h-[52px] rounded-xl border border-dashed border-black/15 bg-cream/50 px-4 py-3">
        {placed.length === 0 ? (
          <p className="text-sm text-charcoal/40">
            Tap the words below to build the sentence
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {placed.map((word, i) => (
              <button
                key={`${word}-${i}`}
                type="button"
                disabled={disabled}
                onClick={() => handleRemove(i)}
                className="rounded-lg border border-swedish-blue/30 bg-swedish-blue/5 px-3 py-1.5 text-sm font-medium text-charcoal transition hover:border-coral/30 hover:bg-coral/10 disabled:cursor-default"
              >
                {word}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {scrambled.map((word, i) => {
          const used = usedIndices.has(i);
          return (
            <button
              key={`${word}-${i}`}
              type="button"
              disabled={disabled || used}
              onClick={() => handleAdd(word)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                used
                  ? "border-black/5 bg-cream/50 text-charcoal/30"
                  : "border-black/10 bg-white text-charcoal hover:border-swedish-blue/40 hover:bg-swedish-blue/5"
              } disabled:cursor-default`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Conversation({
  dialogue,
  blankIndex,
  options,
  selected,
  onSelect,
  disabled,
}: {
  dialogue: string[];
  blankIndex: number;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <div className="mb-4 space-y-2 rounded-xl bg-cream/50 p-4">
        {dialogue.map((line, i) => {
          const isBlank = i === blankIndex;
          const speaker = i % 2 === 0 ? "A" : "B";
          return (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                speaker === "B" ? "flex-row-reverse text-right" : ""
              }`}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-swedish-blue/10 text-xs font-medium text-swedish-blue">
                {speaker}
              </span>
              {isBlank ? (
                <span className="rounded-lg border-2 border-dashed border-swedish-blue/30 bg-white px-3 py-1.5 text-sm font-medium text-swedish-blue">
                  {selected || "???"}
                </span>
              ) : (
                <span className="rounded-lg bg-white px-3 py-1.5 text-sm text-charcoal">
                  {line}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-warm-gray">
        Choose the right response:
      </p>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(opt)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? "border-swedish-blue bg-swedish-blue/5 text-charcoal"
                  : "border-black/10 bg-white text-charcoal hover:border-swedish-blue/40"
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MarkCompleteButton({
  lessonId,
  alreadyCompleted,
}: {
  lessonId: string;
  alreadyCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [isPending, startTransition] = useTransition();
  if (completed) {
    return (
      <p className="mt-4 text-sm text-forest">
        &check; Lesson marked as complete.
      </p>
    );
  }
  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await completeLesson(lessonId);
          setCompleted(true);
        })
      }
      disabled={isPending}
      className="mt-4 rounded-full bg-swedish-blue px-5 py-2 text-sm font-medium text-white transition hover:bg-swedish-blue-dark disabled:opacity-50"
    >
      {isPending ? "Saving…" : "Mark as complete"}
    </button>
  );
}
