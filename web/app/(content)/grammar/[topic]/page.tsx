import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getGrammarTopic,
  getAllGrammarSlugs,
  GRAMMAR_TOPICS,
  type GrammarSection,
  type GrammarTable,
  type GrammarExample,
  type GrammarTopic,
} from "@/data/grammar-topics";
import { GRAMMAR_EXERCISES } from "@/data/grammar-exercises";
import { GrammarExercises } from "./grammar-exercises";
import { GrammarSidebar } from "@/components/grammar/grammar-sidebar";

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return getAllGrammarSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getGrammarTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — Swedish Grammar — StudySwedish`,
    description: topic.subtitle,
  };
}

const LEVEL_STYLES: Record<string, { pill: string; dot: string }> = {
  A1: { pill: "bg-swedish-blue/10 text-swedish-blue", dot: "bg-swedish-blue" },
  A2: { pill: "bg-forest/15 text-forest", dot: "bg-forest" },
  B1: { pill: "bg-coral/15 text-coral", dot: "bg-coral" },
  B2: { pill: "bg-golden/25 text-charcoal", dot: "bg-golden-dark" },
};

// All topics in order for prev/next
const ALL_SLUGS = GRAMMAR_TOPICS.map((t) => t.slug);

export default async function GrammarTopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = getGrammarTopic(slug);
  if (!topic) notFound();

  const style = LEVEL_STYLES[topic.level] ?? LEVEL_STYLES.A1;
  const related = topic.relatedSlugs
    .map((s) => getGrammarTopic(s))
    .filter(Boolean) as GrammarTopic[];

  const idx = ALL_SLUGS.indexOf(slug);
  const prevTopic = idx > 0 ? getGrammarTopic(ALL_SLUGS[idx - 1]) : null;
  const nextTopic =
    idx < ALL_SLUGS.length - 1 ? getGrammarTopic(ALL_SLUGS[idx + 1]) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex gap-10">
        {/* Sidebar */}
        <GrammarSidebar />

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="mx-auto max-w-2xl">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-[13px] text-charcoal/40">
              <Link href="/grammar" className="hover:text-charcoal/70 transition-colors">
                Grammar
              </Link>
              <span>/</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${style.pill}`}
              >
                {topic.level}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl font-semibold tracking-tight text-charcoal">
              {topic.title}
            </h1>
            <p className="mt-1 font-display text-base italic text-charcoal/35">
              {topic.titleSv}
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-charcoal/60">
              {topic.subtitle}
            </p>

            {/* Quick rule */}
            <div className="mt-6 rounded-xl border border-swedish-blue/15 bg-swedish-blue/5 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-swedish-blue/60">
                Quick rule
              </p>
              <p className="mt-1.5 text-[15px] text-charcoal/80">{topic.quickRule}</p>
            </div>

            {/* Table of contents — only if 3+ sections */}
            {topic.sections.length >= 3 && (
              <div className="mt-8 rounded-xl border border-black/5 bg-white px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-charcoal/30">
                  In this article
                </p>
                <ol className="mt-3 space-y-1.5">
                  {topic.sections.map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i}`}
                        className="text-[13px] text-charcoal/55 hover:text-swedish-blue transition-colors"
                      >
                        {i + 1}. {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Sections */}
            <article className="mt-10">
              {topic.sections.map((section, i) => (
                <Section key={i} section={section} index={i} />
              ))}

              {/* Exercises */}
              {GRAMMAR_EXERCISES[slug] && (
                <GrammarExercises exercises={GRAMMAR_EXERCISES[slug]} />
              )}
            </article>

            {/* Related topics */}
            {related.length > 0 && (
              <div className="mt-12 border-t border-black/5 pt-8">
                <h2 className="font-display text-lg font-semibold text-charcoal">
                  Related topics
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {related.map((r) => {
                    const rs = LEVEL_STYLES[r.level] ?? LEVEL_STYLES.A1;
                    return (
                      <Link
                        key={r.slug}
                        href={`/grammar/${r.slug}`}
                        className="group block rounded-xl border border-black/5 bg-white p-4 transition-colors hover:border-swedish-blue/20 hover:bg-swedish-blue/[0.02]"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${rs.dot}`} />
                          <span className="font-medium text-charcoal group-hover:text-swedish-blue transition-colors">
                            {r.title}
                          </span>
                          <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${rs.pill}`}>
                            {r.level}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-snug text-charcoal/45 line-clamp-2 pl-3.5">
                          {r.subtitle}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Prev / Next */}
            <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-8">
              {prevTopic ? (
                <Link
                  href={`/grammar/${prevTopic.slug}`}
                  className="group flex max-w-[45%] flex-col gap-0.5"
                >
                  <span className="text-[11px] uppercase tracking-widest text-charcoal/30 group-hover:text-charcoal/50 transition-colors">
                    ← Previous
                  </span>
                  <span className="text-[14px] font-medium text-charcoal/70 group-hover:text-swedish-blue transition-colors">
                    {prevTopic.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextTopic ? (
                <Link
                  href={`/grammar/${nextTopic.slug}`}
                  className="group flex max-w-[45%] flex-col items-end gap-0.5"
                >
                  <span className="text-[11px] uppercase tracking-widest text-charcoal/30 group-hover:text-charcoal/50 transition-colors">
                    Next →
                  </span>
                  <span className="text-[14px] font-medium text-charcoal/70 group-hover:text-swedish-blue transition-colors">
                    {nextTopic.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ section, index }: { section: GrammarSection; index: number }) {
  return (
    <section id={`section-${index}`} className="mb-12 scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold text-charcoal">
        {section.heading}
      </h2>
      <p className="mt-3 leading-relaxed text-charcoal/70">{section.body}</p>

      {section.table && <Table table={section.table} />}

      {section.examples && section.examples.length > 0 && (
        <div className="mt-5 space-y-2">
          {section.examples.map((ex, i) => (
            <ExampleRow key={i} example={ex} />
          ))}
        </div>
      )}

      {section.tip && (
        <div className="mt-5 flex gap-3 rounded-xl border border-golden/25 bg-golden/8 px-5 py-4">
          <span className="mt-0.5 text-base leading-none">💡</span>
          <p className="text-[14px] leading-relaxed text-charcoal/75">
            {section.tip}
          </p>
        </div>
      )}
    </section>
  );
}

function Table({ table }: { table: GrammarTable }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-black/5 bg-white">
      <table className="w-full text-sm">
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr className="border-b border-black/8 bg-cream/50">
            {table.headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-charcoal/40"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-black/[0.04] last:border-0 even:bg-cream/30"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-charcoal/75">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExampleRow({ example }: { example: GrammarExample }) {
  return (
    <div className="rounded-lg border border-black/[0.04] bg-cream/60 px-4 py-3">
      <p className="font-medium text-charcoal">{example.swedish}</p>
      <p className="mt-0.5 text-[13px] text-charcoal/50">{example.english}</p>
    </div>
  );
}
