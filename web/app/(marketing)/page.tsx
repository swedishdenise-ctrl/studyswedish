import type { ReactNode } from "react";
import { StoreButtonNative } from "@/components/store/button";
import { Eyebrow } from "@/components/store/section";
import { FlipMagnet } from "@/components/store/flip-magnet";
import { Reveal } from "@/components/store/reveal";
import { FridgeScene, type FridgeMagnet } from "@/components/store/fridge-scene";

const FRIDGE: FridgeMagnet[] = [
  { cutout: "/magnets/cut/sverige.png", name: "Jag älskar Sverige", short: "I love Sweden", mobile: [6, 6, -6], desktop: [9, 9, -6] },
  { cutout: "/magnets/cut/lagom.png", name: "Lagom är bäst", short: "Just the right amount is best", mobile: [53, 13, 5], desktop: [32, 44, 4] },
  { cutout: "/magnets/cut/fikadags.png", name: "Fikadags!", short: "Time for fika!", mobile: [9, 52, 4], desktop: [55, 7, 3] },
  { cutout: "/magnets/cut/dra-at-skogen.png", name: "Dra åt skogen!", short: "Go to the forest! (= get lost)", mobile: [52, 58, -4], desktop: [72, 45, -5] },
];

const DESCRIPTION =
  "4 acrylic fridge magnets with real Swedish words and phrases — Jag älskar Sverige, Lagom är bäst, Fikadags! and Dra åt skogen! €29.99, shipping included worldwide.";

export const metadata = {
  title: { absolute: "Swedish Words Fridge Magnets — StudySwedish" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "StudySwedish",
    title: "Swedish Words Fridge Magnets",
    description: DESCRIPTION,
    images: [{ url: "/og-magnets.jpg", width: 1200, height: 630, alt: "Four Swedish words fridge magnets on a fridge door" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swedish Words Fridge Magnets",
    description: DESCRIPTION,
    images: ["/og-magnets.jpg"],
  },
};

const PAYMENT_LINK = "https://buy.stripe.com/aFaeVc93F8sn56rebwf3a08";

// Lets Google show the product with its price in search results
const PRODUCT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Swedish Words Fridge Magnets — Set of 4",
  description: DESCRIPTION,
  image: [
    "https://studyswedish.com/og-magnets.jpg",
    "https://studyswedish.com/magnets/sverige.png",
    "https://studyswedish.com/magnets/lagom.png",
    "https://studyswedish.com/magnets/fikadags.png",
    "https://studyswedish.com/magnets/dra-at-skogen.png",
  ],
  brand: { "@type": "Brand", name: "StudySwedish" },
  offers: {
    "@type": "Offer",
    url: "https://studyswedish.com/",
    price: "29.99",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
    },
  },
};

const DESIGNS = [
  {
    src: "/magnets/sverige.png",
    alt: "Jag älskar Sverige magnet",
    name: "Jag älskar Sverige",
    meaning: "“I love Sweden.” The heart stands in for älskar (loves).",
  },
  {
    src: "/magnets/lagom.png",
    alt: "Lagom är bäst magnet",
    name: "Lagom är bäst",
    meaning: "Swedish for “just the right amount” — not too much, not too little.",
  },
  {
    src: "/magnets/fikadags.png",
    alt: "Fikadags! magnet",
    name: "Fikadags!",
    meaning: "Swedish for “time for fika!” — the sacred coffee break.",
  },
  {
    src: "/magnets/dra-at-skogen.png",
    alt: "Dra åt skogen! magnet",
    name: "Dra åt skogen!",
    meaning: "Literally “go to the forest” — a polite(ish) way to say get lost.",
  },
];

const WORDS = ["Jag älskar Sverige", "Lagom är bäst", "Fikadags!", "Dra åt skogen!"];

const GIFT_FOR = [
  {
    title: "The Swede abroad",
    text: "A little piece of home on the fridge — and the phrases they actually miss saying.",
  },
  {
    title: "The Sweden lover",
    text: "For the friend who's been to Stockholm twice and still talks about the fika.",
  },
  {
    title: "The language learner",
    text: "Four real phrases they'll see every single day — learning without even trying.",
  },
];

const SPECS = [
  "4 designs: Jag älskar Sverige, Lagom är bäst, Fikadags! and Dra åt skogen!",
  "6 cm acrylic, 3 mm thick, with a 1 mm magnet backing",
  "Each magnet sealed in its own bag",
  "A card with a QR code to follow along on Instagram",
  "Shipping included, worldwide",
];

const FAQ = [
  {
    q: "What's actually in the box?",
    a: "4 acrylic fridge magnets (6cm, 3mm acrylic + 1mm magnet backing), each sealed in its own bag, plus one card with a QR code to follow along on Instagram.",
  },
  {
    q: "How much is shipping?",
    a: "Shipping is already included in the €29.99 price, worldwide — no surprise fees at checkout.",
  },
  {
    q: "How long does delivery take?",
    a: "I ship from Spain via Correos. EU orders typically arrive faster than international ones — I'll have tracking info for every order.",
  },
  {
    q: "Can I buy just one design?",
    a: "Not for now — they're sold as the full set of 4 only.",
  },
  {
    q: "What if mine arrives damaged?",
    a: "Message me on Instagram (@swedish_with_denise) with a photo and I'll sort it out — a replacement or refund, no hassle.",
  },
];

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const TRUST = [
  {
    title: "Free shipping",
    text: "Included in the price, worldwide",
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </Icon>
    ),
  },
  {
    title: "Tracked delivery",
    text: "Sent from Spain with tracking",
    icon: (
      <Icon>
        <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
        <path d="M3 7l9 4 9-4M12 11v10" />
      </Icon>
    ),
  },
  {
    title: "Secure checkout",
    text: "Card payments via Stripe",
    icon: (
      <Icon>
        <rect x="5" y="11" width="14" height="10" rx="1.5" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </Icon>
    ),
  },
  {
    title: "Arrived damaged?",
    text: "Replacement or refund, no hassle",
    icon: (
      <Icon>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </Icon>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }}
      />

      {/* Hero — full-screen photo with a slow drifting zoom */}
      <section className="relative -mt-[2.25rem] flex h-[calc(100svh-4rem)] min-h-[560px] items-end overflow-hidden bg-ink lg:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/magnet-hero.jpg"
          alt="Holding up the Lagom är bäst magnet at sunset"
          className="animate-drift absolute inset-0 h-full w-full object-cover object-[40%_20%] lg:object-[0%_20%]"
        />
        {/* Darken behind the text: bottom on phones, right side on big screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-l from-black/65 via-black/25 to-transparent lg:block" />

        <div className="animate-fade-up relative mx-auto w-full max-w-6xl px-6 pb-14 text-center lg:pb-0">
          <div className="mx-auto max-w-md lg:mr-0 lg:text-left">
            <Eyebrow invert>StudySwedish</Eyebrow>
            <h1 className="mt-5 font-display text-6xl font-normal leading-[1.02] tracking-tight text-white sm:text-7xl">
              Swedish Words
              <br />
              <em>Fridge Magnets</em>
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-[16px] leading-relaxed text-white/80 lg:mx-0">
              Four real Swedish words and phrases, four acrylic magnets, four little lessons
              for your fridge.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 lg:items-start">
              <StoreButtonNative variant="light" href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                Buy the set — €29.99
              </StoreButtonNative>
              <p className="text-[13px] text-white/60">Shipping included, worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling word band */}
      <div className="overflow-hidden bg-ink py-4 text-white" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {[...WORDS, ...WORDS].map((w, i) => (
                <span key={i} className="flex items-center whitespace-nowrap font-display text-[21px] italic">
                  <span className="px-7">{w}</span>
                  <span className="text-[10px] text-flag-yellow">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <section className="border-b border-ink/8 px-6 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
              <span className="text-brand">{t.icon}</span>
              <div>
                <p className="text-[14px] font-medium text-ink">{t.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-ink/50">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The collection — tap a magnet to flip it */}
      <section id="collection" className="scroll-mt-16 bg-mist px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <Eyebrow>The collection</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-5xl">All <em>four</em> designs</h2>
            <p className="mt-3 text-[14px] text-ink/50">Tap a magnet to see what it means</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {DESIGNS.map((design, i) => (
              <Reveal key={design.src} delay={i * 120}>
                <FlipMagnet {...design} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fridge scene */}
      <section className="bg-[#E9E4DC] px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-14 text-center">
              <Eyebrow>On your fridge</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-5xl">
                A little Swedish, every time you <em>open it</em>
              </h2>
            </div>
          </Reveal>
          <FridgeScene magnets={FRIDGE} />
        </div>
      </section>

      {/* Gift */}
      <section className="px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center">
              <Eyebrow>A gift that gets talked about</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-5xl">
                The perfect present <em>for…</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {GIFT_FOR.map((g, i) => (
              <Reveal key={g.title} delay={i * 120}>
                <div className="border-t border-ink/15 pt-6 text-center sm:text-left">
                  <p className="text-[12px] font-medium tracking-[0.2em] text-brand">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-normal text-ink">{g.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/55">{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-14 text-center text-[14px] text-ink/50">
              Each magnet arrives sealed in its own bag — ready to wrap, or to give just as it is.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product */}
      <section id="shop" className="scroll-mt-16 bg-mist px-6 py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden bg-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/magnet-hero.jpg"
                alt="The Lagom är bäst magnet in its packaging"
                className="aspect-[4/5] w-full object-cover object-[50%_18%] transition duration-700 hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Eyebrow>The set</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Swedish Words Magnet Set
            </h2>
            <div className="mt-5 flex items-baseline gap-3">
              <p className="font-display text-4xl text-ink">€29.99</p>
              <p className="text-[13px] text-ink/50">Shipping included</p>
            </div>

            <ul className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-8">
              {SPECS.map((s) => (
                <li key={s} className="flex gap-3 text-[15px] leading-relaxed text-ink/70">
                  <svg className="mt-1.5 shrink-0 text-brand" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>

            <StoreButtonNative
              href={PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 w-full sm:w-auto"
            >
              Buy the set — €29.99
            </StoreButtonNative>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-ink/45">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="1.5" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Secure checkout with Stripe
            </p>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-16 px-6 py-24 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/denise.jpg"
              alt="Denise, the Swede behind StudySwedish"
              className="mx-auto aspect-[4/5] w-full max-w-sm object-cover object-top"
            />
          </Reveal>
          <Reveal delay={150}>
            <Eyebrow>Why I made these</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Hej! I&apos;m <em>Denise</em>.
            </h2>
            <p className="mt-6 text-[16px] leading-loose text-ink/70">
              I wanted something you could actually hold — not just another post you scroll
              past. These aren&apos;t tourist-shop clichés; they&apos;re words and phrases I actually
              use, the ones that make Swedish feel real instead of textbook. Whoever asks about
              the weird one on your fridge, you&apos;ll actually know what to tell them.
            </p>
            <a
              href="https://instagram.com/swedish_with_denise"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border-b border-ink/30 pb-0.5 text-[14px] text-ink transition hover:border-ink"
            >
              Follow along @swedish_with_denise
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 bg-mist px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="text-center">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Good to <em>know</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 border-t border-ink/10">
              {FAQ.map((item) => (
                <details key={item.q} className="faq group border-b border-ink/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] text-ink">
                    {item.q}
                    <span className="faq-icon text-xl font-light leading-none text-ink/40 transition-transform duration-300">+</span>
                  </summary>
                  <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink/55">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-ink px-6 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-normal leading-[1.08] tracking-tight text-white sm:text-5xl">
            Bring a little <em>Sweden</em> home.
          </h2>
          <p className="mt-4 text-[15px] text-white/60">All four magnets — €29.99, shipping included.</p>
          <StoreButtonNative
            variant="light"
            href={PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            Buy the set
          </StoreButtonNative>
        </Reveal>
      </section>
    </div>
  );
}
