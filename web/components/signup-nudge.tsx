"use client";

import Link from "next/link";

/**
 * Shows a gentle signup nudge after the user has practiced enough words/verbs.
 * Threshold is configurable — defaults to 10 interactions.
 */
export function SignupNudge({
  practiceCount,
  threshold = 10,
}: {
  practiceCount: number;
  threshold?: number;
}) {
  if (practiceCount < threshold) return null;

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-swedish-blue/20 bg-gradient-to-br from-swedish-blue/5 to-cream">
      <div className="px-6 py-8 text-center sm:px-10">
        <p className="font-display text-2xl font-semibold text-charcoal">
          You&rsquo;ve practiced {practiceCount} words!
        </p>
        <p className="mx-auto mt-3 max-w-md text-charcoal/70">
          Create a free account to save your progress, track what you&rsquo;ve
          learned, and unlock the full A1 course. No credit card needed.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/auth/register"
            className="rounded-full bg-swedish-blue px-6 py-2.5 text-sm font-medium text-white transition hover:bg-swedish-blue-dark"
          >
            Create free account
          </Link>
          <span className="text-xs text-warm-gray">
            Or keep practicing — no rush
          </span>
        </div>
      </div>
    </div>
  );
}
