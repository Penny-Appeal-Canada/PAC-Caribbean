---
name: pac-hero-carousel
description: "Build the Penny Appeal Caribbean hero — a cross-fading programme carousel with an animated key-word highlight sweep, reverse Ken Burns and dot navigation. Use when building or editing the PAC homepage hero or any hero slide."
---

# PAC Hero Carousel

Reverse-engineered from thehumaneleague.org (Next.js, hand-rolled — no slider library; don't add one). Load `pac-design-foundation` alongside this.

Four slides, one per programme. The key word in each headline is highlighted in that programme's colour by a sweeping fill.

| Slide | Programme | Fill | Text on fill |
|---|---|---|---|
| 1 | Thirst Relief | `#00A5CE` | `#231F20` |
| 2 | Feed Our World | `#F05B89` | `#231F20` |
| 3 | OrphanKind | `#EF7C00` | `#231F20` |
| 4 | Emergency Response | `#231F20` | `#FFFFFF` |

Text on the fill is **ink, not white**, for the three bright colours — white fails contrast on all three. Emergency Response inverts.

**Use the programme names exactly as above.** Do not localise them — "Feed Our Islands" and similar excludes Guyana, Suriname and Belize, which are not islands. See the language rules in `pac-design-foundation`.

## The highlight sweep

The whole effect is an animated `background-size` on a flat `linear-gradient`. No JS animation, no library.

```html
<h2 class="hero-heading">
  Clean water for
  <mark class="highlight" data-programme="thirst">
    <span class="hl-word" style="--duration:.45s; --delay:0s">every</span>
    <span class="hl-word" style="--duration:.45s; --delay:.12s">community</span>
  </mark>
</h2>
```

```css
.highlight {
  --highlight-fill: currentColor;
  --highlight-text: #231F20;
  background: transparent;
  margin-right: 0.15em;
}
.highlight[data-programme="thirst"]    { --highlight-fill:#00A5CE; --highlight-text:#231F20; }
.highlight[data-programme="feed"]      { --highlight-fill:#F05B89; --highlight-text:#231F20; }
.highlight[data-programme="orphan"]    { --highlight-fill:#EF7C00; --highlight-text:#231F20; }
.highlight[data-programme="emergency"] { --highlight-fill:#FFFFFF; --highlight-text:#231F20; }

.hl-word {
  display: inline-block;
  padding: 0 0.15em;
  margin-left: -0.15em;
  background-image: linear-gradient(var(--highlight-fill), var(--highlight-fill));
  background-repeat: no-repeat;
  background-position: 0 0.0375em;
  background-size: 0 calc(100% - 0.075em);   /* collapsed */
  color: inherit;
  transition-property: color, background-size, text-shadow;
  transition-duration: var(--duration, .45s);
  transition-delay: var(--delay, 0s);
  text-rendering: optimizeLegibility;
}
.hl-word:first-child { transition-timing-function: ease-in; }
.hl-word:last-child  { transition-timing-function: ease-out; }
.hl-word[data-reversed] { background-position: 100% 0.0375em; }  /* sweep right→left */

.hl-word[data-active] {
  background-size: 100% calc(100% - 0.075em);
  color: var(--highlight-text);
  text-shadow: none;
}
```

Details that matter and are easy to lose:

- `calc(100% - 0.075em)` insets the bar top and bottom so it hugs the text rather than filling the line box.
- The negative `margin-left` cancels the padding so highlighted and unhighlighted words keep the same rhythm.
- **Per-word `--delay` staggers the sweep.** Scale `--duration` down as word count rises (~0.9s for one word, ~0.3s each for three) so total sweep time stays constant.
- `text-shadow` is removed on activation — the heading carries a shadow for legibility over photography, and it is no longer needed once a solid fill sits behind the word. Copy this; it is the detail that makes it look finished.
- Toggle by setting `data-active` when the slide becomes active. Nothing else.

## Heading

Proxima Nova **800** — the brand's heading weight. Do not use 700: the reference site's Montserrat 700 is a different typeface with different optical weight, and Proxima at 700 reads thin at display size.

```css
.hero-heading {
  font-family: proxima-nova, Arial, Helvetica, sans-serif;
  font-size: clamp(3rem, 2.274rem + 2.98vw, 5.188rem);  /* 48 → 83px */
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  font-weight: 800;
  max-width: 7.2em;
  text-shadow: 0 0 0.25em rgba(35, 31, 32, 0.35);
  position: relative;
  z-index: 2;
}
```

Supporting copy: `1.3125rem`, weight 500, `max-width: 19em`. Content column is a narrow left column (~40%), never full width.

## Slide mechanics

Carousel: `height: clamp(800px, 90svh, 1075px)`, `position: relative`. Slides stack absolutely at `inset: 0`, `overflow: hidden`.

**Cross-fade, not slide.**

```css
.slide            { opacity: 0; transition: opacity 0s linear .75s, z-index linear; z-index: 0; }
.slide[data-active]{ opacity: 1; transition: opacity .75s ease-out, z-index linear; z-index: 1; }
```

The outgoing slide's opacity snaps after a `0.75s` delay rather than fading — only one element animates at a time, so there is no muddy double-fade.

**Content enters with a 1rem drift**, direction-aware:

```css
@keyframes slideContentInForwards  { 0%,20% { transform: translateX(1rem);  opacity:0 } 100% { transform:none; opacity:1 } }
@keyframes slideContentInBackwards { 0%,20% { transform: translateX(-1rem); opacity:0 } 100% { transform:none; opacity:1 } }
```

The `0%,20%` hold delays the drift so it trails the fade instead of racing it.

**Ken Burns runs backwards** — `scale(1.1)` → `scale(1)` while active, `transition: transform 5.6s ease-out`. Zooming *out* keeps the subject settling into place rather than pushing out of frame. Set `will-change: transform`; source images at 110% of the frame.

Autoplay ~5.6s per slide so the zoom completes as the slide changes. Pause on hover and on focus within.

## Slide imagery

Each slide carries a photograph and a visible credit. Requirements:

- People at eye level, doing something, named in the caption where consent allows. Never anonymous suffering.
- Across the four slides, show **both Indo-Caribbean and Afro-Caribbean** communities — the Muslim Caribbean is both, and a set showing only one erases the other.
- Name the place in the credit or caption. "Berbice, Guyana" beats "the Caribbean".
- No turquoise-water-and-palm-tree tourism framing; it contradicts the ask.

## Navigation dots

```css
.dot {
  width: 15px; height: 15px; border-radius: 50%;
  background: #fff; border: none; opacity: .2; cursor: pointer;
  transition: opacity .1s ease-out, transform .1s ease-out;
}
.dot:hover, .dot:focus-visible { transform: scale(1.3); opacity: .6; }
.dot[data-active] { opacity: 1; pointer-events: none; }
```

Gap `20px`, aligned to the content container, `bottom: max(6rem, 50% - 17.5rem)`. Each dot is a real `<button>` carrying a visually-hidden slide number. Wrap in `role="tablist"`, expose `aria-selected`, and support arrow keys.

**Hit target:** 15px fails the 44px minimum. Keep the 15px visual but pad the button to 44px with a transparent box.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .hl-word, .slide, .background-media, .dot { transition: none; animation: none; }
  .background-media { transform: none; }
}
```

Highlights render filled immediately, slides cut, Ken Burns is off, autoplay does not run.

## Architecture

Use `:where()` for base component styles so consumers can override without specificity fights. Drive every variant from data attributes and custom properties — `data-programme`, `data-active`, `--duration`, `--delay` — never by swapping class names in JS.