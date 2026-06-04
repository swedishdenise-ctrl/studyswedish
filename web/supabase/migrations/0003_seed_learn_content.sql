-- ============================================================
-- Seed content for the Learn experience
-- Purpose: 3 A1 units (first 2 free, 3rd premium) with lessons
-- and a handful of exercises so /learn has something to render.
-- All content is placeholder copy — Denise will replace it later.
-- ============================================================

-- ------------------------------------------------------------
-- UNIT A1-1: Hej och välkommen! (FREE)
-- ------------------------------------------------------------
WITH unit1 AS (
  INSERT INTO units (level, unit_number, title, title_sv, description, learning_objectives, icon_emoji, is_free, estimated_hours, status, order_index)
  VALUES (
    'A1', 1,
    'Hello and welcome',
    'Hej och välkommen!',
    'Your first steps in Swedish — greet people, introduce yourself, and learn the sounds of the language.',
    ARRAY['Greet people at different times of day', 'Introduce yourself and ask someone''s name', 'Recognise the Swedish alphabet including å, ä, ö'],
    '👋', TRUE, 2.0, 'published', 1
  )
  RETURNING id
)
INSERT INTO lessons (unit_id, title, title_sv, slug, lesson_type, content_md, summary, is_free, estimated_minutes, order_index, status)
SELECT id, t.title, t.title_sv, t.slug, 'standard', t.content_md, t.summary, TRUE, t.est, t.ord, 'published'
FROM unit1, (VALUES
  (
    'Saying hello',
    'Att säga hej',
    'a1-1-saying-hello',
    E'# Saying hello in Swedish\n\nThe most common Swedish greeting is **hej** — use it any time of day, with anyone.\n\n## The essentials\n\n| Swedish | English | When to use |\n| --- | --- | --- |\n| Hej | Hi / Hello | Anytime, anyone |\n| Hej hej | Hi there! | Friendly, informal |\n| God morgon | Good morning | Before ~10am |\n| God dag | Good day | Formal greeting |\n| God kväll | Good evening | After ~5pm |\n| Hej då | Goodbye | Leaving |\n\n## A note on formality\n\nModern Swedish is famously informal. You can use **hej** with your boss, your neighbour, or the prime minister — no one will blink.',
    'Learn hej, god morgon, and hej då — the greetings you''ll use every day.',
    10, 1
  ),
  (
    'Introducing yourself',
    'Att presentera sig',
    'a1-1-introducing-yourself',
    E'# Introducing yourself\n\n## The pattern\n\n> **Jag heter [name].**\n> *I am called [name].*\n\nSwedish uses **heter** (literally "am called") where English uses "my name is".\n\n## Asking back\n\n> **Vad heter du?**\n> *What are you called? / What''s your name?*\n\n## A full mini-dialogue\n\n— Hej! Jag heter Denise. Vad heter du?\n— Hej! Jag heter Anna. Trevligt att träffas!\n— Trevligt att träffas! *(Nice to meet you!)*',
    'Use "Jag heter…" and "Vad heter du?" to introduce yourself.',
    15, 2
  ),
  (
    'The Swedish alphabet',
    'Det svenska alfabetet',
    'a1-1-the-swedish-alphabet',
    E'# The Swedish alphabet\n\nSwedish uses the same 26 letters as English, **plus three extra vowels at the end**: å, ä, ö.\n\n## The three extra letters\n\n- **Å å** — like the "o" in *more*\n- **Ä ä** — like the "e" in *bed* (or "a" in *cat* before r)\n- **Ö ö** — like the "i" in *bird*\n\nThese are not "a" and "o" with accents — they are separate letters. In a Swedish dictionary, they come *after* z.\n\n## Why it matters\n\nIf you type **ar** when you mean **är** ("is"), Swedes will understand, but you''re misspelling it. Treat å, ä, ö as three new letters and you''ll have an easier time.',
    'Meet å, ä, and ö — the three letters that make Swedish look Swedish.',
    15, 3
  )
) AS t(title, title_sv, slug, content_md, summary, est, ord);

-- ------------------------------------------------------------
-- UNIT A1-2: Siffror och tid (FREE)
-- ------------------------------------------------------------
WITH unit2 AS (
  INSERT INTO units (level, unit_number, title, title_sv, description, learning_objectives, icon_emoji, is_free, estimated_hours, status, order_index)
  VALUES (
    'A1', 2,
    'Numbers and time',
    'Siffror och tid',
    'Count from zero to a hundred, tell the time, and say the days of the week.',
    ARRAY['Count 0–100 in Swedish', 'Ask and tell the time', 'Say the days of the week and months'],
    '🕐', TRUE, 2.5, 'published', 2
  )
  RETURNING id
)
INSERT INTO lessons (unit_id, title, title_sv, slug, lesson_type, content_md, summary, is_free, estimated_minutes, order_index, status)
SELECT id, t.title, t.title_sv, t.slug, 'standard', t.content_md, t.summary, TRUE, t.est, t.ord, 'published'
FROM unit2, (VALUES
  (
    'Numbers 0 to 20',
    'Siffror 0–20',
    'a1-2-numbers-0-to-20',
    E'# Numbers 0 to 20\n\n| # | Swedish | # | Swedish |\n| --- | --- | --- | --- |\n| 0 | noll | 11 | elva |\n| 1 | ett | 12 | tolv |\n| 2 | två | 13 | tretton |\n| 3 | tre | 14 | fjorton |\n| 4 | fyra | 15 | femton |\n| 5 | fem | 16 | sexton |\n| 6 | sex | 17 | sjutton |\n| 7 | sju | 18 | arton |\n| 8 | åtta | 19 | nitton |\n| 9 | nio | 20 | tjugo |\n| 10 | tio | | |',
    'The first 21 numbers — the foundation for everything number-related.',
    15, 1
  ),
  (
    'Days of the week',
    'Veckans dagar',
    'a1-2-days-of-the-week',
    E'# Days of the week\n\n| Swedish | English |\n| --- | --- |\n| måndag | Monday |\n| tisdag | Tuesday |\n| onsdag | Wednesday |\n| torsdag | Thursday |\n| fredag | Friday |\n| lördag | Saturday |\n| söndag | Sunday |\n\n**Note:** Swedish day and month names are not capitalised.\n\n## Useful phrases\n\n- **Vilken dag är det idag?** — *What day is it today?*\n- **Idag är det måndag.** — *Today is Monday.*\n- **I morgon är det tisdag.** — *Tomorrow is Tuesday.*',
    'Måndag to söndag — and how to say what day it is.',
    10, 2
  )
) AS t(title, title_sv, slug, content_md, summary, est, ord);

-- ------------------------------------------------------------
-- UNIT A1-3: Mat och dryck (PREMIUM — to demonstrate gating)
-- ------------------------------------------------------------
WITH unit3 AS (
  INSERT INTO units (level, unit_number, title, title_sv, description, learning_objectives, icon_emoji, is_free, estimated_hours, status, order_index)
  VALUES (
    'A1', 3,
    'Food and drink',
    'Mat och dryck',
    'Order at a café, read a menu, and talk about what you like to eat and drink.',
    ARRAY['Order food and drinks at a café', 'Read a simple Swedish menu', 'Express food preferences with "jag gillar" and "jag vill ha"'],
    '🍽️', FALSE, 3.0, 'published', 3
  )
  RETURNING id
)
INSERT INTO lessons (unit_id, title, title_sv, slug, lesson_type, content_md, summary, is_free, estimated_minutes, order_index, status)
SELECT id, t.title, t.title_sv, t.slug, 'standard', t.content_md, t.summary, FALSE, t.est, t.ord, 'published'
FROM unit3, (VALUES
  (
    'At the café',
    'På kaféet',
    'a1-3-at-the-cafe',
    E'# At the café\n\n[Premium lesson content — this would teach fika vocabulary, ordering phrases, and a sample café dialogue.]',
    'Order a kaffe and a kanelbulle like a local.',
    20, 1
  ),
  (
    'Reading a menu',
    'Att läsa en meny',
    'a1-3-reading-a-menu',
    E'# Reading a menu\n\n[Premium lesson content — common menu categories, typical Swedish dishes, and how to ask about ingredients.]',
    'Decode a Swedish menu without panic.',
    20, 2
  )
) AS t(title, title_sv, slug, content_md, summary, est, ord);

-- ------------------------------------------------------------
-- A few exercises attached to the first lesson so the
-- exercise viewer has something real to render later.
-- ------------------------------------------------------------
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index)
SELECT
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice'::exercise_type,
  'Which greeting would you use in the morning?',
  'Vilken hälsning använder du på morgonen?',
  '{"options":["Hej då","God morgon","God kväll","Tack"]}'::jsonb,
  '"God morgon"'::jsonb,
  'God morgon literally means "good morning" and is used before roughly 10am.',
  1, 10, 1;

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index)
SELECT
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice'::exercise_type,
  'How do you say goodbye?',
  'Hur säger man hej då?',
  '{"options":["Hej","Hej då","God dag","Tack"]}'::jsonb,
  '"Hej då"'::jsonb,
  'Hej då is the standard way to say goodbye.',
  1, 10, 2;

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index)
SELECT
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'fill_blank'::exercise_type,
  'Complete the sentence: "Jag ___ Denise."',
  'Fyll i: "Jag ___ Denise."',
  '{"sentence":"Jag ___ Denise.","blank_index":1}'::jsonb,
  '"heter"'::jsonb,
  'Swedish uses "heter" (am called) where English uses "my name is".',
  1, 10, 1;
