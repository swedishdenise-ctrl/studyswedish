"use client";

import { useState, useMemo, useCallback } from "react";
import { SignupNudge } from "@/components/signup-nudge";

// ── Types ──

export type FillBlankExercise = {
  kind: "fill-blank";
  prompt: string; // sentence with ___ for the blank
  answer: string;
  distractors: string[];
  explanation: string;
};

export type MultipleChoiceExercise = {
  kind: "multiple-choice";
  question: string;
  answer: string;
  distractors: string[];
  explanation: string;
};

export type ReorderExercise = {
  kind: "reorder";
  prompt: string; // e.g. "Put these words in the correct order:"
  words: string[]; // the correct order
  explanation: string;
};

export type Exercise =
  | FillBlankExercise
  | MultipleChoiceExercise
  | ReorderExercise;

// ── Main component ──

export function GrammarExercises({ exercises }: { exercises: Exercise[] }) {
  const ROUND_SIZE = Math.min(6, exercises.length);

  const [batch, setBatch] = useState(() => pickRandom(exercises, ROUND_SIZE));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  const restart = useCallback(() => {
    setBatch(pickRandom(exercises, ROUND_SIZE));
    setIdx(0);
    setScore(0);
    setDone(false);
  }, [exercises, ROUND_SIZE]);

  const handleCorrect = () => setScore((s) => s + 1);

  const handleNext = () => {
    if (idx < batch.length - 1) {
      setIdx((i) => i + 1);
    } else {
      setTotal((t) => t + batch.length);
      setDone(true);
    }
  };

  if (exercises.length === 0) return null;

  if (done) {
    const pct = Math.round((score / batch.length) * 100);
    return (
      <section className="mt-16 border-t border-black/5 pt-8">
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
            <p className="text-5xl">
              {pct === 100 ? "🎉" : pct >= 60 ? "👏" : "💪"}
            </p>
            <p className="mt-4 font-display text-2xl font-semibold text-charcoal">
              {score} out of {batch.length}
            </p>
            <p className="mt-2 text-charcoal/60">
              {pct === 100
                ? "Perfekt! You've got this grammar rule down."
                : pct >= 60
                  ? "Bra jobbat! A couple more rounds will lock this in."
                  : "Keep practising — grammar needs repetition to stick."}
            </p>
            <p className="mt-1 text-sm text-warm-gray">
              {total + batch.length} exercises this session
            </p>
            <button
              onClick={restart}
              className="mt-6 rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
            >
              Practice again
            </button>
          </div>
          <SignupNudge practiceCount={total + batch.length} threshold={12} />
        </div>
      </section>
    );
  }

  const exercise = batch[idx];

  return (
    <section className="mt-16 border-t border-black/5 pt-8">
      <h2 className="font-display text-2xl font-semibold">Practice</h2>
      <p className="mt-1 text-sm text-charcoal/60">
        Test yourself — {batch.length} quick exercises on this topic.
      </p>

      {/* Progress */}
      <div className="mt-6 flex justify-center gap-1.5">
        {batch.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === idx
                ? "bg-coral"
                : i < idx
                  ? "bg-coral/30"
                  : "bg-black/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-warm-gray">
        {idx + 1} of {batch.length}
      </p>

      <div className="mt-4">
        {exercise.kind === "fill-blank" && (
          <FillBlank
            key={idx}
            exercise={exercise}
            onCorrect={handleCorrect}
            onNext={handleNext}
          />
        )}
        {exercise.kind === "multiple-choice" && (
          <MultipleChoice
            key={idx}
            exercise={exercise}
            onCorrect={handleCorrect}
            onNext={handleNext}
          />
        )}
        {exercise.kind === "reorder" && (
          <Reorder
            key={idx}
            exercise={exercise}
            onCorrect={handleCorrect}
            onNext={handleNext}
          />
        )}
      </div>
    </section>
  );
}

// ── Fill-in-the-blank ──

function FillBlank({
  exercise,
  onCorrect,
  onNext,
}: {
  exercise: FillBlankExercise;
  onCorrect: () => void;
  onNext: () => void;
}) {
  const options = useMemo(
    () =>
      [exercise.answer, ...exercise.distractors].sort(
        () => Math.random() - 0.5
      ),
    [exercise]
  );
  const [chosen, setChosen] = useState<string | null>(null);

  const handlePick = (answer: string) => {
    if (chosen) return;
    setChosen(answer);
    if (answer === exercise.answer) onCorrect();
  };

  // Split prompt on ___
  const parts = exercise.prompt.split("___");

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-charcoal/50">Fill in the blank:</p>
        <p className="mt-3 font-display text-xl font-semibold text-charcoal">
          {parts[0]}
          <span
            className={`inline-block min-w-[4ch] rounded border-b-2 px-1 ${
              chosen
                ? chosen === exercise.answer
                  ? "border-forest bg-forest/10 text-forest"
                  : "border-coral bg-coral/10 text-coral"
                : "border-swedish-blue/40 text-swedish-blue"
            }`}
          >
            {chosen ?? "___"}
          </span>
          {parts[1] ?? ""}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const isCorrect = opt === exercise.answer;
          const isChosen = opt === chosen;

          let style =
            "border-black/10 bg-white text-charcoal hover:border-swedish-blue/30";
          if (chosen) {
            if (isCorrect)
              style = "border-forest bg-forest/10 text-forest";
            else if (isChosen)
              style = "border-coral bg-coral/10 text-coral";
            else style = "border-black/5 bg-white/50 text-charcoal/40";
          }

          return (
            <button
              key={opt}
              onClick={() => handlePick(opt)}
              disabled={!!chosen}
              className={`rounded-xl border px-4 py-2.5 text-center text-sm font-medium transition ${style}`}
            >
              {opt}
              {chosen && isCorrect && (
                <span className="ml-1 text-forest">&#10003;</span>
              )}
              {chosen && isChosen && !isCorrect && (
                <span className="ml-1 text-coral">&#10007;</span>
              )}
            </button>
          );
        })}
      </div>

      {chosen && (
        <Feedback
          correct={chosen === exercise.answer}
          explanation={exercise.explanation}
          onNext={onNext}
        />
      )}
    </div>
  );
}

// ── Multiple choice ──

function MultipleChoice({
  exercise,
  onCorrect,
  onNext,
}: {
  exercise: MultipleChoiceExercise;
  onCorrect: () => void;
  onNext: () => void;
}) {
  const options = useMemo(
    () =>
      [exercise.answer, ...exercise.distractors].sort(
        () => Math.random() - 0.5
      ),
    [exercise]
  );
  const [chosen, setChosen] = useState<string | null>(null);

  const handlePick = (answer: string) => {
    if (chosen) return;
    setChosen(answer);
    if (answer === exercise.answer) onCorrect();
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
        <p className="mt-1 font-display text-lg font-semibold text-charcoal">
          {exercise.question}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        {options.map((opt) => {
          const isCorrect = opt === exercise.answer;
          const isChosen = opt === chosen;

          let style =
            "border-black/10 bg-white text-charcoal hover:border-swedish-blue/30";
          if (chosen) {
            if (isCorrect)
              style = "border-forest bg-forest/10 text-forest";
            else if (isChosen)
              style = "border-coral bg-coral/10 text-coral";
            else style = "border-black/5 bg-white/50 text-charcoal/40";
          }

          return (
            <button
              key={opt}
              onClick={() => handlePick(opt)}
              disabled={!!chosen}
              className={`rounded-xl border px-5 py-3 text-left text-sm font-medium transition ${style}`}
            >
              {opt}
              {chosen && isCorrect && (
                <span className="ml-2 text-forest">&#10003;</span>
              )}
              {chosen && isChosen && !isCorrect && (
                <span className="ml-2 text-coral">&#10007;</span>
              )}
            </button>
          );
        })}
      </div>

      {chosen && (
        <Feedback
          correct={chosen === exercise.answer}
          explanation={exercise.explanation}
          onNext={onNext}
        />
      )}
    </div>
  );
}

// ── Reorder (drag-free: tap words in order) ──

function Reorder({
  exercise,
  onCorrect,
  onNext,
}: {
  exercise: ReorderExercise;
  onCorrect: () => void;
  onNext: () => void;
}) {
  const shuffled = useMemo(
    () => [...exercise.words].sort(() => Math.random() - 0.5),
    [exercise]
  );

  const [placed, setPlaced] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const remaining = shuffled.filter((w) => !placed.includes(w));

  const handleTap = (word: string) => {
    if (checked) return;
    setPlaced((p) => [...p, word]);
  };

  const handleRemove = (index: number) => {
    if (checked) return;
    setPlaced((p) => p.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    setChecked(true);
    const isCorrect =
      placed.length === exercise.words.length &&
      placed.every((w, i) => w === exercise.words[i]);
    if (isCorrect) onCorrect();
  };

  const isCorrect =
    checked &&
    placed.length === exercise.words.length &&
    placed.every((w, i) => w === exercise.words[i]);

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-charcoal/50">{exercise.prompt}</p>

        {/* Placed words */}
        <div className="mt-4 flex min-h-[3rem] flex-wrap items-center justify-center gap-2 rounded-xl border border-dashed border-black/10 bg-cream/30 px-4 py-3">
          {placed.length === 0 && (
            <span className="text-sm text-charcoal/30">
              Tap words below to build the sentence
            </span>
          )}
          {placed.map((word, i) => (
            <button
              key={`${word}-${i}`}
              onClick={() => handleRemove(i)}
              disabled={checked}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                checked
                  ? word === exercise.words[i]
                    ? "border-forest bg-forest/10 text-forest"
                    : "border-coral bg-coral/10 text-coral"
                  : "border-swedish-blue/30 bg-swedish-blue/5 text-swedish-blue hover:bg-swedish-blue/10"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Available words */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {remaining.map((word) => (
          <button
            key={word}
            onClick={() => handleTap(word)}
            className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-charcoal transition hover:border-swedish-blue/30"
          >
            {word}
          </button>
        ))}
      </div>

      {!checked && placed.length === exercise.words.length && (
        <button
          onClick={handleCheck}
          className="mt-4 w-full rounded-xl bg-swedish-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
        >
          Check answer
        </button>
      )}

      {checked && (
        <>
          {!isCorrect && (
            <div className="mt-3 rounded-lg bg-cream/60 px-4 py-2.5 text-center">
              <p className="text-sm text-charcoal/60">Correct order:</p>
              <p className="font-display text-lg font-semibold text-charcoal">
                {exercise.words.join(" ")}
              </p>
            </div>
          )}
          <Feedback
            correct={isCorrect}
            explanation={exercise.explanation}
            onNext={onNext}
          />
        </>
      )}
    </div>
  );
}

// ── Shared feedback strip ──

function Feedback({
  correct,
  explanation,
  onNext,
}: {
  correct: boolean;
  explanation: string;
  onNext: () => void;
}) {
  return (
    <div
      className={`mt-4 rounded-xl px-5 py-4 ${
        correct
          ? "border border-forest/20 bg-forest/5"
          : "border border-coral/20 bg-coral/5"
      }`}
    >
      <p className="text-sm font-medium">
        {correct ? (
          <span className="text-forest">Correct!</span>
        ) : (
          <span className="text-coral">Not quite.</span>
        )}
      </p>
      <p className="mt-1 text-sm text-charcoal/70">{explanation}</p>
      <button
        onClick={onNext}
        className="mt-3 rounded-full bg-charcoal/10 px-5 py-2 text-xs font-medium text-charcoal transition hover:bg-charcoal/15"
      >
        Next &rarr;
      </button>
    </div>
  );
}

// ── Helpers ──

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}
