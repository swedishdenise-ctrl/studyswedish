import Link from "next/link";
import { LoginForm } from "./login-form";
import { Suspense } from "react";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Välkommen tillbaka
      </h1>
      <p className="mt-3 text-charcoal/70">Sign in to keep learning Swedish.</p>
      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-sm text-charcoal/70">
        New here?{" "}
        <Link href="/auth/register" className="font-medium text-swedish-blue hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
