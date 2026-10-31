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
      {/* Hero — product + price + buy, visible immediately */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40">
        <div
          className="pointer-events-none absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-brand), transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2 sm:gap-16">
          <div>
            <Eyebrow>Limited first batch — only 25 sets</Eyebrow>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Swedish Words
              <br />
              Fridge Magnets
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/60">
              Four real Swedish words and phrases, four acrylic magnets, four little lessons
              for your fridge.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <StoreButtonNative href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
                Buy the set — €29.99
              </StoreButtonNative>
            </div>
            <p className="mt-3 text-sm text-ink/40">Shipping included, worldwide.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-ink/8 bg-mist p-3 shadow-xl shadow-ink/5">
            {DESIGNS.map((design) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={design.src}
                src={design.src}
                alt={design.alt}
                className="aspect-square rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>

      {/* The collection */}
      <StoreSection width="max-w-3xl" className="bg-mist" divider={false}>
        <Eyebrow>The collection</Eyebrow>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">All 4 designs</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {DESIGNS.map((design) => (
            <div key={design.src} className="flex gap-4 rounded-2xl border border-ink/8 bg-white p-4 shadow-sm">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={design.src} alt={design.alt} className="h-full w-full" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{design.name}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink/55">{design.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </StoreSection>

      {/* Why I made these */}
      <StoreSection width="max-w-2xl">
        <Eyebrow>Why I made these</Eyebrow>
        <p className="mt-5 text-[16px] leading-relaxed max-w-xl text-ink/80">
          I wanted something you could actually hold — not just another post you scroll
          past. These aren&apos;t tourist-shop clichés; they&apos;re words and phrases I actually
          use, the ones that make Swedish feel real instead of textbook. Every magnet
          comes with a little card so you (or whoever&apos;s asking about the weird one on
          your fridge) can learn what it really means.
        </p>
      </StoreSection>

      {/* Buy, in full */}
      <StoreSection width="max-w-3xl" className="scroll-mt-20 bg-ink" divider={false}>
        <div id="buy" />
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
          Get the set
        </p>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white">All 4, while they last</h2>
        <div className="mt-8">
          <MagnetShop dark />
        </div>
      </StoreSection>

      {/* FAQ */}
      <StoreSection width="max-w-2xl" className="pb-28">
        <Eyebrow>Questions</Eyebrow>
        <div className="mt-8 flex flex-col gap-8">
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3 className="text-lg font-bold text-ink">{item.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed max-w-xl text-ink/65">{item.a}</p>
            </div>
          ))}
        </div>
      </StoreSection>
    </div>
  );
}
