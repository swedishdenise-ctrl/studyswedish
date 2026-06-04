const sampleWords = [
  { word: "lagom", phonetic: "/ˈlɑːɡɔm/", meaning: "Just the right amount — not too much, not too little", example: "Temperaturen är lagom.", exampleEn: "The temperature is just right." },
  { word: "fika", phonetic: "/ˈfiːka/", meaning: "A coffee break, usually with pastry — a cornerstone of Swedish culture", example: "Ska vi fika?", exampleEn: "Shall we have a coffee break?" },
  { word: "mysig", phonetic: "/ˈmyːsɪɡ/", meaning: "Cozy, warm, and inviting", example: "Vilken mysig stuga!", exampleEn: "What a cozy cabin!" },
  { word: "hinna", phonetic: "/ˈhɪnːa/", meaning: "To have time to do something", example: "Jag hinner inte!", exampleEn: "I don't have time!" },
  { word: "orka", phonetic: "/ˈɔrːka/", meaning: "To have the energy or motivation to do something", example: "Jag orkar inte laga mat.", exampleEn: "I can't be bothered to cook." },
  { word: "smultronställe", phonetic: "/ˈsmɵltrɔnˌstɛlːe/", meaning: "A hidden gem — literally 'wild strawberry place'", example: "Det här är mitt smultronställe.", exampleEn: "This is my secret favorite spot." },
  { word: "hej", phonetic: "/hɛj/", meaning: "Hello — the most common Swedish greeting", example: "Hej! Hur mår du?", exampleEn: "Hi! How are you?" },
];

export function SwedishWordCard() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const todayWord = sampleWords[dayOfYear % sampleWords.length];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-swedish-blue/10 bg-gradient-to-br from-swedish-blue/[0.04] to-swedish-blue/[0.08] p-5">
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-swedish-blue/5 blur-xl" />

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-swedish-blue/40 animate-pulse" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-swedish-blue/50">
            Dagens ord
          </p>
        </div>

        <p className="mt-3 font-display text-3xl font-semibold text-charcoal">
          {todayWord.word}
        </p>
        <p className="mt-0.5 text-xs text-charcoal/30 font-mono">
          {todayWord.phonetic}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
          {todayWord.meaning}
        </p>

        <div className="mt-4 rounded-xl bg-white/70 px-4 py-3 border border-swedish-blue/5">
          <p className="text-[13px] font-medium text-charcoal/80 italic">
            &ldquo;{todayWord.example}&rdquo;
          </p>
          <p className="mt-1 text-xs text-charcoal/35">
            {todayWord.exampleEn}
          </p>
        </div>
      </div>
    </div>
  );
}
