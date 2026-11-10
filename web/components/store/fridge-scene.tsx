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

  // ----- Mouse dragging (touch stays tap-only so the page still scrolls) -----
  const [offsets, setOffsets] = useState<Record<number, { x: number; y: number }>>({});
  const [dragging, setDragging] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>(() => magnets.map((_, i) => i));
  const justDragged = useRef(false);
  const drag = useRef<{
    i: number;
    sx: number;
    sy: number;
    bx: number;
    by: number;
    min: [number, number];
    max: [number, number];
    moved: boolean;
  } | null>(null);

  function startDrag(e: React.PointerEvent<HTMLButtonElement>, i: number) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const door = ref.current.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    const bx = offsets[i]?.x ?? 0;
    const by = offsets[i]?.y ?? 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      i,
      sx: e.clientX,
      sy: e.clientY,
      bx,
      by,
      min: [bx + door.left - r.left, by + door.top - r.top],
      max: [bx + door.right - r.right, by + door.bottom - r.bottom],
      moved: false,
    };
  }

  function moveDrag(e: React.PointerEvent<HTMLButtonElement>, i: number) {
    const d = drag.current;
    if (!d || d.i !== i) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < 5) return;
      d.moved = true;
      setDragging(i);
      setActive(null);
      setOrder((o) => [...o.filter((x) => x !== i), i]);
    }
    const x = Math.min(d.max[0], Math.max(d.min[0], d.bx + dx));
    const y = Math.min(d.max[1], Math.max(d.min[1], d.by + dy));
    setOffsets((o) => ({ ...o, [i]: { x, y } }));
  }

  function endDrag() {
    if (drag.current?.moved) justDragged.current = true;
    drag.current = null;
    setDragging(null);
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
              onClick={() => {
                if (justDragged.current) {
                  justDragged.current = false;
                  return;
                }
                tap(i);
              }}
              onPointerDown={(e) => startDrag(e, i)}
              onPointerMove={(e) => moveDrag(e, i)}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              aria-label={canSpeak ? `Hear “${m.name}” — ${m.short}` : `${m.name} — ${m.short}`}
              className={`fridge-magnet ${landed ? "is-landed" : ""} ${settled ? "is-settled" : ""} ${active === i ? "is-active" : ""} ${dragging === i ? "is-dragging" : ""}`}
              style={{
                ...style,
                translate: `${offsets[i]?.x ?? 0}px ${offsets[i]?.y ?? 0}px`,
                zIndex: dragging === i ? 20 : order.indexOf(i) + 1,
              }}
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
        <span className="hidden [@media(pointer:fine)]:inline">· or drag them around</span>
      </p>
    </div>
  );
}
