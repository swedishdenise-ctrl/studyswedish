import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-navy/90",
  secondary: "border border-navy/20 text-navy hover:border-navy/40 bg-transparent",
};

const BASE = "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition";

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
