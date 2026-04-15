/**
 * The Lucky 7 — bring us to exactly 400 base icons
 * Run: node scripts/generate-400.mjs
 */
import { writeFileSync, appendFileSync, readFileSync } from 'fs'
import { join } from 'path'

const BASE = '/Users/malte/Desktop/Drops /ramtt-charts/components/icons'
const COPYRIGHT = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.
`

const ICONS = [
  {
    name: 'Lightbulb',
    category: 'misc',
    tags: ['lightbulb', 'idea', 'tip', 'insight', 'suggestion', 'bright'],
    line: `<path d="M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2z"/><path d="M9 21h6"/><path d="M10 17v-2.5c-1-.5-2-1.5-2-3"/><path d="M14 17v-2.5c1-.5 2-1.5 2-3"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.25a7.75 7.75 0 00-4.45 14.1.75.75 0 01.32.61V18c0 .97.78 1.75 1.75 1.75h4.76c.97 0 1.75-.78 1.75-1.75v-2.04a.75.75 0 01.32-.61A7.75 7.75 0 0012 1.25zM8.25 21a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"/>`,
    duoBg: `<path d="M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2z"/>`,
  },
  {
    name: 'Gift',
    category: 'commerce',
    tags: ['gift', 'present', 'reward', 'prize', 'subscription', 'perk'],
    line: `<rect x="3" y="10" width="18" height="10" rx="2"/><path d="M3 14h18"/><path d="M12 10v10"/><path d="M12 10c-2 0-4-1-4-3s2-3 4-3c-2 0-4-1-4-3" /><path d="M12 10c2 0 4-1 4-3s-2-3-4-3c2 0 4-1 4-3"/>`,
    solid: `<path d="M12 3.25c-1.5 0-3 .7-3.7 1.75H5A2.75 2.75 0 002.25 7.75v10A2.75 2.75 0 005 20.5h14a2.75 2.75 0 002.75-2.75v-10A2.75 2.75 0 0019 5h-3.3c-.7-1.05-2.2-1.75-3.7-1.75z"/>`,
    duoBg: `<rect x="3" y="10" width="18" height="10" rx="2"/>`,
  },
  {
    name: 'Wallet',
    category: 'commerce',
    tags: ['wallet', 'payment', 'money', 'finance', 'subscription', 'billing'],
    line: `<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 14h2"/>`,
    solid: `<path fillRule="evenodd" d="M4 5.25A2.75 2.75 0 001.25 8v10A2.75 2.75 0 004 20.75h16A2.75 2.75 0 0022.75 18V8A2.75 2.75 0 0020 5.25H4zM2.75 10.75v7.25c0 .69.56 1.25 1.25 1.25h16c.69 0 1.25-.56 1.25-1.25v-7.25H2.75zM16 13.25a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2z"/>`,
    duoBg: `<rect x="2" y="6" width="20" height="14" rx="2"/>`,
  },
  {
    name: 'Scissors',
    category: 'action',
    tags: ['scissors', 'cut', 'trim', 'clip', 'edit', 'crop'],
    line: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8l12 8"/><path d="M8.5 16l12-8"/>`,
    solid: `<circle cx="6" cy="6" r="3.5"/><circle cx="6" cy="18" r="3.5"/><path d="M8.5 8l12 8M8.5 16l12-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>`,
  },
  {
    name: 'Megaphone',
    category: 'communication',
    tags: ['megaphone', 'announce', 'broadcast', 'marketing', 'news', 'shout'],
    line: `<path d="M18 3v18l-8-6H4a1 1 0 01-1-1V10a1 1 0 011-1h6l8-6z"/><path d="M18 9a4 4 0 010 6"/><path d="M6 15v4a1 1 0 001 1h2a1 1 0 001-1v-3"/>`,
    solid: `<path d="M18 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.2.6L10 16H4A1.75 1.75 0 012.25 14.25v-4.5A1.75 1.75 0 014 8h6l7.55-5.65a.75.75 0 011.2.6z"/><path d="M18 9a4 4 0 010 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M18 3v18l-8-6H4a1 1 0 01-1-1V10a1 1 0 011-1h6l8-6z"/>`,
  },
  {
    name: 'Anchor',
    category: 'misc',
    tags: ['anchor', 'stable', 'foundation', 'port', 'maritime', 'secure'],
    line: `<circle cx="12" cy="5" r="3"/><path d="M12 8v14"/><path d="M5 12H2a10 10 0 0020 0h-3"/><path d="M12 22a10 10 0 01-10-10"/><path d="M12 22a10 10 0 0010-10"/>`,
    solid: `<circle cx="12" cy="5" r="3.5"/><path d="M12 8v14M5 12H2a10 10 0 0020 0h-3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>`,
    duoBg: `<circle cx="12" cy="5" r="3"/><path d="M2 12a10 10 0 0020 0H2z"/>`,
  },
  {
    name: 'Diamond',
    category: 'achievement',
    tags: ['diamond', 'premium', 'pro', 'quality', 'gem', 'vip', 'tier'],
    line: `<path d="M5 8l7-6 7 6-7 14L5 8z"/><path d="M5 8h14"/><path d="M8.5 2L5 8l7 14"/><path d="M15.5 2L19 8l-7 14"/>`,
    solid: `<path d="M12 1.25a.75.75 0 01.55.24l7 6a.75.75 0 01.1.83l-7 14a.75.75 0 01-1.3 0l-7-14a.75.75 0 01.1-.83l7-6a.75.75 0 01.55-.24z"/>`,
    duoBg: `<path d="M5 8l7-6 7 6-7 14L5 8z"/>`,
  },
]

// Generators
function lineFile(i) { return `${COPYRIGHT}\nimport { forwardRef } from 'react'\nimport { IconBase, type IconProps } from '../IconBase'\n\nexport const Icon${i.name} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (\n  <IconBase ref={ref} {...props}>\n    ${i.line}\n  </IconBase>\n))\nIcon${i.name}.displayName = 'Icon${i.name}'\n` }
function lightFile(i) { return `${COPYRIGHT}\nimport { forwardRef } from 'react'\nimport { IconBaseLight, type IconProps } from '../IconBaseLight'\n\nexport const Icon${i.name} = forwardRef<SVGSVGElement, IconProps>((props, ref) => (\n  <IconBaseLight ref={ref} {...props}>\n    ${i.line}\n  </IconBaseLight>\n))\nIcon${i.name}.displayName = 'Icon${i.name}'\n` }
function solidFile(i) { return `${COPYRIGHT}\nimport { forwardRef } from 'react'\nimport { IconBaseSolid } from '../IconBaseSolid'\nimport type { IconProps } from '../types'\n\nexport const Icon${i.name}Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (\n  <IconBaseSolid ref={ref} {...props}>\n    ${i.solid}\n  </IconBaseSolid>\n))\nIcon${i.name}Solid.displayName = 'Icon${i.name}Solid'\n` }
function duoFile(i) { return `${COPYRIGHT}\nimport { forwardRef } from 'react'\nimport { IconBaseDuo } from '../IconBaseDuo'\nimport type { IconDuoProps } from '../types'\n\nexport const Icon${i.name}Duo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (\n  <IconBaseDuo ref={ref} {...props}>\n    {/* Background */}\n    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>\n      ${i.duoBg}\n    </g>\n    {/* Foreground */}\n    ${i.line}\n  </IconBaseDuo>\n))\nIcon${i.name}Duo.displayName = 'Icon${i.name}Duo'\n` }

console.log(`\n💎 The Lucky 7 → 400 base icons\n`)

const le=[], lie=[], se=[], de=[], ce=[]
for (const i of ICONS) {
  writeFileSync(join(BASE,'line',`Icon${i.name}.tsx`), lineFile(i))
  writeFileSync(join(BASE,'light',`Icon${i.name}.tsx`), lightFile(i))
  writeFileSync(join(BASE,'solid',`Icon${i.name}Solid.tsx`), solidFile(i))
  writeFileSync(join(BASE,'duo',`Icon${i.name}Duo.tsx`), duoFile(i))
  le.push(`export { Icon${i.name} } from './Icon${i.name}'`)
  lie.push(`export { Icon${i.name} } from './Icon${i.name}'`)
  se.push(`export { Icon${i.name}Solid } from './Icon${i.name}Solid'`)
  de.push(`export { Icon${i.name}Duo } from './Icon${i.name}Duo'`)
  ce.push(`  {\n    name: 'Icon${i.name}',\n    category: '${i.category}',\n    tags: [${i.tags.map(t=>`'${t}'`).join(', ')}],\n    hasLine: true,\n    hasSolid: true,\n    hasDuo: true,\n    hasAnimated: false,\n  },`)
  console.log(`  ✓ Icon${i.name} (${i.category})`)
}

const div = '\n// --- The Lucky 7 (400 milestone) ---\n'
appendFileSync(join(BASE,'line','index.ts'), div + le.join('\n') + '\n')
appendFileSync(join(BASE,'light','index.ts'), div + lie.join('\n') + '\n')
appendFileSync(join(BASE,'solid','index.ts'), div + se.join('\n') + '\n')
appendFileSync(join(BASE,'duo','index.ts'), div + de.join('\n') + '\n')

// Catalog
const cp = join(BASE,'catalog.ts')
let cc = readFileSync(cp,'utf-8')
cc = cc.replace(/\n\]\n$/, `\n  // ─── The Lucky 7 (400 milestone) ─────────────────────────────────\n${ce.join('\n')}\n]\n`)
const total = (cc.match(/name: 'Icon/g)||[]).length
cc = cc.replace(/Icon catalog metadata \(\d+ icons/, `Icon catalog metadata (${total} icons`)
writeFileSync(cp, cc)

console.log(`\n✓ ${total} base icons — ${total === 400 ? '🎯 400 EXACT!' : `⚠️ ${total}, expected 400`}`)
