"use client";

import { useState, useCallback, useMemo } from "react";
import type { VocabWord } from "@/data/vocabulary";

type Stage = "flashcards" | "quiz" | "results";
type Direction = "sv-to-en" | "en-to-sv";

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function wrongAnswers(
  correct: VocabWord,
  pool: VocabWord[],
  count: number,
  dir: Direction
): string[] {
  const field = dir === "sv-to-en" ? "english" : "swedish";
  return pool
    .filter((w) => w.id !== correct.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((w) => w[field]);
}

export function FlashcardPractice({
  words,
  categoryLabel: _categoryLabel,
  onPracticeCount,
}: {
  words: VocabWord[];
  categoryLabel: string;
  onPracticeCount?: (count: number) => void;
}) {
  const BATCH_SIZE = Math.min(10, words.length);

  const [stage, setStage] = useState<Stage>("flashcards");
  const [direction, setDirection] = useState<Direction>("sv-to-en");
  const [batch, setBatch] = useState(() => pickRandom(words, BATCH_SIZE));
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [totalPracticed, setTotalPracticed] = useState(0);
  const [missedWords, setMissedWords] = useState<VocabWord[]>([]);
  const [isRetry, setIsRetry] = useState(false);

  const quizOptions = useMemo(() => {
    if (stage !== "quiz" || !batch[quizIndex]) return [];
    const correct = batch[quizIndex];
    const correctAnswer =
      direction === "sv-to-en" ? correct.english : correct.swedish;
    const wrongs = wrongAnswers(correct, words, 3, direction);
    return [correctAnswer, ...wrongs].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, quizIndex, batch, direction]);

  const handleFlip = () => setFlipped(true);

  const handleNext = () => {
    if (cardIndex < batch.length - 1) {
      setCardIndex((i) => i + 1);
      setFlipped(false);
    } else {
      setStage("quiz");
      setQuizIndex(0);
      setScore(0);
      setChosen(null);
    }
  };

  const handleAnswer = (answer: string) => {
    if (chosen) return;
    const correct = batch[quizIndex];
    const correctAnswer =
      direction === "sv-to-en" ? correct.english : correct.swedish;
    const isRight = answer === correctAnswer;

    if (isRight) {
      setScore((s) => s + 1);
    } else {
      setMissedWords((prev) => [...prev, correct]);
    }
    setChosen(answer);

    setTimeout(() => {
      if (quizIndex < batch.length - 1) {
        setQuizIndex((i) => i + 1);
        setChosen(null);
      } else {
        const newTotal = totalPracticed + batch.length;
        setTotalPracticed(newTotal);
        onPracticeCount?.(newTotal);
        setStage("results");
      }
    }, 1200);
  };

  const handleRestart = useCallback(() => {
    setBatch(pickRandom(words, BATCH_SIZE));
    setMissedWords([]);
    setIsRetry(false);
    setCardIndex(0);
    setFlipped(false);
    setQuizIndex(0);
    setScore(0);
    setChosen(null);
    setStage("flashcards");
  }, [words, BATCH_SIZE]);

  const handleRetry = useCallback(() => {
    setBatch([...missedWords]);
    setMissedWords([]);
    setIsRetry(true);
    setCardIndex(0);
    setFlipped(false);
    setQuizIndex(0);
    setScore(0);
    setChosen(null);
    setStage("flashcards");
  }, [missedWords]);

  const handleSwitchDirection = () => {
    setDirection((d) => (d === "sv-to-en" ? "en-to-sv" : "sv-to-en"));
    handleRestart();
  };

  const current = batch[cardIndex];
  const quizWord = batch[quizIndex];

  return (
    <div className="mx-auto max-w-lg">
      {/* Direction toggle */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <button
          onClick={handleSwitchDirection}
          className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium text-charcoal/70 transition hover:border-swedish-blue/30 hover:text-swedish-blue"
        >
          {direction === "sv-to-en"
            ? "Swedish → English"
            : "English → Swedish"}
          <span className="ml-1.5 text-charcoal/40">tap to switch</span>
        </button>
      </div>

      {/* ─── FLASHCARDS ─── */}
      {stage === "flashcards" && current && (
        <div>
          {isRetry && (
            <p className="mb-3 text-center text-xs font-medium text-coral/80">
              Reviewing {batch.length} missed word{batch.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* Progress dots */}
          <div className="mb-4 flex justify-center gap-1.5">
            {batch.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === cardIndex
                    ? "bg-swedish-blue"
                    : i < cardIndex
                      ? "bg-swedish-blue/30"
                      : "bg-black/10"
                }`}
              />
            ))}
          </div>

          <p className="mb-2 text-center text-xs text-warm-gray">
            Card {cardIndex + 1} of {batch.length} — tap the card to flip
          </p>

          {/* The card */}
          <button
            onClick={flipped ? handleNext : handleFlip}
            className="card-hover group w-full rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm transition hover:border-swedish-blue/20"
          >
            {!flipped ? (
              <>
                <p className="font-display text-4xl font-bold text-charcoal">
                  {direction === "sv-to-en"
                    ? current.swedish
                    : current.english}
                </p>
                {direction === "sv-to-en" && current.pronunciationIpa && (
                  <p className="mt-2 font-mono text-sm text-warm-gray">
                    {current.pronunciationIpa}
                  </p>
                )}
                <p className="mt-6 text-sm text-swedish-blue/60">
                  Tap to reveal
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-charcoal/50">
                  {direction === "sv-to-en"
                    ? current.swedish
                    : current.english}
                </p>
                <p className="mt-2 font-display text-3xl font-bold text-swedish-blue">
                  {direction === "sv-to-en"
                    ? current.english
                    : current.swedish}
                </p>
                {direction === "en-to-sv" && current.pronunciationIpa && (
                  <p className="mt-1 font-mono text-sm text-warm-gray">
                    {current.pronunciationIpa}
                  </p>
                )}
                {current.gender && (
                  <span className="mt-3 inline-block rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-charcoal/60">
                    {current.gender}-word
                  </span>
                )}
                <div className="mt-4 rounded-lg bg-cream/60 px-4 py-2">
                  <p className="text-sm italic text-charcoal/70">
                    {current.exampleSv}
                  </p>
                  <p className="text-xs text-charcoal/50">
                    {current.exampleEn}
                  </p>
                </div>
                <p className="mt-4 text-sm text-swedish-blue/60">
                  Tap to continue
                </p>
              </>
            )}
          </button>
        </div>
      )}

      {/* ─── QUIZ ─── */}
      {stage === "quiz" && quizWord && (
        <div>
          <div className="mb-4 flex justify-center gap-1.5">
            {batch.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === quizIndex
                    ? "bg-coral"
                    : i < quizIndex
                      ? "bg-coral/30"
                      : "bg-black/10"
                }`}
              />
            ))}
          </div>

          <p className="mb-2 text-center text-xs text-warm-gray">
            Question {quizIndex + 1} of {batch.length}
          </p>

          <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-charcoal/50">
              {direction === "sv-to-en"
                ? "What does this mean?"
                : "How do you say this in Swedish?"}
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-charcoal">
              {direction === "sv-to-en"
                ? quizWord.swedish
                : quizWord.english}
            </p>
            {direction === "sv-to-en" && quizWord.pronunciationIpa && (
              <p className="mt-1 font-mono text-sm text-warm-gray">
                {quizWord.pronunciationIpa}
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            {quizOptions.map((option) => {
              const correctAnswer =
                direction === "sv-to-en"
                  ? quizWord.english
                  : quizWord.swedish;
              const isCorrect = option === correctAnswer;
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
        </div>
      )}

      {/* ─── RESULTS ─── */}
      {stage === "results" && (
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">
            {score === batch.length
              ? "🎉"
              : score >= batch.length * 0.6
                ? "👏"
                : "💪"}
          </p>
          <p className="mt-4 font-display text-2xl font-semibold text-charcoal">
            {score} out of {batch.length}
          </p>
          <p className="mt-2 text-charcoal/60">
            {score === batch.length
              ? "Perfect! You nailed every word."
              : score >= batch.length * 0.6
                ? "Nice work! A few more rounds and you'll have these down."
                : "Keep going — repetition is how it sticks."}
          </p>
          <p className="mt-1 text-sm text-warm-gray">
            {totalPracticed} words practiced this session
          </p>

          <div className="mt-6 flex flex-col gap-2">
            {/* Retry missed words — most important action if there are misses */}
            {missedWords.length > 0 && (
              <button
                onClick={handleRetry}
                className="rounded-full bg-coral px-6 py-2.5 text-sm font-medium text-white transition hover:bg-coral/90"
              >
                Practice {missedWords.length} missed word{missedWords.length !== 1 ? "s" : ""} again
              </button>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={handleRestart}
                className="rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
              >
                {missedWords.length > 0 ? "New round" : "Practice more words"}
              </button>
              <button
                onClick={handleSwitchDirection}
                className="rounded-full border border-black/10 px-6 py-2.5 text-sm font-medium text-charcoal transition hover:border-swedish-blue/30"
              >
                Switch direction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
