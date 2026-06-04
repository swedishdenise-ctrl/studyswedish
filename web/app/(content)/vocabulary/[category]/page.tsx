import Link from "next/link";
import { notFound } from "next/navigation";
import { VOCABULARY, CATEGORIES } from "@/data/vocabulary";
import { CategoryContent } from "./category-content";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.label} — Swedish vocabulary — StudySwedish`,
    description: `Learn and practice Swedish ${cat.label.toLowerCase()} words with flashcards, quizzes, pronunciation, and real examples.`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const words = VOCABULARY.filter((w) => w.category === slug).sort(
    (a, b) => a.frequencyRank - b.frequencyRank
  );

  return (
    <>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/vocabulary"
            className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline"
          >
            &larr; All vocabulary
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-4xl" aria-hidden>
              {cat.icon}
            </span>
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight">
                {cat.label}
              </h1>
              <p className="mt-1 text-charcoal/70">
                {words.length} words — practice with flashcards or browse
                the full list
              </p>
            </div>
          </div>
        </div>
      </section>

      <CategoryContent words={words} slug={slug} />
    </>
  );
}
