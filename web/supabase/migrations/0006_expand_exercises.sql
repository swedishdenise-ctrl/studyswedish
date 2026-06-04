-- ============================================================
-- EXPAND EXERCISES: Spaced repetition, production-first, dialogues
--
-- Goals:
--   1. Double exercises from 6 to ~12 per lesson
--   2. Production-first ordering (translation/fill-blank early,
--      multiple-choice as confirmation at the end)
--   3. Spaced recall: lessons 3+ include exercises that test
--      vocabulary from earlier lessons
--   4. Conversation/dialogue exercises where you pick the right
--      response in a realistic exchange
--   5. Ordering exercises that reconstruct dialogue lines
--
-- Strategy: DELETE existing exercises per lesson, re-insert with
-- new ordering and expanded set. Exercise IDs will change but
-- user_exercise_attempts references are historical — no data loss.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- LESSON 1: Saying hello (12 exercises)
-- Order: translation → fill_blank → drag_drop → conversation → matching → multiple_choice
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation (produce Swedish)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'translation',
  'How do you say "Hello" in Swedish?',
  'Hur säger man "Hello" på svenska?',
  '{"source": "Hello", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Hej", "alternatives": ["hej"]}'::jsonb,
  '"Hej" — the most universal Swedish greeting. Works everywhere, with everyone.',
  1, 10, 1
),

-- 2. Translation (produce Swedish)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'translation',
  'How do you say "Good morning" in Swedish?',
  'Hur säger man "Good morning" på svenska?',
  '{"source": "Good morning", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "God morgon", "alternatives": ["god morgon"]}'::jsonb,
  '"God morgon" — two words, just like English. Use it until about 10 am.',
  1, 10, 2
),

-- 3. Translation (produce Swedish)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'translation',
  'How do you say "Goodbye" in Swedish?',
  'Hur säger man "Goodbye" på svenska?',
  '{"source": "Goodbye", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Hej då", "alternatives": ["hej då", "Hej da"]}'::jsonb,
  '"Hej då" literally means "hey then" — you''re waving as you leave.',
  1, 10, 3
),

-- 4. Fill blank (produce)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'fill_blank',
  'Complete the evening greeting: "God ___"',
  'Fyll i kvällshälsningen: "God ___"',
  '{"sentence": "God ___"}'::jsonb,
  '{"answer": "kväll", "alternatives": ["Kväll"]}'::jsonb,
  '"God kväll" means "good evening" — use it after about 5 pm.',
  1, 10, 4
),

-- 5. Fill blank (produce)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'fill_blank',
  'Complete the goodbye phrase: "Ha det ___" (Take care)',
  'Fyll i: "Ha det ___"',
  '{"sentence": "Ha det ___"}'::jsonb,
  '{"answer": "bra", "alternatives": ["Bra"]}'::jsonb,
  '"Ha det bra" means "take care" — a warm, friendly goodbye.',
  1, 10, 5
),

-- 6. Drag/drop (build sentence)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'drag_drop',
  'Put the words in order to say "Good morning".',
  'Sätt orden i rätt ordning.',
  '{"words": ["morgon", "God"], "hint": "Good morning"}'::jsonb,
  '{"answer": ["God", "morgon"]}'::jsonb,
  'Just like English — the adjective (god = good) comes first.',
  1, 10, 6
),

-- 7. Drag/drop (build sentence)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'drag_drop',
  'Build the phrase for "See you!"',
  'Bygg frasen.',
  '{"words": ["ses", "Vi"], "hint": "See you!"}'::jsonb,
  '{"answer": ["Vi", "ses"]}'::jsonb,
  '"Vi ses" literally means "we see each other" — a casual goodbye.',
  1, 10, 7
),

-- 8. Conversation (dialogue)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice',
  'You run into a friend. What do you say to greet them?',
  'Du träffar en vän. Vad säger du?',
  '{"dialogue": ["???", "Hej hej!", "Hur mår du?", "Bra, tack!"], "blank_index": 0, "options": ["Hej!", "Tack!", "Hej då!", "God natt!"]}'::jsonb,
  '"Hej!"'::jsonb,
  '"Hej!" is the natural way to greet someone in Swedish — it works in any situation.',
  1, 10, 8
),

-- 9. Conversation (dialogue)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice',
  'Your friend is leaving. Complete the farewell.',
  'Din vän ska gå. Fyll i avskedet.',
  '{"dialogue": ["Jag måste gå nu.", "???", "Vi ses!"], "blank_index": 1, "options": ["God morgon!", "Hej då!", "Hej hej!", "God dag!"]}'::jsonb,
  '"Hej då!"'::jsonb,
  '"Hej då!" is the standard goodbye. "Vi ses!" (See you!) is the natural follow-up.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'matching',
  'Match the Swedish greetings with their English meanings.',
  'Para ihop de svenska hälsningarna med deras engelska betydelser.',
  '{"pairs": [{"left": "Hej", "right": "Hello"}, {"left": "God morgon", "right": "Good morning"}, {"left": "Hej då", "right": "Goodbye"}, {"left": "God kväll", "right": "Good evening"}, {"left": "Vi ses", "right": "See you"}]}'::jsonb,
  '[["Hej","Hello"],["God morgon","Good morning"],["Hej då","Goodbye"],["God kväll","Good evening"],["Vi ses","See you"]]'::jsonb,
  'These five cover almost every greeting situation in Sweden.',
  1, 15, 10
),

-- 11. Multiple choice (recognition — confirmation)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice',
  'Which greeting would you use at 8 in the morning?',
  'Vilken hälsning använder du klockan 8 på morgonen?',
  '{"options": ["Hej då", "God morgon", "God kväll", "God dag"]}'::jsonb,
  '"God morgon"'::jsonb,
  '"God morgon" means "good morning" and is used until about 10 am.',
  1, 10, 11
),

-- 12. Multiple choice (recognition — confirmation)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-saying-hello'),
  'multiple_choice',
  'What does "Ha det bra" mean?',
  'Vad betyder "Ha det bra"?',
  '{"options": ["Good morning", "Take care", "See you later", "Thank you"]}'::jsonb,
  '"Take care"'::jsonb,
  '"Ha det bra" literally means "Have it good" — a warm way to say goodbye.',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 2: Introducing yourself (12 exercises)
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'translation',
  'Translate to Swedish: "My name is Erik"',
  'Översätt till svenska.',
  '{"source": "My name is Erik", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag heter Erik", "alternatives": ["jag heter Erik", "Jag heter erik"]}'::jsonb,
  'Remember: Swedish says "I am called" (Jag heter) instead of "my name is."',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'translation',
  'Translate to Swedish: "Nice to meet you!"',
  'Översätt till svenska.',
  '{"source": "Nice to meet you!", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Trevligt att träffas!", "alternatives": ["Trevligt att träffas", "trevligt att träffas"]}'::jsonb,
  '"Trevligt" (nice) + "att" (to) + "träffas" (meet).',
  2, 10, 2
),

-- 3. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'fill_blank',
  'Complete the sentence: "Jag ___ Anna."',
  'Fyll i: "Jag ___ Anna."',
  '{"sentence": "Jag ___ Anna."}'::jsonb,
  '{"answer": "heter", "alternatives": ["Heter"]}'::jsonb,
  '"Jag heter" means "I am called" — it''s how Swedes say their name.',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'fill_blank',
  'Complete: "Trevligt att ___!"',
  'Fyll i: "Trevligt att ___!"',
  '{"sentence": "Trevligt att ___!"}'::jsonb,
  '{"answer": "träffas", "alternatives": ["Träffas"]}'::jsonb,
  '"Trevligt att träffas" is what you say when meeting someone for the first time.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'fill_blank',
  'Complete: "___ heter du?" (What is your name?)',
  'Fyll i: "___ heter du?"',
  '{"sentence": "___ heter du?"}'::jsonb,
  '{"answer": "Vad", "alternatives": ["vad"]}'::jsonb,
  '"Vad" means "what." "Vad heter du?" = "What are you called?"',
  1, 10, 5
),

-- 6. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'drag_drop',
  'Put the words in order to ask someone''s name.',
  'Sätt orden i rätt ordning.',
  '{"words": ["du?", "heter", "Vad"], "hint": "What is your name?"}'::jsonb,
  '{"answer": ["Vad", "heter", "du?"]}'::jsonb,
  'Swedish question word order: Question word + Verb + Subject (Vad heter du?).',
  1, 10, 6
),

-- 7. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'multiple_choice',
  'Someone introduces themselves. What do you say back?',
  'Någon presenterar sig. Vad säger du?',
  '{"dialogue": ["Hej! Jag heter Anna. Vad heter du?", "???", "Trevligt att träffas!"], "blank_index": 1, "options": ["Hej då!", "Bra, tack!", "Jag heter Erik. Trevligt att träffas!", "Ursäkta!"]}'::jsonb,
  '"Jag heter Erik. Trevligt att träffas!"'::jsonb,
  'When someone introduces themselves, you say your name back and add "Trevligt att träffas!" (Nice to meet you!).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'multiple_choice',
  'You want to ask a new colleague their name. What do you say?',
  'Du vill fråga en ny kollega om deras namn. Vad säger du?',
  '{"dialogue": ["Hej!", "Hej!", "???", "Jag heter Lars."], "blank_index": 2, "options": ["Hur mår du?", "Vad heter du?", "Hej då!", "Var bor du?"]}'::jsonb,
  '"Vad heter du?"'::jsonb,
  '"Vad heter du?" — the go-to question for asking someone''s name.',
  1, 10, 8
),

-- 9. RECALL from Lesson 1: greetings
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'translation',
  '(Recall) How do you say "Good evening" in Swedish?',
  'Översätt till svenska.',
  '{"source": "Good evening", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "God kväll", "alternatives": ["god kväll"]}'::jsonb,
  'From Lesson 1 — "God kväll" is used after about 5 pm.',
  1, 10, 9
),

-- 10. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'matching',
  'Match the Swedish phrases with their English meanings.',
  'Para ihop fraserna.',
  '{"pairs": [{"left": "Jag heter...", "right": "My name is..."}, {"left": "Vad heter du?", "right": "What is your name?"}, {"left": "Trevligt att träffas!", "right": "Nice to meet you!"}, {"left": "Hej!", "right": "Hello!"}]}'::jsonb,
  '[["Jag heter...","My name is..."],["Vad heter du?","What is your name?"],["Trevligt att träffas!","Nice to meet you!"],["Hej!","Hello!"]]'::jsonb,
  'These phrases form the backbone of any Swedish introduction.',
  1, 15, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'multiple_choice',
  'How do you ask someone''s name in Swedish?',
  'Hur frågar man om någons namn?',
  '{"options": ["Jag heter du?", "Vad heter du?", "Hej heter du?", "Du heter vad?"]}'::jsonb,
  '"Vad heter du?"'::jsonb,
  '"Vad heter du?" literally means "What are you called?"',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-introducing-yourself'),
  'multiple_choice',
  'What does "Trevligt att träffas" mean?',
  'Vad betyder "Trevligt att träffas"?',
  '{"options": ["See you later", "Nice to meet you", "How are you?", "Thank you"]}'::jsonb,
  '"Nice to meet you"'::jsonb,
  '"Trevligt" means "nice/pleasant" and "träffas" means "to meet."',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 3: The Swedish alphabet (12 exercises)
-- Recall: greetings + introductions from L1-L2
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'translation',
  'The Swedish word for "apple" uses the letter ä. Can you write it?',
  'Kan du skriva det svenska ordet för "apple"?',
  '{"source": "apple", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "äpple", "alternatives": ["Äpple"]}'::jsonb,
  '"Äpple" — notice the ä at the start.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'translation',
  'The Swedish word for "beer" uses the letter ö. Write it.',
  'Skriv det svenska ordet för "beer".',
  '{"source": "beer", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "öl", "alternatives": ["Öl"]}'::jsonb,
  '"Öl" — a short word with that distinctive ö sound.',
  1, 10, 2
),

-- 3. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'fill_blank',
  'The Swedish word for "eight" starts with å: ___tta',
  'Fyll i.',
  '{"sentence": "___tta"}'::jsonb,
  '{"answer": "å", "alternatives": ["Å"]}'::jsonb,
  '"Åtta" means eight. The å sounds like the "o" in English "more."',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'fill_blank',
  'Swedish has ___ letters in its alphabet (write the number).',
  'Det svenska alfabetet har ___ bokstäver.',
  '{"sentence": "The Swedish alphabet has ___ letters."}'::jsonb,
  '{"answer": "29", "alternatives": ["twenty-nine"]}'::jsonb,
  '26 English letters + 3 extra (å, ä, ö) = 29 total.',
  1, 10, 4
),

-- 5. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'drag_drop',
  'Put these letters in correct Swedish alphabetical order.',
  'Sätt bokstäverna i rätt ordning.',
  '{"words": ["Ö", "Z", "Å", "Ä"], "hint": "The end of the Swedish alphabet"}'::jsonb,
  '{"answer": ["Z", "Å", "Ä", "Ö"]}'::jsonb,
  'After Z comes Å, then Ä, then Ö — the last three letters.',
  1, 10, 5
),

-- 6. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'drag_drop',
  'Put these letters in correct Swedish alphabetical order.',
  'Sätt bokstäverna i rätt ordning.',
  '{"words": ["Ä", "X", "Y", "Å", "Ö"], "hint": "End of the Swedish alphabet"}'::jsonb,
  '{"answer": ["X", "Y", "Å", "Ä", "Ö"]}'::jsonb,
  'X, Y, Z, Å, Ä, Ö — but Z is not in this exercise. X and Y come before the three special letters.',
  1, 10, 6
),

-- 7. RECALL from L1: goodbye
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'fill_blank',
  '(Recall) Complete the goodbye: "Hej ___"',
  'Fyll i.',
  '{"sentence": "Hej ___"}'::jsonb,
  '{"answer": "då", "alternatives": ["Då", "da"]}'::jsonb,
  'From Lesson 1 — "Hej då" = Goodbye. The å in "då" sounds like "o" in "more."',
  1, 10, 7
),

-- 8. RECALL from L2: introduction
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'translation',
  '(Recall) How do you say "What is your name?" in Swedish?',
  'Översätt till svenska.',
  '{"source": "What is your name?", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Vad heter du?", "alternatives": ["vad heter du?", "Vad heter du"]}'::jsonb,
  'From Lesson 2 — "Vad heter du?" = What are you called?',
  1, 10, 8
),

-- 9. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'matching',
  'Match each Swedish letter to its approximate English sound.',
  'Para ihop varje bokstav med dess ljud.',
  '{"pairs": [{"left": "Å", "right": "\"o\" in more"}, {"left": "Ä", "right": "\"e\" in bed"}, {"left": "Ö", "right": "\"i\" in bird"}]}'::jsonb,
  '[["Å","\"o\" in more"],["Ä","\"e\" in bed"],["Ö","\"i\" in bird"]]'::jsonb,
  'These sound approximations will get you close to the real Swedish sounds.',
  1, 15, 9
),

-- 10. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'multiple_choice',
  'How many letters are in the Swedish alphabet?',
  'Hur många bokstäver har det svenska alfabetet?',
  '{"options": ["26", "27", "28", "29"]}'::jsonb,
  '"29"'::jsonb,
  'The 26 English letters plus three more: å, ä, and ö.',
  1, 10, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'multiple_choice',
  'Which three letters come after Z in the Swedish alphabet?',
  'Vilka tre bokstäver kommer efter Z?',
  '{"options": ["Ä, Ö, Å", "Å, Ä, Ö", "Ö, Å, Ä", "Å, Ö, Ä"]}'::jsonb,
  '"Å, Ä, Ö"'::jsonb,
  'The correct order is always Å, Ä, Ö.',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-the-swedish-alphabet'),
  'multiple_choice',
  'In a Swedish dictionary, where would you find the word "ål" (eel)?',
  'Var i en ordbok hittar du "ål"?',
  '{"options": ["With the A-words", "With the O-words", "After all Z-words", "Before the A-words"]}'::jsonb,
  '"After all Z-words"'::jsonb,
  'Å comes after Z, so "ål" appears at the very end of the dictionary.',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 4: Swedish sounds — the vowels (12 exercises)
-- Recall: greetings, introductions, alphabet from L1-L3
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Fill blank (produce)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'fill_blank',
  'The word "bil" (car) has a ___ vowel because only one consonant follows it.',
  'Ordet "bil" har en ___ vokal.',
  '{"sentence": "The word \"bil\" has a ___ vowel."}'::jsonb,
  '{"answer": "long", "alternatives": ["Long"]}'::jsonb,
  'One consonant after the vowel = long vowel. "Bil" has only one "l" so the "i" is long.',
  1, 10, 1
),

-- 2. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'fill_blank',
  'The word "tack" (thanks) has a ___ vowel because two consonants follow it.',
  'Ordet "tack" har en ___ vokal.',
  '{"sentence": "The word \"tack\" has a ___ vowel."}'::jsonb,
  '{"answer": "short", "alternatives": ["Short"]}'::jsonb,
  'Two consonants (c + k) after "a" = short vowel. Compare "tak" (roof) with long "a."',
  1, 10, 2
),

-- 3. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'fill_blank',
  'Swedish has ___ vowels (write the number).',
  'Svenskan har ___ vokaler.',
  '{"sentence": "Swedish has ___ vowels."}'::jsonb,
  '{"answer": "9", "alternatives": ["nine"]}'::jsonb,
  'a, e, i, o, u, y, å, ä, ö — that''s 9 vowels, more than English.',
  1, 10, 3
),

-- 4. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'translation',
  'Write the Swedish word for "house" (it uses the tricky vowel "u").',
  'Skriv det svenska ordet för "house".',
  '{"source": "house", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "hus", "alternatives": ["Hus"]}'::jsonb,
  '"Hus" — the Swedish "u" is further forward in the mouth than English "oo."',
  1, 10, 4
),

-- 5. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'translation',
  'Write the Swedish word for "car".',
  'Skriv det svenska ordet för "car".',
  '{"source": "car", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "bil", "alternatives": ["Bil"]}'::jsonb,
  '"Bil" — with a long "i" sound (like "ee" in "see").',
  1, 10, 5
),

-- 6. RECALL from L1: greetings
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'translation',
  '(Recall) How do you say "See you" in Swedish?',
  'Översätt till svenska.',
  '{"source": "See you", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Vi ses", "alternatives": ["vi ses"]}'::jsonb,
  'From Lesson 1 — "Vi ses" literally means "we see each other."',
  1, 10, 6
),

-- 7. RECALL from L2
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'fill_blank',
  '(Recall) Complete: "Trevligt att ___!" (Nice to meet you!)',
  'Fyll i.',
  '{"sentence": "Trevligt att ___!"}'::jsonb,
  '{"answer": "träffas", "alternatives": ["Träffas"]}'::jsonb,
  'From Lesson 2 — Notice the ä in "träffas." It sounds like "e" in "bed."',
  1, 10, 7
),

-- 8. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'matching',
  'Match each Swedish word to the English word where the vowel sounds similar.',
  'Para ihop ljuden.',
  '{"pairs": [{"left": "hus (house)", "right": "rounded \"oo\""}, {"left": "bär (berry)", "right": "\"e\" in bed"}, {"left": "åka (travel)", "right": "\"o\" in more"}, {"left": "öl (beer)", "right": "\"u\" in burn"}]}'::jsonb,
  '[["hus (house)","rounded \"oo\""],["bär (berry)","\"e\" in bed"],["åka (travel)","\"o\" in more"],["öl (beer)","\"u\" in burn"]]'::jsonb,
  'Approximate English equivalents for the Swedish vowel sounds.',
  1, 15, 8
),

-- 9. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'How many vowels does Swedish have?',
  'Hur många vokaler har svenskan?',
  '{"options": ["5", "7", "9", "11"]}'::jsonb,
  '"9"'::jsonb,
  'Swedish has 9 vowels: a, e, i, o, u, y, å, ä, ö.',
  1, 10, 9
),

-- 10. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'The Swedish letter "y" is pronounced like...',
  'Bokstaven "y" uttalas som...',
  '{"options": ["English \"y\" in \"yes\"", "English \"ee\" with rounded lips", "English \"oo\" in \"food\"", "English \"i\" in \"bit\""]}'::jsonb,
  '"English \"ee\" with rounded lips"'::jsonb,
  'Swedish "y" is a vowel. Say "ee" but round your lips into an "oo" shape.',
  2, 10, 10
),

-- 11. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'In the word "tack" (thanks), is the vowel long or short?',
  'I ordet "tack", är vokalen lång eller kort?',
  '{"options": ["Long — one consonant follows", "Short — two consonants follow"]}'::jsonb,
  '"Short — two consonants follow"'::jsonb,
  'Two consonants (c + k) after the vowel make it short.',
  1, 10, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-swedish-sounds-vowels'),
  'multiple_choice',
  'Which pair shows the long/short vowel difference?',
  'Vilket par visar skillnaden?',
  '{"options": ["hej / hej då", "tak (roof) / tack (thanks)", "god / morgon", "hus / hem"]}'::jsonb,
  '"tak (roof) / tack (thanks)"'::jsonb,
  '"Tak" = long "a" (one consonant). "Tack" = short "a" (two consonants). Different sound, different meaning!',
  2, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 5: Useful little words (12 exercises)
-- Recall: L1 greetings, L2 introductions
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'translation',
  'How do you say "Thank you" in Swedish?',
  'Hur säger man "Thank you" på svenska?',
  '{"source": "Thank you", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Tack", "alternatives": ["tack"]}'::jsonb,
  '"Tack" — the most important polite word in Swedish.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'translation',
  'How do you say "Excuse me" in Swedish?',
  'Hur säger man "Excuse me" på svenska?',
  '{"source": "Excuse me", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Ursäkta", "alternatives": ["ursäkta"]}'::jsonb,
  '"Ursäkta" is used to get attention or for minor "sorry" moments.',
  1, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'translation',
  'How do you say "Thank you very much" in Swedish?',
  'Översätt till svenska.',
  '{"source": "Thank you very much", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Tack så mycket", "alternatives": ["tack så mycket"]}'::jsonb,
  '"Tack så mycket" literally means "thanks so much."',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'fill_blank',
  'Complete: "Tack så ___!" (Thank you very much!)',
  'Fyll i.',
  '{"sentence": "Tack så ___!"}'::jsonb,
  '{"answer": "mycket", "alternatives": ["Mycket"]}'::jsonb,
  '"Mycket" means "much/very." Tack så mycket = Thanks so much.',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'fill_blank',
  'You want to order coffee politely: "En kaffe, ___."',
  'Fyll i.',
  '{"sentence": "En kaffe, ___."}'::jsonb,
  '{"answer": "tack", "alternatives": ["Tack"]}'::jsonb,
  'Just add "tack" at the end of a request — it works like "please" in Swedish.',
  1, 10, 5
),

-- 6. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'drag_drop',
  'Put the words in order: "Thank you very much!"',
  'Sätt orden i rätt ordning.',
  '{"words": ["mycket", "Tack", "så"], "hint": "Thank you very much!"}'::jsonb,
  '{"answer": ["Tack", "så", "mycket"]}'::jsonb,
  'Same word order as English — thanks so much.',
  1, 10, 6
),

-- 7. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'multiple_choice',
  'You''re at a café. The barista hands you your coffee. What do you say?',
  'Du är på ett kafé. Baristan ger dig ditt kaffe. Vad säger du?',
  '{"dialogue": ["En kaffe, tack.", "Varsågod!", "???"], "blank_index": 2, "options": ["Hej!", "Tack!", "Förlåt!", "Nej!"]}'::jsonb,
  '"Tack!"'::jsonb,
  'When someone hands you something ("Varsågod!"), the natural response is "Tack!" (Thanks!).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'multiple_choice',
  'You accidentally bump into someone. What do you say?',
  'Du stöter emot någon. Vad säger du?',
  '{"dialogue": ["???", "Det är lugnt!"], "blank_index": 0, "options": ["Tack!", "Varsågod!", "Ursäkta!", "Hej hej!"]}'::jsonb,
  '"Ursäkta!"'::jsonb,
  '"Ursäkta" is for minor "sorry" moments and getting attention. For bigger apologies, use "Förlåt."',
  1, 10, 8
),

-- 9. RECALL from L1
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'translation',
  '(Recall) How do you say "Good evening" in Swedish?',
  'Översätt till svenska.',
  '{"source": "Good evening", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "God kväll", "alternatives": ["god kväll"]}'::jsonb,
  'From Lesson 1 — "God kväll" is used after about 5 pm.',
  1, 10, 9
),

-- 10. RECALL from L2
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'fill_blank',
  '(Recall) Complete: "Jag ___ Anna." (My name is Anna.)',
  'Fyll i.',
  '{"sentence": "Jag ___ Anna."}'::jsonb,
  '{"answer": "heter", "alternatives": ["Heter"]}'::jsonb,
  'From Lesson 2 — "Jag heter" = I am called.',
  1, 10, 10
),

-- 11. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'matching',
  'Match the Swedish words with their English meanings.',
  'Para ihop orden.',
  '{"pairs": [{"left": "Ja", "right": "Yes"}, {"left": "Nej", "right": "No"}, {"left": "Tack", "right": "Thank you"}, {"left": "Ursäkta", "right": "Excuse me"}, {"left": "Varsågod", "right": "You''re welcome"}]}'::jsonb,
  '[["Ja","Yes"],["Nej","No"],["Tack","Thank you"],["Ursäkta","Excuse me"],["Varsågod","You''re welcome"]]'::jsonb,
  'The five core politeness words in Swedish.',
  1, 15, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-useful-little-words'),
  'multiple_choice',
  'What does "varsågod" mean?',
  'Vad betyder "varsågod"?',
  '{"options": ["Thank you", "You''re welcome / Here you go", "Excuse me", "Please"]}'::jsonb,
  '"You''re welcome / Here you go"'::jsonb,
  '"Varsågod" responds to "tack," or accompanies handing something over.',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 6: How are you? (12 exercises)
-- Recall: greetings, introductions, polite words from L1-L5
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'translation',
  'Translate to Swedish: "Fine, thanks!"',
  'Översätt till svenska.',
  '{"source": "Fine, thanks!", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Bra, tack!", "alternatives": ["Bra tack", "Bra, tack", "bra, tack"]}'::jsonb,
  'The most common Swedish answer when someone asks how you are.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'translation',
  'How do you say "And you?" in Swedish?',
  'Översätt till svenska.',
  '{"source": "And you?", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Och du?", "alternatives": ["och du?", "Och du"]}'::jsonb,
  '"Och" = and, "du" = you. Always ask back!',
  1, 10, 2
),

-- 3. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'fill_blank',
  'Complete: "Bra, ___!" (Fine, thanks!)',
  'Fyll i.',
  '{"sentence": "Bra, ___!"}'::jsonb,
  '{"answer": "tack", "alternatives": ["Tack"]}'::jsonb,
  '"Bra, tack!" is the standard positive answer to "Hur mår du?"',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'fill_blank',
  'Complete: "___ mår du?" (How are you?)',
  'Fyll i.',
  '{"sentence": "___ mår du?"}'::jsonb,
  '{"answer": "Hur", "alternatives": ["hur"]}'::jsonb,
  '"Hur" means "how." "Hur mår du?" = How do you feel?',
  1, 10, 4
),

-- 5. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'drag_drop',
  'Put the words in order to ask "How are you?"',
  'Sätt orden i rätt ordning.',
  '{"words": ["du?", "mår", "Hur"], "hint": "How are you?"}'::jsonb,
  '{"answer": ["Hur", "mår", "du?"]}'::jsonb,
  'Question word (Hur) + Verb (mår) + Subject (du).',
  1, 10, 5
),

-- 6. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'drag_drop',
  'Build the phrase: "Not so good"',
  'Bygg frasen.',
  '{"words": ["bra", "så", "Inte"], "hint": "Not so good"}'::jsonb,
  '{"answer": ["Inte", "så", "bra"]}'::jsonb,
  '"Inte så bra" = Not so good. "Inte" = not, "så" = so.',
  1, 10, 6
),

-- 7. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'multiple_choice',
  'Someone asks how you are. What do you say?',
  'Någon frågar hur du mår. Vad svarar du?',
  '{"dialogue": ["Hej! Hur mår du?", "???", "Jättebra, tack!"], "blank_index": 1, "options": ["Hej då!", "Jag heter Anna.", "Bra, tack! Och du?", "Ursäkta!"]}'::jsonb,
  '"Bra, tack! Och du?"'::jsonb,
  'Answer how you feel, then ask back with "Och du?" (And you?).',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'multiple_choice',
  'You meet a friend. Fill in the missing line.',
  'Du träffar en vän. Fyll i.',
  '{"dialogue": ["Hej!", "Hej! ???", "Bra, tack!"], "blank_index": 1, "options": ["Hej då!", "Hur mår du?", "Jag heter Erik.", "Var bor du?"]}'::jsonb,
  '"Hur mår du?"'::jsonb,
  'After greeting, asking "Hur mår du?" is the natural next step.',
  1, 10, 8
),

-- 9. RECALL from L5: polite words
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'translation',
  '(Recall) How do you say "Excuse me" in Swedish?',
  'Översätt till svenska.',
  '{"source": "Excuse me", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Ursäkta", "alternatives": ["ursäkta"]}'::jsonb,
  'From Lesson 5 — "Ursäkta" for getting attention or minor apologies.',
  1, 10, 9
),

-- 10. RECALL from L1: goodbye
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'fill_blank',
  '(Recall) Complete the goodbye: "Ha det ___"',
  'Fyll i.',
  '{"sentence": "Ha det ___"}'::jsonb,
  '{"answer": "bra", "alternatives": ["Bra"]}'::jsonb,
  'From Lesson 1 — "Ha det bra" = Take care.',
  1, 10, 10
),

-- 11. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'matching',
  'Match the Swedish responses with their English meanings.',
  'Para ihop svaren.',
  '{"pairs": [{"left": "Bra, tack!", "right": "Fine, thanks!"}, {"left": "Jättebra!", "right": "Really great!"}, {"left": "Inte så bra", "right": "Not so good"}, {"left": "Och du?", "right": "And you?"}]}'::jsonb,
  '[["Bra, tack!","Fine, thanks!"],["Jättebra!","Really great!"],["Inte så bra","Not so good"],["Och du?","And you?"]]'::jsonb,
  'The most common responses to "Hur mår du?"',
  1, 15, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-how-are-you'),
  'multiple_choice',
  'What does "jättebra" mean?',
  'Vad betyder "jättebra"?',
  '{"options": ["A little good", "Not good", "Really great", "Okay"]}'::jsonb,
  '"Really great"'::jsonb,
  '"Jätte-" means "really/very" (literally "giant"). Jättebra = really great.',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 7: Where are you from? (12 exercises)
-- Recall: greetings, introductions, how-are-you from L1-L6
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'translation',
  'Translate to Swedish: "I come from Sweden."',
  'Översätt till svenska.',
  '{"source": "I come from Sweden.", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag kommer från Sverige.", "alternatives": ["Jag kommer från Sverige", "jag kommer från Sverige"]}'::jsonb,
  '"Jag kommer från" + country name. "Sverige" = Sweden.',
  1, 10, 1
),

-- 2. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'translation',
  'Translate to Swedish: "Where do you come from?"',
  'Översätt till svenska.',
  '{"source": "Where do you come from?", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Var kommer du ifrån?", "alternatives": ["Var kommer du ifrån"]}'::jsonb,
  '"Var" (where) + "kommer du" (do you come) + "ifrån" (from) — note "ifrån" goes at the end.',
  2, 10, 2
),

-- 3. Translation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'translation',
  'Translate to Swedish: "I live in Stockholm."',
  'Översätt till svenska.',
  '{"source": "I live in Stockholm.", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag bor i Stockholm.", "alternatives": ["Jag bor i Stockholm", "jag bor i Stockholm"]}'::jsonb,
  '"Bor" = live (reside). "Jag bor i" + city/place.',
  1, 10, 3
),

-- 4. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'fill_blank',
  'Complete: "Jag ___ från Sverige." (I come from Sweden.)',
  'Fyll i.',
  '{"sentence": "Jag ___ från Sverige."}'::jsonb,
  '{"answer": "kommer", "alternatives": ["Kommer"]}'::jsonb,
  '"Kommer" means "come/comes."',
  1, 10, 4
),

-- 5. Fill blank
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'fill_blank',
  'Complete: "Jag ___ i Stockholm." (I live in Stockholm.)',
  'Fyll i.',
  '{"sentence": "Jag ___ i Stockholm."}'::jsonb,
  '{"answer": "bor", "alternatives": ["Bor"]}'::jsonb,
  '"Bor" = live (as in reside).',
  1, 10, 5
),

-- 6. Drag/drop
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'drag_drop',
  'Put the words in order: "Where do you come from?"',
  'Sätt orden i rätt ordning.',
  '{"words": ["du", "ifrån?", "kommer", "Var"], "hint": "Where do you come from?"}'::jsonb,
  '{"answer": ["Var", "kommer", "du", "ifrån?"]}'::jsonb,
  'Var + kommer + du + ifrån? — the verb comes right after the question word.',
  1, 10, 6
),

-- 7. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'multiple_choice',
  'Someone asks where you''re from. Answer them.',
  'Svara på frågan.',
  '{"dialogue": ["Var kommer du ifrån?", "???", "Jättekul! Jag kommer från Sverige."], "blank_index": 1, "options": ["Jag heter Anna.", "Bra, tack!", "Jag kommer från England.", "Hej då!"]}'::jsonb,
  '"Jag kommer från England."'::jsonb,
  'Answer with "Jag kommer från" + your country.',
  1, 10, 7
),

-- 8. Conversation
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'multiple_choice',
  'You''ve just met someone. What do you ask to find out where they live?',
  'Vad frågar du?',
  '{"dialogue": ["Jag bor i Göteborg.", "???", "Jag bor i Stockholm."], "blank_index": 1, "options": ["Vad heter du?", "Hur mår du?", "Var bor du?", "Hej då!"]}'::jsonb,
  '"Var bor du?"'::jsonb,
  '"Var bor du?" = Where do you live?',
  1, 10, 8
),

-- 9. RECALL from L6: how are you
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'translation',
  '(Recall) Translate to Swedish: "Really great!"',
  'Översätt till svenska.',
  '{"source": "Really great!", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jättebra!", "alternatives": ["Jättebra", "jättebra"]}'::jsonb,
  'From Lesson 6 — "Jätte-" = really/very, "bra" = good. Giant-good!',
  1, 10, 9
),

-- 10. RECALL from L5: polite words
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'fill_blank',
  '(Recall) You order coffee: "En kaffe, ___."',
  'Fyll i.',
  '{"sentence": "En kaffe, ___."}'::jsonb,
  '{"answer": "tack", "alternatives": ["Tack"]}'::jsonb,
  'From Lesson 5 — "Tack" at the end works like "please."',
  1, 10, 10
),

-- 11. Matching
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'matching',
  'Match the Swedish country names with their English equivalents.',
  'Para ihop landsnamnen.',
  '{"pairs": [{"left": "Sverige", "right": "Sweden"}, {"left": "Tyskland", "right": "Germany"}, {"left": "Frankrike", "right": "France"}, {"left": "Spanien", "right": "Spain"}]}'::jsonb,
  '[["Sverige","Sweden"],["Tyskland","Germany"],["Frankrike","France"],["Spanien","Spain"]]'::jsonb,
  '"Tyskland" and "Frankrike" are the trickiest — very different from English.',
  1, 15, 11
),

-- 12. Multiple choice
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-where-are-you-from'),
  'multiple_choice',
  'How do you say "I come from..." in Swedish?',
  'Hur säger man "I come from..."?',
  '{"options": ["Jag bor i...", "Jag heter...", "Jag kommer från...", "Jag mår..."]}'::jsonb,
  '"Jag kommer från..."'::jsonb,
  '"Jag kommer från" literally means "I come from."',
  1, 10, 12
);


-- ────────────────────────────────────────────────────────────
-- LESSON 8: Your first conversation — review (14 exercises)
-- Heavy on recall and dialogue reconstruction
-- ────────────────────────────────────────────────────────────
DELETE FROM exercises WHERE lesson_id = (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation');

INSERT INTO exercises (lesson_id, exercise_type, instruction, instruction_sv, question_data, correct_answer, explanation, difficulty, xp_reward, order_index) VALUES

-- 1. Translation (recall L2)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'translation',
  'Translate to Swedish: "My name is Anna."',
  'Översätt till svenska.',
  '{"source": "My name is Anna.", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag heter Anna.", "alternatives": ["Jag heter Anna", "jag heter Anna"]}'::jsonb,
  '"Jag heter" = I am called. The key introduction phrase.',
  1, 10, 1
),

-- 2. Translation (recall L7)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'translation',
  'Translate to Swedish: "I come from England."',
  'Översätt till svenska.',
  '{"source": "I come from England.", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Jag kommer från England.", "alternatives": ["Jag kommer från England", "jag kommer från England"]}'::jsonb,
  '"Jag kommer från" + country.',
  1, 10, 2
),

-- 3. Translation (recall L2)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'translation',
  'Translate to Swedish: "Nice to meet you!"',
  'Översätt till svenska.',
  '{"source": "Nice to meet you!", "direction": "en_to_sv"}'::jsonb,
  '{"answer": "Trevligt att träffas!", "alternatives": ["Trevligt att träffas", "trevligt att träffas"]}'::jsonb,
  '"Trevligt att träffas!" — said by both people when meeting.',
  2, 15, 3
),

-- 4. Fill blank (recall L6)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'fill_blank',
  'Complete the dialogue: — Hur mår du? — Bra, ___!',
  'Fyll i.',
  '{"sentence": "Bra, ___!"}'::jsonb,
  '{"answer": "tack", "alternatives": ["Tack"]}'::jsonb,
  '"Bra, tack!" — the standard positive answer to "Hur mår du?"',
  1, 10, 4
),

-- 5. Fill blank (recall L7)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'fill_blank',
  'Complete: "Var kommer du ___?" (Where do you come from?)',
  'Fyll i.',
  '{"sentence": "Var kommer du ___?"}'::jsonb,
  '{"answer": "ifrån", "alternatives": ["Ifrån"]}'::jsonb,
  '"Ifrån" (from) goes at the end in Swedish questions.',
  1, 10, 5
),

-- 6. Fill blank (recall L7)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'fill_blank',
  'Complete: "Jag kommer ___ Sverige."',
  'Fyll i.',
  '{"sentence": "Jag kommer ___ Sverige."}'::jsonb,
  '{"answer": "från", "alternatives": ["Från"]}'::jsonb,
  '"Från" means "from." Jag kommer från Sverige = I come from Sweden.',
  1, 10, 6
),

-- 7. Drag/drop (build sentence)
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'drag_drop',
  'Build a sentence: "My name is Anna"',
  'Bygg en mening.',
  '{"words": ["Anna", "heter", "Jag"], "hint": "My name is Anna"}'::jsonb,
  '{"answer": ["Jag", "heter", "Anna"]}'::jsonb,
  'Subject (Jag) + Verb (heter) + Name.',
  1, 10, 7
),

-- 8. Conversation: fika meeting
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'You meet someone at fika. They greet you. What do you say?',
  'Du träffar någon på fika. De hälsar. Vad säger du?',
  '{"dialogue": ["Hej!", "???", "Jag heter Lars. Trevligt att träffas!", "Trevligt att träffas!"], "blank_index": 1, "options": ["Hej då!", "Hej! Jag heter Denise. Vad heter du?", "Ursäkta!", "Bra, tack!"]}'::jsonb,
  '"Hej! Jag heter Denise. Vad heter du?"'::jsonb,
  'Greet back, introduce yourself, and ask their name — the natural flow.',
  1, 10, 8
),

-- 9. Conversation: at a party
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'At a party, someone asks where you''re from. What do you answer?',
  'På en fest frågar någon var du kommer ifrån. Vad svarar du?',
  '{"dialogue": ["Var kommer du ifrån?", "???", "Jättekul! Jag bor i Malmö."], "blank_index": 1, "options": ["Bra, tack!", "Jag heter David.", "Jag kommer från England.", "Hej då!"]}'::jsonb,
  '"Jag kommer från England."'::jsonb,
  'Answer with "Jag kommer från" + your country.',
  1, 10, 9
),

-- 10. Conversation: café
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'You''re leaving a café. The staff says "Ha det bra!" What do you say?',
  'Du lämnar ett kafé. Personalen säger "Ha det bra!" Vad säger du?',
  '{"dialogue": ["Varsågod!", "Tack så mycket!", "Ha det bra!", "???"], "blank_index": 3, "options": ["God morgon!", "Tack! Hej då!", "Jag heter Anna.", "Ursäkta!"]}'::jsonb,
  '"Tack! Hej då!"'::jsonb,
  'A natural goodbye sequence: "Tack!" (thanks) + "Hej då!" (bye).',
  1, 10, 10
),

-- 11. Conversation: full introduction
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'After introductions, what comes next naturally?',
  'Vad säger man naturligt efter en presentation?',
  '{"dialogue": ["Jag heter Erik. Trevligt att träffas!", "Trevligt att träffas!", "???", "Bra, tack! Och du?"], "blank_index": 2, "options": ["Hej då!", "Var bor du?", "Hur mår du?", "Tack!"]}'::jsonb,
  '"Hur mår du?"'::jsonb,
  'After "Nice to meet you," the natural next question is "How are you?"',
  1, 10, 11
),

-- 12. Matching: full unit review
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'matching',
  'Match each Swedish phrase with the right situation.',
  'Para ihop fraserna med rätt situation.',
  '{"pairs": [{"left": "Hej!", "right": "Greeting someone"}, {"left": "Hur mår du?", "right": "Asking how someone is"}, {"left": "Jag kommer från...", "right": "Saying where you''re from"}, {"left": "Hej då!", "right": "Saying goodbye"}, {"left": "Tack!", "right": "Thanking someone"}]}'::jsonb,
  '[["Hej!","Greeting someone"],["Hur mår du?","Asking how someone is"],["Jag kommer från...","Saying where you''re from"],["Hej då!","Saying goodbye"],["Tack!","Thanking someone"]]'::jsonb,
  'These five phrases form the backbone of any first conversation in Swedish.',
  1, 15, 12
),

-- 13. Multiple choice: review
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'Someone says "Hur mår du?" What''s a good response?',
  'Någon säger "Hur mår du?" Vad svarar du?',
  '{"options": ["Jag heter Erik", "Bra, tack!", "Hej då!", "Ursäkta"]}'::jsonb,
  '"Bra, tack!"'::jsonb,
  '"Bra, tack!" (Fine, thanks!) is the standard answer.',
  1, 10, 13
),

-- 14. Multiple choice: review
(
  (SELECT id FROM lessons WHERE slug = 'a1-1-your-first-conversation'),
  'multiple_choice',
  'What does "Var bor du?" mean?',
  'Vad betyder "Var bor du?"',
  '{"options": ["What is your name?", "How are you?", "Where do you live?", "Where do you come from?"]}'::jsonb,
  '"Where do you live?"'::jsonb,
  '"Var" = where, "bor" = live, "du" = you. "Var bor du?" = Where do you live?',
  1, 10, 14
);
