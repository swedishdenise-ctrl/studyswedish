import { CommunityLayout } from "@/components/community/community-layout";
import { ChannelGrid } from "@/components/community/channel-nav";
import { WelcomeBanner } from "@/components/community/welcome-banner";
import { PostCard } from "@/components/community/post-card";
import { SwedishWordCard } from "@/components/community/swedish-word-card";
import { samplePosts } from "@/data/sample-posts";
import { fetchRealPosts } from "@/lib/community/fetch-posts";

export const metadata = {
  title: "Community — StudySwedish",
  description:
    "Join the Swedish community. Discover places to see, restaurants, recipes, events, and connect with fellow Sweden-lovers.",
};

export default async function CommunityPage() {
  const realPosts = await fetchRealPosts({ limit: 20 });

  // Real posts first (most recent), then sample posts for richness
  const allPosts = [...realPosts, ...samplePosts];

  const popular = [...allPosts].sort((a, b) => b.heartCount - a.heartCount);
  const recent = [...allPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <CommunityLayout>
      <WelcomeBanner />
      <ChannelGrid />

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Feed */}
        <div className="lg:col-span-2">
          {realPosts.length > 0 && (
            <>
              <h2 className="font-display text-lg font-semibold text-charcoal">
                Latest from the community
              </h2>
              <div className="mt-2">
                {realPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <div className="my-8 border-t border-charcoal/[0.06]" />
            </>
          )}

          <h2 className="font-display text-lg font-semibold text-charcoal">
            Popular
          </h2>
          <div className="mt-2">
            {popular.slice(0, 5).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <h2 className="mt-10 font-display text-lg font-semibold text-charcoal">
            Recent
          </h2>
          <div className="mt-2">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right widget */}
        <div>
          <SwedishWordCard />
        </div>
      </div>
    </CommunityLayout>
  );
}
