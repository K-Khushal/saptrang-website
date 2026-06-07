import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — PULSE Collective" },
      {
        name: "description",
        content:
          "Sign in or join the PULSE collective. Continue with Google or get a magic link by email.",
      },
      { property: "og:title", content: "Sign in — PULSE Collective" },
      {
        property: "og:description",
        content: "Continue with Google or get a magic link by email.",
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

  // If already signed in, bounce home.
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
        toast.error(result.error.message ?? "Could not sign in with Google");
        setLoadingProvider(null);
        return;
      }
      if (result.redirected) return; // browser navigating away
      // tokens path: session set, navigate
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
      toast.error("Enter a valid email address");
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
    <main className="min-h-screen bg-cream text-ink">
      {/* Top bar */}
      <header className="border-b border-ink/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            PULSE<span className="text-magenta">.</span>
          </Link>
          <Link
            to="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-ink"
          >
            ← Back home
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl grid-cols-1 lg:grid-cols-12">
        {/* Editorial left panel */}
        <aside className="relative hidden overflow-hidden border-r border-ink/15 bg-ink text-cream lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:p-10">
          <div className="space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-acid">
              Issue 07 / Members only
            </span>
            <h1 className="font-display text-5xl leading-[1.02] xl:text-6xl">
              Step <span className="italic text-acid">inside</span>
              <br />
              the room<span className="text-magenta">.</span>
            </h1>
            <p className="max-w-sm font-body text-base leading-relaxed text-cream/80">
              One door for new members and old friends. Sign in to access
              screenings, the members' archive, and what we're cooking next.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-2 -top-2 h-24 w-24 rounded-full bg-tangerine/80 mix-blend-screen" />
            <div className="absolute -bottom-4 left-16 h-16 w-16 rounded-full bg-magenta/80 mix-blend-screen" />
            <blockquote className="relative font-display text-2xl italic leading-snug text-cream">
              "We don't gatekeep. We just hold the door open a little longer for
              the right people."
            </blockquote>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
              — Lia M., founding member
            </div>
          </div>
        </aside>

        {/* Auth form */}
        <div className="flex flex-col justify-center px-5 py-12 sm:px-8 lg:col-span-7 lg:px-16 lg:py-16">
          <div className="mx-auto w-full max-w-md">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              Sign in or join
            </span>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
              Welcome
              <span className="text-magenta">.</span>
            </h2>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-ink/65">
              Same door, new or returning. Pick a method below — we'll figure
              out the rest.
            </p>

            {/* Google */}
            <div className="mt-8 lg:mt-10">
              <button
                onClick={handleGoogle}
                disabled={loadingProvider !== null}
                className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-ink bg-cream px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-all hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
              >
                <GoogleMark />
                {loadingProvider === "google" ? "Opening Google…" : "Continue with Google"}
              </button>
            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-ink/15" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
                or by email
              </span>
              <span className="h-px flex-1 bg-ink/15" />
            </div>

            {/* Magic link */}
            {sent ? (
              <div className="rounded-2xl border-2 border-emerald bg-emerald/10 p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald">
                  Check your inbox
                </div>
                <p className="mt-2 font-display text-2xl leading-snug">
                  A magic link is flying to{" "}
                  <span className="italic">{email}</span>
                </p>
                <p className="mt-3 text-sm text-ink/65">
                  Click the link inside to finish signing in. The link expires
                  in about an hour.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 underline underline-offset-4 transition-colors hover:text-ink"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-3">
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border-2 border-ink bg-cream px-5 py-4 font-body text-base text-ink outline-none transition-all placeholder:text-ink/35 focus:border-magenta focus:ring-4 focus:ring-magenta/15"
                />
                <button
                  type="submit"
                  disabled={loadingProvider !== null}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-magenta px-6 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-cream transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingProvider === "magic" ? "Sending link…" : "Email me a magic link"}
                  <span aria-hidden>→</span>
                </button>
              </form>
            )}

            <p className="mt-8 font-body text-xs leading-relaxed text-ink/55">
              By continuing, you agree to PULSE's community code and our
              quietly-worded privacy notes. No passwords. No spam. Ever.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="transition-transform group-hover:scale-110">
      <path
        fill="#EA4335"
        d="M9 3.48c1.69 0 2.84.73 3.49 1.34l2.55-2.49C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
      />
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#FBBC05"
        d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
      />
    </svg>
  );
}
