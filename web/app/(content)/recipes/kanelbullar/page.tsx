import Link from "next/link";

export const metadata = {
  title: "Kanelbullar, Swedish Cinnamon Buns, StudySwedish",
  description:
    "The real Swedish cinnamon bun: soft cardamom dough, cinnamon-butter filling, and pearl sugar on top. Not the American kind.",
};

export default function KanelbullarPage() {
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
              Kanelbullar
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Cinnamon buns
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              The Swedish cinnamon bun is not like the American one. The dough is scented with cardamom,
              the buns are twisted into a compact knot, and pearl sugar goes on top. October 4th is Kanelbullens dag
              in Sweden, but honestly any day works.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Makes", value: "16 buns" },
              { label: "Prep", value: "30 min" },
              { label: "Rising", value: "90 min" },
              { label: "Bake", value: "10 min" },
              { label: "Skill", value: "Medium" },
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
  { sv: "kanelbullar", en: "cinnamon buns" },
  { sv: "kanel", en: "cinnamon" },
  { sv: "kardemumma", en: "cardamom" },
  { sv: "pärlsocker", en: "pearl sugar" },
  { sv: "jäst", en: "yeast" },
  { sv: "mjöl", en: "flour" },
  { sv: "smör", en: "butter" },
  { sv: "mjölk", en: "milk" },
  { sv: "socker", en: "sugar" },
  { sv: "ägg", en: "egg" },
  { sv: "deg", en: "dough" },
  { sv: "fyllning", en: "filling" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Dough (degen)",
    items: [
      { amount: "500 g", ingredient: "Plain flour (mjöl)", note: "plus more for dusting" },
      { amount: "300 ml", ingredient: "Whole milk (mjölk)", note: "lukewarm" },
      { amount: "75 g", ingredient: "Butter (smör)", note: "softened" },
      { amount: "75 g", ingredient: "Caster sugar (socker)" },
      { amount: "7 g", ingredient: "Instant yeast (jäst)" },
      { amount: "1 tsp", ingredient: "Ground cardamom (kardemumma)", note: "the key flavour" },
      { amount: "½ tsp", ingredient: "Salt" },
      { amount: "1", ingredient: "Egg" },
    ],
  },
  {
    group: "Filling (fyllningen)",
    items: [
      { amount: "100 g", ingredient: "Butter (smör)", note: "very soft, at room temperature" },
      { amount: "80 g", ingredient: "Caster sugar (socker)" },
      { amount: "2 tsp", ingredient: "Ground cinnamon (kanel)" },
      { amount: "1 tsp", ingredient: "Ground cardamom (kardemumma)" },
    ],
  },
  {
    group: "To finish",
    items: [
      { amount: "1", ingredient: "Egg", note: "beaten, for egg wash" },
      { amount: "3 tbsp", ingredient: "Pearl sugar (pärlsocker)", note: "do not skip this" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Make the dough",
    instructions: [
      "Combine the flour, sugar, yeast, cardamom and salt in a large bowl. Make a well in the centre.",
      "Warm the milk to about 37°C, just warm to the touch. Pour it into the well along with the egg. Mix until a rough dough forms.",
      "Turn onto a floured surface and knead for 5 minutes. Add the softened butter piece by piece and keep kneading until the dough is smooth, elastic and slightly tacky. This takes about 8 to 10 minutes.",
      "Place in a lightly oiled bowl, cover with a damp cloth or cling film, and leave to rise in a warm spot for 60 minutes, until doubled in size.",
    ],
  },
  {
    phase: "Fill and shape",
    instructions: [
      "Mix together the softened butter, sugar, cinnamon and cardamom for the filling until smooth.",
      "Knock back the dough and roll it out on a floured surface into a large rectangle, roughly 40 x 50 cm.",
      "Spread the filling evenly over the dough all the way to the edges.",
      "Fold the dough in thirds like a letter: fold the bottom third up, then the top third down over it. Press lightly. Cut into 16 strips about 2 cm wide.",
      "Twist each strip twice and wind it around two fingers into a knot, tucking the end underneath. Place on lined baking trays with space between each bun.",
      "Cover loosely and leave to rise for another 30 minutes while you heat the oven to 200°C (fan 180°C).",
    ],
  },
  {
    phase: "Bake",
    instructions: [
      "Brush each bun generously with the beaten egg. Scatter pearl sugar over the top.",
      "Bake for 10 to 12 minutes until golden brown. They go from golden to burnt quickly, so check from 9 minutes.",
      "Cool on a wire rack for at least 10 minutes before eating. They are best still slightly warm.",
    ],
  },
];

const TIPS = [
  "The cardamom in the dough is not optional. It is what separates a kanelbulle from a generic cinnamon roll.",
  "Pearl sugar (pärlsocker) is essential for the top. Regular sugar melts in the oven. Pearl sugar stays crunchy.",
  "Do not over-bake. Swedish cinnamon buns are meant to be soft and slightly moist inside, not dry.",
  "Let the butter for the filling reach room temperature before mixing. Cold butter tears the dough when you spread it.",
  "They freeze well. Freeze completely cooled buns in a bag and reheat at 160°C for 8 minutes.",
];
