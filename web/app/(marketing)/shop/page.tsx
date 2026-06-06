import Link from "next/link";

export const metadata = {
  title: "Resources, StudySwedish",
  description:
    "Things made by Denise, a book about Swedish culture on Amazon, a free proverbs PDF, and Swedish affirmations on YouTube.",
};

const AMAZON_LINK = "https://amzn.eu/d/08coXSxv";

export default function ResourcesPage() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-20 sm:pt-44" style={{ background: "#FAF5EE" }}>
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#8B6A3E60" }}>
          From Denise
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl" style={{ color: "#1A1208" }}>
          Things I've made.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed max-w-lg" style={{ color: "#3D2B1470" }}>
          My book on Amazon, a free proverbs PDF, and Swedish affirmations on YouTube.
        </p>

        <div className="mt-12 space-y-5">

          {/* Book, Amazon */}
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#C9A04A18" }}>
            <div
              className="relative flex h-48 items-center justify-center overflow-hidden sm:h-56"
              style={{ background: "linear-gradient(160deg,#1A1208,#2C1E0A)" }}
            >
              <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.07]">
                <div className="absolute bottom-0 right-16 h-56 w-5" style={{ background: "#C9A04A" }} />
                <div className="absolute bottom-32 right-0 h-5 w-56" style={{ background: "#C9A04A" }} />
              </div>
              <div className="relative text-center px-4">
                <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  How to Understand<br />a Swede
                </p>
                <div className="mx-auto mt-3 h-px w-12" style={{ background: "#C9A04A50" }} />
                <p className="mt-3 text-sm italic tracking-[0.2em]" style={{ color: "#C9A04A60" }}>by Denise</p>
              </div>
              <span
                className="absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold"
                style={{ background: "#C9A04A", color: "#1A1208" }}
              >
                On Amazon
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
                How to Understand a Swede
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed max-w-xl" style={{ color: "#3D2B1460" }}>
                My book, a guide to the Swedish mindset, the silences, the fika, the
                lagom, and everything that makes a Swede a Swede. Written with humour
                and warmth. Available on Amazon.
              </p>
              <div className="mt-7">
                <Link
                  href={AMAZON_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)" }}
                >
                  Buy on Amazon →
                </Link>
              </div>
            </div>
          </div>

          {/* 50 Swedish Proverbs, coming soon */}
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#C9A04A18" }}>
            <div
              className="relative flex h-48 items-center justify-center overflow-hidden sm:h-56"
              style={{ background: "linear-gradient(160deg,#2A1A08,#1A1208)" }}
            >
              <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.06]">
                <div className="absolute bottom-0 right-16 h-56 w-5" style={{ background: "#C9A04A" }} />
                <div className="absolute bottom-32 right-0 h-5 w-56" style={{ background: "#C9A04A" }} />
              </div>
              <div className="relative text-center px-4">
                <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  50 Swedish<br />Proverbs
                </p>
                <div className="mx-auto mt-3 h-px w-12" style={{ background: "#C9A04A50" }} />
                <p className="mt-3 text-sm italic tracking-[0.2em]" style={{ color: "#C9A04A60" }}>Ordspråk</p>
              </div>
              <span
                className="absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold"
                style={{ background: "#C9A04A", color: "#1A1208" }}
              >
                Free download
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
                50 Swedish Proverbs
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed max-w-xl" style={{ color: "#3D2B1460" }}>
                Fifty of the most beautiful Swedish proverbs with English translations
                and the stories behind them. A different way to fall in love with the language.
              </p>
              <div className="mt-7">
                <a
                  href="/downloads/51-swedish-proverbs.pdf"
                  download="51 Swedish Proverbs by Denise.pdf"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)" }}
                >
                  Download free PDF →
                </a>
              </div>
            </div>
          </div>

          {/* Audio affirmations */}
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#C9A04A18" }}>
            {/* YouTube embed */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/XjYvDcHdp1g"
                title="Swedish Affirmations by Denise"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
                Swedish Affirmations
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed max-w-xl" style={{ color: "#3D2B1460" }}>
                Positive affirmations in Swedish, recorded by me. Start your morning
                in the language, it works better than you'd think.
              </p>
              <div className="mt-7">
                <Link
                  href="https://youtu.be/XjYvDcHdp1g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)" }}
                >
                  Watch on YouTube →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-10" style={{ borderColor: "#C9A04A15" }}>
          <p className="text-sm" style={{ color: "#3D2B1445" }}>
            Everything else on the site is free —{" "}
            <Link href="/" className="underline underline-offset-2 hover:opacity-70 transition">
              grammar, recipes, community and more.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
