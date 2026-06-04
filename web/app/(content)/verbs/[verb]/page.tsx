import Link from "next/link";
import { notFound } from "next/navigation";
import { VERBS, VERB_GROUPS } from "@/data/verbs";

type Props = { params: Promise<{ verb: string }> };

export async function generateMetadata({ params }: Props) {
  const { verb: slug } = await params;
  const v = VERBS.find((v) => v.infinitive === decodeURIComponent(slug));
  if (!v) return {};
  return {
    title: `"${v.infinitive}" conjugation — Swedish verb — StudySwedish`,
    description: `Full conjugation of the Swedish verb "${v.infinitive}" (${v.english}): present ${v.present}, past ${v.preteritum}, supinum ${v.supinum}, and more.`,
  };
}

export function generateStaticParams() {
  return VERBS.map((v) => ({ verb: v.infinitive }));
}

const GROUP_COLORS: Record<number, string> = {
  1: "bg-swedish-blue/10 text-swedish-blue",
  2: "bg-forest/15 text-forest",
  3: "bg-golden/25 text-charcoal",
  4: "bg-coral/15 text-coral",
};

export default async function VerbDetailPage({ params }: Props) {
  const { verb: slug } = await params;
  const v = VERBS.find((v) => v.infinitive === decodeURIComponent(slug));
  if (!v) notFound();

  const groupInfo = v.verbGroup
    ? VERB_GROUPS.find((g) => g.group === v.verbGroup)
    : null;

  const groupPill = v.verbGroup
    ? GROUP_COLORS[v.verbGroup]
    : "bg-coral/15 text-coral";

  const forms = [
    { label: "Infinitive", value: v.infinitive },
    { label: "Present", value: v.present },
    { label: "Preteritum (past)", value: v.preteritum },
    { label: "Supinum (perfect)", value: v.supinum },
    { label: "Imperative", value: v.imperative },
    ...(v.presentParticiple
      ? [{ label: "Present participle", value: v.presentParticiple }]
      : []),
    ...(v.pastParticiple
      ? [{ label: "Past participle", value: v.pastParticiple }]
      : []),
  ];

  // Find related verbs in the same group
  const related = VERBS.filter(
    (other) =>
      other.id !== v.id &&
      ((v.verbGroup !== null && other.verbGroup === v.verbGroup) ||
        (v.isIrregular && other.isIrregular))
  ).slice(0, 6);

  return (
    <>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/verbs"
            className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline"
          >
            &larr; All verbs
          </Link>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-5xl font-semibold tracking-tight">
                {v.infinitive}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${groupPill}`}
              >
                {v.verbGroup ? `Group ${v.verbGroup}` : "Irregular"}
              </span>
              <span className="rounded-full bg-cream px-3 py-1 text-sm text-charcoal/70">
                {v.cefrLevel}
              </span>
            </div>
            <p className="mt-3 text-xl text-charcoal/70">{v.english}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        {/* Conjugation table */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          <div className="border-b border-black/5 bg-cream/40 px-5 py-3">
            <h2 className="font-display text-lg font-semibold">
              Conjugation
            </h2>
          </div>
          <div className="divide-y divide-black/5">
            {forms.map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between px-5 py-3"
              >
                <span className="text-sm text-charcoal/60">{f.label}</span>
                <span className="font-display text-lg font-semibold text-charcoal">
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-5">
          <h2 className="text-xs uppercase tracking-wide text-warm-gray">
            Example
          </h2>
          <p className="mt-2 font-display text-lg italic text-charcoal/80">
            {v.exampleSv}
          </p>
          <p className="mt-1 text-sm text-charcoal/60">{v.exampleEn}</p>
        </div>

        {/* Notes */}
        {v.notes && (
          <div className="mt-6 rounded-2xl border border-swedish-blue/15 bg-swedish-blue/5 p-5">
            <h2 className="text-xs uppercase tracking-wide text-swedish-blue">
              Note
            </h2>
            <p className="mt-2 text-sm text-charcoal/80">{v.notes}</p>
          </div>
        )}

        {/* Group info */}
        {groupInfo && (
          <div className="mt-6 rounded-2xl border border-black/5 bg-white p-5">
            <h2 className="text-xs uppercase tracking-wide text-warm-gray">
              About {groupInfo.label}
            </h2>
            <p className="mt-2 text-sm text-charcoal/70">
              {groupInfo.description}
            </p>
            <p className="mt-2 font-mono text-xs text-warm-gray">
              Pattern: {groupInfo.example}
            </p>
          </div>
        )}

        {/* Usage in sentences */}
        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-5">
          <h2 className="text-xs uppercase tracking-wide text-warm-gray">
            Quick reference
          </h2>
          <div className="mt-3 space-y-2 text-sm">
            <p>
              <span className="text-charcoal/50">Present:</span>{" "}
              <span className="text-charcoal">
                Jag <strong>{v.present}</strong>.
              </span>
            </p>
            <p>
              <span className="text-charcoal/50">Past:</span>{" "}
              <span className="text-charcoal">
                Jag <strong>{v.preteritum}</strong>.
              </span>
            </p>
            <p>
              <span className="text-charcoal/50">Perfect:</span>{" "}
              <span className="text-charcoal">
                Jag har <strong>{v.supinum}</strong>.
              </span>
            </p>
          </div>
        </div>

        {/* Related verbs */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold">
              More {v.isIrregular ? "irregular" : `Group ${v.verbGroup}`}{" "}
              verbs
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/verbs/${r.infinitive}`}
                  className="card-hover rounded-xl border border-black/5 bg-white p-4 hover:border-swedish-blue/30"
                >
                  <p className="font-display font-semibold text-charcoal">
                    {r.infinitive}
                  </p>
                  <p className="text-xs text-charcoal/60">{r.english}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
