"use client";

import { useState, useEffect, useCallback } from "react";
import type { VocabWord } from "@/data/vocabulary";

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const PAIR_COUNT = 6;

type ItemState = "default" | "selected" | "matched" | "wrong";

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

export function MatchGame({
  words,
  onPracticeCount,
}: {
  words: VocabWord[];
  onPracticeCount?: (count: number) => void;
}) {
  const pairCount = Math.min(PAIR_COUNT, words.length);

  const [leftWords, setLeftWords] = useState<VocabWord[]>([]);
  const [rightWords, setRightWords] = useState<VocabWord[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [isChecking, setIsChecking] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [totalPracticed, setTotalPracticed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startRound = useCallback(() => {
    const picked = pickRandom(words, pairCount);
    setLeftWords(shuffle(picked));
    setRightWords(shuffle(picked));
    setSelectedLeft(null);
    setMatched(new Set());
    setWrongIds(new Set());
    setIsChecking(false);
    setDone(false);
    setElapsed(0);
    setStartTime(Date.now());
  }, [words, pairCount]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  // Live timer
  useEffect(() => {
    if (done || startTime === 0) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [done, startTime]);

  const handleLeftTap = (id: string) => {
    if (isChecking || matched.has(id)) return;
    setSelectedLeft((prev) => (prev === id ? null : id));
    setWrongIds(new Set());
  };

  const handleRightTap = (id: string) => {
    if (isChecking || matched.has(id) || !selectedLeft) return;

    if (selectedLeft === id) {
      // Correct!
      const newMatched = new Set(matched);
      newMatched.add(id);
      setMatched(newMatched);
      setSelectedLeft(null);

      if (newMatched.size === pairCount) {
        const finalElapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsed(finalElapsed);
        setDone(true);
        setBestTime((prev) =>
          prev === null ? finalElapsed : Math.min(prev, finalElapsed)
        );
        const newTotal = totalPracticed + pairCount;
        setTotalPracticed(newTotal);
        onPracticeCount?.(newTotal);
      }
    } else {
      // Wrong — flash both, then reset
      setIsChecking(true);
      setWrongIds(new Set([selectedLeft, id]));
      setTimeout(() => {
        setWrongIds(new Set());
        setSelectedLeft(null);
        setIsChecking(false);
      }, 700);
    }
  };

  const getLeftState = (id: string): ItemState => {
    if (matched.has(id)) return "matched";
    if (wrongIds.has(id)) return "wrong";
    if (selectedLeft === id) return "selected";
    return "default";
  };

  const getRightState = (id: string): ItemState => {
    if (matched.has(id)) return "matched";
    if (wrongIds.has(id)) return "wrong";
    return "default";
  };

  if (done) {
    const isNewBest = bestTime === elapsed;
    return (
      <div className="mx-auto max-w-sm">
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">{elapsed <= 20 ? "⚡" : elapsed <= 40 ? "🎉" : "👏"}</p>
          <p className="mt-4 font-display text-2xl font-semibold text-charcoal">
            All {pairCount} matched!
          </p>
          <p className="mt-2 text-lg font-semibold text-swedish-blue">
            {formatTime(elapsed)}
          </p>
          {isNewBest && bestTime !== null && totalPracticed > pairCount && (
            <p className="mt-1 text-xs font-medium text-golden-dark">
              New best time!
            </p>
          )}
          {bestTime !== null && !isNewBest && (
            <p className="mt-1 text-xs text-charcoal/40">
              Best: {formatTime(bestTime)}
            </p>
          )}
          <p className="mt-3 text-sm text-charcoal/50">
            {totalPracticed} words matched this session
          </p>
          <button
            onClick={startRound}
            className="mt-6 rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
          >
            Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress + timer bar */}
      <div className="mb-5 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <p className="text-sm text-charcoal/50">
            <span className="font-semibold text-charcoal">{matched.size}</span>
            <span> / {pairCount} matched</span>
          </p>
          {/* Dot progress */}
          <div className="flex gap-1">
            {Array.from({ length: pairCount }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i < matched.size ? "bg-forest" : "bg-black/10"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="font-mono text-sm tabular-nums text-charcoal/40">
          {formatTime(elapsed)}
        </p>
      </div>

      {/* Two-column match grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left: Swedish */}
        <div className="flex flex-col gap-2">
          <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-widest text-charcoal/30">
            Swedish
          </p>
          {leftWords.map((word) => (
            <MatchTile
              key={word.id}
              text={word.swedish}
              state={getLeftState(word.id)}
              onClick={() => handleLeftTap(word.id)}
            />
          ))}
        </div>

        {/* Right: English */}
        <div className="flex flex-col gap-2">
          <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-widest text-charcoal/30">
            English
          </p>
          {rightWords.map((word) => (
            <MatchTile
              key={word.id}
              text={word.english}
              state={getRightState(word.id)}
              onClick={() => handleRightTap(word.id)}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-charcoal/30">
        {selectedLeft
          ? "Now tap the matching English word"
          : "Tap a Swedish word to start"}
      </p>
    </div>
  );
}

function MatchTile({
  text,
  state,
  onClick,
}: {
  text: string;
  state: ItemState;
  onClick: () => void;
}) {
  const styles: Record<ItemState, string> = {
    default:
      "border-black/8 bg-white text-charcoal hover:border-swedish-blue/30 hover:bg-swedish-blue/[0.03] cursor-pointer",
    selected:
      "border-swedish-blue bg-swedish-blue/8 text-swedish-blue shadow-sm cursor-pointer scale-[1.02]",
    matched:
      "border-forest/25 bg-forest/8 text-forest cursor-default",
    wrong:
      "border-coral/50 bg-coral/10 text-coral cursor-pointer scale-[0.98]",
  };

  return (
    <button
      onClick={onClick}
      disabled={state === "matched"}
      className={`min-h-[3rem] rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-all duration-150 ${styles[state]}`}
    >
      {state === "matched" ? (
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-xs text-forest">✓</span>
          <span>{text}</span>
        </span>
      ) : (
        text
      )}
    </button>
  );
}
