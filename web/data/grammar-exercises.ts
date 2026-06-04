import type { Exercise } from "@/app/(content)/grammar/[topic]/grammar-exercises";

/**
 * Exercises keyed by grammar topic slug.
 * Each topic gets 6–8 exercises mixing fill-blank, multiple-choice, and reorder.
 */
export const GRAMMAR_EXERCISES: Record<string, Exercise[]> = {
  // ─── En or ett? ───
  "en-vs-ett": [
    {
      kind: "fill-blank",
      prompt: "Jag köpte ___ bok.",
      answer: "en",
      distractors: ["ett", "den", "det"],
      explanation: "'Bok' is an en-word (common gender). So: en bok.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi bor i ___ stort hus.",
      answer: "ett",
      distractors: ["en", "den", "de"],
      explanation:
        "'Hus' is an ett-word (neuter). The adjective also takes the -t form: stort.",
    },
    {
      kind: "multiple-choice",
      question: "Which of these is an ett-word?",
      answer: "ett bord (a table)",
      distractors: [
        "en stol (a chair)",
        "en lampa (a lamp)",
        "en väska (a bag)",
      ],
      explanation:
        "'Bord' is neuter (ett-word). Stol, lampa, and väska are all en-words.",
    },
    {
      kind: "fill-blank",
      prompt: "Hon har ___ hund och ___ katt.",
      answer: "en … en",
      distractors: ["ett … ett", "en … ett", "ett … en"],
      explanation: "Both 'hund' and 'katt' are en-words.",
    },
    {
      kind: "multiple-choice",
      question:
        "Words ending in -tion (like station, lektion) are usually…",
      answer: "en-words",
      distractors: ["ett-words", "both equally", "always irregular"],
      explanation:
        "Words ending in -tion are almost always en-words: en station, en lektion, en nation.",
    },
    {
      kind: "fill-blank",
      prompt: "Det är ___ fint äpple.",
      answer: "ett",
      distractors: ["en", "den", "de"],
      explanation:
        "'Äpple' is an ett-word. The adjective takes -t form: fint.",
    },
    {
      kind: "multiple-choice",
      question: "About what percentage of Swedish nouns are en-words?",
      answer: "75%",
      distractors: ["50%", "25%", "90%"],
      explanation:
        "Roughly 75% of Swedish nouns are en-words. When in doubt, en is the safer guess.",
    },
  ],

  // ─── The definite form ───
  "definite-form": [
    {
      kind: "fill-blank",
      prompt: "Jag gillar ___. (the book)",
      answer: "boken",
      distractors: ["boket", "boka", "böckerna"],
      explanation:
        "'Bok' is an en-word, so the definite is bok + en = boken.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi säljer ___. (the house)",
      answer: "huset",
      distractors: ["husen", "husa", "huserna"],
      explanation:
        "'Hus' is an ett-word, so the definite is hus + et = huset.",
    },
    {
      kind: "multiple-choice",
      question: "How do you say 'the girl' in Swedish?",
      answer: "flickan",
      distractors: ["flicken", "flickaen", "flicket"],
      explanation:
        "'Flicka' is an en-word ending in -a. The -a changes to -an: flickan.",
    },
    {
      kind: "fill-blank",
      prompt: "___ röda bilen är min. (The red car)",
      answer: "Den",
      distractors: ["Det", "De", "En"],
      explanation:
        "With an adjective + definite noun, you need the 'double definite': Den + röda + bilen. 'Bil' is an en-word → den.",
    },
    {
      kind: "multiple-choice",
      question: "What is the definite form of 'ett kaffe'?",
      answer: "kaffet",
      distractors: ["kaffeen", "kaffen", "kaffena"],
      explanation:
        "'Kaffe' is an ett-word ending in -e. The definite just adds -t: kaffet.",
    },
    {
      kind: "reorder",
      prompt: "Put the words in order to say 'the big house':",
      words: ["det", "stora", "huset"],
      explanation:
        "Double definite: det (free article) + stora (adjective, -a form) + huset (noun with suffix).",
    },
  ],

  // ─── Plurals ───
  plurals: [
    {
      kind: "fill-blank",
      prompt: "en flicka → två ___",
      answer: "flickor",
      distractors: ["flickar", "flickaer", "flicken"],
      explanation:
        "Group 1: en-words ending in -a drop the -a and add -or. Flicka → flickor.",
    },
    {
      kind: "fill-blank",
      prompt: "en bil → tre ___",
      answer: "bilar",
      distractors: ["bilor", "biler", "bilerna"],
      explanation:
        "Group 2: en-words ending in a consonant usually add -ar. Bil → bilar.",
    },
    {
      kind: "multiple-choice",
      question: "What is the plural of 'ett barn' (a child)?",
      answer: "barn",
      distractors: ["barnar", "barner", "barnen"],
      explanation:
        "Group 5: ett-words ending in a consonant have no change in the plural. Ett barn → barn.",
    },
    {
      kind: "fill-blank",
      prompt: "ett äpple → fyra ___",
      answer: "äpplen",
      distractors: ["äppler", "äpplor", "äpplear"],
      explanation:
        "Group 4: ett-words ending in a vowel add -n. Äpple → äpplen.",
    },
    {
      kind: "multiple-choice",
      question: "Which plural group does 'en lampa → lampor' belong to?",
      answer: "Group 1 (-or)",
      distractors: ["Group 2 (-ar)", "Group 3 (-er)", "Group 5 (no change)"],
      explanation:
        "En-words ending in -a go to Group 1: drop the -a, add -or.",
    },
    {
      kind: "fill-blank",
      prompt: "bilar → ___ (the cars)",
      answer: "bilarna",
      distractors: ["bilaren", "bilorna", "bilaerna"],
      explanation:
        "Definite plural for groups 1–3 adds -na to the plural: bilar → bilarna.",
    },
  ],

  // ─── Present tense ───
  "present-tense": [
    {
      kind: "fill-blank",
      prompt: "Jag ___ svenska. (speak)",
      answer: "talar",
      distractors: ["talat", "talade", "tala"],
      explanation:
        "'Tala' is a group 1 verb. Present tense: talar. Same form for all persons.",
    },
    {
      kind: "fill-blank",
      prompt: "Hon ___ i Stockholm. (lives)",
      answer: "bor",
      distractors: ["boar", "boer", "bott"],
      explanation:
        "'Bo' is a group 3 verb. Present tense just adds -r: bor.",
    },
    {
      kind: "multiple-choice",
      question: "What is the present tense of 'skriva' (to write)?",
      answer: "skriver",
      distractors: ["skrivar", "skrivir", "skrev"],
      explanation:
        "'Skriva' is a group 4 (irregular) verb. Present tense: skriver.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi ___ kaffe varje morgon. (drink)",
      answer: "dricker",
      distractors: ["drickar", "drickor", "drack"],
      explanation:
        "'Dricka' is irregular. Present tense: dricker.",
    },
    {
      kind: "multiple-choice",
      question:
        "In Swedish, do verbs change form for different persons (I, you, she, we)?",
      answer: "No — the form is the same for all persons",
      distractors: [
        "Yes — like English, they change",
        "Only for he/she/it",
        "Only in formal speech",
      ],
      explanation:
        "One of the easiest things about Swedish: the verb form is the same for every person. Jag talar, du talar, hon talar, vi talar.",
    },
    {
      kind: "fill-blank",
      prompt: "Vad ___ du? (do/are doing)",
      answer: "gör",
      distractors: ["görar", "görer", "gjorde"],
      explanation:
        "'Göra' (to do/make) is irregular. Present tense: gör.",
    },
    {
      kind: "reorder",
      prompt: "Build the sentence: 'She speaks Swedish every day.'",
      words: ["Hon", "talar", "svenska", "varje", "dag."],
      explanation:
        "Standard SVO order: Hon (subject) talar (verb) svenska (object) varje dag (time).",
    },
  ],

  // ─── Past tense ───
  "past-tense": [
    {
      kind: "fill-blank",
      prompt: "Jag ___ med henne igår. (spoke)",
      answer: "talade",
      distractors: ["talar", "talat", "tala"],
      explanation:
        "Group 1 verbs form the past with -ade: tala → talade.",
    },
    {
      kind: "fill-blank",
      prompt: "Hon ___ en ny bil förra veckan. (bought)",
      answer: "köpte",
      distractors: ["köpade", "köpde", "köpt"],
      explanation:
        "'Köpa' is group 2b. The stem ends in -p (voiceless), so add -te: köpte.",
    },
    {
      kind: "multiple-choice",
      question: "What is the past tense of 'gå' (to go/walk)?",
      answer: "gick",
      distractors: ["gådde", "gåade", "gåtte"],
      explanation:
        "'Gå' is an irregular (group 4) verb. Past tense: gick.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi ___ till restaurangen. (went)",
      answer: "gick",
      distractors: ["gådde", "gåde", "går"],
      explanation: "Gå → gick (irregular).",
    },
    {
      kind: "multiple-choice",
      question:
        "Group 2 past tense uses -de or -te. Which rule determines which?",
      answer: "Voiced stem → -de, voiceless stem → -te",
      distractors: [
        "Short stem → -de, long stem → -te",
        "En-verbs → -de, ett-verbs → -te",
        "It's random — memorise each one",
      ],
      explanation:
        "The voicing rule: if the stem ends in a voiced consonant (b, d, g, l, m, n, r, v), add -de. Voiceless (k, p, s, t) → -te.",
    },
    {
      kind: "fill-blank",
      prompt: "Han ___ hela natten. (wrote)",
      answer: "skrev",
      distractors: ["skrivade", "skrivde", "skrivit"],
      explanation:
        "'Skriva' is group 4 (irregular). Past tense: skrev (vowel change i → e).",
    },
  ],

  // ─── Perfect tense (supinum) ───
  "supinum-perfect": [
    {
      kind: "fill-blank",
      prompt: "Jag har ___ i Sverige i tre år. (lived)",
      answer: "bott",
      distractors: ["bodde", "bodd", "bor"],
      explanation:
        "'Bo' is group 3. Supinum: bott. → Jag har bott.",
    },
    {
      kind: "fill-blank",
      prompt: "Har du ___ lunch? (eaten)",
      answer: "ätit",
      distractors: ["åt", "äter", "ätad"],
      explanation:
        "'Äta' is group 4 (irregular). Supinum: ätit.",
    },
    {
      kind: "multiple-choice",
      question: "When should you use the perfect tense (har + supinum) instead of simple past?",
      answer: "When the action is relevant to now, or the time isn't specified",
      distractors: [
        "Only for formal writing",
        "Only for actions in the distant past",
        "Only with irregular verbs",
      ],
      explanation:
        "Perfect = relevant now ('I have eaten' — so I'm not hungry). Past = finished at a specific time ('I ate at noon').",
    },
    {
      kind: "fill-blank",
      prompt: "Hon har ___ en bok. (written)",
      answer: "skrivit",
      distractors: ["skrev", "skriver", "skriva"],
      explanation:
        "'Skriva' is group 4. Supinum: skrivit.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi har ___ mycket idag. (talked)",
      answer: "talat",
      distractors: ["talade", "talar", "tala"],
      explanation:
        "'Tala' is group 1. Supinum: talat (stem + -at).",
    },
    {
      kind: "multiple-choice",
      question: "What is the supinum of 'ringa' (to call)?",
      answer: "ringt",
      distractors: ["ringat", "ringit", "ringde"],
      explanation:
        "'Ringa' is group 2a. Supinum: ringt (stem + -t).",
    },
  ],

  // ─── V2 word order ───
  "v2-word-order": [
    {
      kind: "reorder",
      prompt: "Rearrange to say 'Tomorrow I eat breakfast.':",
      words: ["Imorgon", "äter", "jag", "frukost."],
      explanation:
        "V2 rule: 'Imorgon' takes position 1, so the verb 'äter' must be position 2, with subject 'jag' after it (inversion).",
    },
    {
      kind: "multiple-choice",
      question:
        "In 'I Sverige bor jag.' — why does 'jag' come after 'bor'?",
      answer: "Because 'I Sverige' is in position 1, so the verb must be position 2 (inversion)",
      distractors: [
        "It's a question",
        "It's a subordinate clause",
        "That's just a common phrase",
      ],
      explanation:
        "When anything other than the subject is in position 1, the subject and verb swap. This is the V2 rule.",
    },
    {
      kind: "reorder",
      prompt: "Put in order: 'Every day she drinks coffee.'",
      words: ["Varje", "dag", "dricker", "hon", "kaffe."],
      explanation:
        "'Varje dag' is position 1, 'dricker' must be position 2, 'hon' follows (inversion).",
    },
    {
      kind: "fill-blank",
      prompt: "Jag dricker ___ kaffe. (not — main clause)",
      answer: "inte",
      distractors: ["aldrig inte", "ej", "icke"],
      explanation:
        "In a main clause, 'inte' goes AFTER the verb: Jag dricker inte kaffe.",
    },
    {
      kind: "multiple-choice",
      question:
        "In a subordinate clause, where does 'inte' go?",
      answer: "Before the verb",
      distractors: [
        "After the verb (same as main clause)",
        "At the end of the clause",
        "Before the subject",
      ],
      explanation:
        "BIFF rule: in a subordinate clause (bisats), 'inte' goes BEFORE the finite verb. '…eftersom jag inte dricker kaffe.'",
    },
    {
      kind: "reorder",
      prompt: "Build: '…because I don't drink coffee.'",
      words: ["…eftersom", "jag", "inte", "dricker", "kaffe."],
      explanation:
        "Subordinate clause: subject (jag) → adverb (inte) → verb (dricker). The BIFF rule in action.",
    },
  ],

  // ─── Questions ───
  questions: [
    {
      kind: "reorder",
      prompt: "Turn 'Du talar svenska.' into a question:",
      words: ["Talar", "du", "svenska?"],
      explanation:
        "For yes/no questions, swap the subject and verb: Du talar → Talar du?",
    },
    {
      kind: "fill-blank",
      prompt: "___ bor du? (Where do you live?)",
      answer: "Var",
      distractors: ["Vad", "Vem", "När"],
      explanation: "'Var' = where. Var bor du?",
    },
    {
      kind: "multiple-choice",
      question:
        "How do you form a yes/no question in Swedish?",
      answer: "Put the verb before the subject",
      distractors: [
        "Add 'gör' before the sentence (like English 'do')",
        "Add a question particle at the end",
        "Just raise your voice — word order doesn't change",
      ],
      explanation:
        "Swedish uses inversion (verb before subject) for yes/no questions. No auxiliary needed.",
    },
    {
      kind: "fill-blank",
      prompt: "___ gör du? (What are you doing?)",
      answer: "Vad",
      distractors: ["Var", "Vem", "Hur"],
      explanation: "'Vad' = what. Vad gör du?",
    },
    {
      kind: "reorder",
      prompt: "Ask: 'When are you coming?'",
      words: ["När", "kommer", "du?"],
      explanation:
        "Wh-questions: question word first, then verb (V2 still applies), then subject.",
    },
    {
      kind: "multiple-choice",
      question:
        "In an indirect question like 'Jag undrar om du talar svenska', why doesn't the verb come before 'du'?",
      answer: "Because indirect questions use subordinate clause word order (no inversion)",
      distractors: [
        "It's optional — both orders are correct",
        "Because 'undrar' is already the main verb",
        "Because 'om' cancels the question inversion",
      ],
      explanation:
        "Indirect questions are subordinate clauses, so they use normal (non-inverted) word order: …om du talar svenska.",
    },
  ],

  // ─── Personal pronouns ───
  "personal-pronouns": [
    {
      kind: "fill-blank",
      prompt: "Kan du hjälpa ___? (me)",
      answer: "mig",
      distractors: ["jag", "min", "mitt"],
      explanation:
        "'Me' is the object form: mig. (Subject = jag, object = mig.)",
    },
    {
      kind: "fill-blank",
      prompt: "Jag ser ___. (him)",
      answer: "honom",
      distractors: ["han", "hans", "hen"],
      explanation: "Object form of 'han' (he) is 'honom' (him).",
    },
    {
      kind: "multiple-choice",
      question: "How are 'de' and 'dem' pronounced in spoken Swedish?",
      answer: "Both are pronounced 'dom'",
      distractors: [
        "'De' as written, 'dem' as written",
        "'De' is 'dee', 'dem' is 'dem'",
        "They are silent in speech",
      ],
      explanation:
        "In spoken Swedish, both 'de' (they) and 'dem' (them) are pronounced 'dom'. Many Swedes write 'dom' informally.",
    },
    {
      kind: "fill-blank",
      prompt: "Var är bilen? ___ är utanför. (It — bil is en-word)",
      answer: "Den",
      distractors: ["Det", "Han", "Hon"],
      explanation:
        "'Bil' is an en-word, so 'it' = den (not det).",
    },
    {
      kind: "multiple-choice",
      question: "What is 'hen' used for?",
      answer: "A gender-neutral pronoun (unknown, irrelevant, or non-binary gender)",
      distractors: [
        "Only for animals",
        "A formal version of 'hon'",
        "Only in written Swedish",
      ],
      explanation:
        "'Hen' is gender-neutral. Used when the person's gender is unknown, irrelevant, or when the person is non-binary.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi träffade ___. (them)",
      answer: "dem",
      distractors: ["de", "deras", "dom"],
      explanation:
        "Object form of 'de' (they) is 'dem' (them). Both pronounced 'dom'.",
    },
  ],

  // ─── Possessives ───
  possessives: [
    {
      kind: "fill-blank",
      prompt: "___ bok är intressant. (My — bok is en-word)",
      answer: "Min",
      distractors: ["Mitt", "Mina", "Mins"],
      explanation:
        "'Bok' is an en-word singular → min.",
    },
    {
      kind: "fill-blank",
      prompt: "___ hus är stort. (My — hus is ett-word)",
      answer: "Mitt",
      distractors: ["Min", "Mina", "Det"],
      explanation: "'Hus' is an ett-word → mitt.",
    },
    {
      kind: "fill-blank",
      prompt: "___ barn leker ute. (My — plural)",
      answer: "Mina",
      distractors: ["Min", "Mitt", "Mins"],
      explanation: "Plural → mina, regardless of en/ett.",
    },
    {
      kind: "multiple-choice",
      question:
        "In 'Anna älskar sin hund' — whose dog is it?",
      answer: "Anna's own dog (sin = reflexive, refers back to the subject)",
      distractors: [
        "Someone else's dog",
        "A random dog",
        "It could be anyone's dog",
      ],
      explanation:
        "'Sin' is the reflexive possessive — the owner is the subject of the clause. 'Hennes' would mean someone else's dog.",
    },
    {
      kind: "fill-blank",
      prompt: "Det är ___ bil. (his)",
      answer: "hans",
      distractors: ["sin", "han", "honom"],
      explanation:
        "'Hans' doesn't change for gender or number. Hans bil, hans hus, hans bilar — always hans.",
    },
    {
      kind: "multiple-choice",
      question:
        "Do 'hans', 'hennes', and 'deras' change form for en/ett/plural?",
      answer: "No — they stay the same regardless",
      distractors: [
        "Yes — they follow the same pattern as min/mitt/mina",
        "Only 'hennes' changes",
        "Only in formal writing",
      ],
      explanation:
        "Third-person possessives (hans, hennes, deras) are invariable. Only 1st and 2nd person change: min/mitt/mina, din/ditt/dina, vår/vårt/våra.",
    },
  ],

  // ─── Adjectives ───
  adjectives: [
    {
      kind: "fill-blank",
      prompt: "en ___ bil (big)",
      answer: "stor",
      distractors: ["stort", "stora", "störe"],
      explanation:
        "With indefinite en-words, use the base form: stor.",
    },
    {
      kind: "fill-blank",
      prompt: "ett ___ hus (big)",
      answer: "stort",
      distractors: ["stor", "stora", "störe"],
      explanation:
        "With indefinite ett-words, add -t: stort.",
    },
    {
      kind: "fill-blank",
      prompt: "den ___ bilen (big)",
      answer: "stora",
      distractors: ["stor", "stort", "störe"],
      explanation:
        "With definite nouns, the adjective always takes -a: stora.",
    },
    {
      kind: "multiple-choice",
      question: "What is the ett-form of 'liten' (small)?",
      answer: "litet",
      distractors: ["litent", "litt", "små"],
      explanation:
        "'Liten' is irregular: en liten, ett litet, de små.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi har ___ barn. (small — plural)",
      answer: "små",
      distractors: ["liten", "litet", "lilla"],
      explanation:
        "The plural of 'liten' is the irregular form 'små'.",
    },
    {
      kind: "reorder",
      prompt: "Build: 'the old car' (bil is en-word)",
      words: ["den", "gamla", "bilen"],
      explanation:
        "Double definite: den (article) + gamla (adjective -a form) + bilen (noun with suffix).",
    },
  ],

  // ─── Adverbs ───
  adverbs: [
    {
      kind: "multiple-choice",
      question: "How do you turn the adjective 'snabb' (quick) into an adverb?",
      answer: "Add -t: snabbt",
      distractors: [
        "Add -ly: snabbly",
        "Add -lig: snabblig",
        "No change needed",
      ],
      explanation:
        "Most Swedish adverbs = the ett-form of the adjective. Snabb → snabbt.",
    },
    {
      kind: "fill-blank",
      prompt: "Jag förstår ___. (not — main clause)",
      answer: "inte",
      distractors: ["aldrig", "inget", "ej"],
      explanation: "In a main clause, 'inte' goes after the verb: Jag förstår inte.",
    },
    {
      kind: "reorder",
      prompt: "Build: 'I know that she doesn't understand.'",
      words: ["Jag", "vet", "att", "hon", "inte", "förstår."],
      explanation:
        "Main clause: Jag vet. Subordinate clause: att hon inte förstår. In the subordinate clause, 'inte' goes BEFORE the verb (BIFF rule).",
    },
    {
      kind: "fill-blank",
      prompt: "Hon sjunger ___. (always — main clause)",
      answer: "alltid",
      distractors: ["alltiden", "alltig", "aldrig"],
      explanation: "'Alltid' (always) goes after the verb in a main clause.",
    },
    {
      kind: "multiple-choice",
      question:
        "In a subordinate clause, adverbs like 'inte' and 'alltid' go…",
      answer: "Before the verb",
      distractors: [
        "After the verb (same as main clauses)",
        "At the end of the clause",
        "At the start of the clause",
      ],
      explanation:
        "BIFF rule: Bisats (subordinate clause) Inte Före (before) Finita verbet (finite verb).",
    },
    {
      kind: "reorder",
      prompt: "Build: '…because we never eat meat.'",
      words: ["…eftersom", "vi", "aldrig", "äter", "kött."],
      explanation:
        "Subordinate clause: adverb 'aldrig' goes before the verb 'äter'.",
    },
  ],

  // ─── Prepositions ───
  prepositions: [
    {
      kind: "fill-blank",
      prompt: "Jag bor ___ Stockholm. (in)",
      answer: "i",
      distractors: ["på", "till", "vid"],
      explanation: "Cities use 'i': i Stockholm, i Malmö, i Göteborg.",
    },
    {
      kind: "fill-blank",
      prompt: "Hon jobbar ___ kontoret. (at)",
      answer: "på",
      distractors: ["i", "till", "vid"],
      explanation: "Workplaces use 'på': på kontoret, på jobbet.",
    },
    {
      kind: "multiple-choice",
      question: "Which preposition do you use with days of the week?",
      answer: "på (e.g. på måndag)",
      distractors: [
        "i (e.g. i måndag)",
        "om (e.g. om måndag)",
        "till (e.g. till måndag)",
      ],
      explanation: "Days use 'på': på måndag, på fredag, på söndag.",
    },
    {
      kind: "fill-blank",
      prompt: "Vi åker ___ Gotland i sommar. (to — an island)",
      answer: "till",
      distractors: ["i", "på", "mot"],
      explanation:
        "For destinations, use 'till': till Gotland. (But 'på Gotland' when you're already there.)",
    },
    {
      kind: "fill-blank",
      prompt: "Festen är ___ lördag. (on)",
      answer: "på",
      distractors: ["i", "om", "till"],
      explanation: "Events on a specific day: 'på lördag'.",
    },
    {
      kind: "multiple-choice",
      question: "Which preposition for months: 'i januari' or 'på januari'?",
      answer: "i januari",
      distractors: ["på januari", "om januari", "till januari"],
      explanation: "Months use 'i': i januari, i mars, i december.",
    },
  ],
};
