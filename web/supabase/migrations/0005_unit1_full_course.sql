-- ============================================================
-- UNIT 1 FULL COURSE: Hej och välkommen!
--
-- Replaces the thin 3-lesson seed with a comprehensive 8-lesson
-- unit designed to take a true beginner through their first
-- real Swedish conversations.
--
-- Lessons:
--   1. Saying hello
--   2. Introducing yourself
--   3. The Swedish alphabet
--   4. Swedish sounds: the vowels
--   5. Useful little words
--   6. How are you?
--   7. Where are you from?
--   8. Your first conversation (review)
--
-- Each lesson has 6 exercises mixing:
--   multiple_choice, fill_blank, translation, matching, ordering
-- ============================================================

-- Wipe previous Unit 1 (cascades to lessons → exercises)
DELETE FROM units WHERE level = 'A1' AND unit_number = 1;

-- ────────────────────────────────────────────────────────────
-- THE UNIT
-- ────────────────────────────────────────────────────────────
INSERT INTO units (
  level, unit_number, title, title_sv, description,
  learning_objectives, icon_emoji, is_free,
  estimated_hours, status, order_index
) VALUES (
  'A1', 1,
  'Hello and welcome',
  'Hej och välkommen!',
  'Your first steps in Swedish — greet people, introduce yourself, learn the sounds of the language, and have your very first conversation.',
  ARRAY[
    'Greet people at different times of day',
    'Introduce yourself and ask someone''s name',
    'Recognise the 29 letters of the Swedish alphabet including å, ä, ö',
    'Pronounce Swedish vowels correctly',
    'Use essential polite words (tack, ursäkta, varsågod)',
    'Ask and answer "How are you?"',
    'Say where you come from',
    'Hold a simple first conversation in Swedish'
  ],
  '👋', TRUE, 3.0, 'published', 1
);

-- ────────────────────────────────────────────────────────────
-- LESSON 1: Saying hello
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'Saying hello',
  'Att säga hej',
  'a1-1-saying-hello',
  'standard',
  $md$# Saying hello in Swedish

Every language journey begins the same way — with a greeting. In Swedish, it's **hej**, and it's the only greeting most Swedes use 90% of the time.

## Your first word: hej

**Hej** (sounds like English "hey") works everywhere, with everyone, at any time of day. Use it with your boss, your neighbour, a shop assistant, even the King of Sweden. Swedish is one of the world's most informal languages.

## Greetings for different times of day

While **hej** always works, Swedish also has time-specific greetings:

| Swedish | English | When to use | Sounds like |
| --- | --- | --- | --- |
| **Hej** | Hello / Hi | Anytime | "hey" |
| **Hej hej** | Hi there! | Casual, friendly | "hey hey" |
| **God morgon** | Good morning | Until about 10 am | "goo MOR-on" |
| **God dag** | Good day | Formal, daytime | "goo dahg" |
| **God kväll** | Good evening | After about 5 pm | "goo kvell" |

## Saying goodbye

| Swedish | English | Sounds like |
| --- | --- | --- |
| **Hej då** | Goodbye | "hey doh" |
| **Vi ses** | See you | "vee sess" |
| **Ha det bra** | Take care | "hah deh brah" |

## Your first dialogue

> — Hej!
> — Hej hej!
> — *(later)*
> — Hej då!
> — Hej då! Vi ses!

Yes, it really is that simple.

> **Swedish Life:** In the 1960s, Sweden went through what's called the *du-reformen* — almost everyone stopped using the formal "Ni" (you, polite) and switched to "du" (you, casual) in nearly all situations. Today, using "Ni" can actually sound strange or old-fashioned. Just say **hej** and **du** and you'll fit right in.$md$,
  'Learn hej, god morgon, and hej då — the greetings you''ll use every day.',
  TRUE, 12, 1, 'published'
);

-- Exercises for Lesson 1
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice',
  'Which greeting would you use at 8 in the morning?',
  'Vilken hälsning använder du klockan 8 på morgonen?',
  '{"options": ["Hej då", "God morgon", "God kväll", "God dag"]}'::jsonb,
  '"God morgon"'::jsonb,
  '"God morgon" means "good morning" and is used until about 10 am.',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice',
  'How do you say goodbye in Swedish?',
  'Hur säger man "goodbye" på svenska?',
  '{"options": ["Hej", "Tack", "Hej då", "God dag"]}'::jsonb,
  '"Hej då"'::jsonb,
  '"Hej då" is the standard way to say goodbye. Think of it as "hey then" — you''re waving as you leave.',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'matching',
  'Match the Swedish greetings with their English meanings.',
  'Para ihop de svenska hälsningarna med deras engelska betydelser.',
  '{"pairs": [{"left": "Hej", "right": "Hello"}, {"left": "God morgon", "right": "Good morning"}, {"left": "Hej då", "right": "Goodbye"}, {"left": "God kväll", "right": "Good evening"}]}'::jsonb,
  '[["Hej","Hello"],["God morgon","Good morning"],["Hej då","Goodbye"],["God kväll","Good evening"]]'::jsonb,
  'These four greetings will cover 95% of your greeting needs in Sweden.',
  1, 15, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'translation',
  'How do you say "Good morning" in Swedish?',
  'Hur säger man "Good morning" på svenska?',
  '{"source": "Good morning", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "God morgon", "alternatives": ["god morgon"]}'::jsonb,
  '"God morgon" — two words, just like English.',
  1, 10, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'fill_blank',
  'Complete the evening greeting: "God ___"',
  'Fyll i kvällshälsningen: "God ___"',
  '{"sentence": "God ___"}'::jsonb,
  '{"answer": "kväll", "alternatives": ["Kväll"]}'::jsonb,
  '"God kväll" means "good evening" — use it after about 5 pm.',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'drag_drop',
  'Put the words in the correct order to say "Good morning".',
  'Sätt orden i rätt ordning.',
  '{"words": ["morgon", "God"], "hint": "Good morning"}'::jsonb,
  '{"answer": ["God", "morgon"]}'::jsonb,
  'Just like English — the adjective (god = good) comes first.',
  1, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 2: Introducing yourself
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'Introducing yourself',
  'Att presentera sig',
  'a1-1-introducing-yourself',
  'standard',
  $md$# Introducing yourself

Now that you can say hello, let's learn to say who you are.

## The magic phrase: Jag heter...

In English you say "My name is..." but Swedish does it differently:

> **Jag heter Anna.**
> *I am called Anna.* (literally: "I am-named Anna")

**Jag** = I, **heter** = am called. Don't try to translate "my name is" word-for-word — just learn "Jag heter" as a single phrase.

## Asking someone's name

> **Vad heter du?**
> *What are you called? / What's your name?*

| Swedish | English | Sounds like |
| --- | --- | --- |
| **Jag heter...** | My name is... | "yah HEH-ter" |
| **Vad heter du?** | What's your name? | "vah HEH-ter doo" |
| **Trevligt att träffas!** | Nice to meet you! | "TREV-lit att TREF-fas" |

## A full introduction

> — Hej! Jag heter Denise. Vad heter du?
> — Hej! Jag heter Erik. Trevligt att träffas!
> — Trevligt att träffas!

Notice how both people say "Trevligt att träffas" — it goes both ways, just like in English.

## Quick note: du vs. ni

**Du** means "you" (one person). You'll also see **ni** which means "you" (several people). For now, just use **du** — it's what Swedes use in almost every situation.

> **Swedish Life:** Swedish names often end in *-sson* (Johansson, Andersson, Eriksson). These are patronymic — they originally meant "son of Johan," etc. About a third of all Swedes have a name ending in *-son* or *-sson*.$md$,
  'Use "Jag heter…" and "Vad heter du?" to introduce yourself.',
  TRUE, 15, 2, 'published'
);

-- Exercises for Lesson 2
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'fill_blank',
  'Complete the sentence: "Jag ___ Anna."',
  'Fyll i: "Jag ___ Anna."',
  '{"sentence": "Jag ___ Anna."}'::jsonb,
  '{"answer": "heter", "alternatives": ["Heter"]}'::jsonb,
  '"Jag heter" means "I am called" — it''s how Swedes say their name.',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'multiple_choice',
  'How do you ask someone''s name in Swedish?',
  'Hur frågar man om någons namn på svenska?',
  '{"options": ["Jag heter du?", "Vad heter du?", "Hej heter du?", "Du heter vad?"]}'::jsonb,
  '"Vad heter du?"'::jsonb,
  '"Vad heter du?" literally means "What are you called?"',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'translation',
  'Translate to Swedish: "My name is Erik"',
  'Översätt till svenska: "My name is Erik"',
  '{"source": "My name is Erik", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag heter Erik", "alternatives": ["jag heter Erik", "Jag heter erik"]}'::jsonb,
  'Remember: Swedish says "I am called" (Jag heter) instead of "my name is."',
  1, 10, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'drag_drop',
  'Put the words in order to ask someone''s name.',
  'Sätt orden i rätt ordning för att fråga om någons namn.',
  '{"words": ["du?", "heter", "Vad"], "hint": "What is your name?"}'::jsonb,
  '{"answer": ["Vad", "heter", "du?"]}'::jsonb,
  'Swedish question word order: Question word + Verb + Subject (Vad heter du?).',
  1, 10, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'multiple_choice',
  'What does "Trevligt att träffas" mean?',
  'Vad betyder "Trevligt att träffas"?',
  '{"options": ["See you later", "Nice to meet you", "How are you?", "Thank you"]}'::jsonb,
  '"Nice to meet you"'::jsonb,
  '"Trevligt" means "nice/pleasant" and "träffas" means "to meet." Together: "Nice to meet you!"',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'fill_blank',
  'Complete: "Trevligt att ___!"',
  'Fyll i: "Trevligt att ___!"',
  '{"sentence": "Trevligt att ___!"}'::jsonb,
  '{"answer": "träffas", "alternatives": ["Träffas"]}'::jsonb,
  '"Trevligt att träffas" is what you say when meeting someone for the first time.',
  1, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 3: The Swedish alphabet
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'The Swedish alphabet',
  'Det svenska alfabetet',
  'a1-1-the-swedish-alphabet',
  'standard',
  $md$# The Swedish alphabet

Swedish uses the same 26 letters as English, **plus three extra vowels** at the very end: **å**, **ä**, **ö**. That makes 29 letters total.

## The full alphabet

A B C D E F G H I J K L M N O P Q R S T U V W X Y Z **Å Ä Ö**

## The three extra letters

These are not "a with a ring" or "o with dots" — they are their own letters, as distinct as A and B.

| Letter | Sounds like | Example word |
| --- | --- | --- |
| **Å å** | "o" in English "more" | **åtta** (eight) |
| **Ä ä** | "e" in English "bed" | **äpple** (apple) |
| **Ö ö** | "i" in English "bird" | **öl** (beer) |

## Where do they go?

In a Swedish dictionary, phone book, or any alphabetical list, the order is:

**...X, Y, Z, Å, Ä, Ö**

This means a word like **ål** (eel) comes *after* all Z-words, not with the A-words.

## Why it matters

If you type **ar** when you mean **är** (the word for "is"), you're not just misspelling — you're writing a completely different word. **Ar** means nothing in standard Swedish, but **är** is one of the most important words in the language.

Similarly:
- **for** doesn't exist, but **för** means "for"
- **on** doesn't exist, but **ön** means "the island"

> **Swedish Life:** Swedish keyboards have dedicated keys for å, ä, and ö — they sit to the right of L and P. If you're on a non-Swedish keyboard, you can usually type them by holding Alt and using number codes, or by switching your keyboard layout to Swedish in your computer's settings. On phones, long-press A for å/ä and O for ö.$md$,
  'Meet å, ä, and ö — the three letters that make Swedish look Swedish.',
  TRUE, 15, 3, 'published'
);

-- Exercises for Lesson 3
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'multiple_choice',
  'How many letters are in the Swedish alphabet?',
  'Hur många bokstäver finns det i det svenska alfabetet?',
  '{"options": ["26", "27", "28", "29"]}'::jsonb,
  '"29"'::jsonb,
  'The 26 English letters plus three more: å, ä, and ö.',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'multiple_choice',
  'Which three letters come after Z in the Swedish alphabet?',
  'Vilka tre bokstäver kommer efter Z i det svenska alfabetet?',
  '{"options": ["Ä, Ö, Å", "Å, Ä, Ö", "Ö, Å, Ä", "Å, Ö, Ä"]}'::jsonb,
  '"Å, Ä, Ö"'::jsonb,
  'The correct order is Å, Ä, Ö — always in this sequence after Z.',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'matching',
  'Match each Swedish letter to its approximate English sound.',
  'Para ihop varje svensk bokstav med dess ungefärliga engelska ljud.',
  '{"pairs": [{"left": "Å", "right": "\"o\" in more"}, {"left": "Ä", "right": "\"e\" in bed"}, {"left": "Ö", "right": "\"i\" in bird"}]}'::jsonb,
  '[["Å","\"o\" in more"],["Ä","\"e\" in bed"],["Ö","\"i\" in bird"]]'::jsonb,
  'These sound approximations will help you get close. Listening to native speakers will fine-tune your ear.',
  1, 15, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'multiple_choice',
  'In a Swedish dictionary, where would you find the word "ål" (eel)?',
  'Var i en svensk ordbok hittar du ordet "ål"?',
  '{"options": ["With the A-words", "With the O-words", "After all Z-words", "Before the A-words"]}'::jsonb,
  '"After all Z-words"'::jsonb,
  'Å comes after Z in the Swedish alphabet, so "ål" appears at the very end of the dictionary.',
  1, 10, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'translation',
  'The Swedish word for "apple" uses the letter ä. Can you write it?',
  'Det svenska ordet för "apple" använder bokstaven ä. Kan du skriva det?',
  '{"source": "apple", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "äpple", "alternatives": ["Äpple"]}'::jsonb,
  '"Äpple" — notice the ä at the start. It sounds like the "e" in "bed" + "pple."',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'drag_drop',
  'Put these letters in correct Swedish alphabetical order.',
  'Sätt dessa bokstäver i rätt svensk alfabetisk ordning.',
  '{"words": ["Ö", "Z", "Å", "Ä"], "hint": "The end of the Swedish alphabet"}'::jsonb,
  '{"answer": ["Z", "Å", "Ä", "Ö"]}'::jsonb,
  'After Z comes Å, then Ä, then Ö — the last three letters of the Swedish alphabet.',
  1, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 4: Swedish sounds — the vowels
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'Swedish sounds: the vowels',
  'Svenska ljud: vokalerna',
  'a1-1-swedish-sounds-vowels',
  'standard',
  $md$# Swedish sounds: the vowels

Swedish has **9 vowels**: a, e, i, o, u, y, å, ä, ö. That's more than English, and several of them sound quite different from what you might expect.

## The 9 Swedish vowels

Each vowel can be **long** or **short**. Long vowels happen in open syllables or before a single consonant. Short vowels happen before double consonants.

| Vowel | Long sound | Example | Short sound | Example |
| --- | --- | --- | --- | --- |
| **a** | "ah" as in "father" | **tal** (speech) | short "a" | **tall** (pine tree) |
| **e** | "ay" as in "day" | **lek** (play) | "eh" as in "bed" | **lett** (easy) |
| **i** | "ee" as in "see" | **bil** (car) | short "i" as in "sit" | **till** (to) |
| **o** | "oo" as in "cool" | **bok** (book) | "o" as in "hot" | **bott** (lived) |
| **u** | rounded "oo" | **hus** (house) | short rounded "u" | **hund** (dog) |
| **y** | rounded "ee" (purse your lips and say "ee") | **by** (village) | short version | **bytt** (switched) |
| **å** | "o" as in "more" | **åka** (go/travel) | short "o" | **ått** (ate) |
| **ä** | "e" as in "bed" | **bär** (berry) | shorter "e" | **häll** (flat rock) |
| **ö** | "u" as in "burn" | **öl** (beer) | short version | **ött** — |

## The long/short rule

Here's the key pattern:

- **One consonant after the vowel** → the vowel is **long**: *bil* (car), *hus* (house)
- **Two consonants after the vowel** → the vowel is **short**: *bill* (cheaper), *hund* (dog)

This is one of the most important pronunciation rules in Swedish. It changes meaning — **tak** (roof, long a) vs. **tack** (thanks, short a).

## The trickiest sounds for English speakers

1. **Y** — Not like English "y" in "yes." It's a vowel, like a rounded "ee." Say "ee" but with rounded lips.
2. **U** — Not like English "oo." It's further forward in the mouth, almost like saying "ee" with very rounded lips.
3. **Å** — Don't say "a"! It's an "o" sound, like in "more."

> **Swedish Life:** Swedish is often described as a "singing" language because of its pitch accent — many words have a characteristic rise and fall in tone. You don't need to master this right away, but it's why Swedish sounds so melodic to English speakers.$md$,
  'Master the 9 Swedish vowels — including the long/short rule that changes word meanings.',
  TRUE, 18, 4, 'published'
);

-- Exercises for Lesson 4
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'How many vowels does Swedish have?',
  'Hur många vokaler har svenskan?',
  '{"options": ["5", "7", "9", "11"]}'::jsonb,
  '"9"'::jsonb,
  'Swedish has 9 vowels: a, e, i, o, u, y, å, ä, ö. English only has 5 (or 6 if you count y).',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'In the word "tack" (thanks), is the vowel long or short?',
  'I ordet "tack", är vokalen lång eller kort?',
  '{"options": ["Long — one consonant follows", "Short — two consonants follow"]}'::jsonb,
  '"Short — two consonants follow"'::jsonb,
  'Two consonants (c + k) after the vowel make it short. Compare: "tak" (roof) has a long "a" because only one consonant follows.',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'matching',
  'Match each Swedish word to the English word where the vowel sounds similar.',
  'Para ihop varje svenskt ord med det engelska ord där vokalen låter liknande.',
  '{"pairs": [{"left": "hus (house)", "right": "rounded \"oo\""}, {"left": "bär (berry)", "right": "\"e\" in bed"}, {"left": "åka (travel)", "right": "\"o\" in more"}, {"left": "öl (beer)", "right": "\"u\" in burn"}]}'::jsonb,
  '[["hus (house)","rounded \"oo\""],["bär (berry)","\"e\" in bed"],["åka (travel)","\"o\" in more"],["öl (beer)","\"u\" in burn"]]'::jsonb,
  'These are approximate English equivalents — Swedish vowels have their own unique quality.',
  1, 15, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'The Swedish letter "y" is pronounced like...',
  'Den svenska bokstaven "y" uttalas som...',
  '{"options": ["English \"y\" in \"yes\"", "English \"ee\" with rounded lips", "English \"oo\" in \"food\"", "English \"i\" in \"bit\""]}'::jsonb,
  '"English \"ee\" with rounded lips"'::jsonb,
  'Swedish "y" is a vowel (not a consonant like English "y"). Say "ee" but round your lips into an "oo" shape.',
  2, 10, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'fill_blank',
  'The word "bil" (car) has a ___ vowel because only one consonant follows it.',
  'Ordet "bil" har en ___ vokal eftersom bara en konsonant följer den.',
  '{"sentence": "The word \"bil\" has a ___ vowel."}'::jsonb,
  '{"answer": "long", "alternatives": ["Long"]}'::jsonb,
  'One consonant after the vowel = long vowel. Two consonants = short. "Bil" has only one "l" so the "i" is long.',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'Which pair of words demonstrates the long/short vowel difference?',
  'Vilket ordpar visar skillnaden mellan lång och kort vokal?',
  '{"options": ["hej / hej då", "tak (roof) / tack (thanks)", "god / morgon", "hus / hem"]}'::jsonb,
  '"tak (roof) / tack (thanks)"'::jsonb,
  '"Tak" has a long "a" (one consonant after). "Tack" has a short "a" (two consonants after). Same vowel letter, different sound and meaning!',
  2, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 5: Useful little words
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'Useful little words',
  'Nyttiga småord',
  'a1-1-useful-little-words',
  'standard',
  $md$# Useful little words

These small words will carry you through your first days in Sweden. They're the social glue of Swedish — you'll hear and use them constantly.

## The essentials

| Swedish | English | Sounds like | When to use it |
| --- | --- | --- | --- |
| **Ja** | Yes | "yah" | Agreeing, confirming |
| **Nej** | No | "nay" | Declining, disagreeing |
| **Tack** | Thank you / Thanks | "tack" (like "tuck") | Everywhere, constantly |
| **Tack så mycket** | Thank you very much | "tack so MYK-eh" | When extra grateful |
| **Snälla** | Please | "SNEL-la" | Requests, being polite |
| **Ursäkta** | Excuse me / Sorry | "ur-SHEK-ta" | Getting attention, apologizing |
| **Förlåt** | I'm sorry (apology) | "fur-LOHT" | When you've done something wrong |
| **Varsågod** | You're welcome / Here you go | "var-sho-GOOD" | Responding to "tack," handing something over |

## Tack: the Swiss Army knife of Swedish

**Tack** does a LOT of heavy lifting:

- **Saying thank you:** "Tack!" / "Tack så mycket!"
- **Saying please:** "En kaffe, tack." (A coffee, please.)
- **Saying yes please:** "Ja, tack!" (Yes, please!)
- **Saying no thanks:** "Nej, tack." (No, thanks.)
- **Saying goodbye informally:** "Tack! Hej då!"

In many situations where English uses "please," Swedish just uses "tack" at the end.

## Ursäkta vs. Förlåt

Both can translate to "sorry," but they're different:

- **Ursäkta** — "Excuse me." Use it to get someone's attention, or for minor bumps. *Ursäkta, var ligger stationen?* (Excuse me, where is the station?)
- **Förlåt** — "I'm sorry / Forgive me." A real apology. *Förlåt, det var mitt fel.* (I'm sorry, it was my fault.)

## Mini-dialogues

> — En kaffe, tack.
> — Varsågod!
> — Tack!

> — Ursäkta, var är toaletten?
> — Där borta.
> — Tack så mycket!

> **Swedish Life:** Swedes don't use "please" as often as English speakers — it can even sound a bit excessive. A simple "tack" at the end of a request is natural and polite. "Kan jag få en kaffe, tack?" (Can I get a coffee, thanks?) is perfectly polite.$md$,
  'Master ja, nej, tack, and the other small words that oil the wheels of Swedish conversation.',
  TRUE, 15, 5, 'published'
);

-- Exercises for Lesson 5
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'matching',
  'Match the Swedish words with their English meanings.',
  'Para ihop de svenska orden med deras engelska betydelser.',
  '{"pairs": [{"left": "Ja", "right": "Yes"}, {"left": "Nej", "right": "No"}, {"left": "Tack", "right": "Thank you"}, {"left": "Ursäkta", "right": "Excuse me"}, {"left": "Varsågod", "right": "You''re welcome"}]}'::jsonb,
  '[["Ja","Yes"],["Nej","No"],["Tack","Thank you"],["Ursäkta","Excuse me"],["Varsågod","You''re welcome"]]'::jsonb,
  'These five words are the core of Swedish politeness.',
  1, 15, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'multiple_choice',
  'How do you say "thank you" in Swedish?',
  'Hur säger man "thank you" på svenska?',
  '{"options": ["Snälla", "Tack", "Varsågod", "Ursäkta"]}'::jsonb,
  '"Tack"'::jsonb,
  '"Tack" is the most important polite word in Swedish — you''ll use it dozens of times a day.',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'translation',
  'How do you say "Excuse me" in Swedish?',
  'Hur säger man "Excuse me" på svenska?',
  '{"source": "Excuse me", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Ursäkta", "alternatives": ["ursäkta"]}'::jsonb,
  '"Ursäkta" is used to get attention or for minor "sorry" moments.',
  1, 10, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'fill_blank',
  'Complete: "Tack så ___!" (Thank you very much!)',
  'Fyll i: "Tack så ___!"',
  '{"sentence": "Tack så ___!"}'::jsonb,
  '{"answer": "mycket", "alternatives": ["Mycket"]}'::jsonb,
  '"Tack så mycket" literally means "thanks so much" — use it when you''re extra grateful.',
  1, 10, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'multiple_choice',
  'What does "varsågod" mean?',
  'Vad betyder "varsågod"?',
  '{"options": ["Thank you", "You''re welcome / Here you go", "Excuse me", "Please"]}'::jsonb,
  '"You''re welcome / Here you go"'::jsonb,
  '"Varsågod" is used when someone thanks you, or when handing something to someone.',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'drag_drop',
  'Put the words in order: "Thank you very much!"',
  'Sätt orden i rätt ordning.',
  '{"words": ["mycket", "Tack", "så"], "hint": "Thank you very much!"}'::jsonb,
  '{"answer": ["Tack", "så", "mycket"]}'::jsonb,
  '"Tack så mycket" — Thanks so much. Same word order as English!',
  1, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 6: How are you?
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'How are you?',
  'Hur mår du?',
  'a1-1-how-are-you',
  'standard',
  $md$# How are you?

In English, "How are you?" is often just a greeting — people don't really expect a detailed answer. In Sweden, it's a bit more genuine. If you ask, be ready for an honest response!

## Two ways to ask

| Swedish | Literally | Use |
| --- | --- | --- |
| **Hur mår du?** | How feel you? | Asking about wellbeing/health |
| **Hur är det?** | How is it? | More casual, like "How's it going?" |

Both are common. **Hur mår du?** is slightly more personal, **Hur är det?** is a bit more casual.

## How to answer

| Swedish | English | When to use |
| --- | --- | --- |
| **Bra, tack!** | Fine, thanks! | The default happy answer |
| **Jättebra!** | Really great! | When things are genuinely good |
| **Det går bra.** | It's going well. | Casual, neutral |
| **Okej.** | Okay. | So-so |
| **Inte så bra.** | Not so good. | When things aren't great |
| **Och du?** | And you? | Asking back (important!) |

## The standard exchange

The most common version you'll hear every day:

> — Hej! Hur mår du?
> — Bra, tack! Och du?
> — Jättebra, tack!

## A longer example

> — Hej, Erik! Hur är det?
> — Hej! Det går bra, tack. Och du? Hur mår du?
> — Jättebra! Solen skiner!
> — Ja, det är en fin dag!

Notice **"Solen skiner"** (the sun is shining) — Swedes absolutely love commenting on good weather. After months of darkness, you would too.

## Key vocabulary from this lesson

| Swedish | English |
| --- | --- |
| **hur** | how |
| **mår** | feel (wellbeing) |
| **bra** | good/fine/well |
| **jättebra** | really great |
| **och** | and |
| **inte** | not |
| **så** | so |

> **Swedish Life:** "Jätte-" is a prefix meaning "really/very" that Swedes attach to almost anything: jättebra (really good), jättefin (really nice), jättestor (really big). Literally it means "giant" — so "jättebra" is technically "giant-good." You'll start doing it too.$md$,
  'Ask and answer "Hur mår du?" — plus learn the jätte- prefix that Swedes put on everything.',
  TRUE, 15, 6, 'published'
);

-- Exercises for Lesson 6
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'multiple_choice',
  'How do you ask "How are you?" in Swedish?',
  'Hur frågar man "How are you?" på svenska?',
  '{"options": ["Vad heter du?", "Hur mår du?", "Var är du?", "Vad gör du?"]}'::jsonb,
  '"Hur mår du?"'::jsonb,
  '"Hur mår du?" literally means "How feel you?" — it asks about someone''s wellbeing.',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'fill_blank',
  'Complete the answer: "Bra, ___!" (Fine, thanks!)',
  'Fyll i: "Bra, ___!"',
  '{"sentence": "Bra, ___!"}'::jsonb,
  '{"answer": "tack", "alternatives": ["Tack"]}'::jsonb,
  '"Bra, tack!" is the standard positive answer to "Hur mår du?" — it''s what you''ll say most of the time.',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'translation',
  'Translate to Swedish: "I am fine, thanks!"',
  'Översätt till svenska.',
  '{"source": "Fine, thanks!", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Bra, tack!", "alternatives": ["Bra tack", "Bra, tack"]}'::jsonb,
  'The most common Swedish answer when someone asks how you are.',
  1, 10, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'matching',
  'Match the Swedish responses with their English meanings.',
  'Para ihop de svenska svaren med deras engelska betydelser.',
  '{"pairs": [{"left": "Bra, tack!", "right": "Fine, thanks!"}, {"left": "Jättebra!", "right": "Really great!"}, {"left": "Inte så bra", "right": "Not so good"}, {"left": "Och du?", "right": "And you?"}]}'::jsonb,
  '[["Bra, tack!","Fine, thanks!"],["Jättebra!","Really great!"],["Inte så bra","Not so good"],["Och du?","And you?"]]'::jsonb,
  'These are the most common responses to "Hur mår du?"',
  1, 15, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'drag_drop',
  'Put the words in order to ask "How are you?"',
  'Sätt orden i rätt ordning.',
  '{"words": ["du?", "mår", "Hur"], "hint": "How are you?"}'::jsonb,
  '{"answer": ["Hur", "mår", "du?"]}'::jsonb,
  'Swedish question word order: Question word (Hur) + Verb (mår) + Subject (du).',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'multiple_choice',
  'What does "jättebra" mean?',
  'Vad betyder "jättebra"?',
  '{"options": ["A little good", "Not good", "Really great", "Okay"]}'::jsonb,
  '"Really great"'::jsonb,
  '"Jätte-" means "really/very" (literally "giant"). Jättebra = really great. You''ll hear this prefix everywhere in Swedish.',
  1, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 7: Where are you from?
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'Where are you from?',
  'Var kommer du ifrån?',
  'a1-1-where-are-you-from',
  'standard',
  $md$# Where are you from?

Sweden is a surprisingly international country — especially in cities like Stockholm, Gothenburg, and Malmö. You'll be asked where you're from, and you'll want to ask others too.

## The key phrase

> **Var kommer du ifrån?**
> *Where do you come from?*

And the answer:

> **Jag kommer från [country/city].**
> *I come from [country/city].*

| Swedish | English | Sounds like |
| --- | --- | --- |
| **Var kommer du ifrån?** | Where are you from? | "var KOM-mer doo i-FROHN" |
| **Jag kommer från...** | I come from... | "yah KOM-mer frohn" |

## Country names in Swedish

Some country names are the same or similar to English, others are quite different:

| Swedish | English |
| --- | --- |
| **Sverige** | Sweden |
| **USA** | The US |
| **England** | England |
| **Tyskland** | Germany |
| **Frankrike** | France |
| **Spanien** | Spain |
| **Italien** | Italy |
| **Kina** | China |
| **Japan** | Japan |
| **Australien** | Australia |
| **Kanada** | Canada |
| **Brasilien** | Brazil |

## Where do you live?

You might also want to say where you live now:

> **Jag bor i Stockholm.**
> *I live in Stockholm.*

| Swedish | English |
| --- | --- |
| **Jag bor i...** | I live in... |
| **Var bor du?** | Where do you live? |

## Dialogue: at a party

> — Hej! Jag heter Anna. Var kommer du ifrån?
> — Hej, Anna! Jag heter David. Jag kommer från England. Och du?
> — Jag kommer från Sverige. Jag bor i Stockholm. Var bor du?
> — Jag bor i Göteborg nu.
> — Trevligt att träffas, David!
> — Trevligt att träffas!

## New words in this lesson

| Swedish | English |
| --- | --- |
| **var** | where |
| **kommer** | come(s) |
| **från** | from |
| **ifrån** | from (used at end of questions) |
| **bor** | live (as in reside) |
| **i** | in |
| **nu** | now |

> **Swedish Life:** "Tyskland" (Germany) comes from the old word "tysk" meaning "German." "Frankrike" means "the kingdom of the Franks." Swedish country names often reveal old historical connections — learning them is like a mini history lesson.$md$,
  'Say where you''re from, learn country names, and tell people where you live.',
  TRUE, 15, 7, 'published'
);

-- Exercises for Lesson 7
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'multiple_choice',
  'How do you say "I come from..." in Swedish?',
  'Hur säger man "I come from..." på svenska?',
  '{"options": ["Jag bor i...", "Jag heter...", "Jag kommer från...", "Jag mår..."]}'::jsonb,
  '"Jag kommer från..."'::jsonb,
  '"Jag kommer från" literally means "I come from" — use it with a country or city name.',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'fill_blank',
  'Complete: "Jag ___ från Sverige." (I come from Sweden.)',
  'Fyll i: "Jag ___ från Sverige."',
  '{"sentence": "Jag ___ från Sverige."}'::jsonb,
  '{"answer": "kommer", "alternatives": ["Kommer"]}'::jsonb,
  '"Kommer" means "come/comes" — here it means "I come from."',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'matching',
  'Match the Swedish country names with their English equivalents.',
  'Para ihop de svenska landsnamnen med deras engelska motsvarigheter.',
  '{"pairs": [{"left": "Sverige", "right": "Sweden"}, {"left": "Tyskland", "right": "Germany"}, {"left": "Frankrike", "right": "France"}, {"left": "Spanien", "right": "Spain"}]}'::jsonb,
  '[["Sverige","Sweden"],["Tyskland","Germany"],["Frankrike","France"],["Spanien","Spain"]]'::jsonb,
  'Some Swedish country names are very different from English — "Tyskland" and "Frankrike" are the trickiest ones here.',
  1, 15, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'translation',
  'Translate to Swedish: "Where do you come from?"',
  'Översätt till svenska.',
  '{"source": "Where do you come from?", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Var kommer du ifrån?", "alternatives": ["Var kommer du ifrån"]}'::jsonb,
  '"Var" (where) + "kommer du" (do you come) + "ifrån" (from). Note that "ifrån" goes at the end in Swedish.',
  2, 10, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'drag_drop',
  'Put the words in order: "Where do you come from?"',
  'Sätt orden i rätt ordning.',
  '{"words": ["du", "ifrån?", "kommer", "Var"], "hint": "Where do you come from?"}'::jsonb,
  '{"answer": ["Var", "kommer", "du", "ifrån?"]}'::jsonb,
  'In Swedish questions, the verb comes right after the question word: Var + kommer + du + ifrån?',
  1, 10, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'fill_blank',
  'Complete: "Jag ___ i Stockholm." (I live in Stockholm.)',
  'Fyll i: "Jag ___ i Stockholm."',
  '{"sentence": "Jag ___ i Stockholm."}'::jsonb,
  '{"answer": "bor", "alternatives": ["Bor"]}'::jsonb,
  '"Bor" means "live" (as in reside). "Jag bor i..." = "I live in..."',
  1, 10, 6
);

-- ────────────────────────────────────────────────────────────
-- LESSON 8: Your first conversation (review)
-- ────────────────────────────────────────────────────────────
INSERT INTO lessons (
  unit_id, title, title_sv, slug, lesson_type,
  content_md, summary, is_free, estimated_minutes,
  order_index, status
) VALUES (
  (SELECT id FROM units WHERE level = 'A1' AND unit_number = 1),
  'Your first conversation',
  'Din första konversation',
  'a1-1-your-first-conversation',
  'standard',
  $md$# Your first conversation

You've learned greetings, introductions, polite words, how to ask about someone's wellbeing, and where they're from. Let's put it ALL together into real conversations.

## Conversation 1: Meeting someone at fika

> — **Hej!**
> — **Hej hej!**
> — **Jag heter Denise. Vad heter du?**
> — **Jag heter Lars. Trevligt att träffas!**
> — **Trevligt att träffas! Hur mår du?**
> — **Bra, tack! Och du?**
> — **Jättebra, tack!**

## Conversation 2: At a party

> — **God kväll!**
> — **Hej! Jag heter Anna. Vad heter du?**
> — **Jag heter David. Trevligt att träffas, Anna!**
> — **Trevligt att träffas! Var kommer du ifrån?**
> — **Jag kommer från England. Och du?**
> — **Jag kommer från Sverige. Jag bor i Stockholm.**
> — **Jag bor i Göteborg nu.**
> — **Jättekul! Hur mår du?**
> — **Bra, tack!**

## Conversation 3: At a café

> — **God morgon!**
> — **God morgon! En kaffe, tack.**
> — **Varsågod!**
> — **Tack så mycket!**
> — **Varsågod. Ha det bra!**
> — **Tack! Hej då!**

## Everything you've learned in Unit 1

Here's your checklist — you can now do all of these in Swedish:

- ✅ **Greet people** at any time of day (hej, god morgon, god kväll)
- ✅ **Say goodbye** (hej då, vi ses, ha det bra)
- ✅ **Introduce yourself** (Jag heter...)
- ✅ **Ask someone's name** (Vad heter du?)
- ✅ **Say nice to meet you** (Trevligt att träffas!)
- ✅ **Recognise å, ä, ö** and know they're separate letters
- ✅ **Understand the long/short vowel rule** (one consonant = long, two = short)
- ✅ **Use polite words** (tack, ursäkta, varsågod, förlåt)
- ✅ **Ask how someone is** (Hur mår du?)
- ✅ **Say how you are** (Bra, tack! / Jättebra!)
- ✅ **Say where you're from** (Jag kommer från...)
- ✅ **Say where you live** (Jag bor i...)

## What's coming next

In **Unit 2: Numbers and Time**, you'll learn to count from 0 to 100, tell the time, and say the days of the week. These are the building blocks for talking about schedules, prices, and everyday life in Sweden.

> **Swedish Life:** The best way to practice everything you've learned is to have a "script" ready for meeting new people. Swedish speakers are often happy to switch to English, but if you start in Swedish — even just "Hej! Jag heter... Jag kommer från..." — they'll be genuinely impressed and more likely to help you practise.$md$,
  'Pull everything together — greetings, introductions, polite words, and your first real Swedish dialogues.',
  TRUE, 12, 8, 'published'
);

-- Exercises for Lesson 8 (review — pulling from all previous lessons)
INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'drag_drop',
  'Build a sentence: "My name is Anna"',
  'Bygg en mening.',
  '{"words": ["Anna", "heter", "Jag"], "hint": "My name is Anna"}'::jsonb,
  '{"answer": ["Jag", "heter", "Anna"]}'::jsonb,
  '"Jag heter Anna" — Subject (Jag) + Verb (heter) + Name. Swedish word order is usually the same as English for simple statements.',
  1, 10, 1
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'fill_blank',
  'Complete the dialogue: — Hej! Jag heter Denise. Vad ___ du?',
  'Fyll i dialogen.',
  '{"sentence": "Vad ___ du?"}'::jsonb,
  '{"answer": "heter", "alternatives": ["Heter"]}'::jsonb,
  '"Vad heter du?" — What are you called? The key question for meeting someone new.',
  1, 10, 2
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'Someone says "Hur mår du?" What''s a good response?',
  'Någon säger "Hur mår du?" Vad svarar du?',
  '{"options": ["Jag heter Erik", "Bra, tack!", "Hej då!", "Ursäkta"]}'::jsonb,
  '"Bra, tack!"'::jsonb,
  '"Bra, tack!" (Fine, thanks!) is the standard answer when someone asks how you are.',
  1, 10, 3
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'translation',
  'Translate to Swedish: "Nice to meet you!"',
  'Översätt till svenska.',
  '{"source": "Nice to meet you!", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Trevligt att träffas!", "alternatives": ["Trevligt att träffas", "trevligt att träffas"]}'::jsonb,
  '"Trevligt" (nice) + "att" (to) + "träffas" (meet) — the standard phrase when meeting someone for the first time.',
  2, 15, 4
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'matching',
  'Match each Swedish phrase with the right situation.',
  'Para ihop varje svensk fras med rätt situation.',
  '{"pairs": [{"left": "Hej!", "right": "Greeting someone"}, {"left": "Hur mår du?", "right": "Asking how someone is"}, {"left": "Jag kommer från...", "right": "Saying where you''re from"}, {"left": "Hej då!", "right": "Saying goodbye"}]}'::jsonb,
  '[["Hej!","Greeting someone"],["Hur mår du?","Asking how someone is"],["Jag kommer från...","Saying where you''re from"],["Hej då!","Saying goodbye"]]'::jsonb,
  'These four phrases form the backbone of any first conversation in Swedish.',
  1, 15, 5
),
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'fill_blank',
  'Complete the dialogue: — Var kommer du ifrån? — Jag kommer ___ Sverige.',
  'Fyll i: "Jag kommer ___ Sverige."',
  '{"sentence": "Jag kommer ___ Sverige."}'::jsonb,
  '{"answer": "från", "alternatives": ["Från"]}'::jsonb,
  '"Från" means "from." Jag kommer från Sverige = I come from Sweden.',
  1, 10, 6
);
