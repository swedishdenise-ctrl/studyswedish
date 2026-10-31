import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/8 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          StudySwedish
        </Link>
        <a
          href="https://instagram.com/swedish_with_denise"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-brand transition hover:text-brand-dark"
        >
          @swedish_with_denise
        </a>
      </div>
    </header>
  );
}
