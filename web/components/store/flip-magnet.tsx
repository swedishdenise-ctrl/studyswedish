"use client";

import { useState } from "react";

export function FlipMagnet({
  src,
  alt,
  name,
  meaning,
}: {
  src: string;
  alt: string;
  name: string;
  meaning: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? `${name}: ${meaning}` : `${name} — tap to see what it means`}
      className="flip-card group aspect-square w-full cursor-pointer text-left"
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
  );
}
