---
name: pac-motion-and-buttons
description: "Motion language and button architecture for Penny Appeal Caribbean — the pseudo-element fill button, hover behaviour, timing scale and scroll reveals. Use when building any PAC button, link, card hover or scroll animation."
---

# PAC Motion & Buttons

Button architecture from oceanconservancy.org; motion restraint from globalcitizen.org; typeface from the Penny Appeal brand. Load `pac-design-foundation` alongside this.

## The button

One component, many colour contexts. The fill is a **pseudo-element behind the text**, not the button's own background — which lets the fill animate independently of the label and lets any context recolour it through one variable.

```css
.btn {
  --btn-fill:  var(--pac-orange);
  --btn-text:  #231F20;
  --btn-fill-hover: #231F20;
  --btn-text-hover: #FFFFFF;
  --scale: 1;

  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .6rem;

  border: none;
  border-radius: 100px;          /* full pill */
  padding: 1.25rem 2rem;
  min-height: 56px;

  font-family: proxima-nova, Arial, Helvetica, sans-serif;
  font-weight: 800;
  font-size: 1.125rem;           /* 18px */
  line-height: 1.11;
  letter-spacing: 0.16em;        /* wide — this is the signature */
  text-transform: uppercase;
  text-decoration: none;
  color: var(--btn-text);
  cursor: pointer;
  transition: color .3s ease;
}

.btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--btn-fill);
  transform: scale(var(--scale, 1));
  transition: background-color .3s ease, transform .3s ease;
}

.btn:hover, .btn:focus-visible {
  color: var(--btn-text-hover);
  --scale: 1.04;
}
.btn:hover::before, .btn:focus-visible::before {
  background-color: var(--btn-fill-hover);
}
.btn:active { --scale: .98; }
.btn:focus-visible { outline: 3px solid var(--pac-orange); outline-offset: 3px; }
```

Why it is built this way:

- The `::before` at `z-index: -1` means the fill can scale, recolour or wipe while the label stays perfectly still. A background on the button itself cannot do that.
- `--btn-fill` / `--btn-text` are the only things a variant changes. Programme buttons set `--btn-fill: var(--prog-thirst)` and nothing else.
- **The wide `0.16em` tracking is the signature.** Do not drop it. It is slightly tighter than the Ocean Conservancy reference because Proxima Nova at weight 800 is heavier than their Inter 600 and needs marginally less air to read as open.

A donate CTA is the most important control on the page: 18px, 56px tall, generous padding. Never render it as fine print.

**Contrast:** default label colour is ink, not white — the brand orange and the three bright programme colours all fail white text. See `pac-design-foundation`. Only `#231F20` fills take white labels.

### Variants

```css
.btn[data-variant="ghost"] {
  --btn-fill: transparent; --btn-text: #FFFFFF;
  --btn-fill-hover: #FFFFFF; --btn-text-hover: #231F20;
}
.btn[data-variant="ghost"]::before { outline: 2px solid currentColor; outline-offset: -2px; }
.btn[data-programme="thirst"] { --btn-fill: var(--prog-thirst); }
.btn[data-programme="feed"]   { --btn-fill: var(--prog-feed); }
.btn[data-programme="orphan"] { --btn-fill: var(--prog-orphan); }
```

### Labels

Button copy follows the language rules in `pac-design-foundation`. Say "Donate", "Give monthly", "Support Thirst Relief" — never regional shorthand like "Help our islands", which excludes Guyana, Suriname and Belize.

## Timing scale

Four durations. Nothing else.

| Token | Value | Use |
|---|---|---|
| `--t-instant` | `.1s ease-out` | Dot states, tiny affordances |
| `--t-fast` | `.3s ease` | Buttons, links, card hovers — the default |
| `--t-slow` | `.75s ease-out` | Slide cross-fades, section reveals |
| `--t-ambient` | `5.6s ease-out` | Ken Burns only |

Ease-out for anything entering or responding to a pointer. Never `linear` except on `z-index`. Never bounce or elastic — this is a humanitarian charity, not a game.

## Motion principles

Global Citizen carries two `@keyframes` on its entire homepage. The restraint is the lesson: **transitions on state, not animations on load.**

- Animate `transform` and `opacity` only. Never `width`, `height`, `top`, `left` — they force layout.
- One thing moves at a time. If the fill is moving, the text is still.
- Scroll reveals: `opacity 0 → 1` with `translateY(12px) → 0` over `--t-slow`, triggered once by `IntersectionObserver` at ~15% visibility. Fire once, then unobserve. Never re-animate on scroll-up, and never stagger more than three items.
- Content must be visible without JS — reveals are an enhancement applied by a class the observer adds, so the no-JS default is the finished state.

## Card and link hovers

```css
.card { transition: transform var(--t-fast), box-shadow var(--t-fast); }
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(35,31,32,.12); }

.link-arrow svg { transition: transform var(--t-fast); }
.link-arrow:hover svg { transform: translateX(4px); }
```

Underline links with `text-underline-offset: 0.2em`. Never remove underlines from inline body links.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Colour and state changes still apply instantly — only movement is removed. Scroll-revealed content must be visible, not stuck at `opacity: 0`.