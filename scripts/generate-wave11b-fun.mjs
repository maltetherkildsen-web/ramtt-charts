/**
 * Wave 11B — More Fun / Easter Egg icons
 * Icons every endurance athlete will laugh at
 * Run: node scripts/generate-wave11b-fun.mjs
 */

import { writeFileSync, appendFileSync, readFileSync } from 'fs'
import { join } from 'path'

const BASE = '/Users/malte/Desktop/Drops /ramtt-charts.worktrees/agents-sports-icon-collection-expansion/components/icons'

const COPYRIGHT = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.
`

const ICONS = [

  {
    name: 'ChainTattoo',
    category: 'activity',
    tags: ['chain', 'tattoo', 'grease', 'calf', 'cycling', 'mark', 'rookie', 'fun'],
    // Chain ring grease mark on a calf — the mark of shame for new cyclists
    line: `<path d="M8 2c0 6 0 12 0 18"/><path d="M14 2c0 6 0 12 0 18"/><path d="M8 4h6"/><path d="M8 20h6"/><path d="M15 10c1 0 2 .5 2.5 1.5s.5 2-.5 2.5-2 .5-2.5-.5-.5-2 .5-2.5c.3-.2.6-.4 1-.5"/><path d="M15 13c1 0 2 .5 2.5 1.5s.5 2-.5 2.5-2 .5-2.5-.5"/>`,
    solid: `<path d="M8 2v18M14 2v18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M8 4h6M8 20h6" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M15 9.5c2.5-.5 4 1.5 3.5 3.5s-2.5 3-4 2.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/><path d="M15 12.5c2.5-.5 4 1.5 3.5 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>`,
    duoBg: `<rect x="7" y="2" width="8" height="18" rx="1"/>`,
  },
  {
    name: 'CleatWalk',
    category: 'activity',
    tags: ['cleat', 'walk', 'penguin', 'cycling', 'shoes', 'awkward', 'clip', 'fun'],
    // Person doing the awkward cleat-walk — tiptoeing like a penguin
    line: `<circle cx="12" cy="4" r="2"/><path d="M12 6v5"/><path d="M8 9l4 2 4-2"/><path d="M10 11l-1 5 2 1"/><path d="M14 11l1 5-2 1"/><path d="M9 17l-2 3.5"/><path d="M15 17l2 3.5"/><path d="M6 20l2 1.5"/><path d="M16 20l2 1.5"/>`,
    solid: `<circle cx="12" cy="4" r="2.75"/><path d="M12 7v4M8 9l4 2 4-2M10 11l-1 5 2 1M14 11l1 5-2 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 17l-2 3.5M15 17l2 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M5.5 19.5l3 2M15.5 19.5l3 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="12" cy="4" r="2"/>`,
  },
  {
    name: 'HelmetHair',
    category: 'activity',
    tags: ['helmet', 'hair', 'squish', 'cycling', 'lines', 'flat', 'vanity', 'fun'],
    // Head with ridiculous helmet-stripe hair pattern
    line: `<circle cx="12" cy="13" r="7"/><path d="M7 10c1-3 3-5 5-5s4 2 5 5"/><path d="M8 7l1.5 3"/><path d="M11 5.5V9"/><path d="M14 6l-1 3"/><path d="M16 7.5l-1.5 2.5"/><path d="M9 11c0 1 1.5 1 1.5 0"/><path d="M13 11c0 1 1.5 1 1.5 0"/>`,
    solid: `<circle cx="12" cy="13" r="7.75" fill="currentColor"/><path d="M8 7l1.5 3M11 5.5V9M14 6l-1 3M16 7.5l-1.5 2.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="10" cy="12" r="1" fill="white"/><circle cx="14" cy="12" r="1" fill="white"/><path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="12" cy="13" r="7"/>`,
  },
  {
    name: 'GelSticky',
    category: 'food',
    tags: ['gel', 'sticky', 'fingers', 'mess', 'energy', 'race', 'hands', 'fun'],
    // Hand with gel dripping off fingers — the mid-race struggle
    line: `<path d="M8 12V6a1 1 0 012 0v5"/><path d="M10 10V5a1 1 0 012 0v5"/><path d="M12 10V6a1 1 0 012 0v5"/><path d="M14 11V8a1 1 0 012 0v6a6 6 0 01-6 6H9a5 5 0 01-5-5v-2a1 1 0 012 0v1"/><path d="M8 18l-.5 3" opacity="0.5"/><path d="M11 19v2.5" opacity="0.5"/><path d="M14 18l.5 2" opacity="0.5"/>`,
    solid: `<path d="M8 5.25A1.75 1.75 0 016.25 7v4a.75.75 0 01-1.5 0v-1a1.75 1.75 0 00-3.5 0v4A5.75 5.75 0 007 19.75h3a6.75 6.75 0 006.75-6.75V8a1.75 1.75 0 00-3.5 0v2a.75.75 0 01-1.5 0V5a1.75 1.75 0 00-3.5 0v5a.75.75 0 01-1.5 0V7A1.75 1.75 0 008 5.25z"/><path d="M8 18l-.5 3M11 19v2.5M14 18l.5 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>`,
    duoBg: `<path d="M6 7v5a6 6 0 006 6h-2a5 5 0 01-5-5v-2a1 1 0 012 0v1V7z"/>`,
  },
  {
    name: 'SweatAngel',
    category: 'activity',
    tags: ['sweat', 'angel', 'indoor', 'trainer', 'turbo', 'puddle', 'zwift', 'fun'],
    // Puddle of sweat in angel-wing shape on the floor — indoor training badge
    line: `<ellipse cx="12" cy="16" rx="9" ry="4"/><path d="M12 12v-2"/><circle cx="12" cy="8" r="2"/><path d="M8 14c-2-1-3-3-2-5"/><path d="M16 14c2-1 3-3 2-5"/><path d="M10 18c0 .5.5 1 2 1s2-.5 2-1"/>`,
    solid: `<ellipse cx="12" cy="16" rx="9.75" ry="4.75" fill="currentColor" opacity="0.3"/><circle cx="12" cy="8" r="2.75" fill="currentColor"/><path d="M12 11v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M8 14c-2-1-3-3-2-5M16 14c2-1 3-3 2-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<ellipse cx="12" cy="16" rx="9" ry="4"/>`,
  },
  {
    name: 'NPlus1',
    category: 'activity',
    tags: ['n+1', 'bike', 'rule', 'always', 'more', 'collection', 'addiction', 'fun'],
    // Bike silhouette with a bold +1 — the sacred rule: you always need one more bike
    line: `<circle cx="6" cy="16" r="3"/><circle cx="16" cy="16" r="3"/><path d="M6 16l3-6h4l2 6"/><path d="M9 10l5 6"/><path d="M18 4h4"/><path d="M20 2v4"/><circle cx="20" cy="4" r="3.5" strokeDasharray="2 1.5"/>`,
    solid: `<circle cx="6" cy="16" r="3.75"/><circle cx="16" cy="16" r="3.75"/><path d="M6 16l3-6h4l2 6M9 10l5 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="4" r="3.5" fill="currentColor" opacity="0.15"/><path d="M18 4h4M20 2v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="6" cy="16" r="3"/><circle cx="16" cy="16" r="3"/>`,
  },
  {
    name: 'CoffeeRide',
    category: 'activity',
    tags: ['coffee', 'ride', 'cafe', 'stop', 'cycling', 'essential', 'culture', 'fun'],
    // Coffee cup on a bike wheel — the essential mid-ride café stop
    line: `<circle cx="12" cy="15" r="7"/><circle cx="12" cy="15" r="2"/><path d="M8 6h5v3a2 2 0 01-2 2H9"/><path d="M13 7h1.5a1.5 1.5 0 010 3H13"/><path d="M9 4v1"/><path d="M11 3.5v1.5"/>`,
    solid: `<circle cx="12" cy="15" r="7.75" fill="currentColor" opacity="0.2"/><circle cx="12" cy="15" r="2.75" fill="currentColor"/><path d="M12 8.25a7.75 7.75 0 017.24 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3"/><path fillRule="evenodd" d="M7.25 6a.75.75 0 01.75-.75h5a.75.75 0 01.75.75v.25h.75a2.25 2.25 0 010 4.5h-.75A2.75 2.75 0 0111 13.5H9a2.75 2.75 0 01-2.75-2.75V6z"/>`,
    duoBg: `<circle cx="12" cy="15" r="7"/>`,
  },
  {
    name: 'JellyLegs',
    category: 'activity',
    tags: ['jelly', 'legs', 'wobbly', 'post', 'workout', 'stairs', 'noodle', 'fun'],
    // Wobbly/wavy legs — that feeling after a hard session
    line: `<circle cx="12" cy="4" r="2"/><path d="M10 7h4"/><path d="M12 7v4"/><path d="M9 11c0 2 1 3 0 5s-1 3 0 5"/><path d="M15 11c0 2-1 3 0 5s1 3 0 5"/><path d="M7 21h4"/><path d="M13 21h4"/>`,
    solid: `<circle cx="12" cy="4" r="2.75"/><path d="M10 7h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M12 7v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M9 11c0 2 1 3 0 5s-1 3 0 5M15 11c0 2-1 3 0 5s1 3 0 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M7 21h4M13 21h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="12" cy="4" r="2"/>`,
  },
  {
    name: 'BlackToenail',
    category: 'activity',
    tags: ['black', 'toenail', 'runner', 'badge', 'honor', 'marathon', 'blister', 'fun'],
    // Foot with one darkened toenail — the runner's badge of honor
    line: `<path d="M4 16c0 2 2 4 6 4h4c4 0 6-2 6-4s-2-3-4-4-4-2-6-2-6 4-6 6z"/><circle cx="8" cy="14" r="1.5"/><circle cx="11" cy="13" r="1.5"/><circle cx="14" cy="13" r="1.5" fill="currentColor" stroke="none"/><circle cx="17" cy="14" r="1.5"/><circle cx="12.5" cy="16" r="1"/>`,
    solid: `<path d="M4 16c0 2 2 4 6 4h4c4 0 6-2 6-4s-2-3-4-4-4-2-6-2-6 4-6 6z" fill="currentColor" opacity="0.2"/><circle cx="8" cy="14" r="1.75" fill="currentColor" opacity="0.4"/><circle cx="11" cy="13" r="1.75" fill="currentColor" opacity="0.4"/><circle cx="14" cy="13" r="2" fill="currentColor"/><circle cx="17" cy="14" r="1.75" fill="currentColor" opacity="0.4"/><circle cx="12.5" cy="16.5" r="1.25" fill="currentColor" opacity="0.4"/>`,
    duoBg: `<path d="M4 16c0 2 2 4 6 4h4c4 0 6-2 6-4s-2-3-4-4-4-2-6-2-6 4-6 6z"/>`,
  },
  {
    name: 'PainCave',
    category: 'activity',
    tags: ['pain', 'cave', 'indoor', 'trainer', 'suffer', 'turbo', 'zwift', 'hurt', 'fun'],
    // Cave/arch with a bike trainer inside and suffering squiggles
    line: `<path d="M3 20c0-8 4-16 9-16s9 8 9 16"/><path d="M9 17l1.5-3h3L15 17"/><path d="M10 15l3 2"/><path d="M3 20h18"/><path d="M11 8l-.5-.5.5-.5.5.5-.5.5"/><path d="M14 7l-.5-.5.5-.5.5.5-.5.5"/>`,
    solid: `<path d="M12 3.25C8.5 3.25 4.25 9 3.35 18.25H2.25a.75.75 0 000 1.5h19.5a.75.75 0 000-1.5h-1.1C19.75 9 15.5 3.25 12 3.25z" fill="currentColor" opacity="0.15"/><path d="M9 17l1.5-3h3L15 17M10 15l3 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M11 8l-.5-.5.5-.5.5.5-.5.5M14 7l-.5-.5.5-.5.5.5-.5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>`,
    duoBg: `<path d="M3 20c0-8 4-16 9-16s9 8 9 16H3z"/>`,
  },
  {
    name: 'IceCreamTruck',
    category: 'food',
    tags: ['ice', 'cream', 'recovery', 'post', 'ride', 'treat', 'reward', 'summer', 'fun'],
    // Ice cream cone — the REAL post-ride recovery
    line: `<path d="M8 11l4 11 4-11"/><circle cx="12" cy="7" r="4"/><path d="M8.5 8c-.5 1.5-1.5 2-3 2"/><path d="M15.5 8c.5 1.5 1.5 2 3 2"/><path d="M10 5.5c-.5-.5-1-1.5 0-2.5"/>`,
    solid: `<circle cx="12" cy="7" r="4.75" fill="currentColor"/><path d="M8 11l4 11 4-11" fill="currentColor" opacity="0.6"/><path d="M8.5 8c-.5 1.5-1.5 2-3 2M15.5 8c.5 1.5 1.5 2 3 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="12" cy="7" r="4"/>`,
  },
  {
    name: 'TanLines',
    category: 'activity',
    tags: ['tan', 'lines', 'cycling', 'jersey', 'ridiculous', 'summer', 'arms', 'fun'],
    // T-shirt outline with sharp tan line demarcation — the ridiculous cyclist tan
    line: `<path d="M8 3h8l3 4v2h-3v11H8V9H5V7l3-4z"/><path d="M8 9h8" strokeWidth="2" opacity="0.4"/><path d="M5 7h3v2H5z" opacity="0.3"/><path d="M16 7h3v2h-3z" opacity="0.3"/>`,
    solid: `<path d="M8 3h8l3 4v2h-3v11H8V9H5V7l3-4z" fill="currentColor"/><path d="M5 7h3v2H5zm11 0h3v2h-3z" fill="currentColor" opacity="0.3"/><path d="M8 9h8v11H8V9z" fill="currentColor" opacity="0.5"/>`,
    duoBg: `<path d="M8 3h8l3 4v2h-3v11H8V9H5V7l3-4z"/>`,
  },
  {
    name: 'FlatTire',
    category: 'activity',
    tags: ['flat', 'tire', 'puncture', 'cycling', 'roadside', 'curse', 'mechanical', 'fun'],
    // Deflated wheel — every cyclist's nightmare
    line: `<ellipse cx="12" cy="14" rx="8" ry="5"/><circle cx="12" cy="12" r="2"/><path d="M12 12l8 2" strokeDasharray="2 2" opacity="0.4"/><path d="M12 12l-8 2" strokeDasharray="2 2" opacity="0.4"/><path d="M10 4l1 1-1 1" opacity="0.5"/><path d="M13 3l1 1-1 1" opacity="0.5"/><path d="M15 5l1 1-1 1" opacity="0.5"/>`,
    solid: `<ellipse cx="12" cy="14" rx="8.75" ry="5.75" fill="currentColor" opacity="0.2"/><circle cx="12" cy="12" r="2.75" fill="currentColor"/><path d="M10 4l1 1-1 1M13 3l1 1-1 1M15 5l1 1-1 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>`,
    duoBg: `<ellipse cx="12" cy="14" rx="8" ry="5"/>`,
  },
  {
    name: 'PortaPotty',
    category: 'sport-race',
    tags: ['porta', 'potty', 'toilet', 'pre-race', 'queue', 'anxiety', 'nervous', 'fun'],
    // Porta-potty with a clock = the pre-race panic
    line: `<rect x="6" y="6" width="12" height="14" rx="1"/><path d="M6 4h12"/><path d="M10 6v14"/><path d="M12 10v4"/><path d="M11 12h2"/><circle cx="18" cy="5" r="3"/><path d="M18 3.5v1.5l1 1"/>`,
    solid: `<path fillRule="evenodd" d="M6 3.25a.75.75 0 000 1.5h8.05A3.75 3.75 0 0018 8.7V20a1.75 1.75 0 01-1.75 1.75H7.75A1.75 1.75 0 016 20V5.5h-.75a.75.75 0 010-1.5H18a.75.75 0 010 1.5h-1.26A3.76 3.76 0 0018.75 5a3.75 3.75 0 00-7.5 0c0 .17.01.34.04.5H6zm4.75 2v14.25h-1.5V5.25h1.5z"/><circle cx="18" cy="5" r="3" fill="currentColor"/>`,
    duoBg: `<rect x="6" y="6" width="12" height="14" rx="1"/>`,
  },
  {
    name: 'EarlyBedtime',
    category: 'activity',
    tags: ['early', 'bedtime', 'friday', 'sleep', 'long', 'ride', 'saturday', '9pm', 'fun'],
    // Moon + clock showing 9pm — going to bed early for the Saturday long ride
    line: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><path d="M19 3a3 3 0 01-2.5 4.5A4 4 0 0119 3z"/><path d="M3 3l1.5 1.5"/><path d="M4 7H2.5"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 6.25a.75.75 0 01.75.75v4.69l2.78 1.85a.75.75 0 01-.83 1.25l-3-2a.75.75 0 01-.45-.69V7a.75.75 0 01.75-.75z"/><path d="M19 3a3 3 0 01-2.5 4.5A4 4 0 0119 3z" fill="currentColor"/>`,
    duoBg: `<circle cx="12" cy="12" r="9"/>`,
  },
]

// ─── Same generators as Wave 10/11 ──────────────────────────────────────────

function lineFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const Icon${icon.name} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    ${icon.line}
  </IconBase>
))
Icon${icon.name}.displayName = 'Icon${icon.name}'
`
}

function lightFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const Icon${icon.name} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    ${icon.line}
  </IconBaseLight>
))
Icon${icon.name}.displayName = 'Icon${icon.name}'
`
}

function solidFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const Icon${icon.name}Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    ${icon.solid}
  </IconBaseSolid>
))
Icon${icon.name}Solid.displayName = 'Icon${icon.name}Solid'
`
}

function duoFile(icon) {
  return `${COPYRIGHT}
import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const Icon${icon.name}Duo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      ${icon.duoBg}
    </g>
    {/* Foreground */}
    ${icon.line}
  </IconBaseDuo>
))
Icon${icon.name}Duo.displayName = 'Icon${icon.name}Duo'
`
}

function catalogEntry(icon) {
  return `  {
    name: 'Icon${icon.name}',
    category: '${icon.category}',
    tags: [${icon.tags.map(t => `'${t}'`).join(', ')}],
    hasLine: true,
    hasSolid: true,
    hasDuo: true,
    hasAnimated: false,
  },`
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log(`\n😂 Generating Wave 11B fun icons: ${ICONS.length} icons × 4 variants = ${ICONS.length * 4} files\n`)

const lineExports = []
const lightExports = []
const solidExports = []
const duoExports = []
const catalogEntries = []

for (const icon of ICONS) {
  writeFileSync(join(BASE, 'line', `Icon${icon.name}.tsx`), lineFile(icon))
  lineExports.push(`export { Icon${icon.name} } from './Icon${icon.name}'`)

  writeFileSync(join(BASE, 'light', `Icon${icon.name}.tsx`), lightFile(icon))
  lightExports.push(`export { Icon${icon.name} } from './Icon${icon.name}'`)

  writeFileSync(join(BASE, 'solid', `Icon${icon.name}Solid.tsx`), solidFile(icon))
  solidExports.push(`export { Icon${icon.name}Solid } from './Icon${icon.name}Solid'`)

  writeFileSync(join(BASE, 'duo', `Icon${icon.name}Duo.tsx`), duoFile(icon))
  duoExports.push(`export { Icon${icon.name}Duo } from './Icon${icon.name}Duo'`)

  catalogEntries.push(catalogEntry(icon))
  console.log(`  ✓ Icon${icon.name} (${icon.category}) — ${icon.tags[icon.tags.length - 2]}`)
}

const divider = '\n// --- Wave 11B: Fun / Easter Eggs ---\n'
appendFileSync(join(BASE, 'line', 'index.ts'), divider + lineExports.join('\n') + '\n')
appendFileSync(join(BASE, 'light', 'index.ts'), divider + lightExports.join('\n') + '\n')
appendFileSync(join(BASE, 'solid', 'index.ts'), divider + solidExports.join('\n') + '\n')
appendFileSync(join(BASE, 'duo', 'index.ts'), divider + duoExports.join('\n') + '\n')

const catalogPath = join(BASE, 'catalog.ts')
let catalogContent = readFileSync(catalogPath, 'utf-8')
const newEntriesBlock = `\n  // ─── Wave 11B: Fun / Easter Eggs (${ICONS.length}) ──────────────────────\n${catalogEntries.join('\n')}\n`
catalogContent = catalogContent.replace(/\n\]\n$/, newEntriesBlock + ']\n')
const totalCount = (catalogContent.match(/name: 'Icon/g) || []).length
catalogContent = catalogContent.replace(/Icon catalog metadata \(\d+ icons/, `Icon catalog metadata (${totalCount} icons`)
writeFileSync(catalogPath, catalogContent)

console.log(`\n✓ Catalog updated — ${totalCount} total icons`)
console.log(`\n😂 Wave 11B complete!`)
console.log(`\n   The fun ones:`)
console.log(`   🔗 ChainTattoo — chain grease on your calf (cyclist rookie mark)`)
console.log(`   🐧 CleatWalk — penguin-walking in cycling shoes`)
console.log(`   💇 HelmetHair — squished hair with vent stripes`)
console.log(`   🫠 GelSticky — gel-covered fingers mid-race`)
console.log(`   😇 SweatAngel — puddle of sweat on the floor (indoor training)`)
console.log(`   🚲 NPlus1 — you always need one more bike`)
console.log(`   ☕ CoffeeRide — the essential mid-ride café stop`)
console.log(`   🍜 JellyLegs — wobbly post-workout legs`)
console.log(`   🦶 BlackToenail — the runner's badge of honor`)
console.log(`   🔥 PainCave — indoor trainer suffering den`)
console.log(`   🍦 IceCreamTruck — the REAL recovery`)
console.log(`   👕 TanLines — ridiculous cycling jersey tan`)
console.log(`   💨 FlatTire — every cyclist's mid-ride nightmare`)
console.log(`   🚽 PortaPotty — pre-race toilet queue panic`)
console.log(`   🌙 EarlyBedtime — 9pm Friday for Saturday long ride`)
