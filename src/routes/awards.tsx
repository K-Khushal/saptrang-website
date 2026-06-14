import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import heroImg from "@/assets/hero-collective.jpg";
import creatorImg from "@/assets/creator-portrait.jpg";
import aboutImg from "@/assets/about-workshop.jpg";
import eventImg from "@/assets/event-screening.jpg";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognition — Pulse" },
      { name: "description", content: "Eleven years of Pulse honors — past winners across film, photography, zines, sound and community categories." },
      { property: "og:title", content: "Awards & Recognition — Pulse" },
      { property: "og:description", content: "Eleven years of Pulse honors — past winners across film, photography, zines, sound and community categories." },
    ],
  }),
  component: AwardsPage,
});

/* ─── Data ─── */

type Winner = {
  id: string;
  year: number;
  category: Category;
  award: string;
  winner: string;
  work: string;
  city: string;
  juror: string;
  tier: "Grand" | "Gold" | "Honor";
};

type Category = "Film" | "Photography" | "Zines" | "Sound" | "Community";

const CATEGORIES: Category[] = ["Film", "Photography", "Zines", "Sound", "Community"];
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const categoryColor: Record<Category, { bg: string; fg: string; dot: string }> = {
  Film: { bg: "bg-cobalt", fg: "text-cream", dot: "bg-cobalt" },
  Photography: { bg: "bg-magenta", fg: "text-cream", dot: "bg-magenta" },
  Zines: { bg: "bg-tangerine", fg: "text-ink", dot: "bg-tangerine" },
  Sound: { bg: "bg-emerald", fg: "text-cream", dot: "bg-emerald" },
  Community: { bg: "bg-acid", fg: "text-ink", dot: "bg-acid" },
};

const headliners: {
  year: number;
  category: Category;
  winner: string;
  work: string;
  city: string;
  citation: string;
  img: string;
}[] = [
  { year: 2025, category: "Film", winner: "Lena Voss", work: "Salt & Grain", city: "Marseille", citation: "For rendering grief at 24 frames a second without flinching once.", img: heroImg },
  { year: 2025, category: "Photography", winner: "Sana Iyer", work: "Kochi Light Studies", city: "Kochi", citation: "Light as memory, water as witness — a body of work that refuses spectacle.", img: creatorImg },
  { year: 2024, category: "Zines", winner: "Noor Kapoor", work: "Letterpress Archive Vol. IV", city: "Lahore", citation: "Eighty-four pages, six languages, one impossibly tender thesis on inheritance.", img: aboutImg },
];

const winners: Winner[] = [
  // 2025
  { id: "w-2025-1", year: 2025, category: "Film", award: "Grand Prize", winner: "Lena Voss", work: "Salt & Grain", city: "Marseille", juror: "Apichatpong W.", tier: "Grand" },
  { id: "w-2025-2", year: 2025, category: "Film", award: "Short Form", winner: "Diego Rivas", work: "Hábito", city: "Lima", juror: "Apichatpong W.", tier: "Gold" },
  { id: "w-2025-3", year: 2025, category: "Photography", winner: "Sana Iyer", work: "Kochi Light Studies", city: "Kochi", award: "Grand Prize", juror: "Rinko Kawauchi", tier: "Grand" },
  { id: "w-2025-4", year: 2025, category: "Photography", award: "New Voice", winner: "Mira Halim", work: "Brackish", city: "Jakarta", juror: "Rinko Kawauchi", tier: "Gold" },
  { id: "w-2025-5", year: 2025, category: "Zines", award: "Best of Year", winner: "Aarav Mehta", work: "Bandra Zine No. 4", city: "Mumbai", juror: "Cristina Daura", tier: "Gold" },
  { id: "w-2025-6", year: 2025, category: "Sound", award: "Composition", winner: "Yuki Tanabe", work: "Room Tone (Kyoto)", city: "Kyoto", juror: "Hildur Guðnadóttir", tier: "Gold" },
  { id: "w-2025-7", year: 2025, category: "Sound", award: "Field Recording", winner: "Ade Okafor", work: "Lagos After Rain", city: "Lagos", juror: "Hildur Guðnadóttir", tier: "Honor" },
  { id: "w-2025-8", year: 2025, category: "Community", award: "Chapter of the Year", winner: "Pulse Bengaluru", work: "Open Mic Series", city: "Bengaluru", juror: "Collective Vote", tier: "Grand" },
  { id: "w-2025-9", year: 2025, category: "Community", award: "Mentor's Honor", winner: "Ravi Menon", work: "Darkroom Sundays", city: "Kochi", juror: "Collective Vote", tier: "Honor" },

  // 2024
  { id: "w-2024-1", year: 2024, category: "Zines", award: "Grand Prize", winner: "Noor Kapoor", work: "Letterpress Archive Vol. IV", city: "Lahore", juror: "Aleksandra Mir", tier: "Grand" },
  { id: "w-2024-2", year: 2024, category: "Film", award: "Documentary", winner: "Sofia Cruz", work: "Eleven Bridges", city: "Mexico City", juror: "Wang Bing", tier: "Gold" },
  { id: "w-2024-3", year: 2024, category: "Film", award: "Experimental", winner: "Jonas Park", work: "Tape, Loop, Tape", city: "Seoul", juror: "Wang Bing", tier: "Gold" },
  { id: "w-2024-4", year: 2024, category: "Photography", award: "Long Form", winner: "Vihaan Roy", work: "Collective Portrait", city: "Delhi", juror: "Dayanita Singh", tier: "Gold" },
  { id: "w-2024-5", year: 2024, category: "Photography", award: "Honor", winner: "Elif Demir", work: "Bazaar, Closed", city: "Istanbul", juror: "Dayanita Singh", tier: "Honor" },
  { id: "w-2024-6", year: 2024, category: "Sound", award: "Grand Prize", winner: "Marta Lis", work: "Choir for Empty Halls", city: "Warsaw", juror: "Nils Frahm", tier: "Grand" },
  { id: "w-2024-7", year: 2024, category: "Community", award: "Chapter of the Year", winner: "Pulse Marseille", work: "Coastal Residency", city: "Marseille", juror: "Collective Vote", tier: "Gold" },

  // 2023
  { id: "w-2023-1", year: 2023, category: "Film", award: "Grand Prize", winner: "Ines Toledo", work: "A House in Porto", city: "Porto", juror: "Lucrecia Martel", tier: "Grand" },
  { id: "w-2023-2", year: 2023, category: "Film", award: "Short Form", winner: "Kai Brennan", work: "Static Garden", city: "Dublin", juror: "Lucrecia Martel", tier: "Honor" },
  { id: "w-2023-3", year: 2023, category: "Photography", award: "Grand Prize", winner: "Amina Belkacem", work: "Atlas, Slowly", city: "Algiers", juror: "Pieter Hugo", tier: "Grand" },
  { id: "w-2023-4", year: 2023, category: "Zines", award: "Best of Year", winner: "Tomás Vidal", work: "Mariposa", city: "Buenos Aires", juror: "Paul Soulellis", tier: "Gold" },
  { id: "w-2023-5", year: 2023, category: "Sound", award: "Composition", winner: "Yara Habib", work: "Beirut, 04:17", city: "Beirut", juror: "Sarah Davachi", tier: "Gold" },
  { id: "w-2023-6", year: 2023, category: "Community", award: "Mentor's Honor", winner: "Hannah Cole", work: "Riso Workshops", city: "Glasgow", juror: "Collective Vote", tier: "Honor" },

  // 2022
  { id: "w-2022-1", year: 2022, category: "Film", award: "Grand Prize", winner: "Adaeze Nwosu", work: "Market Day", city: "Enugu", juror: "Mati Diop", tier: "Grand" },
  { id: "w-2022-2", year: 2022, category: "Photography", award: "New Voice", winner: "Karim Saleh", work: "Cairo, Awake", city: "Cairo", juror: "Hassan Hajjaj", tier: "Gold" },
  { id: "w-2022-3", year: 2022, category: "Zines", award: "Grand Prize", winner: "Yumi Sato", work: "Folded Memory", city: "Osaka", juror: "Paul Soulellis", tier: "Grand" },
  { id: "w-2022-4", year: 2022, category: "Sound", award: "Field Recording", winner: "Ola Tønnessen", work: "Fjord Diary", city: "Bergen", juror: "Sarah Davachi", tier: "Gold" },
  { id: "w-2022-5", year: 2022, category: "Community", award: "Chapter of the Year", winner: "Pulse Mexico City", work: "Barrio Cinema", city: "CDMX", juror: "Collective Vote", tier: "Gold" },

  // 2021
  { id: "w-2021-1", year: 2021, category: "Film", award: "Documentary", winner: "Priya Shankar", work: "Long Way to Tiruvannamalai", city: "Chennai", juror: "Werner Herzog", tier: "Gold" },
  { id: "w-2021-2", year: 2021, category: "Photography", award: "Grand Prize", winner: "Mateo Ferri", work: "Quiet Quarry", city: "Rome", juror: "Alec Soth", tier: "Grand" },
  { id: "w-2021-3", year: 2021, category: "Zines", award: "Honor", winner: "Hira Qureshi", work: "Hand/Held", city: "Karachi", juror: "Paul Soulellis", tier: "Honor" },
  { id: "w-2021-4", year: 2021, category: "Sound", award: "Grand Prize", winner: "Selma Aydın", work: "Constellation", city: "Ankara", juror: "Nils Frahm", tier: "Grand" },

  // 2020
  { id: "w-2020-1", year: 2020, category: "Community", award: "Special Citation", winner: "Pulse Worldwide", work: "Lockdown Letters Project", city: "Global", juror: "Collective Vote", tier: "Grand" },
  { id: "w-2020-2", year: 2020, category: "Film", award: "Short Form", winner: "Owen Bly", work: "Window, Window", city: "Detroit", juror: "Khalik Allah", tier: "Gold" },
  { id: "w-2020-3", year: 2020, category: "Photography", award: "Long Form", winner: "Ananya Das", work: "Balcony Years", city: "Kolkata", juror: "Alec Soth", tier: "Gold" },

  // Legacy
  { id: "w-2019-1", year: 2019, category: "Film", award: "Grand Prize", winner: "Beatriz Mello", work: "Sertão", city: "Salvador", juror: "Kleber M. Filho", tier: "Grand" },
  { id: "w-2018-1", year: 2018, category: "Zines", award: "Grand Prize", winner: "Lior Ben-Ami", work: "Tel Aviv Notebooks", city: "Tel Aviv", juror: "Cristina Daura", tier: "Grand" },
  { id: "w-2017-1", year: 2017, category: "Photography", award: "Grand Prize", winner: "Hugo Lefèvre", work: "Quai 13", city: "Paris", juror: "JR", tier: "Grand" },
  { id: "w-2016-1", year: 2016, category: "Sound", award: "Composition", winner: "Anya Sokol", work: "Tram No. 7", city: "Kyiv", juror: "Hildur G.", tier: "Gold" },
  { id: "w-2015-1", year: 2015, category: "Community", award: "Founding Honor", winner: "Pulse Mumbai", work: "First Chapter", city: "Mumbai", juror: "Founders", tier: "Grand" },
];

const jurors2025 = [
  { name: "Apichatpong Weerasethakul", chair: "Film" },
  { name: "Rinko Kawauchi", chair: "Photography" },
  { name: "Cristina Daura", chair: "Zines" },
  { name: "Hildur Guðnadóttir", chair: "Sound" },
  { name: "The Collective", chair: "Community" },
];

/* ─── Page ─── */

function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay ?? "0";
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function AwardsPage() {
  useScrollReveal();
  const [year, setYear] = useState<number | "All">("All");
  const [category, setCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return winners.filter((w) => {
      if (year !== "All" && w.year !== year) return false;
      if (category !== "All" && w.category !== category) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !w.winner.toLowerCase().includes(q) &&
          !w.work.toLowerCase().includes(q) &&
          !w.city.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [year, category, query]);

  const grouped = useMemo(() => {
    const map = new Map<number, Winner[]>();
    filtered.forEach((w) => {
      if (!map.has(w.year)) map.set(w.year, []);
      map.get(w.year)!.push(w);
    });
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const totalAwards = winners.length;
  const totalWinners = new Set(winners.map((w) => w.winner)).size;
  const totalCities = new Set(winners.map((w) => w.city)).size;

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-20">
        {/* Masthead */}
        <header className="reveal-on-scroll">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink" />
            Awards & Recognition · Est. 2015
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.025em] text-balance">
            Eleven years<br />
            of <span className="italic text-magenta">honoring</span><br />
            the <span className="italic text-cobalt">unhurried</span>.
          </h1>
          <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
            <p className="lg:col-span-6 text-lg leading-relaxed text-ink/70">
              Every November the collective gathers in a different city to recognize work that took its time. No public vote, no audience prize — just a rotating jury of practitioners and the quiet weight of peers.
            </p>
            <div className="lg:col-span-6 grid grid-cols-3 gap-3 lg:gap-5">
              <Stat n={totalAwards} label="Awards given" />
              <Stat n={totalWinners} label="Honored makers" />
              <Stat n={totalCities} label="Cities" />
            </div>
          </div>
        </header>

        {/* Headliners */}
        <section className="mt-20 lg:mt-32">
          <div className="flex items-end justify-between gap-6 mb-8 reveal-on-scroll">
            <h2 className="font-display text-3xl lg:text-5xl italic">This year's grand prizes</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50 hidden sm:block">2025 · 03 of 12</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-5">
            {headliners.map((h, i) => (
              <article
                key={h.work}
                data-reveal-delay={i * 90}
                className={`reveal-on-scroll group relative overflow-hidden rounded-2xl border-4 border-ink ${
                  i === 0 ? "lg:col-span-7 aspect-[4/3]" : "lg:col-span-5 aspect-[4/3] lg:aspect-auto"
                }`}
              >
                <img src={h.img} alt={h.work} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 p-5 lg:p-8 flex flex-col justify-between text-cream">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block size-2 rounded-full ${categoryColor[h.category].dot}`} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em]">{h.category} · Grand Prize · {h.year}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">{h.winner} — {h.city}</p>
                    <h3 className={`mt-2 font-display italic leading-[0.95] ${i === 0 ? "text-4xl lg:text-6xl" : "text-3xl lg:text-4xl"}`}>{h.work}</h3>
                    <p className="mt-3 max-w-md text-sm text-cream/80 leading-relaxed">"{h.citation}"</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mt-20 lg:mt-28 reveal-on-scroll">
          <div className="flex items-end justify-between gap-6 mb-6">
            <h2 className="font-display text-3xl lg:text-5xl italic">The full record</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">{filtered.length} entries</span>
          </div>

          <div className="border border-ink/15 rounded-3xl p-5 lg:p-7 bg-cream/50">
            {/* Category */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mr-2">Category</span>
              {(["All", ...CATEGORIES] as const).map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono border transition-colors ${
                      active ? "bg-ink text-cream border-ink" : "bg-transparent text-ink/60 border-ink/15 hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {c !== "All" && <span className={`inline-block size-1.5 rounded-full mr-2 align-middle ${categoryColor[c as Category].dot}`} />}
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Year */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mr-2">Year</span>
              <button
                onClick={() => setYear("All")}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-[0.12em] border transition-colors ${
                  year === "All" ? "bg-magenta text-cream border-magenta" : "border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink"
                }`}
              >
                ALL
              </button>
              {YEARS.map((y) => {
                const active = year === y;
                return (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-[0.12em] border transition-colors ${
                      active ? "bg-magenta text-cream border-magenta" : "border-ink/15 text-ink/60 hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="mt-5 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">Find</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="winner, work or city…"
                className="w-full pl-16 pr-4 py-3 rounded-full bg-cream border border-ink/15 focus:border-ink outline-none font-mono text-sm placeholder:text-ink/30"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-7 rounded-full bg-ink/5 hover:bg-ink/10 text-ink/60 grid place-items-center"
                  aria-label="Clear"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Winners list */}
        <section className="mt-10 lg:mt-14">
          {grouped.length === 0 && (
            <p className="py-20 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40">
              No awards match these filters.
            </p>
          )}

          {grouped.map(([yr, items]) => (
            <div key={yr} className="mb-14 reveal-on-scroll">
              <div className="flex items-baseline gap-5 mb-5 border-b border-ink/15 pb-3">
                <h3 className="font-display text-5xl lg:text-7xl font-semibold tracking-[-0.03em]">{yr}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">{items.length} {items.length === 1 ? "award" : "awards"}</span>
              </div>

              <ul className="divide-y divide-ink/10">
                {items.map((w) => (
                  <WinnerRow key={w.id} w={w} />
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Jury panel */}
        <section className="mt-20 lg:mt-28 reveal-on-scroll">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">The 2025 jury</p>
              <h2 className="mt-4 font-display text-4xl lg:text-6xl italic leading-[0.95]">
                Practitioners,<br />never <span className="text-magenta">critics</span>.
              </h2>
              <p className="mt-5 text-ink/70 leading-relaxed max-w-md">
                Every category is chaired by an active maker invited for one cycle only. They read every entry. They write every citation by hand.
              </p>
            </div>
            <ul className="lg:col-span-7 divide-y divide-ink/10 border-y border-ink/10">
              {jurors2025.map((j) => (
                <li key={j.name} className="py-5 flex items-baseline justify-between gap-4">
                  <span className="font-display text-2xl lg:text-3xl italic">{j.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Chair — {j.chair}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ceremony recap */}
        <section className="mt-20 lg:mt-28 reveal-on-scroll">
          <div className="relative overflow-hidden rounded-3xl border-4 border-ink">
            <img src={eventImg} alt="Awards ceremony" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
            <div className="relative p-8 lg:p-16 text-cream max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-acid">Next ceremony</p>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl italic leading-[0.95]">
                Lisbon · November 14, 2026
              </h2>
              <p className="mt-5 text-cream/80 leading-relaxed">
                A single evening, one long table, citations read aloud. Members and nominees only. Submissions open in March.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/events" className="inline-flex items-center gap-3 bg-acid text-ink pl-5 pr-2 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors">
                  Ceremony details
                  <span className="size-8 rounded-full bg-ink text-acid grid place-items-center">→</span>
                </Link>
                <button className="inline-flex items-center gap-3 border border-cream/30 text-cream pl-5 pr-5 py-2 rounded-full text-sm hover:bg-cream/10 transition-colors">
                  Submission guidelines
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Bits ─── */

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-4">
      <div className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.02em]">{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">{label}</div>
    </div>
  );
}

function WinnerRow({ w }: { w: Winner }) {
  const c = categoryColor[w.category];
  const isGrand = w.tier === "Grand";
  return (
    <li className="group py-5 lg:py-6 grid grid-cols-12 gap-3 lg:gap-6 items-baseline hover:bg-ink/[0.02] -mx-3 px-3 rounded-lg transition-colors">
      <div className="col-span-12 lg:col-span-1 flex items-center gap-2">
        <span className={`inline-block size-2 rounded-full ${c.dot}`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 lg:hidden">{w.category}</span>
      </div>
      <div className="col-span-12 lg:col-span-2 hidden lg:block">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-mono ${c.bg} ${c.fg}`}>
          {w.category}
        </span>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <h4 className={`font-display italic leading-tight ${isGrand ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"}`}>
          {w.work}
        </h4>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">{w.winner} · {w.city}</p>
      </div>
      <div className="col-span-7 lg:col-span-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
        {w.award}
        <span className="block text-ink/40 mt-1">Juror: {w.juror}</span>
      </div>
      <div className="col-span-5 lg:col-span-1 text-right">
        <span className={`inline-block font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full ${
          w.tier === "Grand" ? "bg-ink text-cream" : w.tier === "Gold" ? "border border-ink/30 text-ink" : "text-ink/40"
        }`}>
          {w.tier}
        </span>
      </div>
    </li>
  );
}

/* ─── Nav ─── */

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Gatherings" },
    { href: "/gallery", label: "Gallery" },
    { href: "/awards", label: "Awards", active: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-semibold italic tracking-tight">
            <span className="inline-block size-3 rounded-full bg-magenta animate-pulse" />
            Pulse<span className="text-magenta">.</span>
          </Link>

          <div className="hidden md:flex gap-7 text-[11px] uppercase tracking-[0.22em] font-mono">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`transition-colors ${l.active ? "text-ink" : "hover:text-magenta text-ink/60"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="group inline-flex items-center gap-2 bg-magenta text-cream pl-4 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono font-medium hover:bg-ink transition-colors"
            >
              Apply
              <span className="size-6 rounded-full bg-cream text-magenta grid place-items-center text-base leading-none group-hover:bg-acid group-hover:text-ink transition-colors">→</span>
            </Link>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden relative size-10 flex flex-col items-center justify-center gap-[5px]"
            >
              <span className={`block h-[2px] bg-ink rounded-full transition-all duration-300 origin-center ${open ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
              <span className={`block h-[2px] bg-ink rounded-full transition-all duration-300 ${open ? "w-0 opacity-0" : "w-5"}`} />
              <span className={`block h-[2px] bg-ink rounded-full transition-all duration-300 origin-center ${open ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l, i) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl font-semibold italic transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${l.active ? "text-magenta" : "hover:text-magenta"}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-14 lg:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 font-display text-3xl font-semibold italic tracking-tight">
              <span className="inline-block size-3 rounded-full bg-magenta animate-pulse" />
              Pulse<span className="text-magenta">.</span>
            </div>
            <p className="mt-4 max-w-sm text-cream/60 leading-relaxed">
              A global collective of filmmakers, photographers, artists and cultural makers.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-wrap gap-10 lg:gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-4">Explore</p>
              <ul className="space-y-2 text-sm text-cream/70">
                <li><Link to="/" className="hover:text-acid transition-colors">Home</Link></li>
                <li><Link to="/about-us" className="hover:text-acid transition-colors">About</Link></li>
                <li><Link to="/community" className="hover:text-acid transition-colors">Community</Link></li>
                <li><Link to="/events" className="hover:text-acid transition-colors">Gatherings</Link></li>
                <li><Link to="/gallery" className="hover:text-acid transition-colors">Gallery</Link></li>
                <li><Link to="/awards" className="hover:text-acid transition-colors">Awards</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40 mb-4">Connect</p>
              <ul className="space-y-2 text-sm text-cream/70">
                <li><a href="#" className="hover:text-acid transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-acid transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-acid transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
            &copy; {new Date().getFullYear()} Pulse Collective. Non-profit cultural foundation.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
            Made with heat, not algorithms.
          </p>
        </div>
      </div>
    </footer>
  );
}
