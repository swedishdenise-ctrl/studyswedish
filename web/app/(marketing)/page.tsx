import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Denise — StudySwedish",
  description:
    "Swedish words, recipes, culture and a few good proverbs — from someone who is just very Swedish.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-svh overflow-hidden px-6 pt-24 sm:pt-0"
        style={{ background: "linear-gradient(135deg, #F0E6D3 0%, #EDE0CC 60%, #E8D8C0 100%)" }}
      >
        <div className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center sm:flex-row sm:items-center sm:gap-12 lg:gap-20">

          {/* Left — text */}
          <div className="relative z-10 flex-1 py-16 sm:py-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#8B6A3E]/60">
              StudySwedish.com
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-[#1A1208] sm:text-6xl lg:text-7xl">
              Just very<br />Swedish.
            </h1>
            <div className="mt-6 h-px w-12 bg-[#C9A04A]/50" />
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-[#3D2B14]/60">
              Hej, I'm Denise. I share Swedish words,
              recipes, culture and the occasional proverb —
              because I love where I'm from and I want
              you to love it too.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#what-i-share"
                className="rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)" }}
              >
                What I share ↓
              </Link>
              <Link
                href="/community"
                className="rounded-full border border-[#3D2B14]/15 px-7 py-3 text-sm font-medium text-[#3D2B14]/70 transition hover:border-[#3D2B14]/30"
              >
                Say hej
              </Link>
            </div>
          </div>

          {/* Right — Denise's photo */}
          <div className="relative mx-auto w-72 shrink-0 sm:mx-0 sm:w-80 lg:w-96">
            {/* Soft gold frame behind the photo */}
            <div
              className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl"
              style={{ background: "linear-gradient(135deg, #C9A04A30, #C9A04A10)" }}
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#3D2B14]/15">
              <Image
                src="/images/denise.jpg"
                alt="Denise — StudySwedish"
                width={800}
                height={1000}
                className="block w-full object-cover"
                priority
                quality={90}
              />
              {/* Subtle warm overlay at bottom */}
              <div
                className="pointer-events-none absolute bottom-0 inset-x-0 h-24"
                style={{ background: "linear-gradient(to top, #E8D8C080, transparent)" }}
              />
            </div>
          </div>

        </div>

        {/* Decorative soft circle — top right */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #C9A04A40 0%, transparent 70%)" }}
        />
      </section>

      {/* ── Everything I share ── */}
      <section
        id="what-i-share"
        className="px-6 py-14 sm:py-16"
        style={{ background: "#F8F2E8" }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B6A3E]/50">
            All free — always
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-[#1A1208]">
            Here's what I share.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Conversagas — full width featured */}
            <Link
              href="/conversagas"
              className="group relative col-span-1 overflow-hidden rounded-2xl sm:col-span-2"
              style={{ background: "linear-gradient(160deg, #1A1208 0%, #2C1A08 100%)" }}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #C9A04A 0%, transparent 70%)" }} />

              <div className="relative flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A80" }}>
                    My language app
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl" style={{ color: "#F5EDE3" }}>
                    Conversagas
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: "#F5EDE360" }}>
                    Real lessons, daily stories, and performance tracking. The Swedish app I built because nothing else was good enough.
                  </p>
                </div>
                <div className="shrink-0">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition group-hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)", color: "#1A1208" }}
                  >
                    Start free →
                  </span>
                  <p className="mt-2 text-center text-[10px]" style={{ color: "#F5EDE325" }}>No card needed</p>
                </div>
              </div>
            </Link>

            {/* Ebook */}
            <OfferingCard
              href="https://amzn.eu/d/08coXSxv"
              header={
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(160deg,#1A1208,#2C1E0A)" }}
                >
                  <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.08]">
                    <div className="absolute bottom-0 right-12 h-40 w-4" style={{ background: "#C9A04A" }} />
                    <div className="absolute bottom-20 right-0 h-4 w-40" style={{ background: "#C9A04A" }} />
                  </div>
                  <div className="relative text-center px-4">
                    <p className="font-display text-xl font-semibold leading-snug text-white">
                      How to Understand<br />a Swede
                    </p>
                    <div className="mx-auto mt-2 h-px w-10" style={{ background: "#C9A04A60" }} />
                    <p className="mt-2 text-[10px] italic tracking-widest" style={{ color: "#C9A04A60" }}>by Denise</p>
                  </div>
                  <span className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-[#1A1208]" style={{ background: "#C9A04A" }}>
                    On Amazon
                  </span>
                </div>
              }
              title="How to Understand a Swede"
              desc="My book — a guide to the Swedish mindset, with the humour, the silence, the fika, and everything in between. Available on Amazon."
              cta="Buy on Amazon →"
            />

            {/* 50 Swedish Proverbs — free download */}
            <OfferingCard
              href="/shop"
              header={
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(160deg,#2A1A08,#1A1208)" }}
                >
                  <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.06]">
                    <div className="absolute bottom-0 right-12 h-40 w-4" style={{ background: "#C9A04A" }} />
                    <div className="absolute bottom-20 right-0 h-4 w-40" style={{ background: "#C9A04A" }} />
                  </div>
                  <div className="relative text-center px-4">
                    <p className="font-display text-xl font-semibold leading-snug text-white">
                      50 Swedish<br />Proverbs
                    </p>
                    <div className="mx-auto mt-2 h-px w-10" style={{ background: "#C9A04A60" }} />
                    <p className="mt-2 text-[10px] italic tracking-widest" style={{ color: "#C9A04A60" }}>Ordspråk</p>
                  </div>
                  <span className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-[#1A1208]" style={{ background: "#C9A04A" }}>
                    Free
                  </span>
                </div>
              }
              title="50 Swedish Proverbs"
              desc="Fifty beautiful Swedish proverbs with translations and the stories behind them. Free download."
              cta="Download free →"
            />

            {/* Affirmations */}
            <OfferingCard
              href="/shop"
              header={
                <div
                  className="relative flex h-36 items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(160deg,#1E2D1A,#0F1A0C)" }}
                >
                  <div className="pointer-events-none absolute bottom-3 inset-x-6 flex items-end justify-center gap-1 opacity-[0.15]">
                    {[3,6,9,5,12,7,4,10,6,5,8,4,7,5,3].map((h, i) => (
                      <div key={i} className="rounded-full bg-white" style={{ width: 4, height: h * 3 }} />
                    ))}
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                      <svg className="ml-0.5 h-4 w-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="mt-2.5 font-display text-xl font-semibold text-white">Swedish Affirmations</p>
                    <p className="mt-1 text-[10px] italic tracking-widest text-white/30">Dagliga affirmationer</p>
                  </div>
                  <span className="absolute top-3 right-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white/80">
                    Free
                  </span>
                </div>
              }
              title="Swedish Affirmations"
              desc="Start your morning in Swedish. Positive affirmations recorded by me — it works better than you'd think."
              cta="Listen free →"
            />

            {/* Swedish language */}
            <OfferingCard
              href="/grammar"
              header={
                <div className="flex h-36 items-center justify-center border-b border-[#C9A04A]/10" style={{ background: "#F0E8D8" }}>
                  <div className="text-center">
                    <p className="font-display text-3xl font-semibold tracking-tight" style={{ color: "#8B6A3E" }}>
                      Lär dig svenska.
                    </p>
                    <p className="mt-1.5 text-xs tracking-wider" style={{ color: "#8B6A3E60" }}>Grammar · Vocab · Verbs · Phrases</p>
                  </div>
                </div>
              }
              title="Swedish language"
              desc="Grammar, vocabulary, verbs and phrases — the way I'd explain it to a friend. No jargon, no paywall."
              cta="Start learning →"
            />

            {/* About Sweden */}
            <OfferingCard
              href="/blog"
              header={
                <div className="flex h-36 items-center justify-center border-b border-[#C9A04A]/10 px-6" style={{ background: "#EDE0CC" }}>
                  <p className="text-center font-display text-2xl font-semibold italic" style={{ color: "#7A5830" }}>
                    &ldquo;Sverige är bäst.&rdquo;
                  </p>
                </div>
              }
              title="About Sweden"
              desc="Everything that makes Sweden... Sweden. Culture, curiosities, the weird customs and the beautiful ones."
              cta="Explore →"
            />

            {/* Recipes */}
            <OfferingCard
              href="/recipes"
              header={
                <div className="flex h-36 items-center justify-center border-b border-[#C9A04A]/10" style={{ background: "#F5EAE0" }}>
                  <div className="text-center">
                    <p className="text-5xl">☕</p>
                    <p className="mt-2 font-display text-lg font-semibold" style={{ color: "#8B4A30" }}>Fika. And more.</p>
                  </div>
                </div>
              }
              title="Swedish recipes"
              desc="Real Swedish recipes — yes, meatballs, but also cinnamon buns, gravlax and everything in between."
              cta="Cook something →"
            />

            {/* Community */}
            <OfferingCard
              href="/community"
              header={
                <div className="flex h-36 items-center justify-center border-b border-[#C9A04A]/10 px-4" style={{ background: "#EAF0E8" }}>
                  <div className="text-center">
                    <p className="font-display text-2xl font-semibold" style={{ color: "#3D5A35" }}>Välkommen in.</p>
                    <p className="mt-1 text-xs tracking-wider" style={{ color: "#3D5A3550" }}>You&apos;re welcome in.</p>
                  </div>
                </div>
              }
              title="Community"
              desc="Other people who love Sweden. Ask questions, share tips, talk about whatever. No account needed."
              cta="Say hej →"
            />

          </div>
        </div>
      </section>
    </>
  );
}

function OfferingCard({
  href,
  header,
  title,
  desc,
  cta,
}: {
  href: string;
  header: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg"
      style={{ borderColor: "#C9A04A18" }}
    >
      {header}
      <div className="p-5">
        <h3
          className="font-display text-[17px] font-semibold transition-colors"
          style={{ color: "#1A1208" }}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#3D2B1480" }}>{desc}</p>
        <p
          className="mt-4 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: "#C9A04A" }}
        >
          {cta}
        </p>
      </div>
    </Link>
  );
}
