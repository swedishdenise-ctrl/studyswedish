import Link from "next/link";
import { communityChannels } from "@/data/community-channels";

const channelEmojis: Record<string, string> = {
  "places-to-see": "⛰️",
  "food-recipes": "🥞",
  restaurants: "☕",
  "hotels-stays": "🏡",
  events: "🎉",
  "culture-traditions": "🇸🇪",
  "living-in-sweden": "🏠",
  "jobs-career": "💼",
  "meet-people": "👋",
  "language-help": "📖",
  marketplace: "🛍️",
  "off-topic": "💬",
};

export function ChannelGrid() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-charcoal">
          Explore
        </h2>
        <Link
          href="/community/new"
          className="rounded-full bg-golden px-4 py-1.5 text-[13px] font-semibold text-charcoal transition hover:bg-golden/80"
        >
          Write a post
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {communityChannels.map((channel) => (
          <Link
            key={channel.slug}
            href={`/community/${channel.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-black/5 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5"
          >
            <span className="text-2xl leading-none mt-0.5">
              {channelEmojis[channel.slug] ?? "🌍"}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-charcoal group-hover:text-swedish-blue transition-colors leading-tight">
                {channel.name}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-charcoal/40 line-clamp-2">
                {channel.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
