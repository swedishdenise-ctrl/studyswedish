import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";

const W = 432; // 6 inches
const H = 648; // 9 inches
const M = 60;  // ~0.83 inch margins

const FONT = {
  regular:    "C:\\Windows\\Fonts\\georgia.ttf",
  bold:       "C:\\Windows\\Fonts\\georgiab.ttf",
  italic:     "C:\\Windows\\Fonts\\georgiai.ttf",
  boldItalic: "C:\\Windows\\Fonts\\georgiaz.ttf",
};

const COLOR = {
  pageBg:      "#FAF5EE",
  titleBg:     "#1A1208",
  cream:       "#F5EDE3",
  dark:        "#1A1208",
  medium:      "#3D2B14",
  muted:       "#7A5C38",
  gold:        "#C9A04A",
  goldDim:     "#8B6A28",   // muted gold for subtle rules
  goldFaint:   "#D4BC78",   // very light gold for page top bar
  subtleText:  "#4A3520",   // barely-there text on dark backgrounds
};

const proverbs = [
  {
    swedish: "Lagom är bäst",
    translation: "The right amount is best",
    meaning:
      "This is perhaps the most Swedish concept in existence. 'Lagom' has no direct English equivalent — it means not too much, not too little, just right. Swedes apply it to everything from portion sizes to ambition to emotions. It's not about mediocrity; it's about balance and knowing when enough truly is enough.",
  },
  {
    swedish: "Det finns inget dåligt väder, bara dåliga kläder",
    translation: "There's no bad weather, only bad clothes",
    meaning:
      "A very practical Swedish attitude toward nature — and complaining. Swedes don't cancel plans because of rain, wind, or cold. They simply dress for it. This reflects the national love of the outdoors and a no-excuses approach to life. If you're cold, that's a preparation problem, not a weather problem.",
  },
  {
    swedish: "Borta bra men hemma bäst",
    translation: "Away is good but home is best",
    meaning:
      "Swedes love to travel but are deeply rooted in their home and homeland. This proverb captures the warm feeling of returning home after time away and realizing that no matter how wonderful the world is, there's nothing quite like your own place.",
  },
  {
    swedish: "Kärt barn har många namn",
    translation: "A beloved child has many names",
    meaning:
      "When you love someone deeply, you give them nicknames and pet names — you can't just call them one thing. This is used to explain why a much-loved person or thing has so many different names, and it reflects the Swedish warmth hidden beneath the stereotypically reserved exterior.",
  },
  {
    swedish: "Ensam är stark",
    translation: "Alone is strong",
    meaning:
      "Swedish culture places high value on independence and self-sufficiency. This proverb reflects the idea that being able to stand on your own — without needing others for validation or support — is a form of strength. It's not about loneliness. It's about inner resilience.",
  },
  {
    swedish: "Man ska inte sälja skinnet innan björnen är skjuten",
    translation: "Don't sell the bearskin before the bear is shot",
    meaning:
      "Don't count on something before it actually happens. Bears were once common in Sweden, and selling the skin before the hunt was complete was obviously foolish. The saying captures a broader warning against overconfidence and premature celebration.",
  },
  {
    swedish: "Nära skjuter ingen hare",
    translation: "Close doesn't shoot any hare",
    meaning:
      "Almost doesn't count. A near miss in hunting means you go home empty-handed — and in life, being almost right, almost on time, or almost good enough has the same result as being completely off. Effort without the result is still an empty bag.",
  },
  {
    swedish: "En fågel i handen är bättre än tio i skogen",
    translation: "A bird in hand is better than ten in the forest",
    meaning:
      "What you already have is worth more than what you might get. Don't risk something certain for something uncertain, no matter how much bigger the promise sounds. A practical, grounded take on ambition.",
  },
  {
    swedish: "Äpplet faller inte långt från trädet",
    translation: "The apple doesn't fall far from the tree",
    meaning:
      "Children tend to resemble their parents in character, behavior, or habits — for better or worse. Used both fondly, when a child inherits a parent's talent, and critically, when they inherit a parent's bad temper. It's nature, family, and destiny rolled into one.",
  },
  {
    swedish: "Många bäckar små gör en stor å",
    translation: "Many small streams make a big river",
    meaning:
      "Small contributions, consistently made, add up to something significant. Whether it's saving money, building a habit, or working toward a long goal — every little bit counts. A very Swedish value of consistency over grand gestures.",
  },
  {
    swedish: "Ingen rök utan eld",
    translation: "No smoke without fire",
    meaning:
      "Where there are rumors or signs of something, there's usually some truth behind them. Not necessarily the whole truth, but something real caused the smoke. Swedes use this to acknowledge that gossip, while often exaggerated, rarely comes from nowhere.",
  },
  {
    swedish: "Morgonstund har guld i mund",
    translation: "The morning hour has gold in its mouth",
    meaning:
      "The early hours of the day are the most productive and valuable. Swedes take this seriously — early starts, fresh air, and a clear head before the day gets noisy. The image of gold in the mouth suggests that the morning literally hands you something precious, if you show up for it.",
  },
  {
    swedish: "Allting har sin tid",
    translation: "Everything has its time",
    meaning:
      "There's a right moment for everything, and forcing things before their time rarely works. This proverb encourages patience and trust in timing — not everything needs to be rushed, and some things simply need to ripen on their own.",
  },
  {
    swedish: "Bättre sent än aldrig",
    translation: "Better late than never",
    meaning:
      "It's better to do something — even belatedly — than to never do it at all. Used to excuse tardiness but also to encourage people who feel they've started something too late in life. The Swedes say it with a shrug and a slight smile.",
  },
  {
    swedish: "Det är aldrig för sent att lära sig",
    translation: "It's never too late to learn",
    meaning:
      "Age is no barrier to growth. Whether it's a new language, a new skill, or a new way of thinking — the door is always open. This reflects the Swedish belief in lifelong learning and personal development at any stage of life.",
  },
  {
    swedish: "Den som söker han finner",
    translation: "He who seeks shall find",
    meaning:
      "If you genuinely look for something — an answer, an opportunity, a way forward — you will find it. It rewards curiosity and persistence over passive waiting. The slight formality of the phrasing gives it an almost timeless, biblical weight.",
  },
  {
    swedish: "Man skördar som man sår",
    translation: "You reap what you sow",
    meaning:
      "What you put into life — your effort, your kindness, your choices — is what comes back to you. Treat people well and work hard, and good things follow. A deeply agricultural metaphor from a culture that spent centuries farming harsh Swedish land.",
  },
  {
    swedish: "Ärlighet varar längst",
    translation: "Honesty lasts longest",
    meaning:
      "In the long run, honesty is always the better strategy. Lies and half-truths may work short-term, but they unravel. Swedes have a strong cultural aversion to dishonesty — not just morally, but practically. The truth is simply more durable.",
  },
  {
    swedish: "Var sak har sin tid och plats",
    translation: "Everything has its time and place",
    meaning:
      "Context matters. A joke that's perfect at a dinner party is wrong at a funeral. Work belongs at work; rest belongs at rest. This proverb reflects the Swedish appreciation for appropriate boundaries and social awareness.",
  },
  {
    swedish: "Det är tanken som räknas",
    translation: "It's the thought that counts",
    meaning:
      "The intention behind a gesture matters more than its size or perfection. A small, thoughtful gift from the heart beats an expensive one given without care. Swedes are practical people, but they understand that feeling seen and considered is deeply valuable.",
  },
  {
    swedish: "Gammal kärlek rostar inte",
    translation: "Old love doesn't rust",
    meaning:
      "Feelings for someone you once loved deeply don't simply disappear with time. When you meet again after years apart, those emotions can return as strong as ever. It's not just about romance — it applies to old friendships and beloved places too.",
  },
  {
    swedish: "Kärlek är blind",
    translation: "Love is blind",
    meaning:
      "When you love someone, you don't see their flaws — or you choose not to. Used both tenderly, as love accepts people as they are, and as a gentle warning to be careful you're not ignoring real problems because you're in love. Universal, but no less true for it.",
  },
  {
    swedish: "En god vän är bättre än hundra släktingar",
    translation: "A good friend is better than a hundred relatives",
    meaning:
      "Family is given to you; friendship is chosen. A real friend who shows up for you is worth more than a large family that doesn't. This reflects the Swedish value of genuine, chosen connection over obligation.",
  },
  {
    swedish: "Bättre ensam än i dåligt sällskap",
    translation: "Better alone than in bad company",
    meaning:
      "Don't surround yourself with people who drag you down just to avoid being alone. Loneliness is temporary; the damage from the wrong people can last much longer. Quality over quantity, always.",
  },
  {
    swedish: "Som man bäddar får man ligga",
    translation: "As you make your bed, so you must lie in it",
    meaning:
      "You live with the consequences of your own choices. If you made decisions carelessly or selfishly, don't be surprised when the result is uncomfortable. No one else is responsible for the bed you made.",
  },
  {
    swedish: "Den som gräver en grop för andra faller ofta i den själv",
    translation: "He who digs a pit for others often falls in it himself",
    meaning:
      "If you set out to harm, trick, or undermine someone else, you usually end up hurting yourself in the process. Karma, Swedish-style. It's a quiet warning against scheming — the trap you set has a way of closing around you.",
  },
  {
    swedish: "Tyst vatten har djupt botten",
    translation: "Still waters run deep",
    meaning:
      "The quietest people often have the most going on beneath the surface. Don't underestimate someone just because they don't talk much or show their feelings easily. In a culture known for its reserved nature, this proverb is essentially a self-portrait of the Swedish character.",
  },
  {
    swedish: "Allt som glimmar är inte guld",
    translation: "Not all that glitters is gold",
    meaning:
      "Appearances can be misleading. Something that looks impressive, attractive, or valuable on the surface may be hollow underneath. Swedes are instinctively skeptical of things that seem too good — this proverb gives that skepticism a name.",
  },
  {
    swedish: "Alla är inte kockar som har långa knivar",
    translation: "Not everyone with a long knife is a cook",
    meaning:
      "Having the right equipment, title, or appearance doesn't mean you have the skill. A long knife looks impressive, but it takes years of practice to cook well. A dry Swedish observation about people who talk the talk but can't walk the walk.",
  },
  {
    swedish: "Ju fler kockar, desto sämre soppa",
    translation: "The more cooks, the worse the soup",
    meaning:
      "Too many people involved in a decision or project creates chaos and dilutes the result. The best meals — and the best work — often come from one clear vision, not a committee. Swedes use this to politely explain why they'd rather not involve more people.",
  },
  {
    swedish: "Vad ögat inte ser, gråter inte hjärtat över",
    translation: "What the eye doesn't see, the heart doesn't grieve over",
    meaning:
      "If you don't know about something, it can't cause you pain. Sometimes ignorance genuinely is bliss — and Swedes, with their practical nature, can accept this without guilt. Not everything needs to be known.",
  },
  {
    swedish: "Det man inte vet har man inte ont av",
    translation: "What you don't know doesn't hurt you",
    meaning:
      "A simpler cousin to the proverb above. Some information is painful and serves no purpose. This is the Swedish version of not telling someone something that would only upset them without changing anything.",
  },
  {
    swedish: "Inget ont som inte har något gott med sig",
    translation: "No evil without some good in it",
    meaning:
      "Even in bad situations, something positive can be found — a lesson, a change, an unexpected door that opens. The Swedish approach to hardship is stoic but not pessimistic. They look for the good without pretending the bad isn't there.",
  },
  {
    swedish: "Skam den som ger sig",
    translation: "Shame on whoever gives up",
    meaning:
      "Don't quit. Push through. There's something almost stubborn in Swedish culture — a quiet refusal to surrender — and this proverb puts it plainly. Giving up isn't just disappointing; it's something to be ashamed of.",
  },
  {
    swedish: "Bättre fly än illa fäkta",
    translation: "Better to flee than to fight badly",
    meaning:
      "Knowing when to walk away is wisdom, not cowardice. If you're not prepared, outmatched, or simply fighting the wrong battle — retreat is the smarter move. Swedes are pragmatic: pointless suffering isn't noble.",
  },
  {
    swedish: "Hjälp dig själv, så hjälper Gud dig",
    translation: "Help yourself and God will help you",
    meaning:
      "Take initiative before asking for help — divine or otherwise. Waiting around for someone to rescue you isn't a strategy. Make your own effort first, and then help will come. This fits perfectly with the Swedish cultural value of self-sufficiency.",
  },
  {
    swedish: "Bättre att be om förlåtelse än om lov",
    translation: "Better to ask forgiveness than permission",
    meaning:
      "Sometimes it's faster and more effective to do the thing first and deal with the reaction afterward. A slightly subversive proverb — used with a knowing smile when someone is about to bend a rule. Swedes are rule-followers by nature, which makes this one feel delightfully rebellious.",
  },
  {
    swedish: "Den som inte frågar vet ingenting",
    translation: "He who doesn't ask knows nothing",
    meaning:
      "Curiosity and the willingness to ask questions are how you learn. Staying quiet out of pride or embarrassment just keeps you uninformed. Ask. It's not weakness — it's intelligence.",
  },
  {
    swedish: "Den som gapar efter mycket mister ofta hela stycket",
    translation: "Reach for too much and you often lose it all",
    meaning:
      "Greed and overreach tend to backfire. If you're not satisfied with what you have and keep grasping for more, you risk losing everything. This proverb is a gentle nudge toward contentment — a very Swedish concept, closely related to lagom.",
  },
  {
    swedish: "Smaken är som baken, delad",
    translation: "Taste is like the backside — divided",
    meaning:
      "Everyone has different preferences, and that's perfectly fine. You can't argue about taste — there's no right answer. The Swedish version of 'to each their own,' with significantly more humor. The rhyme and the cheekiness make it unforgettable.",
  },
  {
    swedish: "Den som skrattar bäst skrattar sist",
    translation: "He who laughs best laughs last",
    meaning:
      "Don't celebrate too early. The final outcome matters more than the early score. This is often said with quiet satisfaction by the person who was underestimated, mocked, or dismissed — and who ultimately came out on top.",
  },
  {
    swedish: "Man kan inte äta kakan och ha den kvar",
    translation: "You can't eat the cake and keep it too",
    meaning:
      "You can't have everything both ways. Once you use something up, it's gone. A choice has a cost. Swedes are practical about trade-offs — you decide what matters most and accept what you give up in return.",
  },
  {
    swedish: "Äta bör man annars dör man",
    translation: "You must eat, or else you'll die",
    meaning:
      "A wonderfully practical and slightly comic Swedish observation. At its most literal, it's just true. But it's used more broadly to justify a meal, a snack, a second helping — or to poke fun at people who make eating unnecessarily complicated. Sometimes the answer really is that simple.",
  },
  {
    swedish: "Livet är kort, men konsten är lång",
    translation: "Life is short but art is long",
    meaning:
      "There is more to learn and create than any one person can do in a lifetime. This proverb — rooted in ancient philosophy — is deeply felt in Swedish culture, where craftsmanship, music, literature, and design are taken seriously. Don't waste the short time you have.",
  },
  {
    swedish: "Lyckan är inte beständig",
    translation: "Luck doesn't last forever",
    meaning:
      "Good fortune is temporary. Enjoy it while it's here, but don't build your life on the assumption it will stay. This isn't pessimism — it's Swedish realism. Plan for when the luck runs out.",
  },
  {
    swedish: "Tid läker alla sår",
    translation: "Time heals all wounds",
    meaning:
      "Pain, grief, and heartbreak ease with time. What feels unbearable today becomes bearable, then manageable, then just a scar. Swedes don't rush this process — they respect it. Time is given its proper weight.",
  },
  {
    swedish: "Man lever inte av bröd allena",
    translation: "Man does not live by bread alone",
    meaning:
      "Physical needs are not enough. Human beings need meaning, connection, beauty, and purpose. The body needs food; the soul needs something else. A reminder not to reduce life to its practical necessities.",
  },
  {
    swedish: "Den som spar han har",
    translation: "Save today, have tomorrow",
    meaning:
      "Thrift and foresight are virtues. If you save what you have rather than spending it all now, you'll have something when you need it. Very aligned with the Swedish cultural value of not living beyond your means.",
  },
  {
    swedish: "Den som väntar på något gott väntar aldrig för länge",
    translation: "He who waits for something good never waits too long",
    meaning:
      "If what you're waiting for is truly worth having, the wait is worth it. Patience pays off when the thing you're patient for is genuinely good. It also reframes waiting — instead of suffering, you're simply letting something good arrive.",
  },
  {
    swedish: "Övning ger färdighet",
    translation: "Practice makes perfect",
    meaning:
      "Skill comes from repetition, not talent alone. Swedes respect hard work and mastery — there's no shortcut to being good at something. The hours you put in show in the result. Keep going, even when progress is slow.",
  },
  {
    swedish: "Lär av misstagen",
    translation: "Learn from your mistakes",
    meaning:
      "Mistakes are not failures — they're information. The only real waste is making a mistake and taking nothing from it. Swedish culture doesn't dramatize failure; it treats it as a natural part of doing anything worth doing.",
  },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function drawLine(doc, x1, y1, x2, y2, color, width = 0.5) {
  doc
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .strokeColor(color)
    .lineWidth(width)
    .stroke();
}

function fillRect(doc, x, y, w, h, color) {
  doc.rect(x, y, w, h).fill(color);
}

// ─── title page ───────────────────────────────────────────────────────────────

function drawTitlePage(doc) {
  doc.addPage({ size: [W, H], margins: { top: 0, bottom: 0, left: 0, right: 0 } });

  // Background
  fillRect(doc, 0, 0, W, H, COLOR.titleBg);

  // Subtle warm gradient strip at bottom
  fillRect(doc, 0, H * 0.75, W, H * 0.25, "#2A1A08");

  // Top thin gold line
  drawLine(doc, M, 72, W - M, 72, COLOR.gold, 0.6);

  // Small label
  doc
    .font(FONT.italic)
    .fontSize(9)
    .fillColor(COLOR.gold)
    .text("ordspråk", 0, 84, { align: "center", width: W });

  // Main title
  doc
    .font(FONT.bold)
    .fontSize(44)
    .fillColor(COLOR.cream)
    .text("51 Swedish", 0, 180, { align: "center", width: W });

  doc
    .font(FONT.regular)
    .fontSize(44)
    .fillColor(COLOR.cream)
    .text("Proverbs", 0, 232, { align: "center", width: W });

  // Gold divider line
  drawLine(doc, W / 2 - 36, 302, W / 2 + 36, 302, COLOR.gold, 0.8);

  // Subtitle
  doc
    .font(FONT.italic)
    .fontSize(12)
    .fillColor(COLOR.muted)
    .text("with translations and stories", 0, 316, { align: "center", width: W });

  // Author
  doc
    .font(FONT.italic)
    .fontSize(13)
    .fillColor(COLOR.gold)
    .text("by Denise", 0, 420, { align: "center", width: W });

  // Bottom thin gold line
  drawLine(doc, M, H - 72, W - M, H - 72, COLOR.gold, 0.6);

  // Website
  doc
    .font(FONT.regular)
    .fontSize(8)
    .fillColor(COLOR.subtleText)
    .text("studyswedish.com", 0, H - 58, { align: "center", width: W });
}

// ─── proverb page ─────────────────────────────────────────────────────────────

function drawProverbPage(doc, proverb, index) {
  doc.addPage({ size: [W, H], margins: { top: 0, bottom: 0, left: 0, right: 0 } });

  // Warm cream background
  fillRect(doc, 0, 0, W, H, COLOR.pageBg);

  // Subtle top bar
  fillRect(doc, 0, 0, W, 5, COLOR.goldFaint);

  const textW = W - M * 2;

  // Proverb number — top right
  const numStr = String(index + 1).padStart(2, "0");
  doc
    .font(FONT.italic)
    .fontSize(9)
    .fillColor(COLOR.gold)
    .text(numStr, W - M - 24, 36, { width: 24, align: "right" });

  // Thin horizontal rule at top
  drawLine(doc, M, 52, W - M, 52, COLOR.goldDim, 0.4);

  // Swedish proverb text — large, commanding
  doc
    .font(FONT.bold)
    .fontSize(26)
    .fillColor(COLOR.dark)
    .text(proverb.swedish, M, 80, { width: textW, align: "left", lineGap: 6 });

  const afterSwedish = doc.y + 22;

  // Gold decorative rule
  drawLine(doc, M, afterSwedish, M + 48, afterSwedish, COLOR.gold, 1.2);

  const afterRule = afterSwedish + 22;

  // Translation — italic, warm brown
  doc
    .font(FONT.italic)
    .fontSize(12)
    .fillColor(COLOR.muted)
    .text(proverb.translation, M, afterRule, { width: textW, align: "left" });

  const afterTranslation = doc.y + 28;

  // Meaning — body text
  doc
    .font(FONT.regular)
    .fontSize(11)
    .fillColor(COLOR.medium)
    .text(proverb.meaning, M, afterTranslation, {
      width: textW,
      align: "left",
      lineGap: 4,
    });

  // Bottom rule
  drawLine(doc, M, H - 48, W - M, H - 48, COLOR.goldDim, 0.4);

  // Page number at bottom center
  doc
    .font(FONT.regular)
    .fontSize(8)
    .fillColor(COLOR.goldDim)
    .text(String(index + 2), 0, H - 36, { align: "center", width: W });
}

// ─── closing page ─────────────────────────────────────────────────────────────

function drawClosingPage(doc) {
  doc.addPage({ size: [W, H], margins: { top: 0, bottom: 0, left: 0, right: 0 } });

  fillRect(doc, 0, 0, W, H, COLOR.titleBg);

  drawLine(doc, M, 72, W - M, 72, COLOR.gold, 0.6);

  doc
    .font(FONT.italic)
    .fontSize(22)
    .fillColor(COLOR.cream)
    .text("Tack för att du", 0, 220, { align: "center", width: W });

  doc
    .font(FONT.italic)
    .fontSize(22)
    .fillColor(COLOR.cream)
    .text("är här.", 0, 254, { align: "center", width: W });

  doc
    .font(FONT.regular)
    .fontSize(10)
    .fillColor(COLOR.muted)
    .text("Thank you for being here.", 0, 294, { align: "center", width: W });

  drawLine(doc, W / 2 - 24, 330, W / 2 + 24, 330, COLOR.gold, 0.6);

  doc
    .font(FONT.regular)
    .fontSize(10)
    .fillColor(COLOR.muted)
    .text("@swedish_with_denise", 0, 350, { align: "center", width: W });

  doc
    .font(FONT.regular)
    .fontSize(9)
    .fillColor(COLOR.subtleText)
    .text("studyswedish.com", 0, 370, { align: "center", width: W });

  drawLine(doc, M, H - 72, W - M, H - 72, COLOR.gold, 0.6);
}

// ─── build document ───────────────────────────────────────────────────────────

const OUTPUT = "C:\\Users\\User\\studyswedish\\51-swedish-proverbs.pdf";

const doc = new PDFDocument({ autoFirstPage: false, compress: true });
const stream = createWriteStream(OUTPUT);
doc.pipe(stream);

doc.registerFont("regular",    FONT.regular);
doc.registerFont("bold",       FONT.bold);
doc.registerFont("italic",     FONT.italic);
doc.registerFont("boldItalic", FONT.boldItalic);

drawTitlePage(doc);
proverbs.forEach((p, i) => drawProverbPage(doc, p, i));
drawClosingPage(doc);

doc.end();

stream.on("finish", () => {
  console.log(`Done — saved to ${OUTPUT}`);
});
