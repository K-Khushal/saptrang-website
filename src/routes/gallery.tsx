import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-collective.jpg";
import aboutImg from "@/assets/about-workshop.jpg";
import eventImg from "@/assets/event-screening.jpg";
import creatorImg from "@/assets/creator-portrait.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Pulse" },
      { name: "description", content: "Selected work from the Pulse collective: film stills, photographs, zines and workshop archives." },
      { property: "og:title", content: "Gallery — Pulse" },
      { property: "og:description", content: "Selected work from the Pulse collective: film stills, photographs, zines and workshop archives." },
    ],
  }),
  component: GalleryPage,
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

const filters = ["All", "Film", "Photography", "Zines", "Workshops"];

type Piece = {
  id: string;
  title: string;
  maker: string;
  category: string;
  year: string;
  type: "image" | "color";
  src?: string;
  bg?: string;
  fg?: string;
  span?: string;
  aspect?: string;
};

const pieces: Piece[] = [
  { id: "1", title: "Bandra Zine No. 3", maker: "Aarav Mehta", category: "Zines", year: "2024", type: "image", src: aboutImg, span: "lg:col-span-5", aspect: "aspect-[4/3]" },
  { id: "2", title: "Neon Tokyo — Vol. 11", maker: "Lena Voss", category: "Film", year: "2024", type: "color", bg: "bg-cobalt", fg: "text-cream", span: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { id: "3", title: "Kochi Light Studies", maker: "Sana Iyer", category: "Photography", year: "2024", type: "image", src: eventImg, span: "lg:col-span-3", aspect: "aspect-[3/4]" },
  { id: "4", title: "Darkroom Notes", maker: "Ravi Menon", category: "Workshops", year: "2023", type: "color", bg: "bg-ink", fg: "text-acid", span: "lg:col-span-3", aspect: "aspect-square" },
  { id: "5", title: "Collective Portrait", maker: "Vihaan Roy", category: "Photography", year: "2023", type: "image", src: heroImg, span: "lg:col-span-5", aspect: "aspect-[4/3]" },
  { id: "6", title: "Marseille Residency", maker: "Sofia Cruz", category: "Film", year: "2023", type: "color", bg: "bg-tangerine", fg: "text-ink", span: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { id: "7", title: "Creator Profile — Noor", maker: "Jonas Park", category: "Photography", year: "2024", type: "image", src: creatorImg, span: "lg:col-span-3", aspect: "aspect-[3/4]" },
  { id: "8", title: "Letterpress Archive", maker: "Noor Kapoor", category: "Zines", year: "2023", type: "color", bg: "bg-emerald", fg: "text-cream", span: "lg:col-span-4", aspect: "aspect-square" },
  { id: "9", title: "Salt & Grain", maker: "Lena Voss", category: "Film", year: "2023", type: "color", bg: "bg-magenta", fg: "text-cream", span: "lg:col-span-4", aspect: "aspect-[4/5]" },
  { id: "10", title: "Bengaluru Open Mic", maker: "Aarav Mehta", category: "Workshops", year: "2024", type: "color", bg: "bg-acid", fg: "text-ink", span: "lg:col-span-4", aspect: "aspect-[4/3]" },
];

function GalleryPage() {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? pieces : pieces.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-cream text-ink font-body selection:bg-magenta selection:text-cream">
      <Nav />

      <main className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-20 pb-20">
        {/* Masthead */}
        <header className="reveal-on-scroll">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-ink" />
            Selected Work
          </p>
          <h1 className="mt-6 font-display font-semibold text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-balance">
            The <span className="italic text-magenta">archive</span> of<br />
            what we <span className="italic text-cobalt">made</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            Film stills, darkroom prints, hand-bound zines and workshop residues. Nothing here was optimized for a feed.
          </p>
        </header>

        {/* Filters */}
        <section className="mt-10 lg:mt-14 reveal-on-scroll">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] font-mono border transition-colors ${
                  activeFilter === f
                    ? "bg-ink text-cream border-ink"
                    : "bg-transparent text-ink/60 border-ink/10 hover:border-ink/30 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="mt-10 lg:mt-14 reveal-on-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
            {filtered.map((p) => (
              <GalleryItem key={p.id} piece={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-20 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40">
              Nothing in this category yet.
            </p>
          )}
        </section>

        {/* CTA */}
        <section className="mt-16 lg:mt-24 reveal-on-scroll">
          <div className="bg-ink text-cream rounded-3xl p-8 lg:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">Submit your work</p>
              <h2 className="mt-4 font-display text-4xl lg:text-6xl leading-[0.95]">
                Made something<br />
                <span className="italic text-acid">analog?</span>
              </h2>
              <p className="mt-4 max-w-md text-cream/70 leading-relaxed">
                We feature member work every month. No portfolio required — just a story and a still.
              </p>
            </div>
            <button className="shrink-0 inline-flex items-center gap-3 bg-acid text-ink pl-6 pr-2 py-2 rounded-full text-sm font-medium hover:bg-cream transition-colors">
              Send a submission
              <span className="size-9 rounded-full bg-ink text-acid grid place-items-center text-lg">↗</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Gallery Item ─── */

function GalleryItem({ piece }: { piece: Piece }) {
  if (piece.type === "image" && piece.src) {
    return (
      <div className={`${piece.span} group`}>
        <div className={`relative overflow-hidden rounded-2xl border-4 border-ink ${piece.aspect}`}>
          <img
            src={piece.src}
            alt={piece.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="font-display text-2xl italic text-cream leading-tight">{piece.title}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
              {piece.maker} · {piece.year}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg italic leading-tight">{piece.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 shrink-0">{piece.category}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${piece.span} group`}>
      <div className={`relative overflow-hidden rounded-2xl border-4 border-ink ${piece.bg} ${piece.fg} ${piece.aspect} flex flex-col justify-between p-5 lg:p-7 hover:-translate-y-2 hover:rotate-[-1deg] transition-transform duration-500`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{piece.category}</span>
        <div>
          <h3 className="font-display text-3xl lg:text-4xl italic leading-[0.95]">{piece.title}</h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-80">
            {piece.maker} · {piece.year}
          </p>
        </div>
      </div>
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
    { href: "/gallery", label: "Gallery", active: true },
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
                <li><Link to="/gallery" className="hover:text-acid transition-colors">Gallery</Link></li>
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
