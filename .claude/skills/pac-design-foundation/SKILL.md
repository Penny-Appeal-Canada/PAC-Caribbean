---
name: pac-design-foundation
description: "The Penny Appeal Caribbean design system — Proxima Nova typography, colour tokens, programme palette, spacing, layout grid, and language rules for writing about the region. Load before designing or building any PAC page, component or screen."
---

# Penny Appeal Caribbean — Design Foundation

The design system for penny-appeal-caribbean. Every page, component and mockup follows it.

## Where this came from

| Reference | What it governs |
|---|---|
| pennyappeal.ca | Typeface, brand colour, programme names, content model, tone (parent organisation) |
| globalcitizen.org | Type hierarchy, spacing rhythm, layout grid, section composition, restraint in motion |
| thehumaneleague.org | Hero carousel + text highlight — see `pac-hero-carousel` |
| oceanconservancy.org | Button architecture and motion — see `pac-motion-and-buttons` |

Extend this vocabulary. Do not invent parallel systems.

## Typography — Proxima Nova

Proxima Nova is the Penny Appeal typeface and the organisation holds the licence. It is served through **Adobe Fonts** — the lowercase `proxima-nova` family name and per-weight loading are the Adobe Fonts (Typekit) convention.

```css
font-family: proxima-nova, Arial, Helvetica, sans-serif;
```

Keep that exact stack. Arial and Helvetica are the metric-compatible fallbacks.

**Licensed weights:** 400, 400 italic, 500, 600, 600 italic, 700, 800.

Add the Adobe Fonts project `<link>` in `<head>`; never self-host without confirming the licence covers it. Set `font-display: swap`. There is no second family — Proxima Nova carries display and body both.

### Role mapping

| Role | Weight | Tracking |
|---|---|---|
| Hero / display | **800** | `-0.02em` |
| Section headings | **800** | `-0.02em` above 40px, else normal |
| Sub-headings | **700** | normal |
| Body, prose | **500** | normal |
| UI labels | **600** | normal |
| Buttons | **800** | `0.16em`, uppercase |
| Eyebrows | **700** | `0.12em`, uppercase |
| Emphasis in prose | 600 italic | normal |

### Scale

Sized for reading, not inherited from any existing site. Do not shrink these to match another Penny Appeal property.

```css
--text-hero:    clamp(3rem, 2.274rem + 2.98vw, 5.188rem);  /* 48 → 83px */
--text-h2:      clamp(2.25rem, 1.7rem + 2.2vw, 3.5rem);     /* 36 → 56px */
--text-h3:      1.75rem;      /* 28px */
--text-lead:    1.3125rem;    /* 21px */
--text-body:    1.0625rem;    /* 17px */
--text-small:   0.9375rem;    /* 15px */
--text-button:  1.125rem;     /* 18px */
--text-eyebrow: 0.8125rem;    /* 13px */
```

### Rules

- **Line-height: `1` on hero, `1.2` on section headings, `1.6` on body.**
- **Negative tracking above 40px.** Proxima Nova sets loose at display sizes; without `-0.02em` big headings look unfinished. Body stays `normal`. Uppercase goes **positive**.
- Body copy never below 17px. UI labels never below 15px. A donate CTA is the most important control on the page — it gets 18px, not fine print.
- Prose measure caps at `70ch`. Display headings cap at `7.2em`; hero supporting copy at `19em`.
- Never more than one family. Proxima Nova does all of it.

## Colour

```css
:root {
  /* Brand */
  --pac-orange:      #EF7C00;  /* Penny Appeal primary */
  --pac-orange-text: #B55E00;  /* accessible on white — 4.60:1 */

  /* Programme palette — each programme owns one hue */
  --prog-thirst:      #00A5CE;  --prog-thirst-text:    #0080A0;
  --prog-feed:        #F05B89;  --prog-feed-text:      #C44A70;
  --prog-orphan:      #EF7C00;  --prog-orphan-text:    #B55E00;
  --prog-emergency:   #231F20;  --prog-emergency-text: #231F20;

  /* Neutrals — warm, never pure grey */
  --ink:        #231F20;  /* body text, and the dark ground */
  --ink-soft:   #55504F;
  --muted:      #8A8078;
  --line:       #E9E0D4;
  --sand:       #FAF6F0;  /* alternating section ground */
  --white:      #FFFFFF;
}
```

The programme palette is the whole palette. Do not add a fifth "regional" accent colour — the existing hues already carry warmth, and a designated Caribbean colour reads as tourism branding rather than belonging.

### The contrast rules — these are not negotiable

Measured, not estimated. Three of the four programme colours are too light for white text.

**Text ON a programme colour** (highlights, filled buttons, badges):

| Programme | Fill | Text on it | Ratio |
|---|---|---|---|
| Thirst Relief | `#00A5CE` | `--ink` | 5.65:1 |
| Feed Our World | `#F05B89` | `--ink` | 5.09:1 |
| OrphanKind | `#EF7C00` | `--ink` | 5.86:1 |
| Emergency Response | `#231F20` | `--white` | 16.30:1 |

White on the three bright colours lands at 2.78–3.20:1 and **fails**. Only Emergency Response takes white text.

**Programme colour AS text** (links, labels, eyebrows): never the base hue on white — Thirst is 2.89:1 and OrphanKind 2.78:1. Use the `-text` variant. `--pac-orange` for fills, `--pac-orange-text` for text.

Emergency Response is near-black: it reads as a highlight only over light imagery or a light ground. Over a dark photo, invert — white fill, ink text.

## Writing about the region

The fastest way to lose this audience is to describe them carelessly. These are correctness rules, not style preferences.

**The Caribbean is not all islands.** Guyana and Suriname are on the South American mainland; Belize is in Central America. Guyana has one of the largest Muslim populations in the region and is a core constituency. Never use "islands" as a synonym for the region, and never write "our islands", "across the islands" or "island nations" as a catch-all.

- ✅ "across the Caribbean", "the countries we work in", "communities across the region"
- ❌ "our islands", "every island", "island communities" (unless the subject genuinely is only islands)

**Keep the global programme names.** Thirst Relief, Feed Our World, OrphanKind, Emergency Response. Do not localise them into something geographically exclusionary — "Feed Our Islands" writes Guyana, Suriname and Belize out of their own programme.

**Jamaica is not shorthand for the Caribbean.** Do not let one nation's imagery, music, flag colours or vernacular stand in for thirty. Caribbean audiences notice immediately.

**The Muslim Caribbean is both Indo- and Afro-Caribbean.** Large Muslim communities in Trinidad, Guyana and Suriname descend from indentured labourers from South Asia; there are also long-established Afro-Caribbean Muslim communities. Imagery showing only one erases the other. Check every photo set for both.

**Not everyone speaks English.** Suriname is Dutch-speaking, Haiti French and Kreyòl, the Dominican Republic Spanish. If those countries are in scope, an English-only site excludes them — plan the i18n scaffolding even if English ships first.

**Name places specifically.** "A well in Berbice" beats "a well in the Caribbean". Specificity is what makes people recognise themselves; generic regional language is what makes them feel like a category.

**No tourism framing, no poverty framing.** Turquoise-water-and-palm-trees contradicts the ask. Imagery that reduces people to their need contradicts the dignity. Show people doing things, named where possible, photographed at eye level.

**Currency is plural.** TTD, JMD, GYD, XCD, USD, CAD. Never assume one, and never render an amount without its currency.

## Layout

- **Content container: 1190px**, centred. Full-bleed grounds, contained content.
- Page gutters: `clamp(1.5rem, 4vw, 4rem)`.
- Grids: `repeat(N, minmax(0, 1fr))` with `gap: 1.5rem`. Always `minmax(0, 1fr)` — bare `1fr` blows out on long words.
- Section vertical rhythm: `clamp(4rem, 8vw, 6.5rem)` top and bottom. Hero is the exception — `clamp(800px, 90svh, 1075px)`.
- Alternate grounds down the page: white → sand → white → ink. Never two identical grounds adjacent.
- Radii: `10px` cards, `100px` pills (buttons), `50%` dots. Nothing in between.

## Composition

- One primary action per page, repeated down it — not three competing buttons in a row.
- Every programme card carries: programme colour, Zakat-eligibility badge where it applies, a concrete impact statement, an entry amount, one link.
- Impact figures are specific and sourced. Where a real number is missing use a visible `[PLACEHOLDER]` — never invent a total, address or charity number.
- Islamic giving is first-class, not a subsection: Zakat eligibility is a property of a programme, and restricted funds (Zakat vs Sadaqah vs general) are modelled, never a loose tag.

## Accessibility floor

WCAG 2.2 AA. Body text ≥ 4.5:1, large display ≥ 3:1, hit targets ≥ 44px, visible focus rings on every interactive element, and the page must be operable at 200% zoom. Diaspora donors are largely on mobile — check every layout at 390px before calling it done.