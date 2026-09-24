/**
 * All site copy lives here. Components render it; nothing else holds a string
 * the reader sees. Edit this file to change the words.
 */

import type { Edition } from "./editions";

/** Tints sit behind empty/loading image frames, cycled. */
export const TINTS = ["#f6dfe0", "#e3ebdf", "#f8e8d5", "#dde8ee", "#efe0e8", "#e9e7dc"];

/* ── browser tab / share card ─────────────────────────────────────────────── */

export const META = {
  title: "Ciara Nightingale",
  description:
    "Technical educator and physicist, in London. The work, and the things I'd recommend.",
};

/* ── fixed page chrome ────────────────────────────────────────────────────── */

export const CHROME = {
  name: "Ciara Nightingale",
  location: "london, uk",
  nav: [
    { label: "work", href: "#work" },
    { label: "experience", href: "#experience" },
    { label: "picks", href: "#picks" },
    { label: "contact", href: "#contact" },
  ],
};

/** Labels and tooltips for the edition switcher. Palettes live in `editions.ts`. */
export const EDITION_META: Record<Edition, { label: string; title: string }> = {
  morning: { label: "morning", title: "morning: blue sky into sunset" },
  evening: { label: "evening", title: "evening: low sun, long shadows" },
  night: { label: "night", title: "night: dark, still, quiet enough to work" },
};

/* ── hero ─────────────────────────────────────────────────────────────────── */

export const HERO = {
  /** Rendered one line per entry. */
  name: ["Ciara", "Nightingale"],
  lede:
    "Technical educator and physicist, in London. Below: the work, and the things I’d recommend.",
  explore: "explore - work · experience · picks",
};

/* ── ticker ───────────────────────────────────────────────────────────────── */

/**
 * One fact per day of the month: the 1st shows the first, the 2nd the second,
 * and so on — see `useDayOfMonth`. There are 31 so every date has one. Keep
 * them short: they scroll, so a long one reads as a wall.
 */
export const TICKER_LABEL = "daily physics fact";

export const TICKER_FACTS = [
  "time runs faster at your head than at your feet, and we can measure it",
  "magnetism is just electricity, seen from a moving frame",
  "spin isn’t rotation — it’s angular momentum a particle is born with, identical in every electron",
  "the sun only shines because protons quantum-tunnel into each other",
  "trillions of neutrinos pass straight through you every second",
  "if the sun vanished, earth would keep orbiting it for eight more minutes",
  "liquid helium is cold enough to climb the walls of its own container",
  "no fridge can ever reach absolute zero, however long you leave it running",
  "even at absolute zero, atoms keep a jitter you cannot take away",
  "empty space isn’t empty - a pure vacuum still pushes two plates together",
  "a teaspoon of neutron star weighs about a billion tonnes",
  "you don’t fall through the floor because no two electrons will share a state",
  "light from the sun’s core takes tens of thousands of years to escape it",
  "at the triple point, water boils and freezes at the same time",
  "cosmic-ray muons only reach the ground because time dilation keeps them alive",
  "the faster you travel, the shorter you get in the direction you are going",
  "electrons drift along a wire slower than you walk — under a metre an hour",
  "a nucleus weighs less than the parts you built it out of",
  "almost none of your mass is the higgs — it is the energy binding your quarks",
  "it isn’t that we can’t measure position and momentum — nothing has both",
  "entanglement acts instantly and still cannot send a single bit of information",
  "a magnet dropped over a cold superconductor hangs there, pinned in mid-air",
  "drop a slinky and the bottom hangs in the air until the top catches up",
  "every rainbow is a full circle — the ground just hides the bottom of it",
  "the moon raises a tide on the far side of the earth as well as the near side",
  "the moon drifts 4cm further away each year, and our days lengthen for it",
  "the coriolis force is far too weak to decide which way your sink drains",
  "you weigh slightly less at the equator than you do at the poles",
  "light has no mass but carries momentum — you can sail a ship on it",
  "black holes evaporate, and the smallest ones go fastest",
  "sound travels roughly fifteen times faster through steel than through air",
];

/* ── selected work ────────────────────────────────────────────────────────── */

export type WorkRow = {
  no: string;
  title: string;
  kind: string;
  year: string;
  href: string;
  hint: string;
  /** Client drops a real image in here; until then the tinted frame shows. */
  src?: string;
};

export const WORK_HEAD = {
  /** Rendered one line per entry. */
  title: ["Selected", "work"],
  note: "hover: courses, video, demos",
};

export const WORK: WorkRow[] = [
  { no: "01", title: "Fundamentals of Zero-Knowledge Proofs", kind: "course", year: "2025", href: "https://updraft.cyfrin.io/", hint: "course cover" },
  { no: "02", title: "Noir Programming & ZK Circuits", kind: "course", year: "2025", href: "https://updraft.cyfrin.io/", hint: "course cover" },
  { no: "03", title: "Interactive protocol demos", kind: "app", year: "2025", href: "https://demos.updraft.cyfrin.io/", hint: "demo screenshot" },
  { no: "04", title: "Blockchain Basics", kind: "course", year: "2025", href: "https://updraft.cyfrin.io/", hint: "course cover" },
  { no: "05", title: "Signatures, Merkle Trees & Airdrops", kind: "course", year: "2024", href: "https://updraft.cyfrin.io/", hint: "course cover" },
  { no: "06", title: "Merkle trees, explained", kind: "video", year: "2024", href: "https://youtu.be/cQIPG_J1W9g", hint: "video still" },
  { no: "07", title: "Elliptic curves", kind: "video", year: "2024", href: "https://youtu.be/CtcHBRph97s", hint: "video still" },
];

/* ── experience ───────────────────────────────────────────────────────────── */

export type Role = {
  company: string;
  role: string;
  dates: string;
  blurb: string;
  href: string;
};

export const EXPERIENCE_HEAD = {
  title: "Experience",
  note: "technical education · developer relations · research",
};

export const EXPERIENCE: Role[] = [
  {
    company: "Aztec",
    role: "Technical Educator",
    dates: "2025 — 2026",
    blurb:
      "Courses, talks and documentation on Noir, private smart contracts and the Aztec protocol. Technical liaison between engineering, product and the wider ecosystem. On contract initially, full-time from March 2026.",
    href: "https://aztec.network",
  },
  {
    company: "Cyfrin",
    role: "Lead Instructor",
    dates: "2024 — 2026",
    blurb:
      "20+ hours of long-form courses on blockchain development, cryptography and zero-knowledge proofs, plus a suite of interactive demos. Hired and managed two direct reports.",
    href: "https://www.cyfrin.io",
  },
  {
    company: "Cyfrin",
    role: "Technical Writer",
    dates: "2023 — 2024",
    blurb:
      "In-depth technical writing analysing blockchain hacks, core cryptography and security concepts for a developer audience.",
    href: "https://www.cyfrin.io",
  },
  {
    company: "thirdweb",
    role: "Developer Experience Engineer",
    dates: "2022 — 2023",
    blurb:
      "Tutorials, documentation, workshops and livestreams for developers building web3 applications, and work with engineering to improve developer onboarding.",
    href: "https://thirdweb.com",
  },
  {
    company: "STFC",
    role: "Software Engineer",
    dates: "2019 — 2020",
    blurb:
      "Worked on Mantid, the open-source framework for reducing and analysing neutron and muon scattering data used across international facilities.",
    href: "https://www.mantidproject.org",
  },
];

export const EDUCATION = {
  label: "Education",
  degree: "BSc Physics, First Class Honours",
  school: "University of Bath",
  href: "https://www.bath.ac.uk",
};

/* ── gallery (section parked until the artwork photos exist) ──────────────── */

export type Artwork = { no: string; meta: string; src?: string };

export const GALLERY_HEAD = {
  title: "The gallery",
  note: "landscapes, sunsets, countryside and fine line drawings · hover to pause",
  /** Stands in for a piece that has no image yet. */
  hint: "drop a piece",
};

export const ART: Artwork[] = [
  { no: "no. 01", meta: "sunset" },
  { no: "no. 02", meta: "line drawing · figure" },
  { no: "no. 03", meta: "british countryside" },
  { no: "no. 04", meta: "line drawing · plants" },
  { no: "no. 05", meta: "landscape" },
  { no: "no. 06", meta: "line drawing · nature" },
];

/* ── picks ────────────────────────────────────────────────────────────────── */

export const PICKS_HEAD = {
  title: "Things I Like",
  note: "books, screens, records — send me yours",
};

export type PickItem = {
  title: string;
  by: string;
  /** Optional direct link. Without one the title links to a `search` lookup. */
  href?: string;
};

export type PickColumn = {
  label: string;
  /** `spotify` swaps these items for live top tracks when the API is reachable. */
  source?: "spotify";
  /** Titles with no `href` of their own are searched for here. */
  search: string;
  items: PickItem[];
};

export const PICKS: PickColumn[] = [
  {
    label: "reading",
    search: "https://www.goodreads.com/search?q=",
    items: [
      { title: "The Body", by: "Bill Bryson", href: "https://www.goodreads.com/book/show/43582376-the-body" },
      { title: "A Short History of Nearly Everything", by: "Bill Bryson", href: "https://www.goodreads.com/book/show/21.A_Short_History_of_Nearly_Everything" },
      { title: "The Hunger Games", by: "Suzanne Collins", href: "https://www.goodreads.com/book/show/2767052" },
      { title: "The Brain", by: "David Eagleman", href: "https://www.goodreads.com/book/show/25776132-the-brain" },
      { title: "Once Upon a Broken Heart", by: "Stephanie Garber", href: "https://www.goodreads.com/book/show/55987278" },
      { title: "Sapiens", by: "Yuval Noah Harari", href: "https://www.goodreads.com/book/show/23692271-sapiens" },
      { title: "Brief Answers to the Big Questions", by: "Stephen Hawking", href: "https://www.goodreads.com/book/show/40277241-brief-answers-to-the-big-questions" },
      { title: "A Brief History of Time", by: "Stephen Hawking", href: "https://www.goodreads.com/book/show/3869.A_Brief_History_of_Time" },
      { title: "A Court of Thorns and Roses", by: "Sarah J. Maas", href: "https://www.goodreads.com/book/show/50659467" },
      { title: "Crescent City", by: "Sarah J. Maas", href: "https://www.goodreads.com/book/show/44778083" },
      { title: "Throne of Glass", by: "Sarah J. Maas", href: "https://www.goodreads.com/book/show/76703559" },
      { title: "Zodiac Academy", by: "Caroline Peckham", href: "https://www.goodreads.com/book/show/46261182" },
      { title: "The Order of Time", by: "Carlo Rovelli", href: "https://www.goodreads.com/book/show/36442813-the-order-of-time" },
      { title: "Reality is Not What it Seems", by: "Carlo Rovelli", href: "https://www.goodreads.com/book/show/29767627-reality-is-not-what-it-seems" },
      { title: "Seven Brief Lessons on Physics", by: "Carlo Rovelli", href: "https://www.goodreads.com/book/show/25734172-seven-brief-lessons-on-physics" },
      { title: "Harry Potter", by: "J.K. Rowling", href: "https://www.goodreads.com/book/show/42844155" },
      { title: "Project Hail Mary", by: "Andy Weir", href: "https://www.goodreads.com/book/show/54493401" },
      { title: "The Empyrean", by: "Rebecca Yarros", href: "https://www.goodreads.com/book/show/61431922" },    ],
  },
  {
    label: "Watching",
    search: "https://www.imdb.com/find/?q=",
    items: [
      { title: "Bridge to Terabithia", by: "film" },
      { title: "A Discovery of Witches", by: "series" },
      { title: "Moonrise Kingdom", by: "film" },
      { title: "Shutter Island", by: "film" },
      { title: "Stardust", by: "film" },
      { title: "The Summer I Turned Pretty", by: "series" },
      { title: "Tangled", by: "film" },
      { title: "The Theory of Everything", by: "film" },
      { title: "The Vampire Diaries", by: "series" },
      { title: "We Bought a Zoo", by: "film" },
      { title: "The Witcher", by: "series" },    ],
  },
  {
    label: "Music on Repeat",
    search: "https://open.spotify.com/search/",
    items: [
      { title: "Being Funny in a Foreign Language", by: "The 1975" },
      { title: "The Band CAMINO", by: "The Band CAMINO" },
      { title: "NeverAlways (Vol. 1)", by: "The Band CAMINO", href: "https://open.spotify.com/album/2wVrxbonp8UA9ebuMREm4q" },
      { title: "NeverAlways (Vol. 2)", by: "The Band CAMINO", href: "https://open.spotify.com/album/3qE3tGZxXzTvhhI92csWfN" },
      { title: "Amazing Things", by: "Don Broco" },
      { title: "Daughter from Hell", by: "Gracie Abrams", href: "https://open.spotify.com/album/4BZydSQMfJNphTFZzyIxh5" },
      { title: "The Hart", by: "Grayscale", href: "https://open.spotify.com/album/1Z6lchat5qLy21WkX31mr4" },
      { title: "Joy Next Door", by: "The Maine", href: "https://open.spotify.com/album/6o07I38dK4fk52rM4QcI49" },
      { title: "The Great Divide", by: "Noah Kahan", href: "https://open.spotify.com/album/2fnkyn9EybagIoFJ7a13oz" },
      { title: "You Seem Pretty Sad for a Girl So in Love", by: "Olivia Rodrigo", href: "https://open.spotify.com/album/3WZZF72ihlKPZBS4zSsNHl" },
      { title: "So Close to What (Deluxe)", by: "Tate McRae" },
      { title: "Joyride", by: "Transit" },
      { title: "Peripheral Vision", by: "Turnover" },
      { title: "Tourist History", by: "Two Door Cinema Club" },    ],
  },
];

/* ── contact ──────────────────────────────────────────────────────────────── */

export const CONTACT = {
  /** Rendered one line per entry. */
  title: ["Let’s do", "something"],
  blurb:
    "Open to technical education, developer relations and research work. Talks and workshops welcome.",
  emailLabel: "email me",
  email: "ciara.nightingale@sky.com",
  /** Repeated across the marquee band. */
  hello: ["say hello", "say hello", "say hello", "say hello"],
  links: [
    { label: "linkedin", href: "https://linkedin.com/in/ciara-nightingale-b0621a15b" },
    { label: "x", href: "https://x.com/CiaraNightingal" },
    { label: "goodreads", href: "https://www.goodreads.com/user/show/203868226-ciara-nightingale" },
    { label: "demos", href: "https://demos.updraft.cyfrin.io/" },
  ],
  colophon: "ciara nightingale > london > 2026",
};
