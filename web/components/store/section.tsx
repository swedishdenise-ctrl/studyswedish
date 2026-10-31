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
    <section className={`px-6 py-24 ${className}`}>
      <div className={`mx-auto ${width}`}>
        {divider && <div className="h-px mb-16 bg-ink/10" />}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, invert = false }: { children: ReactNode; invert?: boolean }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.22em] ${invert ? "text-white/50" : "text-ink/45"}`}>
      {children}
    </p>
  );
}
