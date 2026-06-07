import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Search, Bell, Plus, ArrowUpRight, Quote } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Dispatches — Saptrang Community" },
      { name: "description", content: "The Saptrang dispatches: a living zine of what members are making, screening, printing, and listening to this week." },
      { property: "og:title", content: "Dispatches — Saptrang Community" },
      { property: "og:description", content: "A living zine of what Saptrang members are making, screening, printing, and listening to this week." },
    ],
  }),
  component: CommunityLayout,
});

function CommunityLayout() {
  const { pathname } = useLocation();
  const isProfile = pathname.startsWith("/community/profile");

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Masthead />
      <TickerBar />
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 px-4 lg:grid-cols-[260px_1fr_340px] lg:px-8">
        <LeftRail />
        <main className="min-w-0 border-x border-ink/10 px-0 lg:px-8">
          {isProfile ? <Outlet /> : <Feed />}
        </main>
        <RightRail />
      </div>
      <Colophon />
    </div>
  );
}

/* ---------- Masthead ---------- */

function Masthead() {
  return (
    <header className="border-b-2 border-ink bg-cream">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-4 pb-3 pt-5 lg:px-8">
        <div className="flex items-end gap-4">
          <Link to="/" className="font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
            Saptrang<span className="text-magenta">.</span>
          </Link>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 sm:inline">
            Vol. 02 / Dispatches
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-none border border-ink bg-cream px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hover:bg-ink hover:text-cream md:flex">
            <Search className="h-3.5 w-3.5" /> Search the archive
          </button>
          <button className="grid h-9 w-9 place-items-center border border-ink hover:bg-ink hover:text-cream" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <Link
            to="/community/profile"
            className="flex items-center gap-2 border border-ink bg-ink py-1 pl-1 pr-3 text-cream hover:bg-magenta hover:border-magenta"
          >
            <span className="grid h-7 w-7 place-items-center bg-magenta text-cream text-xs font-bold">RS</span>
            <span className="hidden font-mono text-[11px] uppercase tracking-widest sm:inline">Riya S.</span>
          </Link>
        </div>
      </div>
      <div className="border-t border-ink/20 bg-cream">
        <div className="mx-auto flex max-w-[1400px] items-baseline justify-between gap-6 px-4 py-2 lg:px-8">
          <p className="font-display text-[15px] italic text-ink/70">
            "Small rooms, loud ideas." — letters from the chapters, filed this week.
          </p>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/50 md:inline">
            Sun · 07 Jun · 26
          </span>
        </div>
      </div>
    </header>
  );
}

/* ---------- Ticker ---------- */

function TickerBar() {
  const items = [
    "Bandra zine swap — Sat 7pm",
    "Open call: sound design for short film",
    "New chapter opening in Kochi",
    "Printmaking workshop, 12 seats left",
    "Pune poets' open mic — submissions close Tue",
  ];
  return (
    <div className="overflow-hidden border-b border-ink bg-acid">
      <div className="flex animate-[marquee_40s_linear_infinite] gap-10 whitespace-nowrap py-1.5 font-mono text-[11px] uppercase tracking-widest">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-magenta">◆</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Left rail: contents ---------- */

const sections = [
  { n: "01", label: "Dispatches", active: true },
  { n: "02", label: "Open Calls" },
  { n: "03", label: "Chapters" },
  { n: "04", label: "Workshops" },
  { n: "05", label: "Bookmarks" },
  { n: "06", label: "Your Page", to: "/community/profile" as const },
];

function LeftRail() {
  return (
    <aside className="hidden border-r border-ink/10 py-8 pr-6 lg:block">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Contents</p>
      <ul className="mt-4 flex flex-col">
        {sections.map((s) => {
          const inner = (
            <div className={`group flex items-baseline gap-3 border-t border-ink/15 py-3 ${s.active ? "text-ink" : "text-ink/70 hover:text-ink"}`}>
              <span className="font-mono text-[11px] text-ink/40">{s.n}</span>
              <span className="font-display text-lg leading-none">{s.label}</span>
              {s.active && <span className="ml-auto h-2 w-2 rounded-full bg-magenta" />}
            </div>
          );
          return (
            <li key={s.n}>
              {s.to ? <Link to={s.to}>{inner}</Link> : <button className="w-full text-left">{inner}</button>}
            </li>
          );
        })}
      </ul>

      <div className="mt-8 border border-ink bg-magenta p-4 text-cream">
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-80">File something</p>
        <p className="mt-2 font-display text-2xl leading-tight">A dispatch, a flyer, a half-finished idea.</p>
        <button className="mt-4 flex w-full items-center justify-between border border-cream/40 bg-cream px-3 py-2 text-ink hover:bg-acid">
          <span className="font-mono text-[11px] uppercase tracking-widest">New post</span>
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
        Issue closes Friday 6pm IST
      </p>
    </aside>
  );
}

/* ---------- Feed ---------- */

type Post = {
  id: string;
  author: string;
  handle: string;
  initials: string;
  swatch: string;
  kicker: string;
  kickerColor: string;
  time: string;
  headline?: string;
  body: string;
  likes: number;
  comments: number;
  span: "wide" | "tall" | "quote" | "regular";
};

const samplePosts: Post[] = [
  {
    id: "1",
    author: "Aarav Mehta",
    handle: "@aarav",
    initials: "AM",
    swatch: "bg-tangerine",
    kicker: "Field report",
    kickerColor: "bg-tangerine",
    time: "2h",
    headline: "Eighteen first-time printmakers and a lot of ink.",
    body: "Wrapped the Bandra zine workshop. Hands were orange for hours. Three people stayed after to start a print club — first meet next Sunday. If you want in, ping the chapter thread.",
    likes: 42,
    comments: 8,
    span: "wide",
  },
  {
    id: "2",
    author: "Noor Kapoor",
    handle: "@noork",
    initials: "NK",
    swatch: "bg-emerald",
    kicker: "Open call",
    kickerColor: "bg-cobalt",
    time: "5h",
    body: "Looking for a sound designer to score a short film about night markets in Old Delhi. Eight minutes, mostly ambient, small budget but real one. DMs open.",
    likes: 17,
    comments: 12,
    span: "regular",
  },
  {
    id: "3",
    author: "Vihaan Roy",
    handle: "@vihaan",
    initials: "VR",
    swatch: "bg-cobalt",
    kicker: "Take",
    kickerColor: "bg-magenta",
    time: "1d",
    body: "The best community spaces are still libraries. Free, slow, indifferent to your output. Discuss — preferably in person.",
    likes: 88,
    comments: 24,
    span: "quote",
  },
  {
    id: "4",
    author: "Sana Iyer",
    handle: "@sana",
    initials: "SI",
    swatch: "bg-magenta",
    kicker: "In rotation",
    kickerColor: "bg-emerald",
    time: "1d",
    headline: "What I've been listening to while editing.",
    body: "Arooj Aftab on loop, Mdou Moctar for the deadline panic, and one very specific Sade song for the 3am stuck-on-a-cut moment. Drop yours in the replies.",
    likes: 56,
    comments: 19,
    span: "tall",
  },
  {
    id: "5",
    author: "Kabir Joshi",
    handle: "@kabir",
    initials: "KJ",
    swatch: "bg-acid",
    kicker: "Chapter pulse",
    kickerColor: "bg-tangerine",
    time: "2d",
    body: "Kochi chapter is officially live. First gathering: a screening of three short films from members + filter coffee + arguing about them after. Saturday, 6pm.",
    likes: 31,
    comments: 5,
    span: "regular",
  },
];

function Feed() {
  return (
    <section className="py-8">
      <SectionHead n="01" title="Dispatches" subtitle="What members filed this week" />
      <Composer />
      <div className="mt-6 grid grid-cols-1 gap-px bg-ink/10 md:grid-cols-2">
        {samplePosts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="border border-ink bg-cream px-6 py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-ink hover:text-cream">
          Load the next page →
        </button>
      </div>
    </section>
  );
}

function SectionHead({ n, title, subtitle }: { n: string; title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-end justify-between border-b border-ink pb-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Section {n}</p>
        <h2 className="font-display text-4xl font-semibold leading-none">{title}</h2>
      </div>
      <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/50 sm:inline">{subtitle}</span>
    </div>
  );
}

function Composer() {
  return (
    <div className="relative border-2 border-dashed border-ink/30 bg-cream p-5">
      <span className="absolute -top-2.5 left-4 bg-cream px-2 font-mono text-[10px] uppercase tracking-widest text-ink/50">
        File a dispatch
      </span>
      <div className="flex gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center bg-cobalt font-display text-lg text-cream">RS</span>
        <div className="flex-1">
          <textarea
            rows={2}
            placeholder="Three sentences. A question. A flyer. Whatever you'd say across a table."
            className="w-full resize-none bg-transparent font-display text-xl italic leading-snug outline-none placeholder:text-ink/40"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-ink/15 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {["Field report", "Open call", "Take", "In rotation"].map((t, i) => (
                <button
                  key={t}
                  className={`border border-ink/20 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-cream ${i === 0 ? "bg-acid" : "bg-cream"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cream hover:bg-magenta">
              File it →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  // Quote-style card
  if (post.span === "quote") {
    return (
      <article className="group relative col-span-1 bg-cobalt p-6 text-cream md:col-span-2">
        <Quote className="absolute right-6 top-6 h-12 w-12 text-cream/20" />
        <span className="inline-block bg-magenta px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream">
          {post.kicker}
        </span>
        <p className="mt-4 max-w-3xl font-display text-3xl italic leading-tight sm:text-4xl">
          "{post.body}"
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-cream/20 pt-4 font-mono text-[11px] uppercase tracking-widest">
          <span>— {post.author} <span className="opacity-60">{post.handle}</span></span>
          <span className="flex gap-4 opacity-80">
            <button className="hover:text-acid">♥ {post.likes}</button>
            <button className="hover:text-acid">↩ {post.comments}</button>
          </span>
        </div>
      </article>
    );
  }

  const wide = post.span === "wide";
  return (
    <article
      className={`group relative bg-cream p-5 transition hover:bg-white ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className={`inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream ${post.kickerColor}`}>
          {post.kicker}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{post.time} ago</span>
      </div>

      {post.headline && (
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-[26px]">
          {post.headline}
        </h3>
      )}

      <p className={`mt-2 leading-relaxed text-ink/85 ${post.headline ? "text-[15px]" : "text-[16px]"}`}>
        {post.body}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-3">
        <div className="flex items-center gap-2">
          <span className={`grid h-7 w-7 place-items-center ${post.swatch} text-cream font-mono text-[10px] font-bold`}>
            {post.initials}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest">
            {post.author} <span className="text-ink/40">{post.handle}</span>
          </span>
        </div>
        <div className="flex gap-3 font-mono text-[11px] uppercase tracking-widest text-ink/60">
          <button className="hover:text-magenta">♥ {post.likes}</button>
          <button className="hover:text-cobalt">↩ {post.comments}</button>
          <button className="hover:text-emerald">↗</button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Right rail ---------- */

function RightRail() {
  return (
    <aside className="hidden border-l border-ink/10 py-8 pl-6 lg:block">
      {/* Quote of the day */}
      <div className="border-l-4 border-magenta pl-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Pinned this week</p>
        <p className="mt-3 font-display text-xl italic leading-snug">
          "We are not building an audience. We are building a room."
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/50">— editor's note</p>
      </div>

      {/* Open calls */}
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Open calls</p>
        <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
          {[
            { role: "Sound designer", city: "Delhi", color: "bg-cobalt" },
            { role: "Letterpress operator", city: "Pune", color: "bg-tangerine" },
            { role: "Co-host, monthly salon", city: "Kochi", color: "bg-emerald" },
            { role: "Photographer, festival doc", city: "Mumbai", color: "bg-magenta" },
          ].map((c) => (
            <li key={c.role} className="flex items-center gap-3 py-3">
              <span className={`h-2 w-2 ${c.color}`} />
              <div className="flex-1">
                <p className="text-[14px] font-medium leading-tight">{c.role}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">{c.city}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink/40" />
            </li>
          ))}
        </ul>
      </div>

      {/* Chapter pulse */}
      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Chapter pulse</p>
        <div className="mt-3 space-y-2">
          {[
            { city: "Mumbai", n: 14, color: "bg-magenta" },
            { city: "Pune", n: 9, color: "bg-tangerine" },
            { city: "Bengaluru", n: 7, color: "bg-cobalt" },
            { city: "Kochi", n: 3, color: "bg-emerald" },
            { city: "Delhi", n: 2, color: "bg-acid" },
          ].map((c) => (
            <div key={c.city} className="flex items-center gap-3">
              <span className="w-20 font-mono text-[11px] uppercase tracking-widest">{c.city}</span>
              <div className="flex-1 bg-ink/5">
                <div className={`h-2 ${c.color}`} style={{ width: `${c.n * 6}%` }} />
              </div>
              <span className="w-6 text-right font-mono text-[11px] text-ink/60">{c.n}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 font-display text-sm italic text-ink/50">
        Numbers are dispatches filed this week, not followers. We don't count those.
      </p>
    </aside>
  );
}

function Colophon() {
  return (
    <footer className="mt-12 border-t-2 border-ink bg-cream">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60 lg:px-8">
        <span>Saptrang Dispatches — Vol. 02</span>
        <span>Printed in Mumbai, Bengaluru, Pune, Kochi, Delhi</span>
        <Link to="/" className="hover:text-ink">← Back to the front page</Link>
      </div>
    </footer>
  );
}
