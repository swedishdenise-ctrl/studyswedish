import Link from "next/link";

export const metadata = {
  title: "1:1 Swedish Coaching with Denise, StudySwedish",
  description:
    "Private Swedish coaching sessions with a native speaker. 60 minutes of real conversation, honest feedback, and guidance that textbooks skip.",
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
            Private 60-minute sessions with me, Denise, from Halmstad, Sweden.
            No textbook drills. Real conversation, honest feedback, and the kind
            of context you only get from someone who actually grew up speaking it.
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
          <h2 className="font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            You know some Swedish, but you can't actually speak it yet.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>
            Maybe you've taken classes, used an app, or watched Swedish films with subtitles.
            You understand more than you expected, but the moment you try to say something,
            everything disappears. That gap between understanding and speaking is exactly what
            we work on together.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "#3D2B14" }}>
            Any level is welcome. Complete beginners, intermediate learners who've
            plateaued, people preparing for a trip, a job, or a relationship that requires Swedish.
            If you want to actually speak rather than just study, this is for you.
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
          <h2 className="mt-4 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            A 60-minute session, shaped around you.
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
            ].map((item) => (
              <div key={item.title} className="border-t py-7" style={{ borderColor: "#C9A04A20" }}>
                <p className="font-display text-lg font-semibold" style={{ color: "#1A1208" }}>{item.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed" style={{ color: "#3D2B14BB" }}>{item.body}</p>
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
          <h2 className="mt-4 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
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

      {/* Pricing */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-2xl">
          <div className="h-px mb-16" style={{ background: "#C9A04A20" }} />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#8B6A3E60" }}>
            Pricing
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold" style={{ color: "#1A1208" }}>
            Simple and straightforward.
          </h2>
          <div className="mt-10">
            <div className="border-t py-8 sm:flex sm:items-center sm:justify-between sm:gap-8" style={{ borderColor: "#C9A04A20" }}>
              <div>
                <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>Single session</p>
                <p className="mt-1 text-sm" style={{ color: "#3D2B1470" }}>60 minutes, no commitment</p>
              </div>
              <p className="mt-3 font-display text-4xl font-semibold sm:mt-0 sm:shrink-0" style={{ color: "#1A1208" }}>€45</p>
            </div>
            <div className="border-t py-8 sm:flex sm:items-center sm:justify-between sm:gap-8" style={{ borderColor: "#C9A04A20" }}>
              <div>
                <p className="font-display text-xl font-semibold" style={{ color: "#1A1208" }}>4-session pack</p>
                <p className="mt-1 text-sm" style={{ color: "#3D2B1470" }}>4 × 60 min, save €20</p>
              </div>
              <p className="mt-3 font-display text-4xl font-semibold sm:mt-0 sm:shrink-0" style={{ color: "#1A1208" }}>€160</p>
            </div>
            <div className="border-t" style={{ borderColor: "#C9A04A20" }} />
          </div>
          <div className="mt-10">
            <Link
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#C9A04A", color: "#1A1208" }}
            >
              Book on Calendly
            </Link>
            <p className="mt-5 text-sm" style={{ color: "#3D2B1470" }}>
              Payment details are sent after booking. Questions?{" "}
              <a href="mailto:swedish.denise@gmail.com" className="underline underline-offset-2 hover:opacity-70" style={{ color: "#C9A04A" }}>
                swedish.denise@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
