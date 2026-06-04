/**
 * Run migration 0006 via Supabase REST API.
 * Deletes existing exercises for each lesson and inserts expanded set.
 *
 * Usage: node scripts/run-migration-0006.mjs
 */

const SUPA_URL = "https://zaichpozqznooacwdkan.supabase.co";
const SUPA_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphaWNocG96cXpub29hY3dka2FuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI1MTMzMywiZXhwIjoyMDkxODI3MzMzfQ.KTVjnjup0KLA81L8YAAXCjthtOzehz4FxkqqXukgeWk";

const headers = {
  apikey: SUPA_KEY,
  Authorization: `Bearer ${SUPA_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=minimal",
};

async function api(method, path, body) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    method,
    headers: body ? headers : { ...headers, "Content-Type": undefined },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("json")) return res.json();
  return null;
}

async function getLessons() {
  const res = await fetch(
    `${SUPA_URL}/rest/v1/lessons?select=id,slug&slug=like.a1-1-*&order=order_index`,
    { headers }
  );
  return res.json();
}

async function deleteExercises(lessonId) {
  await api("DELETE", `exercises?lesson_id=eq.${lessonId}`);
}

async function insertExercises(exercises) {
  await api("POST", "exercises", exercises);
}

// ── Exercise data per lesson ──────────────────────────────

const EXERCISES = {
  "a1-1-saying-hello": [
    { exercise_type: "translation", instruction: 'How do you say "Hello" in Swedish?', instruction_sv: 'Hur säger man "Hello" på svenska?', question_data: { source: "Hello", direction: "en_to_sv" }, correct_answer: { answer: "Hej", alternatives: ["hej"] }, explanation: '"Hej" — the most universal Swedish greeting.', difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: 'How do you say "Good morning" in Swedish?', instruction_sv: 'Hur säger man "Good morning" på svenska?', question_data: { source: "Good morning", direction: "en_to_sv" }, correct_answer: { answer: "God morgon", alternatives: ["god morgon"] }, explanation: '"God morgon" — use it until about 10 am.', difficulty: 1, xp_reward: 10, order_index: 2 },
    { exercise_type: "translation", instruction: 'How do you say "Goodbye" in Swedish?', instruction_sv: 'Hur säger man "Goodbye" på svenska?', question_data: { source: "Goodbye", direction: "en_to_sv" }, correct_answer: { answer: "Hej då", alternatives: ["hej då", "Hej da"] }, explanation: '"Hej då" literally means "hey then."', difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "fill_blank", instruction: 'Complete the evening greeting: "God ___"', instruction_sv: 'Fyll i kvällshälsningen: "God ___"', question_data: { sentence: "God ___" }, correct_answer: { answer: "kväll", alternatives: ["Kväll"] }, explanation: '"God kväll" means "good evening."', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "fill_blank", instruction: 'Complete the goodbye phrase: "Ha det ___" (Take care)', instruction_sv: 'Fyll i: "Ha det ___"', question_data: { sentence: "Ha det ___" }, correct_answer: { answer: "bra", alternatives: ["Bra"] }, explanation: '"Ha det bra" means "take care."', difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "drag_drop", instruction: 'Put the words in order to say "Good morning".', instruction_sv: "Sätt orden i rätt ordning.", question_data: { words: ["morgon", "God"], hint: "Good morning" }, correct_answer: { answer: ["God", "morgon"] }, explanation: "Just like English — the adjective comes first.", difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "drag_drop", instruction: 'Build the phrase for "See you!"', instruction_sv: "Bygg frasen.", question_data: { words: ["ses", "Vi"], hint: "See you!" }, correct_answer: { answer: ["Vi", "ses"] }, explanation: '"Vi ses" literally means "we see each other."', difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "multiple_choice", instruction: "You run into a friend. What do you say to greet them?", instruction_sv: "Du träffar en vän. Vad säger du?", question_data: { dialogue: ["???", "Hej hej!", "Hur mår du?", "Bra, tack!"], blank_index: 0, options: ["Hej!", "Tack!", "Hej då!", "God natt!"] }, correct_answer: "Hej!", explanation: '"Hej!" is the natural way to greet someone.', difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "multiple_choice", instruction: "Your friend is leaving. Complete the farewell.", instruction_sv: "Din vän ska gå. Fyll i avskedet.", question_data: { dialogue: ["Jag måste gå nu.", "???", "Vi ses!"], blank_index: 1, options: ["God morgon!", "Hej då!", "Hej hej!", "God dag!"] }, correct_answer: "Hej då!", explanation: '"Hej då!" is the standard goodbye.', difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "matching", instruction: "Match the Swedish greetings with their English meanings.", instruction_sv: "Para ihop hälsningarna.", question_data: { pairs: [{ left: "Hej", right: "Hello" }, { left: "God morgon", right: "Good morning" }, { left: "Hej då", right: "Goodbye" }, { left: "God kväll", right: "Good evening" }, { left: "Vi ses", right: "See you" }] }, correct_answer: [["Hej", "Hello"], ["God morgon", "Good morning"], ["Hej då", "Goodbye"], ["God kväll", "Good evening"], ["Vi ses", "See you"]], explanation: "These five cover almost every greeting situation.", difficulty: 1, xp_reward: 15, order_index: 10 },
    { exercise_type: "multiple_choice", instruction: "Which greeting would you use at 8 in the morning?", instruction_sv: "Vilken hälsning använder du klockan 8 på morgonen?", question_data: { options: ["Hej då", "God morgon", "God kväll", "God dag"] }, correct_answer: "God morgon", explanation: '"God morgon" means "good morning" — until about 10 am.', difficulty: 1, xp_reward: 10, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: 'What does "Ha det bra" mean?', instruction_sv: 'Vad betyder "Ha det bra"?', question_data: { options: ["Good morning", "Take care", "See you later", "Thank you"] }, correct_answer: "Take care", explanation: '"Ha det bra" literally means "Have it good."', difficulty: 1, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-introducing-yourself": [
    { exercise_type: "translation", instruction: 'Translate to Swedish: "My name is Erik"', instruction_sv: "Översätt till svenska.", question_data: { source: "My name is Erik", direction: "en_to_sv" }, correct_answer: { answer: "Jag heter Erik", alternatives: ["jag heter Erik"] }, explanation: 'Swedish says "I am called" (Jag heter).', difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: 'Translate to Swedish: "Nice to meet you!"', instruction_sv: "Översätt till svenska.", question_data: { source: "Nice to meet you!", direction: "en_to_sv" }, correct_answer: { answer: "Trevligt att träffas!", alternatives: ["Trevligt att träffas", "trevligt att träffas"] }, explanation: '"Trevligt" (nice) + "att" (to) + "träffas" (meet).', difficulty: 2, xp_reward: 10, order_index: 2 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Jag ___ Anna."', instruction_sv: 'Fyll i: "Jag ___ Anna."', question_data: { sentence: "Jag ___ Anna." }, correct_answer: { answer: "heter", alternatives: ["Heter"] }, explanation: '"Jag heter" = I am called.', difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Trevligt att ___!"', instruction_sv: 'Fyll i: "Trevligt att ___!"', question_data: { sentence: "Trevligt att ___!" }, correct_answer: { answer: "träffas", alternatives: ["Träffas"] }, explanation: '"Trevligt att träffas" — said when meeting someone new.', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "fill_blank", instruction: 'Complete: "___ heter du?" (What is your name?)', instruction_sv: 'Fyll i: "___ heter du?"', question_data: { sentence: "___ heter du?" }, correct_answer: { answer: "Vad", alternatives: ["vad"] }, explanation: '"Vad" means "what."', difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "drag_drop", instruction: "Put the words in order to ask someone's name.", instruction_sv: "Sätt orden i rätt ordning.", question_data: { words: ["du?", "heter", "Vad"], hint: "What is your name?" }, correct_answer: { answer: ["Vad", "heter", "du?"] }, explanation: "Question word + Verb + Subject.", difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "multiple_choice", instruction: "Someone introduces themselves. What do you say back?", instruction_sv: "Någon presenterar sig. Vad säger du?", question_data: { dialogue: ["Hej! Jag heter Anna. Vad heter du?", "???", "Trevligt att träffas!"], blank_index: 1, options: ["Hej då!", "Bra, tack!", "Jag heter Erik. Trevligt att träffas!", "Ursäkta!"] }, correct_answer: "Jag heter Erik. Trevligt att träffas!", explanation: "Say your name back and add 'Trevligt att träffas!'", difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "multiple_choice", instruction: "You want to ask a new colleague their name.", instruction_sv: "Du vill fråga en ny kollega.", question_data: { dialogue: ["Hej!", "Hej!", "???", "Jag heter Lars."], blank_index: 2, options: ["Hur mår du?", "Vad heter du?", "Hej då!", "Var bor du?"] }, correct_answer: "Vad heter du?", explanation: '"Vad heter du?" — the go-to question.', difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "translation", instruction: '(Recall) How do you say "Good evening" in Swedish?', instruction_sv: "Översätt till svenska.", question_data: { source: "Good evening", direction: "en_to_sv" }, correct_answer: { answer: "God kväll", alternatives: ["god kväll"] }, explanation: 'From Lesson 1 — "God kväll" is used after about 5 pm.', difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "matching", instruction: "Match the Swedish phrases with their English meanings.", instruction_sv: "Para ihop fraserna.", question_data: { pairs: [{ left: "Jag heter...", right: "My name is..." }, { left: "Vad heter du?", right: "What is your name?" }, { left: "Trevligt att träffas!", right: "Nice to meet you!" }, { left: "Hej!", right: "Hello!" }] }, correct_answer: [["Jag heter...", "My name is..."], ["Vad heter du?", "What is your name?"], ["Trevligt att träffas!", "Nice to meet you!"], ["Hej!", "Hello!"]], explanation: "The backbone of any Swedish introduction.", difficulty: 1, xp_reward: 15, order_index: 10 },
    { exercise_type: "multiple_choice", instruction: "How do you ask someone's name in Swedish?", instruction_sv: "Hur frågar man om någons namn?", question_data: { options: ["Jag heter du?", "Vad heter du?", "Hej heter du?", "Du heter vad?"] }, correct_answer: "Vad heter du?", explanation: '"Vad heter du?" = What are you called?', difficulty: 1, xp_reward: 10, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: 'What does "Trevligt att träffas" mean?', instruction_sv: 'Vad betyder "Trevligt att träffas"?', question_data: { options: ["See you later", "Nice to meet you", "How are you?", "Thank you"] }, correct_answer: "Nice to meet you", explanation: '"Trevligt" = nice, "träffas" = to meet.', difficulty: 1, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-the-swedish-alphabet": [
    { exercise_type: "translation", instruction: "The Swedish word for 'apple' uses the letter ä. Can you write it?", instruction_sv: 'Kan du skriva det svenska ordet för "apple"?', question_data: { source: "apple", direction: "en_to_sv" }, correct_answer: { answer: "äpple", alternatives: ["Äpple"] }, explanation: '"Äpple" — notice the ä at the start.', difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: "The Swedish word for 'beer' uses ö. Write it.", instruction_sv: 'Skriv det svenska ordet för "beer".', question_data: { source: "beer", direction: "en_to_sv" }, correct_answer: { answer: "öl", alternatives: ["Öl"] }, explanation: '"Öl" — a short word with that distinctive ö.', difficulty: 1, xp_reward: 10, order_index: 2 },
    { exercise_type: "fill_blank", instruction: "The Swedish word for 'eight' starts with å: ___tta", instruction_sv: "Fyll i.", question_data: { sentence: "___tta" }, correct_answer: { answer: "å", alternatives: ["Å"] }, explanation: '"Åtta" means eight.', difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "fill_blank", instruction: "Swedish has ___ letters in its alphabet (write the number).", instruction_sv: "Det svenska alfabetet har ___ bokstäver.", question_data: { sentence: 'The Swedish alphabet has ___ letters.' }, correct_answer: { answer: "29", alternatives: ["twenty-nine"] }, explanation: "26 English letters + 3 extra (å, ä, ö) = 29.", difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "drag_drop", instruction: "Put these letters in correct Swedish alphabetical order.", instruction_sv: "Sätt bokstäverna i rätt ordning.", question_data: { words: ["Ö", "Z", "Å", "Ä"], hint: "End of the Swedish alphabet" }, correct_answer: { answer: ["Z", "Å", "Ä", "Ö"] }, explanation: "After Z: Å, then Ä, then Ö.", difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "drag_drop", instruction: "Put these letters in correct Swedish alphabetical order.", instruction_sv: "Sätt bokstäverna i rätt ordning.", question_data: { words: ["Ä", "X", "Y", "Å", "Ö"], hint: "End of the Swedish alphabet" }, correct_answer: { answer: ["X", "Y", "Å", "Ä", "Ö"] }, explanation: "X, Y come before the three special letters.", difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "fill_blank", instruction: '(Recall) Complete the goodbye: "Hej ___"', instruction_sv: "Fyll i.", question_data: { sentence: "Hej ___" }, correct_answer: { answer: "då", alternatives: ["Då", "da"] }, explanation: 'From Lesson 1 — "Hej då" = Goodbye.', difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "translation", instruction: '(Recall) How do you say "What is your name?" in Swedish?', instruction_sv: "Översätt till svenska.", question_data: { source: "What is your name?", direction: "en_to_sv" }, correct_answer: { answer: "Vad heter du?", alternatives: ["vad heter du?", "Vad heter du"] }, explanation: 'From Lesson 2 — "Vad heter du?"', difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "matching", instruction: "Match each Swedish letter to its approximate English sound.", instruction_sv: "Para ihop ljuden.", question_data: { pairs: [{ left: "Å", right: '"o" in more' }, { left: "Ä", right: '"e" in bed' }, { left: "Ö", right: '"i" in bird' }] }, correct_answer: [["Å", '"o" in more'], ["Ä", '"e" in bed'], ["Ö", '"i" in bird']], explanation: "Approximate English equivalents for Swedish letters.", difficulty: 1, xp_reward: 15, order_index: 9 },
    { exercise_type: "multiple_choice", instruction: "How many letters are in the Swedish alphabet?", instruction_sv: "Hur många bokstäver?", question_data: { options: ["26", "27", "28", "29"] }, correct_answer: "29", explanation: "26 English letters + å, ä, ö = 29.", difficulty: 1, xp_reward: 10, order_index: 10 },
    { exercise_type: "multiple_choice", instruction: "Which three letters come after Z in the Swedish alphabet?", instruction_sv: "Vilka tre bokstäver kommer efter Z?", question_data: { options: ["Ä, Ö, Å", "Å, Ä, Ö", "Ö, Å, Ä", "Å, Ö, Ä"] }, correct_answer: "Å, Ä, Ö", explanation: "The correct order is always Å, Ä, Ö.", difficulty: 1, xp_reward: 10, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: 'In a Swedish dictionary, where would you find "ål" (eel)?', instruction_sv: 'Var hittar du "ål"?', question_data: { options: ["With the A-words", "With the O-words", "After all Z-words", "Before the A-words"] }, correct_answer: "After all Z-words", explanation: "Å comes after Z in the Swedish alphabet.", difficulty: 1, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-swedish-sounds-vowels": [
    { exercise_type: "fill_blank", instruction: 'The word "bil" (car) has a ___ vowel because only one consonant follows it.', instruction_sv: 'Ordet "bil" har en ___ vokal.', question_data: { sentence: 'The word "bil" has a ___ vowel.' }, correct_answer: { answer: "long", alternatives: ["Long"] }, explanation: "One consonant after = long vowel.", difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "fill_blank", instruction: 'The word "tack" (thanks) has a ___ vowel because two consonants follow it.', instruction_sv: 'Ordet "tack" har en ___ vokal.', question_data: { sentence: 'The word "tack" has a ___ vowel.' }, correct_answer: { answer: "short", alternatives: ["Short"] }, explanation: "Two consonants (c+k) = short vowel.", difficulty: 1, xp_reward: 10, order_index: 2 },
    { exercise_type: "fill_blank", instruction: "Swedish has ___ vowels (write the number).", instruction_sv: "Svenskan har ___ vokaler.", question_data: { sentence: "Swedish has ___ vowels." }, correct_answer: { answer: "9", alternatives: ["nine"] }, explanation: "a, e, i, o, u, y, å, ä, ö = 9 vowels.", difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "translation", instruction: 'Write the Swedish word for "house" (uses the tricky vowel "u").', instruction_sv: 'Skriv det svenska ordet för "house".', question_data: { source: "house", direction: "en_to_sv" }, correct_answer: { answer: "hus", alternatives: ["Hus"] }, explanation: '"Hus" — the Swedish "u" is further forward.', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "translation", instruction: 'Write the Swedish word for "car".', instruction_sv: 'Skriv det svenska ordet för "car".', question_data: { source: "car", direction: "en_to_sv" }, correct_answer: { answer: "bil", alternatives: ["Bil"] }, explanation: '"Bil" — with a long "i" sound.', difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "translation", instruction: '(Recall) How do you say "See you" in Swedish?', instruction_sv: "Översätt till svenska.", question_data: { source: "See you", direction: "en_to_sv" }, correct_answer: { answer: "Vi ses", alternatives: ["vi ses"] }, explanation: 'From Lesson 1 — "Vi ses" = we see each other.', difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "fill_blank", instruction: '(Recall) Complete: "Trevligt att ___!"', instruction_sv: "Fyll i.", question_data: { sentence: "Trevligt att ___!" }, correct_answer: { answer: "träffas", alternatives: ["Träffas"] }, explanation: "From Lesson 2 — notice the ä in 'träffas.'", difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "matching", instruction: "Match each Swedish word to the vowel sound.", instruction_sv: "Para ihop ljuden.", question_data: { pairs: [{ left: "hus (house)", right: 'rounded "oo"' }, { left: "bär (berry)", right: '"e" in bed' }, { left: "åka (travel)", right: '"o" in more' }, { left: "öl (beer)", right: '"u" in burn' }] }, correct_answer: [["hus (house)", 'rounded "oo"'], ["bär (berry)", '"e" in bed'], ["åka (travel)", '"o" in more'], ["öl (beer)", '"u" in burn']], explanation: "Approximate English equivalents.", difficulty: 1, xp_reward: 15, order_index: 8 },
    { exercise_type: "multiple_choice", instruction: "How many vowels does Swedish have?", instruction_sv: "Hur många vokaler?", question_data: { options: ["5", "7", "9", "11"] }, correct_answer: "9", explanation: "a, e, i, o, u, y, å, ä, ö.", difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "multiple_choice", instruction: 'The Swedish letter "y" is pronounced like...', instruction_sv: 'Bokstaven "y" uttalas som...', question_data: { options: ['English "y" in "yes"', 'English "ee" with rounded lips', 'English "oo" in "food"', 'English "i" in "bit"'] }, correct_answer: 'English "ee" with rounded lips', explanation: "Swedish 'y' is a vowel — say 'ee' with rounded lips.", difficulty: 2, xp_reward: 10, order_index: 10 },
    { exercise_type: "multiple_choice", instruction: 'In "tack" (thanks), is the vowel long or short?', instruction_sv: "Lång eller kort vokal?", question_data: { options: ["Long — one consonant follows", "Short — two consonants follow"] }, correct_answer: "Short — two consonants follow", explanation: "Two consonants (c+k) after the vowel = short.", difficulty: 1, xp_reward: 10, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: "Which pair shows the long/short vowel difference?", instruction_sv: "Vilket par visar skillnaden?", question_data: { options: ["hej / hej då", "tak (roof) / tack (thanks)", "god / morgon", "hus / hem"] }, correct_answer: "tak (roof) / tack (thanks)", explanation: '"Tak" = long "a". "Tack" = short "a".', difficulty: 2, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-useful-little-words": [
    { exercise_type: "translation", instruction: 'How do you say "Thank you" in Swedish?', instruction_sv: 'Hur säger man "Thank you"?', question_data: { source: "Thank you", direction: "en_to_sv" }, correct_answer: { answer: "Tack", alternatives: ["tack"] }, explanation: '"Tack" — the most important polite word.', difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: 'How do you say "Excuse me" in Swedish?', instruction_sv: 'Hur säger man "Excuse me"?', question_data: { source: "Excuse me", direction: "en_to_sv" }, correct_answer: { answer: "Ursäkta", alternatives: ["ursäkta"] }, explanation: '"Ursäkta" — for getting attention or minor apologies.', difficulty: 1, xp_reward: 10, order_index: 2 },
    { exercise_type: "translation", instruction: 'How do you say "Thank you very much"?', instruction_sv: "Översätt till svenska.", question_data: { source: "Thank you very much", direction: "en_to_sv" }, correct_answer: { answer: "Tack så mycket", alternatives: ["tack så mycket"] }, explanation: '"Tack så mycket" = thanks so much.', difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Tack så ___!"', instruction_sv: "Fyll i.", question_data: { sentence: "Tack så ___!" }, correct_answer: { answer: "mycket", alternatives: ["Mycket"] }, explanation: '"Mycket" means "much/very."', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "fill_blank", instruction: 'You want to order coffee politely: "En kaffe, ___."', instruction_sv: "Fyll i.", question_data: { sentence: "En kaffe, ___." }, correct_answer: { answer: "tack", alternatives: ["Tack"] }, explanation: '"Tack" at the end works like "please."', difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "drag_drop", instruction: 'Put the words in order: "Thank you very much!"', instruction_sv: "Sätt orden i rätt ordning.", question_data: { words: ["mycket", "Tack", "så"], hint: "Thank you very much!" }, correct_answer: { answer: ["Tack", "så", "mycket"] }, explanation: "Same word order as English.", difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "multiple_choice", instruction: "The barista hands you your coffee. What do you say?", instruction_sv: "Baristan ger dig ditt kaffe. Vad säger du?", question_data: { dialogue: ["En kaffe, tack.", "Varsågod!", "???"], blank_index: 2, options: ["Hej!", "Tack!", "Förlåt!", "Nej!"] }, correct_answer: "Tack!", explanation: 'When someone gives you something ("Varsågod!"), say "Tack!"', difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "multiple_choice", instruction: "You accidentally bump into someone. What do you say?", instruction_sv: "Du stöter emot någon. Vad säger du?", question_data: { dialogue: ["???", "Det är lugnt!"], blank_index: 0, options: ["Tack!", "Varsågod!", "Ursäkta!", "Hej hej!"] }, correct_answer: "Ursäkta!", explanation: '"Ursäkta" for minor sorry moments. "Förlåt" for bigger apologies.', difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "translation", instruction: '(Recall) How do you say "Good evening"?', instruction_sv: "Översätt till svenska.", question_data: { source: "Good evening", direction: "en_to_sv" }, correct_answer: { answer: "God kväll", alternatives: ["god kväll"] }, explanation: "From Lesson 1.", difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "fill_blank", instruction: '(Recall) Complete: "Jag ___ Anna."', instruction_sv: "Fyll i.", question_data: { sentence: "Jag ___ Anna." }, correct_answer: { answer: "heter", alternatives: ["Heter"] }, explanation: 'From Lesson 2 — "Jag heter" = I am called.', difficulty: 1, xp_reward: 10, order_index: 10 },
    { exercise_type: "matching", instruction: "Match the Swedish words with their English meanings.", instruction_sv: "Para ihop orden.", question_data: { pairs: [{ left: "Ja", right: "Yes" }, { left: "Nej", right: "No" }, { left: "Tack", right: "Thank you" }, { left: "Ursäkta", right: "Excuse me" }, { left: "Varsågod", right: "You're welcome" }] }, correct_answer: [["Ja", "Yes"], ["Nej", "No"], ["Tack", "Thank you"], ["Ursäkta", "Excuse me"], ["Varsågod", "You're welcome"]], explanation: "The five core politeness words.", difficulty: 1, xp_reward: 15, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: 'What does "varsågod" mean?', instruction_sv: 'Vad betyder "varsågod"?', question_data: { options: ["Thank you", "You're welcome / Here you go", "Excuse me", "Please"] }, correct_answer: "You're welcome / Here you go", explanation: '"Varsågod" responds to "tack."', difficulty: 1, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-how-are-you": [
    { exercise_type: "translation", instruction: 'Translate to Swedish: "Fine, thanks!"', instruction_sv: "Översätt till svenska.", question_data: { source: "Fine, thanks!", direction: "en_to_sv" }, correct_answer: { answer: "Bra, tack!", alternatives: ["Bra tack", "Bra, tack", "bra, tack"] }, explanation: "The most common answer to 'Hur mår du?'", difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: 'How do you say "And you?"', instruction_sv: "Översätt till svenska.", question_data: { source: "And you?", direction: "en_to_sv" }, correct_answer: { answer: "Och du?", alternatives: ["och du?", "Och du"] }, explanation: '"Och" = and, "du" = you.', difficulty: 1, xp_reward: 10, order_index: 2 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Bra, ___!"', instruction_sv: "Fyll i.", question_data: { sentence: "Bra, ___!" }, correct_answer: { answer: "tack", alternatives: ["Tack"] }, explanation: '"Bra, tack!" — the standard positive answer.', difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "fill_blank", instruction: 'Complete: "___ mår du?"', instruction_sv: "Fyll i.", question_data: { sentence: "___ mår du?" }, correct_answer: { answer: "Hur", alternatives: ["hur"] }, explanation: '"Hur" means "how."', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "drag_drop", instruction: 'Put the words in order: "How are you?"', instruction_sv: "Sätt orden i rätt ordning.", question_data: { words: ["du?", "mår", "Hur"], hint: "How are you?" }, correct_answer: { answer: ["Hur", "mår", "du?"] }, explanation: "Question word + Verb + Subject.", difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "drag_drop", instruction: 'Build: "Not so good"', instruction_sv: "Bygg frasen.", question_data: { words: ["bra", "så", "Inte"], hint: "Not so good" }, correct_answer: { answer: ["Inte", "så", "bra"] }, explanation: '"Inte" = not, "så" = so.', difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "multiple_choice", instruction: "Someone asks how you are. What do you say?", instruction_sv: "Vad svarar du?", question_data: { dialogue: ["Hej! Hur mår du?", "???", "Jättebra, tack!"], blank_index: 1, options: ["Hej då!", "Jag heter Anna.", "Bra, tack! Och du?", "Ursäkta!"] }, correct_answer: "Bra, tack! Och du?", explanation: "Answer + ask back with 'Och du?'", difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "multiple_choice", instruction: "You meet a friend. Fill in the missing line.", instruction_sv: "Fyll i.", question_data: { dialogue: ["Hej!", "Hej! ???", "Bra, tack!"], blank_index: 1, options: ["Hej då!", "Hur mår du?", "Jag heter Erik.", "Var bor du?"] }, correct_answer: "Hur mår du?", explanation: "After greeting, ask how they are.", difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "translation", instruction: '(Recall) How do you say "Excuse me"?', instruction_sv: "Översätt till svenska.", question_data: { source: "Excuse me", direction: "en_to_sv" }, correct_answer: { answer: "Ursäkta", alternatives: ["ursäkta"] }, explanation: "From Lesson 5.", difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "fill_blank", instruction: '(Recall) Complete: "Ha det ___"', instruction_sv: "Fyll i.", question_data: { sentence: "Ha det ___" }, correct_answer: { answer: "bra", alternatives: ["Bra"] }, explanation: 'From Lesson 1 — "Ha det bra" = Take care.', difficulty: 1, xp_reward: 10, order_index: 10 },
    { exercise_type: "matching", instruction: "Match the Swedish responses.", instruction_sv: "Para ihop svaren.", question_data: { pairs: [{ left: "Bra, tack!", right: "Fine, thanks!" }, { left: "Jättebra!", right: "Really great!" }, { left: "Inte så bra", right: "Not so good" }, { left: "Och du?", right: "And you?" }] }, correct_answer: [["Bra, tack!", "Fine, thanks!"], ["Jättebra!", "Really great!"], ["Inte så bra", "Not so good"], ["Och du?", "And you?"]], explanation: "Common responses to 'Hur mår du?'", difficulty: 1, xp_reward: 15, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: 'What does "jättebra" mean?', instruction_sv: 'Vad betyder "jättebra"?', question_data: { options: ["A little good", "Not good", "Really great", "Okay"] }, correct_answer: "Really great", explanation: '"Jätte-" = really/very. Jättebra = really great.', difficulty: 1, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-where-are-you-from": [
    { exercise_type: "translation", instruction: 'Translate: "I come from Sweden."', instruction_sv: "Översätt till svenska.", question_data: { source: "I come from Sweden.", direction: "en_to_sv" }, correct_answer: { answer: "Jag kommer från Sverige.", alternatives: ["Jag kommer från Sverige", "jag kommer från Sverige"] }, explanation: '"Jag kommer från" + country.', difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: 'Translate: "Where do you come from?"', instruction_sv: "Översätt till svenska.", question_data: { source: "Where do you come from?", direction: "en_to_sv" }, correct_answer: { answer: "Var kommer du ifrån?", alternatives: ["Var kommer du ifrån"] }, explanation: '"Ifrån" goes at the end.', difficulty: 2, xp_reward: 10, order_index: 2 },
    { exercise_type: "translation", instruction: 'Translate: "I live in Stockholm."', instruction_sv: "Översätt till svenska.", question_data: { source: "I live in Stockholm.", direction: "en_to_sv" }, correct_answer: { answer: "Jag bor i Stockholm.", alternatives: ["Jag bor i Stockholm", "jag bor i Stockholm"] }, explanation: '"Bor" = live (reside).', difficulty: 1, xp_reward: 10, order_index: 3 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Jag ___ från Sverige."', instruction_sv: "Fyll i.", question_data: { sentence: "Jag ___ från Sverige." }, correct_answer: { answer: "kommer", alternatives: ["Kommer"] }, explanation: '"Kommer" = come/comes.', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Jag ___ i Stockholm."', instruction_sv: "Fyll i.", question_data: { sentence: "Jag ___ i Stockholm." }, correct_answer: { answer: "bor", alternatives: ["Bor"] }, explanation: '"Bor" = live (reside).', difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "drag_drop", instruction: 'Build: "Where do you come from?"', instruction_sv: "Sätt orden i rätt ordning.", question_data: { words: ["du", "ifrån?", "kommer", "Var"], hint: "Where do you come from?" }, correct_answer: { answer: ["Var", "kommer", "du", "ifrån?"] }, explanation: "Verb comes right after the question word.", difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "multiple_choice", instruction: "Someone asks where you're from. Answer them.", instruction_sv: "Svara på frågan.", question_data: { dialogue: ["Var kommer du ifrån?", "???", "Jättekul! Jag kommer från Sverige."], blank_index: 1, options: ["Jag heter Anna.", "Bra, tack!", "Jag kommer från England.", "Hej då!"] }, correct_answer: "Jag kommer från England.", explanation: 'Answer with "Jag kommer från" + country.', difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "multiple_choice", instruction: "What do you ask to find out where someone lives?", instruction_sv: "Vad frågar du?", question_data: { dialogue: ["Jag bor i Göteborg.", "???", "Jag bor i Stockholm."], blank_index: 1, options: ["Vad heter du?", "Hur mår du?", "Var bor du?", "Hej då!"] }, correct_answer: "Var bor du?", explanation: '"Var bor du?" = Where do you live?', difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "translation", instruction: '(Recall) Translate: "Really great!"', instruction_sv: "Översätt till svenska.", question_data: { source: "Really great!", direction: "en_to_sv" }, correct_answer: { answer: "Jättebra!", alternatives: ["Jättebra", "jättebra"] }, explanation: 'From Lesson 6 — "Jätte-" = really/very.', difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "fill_blank", instruction: '(Recall) "En kaffe, ___."', instruction_sv: "Fyll i.", question_data: { sentence: "En kaffe, ___." }, correct_answer: { answer: "tack", alternatives: ["Tack"] }, explanation: "From Lesson 5 — 'tack' works like 'please.'", difficulty: 1, xp_reward: 10, order_index: 10 },
    { exercise_type: "matching", instruction: "Match the Swedish country names.", instruction_sv: "Para ihop landsnamnen.", question_data: { pairs: [{ left: "Sverige", right: "Sweden" }, { left: "Tyskland", right: "Germany" }, { left: "Frankrike", right: "France" }, { left: "Spanien", right: "Spain" }] }, correct_answer: [["Sverige", "Sweden"], ["Tyskland", "Germany"], ["Frankrike", "France"], ["Spanien", "Spain"]], explanation: '"Tyskland" and "Frankrike" are the trickiest.', difficulty: 1, xp_reward: 15, order_index: 11 },
    { exercise_type: "multiple_choice", instruction: 'How do you say "I come from..."?', instruction_sv: 'Hur säger man "I come from..."?', question_data: { options: ["Jag bor i...", "Jag heter...", "Jag kommer från...", "Jag mår..."] }, correct_answer: "Jag kommer från...", explanation: '"Jag kommer från" = I come from.', difficulty: 1, xp_reward: 10, order_index: 12 },
  ],

  "a1-1-your-first-conversation": [
    { exercise_type: "translation", instruction: 'Translate: "My name is Anna."', instruction_sv: "Översätt till svenska.", question_data: { source: "My name is Anna.", direction: "en_to_sv" }, correct_answer: { answer: "Jag heter Anna.", alternatives: ["Jag heter Anna", "jag heter Anna"] }, explanation: '"Jag heter" = I am called.', difficulty: 1, xp_reward: 10, order_index: 1 },
    { exercise_type: "translation", instruction: 'Translate: "I come from England."', instruction_sv: "Översätt till svenska.", question_data: { source: "I come from England.", direction: "en_to_sv" }, correct_answer: { answer: "Jag kommer från England.", alternatives: ["Jag kommer från England", "jag kommer från England"] }, explanation: '"Jag kommer från" + country.', difficulty: 1, xp_reward: 10, order_index: 2 },
    { exercise_type: "translation", instruction: 'Translate: "Nice to meet you!"', instruction_sv: "Översätt till svenska.", question_data: { source: "Nice to meet you!", direction: "en_to_sv" }, correct_answer: { answer: "Trevligt att träffas!", alternatives: ["Trevligt att träffas", "trevligt att träffas"] }, explanation: "Said by both people when meeting.", difficulty: 2, xp_reward: 15, order_index: 3 },
    { exercise_type: "fill_blank", instruction: 'Complete: — Hur mår du? — Bra, ___!', instruction_sv: "Fyll i.", question_data: { sentence: "Bra, ___!" }, correct_answer: { answer: "tack", alternatives: ["Tack"] }, explanation: '"Bra, tack!" — the standard positive answer.', difficulty: 1, xp_reward: 10, order_index: 4 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Var kommer du ___?"', instruction_sv: "Fyll i.", question_data: { sentence: "Var kommer du ___?" }, correct_answer: { answer: "ifrån", alternatives: ["Ifrån"] }, explanation: '"Ifrån" goes at the end.', difficulty: 1, xp_reward: 10, order_index: 5 },
    { exercise_type: "fill_blank", instruction: 'Complete: "Jag kommer ___ Sverige."', instruction_sv: "Fyll i.", question_data: { sentence: "Jag kommer ___ Sverige." }, correct_answer: { answer: "från", alternatives: ["Från"] }, explanation: '"Från" = from.', difficulty: 1, xp_reward: 10, order_index: 6 },
    { exercise_type: "drag_drop", instruction: 'Build: "My name is Anna"', instruction_sv: "Bygg en mening.", question_data: { words: ["Anna", "heter", "Jag"], hint: "My name is Anna" }, correct_answer: { answer: ["Jag", "heter", "Anna"] }, explanation: "Subject + Verb + Name.", difficulty: 1, xp_reward: 10, order_index: 7 },
    { exercise_type: "multiple_choice", instruction: "You meet someone at fika. They greet you. What do you say?", instruction_sv: "Vad säger du?", question_data: { dialogue: ["Hej!", "???", "Jag heter Lars. Trevligt att träffas!", "Trevligt att träffas!"], blank_index: 1, options: ["Hej då!", "Hej! Jag heter Denise. Vad heter du?", "Ursäkta!", "Bra, tack!"] }, correct_answer: "Hej! Jag heter Denise. Vad heter du?", explanation: "Greet, introduce yourself, ask their name.", difficulty: 1, xp_reward: 10, order_index: 8 },
    { exercise_type: "multiple_choice", instruction: "At a party, someone asks where you're from.", instruction_sv: "Vad svarar du?", question_data: { dialogue: ["Var kommer du ifrån?", "???", "Jättekul! Jag bor i Malmö."], blank_index: 1, options: ["Bra, tack!", "Jag heter David.", "Jag kommer från England.", "Hej då!"] }, correct_answer: "Jag kommer från England.", explanation: '"Jag kommer från" + country.', difficulty: 1, xp_reward: 10, order_index: 9 },
    { exercise_type: "multiple_choice", instruction: 'You\'re leaving a café. Staff says "Ha det bra!" What do you say?', instruction_sv: "Vad säger du?", question_data: { dialogue: ["Varsågod!", "Tack så mycket!", "Ha det bra!", "???"], blank_index: 3, options: ["God morgon!", "Tack! Hej då!", "Jag heter Anna.", "Ursäkta!"] }, correct_answer: "Tack! Hej då!", explanation: "Natural goodbye: thanks + bye.", difficulty: 1, xp_reward: 10, order_index: 10 },
    { exercise_type: "multiple_choice", instruction: "After introductions, what comes next?", instruction_sv: "Vad säger man härnäst?", question_data: { dialogue: ["Jag heter Erik. Trevligt att träffas!", "Trevligt att träffas!", "???", "Bra, tack! Och du?"], blank_index: 2, options: ["Hej då!", "Var bor du?", "Hur mår du?", "Tack!"] }, correct_answer: "Hur mår du?", explanation: 'After "Nice to meet you," ask "How are you?"', difficulty: 1, xp_reward: 10, order_index: 11 },
    { exercise_type: "matching", instruction: "Match each phrase with the right situation.", instruction_sv: "Para ihop fraserna.", question_data: { pairs: [{ left: "Hej!", right: "Greeting someone" }, { left: "Hur mår du?", right: "Asking how someone is" }, { left: "Jag kommer från...", right: "Saying where you're from" }, { left: "Hej då!", right: "Saying goodbye" }, { left: "Tack!", right: "Thanking someone" }] }, correct_answer: [["Hej!", "Greeting someone"], ["Hur mår du?", "Asking how someone is"], ["Jag kommer från...", "Saying where you're from"], ["Hej då!", "Saying goodbye"], ["Tack!", "Thanking someone"]], explanation: "The backbone of any first conversation.", difficulty: 1, xp_reward: 15, order_index: 12 },
    { exercise_type: "multiple_choice", instruction: 'Someone says "Hur mår du?" What\'s a good response?', instruction_sv: "Vad svarar du?", question_data: { options: ["Jag heter Erik", "Bra, tack!", "Hej då!", "Ursäkta"] }, correct_answer: "Bra, tack!", explanation: '"Bra, tack!" = Fine, thanks!', difficulty: 1, xp_reward: 10, order_index: 13 },
    { exercise_type: "multiple_choice", instruction: 'What does "Var bor du?" mean?', instruction_sv: 'Vad betyder "Var bor du?"', question_data: { options: ["What is your name?", "How are you?", "Where do you live?", "Where do you come from?"] }, correct_answer: "Where do you live?", explanation: '"Var" = where, "bor" = live, "du" = you.', difficulty: 1, xp_reward: 10, order_index: 14 },
  ],
};

// ── Main ──────────────────────────────────────────────────

async function main() {
  console.log("Fetching lesson IDs...");
  const lessons = await getLessons();
  const slugToId = Object.fromEntries(lessons.map((l) => [l.slug, l.id]));

  for (const [slug, exercises] of Object.entries(EXERCISES)) {
    const lessonId = slugToId[slug];
    if (!lessonId) {
      console.error(`  ✗ Lesson not found: ${slug}`);
      continue;
    }

    console.log(`  Deleting old exercises for ${slug}...`);
    await deleteExercises(lessonId);

    const rows = exercises.map((ex) => ({
      lesson_id: lessonId,
      ...ex,
    }));

    console.log(`  Inserting ${rows.length} new exercises for ${slug}...`);
    await insertExercises(rows);
    console.log(`  ✓ ${slug}: ${rows.length} exercises`);
  }

  console.log("\nDone! Total exercises inserted:");
  const total = Object.values(EXERCISES).reduce((s, e) => s + e.length, 0);
  console.log(`  ${total} exercises across ${Object.keys(EXERCISES).length} lessons`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
