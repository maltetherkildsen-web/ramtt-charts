/**
 * Generate 15 new reactive icons for Phase 1
 * Run: node scripts/generate-reactive-wave.mjs
 */
import { writeFileSync, appendFileSync } from 'fs'
import { join } from 'path'

const BASE = '/Users/malte/Desktop/Drops /ramtt-charts/components/icons/reactive'
const COPYRIGHT = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.
`

const ICONS = [
  {
    name: 'Trophy',
    reactionClass: 'ramtt-reactive-trophy',
    bodyClass: 'trophy-body',
    svg: `<path d="M6 4h12v6a6 6 0 01-12 0V4z"/><path d="M6 7H4a2 2 0 00-2 2v1a3 3 0 003 3h1.1"/><path d="M18 7h2a2 2 0 012 2v1a3 3 0 01-3 3h-1.1"/><path d="M9 17h6"/><path d="M10 21h4"/><path d="M12 14v3"/>`,
  },
  {
    name: 'Crown',
    reactionClass: 'ramtt-reactive-crown',
    bodyClass: 'crown-body',
    svg: `<path d="M2 17l3-10 4.5 5L12 4l2.5 8 4.5-5 3 10H2z"/><path d="M4 20h16"/>`,
  },
  {
    name: 'Zap',
    reactionClass: 'ramtt-reactive-zap',
    bodyClass: 'zap-body',
    svg: `<path d="M13 2L4.5 13H12l-1 9L20 10h-8l1-8z"/>`,
  },
  {
    name: 'Rocket',
    reactionClass: 'ramtt-reactive-rocket',
    bodyClass: 'rocket-body',
    svg: `<path d="M12 2C8 6.5 6 10.5 6 14l-3 2 3 3 4 2c0-2 .5-3.5 2-6s3-5 4.5-6.5c1-1 2.5-1.5 3.5-2.5-1-1-2-2-3.5-2.5S13.5 2.5 12 2z"/><circle cx="13.5" cy="10.5" r="1.5"/>`,
  },
  {
    name: 'Target',
    reactionClass: 'ramtt-reactive-target',
    bodyClass: 'target-body',
    svg: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  },
  {
    name: 'Shield',
    reactionClass: 'ramtt-reactive-shield',
    bodyClass: 'shield-body',
    svg: `<path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/>`,
  },
  {
    name: 'Coffee',
    reactionClass: 'ramtt-reactive-coffee',
    bodyClass: 'coffee-steam',
    // Only steam lines animate (lift), cup stays still
    svgBefore: `<path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z"/><path d="M16 9h2a2 2 0 010 4h-2"/><path d="M2 20h16"/>`,
    svgAnimated: `<path d="M6 1v2"/><path d="M10 1v2"/><path d="M14 1v2"/>`,
    hasSplit: true,
  },
  {
    name: 'Beer',
    reactionClass: 'ramtt-reactive-beer',
    bodyClass: 'beer-body',
    svg: `<path d="M7 4h10l-1 16H8L7 4z"/><path d="M7 4c0-1 1.5-2 5-2s5 1 5 2"/><path d="M7 8h10"/><path d="M9.5 8c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5"/>`,
  },
  {
    name: 'PizzaSlice',
    reactionClass: 'ramtt-reactive-pizza',
    bodyClass: 'pizza-body',
    svg: `<path d="M12 2L3 20h18L12 2z"/><circle cx="10" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="17" r="1" fill="currentColor" stroke="none"/><path d="M6 14c2-1 4-1 6 0s4 1 6 0"/>`,
  },
  {
    name: 'Bike',
    reactionClass: 'ramtt-reactive-bike',
    bodyClass: 'bike-body',
    svg: `<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17L9 9h3"/><path d="M14 9l4.5 8"/><path d="M9 9l5 8"/><path d="M9 9h5l1.5 3"/>`,
  },
  {
    name: 'Running',
    reactionClass: 'ramtt-reactive-running',
    bodyClass: 'running-body',
    svg: `<circle cx="15" cy="4" r="2"/><path d="M7 22l4-7"/><path d="M11 15l4-2 2 5"/><path d="M11 15l-3-4 4-3"/><path d="M4 17l4.5-2"/><path d="M16 9l-4 4"/>`,
  },
  {
    name: 'Dumbbell',
    reactionClass: 'ramtt-reactive-dumbbell',
    bodyClass: 'dumbbell-body',
    svg: `<path d="M6 7v10"/><path d="M18 7v10"/><path d="M6 12h12"/><rect x="3" y="8" width="3" height="8" rx="1"/><rect x="18" y="8" width="3" height="8" rx="1"/><path d="M1 10v4"/><path d="M23 10v4"/>`,
  },
  {
    name: 'Banana',
    reactionClass: 'ramtt-reactive-banana',
    bodyClass: 'banana-body',
    svg: `<path d="M5 6c1-2 4-3 7-2s5 3 6 6c1 4 0 7-2 9-1 1-3 1-4 0-2-3-4-7-4-10 0-1-.5-2-1.5-2.5S6 5.5 5 6z"/><path d="M12 4l1-2.5"/>`,
  },
  {
    name: 'Donut',
    reactionClass: 'ramtt-reactive-donut',
    bodyClass: 'donut-body',
    svg: `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M4.5 10c1-3 4-5 7.5-5s6.5 2 7.5 5" opacity="0.3"/><path d="M8 8l.5 1" opacity="0.5"/><path d="M14 7l.5 1.5" opacity="0.5"/><path d="M17 9l-.5 1" opacity="0.5"/>`,
  },
  {
    name: 'Taco',
    reactionClass: 'ramtt-reactive-taco',
    bodyClass: 'taco-body',
    svg: `<path d="M3 16c0-6 4-12 9-12s9 6 9 12"/><path d="M3 16c0 2 4 4 9 4s9-2 9-4"/><circle cx="8" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="14" r="1" fill="currentColor" stroke="none"/><path d="M10 16h4" opacity="0.3"/>`,
  },
]

// Generate files
const exports = []

for (const icon of ICONS) {
  let content
  if (icon.hasSplit) {
    // Coffee pattern: static part + animated part in separate groups
    content = `${COPYRIGHT}
import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactive${icon.name} = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="${icon.reactionClass}" {...props}>
    ${icon.svgBefore}
    <g className="${icon.bodyClass}">
      ${icon.svgAnimated}
    </g>
  </ReactiveBase>
))
IconReactive${icon.name}.displayName = 'IconReactive${icon.name}'
`
  } else {
    content = `${COPYRIGHT}
import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactive${icon.name} = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="${icon.reactionClass}" {...props}>
    <g className="${icon.bodyClass}">
      ${icon.svg}
    </g>
  </ReactiveBase>
))
IconReactive${icon.name}.displayName = 'IconReactive${icon.name}'
`
  }

  writeFileSync(join(BASE, `IconReactive${icon.name}.tsx`), content)
  exports.push(`export { IconReactive${icon.name} } from './IconReactive${icon.name}'`)
  console.log(`  ✓ IconReactive${icon.name}`)
}

// Append to index.ts
const divider = '\n// --- Wave 10-12 reactive icons ---\n'
appendFileSync(join(BASE, 'index.ts'), divider + exports.join('\n') + '\n')

console.log(`\n✓ ${ICONS.length} reactive icons generated + index updated`)
