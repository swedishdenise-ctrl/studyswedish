"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { speakSwedish, useCanSpeakSwedish } from "@/lib/speak";

export type FridgeMagnet = {
  cutout: string;
  name: string;
  short: string;
  audio?: string;
  /** [left%, top%, rotation°] on phones, then on bigger screens */
  mobile: [number, number, number];
  desktop: [number, number, number];
};

export function FridgeScene({ magnets }: { magnets: FridgeMagnet[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const canSpeak = useCanSpeakSwedish(magnets.some((m) => m.audio));
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Magnets "drop" onto the door the first time it scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLanded(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!landed) return;
    const t = setTimeout(() => setSettled(true), 1400);
    return () => clearTimeout(t);
  }, [landed]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function tap(i: number) {
    const m = magnets[i];
    speakSwedish(m.name, m.audio);
    setActive(null);
    // re-trigger the wiggle even when tapping the same magnet twice
    requestAnimationFrame(() => setActive(i));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 3200);
  }

  return (
    <div>
      <div ref={ref} className="fridge-door relative mx-auto aspect-[4/5] w-full max-w-4xl sm:aspect-[16/10]">
        <span className="fridge-handle" aria-hidden="true" />

        {magnets.map((m, i) => {
          const style = {
            "--l": `${m.mobile[0]}%`,
            "--t": `${m.mobile[1]}%`,
            "--r": `${m.mobile[2]}deg`,
            "--ls": `${m.desktop[0]}%`,
            "--ts": `${m.desktop[1]}%`,
            "--rs": `${m.desktop[2]}deg`,
            "--delay": `${150 + i * 170}ms`,
            "--mask": `url(${m.cutout})`,
          } as CSSProperties;

          return (
            <button
              key={m.name}
              type="button"
              onClick={() => tap(i)}
              aria-label={canSpeak ? `Hear “${m.name}” — ${m.short}` : `${m.name} — ${m.short}`}
              className={`fridge-magnet ${landed ? "is-landed" : ""} ${settled ? "is-settled" : ""} ${active === i ? "is-active" : ""}`}
              style={style}
            >
              <span className="fridge-magnet-body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.cutout} alt="" draggable={false} className="block w-full select-none" />
                <span className="fridge-magnet-gloss" aria-hidden="true" />
              </span>

              {active === i && (
                <span className="fridge-bubble" role="status">
                  <span className="block font-display text-[15px] text-ink">{m.name}</span>
                  <span className="mt-0.5 block text-[12px] text-ink/55">{m.short}</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[14px] text-ink/50">
        {canSpeak ? "Tap a magnet to hear it in Swedish" : "Tap a magnet to see what it means"}
      </p>
    </div>
  );
}
