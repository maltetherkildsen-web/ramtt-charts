/**
 * Wave 10 — Icon generator
 * Creates line/light/solid/duo variants for ~55 unique icons
 * Run: node scripts/generate-wave10-icons.mjs
 */

import { writeFileSync, appendFileSync, readFileSync } from 'fs'
import { join } from 'path'

const BASE = '/Users/malte/Desktop/Drops /ramtt-charts.worktrees/agents-sports-icon-collection-expansion/components/icons'

const COPYRIGHT = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.
`

// ─── Icon definitions ────────────────────────────────────────────────────────
// Each icon: name, category, tags, line SVG, solid SVG, duoBg SVG
// Line paths: stroke-based (inherited from IconBase)
// Solid paths: fill-based closed paths
// DuoBg: simplified background shape at 15% opacity

const ICONS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // SECURITY (4) — new category
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Shield',
    category: 'security',
    tags: ['shield', 'protect', 'security', 'guard', 'safe', 'defense'],
    line: `<path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.75l-9 4.5V12c0 5.93 3.68 11.02 8.68 12.44a.75.75 0 00.64 0C17.32 23.02 21 17.93 21 12V6.25l-9-4.5z"/>`,
    duoBg: `<path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/>`,
  },
  {
    name: 'ShieldCheck',
    category: 'security',
    tags: ['shield', 'verified', 'secure', 'protected', 'check', 'trust'],
    line: `<path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/><path d="M9 12l2 2 4-4"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.75l-9 4.5V12c0 5.93 3.68 11.02 8.68 12.44a.75.75 0 00.64 0C17.32 23.02 21 17.93 21 12V6.25l-9-4.5zm3.53 8.78a.75.75 0 00-1.06-1.06L11 12.94l-1.47-1.47a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4-4z"/>`,
    duoBg: `<path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/>`,
  },
  {
    name: 'Key',
    category: 'security',
    tags: ['key', 'access', 'auth', 'password', 'unlock', 'api'],
    line: `<circle cx="8" cy="8" r="3.5"/><path d="M11 11l9.5 9.5"/><path d="M16.5 15v3.5"/><path d="M14 17.5h3"/>`,
    solid: `<path fillRule="evenodd" d="M8 3.75a4.25 4.25 0 00-1.18 8.33L6.5 12.4a.75.75 0 00.22.53l.5.5a.75.75 0 001.06 0l.72-.72.72.72a.75.75 0 001.06 0l.72-.72 1.22 1.22a.75.75 0 001.06 0l1-1a.75.75 0 000-1.06L8.85 5.94A4.25 4.25 0 008 3.75zM8 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>`,
    duoBg: `<circle cx="8" cy="8" r="3.5"/>`,
  },
  {
    name: 'Fingerprint',
    category: 'security',
    tags: ['fingerprint', 'biometric', 'identity', 'scan', 'touch', 'auth'],
    line: `<path d="M12 2a7 7 0 00-7 7v2a7 7 0 003.5 6.06"/><path d="M12 6a3 3 0 00-3 3v3a5 5 0 002 4"/><path d="M12 10v4a3 3 0 003 3"/><path d="M19 9a7 7 0 00-3-5.75"/><path d="M19 11v-1a2 2 0 00-.25-.97"/>`,
    solid: `<path d="M12 2a7 7 0 00-7 7v2a7 7 0 003.5 6.06" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/><path d="M12 6a3 3 0 00-3 3v3a5 5 0 002 4" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/><path d="M12 10v4a3 3 0 003 3" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/><path d="M19 9a7 7 0 00-3-5.75" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/>`,
    duoBg: `<circle cx="12" cy="12" r="8"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACHIEVEMENT (7) — new category
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Trophy',
    category: 'achievement',
    tags: ['trophy', 'cup', 'win', 'champion', 'prize', 'pr'],
    line: `<path d="M6 4h12v6a6 6 0 01-12 0V4z"/><path d="M6 7H4a2 2 0 00-2 2v1a3 3 0 003 3h1.1"/><path d="M18 7h2a2 2 0 012 2v1a3 3 0 01-3 3h-1.1"/><path d="M9 17h6"/><path d="M10 21h4"/><path d="M12 14v3"/>`,
    solid: `<path d="M5.25 4A.75.75 0 016 3.25h12a.75.75 0 01.75.75v6a6.75 6.75 0 01-5.25 6.58V19h2.25a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5H10.5v-2.42A6.75 6.75 0 015.25 10V4zM4 6.25h1.25V10c0 .34.03.67.08 1H5a2.25 2.25 0 01-2.25-2.25V8A1.25 1.25 0 014 6.25zm14.75 0H20A1.25 1.25 0 0121.25 8v.75A2.25 2.25 0 0119 11h-.33c.05-.33.08-.66.08-1V6.25z"/>`,
    duoBg: `<path d="M6 4h12v6a6 6 0 01-12 0V4z"/>`,
  },
  {
    name: 'Crown',
    category: 'achievement',
    tags: ['crown', 'king', 'queen', 'royal', 'best', 'leaderboard'],
    line: `<path d="M2 17l3-10 4.5 5L12 4l2.5 8 4.5-5 3 10H2z"/><path d="M4 20h16"/>`,
    solid: `<path d="M1.38 16.55l2.93-9.76a.75.75 0 011.27-.32L9.5 10.6l2.08-6.65a.75.75 0 011.42.01L15 10.53l3.55-4.07a.75.75 0 011.28.37l2.55 9.72a.75.75 0 01-.73.95H2.11a.75.75 0 01-.73-.95zM3.25 19a.75.75 0 01.75-.75h16a.75.75 0 010 1.5H4a.75.75 0 01-.75-.75z"/>`,
    duoBg: `<path d="M2 17l3-10 4.5 5L12 4l2.5 8 4.5-5 3 10H2z"/>`,
  },
  {
    name: 'Target',
    category: 'achievement',
    tags: ['target', 'goal', 'aim', 'focus', 'objective', 'bullseye'],
    line: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.25C6.06 1.25 1.25 6.06 1.25 12S6.06 22.75 12 22.75 22.75 17.94 22.75 12 17.94 1.25 12 1.25zM2.75 12a9.25 9.25 0 1118.5 0 9.25 9.25 0 01-18.5 0zm3.5 0a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0zm4 0a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0z"/>`,
    duoBg: `<circle cx="12" cy="12" r="10"/>`,
  },
  {
    name: 'MountainFlag',
    category: 'achievement',
    tags: ['mountain', 'flag', 'summit', 'peak', 'accomplish', 'climb', 'goal'],
    line: `<path d="M4 21l5-7 3 4 4-9 4 12H4z"/><path d="M15 5v8"/><path d="M15 5l5 3-5 3"/>`,
    solid: `<path d="M16 3.25a.75.75 0 00-.75.75v2.93l-3.8 2.28a.75.75 0 000 1.28l3.8 2.28v1.84l-2.83-6.37a.75.75 0 00-1.3-.16L8.68 11.6 5.27 16.4a.75.75 0 00-.02.05L3.4 19.37a.75.75 0 00.66 1.13h16.68a.75.75 0 00.68-1.07l-4.67-10.5V4a.75.75 0 00-.75-.75zm.75 5.68l2.78 6.25-3.53-4.95V8.93z"/>`,
    duoBg: `<path d="M4 21l5-7 3 4 4-9 4 12H4z"/>`,
  },
  {
    name: 'Award',
    category: 'achievement',
    tags: ['award', 'ribbon', 'badge', 'certificate', 'honor', 'recognition'],
    line: `<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5"/>`,
    solid: `<path d="M12 2.25a6.75 6.75 0 00-4.11 12.1L6.3 21.27a.75.75 0 001.1.83L12 19.22l4.6 2.88a.75.75 0 001.1-.83l-1.59-6.92A6.75 6.75 0 0012 2.25z"/>`,
    duoBg: `<circle cx="12" cy="9" r="6"/>`,
  },
  {
    name: 'Streak',
    category: 'achievement',
    tags: ['streak', 'fire', 'flame', 'hot', 'consecutive', 'burning'],
    line: `<path d="M12 22c-4 0-6-3.5-6-7 0-4 3-6 4-9 .5 2 2 3 2 3s2-3 2-5c2 3 4 5 4 8 0 5-2 10-6 10z"/><path d="M12 22c-1.5 0-3-1.5-3-4 0-2 1.5-3.5 3-5 1.5 1.5 3 3 3 5s-1.5 4-3 4z"/>`,
    solid: `<path d="M12 22c-4 0-6-3.5-6-7 0-4 3-6 4-9 .5 2 2 3 2 3s2-3 2-5c2 3 4 5 4 8 0 5-2 10-6 10z"/>`,
    duoBg: `<path d="M12 22c-4 0-6-3.5-6-7 0-4 3-6 4-9 .5 2 2 3 2 3s2-3 2-5c2 3 4 5 4 8 0 5-2 10-6 10z"/>`,
  },
  {
    name: 'Zap',
    category: 'achievement',
    tags: ['zap', 'lightning', 'bolt', 'energy', 'fast', 'quick', 'power'],
    line: `<path d="M13 2L4.5 13H12l-1 9L20 10h-8l1-8z"/>`,
    solid: `<path d="M13.75 1.25a.75.75 0 00-1.44-.17l-8.5 11a.75.75 0 00.62 1.17h6.72l-.84 7.55a.75.75 0 001.38.47l9-12a.75.75 0 00-.62-1.17h-6.28l.72-5.76a.75.75 0 00-.76-.84z"/>`,
    duoBg: `<path d="M13 2L4.5 13H12l-1 9L20 10h-8l1-8z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTROLS (5) — expand into existing or new
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'ToggleOn',
    category: 'toggle',
    tags: ['toggle', 'on', 'switch', 'enabled', 'active'],
    line: `<rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="17" cy="12" r="3" fill="currentColor" stroke="none"/>`,
    solid: `<path fillRule="evenodd" d="M7 5.25A6.75 6.75 0 00.25 12 6.75 6.75 0 007 18.75h10A6.75 6.75 0 0023.75 12 6.75 6.75 0 0017 5.25H7zM17 15a3 3 0 100-6 3 3 0 000 6z"/>`,
    duoBg: `<rect x="1" y="6" width="22" height="12" rx="6"/>`,
  },
  {
    name: 'ToggleOff',
    category: 'toggle',
    tags: ['toggle', 'off', 'switch', 'disabled', 'inactive'],
    line: `<rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="7" cy="12" r="3"/>`,
    solid: `<path fillRule="evenodd" d="M7 5.25A6.75 6.75 0 00.25 12 6.75 6.75 0 007 18.75h10A6.75 6.75 0 0023.75 12 6.75 6.75 0 0017 5.25H7zM7 9a3 3 0 100 6 3 3 0 000-6z"/>`,
    duoBg: `<rect x="1" y="6" width="22" height="12" rx="6"/>`,
  },
  {
    name: 'Sliders',
    category: 'toggle',
    tags: ['sliders', 'adjust', 'controls', 'equalizer', 'preferences'],
    line: `<path d="M4 5h6"/><path d="M14 5h6"/><circle cx="12" cy="5" r="2"/><path d="M4 12h2"/><path d="M10 12h10"/><circle cx="8" cy="12" r="2"/><path d="M4 19h10"/><path d="M18 19h2"/><circle cx="16" cy="19" r="2"/>`,
    solid: `<path fillRule="evenodd" d="M10 5a2 2 0 114 0 2 2 0 01-4 0zm2-3.75a3.75 3.75 0 00-3.54 2.5H4a.75.75 0 000 1.5h4.46a3.75 3.75 0 007.08 0H20a.75.75 0 000-1.5h-4.46A3.75 3.75 0 0012 1.25zM6 12a2 2 0 114 0 2 2 0 01-4 0zm2-3.75a3.75 3.75 0 00-3.54 2.5H4a.75.75 0 000 1.5h.46a3.75 3.75 0 007.08 0H20a.75.75 0 000-1.5h-8.46A3.75 3.75 0 008 8.25zM14 19a2 2 0 114 0 2 2 0 01-4 0zm2-3.75a3.75 3.75 0 00-3.54 2.5H4a.75.75 0 000 1.5h8.46a3.75 3.75 0 007.08 0H20a.75.75 0 000-1.5h-.46A3.75 3.75 0 0016 15.25z"/>`,
    duoBg: `<rect x="3" y="2" width="18" height="20" rx="2"/>`,
  },
  {
    name: 'Gauge',
    category: 'data',
    tags: ['gauge', 'speedometer', 'meter', 'dashboard', 'performance'],
    line: `<path d="M12 21a9 9 0 110-18 9 9 0 010 18z"/><path d="M12 7v5l3 3"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M5.63 7.5L4 6"/><path d="M18.37 7.5L20 6"/>`,
    solid: `<path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zM12 6.25a.75.75 0 01.75.75v4.19l2.78 2.78a.75.75 0 01-1.06 1.06l-3-3A.75.75 0 0111.25 12V7a.75.75 0 01.75-.75z"/>`,
    duoBg: `<circle cx="12" cy="12" r="9"/>`,
  },
  {
    name: 'Percent',
    category: 'data',
    tags: ['percent', 'percentage', 'rate', 'ratio', 'proportion'],
    line: `<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M19 5L5 19"/>`,
    solid: `<path fillRule="evenodd" d="M7 3.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM17 13.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM19.53 4.47a.75.75 0 010 1.06l-14 14a.75.75 0 01-1.06-1.06l14-14a.75.75 0 011.06 0z"/>`,
    duoBg: `<rect x="2" y="2" width="20" height="20" rx="3"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL UI (12) — expand existing categories
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Wifi',
    category: 'device',
    tags: ['wifi', 'wireless', 'signal', 'internet', 'network', 'connection'],
    line: `<circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/><path d="M8.5 15.5a5 5 0 017 0"/><path d="M5 12a10 10 0 0114 0"/><path d="M1.5 8.5a14.5 14.5 0 0121 0"/>`,
    solid: `<path d="M1.05 8.04a.75.75 0 011.02-.27A13.75 13.75 0 0112 5.25c3.68 0 7.12 1.03 9.93 2.52a.75.75 0 11-.75 1.3A12.25 12.25 0 0012 6.75c-3.28 0-6.34.92-8.68 2.31a.75.75 0 01-1.27-.02zM4.55 11.54a.75.75 0 011.03-.27A9.25 9.25 0 0112 9.25a9.25 9.25 0 016.42 2.02.75.75 0 11-.76 1.3A7.75 7.75 0 0012 10.75c-2.04 0-4 .63-5.66 1.82a.75.75 0 01-1.3-.03zM8.05 15.04a.75.75 0 011.03-.27 4.25 4.25 0 015.84 0 .75.75 0 11-.76 1.3 2.75 2.75 0 00-5.08 0 .75.75 0 01-1.03-1.03zM12 18a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>`,
    duoBg: `<circle cx="12" cy="12" r="10"/>`,
  },
  {
    name: 'Battery',
    category: 'device',
    tags: ['battery', 'power', 'charge', 'energy', 'level', 'wearable'],
    line: `<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><rect x="4.5" y="9.5" width="7" height="5" rx="1"/>`,
    solid: `<path fillRule="evenodd" d="M4 6.25A2.75 2.75 0 001.25 9v6A2.75 2.75 0 004 17.75h14A2.75 2.75 0 0020.75 15v-1.25H22a.75.75 0 00.75-.75v-2a.75.75 0 00-.75-.75h-1.25V9A2.75 2.75 0 0018 6.25H4zM4 9a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V9z"/>`,
    duoBg: `<rect x="2" y="7" width="18" height="10" rx="2"/>`,
  },
  {
    name: 'CalendarCheck',
    category: 'form',
    tags: ['calendar', 'check', 'done', 'completed', 'scheduled', 'confirmed'],
    line: `<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2v3"/><path d="M16 2v3"/><path d="M4 10h16"/><path d="M9 15l2 2 4-4"/>`,
    solid: `<path fillRule="evenodd" d="M8 1.25a.75.75 0 01.75.75v1.75h6.5V2a.75.75 0 011.5 0v1.75H18A2.75 2.75 0 0120.75 6.5v12.25A2.75 2.75 0 0118 21.5H6A2.75 2.75 0 013.25 18.75V6.5A2.75 2.75 0 016 3.75h.75V2A.75.75 0 018 1.25zM4.75 10.25v8.5c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-8.5H4.75zm11.78 2.22a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L11 14.94l3.47-3.47a.75.75 0 011.06 0z"/>`,
    duoBg: `<path d="M4 10h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z"/>`,
  },
  {
    name: 'CalendarPlus',
    category: 'form',
    tags: ['calendar', 'plus', 'add', 'create', 'new', 'event'],
    line: `<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2v3"/><path d="M16 2v3"/><path d="M4 10h16"/><path d="M12 13v4"/><path d="M10 15h4"/>`,
    solid: `<path fillRule="evenodd" d="M8 1.25a.75.75 0 01.75.75v1.75h6.5V2a.75.75 0 011.5 0v1.75H18A2.75 2.75 0 0120.75 6.5v12.25A2.75 2.75 0 0118 21.5H6A2.75 2.75 0 013.25 18.75V6.5A2.75 2.75 0 016 3.75h.75V2A.75.75 0 018 1.25zM4.75 10.25v8.5c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-8.5H4.75zM12 12.25a.75.75 0 01.75.75v1.25H14a.75.75 0 010 1.5h-1.25V17a.75.75 0 01-1.5 0v-1.25H10a.75.75 0 010-1.5h1.25V13a.75.75 0 01.75-.75z"/>`,
    duoBg: `<path d="M4 10h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z"/>`,
  },
  {
    name: 'Repeat',
    category: 'action',
    tags: ['repeat', 'loop', 'cycle', 'recurring', 'again', 'reload'],
    line: `<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>`,
    solid: `<path d="M17.53 1.47a.75.75 0 00-1.06 1.06L19.94 6l-3.47 3.47a.75.75 0 001.06 1.06l4-4a.75.75 0 000-1.06l-4-4zM7 4.25A4.75 4.75 0 002.25 9v2a.75.75 0 001.5 0V9A3.25 3.25 0 017 5.75h14a.75.75 0 000-1.5H7zM6.47 13.47a.75.75 0 011.06 0l.53.53-.53.53-4 4a.75.75 0 01-1.06 0l.53-.53-.53.53v-.01l4-4a.75.75 0 010-1.06zm.53 2.12L4.06 18l2.94 2.94V15.59zM17 18.25a3.25 3.25 0 003.25-3.25v-2a.75.75 0 011.5 0v2A4.75 4.75 0 0117 19.75H3a.75.75 0 010-1.5h14z"/>`,
    duoBg: `<rect x="3" y="5" width="18" height="14" rx="4"/>`,
  },
  {
    name: 'Alarm',
    category: 'misc',
    tags: ['alarm', 'clock', 'wake', 'reminder', 'alert', 'morning'],
    line: `<circle cx="12" cy="13" r="7"/><path d="M12 9v4l2 2"/><path d="M5 3L2 6"/><path d="M19 3l3 3"/><path d="M6.38 18.7L4 21"/><path d="M17.62 18.7L20 21"/>`,
    solid: `<path d="M5.53 2.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06zM19.53 2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06-1.06l-3-3z"/><path fillRule="evenodd" d="M4.25 13a7.75 7.75 0 1115.5 0 7.75 7.75 0 01-15.5 0zM12 8.25a.75.75 0 01.75.75v3.69l1.78 1.78a.75.75 0 01-1.06 1.06l-2-2a.75.75 0 01-.22-.53V9a.75.75 0 01.75-.75z"/>`,
    duoBg: `<circle cx="12" cy="13" r="7"/>`,
  },
  {
    name: 'Sparkles',
    category: 'action',
    tags: ['sparkles', 'magic', 'ai', 'generate', 'new', 'enhance', 'stars'],
    line: `<path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/><path d="M5 16l.75 2.25L8 19l-2.25.75L5 22l-.75-2.25L2 19l2.25-.75L5 16z"/><path d="M19 14l.5 1.5L21 16l-1.5.5L19 18l-.5-1.5L17 16l1.5-.5L19 14z"/>`,
    solid: `<path d="M12.38 1.15a.75.75 0 00-1.41.35l.88 4.22-4.22.88a.75.75 0 00.16 1.48l.19-.04 4.22-.88.88 4.22a.75.75 0 001.48-.31l-.88-4.22 4.22-.88a.75.75 0 00-.35-1.46l-4.22.88-.88-4.22-.07-.02z"/><path d="M5 15.25a.75.75 0 01.71.53l.54 1.72 1.72.54a.75.75 0 010 1.42l-1.72.54-.54 1.72a.75.75 0 01-1.42 0l-.54-1.72L2.03 19.46a.75.75 0 010-1.42l1.72-.54.54-1.72a.75.75 0 01.71-.53zM19 13.25a.75.75 0 01.71.53l.29.97.97.29a.75.75 0 010 1.42l-.97.29-.29.97a.75.75 0 01-1.42 0l-.29-.97-.97-.29a.75.75 0 010-1.42l.97-.29.29-.97a.75.75 0 01.71-.53z"/>`,
    duoBg: `<path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>`,
  },
  {
    name: 'Rocket',
    category: 'action',
    tags: ['rocket', 'launch', 'boost', 'fast', 'startup', 'deploy'],
    line: `<path d="M12 2C8 6.5 6 10.5 6 14l-3 2 3 3 4 2c0-2 .5-3.5 2-6s3-5 4.5-6.5c1-1 2.5-1.5 3.5-2.5-1-1-2-2-3.5-2.5S13.5 2.5 12 2z"/><circle cx="13.5" cy="10.5" r="1.5"/>`,
    solid: `<path d="M12 1.25c-1.5 0-2.5.5-3.75 1.25S6.5 4.75 5.5 7C4.25 9.75 3.75 12.5 3.5 14.25a.75.75 0 00.3.72l1.95 1.46L4.47 17.72a.75.75 0 000 1.06l1.5 1.5a.75.75 0 001.06 0l1.29-1.28 1.46 1.95a.75.75 0 00.72.3c1.75-.25 4.5-.75 7.25-2C19.25 18.25 21 16.5 22 14.75c.75-1.25 1.25-2.25 1.25-3.75s-.5-2.5-1.25-3.75S20.5 5.5 19.25 4.5 17 2.5 15.75 2 13.5 1.25 12 1.25zm1.5 7.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"/>`,
    duoBg: `<path d="M12 2C8 6.5 6 10.5 6 14l-3 2 3 3 4 2c0-2 .5-3.5 2-6s3-5 4.5-6.5c1-1 2.5-1.5 3.5-2.5-1-1-2-2-3.5-2.5S13.5 2.5 12 2z"/>`,
  },
  {
    name: 'Layers',
    category: 'layout',
    tags: ['layers', 'stack', 'depth', 'z-index', 'overlap'],
    line: `<path d="M12 2L2 7l10 5 10-5L12 2z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>`,
    solid: `<path d="M11.58 1.37a.75.75 0 01.84 0l10 6a.75.75 0 010 1.26l-10 6a.75.75 0 01-.84 0l-10-6a.75.75 0 010-1.26l10-6z"/><path d="M1.58 11.37a.75.75 0 01.84-.12L12 16.19l9.58-4.94a.75.75 0 01.84 1.12l-10 5.5a.75.75 0 01-.84 0l-10-5.5a.75.75 0 010-1.12z"/><path d="M1.58 16.37a.75.75 0 01.84-.12L12 21.19l9.58-4.94a.75.75 0 01.84 1.12l-10 5.5a.75.75 0 01-.84 0l-10-5.5a.75.75 0 010-1.12z"/>`,
    duoBg: `<path d="M12 2L2 7l10 5 10-5L12 2z"/>`,
  },
  {
    name: 'Palette',
    category: 'misc',
    tags: ['palette', 'color', 'theme', 'art', 'design', 'customize'],
    line: `<path d="M12 2a10 10 0 00-1 19.95c1.1.1 1.7-.72 1.7-1.45 0-.35-.15-.7-.42-.98-.55-.55-.85-1.15-.85-1.77A2.25 2.25 0 0113.68 15.5H16a6 6 0 006-5.5A10 10 0 0012 2z"/><circle cx="7.5" cy="11" r="1.25" fill="currentColor" stroke="none"/><circle cx="10" cy="7.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15" cy="7.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="17.5" cy="11" r="1.25" fill="currentColor" stroke="none"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.25a10.75 10.75 0 00-1.07 21.44c.64.07 1.2-.07 1.62-.4.42-.33.7-.84.7-1.54 0-.13-.06-.3-.22-.47-.37-.37-.63-.82-.63-1.53a3 3 0 013-3H16a6.75 6.75 0 006.75-6.28v-.22A10.75 10.75 0 0012 1.25zM7.5 9a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm2.5-3.25a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM15 5.75a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM15.75 11a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0z"/>`,
    duoBg: `<path d="M12 2a10 10 0 00-1 19.95c1.1.1 1.7-.72 1.7-1.45 0-.35-.15-.7-.42-.98-.55-.55-.85-1.15-.85-1.77A2.25 2.25 0 0113.68 15.5H16a6 6 0 006-5.5A10 10 0 0012 2z"/>`,
  },
  {
    name: 'Compass',
    category: 'misc',
    tags: ['compass', 'navigate', 'direction', 'explore', 'outdoor', 'north'],
    line: `<circle cx="12" cy="12" r="9"/><path d="M16 8l-5.5 2.5L8 16l5.5-2.5L16 8z"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm4.64 5.11a.75.75 0 01.35.71l-2.5 5.5a.75.75 0 01-.38.38l-5.5 2.5a.75.75 0 01-.96-.96l2.5-5.5a.75.75 0 01.38-.38l5.5-2.5a.75.75 0 01.61.25z"/>`,
    duoBg: `<circle cx="12" cy="12" r="9"/>`,
  },
  {
    name: 'Language',
    category: 'misc',
    tags: ['language', 'translate', 'i18n', 'locale', 'bilingual', 'da', 'en'],
    line: `<path d="M5 8l7 8"/><path d="M12 8l-7 8"/><path d="M2 8h16"/><path d="M3 12h10"/><path d="M14 4l3 8 3-8"/><path d="M15 8h4"/>`,
    solid: `<path fillRule="evenodd" d="M5.34 7.25H2a.75.75 0 000 1.5h2.52c.3 1.6.9 3.04 1.68 4.16-1.06.85-2.4 1.44-4.02 1.56a.75.75 0 10.1 1.5c2.01-.14 3.67-.88 4.94-1.94 1.27 1.06 2.93 1.8 4.94 1.94a.75.75 0 10.1-1.5c-1.62-.12-2.96-.71-4.02-1.56.78-1.12 1.38-2.56 1.68-4.16H12a.75.75 0 000-1.5H8.66c-.2-1.52-.24-2-.24-2a.75.75 0 00-1.5 0s-.04.48-.24 2H5.34zM7 10.02c.22 1.1.6 2.07 1.12 2.84A7.84 7.84 0 017 10.02zm7.75-5.27a.75.75 0 00-1.4.54l3 8a.75.75 0 001.4-.04l3-8a.75.75 0 00-1.4-.54L17 11.06l-2.25-6.31z"/>`,
    duoBg: `<circle cx="12" cy="12" r="10"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTIVITY MODES (8) — new category, unique sport metaphors
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Bike',
    category: 'activity',
    tags: ['bike', 'bicycle', 'cycling', 'ride', 'road', 'velo'],
    // Distinctive: aero road bike profile, not a generic bicycle
    line: `<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M5.5 17L9 9h3"/><path d="M14 9l4.5 8"/><path d="M9 9l5 8"/><path d="M9 9h5l1.5 3"/>`,
    solid: `<path fillRule="evenodd" d="M5.5 12.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM18.5 12.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5z"/><path d="M5.5 17L9 9h5l1.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M14 9l4.5 8M9 9l5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>`,
    duoBg: `<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/>`,
  },
  {
    name: 'Running',
    category: 'activity',
    tags: ['running', 'run', 'jog', 'sprint', 'trail', 'marathon'],
    // Dynamic runner mid-stride
    line: `<circle cx="15" cy="4" r="2"/><path d="M7 22l4-7"/><path d="M11 15l4-2 2 5"/><path d="M11 15l-3-4 4-3"/><path d="M4 17l4.5-2"/><path d="M16 9l-4 4"/>`,
    solid: `<circle cx="15" cy="4" r="2.75"/><path d="M7.4 21.7a.75.75 0 01.3-1.02l3.6-2.03 3.63-1.82 1.6 4.02a.75.75 0 001.4-.56l-2-5a.75.75 0 00-.36-.4L11.84 13l3.46-3.19a.75.75 0 00-.13-1.2l-3-2a.75.75 0 00-.88.08l-4 3.5a.75.75 0 00.42 1.31l2.8.4L6.7 16.78l-3.8 1.52a.75.75 0 10.56 1.4l3.5-1.4.44 3.1a.75.75 0 001.02.3z"/>`,
    duoBg: `<circle cx="15" cy="4" r="2"/>`,
  },
  {
    name: 'Swimming',
    category: 'activity',
    tags: ['swimming', 'swim', 'pool', 'triathlon', 'water', 'freestyle'],
    line: `<path d="M2 18c1-1 2-1.5 3.5-1.5S8 18 9 18s2-.5 3.5-1.5S15 15 16.5 16.5 20 18 22 18"/><path d="M2 22c1-1 2-1.5 3.5-1.5S8 22 9 22s2-.5 3.5-1.5S15 19 16.5 20.5 20 22 22 22"/><circle cx="12" cy="7" r="2"/><path d="M8 14l2-4h4l-1.5-3"/>`,
    solid: `<circle cx="12" cy="7" r="2.75"/><path d="M8.23 13.6a.75.75 0 01.37-.44L10.2 12h3.15l-1.2-2.4a.75.75 0 011.34-.68l1.5 3a.75.75 0 01-.67 1.08H10.6l-1.6 3.2a.75.75 0 01-.77.38z"/><path d="M1.47 17.47a.75.75 0 011.06 0C3.47 18.41 4.5 18.75 5.5 18.75S7.53 18.41 8.47 17.47a.75.75 0 011.06 0c.94.94 1.97 1.28 2.97 1.28s2.03-.34 2.97-1.28a.75.75 0 011.06 0c.94.94 1.97 1.28 2.97 1.28s2.03-.34 2.97-1.28a.75.75 0 011.06 1.06c-1.19 1.19-2.72 1.72-4.03 1.72s-2.84-.53-4.03-1.72c-1.19 1.19-2.72 1.72-4.03 1.72S8.6 20.72 7.41 19.53c-1.19 1.19-2.72 1.72-4.03 1.72-1.31 0-2.84-.53-4.03-1.72a.75.75 0 010-1.06z"/>`,
    duoBg: `<path d="M2 18c1-1 2-1.5 3.5-1.5S8 18 9 18s2-.5 3.5-1.5S15 15 16.5 16.5 20 18 22 18v4H2v-4z"/>`,
  },
  {
    name: 'Dumbbell',
    category: 'activity',
    tags: ['dumbbell', 'gym', 'strength', 'weight', 'lift', 'training'],
    line: `<path d="M6 7v10"/><path d="M18 7v10"/><path d="M6 12h12"/><rect x="3" y="8" width="3" height="8" rx="1"/><rect x="18" y="8" width="3" height="8" rx="1"/><path d="M1 10v4"/><path d="M23 10v4"/>`,
    solid: `<path fillRule="evenodd" d="M.25 10a.75.75 0 01.75-.75h1.25V8A1.75 1.75 0 014 6.25h1A1.75 1.75 0 016.75 8v3.25h10.5V8A1.75 1.75 0 0119 6.25h1A1.75 1.75 0 0121.75 8v1.25H23a.75.75 0 010 1.5h-1.25v2.5H23a.75.75 0 010 1.5h-1.25V16A1.75 1.75 0 0120 17.75h-1A1.75 1.75 0 0117.25 16v-3.25H6.75V16A1.75 1.75 0 015 17.75H4A1.75 1.75 0 012.25 16v-1.25H1a.75.75 0 010-1.5h1.25v-2.5H1A.75.75 0 01.25 10z"/>`,
    duoBg: `<rect x="3" y="8" width="3" height="8" rx="1"/><rect x="18" y="8" width="3" height="8" rx="1"/>`,
  },
  {
    name: 'Yoga',
    category: 'activity',
    tags: ['yoga', 'stretch', 'flexibility', 'pose', 'meditation', 'balance'],
    // Tree pose — distinctive, not a generic person
    line: `<circle cx="12" cy="4" r="2"/><path d="M12 6v6"/><path d="M8 10l4 2 4-2"/><path d="M10 22l2-8 2 14"/><path d="M8 18h8"/>`,
    solid: `<circle cx="12" cy="4" r="2.75"/><path fillRule="evenodd" d="M12 6.25a.75.75 0 01.75.75v2.19l3.78-1.89a.75.75 0 01.67 1.34L12.75 11v2.32l1.67 8.36a.75.75 0 01-1.47.3L12 17.24l-.95 4.74a.75.75 0 01-1.47-.3l1.67-8.36V11l-4.45-2.36a.75.75 0 01.67-1.34l3.78 1.89V7a.75.75 0 01.75-.75z"/>`,
    duoBg: `<circle cx="12" cy="4" r="2"/>`,
  },
  {
    name: 'Hiking',
    category: 'activity',
    tags: ['hiking', 'walk', 'trail', 'mountain', 'outdoor', 'trek'],
    // Boot + mountain silhouette
    line: `<path d="M3 21l5-8 4 3 4-10 5 15H3z"/><path d="M14 9l2-4"/><path d="M12 16l-4-3"/>`,
    solid: `<path d="M16.55 4.17a.75.75 0 00-1.37-.05L11.3 13.5l-3.37-2.53a.75.75 0 00-1.13.24l-5 8A.75.75 0 002.43 20.5h19.14a.75.75 0 00.68-1.06L16.55 4.17z"/>`,
    duoBg: `<path d="M3 21l5-8 4 3 4-10 5 15H3z"/>`,
  },
  {
    name: 'Rowing',
    category: 'activity',
    tags: ['rowing', 'row', 'ergometer', 'erg', 'kayak', 'paddle'],
    line: `<path d="M4 18l3-4 4 2 5-4 4-8"/><path d="M2 21c4-1 8-1.5 12-1.5s8 .5 12 1.5"/><path d="M20 6l-4 8"/><circle cx="20" cy="5" r="1.5" fill="currentColor" stroke="none"/>`,
    solid: `<circle cx="20" cy="5" r="2.25"/><path d="M20.67 7.66a.75.75 0 00-1.34.68l-4 8a.75.75 0 00.34 1l-4.2 3.36c-3.6.05-7.25.5-10.82 1.34a.75.75 0 10.35 1.46c3.8-.9 7.6-1.32 11.35-1.32 3.75 0 7.55.42 11.35 1.32a.75.75 0 10.35-1.46c-2.77-.66-5.55-1.08-8.33-1.23l5.13-4.1a.75.75 0 00.25-.81l-1.43-5z"/>`,
    duoBg: `<path d="M2 21c4-1 8-1.5 12-1.5s8 .5 12 1.5v1H2v-1z"/>`,
  },
  {
    name: 'Skiing',
    category: 'activity',
    tags: ['skiing', 'ski', 'winter', 'snow', 'downhill', 'nordic'],
    line: `<circle cx="14" cy="4" r="2"/><path d="M8 22L18 6"/><path d="M6 16l5-3 3 4"/><path d="M3 20l18-8"/><path d="M16 10l2-1"/>`,
    solid: `<circle cx="14" cy="4" r="2.75"/><path d="M3.34 19.45a.75.75 0 01.94-.48L18.08 6.21a.75.75 0 011.3.7l-3.62 6.7 2.52-1.1a.75.75 0 01.6 1.37l-16 7a.75.75 0 01-.6-1.37l3.84-1.68-3.3-.98a.75.75 0 01-.48-.94zM7.02 15.47l3.46-2.08 2.3 3.06L7.02 15.47z"/>`,
    duoBg: `<path d="M3 20l18-8v1.5L3 21.5V20z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WEATHER / ENVIRONMENT (7) — expand weather category
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Wind',
    category: 'weather',
    tags: ['wind', 'breeze', 'gust', 'air', 'headwind', 'cycling'],
    line: `<path d="M2 12h12a3 3 0 100-3"/><path d="M2 8h8a3 3 0 110 3"/><path d="M2 16h10a3 3 0 110 3"/>`,
    solid: `<path d="M14 8.25a2.25 2.25 0 10-2.25 2.25H2a.75.75 0 010-1.5h9.75a3.75 3.75 0 113.75 3.75H2a.75.75 0 010-1.5h11.5a2.25 2.25 0 100-2.25H2a.75.75 0 010-1.5h10a3.75 3.75 0 112.68 1.62A3.75 3.75 0 0014 8.25zM12 15.5H2a.75.75 0 000 1.5h10a2.25 2.25 0 110 4.5.75.75 0 010-1.5 .75.75 0 100-1.5H2a.75.75 0 010-1.5h10a3.75 3.75 0 010 7.5.75.75 0 010-1.5A2.25 2.25 0 0014 20H2a.75.75 0 010-1.5h10z"/>`,
    duoBg: `<rect x="1" y="6" width="18" height="14" rx="3"/>`,
  },
  {
    name: 'Rain',
    category: 'weather',
    tags: ['rain', 'rainy', 'wet', 'precipitation', 'shower', 'weather'],
    line: `<path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/><path d="M8 19v3"/><path d="M12 19v3"/><path d="M16 19v3"/>`,
    solid: `<path d="M6.34 4.34A8.75 8.75 0 0116.95 6.5H18a5.75 5.75 0 012.3 11.02.75.75 0 01-.6-1.37A4.25 4.25 0 0018 8h-.75a.75.75 0 01-.73-.57A7.25 7.25 0 104.38 14.87a.75.75 0 01-.76 1.3A8.75 8.75 0 016.34 4.34zM8 18.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm4 0a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm4 0a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75z"/>`,
    duoBg: `<path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25 8 8 0 0020 16.58z"/>`,
  },
  {
    name: 'Snow',
    category: 'weather',
    tags: ['snow', 'snowflake', 'winter', 'cold', 'frost', 'ice'],
    line: `<path d="M12 2v20"/><path d="M2 12h20"/><path d="M4.93 4.93l14.14 14.14"/><path d="M19.07 4.93L4.93 19.07"/><path d="M12 5l-2 2 2 2 2-2-2-2"/><path d="M12 17l-2 2 2 2 2-2-2-2"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.25a.75.75 0 01.75.75v3.19l1.72-1.72a.75.75 0 111.06 1.06L12.75 7.31V11.25h3.94l2.78-2.78a.75.75 0 111.06 1.06l-1.72 1.72h3.19a.75.75 0 010 1.5h-3.19l1.72 1.72a.75.75 0 11-1.06 1.06l-2.78-2.78H12.75v3.94l2.78 2.78a.75.75 0 11-1.06 1.06l-1.72-1.72V22a.75.75 0 01-1.5 0v-3.19l-1.72 1.72a.75.75 0 01-1.06-1.06l2.78-2.78V12.75H7.31l-2.78 2.78a.75.75 0 01-1.06-1.06l1.72-1.72H2a.75.75 0 010-1.5h3.19l-1.72-1.72a.75.75 0 011.06-1.06l2.78 2.78h3.94V7.31L8.47 4.53a.75.75 0 011.06-1.06l1.72 1.72V2a.75.75 0 01.75-.75z"/>`,
    duoBg: `<circle cx="12" cy="12" r="8"/>`,
  },
  {
    name: 'Moon',
    category: 'weather',
    tags: ['moon', 'night', 'dark', 'crescent', 'sleep', 'evening'],
    line: `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`,
    solid: `<path d="M11.47 2.17a.75.75 0 00-.93.93A7.75 7.75 0 0020.9 13.46a.75.75 0 00.93-.93A9.75 9.75 0 1111.47 2.17z"/>`,
    duoBg: `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`,
  },
  {
    name: 'Sunrise',
    category: 'weather',
    tags: ['sunrise', 'morning', 'dawn', 'early', 'am', 'day'],
    line: `<path d="M12 2v4"/><path d="M4.93 5.93l2.83 2.83"/><path d="M19.07 5.93l-2.83 2.83"/><path d="M2 16h20"/><path d="M5 20a7 7 0 0114 0"/>`,
    solid: `<path d="M12 1.25a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM4.4 5.4a.75.75 0 011.06 0l2.83 2.83a.75.75 0 01-1.06 1.06L4.4 6.46a.75.75 0 010-1.06zM19.6 5.4a.75.75 0 010 1.06l-2.83 2.83a.75.75 0 11-1.06-1.06l2.83-2.83a.75.75 0 011.06 0zM1.25 16a.75.75 0 01.75-.75h20a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zM12 12.25A7.75 7.75 0 004.39 19.5a.75.75 0 01-.75.75h-2a.75.75 0 010-1.5h1.3A9.25 9.25 0 0112 10.75a9.25 9.25 0 019.06 8h1.3a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75A7.75 7.75 0 0012 12.25z"/>`,
    duoBg: `<path d="M5 20a7 7 0 0114 0H5z"/>`,
  },
  {
    name: 'Sunset',
    category: 'weather',
    tags: ['sunset', 'evening', 'dusk', 'pm', 'golden', 'late'],
    line: `<path d="M12 8v4"/><path d="M4.93 5.93l2.83 2.83"/><path d="M19.07 5.93l-2.83 2.83"/><path d="M2 16h20"/><path d="M5 20a7 7 0 0114 0"/>`,
    solid: `<path d="M12 7.25a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V8a.75.75 0 01.75-.75zM4.4 5.4a.75.75 0 011.06 0l2.83 2.83a.75.75 0 01-1.06 1.06L4.4 6.46a.75.75 0 010-1.06zM19.6 5.4a.75.75 0 010 1.06l-2.83 2.83a.75.75 0 11-1.06-1.06l2.83-2.83a.75.75 0 011.06 0zM1.25 16a.75.75 0 01.75-.75h20a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zM12 12.25A7.75 7.75 0 004.39 19.5a.75.75 0 01-.75.75h-2a.75.75 0 010-1.5h1.3A9.25 9.25 0 0112 10.75a9.25 9.25 0 019.06 8h1.3a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75A7.75 7.75 0 0012 12.25z"/>`,
    duoBg: `<path d="M5 20a7 7 0 0114 0H5z"/>`,
  },
  {
    name: 'Storm',
    category: 'weather',
    tags: ['storm', 'thunder', 'lightning', 'severe', 'weather', 'electric'],
    line: `<path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/><path d="M13 12l-2 4h4l-2 5"/>`,
    solid: `<path d="M6.34 4.34A8.75 8.75 0 0116.95 6.5H18a5.75 5.75 0 012.3 11.02.75.75 0 01-.6-1.37A4.25 4.25 0 0018 8h-.75a.75.75 0 01-.73-.57A7.25 7.25 0 104.38 14.87a.75.75 0 01-.76 1.3A8.75 8.75 0 016.34 4.34z"/><path d="M13.6 11.2a.75.75 0 01.15.8l-1.31 2.62h2.81a.75.75 0 01.65 1.13l-2 3.5a.75.75 0 01-1.3-.75l1.15-2.25H11a.75.75 0 01-.65-1.12l2-4a.75.75 0 011.25-.3z"/>`,
    duoBg: `<path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25 8 8 0 0020 16.58z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FOOD / DRINK (5) — new category
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Coffee',
    category: 'food',
    tags: ['coffee', 'cup', 'drink', 'caffeine', 'espresso', 'morning'],
    line: `<path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z"/><path d="M16 9h2a2 2 0 010 4h-2"/><path d="M6 1v2"/><path d="M10 1v2"/><path d="M14 1v2"/><path d="M2 20h16"/>`,
    solid: `<path d="M6 .25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 016 .25zm4 0a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 0110 .25zm4 0a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 0114 .25zM3.25 6a.75.75 0 01.75-.75h12a.75.75 0 01.75.75v2.25H18a2.75 2.75 0 010 5.5h-1.25v.25a4.75 4.75 0 01-4.75 4.75H8A4.75 4.75 0 013.25 14V6zM1.25 20a.75.75 0 01.75-.75h16a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75z"/>`,
    duoBg: `<path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z"/>`,
  },
  {
    name: 'WaterBottle',
    category: 'food',
    tags: ['water', 'bottle', 'hydrate', 'drink', 'fluid', 'sport'],
    // Sport squeeze bottle — distinctive from generic bottle
    line: `<path d="M9 2h6v3H9V2z"/><path d="M8 5h8l1 3v11a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-3z"/><path d="M8 13h8"/><path d="M11.5 5v-1"/>`,
    solid: `<path fillRule="evenodd" d="M8.25 2a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v2.25H17a.75.75 0 01.72.53l1 3a.75.75 0 01.03.22V19a2.75 2.75 0 01-2.75 2.75H8A2.75 2.75 0 015.25 19V7.75a.75.75 0 01.03-.22l1-3a.75.75 0 01.72-.53h1.25V2zm.75 4.75V3h6v1.5h-6z"/>`,
    duoBg: `<path d="M8 5h8l1 3v11a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-3z"/>`,
  },
  {
    name: 'ForkKnife',
    category: 'food',
    tags: ['fork', 'knife', 'eat', 'meal', 'dining', 'restaurant', 'nutrition'],
    line: `<path d="M3 2v8a3 3 0 003 3h1v9"/><path d="M7 2v8a3 3 0 01-3 3"/><path d="M5 2v5"/><path d="M17 2v6a3 3 0 003 3h0v0"/><path d="M20 2v20"/><path d="M17 8h3"/>`,
    solid: `<path d="M3 1.25a.75.75 0 01.75.75v8A2.25 2.25 0 006 12.25h.25v9a.75.75 0 001.5 0v-9H8A2.25 2.25 0 0010.25 10V2a.75.75 0 00-1.5 0v5a.75.75 0 01-1.5 0V2a.75.75 0 00-1.5 0v5a.75.75 0 01-1.5 0V2A.75.75 0 003 1.25zm13.25.75a.75.75 0 011.5 0v6a2.25 2.25 0 002.25 2.25.75.75 0 010 1.5h-.25v10a.75.75 0 01-1.5 0V11.75H18A2.25 2.25 0 0115.75 9.5V2a.75.75 0 01.75-.75h.75z"/>`,
    duoBg: `<rect x="2" y="2" width="8" height="14" rx="3"/><rect x="16" y="2" width="6" height="11" rx="3"/>`,
  },
  {
    name: 'Blender',
    category: 'food',
    tags: ['blender', 'smoothie', 'mix', 'shake', 'protein', 'kitchen'],
    line: `<path d="M6 4h10l-1 12H7L6 4z"/><path d="M16 4h2a1 1 0 011 1v2a1 1 0 01-1 1h-2"/><path d="M7 16h8v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2z"/><path d="M9 20v2"/><path d="M13 20v2"/><path d="M7 8h8"/>`,
    solid: `<path fillRule="evenodd" d="M5.28 3.5a.75.75 0 01.72-.5h10a.75.75 0 01.75.67V3.75h1.25a1.75 1.75 0 011.75 1.75v2a1.75 1.75 0 01-1.75 1.75h-1.43l-.57 6.5h-8l-.95-12.25zm.75 12.75l-.04-.5H15.8l.04.5v2.25a2.75 2.75 0 01-2.75 2.75h-4.5A2.75 2.75 0 015.84 18.5v-2.25z"/>`,
    duoBg: `<path d="M6 4h10l-1 12H7L6 4z"/>`,
  },
  {
    name: 'KitchenScale',
    category: 'food',
    tags: ['scale', 'weigh', 'measure', 'food', 'portion', 'gram', 'kitchen'],
    line: `<rect x="3" y="12" width="18" height="9" rx="2"/><path d="M6 12V9a6 6 0 0112 0v3"/><circle cx="12" cy="8" r="1.5"/><path d="M12 8l2-2"/><path d="M8 17h8"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v2.25H5a2.75 2.75 0 00-2.75 2.75v5A2.75 2.75 0 005 21.75h14a2.75 2.75 0 002.75-2.75v-5A2.75 2.75 0 0019 11.25h-.25V9A6.75 6.75 0 0012 2.25zM17.25 9v2.25H6.75V9a5.25 5.25 0 0110.5 0zM8 16.25a.75.75 0 000 1.5h8a.75.75 0 000-1.5H8z"/>`,
    duoBg: `<rect x="3" y="12" width="18" height="9" rx="2"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIQUE / RAMTT-SPECIFIC (10) — icons you won't find in any other library
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'Route',
    category: 'misc',
    tags: ['route', 'gps', 'path', 'trail', 'track', 'navigation', 'outdoor'],
    // Winding GPS route with waypoint markers
    line: `<circle cx="4" cy="5" r="2"/><circle cx="20" cy="19" r="2"/><path d="M6 5h4a4 4 0 010 8H10a4 4 0 000 8h8"/>`,
    solid: `<path d="M4 2.25a2.75 2.75 0 00-.7 5.41c.46.12.95.09 1.38-.04H10a3.25 3.25 0 010 6.5H10a4.75 4.75 0 000 9.5h8.32a2.75 2.75 0 10.68-1.5H10a3.25 3.25 0 010-6.5h0a4.75 4.75 0 000-9.5H5.38A2.75 2.75 0 004 2.25z"/>`,
    duoBg: `<path d="M6 5h4a4 4 0 010 8H10a4 4 0 000 8h8" strokeWidth="4"/>`,
  },
  {
    name: 'Headwind',
    category: 'weather',
    tags: ['headwind', 'resistance', 'against', 'cycling', 'wind', 'face'],
    // Person leaning into wind — arrows flowing against them. Truly unique.
    line: `<circle cx="16" cy="5" r="2"/><path d="M14 8l-4 5 4 3v6"/><path d="M10 13l-2 3"/><path d="M2 8h6"/><path d="M2 12h5"/><path d="M2 16h4"/>`,
    solid: `<circle cx="16" cy="5" r="2.75"/><path d="M2 7.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H2zm0 4a.75.75 0 000 1.5h5a.75.75 0 000-1.5H2zm0 4a.75.75 0 000 1.5h4a.75.75 0 000-1.5H2z"/><path d="M14.37 7.5a.75.75 0 00-1.18.12l-3.68 4.6a.75.75 0 00.11.98l3.13 2.66V21a.75.75 0 001.5 0v-5.25a.75.75 0 00-.3-.6l-2.48-2.1 2.95-3.69a.75.75 0 00-.05-1.06z"/>`,
    duoBg: `<circle cx="16" cy="5" r="2"/>`,
  },
  {
    name: 'Tailwind',
    category: 'weather',
    tags: ['tailwind', 'boost', 'push', 'cycling', 'wind', 'behind', 'fast'],
    // Person with wind arrows pushing FROM behind. Mirror of headwind.
    line: `<circle cx="8" cy="5" r="2"/><path d="M10 8l4 5-4 3v6"/><path d="M14 13l2 3"/><path d="M16 8h6"/><path d="M17 12h5"/><path d="M18 16h4"/>`,
    solid: `<circle cx="8" cy="5" r="2.75"/><path d="M16 7.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zm1 4a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5zm1 4a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z"/><path d="M9.63 7.5a.75.75 0 011.18.12l3.68 4.6a.75.75 0 01-.11.98l-3.13 2.66V21a.75.75 0 01-1.5 0v-5.25a.75.75 0 01.3-.6l2.48-2.1-2.95-3.69a.75.75 0 01.05-1.06z"/>`,
    duoBg: `<circle cx="8" cy="5" r="2"/>`,
  },
  {
    name: 'GradientSlope',
    category: 'activity',
    tags: ['gradient', 'slope', 'incline', 'hill', 'climb', 'grade', 'elevation'],
    // Slope line with percentage tick marks — unique to cycling/running
    line: `<path d="M2 20L22 6"/><path d="M22 6v14"/><path d="M2 20h20"/><path d="M8 17l1-2"/><path d="M14 13l1-2"/><path d="M17 10.5l1-1.5"/>`,
    solid: `<path d="M22.4 5.2a.75.75 0 01.35.63v14.42a.75.75 0 01-.75.75H2a.75.75 0 01-.45-1.35l20-15a.75.75 0 01.85-.07z"/>`,
    duoBg: `<path d="M2 20L22 6v14H2z"/>`,
  },
  {
    name: 'Stopwatch',
    category: 'misc',
    tags: ['stopwatch', 'timing', 'lap', 'race', 'countdown', 'chrono'],
    line: `<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M10 2h4"/><path d="M12 2v3"/><path d="M18.5 5.5l1.5 1.5"/>`,
    solid: `<path d="M9.25 2a.75.75 0 01.75-.75h4a.75.75 0 010 1.5h-1.25v1.58a8.75 8.75 0 015.56 2.24l.72-.72a.75.75 0 111.06 1.06l-1.1 1.1A8.75 8.75 0 0112 21.75 8.75 8.75 0 013.25 13 8.75 8.75 0 0111.25 4.33V2.75H10a.75.75 0 01-.75-.75zM12 8.25a.75.75 0 01.75.75v3.69l2.28 2.28a.75.75 0 01-1.06 1.06l-2.5-2.5A.75.75 0 0111.25 13V9a.75.75 0 01.75-.75z"/>`,
    duoBg: `<circle cx="12" cy="13" r="8"/>`,
  },
  {
    name: 'Pulse',
    category: 'data',
    tags: ['pulse', 'ecg', 'heartbeat', 'vital', 'signal', 'wave', 'health'],
    // ECG waveform — unique to health/sport platforms
    line: `<path d="M2 12h4l2-6 3 12 2-8 2 4h2l1.5-3 1.5 3H22"/>`,
    solid: `<path fillRule="evenodd" d="M1.25 12a.75.75 0 01.75-.75h3.44a.75.75 0 01.7.49l1.47 4.41 2.45-9.82a.75.75 0 011.43-.05l1.72 6.88 1.28-2.56a.75.75 0 01.67-.42h1.53a.75.75 0 01.67.41l.83 1.66.83-1.66a.75.75 0 01.67-.41H22a.75.75 0 010 1.5h-1.97l-1.36 2.72a.75.75 0 01-1.34 0L16 12.75h-.97l-1.72 3.43a.75.75 0 01-1.4-.09l-1.52-6.06-1.95 7.8a.75.75 0 01-1.42.1L5.32 12.75H2a.75.75 0 01-.75-.75z"/>`,
    duoBg: `<rect x="1" y="8" width="22" height="8" rx="2"/>`,
  },
  {
    name: 'DashboardPanel',
    category: 'data',
    tags: ['dashboard', 'panel', 'overview', 'metrics', 'summary', 'multi'],
    // Multi-metric dashboard — 4 mini cards
    line: `<rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="5" rx="2"/><rect x="2" y="13" width="9" height="5" rx="2"/><rect x="13" y="9" width="9" height="9" rx="2"/>`,
    solid: `<path d="M4 2.75A1.25 1.25 0 002.75 4v5A1.25 1.25 0 004 10.25h5A1.25 1.25 0 0010.25 9V4A1.25 1.25 0 009 2.75H4zm11 0A1.25 1.25 0 0013.75 4v1A1.25 1.25 0 0015 6.25h4A1.25 1.25 0 0020.25 5V4A1.25 1.25 0 0019 2.75h-4zM4 13.75A1.25 1.25 0 002.75 15v1A1.25 1.25 0 004 17.25h5A1.25 1.25 0 0010.25 16v-1A1.25 1.25 0 009 13.75H4zm11-4A1.25 1.25 0 0013.75 11v5A1.25 1.25 0 0015 17.25h4A1.25 1.25 0 0020.25 16v-5A1.25 1.25 0 0019 9.75h-4z"/>`,
    duoBg: `<rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="9" width="9" height="9" rx="2"/>`,
  },
  {
    name: 'SplitArrow',
    category: 'data',
    tags: ['split', 'diverge', 'branch', 'decision', 'ab', 'fork', 'path'],
    // Single path splitting into two — unique
    line: `<path d="M12 22v-10"/><path d="M5 5l7 7 7-7"/><path d="M5 5v4"/><path d="M19 5v4"/>`,
    solid: `<path d="M12 21.75a.75.75 0 01-.75-.75V12.56l-6.22-6.22V9a.75.75 0 01-1.5 0V4.25a.75.75 0 01.75-.75h.47l7.25 7.25 7.25-7.25h.47a.75.75 0 01.75.75V9a.75.75 0 01-1.5 0V6.34l-6.22 6.22V21a.75.75 0 01-.75.75z"/>`,
    duoBg: `<path d="M5 5l7 7 7-7v4l-7 7-7-7V5z"/>`,
  },
  {
    name: 'RPE',
    category: 'sport-training',
    tags: ['rpe', 'perceived', 'exertion', 'effort', 'rating', 'subjective', 'feel'],
    // Face with effort meter — truly unique to sport platforms
    line: `<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><path d="M6 4l2 2"/><path d="M18 4l-2 2"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM9 8.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm6 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm-7.36 5.62a.75.75 0 011.03-.24 5.75 5.75 0 006.66 0 .75.75 0 11.8 1.27 7.25 7.25 0 01-8.26 0 .75.75 0 01-.23-1.03z"/>`,
    duoBg: `<circle cx="12" cy="12" r="9"/>`,
  },
  {
    name: 'NutritionPlan',
    category: 'sport-nutrition',
    tags: ['nutrition', 'plan', 'strategy', 'race', 'fueling', 'timeline'],
    // Timeline with nutrition dots — unique to sport nutrition
    line: `<path d="M3 4v16"/><path d="M3 8h18"/><path d="M3 14h18"/><circle cx="8" cy="8" r="1.5"/><circle cx="14" cy="8" r="1.5"/><circle cx="18" cy="8" r="1.5"/><circle cx="10" cy="14" r="1.5"/><circle cx="16" cy="14" r="1.5"/>`,
    solid: `<path d="M3.75 3.25a.75.75 0 00-1.5 0v17.5a.75.75 0 001.5 0V14.75h17.5a.75.75 0 000-1.5H13.68a2.25 2.25 0 10-5.36 0H3.75V8.75h4.57a2.25 2.25 0 105.86 0h1.14a2.25 2.25 0 105.86 0h.07a.75.75 0 000-1.5H3.75V3.25z"/>`,
    duoBg: `<rect x="3" y="6" width="18" height="10" rx="2"/>`,
  },
]

// ─── File generators ─────────────────────────────────────────────────────────

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
    <g opacity={0.15}>
      ${icon.duoBg.replace(/currentColor/g, '{props.accent || "currentColor"}')}
    </g>
    {/* Foreground */}
    ${icon.line}
  </IconBaseDuo>
))
Icon${icon.name}Duo.displayName = 'Icon${icon.name}Duo'
`
}

// ─── Catalog entry ───────────────────────────────────────────────────────────

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

console.log(`\n🎨 Generating Wave 10 icons: ${ICONS.length} icons × 4 variants = ${ICONS.length * 4} files\n`)

const lineExports = []
const lightExports = []
const solidExports = []
const duoExports = []
const catalogEntries = []

for (const icon of ICONS) {
  // Write line variant
  writeFileSync(join(BASE, 'line', `Icon${icon.name}.tsx`), lineFile(icon))
  lineExports.push(`export { Icon${icon.name} } from './Icon${icon.name}'`)

  // Write light variant
  writeFileSync(join(BASE, 'light', `Icon${icon.name}.tsx`), lightFile(icon))
  lightExports.push(`export { Icon${icon.name} } from './Icon${icon.name}'`)

  // Write solid variant
  writeFileSync(join(BASE, 'solid', `Icon${icon.name}Solid.tsx`), solidFile(icon))
  solidExports.push(`export { Icon${icon.name}Solid } from './Icon${icon.name}Solid'`)

  // Write duo variant
  writeFileSync(join(BASE, 'duo', `Icon${icon.name}Duo.tsx`), duoFile(icon))
  duoExports.push(`export { Icon${icon.name}Duo } from './Icon${icon.name}Duo'`)

  // Catalog entry
  catalogEntries.push(catalogEntry(icon))

  console.log(`  ✓ Icon${icon.name} (${icon.category})`)
}

// ─── Append to barrel exports ────────────────────────────────────────────────

const divider = '\n// --- Wave 10: UI + Activity + Weather + Food + Unique ---\n'

appendFileSync(join(BASE, 'line', 'index.ts'), divider + lineExports.join('\n') + '\n')
appendFileSync(join(BASE, 'light', 'index.ts'), divider + lightExports.join('\n') + '\n')
appendFileSync(join(BASE, 'solid', 'index.ts'), divider + solidExports.join('\n') + '\n')
appendFileSync(join(BASE, 'duo', 'index.ts'), divider + duoExports.join('\n') + '\n')

console.log(`\n✓ Barrel exports updated (line, light, solid, duo)`)

// ─── Append to catalog ──────────────────────────────────────────────────────

const newCategories = [...new Set(ICONS.map(i => i.category))].filter(
  c => !['action', 'toggle', 'data', 'device', 'form', 'layout', 'misc', 'weather', 'sport-training', 'sport-nutrition'].includes(c)
)

// Read current catalog and insert new entries before the closing bracket
const catalogPath = join(BASE, 'catalog.ts')
let catalogContent = readFileSync(catalogPath, 'utf-8')

// Add new categories to ICON_CATEGORIES if missing
for (const cat of newCategories) {
  if (!catalogContent.includes(`'${cat}'`)) {
    catalogContent = catalogContent.replace(
      `] as const`,
      `  '${cat}',\n] as const`
    )
  }
}

// Append new icon entries before the final ]
const newEntriesBlock = `\n  // ─── Wave 10: UI + Activity + Weather + Food + Unique (${ICONS.length}) ──────\n${catalogEntries.join('\n')}\n`
catalogContent = catalogContent.replace(/\n\]$/, newEntriesBlock + ']\n')
catalogContent = catalogContent.replace(/\n\]\n$/, newEntriesBlock + ']\n')

// Fix the catalog header count
const totalCount = (catalogContent.match(/name: 'Icon/g) || []).length
catalogContent = catalogContent.replace(
  /Icon catalog metadata \(\d+ icons/,
  `Icon catalog metadata (${totalCount} icons`
)

writeFileSync(catalogPath, catalogContent)
console.log(`✓ Catalog updated — ${totalCount} total icons across ${[...new Set(ICONS.map(i => i.category))].length} categories`)

// Also update ICON_CATEGORIES count in header
const catCount = (catalogContent.match(/'[a-z-]+'/g) || []).filter((v, i, a) => a.indexOf(v) === i).length

console.log(`\n🎉 Wave 10 complete: ${ICONS.length} new icons generated`)
console.log(`   ${ICONS.length * 4} files written`)
console.log(`   Categories: ${[...new Set(ICONS.map(i => i.category))].join(', ')}`)
