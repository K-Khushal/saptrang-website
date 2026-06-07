import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Mail, Link as LinkIcon, Calendar, Instagram, Twitter, Github, Globe } from "lucide-react";

export const Route = createFileRoute("/community/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Saptrang Community" },
      { name: "description", content: "View and edit your Saptrang community profile." },
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
  bio: "Printmaker, slow-cinema obsessive, and host of the monthly Bandra zine swap. Believer that small rooms make the loudest ideas.",
  socials: {
    instagram: "@riya.prints",
    twitter: "@riyamakes",
    github: "riyas",
    website: "riyasharma.studio",
  },
  stats: { posts: 124, followers: 892, following: 213 },
  interests: ["Printmaking", "Zines", "Indie Film", "Field Recording", "Poetry"],
};

function ProfilePage() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
      {/* Cover */}
      <div className="relative h-40 bg-gradient-to-br from-magenta via-tangerine to-acid sm:h-52">
        <div className="absolute -bottom-12 left-6 sm:left-8">
          <div className="grid h-28 w-28 place-items-center rounded-full border-4 border-white bg-cobalt text-3xl font-bold text-cream shadow-lg">
            RS
          </div>
        </div>
        <button className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white">
          Edit Cover
        </button>
      </div>

      <div className="px-6 pb-8 pt-16 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">{profile.name}</h1>
            <p className="text-sm text-ink/60">{profile.username}</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold hover:bg-ink/5">
              Edit Profile
            </button>
            <Link
              to="/community"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:opacity-90"
            >
              Back to Feed
            </Link>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed">{profile.bio}</p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
          <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {profile.email}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {profile.city}, {profile.state}</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {profile.joined}</span>
          <span className="flex items-center gap-1.5"><LinkIcon className="h-4 w-4" /> {profile.socials.website}</span>
        </div>

        {/* Stats */}
        <div className="mt-5 flex gap-6 text-sm">
          <span><strong className="font-semibold">{profile.stats.posts}</strong> <span className="text-ink/60">Posts</span></span>
          <span><strong className="font-semibold">{profile.stats.followers}</strong> <span className="text-ink/60">Followers</span></span>
          <span><strong className="font-semibold">{profile.stats.following}</strong> <span className="text-ink/60">Following</span></span>
        </div>

        {/* Socials */}
        <div className="mt-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink/50">Social</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <SocialChip icon={Instagram} label={profile.socials.instagram} />
            <SocialChip icon={Twitter} label={profile.socials.twitter} />
            <SocialChip icon={Github} label={profile.socials.github} />
            <SocialChip icon={Globe} label={profile.socials.website} />
          </div>
        </div>

        {/* Interests */}
        <div className="mt-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink/50">Interests</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.interests.map((i) => (
              <span key={i} className="rounded-full bg-ink/5 px-3 py-1 text-sm">{i}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-ink/10">
          <div className="flex gap-6 text-sm font-medium">
            {["Posts", "Media", "Groups", "Likes"].map((t, i) => (
              <button
                key={t}
                className={`-mb-px border-b-2 px-1 pb-3 ${
                  i === 0 ? "border-magenta text-ink" : "border-transparent text-ink/50 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-xl border border-ink/10 p-4">
              <div className="text-sm text-ink/50">2 days ago</div>
              <p className="mt-1 text-[15px]">Sample post #{n} from {profile.name}. Lorem ipsum about workshops, screenings, and shared meals.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialChip({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-3 py-1 text-sm">
      <Icon className="h-3.5 w-3.5" /> {label}
    </span>
  );
}
