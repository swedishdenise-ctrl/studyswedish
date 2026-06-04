import { notFound } from "next/navigation";
import Link from "next/link";
import { CommunityLayout } from "@/components/community/community-layout";
import { ChannelIcon } from "@/components/community/channel-icon";
import { PostCard } from "@/components/community/post-card";
import { communityChannels } from "@/data/community-channels";
import { samplePosts } from "@/data/sample-posts";
import { swedishLocations } from "@/data/swedish-locations";
import { ChannelFilters } from "./channel-filters";
import { fetchRealPosts } from "@/lib/community/fetch-posts";

type Props = {
  params: Promise<{ channel: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { channel: slug } = await params;
  const channel = communityChannels.find((c) => c.slug === slug);
  if (!channel) return {};
  return {
    title: `${channel.name} — Community — StudySwedish`,
    description: channel.description,
  };
}

export function generateStaticParams() {
  return communityChannels.map((c) => ({ channel: c.slug }));
}

export default async function ChannelPage({ params }: Props) {
  const { channel: slug } = await params;
  const channel = communityChannels.find((c) => c.slug === slug);
  if (!channel) notFound();

  const [realPosts, sampleChannelPosts] = await Promise.all([
    fetchRealPosts({ channelSlug: slug, limit: 20 }),
    Promise.resolve(samplePosts.filter((p) => p.channel.slug === channel.slug)),
  ]);

  // Real posts first, sample posts fill the rest
  const channelPosts = [...realPosts, ...sampleChannelPosts];

  const locations = swedishLocations
    .filter((l) => l.type === "city")
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <CommunityLayout>
      <div className="mb-4">
        <Link href="/community" className="inline-flex items-center gap-1.5 text-[13px] text-charcoal/40 hover:text-charcoal/70 transition-colors">
          <ChannelIcon name="arrow-left" className="h-3.5 w-3.5" />
          All channels
        </Link>
      </div>

      <div>
      {/* Channel header — rich gradient version */}
      <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white">
        {/* Colored top bar */}
        <div
          className="h-1.5"
          style={{ background: `linear-gradient(90deg, ${channel.accentColor}, ${channel.accentColor}99)` }}
        />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${channel.accentColor}20, ${channel.accentColor}08)`,
                  color: channel.accentColor,
                }}
              >
                <ChannelIcon name={channel.icon} className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-display text-2xl font-semibold text-charcoal">
                    {channel.name}
                  </h1>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: `${channel.accentColor}12`,
                      color: channel.accentColor,
                    }}
                  >
                    {channelPosts.length} posts
                  </span>
                </div>
                <p className="mt-1 text-sm text-charcoal/45 max-w-lg">
                  {channel.description}
                </p>
              </div>
            </div>
            <Link
              href={`/community/new?channel=${channel.slug}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-golden to-golden-dark px-5 py-2.5 text-sm font-semibold text-charcoal shadow-sm shadow-golden/20 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <ChannelIcon name="plus" className="h-4 w-4" />
              Write a post
            </Link>
          </div>
        </div>

        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-[0.07]"
          style={{ backgroundColor: channel.accentColor }}
        />
      </div>

      {/* Filters */}
      <div className="mt-4">
        <ChannelFilters locations={locations.map((l) => l.name)} />
      </div>

      {/* Post list */}
      <div className="mt-4 space-y-3">
        {channelPosts.length > 0 ? (
          channelPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="rounded-2xl border border-black/5 bg-white p-14 text-center">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${channel.accentColor}15, ${channel.accentColor}05)`,
                color: channel.accentColor,
              }}
            >
              <ChannelIcon name={channel.icon} className="h-9 w-9" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">
              No posts yet
            </h3>
            <p className="mt-2 text-sm text-charcoal/40 max-w-sm mx-auto">
              Be the first to share something in {channel.name}. Your post
              could start a great conversation.
            </p>
            <Link
              href={`/community/new?channel=${channel.slug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-golden to-golden-dark px-6 py-2.5 text-sm font-semibold text-charcoal shadow-sm shadow-golden/20 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              Write the first post
            </Link>
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      <Link
        href={`/community/new?channel=${channel.slug}`}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-golden to-golden-dark shadow-lg shadow-golden/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-golden/40 sm:hidden"
        aria-label="Write a post"
      >
        <ChannelIcon name="plus" className="h-6 w-6 text-charcoal" />
      </Link>
      </div>
    </CommunityLayout>
  );
}
