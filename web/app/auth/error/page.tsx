import Link from "next/link";

export const metadata = { title: "Something went wrong" };

export default function AuthErrorPage() {
  return (
    <div className="text-center">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-3 text-charcoal/70">
        We couldn&rsquo;t finish signing you in. The link may have expired.
      </p>
      <Link
        href="/auth/login"
        className="mt-6 inline-block rounded-full bg-swedish-blue px-5 py-3 font-medium text-white transition hover:bg-swedish-blue-dark"
      >
        Try signing in again
      </Link>
    </div>
  );
}
