import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Bell, Home, Users, Bookmark, Hash, Settings, Search, Sparkles, Image as ImageIcon, Smile, MapPin } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Saptrang" },
      { name: "description", content: "Saptrang community feed: share, discuss, and connect with members across chapters." },
      { property: "og:title", content: "Community — Saptrang" },
      { property: "og:description", content: "Saptrang community feed: share, discuss, and connect with members across chapters." },
    ],
  }),
  component: CommunityLayout,
});

function CommunityLayout() {
  const { pathname } = useLocation();
  const isProfile = pathname.startsWith("/community/profile");

  return (
    <div className="min-h-screen bg-cream text-ink">
      <CommunityTopBar />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[240px_1fr_320px] lg:px-8">
        <LeftNav />
        <main className="min-w-0">
          {isProfile ? <Outlet /> : <Feed />}
        </main>
        <RightRail />
      </div>
    </div>
  );
}

function CommunityTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">Saptrang</Link>
        <div className="hidden flex-1 max-w-md md:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm">
            <Search className="h-4 w-4 text-ink/50" />
            <input
              placeholder="Search members, groups, posts"
              className="w-full bg-transparent outline-none placeholder:text-ink/40"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 hover:bg-ink/5" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <Link to="/community/profile" className="flex items-center gap-2 rounded-full border border-ink/15 bg-white py-1 pl-1 pr-3 hover:bg-ink/5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-magenta text-cream text-xs font-semibold">RS</span>
            <span className="hidden text-sm font-medium sm:inline">Riya S.</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

const navItems = [
  { label: "Feed", icon: Home, to: "/community" as const },
  { label: "Groups", icon: Users, to: "/community" as const },
  { label: "Notifications", icon: Bell, to: "/community" as const },
  { label: "Topics", icon: Hash, to: "/community" as const },
  { label: "Bookmarks", icon: Bookmark, to: "/community" as const },
  { label: "Profile", icon: Settings, to: "/community/profile" as const },
];

function LeftNav() {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-20 flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center gap-3 rounded-full px-4 py-2.5 text-[15px] font-medium hover:bg-ink/5"
            activeProps={{ className: "bg-ink/5" }}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
        <button className="mt-3 rounded-full bg-magenta px-4 py-3 font-semibold text-cream hover:opacity-90">
          New Post
        </button>
      </nav>
    </aside>
  );
}

function Feed() {
  return (
    <div className="flex flex-col gap-4">
      <Composer />
      {samplePosts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

function Composer() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4">
      <div className="flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt text-cream font-semibold">RS</span>
        <div className="flex-1">
          <textarea
            rows={2}
            placeholder="Share something with the community…"
            className="w-full resize-none bg-transparent text-[15px] outline-none placeholder:text-ink/40"
          />
          <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-3">
            <div className="flex gap-1 text-ink/60">
              <button className="rounded-full p-2 hover:bg-ink/5" aria-label="Photo"><ImageIcon className="h-4 w-4" /></button>
              <button className="rounded-full p-2 hover:bg-ink/5" aria-label="Emoji"><Smile className="h-4 w-4" /></button>
              <button className="rounded-full p-2 hover:bg-ink/5" aria-label="Location"><MapPin className="h-4 w-4" /></button>
            </div>
            <button className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-cream hover:opacity-90">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Post = {
  id: string;
  author: string;
  handle: string;
  initials: string;
  color: string;
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
    color: "bg-tangerine",
    time: "2h",
    body: "Just wrapped up our zine workshop in Bandra — 18 first-time printmakers, ink everywhere. So much joy. 🧡",
    likes: 42,
    comments: 8,
  },
  {
    id: "2",
    author: "Noor Kapoor",
    handle: "@noork",
    initials: "NK",
    color: "bg-emerald",
    time: "5h",
    body: "Looking for a sound designer to collab on a short film about night markets. DM if interested.",
    likes: 17,
    comments: 12,
  },
  {
    id: "3",
    author: "Vihaan Roy",
    handle: "@vihaan",
    initials: "VR",
    color: "bg-cobalt",
    time: "1d",
    body: "Hot take: the best community spaces are still libraries. Discuss.",
    likes: 88,
    comments: 24,
  },
];

function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-ink/10 bg-white p-4 transition hover:border-ink/20">
      <div className="flex gap-3">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${post.color} text-cream font-semibold`}>
          {post.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{post.author}</span>
            <span className="text-ink/50">{post.handle} · {post.time}</span>
          </div>
          <p className="mt-1 text-[15px] leading-relaxed">{post.body}</p>
          <div className="mt-3 flex gap-6 text-sm text-ink/60">
            <button className="hover:text-magenta">♥ {post.likes}</button>
            <button className="hover:text-cobalt">💬 {post.comments}</button>
            <button className="hover:text-emerald">↗ Share</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function RightRail() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 flex flex-col gap-4">
        <div className="rounded-2xl border border-ink/10 bg-white p-4">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Sparkles className="h-4 w-4 text-magenta" /> Trending
          </h3>
          <ul className="mt-3 space-y-3 text-sm">
            {["#ZineFest26", "#OpenMicMumbai", "#FilmCollab", "#PrintmakingTips"].map((t) => (
              <li key={t} className="cursor-pointer hover:text-magenta">{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-4">
          <h3 className="font-display text-lg font-semibold">Suggested Groups</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              { name: "Night Photographers", members: 312 },
              { name: "Poets of Pune", members: 184 },
              { name: "Sound + Cinema", members: 96 },
            ].map((g) => (
              <li key={g.name} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{g.name}</div>
                  <div className="text-xs text-ink/50">{g.members} members</div>
                </div>
                <button className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold hover:bg-ink/5">Join</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
