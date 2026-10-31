export const metadata = {
  title: "Privacy Policy, StudySwedish",
  description: "How StudySwedish handles your data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper">
      <section className="px-6 pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-2xl">

          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-ink/45">
            Legal
          </p>
          <h1 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ink/50">
            Last updated: June 2026
          </p>

          <div className="mt-12 space-y-10 text-[16px] leading-relaxed text-ink/80">

            <div>
              <h2 className="font-display text-xl font-normal text-ink">Who we are</h2>
              <p className="mt-3">
                This is StudySwedish.com, run by Denise. The site sells the Swedish Words fridge
                magnets and related products. If you have any questions about this policy, email{" "}
                <a href="mailto:swedish.denise@gmail.com" className="text-brand underline underline-offset-2">
                  swedish.denise@gmail.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">What data we collect</h2>
              <p className="mt-3">We only collect what we need:</p>
              <ul className="mt-3 space-y-2 pl-5 list-disc text-ink/70">
                <li><strong className="text-ink">Order details</strong>, your name, shipping address, and email, collected by Stripe at checkout to fulfill your order.</li>
                <li><strong className="text-ink">Usage data</strong>, pages visited, time spent, general interaction data. This is anonymous and used only to improve the site.</li>
                <li><strong className="text-ink">Technical data</strong>, browser type, device, approximate location (country level). Collected automatically by our hosting provider.</li>
              </ul>
              <p className="mt-3">
                We do not sell your data. We do not share it with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">How we use your data</h2>
              <ul className="mt-3 space-y-2 pl-5 list-disc text-ink/70">
                <li>To process and ship your order</li>
                <li>To contact you about your order if needed</li>
                <li>To understand how the site is used so we can improve it</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">Cookies</h2>
              <p className="mt-3">
                We use only essential cookies to keep the site working. We do not use
                advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">Third-party services</h2>
              <p className="mt-3">We use a small number of trusted services to run the site:</p>
              <ul className="mt-3 space-y-2 pl-5 list-disc text-ink/70">
                <li><strong className="text-ink">Stripe</strong>, payment processing. Handles your card details and shipping address — we never see or store your card information.</li>
                <li><strong className="text-ink">Vercel</strong>, website hosting. Processes technical data as part of serving the site.</li>
              </ul>
              <p className="mt-3">
                Each of these services has their own privacy policy and handles data in accordance with GDPR.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">Your rights (GDPR)</h2>
              <p className="mt-3">
                If you&apos;re in the EU or UK, you have the right to access, correct, or delete your
                personal data at any time. You can also object to how we use it or ask us to
                restrict processing.
              </p>
              <p className="mt-3">
                To exercise any of these rights, just email{" "}
                <a href="mailto:swedish.denise@gmail.com" className="text-brand underline underline-offset-2">
                  swedish.denise@gmail.com
                </a>{" "}
                and we&apos;ll sort it out promptly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">Data retention</h2>
              <p className="mt-3">
                We keep order data for as long as needed for accounting and legal purposes,
                then it&apos;s removed.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-normal text-ink">Changes to this policy</h2>
              <p className="mt-3">
                If we make significant changes, we&apos;ll update the date at the top of this page.
                We won&apos;t make your data less private without letting you know.
              </p>
            </div>

            <div className="border-t border-ink/10 pt-10">
              <p className="text-ink/50">
                Questions? Email{" "}
                <a href="mailto:swedish.denise@gmail.com" className="text-brand underline underline-offset-2">
                  swedish.denise@gmail.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
