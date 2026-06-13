import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Membership Card — Pulse" },
      { name: "description", content: "Your Pulse membership card — a small, beautiful object that says you belong in the room." },
      { property: "og:title", content: "Membership Card — Pulse" },
      { property: "og:description", content: "Your Pulse membership card — a small, beautiful object that says you belong in the room." },
    ],
  }),
  component: ProfilePage,
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

const member = {
  name: "Riya Sharma",
  handle: "@riyas",
  role: "Community Member",
  memberId: "PLS-00124",
  since: "2024",
  validThru: "05 / 2027",
  city: "Mumbai",
  tagline: "Seven colors. One room.",
};

const palette = [
  { name: "cobalt", cls: "bg-cobalt" },
  { name: "tangerine", cls: "bg-tangerine" },
  { name: "acid", cls: "bg-acid" },
  { name: "magenta", cls: "bg-magenta" },
  { name: "emerald", cls: "bg-emerald" },
  { name: "cream", cls: "bg-cream border border-ink/20" },
  { name: "ink", cls: "bg-ink" },
];

function ProfilePage() {
  useScrollReveal();
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-16 pb-24">
        {/* Masthead */}
        <header className="reveal-on-scroll">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink" />
            Profile · No. 047
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
            Your <span className="italic text-magenta">card</span>.<br />
            A small, beautiful <span className="italic text-cobalt">object</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
            Not a profile page. A keepsake. Flip it, share it, keep it in the inside pocket of the jacket you actually wear.
          </p>
        </header>

        {/* Card stage */}
        <section className="mt-14 lg:mt-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Card */}
          <div className="lg:col-span-7 reveal-on-scroll" data-reveal-delay="80">
            <div className="relative" style={{ perspective: "1800px" }}>
              {/* Soft floor */}
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-acid/40 via-transparent to-cobalt/20 blur-2xl opacity-70" />

              <div
                className="relative w-full aspect-[16/10] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `${mounted ? "rotateX(0) translateY(0)" : "rotateX(-14deg) translateY(40px)"} ${flipped ? "rotateY(180deg)" : "rotateY(0deg)"}`,
                  opacity: mounted ? 1 : 0,
                  transition: "transform 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 rounded-[1.75rem] bg-cream border border-ink/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] overflow-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Brush shape */}
                  <svg
                    aria-hidden
                    viewBox="0 0 600 380"
                    className="absolute -right-10 -top-10 w-[72%] h-[140%] text-cobalt"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M520 -10 C 420 60, 360 160, 380 260 C 400 360, 520 420, 640 420 L 700 -10 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M560 30 C 470 110, 430 200, 470 280"
                      stroke="rgba(0,0,0,0.15)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute top-6 right-6 size-5 rounded-full bg-tangerine" />

                  {/* Header */}
                  <div className="relative p-7 lg:p-9 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-display text-lg font-semibold italic tracking-tight">
                      <span className="inline-block size-2.5 rounded-full bg-magenta" />
                      Pulse<span className="text-magenta">.</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60 text-right leading-tight">
                      Community<br />Member
                    </span>
                  </div>

                  {/* Name */}
                  <div className="relative px-7 lg:px-9 mt-2 lg:mt-4">
                    <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.75rem)] leading-[0.95] tracking-[-0.02em]">
                      {member.name}
                    </h2>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/60">
                      Member Since {member.since}
                    </p>
                    <p className="mt-5 font-mono text-sm text-magenta tracking-wider">{member.memberId}</p>
                  </div>

                  {/* Footer */}
                  <div className="absolute bottom-0 inset-x-0 px-7 lg:px-9 pb-6 flex items-end justify-between gap-4">
                    <p className="font-display italic text-ink/70 text-[15px]">{member.tagline}</p>
                    <div className="flex items-center gap-1.5">
                      {palette.map((p) => (
                        <span key={p.name} className={`size-2.5 rounded-full ${p.cls}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 rounded-[1.75rem] bg-ink text-cream border border-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="grid grid-cols-[auto_1fr] h-full">
                    {/* QR side */}
                    <div className="bg-cream text-ink p-6 lg:p-8 flex flex-col items-center justify-center gap-3 w-[42%] min-w-[180px]">
                      <FakeQR />
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/60">Scan to verify</p>
                    </div>
                    {/* Info */}
                    <div className="p-7 lg:p-9 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">Member ID</p>
                        <p className="mt-1 font-display text-2xl">{member.memberId}</p>
                        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">Valid Thru</p>
                        <p className="mt-1 font-display text-2xl">{member.validThru}</p>
                      </div>
                      <div className="pt-6 border-t border-cream/15">
                        <p className="font-display italic text-cream/80">Seven colors.<br />One community.</p>
                        <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                          {palette.slice(0, 7).map((p) => (
                            <span key={p.name} className={`flex-1 ${p.cls}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card controls */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFlipped((v) => !v)}
                className="group inline-flex items-center gap-2 bg-ink text-cream pl-4 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-magenta transition-colors"
              >
                {flipped ? "Show front" : "Flip card"}
                <span className="size-6 rounded-full bg-acid text-ink grid place-items-center group-hover:bg-cream group-hover:text-magenta transition-colors">↻</span>
              </button>
              <Link
                to="/community/profile"
                className="inline-flex items-center gap-2 border border-ink/20 pl-4 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-ink hover:text-cream transition-colors"
              >
                Edit details
                <span className="size-6 rounded-full bg-ink/10 grid place-items-center text-base leading-none">→</span>
              </Link>
            </div>
          </div>

          {/* Side meta */}
          <aside className="lg:col-span-5 reveal-on-scroll" data-reveal-delay="200">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">Cardholder</p>
            <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              <Row label="Name" value={member.name} />
              <Row label="Handle" value={member.handle} />
              <Row label="Role" value={member.role} accent="magenta" />
              <Row label="City" value={member.city} />
              <Row label="Member ID" value={member.memberId} mono />
              <Row label="Since" value={member.since} mono />
              <Row label="Valid thru" value={member.validThru} mono />
            </div>

            <div className="mt-10 rounded-2xl bg-ink text-cream p-6 lg:p-8 relative overflow-hidden">
              <span className="absolute -right-6 -top-6 size-24 rounded-full bg-magenta/80" />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">Tip</p>
              <p className="relative mt-3 font-display text-xl leading-snug">
                Add this card to your wallet or paste it into your email signature. It travels well.
              </p>
              <button className="relative mt-5 inline-flex items-center gap-2 bg-acid text-ink pl-4 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono hover:bg-cream transition-colors">
                Download .pdf
                <span className="size-6 rounded-full bg-ink text-acid grid place-items-center">↓</span>
              </button>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: "magenta" }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-baseline py-3.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">{label}</span>
      <span className={`${mono ? "font-mono text-sm tracking-wider" : "text-[15px]"} ${accent === "magenta" ? "text-magenta" : "text-ink/85"}`}>
        {value}
      </span>
    </div>
  );
}

function FakeQR() {
  // deterministic 11x11 grid that looks like a QR
  const size = 11;
  const cells: boolean[] = Array.from({ length: size * size }, (_, i) => {
    const x = i % size;
    const y = Math.floor(i / size);
    // finder squares
    const inFinder =
      (x < 3 && y < 3) || (x > size - 4 && y < 3) || (x < 3 && y > size - 4);
    if (inFinder) {
      const fx = x % (size - 3 === x || x === 0 ? size : size);
      // simple ring
      const localX = x < 3 ? x : x - (size - 3);
      const localY = y < 3 ? y : y - (size - 3);
      const isRing = localX === 0 || localX === 2 || localY === 0 || localY === 2 || (localX === 1 && localY === 1);
      return isRing;
    }
    return ((x * 31 + y * 17 + 7) % 5) < 2;
  });
  return (
    <div className="grid bg-cream p-1.5 rounded-md" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: 132, height: 132 }}>
      {cells.map((on, i) => (
        <span key={i} className={`aspect-square ${on ? "bg-ink" : "bg-cream"}`} />
      ))}
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
    { href: "/events", label: "Gatherings" },
    { href: "/gallery", label: "Gallery" },
    { href: "/profile", label: "Profile", active: true },
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
