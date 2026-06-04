import { createClient } from "@/lib/supabase/server";
import type { PostCardData } from "@/components/community/post-card";
import { communityChannels } from "@/data/community-channels";
import { decodeGuestContent } from "./guest-content";

// The guest user created for anonymous posts
const GUEST_USER_ID = "43a237a7-fffa-4926-b9db-bd815d8dfe18";

type DbPost = {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  category: string | null;
  upvote_count: number;
  reply_count: number;
  created_at: string;
  profile: { display_name: string | null; current_level: string | null } | null;
};

function dbPostToCardData(post: DbPost): PostCardData {
  const { name: guestName, content: body } =
    post.user_id === GUEST_USER_ID
      ? decodeGuestContent(post.content)
      : { name: null, content: post.content };

  const authorName =
    guestName ??
    post.profile?.display_name ??
    "Community member";

  const channelSlug = post.category ?? "general";
  const channel = communityChannels.find((c) => c.slug === channelSlug) ?? {
    slug: channelSlug,
    name: "General",
    icon: "message-square",
    accentColor: "#C9A04A",
  };

  return {
    id: post.id,
    slug: post.id,   // use UUID as slug for real posts
    title: post.title ?? "Untitled",
    content: body,
    postType: "discussion",
    heartCount: post.upvote_count ?? 0,
    replyCount: post.reply_count ?? 0,
    viewCount: 0,
    images: [],
    tags: [],
    createdAt: post.created_at,
    channel: {
      slug: channel.slug,
      name: channel.name,
      icon: channel.icon,
      accentColor: channel.accentColor,
    },
    location: null,
    author: {
      displayName: authorName,
      currentLevel: post.profile?.current_level ?? "A1",
    },
  };
}

/** Fetch the N most recent real posts, optionally filtered by channel slug. */
export async function fetchRealPosts(opts?: {
  channelSlug?: string;
  limit?: number;
}): Promise<PostCardData[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("community_posts")
      .select(
        "id, user_id, title, content, category, upvote_count, reply_count, created_at, profile:profiles(display_name, current_level)"
      )
      .order("created_at", { ascending: false })
      .limit(opts?.limit ?? 30);

    if (opts?.channelSlug) {
      query = query.eq("category", opts.channelSlug);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return (data as unknown as DbPost[]).map(dbPostToCardData);
  } catch {
    return [];
  }
}

export type RealPostDetail = {
  id: string;
  title: string;
  content: string;           // decoded body
  authorName: string;
  authorLevel: string;
  channelSlug: string;
  channelName: string;
  channelIcon: string;
  channelAccentColor: string;
  upvoteCount: number;
  replyCount: number;
  createdAt: string;
};

export type RealReply = {
  id: string;
  authorName: string;
  authorLevel: string;
  content: string;           // decoded body
  heartCount: number;
  createdAt: string;
};

/** Fetch a single real post by UUID, including its replies. */
export async function fetchRealPostDetail(id: string): Promise<{
  post: RealPostDetail | null;
  replies: RealReply[];
}> {
  try {
    const supabase = await createClient();

    const [postRes, repliesRes] = await Promise.all([
      supabase
        .from("community_posts")
        .select(
          "id, user_id, title, content, category, upvote_count, reply_count, created_at, profile:profiles(display_name, current_level)"
        )
        .eq("id", id)
        .single(),
      supabase
        .from("community_replies")
        .select(
          "id, user_id, content, upvote_count, created_at, profile:profiles(display_name, current_level)"
        )
        .eq("post_id", id)
        .order("created_at", { ascending: true }),
    ]);

    if (postRes.error || !postRes.data) return { post: null, replies: [] };

    const p = postRes.data as unknown as DbPost;
    const { name: guestName, content: body } =
      p.user_id === GUEST_USER_ID
        ? decodeGuestContent(p.content)
        : { name: null, content: p.content };

    const channelSlug = p.category ?? "general";
    const channel = communityChannels.find((c) => c.slug === channelSlug) ?? {
      slug: channelSlug,
      name: "General",
      icon: "message-square",
      accentColor: "#C9A04A",
    };

    const post: RealPostDetail = {
      id: p.id,
      title: p.title ?? "Untitled",
      content: body,
      authorName: guestName ?? p.profile?.display_name ?? "Community member",
      authorLevel: p.profile?.current_level ?? "A1",
      channelSlug: channel.slug,
      channelName: channel.name,
      channelIcon: channel.icon,
      channelAccentColor: channel.accentColor,
      upvoteCount: p.upvote_count ?? 0,
      replyCount: p.reply_count ?? 0,
      createdAt: p.created_at,
    };

    type DbReply = {
      id: string;
      user_id: string;
      content: string;
      upvote_count: number;
      created_at: string;
      profile: { display_name: string | null; current_level: string | null } | null;
    };

    const replies: RealReply[] = (repliesRes.data ?? []).map((r: unknown) => {
      const reply = r as DbReply;
      const { name: rGuestName, content: rBody } =
        reply.user_id === GUEST_USER_ID
          ? decodeGuestContent(reply.content)
          : { name: null, content: reply.content };
      return {
        id: reply.id,
        authorName: rGuestName ?? reply.profile?.display_name ?? "Community member",
        authorLevel: reply.profile?.current_level ?? "A1",
        content: rBody,
        heartCount: reply.upvote_count ?? 0,
        createdAt: reply.created_at,
      };
    });

    return { post, replies };
  } catch {
    return { post: null, replies: [] };
  }
}
