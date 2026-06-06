export const metadata = {
  title: "Privacy Policy, StudySwedish",
  description: "How StudySwedish handles your data.",
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>
      <section className="px-6 pt-36 pb-24 sm:pt-44">
        <div className="mx-auto max-w-2xl">

          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Legal
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold" style={{ color: "#1A1208" }}>
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#8B6A3E80" }}>
            Last updated: June 2026
          </p>

          <div className="mt-12 space-y-10 text-[16px] leading-relaxed" style={{ color: "#3D2B14" }}>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Who we are</h2>
              <p className="mt-3">
                This is StudySwedish.com, run by Denise. The site covers Swedish language, culture, recipes,
                and resources, including the Conversagas language app and downloadable products. If you have
                any questions about this policy, email{" "}
                <a href="mailto:swedish.denise@gmail.com" className="underline underline-offset-2" style={{ color: "#C9A04A" }}>
                  swedish.denise@gmail.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>What data we collect</h2>
              <p className="mt-3">We only collect what we need:</p>
              <ul className="mt-3 space-y-2 pl-5 list-disc" style={{ color: "#3D2B1490" }}>
                <li><strong style={{ color: "#1A1208" }}>Email address</strong>, if you create an account or sign up for updates.</li>
                <li><strong style={{ color: "#1A1208" }}>Usage data</strong>, pages visited, time spent, general interaction data. This is anonymous and used only to improve the site.</li>
                <li><strong style={{ color: "#1A1208" }}>Technical data</strong>, browser type, device, approximate location (country level). Collected automatically by our hosting provider.</li>
              </ul>
              <p className="mt-3">
                We do not sell your data. We do not share it with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>How we use your data</h2>
              <ul className="mt-3 space-y-2 pl-5 list-disc" style={{ color: "#3D2B1490" }}>
                <li>To provide the services you signed up for</li>
                <li>To send updates you asked for (you can unsubscribe any time)</li>
                <li>To understand how the site is used so we can improve it</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Cookies</h2>
              <p className="mt-3">
                We use essential cookies to keep the site working, for example, to keep you logged in.
                We do not use advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Third-party services</h2>
              <p className="mt-3">We use a small number of trusted services to run the site:</p>
              <ul className="mt-3 space-y-2 pl-5 list-disc" style={{ color: "#3D2B1490" }}>
                <li><strong style={{ color: "#1A1208" }}>Supabase</strong>, database and authentication. Your account data is stored securely here.</li>
                <li><strong style={{ color: "#1A1208" }}>Vercel</strong>, website hosting. Processes technical data as part of serving the site.</li>
              </ul>
              <p className="mt-3">
                Each of these services has their own privacy policy and handles data in accordance with GDPR.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Your rights (GDPR)</h2>
              <p className="mt-3">
                If you're in the EU or UK, you have the right to access, correct, or delete your personal data
                at any time. You can also object to how we use it or ask us to restrict processing.
              </p>
              <p className="mt-3">
                To exercise any of these rights, just email{" "}
                <a href="mailto:swedish.denise@gmail.com" className="underline underline-offset-2" style={{ color: "#C9A04A" }}>
                  swedish.denise@gmail.com
                </a>{" "}
                and we'll sort it out promptly.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Data retention</h2>
              <p className="mt-3">
                We keep your data for as long as your account is active. If you delete your account,
                your personal data is removed within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Changes to this policy</h2>
              <p className="mt-3">
                If we make significant changes, we'll update the date at the top of this page.
                We won't make your data less private without letting you know.
              </p>
            </div>

            <div className="border-t pt-10" style={{ borderColor: "#C9A04A15" }}>
              <p style={{ color: "#8B6A3E80" }}>
                Questions? Email{" "}
                <a href="mailto:swedish.denise@gmail.com" className="underline underline-offset-2" style={{ color: "#C9A04A" }}>
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
