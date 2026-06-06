"use client";

import { useState, useMemo, useCallback } from "react";
import type { Verb } from "@/data/verbs";
import { SignupNudge } from "@/components/signup-nudge";

type FormKey = "present" | "preteritum" | "supinum" | "imperative";

const FORM_LABELS: Record<FormKey, string> = {
  present: "Present",
  preteritum: "Past (preteritum)",
  supinum: "Supinum (perfect)",
  imperative: "Imperative",
};

type Question = {
  verb: Verb;
  askedForm: FormKey;
  correctAnswer: string;
  options: string[];
};

function buildQuestions(verbs: Verb[], count: number): Question[] {
  const forms: FormKey[] = ["present", "preteritum", "supinum", "imperative"];
  const shuffled = [...verbs].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((verb) => {
    const askedForm = forms[Math.floor(Math.random() * forms.length)];
    const correctAnswer = verb[askedForm];

    // Use OTHER tenses of the SAME verb as wrong answers.
    // This forces the learner to actually know which form is which.
    const allForms: { key: FormKey; value: string }[] = [
      { key: "present", value: verb.present },
      { key: "preteritum", value: verb.preteritum },
      { key: "supinum", value: verb.supinum },
      { key: "imperative", value: verb.imperative },
    ];
    const wrongs = allForms
      .filter((f) => f.key !== askedForm && f.value !== correctAnswer)
      .map((f) => f.value);

    const options = [correctAnswer, ...wrongs].sort(() => Math.random() - 0.5);

    return { verb, askedForm, correctAnswer, options };
  });
}

export function ConjugationDrill({ verbs }: { verbs: Verb[] }) {
  const ROUND_SIZE = 8;

  const [questions, setQuestions] = useState(() =>
    buildQuestions(verbs, ROUND_SIZE)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [totalDrilled, setTotalDrilled] = useState(0);

  const q = questions[currentIdx];

  const handleAnswer = (answer: string) => {
    if (chosen) return;
    setChosen(answer);
    const isCorrect = answer === q.correctAnswer;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((i) => i + 1);
        setChosen(null);
      } else {
        setTotalDrilled((t) => t + questions.length);
        setDone(true);
      }
    }, 1000);
  };

  const handleRestart = useCallback(() => {
    setQuestions(buildQuestions(verbs, ROUND_SIZE));
    setCurrentIdx(0);
    setChosen(null);
    setScore(0);
    setDone(false);
  }, [verbs]);

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">
            {pct === 100 ? "🎉" : pct >= 60 ? "👏" : "💪"}
          </p>
          <p className="mt-4 font-display text-2xl font-semibold text-charcoal">
            {score} out of {questions.length}
          </p>
          <p className="mt-2 text-charcoal/60">
            {pct === 100
              ? "Perfekt! You got every conjugation right."
              : pct >= 60
                ? "Bra jobbat! A few more rounds will lock these in."
                : "Keep drilling, those irregular verbs take repetition."}
          </p>
          <p className="mt-1 text-sm text-warm-gray">
            {totalDrilled} verb forms drilled this session
          </p>

          <button
            onClick={handleRestart}
            className="mt-6 rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
          >
            Another round
          </button>
        </div>

        <SignupNudge practiceCount={totalDrilled} threshold={16} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Progress */}
      <div className="mb-4 flex justify-center gap-1.5">
        {questions.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === currentIdx
                ? "bg-coral"
                : i < currentIdx
                  ? "bg-coral/30"
                  : "bg-black/10"
            }`}
          />
        ))}
      </div>

      <p className="mb-6 text-center text-xs text-warm-gray">
        Question {currentIdx + 1} of {questions.length}
      </p>

      {/* Question card */}
      <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-charcoal/50">
          What is the <strong>{FORM_LABELS[q.askedForm]}</strong> of…
        </p>
        <p className="mt-3 font-display text-4xl font-bold text-charcoal">
          {q.verb.infinitive}
        </p>
        <p className="mt-1 text-sm text-charcoal/50">{q.verb.english}</p>
        {q.verb.verbGroup ? (
          <span className="mt-2 inline-block rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-charcoal/60">
            Group {q.verb.verbGroup}
          </span>
        ) : (
          <span className="mt-2 inline-block rounded-full bg-coral/10 px-2.5 py-0.5 text-xs font-medium text-coral">
            Irregular
          </span>
        )}
      </div>

      {/* Options */}
      <div className="mt-4 grid grid-cols-1 gap-2">
        {q.options.map((option) => {
          const isCorrect = option === q.correctAnswer;
          const isChosen = option === chosen;

          let style =
            "border-black/10 bg-white text-charcoal hover:border-swedish-blue/30";
          if (chosen) {
            if (isCorrect) {
              style = "border-forest bg-forest/10 text-forest";
            } else if (isChosen && !isCorrect) {
              style = "border-coral bg-coral/10 text-coral";
            } else {
              style = "border-black/5 bg-white/50 text-charcoal/40";
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!chosen}
              className={`rounded-xl border px-5 py-3 text-left font-display text-lg font-semibold transition ${style}`}
            >
              {option}
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
    </div>
  );
}
