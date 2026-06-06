import Link from "next/link";

export const metadata = {
  title: "Resources, StudySwedish",
  description:
    "Things made by Denise, a book about Swedish culture on Amazon, a free proverbs PDF, and Swedish affirmations on YouTube.",
};

const AMAZON_LINK = "https://amzn.eu/d/08coXSxv";

export default function ResourcesPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>
      <section className="px-6 pt-36 pb-20 sm:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#8B6A3E60" }}>
            From Denise
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl" style={{ color: "#1A1208" }}>
            Things I've made.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed max-w-lg" style={{ color: "#3D2B1470" }}>
            My book on Amazon, a free proverbs PDF, and Swedish affirmations on YouTube.
          </p>
        </div>
      </section>

      {/* Book */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            On Amazon
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            How to Understand a Swede
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
            My book, a guide to the Swedish mindset, the silences, the fika, the
            lagom, and everything that makes a Swede a Swede. Written with humour
            and warmth.
          </p>
          <div className="mt-8">
            <Link
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-7 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#C9A04A", color: "#1A1208" }}
            >
              Buy on Amazon →
            </Link>
          </div>
        </div>
      </section>

      {/* Proverbs */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            Free download
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            50 Swedish Proverbs
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
            Fifty of the most beautiful Swedish proverbs with English translations
            and the stories behind them. A different way to fall in love with the language.
          </p>
          <div className="mt-8">
            <a
              href="/downloads/51-swedish-proverbs.pdf"
              download="51 Swedish Proverbs by Denise.pdf"
              className="inline-block rounded-full px-7 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#C9A04A", color: "#1A1208" }}
            >
              Download free PDF →
            </a>
          </div>
        </div>
      </section>

      {/* Affirmations */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            On YouTube
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            Swedish Affirmations
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
            Positive affirmations in Swedish, recorded by me. Start your morning
            in the language. It works better than you'd think.
          </p>
          <div className="mt-8 overflow-hidden rounded-xl" style={{ maxWidth: "560px" }}>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/XjYvDcHdp1g"
                title="Swedish Affirmations by Denise"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="https://youtu.be/XjYvDcHdp1g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-7 py-3 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#C9A04A", color: "#1A1208" }}
            >
              Watch on YouTube →
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t px-6 py-10" style={{ borderColor: "#C9A04A15" }}>
        <div className="mx-auto max-w-2xl">
          <p className="text-sm" style={{ color: "#3D2B1445" }}>
            Everything else on the site is free.{" "}
            <Link href="/" className="underline underline-offset-2 hover:opacity-70 transition" style={{ color: "#C9A04A" }}>
              Grammar, recipes, community and more.
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
