"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { communityChannels } from "@/data/community-channels";
import { submitGuestPost } from "./actions";

export function CreatePostForm() {
  const searchParams = useSearchParams();
  const preselectedChannel = searchParams.get("channel") ?? "";

  const [state, action, pending] = useActionState(submitGuestPost, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-forest/20 bg-forest/5 p-8 text-center">
        <p className="text-3xl">🇸🇪</p>
        <h2 className="mt-3 font-display text-xl font-semibold text-charcoal">
          Post published! Tack!
        </h2>
        <p className="mt-2 text-sm text-charcoal/60">
          Your post is saved in the community.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/community"
            className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white transition hover:bg-slate"
          >
            Back to community
          </Link>
          <Link
            href="/community/new"
            className="rounded-full border border-charcoal/10 px-6 py-2.5 text-sm font-medium text-charcoal/70 transition hover:border-charcoal/20"
          >
            Write another
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="guest_name"
          className="block text-sm font-medium text-charcoal/70"
        >
          Your name <span className="text-coral">*</span>
        </label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          required
          placeholder="What should we call you?"
          maxLength={60}
          className="mt-1.5 w-full rounded-xl border border-black/5 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/25 focus:border-swedish-blue/30 focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
        />
      </div>

      {/* Channel */}
      <div>
        <label
          htmlFor="channel"
          className="block text-sm font-medium text-charcoal/70"
        >
          Channel <span className="text-coral">*</span>
        </label>
        <select
          id="channel"
          name="channel"
          required
          defaultValue={preselectedChannel}
          className="mt-1.5 w-full rounded-xl border border-black/5 bg-white px-4 py-2.5 text-sm text-charcoal focus:border-swedish-blue/30 focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
        >
          <option value="">Select a channel…</option>
          {communityChannels.map((ch) => (
            <option key={ch.slug} value={ch.slug}>
              {ch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-charcoal/70"
        >
          Title <span className="text-coral">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Give your post a clear title…"
          maxLength={200}
          className="mt-1.5 w-full rounded-xl border border-black/5 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/25 focus:border-swedish-blue/30 focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
        />
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-charcoal/70"
        >
          Content <span className="text-coral">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          required
          placeholder="Share your thoughts, experiences, or questions…"
          rows={8}
          className="mt-1.5 w-full resize-y rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/25 focus:border-swedish-blue/30 focus:outline-none focus:ring-2 focus:ring-swedish-blue/10"
        />
      </div>

      {/* Error */}
      {state?.error && (
        <p className="rounded-xl bg-coral/5 px-4 py-3 text-sm text-coral">
          {state.error}
        </p>
      )}

      {/* Submit */}
      <div className="flex items-center justify-between border-t border-black/5 pt-5">
        <Link
          href="/community"
          className="text-sm text-charcoal/40 transition hover:text-charcoal/60"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-golden px-6 py-2.5 text-sm font-medium text-navy transition hover:bg-golden-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Publishing…" : "Publish post"}
        </button>
      </div>
    </form>
  );
}
