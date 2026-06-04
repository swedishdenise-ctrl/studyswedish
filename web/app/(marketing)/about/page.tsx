import Link from "next/link";

export const metadata = {
  title: "About Denise — StudySwedish",
  description:
    "I'm Denise — from Halmstad, Sweden, now living in Spain. I share Swedish culture, language and life because I genuinely love where I'm from.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>

      {/* Hero */}
      <section className="px-6 pt-36 pb-16 sm:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            About
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl" style={{ color: "#1A1208" }}>
            Hej, I'm Denise.
          </h1>
          <p className="mt-2 font-display text-xl italic" style={{ color: "#C9A04A" }}>
            Just very Swedish.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl space-y-8 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>

          <p>
            I grew up in <strong style={{ color: "#1A1208" }}>Halmstad</strong> — a small city on the west
            coast of Sweden, right by the sea. The kind of place where summer lasts exactly long enough
            to make you fall in love with it, and winter lasts exactly long enough to make you appreciate that.
          </p>

          <p>
            I left Sweden and moved abroad, and somewhere in the middle of a life that looked nothing like
            the one I grew up with, I started to really <em>miss</em> it. The culture, the humour, the way
            Swedes communicate — or don't communicate. The things I used to take for granted suddenly felt
            like the most interesting things in the world. So I started talking about them.
          </p>

          <p>
            That became this — a corner of the internet about Sweden, Swedish, and what it actually means
            to be Swedish. The videos, the book, the app, the proverbs. All of it started with missing home.
          </p>

          <div className="my-10 h-px" style={{ background: "#C9A04A20" }} />

          <p>
            I live in <strong style={{ color: "#1A1208" }}>Spain</strong> now, which means most mornings
            I'm either lifting weights, running along the coast, or sitting somewhere near the ocean with
            a coffee thinking about what to make next. The ocean is where I feel most like myself.
          </p>

          <p>
            I'm a big believer that you can completely change your life — that what you put out into the
            world comes back to you, that positive thinking isn't just a cliché, and that most limits are
            ones we invented ourselves. That belief shows up in everything I do, including the affirmations
            project.
          </p>

          <p>
            Health, movement, mindset, and the sea. Sweden. That's most of what I am.
          </p>

          <div className="my-10 h-px" style={{ background: "#C9A04A20" }} />

          <p>
            If you want to see more of the day-to-day, I'm most active on{" "}
            <Link
              href="https://www.instagram.com/swedish_with_denise"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 transition hover:opacity-70"
              style={{ color: "#C9A04A" }}
            >
              Instagram
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.tiktok.com/@swedish_with_denise"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 transition hover:opacity-70"
              style={{ color: "#C9A04A" }}
            >
              TikTok
            </Link>
            . And if you just want to say hej —{" "}
            <a
              href="mailto:hej@studyswedish.com"
              className="font-medium underline underline-offset-2 transition hover:opacity-70"
              style={{ color: "#C9A04A" }}
            >
              hej@studyswedish.com
            </a>
          </p>

          <p className="font-display text-xl italic" style={{ color: "#C9A04A80" }}>
            Tack för att du är här.
          </p>

        </div>
      </section>

      {/* Quick links */}
      <section className="border-t px-6 py-12" style={{ borderColor: "#C9A04A15" }}>
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            What I make
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/conversagas", label: "Conversagas — the app" },
              { href: "/shop",        label: "Downloads" },
              { href: "/community",   label: "Community" },
              { href: "/recipes",     label: "Swedish recipes" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border px-5 py-2 text-sm font-medium transition hover:border-[#C9A04A] hover:text-[#C9A04A]"
                style={{ borderColor: "#C9A04A30", color: "#3D2B14" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
