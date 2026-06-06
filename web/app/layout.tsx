import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StudySwedish, Learn Swedish online",
    template: "%s | StudySwedish",
  },
  description:
    "The modern way to learn Swedish. AI-powered lessons, real pronunciation, and a full CEFR A1–C1 course built by native speakers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, height: "36px", background: "#C9A04A", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Link href="/coaching" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", color: "#1A1208", textDecoration: "none" }}>
            Now taking 1:1 coaching students. Book a session →
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
