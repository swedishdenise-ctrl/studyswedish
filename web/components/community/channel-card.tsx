import Link from "next/link";
import { ChannelIcon } from "./channel-icon";
import type { CommunityChannel } from "@/data/community-channels";

export function ChannelCard({ channel }: { channel: CommunityChannel }) {
  return (
    <Link
      href={`/community/${channel.slug}`}
      className="group card-hover relative block overflow-hidden rounded-2xl border border-black/5 bg-white"
    >
      {/* Colored top accent bar */}
      <div
        className="h-1"
        style={{ background: channel.accentColor }}
      />

      <div className="p-5">
        <div className="flex items-start gap-3.5">
          {/* Icon circle */}
          <div
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
            style={{
              backgroundColor: `${channel.accentColor}15`,
              color: channel.accentColor,
            }}
          >
            <ChannelIcon name={channel.icon} className="h-5.5 w-5.5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-[16px] font-semibold text-charcoal group-hover:text-swedish-blue transition-colors">
              {channel.name}
            </h3>
            <p className="mt-0.5 text-[13px] leading-relaxed text-charcoal/45 line-clamp-2">
              {channel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle hover glow */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: `${channel.accentColor}20` }}
      />
    </Link>
  );
}
