import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink/85",
  light: "bg-white text-ink hover:bg-white/90",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
};

const BASE =
  "group inline-flex items-center justify-center gap-3 px-9 py-4 text-[13px] font-medium uppercase tracking-[0.14em] transition";

function Arrow() {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M0 5h14M10 1l4 4-4 4" />
    </svg>
  );
}

export function StoreButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`} {...props}>
      {children}
      <Arrow />
    </Link>
  );
}

export function StoreButtonNative({
  variant = "primary",
  className = "",
  children,
  shine = false,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; shine?: boolean }) {
  return (
    <a
      className={`${BASE} ${VARIANT_CLASSES[variant]} ${shine ? `btn-shine ${variant === "primary" ? "btn-shine-dark" : ""}` : ""} ${className}`}
      {...props}
    >
      <span className="relative">{children}</span>
      <span className="relative">
        <Arrow />
      </span>
    </a>
  );
}
