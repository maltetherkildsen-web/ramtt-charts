# @ramtt/ui — Polish Pass

The demo page renders all 12 components correctly, but visually it looks like "developer UI" — not the Linear/Perplexity quality level we're targeting. This document lists every specific fix needed.

## 1. Space Grotesk Labels — Letter Spacing is Missing

This is the most visible problem. Every Space Grotesk label on the page needs proper tracking. Compare what's rendering vs. what should render:

**Current:** `METRICS STRIP` — letters are tight, looks like default sans-serif
**Target:** `M E T R I C S   S T R I P` — letters breathe, looks intentional and premium

Apply these exact specs to ALL section headers, labels, and SectionHeader components:

```css
/* SectionHeader component */
font-family: var(--font-label); /* Space Grotesk */
font-size: 11px;
font-weight: 600;
letter-spacing: 0.10em;  /* THIS IS THE KEY — must be at least 0.08em */
text-transform: uppercase;
color: var(--n600);
```

The three tiers from the 4-Font System:
- Section headers (14px): `letter-spacing: 0.08em`, weight 500
- Default labels (11px): `letter-spacing: 0.10em`, weight 600
- Micro labels (10px): `letter-spacing: 0.12em`, weight 600

Check every component that uses Space Grotesk — MetricCard labels, SectionHeader, Badge text, ToggleGroup items, DataTable headers, Input labels, Select labels. They ALL need the tracking.

## 2. MetricCard — Needs Breathing Room

**Current:** Values, labels, and subtitles are crammed together.
**Target:** Clear vertical hierarchy with generous spacing.

Fix:
- Label (top): Space Grotesk, 11px, weight 600, tracking 0.10em, uppercase, color var(--n600), `margin-bottom: 8px`
- Value: JetBrains Mono, 22px, weight 500, color var(--n1150), `line-height: 1.1`
- Unit suffix: JetBrains Mono, 13px, weight 400, color var(--n800), `margin-left: 4px`
- Subtitle: Satoshi, 12px, weight 400, color var(--n800), `margin-top: 6px`
- Card padding inside metrics strip: `padding: 16px 20px` per card
- Dividers between cards: `border-right: 0.5px solid var(--n400)` (last child: none)

The metrics strip container should have `padding: 4px 0` and each MetricCard should feel like it has room to breathe.

## 3. ToggleGroup — Needs Container Border and Proper Sizing

**Current:** Buttons float without a containing shape. Looks like raw HTML.
**Target:** Connected button group with shared border, like Linear's tabs.

Fix for default variant:
```css
/* Container */
display: inline-flex;
border: 0.5px solid var(--n400);
border-radius: var(--radius-md); /* 6px */
overflow: hidden;

/* Each button */
padding: 6px 14px;
font-family: var(--font-body); /* Satoshi */
font-size: 13px;
font-weight: 450;
color: var(--n800);
background: transparent;
border: none;
border-right: 0.5px solid var(--n400); /* divider between items */
transition: background-color 150ms, color 150ms;

/* Last button */
border-right: none;

/* Selected state */
background: var(--n1150);
color: var(--n50);
font-weight: 500;

/* Hover (unselected) */
background: var(--n200);
```

Fix for pill variant (Zone mode, Filter pills):
```css
/* Container */
display: inline-flex;
gap: 6px; /* pills are separate, not connected */

/* Each pill */
padding: 5px 12px;
border: 0.5px solid var(--n400);
border-radius: 9999px; /* full pill */
font-family: var(--font-body);
font-size: 13px;
font-weight: 450;
background: transparent;

/* Selected */
background: var(--n1150);
color: var(--n50);
border-color: var(--n1150);
```

## 4. Badge — Soft Backgrounds Missing

**Current:** "SAFE" and "CRITICAL" are just colored text. Zone badges are solid filled circles.
**Target:** Soft tinted backgrounds on filled badges, outline style on status badges.

Fix for filled variant (SAFE, CRITICAL, BUILD):
```css
/* Positive (SAFE) */
background: var(--positive-soft);  /* #e6faf2 */
color: var(--positive-on-soft);    /* #07905b */
padding: 3px 10px;
border-radius: var(--radius-sm);   /* 4px */
font-family: var(--font-label);    /* Space Grotesk */
font-size: 10px;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;

/* Negative (CRITICAL) */
background: var(--negative-soft);  /* #fde9e4 */
color: var(--negative-on-soft);    /* #b83a16 */

/* Warning (BUILD) */
background: var(--warning-soft);   /* #fff9e0 */
color: var(--warning-on-soft);     /* #9e8a0a */
```

Fix for change badges (+7.55%, -0.07%):
```css
/* Positive change */
background: var(--positive-soft);
color: var(--positive-on-soft);
font-family: var(--font-mono); /* JetBrains Mono for numbers */
font-size: 11px;
padding: 2px 8px;
border-radius: var(--radius-sm);
```

Fix for zone badges (Z6, Z2, Z3):
Keep the current solid fill circles — those look correct. But ensure the text inside is white (var(--n50)) on dark fills.

## 5. DataTable — Alignment and Header Treatment

**Current:** Numbers don't align cleanly. Header row blends with data.
**Target:** Crisp right-aligned numbers, distinct header row.

Fix:
```css
/* Table header cells */
font-family: var(--font-label); /* Space Grotesk */
font-size: 10px;
font-weight: 600;
letter-spacing: 0.10em;
text-transform: uppercase;
color: var(--n600);
padding: 12px 16px;
border-bottom: 1px solid var(--n400); /* slightly stronger than row dividers */
text-align: right; /* for number columns */

/* Table data cells — numbers */
font-family: var(--font-mono);
font-size: 13px;
font-weight: 400;
font-variant-numeric: tabular-nums;
color: var(--n1150);
padding: 14px 16px;
border-bottom: 0.5px solid var(--n200); /* subtle row dividers */
text-align: right;

/* Table data cells — text (like dates) */
font-family: var(--font-mono);
font-size: 13px;
text-align: left;

/* Hover row (if clickable) */
background: var(--n200);
transition: background-color 150ms;
```

## 6. SettingsCard — More Padding, Subtler Chevron

**Current:** Feels cramped. Chevron is just a text character.
**Target:** Generous, airy cards like Linear's settings sections.

Fix:
```css
/* Card container */
padding: 24px 28px;
border: 0.5px solid var(--n400);
border-radius: var(--radius-lg); /* 10px */
background: var(--n50);
display: flex;
align-items: center;
gap: 16px;
transition: background-color 150ms;
cursor: pointer;

/* Hover */
background: var(--n200);

/* Icon container */
width: 36px;
height: 36px;
display: flex;
align-items: center;
justify-content: center;
color: var(--n600);

/* Title */
font-family: var(--font-body);
font-size: 15px;
font-weight: 500;
color: var(--n1150);

/* Description */
font-family: var(--font-body);
font-size: 13px;
font-weight: 400;
color: var(--n800);
margin-top: 2px;

/* Chevron — use SVG, not text */
margin-left: auto;
color: var(--n600);
/* Replace › text with a small SVG chevron-right icon, 16x16px */
```

## 7. Card — Border and Background

**Current:** Card boundaries are not clear enough.
**Target:** Subtle but definite container.

Fix:
```css
background: var(--n50);
border: 0.5px solid var(--n400);
border-radius: var(--radius-lg); /* 10px */
padding: 24px;
/* NO box-shadow */
```

Card.Header should have `padding-bottom: 16px` and `border-bottom: 0.5px solid var(--n200)` to separate header from content.

## 8. Input and Select — Height and Border

**Current:** Default browser-ish styling.
**Target:** Clean, consistent form elements like Linear's.

Fix:
```css
/* Shared input/select styles */
height: 40px;
padding: 8px 12px;
font-family: var(--font-body);
font-size: 14px;
font-weight: 450;
color: var(--n1150);
background: white; /* pure white, not n50 */
border: 0.5px solid var(--n400);
border-radius: var(--radius-md); /* 6px */
outline: none;
transition: border-color 150ms;

/* Focus */
border-color: var(--n800);

/* Placeholder */
color: var(--n600);

/* Label above input */
font-family: var(--font-label); /* Space Grotesk */
font-size: 10px;
font-weight: 600;
letter-spacing: 0.10em;
text-transform: uppercase;
color: var(--n600);
margin-bottom: 6px;

/* Unit suffix inside input */
font-family: var(--font-mono);
font-size: 12px;
color: var(--n600);
```

Number values inside inputs should use JetBrains Mono:
```css
input[type="number"] {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
```

## 9. ProgressBar — Track Needs to Be Visible

**Current:** Track is barely visible.
**Target:** Subtle but clear track with smooth fill.

Fix:
```css
/* Track */
width: 100%;
height: 6px;
background: var(--n200);
border-radius: 3px;
overflow: hidden;

/* Fill */
height: 100%;
border-radius: 3px;
transition: width 300ms ease-out;
/* Default color: var(--n1150) */
/* Positive: var(--positive) */
/* Warning: var(--warning) */
/* Negative: var(--negative) */
```

## 10. Page Layout — Whitespace Between Sections

**Current:** Sections are too close together. Feels like a list.
**Target:** Each section breathes. Like scrolling through Linear's settings.

Fix:
```css
/* Space between demo sections */
margin-bottom: 64px; /* was probably 24-32px */

/* SectionHeader to content gap */
margin-bottom: 24px; /* after the section label */

/* Page max-width */
max-width: 920px; /* match RAMTT's standard content width */
margin: 0 auto;
padding: 48px 24px;
```

## 11. Button — Refine Sizing and Weight

**Current:** Primary button looks heavy. Ghost button is invisible.
**Target:** Confident but not aggressive.

Fix:
```css
/* Primary */
background: var(--n1150);
color: var(--n50);
padding: 8px 16px;
border-radius: var(--radius-md);
font-family: var(--font-body);
font-size: 13px;
font-weight: 500;
border: none;
transition: opacity 150ms;
/* Hover: opacity 0.85 */

/* Outline */
background: transparent;
color: var(--n1050);
border: 0.5px solid var(--n400);
/* Hover: background var(--n200) */

/* Ghost */
background: transparent;
color: var(--n800);
border: none;
/* Hover: background var(--n200) */

/* Disabled */
opacity: 0.4;
cursor: not-allowed;
```

## 12. Font Weight — Body Text Should Be 450

**Current:** Body text likely at 400 (browser default).
**Target:** 450 (the variable font sweet spot).

Ensure the body CSS uses:
```css
body {
  font-family: var(--font-body);
  font-weight: 450;
}
```

This requires Satoshi to be loaded as a variable font with `font-weight: 100 900` in the @font-face declaration. Verify this is actually happening — if it's loaded via next/font or Google Fonts with only 400/500, the 450 won't work.

## 13. DataRow — Value Alignment

**Current:** Labels and values don't have clear horizontal separation.
**Target:** Labels left, values right, clean line.

Fix:
```css
display: flex;
justify-content: space-between;
align-items: baseline;
padding: 10px 0;
border-bottom: 0.5px solid var(--n200);

/* Label */
font-family: var(--font-body);
font-size: 14px;
font-weight: 400;
color: var(--n600);

/* Value */
font-family: var(--font-mono);
font-size: 14px;
font-weight: 400;
color: var(--n1150);
font-variant-numeric: tabular-nums;

/* Unit */
font-family: var(--font-mono);
font-size: 12px;
color: var(--n800);
margin-left: 4px;

/* Delta (positive/negative change) */
font-family: var(--font-mono);
font-size: 12px;
margin-left: 8px;
/* Positive: color var(--positive) */
/* Negative: color var(--negative) */
```

---

## Summary of What's Wrong

The components are structurally correct. The problems are all about polish:

1. **Letter-spacing on Space Grotesk labels** — the single biggest issue. Without tracking, labels look like body text in uppercase.
2. **Whitespace** — everything is too tight. More padding, more margin, more breathing room.
3. **Font-weight 450** — may not be loading correctly. Check @font-face declaration.
4. **Badge backgrounds** — need the soft tinted fills, not just colored text.
5. **ToggleGroup** — needs a containing border shape.
6. **Transitions** — 150ms on hover states should be on everything interactive.
7. **Consistency** — every number must be JetBrains Mono, every label must be Space Grotesk uppercase tracked.

Fix these and the demo will look like it belongs next to Linear and Perplexity.
