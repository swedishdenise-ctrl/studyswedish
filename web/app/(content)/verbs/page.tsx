import Image from "next/image";
import { VerbsContent } from "./verbs-content";

export const metadata = {
  title: "Swedish verb conjugator — StudySwedish",
  description:
    "Look up any Swedish verb and see its full conjugation, or drill yourself with interactive conjugation quizzes. Free, no account needed.",
};

export default function VerbsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-black/5">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src="/skargard.jpg"
            alt="Swedish archipelago with red cottages and turquoise water"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-6 pb-10">
              <p className="text-sm uppercase tracking-wide text-white/80">
                Verb conjugator
              </p>
              <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white">
                Every form, one&nbsp;table.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/80">
                Look up a Swedish verb and see its full conjugation, or test
                yourself with the conjugation drill. Present, past, supinum,
                imperative — learn them all.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VerbsContent />
    </>
  );
}
