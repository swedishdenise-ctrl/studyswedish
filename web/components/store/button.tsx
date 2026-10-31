import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink/85",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-white",
};

const BASE =
  "inline-flex items-center justify-center px-9 py-4 text-[13px] font-medium uppercase tracking-[0.14em] transition";

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
