import Link from "next/link";

export const metadata = {
  title: "Semla, Swedish Cardamom Buns with Cream, StudySwedish",
  description:
    "The real Swedish semla: soft cardamom bun, hollowed out and filled with almond paste and whipped cream. Eaten on Fettisdagen but good all winter.",
};

export default function SemlaPage() {
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
              Semla
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Cardamom bun with almond cream
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              Traditionally eaten on Fettisdagen (Fat Tuesday), the semla is a soft
              cardamom bun with the top sliced off, the inside scooped out and mixed
              with almond paste, then piled high with whipped cream and dusted with
              powdered sugar. Nobody eats just one.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Makes", value: "12 buns" },
              { label: "Prep", value: "40 min" },
              { label: "Rising", value: "90 min" },
              { label: "Bake", value: "12 min" },
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
  { sv: "semla", en: "cardamom cream bun" },
  { sv: "fettisdagen", en: "Fat Tuesday / Shrove Tuesday" },
  { sv: "kardemumma", en: "cardamom" },
  { sv: "mandelmassa", en: "almond paste" },
  { sv: "vispgrädde", en: "whipped cream" },
  { sv: "florsocker", en: "powdered sugar / icing sugar" },
  { sv: "deg", en: "dough" },
  { sv: "jäst", en: "yeast" },
  { sv: "smör", en: "butter" },
  { sv: "mjölk", en: "milk" },
  { sv: "lock", en: "lid (the top of the bun)" },
  { sv: "fyllning", en: "filling" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Buns (bullarna)",
    items: [
      { amount: "500 g", ingredient: "Plain flour (mjöl)", note: "plus more for dusting" },
      { amount: "300 ml", ingredient: "Whole milk (mjölk)", note: "lukewarm" },
      { amount: "75 g", ingredient: "Butter (smör)", note: "softened" },
      { amount: "75 g", ingredient: "Caster sugar (socker)" },
      { amount: "7 g", ingredient: "Instant yeast (jäst)" },
      { amount: "1½ tsp", ingredient: "Ground cardamom (kardemumma)", note: "be generous" },
      { amount: "½ tsp", ingredient: "Salt" },
      { amount: "1", ingredient: "Egg" },
    ],
  },
  {
    group: "Almond filling (mandelfyllningen)",
    items: [
      { amount: "200 g", ingredient: "Almond paste (mandelmassa)", note: "store-bought is fine" },
      { amount: "100 ml", ingredient: "Whole milk (mjölk)", note: "to loosen the paste" },
      { amount: "1 tsp", ingredient: "Vanilla extract (vanilj)" },
    ],
  },
  {
    group: "To finish",
    items: [
      { amount: "1", ingredient: "Egg", note: "beaten, for egg wash" },
      { amount: "400 ml", ingredient: "Heavy cream (vispgrädde)", note: "very cold" },
      { amount: "2 tbsp", ingredient: "Icing sugar (florsocker)", note: "plus extra for dusting" },
      { amount: "1 tsp", ingredient: "Vanilla extract (vanilj)" },
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
      "Place in a lightly oiled bowl, cover with cling film, and leave to rise in a warm spot for 60 minutes until doubled.",
    ],
  },
  {
    phase: "Shape and bake",
    instructions: [
      "Knock back the dough and divide into 12 equal pieces. Roll each into a smooth, tight ball by cupping your hand over the dough and rolling in circles on the counter.",
      "Place on lined baking trays with space between each bun. Cover loosely and leave to rise for 30 minutes while you heat the oven to 200°C (fan 180°C).",
      "Brush each bun with beaten egg. Bake for 10 to 12 minutes until golden brown. The bottom should sound hollow when tapped.",
      "Cool completely on a wire rack. Do not fill warm buns or the cream will melt.",
    ],
  },
  {
    phase: "Make the almond filling",
    instructions: [
      "Crumble or grate the almond paste into a bowl. Add the milk and vanilla. Stir until smooth and spreadable. It should be thick but soft, not stiff.",
      "Using a sharp serrated knife, cut the top off each bun about one-third of the way down. Set the lids aside.",
      "Use a spoon or your fingers to scoop out some of the soft inside of each bun. Add this bread to the almond mixture and stir in. This makes the filling go further and gives it a better texture.",
      "Spoon a generous amount of almond filling into each hollowed bun, mounding it slightly.",
    ],
  },
  {
    phase: "Whip the cream and assemble",
    instructions: [
      "Whip the cold cream with the icing sugar and vanilla until it holds soft peaks. Do not over-whip.",
      "Pipe or spoon a generous cloud of cream over the almond filling in each bun. It should be tall and generous.",
      "Place the lids back on at a slight angle. Dust generously with icing sugar. Serve immediately.",
    ],
  },
];

const TIPS = [
  "Let the buns cool completely before filling. Even slightly warm buns will melt the cream and the whole thing collapses.",
  "The bread you scoop out of the buns goes into the almond filling. Do not waste it. It adds texture and stretches the filling further.",
  "Swedish almond paste (mandelmassa) is sweeter and softer than marzipan. If you can find it in a Scandinavian shop, use it. Otherwise regular marzipan works.",
  "Pipe the cream if you have a piping bag. It looks much better and is easier to control than spooning.",
  "Semlor are best within an hour of assembly. After that the cream softens the bun and it gets soggy. You can bake and freeze the unfilled buns up to a month ahead.",
  "In Sweden, semla is sometimes served in a bowl of warm milk. This is called hetvägg. Polarising, but traditional.",
];
