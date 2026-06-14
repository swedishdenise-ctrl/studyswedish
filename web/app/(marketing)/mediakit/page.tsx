import Link from "next/link";

export const metadata = {
  title: "Media Kit, Swedish with Denise",
  description:
    "Press kit and brand partnership information for Swedish with Denise. Collaborations, sponsorships, and press inquiries.",
};

export default function MediaKitPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>
      {/* Hero section */}
      <section className="px-6 pt-36 pb-20 sm:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Media Kit &nbsp;·&nbsp; 2026
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold leading-tight sm:text-6xl" style={{ color: "#1A1208" }}>
            Swedish with Denise
          </h1>
          <div className="mt-6 h-px w-12" style={{ background: "#C9A04A50" }} />
          <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "#3D2B14" }}>
            I'm Denise — a native Swede living in Spain who creates content that decodes Swedish culture for the world.
            My reels reveal the insider secrets, unspoken rules, and cultural quirks that make Swedes uniquely Swedish.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="font-display text-4xl font-semibold" style={{ color: "#C9A04A" }}>433k</p>
              <p className="mt-2 text-sm" style={{ color: "#3D2B1470" }}>Monthly Reach</p>
            </div>
            <div>
              <p className="font-display text-4xl font-semibold" style={{ color: "#C9A04A" }}>1.3M</p>
              <p className="mt-2 text-sm" style={{ color: "#3D2B1470" }}>Monthly Views</p>
            </div>
            <div>
              <p className="font-display text-4xl font-semibold" style={{ color: "#C9A04A" }}>26.4k</p>
              <p className="mt-2 text-sm" style={{ color: "#3D2B1470" }}>Combined Followers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms detail */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="rounded-lg p-6" style={{ background: "#F0EBE3" }}>
              <p className="text-sm font-semibold" style={{ color: "#C9A04A" }}>Instagram</p>
              <p className="text-2xl font-semibold mt-2" style={{ color: "#1A1208" }}>@swedish_with_denise</p>
              <div className="mt-4 space-y-3 text-sm" style={{ color: "#3D2B14" }}>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Followers</span>
                  <span className="font-semibold">9,500</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Monthly Reach</span>
                  <span className="font-semibold">433,000</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Monthly Views</span>
                  <span className="font-semibold">1,300,000</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Avg. Interactions/mo</span>
                  <span className="font-semibold">61,500</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg p-6" style={{ background: "#F0EBE3" }}>
              <p className="text-sm font-semibold" style={{ color: "#C9A04A" }}>TikTok</p>
              <p className="text-2xl font-semibold mt-2" style={{ color: "#1A1208" }}>@swedish_with_denise</p>
              <div className="mt-4 space-y-3 text-sm" style={{ color: "#3D2B14" }}>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Followers</span>
                  <span className="font-semibold">16,900</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Content Type</span>
                  <span className="font-semibold">Short-form Reels</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Niche</span>
                  <span className="font-semibold">Swedish Culture</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#9B9690" }}>Distribution</span>
                  <span className="font-semibold">Dual-published</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top content */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <h2 className="font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>Top Performing Content</h2>
          <div className="mt-8 space-y-4">
            {[
              { num: "01", title: "This is why you don't understand when Swedish people talk", views: "189,970" },
              { num: "02", title: "If a Swede tells you this... you know you messed up", views: "162,024" },
              { num: "03", title: "How other countries swear VS Sweden", views: "124,439" },
            ].map((reel) => (
              <div key={reel.num} className="flex gap-4 pb-4 border-b" style={{ borderColor: "#C9A04A15" }}>
                <span className="font-display text-2xl font-semibold shrink-0" style={{ color: "#C9A04A" }}>{reel.num}</span>
                <div className="flex-1">
                  <p style={{ color: "#3D2B14" }}>{reel.title}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>{reel.views}</p>
                  <p className="text-xs" style={{ color: "#9B9690" }}>views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <h2 className="font-display text-3xl font-semibold mb-8" style={{ color: "#1A1208" }}>Work With Me</h2>

          <h3 className="font-display text-xl font-semibold mb-4" style={{ color: "#1A1208" }}>Previous Brand Partners</h3>
          <div className="flex flex-wrap gap-3 mb-12">
            {["Rusta", "Face Stockholm", "Fytoo Glasses", "Dossier Perfumes", "AnytoSpeech", "Maria Åkerberg"].map((brand) => (
              <div key={brand} className="px-4 py-2 border rounded-sm text-sm" style={{ borderColor: "#C9A04A", color: "#5A4E40" }}>
                {brand}
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl font-semibold mb-4" style={{ color: "#1A1208" }}>What I Offer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {[
              { title: "Sponsored Reels & TikToks", desc: "Native-style video content woven naturally into my storytelling — never stiff or scripted" },
              { title: "Instagram Stories", desc: "Product features, link stickers, and day-in-the-life integrations that drive real clicks" },
              { title: "Product Reviews & Unboxings", desc: "Honest, engaging reviews that feel personal and build genuine trust with my audience" },
              { title: "Long-term Partnerships", desc: "Ongoing brand ambassador relationships for consistent audience exposure and maximum impact" },
            ].map((offer) => (
              <div key={offer.title} className="rounded-lg p-4" style={{ background: "#F0EBE3" }}>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: "#C9A04A" }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1208" }}>{offer.title}</p>
                    <p className="mt-1 text-xs leading-relaxed" style={{ color: "#9B9690" }}>{offer.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg p-8 sm:p-10" style={{ background: "#1A1208" }}>
            <h2 className="font-display text-3xl font-semibold" style={{ color: "white" }}>Let's work together</h2>
            <p className="mt-2 text-sm leading-relaxed max-w-sm" style={{ color: "#D9D2C9" }}>
              I'd love to hear about your brand and find the right way to collaborate. All enquiries welcome.
            </p>
            <div className="mt-8 space-y-2">
              <p style={{ color: "#D9D2C9" }}>
                <span className="font-semibold" style={{ color: "#C9A04A" }}>Email &nbsp;</span>
                <a href="mailto:swedish.denise@gmail.com" className="hover:underline">swedish.denise@gmail.com</a>
              </p>
              <p style={{ color: "#D9D2C9" }}>
                <span className="font-semibold" style={{ color: "#C9A04A" }}>Instagram &nbsp;</span>
                <a href="https://instagram.com/swedish_with_denise" target="_blank" rel="noopener noreferrer" className="hover:underline">@swedish_with_denise</a>
              </p>
              <p style={{ color: "#D9D2C9" }}>
                <span className="font-semibold" style={{ color: "#C9A04A" }}>Web &nbsp;</span>
                <a href="https://studyswedish.com" className="hover:underline">studyswedish.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
