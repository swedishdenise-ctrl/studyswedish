import { MagnetShop } from "@/components/magnet-shop";

export const metadata = {
  title: "Swedish Words Fridge Magnets — StudySwedish",
  description:
    "4 acrylic fridge magnets with real Swedish words and phrases — Jag älskar Sverige, Lagom är bäst, Fikadags!, and Dra åt skogen! Each comes with a collector card. Limited first batch of 25 sets.",
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

export default function MagnetsPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>
      {/* Hero */}
      <section className="px-6 pt-36 pb-16 sm:pt-44">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: "#8B6A3E60" }}>
            Limited first batch — only 25 sets
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl" style={{ color: "#1A1208" }}>
            Swedish Words Fridge Magnets
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed max-w-xl mx-auto" style={{ color: "#3D2B1470" }}>
            Four real Swedish words and phrases, four acrylic magnets, four little lessons
            for your fridge.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            Why I made these
          </p>
          <p className="mt-5 text-[16px] leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
            I wanted something you could actually hold — not just another post you scroll
            past. These aren't tourist-shop clichés; they're words and phrases I actually
            use, the ones that make Swedish feel real instead of textbook. Every magnet
            comes with a little card so you (or whoever's asking about the weird one on
            your fridge) can learn what it really means.
          </p>
        </div>
      </section>

      {/* Collection */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            The collection
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            All 4 designs
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {DESIGNS.map((design) => (
              <div key={design.src} className="flex gap-4">
                <div
                  className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl"
                  style={{ background: "#FFF8EC", border: "1px solid #C9A04A20" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={design.src} alt={design.alt} className="h-full w-full" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>
                    {design.name}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed" style={{ color: "#3D2B1480" }}>
                    {design.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy */}
      <section className="px-6 pb-16" id="buy">
        <div className="mx-auto max-w-3xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            Get the set
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            All 4, while they last
          </h2>
          <div className="mt-8">
            <MagnetShop />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-14" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#C9A04A" }}>
            Questions
          </p>
          <div className="mt-8 flex flex-col gap-8">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-lg font-semibold" style={{ color: "#1A1208" }}>
                  {item.q}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
