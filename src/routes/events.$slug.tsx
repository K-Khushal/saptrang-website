import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Clock, Ticket, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { events, getEvent } from "@/lib/events-data";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Gathering not found — Pulse" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    const desc = `${event.date} · ${event.venue}. ${event.brief}`;
    return {
      meta: [
        { title: `${event.title} — Pulse Gatherings` },
        { name: "description", content: desc },
        { property: "og:title", content: `${event.title} — Pulse Gatherings` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: MissingEvent,
  component: EventDetailPage,
});

function useScrollReveal(dep?: string) {
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
            el.style.transitionDelay = `${el.dataset.revealDelay ?? "0"}ms`;
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  useScrollReveal(event.slug);
  const [rsvp, setRsvp] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  const others = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  const toneMap = {
    magenta: "border-magenta/40 bg-magenta/5 text-magenta",
    tangerine: "border-tangerine/40 bg-tangerine/5 text-tangerine",
    cobalt: "border-cobalt/40 bg-cobalt/5 text-cobalt",
  } as const;

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      {/* Cover strip */}
      <div className="relative">
        <div className="h-[38vh] min-h-[220px] lg:h-[46vh] w-full overflow-hidden bg-ink">
          <img
            src={event.cover}
            alt={`${event.title} — ${event.subtitle}`}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-cream" />
        </div>

        {/* Title card */}
        <div className="max-w-[1100px] mx-auto px-5 lg:px-10 -mt-16 lg:-mt-24 relative">
          <div className="bg-cream border-4 border-ink rounded-3xl p-6 lg:p-10 reveal-on-scroll">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-block ${event.color} ${event.color === "bg-acid" ? "text-ink" : "text-cream"} px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] rotate-[-2deg]`}>
                {event.type}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                {event.status === "featured" ? "Featured gathering" : "Coming up"}
              </span>
            </div>
            <h1 className="mt-5 font-display font-semibold text-[clamp(2.1rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] italic text-balance">
              {event.title}
            </h1>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/60">{event.subtitle}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
              <span className="flex items-center gap-2"><Calendar className="size-3.5" />{event.date}</span>
              <span className="flex items-center gap-2"><Clock className="size-3.5" />{event.doors}</span>
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-5 lg:px-10 pt-8 lg:pt-12 pb-16 lg:pb-24">
        {/* Fact row */}
        <section className="grid sm:grid-cols-3 border-y border-ink/15 reveal-on-scroll">
          <Fact label="When" value={event.dateShort} sub={event.doors} />
          <Fact label="Where" value={event.location} sub={event.venue} border />
          <Fact label="Cost" value={event.cost.split("·")[0].trim()} sub={event.cost} border />
        </section>

        <div className="mt-10 lg:mt-14 grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
          {/* Body */}
          <div className="min-w-0 space-y-12 lg:space-y-16">
            <section className="reveal-on-scroll">
              <p className="text-lg lg:text-xl leading-relaxed text-ink/80 max-w-2xl">{event.description}</p>
            </section>

            <Block title="Who it's for">
              <ul className="space-y-2 text-ink/75 leading-relaxed">
                {event.whoFor.map((w) => (
                  <li key={w} className="flex gap-3">
                    <span className={`mt-2.5 size-1.5 rounded-full shrink-0 ${event.color}`} />
                    {w}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="The order of the night">
              <ol className="space-y-2 text-ink/75 leading-relaxed">
                {event.order.map((o, i) => (
                  <li key={o} className="flex gap-4">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40 pt-1">{String(i + 1).padStart(2, "0")}</span>
                    {o}
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Schedule">
              <div className="rounded-2xl overflow-hidden bg-ink text-cream">
                <div className="grid grid-cols-[90px_1fr_90px] lg:grid-cols-[120px_1fr_120px] px-4 lg:px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 border-b border-cream/10">
                  <span>Time</span><span>What</span><span className="text-right">Where</span>
                </div>
                {event.schedule.map((s) => (
                  <div
                    key={s.time + s.what}
                    className="grid grid-cols-[90px_1fr_90px] lg:grid-cols-[120px_1fr_120px] px-4 lg:px-6 py-4 border-b border-cream/10 last:border-0 items-baseline hover:bg-cream/5 transition-colors"
                  >
                    <span className="font-mono text-[11px] tracking-[0.12em] text-acid">{s.time}</span>
                    <span className="text-sm text-cream/85">{s.what}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45 text-right">{s.where}</span>
                  </div>
                ))}
              </div>
            </Block>

            <section className="reveal-on-scroll rounded-2xl border border-emerald/40 bg-emerald/5 p-5 lg:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald">What to bring</p>
              <ul className="mt-4 space-y-2 text-ink/75 leading-relaxed text-sm">
                {event.bring.map((b) => (
                  <li key={b} className="flex gap-3"><span className="text-emerald">·</span>{b}</li>
                ))}
              </ul>
            </section>

            <Block title="Before you come">
              <ul className="space-y-1">
                {event.before.map((b, i) => {
                  const on = checked.includes(i);
                  return (
                    <li key={b}>
                      <button
                        onClick={() => setChecked((c) => (on ? c.filter((x) => x !== i) : [...c, i]))}
                        className="w-full text-left flex items-start gap-3 py-2.5 group"
                      >
                        <span className={`mt-0.5 size-5 shrink-0 rounded-md border grid place-items-center transition-colors ${on ? "bg-ink border-ink text-cream" : "border-ink/25 group-hover:border-ink/60"}`}>
                          {on && <Check className="size-3.5" />}
                        </span>
                        <span className={`text-sm leading-relaxed transition-colors ${on ? "text-ink/40 line-through" : "text-ink/75"}`}>{b}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Block>

            <section className="reveal-on-scroll grid gap-4">
              {event.notices.map((n) => (
                <div key={n.label} className={`rounded-2xl border p-5 ${toneMap[n.tone]}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em]">{n.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{n.body}</p>
                </div>
              ))}
            </section>

            <Block title="The room">
              <div className="grid gap-4">
                <figure className="rounded-2xl overflow-hidden">
                  <img src={event.gallery[0].src} alt={event.gallery[0].caption} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                  <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">{event.gallery[0].caption}</figcaption>
                </figure>
                <div className="grid grid-cols-2 gap-4">
                  {event.gallery.slice(1).map((g) => (
                    <figure key={g.caption} className="rounded-2xl overflow-hidden">
                      <img src={g.src} alt={g.caption} loading="lazy" className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700" />
                      <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">{g.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Block>

            <blockquote className="reveal-on-scroll border-l-4 border-magenta pl-6 font-display text-2xl lg:text-3xl italic leading-snug text-ink/85">
              {event.quote}
            </blockquote>
          </div>

          {/* Sticky ticket rail */}
          <aside className="lg:sticky lg:top-24 reveal-on-scroll">
            <div className="bg-ink text-cream rounded-3xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/45">Attend</p>
              <p className="mt-3 font-display text-3xl italic">{event.doors.split("·")[0].trim()}</p>
              <p className="mt-1 text-sm text-cream/60">{event.cost}</p>

              <button
                onClick={() => setRsvp((v) => !v)}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition-colors ${rsvp ? "bg-emerald text-cream" : "bg-magenta text-cream hover:bg-acid hover:text-ink"}`}
              >
                {rsvp ? <><Check className="size-4" /> You're on the list</> : <><Ticket className="size-4" /> Register</>}
              </button>

              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                {event.spots} spots left
              </p>

              <div className="mt-6 pt-5 border-t border-cream/10 space-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60">
                <p className="flex items-start gap-2"><Calendar className="size-3.5 mt-px shrink-0" />{event.date}</p>
                <p className="flex items-start gap-2"><MapPin className="size-3.5 mt-px shrink-0" />{event.venue}</p>
              </div>
            </div>

            <Link
              to="/events"
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55 hover:text-magenta transition-colors"
            >
              <ArrowLeft className="size-3.5" /> All gatherings
            </Link>
          </aside>
        </div>

        {/* More */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <h2 className="font-display text-3xl lg:text-4xl italic">Also happening</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/events/$slug"
                params={{ slug: o.slug }}
                className={`group ${o.color} ${o.color === "bg-acid" ? "text-ink" : "text-cream"} rounded-2xl p-5 border-4 border-ink aspect-[4/3] flex flex-col justify-between hover:-translate-y-2 hover:rotate-[-1deg] transition-transform`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{o.type} · {o.dateShort}</span>
                <div>
                  <h3 className="font-display text-2xl italic leading-tight">{o.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-90">
                    Open <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Fact({ label, value, sub, border }: { label: string; value: string; sub: string; border?: boolean }) {
  return (
    <div className={`py-5 sm:py-6 sm:px-6 first:sm:pl-0 ${border ? "sm:border-l border-ink/15 border-t sm:border-t-0" : ""}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">{label}</p>
      <p className="mt-2 font-display text-xl italic">{value}</p>
      <p className="mt-1 text-xs text-ink/55 leading-relaxed">{sub}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal-on-scroll">
      <h2 className="font-display text-2xl lg:text-3xl italic mb-5">{title}</h2>
      {children}
    </section>
  );
}

function MissingEvent() {
  return (
    <div className="min-h-screen bg-cream text-ink font-body flex flex-col">
      <Nav />
      <div className="flex-1 grid place-items-center px-5 text-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50">404</p>
          <h1 className="mt-4 font-display text-4xl lg:text-6xl italic">That gathering has moved on.</h1>
          <Link to="/events" className="mt-8 inline-flex items-center gap-2 bg-ink text-cream pl-6 pr-2 py-2 rounded-full text-sm hover:bg-magenta transition-colors">
            See all gatherings <span className="size-9 rounded-full bg-acid text-ink grid place-items-center text-lg">→</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ─── Nav (matches site) ─── */

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
              <Link key={l.href} to={l.href} className={`transition-colors ${l.active ? "text-ink" : "hover:text-magenta text-ink/60"}`}>
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

/* ─── Footer (matches site) ─── */

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
