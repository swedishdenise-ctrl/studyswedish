import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-black/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-swedish-blue"
          >
            StudySwedish
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
