import Link from "next/link";

export const metadata = {
  title: "Raggmunk, Swedish Potato Pancakes with Bacon, StudySwedish",
  description:
    "Swedish raggmunk: crispy grated potato pancakes fried in butter, served with streaky bacon and lingonberry. The classic Thursday lunch.",
};

export default function RaggmunkPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/recipes" className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline">
            &larr; All recipes
          </Link>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
              Lunch · Swedish classic
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
              Raggmunk
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Potato pancakes with bacon
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              Raggmunk is the quintessential Swedish Thursday lunch. Crispy on the outside,
              soft and potato-rich inside, fried in plenty of butter, and served with
              streaky bacon and a spoonful of lingonberry. It is simple food done exactly right.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Serves", value: "2 to 3" },
              { label: "Prep", value: "15 min" },
              { label: "Cook", value: "20 min" },
              { label: "Total", value: "35 min" },
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
  { sv: "raggmunk", en: "potato pancake" },
  { sv: "potatis", en: "potato" },
  { sv: "fläsk", en: "pork / bacon" },
  { sv: "lingonsylt", en: "lingonberry jam" },
  { sv: "smör", en: "butter" },
  { sv: "mjöl", en: "flour" },
  { sv: "mjölk", en: "milk" },
  { sv: "ägg", en: "egg" },
  { sv: "salt", en: "salt" },
  { sv: "peppar", en: "pepper" },
  { sv: "steka", en: "to fry" },
  { sv: "torsdagslunch", en: "Thursday lunch" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Potato pancakes (raggmunkarna)",
    items: [
      { amount: "600 g", ingredient: "Floury potatoes (potatis)", note: "peeled and finely grated" },
      { amount: "2", ingredient: "Eggs" },
      { amount: "100 ml", ingredient: "Whole milk (mjölk)" },
      { amount: "3 tbsp", ingredient: "Plain flour (mjöl)" },
      { amount: "1 tsp", ingredient: "Fine salt" },
      { amount: "¼ tsp", ingredient: "White pepper (vitpeppar)" },
      { amount: "3 tbsp", ingredient: "Butter (smör)", note: "for frying" },
    ],
  },
  {
    group: "To serve",
    items: [
      { amount: "200 g", ingredient: "Streaky bacon (fläsk)", note: "thick-cut if possible" },
      { amount: "4 tbsp", ingredient: "Lingonberry jam (lingonsylt)" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Prepare the batter",
    instructions: [
      "Peel and finely grate the potatoes. Transfer to a clean tea towel and wring out as much liquid as possible. Dry potatoes give a crispier result.",
      "Put the grated potato in a bowl. Add the eggs, milk, flour, salt and pepper. Stir until combined into a thick, rough batter.",
      "Cook the batter within 10 minutes of making it. Grated potato oxidises and turns grey if you leave it too long.",
    ],
  },
  {
    phase: "Fry the bacon",
    instructions: [
      "Fry the bacon in a dry pan over medium heat until crispy and golden. Remove and set aside on a plate lined with kitchen paper. Keep warm.",
    ],
  },
  {
    phase: "Fry the raggmunk",
    instructions: [
      "Melt a generous knob of butter in a large frying pan over medium heat. When the foam begins to subside, add about 3 heaped tablespoons of batter per pancake. Press gently with a spatula to flatten to about 1 cm thick.",
      "Fry for 3 to 4 minutes until the edges are golden and the bottom releases cleanly from the pan. Flip carefully and fry for another 3 minutes.",
      "The pancake should be deeply golden and crispy on both sides. Transfer to a warm plate. Repeat with the remaining batter, adding more butter between batches.",
    ],
  },
  {
    phase: "Serve",
    instructions: [
      "Plate the raggmunk with the crispy bacon alongside and a generous spoonful of lingonberry jam. Serve immediately while hot and crispy.",
    ],
  },
];

const TIPS = [
  "Wring the potato as dry as you can. This is the single most important step for crispy raggmunk. A wet batter gives you steamed potato mush instead.",
  "Use a floury potato variety like King Edward, Maris Piper, or any potato sold as good for boiling or mashing. Waxy potatoes do not work as well.",
  "Cook the batter straight away. Grated potato turns grey and watery within 15 minutes. Mix it and get it in the pan.",
  "Do not rush the frying. Medium heat and patience gives you crispy edges. High heat burns the outside before the inside sets.",
  "Lingonberry jam is not optional. The sharpness cuts the richness of the butter and bacon perfectly. This combination is the whole point of the dish.",
  "In Sweden, raggmunk is a Thursday tradition because historically meat was not eaten on Fridays. The Thursday fläsk och raggmunk pairing goes back generations.",
];
