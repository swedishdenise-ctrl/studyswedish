"use server";

import { createClient } from "@supabase/supabase-js";
import { encodeGuestContent } from "@/lib/community/guest-content";

// A dedicated "guest" Supabase user for all anonymous posts.
// Real name is stored as a prefix inside the content field.
const GUEST_USER_ID = "43a237a7-fffa-4926-b9db-bd815d8dfe18";

function makeServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function submitGuestPost(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const guestName = (formData.get("guest_name") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const channelSlug = formData.get("channel") as string;

  if (!guestName) return { error: "Please enter your name." };
  if (guestName.length > 60) return { error: "Name is too long (max 60 chars)." };
  if (!channelSlug) return { error: "Please choose a channel." };
  if (!title || title.length < 3) return { error: "Please add a title (at least 3 characters)." };
  if (title.length > 200) return { error: "Title is too long (max 200 characters)." };
  if (!content || content.length < 10) return { error: "Post is too short — add a bit more detail." };

  const supabase = makeServiceClient();

  const { error } = await supabase.from("community_posts").insert({
    user_id: GUEST_USER_ID,
    title,
    content: encodeGuestContent(guestName, content),
    category: channelSlug,
  });

  if (error) {
    console.error("Community post error:", error.message);
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

export async function submitGuestReply(
  _prev: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const guestName = (formData.get("guest_name") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const postId = formData.get("post_id") as string;

  if (!guestName) return { error: "Please enter your name." };
  if (guestName.length > 60) return { error: "Name is too long." };
  if (!content || content.length < 2) return { error: "Reply is too short." };
  if (!postId) return { error: "Missing post ID." };

  const supabase = makeServiceClient();

  const { error } = await supabase.from("community_replies").insert({
    user_id: GUEST_USER_ID,
    post_id: postId,
    content: encodeGuestContent(guestName, content),
  });

  if (error) {
    console.error("Reply error:", error.message);
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
