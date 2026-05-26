import fs from "node:fs";

const sessions = JSON.parse(fs.readFileSync("scraped/sessions.json", "utf8"));
const appPath = "conference-skeleton-export/index.html";
const landingPath = "index.html";

const existingTimedSchedule = [
  {
    id: "pre-aina",
    date: "2026-06-01",
    day: "Pre-Conference · Monday, June 1",
    time: "12:30 PM",
    timeEnd: "4:00 PM",
    title: "ʻĀina Ulu Huakaʻi to Paepae o Heʻeia",
    type: "ceremony",
    speaker: "Keliʻi Kotubetey",
    location: "Paepae o Heʻeia",
    description: "Optional pre-conference huakaʻi connected to place, ʻāina, and culture-based learning.",
    studentSummary: "This is the most place-based pre-conference option in the scrape. Treat it as context for the whole conference: technology work here is being framed alongside kuleana, culture, and community.",
    subItems: []
  },
  {
    id: "pre-edcamp",
    date: "2026-06-01",
    day: "Pre-Conference · Monday, June 1",
    time: "1:00 PM",
    timeEnd: "4:30 PM",
    title: "EdCamp Honolulu",
    type: "roundtable",
    speaker: "",
    location: "Honolulu",
    description: "Participant-driven professional learning before the main CONNECT26 conference days.",
    studentSummary: "EdCamp is usually less formal than a standard conference session: participants help shape the topics, share classroom practice, and learn from one another.",
    subItems: []
  },
  {
    id: "day1-breakfast",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "7:30 AM",
    timeEnd: "8:30 AM",
    title: "Continental Breakfast",
    type: "meal",
    speaker: "",
    location: "Neal S. Blaisdell Center",
    description: "Breakfast before the opening session.",
    studentSummary: "Good time to check in, scan the day, and pick a first breakout block.",
    subItems: []
  },
  {
    id: "day1-opening",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "8:30 AM",
    timeEnd: "8:50 AM",
    title: "Conference Opening",
    type: "welcome",
    speaker: "Kamehameha Schools Kūkulu Kaiāulu",
    location: "Neal S. Blaisdell Center",
    description: "Opening remarks for CONNECT26.",
    studentSummary: "The opening should set the frame for why this gathering centers culture, technology, and community connection.",
    subItems: []
  },
  {
    id: "day1-keynote",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "8:50 AM",
    timeEnd: "9:50 AM",
    title: "General Session 1 - Keynote",
    type: "keynote",
    speaker: "Christa Funk",
    location: "Neal S. Blaisdell Center",
    description: "Day 1 keynote. The preserved mobile scrape identifies Christa Funk as the Day 1 keynote presenter.",
    studentSummary: "Christa Funk brings a water-centered creative perspective. Listen for how observation, risk, preparation, and story connect to learning design.",
    subItems: []
  },
  {
    id: "day1-breakout-1",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "10:15 AM",
    timeEnd: "11:15 AM",
    title: "Breakout Session 1",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "First breakout block. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "Use the catalog as your filter: Culture, Transformation, Well-being, Advocacy, and Agency. Pick the session that best matches what you want to bring back to your classroom or team.",
    subItems: []
  },
  {
    id: "day1-breakout-2",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "11:30 AM",
    timeEnd: "12:30 PM",
    title: "Breakout Session 2",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "Second breakout block. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "If the first breakout gives you an idea, use this block to chase the next question: implementation, culture, student agency, AI, wellness, or advocacy.",
    subItems: []
  },
  {
    id: "day1-lunch",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "12:30 PM",
    timeEnd: "1:30 PM",
    title: "Lunch, Connect: Kauhale, Cultural Engagement Activities",
    type: "meal",
    speaker: "",
    location: "Neal S. Blaisdell Center",
    description: "Lunch and connection block with Kauhale and cultural engagement activities.",
    studentSummary: "This is both a meal and a community-building block. Capture names, ideas, and follow-ups while the conversations are fresh.",
    subItems: []
  },
  {
    id: "day1-breakout-3",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "1:30 PM",
    timeEnd: "2:30 PM",
    title: "Breakout Session 3",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "Third breakout block. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "Afternoon sessions are a good place to choose something practical: a classroom routine, a tool workflow, or a planning frame you can test soon.",
    subItems: []
  },
  {
    id: "day1-breakout-4",
    date: "2026-06-02",
    day: "Day 1 · Tuesday, June 2",
    time: "2:45 PM",
    timeEnd: "3:45 PM",
    title: "Breakout Session 4",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "Final breakout block for Day 1. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "End Day 1 by writing one action step and one person to reconnect with tomorrow.",
    subItems: []
  },
  {
    id: "day2-breakfast",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "7:30 AM",
    timeEnd: "8:30 AM",
    title: "Breakfast",
    type: "meal",
    speaker: "",
    location: "Neal S. Blaisdell Center",
    description: "Breakfast before the second general session.",
    studentSummary: "Quick reset before Day 2. Review yesterday's notes and decide what thread you want to keep following.",
    subItems: []
  },
  {
    id: "day2-keynote",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "8:30 AM",
    timeEnd: "9:30 AM",
    title: "General Session 2 - Keynote",
    type: "keynote",
    speaker: "Kaʻala Souza",
    location: "Neal S. Blaisdell Center",
    description: "Day 2 keynote. The preserved mobile scrape identifies Kaʻala Souza as the Day 2 keynote presenter.",
    studentSummary: "Kaʻala Souza's work bridges future-of-work thinking, digital access, and Hawaiʻi as a kingdom of learning. Listen for concrete implications for students and educators.",
    subItems: []
  },
  {
    id: "day2-breakout-5",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "9:45 AM",
    timeEnd: "10:45 AM",
    title: "Breakout Session 5",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "First Day 2 breakout block. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "Look for a session that extends yesterday's strongest idea or fills a gap in your own practice.",
    subItems: []
  },
  {
    id: "day2-breakout-6",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "11:00 AM",
    timeEnd: "12:00 PM",
    title: "Breakout Session 6",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "Second Day 2 breakout block. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "Use this block to gather examples and language you can share with colleagues after the conference.",
    subItems: []
  },
  {
    id: "day2-lunch",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "12:00 PM",
    timeEnd: "1:00 PM",
    title: "Lunch",
    type: "meal",
    speaker: "",
    location: "Neal S. Blaisdell Center",
    description: "Lunch on Day 2.",
    studentSummary: "Before the final sessions, write down the one idea you would most regret forgetting.",
    subItems: []
  },
  {
    id: "day2-breakout-7",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "1:00 PM",
    timeEnd: "2:00 PM",
    title: "Breakout Session 7",
    type: "presentation",
    speaker: "",
    location: "Rooms TBD",
    description: "Final breakout block. Choose from the 55-session catalog below once times and rooms are assigned.",
    studentSummary: "Last breakout. Choose for usefulness: what will you actually try, adapt, or discuss after CONNECT26?",
    subItems: []
  },
  {
    id: "day2-wrap",
    date: "2026-06-03",
    day: "Day 2 · Wednesday, June 3",
    time: "2:15 PM",
    timeEnd: "2:45 PM",
    title: "Wrap-up and Prize Giveaways",
    type: "announcement",
    speaker: "Kamehameha Schools Kūkulu Kaiāulu",
    location: "Neal S. Blaisdell Center",
    description: "Conference wrap-up and prize giveaways.",
    studentSummary: "Use the close to turn notes into next steps: one thing to try, one person to follow up with, and one question to keep exploring.",
    subItems: []
  }
];

const organizationHints = [
  "school", "schools", "university", "foundation", "learning", "media", "microsoft",
  "renaissance", "purple", "hawai", "hidoe", "office", "magazine", "academy", "apple",
  "department", "center", "inc", "consulting", "productions", "common sense", "punahou",
  "mid-pacific", "montessori", "spencer", "paepae", "heʻeia", "he’eia", "team"
];

function presenterPairs(session) {
  const lines = session.presenters.filter((line) => line !== "Featured Presenter");
  const pairs = [];

  for (let index = 0; index < lines.length; index += 2) {
    const name = lines[index];
    const next = lines[index + 1] || "";
    const lowerName = name.toLowerCase();
    const nameLooksLikeOrg = organizationHints.some((hint) => lowerName.includes(hint)) && !/\b(dr\.|haumāna|student|team)\b/i.test(name);

    if (!name || nameLooksLikeOrg) {
      continue;
    }

    pairs.push({
      name,
      company: next && !next.includes("Featured Presenter") ? next : "CONNECT26",
    });
  }

  return pairs;
}

function speakerLine(session) {
  return presenterPairs(session).map((pair) => pair.name).join(" · ");
}

const catalogSchedule = sessions.map((session) => ({
  id: session.id,
  date: "2026-06-02",
  day: "Session Catalog · official times and rooms TBD",
  time: "TBD",
  timeEnd: "",
  title: session.title,
  type: "presentation",
  speaker: speakerLine(session),
  location: "Breakout rooms TBD",
  description: session.description,
  studentSummary: session.strands.length
    ? `Official CONNECT strand${session.strands.length === 1 ? "" : "s"}: ${session.strands.join(", ")}.`
    : "Official session listing; strand not specified in the source table.",
  subItems: []
}));

const schedule = [...existingTimedSchedule, ...catalogSchedule];

const speakersByName = new Map([
  ["Christa Funk", { name: "Christa Funk", role: "Day 1 Keynote Presenter", company: "Surf Photographer & Waterwoman", sessions: ["day1-keynote"] }],
  ["Kaʻala Souza", { name: "Kaʻala Souza", role: "Day 2 Keynote Presenter", company: "Trainer, Researcher & Future-of-Work Thinker", sessions: ["day2-keynote"] }],
  ["Keliʻi Kotubetey", { name: "Keliʻi Kotubetey", role: "ʻĀina Momona / CBED Coordinator", company: "Paepae o Heʻeia", sessions: ["pre-aina"] }],
]);

for (const session of sessions) {
  for (const pair of presenterPairs(session)) {
    const existing = speakersByName.get(pair.name) || {
      name: pair.name,
      role: "Presenter",
      company: pair.company,
      sessions: [],
    };

    if (!existing.sessions.includes(session.id)) {
      existing.sessions.push(session.id);
    }

    if (existing.company === "CONNECT26" && pair.company) {
      existing.company = pair.company;
    }

    speakersByName.set(pair.name, existing);
  }
}

const speakers = [...speakersByName.values()].sort((a, b) => a.name.localeCompare(b.name));

function jsConst(name, value) {
  return `const ${name} = ${JSON.stringify(value, null, 2)};`;
}

function jsArrayLiteral(value) {
  return JSON.stringify(value, null, 2);
}

let app = fs.readFileSync(appPath, "utf8");
app = app.replace(
  /\/\/ ──────────────────────────────────────────────────────────\n  \/\/  SCHEDULE DATA[\s\S]*?\n  const SESSION_RESEARCH = \{\};/,
  `// ──────────────────────────────────────────────────────────\n  //  SCHEDULE DATA  —  CONNECT26, June 1-3 + 55-session catalog\n  // ──────────────────────────────────────────────────────────\n  ${jsConst("SCHEDULE", schedule)}\n\n  const SESSION_RESEARCH = {};`
);
app = app.replace(
  /\/\/ ──────────────────────────────────────────────────────────\n  \/\/  SPEAKERS DATA[\s\S]*?\n  let speakersShowStarredFirst = false;/,
  `// ──────────────────────────────────────────────────────────\n  //  SPEAKERS DATA  —  CONNECT26 presenters from the 55-session catalog\n  // ──────────────────────────────────────────────────────────\n  const SPEAKERS = ${jsArrayLiteral(speakers)}\n    .map(speaker => ({ ...speaker, id: slugify(speaker.name) }))\n    .sort((a, b) => a.name.localeCompare(b.name));\n  let speakersShowStarredFirst = false;`
);
fs.writeFileSync(appPath, app);

let landing = fs.readFileSync(landingPath, "utf8");
landing = landing.replace(/\n      <section class="section" id="sessions"[\s\S]*?<\/section>\n/g, "\n");
if (!landing.includes('href="#sessions"')) {
  landing = landing.replace('<a href="#strands">Learning Strands</a>\n        <a href="#presenters">Presenters</a>', '<a href="#strands">Learning Strands</a>\n        <a href="#sessions">Sessions</a>\n        <a href="#presenters">Presenters</a>');
}
landing = landing.replace(
  /<span>(?:\$175 includes meals and snacks|55 sessions across 5 learning strands)<\/span>/,
  "<span>55 sessions across 5 learning strands</span>"
);
landing = landing.replace(
  /\n\s*<section class="section" id="presenters"/,
  `\n\n      <section class="section" id="sessions" aria-labelledby="sessions-title">\n        <div class="section__intro section__intro--center">\n          <p class="eyebrow">Sessions</p>\n          <h2 id="sessions-title">55 sessions now posted</h2>\n          <p>The official catalog includes AI, ʻāina-based learning, student agency, digital well-being, advocacy, culture-based education, maker tools, and classroom-ready design workflows.</p>\n        </div>\n        <div class="registration-panel">\n          <a class="button button--blue" href="https://blogs.ksbe.edu/edtechconference/connect26-sessions/" target="_blank" rel="noreferrer">Browse Official Session List <span class="sr-only">(opens sessions in a new tab)</span></a>\n          <p><strong>Catalog status:</strong> 55 total sessions are listed by presenter, strand, title, and description. Exact room and breakout-block assignments are still treated as TBD in this static page.</p>\n        </div>\n      </section>\n\n      <section class="section" id="presenters"`
);
fs.writeFileSync(landingPath, landing);

console.log(`Updated ${appPath} with ${schedule.length} schedule entries and ${speakers.length} speakers.`);
console.log(`Updated ${landingPath} with the 55-session catalog notice.`);
