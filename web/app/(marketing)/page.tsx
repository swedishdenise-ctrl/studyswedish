import { MagnetShop } from "@/components/magnet-shop";
import { StoreButtonNative } from "@/components/store/button";
import { StoreSection, Eyebrow } from "@/components/store/section";

export const metadata = {
  title: "Swedish Words Fridge Magnets — StudySwedish",
  description:
    "4 acrylic fridge magnets with real Swedish words and phrases — Jag älskar Sverige, Lagom är bäst, Fikadags!, and Dra åt skogen!",
};

const PAYMENT_LINK = "https://buy.stripe.com/aFaeVc93F8sn56rebwf3a08";

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

export default function HomePage() {
  return (
    <div className="bg-paper">
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
          <h1 className="mt-5 font-display text-5xl font-normal leading-[1.1] tracking-tight text-white sm:text-6xl">
            Swedish Words
            <br />
            Fridge Magnets
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

      {/* The four designs */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
          {DESIGNS.map((design) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={design.src} src={design.src} alt={design.alt} className="aspect-square bg-white" />
          ))}
        </div>
      </section>

      {/* The collection */}
      <StoreSection width="max-w-2xl" className="bg-mist">
        <Eyebrow>The collection</Eyebrow>
        <h2 className="mt-5 font-display text-3xl font-normal tracking-tight text-ink">All four designs</h2>

        <div className="mt-12 flex flex-col divide-y divide-ink/10">
          {DESIGNS.map((design) => (
            <div key={design.src} className="flex items-center gap-6 py-6">
              <div className="h-20 w-20 shrink-0 overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={design.src} alt={design.alt} className="h-full w-full" />
              </div>
              <div>
                <h3 className="font-display text-lg font-normal text-ink">{design.name}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink/50">{design.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </StoreSection>

      {/* Why I made these */}
      <StoreSection width="max-w-xl">
        <Eyebrow>Why I made these</Eyebrow>
        <p className="mt-6 text-[17px] leading-loose text-ink/70">
          I wanted something you could actually hold — not just another post you scroll
          past. These aren&apos;t tourist-shop clichés; they&apos;re words and phrases I actually
          use, the ones that make Swedish feel real instead of textbook. Whoever asks about
          the weird one on your fridge, you&apos;ll actually know what to tell them.
        </p>
      </StoreSection>

      {/* Buy, in full */}
      <StoreSection width="max-w-xl" className="scroll-mt-20 bg-mist">
        <div id="buy" />
        <Eyebrow>Get the set</Eyebrow>
        <h2 className="mt-5 font-display text-3xl font-normal tracking-tight text-ink">All four, while they last</h2>
        <div className="mt-8">
          <MagnetShop />
        </div>
      </StoreSection>

      {/* FAQ */}
      <StoreSection width="max-w-xl" className="pb-32">
        <Eyebrow>Questions</Eyebrow>
        <div className="mt-10 flex flex-col divide-y divide-ink/10">
          {FAQ.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="font-display text-base font-normal text-ink">{item.q}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/50">{item.a}</p>
            </div>
          ))}
        </div>
      </StoreSection>
    </div>
  );
}
