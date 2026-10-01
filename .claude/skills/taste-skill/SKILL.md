---
name: taste-skill
description: Anti-slop frontend design discipline (design-taste-frontend from Leonxlnx/taste-skill) — hard rules against generic AI-default layouts, copy tells, motion, color, and typography. Use for every PAC page/component build, layered UNDER pac-design-foundation. Load together with pac-design-foundation, pac-motion-and-buttons and pac-hero-carousel.
---

# Precedence note for this project

This skill governs layout, motion, copy, and interaction discipline for
Penny Appeal Caribbean work. Where it conflicts with `pac-design-foundation`,
`pac-motion-and-buttons`, or `pac-hero-carousel` on **typography or branding
(font family, programme colours, neutrals)**, those PAC skills win — Proxima
Nova and the fixed programme palette are not swappable. On everything else
(layout hard rules, anti-AI-tells, motion motivation, accessibility,
copy discipline, Pre-Flight checklist), this skill's rules apply in full.

---

# tasteskill: Anti-Slop Frontend Skill

## Overview
**Name:** design-taste-frontend
**Purpose:** Generates landing pages, portfolios, and redesigns that avoid templated AI defaults and produce distinctive, audit-driven design.
**Out of Scope:** Dashboards, data tables, multi-step forms, code editors, native mobile, realtime collab UIs.

---

## Core Framework: The Three Dials

Every project is configured via three global variables that gate all layout, motion, and density decisions:

- **DESIGN_VARIANCE (1–10):** Controls layout asymmetry (1 = symmetric grid; 10 = masonry chaos)
- **MOTION_INTENSITY (1–10):** Controls animation choreography (1 = static; 10 = scroll-hijacks and physics)
- **VISUAL_DENSITY (1–10):** Controls whitespace and content packing (1 = gallery airy; 10 = cockpit dense)

**Baseline:** 8 / 6 / 4. Override conversationally based on design read, never ask the user to edit manually.

---

## Mandatory Opening: Design Read (Section 0)

Before any code, declare the brief in one sentence: "Reading this as: [page kind] for [audience], with a [vibe] language, leaning toward [system/aesthetic]."

Then infer correct dials from brief signals: audience, vibe words, references, existing brand assets, regulatory constraints.

**Single clarifying question only if genuinely ambiguous.** Default to confident inference.

---

## Design System Selection (Section 2)

**Use official packages when applicable:**
- Microsoft/Enterprise → `@fluentui/react-components`
- Google-flavored → `@material/web`
- IBM Analytics → `@carbon/react`
- GitHub devtools → `@primer/react-brand`
- Shopify apps → `polaris`
- UK public-sector → `govuk-frontend`
- US public-sector → `uswds`
- Modern React → `@radix-ui/themes` or `shadcn/ui`
- Indie SaaS → Tailwind v4 + `motion/react`

**Aesthetic briefs (no single official package):** Native CSS + Tailwind + component library. Label borrowed inspiration honestly in code comments.

**PAC override:** typography and brand colour are never selected here — Proxima Nova and the programme palette from `pac-design-foundation` always apply.

---

## Anti-Default Discipline (Section 4)

### Typography (4.1) — PAC override applies
Font family is governed entirely by `pac-design-foundation` (Proxima Nova, no exceptions). The rules below (serif ban, avoid Inter, rotate typefaces) do not apply on PAC work — skip them here.
- **Italic descender clearance still applies:** any italic word containing `y g j p q` needs `leading-[1.1]` minimum + `pb-1` reserve.

### Color (4.2) — PAC override applies
Colour is governed entirely by `pac-design-foundation`'s programme palette and neutrals. The rules below (max one accent, Lila Rule, premium-consumer palette ban, palette rotation) do not apply — the programme hues are fixed and reused deliberately across pages.
- **COLOR CONSISTENCY LOCK still applies conceptually:** don't let a page drift onto a programme's colour without reason — one programme's hue per context, no arbitrary accent swaps mid-page.

### Layout (4.7 – Hard Rules)
- **Hero fits initial viewport:** headline ≤ 2 lines, subtext ≤ 20 words AND ≤ 4 lines, CTA visible without scroll.
- **Hero font-scale discipline:** plan headline size and image size together; `text-4xl md:text-5xl lg:text-6xl` is sensible default; `text-8xl` only for 3–5 word headlines.
- **Hero top padding cap:** max `pt-24` desktop; more floats content and reads as layout bug.
- **Hero stack max 4 text elements:** eyebrow OR brand strip (not both) + headline + subtext + CTAs. No tiny tagline below CTAs, no trust micro-strip inside hero.
- **Nav on ONE line desktop**, height ≤ 80px.
- **No 3-column equal feature cards.** Use 2-column zig-zag, asymmetric grid, scroll-pinned, or horizontal-scroll.
- **ZIGZAG ALTERNATION CAP:** Max 2 consecutive "left-image + right-text" / "left-text + right-image" splits; 3rd consecutive is a Pre-Flight Fail.
- **BENTO CELL COUNT RULE:** Exactly as many cells as content items (3 items → 3 cells). No empty cells.
- **EYEBROW RESTRAINT:** Max 1 eyebrow per 3 sections. Mechanical Pre-Flight Check: count uppercase-tracking labels; if count > ceil(sectionCount / 3), output fails.
- **SPLIT-HEADER BAN:** No "left big headline + right small paragraph" section headers (stack vertically instead).
- **Bento backgrounds:** at least 2–3 cells have real visual variation (image/gradient/pattern), not all white-on-white text.

### Interactive States (4.5)
- **BUTTON CONTRAST CHECK:** White text on white button, `bg-white` CTA with `text-white` label, transparent button over photo with no border = banned. WCAG AA min (4.5:1). On PAC work, use the measured programme fill/text pairs in `pac-design-foundation` (they already satisfy this).
- **CTA BUTTON WRAP BAN:** Button label must fit one line at desktop (3 words max for primary CTAs). Wrapped CTAs at desktop = Pre-Flight Fail.
- **NO DUPLICATE CTA INTENT:** "Get in touch" + "Contact us" + "Let's talk" are all contact intent → pick ONE. Same label for same intent across whole page.
- **FORM CONTRAST CHECK:** Form inputs, placeholder text, labels, focus rings, error text all pass WCAG AA.

### Content Density (4.9)
- **Default section:** short headline (≤ 8 words) + short sub-paragraph (≤ 25 words) + one visual OR one CTA.
- **Long lists (> 5 items):** use 2-column card grid, tabs, accordion, horizontal scroll-snap pills, carousel, or marquee instead of default `<ul>` with `divide-y`.
- **Spec sheets specifically:** 2-column card grid (each spec its own card), horizontal scroll-snap pills, or grouped chunks. Banned: long `border-b` table.
- **COPY SELF-AUDIT:** Re-read every visible string before ship. Flag grammatically broken, AI-hallucinated, or performatively-humble phrases; rewrite all flagged text.
- **Fake-precise numbers:** Only allow if real data, explicitly labeled mock, or brand-claimed precision. No AI-invented `92%` or `13.4 mm` specs. On PAC work this reinforces the existing rule: use `[PLACEHOLDER]` rather than inventing impact figures.

### Images & Assets (4.8)
- **Image-generation tool first.** Generate section-specific visuals (hero, product shots, mood images) if tool available.
- **Real web images second.** Use real photography, Picsum-seeds, or stock URLs.
- **Last resort:** leave clearly-labeled placeholder slots; tell user which images needed.
- **Even minimalist sites need real images.** Pure-text page is incomplete work.
- **Real company logos for social proof.** Use Simple Icons or devicon SVGs, not plain text wordmarks.
- **LOGO-ONLY rule:** logo wall = logos only. No industry labels below ("Vercel + hosting").
- **Div-based fake screenshots banned.** Never render fake product UI out of `<div>` rectangles.
- **No pills/labels overlaid on images.** No "Plate · Brand", no "Field notes - journal" on photos.
- **No photo-credit captions as decoration.** Real photographer credit only when genuinely attributed; no fake "Field study no. 12 · Ines Caetano."
- On PAC work, images must also follow `pac-design-foundation`'s regional representation rules (no tourism/poverty framing, both Indo- and Afro-Caribbean Muslim communities represented, no Jamaica-as-shorthand).

---

## AI Tells to Avoid (Section 9)

**EM-DASH BAN (9.G – Non-Negotiable):** `—` is completely forbidden everywhere. Headlines, eyebrows, pills, button text, body copy, quotes, attribution, captions, nav items, alt text. Replace with period, comma, line break, or hyphen. **Zero em-dashes on page = mandatory.**

**Marketing-Copy Tells:**
- No "Quietly in use at" / "Quietly trusted by" headers.
- No "From the field" / "Field notes" poetic labels.
- No "We respect the French ones"-style AI cute remarks.
- No weather/locale strips (`LIS 14:23 · 18°C`) unless genuinely place-focused brief.
- No micro-meta-sentences under eyebrows.
- No generic step labels ("Stage 1 / Stage 2"). Use verb-noun ("Install", "Configure", "Ship").

**Redesign Tells:**
- No version labels in hero (`V0.6`, `BETA`, `INVITE-ONLY`) unless brief is explicit launch.
- No section-number eyebrows (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`).
- No `01 / 4`-style pagination on images.
- No decoration text strip at hero bottom (`BRAND. MOTION. SPATIAL.`).
- No floating top-right sub-text in section headers.
- No version footers (`v1.4.2`, `Build 0048`) on marketing pages.

**Content Tells:**
- No generic names ("John Doe", "Sarah Chan"). Use creative, realistic names — and on PAC work, names should be plausible for the region (not defaulting to Western names).
- No generic brand names ("Acme", "Nexus", "Cloudly"). Invent contextual, premium names.
- No generic avatars. Use believable photo placeholders or styled glyphs.
- No filler verbs ("Elevate", "Seamless", "Unleash", "Next-Gen").

**Generic UI:**
- No neon/outer glows by default. Use inner borders or subtle tinted shadows.
- No pure black `#000000`. Use off-black, zinc-950, charcoal — on PAC work this is already `--ink` (`#231F20`).
- No oversaturated accents. Desaturate to blend — on PAC work this yields to the fixed programme palette instead.
- No excessive gradient text in large headers.
- No custom mouse cursors.
- No hand-rolled SVG icons. Use library (Phosphor/HugeIcons/Radix/Tabler).
- No three-equal-column feature cards.

---

## Motion & Performance (Sections 5 & 6)

### Animation Rules
- **MOTION MUST BE MOTIVATED:** Every animation communicates hierarchy, storytelling, feedback, or state transition. No GSAP everywhere "because it looked cool."
- **MARQUEE MAX-ONE-PER-PAGE:** Horizontal scrolling text no more than once.
- **FORBIDDEN patterns:** `window.addEventListener('scroll')`, custom scroll-progress in React state, `requestAnimationFrame` touching React state.
- **Use Motion's `useScroll()`, GSAP ScrollTrigger, IntersectionObserver, or CSS scroll-driven animations only.**
- **Sticky-Stack & Horizontal-Pan:** canonical skeletons; `start: "top top"`, `pin: true`, proper scrub timing.
- **GSAP + Three.js isolated in dedicated leaf Client Components.** Do NOT mix with Motion in same tree.
- On PAC work, the concrete button/hover/reveal implementations in `pac-motion-and-buttons` and `pac-hero-carousel` are the canonical skeletons to follow; apply this section's *motivation and hygiene* rules to them, not a replacement motion system.

### Accessibility & Performance
- **Reduced Motion (mandatory for MOTION_INTENSITY > 3):** Wrap with `useReducedMotion()`, degrade to static, or gate animations behind `@media (prefers-reduced-motion: no-preference)`.
- **Dark Mode:** not applicable to PAC (single light brand system) — skip.
- **Core Web Vitals targets:** LCP < 2.5s, INP < 200ms, CLS < 0.1. Hero image must be `next/image priority`.
- **Hardware Acceleration:** Animate only `transform` and `opacity`, never `top`/`left`/`width`/`height`.
- **Z-Index Discipline:** Never spam `z-50`. Use systemic layer contexts only; document in constants file.
- **DOM Cost:** Grain/noise filters ONLY on fixed, `pointer-events-none` pseudo-elements. Never on scrolling containers.

---

## Page Theme Lock (Section 4.11)

Not applicable to PAC — the brand is single-theme (light, warm neutrals). Skip dark-mode/theme-switch rules; keep alternating white/sand/ink section grounds per `pac-design-foundation`.

---

## Redesign Protocol (Section 11)

1. **Detect mode:** Greenfield vs. Preserve vs. Overhaul.
2. **Audit before touching:** Document brand tokens, IA, content blocks, existing patterns, SEO baseline.
3. **Preservation rules:** Keep IA, copy voice, a11y wins, analytics event names stable.
4. **Modernization levers (priority order):** Typography → spacing/rhythm → color recalibration → motion layer → hero/key-section recomposition → full block replacement. (Skip the typography/color levers on PAC work — those are fixed; start from spacing/rhythm.)
5. **Decision tree:** Targeted evolution (70% value, 40% risk) vs. full redesign (when visual debt structural).
6. **Never silently change:** URL slugs, nav labels, form field names, logo, legal copy.

---

## Reference Vocabulary (Section 10)

Pattern names to know: Asymmetric Split Hero, Editorial Manifesto Hero, Bento Grid, Masonry Layout, Sticky-Stack Sections, Horizontal Scroll Hijack, Parallax Tilt Card, Glassmorphism Panel, Kinetic Marquee, Particle Explosion Button, Ripple Click Effect, Animated SVG Line Drawing, Mesh Gradient Background, etc.

---

## Default Architecture (Section 3)

- **Framework:** React / Next.js with Server Components (RSC default).
- **Styling:** Tailwind v4 (default; v3 only if project demands).
- **Animation:** Motion (`motion/react`); GSAP + ScrollTrigger for scroll-hijacks (isolated in Client leaves).
- **Fonts:** Proxima Nova via Adobe Fonts, per `pac-design-foundation` — never `next/font` Google substitutes, never self-hosted without licence confirmation.
- **Icons:** Phosphor, HugeIcons, Radix, Tabler (one family per project; Lucide on explicit request only).
- **State:** `useState`/`useReducer` local, Zustand/Jotai/context for global; NEVER use `useState` for continuous cursor/scroll values (use Motion's `useMotionValue`).
- **Responsiveness:** Tailwind standard breakpoints; CSS Grid > complex flex math; `min-h-[100dvh]` not `h-screen`; explicit mobile collapse rules.
- **Dependency Verification:** Check `package.json` before importing; output install command if package missing.

---

## The Pre-Flight Check (Section 14)

Mandatory final pass before calling any PAC UI work done — check every box, skipping only the typography/color/dark-mode items superseded by PAC brand rules above:

- [ ] Design read declared in one sentence before code
- [ ] Dials (variance/motion/density) implicitly reflected in output
- [ ] Design system choice justified (or Tailwind + native CSS for aesthetic brief)
- [ ] Zero em-dashes anywhere on the page
- [ ] Section grounds alternate correctly (white/sand/white/ink), no adjacent duplicates
- [ ] Programme colour and text pairing match the measured-contrast table in `pac-design-foundation`
- [ ] No 3-column equal feature cards; zigzag alternation ≤ 2 consecutive
- [ ] Bento cell count matches content item count exactly
- [ ] Eyebrow count ≤ ceil(sectionCount / 3)
- [ ] No split-header (big-left/small-right) section titles
- [ ] Button labels fit one line at desktop, ≤ 3 words for primary CTAs
- [ ] No duplicate CTA intent under different labels
- [ ] Form inputs/labels/errors pass WCAG AA contrast
- [ ] Copy self-audit done: no filler verbs, no AI marketing tells, no fake-precise numbers
- [ ] Real images or clearly labeled placeholders — no div-based fake screenshots, no decorative pill labels over photos
- [ ] Motion is motivated (hierarchy/story/feedback), not decoration; reduced-motion handled if MOTION_INTENSITY > 3
- [ ] Animate only `transform`/`opacity`; no scroll-position React state
- [ ] Regional representation check: no tourism/poverty framing, Indo- and Afro-Caribbean Muslim communities both represented where relevant, no Jamaica-as-shorthand, places named specifically

**Any single box fails = output is not done.** Fix before delivering.

---

## Key Forbidden Patterns (Absolute Bans Unless Explicit Override)

1. **Em-dash everywhere**
2. **Three equal-column feature cards**
3. **Div-based fake product screenshots**
4. **Pure-text minimalist pages (need real images)**
5. **Generic AI names / brand names / filler verbs**
6. **Version labels / decoration eyebrows in hero**
7. **Multiple marquees per page**
8. **Section-number labeling / locale strips / scroll cues (unless justified)**

(Serif-type ban and premium-consumer-palette ban are dropped for PAC work — see typography/color overrides above.)
