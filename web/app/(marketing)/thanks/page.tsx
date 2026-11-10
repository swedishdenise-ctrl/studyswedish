import type { CSSProperties } from "react";
import { StoreButton } from "@/components/store/button";
import { Eyebrow } from "@/components/store/section";

export const metadata = {
  title: { absolute: "Tack! Your order is confirmed — StudySwedish" },
  robots: { index: false, follow: false },
};

const MAGNETS = [
  { src: "/magnets/cut/sverige.png", r: "-10deg", delay: "0s", className: "left-[4%] top-[8%] w-24 sm:left-[10%] sm:w-36" },
  { src: "/magnets/cut/fikadags.png", r: "8deg", delay: "-1.5s", className: "right-[4%] top-[12%] w-20 sm:right-[10%] sm:w-32" },
  { src: "/magnets/cut/lagom.png", r: "6deg", delay: "-3s", className: "bottom-[6%] left-[6%] w-20 sm:left-[14%] sm:w-28" },
  { src: "/magnets/cut/dra-at-skogen.png", r: "-7deg", delay: "-4.5s", className: "bottom-[8%] right-[6%] w-20 sm:right-[14%] sm:w-28" },
];

export default function ThanksPage() {
  return (
    <section className="relative -mt-[2.25rem] flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#E9E4DC] px-6 py-32">
      {MAGNETS.map((m) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={m.src}
          src={m.src}
          alt=""
          aria-hidden="true"
          className={`animate-bob pointer-events-none absolute drop-shadow-[0_14px_18px_rgba(40,30,20,0.25)] ${m.className}`}
          style={{ "--r": m.r, animationDelay: m.delay } as CSSProperties}
        />
      ))}

      <div className="animate-fade-up relative mx-auto max-w-lg text-center">
        <Eyebrow>Order confirmed</Eyebrow>
        <h1 className="mt-6 font-display text-6xl font-normal leading-[1.02] tracking-tight text-ink sm:text-7xl">
          Tack så <em>mycket!</em>
        </h1>
        <p className="mt-3 font-display text-xl italic text-ink/50">Thank you so much!</p>

        <p className="mx-auto mt-8 max-w-md text-[16px] leading-relaxed text-ink/70">
          Your order is in, and your receipt is on its way to your inbox. I&apos;ll pack your
          four magnets and send them from Spain with tracking.
        </p>

        <div className="mx-auto mt-10 max-w-sm border-t border-ink/15 pt-8">
          <p className="text-[14px] text-ink/60">While you wait — learn a little Swedish every day:</p>
          <a
            href="https://instagram.com/swedish_with_denise"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block border-b border-ink/30 pb-0.5 text-[15px] text-ink transition hover:border-ink"
          >
            Follow @swedish_with_denise
          </a>
        </div>

        <StoreButton href="/" variant="secondary" className="mt-12">
          Back to the shop
        </StoreButton>

        <p className="mt-8 text-[13px] text-ink/45">
          Questions about your order? Message me on Instagram and I&apos;ll help.
        </p>
      </div>
    </section>
  );
}
