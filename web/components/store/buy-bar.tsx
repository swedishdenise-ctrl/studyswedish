"use client";

import { useEffect, useState } from "react";

/** Slim buy bar that slides up on phones once you've scrolled past the hero. */
export function BuyBar({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const nearBottom =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 520;
      setVisible(pastHero && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`buy-bar fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden ${visible ? "is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/magnets/cut/sverige.png" alt="" className="h-11 w-11 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[17px] leading-tight text-ink">Set of 4 magnets</p>
          <p className="text-[12px] text-ink/50">€29.99 · free shipping</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="btn-shine btn-shine-dark shrink-0 bg-ink px-5 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-white"
        >
          <span className="relative">Buy now</span>
        </a>
      </div>
    </div>
  );
}
