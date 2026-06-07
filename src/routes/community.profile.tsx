import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Mail, Calendar, Instagram, Twitter, Github, Globe, ArrowLeft, Pencil } from "lucide-react";

export const Route = createFileRoute("/community/profile")({
  head: () => ({
    meta: [
      { title: "Riya Sharma — Saptrang Member Page" },
      { name: "description", content: "Member page: what Riya is making, where she is, and what's in rotation this month." },
    ],
  }),
  component: ProfilePage,
});

const profile = {
  name: "Riya Sharma",
  username: "@riyas",
  email: "riya@saptrang.in",
  city: "Mumbai",
  state: "Maharashtra",
  joined: "March 2024",
  pronoun: "she / her",
  role: "Printmaker · Zine editor",
  bio: "Printmaker, slow-cinema obsessive, and host of the monthly Bandra zine swap. Believer that small rooms make the loudest ideas, and that good coffee is non-negotiable before noon.",
  socials: [
    { icon: Instagram, label: "@riya.prints", color: "bg-magenta" },
    { icon: Twitter, label: "@riyamakes", color: "bg-cobalt" },
    { icon: Github, label: "riyas", color: "bg-ink" },
    { icon: Globe, label: "riyasharma.studio", color: "bg-emerald" },
  ],
  making: ["A four-issue zine on night markets", "Risograph series for Kochi chapter", "Letterpress alphabet, slowly"],
  openTo: ["Studio visits", "Trades (prints for film stills)", "Co-hosting a salon in Pune"],
  rotation: ["Arooj Aftab — Vulture Prince", "Lispector — Água Viva", "Wong Kar-wai — In the Mood for Love"],
  interests: ["Printmaking", "Zines", "Indie Film", "Field Recording", "Poetry"],
  posts: 124,
};

function ProfilePage() {
  return (
    <div className="py-8">
      {/* Back */}
      <Link
        to="/community"
        className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink/60 hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dispatches
      </Link>

      {/* Editorial header card */}
      <section className="grid grid-cols-1 border-2 border-ink bg-cream md:grid-cols-[1fr_320px]">
        {/* Left: identity */}
        <div className="border-b-2 border-ink p-6 md:border-b-0 md:border-r-2 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Member page · No. 047</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[0.95] sm:text-6xl">
            {profile.name}
            <span className="text-magenta">.</span>
          </h1>
          <p className="mt-2 font-display text-xl italic text-ink/70">{profile.role}</p>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed">{profile.bio}</p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-ink/70">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {profile.city}, {profile.state}</span>
            <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {profile.email}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Joined {profile.joined}</span>
          </div>

          <div className="mt-6 flex gap-2">
            <button className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cream hover:bg-magenta hover:border-magenta">
              <Pencil className="h-3.5 w-3.5" /> Edit page
            </button>
            <button className="border border-ink bg-cream px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-acid">
              Share card
            </button>
          </div>
        </div>

        {/* Right: portrait + meta */}
        <div className="relative bg-magenta p-6 text-cream md:p-8">
          <div className="grid aspect-square w-full place-items-center bg-cobalt font-display text-7xl font-semibold">
            RS
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-80">{profile.username}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">{profile.pronoun}</span>
          </div>
          <div className="mt-4 border-t border-cream/30 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">Filed</p>
            <p className="font-display text-3xl">{profile.posts} <span className="text-base opacity-70">dispatches</span></p>
          </div>
        </div>
      </section>

      {/* Three editorial columns */}
      <section className="mt-8 grid grid-cols-1 gap-px bg-ink/15 md:grid-cols-3">
        <ColumnCard
          n="A"
          color="bg-tangerine"
          title="Currently making"
          items={profile.making}
        />
        <ColumnCard
          n="B"
          color="bg-emerald"
          title="Open to"
          items={profile.openTo}
        />
        <ColumnCard
          n="C"
          color="bg-cobalt"
          title="In rotation"
          items={profile.rotation}
        />
      </section>

      {/* Socials strip */}
      <section className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Find her elsewhere</p>
        <div className="mt-3 grid grid-cols-2 gap-px bg-ink/15 sm:grid-cols-4">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href="#"
              className="group flex items-center justify-between bg-cream p-4 hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span className={`grid h-8 w-8 place-items-center ${s.color} text-cream`}>
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[12px]">{s.label}</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-ink">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Interests as tape labels */}
      <section className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Tags on the cover</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.interests.map((i, idx) => (
            <span
              key={i}
              className={`-rotate-1 border border-ink px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                ["bg-acid", "bg-tangerine", "bg-emerald", "bg-magenta text-cream", "bg-cobalt text-cream"][idx % 5]
              }`}
            >
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* Recent dispatches as contact sheet */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between border-b border-ink pb-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Recent</p>
            <h2 className="font-display text-3xl font-semibold leading-none">Dispatches by Riya</h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/50 sm:inline">
            Showing 4 of {profile.posts}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-px bg-ink/15 sm:grid-cols-2">
          {[
            { kicker: "Field report", color: "bg-tangerine", body: "Zine swap, take six. Twenty-three traders, four trades that broke my heart in a good way.", time: "2d" },
            { kicker: "In rotation", color: "bg-emerald", body: "Three records I keep returning to between print runs. Loud enough to drown the press, quiet enough to think.", time: "4d" },
            { kicker: "Open call", color: "bg-cobalt", body: "Looking for a co-host for the Bandra salon — once a month, low stakes, high snacks.", time: "1w" },
            { kicker: "Take", color: "bg-magenta", body: "Stop calling everything content. We are making things. They are objects. Names matter.", time: "2w" },
          ].map((p, i) => (
            <article key={i} className="bg-cream p-5 hover:bg-white">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cream ${p.color}`}>
                  {p.kicker}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">{p.time}</span>
              </div>
              <p className="mt-3 font-display text-lg leading-snug">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ColumnCard({ n, color, title, items }: { n: string; color: string; title: string; items: string[] }) {
  return (
    <div className="bg-cream p-5">
      <div className="flex items-baseline gap-3">
        <span className={`grid h-7 w-7 place-items-center ${color} font-mono text-[11px] font-bold text-cream`}>
          {n}
        </span>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 border-b border-ink/10 pb-2 text-[14px] leading-snug last:border-0">
            <span className="text-ink/30">—</span> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
