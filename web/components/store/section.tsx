import type { ReactNode } from "react";

export function StoreSection({
  children,
  className = "",
  width = "max-w-3xl",
  divider = true,
}: {
  children: ReactNode;
  className?: string;
  width?: string;
  divider?: boolean;
}) {
  return (
    <section className={`px-6 py-16 ${className}`}>
      <div className={`mx-auto ${width}`}>
        {divider && <div className="h-px mb-14 bg-ink/8" />}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, invert = false }: { children: ReactNode; invert?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] ${
        invert ? "text-white/70" : "text-ink/50"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  );
}
