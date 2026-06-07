import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Mail, Calendar, Instagram, Twitter, Github, Globe, ArrowLeft, X, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/community/profile")({
  head: () => ({
    meta: [
      { title: "Riya Sharma — Pulse" },
      { name: "description", content: "Member page on Pulse — what Riya is making and where to find her." },
    ],
  }),
  component: ProfilePage,
});

type ProfileData = {
  name: string;
  username: string;
  email: string;
  city: string;
  state: string;
  joined: string;
  role: string;
  bio: string;
  socials: { icon: typeof Instagram; label: string; platform: string }[];
  making: string[];
  openTo: string[];
  rotation: string[];
  interests: string[];
};

const initialProfile: ProfileData = {
  name: "Riya Sharma",
  username: "@riyas",
  email: "riya@pulse.community",
  city: "Mumbai",
  state: "Maharashtra",
  joined: "March 2024",
  role: "Printmaker · Zine editor",
  bio: "Printmaker, slow-cinema obsessive, and host of the monthly Bandra zine swap. Believer that small rooms make the loudest ideas, and that good coffee is non-negotiable before noon.",
  socials: [
    { icon: Instagram, label: "@riya.prints", platform: "Instagram" },
    { icon: Twitter, label: "@riyamakes", platform: "Twitter" },
    { icon: Github, label: "riyas", platform: "Github" },
    { icon: Globe, label: "riyasharma.studio", platform: "Website" },
  ],
  making: ["A four-issue zine on night markets", "Risograph series for the Kochi chapter", "Letterpress alphabet, slowly"],
  openTo: ["Studio visits", "Trades — prints for film stills", "Co-hosting a salon in Pune"],
  rotation: ["Arooj Aftab — Vulture Prince", "Lispector — Água Viva", "Wong Kar-wai — In the Mood for Love"],
  interests: ["Printmaking", "Zines", "Indie Film", "Field Recording", "Poetry"],
};

function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [draft, setDraft] = useState<ProfileData>(initialProfile);

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(profile);
  };

  const saveEdit = () => {
    setProfile(draft);
    setEditing(false);
  };

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

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

          {editing ? (
            <div className="mt-5 space-y-3">
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                className="w-full max-w-md font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-2"
                placeholder="Full name"
              />
              <input
                value={draft.role}
                onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value }))}
                className="w-full max-w-md font-display text-lg italic text-ink/70 bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-1"
                placeholder="Role / Title"
              />
            </div>
          ) : (
            <>
              <h1 className="mt-5 font-display font-semibold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
                {profile.name}<span className="text-magenta">.</span>
              </h1>
              <p className="mt-3 font-display text-xl italic text-ink/70">{profile.role}</p>
            </>
          )}

          {editing ? (
            <textarea
              value={draft.bio}
              onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              rows={4}
              className="mt-6 w-full max-w-[55ch] text-[17px] leading-relaxed text-ink/85 bg-transparent border border-ink/20 rounded-lg p-3 focus:border-magenta outline-none resize-none"
              placeholder="Short bio…"
            />
          ) : (
            <p className="mt-6 max-w-[55ch] text-[17px] leading-relaxed text-ink/85">{profile.bio}</p>
          )}
        </div>

        <div className="flex flex-col items-start lg:items-end gap-4">
          <span className="grid size-28 place-items-center rounded-full bg-magenta text-cream font-display text-3xl font-semibold">
            {initials}
          </span>
          {editing ? (
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                className="inline-flex items-center gap-1.5 bg-ink/10 text-ink pl-4 pr-1.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-ink/20 transition-colors"
              >
                Cancel
                <span className="size-6 rounded-full bg-ink/20 text-ink grid place-items-center"><X className="size-3.5" /></span>
              </button>
              <button
                onClick={saveEdit}
                className="inline-flex items-center gap-1.5 bg-ink text-cream pl-4 pr-1.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-magenta transition-colors"
              >
                Save
                <span className="size-6 rounded-full bg-acid text-ink grid place-items-center"><Check className="size-3.5" /></span>
              </button>
            </div>
          ) : (
            <button
              onClick={startEdit}
              className="inline-flex items-center gap-2 bg-ink text-cream pl-4 pr-1.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-magenta transition-colors"
            >
              Edit page
              <span className="size-6 rounded-full bg-acid text-ink grid place-items-center">↗</span>
            </button>
          )}
        </div>
      </header>

      {/* Meta line */}
      {editing ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2"><MapPin className="size-3.5" /> City</span>
            <input
              value={draft.city}
              onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
              className="w-full bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-1 text-ink/85"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2"><MapPin className="size-3.5" /> State</span>
            <input
              value={draft.state}
              onChange={(e) => setDraft((d) => ({ ...d, state: e.target.value }))}
              className="w-full bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-1 text-ink/85"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2"><Mail className="size-3.5" /> Email</span>
            <input
              value={draft.email}
              onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
              className="w-full bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-1 text-ink/85"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2"><Calendar className="size-3.5" /> Username</span>
            <input
              value={draft.username}
              onChange={(e) => setDraft((d) => ({ ...d, username: e.target.value }))}
              className="w-full bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-1 text-ink/85"
            />
          </label>
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
          <span className="flex items-center gap-2"><MapPin className="size-3.5" /> {profile.city}, {profile.state}</span>
          <span className="flex items-center gap-2"><Mail className="size-3.5" /> {profile.email}</span>
          <span className="flex items-center gap-2"><Calendar className="size-3.5" /> Joined {profile.joined}</span>
          <span>{profile.username}</span>
        </div>
      )}

      {/* Three lists */}
      <section className="mt-14 grid md:grid-cols-3 gap-10 lg:gap-14">
        <EditableListBlock
          editing={editing}
          label="Currently making"
          accent="text-magenta"
          items={editing ? draft.making : profile.making}
          onChange={(items) => setDraft((d) => ({ ...d, making: items }))}
        />
        <EditableListBlock
          editing={editing}
          label="Open to"
          accent="text-cobalt"
          items={editing ? draft.openTo : profile.openTo}
          onChange={(items) => setDraft((d) => ({ ...d, openTo: items }))}
        />
        <EditableListBlock
          editing={editing}
          label="In rotation"
          accent="text-emerald"
          items={editing ? draft.rotation : profile.rotation}
          onChange={(items) => setDraft((d) => ({ ...d, rotation: items }))}
        />
      </section>

      {/* Elsewhere */}
      <section className="mt-14 pt-10 border-t border-ink/10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Elsewhere</p>
        {editing ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {draft.socials.map((s, i) => (
              <div key={s.platform} className="flex items-center gap-3 rounded-full border border-ink/15 px-4 py-2">
                <s.icon className="size-3.5 shrink-0" />
                <input
                  value={s.label}
                  onChange={(e) => {
                    const next = [...draft.socials];
                    next[i] = { ...next[i], label: e.target.value };
                    setDraft((d) => ({ ...d, socials: next }));
                  }}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder={`${s.platform} handle`}
                />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </section>

      {/* Interests */}
      <section className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Interests</p>
        {editing ? (
          <div className="mt-5">
            <input
              value={draft.interests.join(", ")}
              onChange={(e) => setDraft((d) => ({ ...d, interests: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
              className="w-full bg-transparent border-b border-ink/20 focus:border-magenta outline-none pb-1 text-[15px] text-ink/85"
              placeholder="Comma-separated interests"
            />
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.interests.map((i) => (
              <span key={i} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm">{i}</span>
            ))}
          </div>
        )}
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

function EditableListBlock({
  editing,
  label,
  items,
  accent,
  onChange,
}: {
  editing: boolean;
  label: string;
  items: string[];
  accent: string;
  onChange?: (items: string[]) => void;
}) {
  return (
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accent}`}>{label}</p>
      {editing ? (
        <textarea
          value={items.join("\n")}
          onChange={(e) => onChange?.(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          rows={5}
          className="mt-4 w-full text-[15px] leading-snug bg-transparent border border-ink/20 rounded-lg p-3 focus:border-magenta outline-none resize-none"
          placeholder="One item per line…"
        />
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i} className="text-[15px] leading-snug border-b border-ink/10 pb-3 last:border-0">
              {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
