import Link from "next/link";
import { ChannelIcon } from "./channel-icon";

export type PostCardData = {
  id: string;
  slug: string;
  title: string;
  content: string;
  postType: string;
  rating?: number | null;
  priceRange?: number | null;
  heartCount: number;
  replyCount: number;
  viewCount: number;
  images: string[];
  tags: string[];
  createdAt: string;
  channel: {
    slug: string;
    name: string;
    icon: string;
    accentColor: string;
  };
  location?: { name: string } | null;
  author: {
    displayName: string;
    avatarUrl?: string | null;
    currentLevel: string;
  };
};

function Avatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string | null;
}) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="h-8 w-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div className="h-8 w-8 rounded-full bg-charcoal/10 flex-shrink-0 flex items-center justify-center text-[13px] font-semibold text-charcoal/40">
      {name.charAt(0)}
    </div>
  );
}

export function PostCard({ post }: { post: PostCardData }) {
  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <Link
      href={`/community/${post.channel.slug}/${post.slug}`}
      className="group flex gap-3 border-b border-black/5 py-4 transition-colors last:border-0 hover:bg-black/[0.015] -mx-3 px-3 rounded-lg"
    >
      <Avatar name={post.author.displayName} avatarUrl={post.author.avatarUrl} />

      <div className="min-w-0 flex-1">
        {/* Author row */}
        <div className="flex items-center gap-1.5 text-[13px] text-charcoal/50">
          <span className="font-medium text-charcoal/70">
            {post.author.displayName}
          </span>
          <span>·</span>
          <span>{timeAgo}</span>
          <span>·</span>
          <span>{post.channel.name}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1 font-display text-[16px] font-semibold leading-snug text-charcoal group-hover:text-swedish-blue transition-colors">
          {post.title}
        </h3>

        {/* Star rating for reviews */}
        {post.postType === "review" && post.rating && (
          <div className="mt-0.5 text-sm text-golden">
            {"★".repeat(post.rating)}
            <span className="text-charcoal/10">{"★".repeat(5 - post.rating)}</span>
          </div>
        )}

        {/* Preview */}
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-charcoal/45">
          {post.content}
        </p>

        {/* Stats */}
        <div className="mt-2 flex items-center gap-3 text-[12px] text-charcoal/30">
          <span className="flex items-center gap-1">
            <ChannelIcon name="heart" className="h-3.5 w-3.5" />
            {post.heartCount}
          </span>
          <span className="flex items-center gap-1">
            <ChannelIcon name="message-square" className="h-3.5 w-3.5" />
            {post.replyCount}
          </span>
          {post.location && (
            <span className="flex items-center gap-1">
              <ChannelIcon name="map-pin" className="h-3.5 w-3.5" />
              {post.location.name}
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      {post.images.length > 0 && (
        <div className="hidden sm:block flex-shrink-0">
          <div className="h-16 w-16 overflow-hidden rounded-lg bg-charcoal/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.images[0]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </Link>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  return `${months}mo`;
}
