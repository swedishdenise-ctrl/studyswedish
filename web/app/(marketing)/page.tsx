import Link from "next/link";
import Image from "next/image";

const CALENDLY = "https://calendly.com/swedish-denise/free-15-min-swedish-chat";

export const metadata = {
  title: { absolute: "StudySwedish, Learn Swedish online" },
  description:
    "Swedish words, recipes, culture and a few good proverbs, from someone who is just very Swedish. Book a free 15-minute call to get started.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-svh overflow-hidden px-6 pt-24 sm:pt-0"
        style={{ background: "linear-gradient(135deg, #F0E6D3 0%, #EDE0CC 60%, #E8D8C0 100%)" }}
      >
        <div className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center sm:flex-row sm:items-center sm:gap-12 lg:gap-20">

          {/* Left, text */}
          <div className="relative z-10 flex-1 py-16 sm:py-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#8B6A3E]/60">
              StudySwedish.com
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-[#1A1208] sm:text-6xl lg:text-7xl">
              Just very<br />Swedish.
            </h1>
            <div className="mt-6 h-px w-12 bg-[#C9A04A]/50" />
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-[#3D2B14]/60">
              Hej, I'm Denise, a native Swede sharing the
              language the way it's actually spoken, the
              words, the recipes, the culture, and the
              occasional proverb, because you can't really
              learn one without the other. Classes with me
              are more fika than flashcards, I promise. If
              you want to actually start speaking it, let's
              talk.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)" }}
              >
                Book your free 15-min call →
              </Link>
              <Link
                href="#what-i-share"
                className="rounded-full border border-[#3D2B14]/15 px-7 py-3 text-sm font-medium text-[#3D2B14]/70 transition hover:border-[#3D2B14]/30"
              >
                What I share ↓
              </Link>
            </div>
          </div>

          {/* Right, Denise's photo */}
          <div className="relative mx-auto w-72 shrink-0 sm:mx-0 sm:w-80 lg:w-96">
            <div
              className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl"
              style={{ background: "linear-gradient(135deg, #C9A04A30, #C9A04A10)" }}
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#3D2B14]/15">
              <Image
                src="/images/denise.jpg"
                alt="Denise, StudySwedish"
                width={800}
                height={1000}
                className="block w-full object-cover"
                priority
                quality={90}
              />
              <div
                className="pointer-events-none absolute bottom-0 inset-x-0 h-24"
                style={{ background: "linear-gradient(to top, #E8D8C080, transparent)" }}
              />
            </div>
          </div>

        </div>

        {/* Decorative soft circle */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #C9A04A40 0%, transparent 70%)" }}
        />
      </section>

      {/* Free 15-min call */}
      <section id="book-a-call" className="px-6 py-20" style={{ background: "#FAF5EE" }}>
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Free, 15 minutes
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl" style={{ color: "#1A1208" }}>
            Let's talk for 15 minutes.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed max-w-xl" style={{ color: "#3D2B14BB" }}>
            A quick call so I can hear about your goals and where you're starting from,
            then we get you started learning Swedish with me.
          </p>

          <div className="mt-10">
            {[
              {
                title: "Your goals",
                body: "Why you want to learn Swedish, and what you want to be able to do with it.",
              },
              {
                title: "Your level",
                body: "Complete beginner or already know some Swedish, either is fine.",
              },
              {
                title: "Getting started",
                body: "We figure out the right way for you to start learning with me.",
              },
            ].map((item, i) => (
              <div key={item.title} className="border-t py-8 flex gap-7" style={{ borderColor: "#C9A04A20" }}>
                <span
                  className="font-display text-5xl font-semibold leading-none shrink-0 select-none"
                  style={{ color: "#C9A04A18", marginTop: "2px", minWidth: "3rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>{item.title}</p>
                  <p className="mt-2 text-[16px] leading-relaxed" style={{ color: "#3D2B14BB" }}>{item.body}</p>
                </div>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: "#C9A04A20" }} />
          </div>

          <div className="mt-10">
            <Link
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#C9A04A", color: "#1A1208" }}
            >
              Book your free call →
            </Link>
          </div>
        </div>
      </section>

      {/* What I share, editorial list */}
      <section id="what-i-share" className="px-6 py-20" style={{ background: "#F0E8D8" }}>
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E50" }}>
            All free, always
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            Here's what I share.
          </h2>

          <div className="mt-10">

            {/* Conversagas, featured */}
            <Link
              href="/conversagas"
              className="group block border-t py-8 transition"
              style={{ borderColor: "#C9A04A25" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
                My language app
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold transition group-hover:opacity-70" style={{ color: "#1A1208" }}>
                Conversagas
              </h3>
              <p className="mt-2 text-[16px] leading-relaxed max-w-lg" style={{ color: "#3D2B1470" }}>
                Real lessons, daily stories, and performance tracking. The Swedish app I built because nothing else was good enough.
              </p>
              <span className="mt-3 inline-block text-sm font-medium" style={{ color: "#C9A04A" }}>
                Start free →
              </span>
            </Link>

            {[
              {
                href: "https://amzn.eu/d/08coXSxv",
                label: "How to Understand a Swede",
                desc: "My book on Amazon. The Swedish mindset, the humour, the silence, the fika.",
                external: true,
              },
              {
                href: "/shop",
                label: "50 Swedish Proverbs",
                desc: "A free PDF. Fifty beautiful ordspråk with translations and the stories behind them.",
                external: false,
              },
              {
                href: "/grammar",
                label: "Swedish language",
                desc: "Grammar, vocabulary, verbs and phrases. The way I'd explain it to a friend. No paywall.",
                external: false,
              },
              {
                href: "/recipes",
                label: "Swedish recipes",
                desc: "From köttbullar to cinnamon buns, the real thing.",
                external: false,
              },
              {
                href: "/blog",
                label: "About Sweden",
                desc: "Culture, curiosities, the weird customs and the beautiful ones.",
                external: false,
              },
              {
                href: "/community",
                label: "Community",
                desc: "Ask questions, say hej, share what you find. No account needed to read.",
                external: false,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group flex items-start justify-between gap-6 border-t py-6 transition"
                style={{ borderColor: "#C9A04A18" }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-semibold transition group-hover:opacity-70" style={{ color: "#1A1208" }}>
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "#3D2B1460" }}>
                    {item.desc}
                  </p>
                </div>
                <span
                  className="shrink-0 mt-1 text-lg leading-none opacity-25 transition group-hover:opacity-60"
                  style={{ color: "#1A1208" }}
                >
                  →
                </span>
              </Link>
            ))}
            <div className="border-t" style={{ borderColor: "#C9A04A18" }} />
          </div>
        </div>
      </section>
    </>
  );
}
