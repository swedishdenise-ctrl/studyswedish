import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-lg shadow-brand/25 hover:bg-brand-dark",
  secondary: "border-2 border-ink/15 text-ink hover:border-ink/30 bg-transparent",
};

const BASE = "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[15px] font-bold transition";

export function StoreButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />;
}

export function StoreButtonNative({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={`${BASE} ${VARIANT_CLASSES[variant]} ${className}`} {...props} />;
}
