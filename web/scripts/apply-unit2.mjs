/**
 * Apply Unit 2 full course migration via Supabase REST API.
 * Run: node scripts/apply-unit2.mjs
 *
 * Uses the service role key to bypass RLS.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zaichpozqznooacwdkan.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_KEY) {
  console.error("Set SUPABASE_SERVICE_ROLE_KEY env var first");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ── helpers ──────────────────────────────────────────────────
async function deleteRows(table, match) {
  const { error } = await sb.from(table).delete().match(match);
  if (error) throw new Error(`DELETE ${table}: ${error.message}`);
}

async function insert(table, rows) {
  const { data, error } = await sb.from(table).insert(rows).select();
  if (error) throw new Error(`INSERT ${table}: ${error.message}`);
  return data;
}

async function getUnitId() {
  const { data, error } = await sb
    .from("units")
    .select("id")
    .eq("level", "A1")
    .eq("unit_number", 2)
    .single();
  if (error) throw new Error(`GET unit: ${error.message}`);
  return data.id;
}

async function getLessonId(slug) {
  const { data, error } = await sb
    .from("lessons")
    .select("id")
    .eq("slug", slug)
    .single();
  if (error) throw new Error(`GET lesson ${slug}: ${error.message}`);
  return data.id;
}

// ── content ──────────────────────────────────────────────────

const unitData = {
  level: "A1",
  unit_number: 2,
  title: "Numbers and time",
  title_sv: "Siffror och tid",
  description:
    "Count from zero to a hundred, tell the time, say the days of the week and months — the building blocks for talking about schedules, prices, and everyday life in Sweden.",
  learning_objectives: [
    "Count from 0 to 100 in Swedish",
    "Say and recognise the days of the week",
    "Name the twelve months and four seasons",
    "Ask and tell the time",
    "Talk about your daily schedule",
    "Use basic time words (idag, i morgon, igår)",
    "Understand prices and ages in Swedish",
    "Make plans using numbers, days, and times together",
  ],
  icon_emoji: "🕐",
  is_free: true,
  estimated_hours: 3.0,
  status: "published",
  order_index: 2,
};

// ── LESSONS ──────────────────────────────────────────────────

const lessons = [
  {
    title: "Numbers 0 to 10",
    title_sv: "Siffror 0 till 10",
    slug: "a1-2-numbers-0-to-10",
    lesson_type: "standard",
    content_md: `# Numbers 0 to 10

Numbers are everywhere — prices, phone numbers, addresses, ages. Let's start with the first eleven numbers in Swedish.

## The numbers

| Number | Swedish | Sounds like |
| --- | --- | --- |
| **0** | **noll** | "nol" |
| **1** | **ett** | "et" |
| **2** | **två** | "tvoh" |
| **3** | **tre** | "treh" |
| **4** | **fyra** | "FY-ra" |
| **5** | **fem** | "fem" |
| **6** | **sex** | "sex" |
| **7** | **sju** | "hwoo" (tricky!) |
| **8** | **åtta** | "OT-ta" |
| **9** | **nio** | "NEE-o" |
| **10** | **tio** | "TEE-o" |

## The tricky one: sju

**Sju** (7) is one of the hardest Swedish sounds for English speakers. It's not "shoo" — it's more like blowing out a candle while saying "oo." Don't worry too much about perfecting it right away. Swedes will understand you.

## Counting things

When counting objects, **1** has two forms:
- **en** — for *en*-words (common gender): *en katt* (one cat)
- **ett** — for *ett*-words (neuter gender): *ett hus* (one house)

For now, just know that **ett** is used when counting alone (1, 2, 3...) and **en** appears before many nouns. You'll learn more about *en/ett* later.

## Quick practice

> — Hur många är ni? *(How many are you?)*
> — Vi är tre. *(We are three.)*

> — Vad är ditt telefonnummer? *(What's your phone number?)*
> — Noll sju tre, fyra fem sex, sju åtta nio noll. *(073-456-7890)*

> **Swedish Life:** Swedish phone numbers are spoken digit by digit, just like in English. Mobile numbers start with **07** (usually 073, 076, or 070). When you give your number, pause after every three or four digits to make it easy to write down.`,
    summary: "Learn noll to tio — the foundation for all Swedish numbers.",
    is_free: true,
    estimated_minutes: 12,
    order_index: 1,
    status: "published",
  },
  {
    title: "Numbers 11 to 20",
    title_sv: "Siffror 11 till 20",
    slug: "a1-2-numbers-11-to-20",
    lesson_type: "standard",
    content_md: `# Numbers 11 to 20

Good news: once you know 0–10, the teens follow a clear pattern. Even better news — the pattern is simpler than English.

## The numbers

| Number | Swedish | Pattern | Sounds like |
| --- | --- | --- | --- |
| **11** | **elva** | (unique) | "EL-va" |
| **12** | **tolv** | (unique) | "tolv" |
| **13** | **tretton** | tre + ton | "TRET-ton" |
| **14** | **fjorton** | fjor + ton | "FYOR-ton" |
| **15** | **femton** | fem + ton | "FEM-ton" |
| **16** | **sexton** | sex + ton | "SEX-ton" |
| **17** | **sjutton** | sju + ton | "HWUT-ton" |
| **18** | **arton** | (unique form) | "AR-ton" |
| **19** | **nitton** | ni(o) + ton | "NIT-ton" |
| **20** | **tjugo** | (unique) | "CHOO-goh" |

## The pattern

From 13 to 19, the pattern is **digit + ton**. Think of "-ton" as the Swedish version of English "-teen":

- **tre** → **tretton** (13)
- **fem** → **femton** (15)
- **sex** → **sexton** (16)

The exceptions are **elva** (11), **tolv** (12), and **arton** (18) — these just need to be memorised. But that's only three irregular ones!

## Tjugo: your gateway to bigger numbers

**Tjugo** (20) starts with the **tj-** sound, which sounds like "ch" in "church." This same "tj-" sound appears in many Swedish words. Getting comfortable with it now will pay off later.

## Using teen numbers

> — Hur gammal är du? *(How old are you?)*
> — Jag är sexton år. *(I am sixteen years old.)*

> — Hur mycket kostar den? *(How much does it cost?)*
> — Femton kronor. *(Fifteen kronor.)*

Notice **år** means "years" (and also "year") and **kronor** is the plural of *krona*, the Swedish currency.

> **Swedish Life:** The Swedish currency is the **krona** (plural: **kronor**), abbreviated **kr** or **SEK**. One krona = 100 öre, but öre coins haven't been used since 2010. Prices are always in whole kronor. A coffee might cost around 40–60 kronor.`,
    summary: "Learn the teens: elva to tjugo — and spot the simple pattern.",
    is_free: true,
    estimated_minutes: 15,
    order_index: 2,
    status: "published",
  },
  {
    title: "Counting to 100",
    title_sv: "Räkna till 100",
    slug: "a1-2-counting-to-100",
    lesson_type: "standard",
    content_md: `# Counting to 100

Now that you know 0–20, the rest is surprisingly easy. Swedish numbers follow a logical pattern — and unlike English, there are no weird surprises.

## The tens

| Number | Swedish | Sounds like |
| --- | --- | --- |
| **10** | **tio** | "TEE-o" |
| **20** | **tjugo** | "CHOO-goh" |
| **30** | **trettio** | "TRET-ee-oh" |
| **40** | **fyrtio** | "FUR-tee-oh" |
| **50** | **femtio** | "FEM-tee-oh" |
| **60** | **sextio** | "SEX-tee-oh" |
| **70** | **sjuttio** | "HWUT-ee-oh" |
| **80** | **åttio** | "OT-ee-oh" |
| **90** | **nittio** | "NIT-ee-oh" |
| **100** | **hundra** | "HUN-dra" |

## The pattern for tens

From 30 to 90, the pattern is the **same digit from the teens** + **-tio** (ten):

- **tret**ton → **tret**tio (30)
- **fyr**a → **fyr**tio (40)
- **fem**ton → **fem**tio (50)

## Building compound numbers (21–99)

Just say the ten, then the digit. No "and" needed:

- **21** = tjugo**ett** (twenty-one)
- **35** = trettio**fem** (thirty-five)
- **48** = fyrtio**åtta** (forty-eight)
- **99** = nittio**nio** (ninety-nine)

It's that simple: ten + digit, one word, no hyphens.

## Talking about prices

| Swedish | English |
| --- | --- |
| **Hur mycket kostar det?** | How much does it cost? |
| **Det kostar femtio kronor.** | It costs fifty kronor. |
| **Den kostar trettiotvå kronor.** | It costs thirty-two kronor. |

## Talking about age

| Swedish | English |
| --- | --- |
| **Hur gammal är du?** | How old are you? |
| **Jag är trettiotvå år.** | I am thirty-two years old. |

> **Swedish Life:** In everyday Swedish, people often shorten the tens when speaking fast. "Trettio" might sound more like "tretti" and "femtio" like "femti." You don't need to do this yet, but don't be confused when you hear it!`,
    summary:
      "Learn the tens from trettio to hundra — and how to build any number in between.",
    is_free: true,
    estimated_minutes: 18,
    order_index: 3,
    status: "published",
  },
  {
    title: "Days of the week",
    title_sv: "Veckans dagar",
    slug: "a1-2-days-of-the-week",
    lesson_type: "standard",
    content_md: `# Days of the week

The Swedish week starts on **Monday**, not Sunday — which makes sense if you think of the weekend as the *end* of the week.

## The seven days

| Swedish | English | Sounds like |
| --- | --- | --- |
| **måndag** | Monday | "MOHN-dag" |
| **tisdag** | Tuesday | "TEES-dag" |
| **onsdag** | Wednesday | "OONS-dag" |
| **torsdag** | Thursday | "TOSH-dag" |
| **fredag** | Friday | "FREH-dag" |
| **lördag** | Saturday | "LUR-dag" |
| **söndag** | Sunday | "SUN-dag" |

## The pattern

Every day ends in **-dag** (day). The first part comes from Norse mythology:

- **mån**dag — the Moon (månen)
- **tis**dag — Tyr (Norse god of war)
- **ons**dag — Oden/Odin (king of the gods)
- **tors**dag — Tor/Thor (god of thunder)
- **fre**dag — Freja/Freya (goddess of love)
- **lör**dag — from "löga" (to bathe — bath day!)
- **sön**dag — the Sun (solen)

## Important: no capital letters!

In Swedish, days of the week are **not capitalised** (unless they start a sentence):

- ✅ Vi ses på fredag. *(See you on Friday.)*
- ❌ Vi ses på Fredag.

## Useful phrases

| Swedish | English |
| --- | --- |
| **Vilken dag är det idag?** | What day is it today? |
| **Idag är det måndag.** | Today is Monday. |
| **I morgon är det tisdag.** | Tomorrow is Tuesday. |
| **Igår var det söndag.** | Yesterday was Sunday. |
| **på måndag** | on Monday |
| **varje fredag** | every Friday |

## Three time words

| Swedish | English |
| --- | --- |
| **idag** | today |
| **i morgon** | tomorrow |
| **igår** | yesterday |

Don't confuse **i morgon** (tomorrow) with **i morse** (this morning) or **morgon** (morning). Context always makes it clear.

> **Swedish Life:** Swedes talk about weeks a lot. Instead of saying "in about two weeks," they'll say **"om två veckor."** And instead of using dates, many Swedes refer to **week numbers**: "Vi ses vecka 15" (See you week 15). If someone says "vecka 42," they mean the 42nd week of the year — grab a calendar!`,
    summary:
      'Måndag to söndag — the seven days, Norse mythology, and how to say "today" and "tomorrow."',
    is_free: true,
    estimated_minutes: 15,
    order_index: 4,
    status: "published",
  },
  {
    title: "Months and seasons",
    title_sv: "Månader och årstider",
    slug: "a1-2-months-and-seasons",
    lesson_type: "standard",
    content_md: `# Months and seasons

Good news: Swedish month names are very similar to English. If you can recognise them in English, you can learn the Swedish versions quickly.

## The twelve months

| Swedish | English | Sounds like |
| --- | --- | --- |
| **januari** | January | "yan-u-AH-ree" |
| **februari** | February | "feb-ru-AH-ree" |
| **mars** | March | "marsh" |
| **april** | April | "a-PRILL" |
| **maj** | May | "my" |
| **juni** | June | "YOO-nee" |
| **juli** | July | "YOO-lee" |
| **augusti** | August | "ow-GUS-tee" |
| **september** | September | "sep-TEM-ber" |
| **oktober** | October | "ok-TOH-ber" |
| **november** | November | "no-VEM-ber" |
| **december** | December | "deh-SEM-ber" |

Just like days, months are **not capitalised** in Swedish.

## The four seasons

| Swedish | English | Months |
| --- | --- | --- |
| **vår** | spring | mars, april, maj |
| **sommar** | summer | juni, juli, augusti |
| **höst** | autumn/fall | september, oktober, november |
| **vinter** | winter | december, januari, februari |

## Talking about months and dates

| Swedish | English |
| --- | --- |
| **Vilken månad är det?** | What month is it? |
| **Det är april.** | It is April. |
| **i januari** | in January |
| **i somras** | last summer |
| **i vintras** | last winter |
| **Jag fyller år i mars.** | My birthday is in March. |

## Dates in Swedish

Swedes write dates **year-month-day**: **2024-03-15** (not 03/15/2024 or 15/03/2024). When speaking:

> **Den femtonde mars** *(The fifteenth of March)*

You don't need ordinal numbers yet — just know the date format for now.

> **Swedish Life:** The seasons shape Swedish life more than in most countries. **Midsommar** (Midsummer) in June is one of the biggest celebrations — Swedes dance around a maypole, eat herring and strawberries, and stay up all night because the sun barely sets. In winter, **lucia** (December 13th) brings light to the darkest time with candles and singing. And then there's **vårvinter** (spring-winter) — that awkward season in March when Swedes desperately want spring but winter won't let go.`,
    summary:
      "Januari to december, and the four seasons that shape life in Sweden.",
    is_free: true,
    estimated_minutes: 15,
    order_index: 5,
    status: "published",
  },
  {
    title: "What time is it?",
    title_sv: "Vad är klockan?",
    slug: "a1-2-what-time-is-it",
    lesson_type: "standard",
    content_md: `# What time is it?

Telling time in Swedish is different from English — but once you learn the system, it's perfectly logical.

## Asking the time

| Swedish | English |
| --- | --- |
| **Vad är klockan?** | What time is it? |
| **Hur mycket är klockan?** | What time is it? (alternative) |

**Klockan** means "the clock" — so you're literally asking "What is the clock?"

## Full hours

| Swedish | English |
| --- | --- |
| **Klockan är ett.** | It's one o'clock. |
| **Klockan är två.** | It's two o'clock. |
| **Klockan är tolv.** | It's twelve o'clock. |

Short form: **Klockan ett** or just **kl. 1**.

## Half hours — here's where it gets interesting!

In English, 2:30 is "half past two." In Swedish, it's **halv tre** — "half three." Swedish counts towards the *next* hour:

| Time | Swedish | Logic |
| --- | --- | --- |
| **1:30** | **halv två** | halfway to two |
| **2:30** | **halv tre** | halfway to three |
| **7:30** | **halv åtta** | halfway to eight |
| **12:30** | **halv ett** | halfway to one |

This is the biggest trap for English speakers. **Halv tre** is NOT 3:30 — it's 2:30!

## Quarter hours

| Time | Swedish | English |
| --- | --- | --- |
| **3:15** | **kvart över tre** | quarter past three |
| **3:45** | **kvart i fyra** | quarter to four |

**Över** = past, **i** = to/before.

## The 24-hour clock

Sweden commonly uses the 24-hour clock, especially in writing:

| Written | Spoken |
| --- | --- |
| **13:00** | tretton (or "ett") |
| **18:30** | halv sju (or "arton trettio") |
| **21:15** | kvart över nio (or "tjugoett femton") |

In everyday speech, most Swedes use 12-hour time with context (morning/evening). But train schedules, TV listings, and appointments always use 24-hour time.

## Useful time phrases

| Swedish | English |
| --- | --- |
| **Vi ses klockan tre.** | See you at three. |
| **Mötet börjar halv nio.** | The meeting starts at 8:30. |
| **Tåget går kvart i fem.** | The train leaves at 4:45. |

> **Swedish Life:** Swedes are famous for punctuality. If someone says "Vi ses klockan tre" (See you at three), they mean 3:00 — not 3:10 or 3:15. Being on time is considered basic politeness. For dinner invitations, arriving 5–10 minutes late is acceptable, but never early! Standing outside the door until exactly the right minute is a very Swedish thing to do.`,
    summary:
      "Klockan, halv, kvart — learn to tell time the Swedish way.",
    is_free: true,
    estimated_minutes: 18,
    order_index: 6,
    status: "published",
  },
  {
    title: "Your daily schedule",
    title_sv: "Din dagliga rutin",
    slug: "a1-2-your-daily-schedule",
    lesson_type: "standard",
    content_md: `# Your daily schedule

Now that you know numbers, days, and time, let's combine them to talk about daily life. This lesson teaches you to describe when things happen.

## Parts of the day

| Swedish | English | Approximate time |
| --- | --- | --- |
| **på morgonen** | in the morning | ~6–10 |
| **på förmiddagen** | in the late morning | ~10–12 |
| **på eftermiddagen** | in the afternoon | ~12–18 |
| **på kvällen** | in the evening | ~18–22 |
| **på natten** | at night | ~22–6 |

Notice: Swedish has **förmiddag** (before midday) and **eftermiddag** (after midday) — more precise than English!

## Everyday verbs you need

| Swedish | English | Example |
| --- | --- | --- |
| **vaknar** | wake up | Jag vaknar klockan sju. |
| **äter** | eat | Jag äter frukost klockan åtta. |
| **arbetar** | work | Jag arbetar från nio till fem. |
| **äter lunch** | eat lunch | Jag äter lunch klockan tolv. |
| **kommer hem** | come home | Jag kommer hem klockan fem. |
| **äter middag** | eat dinner | Vi äter middag klockan sex. |
| **går och lägger mig** | go to bed | Jag går och lägger mig klockan elva. |

## Describing your day

> **Min dag:**
> Jag vaknar klockan sju på morgonen.
> Jag äter frukost halv åtta.
> Jag arbetar från nio till fem.
> Jag äter lunch klockan tolv.
> Jag kommer hem kvart i sex.
> Vi äter middag klockan sju.
> Jag går och lägger mig klockan elva.

## Useful time connectors

| Swedish | English |
| --- | --- |
| **från... till...** | from... to... |
| **sedan / sen** | then / after that |
| **varje dag** | every day |
| **alltid** | always |
| **ofta** | often |
| **ibland** | sometimes |

## A conversation about schedules

> — Hur ser din dag ut? *(What does your day look like?)*
> — Jag vaknar klockan sex och äter frukost klockan halv sju. Sedan arbetar jag från åtta till fyra. Och du?
> — Jag arbetar från tio till sex. Jag vaknar halv nio!
> — Lyckost! *(Lucky you!)*

## Meals in Swedish

| Swedish | English | Typical time |
| --- | --- | --- |
| **frukost** | breakfast | 7–8 |
| **lunch** | lunch | 11:30–13 |
| **fika** | coffee break | 10 and/or 15 |
| **middag** | dinner | 17–19 |

> **Swedish Life:** **Fika** is Sweden's most beloved tradition — a coffee break with something sweet (often a kanelbulle, cinnamon bun). Most workplaces have a scheduled fika, and it's seen as essential, not optional. Skipping fika is like refusing to be social. "Ska vi fika?" (Shall we have fika?) is one of the most important questions in Swedish culture.`,
    summary:
      "Describe your day using times, meals, and everyday verbs — plus learn about the Swedish fika tradition.",
    is_free: true,
    estimated_minutes: 15,
    order_index: 7,
    status: "published",
  },
  {
    title: "Your Swedish week",
    title_sv: "Din svenska vecka",
    slug: "a1-2-your-swedish-week",
    lesson_type: "standard",
    content_md: `# Your Swedish week

Let's pull together everything from Unit 2 — numbers, days, months, time, and daily routines — into real conversations about schedules and plans.

## Conversation 1: Making plans

> — **Hej! Vad gör du på fredag?** *(Hi! What are you doing on Friday?)*
> — **Ingenting! Varför?** *(Nothing! Why?)*
> — **Ska vi fika klockan tre?** *(Shall we have fika at three?)*
> — **Ja, jättegärna! Var?** *(Yes, I'd love to! Where?)*
> — **Kaféet på Storgatan.** *(The café on Storgatan.)*
> — **Perfekt! Vi ses på fredag klockan tre.** *(Perfect! See you Friday at three.)*

## Conversation 2: At the shop

> — **God dag! Hur mycket kostar den här?** *(Good day! How much does this cost?)*
> — **Den kostar sjuttiofem kronor.** *(It costs seventy-five kronor.)*
> — **Och den där?** *(And that one?)*
> — **Fyrtiotvå kronor.** *(Forty-two kronor.)*
> — **Jag tar den där, tack.** *(I'll take that one, please.)*
> — **Varsågod!** *(Here you go!)*
> — **Tack! Hej då!** *(Thanks! Bye!)*

## Conversation 3: Talking about your week

> — **Hur ser din vecka ut?** *(What does your week look like?)*
> — **På måndag arbetar jag från åtta till fyra. På tisdag har jag möte klockan tio. Och på onsdag vaknar jag tidigt — klockan sex!** *(On Monday I work from eight to four. On Tuesday I have a meeting at ten. And on Wednesday I wake up early — at six!)*
> — **Oj, tidigt! Vad gör du på helgen?** *(Wow, early! What do you do on the weekend?)*
> — **Ingenting! Jag sover till tio.** *(Nothing! I sleep until ten.)*

## Everything you've learned in Unit 2

- ✅ **Count from 0 to 100** (noll, ett, två... hundra)
- ✅ **Say the days of the week** (måndag to söndag)
- ✅ **Name the months** (januari to december)
- ✅ **Name the seasons** (vår, sommar, höst, vinter)
- ✅ **Tell the time** (klockan tre, halv fyra, kvart över fem, kvart i sex)
- ✅ **Describe your daily schedule** (Jag vaknar klockan...)
- ✅ **Talk about meals** (frukost, lunch, fika, middag)
- ✅ **Ask and understand prices** (Hur mycket kostar det?)
- ✅ **Say your age** (Jag är trettiotvå år)
- ✅ **Use time words** (idag, i morgon, igår, varje dag)

## What's coming next

In **Unit 3: Food and Drink**, you'll learn to order at a café, read a Swedish menu, and talk about what you like to eat — including the all-important fika!

> **Swedish Life:** Swedes love planning. "Spontaneous" meetups often still get scheduled days in advance: "Vi ses klockan tre på onsdag" (See you at three on Wednesday). If you suggest meeting "sometime," a Swede will immediately want to pick a day and time. It's not unfriendly — it's efficient!`,
    summary:
      "Put it all together — make plans, go shopping, and talk about your week in Swedish.",
    is_free: true,
    estimated_minutes: 12,
    order_index: 8,
    status: "published",
  },
];

// ── EXERCISES ────────────────────────────────────────────────
// Keyed by lesson slug
const exercisesBySlug = {
  "a1-2-numbers-0-to-10": [
    { exercise_type:"translation", instruction:'How do you say "three" in Swedish?', instruction_sv:'Hur säger man "three" på svenska?', question_data:{source:"three",direction:"en_to_sv"}, correct_answer:{answer:"tre",alternatives:["Tre"]}, explanation:'"Tre" — sounds similar to English "tray" but shorter.', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "five" in Swedish?', instruction_sv:'Hur säger man "five" på svenska?', question_data:{source:"five",direction:"en_to_sv"}, correct_answer:{answer:"fem",alternatives:["Fem"]}, explanation:'"Fem" — just three letters. Easy to remember!', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "eight" in Swedish?', instruction_sv:'Hur säger man "eight" på svenska?', question_data:{source:"eight",direction:"en_to_sv"}, correct_answer:{answer:"åtta",alternatives:["Åtta"]}, explanation:'"Åtta" — remember, å sounds like "o" in "more."', difficulty:1, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:"Count up: sex, ___, åtta", instruction_sv:"Räkna uppåt: sex, ___, åtta", question_data:{sentence:"sex, ___, åtta"}, correct_answer:{answer:"sju",alternatives:["Sju"]}, explanation:'"Sju" (7) comes between sex (6) and åtta (8). It\'s the trickiest number to pronounce!', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:"Count up: åtta, ___, tio", instruction_sv:"Räkna uppåt: åtta, ___, tio", question_data:{sentence:"åtta, ___, tio"}, correct_answer:{answer:"nio",alternatives:["Nio"]}, explanation:'"Nio" (9) — pronounced "NEE-o."', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:"The Swedish word for zero is ___.", instruction_sv:"Det svenska ordet för zero är ___.", question_data:{sentence:"The Swedish word for zero is ___."}, correct_answer:{answer:"noll",alternatives:["Noll"]}, explanation:'"Noll" — similar to English "null." Used for phone numbers and scores.', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:"Put these numbers in order from smallest to largest: 4, 7, 2", instruction_sv:"Sätt siffrorna i ordning från minst till störst.", question_data:{words:["sju","två","fyra"],hint:"2, 4, 7"}, correct_answer:{answer:["två","fyra","sju"]}, explanation:"Två (2), fyra (4), sju (7).", difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'Someone asks "Hur många är ni?" (How many are you?) Your group has 4 people.', instruction_sv:'Någon frågar "Hur många är ni?" Ni är 4 personer.', question_data:{dialogue:["Hur många är ni?","???"],blank_index:1,options:["Vi är fyra.","Vi är fem.","Vi är tre.","Vi är sex."]}, correct_answer:"Vi är fyra.", explanation:'"Vi är fyra" = We are four. "Vi" means "we" and "är" means "are."', difficulty:1, xp_reward:10, order_index:8 },
    { exercise_type:"translation", instruction:'(Recall) How do you say "Goodbye" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"Goodbye",direction:"en_to_sv"}, correct_answer:{answer:"Hej då",alternatives:["hej då"]}, explanation:'From Unit 1 — "Hej då" is the standard goodbye.', difficulty:1, xp_reward:10, order_index:9 },
    { exercise_type:"matching", instruction:"Match the Swedish numbers with their values.", instruction_sv:"Para ihop de svenska siffrorna med deras värden.", question_data:{pairs:[{left:"tre",right:"3"},{left:"sju",right:"7"},{left:"nio",right:"9"},{left:"fyra",right:"4"},{left:"åtta",right:"8"}]}, correct_answer:[["tre","3"],["sju","7"],["nio","9"],["fyra","4"],["åtta","8"]], explanation:"The first ten numbers are the building blocks for all higher numbers.", difficulty:1, xp_reward:15, order_index:10 },
    { exercise_type:"multiple_choice", instruction:'What number is "fyra"?', instruction_sv:'Vilket nummer är "fyra"?', question_data:{options:["3","4","5","6"]}, correct_answer:"4", explanation:'"Fyra" = 4. It sounds a bit like "fear-a."', difficulty:1, xp_reward:10, order_index:11 },
    { exercise_type:"multiple_choice", instruction:"Which Swedish number is hardest for English speakers to pronounce?", instruction_sv:"Vilket svenskt nummer är svårast att uttala för engelsktalande?", question_data:{options:["tre (3)","fem (5)","sju (7)","nio (9)"]}, correct_answer:"sju (7)", explanation:'"Sju" has a unique Swedish sound — like blowing out a candle while saying "oo." It gets easier with practice!', difficulty:1, xp_reward:10, order_index:12 },
  ],
  "a1-2-numbers-11-to-20": [
    { exercise_type:"translation", instruction:'How do you say "fifteen" in Swedish?', instruction_sv:'Hur säger man "fifteen" på svenska?', question_data:{source:"fifteen",direction:"en_to_sv"}, correct_answer:{answer:"femton",alternatives:["Femton"]}, explanation:'"Femton" = fem (5) + ton (-teen). The pattern is digit + ton.', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "twelve" in Swedish?', instruction_sv:'Hur säger man "twelve" på svenska?', question_data:{source:"twelve",direction:"en_to_sv"}, correct_answer:{answer:"tolv",alternatives:["Tolv"]}, explanation:'"Tolv" — one of the three irregular teen numbers (along with elva and arton).', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "twenty" in Swedish?', instruction_sv:'Hur säger man "twenty" på svenska?', question_data:{source:"twenty",direction:"en_to_sv"}, correct_answer:{answer:"tjugo",alternatives:["Tjugo"]}, explanation:'"Tjugo" — the "tj" makes a "ch" sound, like "church."', difficulty:1, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:"Count up: tolv, ___, fjorton", instruction_sv:"Räkna uppåt: tolv, ___, fjorton", question_data:{sentence:"tolv, ___, fjorton"}, correct_answer:{answer:"tretton",alternatives:["Tretton"]}, explanation:'"Tretton" (13) = tre + ton. It follows the digit + ton pattern.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:"Count up: sexton, ___, arton", instruction_sv:"Räkna uppåt: sexton, ___, arton", question_data:{sentence:"sexton, ___, arton"}, correct_answer:{answer:"sjutton",alternatives:["Sjutton"]}, explanation:'"Sjutton" (17) = sju + ton. That tricky "sju" sound is back!', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:"The Swedish number for 18 is ___.", instruction_sv:"Det svenska numret för 18 är ___.", question_data:{sentence:"The Swedish number for 18 is ___."}, correct_answer:{answer:"arton",alternatives:["Arton"]}, explanation:'"Arton" is irregular — you might expect "åtton" but it\'s "arton." Just memorise this one.', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:"Put these numbers in order from smallest to largest.", instruction_sv:"Sätt siffrorna i ordning från minst till störst.", question_data:{words:["tjugo","elva","sexton","fjorton"],hint:"11, 14, 16, 20"}, correct_answer:{answer:["elva","fjorton","sexton","tjugo"]}, explanation:"Elva (11), fjorton (14), sexton (16), tjugo (20).", difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'Someone asks your age: "Hur gammal är du?" You are 19 years old.', instruction_sv:'Någon frågar "Hur gammal är du?" Du är 19 år.', question_data:{dialogue:["Hur gammal är du?","???"],blank_index:1,options:["Jag är arton år.","Jag är nitton år.","Jag är sjutton år.","Jag är tjugo år."]}, correct_answer:"Jag är nitton år.", explanation:'"Jag är nitton år" = I am nineteen years old. "År" means "years."', difficulty:1, xp_reward:10, order_index:8 },
    { exercise_type:"translation", instruction:'(Recall) How do you say "seven" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"seven",direction:"en_to_sv"}, correct_answer:{answer:"sju",alternatives:["Sju"]}, explanation:'From Lesson 1 — "Sju" with that unique Swedish sound.', difficulty:1, xp_reward:10, order_index:9 },
    { exercise_type:"matching", instruction:"Match the Swedish numbers with their values.", instruction_sv:"Para ihop siffrorna.", question_data:{pairs:[{left:"elva",right:"11"},{left:"tretton",right:"13"},{left:"femton",right:"15"},{left:"arton",right:"18"},{left:"tjugo",right:"20"}]}, correct_answer:[["elva","11"],["tretton","13"],["femton","15"],["arton","18"],["tjugo","20"]], explanation:"The teens: elva and tolv are unique, 13–19 follow digit + ton, and tjugo is 20.", difficulty:1, xp_reward:15, order_index:10 },
    { exercise_type:"multiple_choice", instruction:"What pattern do Swedish teen numbers (13–19) follow?", instruction_sv:"Vilket mönster följer de svenska tontalen (13–19)?", question_data:{options:["digit + tio","digit + ton","tio + digit","ton + digit"]}, correct_answer:"digit + ton", explanation:"Tretton, fjorton, femton, sexton, sjutton, arton, nitton — the pattern is digit + ton.", difficulty:1, xp_reward:10, order_index:11 },
    { exercise_type:"multiple_choice", instruction:"Which of these teen numbers is irregular (doesn't follow the digit + ton pattern)?", instruction_sv:"Vilket av dessa tontal är oregelbundet?", question_data:{options:["tretton (13)","femton (15)","arton (18)","nitton (19)"]}, correct_answer:"arton (18)", explanation:'You might expect "åtton" from "åtta," but the real word is "arton." Elva (11) and tolv (12) are also irregular.', difficulty:2, xp_reward:10, order_index:12 },
  ],
  "a1-2-counting-to-100": [
    { exercise_type:"translation", instruction:'How do you say "thirty" in Swedish?', instruction_sv:'Hur säger man "thirty" på svenska?', question_data:{source:"thirty",direction:"en_to_sv"}, correct_answer:{answer:"trettio",alternatives:["Trettio"]}, explanation:'"Trettio" — from "tretton" (13), just swap "-ton" for "-tio."', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "one hundred" in Swedish?', instruction_sv:'Hur säger man "one hundred" på svenska?', question_data:{source:"one hundred",direction:"en_to_sv"}, correct_answer:{answer:"hundra",alternatives:["Hundra","ett hundra"]}, explanation:'"Hundra" — you can just say "hundra" without "ett" (one) in front.', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "forty-five" in Swedish?', instruction_sv:'Hur säger man "forty-five" på svenska?', question_data:{source:"forty-five",direction:"en_to_sv"}, correct_answer:{answer:"fyrtiofem",alternatives:["Fyrtiofem","fyrtio fem"]}, explanation:'"Fyrtiofem" = fyrtio (40) + fem (5). Just put the ten and the digit together!', difficulty:2, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:"Count by tens: fyrtio, ___, sextio", instruction_sv:"Räkna i tiotal: fyrtio, ___, sextio", question_data:{sentence:"fyrtio, ___, sextio"}, correct_answer:{answer:"femtio",alternatives:["Femtio"]}, explanation:'"Femtio" (50) = fem + tio.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:"Count by tens: sjuttio, ___, nittio", instruction_sv:"Räkna i tiotal: sjuttio, ___, nittio", question_data:{sentence:"sjuttio, ___, nittio"}, correct_answer:{answer:"åttio",alternatives:["Åttio"]}, explanation:'"Åttio" (80) — from "åtta" (8) + tio.', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:"Forty-two in Swedish: fyrtio___", instruction_sv:"Fyrtiotvå skrivs: fyrtio___", question_data:{sentence:"fyrtio___"}, correct_answer:{answer:"två",alternatives:["Två"]}, explanation:"Compound numbers: just add the digit after the ten. Fyrtio + två = fyrtiotvå (42).", difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:"Put these tens in order from smallest to largest.", instruction_sv:"Sätt tiotalen i ordning.", question_data:{words:["sjuttio","trettio","femtio","nittio"],hint:"30, 50, 70, 90"}, correct_answer:{answer:["trettio","femtio","sjuttio","nittio"]}, explanation:"Trettio (30), femtio (50), sjuttio (70), nittio (90).", difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'You\'re shopping. You ask "Hur mycket kostar det?" The item is 75 kronor.', instruction_sv:"Du handlar. Varan kostar 75 kronor.", question_data:{dialogue:["Hur mycket kostar det?","???"],blank_index:1,options:["Femtio kronor.","Sjuttiofem kronor.","Åttiofem kronor.","Sextio kronor."]}, correct_answer:"Sjuttiofem kronor.", explanation:'"Sjuttiofem" = sjuttio (70) + fem (5). "Kronor" is the plural of krona, the Swedish currency.', difficulty:2, xp_reward:10, order_index:8 },
    { exercise_type:"translation", instruction:'(Recall) How do you say "eleven" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"eleven",direction:"en_to_sv"}, correct_answer:{answer:"elva",alternatives:["Elva"]}, explanation:'From Lesson 2 — "Elva" is one of the irregular teen numbers.', difficulty:1, xp_reward:10, order_index:9 },
    { exercise_type:"matching", instruction:"Match the Swedish tens with their values.", instruction_sv:"Para ihop tiotalen.", question_data:{pairs:[{left:"trettio",right:"30"},{left:"femtio",right:"50"},{left:"sjuttio",right:"70"},{left:"hundra",right:"100"}]}, correct_answer:[["trettio","30"],["femtio","50"],["sjuttio","70"],["hundra","100"]], explanation:"The tens follow the same stems as the teens, just with -tio instead of -ton.", difficulty:1, xp_reward:15, order_index:10 },
    { exercise_type:"multiple_choice", instruction:'What is "sjuttiotre" in numbers?', instruction_sv:'Vad är "sjuttiotre" i siffror?', question_data:{options:["63","73","37","83"]}, correct_answer:"73", explanation:'"Sjuttio" (70) + "tre" (3) = 73.', difficulty:2, xp_reward:10, order_index:11 },
    { exercise_type:"multiple_choice", instruction:'How do you ask "How much does it cost?" in Swedish?', instruction_sv:'Hur frågar man "How much does it cost?" på svenska?', question_data:{options:["Hur gammal är du?","Hur mår du?","Hur mycket kostar det?","Var bor du?"]}, correct_answer:"Hur mycket kostar det?", explanation:'"Hur mycket" = how much, "kostar" = costs, "det" = it. An essential shopping phrase!', difficulty:1, xp_reward:10, order_index:12 },
  ],
  "a1-2-days-of-the-week": [
    { exercise_type:"translation", instruction:'How do you say "Monday" in Swedish?', instruction_sv:'Hur säger man "Monday" på svenska?', question_data:{source:"Monday",direction:"en_to_sv"}, correct_answer:{answer:"måndag",alternatives:["Måndag"]}, explanation:'"Måndag" — from "månen" (the moon). Note: not capitalised in Swedish!', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "Friday" in Swedish?', instruction_sv:'Hur säger man "Friday" på svenska?', question_data:{source:"Friday",direction:"en_to_sv"}, correct_answer:{answer:"fredag",alternatives:["Fredag"]}, explanation:'"Fredag" — named after Freja, the Norse goddess of love.', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "tomorrow" in Swedish?', instruction_sv:'Hur säger man "tomorrow" på svenska?', question_data:{source:"tomorrow",direction:"en_to_sv"}, correct_answer:{answer:"i morgon",alternatives:["I morgon","imorgon"]}, explanation:'"I morgon" means "tomorrow." Don\'t confuse it with "morgon" (morning).', difficulty:1, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:'Complete: "Vilken dag är det ___?" (What day is it today?)', instruction_sv:'Fyll i: "Vilken dag är det ___?"', question_data:{sentence:"Vilken dag är det ___?"}, correct_answer:{answer:"idag",alternatives:["Idag"]}, explanation:'"Idag" means "today." "Vilken dag är det idag?" is how you ask what day it is.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:"Complete the week: måndag, tisdag, ___, torsdag", instruction_sv:"Fyll i veckodagen: måndag, tisdag, ___, torsdag", question_data:{sentence:"måndag, tisdag, ___, torsdag"}, correct_answer:{answer:"onsdag",alternatives:["Onsdag"]}, explanation:'"Onsdag" (Wednesday) — named after Oden/Odin, king of the Norse gods.', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:"The weekend days are ___ and söndag.", instruction_sv:"Helgens dagar är ___ och söndag.", question_data:{sentence:"The weekend days are ___ and söndag."}, correct_answer:{answer:"lördag",alternatives:["Lördag"]}, explanation:'"Lördag" (Saturday) — originally "bath day" from the old word "löga" (to bathe)!', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:"Put these days in the correct order (Monday to Thursday).", instruction_sv:"Sätt dagarna i rätt ordning.", question_data:{words:["onsdag","måndag","torsdag","tisdag"],hint:"Mon, Tue, Wed, Thu"}, correct_answer:{answer:["måndag","tisdag","onsdag","torsdag"]}, explanation:"Måndag, tisdag, onsdag, torsdag — the first four days of the week.", difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'Someone asks: "Vilken dag är det idag?" Today is Wednesday.', instruction_sv:'Någon frågar: "Vilken dag är det idag?" Det är onsdag.', question_data:{dialogue:["Vilken dag är det idag?","???"],blank_index:1,options:["Idag är det tisdag.","Idag är det onsdag.","Idag är det torsdag.","Idag är det fredag."]}, correct_answer:"Idag är det onsdag.", explanation:'"Idag är det onsdag" = Today is Wednesday.', difficulty:1, xp_reward:10, order_index:8 },
    { exercise_type:"translation", instruction:'(Recall) How do you say "ten" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"ten",direction:"en_to_sv"}, correct_answer:{answer:"tio",alternatives:["Tio"]}, explanation:'From Lesson 1 — "Tio" is the base for building all the tens (trettio, fyrtio, etc.).', difficulty:1, xp_reward:10, order_index:9 },
    { exercise_type:"matching", instruction:"Match the Swedish days with their English equivalents.", instruction_sv:"Para ihop dagarna.", question_data:{pairs:[{left:"måndag",right:"Monday"},{left:"onsdag",right:"Wednesday"},{left:"fredag",right:"Friday"},{left:"söndag",right:"Sunday"},{left:"lördag",right:"Saturday"}]}, correct_answer:[["måndag","Monday"],["onsdag","Wednesday"],["fredag","Friday"],["söndag","Sunday"],["lördag","Saturday"]], explanation:'All seven days end in "-dag" (day) — making them easy to recognise.', difficulty:1, xp_reward:15, order_index:10 },
    { exercise_type:"multiple_choice", instruction:"In Swedish, days of the week are...", instruction_sv:"På svenska skrivs veckodagar...", question_data:{options:["Always capitalised","Not capitalised (unless starting a sentence)","Written in ALL CAPS","Abbreviated to 3 letters"]}, correct_answer:"Not capitalised (unless starting a sentence)", explanation:'Unlike English, Swedish doesn\'t capitalise day names: "måndag" not "Måndag."', difficulty:1, xp_reward:10, order_index:11 },
    { exercise_type:"multiple_choice", instruction:'What does "igår" mean?', instruction_sv:'Vad betyder "igår"?', question_data:{options:["Today","Tomorrow","Yesterday","Every day"]}, correct_answer:"Yesterday", explanation:'"Igår" = yesterday, "idag" = today, "i morgon" = tomorrow. Three essential time words!', difficulty:1, xp_reward:10, order_index:12 },
  ],
  "a1-2-months-and-seasons": [
    { exercise_type:"translation", instruction:'How do you say "summer" in Swedish?', instruction_sv:'Hur säger man "summer" på svenska?', question_data:{source:"summer",direction:"en_to_sv"}, correct_answer:{answer:"sommar",alternatives:["Sommar"]}, explanation:'"Sommar" — the season Swedes dream about all winter long.', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "winter" in Swedish?', instruction_sv:'Hur säger man "winter" på svenska?', question_data:{source:"winter",direction:"en_to_sv"}, correct_answer:{answer:"vinter",alternatives:["Vinter"]}, explanation:'"Vinter" — almost the same as English, just swap the "w" for "v."', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "May" in Swedish?', instruction_sv:'Hur säger man "May" på svenska?', question_data:{source:"May",direction:"en_to_sv"}, correct_answer:{answer:"maj",alternatives:["Maj"]}, explanation:'"Maj" — pronounced "my." The shortest month name in Swedish.', difficulty:1, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:"The month after mars (March) is ___.", instruction_sv:"Månaden efter mars är ___.", question_data:{sentence:"The month after mars is ___."}, correct_answer:{answer:"april",alternatives:["April"]}, explanation:'"April" — same spelling as English, just not capitalised.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:'Complete: "Jag fyller år i ___." (My birthday is in June.)', instruction_sv:'Fyll i: "Jag fyller år i ___."', question_data:{sentence:"Jag fyller år i ___."}, correct_answer:{answer:"juni",alternatives:["Juni"]}, explanation:'"Juni" — pronounced "YOO-nee." The start of the Swedish summer.', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:'The Swedish word for "spring" (the season) is ___.', instruction_sv:'Det svenska ordet för "spring" (årstiden) är ___.', question_data:{sentence:"The Swedish word for spring is ___."}, correct_answer:{answer:"vår",alternatives:["Vår"]}, explanation:'"Vår" means "spring" — it also means "our"! Context makes it clear.', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:"Put the seasons in order starting from spring.", instruction_sv:"Sätt årstiderna i ordning från vår.", question_data:{words:["vinter","sommar","vår","höst"],hint:"spring, summer, autumn, winter"}, correct_answer:{answer:["vår","sommar","höst","vinter"]}, explanation:"Vår (spring), sommar (summer), höst (autumn), vinter (winter).", difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'Someone asks: "Vilken månad är det?" It\'s October.', instruction_sv:'Någon frågar: "Vilken månad är det?" Det är oktober.', question_data:{dialogue:["Vilken månad är det?","???"],blank_index:1,options:["Det är september.","Det är oktober.","Det är november.","Det är augusti."]}, correct_answer:"Det är oktober.", explanation:'"Det är oktober" = It is October.', difficulty:1, xp_reward:10, order_index:8 },
    { exercise_type:"translation", instruction:'(Recall) How do you say "Wednesday" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"Wednesday",direction:"en_to_sv"}, correct_answer:{answer:"onsdag",alternatives:["Onsdag"]}, explanation:'From Lesson 4 — "Onsdag" is named after Oden/Odin.', difficulty:1, xp_reward:10, order_index:9 },
    { exercise_type:"matching", instruction:"Match each season with its Swedish name.", instruction_sv:"Para ihop årstiderna.", question_data:{pairs:[{left:"spring",right:"vår"},{left:"summer",right:"sommar"},{left:"autumn",right:"höst"},{left:"winter",right:"vinter"}]}, correct_answer:[["spring","vår"],["summer","sommar"],["autumn","höst"],["winter","vinter"]], explanation:"The four seasons: vår, sommar, höst, vinter.", difficulty:1, xp_reward:15, order_index:10 },
    { exercise_type:"multiple_choice", instruction:"Which of these is NOT a summer month in Sweden?", instruction_sv:"Vilken av dessa är INTE en sommarmånad i Sverige?", question_data:{options:["juni","juli","augusti","september"]}, correct_answer:"september", explanation:"Swedish summer months are juni, juli, augusti. September marks the start of höst (autumn).", difficulty:1, xp_reward:10, order_index:11 },
    { exercise_type:"multiple_choice", instruction:"How do Swedes write dates?", instruction_sv:"Hur skriver svenskar datum?", question_data:{options:["Month/Day/Year (03/15/2024)","Day/Month/Year (15/03/2024)","Year-Month-Day (2024-03-15)","Day.Month.Year (15.03.2024)"]}, correct_answer:"Year-Month-Day (2024-03-15)", explanation:"Sweden uses the ISO format: year-month-day. It's logical — biggest unit first!", difficulty:1, xp_reward:10, order_index:12 },
  ],
  "a1-2-what-time-is-it": [
    { exercise_type:"translation", instruction:'How do you ask "What time is it?" in Swedish?', instruction_sv:'Hur frågar man "What time is it?" på svenska?', question_data:{source:"What time is it?",direction:"en_to_sv"}, correct_answer:{answer:"Vad är klockan?",alternatives:["vad är klockan?","Vad är klockan","Hur mycket är klockan?"]}, explanation:'"Vad är klockan?" literally means "What is the clock?"', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "It\'s three o\'clock" in Swedish?', instruction_sv:'Hur säger man "It\'s three o\'clock" på svenska?', question_data:{source:"It's three o'clock",direction:"en_to_sv"}, correct_answer:{answer:"Klockan är tre.",alternatives:["Klockan är tre","klockan är tre"]}, explanation:'"Klockan är tre" — "Klockan" (the clock) + "är" (is) + the number.', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"fill_blank", instruction:'It\'s 2:30. In Swedish: "halv ___"', instruction_sv:'Klockan är 2:30. På svenska: "halv ___"', question_data:{sentence:"halv ___"}, correct_answer:{answer:"tre",alternatives:["Tre"]}, explanation:'"Halv tre" = 2:30. Swedish counts towards the NEXT hour, so "half three" means halfway to three.', difficulty:2, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:'It\'s 3:15. In Swedish: "___ över tre"', instruction_sv:'Klockan är 3:15. På svenska: "___ över tre"', question_data:{sentence:"___ över tre"}, correct_answer:{answer:"kvart",alternatives:["Kvart"]}, explanation:'"Kvart över tre" = quarter past three. "Kvart" = quarter, "över" = past.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:'It\'s 4:45. In Swedish: "kvart ___ fem"', instruction_sv:'Klockan är 4:45. På svenska: "kvart ___ fem"', question_data:{sentence:"kvart ___ fem"}, correct_answer:{answer:"i",alternatives:["I"]}, explanation:'"Kvart i fem" = quarter to five. "I" means "to" when telling time.', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"drag_drop", instruction:'Build the question: "What time is it?"', instruction_sv:"Bygg frågan.", question_data:{words:["klockan?","är","Vad"],hint:"What time is it?"}, correct_answer:{answer:["Vad","är","klockan?"]}, explanation:'"Vad är klockan?" — What is the clock?', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:'Build the sentence: "It\'s seven o\'clock."', instruction_sv:"Bygg meningen.", question_data:{words:["sju.","är","Klockan"],hint:"It's seven o'clock."}, correct_answer:{answer:["Klockan","är","sju."]}, explanation:'"Klockan är sju" = It\'s seven o\'clock.', difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'You ask "Vad är klockan?" and your friend checks their phone. It\'s 8:30.', instruction_sv:'Du frågar "Vad är klockan?" Klockan är 8:30.', question_data:{dialogue:["Vad är klockan?","???"],blank_index:1,options:["Klockan är åtta.","Halv åtta.","Halv nio.","Kvart över åtta."]}, correct_answer:"Halv nio.", explanation:'"Halv nio" = 8:30. Remember: Swedish counts towards the next hour. Halfway to nine = 8:30.', difficulty:2, xp_reward:10, order_index:8 },
    { exercise_type:"translation", instruction:'(Recall) How do you say "today" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"today",direction:"en_to_sv"}, correct_answer:{answer:"idag",alternatives:["Idag","i dag"]}, explanation:'From Lesson 4 — "Idag" = today.', difficulty:1, xp_reward:10, order_index:9 },
    { exercise_type:"matching", instruction:"Match the times with their Swedish expressions.", instruction_sv:"Para ihop tiderna.", question_data:{pairs:[{left:"3:00",right:"klockan tre"},{left:"3:15",right:"kvart över tre"},{left:"3:30",right:"halv fyra"},{left:"3:45",right:"kvart i fyra"}]}, correct_answer:[["3:00","klockan tre"],["3:15","kvart över tre"],["3:30","halv fyra"],["3:45","kvart i fyra"]], explanation:"The four key time expressions: full hour, quarter past, half (to next), quarter to.", difficulty:2, xp_reward:15, order_index:10 },
    { exercise_type:"multiple_choice", instruction:'What time is "halv tre"?', instruction_sv:'Vilken tid är "halv tre"?', question_data:{options:["2:30","3:00","3:30","2:00"]}, correct_answer:"2:30", explanation:'"Halv tre" = halfway to three = 2:30. This is the biggest trap for English speakers!', difficulty:2, xp_reward:10, order_index:11 },
    { exercise_type:"multiple_choice", instruction:'What does "kvart i" mean when telling time?', instruction_sv:'Vad betyder "kvart i" när man berättar klockan?', question_data:{options:["Quarter past","Half past","Quarter to","At exactly"]}, correct_answer:"Quarter to", explanation:'"Kvart i" = quarter to. "Kvart i fem" = quarter to five (4:45). "I" means "to/before."', difficulty:1, xp_reward:10, order_index:12 },
  ],
  "a1-2-your-daily-schedule": [
    { exercise_type:"translation", instruction:'How do you say "I wake up at seven" in Swedish?', instruction_sv:'Hur säger man "I wake up at seven" på svenska?', question_data:{source:"I wake up at seven",direction:"en_to_sv"}, correct_answer:{answer:"Jag vaknar klockan sju",alternatives:["Jag vaknar klockan sju.","jag vaknar klockan sju"]}, explanation:'"Vaknar" = wake up. "Klockan sju" = at seven o\'clock.', difficulty:1, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "breakfast" in Swedish?', instruction_sv:'Hur säger man "breakfast" på svenska?', question_data:{source:"breakfast",direction:"en_to_sv"}, correct_answer:{answer:"frukost",alternatives:["Frukost"]}, explanation:'"Frukost" — Sweden\'s first meal of the day, typically around 7–8.', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "every day" in Swedish?', instruction_sv:'Hur säger man "every day" på svenska?', question_data:{source:"every day",direction:"en_to_sv"}, correct_answer:{answer:"varje dag",alternatives:["Varje dag"]}, explanation:'"Varje" = every, "dag" = day. "Varje dag" = every day.', difficulty:1, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:'Complete: "Jag äter ___ klockan tolv." (I eat lunch at twelve.)', instruction_sv:'Fyll i: "Jag äter ___ klockan tolv."', question_data:{sentence:"Jag äter ___ klockan tolv."}, correct_answer:{answer:"lunch",alternatives:["Lunch"]}, explanation:'"Lunch" is the same word in Swedish! Typically eaten between 11:30 and 13:00.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:'Complete: "Jag ___ från nio till fem." (I work from nine to five.)', instruction_sv:'Fyll i: "Jag ___ från nio till fem."', question_data:{sentence:"Jag ___ från nio till fem."}, correct_answer:{answer:"arbetar",alternatives:["Arbetar"]}, explanation:'"Arbetar" = work. "Från... till..." = from... to...', difficulty:1, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:'Complete: "Vi äter ___ klockan sex." (We eat dinner at six.)', instruction_sv:'Fyll i: "Vi äter ___ klockan sex."', question_data:{sentence:"Vi äter ___ klockan sex."}, correct_answer:{answer:"middag",alternatives:["Middag"]}, explanation:'"Middag" means dinner — despite looking like "midday." Swedes eat dinner around 17–19.', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:'Build the sentence: "I eat breakfast at eight."', instruction_sv:"Bygg meningen.", question_data:{words:["klockan","frukost","Jag","åtta.","äter"],hint:"I eat breakfast at eight."}, correct_answer:{answer:["Jag","äter","frukost","klockan","åtta."]}, explanation:'"Jag äter frukost klockan åtta" — Subject + Verb + Object + Time.', difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:'Someone asks: "Hur ser din dag ut?" (What does your day look like?) You wake up at 6.', instruction_sv:'Någon frågar: "Hur ser din dag ut?" Du vaknar klockan 6.', question_data:{dialogue:["Hur ser din dag ut?","???","Tidigt! Jag vaknar halv åtta."],blank_index:1,options:["Jag heter Anna.","Jag vaknar klockan sex.","Bra, tack!","Idag är det måndag."]}, correct_answer:"Jag vaknar klockan sex.", explanation:'Start describing your day with when you wake up: "Jag vaknar klockan..."', difficulty:1, xp_reward:10, order_index:8 },
    { exercise_type:"multiple_choice", instruction:'(Recall) What time is "halv åtta"?', instruction_sv:'Vilken tid är "halv åtta"?', question_data:{options:["7:00","7:30","8:00","8:30"]}, correct_answer:"7:30", explanation:'From Lesson 6 — "Halv åtta" = halfway to eight = 7:30.', difficulty:2, xp_reward:10, order_index:9 },
    { exercise_type:"fill_blank", instruction:"(Recall) Complete the week: fredag, ___, söndag", instruction_sv:"Fyll i veckodagen.", question_data:{sentence:"fredag, ___, söndag"}, correct_answer:{answer:"lördag",alternatives:["Lördag"]}, explanation:'From Lesson 4 — "Lördag" (Saturday) comes between fredag and söndag.', difficulty:1, xp_reward:10, order_index:10 },
    { exercise_type:"matching", instruction:"Match the Swedish meals with their English names.", instruction_sv:"Para ihop måltiderna.", question_data:{pairs:[{left:"frukost",right:"breakfast"},{left:"lunch",right:"lunch"},{left:"fika",right:"coffee break"},{left:"middag",right:"dinner"}]}, correct_answer:[["frukost","breakfast"],["lunch","lunch"],["fika","coffee break"],["middag","dinner"]], explanation:"Fika is the most Swedish of these — a sacred coffee break with something sweet!", difficulty:1, xp_reward:15, order_index:11 },
    { exercise_type:"multiple_choice", instruction:'What does "Ska vi fika?" mean?', instruction_sv:'Vad betyder "Ska vi fika?"', question_data:{options:["Shall we eat dinner?","Shall we go home?","Shall we have a coffee break?","Shall we work?"]}, correct_answer:"Shall we have a coffee break?", explanation:'"Ska vi fika?" = Shall we have fika? One of the most important questions in Swedish culture!', difficulty:1, xp_reward:10, order_index:12 },
  ],
  "a1-2-your-swedish-week": [
    { exercise_type:"translation", instruction:'How do you say "seventy-five" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"seventy-five",direction:"en_to_sv"}, correct_answer:{answer:"sjuttiofem",alternatives:["Sjuttiofem","sjuttio fem"]}, explanation:'"Sjuttiofem" = sjuttio (70) + fem (5). Compound numbers are straightforward!', difficulty:2, xp_reward:10, order_index:1 },
    { exercise_type:"translation", instruction:'How do you say "What time is it?" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"What time is it?",direction:"en_to_sv"}, correct_answer:{answer:"Vad är klockan?",alternatives:["vad är klockan?","Hur mycket är klockan?"]}, explanation:'"Vad är klockan?" — literally "What is the clock?"', difficulty:1, xp_reward:10, order_index:2 },
    { exercise_type:"translation", instruction:'How do you say "See you on Friday" in Swedish?', instruction_sv:"Översätt till svenska.", question_data:{source:"See you on Friday",direction:"en_to_sv"}, correct_answer:{answer:"Vi ses på fredag",alternatives:["Vi ses på fredag.","vi ses på fredag"]}, explanation:'"Vi ses" (see you) + "på fredag" (on Friday). Remember: no capital on "fredag"!', difficulty:1, xp_reward:10, order_index:3 },
    { exercise_type:"fill_blank", instruction:'Complete: "Jag ___ klockan sju." (I wake up at seven.)', instruction_sv:"Fyll i.", question_data:{sentence:"Jag ___ klockan sju."}, correct_answer:{answer:"vaknar",alternatives:["Vaknar"]}, explanation:'"Vaknar" = wake up. One of the essential daily routine verbs.', difficulty:1, xp_reward:10, order_index:4 },
    { exercise_type:"fill_blank", instruction:'It\'s 5:30. In Swedish: "___ sex"', instruction_sv:'Klockan är 5:30. På svenska: "___ sex"', question_data:{sentence:"___ sex"}, correct_answer:{answer:"halv",alternatives:["Halv"]}, explanation:'"Halv sex" = 5:30 (halfway to six). The Swedish half-hour counts towards the next hour.', difficulty:2, xp_reward:10, order_index:5 },
    { exercise_type:"fill_blank", instruction:'The Swedish word for "autumn" is ___.', instruction_sv:'Det svenska ordet för "autumn" är ___.', question_data:{sentence:'The Swedish word for autumn is ___.'}, correct_answer:{answer:"höst",alternatives:["Höst"]}, explanation:'"Höst" — the season of colourful leaves (september, oktober, november).', difficulty:1, xp_reward:10, order_index:6 },
    { exercise_type:"drag_drop", instruction:'Build the sentence: "How much does it cost?"', instruction_sv:"Bygg frågan.", question_data:{words:["kostar","mycket","det?","Hur"],hint:"How much does it cost?"}, correct_answer:{answer:["Hur","mycket","kostar","det?"]}, explanation:'"Hur mycket kostar det?" — the essential shopping question.', difficulty:1, xp_reward:10, order_index:7 },
    { exercise_type:"multiple_choice", instruction:"Your friend suggests fika. You want to agree enthusiastically.", instruction_sv:"Din vän föreslår fika. Du vill gärna.", question_data:{dialogue:["Ska vi fika på onsdag?","???","Klockan tre? På kaféet?","Perfekt!"],blank_index:1,options:["Nej, tack.","Ja, jättegärna!","Hej då!","Jag vaknar tidigt."]}, correct_answer:"Ja, jättegärna!", explanation:'"Jättegärna" = very gladly / I\'d love to. "Jätte-" makes everything bigger!', difficulty:1, xp_reward:10, order_index:8 },
    { exercise_type:"multiple_choice", instruction:"You're buying something that costs 42 kronor. The shopkeeper says the price. Which one is correct?", instruction_sv:"Du köper något som kostar 42 kronor.", question_data:{dialogue:["Hur mycket kostar det?","???"],blank_index:1,options:["Trettiofem kronor.","Fyrtiotvå kronor.","Femtiotre kronor.","Tjugofyra kronor."]}, correct_answer:"Fyrtiotvå kronor.", explanation:'"Fyrtiotvå" = fyrtio (40) + två (2) = 42.', difficulty:2, xp_reward:10, order_index:9 },
    { exercise_type:"multiple_choice", instruction:"Someone asks what you do on Saturday. You sleep until ten.", instruction_sv:"Någon frågar vad du gör på lördag. Du sover till tio.", question_data:{dialogue:["Vad gör du på lördag?","???"],blank_index:1,options:["Jag arbetar från åtta till fyra.","Jag vaknar klockan sex.","Jag sover till tio!","Jag äter lunch klockan tolv."]}, correct_answer:"Jag sover till tio!", explanation:'"Jag sover till tio" = I sleep until ten. "Sover" = sleep, "till" = until.', difficulty:1, xp_reward:10, order_index:10 },
    { exercise_type:"multiple_choice", instruction:'Someone asks "Hur gammal är du?" You are 25.', instruction_sv:'Någon frågar "Hur gammal är du?" Du är 25.', question_data:{dialogue:["Hur gammal är du?","???"],blank_index:1,options:["Jag är tjugofem år.","Jag är trettio år.","Jag är femton år.","Jag är tjugo år."]}, correct_answer:"Jag är tjugofem år.", explanation:'"Jag är tjugofem år" = I am twenty-five years old.', difficulty:1, xp_reward:10, order_index:11 },
    { exercise_type:"matching", instruction:"Match the Swedish phrases with their meanings.", instruction_sv:"Para ihop fraserna.", question_data:{pairs:[{left:"Hur mycket kostar det?",right:"How much does it cost?"},{left:"Vad är klockan?",right:"What time is it?"},{left:"Vilken dag är det idag?",right:"What day is it today?"},{left:"Ska vi fika?",right:"Shall we have fika?"},{left:"Jag vaknar klockan sju.",right:"I wake up at seven."}]}, correct_answer:[["Hur mycket kostar det?","How much does it cost?"],["Vad är klockan?","What time is it?"],["Vilken dag är det idag?","What day is it today?"],["Ska vi fika?","Shall we have fika?"],["Jag vaknar klockan sju.","I wake up at seven."]], explanation:"Five essential Unit 2 phrases covering numbers, time, days, and daily life.", difficulty:1, xp_reward:15, order_index:12 },
    { exercise_type:"multiple_choice", instruction:'What time is "halv nio"?', instruction_sv:'Vilken tid är "halv nio"?', question_data:{options:["8:00","8:30","9:00","9:30"]}, correct_answer:"8:30", explanation:'"Halv nio" = halfway to nine = 8:30. The Swedish half-hour always counts towards the next hour.', difficulty:2, xp_reward:10, order_index:13 },
    { exercise_type:"multiple_choice", instruction:'(Recall) What does "Trevligt att träffas" mean?', instruction_sv:'Vad betyder "Trevligt att träffas"?', question_data:{options:["See you later","Nice to meet you","How are you?","You're welcome"]}, correct_answer:"Nice to meet you", explanation:'From Unit 1 — "Trevligt att träffas" is said when meeting someone for the first time.', difficulty:1, xp_reward:10, order_index:14 },
  ],
};

// ── MAIN ─────────────────────────────────────────────────────
async function main() {
  console.log("Step 1 — Deleting old Unit 2 lessons & exercises...");

  // Get old unit ID
  const { data: oldUnit } = await sb
    .from("units")
    .select("id")
    .eq("level", "A1")
    .eq("unit_number", 2)
    .maybeSingle();

  if (oldUnit) {
    // Get old lesson IDs
    const { data: oldLessons } = await sb
      .from("lessons")
      .select("id")
      .eq("unit_id", oldUnit.id);

    if (oldLessons?.length) {
      for (const l of oldLessons) {
        await sb.from("exercises").delete().eq("lesson_id", l.id);
      }
      await sb.from("lessons").delete().eq("unit_id", oldUnit.id);
    }
    await sb.from("units").delete().eq("id", oldUnit.id);
    console.log("  Old Unit 2 deleted.");
  } else {
    console.log("  No existing Unit 2 found.");
  }

  console.log("Step 2 — Inserting new Unit 2...");
  const [unit] = await insert("units", [unitData]);
  console.log(`  Unit created: ${unit.id}`);

  console.log("Step 3 — Inserting 8 lessons...");
  for (const lesson of lessons) {
    const [row] = await insert("lessons", [{ ...lesson, unit_id: unit.id }]);
    console.log(`  ${row.slug} ✓`);
  }

  console.log("Step 4 — Inserting exercises...");
  let total = 0;
  for (const [slug, exs] of Object.entries(exercisesBySlug)) {
    const lessonId = await getLessonId(slug);
    const rows = exs.map((e) => ({ ...e, lesson_id: lessonId }));
    await insert("exercises", rows);
    total += rows.length;
    console.log(`  ${slug}: ${rows.length} exercises ✓`);
  }

  console.log(`\nDone! ${lessons.length} lessons, ${total} exercises inserted.`);
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
