const DESIGNS = [
  { src: "/magnets/sverige.png", alt: "Jag älskar Sverige magnet" },
  { src: "/magnets/lagom.png", alt: "Lagom är bäst magnet" },
  { src: "/magnets/fikadags.png", alt: "Fikadags! magnet" },
  { src: "/magnets/dra-at-skogen.png", alt: "Dra åt skogen! magnet" },
];

const PAYMENT_LINK = "https://buy.stripe.com/aFaeVc93F8sn56rebwf3a08";
const PRICE_DISPLAY = "€29.99";

export function MagnetShop() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {DESIGNS.map((design) => (
          <div
            key={design.src}
            className="overflow-hidden rounded-2xl"
            style={{ background: "#FFF8EC", border: "1px solid #C9A04A20" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={design.src} alt={design.alt} className="h-full w-full" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-[16px] leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
        The full set of 4 — Jag älskar Sverige, Lagom är bäst, Fikadags! and Dra åt skogen!
        6cm acrylic magnets, each with its own collector card (pronunciation, meaning, and
        a QR code to follow along). Sold as a set only, while the first batch lasts. Shipping
        included, worldwide.
      </p>

      <div className="mt-6">
        <a
          href={PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-7 py-3 text-sm font-semibold transition hover:opacity-90"
          style={{ background: "#C9A04A", color: "#1A1208" }}
        >
          Buy the set — {PRICE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
