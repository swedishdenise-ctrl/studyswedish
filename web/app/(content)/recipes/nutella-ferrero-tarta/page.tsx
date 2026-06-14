import Link from "next/link";

export const metadata = {
  title: "Nutella & Ferrero Rocher-tårta, Nutella Cake, StudySwedish",
  description:
    "Decadent four-layer chocolate cake with Nutella, dulce de leche, cream cheese frosting, hazelnuts, and topped with Ferrero Rocher. Swedish celebration cake.",
};

export default function NutellaFerroroTartaPage() {
  return (
    <>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/recipes" className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline">
            &larr; All recipes
          </Link>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
              Baking · Special occasion
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
              Nutella & Ferrero Rocher-tårta
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Nutella and Ferrero Rocher cake
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              A decadent four-layer chocolate cake. Rich chocolate sponge layered with Nutella and dulce de leche
              cream cheese frosting, studded with toasted hazelnuts, and crowned with Ferrero Rocher chocolates.
              This is a celebration cake.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Serves", value: "12 to 14" },
              { label: "Prep", value: "40 min" },
              { label: "Bake", value: "50 min" },
              { label: "Chill", value: "3 hours" },
              { label: "Skill", value: "Advanced" },
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
  { sv: "tårta", en: "cake" },
  { sv: "chokoladbotten", en: "chocolate sponge" },
  { sv: "fyllning", en: "filling" },
  { sv: "tryffel", en: "truffle" },
  { sv: "hasselnötter", en: "hazelnuts" },
  { sv: "kakao", en: "cocoa" },
  { sv: "smör", en: "butter" },
  { sv: "florsocker", en: "icing sugar" },
  { sv: "vispgrädde", en: "whipped cream" },
  { sv: "mörk choklad", en: "dark chocolate" },
  { sv: "dulce de leche", en: "dulce de leche" },
  { sv: "lager", en: "layer" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Chocolate sponge (chokoladbotten) — make 2 batches",
    items: [
      { amount: "98 g", ingredient: "Butter (smör)", note: "per batch" },
      { amount: "2", ingredient: "Eggs (ägg)", note: "per batch" },
      { amount: "65 g", ingredient: "Plain flour (vetemjöl)", note: "per batch" },
      { amount: "160 g", ingredient: "Caster sugar (strösocker)", note: "per batch" },
      { amount: "6 g", ingredient: "Baking powder (bakpulver)", note: "per batch" },
      { amount: "20 g", ingredient: "Cocoa powder (kakao)", note: "per batch" },
      { amount: "3 g", ingredient: "Vanilla sugar (vaniljsocker)", note: "per batch" },
      { amount: "1 pinch", ingredient: "Fleur de sel (flingsalt)", note: "Maldon salt, per batch" },
      { amount: "100 ml", ingredient: "Hot water (hett vatten)", note: "per batch" },
    ],
  },
  {
    group: "Nutella and dulce de leche frosting (fyllning)",
    items: [
      { amount: "260 g", ingredient: "Butter (smör)", note: "room temperature" },
      { amount: "325 g", ingredient: "Cream cheese (Philadelphiaost)" },
      { amount: "200 g", ingredient: "Nutella (Nutella)" },
      { amount: "130 g", ingredient: "Dulce de leche (dulce de leche)" },
      { amount: "160 g", ingredient: "Icing sugar (florsocker)" },
      { amount: "55 g", ingredient: "Cocoa powder (kakao)" },
      { amount: "130 ml", ingredient: "Heavy cream (vispgrädde)", note: "whipped" },
    ],
  },
  {
    group: "Dark chocolate truffle ganache (chokladtryffel)",
    items: [
      { amount: "50 g", ingredient: "Butter (smör)" },
      { amount: "25 g", ingredient: "Caster sugar (strösocker)" },
      { amount: "40 g", ingredient: "Dark chocolate (mörk choklad)", note: "chopped" },
      { amount: "65 g", ingredient: "Nutella (Nutella)" },
    ],
  },
  {
    group: "Assembly and decoration",
    items: [
      { amount: "160 g", ingredient: "Chopped roasted hazelnuts (hackade hasselnötter)" },
      { amount: "16", ingredient: "Ferrero Rocher chocolates (Ferrero Rocher)" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Prepare",
    instructions: [
      "Heat the oven to 175°C fan bake. Prepare a 20 cm cake pan by buttering it and coating with breadcrumbs.",
    ],
  },
  {
    phase: "Make the chocolate sponge (first batch)",
    instructions: [
      "Melt 98 g butter. Lightly whisk 2 eggs in a cup (do not overbeat).",
      "In a bowl, combine 65 g plain flour, 160 g caster sugar, 6 g baking powder, 20 g cocoa powder, 3 g vanilla sugar, and a pinch of fleur de sel.",
      "Fold the melted butter and lightly beaten eggs into the dry mixture. Last, fold in 100 ml hot water.",
      "Pour into the prepared pan and bake in the lower third of the oven for 20 to 25 minutes, until a skewer comes out clean. Cool completely. Freeze if you like.",
    ],
  },
  {
    phase: "Make the chocolate sponge (second batch)",
    instructions: [
      "Repeat the exact same steps with the exact same measurements: 98 g butter, 2 eggs, 65 g flour, 160 g sugar, 6 g baking powder, 20 g cocoa, 3 g vanilla sugar, a pinch of salt, and 100 ml hot water.",
      "Cool completely and freeze.",
    ],
  },
  {
    phase: "Slice the cakes into layers",
    instructions: [
      "When both cakes are cold or frozen, carefully slice each one in half horizontally using a long serrated knife or cake leveler. You now have 4 layers total.",
      "Tip: frozen cakes are much easier to slice straight through without crumbling.",
    ],
  },
  {
    phase: "Make the Nutella frosting",
    instructions: [
      "Whip 260 g room-temperature butter until soft and pale. Add 325 g cream cheese and whip until smooth.",
      "Fold in 130 g dulce de leche, 200 g Nutella, 160 g icing sugar, and 55 g cocoa powder. Whip until fully blended.",
      "Last, fold in 130 ml freshly whipped heavy cream until combined. Chill until ready to use.",
    ],
  },
  {
    phase: "Make the dark chocolate truffle",
    instructions: [
      "In a saucepan, melt 50 g butter and 25 g caster sugar over low heat. Remove from heat.",
      "Stir in 40 g chopped dark chocolate until melted and smooth. Fold in 65 g Nutella. Let cool slightly.",
    ],
  },
  {
    phase: "Assemble the cake",
    instructions: [
      "Place layer 1 on a cake board. Spread Nutella frosting on top and sprinkle with roasted hazelnuts.",
      "Add layer 2, spread with frosting and hazelnuts. Repeat with layers 3 and 4.",
      "Reserve about half of the chopped hazelnuts for the sides and about one-quarter of the frosting for crumb coating.",
    ],
  },
  {
    phase: "Frost and decorate",
    instructions: [
      "Spread the reserved frosting around the sides and top of the cake to crumb coat and level.",
      "Press the reserved roasted hazelnuts firmly onto the sides of the cake.",
      "Drizzle the dark chocolate truffle ganache over the top in an artistic pattern.",
      "Top with 16 Ferrero Rocher chocolates. Add the Ferrero Rocher just before serving so they stay crispy.",
    ],
  },
];

const TIPS = [
  "Bake the two sponge layers separately using the exact same measurements. This ensures even, consistent layers.",
  "Freezing the cakes makes them much easier to slice into layers without breaking or tearing.",
  "Use room-temperature butter for the frosting or it will be grainy. Take it out of the fridge 30 minutes before you start.",
  "Whip the cream fresh and fold it in last, just before assembly. This keeps the frosting light and airy.",
  "Add the Ferrero Rocher chocolates just before serving to keep them crispy and intact.",
  "This cake is best served cold. Chill for at least 3 hours after assembly before serving.",
  "Store in the refrigerator for up to 3 days. Do not freeze after frosting as the texture will suffer.",
];
