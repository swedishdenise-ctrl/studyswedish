"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = undefined;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {redirectTo && (
        <input type="hidden" name="redirectTo" value={redirectTo} />
      )}
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-charcoal">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-lg border border-black/10 bg-white px-3 py-2.5 text-base text-charcoal outline-none transition focus:border-swedish-blue focus:ring-2 focus:ring-swedish-blue/20"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-charcoal">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-black/10 bg-white px-3 py-2.5 text-base text-charcoal outline-none transition focus:border-swedish-blue focus:ring-2 focus:ring-swedish-blue/20"
        />
      </label>

      {state?.error ? (
        <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-swedish-blue px-5 py-3 font-medium text-white transition hover:bg-swedish-blue-dark disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
