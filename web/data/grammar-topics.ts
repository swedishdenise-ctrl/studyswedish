export type GrammarExample = {
  swedish: string;
  english: string;
  highlight?: string; // word(s) to emphasise
};

export type GrammarTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type GrammarSection = {
  heading: string;
  body: string; // plain text / short explanation
  examples?: GrammarExample[];
  table?: GrammarTable;
  tip?: string; // "💡 Tip:" callout
};

export type GrammarTopic = {
  slug: string;
  title: string;
  titleSv: string;
  subtitle: string;
  level: string; // e.g. "A1"
  sections: GrammarSection[];
  quickRule: string; // one-sentence takeaway shown at top
  relatedSlugs: string[]; // links to other topics
};

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // ─── Nouns and articles ───────────────────────────────────────────
  {
    slug: "en-vs-ett",
    title: "En or ett?",
    titleSv: "En eller ett?",
    subtitle:
      "Swedish nouns come in two genders — en-words (common) and ett-words (neuter). Here's how to tell them apart.",
    level: "A1",
    quickRule:
      "About 75% of Swedish nouns are en-words. When in doubt, guess en — you'll be right most of the time.",
    relatedSlugs: ["definite-form", "plurals"],
    sections: [
      {
        heading: "The two genders",
        body: "Every Swedish noun is either an en-word (common gender) or an ett-word (neuter gender). This affects which article you use, how you form the definite, and how adjectives agree. There's no shortcut to learning which is which — but there are patterns.",
        examples: [
          { swedish: "en bok", english: "a book", highlight: "en" },
          { swedish: "ett hus", english: "a house", highlight: "ett" },
          { swedish: "en stol", english: "a chair", highlight: "en" },
          { swedish: "ett bord", english: "a table", highlight: "ett" },
        ],
      },
      {
        heading: "Patterns that help",
        body: "While you need to memorise the gender of each noun, these patterns cover many common words.",
        table: {
          caption: "Common patterns for en- and ett-words",
          headers: ["Pattern", "Gender", "Examples"],
          rows: [
            ["People & animals", "en", "en kvinna, en hund, en lärare"],
            [
              "Words ending in -a",
              "en (usually)",
              "en flicka, en skola, en gata",
            ],
            [
              "Words ending in -ing",
              "en",
              "en tidning, en övning, en ändring",
            ],
            [
              "Words ending in -het",
              "en",
              "en frihet, en möjlighet, en svårighet",
            ],
            [
              "Words ending in -tion",
              "en",
              "en station, en nation, en lektion",
            ],
            [
              "Words ending in -ande/-ende",
              "ett",
              "ett möte (meeting) – but see tip",
            ],
            [
              "Verbal nouns (actions)",
              "ett",
              "ett arbete, ett försök, ett samtal",
            ],
          ],
        },
        tip: "The patterns aren't foolproof. 'En pojke' (a boy) ends in -e but is still an en-word. Always learn the article together with the noun.",
      },
      {
        heading: "Why it matters",
        body: "Getting en/ett right affects the whole noun phrase: the definite form (-en vs -et), adjective agreement (stor/stort), and demonstratives (den/det). It's worth building the habit early.",
        examples: [
          {
            swedish: "en stor bok → den stora boken",
            english: "a big book → the big book",
          },
          {
            swedish: "ett stort hus → det stora huset",
            english: "a big house → the big house",
          },
        ],
      },
    ],
  },
  {
    slug: "definite-form",
    title: "The definite form",
    titleSv: "Bestämd form",
    subtitle:
      "Swedish doesn't say 'the book' — it says 'book-the' by adding a suffix. Here's how it works.",
    level: "A1",
    quickRule:
      "Add -en to en-words and -et to ett-words to say 'the'. The article goes at the end, not the beginning.",
    relatedSlugs: ["en-vs-ett", "plurals"],
    sections: [
      {
        heading: "How it works",
        body: "In English, 'the' goes before the noun: 'the house'. In Swedish, the definite article is a suffix glued to the end of the noun. Which suffix you use depends on the noun's gender.",
        table: {
          caption: "Definite form endings",
          headers: ["Gender", "Indefinite", "Definite", "English"],
          rows: [
            ["en-word", "en bil", "bilen", "the car"],
            ["en-word ending in vowel", "en flicka", "flickan", "the girl"],
            ["ett-word", "ett hus", "huset", "the house"],
            [
              "ett-word ending in vowel",
              "ett äpple",
              "äpplet",
              "the apple",
            ],
          ],
        },
      },
      {
        heading: "When the noun already ends in a vowel",
        body: "If an en-word ends in -a, the definite just changes -a to -an. If an ett-word ends in -e, it changes to -et. No double vowels.",
        examples: [
          { swedish: "en skola → skolan", english: "a school → the school" },
          {
            swedish: "ett kaffe → kaffet",
            english: "a coffee → the coffee",
          },
          {
            swedish: "en gata → gatan",
            english: "a street → the street",
          },
        ],
      },
      {
        heading: "Double definite (with adjectives)",
        body: "When you put an adjective in front of a definite noun, Swedish uses BOTH a free-standing article (den/det/de) AND the suffix. This 'double definite' is one of the most distinctive features of Swedish.",
        examples: [
          {
            swedish: "den röda bilen",
            english: "the red car",
            highlight: "den … bilen",
          },
          {
            swedish: "det stora huset",
            english: "the big house",
            highlight: "det … huset",
          },
          {
            swedish: "de gamla böckerna",
            english: "the old books",
            highlight: "de … böckerna",
          },
        ],
        tip: "Without an adjective, you only use the suffix: 'bilen' (the car). Add an adjective and suddenly you need both: 'den röda bilen'.",
      },
    ],
  },
  {
    slug: "plurals",
    title: "Plurals",
    titleSv: "Pluralformer",
    subtitle:
      "Swedish has five plural endings. The noun's gender and ending tell you which one to use.",
    level: "A1",
    quickRule:
      "The five plural groups are -or, -ar, -er, -n, and zero (no change). Most en-words ending in -a take -or.",
    relatedSlugs: ["en-vs-ett", "definite-form"],
    sections: [
      {
        heading: "The five plural groups",
        body: "Each Swedish noun belongs to one of five 'declensions' — fancy word for plural patterns. Here they are, from most to least common.",
        table: {
          caption: "Swedish plural endings",
          headers: ["Group", "Ending", "Singular → Plural", "English"],
          rows: [
            ["1", "-or", "en flicka → flickor", "girl → girls"],
            ["2", "-ar", "en bil → bilar", "car → cars"],
            ["3", "-er", "en telefon → telefoner", "phone → phones"],
            ["4", "-n", "ett äpple → äpplen", "apple → apples"],
            ["5", "— (none)", "ett barn → barn", "child → children"],
          ],
        },
      },
      {
        heading: "How to guess the right group",
        body: "You can't always predict, but these rules of thumb cover most cases.",
        table: {
          caption: "Plural patterns by noun ending",
          headers: ["If the noun…", "Plural ending", "Example"],
          rows: [
            ["is an en-word ending in -a", "-or (drop the -a)", "lampa → lampor"],
            [
              "is an en-word ending in consonant",
              "-ar (usually)",
              "hund → hundar",
            ],
            [
              "is a loanword or ends in a stressed vowel",
              "-er",
              "telefon → telefoner",
            ],
            [
              "is an ett-word ending in vowel",
              "-n",
              "äpple → äpplen",
            ],
            [
              "is an ett-word ending in consonant",
              "no change",
              "barn → barn",
            ],
          ],
        },
        tip: "Group 5 (no change) is common for ett-words that end in a consonant. 'Ett barn, två barn' — just like English 'one sheep, two sheep'.",
      },
      {
        heading: "Definite plurals",
        body: "Just like the singular definite, plurals also get a suffix to mean 'the'. The definite plural endings are -na (groups 1-3) and -en or -a (groups 4-5).",
        examples: [
          {
            swedish: "flickor → flickorna",
            english: "girls → the girls",
          },
          { swedish: "bilar → bilarna", english: "cars → the cars" },
          {
            swedish: "barn → barnen",
            english: "children → the children",
          },
        ],
      },
    ],
  },

  // ─── Verbs ────────────────────────────────────────────────────────
  {
    slug: "present-tense",
    title: "The present tense",
    titleSv: "Presens",
    subtitle:
      "Swedish verbs don't change for person — 'I speak' and 'she speaks' use the same form. Here's the whole story.",
    level: "A1",
    quickRule:
      "Take the infinitive (e.g. tala), drop the -a, add -ar, -er, or -r. The ending is the same for I, you, he, she, we, and they.",
    relatedSlugs: ["past-tense", "supinum-perfect"],
    sections: [
      {
        heading: "One form for everyone",
        body: "Unlike English ('I speak' vs 'she speaks'), Swedish uses the same verb form for every person. Once you know the present tense of a verb, you're done.",
        examples: [
          { swedish: "Jag talar svenska.", english: "I speak Swedish." },
          { swedish: "Hon talar svenska.", english: "She speaks Swedish." },
          { swedish: "Vi talar svenska.", english: "We speak Swedish." },
        ],
      },
      {
        heading: "The four verb groups",
        body: "Swedish verbs fall into four groups based on how they form their tenses. The present tense ending depends on the group.",
        table: {
          caption: "Present tense by verb group",
          headers: ["Group", "Infinitive", "Present", "Example"],
          rows: [
            ["1 (-ar verbs)", "tala", "talar", "Jag talar (I speak)"],
            ["2a (-er verbs)", "ringa", "ringer", "Jag ringer (I call)"],
            ["2b (-er verbs)", "köpa", "köper", "Jag köper (I buy)"],
            ["3 (-r verbs)", "bo", "bor", "Jag bor (I live)"],
            ["4 (irregular)", "skriva", "skriver", "Jag skriver (I write)"],
          ],
        },
        tip: "Group 1 is by far the largest — if you're making up a new Swedish word (Swedes do this!), it'll probably be a group 1 verb.",
      },
      {
        heading: "Common irregular verbs",
        body: "A handful of very common verbs are irregular. These just need to be memorised.",
        table: {
          caption: "Key irregular verbs in present tense",
          headers: ["Infinitive", "Present", "English"],
          rows: [
            ["vara", "är", "to be"],
            ["ha", "har", "to have"],
            ["göra", "gör", "to do/make"],
            ["gå", "går", "to go/walk"],
            ["se", "ser", "to see"],
            ["ge", "ger", "to give"],
            ["veta", "vet", "to know (a fact)"],
            ["kunna", "kan", "can"],
            ["vilja", "vill", "to want"],
            ["ska", "ska", "shall/will"],
          ],
        },
      },
    ],
  },
  {
    slug: "past-tense",
    title: "Past tense (preteritum)",
    titleSv: "Preteritum",
    subtitle:
      "How to talk about what happened yesterday, last week, or once upon a time.",
    level: "A2",
    quickRule:
      "Group 1: -ade. Group 2: -de or -te. Group 3: -dde. Group 4: vowel change (irregular).",
    relatedSlugs: ["present-tense", "supinum-perfect"],
    sections: [
      {
        heading: "Past tense by group",
        body: "Each verb group forms the past tense differently. Groups 1–3 follow predictable patterns; group 4 verbs change their vowel and must be memorised.",
        table: {
          caption: "Past tense endings",
          headers: ["Group", "Infinitive", "Past", "English"],
          rows: [
            ["1", "tala", "talade", "spoke"],
            ["2a", "ringa", "ringde", "called"],
            ["2b", "köpa", "köpte", "bought"],
            ["3", "bo", "bodde", "lived"],
            ["4", "skriva", "skrev", "wrote"],
          ],
        },
      },
      {
        heading: "Group 1: the -ade pattern",
        body: "Group 1 is the simplest — just add -ade to the stem. The vast majority of new and borrowed verbs go here.",
        examples: [
          { swedish: "Jag talade med henne igår.", english: "I spoke with her yesterday." },
          { swedish: "Vi handlade på ICA.", english: "We shopped at ICA." },
          { swedish: "Hon jobbade hela dagen.", english: "She worked all day." },
        ],
      },
      {
        heading: "Group 2: -de or -te",
        body: "Group 2 splits into two sub-groups. If the stem ends in a voiced consonant (b, d, g, j, l, m, n, r, v), add -de. If it ends in a voiceless consonant (k, p, s, t), add -te.",
        examples: [
          { swedish: "Jag ringde dig.", english: "I called you.", highlight: "ringde" },
          { swedish: "Hon köpte en bil.", english: "She bought a car.", highlight: "köpte" },
          { swedish: "Vi lärde oss snabbt.", english: "We learned quickly.", highlight: "lärde" },
        ],
        tip: "Think of it as a voicing rule: voiced stem → voiced ending (-de), voiceless stem → voiceless ending (-te).",
      },
      {
        heading: "Group 4: the irregular verbs",
        body: "These change their vowel in the past tense. There are patterns within the irregulars, but at this stage, just learn the most common ones.",
        table: {
          caption: "Common irregular past tenses",
          headers: ["Infinitive", "Past", "English"],
          rows: [
            ["vara", "var", "was/were"],
            ["ha", "hade", "had"],
            ["göra", "gjorde", "did/made"],
            ["gå", "gick", "went"],
            ["se", "såg", "saw"],
            ["ge", "gav", "gave"],
            ["komma", "kom", "came"],
            ["ta", "tog", "took"],
            ["dricka", "drack", "drank"],
            ["skriva", "skrev", "wrote"],
          ],
        },
      },
    ],
  },
  {
    slug: "supinum-perfect",
    title: "Perfect tense (supinum)",
    titleSv: "Perfekt (har + supinum)",
    subtitle:
      "Swedish's 'har + supinum' works like English 'have + past participle' — but the form is uniquely Swedish.",
    level: "A2",
    quickRule:
      "har + supinum: Group 1: -at (har talat). Group 2: -t (har ringt/köpt). Group 3: -tt (har bott). Group 4: -it (har skrivit).",
    relatedSlugs: ["present-tense", "past-tense"],
    sections: [
      {
        heading: "What is supinum?",
        body: "Supinum is a verb form unique to Scandinavian languages. It's used with 'har' (have) to form the perfect tense — describing things that have happened and are still relevant now.",
        examples: [
          { swedish: "Jag har bott i Sverige i tre år.", english: "I have lived in Sweden for three years." },
          { swedish: "Har du ätit lunch?", english: "Have you eaten lunch?" },
        ],
      },
      {
        heading: "Supinum by verb group",
        body: "Each group has its own supinum ending.",
        table: {
          caption: "Supinum endings",
          headers: ["Group", "Infinitive", "Supinum", "Perfect example"],
          rows: [
            ["1", "tala", "talat", "Jag har talat"],
            ["2a", "ringa", "ringt", "Jag har ringt"],
            ["2b", "köpa", "köpt", "Jag har köpt"],
            ["3", "bo", "bott", "Jag har bott"],
            ["4", "skriva", "skrivit", "Jag har skrivit"],
          ],
        },
      },
      {
        heading: "Perfect vs past tense: when to use which",
        body: "Use the past tense (preteritum) for finished events at a specific time. Use the perfect (har + supinum) when the action is relevant to now, or when the time isn't specified.",
        examples: [
          { swedish: "Jag åt lunch klockan tolv.", english: "I ate lunch at twelve. (specific time → past tense)" },
          { swedish: "Jag har ätit lunch.", english: "I have eaten lunch. (relevant now: I'm not hungry → perfect)" },
          { swedish: "Hon bodde i Malmö förra året.", english: "She lived in Malmö last year. (specific time → past)" },
          { swedish: "Hon har bott i Malmö.", english: "She has lived in Malmö. (at some point, relevant now → perfect)" },
        ],
        tip: "If you can insert 'yesterday' or 'last week' naturally, use past tense. If the focus is on 'it's done' or 'ever/never', use perfect.",
      },
    ],
  },

  // ─── Sentence structure ───────────────────────────────────────────
  {
    slug: "v2-word-order",
    title: "V2 word order",
    titleSv: "V2-ordföljd",
    subtitle:
      "The single most important rule in Swedish: in a main clause, the verb is ALWAYS in second position.",
    level: "A2",
    quickRule:
      "In a statement, the verb must be the second element. If anything other than the subject comes first, the subject and verb swap places (inversion).",
    relatedSlugs: ["questions"],
    sections: [
      {
        heading: "The V2 rule",
        body: "In Swedish main clauses (statements), the finite verb must be in the second position. Position 1 can be almost anything — the subject, a time expression, an adverb — but the verb always follows immediately.",
        table: {
          caption: "V2 word order examples",
          headers: ["Position 1", "Position 2 (verb)", "Rest", "English"],
          rows: [
            ["Jag", "äter", "frukost.", "I eat breakfast."],
            ["Imorgon", "äter", "jag frukost.", "Tomorrow I eat breakfast."],
            ["Varje dag", "dricker", "hon kaffe.", "Every day she drinks coffee."],
            ["I Sverige", "snöar", "det ofta.", "In Sweden it snows often."],
          ],
        },
      },
      {
        heading: "Inversion",
        body: "When something other than the subject occupies position 1, the subject moves to after the verb. This is called inversion, and it's automatic in Swedish.",
        examples: [
          { swedish: "Jag bor i Stockholm.", english: "I live in Stockholm. (subject first — normal order)" },
          { swedish: "I Stockholm bor jag.", english: "In Stockholm live I. (place first — subject-verb inversion)", highlight: "bor jag" },
          { swedish: "Ibland åker vi till landet.", english: "Sometimes we go to the countryside.", highlight: "åker vi" },
        ],
        tip: "English speakers often forget to invert. A good test: if the sentence starts with anything other than the subject, make sure the verb comes RIGHT after it.",
      },
      {
        heading: "The BIFF rule (adverb placement)",
        body: "In a main clause, adverbs like inte, alltid, ofta, aldrig go AFTER the verb. But in a subordinate clause, they go BEFORE the verb. Swedes remember this as the BIFF rule: Bisats Inte Före Finita verbet.",
        examples: [
          { swedish: "Jag dricker inte kaffe.", english: "I don't drink coffee. (main clause: inte AFTER verb)" },
          { swedish: "…eftersom jag inte dricker kaffe.", english: "…because I don't drink coffee. (subordinate: inte BEFORE verb)", highlight: "inte dricker" },
        ],
      },
    ],
  },
  {
    slug: "questions",
    title: "Questions",
    titleSv: "Frågor",
    subtitle:
      "Yes/no questions and wh-questions — and the word order that trips up English speakers.",
    level: "A2",
    quickRule:
      "Yes/no questions: put the verb first. Wh-questions: question word first, then verb (V2 still applies).",
    relatedSlugs: ["v2-word-order"],
    sections: [
      {
        heading: "Yes/no questions",
        body: "To ask a yes/no question, simply put the verb first (before the subject). No auxiliary verb like English 'do' is needed.",
        examples: [
          { swedish: "Talar du svenska?", english: "Do you speak Swedish?", highlight: "Talar du" },
          { swedish: "Är hon hemma?", english: "Is she at home?" },
          { swedish: "Har ni bokat bord?", english: "Have you booked a table?" },
        ],
        tip: "Compare: 'Du talar svenska.' (statement) vs 'Talar du svenska?' (question). Just swap subject and verb.",
      },
      {
        heading: "Wh-questions",
        body: "For questions with a question word (vem, vad, var, när, hur, vilken, varför), the question word goes first and the verb comes second — the V2 rule still applies.",
        table: {
          caption: "Common question words",
          headers: ["Swedish", "English", "Example"],
          rows: [
            ["Vad", "What", "Vad gör du? (What are you doing?)"],
            ["Var", "Where", "Var bor du? (Where do you live?)"],
            ["Vem", "Who", "Vem är det? (Who is it?)"],
            ["När", "When", "När kommer du? (When are you coming?)"],
            ["Hur", "How", "Hur mår du? (How are you?)"],
            ["Varför", "Why", "Varför gråter hon? (Why is she crying?)"],
            ["Vilken/Vilket/Vilka", "Which", "Vilken buss går dit? (Which bus goes there?)"],
          ],
        },
      },
      {
        heading: "Indirect questions",
        body: "In indirect questions (reported questions), word order changes: the subject goes BEFORE the verb, and 'om' introduces yes/no questions.",
        examples: [
          { swedish: "Jag undrar om du talar svenska.", english: "I wonder if you speak Swedish." },
          { swedish: "Vet du var hon bor?", english: "Do you know where she lives?" },
        ],
      },
    ],
  },

  // ─── Pronouns and possessives ─────────────────────────────────────
  {
    slug: "personal-pronouns",
    title: "Personal pronouns",
    titleSv: "Personliga pronomen",
    subtitle:
      "Jag, du, han, hon, den, det — plus the gender-neutral hen.",
    level: "A1",
    quickRule:
      "Swedish has subject and object forms (jag/mig, du/dig). The pronoun 'hen' is gender-neutral and increasingly common.",
    relatedSlugs: ["possessives"],
    sections: [
      {
        heading: "Subject and object forms",
        body: "Like English 'I' vs 'me', Swedish pronouns change form depending on whether they're the subject or object of the sentence.",
        table: {
          caption: "Swedish personal pronouns",
          headers: ["Person", "Subject", "Object", "English"],
          rows: [
            ["1st singular", "jag", "mig", "I / me"],
            ["2nd singular", "du", "dig", "you / you"],
            ["3rd sing. (masc.)", "han", "honom", "he / him"],
            ["3rd sing. (fem.)", "hon", "henne", "she / her"],
            ["3rd sing. (neutral)", "hen", "hen", "they (singular) / them"],
            ["3rd sing. (en-word)", "den", "den", "it"],
            ["3rd sing. (ett-word)", "det", "det", "it"],
            ["1st plural", "vi", "oss", "we / us"],
            ["2nd plural", "ni", "er", "you / you"],
            ["3rd plural", "de (dom)", "dem (dom)", "they / them"],
          ],
        },
        tip: "'De' and 'dem' are both pronounced 'dom' in spoken Swedish. Many Swedes even write 'dom' informally.",
      },
      {
        heading: "Den vs det",
        body: "When referring to a thing (not a person), use 'den' for en-words and 'det' for ett-words. This is one more reason to learn noun genders!",
        examples: [
          { swedish: "Var är bilen? Den är utanför.", english: "Where's the car? It's outside.", highlight: "Den" },
          { swedish: "Var är huset? Det är där borta.", english: "Where's the house? It's over there.", highlight: "Det" },
        ],
      },
      {
        heading: "Hen — the gender-neutral pronoun",
        body: "'Hen' was proposed in the 1960s and entered mainstream use around 2012. It's used when the person's gender is unknown, irrelevant, or non-binary. It was added to the official Swedish dictionary (SAOL) in 2015.",
        examples: [
          { swedish: "Hen kommer snart.", english: "They (singular) will come soon." },
          { swedish: "Jag träffade min nya chef. Hen verkar trevlig.", english: "I met my new boss. They seem nice." },
        ],
      },
    ],
  },
  {
    slug: "possessives",
    title: "Possessives",
    titleSv: "Possessiva pronomen",
    subtitle:
      "Min, mitt, mina — possessives agree with what is owned, not the owner.",
    level: "A1",
    quickRule:
      "Possessives match the gender and number of the thing owned: min (en-word), mitt (ett-word), mina (plural).",
    relatedSlugs: ["personal-pronouns", "en-vs-ett"],
    sections: [
      {
        heading: "The agreement rule",
        body: "In English, 'my' is always just 'my'. In Swedish, the possessive changes depending on whether the owned noun is an en-word, ett-word, or plural.",
        table: {
          caption: "Possessive forms",
          headers: ["Person", "en-word", "ett-word", "Plural"],
          rows: [
            ["my", "min", "mitt", "mina"],
            ["your (sing.)", "din", "ditt", "dina"],
            ["his", "hans", "hans", "hans"],
            ["her", "hennes", "hennes", "hennes"],
            ["its (en-word)", "dess", "dess", "dess"],
            ["our", "vår", "vårt", "våra"],
            ["your (plural)", "er", "ert", "era"],
            ["their", "deras", "deras", "deras"],
          ],
        },
        tip: "Notice that hans, hennes, and deras DON'T change. Only 1st and 2nd person possessives agree.",
      },
      {
        heading: "Examples of agreement",
        body: "The possessive matches the owned thing, NOT the owner. A woman still says 'mitt hus' (my house) because hus is an ett-word.",
        examples: [
          { swedish: "min bok", english: "my book (bok is en-word → min)" },
          { swedish: "mitt hus", english: "my house (hus is ett-word → mitt)" },
          { swedish: "mina barn", english: "my children (plural → mina)" },
          { swedish: "hans bil", english: "his car (hans doesn't change)" },
        ],
      },
      {
        heading: "Sin/sitt/sina — the reflexive possessive",
        body: "Swedish has a special reflexive possessive (sin/sitt/sina) used when the owner is the subject of the same clause. This is one of the trickier points of Swedish grammar.",
        examples: [
          { swedish: "Anna älskar sin hund.", english: "Anna loves her (own) dog.", highlight: "sin" },
          { swedish: "Anna älskar hennes hund.", english: "Anna loves her (someone else's) dog.", highlight: "hennes" },
        ],
        tip: "If the possessor is the subject of the clause, use sin/sitt/sina. If it refers to someone else, use hans/hennes/deras.",
      },
    ],
  },

  // ─── Additional topics ────────────────────────────────────────────
  {
    slug: "adjectives",
    title: "Adjectives",
    titleSv: "Adjektiv",
    subtitle:
      "Swedish adjectives change form based on gender, number, and definiteness. Here's the system.",
    level: "A2",
    quickRule:
      "Base form for en-words (stor), add -t for ett-words (stort), add -a for plurals and definite (stora).",
    relatedSlugs: ["en-vs-ett", "definite-form"],
    sections: [
      {
        heading: "The three forms",
        body: "Every Swedish adjective has (at least) three forms: the en-form, the ett-form, and the plural/definite form.",
        table: {
          caption: "Adjective agreement",
          headers: ["Form", "When to use", "Example"],
          rows: [
            ["Base (en-form)", "With indefinite en-words", "en stor bil (a big car)"],
            ["+t (ett-form)", "With indefinite ett-words", "ett stort hus (a big house)"],
            ["+a (plural/definite)", "With plurals or definite nouns", "stora bilar / den stora bilen"],
          ],
        },
      },
      {
        heading: "With indefinite nouns",
        body: "Use the base form with en-words and the -t form with ett-words.",
        examples: [
          { swedish: "en vacker dag", english: "a beautiful day" },
          { swedish: "ett vackert landskap", english: "a beautiful landscape" },
          { swedish: "en dyr jacka", english: "an expensive jacket" },
          { swedish: "ett dyrt vin", english: "an expensive wine" },
        ],
      },
      {
        heading: "With definite nouns",
        body: "With a definite noun (using den/det/de), the adjective always takes the -a ending. This is the definite form of the adjective.",
        examples: [
          { swedish: "den vackra dagen", english: "the beautiful day" },
          { swedish: "det vackra landskapet", english: "the beautiful landscape" },
          { swedish: "de stora bilarna", english: "the big cars" },
        ],
        tip: "Definite = always -a. It doesn't matter if the noun is en, ett, or plural — the adjective just takes -a.",
      },
      {
        heading: "Irregular adjectives",
        body: "Some common adjectives have irregular forms, especially in the ett-form.",
        table: {
          caption: "Common irregular adjectives",
          headers: ["en-form", "ett-form", "Plural/definite", "English"],
          rows: [
            ["liten", "litet", "små", "small"],
            ["gammal", "gammalt", "gamla", "old"],
            ["bra", "bra", "bra", "good"],
            ["blå", "blått", "blåa/blå", "blue"],
          ],
        },
      },
    ],
  },
  {
    slug: "adverbs",
    title: "Adverbs",
    titleSv: "Adverb",
    subtitle:
      "Where adverbs go in a Swedish sentence — and how to form them from adjectives.",
    level: "B1",
    quickRule:
      "Most adverbs are formed by adding -t to the adjective (snabb → snabbt). Place them after the verb in main clauses, before the verb in subordinate clauses.",
    relatedSlugs: ["v2-word-order", "adjectives"],
    sections: [
      {
        heading: "Forming adverbs from adjectives",
        body: "Most Swedish adverbs are identical to the ett-form of the adjective: just add -t.",
        examples: [
          { swedish: "snabb → snabbt", english: "quick → quickly" },
          { swedish: "Hon springer snabbt.", english: "She runs quickly." },
          { swedish: "tydlig → tydligt", english: "clear → clearly" },
          { swedish: "Han talade tydligt.", english: "He spoke clearly." },
        ],
      },
      {
        heading: "Placement in main clauses",
        body: "In a main clause, adverbs go after the finite verb (or after the subject in a verb-first sentence). Negation (inte) follows the same rule.",
        examples: [
          { swedish: "Jag förstår inte.", english: "I don't understand." },
          { swedish: "Hon sjunger alltid.", english: "She always sings." },
          { swedish: "Vi äter ofta ute.", english: "We often eat out." },
        ],
      },
      {
        heading: "Placement in subordinate clauses",
        body: "In a subordinate clause (after att, om, eftersom, när, etc.), adverbs move to BEFORE the verb. This is the BIFF rule.",
        examples: [
          { swedish: "Jag vet att hon inte förstår.", english: "I know that she doesn't understand.", highlight: "inte förstår" },
          { swedish: "…eftersom vi aldrig äter kött.", english: "…because we never eat meat.", highlight: "aldrig äter" },
        ],
        tip: "Main clause: verb THEN adverb. Subordinate clause: adverb THEN verb. Getting this right makes your Swedish sound much more natural.",
      },
    ],
  },
  {
    slug: "prepositions",
    title: "Prepositions",
    titleSv: "Prepositioner",
    subtitle:
      "i, på, till, från — the small words that trip up every Swedish learner.",
    level: "A2",
    quickRule:
      "Swedish prepositions rarely map 1:1 to English. Learn them as part of fixed phrases rather than trying to translate word by word.",
    relatedSlugs: ["v2-word-order"],
    sections: [
      {
        heading: "The most common prepositions",
        body: "Here are the prepositions you'll use every day, with their most common meanings.",
        table: {
          caption: "Essential Swedish prepositions",
          headers: ["Swedish", "Core meaning", "Example"],
          rows: [
            ["i", "in, inside", "i huset (in the house)"],
            ["på", "on, at", "på bordet (on the table), på jobbet (at work)"],
            ["till", "to", "till Stockholm (to Stockholm)"],
            ["från", "from", "från Sverige (from Sweden)"],
            ["med", "with", "med mig (with me)"],
            ["utan", "without", "utan socker (without sugar)"],
            ["för", "for", "för dig (for you)"],
            ["om", "about, in (time)", "om Sverige (about Sweden), om en timme (in an hour)"],
            ["av", "of, by", "en kopp av guld (a cup of gold)"],
          ],
        },
      },
      {
        heading: "i vs på — the eternal question",
        body: "The choice between 'i' and 'på' is one of the most confusing areas for learners. There's no single rule, but here are the most important patterns.",
        table: {
          caption: "i vs på",
          headers: ["Use i for…", "Use på for…"],
          rows: [
            ["Countries: i Sverige, i England", "Islands: på Gotland, på Island"],
            ["Cities: i Stockholm, i Malmö", "Workplaces: på jobbet, på kontoret"],
            ["Rooms: i köket, i badrummet", "Events: på festen, på mötet"],
            ["Months: i januari, i december", "Days: på måndag, på fredag"],
          ],
        },
        tip: "The best approach: don't try to work out the 'logic' — just learn each phrase as a unit. 'På jobbet', not 'i jobbet'. Over time, the patterns become intuitive.",
      },
    ],
  },
];

/** Look up a topic by slug. Returns undefined if not found. */
export function getGrammarTopic(slug: string): GrammarTopic | undefined {
  return GRAMMAR_TOPICS.find((t) => t.slug === slug);
}

/** All valid topic slugs, useful for generateStaticParams. */
export function getAllGrammarSlugs(): string[] {
  return GRAMMAR_TOPICS.map((t) => t.slug);
}
