import Link from "next/link";

export const metadata = {
  title: "Pricing, StudySwedish",
  description:
    "The full A1 beginner course is free forever. Upgrade to Premium for $12.99/month, or own it for life for $150.",
};

export default function PricingPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>

      {/* Hero */}
      <section className="px-6 pt-36 pb-16 sm:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Pricing
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl" style={{ color: "#1A1208" }}>
            Honestly? Most of it is free.
          </h1>
          <p className="mt-5 text-lg leading-relaxed max-w-xl" style={{ color: "#3D2B14BB" }}>
            We built a real course, not a demo. The whole A1 level, the grammar
            reference, the recipes, the community, yours without a credit card.
          </p>
        </div>
      </section>

      {/* Free tier */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Free, always
          </p>
          <p className="mt-3 font-display text-5xl font-semibold" style={{ color: "#1A1208" }}>$0</p>
          <p className="mt-2 text-sm" style={{ color: "#3D2B1460" }}>No credit card. No trial period. No catch.</p>

          <div className="mt-8 space-y-3">
            {[
              "Complete A1 beginner course, all units",
              "First 2 lessons of every A2–C1 unit",
              "Full grammar reference (all levels)",
              "Every recipe, blog post and travel guide",
              "Community, read, post, reply",
              "Progress tracking and streaks",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#C9A04A" }} />
                <p className="text-[15px]" style={{ color: "#3D2B14" }}>{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/auth/login"
              className="inline-block rounded-full border px-7 py-2.5 text-sm font-medium transition hover:border-[#1A1208]/30"
              style={{ borderColor: "#1A1208", color: "#1A1208" }}
            >
              Start free
            </Link>
          </div>
        </div>
      </section>

      {/* Paid options */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Premium
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            Want the full course?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#3D2B1470" }}>
            All 52 units, A1 through C1. Audio. PDFs. The whole thing.
          </p>

          <div className="mt-10">
            <div className="border-t py-8 sm:flex sm:items-start sm:justify-between sm:gap-8" style={{ borderColor: "#C9A04A20" }}>
              <div className="flex-1">
                <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Monthly</p>
                <p className="mt-1 text-sm" style={{ color: "#3D2B1460" }}>Cancel any time, no questions.</p>
                <div className="mt-5 space-y-2">
                  {[
                    "All 52 units, A1 through C1",
                    "Audio lessons with native speakers",
                    "Downloadable PDFs for every lesson",
                    "AI grammar checks (3/day)",
                    "Priority support",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#C9A04A60" }} />
                      <p className="text-sm" style={{ color: "#3D2B1470" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 sm:mt-0 sm:shrink-0 sm:text-right">
                <p className="font-display text-4xl font-semibold" style={{ color: "#1A1208" }}>$12.99</p>
                <p className="mt-1 text-sm" style={{ color: "#3D2B1460" }}>per month</p>
                <Link
                  href="/auth/login"
                  className="mt-5 inline-block rounded-full border px-6 py-2.5 text-sm font-medium transition hover:border-[#1A1208]/30"
                  style={{ borderColor: "#C9A04A50", color: "#1A1208" }}
                >
                  Coming soon
                </Link>
              </div>
            </div>

            <div className="border-t py-8 sm:flex sm:items-start sm:justify-between sm:gap-8" style={{ borderColor: "#C9A04A20" }}>
              <div className="flex-1">
                <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Lifetime</p>
                <p className="mt-1 text-sm" style={{ color: "#3D2B1460" }}>Pay once. Yours forever, including future content.</p>
                <div className="mt-5 space-y-2">
                  {[
                    "Everything in Monthly",
                    "All future units and features included",
                    "Early access to new content",
                    "Founders' community access",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#C9A04A60" }} />
                      <p className="text-sm" style={{ color: "#3D2B1470" }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 sm:mt-0 sm:shrink-0 sm:text-right">
                <p className="font-display text-4xl font-semibold" style={{ color: "#1A1208" }}>$150</p>
                <p className="mt-1 text-sm" style={{ color: "#3D2B1460" }}>one time</p>
                <Link
                  href="/auth/login"
                  className="mt-5 inline-block rounded-full px-6 py-2.5 text-sm font-medium transition hover:opacity-90"
                  style={{ background: "#C9A04A", color: "#1A1208" }}
                >
                  Coming soon
                </Link>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: "#C9A04A20" }} />
          </div>

          <p className="mt-6 text-sm" style={{ color: "#3D2B1445" }}>
            For context, one hour with a Swedish tutor typically costs $50–80.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Questions
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            A few things people ask.
          </h2>
          <div className="mt-10">
            {[
              {
                q: "Is free actually free?",
                a: "Yes, the full A1 beginner course, the grammar reference, all the recipes and blog posts, and the whole community. No credit card, no trial that secretly charges you. It's just free.",
              },
              {
                q: "What do I get for $12.99 that I don't get free?",
                a: "The rest of the course, A2 all the way to C1 (52 units total), native-speaker audio for every lesson, downloadable PDFs, and AI grammar checks. The free tier gives you a real head start; Premium takes you the rest of the way.",
              },
              {
                q: "Why is Lifetime only $150?",
                a: "Because we want serious learners to commit, not feel squeezed. One payment, everything included, all future content too. It's less than two hours with a private tutor.",
              },
              {
                q: "What if I cancel monthly, do I lose my progress?",
                a: "Never. Your progress and streaks stay. You just go back to the free tier limits. Pick it up again whenever.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-t py-7" style={{ borderColor: "#C9A04A20" }}>
                <h3 className="font-display text-lg font-semibold" style={{ color: "#1A1208" }}>{faq.q}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#3D2B1460" }}>{faq.a}</p>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: "#C9A04A20" }} />
          </div>
        </div>
      </section>

    </div>
  );
}
