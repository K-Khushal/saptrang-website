import heroCollective from "@/assets/hero-collective.jpg";
import eventScreening from "@/assets/event-screening.jpg";
import aboutWorkshop from "@/assets/about-workshop.jpg";
import creatorPortrait from "@/assets/creator-portrait.jpg";

export type EventStatus = "featured" | "upcoming" | "past";

export type PulseEvent = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateShort: string;
  doors: string;
  location: string;
  venue: string;
  type: string;
  status: EventStatus;
  color: string; // bg-* token class
  accentText: string; // text-* token class
  cost: string;
  spots: number;
  brief: string;
  description: string;
  cover: string;
  whoFor: string[];
  order: string[];
  schedule: { time: string; what: string; where: string }[];
  bring: string[];
  before: string[];
  notices: { label: string; body: string; tone: "magenta" | "tangerine" | "cobalt" }[];
  gallery: { src: string; caption: string }[];
  quote: string;
};

const base = {
  whoFor: [
    "Anyone who makes things and wants to talk about them",
    "People who have never sat in a room like this before",
    "First-timers on a buddy list — bring one",
    "Filmmakers with work-in-progress they want eyes on",
  ],
  order: [
    "Doors, chai, name tags",
    "Three films, back to back",
    "Fifteen-minute break",
    "Conversation with the directors",
  ],
  bring: [
    "A notebook — there is no photography inside the hall",
    "A extra layer, the hall runs cold",
    "Your closest C if you booked a companion seat",
  ],
  before: [
    "Read the two-line synopsis we mail you",
    "Charge your phone — the ticket QR lives on it",
    "Arrive fifteen minutes early, seating is unreserved",
  ],
  notices: [
    {
      label: "On arrival",
      body: "Doors close ten minutes after the listed start. If you have not checked in by then we give your seat to the wait list.",
      tone: "magenta" as const,
    },
    {
      label: "Getting here",
      body: "Street parking sits on the venue's west side after 6:00 PM. Use the gate on the north side.",
      tone: "tangerine" as const,
    },
    {
      label: "Access",
      body: "The hall is step-free from the main entrance. Write to us ahead of time if you need anything else and we will sort it.",
      tone: "cobalt" as const,
    },
  ],
};

export const events: PulseEvent[] = [
  {
    slug: "vol-12-berlin",
    title: "Vol. 12 — Berlin",
    subtitle: "Midnight Screenings & Analog Rituals",
    date: "June 21 — 23, 2024",
    dateShort: "Jun 21, 2024",
    doors: "Doors 7pm · Screenings 8pm",
    location: "Berlin",
    venue: "Kino International, Karl-Marx-Allee 33",
    type: "Screening",
    status: "featured",
    color: "bg-magenta",
    accentText: "text-magenta",
    cost: "Free for members · €8 guests",
    spots: 12,
    brief: "Three evenings of 16mm projections, live scoring and after-hours conversation.",
    description:
      "Three evenings of 16mm projections, live scoring, and after-hours conversations. This volume centres on voices from the Baltic and Black Sea — filmmakers working between documentary, essay, and the purely visual.",
    cover: heroCollective,
    quote:
      "Halfway through the second film somebody in the back row said 'oh' out loud, and the whole room snapped. That is the reason we do this.",
    ...base,
    schedule: [
      { time: "6:00 PM", what: "Doors, chai and name tags", where: "Foyer" },
      { time: "7:00 PM", what: "Reel 01 — Baltic shorts", where: "Hall A" },
      { time: "7:50 PM", what: "Reel 02 — Essay film", where: "Hall A" },
      { time: "8:30 PM", what: "Break", where: "Foyer" },
      { time: "9:00 PM", what: "Conversation with the directors", where: "Hall A" },
    ],
    gallery: [
      { src: eventScreening, caption: "Vol. 11 — the projection booth" },
      { src: aboutWorkshop, caption: "Hands on the splicer" },
      { src: creatorPortrait, caption: "After the credits" },
    ],
  },
  {
    slug: "darkroom-rituals-v",
    title: "Darkroom Rituals V",
    subtitle: "Hand-processing black & white 35mm",
    date: "July 6, 2024",
    dateShort: "Jul 6, 2024",
    doors: "10am — 6pm",
    location: "Pune",
    venue: "The Grain Room, Kalyani Nagar",
    type: "Workshop",
    status: "upcoming",
    color: "bg-emerald",
    accentText: "text-emerald",
    cost: "₹1,200 · chemicals included",
    spots: 8,
    brief: "A full-day workshop on hand-processing black-and-white 35mm. Bring your own roll.",
    description:
      "A slow, full-day workshop on hand-processing black-and-white 35mm. We load in the dark, agitate by feel, and hang the negatives before lunch. In the afternoon we contact-print and argue about grain.",
    cover: aboutWorkshop,
    quote: "The first time you see an image rise in the tray, something in you rearranges itself.",
    ...base,
    schedule: [
      { time: "10:00 AM", what: "Loading tanks in total dark", where: "Darkroom" },
      { time: "11:30 AM", what: "Develop, stop, fix", where: "Darkroom" },
      { time: "1:00 PM", what: "Lunch on the terrace", where: "Terrace" },
      { time: "2:30 PM", what: "Contact printing", where: "Darkroom" },
      { time: "5:00 PM", what: "Review and swap prints", where: "Studio" },
    ],
    gallery: [
      { src: aboutWorkshop, caption: "Trays, tongs, timers" },
      { src: eventScreening, caption: "Drying line" },
      { src: creatorPortrait, caption: "First print of the day" },
    ],
  },
  {
    slug: "coastal-light-kochi",
    title: "Coastal Light — Kochi",
    subtitle: "A two-week residency on natural light",
    date: "July 20 — Aug 3, 2024",
    dateShort: "Jul 20, 2024",
    doors: "Rolling · check-in Saturday",
    location: "Kochi",
    venue: "Fort House, Fort Kochi",
    type: "Residency",
    status: "upcoming",
    color: "bg-cobalt",
    accentText: "text-cobalt",
    cost: "Bursary available",
    spots: 4,
    brief: "Two-week residency for photographers working with natural light and coastal landscapes.",
    description:
      "Two weeks with the sea on one side and the backwaters on the other. Four photographers, one shared darkroom, and a weekly crit with a visiting editor. Room, board, and film stock are covered.",
    cover: creatorPortrait,
    quote: "Nobody here shoots between eleven and three. The light tells you when to work.",
    ...base,
    schedule: [
      { time: "Sat", what: "Check-in and orientation walk", where: "Fort House" },
      { time: "Week 1", what: "Open shooting, evening edits", where: "Everywhere" },
      { time: "Wed", what: "Crit with visiting editor", where: "Studio" },
      { time: "Week 2", what: "Sequencing and print selection", where: "Darkroom" },
      { time: "Sun", what: "Open studio for the neighbourhood", where: "Courtyard" },
    ],
    gallery: [
      { src: creatorPortrait, caption: "Morning on the jetty" },
      { src: heroCollective, caption: "Shared table, shared edits" },
      { src: eventScreening, caption: "Open studio night" },
    ],
  },
  {
    slug: "vol-13-mumbai",
    title: "Vol. 13 — Mumbai",
    subtitle: "Members-only screening & roundtable",
    date: "August 10, 2024",
    dateShort: "Aug 10, 2024",
    doors: "Doors 6:30pm · Screening 7:15pm",
    location: "Mumbai",
    venue: "Liberty Cinema, Marine Lines",
    type: "Screening",
    status: "upcoming",
    color: "bg-tangerine",
    accentText: "text-tangerine",
    cost: "Members only",
    spots: 20,
    brief: "Members-only screening followed by a roundtable on independent distribution in India.",
    description:
      "One long programme and one honest conversation: what it actually costs to release an independent film in India, who pays, and what the alternatives look like when they work.",
    cover: eventScreening,
    quote: "We stopped waiting for a distributor and built a route ourselves. It took four years.",
    ...base,
    schedule: [
      { time: "6:30 PM", what: "Doors, chai and name tags", where: "Lobby" },
      { time: "7:15 PM", what: "Feature screening", where: "Main hall" },
      { time: "9:00 PM", what: "Break", where: "Lobby" },
      { time: "9:20 PM", what: "Roundtable on distribution", where: "Main hall" },
      { time: "10:30 PM", what: "Late conversations", where: "Lobby" },
    ],
    gallery: [
      { src: eventScreening, caption: "Liberty, before doors" },
      { src: heroCollective, caption: "Roundtable in progress" },
      { src: aboutWorkshop, caption: "Notes and margins" },
    ],
  },
  {
    slug: "zine-makers-fair",
    title: "Zine Maker's Fair",
    subtitle: "Tables, risograph demos and a swap meet",
    date: "August 24, 2024",
    dateShort: "Aug 24, 2024",
    doors: "11am — 8pm",
    location: "Delhi",
    venue: "Bikaner House Courtyard",
    type: "Fair",
    status: "upcoming",
    color: "bg-acid",
    accentText: "text-ink/70",
    cost: "Free · open to the public",
    spots: 40,
    brief: "Table space, risograph demos, and a swap meet. Open to the public.",
    description:
      "A whole day of paper. Twenty-odd tables, two risograph machines running non-stop, and a swap meet at five where nothing is for sale and everything changes hands.",
    cover: aboutWorkshop,
    quote: "Bring five copies of something. Leave with five things you would never have bought.",
    ...base,
    schedule: [
      { time: "11:00 AM", what: "Tables open", where: "Courtyard" },
      { time: "1:00 PM", what: "Risograph demo", where: "Print corner" },
      { time: "3:00 PM", what: "Binding workshop", where: "Print corner" },
      { time: "5:00 PM", what: "Swap meet", where: "Courtyard" },
      { time: "7:00 PM", what: "Slow pack-down, music", where: "Courtyard" },
    ],
    gallery: [
      { src: aboutWorkshop, caption: "Ink drums" },
      { src: creatorPortrait, caption: "Table nine" },
      { src: heroCollective, caption: "Swap meet, 5pm" },
    ],
  },
];

export const pastEvents = [
  { slug: "vol-11-neon-tokyo", title: "Vol. 11 — Neon Tokyo", date: "Mar 2024", type: "Screening", color: "bg-cobalt" },
  { slug: "light-leaks-lisbon", title: "Light Leaks Lisbon", date: "Feb 2024", type: "Workshop", color: "bg-tangerine" },
  { slug: "salt-and-grain-marseille", title: "Salt & Grain — Marseille", date: "Nov 2023", type: "Residency", color: "bg-acid" },
  { slug: "vol-10-mexico-city", title: "Vol. 10 — Mexico City", date: "Sep 2023", type: "Festival", color: "bg-magenta" },
  { slug: "darkroom-rituals-iv", title: "Darkroom Rituals IV", date: "Jul 2023", type: "Workshop", color: "bg-emerald" },
  { slug: "ghosts-on-16mm-nyc", title: "Ghosts on 16mm — NYC", date: "May 2023", type: "Screening", color: "bg-ink" },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
