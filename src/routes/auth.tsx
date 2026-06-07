import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import authImage from "@/assets/auth-cinematic.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Come in — PULSE Collective" },
      {
        name: "description",
        content:
          "A community of filmmakers, artists and writers. Step inside with Google or a magic link.",
      },
      { property: "og:title", content: "Come in — PULSE Collective" },
      {
        property: "og:description",
        content: "A community of creators. Step inside.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loadingProvider, setLoadingProvider] = useState<"google" | "magic" | null>(null);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleGoogle = async () => {
    setLoadingProvider("google");
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Could not continue with Google");
        setLoadingProvider(null);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setLoadingProvider(null);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      toast.error("That email doesn't look quite right");
      return;
    }
    setLoadingProvider("magic");
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoadingProvider(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-cream text-ink antialiased">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        {/* === Cinematic left === */}
        <aside className="relative isolate hidden overflow-hidden lg:block">
          <img
            src={authImage}
            alt="A small gathering of artists in a sunlit studio at golden hour"
            className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[1800ms] ease-out ${
              mounted ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
            }`}
            style={{ filter: "saturate(0.95) contrast(1.02)" }}
          />
          {/* warm wash + bottom gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/55 via-ink/15 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_85%,oklch(0.18_0.02_60/0.55),transparent_60%)]" />

          {/* Top brand */}
          <div className="relative z-10 flex items-center justify-between px-10 pt-10 text-cream">
            <Link to="/" className="group inline-flex items-center gap-3">
              <Logomark />
              <span className="font-display text-xl font-semibold tracking-tight">
                Pulse
              </span>
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/70">
              Est. 2019 · Members only
            </span>
          </div>

          {/* Bottom editorial caption */}
          <div
            className={`relative z-10 mt-auto flex h-full flex-col justify-end px-10 pb-14 text-cream transition-all duration-1000 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-acid/90">
              Reel 07 / The Long Table
            </span>
            <blockquote className="mt-5 max-w-xl font-display text-3xl font-light italic leading-[1.15] text-cream/95 xl:text-[2.5rem]">
              "We're not a platform.
              <br />
              We're the room you walk into when the work matters."
            </blockquote>
            <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
              <span className="h-px w-8 bg-cream/40" />
              412 members · 14 cities · one long conversation
            </div>
          </div>
        </aside>

        {/* === Form right === */}
        <section className="relative flex min-h-screen flex-col">
          {/* Mobile-only brand bar */}
          <div className="flex items-center justify-between px-6 pt-7 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <Logomark dark />
              <span className="font-display text-lg font-semibold tracking-tight">
                Pulse
              </span>
            </Link>
            <Link
              to="/"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 transition-colors hover:text-ink"
            >
              ← Back
            </Link>
          </div>

          {/* Desktop top-right back link */}
          <div className="hidden justify-end px-12 pt-10 lg:flex">
            <Link
              to="/"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 transition-colors hover:text-ink"
            >
              ← Back home
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
            <div
              className={`w-full max-w-[440px] transition-all duration-1000 ease-out ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta">
                A community of creators
              </span>

              <h1 className="mt-5 font-display text-[2.75rem] font-light leading-[1.02] tracking-[-0.01em] text-ink sm:text-[3.25rem]">
                Come
                <span className="italic font-normal text-magenta"> in</span>
                <span className="text-magenta">.</span>
              </h1>

              <p className="mt-5 max-w-[28ch] font-body text-[15px] leading-relaxed text-ink/60">
                The kettle's on. Step inside — whether it's your first time or
                your hundredth, the door's the same.
              </p>

              {/* Google */}
              <div className="mt-10">
                <button
                  onClick={handleGoogle}
                  disabled={loadingProvider !== null}
                  className="group relative flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-cream px-6 py-4 text-[14px] text-ink shadow-[0_1px_0_oklch(0.18_0.02_60/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/35 hover:shadow-[0_10px_30px_-12px_oklch(0.18_0.02_60/0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <GoogleMark />
                  <span className="font-body">
                    {loadingProvider === "google" ? "Opening Google…" : "Continue with Google"}
                  </span>
                </button>
              </div>

              {/* Soft divider */}
              <div className="my-7 flex items-center gap-5">
                <span className="h-px flex-1 bg-ink/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/40">
                  or
                </span>
                <span className="h-px flex-1 bg-ink/10" />
              </div>

              {/* Magic link */}
              {sent ? (
                <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-acid/15 p-7">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-tangerine/30 blur-2xl" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
                    Check your inbox
                  </span>
                  <p className="mt-3 font-display text-2xl font-light italic leading-snug text-ink">
                    A magic link is on its way to{" "}
                    <span className="not-italic font-normal">{email}</span>.
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                    Tap the link inside to step in. It'll wait up for about an hour.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                    }}
                    className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60 underline underline-offset-[6px] transition-colors hover:text-ink"
                  >
                    Use a different email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="group relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@studio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer w-full rounded-full border border-ink/15 bg-cream px-6 py-4 pr-36 font-body text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 hover:border-ink/30 focus:border-ink/60 focus:shadow-[0_0_0_4px_oklch(0.18_0.02_60/0.04)]"
                    />
                    <button
                      type="submit"
                      disabled={loadingProvider !== null}
                      className="absolute right-1.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-magenta hover:gap-3 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loadingProvider === "magic" ? "Sending" : "Send link"}
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </button>
                  </div>
                  <p className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                    No passwords. Ever.
                  </p>
                </form>
              )}

              {/* Footer note */}
              <p className="mt-14 max-w-[34ch] font-body text-[12px] leading-relaxed text-ink/45">
                By stepping in, you agree to our community code — be kind, be
                curious, credit the makers.
              </p>
            </div>
          </div>

          {/* Tiny footer */}
          <div className="flex items-center justify-between border-t border-ink/10 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/40 sm:px-10 lg:px-16">
            <span>Pulse Collective</span>
            <span className="hidden sm:inline">A room, not a platform</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function Logomark({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "oklch(0.18 0.02 60)" : "oklch(0.97 0.025 85)";
  return (
    <span
      className="relative inline-flex h-9 w-9 items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="h-9 w-9">
        <circle cx="20" cy="20" r="18" fill="none" stroke={stroke} strokeWidth="1.25" />
        <circle cx="20" cy="20" r="11" fill="none" stroke={stroke} strokeWidth="1.25" opacity="0.7" />
        <circle cx="20" cy="20" r="4" fill="oklch(0.62 0.27 0)" />
      </svg>
    </span>
  );
}

function GoogleMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden>
      <path fill="#EA4335" d="M9 3.48c1.69 0 2.84.73 3.49 1.34l2.55-2.49C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" />
      <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#FBBC05" d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" />
    </svg>
  );
}
