"use server";

/**
 * Community server actions.
 *
 * These are stubs that will be wired to Supabase once the migration is applied.
 * For now the UI uses sample data — these actions are here so the forms have
 * something to call once auth and DB are live.
 */

export async function createPost(_formData: FormData) {
  // TODO: wire to Supabase
  // 1. Verify auth (redirect to login if not signed in)
  // 2. Validate fields with Zod
  // 3. Generate slug from title
  // 4. Insert into community_posts
  // 5. Redirect to the new post page
  throw new Error("Not implemented — Supabase not connected yet");
}

export async function createReply(_formData: FormData) {
  // TODO: wire to Supabase
  throw new Error("Not implemented — Supabase not connected yet");
}

export async function toggleHeart(_postId: string) {
  // TODO: wire to Supabase
  throw new Error("Not implemented — Supabase not connected yet");
}

export async function toggleBookmark(_postId: string) {
  // TODO: wire to Supabase
  throw new Error("Not implemented — Supabase not connected yet");
}

export async function deletePost(_postId: string) {
  // TODO: wire to Supabase — soft delete (is_deleted = true)
  throw new Error("Not implemented — Supabase not connected yet");
}

export async function pinPost(_postId: string) {
  // TODO: wire to Supabase — moderator only
  throw new Error("Not implemented — Supabase not connected yet");
}
