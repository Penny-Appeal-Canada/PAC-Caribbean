---
name: web-design-guidelines
description: "Audit UI code against Vercel's Web Interface Guidelines plus the Penny Appeal Caribbean gates — accessibility, focus, forms, animation, performance, i18n. Use for \"review my UI\", \"check accessibility\", \"audit the design\", or before shipping any page."
---

# Web Design Review

Reviews UI code against two rulesets: **Vercel's Web Interface Guidelines** (fetched live, so it never goes stale) and the **project's own gates**.

Adapted from [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills). The guidelines are Vercel's work and are fetched from source rather than copied here — always credit them when reporting findings.

## Procedure

### 1. Fetch the current ruleset

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Fetch this **before every audit**. It is the authoritative list — roughly 90–100 rules across accessibility, focus states, forms, animation, typography, content handling, images, performance, navigation, touch, safe areas, theming, i18n, hydration, hover states, copy, and a set of flagged anti-patterns.

If the fetch fails, fall back to the category checklist in §4 and **say so in the report** — a fallback audit is less complete and the reader needs to know.

### 2. Identify what to review

If the user named files or globs, use those. If not, ask which files — do not guess, and do not audit the whole tree by default.

### 3. Review and report

Report findings as `file:line — issue`, one per line, most severe first. Be concrete: name the rule, name the fix. No preamble, no restating the ruleset back.

Rank by real consequence:

1. **Blocks someone** — keyboard traps, missing labels, contrast failures, hit targets under 44px, content invisible without JS
2. **Breaks or misleads** — hydration mismatches, layout thrash, wrong input types, destructive actions without confirmation
3. **Polish** — typography, copy, motion detail

Say so plainly when a file is clean. A short honest report beats a padded one.

### 4. Fallback checklist

Use only if the fetch fails. Categories, not the rules themselves:

Accessibility (ARIA, semantic HTML, keyboard, focus management, heading order, captions) · Focus states (`:focus-visible`, sticky z-order) · Forms (input types, labels, autocomplete, error handling) · Animation (reduced-motion, compositor-only properties, interruptibility) · Typography (Unicode punctuation, number formatting, heading wrap) · Content handling (truncation, empty states, long text) · Images (dimensions, lazy-loading, priority) · Performance (virtualization, layout thrashing, preconnect) · Navigation (URL-driven state, link semantics, destructive confirmation) · Touch (touch-action, gesture alternatives) · Safe areas (notch, scrollbar, layout) · Theming (`color-scheme`, `theme-color`) · i18n (Intl APIs, lang, translation markers) · Hydration (controlled inputs, date rendering) · Hover states · Copy (voice, numerals, button specificity).

## Project gates

Run these **in addition**, every time. They are not in Vercel's list and they are where this project actually fails.

**Contrast — measure, never eyeball.** Compute the ratio; do not assume. On this project three of four programme colours fail white text (`#00A5CE` 2.89:1, `#EF7C00` 2.78:1, `#F05B89` 3.20:1) and must carry ink `#231F20` instead. Programme colours used as text on white need the darkened `-text` variants. Body ≥ 4.5:1, large display ≥ 3:1.

**Hit targets ≥ 44px.** A 15px carousel dot passes visually and fails in the hand — check the *button* box, not the painted circle.

**Reduced motion.** Every transition, animation and autoplay must be disabled under `prefers-reduced-motion`. Scroll-revealed content must end up **visible**, never stranded at `opacity: 0`.

**Works without JS.** Reveal animations are an enhancement. The no-JS state is the finished state, not a blank page.

**One `<h1>` per page**, heading levels in order, no skips.

**Region language** (see `pac-design-foundation`). Flag "islands" used as a synonym for the Caribbean — Guyana, Suriname and Belize are mainland. Flag localised programme names that exclude them. Flag amounts rendered without a currency.

**Fabricated facts.** Flag any total, address, charity number, statistic or date that is not sourced or bracketed as `[PLACEHOLDER]`. Inventing a fundraising figure is a more serious defect than any styling issue in this list.

**Check at 390px.** Most donor traffic is mobile. A layout only reviewed at desktop width has not been reviewed.

## Scope

This skill **reports**; it does not rewrite. Fix things only when asked, and then fix exactly what was named — an audit is not licence to redesign.