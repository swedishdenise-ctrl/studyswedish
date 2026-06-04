"use client";

import { useActionState, useState } from "react";
import { submitGuestReply } from "@/app/(content)/community/new/actions";

export function ReplyForm({ postId }: { postId: string }) {
  const [focused, setFocused] = useState(false);
  const [state, action, pending] = useActionState(submitGuestReply, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-forest/20 bg-forest/5 px-5 py-4 text-center">
        <p className="text-sm font-medium text-forest">Reply posted — tack!</p>
        <p className="mt-1 text-xs text-charcoal/45">
          It may take a moment to appear.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl border border-black/5 bg-white p-5 space-y-3">
      <input type="hidden" name="post_id" value={postId} />

      <p className="text-sm font-medium text-charcoal/70">Write a reply</p>

      {/* Name field */}
      <input
        name="guest_name"
        type="text"
        required
        placeholder="Your name"
        maxLength={60}
        className="w-full rounded-xl border border-black/5 bg-cream/50 px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/25 focus:border-swedish-blue/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
      />

      {/* Content */}
      <textarea
        name="content"
        required
        onFocus={() => setFocused(true)}
        placeholder="Share your thoughts…"
        rows={focused ? 4 : 2}
        className="w-full resize-none rounded-xl border border-black/5 bg-cream/50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/25 transition-all focus:border-swedish-blue/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
      />

      {state?.error && (
        <p className="text-xs text-coral">{state.error}</p>
      )}

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-golden px-5 py-2 text-sm font-medium text-navy transition hover:bg-golden-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Posting…" : "Reply"}
        </button>
      </div>
    </form>
  );
}
