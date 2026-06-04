"use client";

import { useActionState } from "react";
import { register, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = undefined;

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Field label="Your name" name="displayName" type="text" autoComplete="name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
      />

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
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  hint,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-charcoal">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="rounded-lg border border-black/10 bg-white px-3 py-2.5 text-base text-charcoal outline-none transition focus:border-swedish-blue focus:ring-2 focus:ring-swedish-blue/20"
      />
      {hint ? <span className="text-xs text-warm-gray">{hint}</span> : null}
    </label>
  );
}
