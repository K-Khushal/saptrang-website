import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Mail, Calendar, Instagram, Twitter, Github, Globe, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/community/profile")({
  head: () => ({
    meta: [
      { title: "Riya Sharma — Pulse" },
      { name: "description", content: "Member page on Pulse — what Riya is making and where to find her." },
    ],
  }),
  component: ProfilePage,
});

const profile = {
  name: "Riya Sharma",
  username: "@riyas",
  email: "riya@pulse.community",
  city: "Mumbai",
  state: "Maharashtra",
  joined: "March 2024",
  role: "Printmaker · Zine editor",
  bio: "Printmaker, slow-cinema obsessive, and host of the monthly Bandra zine swap. Believer that small rooms make the loudest ideas, and that good coffee is non-negotiable before noon.",
  socials: [
    { icon: Instagram, label: "@riya.prints" },
    { icon: Twitter, label: "@riyamakes" },
    { icon: Github, label: "riyas" },
    { icon: Globe, label: "riyasharma.studio" },
  ],
  making: ["A four-issue zine on night markets", "Risograph series for the Kochi chapter", "Letterpress alphabet, slowly"],
  openTo: ["Studio visits", "Trades — prints for film stills", "Co-hosting a salon in Pune"],
  rotation: ["Arooj Aftab — Vulture Prince", "Lispector — Água Viva", "Wong Kar-wai — In the Mood for Love"],
  interests: ["Printmaking", "Zines", "Indie Film", "Field Recording", "Poetry"],
};

function ProfilePage() {
  return (
    <div>
      <Link
        to="/community"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 hover:text-ink"
      >
        <ArrowLeft className="size-3.5" /> Back to feed
      </Link>

      {/* Identity */}
      <header className="mt-8 grid lg:grid-cols-[1fr_auto] gap-8 items-end pb-10 border-b border-ink/10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3 text-ink/60">
            <span className="inline-block w-8 h-px bg-ink/40" />
            Member · No. 047
          </p>
          <h1 className="mt-5 font-display font-semibold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
            {profile.name}<span className="text-magenta">.</span>
          </h1>
          <p className="mt-3 font-display text-xl italic text-ink/70">{profile.role}</p>
          <p className="mt-6 max-w-[55ch] text-[17px] leading-relaxed text-ink/85">{profile.bio}</p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-4">
          <span className="grid size-28 place-items-center rounded-full bg-magenta text-cream font-display text-3xl font-semibold">
            RS
          </span>
          <button className="inline-flex items-center gap-2 bg-ink text-cream pl-4 pr-1.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-magenta transition-colors">
            Edit page
            <span className="size-6 rounded-full bg-acid text-ink grid place-items-center">↗</span>
          </button>
        </div>
      </header>

      {/* Meta line */}
      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
        <span className="flex items-center gap-2"><MapPin className="size-3.5" /> {profile.city}, {profile.state}</span>
        <span className="flex items-center gap-2"><Mail className="size-3.5" /> {profile.email}</span>
        <span className="flex items-center gap-2"><Calendar className="size-3.5" /> Joined {profile.joined}</span>
        <span>{profile.username}</span>
      </div>

      {/* Three lists */}
      <section className="mt-14 grid md:grid-cols-3 gap-10 lg:gap-14">
        <ListBlock label="Currently making" items={profile.making} accent="text-magenta" />
        <ListBlock label="Open to" items={profile.openTo} accent="text-cobalt" />
        <ListBlock label="In rotation" items={profile.rotation} accent="text-emerald" />
      </section>

      {/* Elsewhere */}
      <section className="mt-14 pt-10 border-t border-ink/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Elsewhere</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm hover:bg-ink hover:text-cream transition-colors"
            >
              <s.icon className="size-3.5" /> {s.label}
            </a>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Interests</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {profile.interests.map((i) => (
            <span key={i} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm">{i}</span>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className="mt-14 pt-10 border-t border-ink/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Recent posts</p>
        <div className="mt-4 flex flex-col">
          {[
            { body: "Zine swap, take six. Twenty-three traders, four trades that broke my heart in a good way.", time: "2d" },
            { body: "Three records I keep returning to between print runs — loud enough to drown the press, quiet enough to think.", time: "4d" },
            { body: "Looking for a co-host for the Bandra salon. Once a month, low stakes, high snacks.", time: "1w" },
            { body: "Stop calling everything content. We are making things. They are objects. Names matter.", time: "2w" },
          ].map((p, i) => (
            <article key={i} className={`py-6 ${i === 0 ? "" : "border-t border-ink/10"}`}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">{p.time} ago</div>
              <p className="mt-2 text-[17px] leading-relaxed text-ink/85">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ListBlock({ label, items, accent }: { label: string; items: string[]; accent: string }) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accent}`}>{label}</p>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i} className="text-[15px] leading-snug border-b border-ink/10 pb-3 last:border-0">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
