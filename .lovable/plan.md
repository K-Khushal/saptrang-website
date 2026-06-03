# Vibrant Editorial Landing Page

The previous direction leaned monochrome — this rebuild keeps the editorial / indie-festival soul but trades black & white for a **bold, saturated palette**: electric cobalt, hot tangerine, acid yellow, hot magenta, lush emerald, on warm cream paper with deep espresso ink.

## Palette (added to `src/styles.css`)

- `--cream` warm paper background
- `--ink` deep espresso text
- `--cobalt` electric blue
- `--tangerine` hot orange
- `--acid` acid yellow
- `--magenta` hot pink-red
- `--emerald` lush green

Mapped to semantic shadcn tokens (`--primary` = magenta, `--secondary` = cobalt, `--accent` = tangerine) so all components inherit the vibe.

Typography: **Fraunces** display serif + **Inter** body + **JetBrains Mono** for labels (loaded via Google Fonts in `__root.tsx`).

## Sections (single-page, full editorial flow)

1. **Sticky nav** — cream bg, mono labels, magenta "Apply" pill
2. **Hero manifesto** — oversized Fraunces serif headline with color-blocked words (each key word in a different brand color), tangerine sticker badge, kicker label
3. **Marquee credits strip** — cobalt band, cream type, scrolling cultural credits
4. **About the community** — two-column editorial: cream column of body copy + magenta stat panel (420 members / 12 chapters / ∞ vision)
5. **Past events recap** — contact-sheet grid of 6 event cards, each with a solid color block (alternating cobalt / tangerine / emerald / magenta / acid), event title + date over color
6. **Photo & video highlights** — asymmetric mosaic, mix of generated images and color blocks with play-button overlays
7. **Featured creators / member stories** — full-bleed emerald section with portrait + pull quote in giant italic serif
8. **Testimonials** — 3-column riso-style cards with colored backgrounds (acid, tangerine, cobalt) and handwritten-feel quotes
9. **Community blog & articles** — 3 article cards, magazine layout, category tag in color
10. **Upcoming events** — ticket-stub list with perforated divider, accent-color "Get Ticket" CTA
11. **Partners & collaborators** — marquee of partner names, acid yellow band
12. **Membership application CTA** — huge magenta section, oversized "Belong." headline, single CTA
13. **Footer** — ink background with cream + acid type, social links, manifesto signoff

## Images

Generate 4 hero/feature images via `imagegen` (warm, cinematic, real-people / creative-process feel) for: hero stage, about portrait, featured creator portrait, blog lead image. Remaining slots use **solid vibrant color blocks** with mono labels — this is intentional (riso/zine aesthetic) and keeps the palette loud.

## Files touched

- `src/styles.css` — new palette + tokens + animations (marquee, float, reveal)
- `src/routes/__root.tsx` — add Google Fonts `<link>` in head meta
- `src/routes/index.tsx` — full rewrite, replace placeholder, set proper page title + meta
- `src/assets/` — 4 generated images

## Anti-slop guardrails

- No SaaS feature grids, no pricing, no "Trusted by" filler beyond the partner marquee, no dual hero CTAs
- Bold colors used as **solid blocks**, not gradients or pastel washes
- Composition asymmetric, editorial, with deliberate density shifts — not card grids end-to-end
