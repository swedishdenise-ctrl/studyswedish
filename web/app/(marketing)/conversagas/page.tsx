import Link from "next/link";

export const metadata = {
  title: "Conversagas — Learn Swedish Online | StudySwedish",
  description:
    "Conversagas is a Swedish language learning app with real lessons, daily stories, and performance tracking. Start free — no download, no card required.",
  keywords: [
    "learn Swedish online",
    "Swedish language app",
    "best app to learn Swedish",
    "Swedish lessons for beginners",
    "learn Swedish free",
    "Swedish course online",
    "Conversagas",
  ],
  openGraph: {
    title: "Conversagas — Learn Swedish Online",
    description:
      "Real Swedish lessons, daily stories, and performance tracking. Start free — no download, no card required.",
    url: "https://studyswedish.com/conversagas",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Conversagas",
      url: "https://www.conversagas.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        description: "5-day free trial, no card required",
      },
      description:
        "Conversagas is a Swedish language learning app with interactive lessons, a daily-updated story library, and detailed performance tracking.",
      author: {
        "@type": "Person",
        name: "Denise",
        url: "https://studyswedish.com/about",
      },
      featureList: [
        "Interactive Swedish lessons",
        "Daily new content",
        "Story library by CEFR level",
        "Performance tracking and streak system",
        "No download required",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Conversagas free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Conversagas offers a full 5-day free trial with no credit card required and no download needed. You can start your first Swedish lesson instantly in the browser.",
          },
        },
        {
          "@type": "Question",
          name: "How is Conversagas different from Duolingo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Conversagas is built around real grammar concepts, CEFR-levelled stories, and detailed performance tracking — not gamified streaks. It teaches Swedish the way it actually works, with new content added every day.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to download anything to use Conversagas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Conversagas runs entirely in the browser. No app download required.",
          },
        },
        {
          "@type": "Question",
          name: "What level of Swedish can I reach with Conversagas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Conversagas covers Swedish from complete beginner (A1) through advanced (B2+), with lessons and stories matched to your CEFR level at every stage.",
          },
        },
        {
          "@type": "Question",
          name: "Who created Conversagas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Conversagas was created by Denise and her partner. Denise is a Swedish creator behind StudySwedish.com and the author of 'How to Understand a Swede'. Together they built Conversagas after seeing what was genuinely missing from existing Swedish language tools.",
          },
        },
        {
          "@type": "Question",
          name: "What languages can I learn on Conversagas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Swedish is the primary language on Conversagas, with Spanish also available. The platform is built specifically for learners who want to go beyond surface-level vocabulary.",
          },
        },
      ],
    },
  ],
};

const features = [
  {
    number: "01",
    title: "A real course",
    desc: "Interactive lessons that teach the concepts that actually deliver fluency — not word matching, not streaks for the sake of streaks. Learn the rules, hear the pronunciation, and practice with content that changes every time you enter.",
  },
  {
    number: "02",
    title: "A library built for fluency",
    desc: "Stories and grammar topics built on real conversations and speech patterns natives actually use. Every piece is level-specific, so you're always challenged — never lost, never bored.",
  },
  {
    number: "03",
    title: "New content, every day",
    desc: "Fresh lessons and articles posted daily. Learn the language and the culture at the same time — why everyone disappears to a summer cottage in July, what fika actually means, how Swedes really talk.",
  },
  {
    number: "04",
    title: "Performance, measured",
    desc: "Words learned, study time, accuracy by tense, streak, percentile ranking. The same accountability tools elite athletes use. If you plateau, you'll know exactly why — and exactly what to do next.",
  },
];

const faqs = [
  {
    q: "Is Conversagas free?",
    a: "Yes — full 5-day free access, no credit card required, no download. Start your first lesson right now in the browser.",
  },
  {
    q: "How is it different from Duolingo?",
    a: "Conversagas teaches real grammar concepts with CEFR-levelled stories and detailed performance data — not gamified streaks. New content is added every day, so you never run out of level-appropriate material.",
  },
  {
    q: "Do I need to download anything?",
    a: "No. Conversagas runs entirely in the browser on any device.",
  },
  {
    q: "What level can I reach?",
    a: "From complete beginner (A1) through advanced (B2+). Lessons and stories are matched to your level at every stage.",
  },
  {
    q: "Who made Conversagas?",
    a: "Denise and her partner — the same team behind StudySwedish.com. Denise handles the Swedish content and creative direction; together they built Conversagas after seeing what was genuinely missing from existing Swedish learning tools.",
  },
];

export default function ConversagasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        className="relative min-h-[60vh] overflow-hidden px-6 pt-36 pb-20 sm:pt-44"
        style={{ background: "linear-gradient(160deg, #1A1208 0%, #2C1A08 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C9A04A 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 h-px w-full opacity-20" style={{ background: "linear-gradient(90deg, transparent, #C9A04A, transparent)" }} />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A80" }}>
            My language app
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl" style={{ color: "#F5EDE3" }}>
            The Swedish app I built because nothing else was good enough.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: "#F5EDE370" }}>
            I saw what was missing from Swedish learning tools — and built Conversagas
            to fix it. Real lessons, real stories, and tracking that actually
            tells you something.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="https://www.conversagas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)", color: "#1A1208" }}
            >
              Start free — no card needed →
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: "#F5EDE330" }}>
            Full 5-day free access. No download. No card required.
          </p>
        </div>
      </section>

      {/* Four features */}
      <section className="px-6 py-16 sm:py-20" style={{ background: "#FAF5EE" }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            How it works
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            Four parts. One spine.
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "#3D2B1470" }}>
            Every part is built to reinforce every other. Your reading sharpens your drills.
            Your drills feed your lessons. Your performance shows you the path.
          </p>

          <div className="mt-10 space-y-4">
            {features.map((f) => (
              <div
                key={f.number}
                className="flex gap-6 rounded-2xl border bg-white p-6 sm:p-8"
                style={{ borderColor: "#C9A04A15" }}
              >
                <span
                  className="mt-0.5 shrink-0 font-display text-3xl font-semibold leading-none"
                  style={{ color: "#C9A04A30" }}
                >
                  {f.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold" style={{ color: "#1A1208" }}>
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#3D2B1460" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — AEO + GEO */}
      <section className="px-6 py-16" style={{ background: "#F0E8D8" }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Questions
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            Everything you need to know.
          </h2>
          <div className="mt-8 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border bg-white p-6" style={{ borderColor: "#C9A04A15" }}>
                <h3 className="font-semibold text-[15px]" style={{ color: "#1A1208" }}>{faq.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#3D2B1460" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16" style={{ background: "#1A1208" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold" style={{ color: "#F5EDE3" }}>
            Swedish now. Live.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed" style={{ color: "#F5EDE350" }}>
            Start your first lesson today. No download, no card, no commitment —
            just Swedish, the way it should be taught.
          </p>
          <Link
            href="https://www.conversagas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #C9A04A, #A8813A)", color: "#1A1208" }}
          >
            Start free at Conversagas.com →
          </Link>
        </div>
      </section>
    </>
  );
}
