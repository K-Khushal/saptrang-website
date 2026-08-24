import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { events, pastEvents, type PulseEvent } from "@/lib/events-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Gatherings — Pulse" },
      { name: "description", content: "Upcoming screenings, workshops, residencies and gatherings from the Pulse collective." },
      { property: "og:title", content: "Gatherings — Pulse" },
      { property: "og:description", content: "Upcoming screenings, workshops, residencies and gatherings from the Pulse collective." },
    ],
  }),
  component: EventsPage,
});

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Data ─── */

const featuredEvent = events[0];
const upcomingEvents = events.slice(1);


/* ─── Page ─── */

function EventsPage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-20">
        {/* Masthead */}
        <header className="reveal-on-scroll">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink" />
            Gatherings · 2024 Season
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-balance">
            Where we <span className="italic text-magenta">meet</span>,<br />
            where we <span className="italic text-cobalt">make</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Screenings, workshops, residencies and informal meetups across 12 chapters. No tickets. Just RSVP and show up.
          </p>
        </header>

        {/* Featured */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <FeaturedCard event={featuredEvent} />
        </section>

        {/* Upcoming list */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl lg:text-5xl italic">Coming up</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">{upcomingEvents.length} gatherings</span>
          </div>
          <div className="flex flex-col">
            {upcomingEvents.map((e, i) => (
              <EventRow key={e.id} event={e} first={i === 0} />
            ))}
          </div>
        </section>

        {/* Past — contact sheet */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl lg:text-5xl italic">Previous gatherings</h2>
            <a href="#" className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 decoration-magenta hover:text-magenta">
              View archive
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {pastEvents.map((e, i) => (
              <PastCard key={i} event={e} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="bg-ink text-cream rounded-3xl p-8 lg:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Host a gathering</p>
              <h2 className="mt-4 font-display text-4xl lg:text-6xl leading-[0.95]">
                Have a space?<br />
                <span className="italic text-acid">Propose an event.</span>
              </h2>
              <p className="mt-4 max-w-md text-cream/70 leading-relaxed">
                All gatherings are member-proposed and member-hosted. If you have access to a screen, a darkroom, or just a living room with good light, pitch it.
              </p>
            </div>
            <button className="shrink-0 inline-flex items-center gap-3 bg-acid text-ink pl-6 pr-2 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors">
              Pitch an event
              <span className="size-9 rounded-full bg-ink text-acid grid place-items-center text-lg">↗</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Nav (matches landing) ─── */

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
    { href: "/events", label: "Gatherings", active: true },
    { href: "/gallery", label: "Gallery" },
    { href: "/membership", label: "Membership" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-semibold italic tracking-tight">
            <span className="inline-block size-3 rounded-full bg-magenta animate-pulse" />
            Pulse<span className="text-magenta">.</span>
          </Link>

          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.22em] font-mono">
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

/* ─── Featured Card ─── */

function FeaturedCard({ event }: { event: PulseEvent }) {
  const [rsvp, setRsvp] = useState(false);

  return (
    <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border-4 border-ink">
      <div className={`${event.color} text-cream p-8 lg:p-12 flex flex-col justify-between`}>
        <div>
          <span className="inline-block bg-cream text-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] rotate-[-2deg]">
            Featured
          </span>
          <Link to="/events/$slug" params={{ slug: event.slug }}>
            <h3 className="mt-6 font-display text-4xl lg:text-6xl leading-[0.95] italic hover:opacity-80 transition-opacity">{event.title}</h3>
          </Link>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">{event.subtitle}</p>
        </div>
        <div className="mt-10 space-y-3 font-mono text-[11px] uppercase tracking-[0.18em] opacity-90">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            {event.doors}
          </div>
        </div>
      </div>

      <div className="bg-cream p-8 lg:p-12 flex flex-col justify-between">
        <p className="text-lg leading-relaxed text-ink/80">{event.description}</p>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <button
            onClick={() => setRsvp((v) => !v)}
            className={`inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-sm font-medium transition-colors ${rsvp ? "bg-emerald text-cream" : "bg-ink text-cream hover:bg-magenta"}`}
          >
            {rsvp ? "You're on the list" : "RSVP"}
            <span className={`size-9 rounded-full grid place-items-center text-lg ${rsvp ? "bg-cream text-emerald" : "bg-acid text-ink"}`}>
              {rsvp ? "✓" : "→"}
            </span>
          </button>
          <Link
            to="/events/$slug"
            params={{ slug: event.slug }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] underline underline-offset-4 decoration-magenta hover:text-magenta"
          >
            Full details
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Event Row ─── */

function EventRow({ event, first }: { event: PulseEvent; first: boolean }) {
  return (
    <Link
      to="/events/$slug"
      params={{ slug: event.slug }}
      className={`py-7 ${first ? "" : "border-t border-ink/10"} flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 group`}
    >
      <div className="flex items-center gap-4 shrink-0 lg:w-48">
        <span className={`grid size-10 place-items-center rounded-full ${event.color} ${event.color === "bg-acid" ? "text-ink" : "text-cream"} text-sm font-medium`}>
          {event.type[0]}
        </span>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">{event.type}</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em]">{event.dateShort}</p>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-2xl lg:text-3xl italic leading-tight group-hover:text-magenta transition-colors">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-ink/60 leading-relaxed max-w-lg">{event.brief}</p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50 flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          {event.location}
        </span>
        <span className="size-10 rounded-full border border-ink/10 grid place-items-center group-hover:bg-ink group-hover:text-cream transition-colors">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}


/* ─── Past Card ─── */

function PastCard({ event, index }: { event: typeof pastEvents[0]; index: number }) {
  return (
    <a
      href="#"
      className={`group ${event.color} rounded-2xl p-5 lg:p-7 aspect-[4/5] flex flex-col justify-between border-4 border-ink hover:-translate-y-2 hover:rotate-[-1deg] transition-transform`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{event.type}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{event.date}</span>
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mb-3">No. {String(index + 1).padStart(2, "0")}</div>
        <h3 className="font-display text-3xl lg:text-4xl leading-[0.95] italic">{event.title}</h3>
        <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-90">
          Open recap
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </a>
  );
}

/* ─── Footer (matches landing) ─── */

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
                <li><Link to="/community" className="hover:text-acid transition-colors">Community</Link></li>
                <li><Link to="/events" className="hover:text-acid transition-colors">Gatherings</Link></li>
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
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-cream/40 font-mono uppercase tracking-widest">
          <span>© Pulse Collective · Est. 2018</span>
          <span>Made with patience in Berlin & Mumbai</span>
        </div>
      </div>
    </footer>
  );
}
