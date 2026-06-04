import Link from "next/link";

export const metadata = {
  title: "Pricing — StudySwedish",
  description:
    "The full A1 beginner course is free forever. Upgrade to Premium for $12.99/month, or own it for life for $150.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream px-6 pb-0 pt-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl">
            Honestly? Most of it is free.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/60">
            We built a real course, not a demo. The whole A1 level, the grammar
            reference, the recipes, the community — yours without a credit card.
          </p>
        </div>
      </section>

      {/* Free tier — big, generous */}
      <section className="bg-cream px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-forest/15 bg-white px-10 py-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-forest/50">
                  Free — always
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal">
                  $0
                </h2>
                <p className="mt-1 text-sm text-charcoal/45">
                  No credit card. No trial period. No catch.
                </p>
              </div>
              <ul className="flex-1 space-y-3 text-[15px] text-charcoal/70">
                <FreeItem>Complete A1 beginner course — all units</FreeItem>
                <FreeItem>First 2 lessons of every A2–C1 unit</FreeItem>
                <FreeItem>Full grammar reference (all levels)</FreeItem>
                <FreeItem>Every recipe, blog post &amp; travel guide</FreeItem>
                <FreeItem>Community — read, post, reply</FreeItem>
                <FreeItem>Progress tracking &amp; streaks</FreeItem>
              </ul>
            </div>
            <div className="mt-8 border-t border-black/5 pt-6">
              <Link
                href="/auth/login"
                className="inline-flex rounded-full border border-charcoal/15 px-7 py-2.5 text-sm font-medium text-charcoal transition hover:border-charcoal/30 hover:bg-black/[0.02]"
              >
                Start free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Paid options */}
      <section className="bg-cream px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-charcoal">
              Want the full course?
            </h2>
            <p className="mt-2 text-charcoal/50">
              All 52 units, A1 through C1. Audio. PDFs. The whole thing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Monthly */}
            <div className="rounded-2xl border border-black/8 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal/35">
                Monthly
              </p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold text-charcoal">
                  $12.99
                </span>
                <span className="text-sm text-charcoal/40">/ month</span>
              </div>
              <p className="mt-1 text-[13px] text-charcoal/40">
                Cancel any time, no questions.
              </p>
              <ul className="mt-6 space-y-2.5 text-[13px] text-charcoal/60">
                <PaidItem>All 52 units, A1 → C1</PaidItem>
                <PaidItem>Audio lessons with native speakers</PaidItem>
                <PaidItem>Downloadable PDFs for every lesson</PaidItem>
                <PaidItem>AI grammar checks (3/day)</PaidItem>
                <PaidItem>Priority support</PaidItem>
              </ul>
              <Link
                href="/auth/login"
                className="mt-7 block rounded-full border border-charcoal/15 py-2.5 text-center text-sm font-medium text-charcoal transition hover:border-charcoal/30"
              >
                Coming soon
              </Link>
            </div>

            {/* Lifetime */}
            <div className="relative rounded-2xl border border-golden/40 bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-golden-dark/60">
                Lifetime
              </p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold text-charcoal">
                  $150
                </span>
                <span className="text-sm text-charcoal/40">one time</span>
              </div>
              <p className="mt-1 text-[13px] text-charcoal/40">
                Pay once. Yours forever, including future content.
              </p>
              <ul className="mt-6 space-y-2.5 text-[13px] text-charcoal/60">
                <PaidItem>Everything in Monthly</PaidItem>
                <PaidItem>All future units & features included</PaidItem>
                <PaidItem>Early access to new content</PaidItem>
                <PaidItem>Founders&rsquo; community access</PaidItem>
              </ul>
              <Link
                href="/auth/login"
                className="mt-7 block rounded-full bg-charcoal py-2.5 text-center text-sm font-medium text-white transition hover:bg-charcoal/85"
              >
                Coming soon
              </Link>
            </div>
          </div>

          {/* Value nudge */}
          <p className="mt-6 text-center text-[13px] text-charcoal/35">
            For context — one hour with a Swedish tutor typically costs $50–80.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-black/5 bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            A few things people ask
          </h2>
          <div className="mt-8 space-y-8">
            <Faq q="Is free actually free?">
              Yes — the full A1 beginner course, the grammar reference, all the
              recipes and blog posts, and the whole community. No credit card,
              no trial that secretly charges you. It&rsquo;s just free.
            </Faq>
            <Faq q="What do I get for $12.99 that I don't get free?">
              The rest of the course — A2 all the way to C1 (52 units total),
              native-speaker audio for every lesson, downloadable PDFs, and AI
              grammar checks. The free tier gives you a real head start; Premium
              takes you the rest of the way.
            </Faq>
            <Faq q="Why is Lifetime only $150?">
              Because we want serious learners to commit, not feel squeezed. One
              payment, everything included, all future content too. It&rsquo;s
              less than two hours with a private tutor.
            </Faq>
            <Faq q="What if I cancel monthly — do I lose my progress?">
              Never. Your progress and streaks stay. You just go back to the
              free tier limits. Pick it up again whenever.
            </Faq>
          </div>
        </div>
      </section>
    </>
  );
}

function FreeItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 text-forest">✓</span>
      <span>{children}</span>
    </li>
  );
}

function PaidItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 text-charcoal/25">–</span>
      <span>{children}</span>
    </li>
  );
}

function Faq({
  q,
  children,
}: {
  q: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-charcoal">{q}</h3>
      <p className="mt-2 leading-relaxed text-charcoal/60">{children}</p>
    </div>
  );
}
