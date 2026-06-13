import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Membership Card — Pulse" },
      { name: "description", content: "Your Pulse membership card — slide it out of the sleeve." },
    ],
  }),
  component: ProfilePage,
});

const member = {
  name: "Riya Sharma",
  handle: "@riyas",
  role: "Community Member",
  memberId: "PLS · 00124",
  since: "2024",
  validThru: "05 / 2027",
  city: "Mumbai",
};

const palette = ["bg-cobalt", "bg-tangerine", "bg-acid", "bg-magenta", "bg-emerald", "bg-cream", "bg-ink"];

function ProfilePage() {
  const [out, setOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => setOut(true), 900); // auto-reveal on entry
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1100px] mx-auto px-5 lg:px-10 pt-12 lg:pt-20 pb-24">
        {/* Masthead */}
        <header
          className="text-center max-w-2xl mx-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/60 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-ink/40" />
            Membership · No. 047
            <span className="inline-block w-8 h-px bg-ink/40" />
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.95] tracking-[-0.02em] text-balance">
            Tap to <span className="italic text-magenta">reveal</span> your card.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/65">
            A small, beautiful object. Kept in a soft cream sleeve, slipped out only when it matters.
          </p>
        </header>

        {/* Wallet stage */}
        <section className="mt-16 lg:mt-24 flex flex-col items-center">
          <button
            onClick={() => setOut((v) => !v)}
            aria-label={out ? "Tuck card back into sleeve" : "Slide card out of sleeve"}
            className="group relative w-full max-w-[540px] aspect-[5/6] outline-none"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
              transition: "opacity 900ms ease, transform 1100ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Soft floor shadow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-30px] w-[80%] h-10 bg-ink/20 blur-2xl rounded-[50%]" />

            {/* CARD — sits behind sleeve front, slides up when 'out' */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[28%] w-[88%] aspect-[16/10] rounded-[22px] overflow-hidden shadow-[0_25px_60px_-25px_rgba(0,0,0,0.55)] z-10"
              style={{
                transform: out ? "translate(-50%, -78%) rotate(-1.2deg)" : "translate(-50%, 0%) rotate(0deg)",
                transition: "transform 1100ms cubic-bezier(0.22,1,0.36,1)",
                background: "linear-gradient(135deg, #0d0d0d 0%, #1c1c1c 55%, #2a2a2a 100%)",
              }}
            >
              {/* Subtle metallic sheen */}
              <div
                className="absolute inset-0 opacity-60 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(80% 60% at 100% 100%, rgba(232,69,154,0.18), transparent 60%)",
                }}
              />
              {/* Top row */}
              <div className="absolute inset-0 p-6 lg:p-7 flex flex-col justify-between text-cream">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 font-display text-xl italic font-semibold">
                    <span className="inline-block size-2.5 rounded-full bg-magenta" />
                    Pulse<span className="text-magenta">.</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream/55 text-right leading-tight">
                    Community<br />Member
                  </span>
                </div>

                {/* Chip + name */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-7 rounded-[5px] bg-gradient-to-br from-acid via-tangerine to-magenta shadow-inner" />
                    <div className="flex gap-1">
                      {palette.slice(0, 5).map((c, i) => (
                        <span key={i} className={`size-1.5 rounded-full ${c}`} />
                      ))}
                    </div>
                  </div>
                  <p className="font-display text-2xl lg:text-3xl tracking-tight leading-none">{member.name}</p>
                  <div className="mt-3 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60">
                    <span>{member.memberId}</span>
                    <span>Valid · {member.validThru}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SLEEVE — cream pocket with curved opening */}
            <div className="absolute inset-x-0 bottom-0 h-[58%] z-20 pointer-events-none">
              {/* Back face (behind card) */}
              <div
                className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-cream to-[#efe9dc] shadow-[inset_0_2px_0_rgba(255,255,255,0.6),0_30px_60px_-30px_rgba(0,0,0,0.35)]"
                style={{ zIndex: 0 }}
              />
              {/* Front face with curved (mouth) cutout via SVG mask */}
              <svg
                viewBox="0 0 540 380"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full drop-shadow-[0_18px_25px_rgba(0,0,0,0.18)]"
                style={{ zIndex: 30 }}
              >
                <defs>
                  <linearGradient id="sleeve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5efe0" />
                    <stop offset="100%" stopColor="#e8dfc8" />
                  </linearGradient>
                  <linearGradient id="lip" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.18)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                </defs>
                {/* sleeve body with scoop on top edge */}
                <path
                  d="M 20 70 Q 20 30 60 30 L 180 30 Q 220 30 240 70 Q 270 130 300 70 Q 320 30 360 30 L 480 30 Q 520 30 520 70 L 520 360 Q 520 380 500 380 L 40 380 Q 20 380 20 360 Z"
                  fill="url(#sleeve)"
                />
                {/* highlight along scoop */}
                <path
                  d="M 60 35 Q 220 35 240 75 Q 270 130 300 75 Q 320 35 480 35"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.2"
                />
                {/* inner shadow under lip */}
                <path
                  d="M 30 70 L 510 70"
                  stroke="url(#lip)"
                  strokeWidth="14"
                  fill="none"
                  opacity="0.6"
                />
                {/* stitching */}
                <path
                  d="M 32 80 L 32 360 M 508 80 L 508 360 M 35 365 L 505 365"
                  stroke="rgba(0,0,0,0.18)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                  fill="none"
                />
              </svg>

              {/* Label at bottom of sleeve */}
              <div className="absolute bottom-5 inset-x-0 flex items-center justify-between px-8 z-40 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-magenta" />
                  {member.handle}
                </span>
                <span>{out ? "Out" : "Tap →"}</span>
              </div>
            </div>

            {/* Hover lift */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:-translate-y-1" />
          </button>

          {/* Controls */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 800ms ease 400ms",
            }}
          >
            <button
              onClick={() => setOut((v) => !v)}
              className="group inline-flex items-center gap-2 bg-ink text-cream pl-5 pr-2 py-2.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-mono hover:bg-magenta transition-colors"
            >
              {out ? "Tuck back" : "Slide out card"}
              <span className="size-6 rounded-full bg-acid text-ink grid place-items-center transition-transform duration-500 group-hover:rotate-180">↑</span>
            </button>
            <Link
              to="/community/profile"
              className="inline-flex items-center gap-2 border border-ink/20 pl-5 pr-2 py-2.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-mono hover:bg-ink hover:text-cream transition-colors"
            >
              Edit details
              <span className="size-6 rounded-full bg-ink/10 grid place-items-center">→</span>
            </Link>
          </div>
        </section>

        {/* Cardholder info — reveals after slide */}
        <section
          className="mt-20 max-w-2xl mx-auto"
          style={{
            opacity: out ? 1 : 0,
            transform: out ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 900ms ease 300ms, transform 900ms cubic-bezier(0.22,1,0.36,1) 300ms",
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50 text-center">Cardholder</p>
          <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            <Row label="Name" value={member.name} />
            <Row label="Handle" value={member.handle} />
            <Row label="Role" value={member.role} accent />
            <Row label="City" value={member.city} />
            <Row label="Member ID" value={member.memberId} mono />
            <Row label="Since" value={member.since} mono />
            <Row label="Valid thru" value={member.validThru} mono />
          </div>
          <div className="mt-8 flex justify-center">
            <button className="group inline-flex items-center gap-2 bg-magenta text-cream pl-5 pr-2 py-2.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-mono hover:bg-ink transition-colors">
              Download .pdf
              <span className="size-6 rounded-full bg-cream text-magenta grid place-items-center group-hover:bg-acid group-hover:text-ink transition-colors">↓</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-baseline py-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">{label}</span>
      <span className={`${mono ? "font-mono text-sm tracking-wider" : "text-[15px]"} ${accent ? "text-magenta" : "text-ink/85"}`}>
        {value}
      </span>
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
              <Link key={l.href} to={l.href} className={`transition-colors ${l.active ? "text-ink" : "hover:text-magenta text-ink/60"}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth" className="group inline-flex items-center gap-2 bg-magenta text-cream pl-4 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono font-medium hover:bg-ink transition-colors">
              Apply
              <span className="size-6 rounded-full bg-cream text-magenta grid place-items-center text-base leading-none group-hover:bg-acid group-hover:text-ink transition-colors">→</span>
            </Link>

            <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="md:hidden relative size-10 flex flex-col items-center justify-center gap-[5px]">
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
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
              className={`font-display text-3xl font-semibold italic transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${l.active ? "text-magenta" : "hover:text-magenta"}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}>
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
            <p className="mt-4 max-w-sm text-cream/60 leading-relaxed">A global collective of filmmakers, photographers, artists and cultural makers.</p>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">&copy; {new Date().getFullYear()} Pulse Collective. Non-profit cultural foundation.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">Made with heat, not algorithms.</p>
        </div>
      </div>
    </footer>
  );
}
