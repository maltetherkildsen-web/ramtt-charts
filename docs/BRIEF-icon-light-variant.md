# Brief: "Light" Icon Variant for @ramtt/icons

## Context

On the accent-demo page (`app/accent-demo/SettingsReplica.tsx`) we tested a thinner, lighter rendering of @ramtt/icons in the settings sidebar navigation. The result was excellent — the icons feel integrated with the UI text rather than competing with it.

**Live reference:** https://ramtt.dev/accent-demo (sidebar navigation icons)

## What We Built (the prototype)

In the accent-demo sidebar, we wrapped each icon in a span that overrides stroke-width via CSS:

```tsx
<span className="shrink-0 [&_svg]:[stroke-width:1.25]">
  <Icon size={18} />
</span>
```

This is a hack. The goal of this task is to make this a proper, first-class variant in the @ramtt/icons system.

## The "Light" Variant — Exact Specification

| Property | Value | Comparison to Line variant |
|----------|-------|---------------------------|
| **Size** | 18px (default) | Line default is 16px |
| **Stroke width** | 1.25px | Line is 1.5px |
| **Color** | `currentColor` (inherits from parent) | Same as Line |
| **viewBox** | `0 0 24 24` (unchanged) | Same as Line |
| **Paths** | Identical to Line variant | Exact same SVG paths |

The Light variant uses the **exact same SVG paths** as the Line variant. The ONLY differences are:
1. Default `size` changes from 16 to 18
2. `strokeWidth` changes from 1.5 to 1.25

## Implementation Plan

### Step 1 — Create IconBaseLight

Create `components/icons/IconBaseLight.tsx`:

```tsx
import { forwardRef, type ReactNode } from 'react'
import type { IconProps } from './types'

export const IconBaseLight = forwardRef<SVGSVGElement, IconProps & { children: ReactNode }>(
  ({ size = 18, color = 'currentColor', className, children, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  ),
)
IconBaseLight.displayName = 'IconBaseLight'
```

### Step 2 — Generate Light variant files

Create directory `components/icons/light/` with one file per icon.

Each file follows the exact same pattern as `components/icons/line/` but imports `IconBaseLight` instead of `IconBase`:

```tsx
// components/icons/light/IconSettings.tsx
import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSettings = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    {/* EXACT same children as line/IconSettings.tsx */}
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2V5" />
    ...
  </IconBaseLight>
))
IconSettings.displayName = 'IconSettings'
```

**There are 126 Line icons.** All 126 get a Light variant. The SVG children are copy-pasted verbatim — no path changes.

### Step 3 — Create barrel export

Create `components/icons/light/index.ts` exporting all 126 Light icons, mirroring the structure of `components/icons/line/index.ts`.

### Step 4 — Add to icon catalog page

Update `/icon-catalog` page to include "Light" as a variant option alongside Line, Solid, and Duo.

The icon catalog currently has a variant toggle (Line/Solid/Duo). Add "Light" as a fourth option. When selected:
- Render icons from `components/icons/light/`
- Show the spec: 18px default, stroke-width 1.25
- The detail panel should show "Light" as the variant name

### Step 5 — Update the audit script

Update `scripts/audit-icons.ts` to include the `light/` directory in its validation. Each Light icon should:
- Export a component matching the filename
- Have a displayName set
- Import from `IconBaseLight` (not `IconBase`)
- Have no hardcoded colors

### Step 6 — Update counts and documentation

- Update `components/ui/RULES.md` icon section to mention the Light variant
- Update the comment in `components/icons/IconBase.tsx` if needed
- The total component count increases by 126 (one Light variant per Line icon)

## Design Rationale

The Light variant exists for **navigation and sidebar contexts** where icons accompany small text (11-13px) and should feel subordinate to the text, not equal to it. The thinner stroke at a slightly larger size creates an elegant, airy feel that matches what Figma uses in their own sidebar navigation.

**When to use Light vs Line:**
- **Line (16px, 1.5px stroke):** Default for most UI — buttons, cards, toolbars, standalone icons
- **Light (18px, 1.25px stroke):** Navigation sidebars, settings menus, list items where the icon is a secondary visual cue alongside text

## Files to Create/Modify

### Create (128 files):
- `components/icons/IconBaseLight.tsx` (1 file)
- `components/icons/light/*.tsx` (126 icon files)
- `components/icons/light/index.ts` (1 barrel export)

### Modify:
- `app/icon-catalog/page.tsx` — add Light variant toggle
- `scripts/audit-icons.ts` — add light/ directory validation
- `components/ui/RULES.md` — document Light variant

## Reference: Accent-Demo Sidebar (the prototype)

File: `app/accent-demo/SettingsReplica.tsx`, lines ~78-93

After the Light variant is built, update the accent-demo sidebar to import from `components/icons/light/` and remove the `[&_svg]:[stroke-width:1.25]` CSS hack.

## Quality Checklist

- [ ] All 126 Light icons render identically to Line icons but thinner
- [ ] Default size is 18px (not 16px)
- [ ] strokeWidth is 1.25 (not 1.5)
- [ ] Audit script passes with 0 errors for light/ directory
- [ ] Icon catalog shows Light as a selectable variant
- [ ] Accent-demo sidebar updated to use proper Light imports
- [ ] No hardcoded colors in any Light icon file
- [ ] All displayNames set correctly
