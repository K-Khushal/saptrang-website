import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-collective.jpg";
import creatorImg from "@/assets/creator-portrait.jpg";
import aboutImg from "@/assets/about-workshop.jpg";
import eventImg from "@/assets/event-screening.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import creator4 from "@/assets/creator-4.jpg";
import reelStill from "@/assets/reel-still.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PULSE — A Collective for Filmmakers, Artists & Cultural Makers" },
      {
        name: "description",
        content:
          "PULSE is a global community of filmmakers, photographers, artists and storytellers. Screenings, workshops, exhibitions and member residencies — apply to join.",
      },
      { property: "og:title", content: "PULSE — A Collective for Filmmakers, Artists & Cultural Makers" },
      {
        property: "og:description",
        content:
          "A living, breathing community of cultural makers. Screenings, gatherings, residencies and shared archives.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-cream text-ink font-body min-h-screen overflow-x-clip selection:bg-magenta selection:text-cream">
      <Nav />
      <Hero />
      <Reel />
      <CreditsMarquee />
      <About />
      <Stats />
      <PastEvents />
      <Highlights />
      <FeaturedCreator />
      <Spotlight />
      <Testimonials />
      <Journal />
      <Upcoming />
      <Process />
      <Partners />
      <MembershipCTA />
      <Footer />
    </div>
  );
}

/* ---------------- REEL ---------------- */
function Reel() {
  return (
    <section className="px-6 lg:px-10 max-w-[1400px] mx-auto -mt-8 mb-20">
      <div className="relative rounded-[1.5rem] overflow-hidden border-4 border-ink group cursor-pointer">
        <img
          src={reelStill}
          alt="Community of creators laughing on a rooftop at golden hour"
          width={1600}
          height={900}
          loading="lazy"
          className="w-full aspect-[16/8] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="absolute top-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cream">
          <span className="size-2 rounded-full bg-magenta animate-pulse" />
          Community reel · 2024
        </div>
        <div className="absolute top-6 right-6 bg-acid text-ink font-mono text-[10px] uppercase tracking-widest px-2 py-1">03:47</div>
        <div className="absolute inset-0 grid place-items-center">
          <button className="size-24 lg:size-32 rounded-full bg-magenta text-cream grid place-items-center text-4xl shadow-2xl group-hover:bg-acid group-hover:text-ink transition-colors">
            ▶
          </button>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-cream">
          <div>
            <div className="font-display italic text-3xl lg:text-5xl leading-none">A year inside the room.</div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] opacity-80">12 cities · 64 gatherings · 1 collective heartbeat</div>
          </div>
          <div className="hidden md:flex gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="bg-cream/15 backdrop-blur px-3 py-1.5 rounded-full border border-cream/30">16mm</span>
            <span className="bg-cream/15 backdrop-blur px-3 py-1.5 rounded-full border border-cream/30">Super 8</span>
            <span className="bg-cream/15 backdrop-blur px-3 py-1.5 rounded-full border border-cream/30">Field audio</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats() {
  const stats = [
    { n: "420+", k: "Members", sub: "Across 12 chapters", bg: "bg-magenta text-cream" },
    { n: "64", k: "Gatherings", sub: "Held in 2024 alone", bg: "bg-cobalt text-cream" },
    { n: "18", k: "Cities", sub: "From Beirut to Mexico City", bg: "bg-emerald text-cream" },
    { n: "212", k: "Collaborations", sub: "Sparked between members", bg: "bg-tangerine text-ink" },
  ];
  return (
    <section className="px-6 lg:px-10 max-w-[1400px] mx-auto pb-24 lg:pb-32">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h2 className="font-display text-3xl lg:text-5xl italic max-w-2xl">
          By the numbers — but the numbers are people.
        </h2>
        <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">As of spring '24</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} border-4 border-ink rounded-2xl p-6 lg:p-8 aspect-square flex flex-col justify-between hover:-rotate-1 transition-transform`}>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">No. {String(i+1).padStart(2,"0")}</span>
            <div>
              <div className="font-display text-6xl lg:text-7xl leading-none italic">{s.n}</div>
              <div className="mt-3 font-display text-xl">{s.k}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-80">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SPOTLIGHT (multiple creators) ---------------- */
function Spotlight() {
  const members = [
    { img: creator2, name: "Tomas Okafor", role: "Filmmaker · Lagos → Berlin", work: "16mm shorts on diaspora and memory", color: "bg-tangerine text-ink" },
    { img: creator3, name: "The Marseille darkroom", role: "Workshop · Salt & Grain residency", work: "Hands-on alt-process chemistry, weekly", color: "bg-magenta text-cream" },
    { img: creator4, name: "Hana Sato", role: "Photographer · Kyoto", work: "Forty years of street portraits, now mentoring", color: "bg-cobalt text-cream" },
  ];
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div>
          <span className="inline-block bg-emerald text-cream px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">Member spotlight</span>
          <h2 className="mt-5 font-display text-4xl lg:text-6xl italic">Faces of the collective.</h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 max-w-sm">
          A rotating cast of people, projects and chapters making the work that makes the room.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <article key={i} className={`group ${i === 1 ? "md:translate-y-8" : ""}`}>
            <div className="relative rounded-2xl overflow-hidden border-4 border-ink">
              <img src={m.img} alt={m.name} width={896} height={1152} loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className={`absolute top-4 left-4 ${m.color} font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-sm`}>
                No. {String(i+12).padStart(3,"0")}
              </span>
            </div>
            <div className="mt-5">
              <h3 className="font-display text-2xl lg:text-3xl italic leading-tight">{m.name}</h3>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink/60">{m.role}</div>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">{m.work}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [
    { n: "01", color: "bg-acid text-ink", title: "Send a letter, not a CV", body: "We read every application. Tell us what you're making, what haunts you, what you're trying to figure out." },
    { n: "02", color: "bg-cobalt text-cream", title: "A conversation, not an interview", body: "Two existing members meet you over coffee, a walk, or a video call. No tests, no decks." },
    { n: "03", color: "bg-magenta text-cream", title: "Your first gathering", body: "Show up. Bring something — a print, a rough cut, a question. The room takes it from there." },
    { n: "04", color: "bg-emerald text-cream", title: "Stay, and shape it", body: "After three months, you can pitch a workshop, host a screening, or start a chapter where you live." },
  ];
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-14">
        <div className="lg:col-span-5">
          <span className="inline-block bg-ink text-acid px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">How to join</span>
          <h2 className="mt-5 font-display text-4xl lg:text-6xl italic leading-[0.95]">
            Four steps, none of them a form.
          </h2>
        </div>
        <p className="lg:col-span-6 lg:col-start-7 text-lg leading-relaxed text-ink/80 self-end">
          We're not gatekeepers — we're curators of attention. Membership is sliding-scale, twice a year, and built around one principle: the people in the room decide who joins it.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (
          <div key={s.n} className="border-4 border-ink rounded-2xl bg-cream p-6 lg:p-7 flex flex-col gap-5 min-h-[18rem] hover:-translate-y-1 transition-transform">
            <div className={`${s.color} size-14 rounded-full grid place-items-center font-display text-2xl italic border-2 border-ink`}>{s.n}</div>
            <div>
              <h3 className="font-display text-2xl italic leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-semibold italic tracking-tight">
          <span className="inline-block size-3 rounded-full bg-magenta animate-pulse" />
          Pulse<span className="text-magenta">.</span>
        </a>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.22em] font-mono">
          <a href="#about" className="hover:text-magenta transition-colors">Manifesto</a>
          <a href="#events" className="hover:text-cobalt transition-colors">Gatherings</a>
          <a href="#creators" className="hover:text-emerald transition-colors">Creators</a>
          <a href="#journal" className="hover:text-tangerine transition-colors">Journal</a>
        </div>
        <a
          href="#apply"
          className="group inline-flex items-center gap-2 bg-magenta text-cream pl-4 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono font-medium hover:bg-ink transition-colors"
        >
          Apply
          <span className="size-6 rounded-full bg-cream text-magenta grid place-items-center text-base leading-none group-hover:bg-acid group-hover:text-ink transition-colors">→</span>
        </a>
      </div>
    </nav>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <header className="relative px-6 lg:px-10 pt-16 lg:pt-24 pb-24 max-w-[1400px] mx-auto">
      {/* floating color stickers */}
      <div className="absolute top-10 right-8 size-24 rounded-full bg-acid animate-float hidden md:block" style={{ ['--r' as any]: '-8deg' }} />
      <div className="absolute top-[55%] left-4 size-16 rounded-full bg-cobalt animate-float hidden md:block" style={{ animationDelay: '1.2s' }} />

      <p className="font-mono text-[11px] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
        <span className="inline-block w-10 h-px bg-ink" />
        Issue 04 · Spring Edition · Est. 2018
      </p>

      <h1 className="font-display font-semibold text-[clamp(3rem,9vw,9rem)] leading-[0.88] tracking-[-0.02em] text-balance reveal">
        A home for the{" "}
        <span className="italic text-magenta">image-makers</span>,
        <br className="hidden sm:block" />
        the{" "}
        <span className="relative inline-block">
          <span className="absolute inset-x-[-6%] inset-y-[10%] bg-acid -z-0 -rotate-1 rounded-sm" />
          <span className="relative z-10">midnight</span>
        </span>{" "}
        dreamers
        <br className="hidden sm:block" />
        and the{" "}
        <span className="italic text-cobalt">truth-tellers</span>.
      </h1>

      <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-5 reveal" style={{ animationDelay: '120ms' }}>
          <p className="text-lg lg:text-xl leading-relaxed text-ink/80 text-pretty max-w-[44ch]">
            Pulse is a global collective of filmmakers, photographers, artists and cultural makers — building screenings, workshops, residencies and a shared archive of the human gaze.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#apply"
              className="inline-flex items-center gap-3 bg-ink text-cream pl-6 pr-2 py-2 rounded-full text-sm font-medium hover:bg-magenta transition-colors"
            >
              Apply to Join
              <span className="size-9 rounded-full bg-acid text-ink grid place-items-center text-lg">↗</span>
            </a>
            <a href="#about" className="text-sm font-mono uppercase tracking-[0.2em] underline underline-offset-[6px] decoration-2 decoration-magenta hover:text-magenta">
              Read the manifesto
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 reveal" style={{ animationDelay: '260ms' }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-tangerine -z-10 rounded-[2rem] -rotate-1" />
            <img
              src={heroImg}
              alt="Filmmakers and artists gathered at a screening, warm projector light"
              width={1600}
              height={1200}
              className="w-full aspect-[4/3] object-cover rounded-[1.5rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
            />
            <div className="absolute -bottom-6 -left-6 bg-cream border-4 border-ink rounded-2xl px-5 py-3 rotate-[-4deg] shadow-lg">
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60">Now showing</div>
              <div className="font-display text-xl italic">Berlin · Vol. 12</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-magenta text-cream rounded-full size-28 grid place-items-center rotate-[12deg] font-mono text-[10px] uppercase tracking-widest text-center leading-tight shadow-lg">
              420+<br />makers<br />worldwide
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- MARQUEE ---------------- */
function CreditsMarquee() {
  const items = [
    "Directed by the community",
    "Founded 2018 · Berlin",
    "Open submissions year-round",
    "Non-profit cultural foundation",
    "12 chapters · 6 continents",
    "Always analog at heart",
  ];
  const Row = () => (
    <div className="flex shrink-0 gap-12 px-6 items-center font-mono text-[12px] uppercase tracking-[0.28em]">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-12">
          {t}
          <span className="inline-block size-2 rounded-full bg-acid" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="bg-cobalt text-cream py-5 overflow-hidden border-y-4 border-ink">
      <div className="flex animate-marquee w-max">
        <Row /><Row />
      </div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="py-28 lg:py-40 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7">
          <span className="inline-block bg-acid text-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] rotate-[-2deg]">
            About the Collective
          </span>
          <h2 className="mt-6 font-display text-5xl lg:text-7xl leading-[0.95] tracking-[-0.02em] text-balance">
            We don't believe in <span className="italic text-magenta">audiences</span>.<br />
            We believe in <span className="italic text-cobalt">accomplices</span>.
          </h2>
          <div className="mt-10 columns-1 md:columns-2 gap-12 text-base leading-relaxed text-ink/80">
            <p className="mb-6">
              Pulse began in a basement screening room with twelve chairs, a borrowed projector, and a stubborn refusal to flatten culture into content. Six years later, we're still that room — just bigger, louder, and with better coffee.
            </p>
            <p>
              We host gatherings, fund residencies, publish a quarterly journal, and protect physical space for analog, embodied, human storytelling. No algorithms. No engagement metrics. Just the heat of a shared room.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Members reviewing prints and zines around a wooden table"
              width={1200}
              height={1000}
              loading="lazy"
              className="w-full aspect-[5/4] object-cover rounded-2xl border-4 border-ink"
            />
            <div className="absolute -bottom-8 -right-4 bg-magenta text-cream rounded-2xl p-6 max-w-[14rem] rotate-[3deg] shadow-xl">
              <div className="font-display text-5xl leading-none">420+</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-90">Active members across 12 chapters</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PAST EVENTS ---------------- */
function PastEvents() {
  const events = [
    { title: "Vol. 11 — Neon Tokyo", date: "Mar 2024", bg: "bg-cobalt", fg: "text-cream", tag: "Screening" },
    { title: "Light Leaks Lisbon", date: "Feb 2024", bg: "bg-tangerine", fg: "text-ink", tag: "Workshop" },
    { title: "Salt & Grain — Marseille", date: "Nov 2023", bg: "bg-acid", fg: "text-ink", tag: "Residency" },
    { title: "Vol. 10 — Mexico City", date: "Sep 2023", bg: "bg-magenta", fg: "text-cream", tag: "Festival" },
    { title: "Darkroom Rituals IV", date: "Jul 2023", bg: "bg-emerald", fg: "text-cream", tag: "Workshop" },
    { title: "Ghosts on 16mm — NYC", date: "May 2023", bg: "bg-ink", fg: "text-acid", tag: "Screening" },
  ];
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <h2 className="font-display text-4xl lg:text-6xl italic">Previous gatherings</h2>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 max-w-sm">
          A contact sheet of recent screenings, workshops and residencies. Tap any card for the full archive.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((e, i) => (
          <a
            key={i}
            href="#"
            className={`group ${e.bg} ${e.fg} rounded-2xl p-6 lg:p-8 aspect-[4/5] flex flex-col justify-between border-4 border-ink hover:-translate-y-2 hover:rotate-[-1deg] transition-transform`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{e.tag}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{e.date}</span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mb-3">No. {String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-3xl lg:text-4xl leading-[0.95] italic">{e.title}</h3>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                Open recap
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HIGHLIGHTS ---------------- */
function Highlights() {
  return (
    <section className="bg-ink text-cream py-24 lg:py-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block bg-acid text-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">Highlights reel</span>
            <h2 className="mt-5 font-display text-4xl lg:text-6xl italic">From the cutting room floor.</h2>
          </div>
          <a href="#" className="hidden md:inline-flex font-mono text-[11px] uppercase tracking-[0.25em] underline underline-offset-[6px] decoration-acid hover:text-acid">View full archive →</a>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-[120px]">
          <div className="col-span-12 md:col-span-7 row-span-3 relative rounded-2xl overflow-hidden group">
            <img src={eventImg} alt="Outdoor film screening at night" width={1400} height={900} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <button className="absolute bottom-6 left-6 inline-flex items-center gap-3 bg-magenta text-cream pl-5 pr-2 py-2 rounded-full text-sm font-medium hover:bg-acid hover:text-ink transition-colors">
              Play recap
              <span className="size-8 rounded-full bg-cream text-magenta grid place-items-center">▶</span>
            </button>
            <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest bg-acid text-ink px-2 py-1">02:14</div>
          </div>
          <div className="col-span-6 md:col-span-5 row-span-2 bg-tangerine rounded-2xl p-6 flex flex-col justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/70">Field notes</span>
            <p className="font-display text-3xl italic text-ink leading-tight">"The projector hummed and the room held its breath."</p>
          </div>
          <div className="col-span-6 md:col-span-2 row-span-1 bg-acid rounded-2xl p-4 flex items-end">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Roll · 04A</span>
          </div>
          <div className="col-span-6 md:col-span-3 row-span-1 bg-magenta rounded-2xl p-4 flex flex-col justify-between text-cream">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">Audio</span>
            <span className="font-display text-xl italic">42 mins · panel</span>
          </div>
          <div className="col-span-12 md:col-span-5 row-span-2 bg-emerald rounded-2xl p-6 flex flex-col justify-between text-cream">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">Selected stills</span>
            <div className="grid grid-cols-3 gap-2">
              {[0,1,2,3,4,5].map(i => (
                <div key={i} className="aspect-square rounded-md bg-cream/15 backdrop-blur-sm" />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">94 frames archived</span>
          </div>
          <div className="col-span-6 md:col-span-4 row-span-1 bg-cobalt rounded-2xl p-4 flex items-end text-cream">
            <span className="font-display text-xl italic">Vol. 11 trailer →</span>
          </div>
          <div className="col-span-6 md:col-span-3 row-span-1 bg-cream rounded-2xl p-4 flex items-end text-ink">
            <span className="font-mono text-[10px] uppercase tracking-widest">12 chapters · live feed</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURED CREATOR ---------------- */
function FeaturedCreator() {
  return (
    <section id="creators" className="bg-emerald text-cream py-24 lg:py-40 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-3 bg-magenta rounded-[2rem] rotate-[-3deg] -z-10" />
          <img
            src={creatorImg}
            alt="Elena Roussel, cinematographer, behind a vintage camera"
            width={900}
            height={1200}
            loading="lazy"
            className="w-full aspect-[3/4] object-cover rounded-2xl border-4 border-ink"
          />
          <div className="absolute -bottom-6 -left-6 bg-acid text-ink rounded-full size-32 grid place-items-center font-mono text-[10px] uppercase tracking-widest text-center rotate-[-8deg] shadow-xl">
            Member<br/>Story<br/>No. 012
          </div>
        </div>
        <div className="lg:col-span-7">
          <span className="inline-block bg-cream text-emerald px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">Featured creator</span>
          <h2 className="mt-6 font-display text-4xl lg:text-6xl leading-[1] italic">
            Elena Roussel on the ethics of the gaze.
          </h2>
          <blockquote className="mt-10 font-display text-2xl lg:text-3xl leading-snug text-cream/90 italic">
            "The camera isn't a tool of capture — it's a tool of release. When we film, we're setting a moment free from the prison of memory."
          </blockquote>
          <div className="mt-10 flex flex-wrap gap-8 items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">Practice</div>
              <div className="font-display text-xl">Cinematographer · Marseille</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">Joined</div>
              <div className="font-display text-xl">2021 · Chapter SE</div>
            </div>
            <a href="#" className="ml-auto inline-flex items-center gap-2 bg-ink text-acid pl-5 pr-2 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-cream hover:text-emerald transition-colors">
              Read story
              <span className="size-7 rounded-full bg-acid text-ink grid place-items-center">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const quotes = [
    {
      bg: "bg-acid", fg: "text-ink",
      quote: "Pulse gave me permission to fail visually. I found my tribe in the shadows of a projection booth.",
      name: "Yara N.", role: "Photographer · Beirut",
    },
    {
      bg: "bg-tangerine", fg: "text-ink",
      quote: "Every gathering feels like a campfire with people who actually listen. I leave with twelve new ideas and three new collaborators.",
      name: "Kojo A.", role: "Documentary maker · Accra",
    },
    {
      bg: "bg-cobalt", fg: "text-cream",
      quote: "It's the closest thing to an art school I never went to — minus the tuition, plus the punk.",
      name: "Mira S.", role: "Visual artist · Mexico City",
    },
  ];
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between gap-6 mb-12">
        <h2 className="font-display text-4xl lg:text-6xl italic">From the room.</h2>
        <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">Voices of the collective</span>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {quotes.map((q, i) => (
          <figure
            key={i}
            className={`${q.bg} ${q.fg} rounded-2xl p-7 lg:p-9 border-4 border-ink flex flex-col justify-between min-h-[24rem] ${i % 2 ? "lg:translate-y-6" : ""}`}
          >
            <div className="font-display text-6xl leading-none italic">"</div>
            <blockquote className="font-display text-2xl lg:text-3xl leading-snug">{q.quote}</blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="size-10 rounded-full bg-ink text-cream grid place-items-center font-mono text-xs">{q.name[0]}</span>
              <div>
                <div className="font-semibold">{q.name}</div>
                <div className="text-xs opacity-80 font-mono uppercase tracking-widest">{q.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- JOURNAL ---------------- */
function Journal() {
  const articles = [
    { tag: "Perspective", tagBg: "bg-magenta text-cream", title: "The vanishing theater: why physical rooms still matter", read: "8 min read", date: "May 14" },
    { tag: "Technique", tagBg: "bg-cobalt text-cream", title: "Embracing error — the aesthetic of failed exposure", read: "6 min read", date: "Apr 30" },
    { tag: "Interview", tagBg: "bg-tangerine text-ink", title: "In conversation with Elara Vance on radical vulnerability", read: "12 min read", date: "Apr 18" },
  ];
  return (
    <section id="journal" className="bg-cream py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-14 gap-6">
        <h2 className="font-display text-4xl lg:text-6xl italic">The Journal</h2>
        <a href="#" className="font-mono text-[11px] uppercase tracking-[0.25em] underline underline-offset-[6px] decoration-magenta">All dispatches</a>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {articles.map((a, i) => (
          <article key={i} className="group cursor-pointer">
            <div className={`aspect-[4/3] rounded-2xl border-4 border-ink overflow-hidden relative ${i === 0 ? "bg-magenta" : i === 1 ? "bg-cobalt" : "bg-tangerine"}`}>
              <div className="absolute inset-0 grid place-items-center font-display italic text-cream/90 text-7xl">№{i + 1}</div>
              <div className="absolute top-4 left-4 bg-cream text-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest">{a.tag}</div>
            </div>
            <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ink/60">
              <span>{a.date}</span><span>·</span><span>{a.read}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl lg:text-3xl leading-tight text-balance group-hover:text-magenta transition-colors">
              {a.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- UPCOMING ---------------- */
function Upcoming() {
  const events = [
    { date: "Aug 24", time: "19:30", city: "Tokyo", title: "Visions of the Void — new wave shorts", host: "Curated by the Tokyo chapter", color: "bg-magenta text-cream" },
    { date: "Sep 02", time: "21:00", city: "Berlin", title: "Analogue Realism — a 16mm workshop", host: "Led by Elena Roussel", color: "bg-cobalt text-cream" },
    { date: "Oct 12", time: "18:00", city: "Lisbon", title: "Salt & Grain Vol. II — open submissions", host: "Open call for residency members", color: "bg-emerald text-cream" },
    { date: "Nov 04", time: "20:30", city: "Brooklyn", title: "Darkroom Rituals V", host: "Hands-on alternative chemistry", color: "bg-tangerine text-ink" },
  ];
  return (
    <section id="events" className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div>
          <span className="inline-block bg-magenta text-cream px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">Upcoming</span>
          <h2 className="mt-5 font-display text-4xl lg:text-6xl italic">Save these dates.</h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 max-w-sm">Admission via application or member RSVP. All proceeds fund residencies.</p>
      </div>
      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="group grid grid-cols-1 md:grid-cols-12 gap-0 border-4 border-ink rounded-2xl overflow-hidden bg-cream hover:rotate-[-0.3deg] transition-transform">
            <div className={`${e.color} md:col-span-3 p-6 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-dashed border-ink`}>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">{e.city}</span>
              <div>
                <div className="font-display text-4xl leading-none">{e.date}</div>
                <div className="font-mono text-xs uppercase tracking-widest mt-2 opacity-90">{e.time}</div>
              </div>
            </div>
            <div className="md:col-span-7 p-6 lg:p-8 flex flex-col justify-center">
              <h3 className="font-display text-2xl lg:text-3xl leading-tight">{e.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{e.host}</p>
            </div>
            <div className="md:col-span-2 p-6 flex items-center justify-center border-t-4 md:border-t-0 md:border-l-4 border-dashed border-ink bg-acid">
              <button className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium group-hover:underline underline-offset-4">
                Get ticket →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PARTNERS ---------------- */
function Partners() {
  const partners = ["Leica", "Kodak Professional", "MUBI", "Aperture", "Ilford", "Criterion", "Magnum Photos", "A24"];
  const Row = () => (
    <div className="flex shrink-0 gap-16 px-8 items-center">
      {partners.map((p, i) => (
        <span key={i} className="font-display italic text-4xl text-ink shrink-0">{p}</span>
      ))}
    </div>
  );
  return (
    <section className="bg-acid border-y-4 border-ink py-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70">In good company · partners & collaborators</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/70">Year 06</span>
      </div>
      <div className="flex animate-marquee-slow w-max">
        <Row /><Row />
      </div>
    </section>
  );
}

/* ---------------- MEMBERSHIP CTA ---------------- */
function MembershipCTA() {
  return (
    <section id="apply" className="bg-magenta text-cream py-32 lg:py-48 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 size-96 rounded-full bg-acid mix-blend-screen opacity-60" />
      <div className="absolute -bottom-32 -left-20 size-[28rem] rounded-full bg-cobalt mix-blend-multiply opacity-40" />
      <div className="relative max-w-[1100px] mx-auto text-center">
        <span className="inline-block bg-acid text-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">Membership · Winter Cohort</span>
        <h2 className="mt-8 font-display text-[clamp(4rem,12vw,12rem)] leading-[0.85] italic tracking-tight">
          Belong<span className="text-acid">.</span>
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-lg lg:text-xl text-cream/90">
          We accept applications twice a year. We look for intent, curiosity, and a distinct perspective on the world. Tuition is sliding-scale; the only requirement is you bring your gaze.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="#" className="inline-flex items-center gap-3 bg-ink text-acid pl-7 pr-2 py-3 rounded-full text-base font-medium hover:bg-cream hover:text-magenta transition-colors">
            Submit application
            <span className="size-10 rounded-full bg-acid text-ink grid place-items-center text-lg">↗</span>
          </a>
          <a href="#" className="inline-flex items-center gap-3 border-2 border-cream text-cream pl-6 pr-6 py-3 rounded-full text-base font-medium hover:bg-cream hover:text-magenta transition-colors">
            Download the prospectus
          </a>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
          {[
            { k: "Apply by", v: "Sep 30, 2024" },
            { k: "Cohort starts", v: "Nov 04, 2024" },
            { k: "Members", v: "60 selected" },
            { k: "Tuition", v: "Pay-what-you-can" },
          ].map((s, i) => (
            <div key={i} className="border-t border-cream/40 pt-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cream/70">{s.k}</div>
              <div className="mt-1 font-display text-xl italic">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-ink text-cream/70 pt-24 pb-10 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="size-3 rounded-full bg-magenta animate-pulse" />
              <span className="font-display text-3xl italic text-cream">Pulse<span className="text-magenta">.</span></span>
            </div>
            <p className="max-w-md text-sm leading-relaxed">
              A non-profit cultural community for filmmakers, photographers, artists and storytellers. Built in twelve cities by the people inside it.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              {["Instagram","Vimeo","Substack","Letterboxd","Are.na"].map(s => (
                <a key={s} href="#" className="border border-cream/30 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest hover:bg-acid hover:text-ink hover:border-acid transition-colors">{s}</a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <h4 className="text-cream font-mono text-[10px] uppercase tracking-[0.25em] mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-acid">Manifesto</a></li>
                <li><a href="#creators" className="hover:text-acid">Members</a></li>
                <li><a href="#" className="hover:text-acid">Chapters</a></li>
                <li><a href="#" className="hover:text-acid">Code of conduct</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cream font-mono text-[10px] uppercase tracking-[0.25em] mb-4">Programs</h4>
              <ul className="space-y-2">
                <li><a href="#events" className="hover:text-acid">Gatherings</a></li>
                <li><a href="#" className="hover:text-acid">Residencies</a></li>
                <li><a href="#" className="hover:text-acid">Open calls</a></li>
                <li><a href="#journal" className="hover:text-acid">Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-cream font-mono text-[10px] uppercase tracking-[0.25em] mb-4">Newsletter</h4>
              <p className="text-xs mb-3">Quarterly dispatch. No tracking, no algorithms.</p>
              <form className="flex border border-cream/30 rounded-full overflow-hidden focus-within:border-acid">
                <input type="email" placeholder="you@studio" className="bg-transparent flex-1 px-4 py-2 text-xs placeholder:text-cream/40 focus:outline-none" />
                <button className="bg-acid text-ink px-4 text-xs font-mono uppercase tracking-widest">Send</button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-cream/15 flex flex-col md:flex-row gap-4 justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-cream/40">
          <span>© 2024 Pulse Collective · A non-profit cultural foundation</span>
          <span>Recorded on location: Earth</span>
        </div>
      </div>
    </footer>
  );
}
