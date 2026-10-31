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

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
      {children}
    </p>
  );
}
