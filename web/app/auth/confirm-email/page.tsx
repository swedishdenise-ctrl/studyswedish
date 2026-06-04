export const metadata = { title: "Check your email" };

export default function ConfirmEmailPage() {
  return (
    <div className="text-center">
      <div className="mb-4 text-5xl">📬</div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Check your email
      </h1>
      <p className="mt-3 text-charcoal/70">
        We sent you a confirmation link. Click it to finish creating your account.
      </p>
      <p className="mt-6 text-sm text-warm-gray">
        Didn&rsquo;t get it? Check your spam folder, or try registering again.
      </p>
    </div>
  );
}
