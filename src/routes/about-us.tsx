import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About — Pulse" },
      { name: "description", content: "The story behind Pulse: a global collective of filmmakers, photographers, artists and cultural makers." },
      { property: "og:title", content: "About — Pulse" },
      { property: "og:description", content: "The story behind Pulse: a global collective of filmmakers, photographers, artists and cultural makers." },
    ],
  }),
  component: AboutPage,
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

/* ─── Page ─── */

function AboutPage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-20">
        {/* Masthead */}
        <header className="reveal-on-scroll">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink" />
            About the Collective
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-balance">
            We started in a <span className="italic text-magenta">basement</span>.<br />
            We&apos;re still that <span className="italic text-cobalt">room</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Pulse is a non-profit cultural foundation building physical space for analog, embodied, human storytelling. No algorithms. No engagement metrics. Just the heat of a shared room.
          </p>
        </header>

        {/* Origin story */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-acid -z-10 rounded-[2rem] rotate-[1deg]" />
                <div className="w-full aspect-[4/5] bg-ink rounded-[1.5rem] border-4 border-ink flex items-center justify-center overflow-hidden">
                  <div className="text-cream text-center p-8">
                    <div className="font-display text-6xl italic leading-none">2018</div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">Berlin · Kreuzberg</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-cream border-4 border-ink rounded-2xl px-5 py-3 rotate-[-4deg] shadow-lg">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/60">First screening</div>
                  <div className="font-display text-xl italic">Twelve chairs</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="inline-block bg-tangerine text-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] rotate-[-2deg]">
                Origin
              </span>
              <h2 className="mt-6 font-display text-4xl lg:text-5xl leading-[0.95] tracking-[-0.02em] text-balance">
                A borrowed projector.<br />
                A stubborn <span className="italic text-magenta">refusal</span> to flatten culture into content.
              </h2>
              <div className="mt-6 lg:mt-10 space-y-6 text-base leading-relaxed text-ink/80 max-w-[52ch]">
                <p>
                  Pulse began in a basement screening room in Kreuzberg with twelve chairs, a borrowed projector, and a conviction that the best way to experience film is shoulder-to-shoulder with strangers who become friends.
                </p>
                <p>
                  Six years later, we are twelve chapters across six continents. We still hand-print zines, screen on 16mm, and argue about framing until the cafe kicks us out. The only thing that changed is we have better coffee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl lg:text-5xl italic">What we believe</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">Three principles</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                num: "01",
                title: "Physical space is sacred",
                body: "We do not livestream. We do not record. What happens in the room stays in the room — and in the memory of the people who were there.",
                color: "bg-cobalt",
              },
              {
                num: "02",
                title: "Process over product",
                body: "We fund incomplete work, rough cuts, and experiments that might fail. The journey of making is as important as what gets made.",
                color: "bg-magenta",
              },
              {
                num: "03",
                title: "Community is infrastructure",
                body: "Editors need sound designers. Photographers need darkrooms. Poets need listeners. We are the connective tissue between makers.",
                color: "bg-emerald",
              },
            ].map((v) => (
              <div key={v.num} className="border-t-4 border-ink pt-6">
                <span className={`inline-block ${v.color} text-cream rounded-full size-10 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em] mb-6`}>
                  {v.num}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl italic leading-tight">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curators */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl lg:text-5xl italic">The curators</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">Core team</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Lena Voss", role: "Founder & Director", city: "Berlin", color: "bg-magenta" },
              { name: "Ravi Menon", role: "Programme Curator", city: "Mumbai", color: "bg-cobalt" },
              { name: "Sofia Cruz", role: "Residencies Lead", city: "Lisbon", color: "bg-tangerine" },
              { name: "Jonas Park", role: "Editor-in-Chief", city: "Seoul", color: "bg-emerald" },
            ].map((p) => (
              <div key={p.name} className="group">
                <div className={`${p.color} aspect-[3/4] rounded-2xl border-4 border-ink flex flex-col justify-between p-5 text-cream`}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{p.city}</span>
                  <div>
                    <h3 className="font-display text-2xl italic leading-tight">{p.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] opacity-80">{p.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="bg-acid text-ink rounded-3xl p-8 lg:p-14 border-4 border-ink">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[
                { figure: "420+", label: "Active members" },
                { figure: "12", label: "Chapters worldwide" },
                { figure: "06", label: "Continents reached" },
                { figure: "∞", label: "Stories shared" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-5xl lg:text-6xl italic leading-none">{s.figure}</div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="bg-ink text-cream rounded-3xl p-8 lg:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Join the room</p>
              <h2 className="mt-4 font-display text-4xl lg:text-6xl leading-[0.95]">
                Belong to something<br />
                <span className="italic text-acid">analog.</span>
              </h2>
              <p className="mt-4 max-w-md text-cream/70 leading-relaxed">
                Membership is open year-round. We review applications in monthly cohorts. No portfolio required — just curiosity and a willingness to show up.
              </p>
            </div>
            <Link
              to="/auth"
              className="shrink-0 inline-flex items-center gap-3 bg-acid text-ink pl-6 pr-2 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors"
            >
              Apply to Join
              <span className="size-9 rounded-full bg-ink text-acid grid place-items-center text-lg">↗</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Nav ─── */

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About", active: true },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Gatherings" },
    { href: "/gallery", label: "Gallery" },
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

/* ─── Footer ─── */

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
                <li><Link to="/about-us" className="hover:text-acid transition-colors">About</Link></li>
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
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
            &copy; {new Date().getFullYear()} Pulse Collective. Non-profit cultural foundation.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
            Made with heat, not algorithms.
          </p>
        </div>
      </div>
    </footer>
  );
}
