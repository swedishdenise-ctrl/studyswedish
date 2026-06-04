import Link from "next/link";

export const metadata = {
  title: "Köttbullar — Swedish Meatballs — StudySwedish",
  description:
    "The real homemade Swedish meatballs: tender beef-and-pork balls fried in butter, served with silky brown sauce, creamy mash, and lingonberry. Classic Swedish comfort food.",
};

export default function KottbullarPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1 text-sm text-swedish-blue hover:underline"
          >
            &larr; All recipes
          </Link>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">
              Dinner · Swedish classic
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-6xl">
              Köttbullar
            </h1>
            <p className="mt-2 font-display text-2xl italic text-swedish-blue/70">
              Swedish meatballs
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/70">
              Tender, pan-fried meatballs in a silky brown sauce — served with
              buttery mashed potato and a spoonful of lingonberry. This is the
              version every Swedish household makes from scratch.
            </p>
          </div>

          {/* Meta pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Serves", value: "4" },
              { label: "Prep", value: "20 min" },
              { label: "Cook", value: "25 min" },
              { label: "Total", value: "45 min" },
              { label: "Skill", value: "Easy" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-full border border-black/8 bg-cream px-4 py-1.5 text-sm"
              >
                <span className="text-charcoal/50">{label}: </span>
                <span className="font-medium text-charcoal">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">

        {/* Swedish vocabulary callout */}
        <div className="rounded-2xl border border-swedish-blue/20 bg-swedish-blue/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-swedish-blue/60">
            Swedish vocabulary
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {VOCAB.map(({ sv, en }) => (
              <div key={sv}>
                <p className="font-display font-semibold text-charcoal">{sv}</p>
                <p className="text-sm text-charcoal/60">{en}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Ingredients
          </h2>

          <div className="mt-5 space-y-5">
            {INGREDIENT_GROUPS.map(({ group, items }) => (
              <div
                key={group}
                className="overflow-hidden rounded-2xl border border-black/5 bg-white"
              >
                <div className="border-b border-black/5 bg-cream/50 px-5 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">
                    {group}
                  </h3>
                </div>
                <ul className="divide-y divide-black/5">
                  {items.map(({ amount, ingredient, note }) => (
                    <li
                      key={ingredient}
                      className="flex items-baseline justify-between gap-4 px-5 py-3"
                    >
                      <span className="font-medium text-charcoal">
                        {ingredient}
                        {note && (
                          <span className="ml-1.5 text-sm font-normal text-charcoal/50">
                            ({note})
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-sm text-charcoal/60">
                        {amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Method */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Method
          </h2>

          <div className="mt-5 space-y-4">
            {STEPS.map(({ phase, instructions }) => (
              <div
                key={phase}
                className="overflow-hidden rounded-2xl border border-black/5 bg-white"
              >
                <div className="border-b border-black/5 bg-cream/50 px-5 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">
                    {phase}
                  </h3>
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

        {/* Tips */}
        <div className="rounded-2xl border border-golden/40 bg-golden/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/50">
            Tips from the kitchen
          </p>
          <ul className="mt-4 space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 text-golden">—</span>
                <p className="text-sm leading-relaxed text-charcoal/80">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <div className="pt-4 border-t border-black/5">
          <Link
            href="/recipes"
            className="text-sm text-swedish-blue hover:underline"
          >
            &larr; Back to all recipes
          </Link>
        </div>
      </div>
    </>
  );
}

/* ── Data ── */

const VOCAB = [
  { sv: "köttbullar", en: "meatballs" },
  { sv: "köttfärs", en: "minced meat / ground meat" },
  { sv: "lök", en: "onion" },
  { sv: "ströbröd", en: "breadcrumbs" },
  { sv: "kryddpeppar", en: "allspice" },
  { sv: "smör", en: "butter" },
  { sv: "brun sås", en: "brown sauce / gravy" },
  { sv: "potatismos", en: "mashed potato" },
  { sv: "lingonsylt", en: "lingonberry jam" },
  { sv: "inlagd gurka", en: "pickled cucumber" },
  { sv: "nötfärs", en: "ground beef" },
  { sv: "fläskfärs", en: "ground pork" },
];

type IngredientItem = { amount: string; ingredient: string; note?: string };
type IngredientGroup = { group: string; items: IngredientItem[] };

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    group: "Meatballs (köttbullarna)",
    items: [
      { amount: "300 g", ingredient: "Ground beef (nötfärs)", note: "15–20% fat" },
      { amount: "200 g", ingredient: "Ground pork (fläskfärs)", note: "keeps them juicy" },
      { amount: "1 large", ingredient: "Egg" },
      { amount: "3 tbsp", ingredient: "Breadcrumbs (ströbröd)" },
      { amount: "3 tbsp", ingredient: "Whole milk" },
      { amount: "1 small", ingredient: "Yellow onion (lök)", note: "finely grated" },
      { amount: "1 tsp", ingredient: "Fine salt" },
      { amount: "½ tsp", ingredient: "White pepper (vitpeppar)" },
      { amount: "¼ tsp", ingredient: "Allspice (kryddpeppar)", note: "the key spice" },
      { amount: "2 tbsp", ingredient: "Butter (smör)", note: "for frying" },
    ],
  },
  {
    group: "Brown sauce (brun sås)",
    items: [
      { amount: "2 tbsp", ingredient: "Butter (smör)" },
      { amount: "2 tbsp", ingredient: "Plain flour (vetemjöl)" },
      { amount: "400 ml", ingredient: "Beef stock (oxbuljong)", note: "good quality" },
      { amount: "100 ml", ingredient: "Heavy cream (vispgrädde)" },
      { amount: "1 tsp", ingredient: "Soy sauce (soja)", note: "for colour and depth" },
      { amount: "to taste", ingredient: "Salt and white pepper" },
    ],
  },
  {
    group: "To serve",
    items: [
      { amount: "4 portions", ingredient: "Mashed potato (potatismos)" },
      { amount: "4 tbsp", ingredient: "Lingonberry jam (lingonsylt)" },
      { amount: "optional", ingredient: "Pickled cucumber (inlagd gurka)" },
    ],
  },
];

type StepGroup = { phase: string; instructions: string[] };

const STEPS: StepGroup[] = [
  {
    phase: "Mix the meatballs",
    instructions: [
      "Combine the breadcrumbs and milk in a large bowl. Let them soak for 5 minutes until the breadcrumbs are fully absorbed — this keeps the meatballs tender.",
      "Add the ground beef, ground pork, egg, grated onion, salt, white pepper, and allspice to the bowl. Mix with your hands until just combined. Do not over-work the mix or the meatballs will be tough.",
      "Roll into balls about the size of a large walnut — roughly 3 cm across. Aim for even sizes so they cook at the same rate. You should get about 28–32 balls. Place them on a plate as you go.",
    ],
  },
  {
    phase: "Fry the meatballs",
    instructions: [
      "Melt the butter in a large, heavy frying pan over medium-high heat. When the foam subsides the butter is ready.",
      "Add the meatballs in a single layer — don't crowd the pan. Fry in batches if needed. Turn them every 2 minutes until browned on all sides, about 7–8 minutes total.",
      "The inside should reach 72 °C / 162 °F. Cut one open to check — no pink inside. Transfer to a warm plate and cover loosely with foil while you make the sauce.",
    ],
  },
  {
    phase: "Make the brown sauce",
    instructions: [
      "Keep the same pan on medium heat — the browned butter and meat juices are the flavour base. Add the butter and let it melt.",
      "Whisk in the flour and cook for 1 minute, stirring constantly, until the mixture turns a pale golden colour.",
      "Gradually pour in the beef stock, whisking continuously to prevent lumps. Add the cream and soy sauce. Bring to a gentle simmer.",
      "Simmer for 5 minutes, stirring often, until the sauce coats the back of a spoon. Season with salt and white pepper to taste.",
      "Return the meatballs to the pan. Gently turn them in the sauce and simmer together for 3–4 minutes.",
    ],
  },
  {
    phase: "Serve",
    instructions: [
      "Spoon the meatballs and sauce onto plates alongside a generous mound of buttery mashed potato.",
      "Add a heaped tablespoon of lingonberry jam. In Sweden it goes directly on the plate — the sweet-sharp contrast with the rich sauce is the whole point.",
      "Add pickled cucumber on the side if you like. Serve immediately.",
    ],
  },
];

const TIPS = [
  "Use a mix of beef and pork. Pure beef meatballs go dry. The pork fat keeps them soft and tender.",
  "Grate the onion, don't chop it. Grated onion disappears into the mix and gives flavour without texture.",
  "Wet your hands before rolling. The mix won't stick and you get smoother balls.",
  "Don't skip the allspice (kryddpeppar). It is the flavour that makes Swedish meatballs taste Swedish — nothing else does the same job.",
  "Make the sauce in the same pan. The browned bits left from frying are pure flavour — don't wash them away.",
  "The meatballs freeze well. Make a double batch and freeze half before adding to the sauce. Reheat from frozen in the sauce over low heat.",
];
