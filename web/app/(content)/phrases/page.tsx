import Image from "next/image";
import { PHRASES, SITUATIONS } from "@/data/phrases";
import { PhraseSearch } from "./phrase-search";
import { PhrasePractice } from "./phrase-practice";

export const metadata = {
  title: "Swedish phrases — How do you say it in Swedish? — StudySwedish",
  description:
    "80+ essential Swedish phrases for real situations: greetings, restaurants, shopping, directions, fika, and more. Each phrase includes pronunciation, literal translations, and cultural notes.",
};

export default function PhrasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-black/5">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src="/blomma.jpg"
            alt="Swedish flowers"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-10">
              <p className="text-sm uppercase tracking-wide text-white/80">
                Phrases
              </p>
              <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white">
                How do you say it in Swedish?
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                Essential phrases for real situations — from your first{" "}
                <em>hej</em> to ordering fika like a local. Every phrase includes a
                literal translation so you can see how Swedish really works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice quiz */}
      <section className="border-b border-black/5 bg-cream/30">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-semibold">
              Practice phrases
            </h2>
            <p className="mt-2 text-charcoal/60">
              Match phrases, translate them, or type the Swedish yourself.
            </p>
          </div>
          <PhrasePractice phrases={PHRASES} />
        </div>
      </section>

      {/* Search + phrase listing (client component) */}
      <PhraseSearch phrases={PHRASES} situations={SITUATIONS} />

      {/* Footer note */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center">
          <p className="text-charcoal/70">
            We&rsquo;re adding new phrases regularly — got a situation
            you&rsquo;d like covered? Let us know.
          </p>
        </div>
      </section>
    </>
  );
}
