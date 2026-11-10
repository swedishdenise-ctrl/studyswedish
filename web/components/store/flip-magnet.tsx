"use client";

import { useState } from "react";
import { speakSwedish, useCanSpeakSwedish } from "@/lib/speak";

export function SpeakerIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function FlipMagnet({
  src,
  alt,
  name,
  meaning,
  audio,
}: {
  src: string;
  alt: string;
  name: string;
  meaning: string;
  audio?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const canSpeak = useCanSpeakSwedish(!!audio);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? `${name}: ${meaning}` : `${name} — tap to see what it means`}
        className="flip-card group block aspect-square w-full cursor-pointer text-left"
      >
        <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
          {/* Front: the magnet */}
          <div className="flip-face bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-full w-full transition duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink/60 shadow-sm transition group-hover:text-ink">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <path d="M21 4v5h-5" />
              </svg>
            </span>
          </div>

          {/* Back: what it means */}
          <div className="flip-face flip-back flex flex-col items-center justify-center bg-soft-blue p-4 text-center sm:p-6">
            <p className="font-display text-[17px] leading-tight text-ink sm:text-xl">{name}</p>
            <div className="my-3 h-px w-8 bg-ink/20" />
            <p className="text-[12.5px] leading-snug text-ink/65 sm:text-[14px] sm:leading-relaxed">{meaning}</p>
          </div>
        </div>
      </button>

      {canSpeak && (
        <button
          type="button"
          onClick={() => speakSwedish(name, audio)}
          aria-label={`Hear “${name}” in Swedish`}
          className="absolute bottom-2.5 left-2.5 flex h-7 items-center gap-1.5 rounded-full bg-ink px-2.5 text-[11px] font-medium text-white shadow-sm transition hover:bg-ink/80"
        >
          <SpeakerIcon size={13} />
          Hear it
        </button>
      )}
    </div>
  );
}
