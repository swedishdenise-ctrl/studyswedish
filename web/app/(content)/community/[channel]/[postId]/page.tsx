import { notFound } from "next/navigation";
import Link from "next/link";
import { CommunityLayout } from "@/components/community/community-layout";
import { ChannelIcon } from "@/components/community/channel-icon";
import { samplePosts } from "@/data/sample-posts";
import { sampleReplies } from "@/data/sample-replies";
import { fetchRealPostDetail } from "@/lib/community/fetch-posts";
import { ReplyForm } from "./reply-form";

type Props = {
  params: Promise<{ channel: string; postId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { postId } = await params;
  const sample = samplePosts.find((p) => p.slug === postId);
  if (sample) {
    return {
      title: `${sample.title} — Community — StudySwedish`,
      description: sample.content.slice(0, 160),
    };
  }
  const { post } = await fetchRealPostDetail(postId);
  if (!post) return {};
  return {
    title: `${post.title} — Community — StudySwedish`,
    description: post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: Props) {
  const { channel, postId } = await params;

  // --- Try sample posts first (slug-based) ---
  const samplePost = samplePosts.find(
    (p) => p.slug === postId && p.channel.slug === channel
  );

  if (samplePost) {
    const replies = sampleReplies
      .filter((r) => r.postId === samplePost.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return (
      <PostLayout
        channelSlug={channel}
        channelName={samplePost.channel.name}
        channelIcon={samplePost.channel.icon}
        channelAccentColor={samplePost.channel.accentColor}
        postId={samplePost.id}
        title={samplePost.title}
        content={samplePost.content}
        authorName={samplePost.author.displayName}
        authorLevel={samplePost.author.currentLevel}
        createdAt={samplePost.createdAt}
        heartCount={samplePost.heartCount}
        location={samplePost.location?.name ?? null}
        tags={samplePost.tags}
        rating={samplePost.postType === "review" ? (samplePost as { rating?: number }).rating : undefined}
        priceRange={samplePost.postType === "review" ? (samplePost as { priceRange?: number }).priceRange : undefined}
        replies={replies.map((r) => ({
          id: r.id,
          authorName: r.author.displayName,
          authorLevel: r.author.currentLevel,
          content: r.content,
          heartCount: r.heartCount,
          createdAt: r.createdAt,
        }))}
      />
    );
  }

  // --- Try real DB post (UUID-based) ---
  const { post, replies } = await fetchRealPostDetail(postId);
  if (!post || post.channelSlug !== channel) notFound();

  return (
    <PostLayout
      channelSlug={post.channelSlug}
      channelName={post.channelName}
      channelIcon={post.channelIcon}
      channelAccentColor={post.channelAccentColor}
      postId={post.id}
      title={post.title}
      content={post.content}
      authorName={post.authorName}
      authorLevel={post.authorLevel}
      createdAt={post.createdAt}
      heartCount={post.upvoteCount}
      location={null}
      tags={[]}
      replies={replies}
    />
  );
}

// ---- Shared render component ----

type ReplyData = {
  id: string;
  authorName: string;
  authorLevel: string;
  content: string;
  heartCount: number;
  createdAt: string;
};

function PostLayout({
  channelSlug,
  channelName,
  channelIcon,
  channelAccentColor,
  postId,
  title,
  content,
  authorName,
  authorLevel,
  createdAt,
  heartCount,
  location,
  tags,
  rating,
  priceRange,
  replies,
}: {
  channelSlug: string;
  channelName: string;
  channelIcon: string;
  channelAccentColor: string;
  postId: string;
  title: string;
  content: string;
  authorName: string;
  authorLevel: string;
  createdAt: string;
  heartCount: number;
  location: string | null;
  tags: string[];
  rating?: number;
  priceRange?: number;
  replies: ReplyData[];
}) {
  const timeAgo = getTimeAgo(createdAt);

  return (
    <CommunityLayout>
      {/* Back link */}
      <Link
        href={`/community/${channelSlug}`}
        className="inline-flex items-center gap-1.5 text-sm text-charcoal/40 transition hover:text-charcoal/70"
      >
        <ChannelIcon name="arrow-left" className="h-3.5 w-3.5" />
        Back to {channelName}
      </Link>

      {/* Post */}
      <article className="mt-4 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
        {/* Author bar */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-swedish-blue/10 font-display text-sm font-semibold text-swedish-blue">
            {authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-charcoal">{authorName}</span>
              <span className="rounded bg-charcoal/5 px-1.5 py-0.5 text-[10px] font-medium text-charcoal/40">
                {authorLevel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-charcoal/30">
              <span>{timeAgo}</span>
              {location && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <ChannelIcon name="map-pin" className="h-3 w-3" />
                    {location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Channel pill */}
        <div className="mt-4">
          <Link
            href={`/community/${channelSlug}`}
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition hover:opacity-80"
            style={{
              backgroundColor: `${channelAccentColor}10`,
              color: channelAccentColor,
            }}
          >
            <ChannelIcon name={channelIcon} className="h-3 w-3" />
            {channelName}
          </Link>
        </div>

        {/* Title */}
        <h1 className="mt-4 font-display text-2xl font-semibold leading-snug text-charcoal sm:text-3xl">
          {title}
        </h1>

        {/* Rating for review posts */}
        {rating != null && (
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-golden text-lg">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>
            {priceRange != null && (
              <span className="text-charcoal/40">{"$".repeat(priceRange)}</span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="mt-4 text-[15px] leading-relaxed text-charcoal/75 whitespace-pre-wrap">
          {content}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-charcoal/5 px-2.5 py-1 text-xs text-charcoal/40"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div className="mt-6 flex items-center gap-4 border-t border-black/5 pt-4">
          <button className="flex items-center gap-1.5 text-sm text-charcoal/40 transition hover:text-coral">
            <ChannelIcon name="heart" className="h-4 w-4" />
            <span>{heartCount}</span>
          </button>
          <span className="flex items-center gap-1.5 text-sm text-charcoal/40">
            <ChannelIcon name="message-square" className="h-4 w-4" />
            <span>{replies.length} replies</span>
          </span>
          <button className="flex items-center gap-1.5 text-sm text-charcoal/40 transition hover:text-swedish-blue">
            <ChannelIcon name="bookmark" className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </article>

      {/* Replies */}
      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-charcoal">
          {replies.length} {replies.length === 1 ? "reply" : "replies"}
        </h2>

        <div className="mt-4 space-y-3">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-2xl border border-black/5 bg-white p-5"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-swedish-blue/10 text-xs font-semibold text-swedish-blue">
                  {reply.authorName.charAt(0)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-charcoal">
                    {reply.authorName}
                  </span>
                  <span className="rounded bg-charcoal/5 px-1.5 py-0.5 text-[10px] font-medium text-charcoal/40">
                    {reply.authorLevel}
                  </span>
                  <span className="text-xs text-charcoal/25">
                    {getTimeAgo(reply.createdAt)}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-charcoal/70 whitespace-pre-wrap">
                {reply.content}
              </p>

              <div className="mt-3">
                <button className="flex items-center gap-1 text-xs text-charcoal/30 transition hover:text-coral">
                  <ChannelIcon name="heart" className="h-3.5 w-3.5" />
                  <span>{reply.heartCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reply form */}
        <div className="mt-6">
          <ReplyForm postId={postId} />
        </div>
      </div>
    </CommunityLayout>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
