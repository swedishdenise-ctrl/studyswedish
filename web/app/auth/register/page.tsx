import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata = { title: "Create your account" };

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Start learning free
      </h1>
      <p className="mt-3 text-charcoal/70">
        No credit card. Start with the full A1 course, free.
      </p>
      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <RegisterForm />
      </div>
      <p className="mt-6 text-center text-sm text-charcoal/70">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-swedish-blue hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
