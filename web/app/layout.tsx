import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-display-sans",
  weight: ["300", "400", "500"],
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
      className={`${jost.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
