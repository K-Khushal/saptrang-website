import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — Pulse" },
      { name: "description", content: "Join the Pulse Creators Community. Create. Connect. Collaborate. Contribute." },
      { property: "og:title", content: "Membership — Pulse" },
      { property: "og:description", content: "Join the Pulse Creators Community. Create. Connect. Collaborate. Contribute." },
    ],
  }),
  component: MembershipPage,
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

function MembershipPage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-20">
        {/* Masthead */}
        <header className="reveal-on-scroll">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink" />
            Creators Community
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-balance">
            Why join the<br />
            <span className="italic text-magenta">creators</span>{" "}
            <span className="italic text-cobalt">community</span>?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
            Because creators are not just content makers. They are storytellers, educators, innovators and changemakers shaping the future of Bharat.
          </p>
        </header>

        {/* The 4 Cs */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="bg-ink text-cream rounded-3xl p-8 lg:p-14 border-4 border-ink">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[
                { letter: "C", word: "Create", desc: "Bring your vision to life with tools, space and support." },
                { letter: "C", word: "Connect", desc: "Meet collaborators who complement your craft." },
                { letter: "C", word: "Collaborate", desc: "Build projects that no one could make alone." },
                { letter: "C", word: "Contribute", desc: "Give back, mentor others and grow the ecosystem." },
              ].map((item, i) => (
                <div key={item.word} className="text-center lg:text-left" data-reveal-delay={i * 100}>
                  <div className="font-display text-5xl lg:text-6xl italic text-acid leading-none">{item.letter}</div>
                  <div className="mt-2 font-display text-xl lg:text-2xl italic">{item.word}</div>
                  <p className="mt-3 text-sm text-cream/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we offer */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="flex items-baseline justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl lg:text-5xl italic">What we offer</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">Four pillars</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Creator Network",
                body: "Connect with creators from diverse fields and collaborate on meaningful projects. Our network spans filmmakers, photographers, writers, sound artists and cultural makers across twelve chapters.",
                color: "bg-cobalt",
                num: "01",
              },
              {
                title: "Learning & Growth",
                body: "Masterclasses, workshops, panel discussions and expert sessions led by practitioners who have been where you want to go. Learn by doing, not just watching.",
                color: "bg-magenta",
                num: "02",
              },
              {
                title: "Recognition",
                body: "Awards, showcases and opportunities to highlight creative excellence. We believe great work deserves to be seen — by peers, by industry and by the world.",
                color: "bg-tangerine",
                num: "03",
              },
              {
                title: "Opportunities",
                body: "Brand collaborations, speaking opportunities and community initiatives. We open doors so you can walk through them on your own terms.",
                color: "bg-emerald",
                num: "04",
              },
            ].map((card) => (
              <div key={card.num} className="group border-t-4 border-ink pt-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span className={`inline-block ${card.color} text-cream rounded-full size-10 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em]`}>
                    {card.num}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Member benefit</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl italic leading-tight">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="bg-acid text-ink rounded-3xl p-8 lg:p-14 border-4 border-ink">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[
                { figure: "420+", label: "Active creators" },
                { figure: "12", label: "Chapters across Bharat" },
                { figure: "50+", label: "Workshops a year" },
                { figure: "∞", label: "Collaborations born" },
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
          <div className="bg-magenta text-cream rounded-3xl p-8 lg:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Open all year</p>
              <h2 className="mt-4 font-display text-4xl lg:text-6xl leading-[0.95]">
                Ready to<br />
                <span className="italic text-acid">create together</span>?
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
    { href: "/about-us", label: "About" },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Gatherings" },
    { href: "/gallery", label: "Gallery" },
    { href: "/membership", label: "Membership", active: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl font-semibold italic tracking-tight">
            <span className="inline-block size-3 rounded-full bg-magenta animate-pulse" />
            Pulse<span className="text-magenta">.</span>
          </Link>

          <div className="hidden md:flex gap-7 text-[11px] uppercase tracking-[0.22em] font-mono">
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
                <li><Link to="/gallery" className="hover:text-acid transition-colors">Gallery</Link></li>
                <li><Link to="/membership" className="hover:text-acid transition-colors">Membership</Link></li>
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
