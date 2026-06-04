-- ============================================================
-- UNIT 2 FULL COURSE: Siffror och tid (Numbers and Time)
--
-- Replaces the thin 2-lesson placeholder with a comprehensive
-- 8-lesson unit teaching numbers 0–100, days of the week,
-- months, telling time, and daily schedules.
--
-- Lessons:
--   1. Numbers 0 to 10
--   2. Numbers 11 to 20
--   3. Counting to 100
--   4. Days of the week
--   5. Months and seasons
--   6. What time is it?
--   7. Your daily schedule
--   8. Your Swedish week (review)
--
-- Each lesson has 12–14 exercises using production-first ordering:
--   translation → fill_blank → drag_drop → conversation → recall → matching → multiple_choice
-- ============================================================

-- Wipe previous Unit 2 (cascades to lessons → exercises)
DELETE FROM units WHERE level = 'A1' AND unit_number = 2;

-- ────────────────────────────────────────────────────────────
-- THE UNIT
-- ────────────────────────────────────────────────────────────
INSERT INTO units (
  level, unit_number, title, title_sv, description,
  learning_objectives, icon_emoji, is_free,
  estimated_hours, status, order_index
) VALUES (
  'A1', 2,
  'Numbers and time',
  'Siffror och tid',
  'Count from zero to a hundred, tell the time, say the days of the week and months — the building blocks for talking about schedules, prices, and everyday life in Sweden.',
  ARRAY[
    'Count from 0 to 100 in Swedish',
    'Say and recognise the days of the week',
    'Name the twelve months and four seasons',
    'Ask and tell the time',
    'Talk about your daily schedule',
    'Use basic time words (idag, i morgon, igår)',
    'Understand prices and ages in Swedish',
    'Make plans using numbers, days, and times together'
  ],
  '🕐', TRUE, 3.0, 'published', 2
);


-- ────────────────────────────────────────────────────────────
-- LESSON 1: Numbers 0 to 10
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Numbers 0 to 10',
  'Siffror 0 till 10',
  'a1-2-numbers-0-to-10',
  'standard',
  $md$# Numbers 0 to 10

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

> **Swedish Life:** Swedish phone numbers are spoken digit by digit, just like in English. Mobile numbers start with **07** (usually 073, 076, or 070). When you give your number, pause after every three or four digits to make it easy to write down.$md$,
  'Learn noll to tio — the foundation for all Swedish numbers.',
  TRUE, 12, 1, 'published'
);

-- Exercises for Lesson 1 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'translation',
  'How do you say "three" in Swedish?',
  'Hur säger man "three" på svenska?',
  '{"source": "three", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "tre", "alternatives": ["Tre"]}'::jsonb,
  '"Tre" — sounds similar to English "tray" but shorter.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'translation',
  'How do you say "five" in Swedish?',
  'Hur säger man "five" på svenska?',
  '{"source": "five", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "fem", "alternatives": ["Fem"]}'::jsonb,
  '"Fem" — just three letters. Easy to remember!',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'translation',
  'How do you say "eight" in Swedish?',
  'Hur säger man "eight" på svenska?',
  '{"source": "eight", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "åtta", "alternatives": ["Åtta"]}'::jsonb,
  '"Åtta" — remember, å sounds like "o" in "more."',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'fill_blank',
  'Count up: sex, ___, åtta',
  'Räkna uppåt: sex, ___, åtta',
  '{"sentence": "sex, ___, åtta"}'::jsonb,
  '{"answer": "sju", "alternatives": ["Sju"]}'::jsonb,
  '"Sju" (7) comes between sex (6) and åtta (8). It''s the trickiest number to pronounce!',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'fill_blank',
  'Count up: åtta, ___, tio',
  'Räkna uppåt: åtta, ___, tio',
  '{"sentence": "åtta, ___, tio"}'::jsonb,
  '{"answer": "nio", "alternatives": ["Nio"]}'::jsonb,
  '"Nio" (9) — pronounced "NEE-o."',
  1, 10, 5
),

-- 6. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'fill_blank',
  'The Swedish word for zero is ___.',
  'Det svenska ordet för zero är ___.',
  '{"sentence": "The Swedish word for zero is ___."}'::jsonb,
  '{"answer": "noll", "alternatives": ["Noll"]}'::jsonb,
  '"Noll" — similar to English "null." Used for phone numbers and scores.',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'drag_drop',
  'Put these numbers in order from smallest to largest: 4, 7, 2',
  'Sätt siffrorna i ordning från minst till störst.',
  '{"words": ["sju", "två", "fyra"], "hint": "2, 4, 7"}'::jsonb,
  '{"answer": ["två", "fyra", "sju"]}'::jsonb,
  'Två (2), fyra (4), sju (7).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'multiple_choice',
  'Someone asks "Hur många är ni?" (How many are you?) Your group has 4 people.',
  'Någon frågar "Hur många är ni?" Ni är 4 personer.',
  '{"dialogue": ["Hur många är ni?", "???"], "blank_index": 1, "options": ["Vi är fyra.", "Vi är fem.", "Vi är tre.", "Vi är sex."]}'::jsonb,
  '"Vi är fyra."'::jsonb,
  '"Vi är fyra" = We are four. "Vi" means "we" and "är" means "are."',
  1, 10, 8
),

-- 9. RECALL from Unit 1: greeting
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'translation',
  '(Recall) How do you say "Goodbye" in Swedish?',
  'Översätt till svenska.',
  '{"source": "Goodbye", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Hej då", "alternatives": ["hej då"]}'::jsonb,
  'From Unit 1 — "Hej då" is the standard goodbye.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'matching',
  'Match the Swedish numbers with their values.',
  'Para ihop de svenska siffrorna med deras värden.',
  '{"pairs": [{"left": "tre", "right": "3"}, {"left": "sju", "right": "7"}, {"left": "nio", "right": "9"}, {"left": "fyra", "right": "4"}, {"left": "åtta", "right": "8"}]}'::jsonb,
  '[["tre","3"],["sju","7"],["nio","9"],["fyra","4"],["åtta","8"]]'::jsonb,
  'The first ten numbers are the building blocks for all higher numbers.',
  1, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'multiple_choice',
  'What number is "fyra"?',
  'Vilket nummer är "fyra"?',
  '{"options": ["3", "4", "5", "6"]}'::jsonb,
  '"4"'::jsonb,
  '"Fyra" = 4. It sounds a bit like "fear-a."',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-0-to-10'),
  'multiple_choice',
  'Which Swedish number is hardest for English speakers to pronounce?',
  'Vilket svenskt nummer är svårast att uttala för engelsktalande?',
  '{"options": ["tre (3)", "fem (5)", "sju (7)", "nio (9)"]}'::jsonb,
  '"sju (7)"'::jsonb,
  '"Sju" has a unique Swedish sound — like blowing out a candle while saying "oo." It gets easier with practice!',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 2: Numbers 11 to 20
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Numbers 11 to 20',
  'Siffror 11 till 20',
  'a1-2-numbers-11-to-20',
  'standard',
  $md$# Numbers 11 to 20

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

> **Swedish Life:** The Swedish currency is the **krona** (plural: **kronor**), abbreviated **kr** or **SEK**. One krona = 100 öre, but öre coins haven't been used since 2010. Prices are always in whole kronor. A coffee might cost around 40–60 kronor.$md$,
  'Learn the teens: elva to tjugo — and spot the simple pattern.',
  TRUE, 15, 2, 'published'
);

-- Exercises for Lesson 2 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'translation',
  'How do you say "fifteen" in Swedish?',
  'Hur säger man "fifteen" på svenska?',
  '{"source": "fifteen", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "femton", "alternatives": ["Femton"]}'::jsonb,
  '"Femton" = fem (5) + ton (-teen). The pattern is digit + ton.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'translation',
  'How do you say "twelve" in Swedish?',
  'Hur säger man "twelve" på svenska?',
  '{"source": "twelve", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "tolv", "alternatives": ["Tolv"]}'::jsonb,
  '"Tolv" — one of the three irregular teen numbers (along with elva and arton).',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'translation',
  'How do you say "twenty" in Swedish?',
  'Hur säger man "twenty" på svenska?',
  '{"source": "twenty", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "tjugo", "alternatives": ["Tjugo"]}'::jsonb,
  '"Tjugo" — the "tj" makes a "ch" sound, like "church."',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'fill_blank',
  'Count up: tolv, ___, fjorton',
  'Räkna uppåt: tolv, ___, fjorton',
  '{"sentence": "tolv, ___, fjorton"}'::jsonb,
  '{"answer": "tretton", "alternatives": ["Tretton"]}'::jsonb,
  '"Tretton" (13) = tre + ton. It follows the digit + ton pattern.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'fill_blank',
  'Count up: sexton, ___, arton',
  'Räkna uppåt: sexton, ___, arton',
  '{"sentence": "sexton, ___, arton"}'::jsonb,
  '{"answer": "sjutton", "alternatives": ["Sjutton"]}'::jsonb,
  '"Sjutton" (17) = sju + ton. That tricky "sju" sound is back!',
  1, 10, 5
),

-- 6. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'fill_blank',
  'The Swedish number for 18 is ___.',
  'Det svenska numret för 18 är ___.',
  '{"sentence": "The Swedish number for 18 is ___."}'::jsonb,
  '{"answer": "arton", "alternatives": ["Arton"]}'::jsonb,
  '"Arton" is irregular — you might expect "åtton" but it''s "arton." Just memorise this one.',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'drag_drop',
  'Put these numbers in order from smallest to largest.',
  'Sätt siffrorna i ordning från minst till störst.',
  '{"words": ["tjugo", "elva", "sexton", "fjorton"], "hint": "11, 14, 16, 20"}'::jsonb,
  '{"answer": ["elva", "fjorton", "sexton", "tjugo"]}'::jsonb,
  'Elva (11), fjorton (14), sexton (16), tjugo (20).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'multiple_choice',
  'Someone asks your age: "Hur gammal är du?" You are 19 years old.',
  'Någon frågar "Hur gammal är du?" Du är 19 år.',
  '{"dialogue": ["Hur gammal är du?", "???"], "blank_index": 1, "options": ["Jag är arton år.", "Jag är nitton år.", "Jag är sjutton år.", "Jag är tjugo år."]}'::jsonb,
  '"Jag är nitton år."'::jsonb,
  '"Jag är nitton år" = I am nineteen years old. "År" means "years."',
  1, 10, 8
),

-- 9. RECALL from L1: numbers 0–10
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'translation',
  '(Recall) How do you say "seven" in Swedish?',
  'Översätt till svenska.',
  '{"source": "seven", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "sju", "alternatives": ["Sju"]}'::jsonb,
  'From Lesson 1 — "Sju" with that unique Swedish sound.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'matching',
  'Match the Swedish numbers with their values.',
  'Para ihop siffrorna.',
  '{"pairs": [{"left": "elva", "right": "11"}, {"left": "tretton", "right": "13"}, {"left": "femton", "right": "15"}, {"left": "arton", "right": "18"}, {"left": "tjugo", "right": "20"}]}'::jsonb,
  '[["elva","11"],["tretton","13"],["femton","15"],["arton","18"],["tjugo","20"]]'::jsonb,
  'The teens: elva and tolv are unique, 13–19 follow digit + ton, and tjugo is 20.',
  1, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'multiple_choice',
  'What pattern do Swedish teen numbers (13–19) follow?',
  'Vilket mönster följer de svenska tontalen (13–19)?',
  '{"options": ["digit + tio", "digit + ton", "tio + digit", "ton + digit"]}'::jsonb,
  '"digit + ton"'::jsonb,
  'Tretton, fjorton, femton, sexton, sjutton, arton, nitton — the pattern is digit + ton.',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-numbers-11-to-20'),
  'multiple_choice',
  'Which of these teen numbers is irregular (doesn''t follow the digit + ton pattern)?',
  'Vilket av dessa tontal är oregelbundet?',
  '{"options": ["tretton (13)", "femton (15)", "arton (18)", "nitton (19)"]}'::jsonb,
  '"arton (18)"'::jsonb,
  'You might expect "åtton" from "åtta," but the real word is "arton." Elva (11) and tolv (12) are also irregular.',
  2, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 3: Counting to 100
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Counting to 100',
  'Räkna till 100',
  'a1-2-counting-to-100',
  'standard',
  $md$# Counting to 100

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

> **Swedish Life:** In everyday Swedish, people often shorten the tens when speaking fast. "Trettio" might sound more like "tretti" and "femtio" like "femti." You don't need to do this yet, but don't be confused when you hear it!$md$,
  'Learn the tens from trettio to hundra — and how to build any number in between.',
  TRUE, 18, 3, 'published'
);

-- Exercises for Lesson 3 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'translation',
  'How do you say "thirty" in Swedish?',
  'Hur säger man "thirty" på svenska?',
  '{"source": "thirty", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "trettio", "alternatives": ["Trettio"]}'::jsonb,
  '"Trettio" — from "tretton" (13), just swap "-ton" for "-tio."',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'translation',
  'How do you say "one hundred" in Swedish?',
  'Hur säger man "one hundred" på svenska?',
  '{"source": "one hundred", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "hundra", "alternatives": ["Hundra", "ett hundra"]}'::jsonb,
  '"Hundra" — you can just say "hundra" without "ett" (one) in front.',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'translation',
  'How do you say "forty-five" in Swedish?',
  'Hur säger man "forty-five" på svenska?',
  '{"source": "forty-five", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "fyrtiofem", "alternatives": ["Fyrtiofem", "fyrtio fem"]}'::jsonb,
  '"Fyrtiofem" = fyrtio (40) + fem (5). Just put the ten and the digit together!',
  2, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'fill_blank',
  'Count by tens: fyrtio, ___, sextio',
  'Räkna i tiotal: fyrtio, ___, sextio',
  '{"sentence": "fyrtio, ___, sextio"}'::jsonb,
  '{"answer": "femtio", "alternatives": ["Femtio"]}'::jsonb,
  '"Femtio" (50) = fem + tio.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'fill_blank',
  'Count by tens: sjuttio, ___, nittio',
  'Räkna i tiotal: sjuttio, ___, nittio',
  '{"sentence": "sjuttio, ___, nittio"}'::jsonb,
  '{"answer": "åttio", "alternatives": ["Åttio"]}'::jsonb,
  '"Åttio" (80) — from "åtta" (8) + tio.',
  1, 10, 5
),

-- 6. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'fill_blank',
  'Forty-two in Swedish: fyrtio___',
  'Fyrtiotvå skrivs: fyrtio___',
  '{"sentence": "fyrtio___"}'::jsonb,
  '{"answer": "två", "alternatives": ["Två"]}'::jsonb,
  'Compound numbers: just add the digit after the ten. Fyrtio + två = fyrtiotvå (42).',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'drag_drop',
  'Put these tens in order from smallest to largest.',
  'Sätt tiotalen i ordning.',
  '{"words": ["sjuttio", "trettio", "femtio", "nittio"], "hint": "30, 50, 70, 90"}'::jsonb,
  '{"answer": ["trettio", "femtio", "sjuttio", "nittio"]}'::jsonb,
  'Trettio (30), femtio (50), sjuttio (70), nittio (90).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'multiple_choice',
  'You''re shopping. You ask "Hur mycket kostar det?" The item is 75 kronor.',
  'Du handlar. Varan kostar 75 kronor.',
  '{"dialogue": ["Hur mycket kostar det?", "???"], "blank_index": 1, "options": ["Femtio kronor.", "Sjuttiofem kronor.", "Åttiofem kronor.", "Sextio kronor."]}'::jsonb,
  '"Sjuttiofem kronor."'::jsonb,
  '"Sjuttiofem" = sjuttio (70) + fem (5). "Kronor" is the plural of krona, the Swedish currency.',
  2, 10, 8
),

-- 9. RECALL from L1-L2: numbers
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'translation',
  '(Recall) How do you say "eleven" in Swedish?',
  'Översätt till svenska.',
  '{"source": "eleven", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "elva", "alternatives": ["Elva"]}'::jsonb,
  'From Lesson 2 — "Elva" is one of the irregular teen numbers.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'matching',
  'Match the Swedish tens with their values.',
  'Para ihop tiotalen.',
  '{"pairs": [{"left": "trettio", "right": "30"}, {"left": "femtio", "right": "50"}, {"left": "sjuttio", "right": "70"}, {"left": "hundra", "right": "100"}]}'::jsonb,
  '[["trettio","30"],["femtio","50"],["sjuttio","70"],["hundra","100"]]'::jsonb,
  'The tens follow the same stems as the teens, just with -tio instead of -ton.',
  1, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'multiple_choice',
  'What is "sjuttiotre" in numbers?',
  'Vad är "sjuttiotre" i siffror?',
  '{"options": ["63", "73", "37", "83"]}'::jsonb,
  '"73"'::jsonb,
  '"Sjuttio" (70) + "tre" (3) = 73.',
  2, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-counting-to-100'),
  'multiple_choice',
  'How do you ask "How much does it cost?" in Swedish?',
  'Hur frågar man "How much does it cost?" på svenska?',
  '{"options": ["Hur gammal är du?", "Hur mår du?", "Hur mycket kostar det?", "Var bor du?"]}'::jsonb,
  '"Hur mycket kostar det?"'::jsonb,
  '"Hur mycket" = how much, "kostar" = costs, "det" = it. An essential shopping phrase!',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 4: Days of the week
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Days of the week',
  'Veckans dagar',
  'a1-2-days-of-the-week',
  'standard',
  $md$# Days of the week

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

> **Swedish Life:** Swedes talk about weeks a lot. Instead of saying "in about two weeks," they'll say **"om två veckor."** And instead of using dates, many Swedes refer to **week numbers**: "Vi ses vecka 15" (See you week 15). If someone says "vecka 42," they mean the 42nd week of the year — grab a calendar!$md$,
  'Måndag to söndag — the seven days, Norse mythology, and how to say "today" and "tomorrow."',
  TRUE, 15, 4, 'published'
);

-- Exercises for Lesson 4 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'translation',
  'How do you say "Monday" in Swedish?',
  'Hur säger man "Monday" på svenska?',
  '{"source": "Monday", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "måndag", "alternatives": ["Måndag"]}'::jsonb,
  '"Måndag" — from "månen" (the moon). Note: not capitalised in Swedish!',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'translation',
  'How do you say "Friday" in Swedish?',
  'Hur säger man "Friday" på svenska?',
  '{"source": "Friday", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "fredag", "alternatives": ["Fredag"]}'::jsonb,
  '"Fredag" — named after Freja, the Norse goddess of love.',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'translation',
  'How do you say "tomorrow" in Swedish?',
  'Hur säger man "tomorrow" på svenska?',
  '{"source": "tomorrow", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "i morgon", "alternatives": ["I morgon", "imorgon"]}'::jsonb,
  '"I morgon" means "tomorrow." Don''t confuse it with "morgon" (morning).',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'fill_blank',
  'Complete: "Vilken dag är det ___?" (What day is it today?)',
  'Fyll i: "Vilken dag är det ___?"',
  '{"sentence": "Vilken dag är det ___?"}'::jsonb,
  '{"answer": "idag", "alternatives": ["Idag"]}'::jsonb,
  '"Idag" means "today." "Vilken dag är det idag?" is how you ask what day it is.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'fill_blank',
  'Complete the week: måndag, tisdag, ___, torsdag',
  'Fyll i veckodagen: måndag, tisdag, ___, torsdag',
  '{"sentence": "måndag, tisdag, ___, torsdag"}'::jsonb,
  '{"answer": "onsdag", "alternatives": ["Onsdag"]}'::jsonb,
  '"Onsdag" (Wednesday) — named after Oden/Odin, king of the Norse gods.',
  1, 10, 5
),

-- 6. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'fill_blank',
  'The weekend days are ___ and söndag.',
  'Helgens dagar är ___ och söndag.',
  '{"sentence": "The weekend days are ___ and söndag."}'::jsonb,
  '{"answer": "lördag", "alternatives": ["Lördag"]}'::jsonb,
  '"Lördag" (Saturday) — originally "bath day" from the old word "löga" (to bathe)!',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'drag_drop',
  'Put these days in the correct order (Monday to Thursday).',
  'Sätt dagarna i rätt ordning.',
  '{"words": ["onsdag", "måndag", "torsdag", "tisdag"], "hint": "Mon, Tue, Wed, Thu"}'::jsonb,
  '{"answer": ["måndag", "tisdag", "onsdag", "torsdag"]}'::jsonb,
  'Måndag, tisdag, onsdag, torsdag — the first four days of the week.',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'multiple_choice',
  'Someone asks: "Vilken dag är det idag?" Today is Wednesday.',
  'Någon frågar: "Vilken dag är det idag?" Det är onsdag.',
  '{"dialogue": ["Vilken dag är det idag?", "???"], "blank_index": 1, "options": ["Idag är det tisdag.", "Idag är det onsdag.", "Idag är det torsdag.", "Idag är det fredag."]}'::jsonb,
  '"Idag är det onsdag."'::jsonb,
  '"Idag är det onsdag" = Today is Wednesday.',
  1, 10, 8
),

-- 9. RECALL from L1: numbers
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'translation',
  '(Recall) How do you say "ten" in Swedish?',
  'Översätt till svenska.',
  '{"source": "ten", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "tio", "alternatives": ["Tio"]}'::jsonb,
  'From Lesson 1 — "Tio" is the base for building all the tens (trettio, fyrtio, etc.).',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'matching',
  'Match the Swedish days with their English equivalents.',
  'Para ihop dagarna.',
  '{"pairs": [{"left": "måndag", "right": "Monday"}, {"left": "onsdag", "right": "Wednesday"}, {"left": "fredag", "right": "Friday"}, {"left": "söndag", "right": "Sunday"}, {"left": "lördag", "right": "Saturday"}]}'::jsonb,
  '[["måndag","Monday"],["onsdag","Wednesday"],["fredag","Friday"],["söndag","Sunday"],["lördag","Saturday"]]'::jsonb,
  'All seven days end in "-dag" (day) — making them easy to recognise.',
  1, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'multiple_choice',
  'In Swedish, days of the week are...',
  'På svenska skrivs veckodagar...',
  '{"options": ["Always capitalised", "Not capitalised (unless starting a sentence)", "Written in ALL CAPS", "Abbreviated to 3 letters"]}'::jsonb,
  '"Not capitalised (unless starting a sentence)"'::jsonb,
  'Unlike English, Swedish doesn''t capitalise day names: "måndag" not "Måndag."',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-days-of-the-week'),
  'multiple_choice',
  'What does "igår" mean?',
  'Vad betyder "igår"?',
  '{"options": ["Today", "Tomorrow", "Yesterday", "Every day"]}'::jsonb,
  '"Yesterday"'::jsonb,
  '"Igår" = yesterday, "idag" = today, "i morgon" = tomorrow. Three essential time words!',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 5: Months and seasons
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Months and seasons',
  'Månader och årstider',
  'a1-2-months-and-seasons',
  'standard',
  $md$# Months and seasons

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

> **Swedish Life:** The seasons shape Swedish life more than in most countries. **Midsommar** (Midsummer) in June is one of the biggest celebrations — Swedes dance around a maypole, eat herring and strawberries, and stay up all night because the sun barely sets. In winter, **lucia** (December 13th) brings light to the darkest time with candles and singing. And then there's **vårvinter** (spring-winter) — that awkward season in March when Swedes desperately want spring but winter won't let go.$md$,
  'Januari to december, and the four seasons that shape life in Sweden.',
  TRUE, 15, 5, 'published'
);

-- Exercises for Lesson 5 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'translation',
  'How do you say "summer" in Swedish?',
  'Hur säger man "summer" på svenska?',
  '{"source": "summer", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "sommar", "alternatives": ["Sommar"]}'::jsonb,
  '"Sommar" — the season Swedes dream about all winter long.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'translation',
  'How do you say "winter" in Swedish?',
  'Hur säger man "winter" på svenska?',
  '{"source": "winter", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "vinter", "alternatives": ["Vinter"]}'::jsonb,
  '"Vinter" — almost the same as English, just swap the "w" for "v."',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'translation',
  'How do you say "May" in Swedish?',
  'Hur säger man "May" på svenska?',
  '{"source": "May", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "maj", "alternatives": ["Maj"]}'::jsonb,
  '"Maj" — pronounced "my." The shortest month name in Swedish.',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'fill_blank',
  'The month after mars (March) is ___.',
  'Månaden efter mars är ___.',
  '{"sentence": "The month after mars is ___."}'::jsonb,
  '{"answer": "april", "alternatives": ["April"]}'::jsonb,
  '"April" — same spelling as English, just not capitalised.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'fill_blank',
  'Complete: "Jag fyller år i ___." (My birthday is in June.)',
  'Fyll i: "Jag fyller år i ___."',
  '{"sentence": "Jag fyller år i ___."}'::jsonb,
  '{"answer": "juni", "alternatives": ["Juni"]}'::jsonb,
  '"Juni" — pronounced "YOO-nee." The start of the Swedish summer.',
  1, 10, 5
),

-- 6. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'fill_blank',
  'The Swedish word for "spring" (the season) is ___.',
  'Det svenska ordet för "spring" (årstiden) är ___.',
  '{"sentence": "The Swedish word for spring is ___."}'::jsonb,
  '{"answer": "vår", "alternatives": ["Vår"]}'::jsonb,
  '"Vår" means "spring" — it also means "our"! Context makes it clear.',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'drag_drop',
  'Put the seasons in order starting from spring.',
  'Sätt årstiderna i ordning från vår.',
  '{"words": ["vinter", "sommar", "vår", "höst"], "hint": "spring, summer, autumn, winter"}'::jsonb,
  '{"answer": ["vår", "sommar", "höst", "vinter"]}'::jsonb,
  'Vår (spring), sommar (summer), höst (autumn), vinter (winter).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'multiple_choice',
  'Someone asks: "Vilken månad är det?" It''s October.',
  'Någon frågar: "Vilken månad är det?" Det är oktober.',
  '{"dialogue": ["Vilken månad är det?", "???"], "blank_index": 1, "options": ["Det är september.", "Det är oktober.", "Det är november.", "Det är augusti."]}'::jsonb,
  '"Det är oktober."'::jsonb,
  '"Det är oktober" = It is October.',
  1, 10, 8
),

-- 9. RECALL from L4: days
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'translation',
  '(Recall) How do you say "Wednesday" in Swedish?',
  'Översätt till svenska.',
  '{"source": "Wednesday", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "onsdag", "alternatives": ["Onsdag"]}'::jsonb,
  'From Lesson 4 — "Onsdag" is named after Oden/Odin.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'matching',
  'Match each season with its Swedish name.',
  'Para ihop årstiderna.',
  '{"pairs": [{"left": "spring", "right": "vår"}, {"left": "summer", "right": "sommar"}, {"left": "autumn", "right": "höst"}, {"left": "winter", "right": "vinter"}]}'::jsonb,
  '[["spring","vår"],["summer","sommar"],["autumn","höst"],["winter","vinter"]]'::jsonb,
  'The four seasons: vår, sommar, höst, vinter.',
  1, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'multiple_choice',
  'Which of these is NOT a summer month in Sweden?',
  'Vilken av dessa är INTE en sommarmånad i Sverige?',
  '{"options": ["juni", "juli", "augusti", "september"]}'::jsonb,
  '"september"'::jsonb,
  'Swedish summer months are juni, juli, augusti. September marks the start of höst (autumn).',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-months-and-seasons'),
  'multiple_choice',
  'How do Swedes write dates?',
  'Hur skriver svenskar datum?',
  '{"options": ["Month/Day/Year (03/15/2024)", "Day/Month/Year (15/03/2024)", "Year-Month-Day (2024-03-15)", "Day.Month.Year (15.03.2024)"]}'::jsonb,
  '"Year-Month-Day (2024-03-15)"'::jsonb,
  'Sweden uses the ISO format: year-month-day. It''s logical — biggest unit first!',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 6: What time is it?
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'What time is it?',
  'Vad är klockan?',
  'a1-2-what-time-is-it',
  'standard',
  $md$# What time is it?

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

> **Swedish Life:** Swedes are famous for punctuality. If someone says "Vi ses klockan tre" (See you at three), they mean 3:00 — not 3:10 or 3:15. Being on time is considered basic politeness. For dinner invitations, arriving 5–10 minutes late is acceptable, but never early! Standing outside the door until exactly the right minute is a very Swedish thing to do.$md$,
  'Klockan, halv, kvart — learn to tell time the Swedish way.',
  TRUE, 18, 6, 'published'
);

-- Exercises for Lesson 6 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'translation',
  'How do you ask "What time is it?" in Swedish?',
  'Hur frågar man "What time is it?" på svenska?',
  '{"source": "What time is it?", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Vad är klockan?", "alternatives": ["vad är klockan?", "Vad är klockan", "Hur mycket är klockan?"]}'::jsonb,
  '"Vad är klockan?" literally means "What is the clock?"',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'translation',
  'How do you say "It''s three o''clock" in Swedish?',
  'Hur säger man "It''s three o''clock" på svenska?',
  '{"source": "It''s three o''clock", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Klockan är tre.", "alternatives": ["Klockan är tre", "klockan är tre"]}'::jsonb,
  '"Klockan är tre" — "Klockan" (the clock) + "är" (is) + the number.',
  1, 10, 2
),

-- 3. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'fill_blank',
  'It''s 2:30. In Swedish: "halv ___"',
  'Klockan är 2:30. På svenska: "halv ___"',
  '{"sentence": "halv ___"}'::jsonb,
  '{"answer": "tre", "alternatives": ["Tre"]}'::jsonb,
  '"Halv tre" = 2:30. Swedish counts towards the NEXT hour, so "half three" means halfway to three.',
  2, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'fill_blank',
  'It''s 3:15. In Swedish: "___ över tre"',
  'Klockan är 3:15. På svenska: "___ över tre"',
  '{"sentence": "___ över tre"}'::jsonb,
  '{"answer": "kvart", "alternatives": ["Kvart"]}'::jsonb,
  '"Kvart över tre" = quarter past three. "Kvart" = quarter, "över" = past.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'fill_blank',
  'It''s 4:45. In Swedish: "kvart ___ fem"',
  'Klockan är 4:45. På svenska: "kvart ___ fem"',
  '{"sentence": "kvart ___ fem"}'::jsonb,
  '{"answer": "i", "alternatives": ["I"]}'::jsonb,
  '"Kvart i fem" = quarter to five. "I" means "to" when telling time.',
  1, 10, 5
),

-- 6. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'drag_drop',
  'Build the question: "What time is it?"',
  'Bygg frågan.',
  '{"words": ["klockan?", "är", "Vad"], "hint": "What time is it?"}'::jsonb,
  '{"answer": ["Vad", "är", "klockan?"]}'::jsonb,
  '"Vad är klockan?" — What is the clock?',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'drag_drop',
  'Build the sentence: "It''s seven o''clock."',
  'Bygg meningen.',
  '{"words": ["sju.", "är", "Klockan"], "hint": "It''s seven o''clock."}'::jsonb,
  '{"answer": ["Klockan", "är", "sju."]}'::jsonb,
  '"Klockan är sju" = It''s seven o''clock.',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'multiple_choice',
  'You ask "Vad är klockan?" and your friend checks their phone. It''s 8:30.',
  'Du frågar "Vad är klockan?" Klockan är 8:30.',
  '{"dialogue": ["Vad är klockan?", "???"], "blank_index": 1, "options": ["Klockan är åtta.", "Halv åtta.", "Halv nio.", "Kvart över åtta."]}'::jsonb,
  '"Halv nio."'::jsonb,
  '"Halv nio" = 8:30. Remember: Swedish counts towards the next hour. Halfway to nine = 8:30.',
  2, 10, 8
),

-- 9. RECALL from L4: days
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'translation',
  '(Recall) How do you say "today" in Swedish?',
  'Översätt till svenska.',
  '{"source": "today", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "idag", "alternatives": ["Idag", "i dag"]}'::jsonb,
  'From Lesson 4 — "Idag" = today.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'matching',
  'Match the times with their Swedish expressions.',
  'Para ihop tiderna.',
  '{"pairs": [{"left": "3:00", "right": "klockan tre"}, {"left": "3:15", "right": "kvart över tre"}, {"left": "3:30", "right": "halv fyra"}, {"left": "3:45", "right": "kvart i fyra"}]}'::jsonb,
  '[["3:00","klockan tre"],["3:15","kvart över tre"],["3:30","halv fyra"],["3:45","kvart i fyra"]]'::jsonb,
  'The four key time expressions: full hour, quarter past, half (to next), quarter to.',
  2, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'multiple_choice',
  'What time is "halv tre"?',
  'Vilken tid är "halv tre"?',
  '{"options": ["2:30", "3:00", "3:30", "2:00"]}'::jsonb,
  '"2:30"'::jsonb,
  '"Halv tre" = halfway to three = 2:30. This is the biggest trap for English speakers!',
  2, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-what-time-is-it'),
  'multiple_choice',
  'What does "kvart i" mean when telling time?',
  'Vad betyder "kvart i" när man berättar klockan?',
  '{"options": ["Quarter past", "Half past", "Quarter to", "At exactly"]}'::jsonb,
  '"Quarter to"'::jsonb,
  '"Kvart i" = quarter to. "Kvart i fem" = quarter to five (4:45). "I" means "to/before."',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 7: Your daily schedule
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Your daily schedule',
  'Din dagliga rutin',
  'a1-2-your-daily-schedule',
  'standard',
  $md$# Your daily schedule

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

> **Swedish Life:** **Fika** is Sweden's most beloved tradition — a coffee break with something sweet (often a kanelbulle, cinnamon bun). Most workplaces have a scheduled fika, and it's seen as essential, not optional. Skipping fika is like refusing to be social. "Ska vi fika?" (Shall we have fika?) is one of the most important questions in Swedish culture.$md$,
  'Describe your day using times, meals, and everyday verbs — plus learn about the Swedish fika tradition.',
  TRUE, 15, 7, 'published'
);

-- Exercises for Lesson 7 (12 exercises)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'translation',
  'How do you say "I wake up at seven" in Swedish?',
  'Hur säger man "I wake up at seven" på svenska?',
  '{"source": "I wake up at seven", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag vaknar klockan sju", "alternatives": ["Jag vaknar klockan sju.", "jag vaknar klockan sju"]}'::jsonb,
  '"Vaknar" = wake up. "Klockan sju" = at seven o''clock.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'translation',
  'How do you say "breakfast" in Swedish?',
  'Hur säger man "breakfast" på svenska?',
  '{"source": "breakfast", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "frukost", "alternatives": ["Frukost"]}'::jsonb,
  '"Frukost" — Sweden''s first meal of the day, typically around 7–8.',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'translation',
  'How do you say "every day" in Swedish?',
  'Hur säger man "every day" på svenska?',
  '{"source": "every day", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "varje dag", "alternatives": ["Varje dag"]}'::jsonb,
  '"Varje" = every, "dag" = day. "Varje dag" = every day.',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'fill_blank',
  'Complete: "Jag äter ___ klockan tolv." (I eat lunch at twelve.)',
  'Fyll i: "Jag äter ___ klockan tolv."',
  '{"sentence": "Jag äter ___ klockan tolv."}'::jsonb,
  '{"answer": "lunch", "alternatives": ["Lunch"]}'::jsonb,
  '"Lunch" is the same word in Swedish! Typically eaten between 11:30 and 13:00.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'fill_blank',
  'Complete: "Jag ___ från nio till fem." (I work from nine to five.)',
  'Fyll i: "Jag ___ från nio till fem."',
  '{"sentence": "Jag ___ från nio till fem."}'::jsonb,
  '{"answer": "arbetar", "alternatives": ["Arbetar"]}'::jsonb,
  '"Arbetar" = work. "Från... till..." = from... to...',
  1, 10, 5
),

-- 6. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'fill_blank',
  'Complete: "Vi äter ___ klockan sex." (We eat dinner at six.)',
  'Fyll i: "Vi äter ___ klockan sex."',
  '{"sentence": "Vi äter ___ klockan sex."}'::jsonb,
  '{"answer": "middag", "alternatives": ["Middag"]}'::jsonb,
  '"Middag" means dinner — despite looking like "midday." Swedes eat dinner around 17–19.',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'drag_drop',
  'Build the sentence: "I eat breakfast at eight."',
  'Bygg meningen.',
  '{"words": ["klockan", "frukost", "Jag", "åtta.", "äter"], "hint": "I eat breakfast at eight."}'::jsonb,
  '{"answer": ["Jag", "äter", "frukost", "klockan", "åtta."]}'::jsonb,
  '"Jag äter frukost klockan åtta" — Subject + Verb + Object + Time.',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'multiple_choice',
  'Someone asks: "Hur ser din dag ut?" (What does your day look like?) You wake up at 6.',
  'Någon frågar: "Hur ser din dag ut?" Du vaknar klockan 6.',
  '{"dialogue": ["Hur ser din dag ut?", "???", "Tidigt! Jag vaknar halv åtta."], "blank_index": 1, "options": ["Jag heter Anna.", "Jag vaknar klockan sex.", "Bra, tack!", "Idag är det måndag."]}'::jsonb,
  '"Jag vaknar klockan sex."'::jsonb,
  'Start describing your day with when you wake up: "Jag vaknar klockan..."',
  1, 10, 8
),

-- 9. RECALL from L6: time
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'multiple_choice',
  '(Recall) What time is "halv åtta"?',
  'Vilken tid är "halv åtta"?',
  '{"options": ["7:00", "7:30", "8:00", "8:30"]}'::jsonb,
  '"7:30"'::jsonb,
  'From Lesson 6 — "Halv åtta" = halfway to eight = 7:30.',
  2, 10, 9
),

-- 10. RECALL from L4: days
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'fill_blank',
  '(Recall) Complete the week: fredag, ___, söndag',
  'Fyll i veckodagen.',
  '{"sentence": "fredag, ___, söndag"}'::jsonb,
  '{"answer": "lördag", "alternatives": ["Lördag"]}'::jsonb,
  'From Lesson 4 — "Lördag" (Saturday) comes between fredag and söndag.',
  1, 10, 10
),

-- 11. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'matching',
  'Match the Swedish meals with their English names.',
  'Para ihop måltiderna.',
  '{"pairs": [{"left": "frukost", "right": "breakfast"}, {"left": "lunch", "right": "lunch"}, {"left": "fika", "right": "coffee break"}, {"left": "middag", "right": "dinner"}]}'::jsonb,
  '[["frukost","breakfast"],["lunch","lunch"],["fika","coffee break"],["middag","dinner"]]'::jsonb,
  'Fika is the most Swedish of these — a sacred coffee break with something sweet!',
  1, 15, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-daily-schedule'),
  'multiple_choice',
  'What does "Ska vi fika?" mean?',
  'Vad betyder "Ska vi fika?"',
  '{"options": ["Shall we eat dinner?", "Shall we go home?", "Shall we have a coffee break?", "Shall we work?"]}'::jsonb,
  '"Shall we have a coffee break?"'::jsonb,
  '"Ska vi fika?" = Shall we have fika? One of the most important questions in Swedish culture!',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 8: Your Swedish week (review)
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 2),
  'Your Swedish week',
  'Din svenska vecka',
  'a1-2-your-swedish-week',
  'standard',
  $md$# Your Swedish week

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

> **Swedish Life:** Swedes love planning. "Spontaneous" meetups often still get scheduled days in advance: "Vi ses klockan tre på onsdag" (See you at three on Wednesday). If you suggest meeting "sometime," a Swede will immediately want to pick a day and time. It's not unfriendly — it's efficient!$md$,
  'Put it all together — make plans, go shopping, and talk about your week in Swedish.',
  TRUE, 12, 8, 'published'
);

-- Exercises for Lesson 8 (14 exercises — review lesson)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation (recall numbers)
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'translation',
  'How do you say "seventy-five" in Swedish?',
  'Översätt till svenska.',
  '{"source": "seventy-five", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "sjuttiofem", "alternatives": ["Sjuttiofem", "sjuttio fem"]}'::jsonb,
  '"Sjuttiofem" = sjuttio (70) + fem (5). Compound numbers are straightforward!',
  2, 10, 1
),

-- 2. Translation (recall time)
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'translation',
  'How do you say "What time is it?" in Swedish?',
  'Översätt till svenska.',
  '{"source": "What time is it?", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Vad är klockan?", "alternatives": ["vad är klockan?", "Hur mycket är klockan?"]}'::jsonb,
  '"Vad är klockan?" — literally "What is the clock?"',
  1, 10, 2
),

-- 3. Translation (recall days)
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'translation',
  'How do you say "See you on Friday" in Swedish?',
  'Översätt till svenska.',
  '{"source": "See you on Friday", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Vi ses på fredag", "alternatives": ["Vi ses på fredag.", "vi ses på fredag"]}'::jsonb,
  '"Vi ses" (see you) + "på fredag" (on Friday). Remember: no capital on "fredag"!',
  1, 10, 3
),

-- 4. Fill blank (recall schedule)
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'fill_blank',
  'Complete: "Jag ___ klockan sju." (I wake up at seven.)',
  'Fyll i.',
  '{"sentence": "Jag ___ klockan sju."}'::jsonb,
  '{"answer": "vaknar", "alternatives": ["Vaknar"]}'::jsonb,
  '"Vaknar" = wake up. One of the essential daily routine verbs.',
  1, 10, 4
),

-- 5. Fill blank (recall time)
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'fill_blank',
  'It''s 5:30. In Swedish: "___ sex"',
  'Klockan är 5:30. På svenska: "___ sex"',
  '{"sentence": "___ sex"}'::jsonb,
  '{"answer": "halv", "alternatives": ["Halv"]}'::jsonb,
  '"Halv sex" = 5:30 (halfway to six). The Swedish half-hour counts towards the next hour.',
  2, 10, 5
),

-- 6. Fill blank (recall months)
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'fill_blank',
  'The Swedish word for "autumn" is ___.',
  'Det svenska ordet för "autumn" är ___.',
  '{"sentence": "The Swedish word for autumn is ___."}'::jsonb,
  '{"answer": "höst", "alternatives": ["Höst"]}'::jsonb,
  '"Höst" — the season of colourful leaves (september, oktober, november).',
  1, 10, 6
),

-- 7. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'drag_drop',
  'Build the sentence: "How much does it cost?"',
  'Bygg frågan.',
  '{"words": ["kostar", "mycket", "det?", "Hur"], "hint": "How much does it cost?"}'::jsonb,
  '{"answer": ["Hur", "mycket", "kostar", "det?"]}'::jsonb,
  '"Hur mycket kostar det?" — the essential shopping question.',
  1, 10, 7
),

-- 8. Conversation: making plans
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'multiple_choice',
  'Your friend suggests fika. You want to agree enthusiastically.',
  'Din vän föreslår fika. Du vill gärna.',
  '{"dialogue": ["Ska vi fika på onsdag?", "???", "Klockan tre? På kaféet?", "Perfekt!"], "blank_index": 1, "options": ["Nej, tack.", "Ja, jättegärna!", "Hej då!", "Jag vaknar tidigt."]}'::jsonb,
  '"Ja, jättegärna!"'::jsonb,
  '"Jättegärna" = very gladly / I''d love to. "Jätte-" makes everything bigger!',
  1, 10, 8
),

-- 9. Conversation: at the shop
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'multiple_choice',
  'You''re buying something that costs 42 kronor. The shopkeeper says the price. Which one is correct?',
  'Du köper något som kostar 42 kronor.',
  '{"dialogue": ["Hur mycket kostar det?", "???"], "blank_index": 1, "options": ["Trettiofem kronor.", "Fyrtiotvå kronor.", "Femtiotre kronor.", "Tjugofyra kronor."]}'::jsonb,
  '"Fyrtiotvå kronor."'::jsonb,
  '"Fyrtiotvå" = fyrtio (40) + två (2) = 42.',
  2, 10, 9
),

-- 10. Conversation: weekly schedule
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'multiple_choice',
  'Someone asks what you do on Saturday. You sleep until ten.',
  'Någon frågar vad du gör på lördag. Du sover till tio.',
  '{"dialogue": ["Vad gör du på lördag?", "???"], "blank_index": 1, "options": ["Jag arbetar från åtta till fyra.", "Jag vaknar klockan sex.", "Jag sover till tio!", "Jag äter lunch klockan tolv."]}'::jsonb,
  '"Jag sover till tio!"'::jsonb,
  '"Jag sover till tio" = I sleep until ten. "Sover" = sleep, "till" = until.',
  1, 10, 10
),

-- 11. Conversation: telling your age
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'multiple_choice',
  'Someone asks "Hur gammal är du?" You are 25.',
  'Någon frågar "Hur gammal är du?" Du är 25.',
  '{"dialogue": ["Hur gammal är du?", "???"], "blank_index": 1, "options": ["Jag är tjugofem år.", "Jag är trettio år.", "Jag är femton år.", "Jag är tjugo år."]}'::jsonb,
  '"Jag är tjugofem år."'::jsonb,
  '"Jag är tjugofem år" = I am twenty-five years old.',
  1, 10, 11
),

-- 12. Matching: full unit review
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'matching',
  'Match the Swedish phrases with their meanings.',
  'Para ihop fraserna.',
  '{"pairs": [{"left": "Hur mycket kostar det?", "right": "How much does it cost?"}, {"left": "Vad är klockan?", "right": "What time is it?"}, {"left": "Vilken dag är det idag?", "right": "What day is it today?"}, {"left": "Ska vi fika?", "right": "Shall we have fika?"}, {"left": "Jag vaknar klockan sju.", "right": "I wake up at seven."}]}'::jsonb,
  '[["Hur mycket kostar det?","How much does it cost?"],["Vad är klockan?","What time is it?"],["Vilken dag är det idag?","What day is it today?"],["Ska vi fika?","Shall we have fika?"],["Jag vaknar klockan sju.","I wake up at seven."]]'::jsonb,
  'Five essential Unit 2 phrases covering numbers, time, days, and daily life.',
  1, 15, 12
),

-- 13. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'multiple_choice',
  'What time is "halv nio"?',
  'Vilken tid är "halv nio"?',
  '{"options": ["8:00", "8:30", "9:00", "9:30"]}'::jsonb,
  '"8:30"'::jsonb,
  '"Halv nio" = halfway to nine = 8:30. The Swedish half-hour always counts towards the next hour.',
  2, 10, 13
),

-- 14. Multiple choice: RECALL from Unit 1
(
  (SELECT id FROM lessons WHERE slug = 'a1-2-your-swedish-week'),
  'multiple_choice',
  '(Recall) What does "Trevligt att träffas" mean?',
  'Vad betyder "Trevligt att träffas"?',
  '{"options": ["See you later", "Nice to meet you", "How are you?", "You''re welcome"]}'::jsonb,
  '"Nice to meet you"'::jsonb,
  'From Unit 1 — "Trevligt att träffas" is said when meeting someone for the first time.',
  1, 10, 14
);
