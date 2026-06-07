import Link from "next/link";

export const metadata = {
  title: "Knackebrod, Swedish Crispbread, StudySwedish",
  description:
    "Homemade Swedish knackebrod: thin, crisp rye flatbread with a hole in the middle. Good with butter, cheese, or just itself.",
};

export default function KnackebrödPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/recipes" className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline">
            &larr; All recipes
          </Link>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
              Baking · Swedish classic
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
              Knäckebröd
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Swedish crispbread
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              Knäckebröd is the crunchy backbone of Swedish food culture. It is on every breakfast
              table, every lunch box, every cheese board. Making it at home is simpler than it
              looks: roll the dough very thin, score it, bake it dry. The result keeps for weeks
              and tastes like Sweden in a cracker.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Makes", value: "12 to 16 crackers" },
              { label: "Prep", value: "15 min" },
              { label: "Bake", value: "45 min" },
              { label: "Total", value: "60 min" },
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
  { sv: "knäckebröd", en: "crispbread" },
  { sv: "råg", en: "rye" },
  { sv: "rågmjöl", en: "rye flour" },
  { sv: "vetemjöl", en: "plain / wheat flour" },
  { sv: "jäst", en: "yeast" },
  { sv: "vatten", en: "water" },
  { sv: "salt", en: "salt" },
  { sv: "frön", en: "seeds" },
  { sv: "sesam", en: "sesame" },
  { sv: "fänkål", en: "fennel" },
  { sv: "kavla", en: "to roll (dough)" },
  { sv: "gräddas", en: "to bake (baked goods)" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Crispbread dough",
    items: [
      { amount: "250 g", ingredient: "Rye flour (rågmjöl)", note: "dark rye gives the best flavour" },
      { amount: "100 g", ingredient: "Plain flour (vetemjöl)", note: "helps with rolling" },
      { amount: "7 g", ingredient: "Instant yeast (jäst)" },
      { amount: "1 tsp", ingredient: "Fine salt" },
      { amount: "1 tsp", ingredient: "Fennel seeds (fänkålsfrön)", note: "or caraway, or both" },
      { amount: "200 ml", ingredient: "Lukewarm water (vatten)" },
      { amount: "2 tbsp", ingredient: "Neutral oil (olja)", note: "rapeseed or sunflower" },
    ],
  },
  {
    group: "Optional toppings",
    items: [
      { amount: "2 tbsp", ingredient: "Sesame seeds (sesamfrön)" },
      { amount: "1 tbsp", ingredient: "Flaky sea salt (flingsalt)" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Make the dough",
    instructions: [
      "Combine both flours, the yeast, salt and fennel seeds in a large bowl. Add the water and oil. Mix until a rough dough forms.",
      "Knead briefly for 2 to 3 minutes until smooth. The dough will be stiffer than bread dough. Wrap in cling film and rest for 20 minutes at room temperature. No rising time is needed for crispbread.",
    ],
  },
  {
    phase: "Roll and score",
    instructions: [
      "Heat the oven to 200°C (fan 180°C). Line two baking trays with baking paper.",
      "Divide the dough into 12 to 16 pieces. Working one piece at a time, roll each piece as thinly as possible on a lightly floured surface. You want 1 to 2 mm thick. The thinner, the crispier.",
      "Transfer to the lined trays. Use a fork, a docking roller, or the tip of a knife to prick the surface all over. This stops it bubbling up. Cut or press a small round hole in the centre if you want the traditional look.",
      "If using, scatter sesame seeds or flaky salt over the top and press lightly so they stick.",
    ],
  },
  {
    phase: "Bake",
    instructions: [
      "Bake for 12 to 15 minutes until crisp and lightly golden. Thinner pieces may be ready at 10 minutes. Check from 8 minutes.",
      "Transfer to a wire rack and leave to cool completely. The crispbread will harden further as it cools.",
      "Store in an airtight tin at room temperature. Homemade knäckebröd keeps well for 2 to 3 weeks.",
    ],
  },
];

const TIPS = [
  "Roll the dough as thin as you possibly can. This is the most important step. Thick knäckebröd comes out dry but soft rather than properly crisp.",
  "Prick the dough all over before baking. This stops it puffing up into bubbles in the oven.",
  "Rye flour is essential. Plain flour alone produces a bland cracker with no depth. The rye gives the distinctive flavour.",
  "Fennel and caraway are the most traditional Swedish seeds. Sesame works well too. You can also leave it plain.",
  "Cool completely on a rack before storing. If you seal warm crispbread it turns soft from the steam.",
  "Serve with butter and cheese for a classic Swedish fika. Knäckebröd is also good with pickled herring, gravlax, or just a smear of good butter and a pinch of flaky salt.",
];
