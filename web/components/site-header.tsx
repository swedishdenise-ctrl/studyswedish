"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const learnLinks = [
  { href: "/grammar",    label: "Grammar",    desc: "Rules & explanations" },
  { href: "/vocabulary", label: "Vocabulary", desc: "Words by category" },
  { href: "/verbs",      label: "Verbs",      desc: "Full conjugation tables" },
  { href: "/phrases",    label: "Phrases",    desc: "Everyday expressions" },
];

const swedenLinks = [
  { href: "/blog",       label: "About Sweden", desc: "Culture, curiosities & stories" },
  { href: "/recipes",    label: "Recipes",      desc: "Swedish food & fika" },
  { href: "/daily-word", label: "Daily word",   desc: "A new word every day" },
];

const WARM_BG   = "#F5EDE3";
const WARM_TEXT = "#3D2B14";
const GOLD      = "#C9A04A";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const mobileRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setOpenMenu(null);
    if (mobileRef.current) mobileRef.current.open = false;
  }, [pathname]);

  const floating = isHome && !scrolled;

  function handleEnter(menu: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(menu);
  }
  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  }
  function toggle(menu: string) {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  }

  const deskBtnStyle = floating
    ? { color: "rgba(255,255,255,0.85)" }
    : { color: `${WARM_TEXT}CC` };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300"
      style={
        floating
          ? { background: "transparent", borderBottom: "1px solid transparent" }
          : {
              background: `${WARM_BG}F2`,
              borderBottom: `1px solid ${GOLD}22`,
              boxShadow: "0 1px 12px rgba(61,43,20,0.06)",
              backdropFilter: "blur(12px)",
            }
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight transition-colors duration-300"
          style={{ color: floating ? "rgba(255,255,255,0.95)" : "#1A1208" }}
        >
          StudySwedish
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          <li className="relative" onMouseEnter={() => handleEnter("learn")} onMouseLeave={handleLeave}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5"
              style={deskBtnStyle}
              onClick={() => toggle("learn")}
            >
              Swedish <Chevron floating={floating} open={openMenu === "learn"} />
            </button>
            {openMenu === "learn" && <DesktopDropdown links={learnLinks} />}
          </li>
          <li className="relative" onMouseEnter={() => handleEnter("sweden")} onMouseLeave={handleLeave}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5"
              style={deskBtnStyle}
              onClick={() => toggle("sweden")}
            >
              Life in Sweden <Chevron floating={floating} open={openMenu === "sweden"} />
            </button>
            {openMenu === "sweden" && <DesktopDropdown links={swedenLinks} />}
          </li>
          <li>
            <Link href="/coaching" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5" style={deskBtnStyle}>
              Coaching
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5" style={deskBtnStyle}>
              About
            </Link>
          </li>
          <li>
            <Link href="/community" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5" style={deskBtnStyle}>
              Community
            </Link>
          </li>
          <li>
            <Link href="/shop" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5" style={deskBtnStyle}>
              Downloads
            </Link>
          </li>
          <li>
            <Link href="/conversagas" className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition" style={{ color: GOLD }}>
              Conversagas
            </Link>
          </li>
        </ul>

        {/* Right: hamburger */}
        <div className="flex items-center gap-2">
          <details ref={mobileRef} className="md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg p-2 hover:bg-black/5 active:bg-black/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22" height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: floating ? "rgba(255,255,255,0.9)" : WARM_TEXT }}
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </summary>

            {/* Mobile drawer */}
            <div
              className="fixed inset-x-0 top-16 z-50 shadow-xl"
              style={{ background: WARM_BG, borderBottom: `1px solid ${GOLD}20` }}
            >
              <nav aria-label="Mobile navigation">
                <ul className="divide-y" style={{ borderColor: `${GOLD}15` }}>

                  <li>
                    <details>
                      <summary
                        className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-base font-medium hover:bg-black/5 active:bg-black/10"
                        style={{ color: WARM_TEXT }}
                      >
                        Swedish
                        <svg className="h-4 w-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <ul className="pb-2" style={{ background: "rgba(201,160,74,0.05)" }}>
                        {learnLinks.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className="flex flex-col px-8 py-3 hover:bg-black/5">
                              <span className="text-sm font-medium" style={{ color: WARM_TEXT }}>{link.label}</span>
                              <span className="text-xs opacity-50" style={{ color: WARM_TEXT }}>{link.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary
                        className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-base font-medium hover:bg-black/5 active:bg-black/10"
                        style={{ color: WARM_TEXT }}
                      >
                        Life in Sweden
                        <svg className="h-4 w-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <ul className="pb-2" style={{ background: "rgba(201,160,74,0.05)" }}>
                        {swedenLinks.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className="flex flex-col px-8 py-3 hover:bg-black/5">
                              <span className="text-sm font-medium" style={{ color: WARM_TEXT }}>{link.label}</span>
                              <span className="text-xs opacity-50" style={{ color: WARM_TEXT }}>{link.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>

                  <li>
                    <Link href="/coaching" className="block px-6 py-4 text-base font-medium hover:bg-black/5" style={{ color: WARM_TEXT }}>
                      Coaching
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="block px-6 py-4 text-base font-medium hover:bg-black/5" style={{ color: WARM_TEXT }}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="block px-6 py-4 text-base font-medium hover:bg-black/5" style={{ color: WARM_TEXT }}>
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="block px-6 py-4 text-base font-medium hover:bg-black/5" style={{ color: WARM_TEXT }}>
                      Downloads
                    </Link>
                  </li>
                  <li>
                    <Link href="/conversagas" className="block px-6 py-4 text-base font-semibold hover:bg-black/5" style={{ color: GOLD }}>
                      Conversagas
                    </Link>
                  </li>

                </ul>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

function DesktopDropdown({ links }: { links: { href: string; label: string; desc: string }[] }) {
  return (
    <div className="absolute left-0 top-full pt-2">
      <div
        className="w-56 overflow-hidden rounded-xl p-2 shadow-xl"
        style={{ background: WARM_BG, border: `1px solid ${GOLD}18` }}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2.5 transition hover:bg-black/5">
            <span className="block text-sm font-medium" style={{ color: "#1A1208" }}>{link.label}</span>
            <span className="block text-xs opacity-45" style={{ color: "#3D2B14" }}>{link.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Chevron({ floating, open }: { floating: boolean; open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      style={{ color: floating ? "rgba(255,255,255,0.45)" : `${WARM_TEXT}55` }}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
