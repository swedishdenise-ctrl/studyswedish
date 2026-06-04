"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChannelIcon } from "./channel-icon";
import { communityChannels } from "@/data/community-channels";

const channelEmojis: Record<string, string> = {
  "places-to-see": "⛰️",
  "food-recipes": "🥞",
  restaurants: "☕",
  "hotels-stays": "🏡",
  events: "🎉",
  "culture-traditions": "🇸🇪",
  "living-in-sweden": "📋",
  "jobs-career": "💼",
  "meet-people": "👋",
  "language-help": "📚",
  marketplace: "🛍️",
  "off-topic": "💬",
};

const sidebarChannelGroups = [
  {
    label: "Discover Sweden",
    slugs: [
      "places-to-see",
      "food-recipes",
      "restaurants",
      "hotels-stays",
      "events",
      "culture-traditions",
    ],
  },
  {
    label: "Expat Life",
    slugs: ["living-in-sweden", "jobs-career", "meet-people"],
  },
  {
    label: "Learning & More",
    slugs: ["language-help", "marketplace", "off-topic"],
  },
];

export function CommunitySidebar() {
  const pathname = usePathname();

  const channelMap = Object.fromEntries(
    communityChannels.map((c) => [c.slug, c])
  );

  return (
    <aside className="hidden lg:block w-60 flex-shrink-0">
      <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-5 pb-4 scrollbar-thin">
        {/* Search */}
        <div className="relative">
          <ChannelIcon
            name="search"
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/25"
          />
          <input
            type="text"
            placeholder="Search community…"
            className="w-full rounded-xl border border-black/[0.06] bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal/25 transition focus:border-swedish-blue/20 focus:outline-none focus:ring-2 focus:ring-swedish-blue/8 focus:shadow-sm"
          />
        </div>

        {/* Write post button */}
        <Link
          href="/community/new"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-golden to-golden-dark py-2.5 text-sm font-semibold text-charcoal shadow-sm shadow-golden/15 transition hover:shadow-md hover:shadow-golden/25"
        >
          <ChannelIcon name="plus" className="h-4 w-4" />
          Write a post
        </Link>

        {/* Browse */}
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal/25">
            Browse
          </p>
          <ul className="mt-1.5 space-y-0.5">
            <SidebarLink
              href="/community"
              label="All Posts"
              emoji="📨"
              active={pathname === "/community"}
            />
            <SidebarLink
              href="/community?sort=trending"
              label="Trending"
              emoji="🔥"
            />
          </ul>
        </div>

        {/* Channel groups — matching main content */}
        {sidebarChannelGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal/25">
              {group.label}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {group.slugs.map((slug) => {
                const ch = channelMap[slug];
                if (!ch) return null;
                const isActive = pathname === `/community/${slug}`;
                return (
                  <li key={slug}>
                    <Link
                      href={`/community/${slug}`}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[13px] transition ${
                        isActive
                          ? "bg-swedish-blue/8 font-semibold text-swedish-blue"
                          : "text-charcoal/50 hover:bg-black/[0.03] hover:text-charcoal/70"
                      }`}
                    >
                      <span className="flex h-5 w-5 items-center justify-center text-sm">
                        {channelEmojis[slug] ?? "🌍"}
                      </span>
                      {ch.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Your Activity */}
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-charcoal/25">
            Your Activity
          </p>
          <ul className="mt-1.5 space-y-0.5">
            <SidebarLink href="/community/my-posts" label="My Posts" emoji="📌" />
            <SidebarLink href="/community/saved" label="Saved" emoji="❤️" />
          </ul>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-black/5 pt-4">
          <p className="px-3 text-[11px] leading-relaxed text-charcoal/25">
            The Swedish community.
            <br />
            Built with omtanke.
          </p>
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  emoji,
  active = false,
}: {
  href: string;
  label: string;
  emoji: string;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[13px] transition ${
          active
            ? "bg-swedish-blue/8 font-semibold text-swedish-blue"
            : "text-charcoal/50 hover:bg-black/[0.03] hover:text-charcoal/70"
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center text-sm">
          {emoji}
        </span>
        {label}
      </Link>
    </li>
  );
}
