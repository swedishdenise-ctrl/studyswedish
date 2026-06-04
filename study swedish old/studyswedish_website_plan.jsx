import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Foundation",
    timeline: "Weeks 1–4",
    color: "#004B87",
    description: "Launch the site with core free content + your first paid product (the book). This alone starts generating traffic AND revenue.",
    tasks: [
      {
        category: "Site Structure",
        items: [
          "Set up WordPress or Webflow (recommended: WordPress for SEO + flexibility)",
          "Choose domain: studyswedish.com or similar (check availability)",
          "Install membership/paywall plugin (Paid Memberships Pro or MemberPress)",
          "Set up Stripe/PayPal for payments",
          "Design homepage, navigation, and branding (Swedish blue + yellow)",
          "Set up email list (ConvertKit or MailerLite — free tier)"
        ]
      },
      {
        category: "Free Content — Pronunciation (10 lessons)",
        items: [
          "Lesson 1: The Swedish Alphabet — Å, Ä, Ö explained",
          "Lesson 2: Vowel Sounds — A, E, I, O, U, Y in Swedish",
          "Lesson 3: The SJ-Sound — Sweden's hardest sound",
          "Lesson 4: Soft K and G — Before E, I, Y, Ä, Ö",
          "Lesson 5: The J, DJ, LJ, GJ sounds",
          "Lesson 6: Swedish R — Rolled vs guttural",
          "Lesson 7: The Swedish U — Unlike anything in English",
          "Lesson 8: Stress & Pitch Accent — The singing language",
          "Lesson 9: Silent Letters — The rules that save you",
          "Lesson 10: RS, RT, RN, RD — Retroflexes explained"
        ]
      },
      {
        category: "Free Content — Beginner Grammar (10 lessons)",
        items: [
          "Lesson 1: Swedish Sentence Structure — SVO basics",
          "Lesson 2: En & Ett — The two genders explained",
          "Lesson 3: Definite Articles — Adding the/an to the END of words",
          "Lesson 4: Plural Nouns — The 5 groups",
          "Lesson 5: Personal Pronouns — Jag, du, han, hon, vi, de",
          "Lesson 6: Present Tense — Regular verbs (-ar, -er, -r)",
          "Lesson 7: Common Irregular Verbs — Är, har, gör, går, ser",
          "Lesson 8: Questions — How to ask in Swedish",
          "Lesson 9: Negation — Inte and its placement",
          "Lesson 10: Adjective Agreement — Matching en/ett/plural"
        ]
      },
      {
        category: "Free Content — Vocabulary (5 topics)",
        items: [
          "Greetings & Introductions (30 words/phrases)",
          "Numbers & Counting (1–100 + ordinals)",
          "Days, Months & Time expressions",
          "Colors, Shapes & Basic Descriptions",
          "Family & Relationships vocabulary"
        ]
      },
      {
        category: "Premium Product #1",
        items: [
          "Upload 'Survive Sweden' book as downloadable PDF",
          "Create a sales page with preview, testimonials placeholder, and buy button",
          "Price: €12.99 / $14.99",
          "Set up automated delivery via Gumroad, Payhip, or WooCommerce"
        ]
      },
      {
        category: "SEO & Traffic",
        items: [
          "Write meta titles & descriptions for every page",
          "Target keywords: 'learn Swedish', 'Swedish for beginners', 'Swedish pronunciation'",
          "Submit sitemap to Google Search Console",
          "Create a blog section for culture content (drives organic traffic)"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Growth",
    timeline: "Weeks 5–10",
    color: "#006B3F",
    description: "Expand free content to build authority + add more premium products. Start the culture section. Begin building email list seriously.",
    tasks: [
      {
        category: "Free Content — Grammar Continued (10 more lessons)",
        items: [
          "Lesson 11: Past Tense (Preteritum) — Regular verbs",
          "Lesson 12: Past Tense — Irregular verbs",
          "Lesson 13: Future Tense — Ska + kommer att",
          "Lesson 14: Modal Verbs — Kan, vill, måste, ska, bör",
          "Lesson 15: Possessives — Min, din, sin, hans, hennes",
          "Lesson 16: Prepositions — I, på, till, från, med, om",
          "Lesson 17: Adverbs — Här, där, nu, ofta, aldrig, redan",
          "Lesson 18: Conjunctions — Och, men, eller, att, om, när",
          "Lesson 19: Comparisons — Större, bättre, mest, minst",
          "Lesson 20: Word Order in Subclauses — V2 rule deep dive"
        ]
      },
      {
        category: "Free Content — Vocabulary (5 more topics)",
        items: [
          "Food & Drinks — Swedish food culture vocab",
          "Travel & Transport — Getting around Sweden",
          "Shopping & Money — Swedish kronor, cashless culture",
          "Body & Health — Doctor visits, pharmacy",
          "Weather & Nature — Sweden's seasons"
        ]
      },
      {
        category: "Culture Section (FREE — drives SEO traffic)",
        items: [
          "Swedish Culture 101: Lagom, Jantelagen, Fika explained",
          "Guide: Moving to Sweden — What you need to know",
          "Guide: Swedish Holidays & Traditions (Midsommar, Lucia, Jul)",
          "Guide: Swedish Social Rules — The unwritten codes",
          "Guide: Swedish Food Guide — What to eat and try",
          "Guide: Living in Sweden — Cost of living, healthcare, housing",
          "Blog posts: 'X Things That Surprised Me About Sweden' format"
        ]
      },
      {
        category: "Premium Product #2 — Digital Phrase Packs",
        items: [
          "Swedish Travel Phrase Pack (PDF, 25-30 pages) — €7.99",
          "Swedish at Work Phrase Pack (office/job Swedish) — €7.99",
          "Swedish Dating & Social Life Pack — €7.99",
          "Bundle: All 3 packs for €17.99"
        ]
      },
      {
        category: "Email List Building",
        items: [
          "Create lead magnet: 'Free Swedish Starter Kit' (mini PDF with top 50 phrases)",
          "Add email signup forms to every page",
          "Set up 5-email welcome sequence introducing your content + products",
          "Weekly newsletter: 'Swedish Word of the Week' + culture tip"
        ]
      },
      {
        category: "Social Media Integration",
        items: [
          "Embed TikTok/Instagram videos in relevant lessons",
          "Add 'Follow me' section to sidebar/footer",
          "Cross-promote: every social post links to a free lesson on the site",
          "Every site lesson links to related social content"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Scale",
    timeline: "Weeks 11–20",
    color: "#2D6AA5",
    description: "Add the structured online course, intermediate/advanced grammar, quizzes, and start building the ecosystem that makes this THE Swedish learning site.",
    tasks: [
      {
        category: "Free Content — Intermediate Grammar (10 lessons)",
        items: [
          "Lesson 21: Perfect Tense — Har + supinum",
          "Lesson 22: Reflexive Verbs — Sig, mig, dig",
          "Lesson 23: Passive Voice — -s form and bli + past participle",
          "Lesson 24: Relative Pronouns — Som, vars, vilken",
          "Lesson 25: Participles as Adjectives",
          "Lesson 26: Conditional — Skulle + infinitive",
          "Lesson 27: Reported Speech",
          "Lesson 28: S-verbs — Finns, hoppas, lyckas, trivs",
          "Lesson 29: Formal vs Informal Swedish — Du-reformen",
          "Lesson 30: Common Mistakes — What to avoid"
        ]
      },
      {
        category: "Interactive Features (FREE)",
        items: [
          "Quizzes after every grammar lesson (auto-graded)",
          "Flashcard system for vocabulary sections",
          "Swedish Word of the Day widget on homepage",
          "Pronunciation audio player for all vocabulary",
          "'Test Your Level' placement quiz for new visitors"
        ]
      },
      {
        category: "Premium Product #3 — Online Course",
        items: [
          "Structured 'Beginner to Conversational' course (30 lessons)",
          "Includes audio, exercises, quizzes, and progress tracking",
          "Price: €49-79 one-time, or €9.99/month membership",
          "Hosted via LearnDash (WordPress plugin) or Teachable",
          "Create course sales page with curriculum preview"
        ]
      },
      {
        category: "Premium Product #4 — Culture Book",
        items: [
          "Write the Swedish Culture book (your second book)",
          "Sell as digital PDF on the site — €12.99",
          "Also prep KDP version for Amazon"
        ]
      },
      {
        category: "Verb Conjugation Tool (FREE)",
        items: [
          "Searchable verb conjugation tables (like StudySpanish's verb drills)",
          "Cover the 100 most common Swedish verbs",
          "All tenses: present, past, perfect, future, imperative",
          "Practice drills: fill-in-the-blank conjugation exercises"
        ]
      },
      {
        category: "App Promotion",
        items: [
          "Create dedicated page for your Swedish language app",
          "Add download links / waitlist signup",
          "Cross-promote app in relevant lessons ('Practice this on our app!')"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Authority",
    timeline: "Months 6–12",
    color: "#FECC02",
    textColor: "#1A1A2E",
    description: "Become THE go-to Swedish learning site. Advanced content, community features, premium video lessons, and partnerships.",
    tasks: [
      {
        category: "Advanced Grammar (10 lessons)",
        items: [
          "Lessons 31-40: Subjunctive, complex clause structures, literary Swedish, business Swedish, academic writing, idiomatic grammar, regional dialects overview, Swedish vs Norwegian/Danish comparison, formal register, and exam preparation"
        ]
      },
      {
        category: "Specialized Vocabulary Sections",
        items: [
          "Swedish for Business — Office, meetings, emails",
          "Swedish for Healthcare — Medical terms, doctor visits",
          "Swedish for Parents — School, childcare, playground vocab",
          "Swedish Slang Dictionary — Searchable, crowd-sourced",
          "Swedish Idioms & Expressions — With explanations and examples"
        ]
      },
      {
        category: "Premium: Video Lessons (High Quality Subscription)",
        items: [
          "Record professional-quality video lessons",
          "Structured course with you teaching on camera",
          "Subscription model: €14.99/month or €99/year",
          "This is the premium tier — your face, your teaching style, premium production"
        ]
      },
      {
        category: "Community Features",
        items: [
          "Forum or Discord community for learners",
          "Weekly live Q&A sessions (for premium members)",
          "Student progress tracking and achievement badges",
          "User-submitted stories: 'My Swedish Journey'"
        ]
      },
      {
        category: "Partnerships & Collabs",
        items: [
          "Reach out to Swedish tourism boards for sponsorship",
          "Partner with Swedish language schools for referral fees",
          "Collaborate with Nordic brands (food, design, fashion)",
          "Guest posts from other Swedish creators/teachers",
          "Affiliate links: Swedish textbooks, travel gear, apps"
        ]
      },
      {
        category: "Additional Tools",
        items: [
          "Swedish-English mini dictionary (searchable)",
          "Listening exercises with audio clips",
          "Reading practice: Swedish texts with translations",
          "Printable worksheets for each grammar lesson",
          "'Study Plan Generator' — personalized based on goal and timeline"
        ]
      }
    ]
  }
];

const siteMap = [
  { page: "Homepage", description: "Hero section, 'Start Learning' CTA, featured lessons, word of the day, social proof", free: true },
  { page: "Pronunciation", description: "10+ lessons on Swedish sounds, Å Ä Ö, SJ-sound, pitch accent", free: true },
  { page: "Grammar", description: "30-40 structured lessons from beginner to advanced", free: true },
  { page: "Vocabulary", description: "10+ themed word lists with audio and practice", free: true },
  { page: "Verb Conjugation", description: "Searchable tables + drill exercises for 100+ verbs", free: true },
  { page: "Culture & Guides", description: "Swedish life, traditions, moving guide, social rules, food", free: true },
  { page: "Blog", description: "SEO-driven articles, 'X things about Sweden', culture deep dives", free: true },
  { page: "Quizzes & Tests", description: "Level test, grammar quizzes, vocab practice", free: true },
  { page: "Store / Products", description: "Survive Sweden book, phrase packs, culture book, bundles", paid: true },
  { page: "Online Course", description: "Structured beginner-to-conversational course with progress tracking", paid: true },
  { page: "Video Lessons", description: "Premium video course (future — high production quality)", paid: true },
  { page: "App Page", description: "Promote your Swedish learning app, download links", free: true },
  { page: "About / My Story", description: "Your background, why you teach Swedish, builds trust", free: true },
  { page: "Newsletter Signup", description: "Free Swedish Starter Kit lead magnet, email capture", free: true },
];

const revenueStreams = [
  { product: "Survive Sweden Book", price: "€12.99", type: "One-time", priority: "NOW" },
  { product: "Phrase Packs (3)", price: "€7.99 each", type: "One-time", priority: "Month 2" },
  { product: "Phrase Pack Bundle", price: "€17.99", type: "One-time", priority: "Month 2" },
  { product: "Culture Book", price: "€12.99", type: "One-time", priority: "Month 4" },
  { product: "Online Course", price: "€49-79", type: "One-time", priority: "Month 3-4" },
  { product: "Premium Membership", price: "€9.99/mo", type: "Recurring", priority: "Month 4" },
  { product: "Video Lessons Sub", price: "€14.99/mo", type: "Recurring", priority: "Month 6+" },
  { product: "Affiliate Links", price: "Varies", type: "Passive", priority: "Month 2+" },
];

export default function StudySwedishPlan() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTab, setActiveTab] = useState("phases");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (key) => {
    setExpandedCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const phase = phases[activePhase];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#FAFAF7", minHeight: "100vh", color: "#1A1A2E" }}>
      
      {/* Header */}
      <div style={{ background: "#004B87", color: "white", padding: "40px 24px 32px", textAlign: "center" }}>
        <div style={{ width: 50, height: 4, background: "#FECC02", margin: "0 auto 16px", borderRadius: 2 }} />
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px", letterSpacing: -0.5 }}>StudySwedish.com</h1>
        <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>Complete Website Content & Launch Plan</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #E8E4DE", background: "white", position: "sticky", top: 0, zIndex: 10 }}>
        {[
          { id: "phases", label: "Build Phases" },
          { id: "sitemap", label: "Site Map" },
          { id: "revenue", label: "Revenue" },
          { id: "content", label: "Content Stats" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: "14px 8px", border: "none", background: activeTab === tab.id ? "white" : "#F5F4F0",
            borderBottom: activeTab === tab.id ? "3px solid #004B87" : "3px solid transparent",
            color: activeTab === tab.id ? "#004B87" : "#888", fontWeight: activeTab === tab.id ? 700 : 500,
            fontSize: 12, cursor: "pointer", transition: "all 0.2s"
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ padding: "20px 16px", maxWidth: 800, margin: "0 auto" }}>

        {/* ═══ PHASES TAB ═══ */}
        {activeTab === "phases" && (
          <>
            {/* Phase Selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto" }}>
              {phases.map((p, i) => (
                <button key={p.id} onClick={() => setActivePhase(i)} style={{
                  padding: "10px 16px", borderRadius: 10, border: "2px solid",
                  borderColor: activePhase === i ? p.color : "#E8E4DE",
                  background: activePhase === i ? p.color : "white",
                  color: activePhase === i ? (p.textColor || "white") : "#555",
                  fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.2s", minWidth: "fit-content"
                }}>
                  Phase {p.id}: {p.title}
                </button>
              ))}
            </div>

            {/* Phase Header */}
            <div style={{ background: "white", borderRadius: 14, padding: "24px 20px", marginBottom: 16, border: "1px solid #E8E4DE", borderLeft: `4px solid ${phase.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: phase.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                {phase.timeline}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", color: "#1A1A2E" }}>
                Phase {phase.id}: {phase.title}
              </h2>
              <p style={{ fontSize: 14, color: "#666", margin: 0, lineHeight: 1.5 }}>{phase.description}</p>
            </div>

            {/* Task Categories */}
            {phase.tasks.map((task, ti) => {
              const key = `${activePhase}-${ti}`;
              const isOpen = expandedCategories[key] !== false;
              return (
                <div key={ti} style={{ background: "white", borderRadius: 12, marginBottom: 10, border: "1px solid #E8E4DE", overflow: "hidden" }}>
                  <button onClick={() => toggleCategory(key)} style={{
                    width: "100%", padding: "16px 20px", border: "none", background: "transparent",
                    display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left"
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E" }}>{task.category}</div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{task.items.length} items</div>
                    </div>
                    <div style={{ fontSize: 18, color: "#888", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</div>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 20px 16px" }}>
                      {task.items.map((item, ii) => (
                        <div key={ii} style={{
                          padding: "10px 14px", background: "#F8F7F4", borderRadius: 8, marginBottom: 6,
                          fontSize: 13, color: "#444", lineHeight: 1.5, borderLeft: `3px solid ${phase.color}20`
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* ═══ SITEMAP TAB ═══ */}
        {activeTab === "sitemap" && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#004B87", marginBottom: 16 }}>Complete Site Map</h2>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 20, lineHeight: 1.5 }}>
              Every page your site needs, organized by free vs premium content.
            </p>
            
            <div style={{ fontSize: 11, fontWeight: 700, color: "#006B3F", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
              Free Pages (Drive Traffic & Build Trust)
            </div>
            {siteMap.filter(s => s.free).map((page, i) => (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "16px 18px", marginBottom: 8, border: "1px solid #E8E4DE", borderLeft: "3px solid #006B3F" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E", marginBottom: 4 }}>{page.page}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.4 }}>{page.description}</div>
              </div>
            ))}

            <div style={{ fontSize: 11, fontWeight: 700, color: "#C4302B", letterSpacing: 2, textTransform: "uppercase", margin: "20px 0 10px" }}>
              Premium Pages (Revenue)
            </div>
            {siteMap.filter(s => s.paid).map((page, i) => (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "16px 18px", marginBottom: 8, border: "1px solid #E8E4DE", borderLeft: "3px solid #FECC02" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E", marginBottom: 4 }}>💰 {page.page}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.4 }}>{page.description}</div>
              </div>
            ))}
          </>
        )}

        {/* ═══ REVENUE TAB ═══ */}
        {activeTab === "revenue" && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#004B87", marginBottom: 16 }}>Revenue Streams</h2>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 20, lineHeight: 1.5 }}>
              All your monetization channels, from day one products to future recurring revenue.
            </p>

            {revenueStreams.map((r, i) => (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "16px 18px", marginBottom: 8, border: "1px solid #E8E4DE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1A1A2E" }}>{r.product}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{r.type}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#004B87" }}>{r.price}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, marginTop: 4, display: "inline-block",
                    background: r.priority === "NOW" ? "#006B3F" : "#EEF4FA",
                    color: r.priority === "NOW" ? "white" : "#2D6AA5"
                  }}>{r.priority}</div>
                </div>
              </div>
            ))}

            <div style={{ background: "#FEF9EE", borderRadius: 12, padding: "20px", marginTop: 20, borderLeft: "3px solid #FECC02" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#006B3F", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Revenue Potential</div>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>
                With 22k followers and growing, even a 2% conversion rate on the book alone means ~440 sales = ~€5,700. 
                Add phrase packs, the course, and eventually subscriptions — you're building toward €1,000-3,000/month 
                within 6-12 months. The free content drives SEO traffic (new audience beyond your socials) which compounds over time.
              </p>
            </div>
          </>
        )}

        {/* ═══ CONTENT STATS TAB ═══ */}
        {activeTab === "content" && (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#004B87", marginBottom: 16 }}>Content Overview</h2>

            {[
              { label: "Pronunciation Lessons", count: "10+", status: "Phase 1" },
              { label: "Grammar Lessons", count: "40", status: "Phases 1-4" },
              { label: "Vocabulary Topics", count: "10+", status: "Phases 1-2" },
              { label: "Culture & Guide Articles", count: "10+", status: "Phase 2+" },
              { label: "Blog Posts (SEO)", count: "Ongoing", status: "Phase 2+" },
              { label: "Quizzes & Tests", count: "40+", status: "Phase 3" },
              { label: "Verb Conjugation Tables", count: "100+ verbs", status: "Phase 3" },
              { label: "Premium Products", count: "7+", status: "All phases" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "14px 18px", marginBottom: 6, border: "1px solid #E8E4DE", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1A1A2E" }}>{stat.label}</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: 16, color: "#004B87" }}>{stat.count}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: "#EEF4FA", color: "#2D6AA5" }}>{stat.status}</span>
                </div>
              </div>
            ))}

            <div style={{ background: "white", borderRadius: 14, padding: "24px 20px", marginTop: 20, border: "1px solid #E8E4DE" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#004B87", marginTop: 0, marginBottom: 12 }}>How This Beats StudySpanish.com</h3>
              {[
                { them: "No audio or video", you: "Audio pronunciation + your voice + future video lessons" },
                { them: "Text-only, no personality", you: "Your social media personality baked into every lesson" },
                { them: "No culture content", you: "Full culture section driving SEO traffic" },
                { them: "Dated design (built 1998)", you: "Modern, mobile-first design" },
                { them: "No social media presence", you: "22k+ followers feeding the site daily" },
                { them: "Grammar-only focus", you: "Grammar + vocabulary + culture + tools + products" },
                { them: "No community", you: "Forum/Discord + email list + social community" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 12, lineHeight: 1.5 }}>
                  <div style={{ flex: 1, padding: "8px 12px", background: "#FDF0EF", borderRadius: 8, color: "#888" }}>
                    <span style={{ color: "#C4302B", fontWeight: 700 }}>Them:</span> {row.them}
                  </div>
                  <div style={{ flex: 1, padding: "8px 12px", background: "#E8F5EC", borderRadius: 8, color: "#444" }}>
                    <span style={{ color: "#006B3F", fontWeight: 700 }}>You:</span> {row.you}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#004B87", borderRadius: 14, padding: "24px 20px", marginTop: 20, color: "white" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginTop: 0, marginBottom: 8, color: "#FECC02" }}>The Big Picture</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>
                Your social media brings people IN. The free content makes them STAY and trust you. 
                The premium products make you MONEY. The email list keeps them COMING BACK. 
                The SEO content brings people who've never heard of you. 
                Every piece feeds every other piece. That's the flywheel.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
