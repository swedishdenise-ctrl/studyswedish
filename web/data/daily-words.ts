import { VOCABULARY, type VocabWord } from "./vocabulary";

export type DailyWord = {
  featuredDate: string; // YYYY-MM-DD
  vocabularyId: string;
  funFact: string | null;
  usageTip: string | null;
};

// Pre-scheduled daily words — in production this would come from the
// daily_words table populated by a pg_cron job.
export const DAILY_WORDS: DailyWord[] = [
  {
    featuredDate: "2026-04-16",
    vocabularyId: "v014",
    funFact:
      "The word 'fika' was originally 19th-century slang — a back-slang inversion of 'kaffi' (an older spelling of 'kaffe'). It went from street slang to one of Sweden's most beloved rituals.",
    usageTip:
      "Use it as a verb too: 'Ska vi fika?' is the classic way to suggest a coffee break.",
  },
  {
    featuredDate: "2026-04-17",
    vocabularyId: "v034",
    funFact:
      "About 70% of Sweden is covered by forest. The Swedish concept of 'allemansrätten' (freedom to roam) means anyone can walk, pick berries, and camp in the forest — even on private land.",
    usageTip:
      "Use 'i skogen' for 'in the forest'. The definite form changes the meaning: 'en skog' (a forest) vs 'skogen' (the forest).",
  },
  {
    featuredDate: "2026-04-18",
    vocabularyId: "v024",
    funFact:
      "Sweden is famous for being child-friendly. 'Barnvagn' (pram/stroller) parking is standard at cafés, and parents get 480 days of shared parental leave.",
    usageTip:
      "'Barn' is the same word in singular and plural — context tells you which: 'ett barn' (one child) vs 'tre barn' (three children).",
  },
  {
    featuredDate: "2026-04-19",
    vocabularyId: "v035",
    funFact:
      "Sweden has nearly 100,000 lakes. The largest, Vänern, is the third-largest lake in all of Europe. Many Swedes have a 'sommarstuga' (summer cottage) by a lake.",
    usageTip:
      "The 'sj' sound in 'sjö' is one of the hardest Swedish sounds for English speakers. It's somewhere between 'sh' and a soft 'hw'.",
  },
  {
    featuredDate: "2026-04-20",
    vocabularyId: "v009",
    funFact:
      "Sweden consumes more coffee per capita than almost any other country — about 8–10 kg per person per year. Only Finland drinks more.",
    usageTip:
      "Although 'kaffe' is ett-word, you'll hear 'en kaffe' in casual speech to mean 'a (cup of) coffee'.",
  },
  {
    featuredDate: "2026-04-21",
    vocabularyId: "v028",
    funFact:
      "The iconic red-painted wooden house (röda stugan) gets its colour from Falu rödfärg, a paint made from copper mine waste in Falun. It's been used since the 16th century.",
    usageTip:
      "'Hus' doesn't change in the plural: ett hus → två hus. The definite form is 'huset'.",
  },
  {
    featuredDate: "2026-04-22",
    vocabularyId: "v031",
    funFact:
      "During Swedish midsummer ('midsommar'), the sun barely sets in the north. In Kiruna, above the Arctic Circle, the 'midnight sun' shines 24 hours a day for weeks.",
    usageTip:
      "'Solen skiner' (the sun is shining) is one of the happiest phrases in Swedish after a long, dark winter.",
  },
];

/**
 * Get today's word, falling back to cycling through the list
 * if today isn't in the schedule.
 */
export function getDailyWord(dateStr?: string): {
  word: VocabWord;
  daily: DailyWord;
} {
  const today = dateStr ?? new Date().toISOString().slice(0, 10);

  // Try exact match first
  const exact = DAILY_WORDS.find((d) => d.featuredDate === today);
  if (exact) {
    const word = VOCABULARY.find((v) => v.id === exact.vocabularyId)!;
    return { word, daily: exact };
  }

  // Fallback: cycle through available words based on day-of-year
  const dayOfYear = Math.floor(
    (new Date(today).getTime() - new Date(today.slice(0, 4) + "-01-01").getTime()) /
      86_400_000
  );
  const idx = dayOfYear % DAILY_WORDS.length;
  const fallback = DAILY_WORDS[idx];
  const word = VOCABULARY.find((v) => v.id === fallback.vocabularyId)!;
  return { word, daily: fallback };
}
