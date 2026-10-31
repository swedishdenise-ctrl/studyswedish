import { StoreButtonNative } from "@/components/store/button";

const PAYMENT_LINK = "https://buy.stripe.com/aFaeVc93F8sn56rebwf3a08";
const PRICE_DISPLAY = "€29.99";

export function MagnetShop({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <p className={`text-[16px] leading-relaxed max-w-xl ${dark ? "text-white/70" : "text-ink/70"}`}>
        The full set of 4 — Jag älskar Sverige, Lagom är bäst, Fikadags! and Dra åt skogen!
        6cm acrylic magnets, each with its own collector card (pronunciation, meaning, and
        a QR code to follow along). Sold as a set only, while the first batch lasts. Shipping
        included, worldwide.
      </p>

      <div className="mt-6 flex items-center gap-4">
        <StoreButtonNative href={PAYMENT_LINK} target="_blank" rel="noopener noreferrer">
          Buy the set — {PRICE_DISPLAY}
        </StoreButtonNative>
        <span className={`text-sm ${dark ? "text-white/50" : "text-ink/45"}`}>
          Only 25 sets — shipping included
        </span>
      </div>
    </div>
  );
}
