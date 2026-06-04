import Link from "next/link";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/swedish_with_denise",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@swedish_with_denise",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@swedish_with_denise",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.4 2.8 12 2.8 12 2.8s-4.4 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1c0 2.3.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.2 12 22.2s4.4 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2.1C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/swedish_with_denise",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  },
];

const footerLinks = [
  { href: "/about",        label: "About" },
  { href: "/conversagas",  label: "Conversagas" },
  { href: "/shop",         label: "Downloads" },
  { href: "/community",    label: "Community" },
  { href: "/daily-word",   label: "Daily word" },
  { href: "/privacy",      label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "#1A1208" }}>
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Top row: brand + socials */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold" style={{ color: "#F5EDE3" }}>
              Denise
            </p>
            <p className="mt-0.5 text-sm" style={{ color: "#F5EDE380" }}>
              Just very Swedish.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="opacity-30 transition-all hover:opacity-100 hover:text-[#C9A04A]"
                style={{ color: "#F5EDE3" }}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: "#F5EDE310" }} />

        {/* Bottom row: links + copyright */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-5">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm transition-colors hover:text-[#C9A04A]"
                  style={{ color: "#F5EDE345" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs" style={{ color: "#F5EDE330" }}>
            &copy; {new Date().getFullYear()} StudySwedish
          </p>
        </div>

      </div>
    </footer>
  );
}
