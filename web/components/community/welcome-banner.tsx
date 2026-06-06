import Image from "next/image";

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-golden/15">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/swedish-archipelago.jpg"
          alt="Swedish archipelago islands and calm waters"
          fill
          className="object-cover"
          quality={80}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/75 to-navy-deep/90" />

      {/* Decorative glow elements */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-golden/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-swedish-blue/10 blur-3xl" />

      {/* Content */}
      <div className="relative p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-golden/70">
          The Swedish Community
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Välkommen hem.
        </h1>
        <p className="mt-1 font-display text-lg text-white/35 italic">
          Welcome home.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60">
          A corner of the internet for people who love Sweden and can&rsquo;t
          really explain why but don&rsquo;t need to. Ask questions, share
          what you find, say hej.
        </p>

      </div>
    </div>
  );
}
