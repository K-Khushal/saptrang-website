import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Bell, Search, Plus } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Pulse" },
      { name: "description", content: "The Pulse community feed: what members are making, sharing and inviting you to this week." },
      { property: "og:title", content: "Community — Pulse" },
      { property: "og:description", content: "What Pulse members are making and inviting you to this week." },
    ],
  }),
  component: CommunityLayout,
});

function CommunityLayout() {
  const { pathname } = useLocation();
  const isProfile = pathname.startsWith("/community/profile");

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 pt-10 lg:pt-16 pb-20">
        {!isProfile && <Header />}
        <div className="mt-10 lg:mt-14 grid lg:grid-cols-[200px_1fr_260px] gap-10 lg:gap-14">
          <LeftRail />
          <main className="min-w-0">{isProfile ? <Outlet /> : <Feed />}</main>
          <RightRail />
        </div>
      </div>
    </div>
  );
}

/* ---------------- NAV (matches landing) ---------------- */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/10">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl font-semibold italic tracking-tight">
          <span className="inline-block size-3 rounded-full bg-magenta animate-pulse" />
          Pulse<span className="text-magenta">.</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-sm mx-10">
          <div className="flex items-center gap-2 w-full bg-cream border border-ink/10 rounded-full px-4 py-2">
            <Search className="size-4 text-ink/40" />
            <input
              placeholder="Search the community"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="size-10 grid place-items-center rounded-full hover:bg-ink/5">
            <Bell className="size-4" />
          </button>
          <Link
            to="/community/profile"
            className="flex items-center gap-2 rounded-full border border-ink/10 py-1 pl-1 pr-3 hover:bg-ink/5"
          >
            <span className="grid size-7 place-items-center rounded-full bg-magenta text-cream text-[11px] font-medium">RS</span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em] font-mono">Riya</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  return (
    <header>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
        <span className="inline-block w-10 h-px bg-ink" />
        The Community · Open thread
      </p>
      <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
        What the <span className="italic text-magenta">makers</span> are
        <br className="hidden sm:block" /> talking about this week.
      </h1>
    </header>
  );
}

/* ---------------- Left rail ---------------- */
const navItems = [
  { label: "Feed", to: "/community" as const, active: true },
  { label: "Gatherings", to: "/events" as const },
  { label: "Open calls", to: "/community" as const },
  { label: "Chapters", to: "/community" as const },
  { label: "Bookmarks", to: "/community" as const },
  { label: "Your page", to: "/community/profile" as const },
];

function LeftRail() {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 flex flex-col gap-1 font-mono text-[12px] uppercase tracking-[0.18em]">
        {navItems.map((n) => (
          <Link
            key={n.label}
            to={n.to}
            className={`py-2 transition-colors ${n.active ? "text-ink" : "text-ink/50 hover:text-ink"}`}
          >
            {n.active && <span className="inline-block size-1.5 rounded-full bg-magenta mr-2 align-middle" />}
            {n.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

/* ---------------- Feed ---------------- */
type Post = {
  id: string;
  author: string;
  handle: string;
  initials: string;
  swatch: string;
  time: string;
  body: string;
  likes: number;
  comments: number;
};

const samplePosts: Post[] = [
  {
    id: "1",
    author: "Aarav Mehta",
    handle: "@aarav",
    initials: "AM",
    swatch: "bg-tangerine",
    time: "2h",
    body: "Wrapped the Bandra zine workshop — eighteen first-time printmakers and a lot of orange ink. Three people stayed back to start a print club. First meet next Sunday, ping the chapter thread if you want in.",
    likes: 42,
    comments: 8,
  },
  {
    id: "2",
    author: "Noor Kapoor",
    handle: "@noork",
    initials: "NK",
    swatch: "bg-emerald",
    time: "5h",
    body: "Looking for a sound designer to score a short film about night markets in Old Delhi. Eight minutes, mostly ambient, small but real budget. DMs open.",
    likes: 17,
    comments: 12,
  },
  {
    id: "3",
    author: "Vihaan Roy",
    handle: "@vihaan",
    initials: "VR",
    swatch: "bg-cobalt",
    time: "1d",
    body: "Hot take: the best community spaces are still libraries. Free, slow, indifferent to your output. Discuss — preferably in person.",
    likes: 88,
    comments: 24,
  },
  {
    id: "4",
    author: "Sana Iyer",
    handle: "@sana",
    initials: "SI",
    swatch: "bg-magenta",
    time: "2d",
    body: "Kochi chapter is officially live. First gathering: three short films from members, filter coffee, and arguing about them after. Saturday, 6pm.",
    likes: 31,
    comments: 5,
  },
];

function Feed() {
  return (
    <div>
      <Composer />
      <div className="mt-10 flex flex-col">
        {samplePosts.map((p, i) => (
          <PostCard key={p.id} post={p} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="flex gap-4 pb-8 border-b border-ink/10">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cobalt text-cream text-sm font-medium">RS</span>
      <div className="flex-1">
        <textarea
          rows={2}
          placeholder="Share something with the community…"
          className="w-full resize-none bg-transparent text-lg leading-snug outline-none placeholder:text-ink/40"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40">
            Be kind. Be specific.
          </span>
          <button className="inline-flex items-center gap-2 bg-ink text-cream pl-4 pr-1.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-magenta transition-colors">
            Post
            <span className="size-6 rounded-full bg-acid text-ink grid place-items-center">
              <Plus className="size-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, first }: { post: Post; first: boolean }) {
  return (
    <article className={`py-8 ${first ? "" : "border-t border-ink/10"}`}>
      <div className="flex gap-4">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full ${post.swatch} text-cream text-sm font-medium`}>
          {post.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            <span className="text-ink">{post.author}</span>
            <span>{post.handle}</span>
            <span>·</span>
            <span>{post.time}</span>
          </div>
          <p className="mt-3 text-[17px] leading-relaxed text-ink/85">{post.body}</p>
          <div className="mt-4 flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            <button className="hover:text-magenta transition-colors">♥ {post.likes}</button>
            <button className="hover:text-cobalt transition-colors">↩ {post.comments}</button>
            <button className="hover:text-emerald transition-colors">↗ Share</button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Right rail ---------------- */
function RightRail() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 flex flex-col gap-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Open calls</p>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { role: "Sound designer", city: "Delhi" },
              { role: "Letterpress operator", city: "Pune" },
              { role: "Co-host, monthly salon", city: "Kochi" },
              { role: "Festival photographer", city: "Mumbai" },
            ].map((c) => (
              <li key={c.role} className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-3">
                <span>{c.role}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{c.city}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Upcoming</p>
          <ul className="mt-4 space-y-4 text-sm">
            {[
              { title: "Bandra zine swap", when: "Sat · 7pm" },
              { title: "Kochi chapter launch", when: "Sat · 6pm" },
              { title: "Pune poets' open mic", when: "Tue · 8pm" },
            ].map((e) => (
              <li key={e.title}>
                <div className="font-display text-lg leading-tight">{e.title}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 mt-1">{e.when}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
