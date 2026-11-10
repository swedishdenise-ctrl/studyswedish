import Link from "next/link";

const PAYMENT_LINK = "https://buy.stripe.com/aFaeVc93F8sn56rebwf3a08";

const NAV = [
  { href: "/#collection", label: "The designs" },
  { href: "/#shop", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/8 bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="font-display text-lg font-normal tracking-[0.08em] text-ink">
          STUDYSWEDISH
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-wide text-ink/55 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={PAYMENT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-ink px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-ink/85 sm:px-5"
        >
          Buy — €29.99
        </a>
      </div>
    </header>
  );
}
