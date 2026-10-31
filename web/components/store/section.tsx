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
        {divider && <div className="h-px mb-14 bg-navy/10" />}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{children}</p>;
}
