import Link from "next/link";

export const metadata = {
  title: "1:1 Swedish Coaching with Denise, StudySwedish",
  description:
    "Private Swedish coaching sessions with a native speaker. 30 minutes of real conversation, honest feedback, and guidance that textbooks skip.",
};

const CALENDLY = "https://calendly.com/swedish-denise";

export default function CoachingPage() {
  return (
    <div style={{ background: "#FAF5EE" }}>

      {/* Hero */}
      <section className="px-6 pt-36 pb-20 sm:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            1:1 Coaching
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl" style={{ color: "#1A1208" }}>
            Learn Swedish with a native speaker.
          </h1>
          <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "#3D2B14BB" }}>
            Private sessions with me, Denise, from Halmstad, Sweden.
            Real conversation, honest feedback, and the kind of context
            you only get from someone who actually grew up speaking it.
          </p>
          <div className="mt-8">
            <Link
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#C9A04A", color: "#1A1208" }}
            >
              Book a session
            </Link>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <h2 className="font-display text-3xl font-semibold leading-tight" style={{ color: "#1A1208" }}>
            You know some Swedish, but you can't actually speak it yet.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>
            Maybe you've taken classes, used an app, or watched Swedish films with subtitles.
            You understand more than you expected, but the moment you try to say something,
            everything disappears.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>
            That gap between understanding and speaking is exactly what we work on together.
            Any level is welcome — complete beginners, people who've plateaued, anyone preparing
            for a trip, a job, or a life that requires Swedish.
          </p>

          {/* Pull quote */}
          <p className="mt-10 font-display text-2xl font-semibold italic leading-snug" style={{ color: "#C9A04A" }}>
            "If you want to actually speak rather than just study — this is for you."
          </p>
        </div>
      </section>

      {/* What a session looks like */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            What to expect
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            A session shaped around you.
          </h2>
          <div className="mt-10">
            {[
              {
                title: "Real conversation",
                body: "We talk, in Swedish, at your pace. I meet you where you are and push you a little further.",
              },
              {
                title: "Honest corrections",
                body: "I'll tell you when something sounds unnatural, not just when it's grammatically wrong.",
              },
              {
                title: "Cultural context",
                body: "What Swedes actually say versus what the textbook says. The social rules no course teaches.",
              },
              {
                title: "Your agenda",
                body: "Travel Swedish, work Swedish, fika chat, pronunciation. You tell me what you need.",
              },
            ].map((item, i) => (
              <div key={item.title} className="border-t py-8 flex gap-7" style={{ borderColor: "#C9A04A20" }}>
                <span
                  className="font-display text-5xl font-semibold leading-none shrink-0 select-none"
                  style={{ color: "#C9A04A18", marginTop: "2px", minWidth: "3rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>{item.title}</p>
                  <p className="mt-2 text-[16px] leading-relaxed" style={{ color: "#3D2B14BB" }}>{item.body}</p>
                </div>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: "#C9A04A20" }} />
          </div>
        </div>
      </section>

      {/* About Denise */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Your coach
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            Hej, I'm Denise.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>
            I grew up in Halmstad on the west coast of Sweden. I've spent years sharing Swedish
            culture and language online because I genuinely love it. I'm not a credentialed teacher,
            I'm a native speaker who knows how the language actually sounds, what sounds natural,
            and what gives you away as a learner the second you open your mouth.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>
            That's what I bring to a session.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-block text-sm font-medium underline underline-offset-2 transition hover:opacity-60"
            style={{ color: "#C9A04A" }}
          >
            More about me
          </Link>
        </div>
      </section>

      {/* Sessions, warm background */}
      <section className="px-6 py-20" style={{ background: "#F0E8D8" }}>
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Sessions
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold" style={{ color: "#1A1208" }}>
            Simple and straightforward.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed max-w-lg" style={{ color: "#3D2B14BB" }}>
            Pick whichever fits how you like to learn. We will talk about cost once
            I know what you need, it depends on the person.
          </p>
          <div className="mt-10">
            <div className="border-t py-8" style={{ borderColor: "#C9A04A25" }}>
              <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Single session</p>
              <p className="mt-1 text-sm" style={{ color: "#3D2B1470" }}>30 minutes, no commitment</p>
              <div className="mt-4">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition hover:opacity-90"
                  style={{ background: "#C9A04A", color: "#1A1208" }}
                >
                  Pick a time
                </a>
              </div>
            </div>
            <div className="border-t py-8" style={{ borderColor: "#C9A04A25" }}>
              <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Swedish Intensive</p>
              <p className="mt-1 text-sm" style={{ color: "#3D2B1470" }}>4 × 30 min sessions</p>
              <div className="mt-4">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition hover:opacity-90"
                  style={{ background: "#1A1208", color: "#F5EDE3" }}
                >
                  Pick a time
                </a>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: "#C9A04A25" }} />
          </div>
          <p className="mt-8 text-sm" style={{ color: "#3D2B1470" }}>
            Questions?{" "}
            <a href="mailto:swedish.denise@gmail.com" className="underline underline-offset-2 hover:opacity-70" style={{ color: "#C9A04A" }}>
              swedish.denise@gmail.com
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}
