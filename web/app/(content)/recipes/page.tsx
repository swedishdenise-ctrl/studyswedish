import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Swedish Recipes — StudySwedish",
  description:
    "Real Swedish recipes — köttbullar, kanelbullar, semla and more — written in English with Swedish names so you learn while you cook.",
};

export default function RecipesPage() {
  const [featured, ...rest] = RECIPES;

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Editorial header ── */}
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-swedish-blue">
            From the Swedish Kitchen
          </p>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display text-5xl font-semibold leading-[1.0] tracking-tight text-charcoal sm:text-6xl lg:text-7xl max-w-xl">
              Cook your way<br />
              <span className="italic text-swedish-blue">into Swedish.</span>
            </h1>
            <p className="max-w-xs text-base leading-relaxed text-charcoal/55 sm:text-right">
              Classic recipes with the original Swedish words kept where they
              belong. Learn as you cook.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-14">

        {/* ── Featured recipe ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal/40">
              Featured recipe
            </p>
            <div className="h-px flex-1 mx-5 bg-black/8" />
          </div>

          <Link
            href={`/recipes/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl bg-charcoal transition-transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="grid md:grid-cols-2 min-h-[380px]">
              {/* Left — photo */}
              <div className="relative min-h-[260px] md:min-h-0">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-swedish-blue flex items-end p-10">
                    <p className="font-display text-8xl font-semibold italic leading-none text-white/15 select-none">
                      {featured.title_sv}
                    </p>
                  </div>
                )}
              </div>
              {/* Right — details */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-4">
                  {featured.category} · {featured.minutes} min
                </p>
                <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl group-hover:text-golden transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-1 font-display text-base italic text-white/35">
                  {featured.title_sv}
                </p>
                <p className="mt-5 text-base leading-relaxed text-white/60">
                  {featured.blurb}
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-golden transition-colors">
                  Read the recipe
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── Recipe grid ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal/40">
              The collection
            </p>
            <div className="h-px flex-1 mx-5 bg-black/8" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-charcoal/40">
              {RECIPES.length} recipes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>

        {/* ── Coming soon ── */}
        <section className="border-t border-black/8 pt-10 pb-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-display text-lg font-semibold text-charcoal">
              More recipes on the way.
            </p>
            <p className="text-sm text-charcoal/45">
              We photograph and test every recipe before it goes up.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

/* ── Types ── */

type Recipe = {
  slug: string;
  title: string;
  title_sv: string;
  blurb: string;
  category: string;
  minutes: number;
  image?: string;
};

/* ── Card component ── */

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Dinner: { bg: "bg-swedish-blue", text: "text-white" },
  Baking: { bg: "bg-golden", text: "text-charcoal" },
  Lunch:  { bg: "bg-forest",       text: "text-white" },
};

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const style = CATEGORY_STYLES[recipe.category] ?? { bg: "bg-charcoal", text: "text-white" };

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Photo or color block */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className={`${style.bg} absolute inset-0 flex items-end px-6 pb-4`}>
            <p className={`font-display text-5xl font-semibold italic leading-none ${style.text} opacity-[0.13] select-none sm:text-6xl`}>
              {recipe.title_sv}
            </p>
          </div>
        )}
        {/* Category pill overlaid on image */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal shadow-sm">
            {recipe.category} · {recipe.minutes} min
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <h2 className="font-display text-lg font-semibold leading-snug text-charcoal group-hover:text-swedish-blue transition-colors">
          {recipe.title}
        </h2>
        <p className="mt-0.5 font-display text-sm italic text-charcoal/40">
          {recipe.title_sv}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/60 flex-1">
          {recipe.blurb}
        </p>
        <div className="mt-4 text-xs font-semibold text-swedish-blue flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Read recipe <span>→</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Data ── */

const RECIPES: Recipe[] = [
  {
    slug: "kottbullar",
    title: "Meatballs with mashed potato & lingonberry",
    title_sv: "Köttbullar",
    blurb:
      "Pan-fried from scratch in butter, finished in a silky brown sauce. Served with mashed potato and lingonberry — Sweden's most beloved dinner.",
    category: "Dinner",
    minutes: 45,
    image: "/images/kottbullar.jpg",
  },
  {
    slug: "kanelbullar",
    title: "Cinnamon buns",
    title_sv: "Kanelbullar",
    blurb:
      "The classic Swedish bake. Soft dough, cardamom, cinnamon, and pearl sugar on top.",
    category: "Baking",
    minutes: 90,
    image: "/images/kanelbullar.jpg",
  },
  {
    slug: "semla",
    title: "Cardamom buns with cream",
    title_sv: "Semla",
    blurb:
      "Eaten on Fat Tuesday, but honestly good all winter. Almond paste, whipped cream, powdered sugar.",
    category: "Baking",
    minutes: 120,
    image: "/images/semla.jpg",
  },
  {
    slug: "raggmunk",
    title: "Potato pancakes with bacon",
    title_sv: "Raggmunk",
    blurb:
      "Crispy, simple, and the kind of Thursday lunch your Swedish grandmother would approve of.",
    category: "Lunch",
    minutes: 30,
    image: "/images/raggmunk.jpg",
  },
  {
    slug: "janssons-frestelse",
    title: "Jansson's temptation",
    title_sv: "Janssons frestelse",
    blurb:
      "Creamy potato and anchovy gratin. A Christmas classic — but tastes good any dark Tuesday.",
    category: "Dinner",
    minutes: 70,
    image: "/images/janssons-frestelse.jpg",
  },
  {
    slug: "knackebrod",
    title: "Crispbread",
    title_sv: "Knäckebröd",
    blurb:
      "The crunchy backbone of every Swedish kitchen. Good with cheese, butter, or just itself.",
    category: "Baking",
    minutes: 60,
  },
];
