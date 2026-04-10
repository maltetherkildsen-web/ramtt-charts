# RAMTT Color System v2 — Complete Specification

**Status:** Design spec for Claude Code implementation
**Dato:** 6. april 2026
**Forfatter:** Malte + Claude (Design Workspace)
**Canvas:** `#FAF9F5` (sand) — all colors are designed for this background
**Color space:** oklch for all design decisions, hex for implementation

---

## 1. Design Philosophy

### Core Principle
Color is reserved for data. The UI is monochrome sand/black. When color appears, it means something.

### Luminance Strategy
All chromatic colors in this system target **oklch L ≈ 0.55–0.72** for primary use on sand canvas. This range provides sufficient contrast against `#FAF9F5` (L≈0.98) while remaining vibrant and characterful. Large fills use lower chroma (C≈0.08–0.12). Small indicators use maximum chroma (C≈0.18–0.28).

### Temperature
The system is **warm-biased**. Sand canvas, warm greys, warm accents. Cool colors (blues, teals) exist but are outnumbered by warm tones. This is deliberate — it separates RAMTT from the cold, clinical look of TrainingPeaks, Garmin Connect, and Intervals.icu.

### Inspirations Synthesized
- **Anthropic/Claude:** Warm sand canvas, olive-lime green `#81B806`, soft blue `#86B6EF`, golden amber accents
- **Cursor:** Vibrant orange `#F54E00`, dark background confidence
- **Tailwind Catalyst:** Full-spectrum badge colors at 500 weight, clean separation
- **Perplexity Finance:** Minimal chart palette, one accent, extreme restraint
- **Ruth's palette:** Navy `#0230E0`, deep navy `#050A30`, aubergine `#470426`, magenta `#96004D`, cream-yellow `#FFFFD0`, blush `#FFC9FE`, off-white `#FFFEF7`
- **Settings prototype:** Emerald `#0ACF83`, blue-grey `#5C97CB`, bondi cyan `#0891B2`, orange `#E8834A`, deep lilac `#7B4FB0`, figma-violet `#A259FF`

---

## 2. Accent & UI Chrome

### Primary Accent: Fuchsia 950
```
--accent: #4A044E          oklch(0.22, 0.12, 320)
--accent-light: #4A044E12  7% opacity — hover backgrounds
--accent-soft: #4A044E20   12.5% opacity — selected sidebar items
```

**Why Fuchsia 950:** Dark enough for white text on buttons/pills. Distinct from all data colors. Lives in the purple-magenta family which connects to Ruth's aubergine/magenta palette. Not cold-corporate like the old `#9D174D`. Not so dark it reads as black.

### Danger / Warning / Success / Info
```
--danger:  #CA054D          oklch(0.48, 0.18, 360)  Rosewood — warm cherry, not aggressive
--warning: #D97706          oklch(0.60, 0.16, 70)   Amber — unchanged, works perfectly
--success: #16A34A          oklch(0.58, 0.16, 150)  Green-600 — unchanged
--info:    #0891B2           oklch(0.58, 0.11, 210)  Bondi cyan — unchanged
```

**Rosewood `#CA054D` replaces `#DC2626` as danger.** Warmer, more sophisticated, better harmony with sand canvas. Still clearly "warning/stop" but without screaming.

### Selection State
```
--selection-bg: #0F1B3D     Navy — brand anchor
--selection-text: #F5E6C8   Cream — from Ruth's palette
```

---

## 3. Settings Dot Palette (Navigation Category Colors)

These are the colored dots next to section labels in Settings. Each dot identifies a functional category.

```
CATEGORY          HEX        OKLCH              ROLE
─────────────────────────────────────────────────────────
integrations      #16A34A    L.58 C.16 H150     Green — connections, live data
zones             #86B6EF    L.75 C.08 H250     Claude blue — measurement, calibration
gut               #81B806    L.68 C.18 H125     Claude lime — body, organic, growth
dietary           #81B806    L.68 C.18 H125     Same as gut (body category)
coach             #7B4FB0    L.48 C.14 H295     Deep lilac — authority, mentoring
appearance        #E8834A    L.65 C.14 H55      Warm orange — visual, aesthetic
notifications     #E8834A    L.65 C.14 H55      Same as appearance (attention)
email             #E8834A    L.65 C.14 H55      Same as appearance (communication)
beta              #A259FF    L.55 C.20 H300     Violet — experimental, future
support           #4A044E    L.22 C.12 H320     Accent — meta/system
general           #4A044E    L.22 C.12 H320     Accent
shortcuts         #4A044E    L.22 C.12 H320     Accent
changelog         #86B6EF    L.75 C.08 H250     Claude blue — information
sharing           #0891B2    L.58 C.11 H210     Bondi cyan — data flow
data              #7B4FB0    L.48 C.14 H295     Deep lilac — privacy, security
advanced          #64748B    L.53 C.02 H250     Slate — technical, low-key
account           #4A044E    L.22 C.12 H320     Accent
```

**5 unique dot families:**
1. **Green** `#16A34A` — connections
2. **Claude Lime** `#81B806` — body/organic
3. **Claude Blue** `#86B6EF` — measurement/info
4. **Bondi Cyan** `#0891B2` — data flow
5. **Warm Orange** `#E8834A` — attention/visual
6. **Deep Lilac** `#7B4FB0` — authority/privacy
7. **Violet** `#A259FF` — experimental
8. **Accent** `#4A044E` — system/meta
9. **Slate** `#64748B` — technical

---

## 4. Power Zones (6 Zones) — POLYCHROMATIC

Power zones are the most visually prominent zone system. They appear as chart background bands, distribution histograms, zone strips, and badge colors. Each zone must be instantly distinguishable.

### Design Decisions
- **NOT traffic light.** No obligation to go green→yellow→red.
- **Perceptual uniformity.** All zones target oklch L ≈ 0.65–0.70 for equal visual weight as chart bands.
- **Hue spread.** Maximum hue separation across 360° for instant recognition.
- **Sand-canvas optimized.** At 10% opacity as chart background fills, none should disappear into `#FAF9F5`.

```
ZONE   NAME         HEX        OKLCH                HUESHIFT   USE
──────────────────────────────────────────────────────────────────────
Z1     Recovery     #5C97CB    L.65 C.08 H235       —          Steel blue — calm, cool
Z2     Endurance    #14B8A2    L.68 C.11 H175       Teal       Green-teal — sustainable effort
Z3     Tempo        #E8B020    L.72 C.14 H85        Amber      Golden amber — controlled push
Z4     Threshold    #E36B30    L.62 C.16 H45        Burnt      Burnt orange — hard effort
Z5     VO₂max       #D4365C    L.52 C.18 H10        Rose       Deep rose — maximal
Z6     Neuromuscular #8B5CF6   L.55 C.20 H295       Violet     Violet — explosive, beyond

VIVID ACCENTS (for dots, badges, toggles ≤12px):
Z1v    #4A8AB8     Z2v #0DA68E     Z3v #D4A010     Z4v #CC5520     Z5v #C02848     Z6v #7C4AE0
```

### Fill Opacity Scale
```
Chart background bands:  8% opacity
Hover highlight:        14% opacity
Selected/active:        20% opacity
Badge background:       12% opacity
Badge text:             100% (vivid accent)
```

### Zone Strip
The signature 6-color horizontal bar: `flex gap-px`, each segment equal width, 6px height.
Colors: Z1→Z6 left to right, using base hex values.

---

## 5. Heart Rate Zones (6 Zones) — MONOCHROME RED

HR zones use a single-hue monochrome ramp. Red/rose is the natural association with heart/pulse. The progression goes from light rose to deep crimson.

```
ZONE   RANGE           HEX        OKLCH              DESCRIPTION
──────────────────────────────────────────────────────────────────
HR1    50-60% HRmax    #F5C4C4    L.84 C.05 H15      Blush — barely active
HR2    60-70% HRmax    #E8908A    L.70 C.10 H15      Salmon — light aerobic
HR3    70-80% HRmax    #D4606A    L.56 C.14 H10      Rose — moderate
HR4    80-90% HRmax    #B83A4A    L.44 C.16 H8       Crimson — hard
HR5    90-95% HRmax    #942030    L.34 C.18 H5       Dark crimson — very hard
HR6    95-100% HRmax   #6E1020    L.24 C.14 H5       Blood — maximal

MONOCHROME LOGIC: Same hue (≈H10-15), chroma increases slightly, lightness decreases linearly.
```

---

## 6. CHO Zones (6 Zones) — MONOCHROME ORANGE/AMBER

CHO (carbohydrate intake) zones are RAMTT's unique invention. They represent fueling intensity. Orange/amber is the natural association with energy/fuel.

```
ZONE   RATE          HEX        OKLCH              DESCRIPTION
──────────────────────────────────────────────────────────────────
C1     0-30 g/h      #F5DCC0    L.90 C.04 H60      Cream — minimal intake
C2     30-50 g/h     #E8C08A    L.80 C.09 H60      Wheat — moderate
C3     50-70 g/h     #D4A050    L.70 C.13 H60      Gold — standard
C4     70-90 g/h     #C47830    L.58 C.16 H50      Copper — aggressive
C5     90-120 g/h    #A85820    L.48 C.16 H45      Rust — elite
C6     120+ g/h      #8A3810    L.36 C.14 H40      Mahogany — explorer (500g/h vision)

MONOCHROME LOGIC: Hue ≈ 40-60° (orange/amber family), lightness 90→36, chroma peaks mid-range.
```

---

## 7. kJ/Energy Zones — MONOCHROME GREEN

Energy expenditure (kJ) uses green — the universal color for energy/power in physics. Monochrome from pale sage to deep forest.

```
ZONE   LEVEL         HEX        OKLCH              DESCRIPTION
──────────────────────────────────────────────────────────────────
E1     Very low      #D4E8D0    L.90 C.04 H145     Sage mist
E2     Low           #A8D4A0    L.80 C.08 H145     Light sage
E3     Moderate      #70B868    L.68 C.12 H145     Leaf green
E4     High          #48943C    L.56 C.15 H145     Forest
E5     Very high     #2A7028    L.44 C.14 H145     Deep forest
E6     Extreme       #185018    L.32 C.10 H145     Dark pine

MONOCHROME LOGIC: Hue ≈ 145° (true green), lightness 90→32.
```

---

## 8. Cadence — Standalone Signal Color

Cadence appears as a line overlaid on power/speed charts. It must be instantly distinguishable from power (blue/polychrome) and heart rate (red monochrome).

```
--cadence: #A259FF       oklch(0.55, 0.20, 300)   Violet/purple
--cadence-light: #A259FF30                          For area fills
```

**Why violet:** Maximum hue distance from red (HR), blue (power Z1), orange (CHO), and green (kJ). Purple/violet is unused by any zone system, making it unambiguous.

---

## 9. Speed/Pace — Standalone Signal Color

Speed or pace as a chart line, often overlaid with power.

```
--speed: #0891B2         oklch(0.58, 0.11, 210)    Bondi cyan/teal
--speed-light: #0891B230                             For area fills
```

**Why teal/cyan:** Distinct from blue (power), green (kJ), violet (cadence), red (HR). Cool but not cold. Works as secondary axis color.

---

## 10. Nutrient Colors

These are used in nutrition breakdowns, pie charts, stacked bars, and product labels.

```
NUTRIENT       HEX        OKLCH              SEMANTIC
──────────────────────────────────────────────────────
CHO            #E36B30    L.60 C.16 H45      Orange — energy, carbs
Protein        #4A044E    L.22 C.12 H320     Aubergine/accent — muscle, structure
Fat            #D4A050    L.70 C.13 H60      Gold/amber — lipids, stores
Fiber          #70B868    L.68 C.12 H145     Green — plant, natural
Fluid          #2AACCC    L.64 C.10 H210     Cyan-blue — water
Sodium         #9B40E8    L.48 C.20 H295     Electric violet — electrolytes
Caffeine       #14B8A2    L.68 C.11 H175     Teal — stimulant, alertness
Alcohol        #CA054D    L.48 C.18 H360     Rosewood — warning, limit
```

Note: CHO nutrient color `#E36B30` = Power Z4 color. This is intentional — carbs ARE energy, and the visual link reinforces the paradigm.

---

## 11. Graph Signal Lines

When multiple data series appear on the same chart, each needs a distinct color. This is the priority order:

```
PRIORITY   SIGNAL          COLOR         HEX
─────────────────────────────────────────────
1          Power           #5C97CB       Steel blue (Power Z1 base)
2          Heart Rate      #D4365C       Deep rose (HR system)
3          Cadence         #A259FF       Violet
4          Speed/Pace      #0891B2       Teal
5          Altitude        #64748B       Slate grey
6          Temperature     #E8834A       Warm orange
7          CHO intake      #E36B30       Orange (nutrient)
8          Fluid intake    #2AACCC       Cyan
```

When Power is shown with zone-coloring (polychromatic line), HR defaults to `#94203060` (30% opacity crimson) to avoid visual competition.

---

## 12. Comparison / Overlay Colors

When comparing sessions, athletes, or time periods:

```
SLOT     HEX        NAME           USE
──────────────────────────────────────────
A        #0F0F0E    Black          Current / primary
B        #5C97CB    Steel blue     Comparison 1
C        #E8834A    Warm orange    Comparison 2
D        #A259FF    Violet         Comparison 3
E        #14B8A2    Teal           Comparison 4
F        #CA054D    Rosewood       Comparison 5
```

Primary session is ALWAYS black. Comparisons use the most distinguishable colors from the dot palette.

---

## 13. Ruth's Atmosphere Layer

These colors are reserved for immersive/expressive contexts: landing pages, hero cards, dark mode accents, editorial content. NEVER used as data colors in the app.

```
TOKEN              HEX        OKLCH              USE
──────────────────────────────────────────────────────────
--atm-navy         #0230E0    L.35 C.22 H265     Deep blue — hero backgrounds
--atm-deep-navy    #050A30    L.10 C.06 H270     Near-black blue — dark mode base
--atm-aubergine    #470426    L.18 C.12 H340     Dark berry — editorial accents
--atm-magenta      #96004D    L.35 C.16 H350     Rich magenta — Ruth's brand mark
--atm-cream-yellow #FFFFD0    L.99 C.04 H100     Warm cream — light highlight
--atm-blush        #FFC9FE    L.88 C.08 H330     Soft pink — gentle accent
--atm-off-white    #FFFEF7    L.99 C.01 H90      Warm white — alternative canvas
```

### Duo-Chord Gradient Rule (unchanged)
Only adjacent-zone gradients allowed. Standard angle: 135deg.

---

## 14. Text Hierarchy (unchanged)

```
--text-primary:    #0F0F0E
--text-secondary:  #2A2826
--text-tertiary:   #5C5A55
--text-muted:      #8A8780
--text-subtle:     #B5B2AB
--text-ghost:      #D4D1CA
```

---

## 15. Surface & Border System (unchanged)

```
--canvas:      #FAF9F5    Sand
--card:        #FFFFFF    Elevated white
--surface-1:   #F3F1EC
--surface-2:   #ECEAE4
--surface-3:   #E5E3DE
--border-1:    rgba(0,0,0,0.06)    Card edges
--border-2:    rgba(0,0,0,0.04)    Inner dividers
```

---

## 16. Component Tinting (unchanged)

```
LEVEL      BG OPACITY    BORDER OPACITY    USE
────────────────────────────────────────────────
Whisper    4%            8%                Passive (card hover, table row)
Tint       10%           18%               Active (selected, modal)
Wash       20%           30%               Immersive (feature section)
```

Applied with any chromatic color: `background: oklch(from var(--zone-color) l c h / 0.04)`

---

## 17. Implementation Notes for Claude Code

### File Structure
```
globals.css — all CSS custom properties defined here
lib/constants/colors.ts — TypeScript constants for all zone systems
```

### Key Rules
1. **Zone systems never share colors across types.** Power zones are polychromatic, HR is red-monochrome, CHO is orange-monochrome, kJ is green-monochrome. No confusion possible.
2. **Monochrome zones use lightness as the only variable.** Hue stays constant (+-5deg), chroma peaks in the middle of the range then drops at extremes.
3. **Signal lines must be distinguishable at 1.5px stroke.** Test all combinations at actual chart size.
4. **Dot palette colors are NEVER used as zone colors.** Dots are for navigation categories. Zones are for physiological data. Different systems.
5. **Atmosphere colors NEVER appear in the app UI.** Landing page, marketing, Letters only.
6. **Accent `#4A044E` can double as protein nutrient color.** They share the same hex. This is acceptable because they never appear in the same context (UI chrome vs. nutrition breakdown).

### Migration from v1
```
CHANGED:
  accent:     #9D174D -> #4A044E (fuchsia 950)
  danger:     #DC2626 -> #CA054D (rosewood)
  Power Z5:   #E83B52 -> #D4365C (deeper rose, less neon)
  Power Z1:   #7CA3BE -> #5C97CB (slightly more saturated)

ADDED:
  HR zones (6, monochrome red)
  CHO zones (6, monochrome orange)
  kJ zones (6, monochrome green)
  Cadence signal color
  Speed signal color
  Comparison slot system
  Ruth's atmosphere layer (formalized)

UNCHANGED:
  Power Z2, Z3, Z4, Z6
  All nutrient colors except CHO (unchanged)
  All surface/border/text tokens
  Canvas #FAF9F5
```

---

*RAMTT Color System v2. Designed 6 April 2026.*
