# Ultra-Sharp Web Rendering — The Complete Science

> Everything that makes premium websites (Linear, Stripe, Vercel, Apple, Claude.ai) look impossibly crisp.
> Framework-agnostic principles, with Tailwind CSS v4 implementation examples.
> This document is pure rendering science — no project-specific design decisions.

---

## How to use this document

The companion file APP-DESIGN.md contains a compact checklist for daily reference. This document is the comprehensive deep-dive: the *why* behind each technique, the browser mechanics, the edge cases, and the full code examples. 50 techniques across 19 sections. Read this once to understand. Use the checklist daily.

---

## 1. Font Rendering Pipeline

### The four layers

A character goes through four rendering stages before it appears on screen. Each stage can add or remove sharpness:

```
1. Font file format    → woff2 with hinting data
2. Rasterization       → antialiased vs subpixel
3. OpenType features   → kerning, ligatures, numeric variants
4. Optical sizing      → stroke weight per font-size
```

### Layer 1: Font file format (woff2)

**woff2** uses Brotli compression (30% smaller than woff1) and preserves TrueType/OpenType hinting instructions. Hinting tells the rasterizer exactly which pixels to light up at small sizes — it's the difference between a crisp "e" and a blurry blob at 12px.

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/InterVariable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;    /* Text visible immediately, swaps when loaded */
  font-style: normal;
}
```

Key rules:
- **Always self-host** via `next/font/local` or manual `@font-face` — no Google Fonts CDN latency
- **Always woff2** — the only format you need for modern browsers
- **Always `font-display: swap`** — prevents invisible text during load (FOIT)
- **Subset if possible** — only include character ranges you actually use. Keeps fonts under 60KB total

### Layer 2: Rasterization (antialiasing)

macOS has two font rendering modes:

| Mode | CSS | How it works | Result |
|------|-----|-------------|--------|
| Subpixel (default) | `subpixel-antialiased` | Uses individual R/G/B subpixels for 3x horizontal resolution | Bolder, slightly fuzzy |
| Grayscale | `antialiased` | Uses whole-pixel opacity only | Thinner, razor-sharp, consistent |

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

In Tailwind: apply `antialiased` class to `<body>`.

**Why grayscale wins for web UI:** Subpixel rendering was designed for low-DPI CRT monitors. On modern retina displays (2x+), the extra subpixel resolution is invisible — but the bolder rendering remains, making text look "heavy." Grayscale antialiasing produces consistent weight across all displays, which reads as "sharp."

**Exception:** Very small text (<11px) on non-retina displays can benefit from subpixel rendering. But if your minimum text size is 12px+ (it should be), grayscale is always better.

### Layer 3: OpenType features

OpenType fonts contain optional features that improve rendering. These are NOT cosmetic — they change how the browser calculates character positions.

**Core features (enable globally):**

```css
/* Global: enable on body */
font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
```

| Feature | Tag | What it does | Impact on sharpness |
|---------|-----|-------------|---------------------|
| Kerning | `kern` | Adjusts space between specific letter pairs (AV, To, We) | Eliminates gaps that read as "uneven" |
| Ligatures | `liga` | Combines certain letter pairs into single glyphs (fi, fl, ffl) | Removes collisions between characters |
| Contextual alternates | `calt` | Adjusts letterforms based on surrounding characters | Smoother word shapes |
| Tabular numerals | `tnum` | Fixed-width digits (all numbers same width) | Columns align perfectly — critical for data UIs |

**Extended features (context-specific):**

```css
/* Tabular figures for data/prices — digits align in columns */
.price, .table-cell, .stats {
  font-variant-numeric: tabular-nums;
}

/* Oldstyle figures in body text — digits "sit" like lowercase letters */
.body-text {
  font-variant-numeric: oldstyle-nums;
}

/* Professional fractions: 1/2 → ½ */
.recipe, .fraction {
  font-variant-numeric: diagonal-fractions;
}

/* Discretionary ligatures — decorative letter combinations */
.prose {
  font-variant-ligatures: common-ligatures discretionary-ligatures;
}

/* Slashed zero — differentiate 0 from O in code and data */
.code, .mono {
  font-variant-numeric: slashed-zero;
}

/* Case-sensitive forms — parentheses and hyphens align to cap height */
.uppercase-text {
  font-feature-settings: "case";
}

/* True small caps — designed glyphs, not scaled capitals */
.label {
  font-variant-caps: all-small-caps;
}

/* Ordinal indicators: 1st, 2nd, 3rd with superscript letters */
.ordinal {
  font-variant-numeric: ordinal;
}

/* Stylistic sets — font's "hidden" alternate glyphs */
/* Inter has 20+ stylistic sets with alternative letterforms */
.brand-text {
  font-feature-settings: "ss01", "ss02";
}
```

**Critical rule: prefer `font-variant-*` over `font-feature-settings`:**

`font-variant-*` properties are semantic and composable. `font-feature-settings` is low-level and overrides everything when re-declared. Always use high-level properties when they exist:

```css
/* Good — composable, semantic */
.element {
  font-variant-numeric: tabular-nums oldstyle-nums;
  font-variant-ligatures: common-ligatures;
  font-kerning: normal;
}

/* Problematic — overrides ALL features on re-declaration */
.element {
  font-feature-settings: "tnum", "onum", "liga", "kern";
}
/* If you add "ss01" elsewhere, you must re-declare ALL features */
```

**The Tailwind v4 way** — bind features to the font definition so they apply automatically:

```css
@theme {
  --font-sans: "Inter Variable", system-ui;
  --font-sans--font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}
```

Now every `font-sans` element gets these features without extra classes. Much cleaner than setting `font-feature-settings` on body.

> **Note on `opsz`:** You may see examples that add `--font-sans--font-variation-settings: "opsz" 32;` here. This hardcodes optical sizing to 32px for all text, which overrides the browser's automatic per-size adjustment. The recommended approach is `font-optical-sizing: auto` on `body` (see Layer 4 below), which lets the browser choose the correct optical weight at every font-size. Only add a manual `opsz` override if you need a specific optical weight in a specific context (e.g., `"opsz" 72` on a hero heading).

**Inter's character variants explained:**
- `cv02` = open 4 (the top doesn't close — easier to distinguish from 9 in data)
- `cv03` = open 6 (same principle)
- `cv04` = open 9
- `cv11` = single-storey a (more geometric, matches Inter's design intent)
- Inter also has 20+ stylistic sets (`ss01` gives an alternative lowercase 'a', etc.)

### Layer 4: Optical sizing

Variable fonts can auto-adjust stroke weight based on font-size. At 12px, strokes are slightly thicker for legibility. At 48px, strokes are more delicate for elegance. This is NOT the same as font-weight — it's an independent axis.

```css
font-optical-sizing: auto;    /* Enable automatic optical sizing */
```

Or via variation settings for manual control:
```css
--font-sans--font-variation-settings: "opsz" 32;
```

The "opsz" value represents the "design size" — the optical size the font was designed for. Setting it to 32 tells the font to render as if it's always being displayed at 32px, which gives a more refined look at all sizes.

> **Recommendation:** Use `font-optical-sizing: auto` as your default (shown above). The manual `"opsz"` override is useful for specific components where you want a fixed optical weight regardless of actual font-size — but applying it globally via `@theme` means 12px labels and 72px headings both render with 32px stroke weights, which reduces sharpness at both extremes.

### Layer 5: Text rendering mode

```css
text-rendering: optimizeLegibility;
```

This is a hint to the browser to prioritize legibility over speed. It enables:
- Kerning (same as `kern` feature)
- Ligatures (same as `liga` feature)
- More precise glyph positioning

**Caution:** On mobile Safari, `optimizeLegibility` can cause jank on long paragraphs (thousands of characters). Apply to headings and short text only. For body text, use `font-kerning: normal` + `font-variant-ligatures: common-ligatures contextual` instead — they give the same visual result via a faster codepath.

### Layer 6: Font loading strategy (differentiated)

`font-display: swap` is the minimum. The world-class approach differentiates by font role:

```css
/* Body font — optional = zero layout shift, ever */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/InterVariable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: optional;
}

/* Display/heading font — swap is OK, visually more important */
@font-face {
  font-family: 'Sentient';
  src: url('/fonts/Sentient.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

With `optional`, the browser gives the font ~100ms to load. If it misses that window, the fallback renders for the entire page lifecycle — no swap, no layout shift, ever. Combined with `<link rel="preload">` for the most critical font, it's virtually guaranteed to load in time.

### Layer 7: unicode-range splitting

```css
/* Latin — always loaded */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F;
}

/* Latin Extended — loaded only if characters appear on page */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-latin-ext.woff2') format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+20A0-20AB;
}
```

The browser only downloads font files if characters from that unicode-range actually exist on the page. This is free performance — a full Inter Variable is ~300KB, a subset for Western European with specific features can be under 50KB.

### The complete font rendering stack

```css
@layer base {
  html {
    hanging-punctuation: first last;   /* Optical margin alignment */
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-optical-sizing: auto;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures contextual;
  }

  h1, h2, h3, h4, h5, h6 {
    text-rendering: optimizeLegibility;  /* Only on headings — too expensive for body */
    text-wrap: balance;
  }

  p, li, blockquote, figcaption {
    text-wrap: pretty;
  }
}

@theme {
  --font-sans: "Inter Variable", system-ui;
  --font-sans--font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  /* Optical sizing handled by font-optical-sizing: auto on body above */
  /* Only add --font-sans--font-variation-settings: "opsz" N; for specific overrides */
}
```

---

## 2. Border Rendering on Retina Displays

### The 0.5px technique

On a 2x retina display:
- `1px` CSS = 2 physical pixels → looks "thick"
- `0.5px` CSS = 1 physical pixel → true hairline

```css
.hairline-border {
  border-width: 0.5px;
}

/* Fallback for older browsers that round 0.5px to 0px */
@supports not (border-width: 0.5px) {
  .hairline-border {
    border-width: 1px;
  }
}
```

**Where to use hairlines:**
- Internal dividers within cards
- Grid lines in data tables
- Subtle separators between sections

**Where NOT to use hairlines:**
- Card edges (1px is correct — needs to be visible)
- Input borders (1px for clear interaction affordance)
- Focus rings (2px for accessibility)

### Border color opacity trick

Instead of making borders thinner, you can make them more transparent for a softer look:

```html
<!-- Standard border -->
<div class="border border-gray-200">

<!-- Softer, ghosted border (same width, lower visual weight) -->
<div class="border border-gray-200/60">

<!-- Using opacity on OKLCH -->
<div class="border" style="border-color: oklch(87% 0.01 80 / 0.6)">
```

This renders at full 1px width but with lower visual contrast — a technique Apple uses extensively.

---

## 3. Shadow Science

### Why single shadows look flat

A single `box-shadow: 0 4px 12px rgba(0,0,0,0.1)` creates a uniform blur that doesn't match how real objects cast shadows. In the physical world, shadows have:

1. A **contact shadow** (tight, dark, right at the base)
2. An **ambient shadow** (soft, wide, lighter)
3. Optionally a **distant shadow** (very soft, very wide)

### Layered shadow recipe

```css
/* 3-layer shadow for card elevation */
box-shadow:
  0 1px 0 rgba(0, 0, 0, 0.04),     /* Contact: barely visible, 0 blur */
  0 2px 6px rgba(0, 0, 0, 0.04),    /* Near: small blur, medium offset */
  0 8px 24px rgba(0, 0, 0, 0.06);   /* Ambient: large blur, big offset */
```

**Rules for warm/sand backgrounds:**
- Keep total opacity under 0.15 (sum of all layers)
- Warm backgrounds amplify shadow visibility — use lower opacities than on white
- The `rgba(0,0,0,...)` approach is better than colored shadows for neutrality

### Context-specific shadows

| Element | Shadow | Why |
|---------|--------|-----|
| Default card | `shadow-none` | Flat with border — shadows are for elevation states |
| Card hover | Layered 3-shadow | Indicates interactivity |
| Dropdown/popover | `shadow-lg` | Needs clear separation from content below |
| Modal dialog | `shadow-2xl` | Highest elevation, dramatic separation |
| Sticky header | `shadow-[0_1px_3px_rgba(0,0,0,0.04)]` | Ultra-subtle, just enough to indicate "floating" |
| Bottom nav (mobile) | `shadow-[0_-1px_3px_rgba(0,0,0,0.04)]` | Same but direction reversed |
| Toast notification | `shadow-lg` | Needs to "float" above content |

### Micro-shadows (the premium detail)

Standard Tailwind shadows (`shadow-sm`, `shadow-md`) are designed for general use. But sticky/floating elements need something more subtle:

```css
/* Sticky header — almost invisible */
.sticky-header {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* Bottom-anchored element */
.bottom-nav {
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.04);
}
```

The `0.04` opacity is key — it's just barely visible. On a warm sand background, even this small shadow creates enough contrast to separate layers. Going higher (like `shadow-sm` at `0.05`) feels too heavy.

### Glow shadows (for dark backgrounds / landing pages)

On dark backgrounds, shadows become invisible. Premium sites use **glow** instead:

```css
/* Colored glow for accent buttons */
.glow-button {
  box-shadow: 0 0 24px rgba(157, 23, 77, 0.3);   /* accent color with low opacity */
}
.glow-button:hover {
  box-shadow: 0 0 32px rgba(157, 23, 77, 0.4);   /* slightly larger + brighter */
}
```

The `0 0` offset means the glow emanates equally in all directions — like neon light. This is only for landing pages and dark mode, never for the app's light sand background.

---

## 4. Animation & Transition Quality

### The GPU rule

Browsers have two rendering paths:

| Path | Properties | Performance |
|------|-----------|-------------|
| **GPU (compositor)** | `transform`, `opacity`, `filter` | 60fps, no reflow |
| **CPU (main thread)** | `width`, `height`, `top`, `left`, `padding`, `margin`, `border-width`, `font-size` | Triggers layout recalculation, causes jank |

**Always animate GPU properties only:**

```css
/* FAST — GPU handles this */
transition: transform 200ms ease, opacity 200ms ease;

/* SLOW — triggers layout on every frame */
transition: width 200ms, height 200ms, padding 200ms;
```

### Why transition-all is an anti-pattern

```html
<!-- BAD: transitions EVERY property including layout-triggering ones -->
<div class="transition-all duration-200">

<!-- GOOD: only transitions what you actually need -->
<div class="transition-colors duration-150">
<div class="transition-[transform,opacity,box-shadow] duration-200">
```

`transition-all` tells the browser to watch **every CSS property** for changes. Even if only `background-color` changes on hover, the browser still has to check and potentially animate all other properties. This wastes GPU resources and can cause frame drops on lower-end devices.

### Easing curves

The default `ease` curve (`cubic-bezier(0.25, 0.1, 0.25, 1)`) is adequate but generic. Premium sites use custom curves:

```
Entrance (element appears):    cubic-bezier(0.16, 1, 0.3, 1)
  → Starts fast, decelerates smoothly. Feels "natural" like something sliding into place.

Exit (element leaves):         cubic-bezier(0.7, 0, 0.84, 0)
  → Starts slow, accelerates away. Feels like something being "pulled" off screen.

Springy/tactile:               cubic-bezier(0.34, 1.56, 0.64, 1)
  → Overshoots slightly, then settles. Feels "physical" like a rubber band.
```

The entrance curve `(0.16, 1, 0.3, 1)` is used by Vercel, Linear, and many premium sites. It's the recommended default for most UI transitions.

### @starting-style (CSS-only enter animations)

Before Tailwind v4 / `@starting-style`, entering elements required JavaScript:

```jsx
// OLD: JavaScript mount animation
const [isVisible, setIsVisible] = useState(false)
useEffect(() => { setIsVisible(true) }, [])
<div className={isVisible ? 'opacity-100' : 'opacity-0'}>
```

This causes a 1-frame flicker because the element renders at `opacity-0` first, then React updates to `opacity-100` on the next frame.

**CSS-only solution with @starting-style:**

```css
dialog[open] {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;

  @starting-style {
    opacity: 0;
    transform: translateY(16px);
  }
}
```

In Tailwind v4:
```html
<dialog class="transition-all duration-300 opacity-100 scale-100
               starting:opacity-0 starting:scale-95">
```

The browser knows to start from the `@starting-style` values and transition to the normal values — no JavaScript, no flicker, no extra render cycle.

### transition-discrete (animating display)

Normally, `display: none` → `display: block` is instantaneous — the element pops into existence. `transition-discrete` tells the browser to delay the `display` change until the opacity/transform transition completes:

```html
<div class="transition-all transition-discrete duration-300
            opacity-100 starting:opacity-0">
```

Without `transition-discrete`, the element would appear at full opacity instantly (because `display` isn't animatable by default). With it, the browser:
1. Sets `display: block`
2. Renders at `opacity: 0` (from `starting:`)
3. Transitions to `opacity: 1` over 300ms

This is the native CSS replacement for libraries like Framer Motion's `AnimatePresence`.

---

## 5. Backdrop Effects (Frosted Glass)

### The three-property recipe

```css
.frosted-glass {
  background: rgba(255, 255, 255, 0.8);    /* Semi-transparent bg */
  backdrop-filter: blur(16px);              /* Blur what's behind */
  backdrop-filter: saturate(1.5);           /* Restore color vibrancy */
}
```

In Tailwind:
```html
<nav class="bg-white/80 backdrop-blur-lg backdrop-saturate-150">
```

### Why saturate is crucial

`backdrop-blur` alone desaturates the blurred content — colors become washed out and grayish. This is a physical property of blur (averaging nearby pixels reduces chroma).

`backdrop-saturate-150` compensates by boosting saturation 50% on the blurred result. The visual effect: the background remains colorful and vibrant through the frosted glass, instead of looking like a dirty window.

**Apple, Claude.ai, and Linear all use this pattern.** The saturate boost is the difference between "premium frosted glass" and "janky blur overlay."

### Context-specific recipes

```html
<!-- Sticky header -->
<header class="sticky top-0 z-40
               bg-white/80 backdrop-blur-lg backdrop-saturate-150
               border-b shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

<!-- Mobile bottom nav -->
<nav class="fixed bottom-0 inset-x-0 z-40
            bg-white/70 backdrop-blur-xl backdrop-saturate-150
            border-t border-white/20">

<!-- Command palette backdrop -->
<div class="fixed inset-0 bg-black/25 backdrop-blur-sm">

<!-- Command palette itself -->
<div class="bg-white/80 backdrop-blur-xl border shadow-2xl rounded-xl">

<!-- Modal dialog backdrop -->
<div class="fixed inset-0 bg-black/25 backdrop-blur-sm">
```

**Mobile nav uses `bg-white/70` (more transparent)** because the backdrop-blur effect is more visible on mobile (smaller viewport = content is closer behind the nav). Desktop sticky headers use `bg-white/80` because there's more content variety behind them.

---

## 6. Layout Shift Prevention (CLS)

### Why CLS destroys perceived quality

CLS (Cumulative Layout Shift) measures how much the page "jumps" during loading. A CLS score above 0.1 feels janky. Premium sites target < 0.05.

The human eye is extremely sensitive to unexpected movement. Even a 2px shift in a heading is subconsciously perceived as "something is wrong with this site." This registers as low quality, even if the user can't articulate why.

### Fixed dimensions strategy

```
Every async element needs a pre-defined size:
├── Sidebar: w-[220px] (never w-auto or flex-grow)
├── Top bar: h-11 (44px, never h-auto)
├── Tab bar: h-11 (44px)
├── Chart containers: aspect-video or h-[200px]
├── Image containers: explicit width + height, or aspect-ratio
├── Skeleton loaders: SAME height as final content
└── Font display: swap (text visible immediately)
```

### Skeleton loading done right

```html
<!-- BAD: skeleton height doesn't match final content -->
<div class="h-8 bg-gray-200 animate-pulse rounded" />   <!-- 32px -->
<!-- Final content renders at 48px → 16px layout shift -->

<!-- GOOD: skeleton matches exact final height -->
<div class="h-12 bg-gray-200 animate-pulse rounded" />  <!-- 48px -->
<!-- Final content: 48px → zero shift -->
```

### Image CLS prevention

```html
<!-- BAD: no dimensions → CLS when image loads -->
<img src="/photo.jpg" alt="..." />

<!-- GOOD: explicit dimensions → space reserved -->
<img src="/photo.jpg" alt="..." width="400" height="300" />

<!-- BEST: aspect-ratio container -->
<div class="aspect-video overflow-hidden rounded-lg">
  <img src="/photo.jpg" alt="..." class="w-full h-full object-cover" />
</div>
```

Next.js `<Image>` component handles this automatically — always use it for raster images.

### Font CLS prevention

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/InterVariable.woff2') format('woff2');
  font-display: swap;        /* Show fallback immediately */
  size-adjust: 100%;         /* Minimize metric shift between fallback and custom font */
  ascent-override: 90%;      /* Match fallback font metrics */
  descent-override: 22%;
  line-gap-override: 0%;
}
```

`next/font` calculates these overrides automatically, which is why self-hosting via Next.js is the recommended approach.

---

## 7. Typography Polish

### text-balance (headings)

```html
<h1 class="text-balance">A heading that wraps nicely across multiple lines</h1>
```

`text-wrap: balance` distributes text evenly across lines. Without it, a 2-line heading might have 40 characters on line 1 and 5 characters on line 2. With it, both lines are approximately equal length.

**Browser limitation:** Only works on blocks with ≤6 lines (performance constraint). Perfect for headings, not suitable for body text.

### text-pretty (body paragraphs)

```html
<p class="text-pretty">A paragraph that avoids leaving one lonely word on the last line</p>
```

`text-wrap: pretty` prevents "orphans" — a single word stranded on the last line of a paragraph. This is a centuries-old typographic rule that makes text look "finished" rather than "cut off."

**Use on:** all body paragraphs, descriptions, card text.
**Don't use on:** headings (use `text-balance` instead), single-line text, labels.

### Optimal line length (max-w-prose)

```html
<article class="max-w-prose">
  <p class="text-pretty leading-relaxed">...</p>
</article>
```

`max-w-prose` = `65ch` (65 characters per line). Research on reading speed and comprehension consistently shows:
- **< 45ch** = too narrow, eyes jump lines too frequently
- **45-75ch** = optimal range
- **65ch** = sweet spot
- **> 80ch** = too wide, eyes lose their place when returning to the next line

Wide text (100ch+) is the single most common typography mistake on the web. It subconsciously reads as "amateurish" because it violates a fundamental reading ergonomic.

**When to use:** Article content, descriptions, onboarding text, email templates.
**When NOT to use:** Dashboard grids (card widths are naturally constrained), navigation, data tables.

### Numeric typography

```html
<!-- Tabular nums: all digits same width (columns align) -->
<span class="tabular-nums">1,234.56</span>

<!-- Slashed zero: distinguish 0 from O -->
<span class="slashed-zero">0.045</span>

<!-- Combined for data displays -->
<span class="font-mono tabular-nums slashed-zero">$1,400.00</span>
```

**tabular-nums** is critical for any vertically-aligned numbers (tables, price lists, metrics). Without it, numbers like "111" and "888" have different widths, causing columns to misalign.

**slashed-zero** adds a diagonal slash through zero. In data-heavy UIs where users scan numbers quickly, the distinction between 0 and O prevents misreading.

### hanging-punctuation (optical margin alignment)

```css
html {
  hanging-punctuation: first last;
}
```

This is InDesign's "Optical Margin Alignment" in CSS. Quotation marks and parentheses hang outside the text block, so the visual left edge is clean. It's one of the most subtle but powerful typographic details.

Only Safari supports it today, but Chromium has an "Intent to Prototype," so it's coming. Progressive enhance with negative text-indent:

```css
blockquote {
  text-indent: -0.45em;
}

@supports (hanging-punctuation: first) {
  blockquote {
    text-indent: 0;
    hanging-punctuation: first last;
  }
}
```

**Warning:** Hanging punctuation can trigger horizontal scroll if there's insufficient padding on the container. Never use on elements flush with the viewport edge without padding.

### Letter-spacing rules (uppercase and display)

Uppercase text (ALL CAPS) requires positive letter-spacing. This is a fundamental typographic rule that 90% of sites ignore. Capital letters are designed to appear at the start of words, not next to each other — their spacing is too tight without adjustment:

```css
.label-caps {
  text-transform: uppercase;
  letter-spacing: 0.05em;  /* 0.02em–0.1em depending on font */
  font-feature-settings: "case"; /* adjusts parentheses and hyphens to cap height */
}
```

Conversely, large display headings often need negative letter-spacing to feel tighter and more cohesive:

```css
.hero-heading {
  font-size: clamp(3rem, 8vw, 7rem);
  letter-spacing: -0.03em;
  line-height: 0.95; /* tighter line-height at large sizes */
}
```

### Tailwind slash-syntax (combined size + line-height)

Tailwind v4's slash-syntax sets font-size AND line-height in a single utility — the most compact way to express typographic precision:

```html
<!-- Display heading: 72px with 1.05 line-height -->
<h1 class="text-7xl/[1.05] tracking-tighter font-bold">

<!-- Section heading: 36px with 1.15 line-height -->
<h2 class="text-4xl/[1.15] tracking-tight font-semibold">

<!-- Body: 16px with 1.75rem line-height -->
<p class="text-base/7 text-pretty">

<!-- Small UI text: 14px with 1.25rem line-height -->
<span class="text-sm/5 font-medium">
```

This is critical for sharpness because Tailwind's default line-heights (baked into each `text-*` class) are often too loose for headings. The slash-syntax lets you override without a separate `leading-*` class, keeping class lists shorter and more readable. The value after `/` can be a spacing unit (e.g., `/7` = 1.75rem), a unitless ratio (e.g., `/[1.05]`), or a CSS variable (e.g., `/(--custom-leading)`).

### image-rendering for different asset types

```css
/* Pixel art, icons, screenshots — no blurring on upscale */
.pixel-icon {
  image-rendering: pixelated;
}

/* Standard photos — best quality */
.photo {
  image-rendering: auto;
}

/* Crisp edges for SVG-like raster assets, diagrams */
.diagram {
  image-rendering: crisp-edges;
}
```

The default `auto` works for photos, but screenshots, diagrams, and pixel art look blurry when upscaled because the browser applies bilinear interpolation. `pixelated` preserves hard edges. `crisp-edges` is the middle ground.

---

## 8. Spacing Consistency

### The 4px grid

All spacing values should be multiples of 4px. Tailwind's default scale enforces this:

```
4px   = p-1    |  16px = p-4    |  32px = p-8
8px   = p-2    |  20px = p-5    |  40px = p-10
12px  = p-3    |  24px = p-6    |  48px = p-12
```

### Why this affects perceived sharpness

When spacing values are inconsistent (7px padding here, 13px there, 9px gap), the human eye detects the irregularity as visual noise. Even though individual elements are pixel-perfect, the overall composition reads as "messy" or "blurry."

Consistent 4px-grid spacing creates a subconscious rhythm that the eye follows effortlessly. This is why a Stripe dashboard with simple elements looks "sharper" than a visually complex page with inconsistent spacing.

**The rule:** If you find yourself writing `p-[7px]` or `gap-[13px]`, stop. Round to the nearest 4px multiple. The visual consistency is more important than the exact pixel count.

---

## 9. Color Rendering

### Display P3 and Wide Gamut

sRGB covers ~35% of the colors the human eye can see. Display P3 adds ~30% more. All modern Apple devices and OLED screens support P3. This is why sites like Panic and Playdate look absurdly vibrant — they use colors that literally cannot be expressed in hex or rgb.

```css
:root {
  /* sRGB fallback */
  --accent: #9D174D;
}

/* Progressive enhancement to wide gamut */
@media (color-gamut: p3) {
  @supports (color: oklch(0 0 0)) {
    :root {
      --accent: oklch(45% 0.22 350);
    }
  }
}
```

**P3 in SVG:** SVG files can also use P3 colors via an inline style block:

```xml
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <style>
    @media (color-gamut: p3) {
      rect { fill: oklch(55% 0.23 146) }
    }
  </style>
  <rect x="10" y="10" width="100" height="100" fill="#048c2c"/>
</svg>
```

**P3 color profile for images:** If you serve wide-gamut colors in CSS, your images must match. Export images with Display P3 color profile from Photoshop/Lightroom/Figma. Otherwise CSS colors look vibrant while images look washed out beside them.

### OKLCH for gradients

HSL/hex gradients can produce "muddy" gray bands when transitioning between distant hues (e.g., blue to green). This happens because HSL interpolation crosses through desaturated midpoints.

OKLCH (Oklab Lightness, Chroma, Hue) is a perceptually uniform color space — equal numeric changes produce equal visual changes. Gradient interpolation in OKLCH avoids the gray-band problem:

```css
/* HSL: muddy gray band in the middle */
background: linear-gradient(to right, hsl(240, 80%, 50%), hsl(120, 80%, 50%));

/* OKLCH: vivid, clean transition */
background: linear-gradient(to right, oklch(50% 0.15 240), oklch(80% 0.15 120));

/* Longer hue rotation for rainbow effects */
background: linear-gradient(in oklch longer hue to right, oklch(70% 0.2 0), oklch(70% 0.2 360));
```

In Tailwind v4:
```html
<div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400">
```

The `/oklch` modifier tells Tailwind to interpolate in OKLCH space. `longer hue` forces interpolation the long way around the hue circle.

### OKLCH for design token scales

OKLCH's perceptual uniformity makes it ideal for generating entire color scales mathematically:

```css
:root {
  /* L: lightness (0–1), C: chroma (0–0.37), H: hue (0–360) */
  --color-primary-50:  oklch(97% 0.02 250);
  --color-primary-100: oklch(93% 0.05 250);
  --color-primary-200: oklch(85% 0.10 250);
  --color-primary-300: oklch(75% 0.15 250);
  --color-primary-400: oklch(65% 0.20 250);
  --color-primary-500: oklch(55% 0.23 250);
  --color-primary-600: oklch(45% 0.20 250);
  --color-primary-700: oklch(35% 0.15 250);
  --color-primary-800: oklch(25% 0.10 250);
  --color-primary-900: oklch(15% 0.05 250);
}
```

Unlike HSL, equal lightness steps in OKLCH produce visually equal brightness steps. Blue at 50% L actually looks as bright as yellow at 50% L.

### Contrast via OKLCH Lightness

The L value in OKLCH makes contrast checking trivial:

| Text purpose | Minimum L difference from background |
|-------------|-------------------------------------|
| Body text | ≥ 0.4 |
| Headings | ≥ 0.3 |
| Decorative | ≥ 0.2 |

If your background is `L = 0.93` (light sand) and your text is `L = 0.09` (near-black), the difference is 0.84 — well above the 0.4 minimum. This is much easier than calculating WCAG contrast ratios manually.

---

## 10. Icon Rendering

### SVG at all sizes

SVG icons are resolution-independent — they're mathematical curves, not pixel grids. They render perfectly at 1x, 2x, 3x, and any fractional DPI.

**Never use PNG/JPG for icons or UI graphics.** Even @2x PNGs look blurry on 3x displays.

### Optimal stroke width

For outlined icons (Lucide, Heroicons, Feather):
- `stroke-width: 1` → too thin, barely visible at 16px
- `stroke-width: 1.5` → optimal, renders cleanly on both 1x and 2x
- `stroke-width: 2` → too thick, feels "heavy"

The `1.5` value works because:
- On 1x displays: renders as alternating 1px/2px strokes (antialiased to a consistent visual weight)
- On 2x displays: renders as exactly 3 physical pixels — clean and sharp

### shape-rendering for precision

```css
svg {
  shape-rendering: geometricPrecision;
}
```

This tells the browser to prioritize geometric accuracy over performance when rasterizing SVG curves. The difference is subtle but visible on complex icons — curves are smoother and more precise.

---

## 11. Image Handling

### Retina-ready images

For any raster content (photos, screenshots, product images):

```html
<!-- Next.js Image handles srcset automatically -->
<Image src="/photo.jpg" alt="..." width={800} height={600} />
<!-- Generates: srcset="...400w, ...800w, ...1200w, ...1600w" -->
```

Without Next.js:
```html
<img
  src="/photo-800w.jpg"
  srcset="/photo-400w.jpg 400w, /photo-800w.jpg 800w, /photo-1600w.jpg 1600w"
  sizes="(max-width: 768px) 100vw, 800px"
  alt="..."
  width="800" height="600"
  loading="lazy"
  decoding="async"
/>
```

**Rules:**
- Always provide `width` and `height` attributes (prevents CLS)
- Use `loading="lazy"` for below-the-fold images
- Use `priority` (Next.js) or no `loading` attribute for above-the-fold
- For illustrations/diagrams: always use SVG, never raster

### aspect-ratio for containers

```html
<!-- Image container that reserves space before image loads -->
<div class="aspect-video overflow-hidden rounded-lg bg-gray-100">
  <img src="..." class="w-full h-full object-cover" loading="lazy" />
</div>
```

The `aspect-video` (16:9) or `aspect-square` (1:1) class reserves the exact space the image will occupy, preventing any layout shift when the image loads.

---

## 12. Performance Perception

### What makes a site *feel* fast (even if it isn't)

Perceived performance is more about visual stability than raw speed:

1. **No layout shift** (CLS < 0.1) — the page doesn't "jump"
2. **Instant text** (font-display: swap) — text is immediately readable
3. **Skeleton loading** — shapes appear before data, showing structure
4. **Optimistic UI** — actions feel instant (update UI, then send request). Use `useOptimistic()` hook for all mutations.
5. **Smooth animations** — 60fps transitions with GPU-only properties
6. **Stale-while-revalidate** — show cached data instantly, fetch fresh in background. Use `useCachedQuery()` for all data fetching.
7. **Offline-first** — Service Worker caches app shell + stable APIs. IndexedDB persists query results. App works without network.
8. **Predictive prefetch** — preload next page on hover/focus via `usePrefetch()`. Sidebar links already prefetch.
9. **Realtime subscriptions** — live updates via `useRealtime()` for collaborative features (coach, teams, community).
10. **Background queue** — heavy tasks (activity processing, batch calculations) run with retry + exponential backoff via `activityQueue`.

### Performance budget

```
Fonts:     < 60KB total (3 fonts, subset woff2)
CSS:       < 15KB gzipped (Tailwind v4 tree-shaken)
JS:        < 200KB gzipped (dashboard first load)
Images:    Lazy-loaded, Next.js optimized, WebP/AVIF
LCP:       < 2.5s
FID:       < 100ms
CLS:       < 0.1
INP:       < 200ms
```

### The "60fps or nothing" rule

If an animation can't run at 60fps, don't animate it. A 30fps animation looks worse than no animation at all — it draws attention to the performance issue. This is why the GPU-only rule (transform + opacity) is non-negotiable.

---

## 13. GPU Compositing Deep-Dive

### will-change — surgical use only

`will-change` pre-promotes an element to its own GPU layer. This is powerful but expensive:

```css
/* Good — specific, only on elements that actually animate */
.animated-button {
  will-change: transform, opacity;
}

/* Bad — global, eats GPU memory */
* {
  will-change: auto;
}

/* Best — add via CSS hover/focus state, not permanently */
.card:hover .card-image {
  will-change: transform;
}
```

**Memory math:** An 800×600 image as RGBA GPU texture = 800 × 600 × 4 bytes = 1.9MB. A carousel with 10 slides = 19MB extra GPU memory for one component. Never set `will-change` globally. Apply it on hover/focus and remove it after animation completes.

### Implicit compositing (the hidden performance killer)

If element B has `transform`, and element A is above B in stacking order, the browser automatically promotes A to a new GPU layer to preserve correct z-ordering. This is called implicit compositing. With many overlapping animated elements, you can unknowingly create 50+ layers.

**Diagnose with:** Chrome DevTools → Layers panel → inspect compositing reasons. Look for "has a compositing descendant" and "overlaps a composited element."

### Paint containment

```css
/* Tell the browser this element's paint doesn't affect anything outside */
.isolated-component {
  contain: paint;
}

/* More aggressive — layout, paint, and style containment */
.heavy-component {
  contain: layout paint style;
}

/* content-visibility: auto — lazy render off-screen content */
.below-fold-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* estimated height for layout stability */
}
```

`content-visibility: auto` is one of the most impactful performance properties available. The browser skips rendering off-screen elements entirely, only painting them when they're about to scroll into view. Combined with `contain-intrinsic-size` (which prevents CLS by reserving space), it can dramatically reduce initial render time on long pages.

---

## 14. Accessibility & Motion Preferences

### prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

This isn't just accessibility — it's a signal that your design system respects the user's OS-level preferences. Every premium site includes this. Without it, users with vestibular disorders or motion sensitivity have no escape from your animations.

Place this in your base CSS layer. It disables all motion instantly for users who've opted out.

---

## 15. Advanced Animation Techniques

### linear() easing (true spring animations in CSS)

Custom `cubic-bezier()` curves are limited to a single curve shape. `linear()` easing lets you define arbitrary easing curves with precise keyframes, enabling true spring physics without JavaScript:

```css
:root {
  --ease-spring: linear(
    0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%,
    0.938 16.7%, 1.017, 1.077, 1.121, 1.149 24.3%,
    1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
    1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%,
    0.974 53.8%, 0.975 57.1%, 0.997 69.8%, 1.003 76.9%, 1
  );
}
```

This creates an easing curve that overshoots and oscillates before settling — exactly like a physical spring. The visual difference between a cubic-bezier ease-out and a spring curve is subtle but visceral: spring curves feel *alive* and *physical*.

### Duration hierarchy

Different elements should have different durations based on their size and visual importance:

```css
:root {
  --duration-instant: 100ms;   /* Tooltips, hover states */
  --duration-fast:    150ms;   /* Buttons, toggles */
  --duration-normal:  250ms;   /* Panels, modals */
  --duration-slow:    400ms;   /* Page transitions, large elements */
  --duration-slower:  600ms;   /* Full-page morphs */
}
```

### Scroll-driven animations (CSS-only)

No JavaScript. No Intersection Observer. Pure CSS:

```css
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

`animation-timeline: view()` ties the animation progress to how far the element has scrolled into the viewport. `animation-range: entry 0% entry 30%` means the animation plays during the first 30% of the element entering the viewport. This is primarily relevant for landing pages.

---

## 16. Layout Precision

### fetchpriority for LCP images

```html
<!-- Hero/LCP image — high priority, no lazy loading -->
<img src="hero.avif" fetchpriority="high" decoding="async" alt="...">

<!-- Below-fold images — lazy + low priority -->
<img src="feature.avif" loading="lazy" fetchpriority="low" decoding="async" alt="...">
```

The LCP (Largest Contentful Paint) image should never be lazy-loaded. `fetchpriority="high"` tells the browser to download it before other resources. This directly affects when the page "feels" loaded.

### CSS Subgrid (cross-component alignment)

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* header, body, footer */
}
```

Subgrid lets child elements inherit the parent grid lines. This means all cards in a grid have their headings, body text, and CTA buttons on exactly the same horizontal line, regardless of content length. This is the kind of alignment that gives a site the "pixel-perfect" feel.

### Responsive images with format cascade

```html
<picture>
  <!-- AVIF — best compression, modern browsers -->
  <source type="image/avif" srcset="hero-400.avif 400w, hero-800.avif 800w, hero-1600.avif 1600w"
    sizes="(max-width: 768px) 100vw, 50vw">
  <!-- WebP fallback -->
  <source type="image/webp" srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1600.webp 1600w"
    sizes="(max-width: 768px) 100vw, 50vw">
  <!-- Ultimate fallback -->
  <img src="hero-800.jpg" alt="Description" width="1600" height="900"
    loading="lazy" decoding="async">
</picture>
```

AVIF offers ~50% smaller files than WebP at equal quality. The `<picture>` element with format cascade lets browsers pick the best format they support. Next.js `<Image>` handles this automatically.

---

## 17. Fluid Typography & Spacing

### Viewport-based fluid typography

Instead of breakpoint-based font sizes that jump, use `clamp()` for smooth scaling:

```css
:root {
  --font-size-sm:   clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.35vw, 1.125rem);
  --font-size-md:   clamp(1.25rem, 1rem + 0.75vw, 1.5rem);
  --font-size-lg:   clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
  --font-size-xl:   clamp(2rem, 1rem + 3vw, 3.5rem);
  --font-size-hero: clamp(3rem, 1rem + 8vw, 7rem);
}
```

**Critical:** Always use `rem` for min/max values, never `px`. A user who zooms to 200% gets no effect from `vw`-based sizing, but `rem` scales correctly with browser zoom. Viewport units alone break accessibility.

### Container Query Units (cqi) — component-level fluid type

The next level is container query units, so typography responds to its container's width, not the viewport:

```css
.card {
  container-type: inline-size;
}

.card h2 {
  font-size: clamp(1.25rem, 3cqi + 0.5rem, 2.5rem);
}

.card p {
  font-size: clamp(0.875rem, 1.5cqi + 0.5rem, 1.125rem);
}
```

This makes cards typographically responsive regardless of how many columns the grid has.

**Tailwind v4 container query syntax** — the utility-class way to achieve the same thing:

```html
<!-- Mark a parent as a container -->
<div class="@container">
  <!-- Child responds to CONTAINER width, not viewport -->
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3">
    ...
  </div>
</div>

<!-- Named containers (for nested contexts) -->
<div class="@container/card">
  <h2 class="text-base @sm/card:text-lg @lg/card:text-xl">...</h2>
</div>
```

Container query breakpoints: `@xs` (320px), `@sm` (384px), `@md` (448px), `@lg` (512px), `@xl` (576px), `@2xl` (672px). These are independent of viewport breakpoints — the same component adapts to its container whether it's in a full-width grid or a narrow sidebar, with zero code changes.

### Typographic scale with mathematical ratio

Instead of arbitrary font-sizes, use a ratio:

```css
:root {
  --type-ratio: 1.25;    /* Major Third — used by many premium sites */
  --type-base: 1rem;
  --type-sm:  calc(var(--type-base) / var(--type-ratio));
  --type-md:  calc(var(--type-base) * var(--type-ratio));
  --type-lg:  calc(var(--type-md) * var(--type-ratio));
  --type-xl:  calc(var(--type-lg) * var(--type-ratio));
  --type-2xl: calc(var(--type-xl) * var(--type-ratio));
}
```

Popular ratios: 1.2 (Minor Third), 1.25 (Major Third), 1.333 (Perfect Fourth), 1.5 (Perfect Fifth), 1.618 (Golden Ratio). Smaller ratios for mobile, larger for desktop, interpolated with `clamp()`.

### Fluid spacing (not just fluid typography)

Spacing should also scale fluidly between breakpoints:

```css
:root {
  --space-sm: clamp(0.75rem, 0.5rem + 1vw, 1rem);
  --space-md: clamp(1rem, 0.5rem + 2vw, 1.5rem);
  --space-lg: clamp(1.5rem, 1rem + 3vw, 2.5rem);
  --space-xl: clamp(2rem, 1rem + 5vw, 4rem);
}
```

### Baseline grid with the `cap` unit

CSS now has `1cap` as a unit, equal to the cap height of the current font. This enables true baseline alignment:

```css
.text-element {
  /* (line-height - cap-height) / 2 = offset to baseline */
  padding-top: calc((2rem - 1cap) / 2);
  margin-bottom: calc(2rem - ((2rem - 1cap) / 2));
  line-height: 2rem;
}
```

This is what newspapers and magazines use in print. Text in different columns lands on exactly the same horizontal line. Almost nobody does this on web. Those who do stand out dramatically.

---

## 18. Layout & CSS Architecture

### Subpixel precision

Never `Math.round()` on layout values. Let the browser handle subpixel rendering. If something should be 12.5px wide, set it to 12.5px. Use `getBoundingClientRect()` instead of `offset*` properties, as the latter return integers and lose subpixel information.

### Logical properties (direction-aware)

```css
/* Old way */
.element {
  margin-left: 1rem;
  margin-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

/* Modern — direction-aware, RTL-ready */
.element {
  margin-inline: 1rem;
  padding-block: 2rem;
}
```

This isn't just i18n — it signals that your design system is thorough and future-proof.

### :has() selector for context-aware components

```css
/* Card changes layout based on whether it has an image */
.card:has(img) {
  grid-template-columns: 200px 1fr;
}

.card:not(:has(img)) {
  grid-template-columns: 1fr;
}

/* Form field styling based on validity */
.field:has(input:invalid:not(:placeholder-shown)) {
  --field-border: var(--color-destructive);
}

/* Nav changes when search field is focused */
.nav:has(.search-input:focus) .nav-links {
  opacity: 0;
}
```

`:has()` eliminates the need for JavaScript-driven conditional classes. Components adapt to their content purely in CSS.

### Font subsetting tooling

Self-host and subset your fonts to only the glyphs you use:

```bash
# Subset with pyftsubset (fonttools)
pyftsubset Inter-Variable.woff2 \
  --output-file=inter-subset.woff2 \
  --flavor=woff2 \
  --layout-features="kern,liga,calt,ss01,tnum,onum,case,zero" \
  --unicodes="U+0000-00FF,U+0100-024F,U+2000-206F,U+20A0-20CF,U+2100-214F"
```

A full Inter Variable is ~300KB. A subsetted version for Western European with specific features can be under 50KB.

---

## 19. Critical Rendering Path

### Critical CSS inline

The first 14KB of HTML should contain all CSS needed for above-the-fold content. Everything else lazy-loads:

```html
<head>
  <!-- Critical CSS inline -->
  <style>
    /* Only styles for above-fold content */
    :root { /* tokens */ }
    body { /* base styles */ }
    .hero { /* hero section */ }
    .nav { /* navigation */ }
  </style>

  <!-- Rest of CSS lazy-loaded -->
  <link rel="preload" href="/css/main.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
</head>
```

**Why 14KB?** TCP's initial congestion window (initcwnd) is typically 10 segments × ~1.4KB = ~14KB. Anything within this budget arrives in the first network roundtrip. CSS beyond this requires additional roundtrips before first paint.

**Note:** Next.js handles critical CSS extraction automatically in production builds with its built-in CSS optimization.

---

## Quick Reference: The Complete Checklist

```
FONTS & TYPOGRAPHY
 1. antialiased + optimizeLegibility (headings only) + font-optical-sizing: auto
 2. OpenType features: kern, liga, calt, tnum + extended (oldstyle-nums, fractions, small-caps, case, ordinal)
 3. Prefer font-variant-* over font-feature-settings (composable vs override)
 4. Tailwind v4 @theme font feature binding (cv02, cv03, cv04, cv11)
 5. woff2 + font-display: optional (body) / swap (display) + self-hosted
 6. text-balance (headings) + text-pretty (body)
 7. slashed-zero + tabular-nums on data displays
 8. hanging-punctuation: first last (optical margin alignment)
 9. letter-spacing: +0.05em on uppercase, -0.03em on display headings
10. Tailwind slash-syntax (text-7xl/[1.05]) for combined size + line-height precision
11. unicode-range splitting (load only needed character subsets)
12. Font subsetting with pyftsubset (reduce 300KB → 50KB)

COLOR
13. Display P3 via @media (color-gamut: p3) with OKLCH fallback
14. OKLCH for gradients (no muddy midpoints) + "longer hue" for rainbows
15. OKLCH for design token scales (perceptually uniform lightness steps)
16. P3 color profile on images (match CSS wide-gamut vibrancy)

BORDERS & SHADOWS
17. 0.5px hairline borders for dividers (with @supports fallback)
18. Layered shadows (3-layer: contact + near + ambient)
19. Micro-shadows for sticky/floating elements (0.04 opacity)
20. backdrop-blur + backdrop-saturate-150 for frosted glass

ANIMATION
21. GPU-only: transform + opacity only, never layout properties
22. Custom easing: cubic-bezier(0.16, 1, 0.3, 1) default
23. transition-all is banned — use transition-colors or specific properties
24. @starting-style for CSS-only enter transitions
25. transition-discrete for display change animations
26. linear() easing for true spring physics (no JS)
27. prefers-reduced-motion: kill all motion for users who opt out
28. Duration hierarchy: 100ms tooltips → 150ms buttons → 250ms panels → 400ms pages

LAYOUT & IMAGES
29. 4px spacing grid (consistent rhythm)
30. Fluid typography with clamp() (rem min/max, vw middle)
31. Fluid spacing with clamp() (spacing scales between breakpoints)
32. Container query units (cqi) for component-level responsive type
33. Tailwind @container / @sm: / @lg: syntax for utility-class container queries
34. Typographic ratio scale (Major Third 1.25, Perfect Fourth 1.333)
35. Baseline grid with cap unit (cross-column text alignment)
36. CLS prevention: fixed dimensions, matching skeletons
37. Retina images: @2x via srcset, SVG for icons/illustrations
38. max-w-prose (65ch) for body text line length
39. fetchpriority="high" on LCP images, never lazy-load above fold
40. image-rendering: pixelated (screenshots), crisp-edges (diagrams), auto (photos)
41. CSS Subgrid for cross-component alignment (cards with aligned sections)
42. AVIF → WebP → JPEG format cascade via <picture> element

CSS ARCHITECTURE
43. Logical properties (margin-inline, padding-block) — RTL-ready
44. :has() for context-aware components (no JS conditional classes)
45. Subpixel precision (getBoundingClientRect, never Math.round)
46. Scroll-driven animations (animation-timeline: view()) — landing page

PERFORMANCE
47. will-change: surgical use only, remove after animation, never global
48. Implicit compositing awareness (overlapping layers auto-promoted)
49. contain: paint on isolated components, content-visibility: auto below fold
50. Critical CSS inline (first 14KB = first TCP roundtrip)
```

---

*Standalone rendering science document — no project-specific design decisions.*
*Source: Research into Linear, Stripe, Vercel, Apple, Claude.ai rendering techniques + Tailwind CSS v4 documentation + independent rendering analysis.*
