import Link from "next/link";

export const metadata = {
  title: "Janssons Frestelse, Jansson's Temptation, StudySwedish",
  description:
    "The Swedish Christmas classic: a creamy baked gratin of thinly sliced potato, onion, and Swedish ansjovis anchovy fillets. Rich, savoury, impossible to stop eating.",
};

export default function JansonsFrestelseePage() {
  return (
    <>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/recipes" className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline">
            &larr; All recipes
          </Link>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
              Dinner · Swedish classic
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
              Janssons frestelse
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Jansson's temptation
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              A non-negotiable part of the Swedish julbord (Christmas table), Janssons frestelse
              is a creamy baked gratin of thinly sliced potato, sweet onion, and Swedish ansjovis
              fillets. It is rich, deeply savoury, and genuinely hard to stop eating. The name
              translates as Jansson's temptation, and you will understand why.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Serves", value: "6 to 8" },
              { label: "Prep", value: "20 min" },
              { label: "Bake", value: "50 min" },
              { label: "Total", value: "70 min" },
              { label: "Skill", value: "Easy" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-full border border-black/8 bg-cream px-4 py-1.5 text-sm">
                <span className="text-charcoal/50">{label}: </span>
                <span className="font-medium text-charcoal">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">

        <div className="rounded-2xl border border-swedish-blue/20 bg-swedish-blue/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-swedish-blue/60">Swedish vocabulary</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {VOCAB.map(({ sv, en }) => (
              <div key={sv}>
                <p className="font-display font-semibold text-charcoal">{sv}</p>
                <p className="text-sm text-charcoal/60">{en}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal">Ingredients</h2>
          <div className="mt-5 space-y-5">
            {INGREDIENT_GROUPS.map(({ group, items }) => (
              <div key={group} className="overflow-hidden rounded-2xl border border-black/5 bg-white">
                <div className="border-b border-black/5 bg-cream/50 px-5 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">{group}</h3>
                </div>
                <ul className="divide-y divide-black/5">
                  {items.map(({ amount, ingredient, note }) => (
                    <li key={ingredient} className="flex items-baseline justify-between gap-4 px-5 py-3">
                      <span className="font-medium text-charcoal">
                        {ingredient}
                        {note && <span className="ml-1.5 text-sm font-normal text-charcoal/50">({note})</span>}
                      </span>
                      <span className="shrink-0 text-sm text-charcoal/60">{amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal">Method</h2>
          <div className="mt-5 space-y-4">
            {STEPS.map(({ phase, instructions }) => (
              <div key={phase} className="overflow-hidden rounded-2xl border border-black/5 bg-white">
                <div className="border-b border-black/5 bg-cream/50 px-5 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">{phase}</h3>
                </div>
                <ol className="divide-y divide-black/5">
                  {instructions.map((step, i) => (
                    <li key={i} className="flex gap-4 px-5 py-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-swedish-blue/10 font-display text-sm font-semibold text-swedish-blue">
                        {i + 1}
                      </span>
                      <p className="text-charcoal/80 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-golden/40 bg-golden/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">Tips from the kitchen</p>
          <ul className="mt-4 space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-golden" />
                <p className="text-sm leading-relaxed text-charcoal/80">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-black/5">
          <Link href="/recipes" className="text-sm text-swedish-blue hover:underline">&larr; Back to all recipes</Link>
        </div>
      </div>
    </>
  );
}

const VOCAB = [
  { sv: "Janssons frestelse", en: "Jansson's temptation" },
  { sv: "potatis", en: "potato" },
  { sv: "lök", en: "onion" },
  { sv: "ansjovis", en: "Swedish spiced anchovy fillets" },
  { sv: "grädde", en: "cream" },
  { sv: "smör", en: "butter" },
  { sv: "ugn", en: "oven" },
  { sv: "gratäng", en: "gratin / bake" },
  { sv: "julbord", en: "Christmas buffet table" },
  { sv: "peppar", en: "pepper" },
  { sv: "brödsmulor", en: "breadcrumbs" },
  { sv: "strimla", en: "to cut into strips / shred" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Gratin",
    items: [
      { amount: "1 kg", ingredient: "Floury potatoes (potatis)", note: "peeled, cut into thin matchsticks" },
      { amount: "2 large", ingredient: "Yellow onions (lök)", note: "thinly sliced" },
      { amount: "2 tins", ingredient: "Swedish ansjovis fillets", note: "about 100 g drained weight, see tip" },
      { amount: "300 ml", ingredient: "Heavy cream (vispgrädde)" },
      { amount: "100 ml", ingredient: "Whole milk (mjölk)" },
      { amount: "2 tbsp", ingredient: "Butter (smör)", note: "plus extra for the dish" },
      { amount: "to taste", ingredient: "White pepper (vitpeppar)", note: "black pepper also works" },
    ],
  },
  {
    group: "Topping",
    items: [
      { amount: "3 tbsp", ingredient: "Dry breadcrumbs (brödsmulor)" },
      { amount: "1 tbsp", ingredient: "Butter (smör)", note: "cut into small pieces" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Prepare",
    instructions: [
      "Heat the oven to 200°C (fan 180°C). Butter a large, deep baking dish generously.",
      "Peel the potatoes and cut into thin matchsticks about 3 mm thick. You can use a mandoline or just a sharp knife. Do not rinse the potato after cutting as the starch helps the gratin set.",
      "Fry the sliced onion in butter over medium heat for about 8 minutes until soft and translucent but not coloured. Set aside.",
    ],
  },
  {
    phase: "Layer",
    instructions: [
      "Spread half the potato matchsticks in an even layer in the buttered dish. Season with white pepper.",
      "Scatter the softened onion evenly over the potato. Lay the ansjovis fillets across the onion in a single layer. Add a splash of the anchovy brine from the tin for extra flavour.",
      "Cover with the remaining potato. Season lightly with pepper. Do not add salt as the ansjovis is already very salty.",
      "Mix the cream and milk together and pour evenly over the top. The liquid should nearly reach the top of the potatoes.",
    ],
  },
  {
    phase: "Bake",
    instructions: [
      "Scatter the breadcrumbs over the top and dot with the butter pieces.",
      "Bake for 45 to 55 minutes until the top is golden brown and a knife slides through the potato with no resistance. If the top browns too quickly, cover loosely with foil.",
      "Leave to stand for 10 minutes before serving. This helps the gratin firm up and makes it easier to portion.",
    ],
  },
];

const TIPS = [
  "Swedish ansjovis is not the same as Italian anchovies. Swedish ansjovis is a spiced sprat fillet in brine, with a milder, sweeter flavour. Look for Abba or Grebbestad brand in Scandinavian shops. Do not substitute Italian anchovies or the result will be too fishy.",
  "Cut the potato into matchsticks, not slices. Matchsticks cook more evenly in the cream and give a better texture.",
  "Do not rinse the potato after cutting. The surface starch helps the cream bind into a sauce.",
  "Do not add salt. The ansjovis is already well-salted and the flavour intensifies in the oven.",
  "It is done when a knife goes in with no resistance at all. If the potatoes are still firm, give it another 10 minutes.",
  "Janssons frestelse keeps well in the fridge and reheats beautifully. Cover with foil and reheat at 180°C for 20 minutes.",
];
