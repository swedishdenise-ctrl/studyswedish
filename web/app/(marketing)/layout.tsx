import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60, height: "36px", background: "#C9A04A", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
        <Link href="/coaching" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", color: "#1A1208", textDecoration: "none" }}>
          Now taking 1:1 coaching students — Book a session →
        </Link>
      </div>
      <SiteHeader />
      <main className="flex-1 pt-[6.25rem]">{children}</main>
      <SiteFooter />
    </>
  );
}
