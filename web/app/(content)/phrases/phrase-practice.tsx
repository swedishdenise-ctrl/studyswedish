"use client";

import { useState, useMemo, useCallback } from "react";
import type { Phrase } from "@/data/phrases";
import { SignupNudge } from "@/components/signup-nudge";

type Mode = "sv-to-en" | "en-to-sv" | "fill-blank";
type Stage = "quiz" | "results";

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

export function PhrasePractice({ phrases }: { phrases: Phrase[] }) {
  const ROUND_SIZE = 6;

  const [mode, setMode] = useState<Mode>("sv-to-en");
  const [batch, setBatch] = useState(() => pickRandom(phrases, ROUND_SIZE));
  const [stage, setStage] = useState<Stage>("quiz");
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  // For fill-in-blank mode
  const [typed, setTyped] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const phrase = batch[idx];

  // Build wrong answers from the pool
  const options = useMemo(() => {
    if (mode === "fill-blank" || !phrase) return [];
    const field = mode === "sv-to-en" ? "english" : "swedish";
    const correct = phrase[field];
    const wrongs = phrases
      .filter((p) => p.id !== phrase.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p[field]);
    return [correct, ...wrongs].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, idx, batch, phrases]);

  const handlePick = (answer: string) => {
    if (chosen) return;
    const correct =
      mode === "sv-to-en" ? phrase.english : phrase.swedish;
    setChosen(answer);
    if (answer === correct) setScore((s) => s + 1);
    setTimeout(advance, 1100);
  };

  const handleFillSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const correct = phrase.swedish.toLowerCase().replace(/[!?.…,]/g, "").trim();
    const answer = typed.toLowerCase().replace(/[!?.…,]/g, "").trim();
    if (answer === correct) setScore((s) => s + 1);
    setTimeout(advance, 1500);
  };

  const advance = () => {
    if (idx < batch.length - 1) {
      setIdx((i) => i + 1);
      setChosen(null);
      setTyped("");
      setSubmitted(false);
    } else {
      setTotal((t) => t + batch.length);
      setStage("results");
    }
  };

  const restart = useCallback(() => {
    setBatch(pickRandom(phrases, ROUND_SIZE));
    setIdx(0);
    setChosen(null);
    setTyped("");
    setSubmitted(false);
    setScore(0);
    setStage("quiz");
  }, [phrases]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setBatch(pickRandom(phrases, ROUND_SIZE));
    setIdx(0);
    setChosen(null);
    setTyped("");
    setSubmitted(false);
    setScore(0);
    setStage("quiz");
  };

  // ── Results ──
  if (stage === "results") {
    const pct = Math.round((score / batch.length) * 100);
    return (
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
              ? "Perfekt! You nailed every phrase."
              : pct >= 60
                ? "Bra jobbat! A few more rounds to lock these in."
                : "Keep practising, real phrases stick with repetition."}
          </p>
          <p className="mt-1 text-sm text-warm-gray">
            {total + batch.length} phrases practised this session
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              onClick={restart}
              className="rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
            >
              Another round
            </button>
          </div>
        </div>

        <SignupNudge practiceCount={total + batch.length} threshold={12} />
      </div>
    );
  }

  // ── Quiz ──
  return (
    <div className="mx-auto max-w-lg">
      {/* Mode selector */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {(
          [
            ["sv-to-en", "Swedish → English"],
            ["en-to-sv", "English → Swedish"],
            ["fill-blank", "Type the Swedish"],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              mode === m
                ? "bg-swedish-blue text-white"
                : "border border-black/10 bg-white text-charcoal/70 hover:border-swedish-blue/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4 flex justify-center gap-1.5">
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
      <p className="mb-6 text-center text-xs text-warm-gray">
        {idx + 1} of {batch.length}
      </p>

      {/* Question card */}
      <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
        {mode === "fill-blank" ? (
          <>
            <p className="text-sm text-charcoal/50">
              Type the Swedish for:
            </p>
            <p className="mt-3 font-display text-2xl font-bold text-charcoal">
              {phrase.english}
            </p>
            {phrase.literal && (
              <p className="mt-1 text-sm italic text-charcoal/40">
                Hint: literally &ldquo;{phrase.literal}&rdquo;
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-charcoal/50">
              {mode === "sv-to-en"
                ? "What does this mean?"
                : "How do you say this in Swedish?"}
            </p>
            <p className="mt-3 font-display text-2xl font-bold text-charcoal">
              {mode === "sv-to-en" ? phrase.swedish : phrase.english}
            </p>
            {mode === "sv-to-en" && phrase.pronunciation && (
              <p className="mt-1 font-mono text-xs text-warm-gray">
                {phrase.pronunciation}
              </p>
            )}
          </>
        )}
      </div>

      {/* Answer area */}
      {mode === "fill-blank" ? (
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && typed.trim()) handleFillSubmit();
              }}
              disabled={submitted}
              placeholder="Type the Swedish phrase…"
              className={`w-full rounded-xl border px-5 py-3 text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-swedish-blue/20 ${
                submitted
                  ? typed.toLowerCase().replace(/[!?.…,]/g, "").trim() ===
                    phrase.swedish.toLowerCase().replace(/[!?.…,]/g, "").trim()
                    ? "border-forest bg-forest/5 text-forest"
                    : "border-coral bg-coral/5 text-coral"
                  : "border-black/10 bg-white text-charcoal"
              }`}
              autoFocus
            />
          </div>

          {submitted && (
            <div className="mt-2 rounded-lg bg-cream/60 px-4 py-2.5 text-center">
              <p className="text-sm text-charcoal/60">Correct answer:</p>
              <p className="font-display text-lg font-semibold text-charcoal">
                {phrase.swedish}
              </p>
            </div>
          )}

          {!submitted && (
            <button
              onClick={handleFillSubmit}
              disabled={!typed.trim()}
              className="mt-3 w-full rounded-xl bg-swedish-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-swedish-blue-dark disabled:opacity-40"
            >
              Check
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-2">
          {options.map((option) => {
            const correct =
              mode === "sv-to-en" ? phrase.english : phrase.swedish;
            const isCorrect = option === correct;
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
                onClick={() => handlePick(option)}
                disabled={!!chosen}
                className={`rounded-xl border px-5 py-3 text-left text-sm font-medium transition ${style}`}
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
      )}
    </div>
  );
}
