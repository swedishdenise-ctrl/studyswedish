import { MagnetShop } from "@/components/magnet-shop";
import { StoreButtonNative } from "@/components/store/button";
import { StoreSection, Eyebrow } from "@/components/store/section";

export const metadata = {
  title: "Swedish Words Fridge Magnets — StudySwedish",
  description:
    "4 acrylic fridge magnets with real Swedish words and phrases — Jag älskar Sverige, Lagom är bäst, Fikadags!, and Dra åt skogen! Each comes with a collector card. Limited first batch of 25 sets.",
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
    a: "4 acrylic fridge magnets (6cm, 3mm acrylic + 1mm magnet backing), each with its own 7.5cm collector card — the pronunciation, what it really means, and a QR code to follow along on Instagram. Each one is sealed in its own bag.",
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
    a: "Not for this first batch — they're sold as the full set of 4 only. There are only 25 sets total, so once they're gone, they're gone until (if) I order more.",
  },
  {
    q: "What if mine arrives damaged?",
    a: "Message me on Instagram (@swedish_with_denise) with a photo and I'll sort it out — a replacement or refund, no hassle.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-paper">
      {/* Hero */}
      <section className="px-6 pt-40 pb-28 sm:pt-48">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Limited first batch — only 25 sets</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-normal leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Swedish Words
            <br />
            Fridge Magnets
          </h1>
          <p className="mx-auto mt-6 max-w-sm text-[16px] leading-relaxed text-ink/50">
            Four real Swedish words and phrases, four acrylic magnets, four little lessons
            for your fridge.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <StoreButtonNative href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
              Buy the set — €29.99
            </StoreButtonNative>
            <p className="text-[13px] text-ink/35">Shipping included, worldwide</p>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
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
          use, the ones that make Swedish feel real instead of textbook. Every magnet
          comes with a little card so you (or whoever&apos;s asking about the weird one on
          your fridge) can learn what it really means.
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
