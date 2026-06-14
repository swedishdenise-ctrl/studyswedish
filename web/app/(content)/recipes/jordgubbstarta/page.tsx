import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Jordgubbstårta med Rismjöl, Swedish Strawberry Cake, StudySwedish",
  description:
    "Classic Swedish strawberry cake adapted with rice flour instead of potato starch. Light sponge, vanilla cream, fresh strawberries. Perfect summer cake.",
};

export default function JordgubbstartaPage() {
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
              Jordgubbstårta med rismjöl
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Strawberry cake with rice flour
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              The classic Swedish strawberry cake, reimagined with rice flour instead of potato starch.
              A light, airy sponge base, silky vanilla cream, and fresh summer strawberries. This works perfectly
              1:1 as a substitution and gives a delicate, beautiful cake.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Serves", value: "8 to 10" },
              { label: "Prep", value: "30 min" },
              { label: "Bake", value: "30 min" },
              { label: "Chill", value: "2 hours" },
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

        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/jordgubbstarta.jpg"
            alt="Jordgubbstårta med rismjöl"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
          />
        </div>

        <div className="rounded-2xl border border-golden/40 bg-golden/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">Swedish ingredient names</p>
          <div className="mt-4 space-y-2 text-sm" style={{ color: "#3D2B14" }}>
            <p><span className="font-medium">Sponge base:</span> 4 ägg, 170 g strösocker, 60 g vetemjöl, 80 g rismjöl, 1 tsk bakpulver, 1 tsk vaniljsocker</p>
            <p><span className="font-medium">Vanilla cream:</span> 3 äggulor, 25 g majsstärkelse, 65 g strösocker, 200 ml mjölk, 50 ml grädde, 1 tsk vaniljpaste, 20 g smör</p>
            <p><span className="font-medium">Assembly:</span> 1000 g färska jordgubbar, 1,5 msk strösocker, 500 ml vispgrädde, 1 msk florsocker, 1 kvist citronmeliss</p>
          </div>
        </div>

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
  { sv: "jordgubbstårta", en: "strawberry cake" },
  { sv: "jordgubbar", en: "strawberries" },
  { sv: "rismjöl", en: "rice flour" },
  { sv: "vetemjöl", en: "plain flour" },
  { sv: "strösocker", en: "caster sugar" },
  { sv: "bakpulver", en: "baking powder" },
  { sv: "äggulor", en: "egg yolks" },
  { sv: "grädde", en: "cream" },
  { sv: "florsocker", en: "icing sugar" },
  { sv: "citronmeliss", en: "lemon balm" },
  { sv: "tårta", en: "cake" },
  { sv: "springform", en: "springform pan" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Sponge base (bottnen)",
    items: [
      { amount: "4", ingredient: "Eggs" },
      { amount: "170 g", ingredient: "Caster sugar (strösocker)" },
      { amount: "60 g", ingredient: "Plain flour (vetemjöl)" },
      { amount: "80 g", ingredient: "Rice flour (rismjöl)", note: "harina de arroz" },
      { amount: "1 tsp", ingredient: "Baking powder (bakpulver)" },
      { amount: "1 tsp", ingredient: "Vanilla sugar (vaniljsocker)" },
    ],
  },
  {
    group: "Vanilla cream (vaniljkräm)",
    items: [
      { amount: "3", ingredient: "Egg yolks (äggulor)" },
      { amount: "25 g", ingredient: "Cornstarch (majsstärkelse)" },
      { amount: "65 g", ingredient: "Caster sugar (strösocker)" },
      { amount: "200 ml", ingredient: "Whole milk 3% (mjölk)" },
      { amount: "50 ml", ingredient: "Heavy cream (grädde)" },
      { amount: "1 tsp", ingredient: "Vanilla paste (vaniljpaste)" },
      { amount: "20 g", ingredient: "Butter (smör)", note: "room temperature" },
    ],
  },
  {
    group: "Assembly",
    items: [
      { amount: "1000 g", ingredient: "Fresh strawberries (färska jordgubbar)" },
      { amount: "1.5 tbsp", ingredient: "Caster sugar (strösocker)", note: "for strawberries" },
      { amount: "500 ml", ingredient: "Heavy cream (grädde)", note: "for whipping" },
      { amount: "1 tbsp", ingredient: "Icing sugar (florsocker)", note: "decoration" },
      { amount: "1 sprig", ingredient: "Fresh lemon balm (citronmeliss)", note: "optional" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Prepare",
    instructions: [
      "Heat the oven to 175°C fan bake. Prepare a 22 cm springform pan with baking paper on the bottom. Butter and coat the sides.",
    ],
  },
  {
    phase: "Make the sponge",
    instructions: [
      "Crack 4 eggs into a bowl, add 170 g caster sugar, and whip on high speed until pale and very fluffy, about 5 minutes. The mixture should be light and ribbony.",
      "Sift together 60 g plain flour, 80 g rice flour, 1 tsp baking powder, and 1 tsp vanilla sugar in a separate bowl. Sift is important because rice flour can clump.",
      "Gently fold the dry mixture into the egg mixture in two additions, folding with a spatula until just combined. Do not overmix.",
      "Pour the batter into the prepared pan and bake in the lower third of the oven for about 30 minutes, until a skewer comes out clean. Cool completely, then carefully slice into two layers.",
    ],
  },
  {
    phase: "Make the vanilla cream",
    instructions: [
      "In a bowl, whisk together 3 egg yolks, 25 g cornstarch, and 65 g caster sugar by hand until pale.",
      "In a saucepan, heat 200 ml whole milk, 50 ml heavy cream, and 1 tsp vanilla paste over medium heat until just before boiling. Do not boil.",
      "Slowly pour the hot cream mixture into the egg yolk mixture while whisking constantly. Pour everything back into the saucepan.",
      "Heat over low to medium heat, stirring constantly, until the custard thickens. It should coat the back of a spoon but should not boil. Remove from heat and stir in 20 g room-temperature butter.",
      "Pour the cream into a bowl, press plastic film directly onto the surface, and chill completely.",
    ],
  },
  {
    phase: "Prepare the strawberries",
    instructions: [
      "Hull 1000 g fresh strawberries. Set aside about one-third for decoration. Mash the remaining strawberries with 1.5 tbsp caster sugar.",
      "Drain the mashed strawberries but reserve some of the juice. This juice will be brushed onto the cake layers.",
    ],
  },
  {
    phase: "Assemble the cake",
    instructions: [
      "Whip 500 ml heavy cream until light and fluffy. Fold one-third of the whipped cream into the drained mashed strawberries.",
      "Place the first sponge layer on a cake board or plate. Spread the vanilla cream over it. Place the second layer on top and brush lightly with strawberry juice.",
      "Spread the strawberry cream on the second layer, then cover the entire cake with the remaining plain whipped cream.",
      "Decorate the top with fresh strawberry halves, dust with 1 tbsp icing sugar, and add a sprig of fresh lemon balm if desired.",
      "Chill for at least 2 hours before serving. Best served the same day.",
    ],
  },
];

const TIPS = [
  "Rice flour works perfectly 1:1 as a substitute for potato starch. Sift it carefully as it can be slightly grainier than other flours.",
  "The sponge base can be baked the day before. Wrap it carefully and store at room temperature.",
  "Make sure the vanilla cream is completely cold before assembly, or it will melt the whipped cream.",
  "Use fresh, ripe strawberries for the best flavor. If they are very large, quarter them instead of halving.",
  "Brush the strawberry juice onto the top cake layer lightly. Too much makes it soggy.",
  "This cake is best served cold and should be eaten the same day it is assembled for the best texture.",
];
