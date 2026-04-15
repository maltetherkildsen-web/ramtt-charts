/**
 * Wave 11 — "Icons No Library Has" + Fun/Easter Eggs
 * 30 training science icons + 8 fun icons = 38 icons × 4 variants = 152 files
 * Run: node scripts/generate-wave11-icons.mjs
 */

import { writeFileSync, appendFileSync, readFileSync } from 'fs'
import { join } from 'path'

const BASE = '/Users/malte/Desktop/Drops /ramtt-charts.worktrees/agents-sports-icon-collection-expansion/components/icons'

const COPYRIGHT = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.
`

const ICONS = [

  // ═══════════════════════════════════════════════════════════════════════════
  // TRAINING SCIENCE / PERIODIZATION (6)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'SuperCompensation',
    category: 'sport-training',
    tags: ['supercompensation', 'adaptation', 'overload', 'recovery', 'peak', 'science'],
    // THE iconic training concept: dip below baseline → rise above it
    line: `<path d="M2 14h3c1 0 1.5 1 2 3s1.5 3 2 3h1c1 0 1.5-2 2-5s1.5-5 2.5-5 1.5 1 2 2.5 1.5 3 3 3H22"/><path d="M2 12h20" strokeDasharray="2 2" opacity="0.4"/>`,
    solid: `<path d="M2 14h3c1 0 1.5 1 2 3s1.5 3 2 3h1c1 0 1.5-2 2-5s1.5-5 2.5-5 1.5 1 2 2.5 1.5 3 3 3H22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.4"/>`,
    duoBg: `<rect x="1" y="7" width="22" height="12" rx="2"/>`,
  },
  {
    name: 'Taper',
    category: 'sport-training',
    tags: ['taper', 'reduce', 'volume', 'pre-race', 'peak', 'rest'],
    // Descending staircase approaching race day flag
    line: `<path d="M3 6v14"/><path d="M3 8h4v4H3"/><path d="M7 10h3.5v4H7"/><path d="M10.5 12h3v4h-3"/><path d="M13.5 14h2.5v4h-2.5"/><path d="M19 10v10"/><path d="M19 10l3 2-3 2"/>`,
    solid: `<path d="M2.25 6a.75.75 0 011.5 0v1.25H7a.75.75 0 01.75.75v1.25H10.5a.75.75 0 01.75.75v1.25h3a.75.75 0 01.75.75v1.25H16a.75.75 0 01.75.75V20a.75.75 0 01-1.5 0v-5.25h-2.5a.75.75 0 01-.75-.75v-1.25h-3a.75.75 0 01-.75-.75V10.75H7a.75.75 0 01-.75-.75V8.75H3.75V20a.75.75 0 01-1.5 0V6z"/><path d="M18.25 10a.75.75 0 01.75-.75h.19l2.56 1.72a.75.75 0 010 1.21l-2.56 1.72H19a.75.75 0 01-.75-.75V10z"/>`,
    duoBg: `<rect x="3" y="8" width="13" height="12"/>`,
  },
  {
    name: 'Periodization',
    category: 'sport-training',
    tags: ['periodization', 'plan', 'block', 'base', 'build', 'peak', 'race', 'cycle'],
    // 4 ascending blocks: base → build → peak → race
    line: `<rect x="2" y="16" width="4" height="4" rx="0.5"/><rect x="7.5" y="12" width="4" height="8" rx="0.5"/><rect x="13" y="8" width="4" height="12" rx="0.5"/><rect x="18.5" y="4" width="3.5" height="16" rx="0.5"/><path d="M3 14l5-4 5-4 5-4" strokeDasharray="2 2" opacity="0.5"/>`,
    solid: `<path d="M2 16.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3zm5.5-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H8a.5.5 0 01-.5-.5v-7zM13 8.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-11zm5.5-4a.5.5 0 01.5-.5h2.5a.5.5 0 01.5.5v15a.5.5 0 01-.5.5H19a.5.5 0 01-.5-.5v-15z"/>`,
    duoBg: `<rect x="2" y="4" width="20" height="16" rx="1"/>`,
  },
  {
    name: 'Overreach',
    category: 'sport-training',
    tags: ['overreach', 'overtrain', 'burnout', 'exceed', 'limit', 'redzone', 'danger'],
    // Line punching through a ceiling / red zone
    line: `<path d="M2 8h20" strokeDasharray="3 2"/><path d="M3 18c2-1 4-3 6-6s4-6 6-7 4-1 6 0"/><path d="M15 5l2-2"/><path d="M17 5l-2-2"/>`,
    solid: `<path d="M2 8h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/><path d="M3 18c2-1 4-3 6-6s4-6 6-7 4-1 6 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M14 6l2.5-2.5M17 6l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<rect x="1" y="2" width="22" height="7" rx="1"/>`,
  },
  {
    name: 'Deload',
    category: 'sport-training',
    tags: ['deload', 'recovery', 'easy', 'light', 'week', 'reduce', 'planned'],
    // Descending step with a check mark at bottom
    line: `<path d="M4 5h4v4H4z"/><path d="M8 9h4v4H8z"/><path d="M12 13h4v4h-4z"/><path d="M17 18l1.5 1.5L22 16"/>`,
    solid: `<path d="M4 5h4v4H4zm4 4h4v4H8zm4 4h4v4h-4z" fill="currentColor"/><path d="M17 18l1.5 1.5L22 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>`,
    duoBg: `<rect x="4" y="5" width="12" height="12"/>`,
  },
  {
    name: 'FatigueResistance',
    category: 'sport-training',
    tags: ['fatigue', 'resistance', 'durability', 'endurance', 'decay', 'drop', 'flat'],
    // Flat solid line (power) vs declining dashed line (others fatigue)
    line: `<path d="M2 10h20"/><path d="M2 10c4 0 8 2 12 5s6 4 8 5" strokeDasharray="3 2" opacity="0.5"/><path d="M2 6l2 2-2 2"/>`,
    solid: `<path d="M2 10h20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M2 10c4 0 8 2 12 5s6 4 8 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity="0.4" strokeLinecap="round"/>`,
    duoBg: `<rect x="1" y="7" width="22" height="12" rx="2"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RACE STRATEGY (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'NegativeSplit',
    category: 'sport-race',
    tags: ['negative', 'split', 'pacing', 'faster', 'second-half', 'strategy'],
    // Descending step-bars (each split faster than last)
    line: `<path d="M3 20V8h3v12"/><path d="M8 20v-9h3v9"/><path d="M13 20v-6h3v6"/><path d="M18 20v-3h3v3"/><path d="M2 6l20 10" strokeDasharray="2 2" opacity="0.4"/>`,
    solid: `<path d="M3 8a.75.75 0 01.75.75V20H6V8.75A.75.75 0 013 8zm5 3a.75.75 0 01.75.75V20H11v-8.25A.75.75 0 018 11zm5 3a.75.75 0 01.75.75V20H16v-5.25A.75.75 0 0113 14zm5 3a.75.75 0 01.75.75V20H21v-2.25A.75.75 0 0118 17z"/>`,
    duoBg: `<rect x="3" y="8" width="18" height="12"/>`,
  },
  {
    name: 'Drafting',
    category: 'sport-race',
    tags: ['drafting', 'slipstream', 'peloton', 'wheel', 'aero', 'group', 'cycling'],
    // Two aero rider profiles in tight formation with wind lines
    line: `<circle cx="7" cy="10" r="2"/><path d="M5 13c0 1 .5 2 2 2s2-1 2-2"/><circle cx="15" cy="10" r="2"/><path d="M13 13c0 1 .5 2 2 2s2-1 2-2"/><path d="M19 8h3"/><path d="M19 11h3"/><path d="M19 14h2"/>`,
    solid: `<circle cx="7" cy="10" r="2.75"/><path d="M4.25 14a2.75 2.75 0 015.5 0 .75.75 0 01-1.5 0 1.25 1.25 0 00-2.5 0 .75.75 0 01-1.5 0z"/><circle cx="15" cy="10" r="2.75"/><path d="M12.25 14a2.75 2.75 0 015.5 0 .75.75 0 01-1.5 0 1.25 1.25 0 00-2.5 0 .75.75 0 01-1.5 0z"/><path d="M19 7.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm0 3a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm0 3a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2z"/>`,
    duoBg: `<ellipse cx="11" cy="12" rx="10" ry="6"/>`,
  },
  {
    name: 'Bonk',
    category: 'sport-race',
    tags: ['bonk', 'wall', 'glycogen', 'empty', 'crash', 'depletion', 'hunger'],
    // Cracked/empty battery with lightning warning
    line: `<rect x="4" y="7" width="14" height="10" rx="2"/><path d="M20 11v2"/><path d="M11 7l-1.5 5h3L11 17"/><path d="M8 10v4" strokeDasharray="1 1.5" opacity="0.4"/>`,
    solid: `<path fillRule="evenodd" d="M6 6.25A2.75 2.75 0 003.25 9v6A2.75 2.75 0 006 17.75h10A2.75 2.75 0 0018.75 15v-1.25H20a.75.75 0 00.75-.75v-2a.75.75 0 00-.75-.75h-1.25V9A2.75 2.75 0 0016 6.25H6zm5.6.93a.75.75 0 00-1.35.27l-1.5 5a.75.75 0 00.72.97h1.66l-1.07 3.57a.75.75 0 001.34.52l2-4a.75.75 0 00-.67-1.09h-1.56l1.07-3.57a.75.75 0 00-.24-.67z"/>`,
    duoBg: `<rect x="4" y="7" width="14" height="10" rx="2"/>`,
  },
  {
    name: 'Pacing',
    category: 'sport-race',
    tags: ['pacing', 'even', 'steady', 'consistent', 'effort', 'split', 'strategy'],
    // Flat line with evenly spaced dots (consistent pace)
    line: `<path d="M2 12h20"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="10" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M2 8h20" strokeDasharray="1 2" opacity="0.3"/><path d="M2 16h20" strokeDasharray="1 2" opacity="0.3"/>`,
    solid: `<path d="M1.25 12a.75.75 0 01.75-.75h20a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75z"/><circle cx="5" cy="12" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="20" cy="12" r="2"/>`,
    duoBg: `<rect x="1" y="8" width="22" height="8" rx="2"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BIOMECHANICS / WEARABLE DATA (6)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'AeroDrag',
    category: 'sport-domain',
    tags: ['aero', 'drag', 'aerodynamic', 'cda', 'wind', 'resistance', 'position'],
    // Streamlined teardrop shape with air flow lines
    line: `<path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8z"/><path d="M8 12c0 4 4 8 8 8 0-4-2-8-8-8z"/><path d="M2 9h4"/><path d="M2 12h5"/><path d="M2 15h4"/>`,
    solid: `<path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8zm0 0c0 4 4 8 8 8 0-4-2-8-8-8z" fill="currentColor"/><path d="M2 9h4M2 12h5M2 15h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8zm0 0c0 4 4 8 8 8 0-4-2-8-8-8z"/>`,
  },
  {
    name: 'Decoupling',
    category: 'sport-domain',
    tags: ['decoupling', 'drift', 'cardiac', 'aerobic', 'hr', 'power', 'efficiency'],
    // Two lines that start together then diverge — HR drifts up, power stays flat
    line: `<path d="M3 16c3-1 6-2 9-3s6-2 9-3"/><path d="M3 16c3 0 6-1 9-3s6-4 9-6" strokeDasharray="3 2"/><circle cx="3" cy="16" r="1.5" fill="currentColor" stroke="none"/>`,
    solid: `<path d="M3 16c3-1 6-2 9-3s6-2 9-3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M3 16c3 0 6-1 9-3s6-4 9-6" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="3 2" strokeLinecap="round"/><circle cx="3" cy="16" r="2" fill="currentColor"/>`,
    duoBg: `<rect x="1" y="5" width="22" height="14" rx="2"/>`,
  },
  {
    name: 'PowerProfile',
    category: 'sport-domain',
    tags: ['power', 'profile', 'radar', 'spider', 'strengths', 'weaknesses', 'chart'],
    // Pentagon radar chart — sprint/anaerobic/vo2/threshold/endurance axes
    line: `<path d="M12 3l8.5 6.2-3.2 10H6.7L3.5 9.2 12 3z"/><path d="M12 8l4.3 3.1-1.6 5H9.3l-1.6-5L12 8z"/><path d="M12 3v5"/><path d="M20.5 9.2l-4.2 1.9"/><path d="M17.3 19.2l-2.6-3.1"/><path d="M6.7 19.2l2.6-3.1"/><path d="M3.5 9.2l4.2 1.9"/>`,
    solid: `<path d="M12 3l8.5 6.2-3.2 10H6.7L3.5 9.2 12 3z" fill="currentColor" opacity="0.2"/><path d="M12 8l4.3 3.1-1.6 5H9.3l-1.6-5L12 8z" fill="currentColor"/><path d="M12 3v5M20.5 9.2l-4.2 1.9M17.3 19.2l-2.6-3.1M6.7 19.2l2.6-3.1M3.5 9.2l4.2 1.9" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>`,
    duoBg: `<path d="M12 3l8.5 6.2-3.2 10H6.7L3.5 9.2 12 3z"/>`,
  },
  {
    name: 'VerticalOscillation',
    category: 'sport-domain',
    tags: ['vertical', 'oscillation', 'bounce', 'running', 'form', 'efficiency'],
    // Sine wave with vertical measurement arrows
    line: `<path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0"/><path d="M7 6v4" strokeDasharray="1 1.5"/><path d="M7 14v4" strokeDasharray="1 1.5"/><path d="M5.5 7l1.5-1.5L8.5 7"/><path d="M5.5 17l1.5 1.5L8.5 17"/>`,
    solid: `<path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M6.25 7a.75.75 0 01.75-.75.75.75 0 01.75.75v10a.75.75 0 01-1.5 0V7z"/><path d="M5.47 7.53a.75.75 0 011.06-1.06l.97.97.97-.97a.75.75 0 011.06 1.06l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5zM5.47 16.47a.75.75 0 011.06 0l1.5 1.5a.75.75 0 001.06 0l-1.5-1.5a.75.75 0 011.06-1.06l1.5 1.5a.75.75 0 010 1.06l-1.5 1.5a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 010-1.06z"/>`,
    duoBg: `<rect x="1" y="6" width="22" height="12" rx="2"/>`,
  },
  {
    name: 'GroundContact',
    category: 'sport-domain',
    tags: ['ground', 'contact', 'time', 'gct', 'running', 'form', 'foot', 'strike'],
    // Foot outline with timing arc underneath
    line: `<path d="M7 14c0-2 1-4 3-5s4-1 5.5 0 2 3 2 5"/><path d="M5 16h14"/><path d="M8 16v2"/><path d="M16 16v2"/><path d="M10 20h4" strokeDasharray="1 1"/>`,
    solid: `<path d="M7 14c0-2 1-4 3-5s4-1 5.5 0 2 3 2 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M5 15.25a.75.75 0 000 1.5h14a.75.75 0 000-1.5H5z"/><path d="M8 16v2a.75.75 0 01-1.5 0v-2zm8.5 0v2a.75.75 0 001.5 0v-2z"/>`,
    duoBg: `<path d="M7 14c0-2 1-4 3-5s4-1 5.5 0 2 3 2 5H7z"/>`,
  },
  {
    name: 'CadenceOptimal',
    category: 'sport-domain',
    tags: ['cadence', 'optimal', 'sweet-spot', 'rpm', 'zone', 'efficiency', 'dial'],
    // Gauge dial with highlighted sweet-spot arc
    line: `<path d="M4 18a9 9 0 1116 0"/><path d="M8.5 16.5a5 5 0 017 0" strokeWidth="2.5" opacity="0.3"/><path d="M12 12V8"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 00-8.49 14.5.75.75 0 001.3-.75A8.25 8.25 0 1120.19 16a.75.75 0 001.3.75A9.75 9.75 0 0012 2.25zm0 5a.75.75 0 01.75.75v3.19a2.25 2.25 0 11-1.5 0V8a.75.75 0 01.75-.75z"/>`,
    duoBg: `<path d="M4 18a9 9 0 1116 0H4z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RECOVERY / ADAPTATION (5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'IceBath',
    category: 'sport-body',
    tags: ['ice', 'bath', 'cold', 'therapy', 'plunge', 'recovery', 'cryotherapy'],
    // Container/tub with snowflake + cold waves
    line: `<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M12 6v3"/><path d="M10 7.5h4"/><path d="M7 14h2"/><path d="M11 14h2"/><path d="M15 14h2"/><path d="M8 17h8"/>`,
    solid: `<path d="M12 5.25a.75.75 0 01.75.75v.75h1.25a.75.75 0 010 1.5h-1.25v.75a.75.75 0 01-1.5 0V8.25H10a.75.75 0 010-1.5h1.25V6a.75.75 0 01.75-.75z"/><path fillRule="evenodd" d="M6 9.25A2.75 2.75 0 003.25 12v6A2.75 2.75 0 006 20.75h12a2.75 2.75 0 002.75-2.75v-6A2.75 2.75 0 0018 9.25H6zm1 4a.75.75 0 000 1.5h2a.75.75 0 000-1.5H7zm4 0a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2zm4 0a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2zm-7 3a.75.75 0 000 1.5h8a.75.75 0 000-1.5H8z"/>`,
    duoBg: `<rect x="4" y="10" width="16" height="10" rx="2"/>`,
  },
  {
    name: 'DOMS',
    category: 'sport-body',
    tags: ['doms', 'delayed', 'onset', 'muscle', 'soreness', 'stiffness', 'pain'],
    // Wave that peaks at 24-48h mark (delayed curve)
    line: `<path d="M2 18h2c1 0 2 0 3-1s3-5 5-8 3-4 4-4 2 0 3 2 2 4 3 4"/><path d="M4 14v-2" opacity="0.4"/><path d="M10 6v-2" opacity="0.4"/><path d="M16 10v-2" opacity="0.4"/><circle cx="10" cy="5" r="1" fill="currentColor" stroke="none"/>`,
    solid: `<path d="M2 18h2c1 0 2 0 3-1s3-5 5-8 3-4 4-4 2 0 3 2 2 4 3 4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><circle cx="10" cy="5" r="1.75" fill="currentColor"/>`,
    duoBg: `<rect x="1" y="4" width="22" height="16" rx="2"/>`,
  },
  {
    name: 'Compression',
    category: 'sport-body',
    tags: ['compression', 'garment', 'recovery', 'squeeze', 'pressure', 'circulation'],
    // Inward-pointing arrows / squeeze
    line: `<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 8l3 1.5L3 11"/><path d="M3 13l3 1.5L3 16"/><path d="M21 8l-3 1.5L21 11"/><path d="M21 13l-3 1.5L21 16"/>`,
    solid: `<rect x="7" y="3" width="10" height="18" rx="2" fill="currentColor"/><path d="M3 8l3 1.5L3 11M3 13l3 1.5L3 16M21 8l-3 1.5L21 11M21 13l-3 1.5L21 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>`,
    duoBg: `<rect x="7" y="3" width="10" height="18" rx="2"/>`,
  },
  {
    name: 'ActiveRecovery',
    category: 'sport-body',
    tags: ['active', 'recovery', 'easy', 'zone1', 'light', 'movement', 'walk'],
    // Gentle sine wave with a heart
    line: `<path d="M2 14c3-2 4-2 5 0s2 2 5 0 4-2 5 0 2 2 5 0"/><path d="M10 6l1.5 1.5L13 6a1.5 1.5 0 012.12 0 1.5 1.5 0 010 2.12L11.5 11.5 8 8.12a1.5 1.5 0 010-2.12A1.5 1.5 0 0110 6z"/>`,
    solid: `<path d="M2 14c3-2 4-2 5 0s2 2 5 0 4-2 5 0 2 2 5 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M10 6l1.5 1.5L13 6a1.5 1.5 0 012.12 0 1.5 1.5 0 010 2.12L11.5 11.5 8 8.12a1.5 1.5 0 010-2.12A1.5 1.5 0 0110 6z" fill="currentColor"/>`,
    duoBg: `<path d="M10 6l1.5 1.5L13 6a1.5 1.5 0 012.12 0 1.5 1.5 0 010 2.12L11.5 11.5 8 8.12a1.5 1.5 0 010-2.12A1.5 1.5 0 0110 6z"/>`,
  },
  {
    name: 'SleepScore',
    category: 'sport-body',
    tags: ['sleep', 'score', 'quality', 'stages', 'rem', 'deep', 'light', 'readiness'],
    // Moon + descending sleep stage bars (awake→light→deep→REM pattern)
    line: `<path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z"/><path d="M3 14h3v6H3z"/><path d="M7.5 12h3v8h-3z"/><path d="M12 16h3v4h-3z"/><path d="M16.5 10h3v10h-3z"/>`,
    solid: `<path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z" fill="currentColor"/><path d="M3 14h3v6H3zm4.5-2h3v8h-3zM12 16h3v4h-3zm4.5-6h3v10h-3z" fill="currentColor" opacity="0.7"/>`,
    duoBg: `<path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NUTRITION STRATEGY (4)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'CarboLoading',
    category: 'sport-nutrition',
    tags: ['carbo', 'loading', 'glycogen', 'pre-race', 'fuel', 'storage', 'supercompensate'],
    // Rising bars inside a tank/container (glycogen filling up)
    line: `<rect x="5" y="4" width="14" height="16" rx="2"/><rect x="7.5" y="14" width="2.5" height="4" rx="0.5"/><rect x="11" y="11" width="2.5" height="7" rx="0.5"/><rect x="14.5" y="8" width="2.5" height="10" rx="0.5"/><path d="M4 8l-2-1.5L4 5"/>`,
    solid: `<path fillRule="evenodd" d="M7 3.25A2.75 2.75 0 004.25 6v12A2.75 2.75 0 007 20.75h10a2.75 2.75 0 002.75-2.75V6A2.75 2.75 0 0017 3.25H7zm.5 10a1.25 1.25 0 011.25 1.25v2.5a1.25 1.25 0 01-1.25 1.25h-.5c-.69 0-1.25-.56-1.25-1.25v-2.5c0-.69.56-1.25 1.25-1.25h.5zM10.25 11c0-.69.56-1.25 1.25-1.25h.5c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25h-.5c-.69 0-1.25-.56-1.25-1.25v-6zm4.25-3.75c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h.5c.69 0 1.25-.56 1.25-1.25V8.5c0-.69-.56-1.25-1.25-1.25h-.5z"/>`,
    duoBg: `<rect x="5" y="4" width="14" height="16" rx="2"/>`,
  },
  {
    name: 'GutTraining',
    category: 'sport-nutrition',
    tags: ['gut', 'training', 'tolerance', 'absorption', 'practice', 'gi', 'stomach'],
    // Gut/stomach outline with upward progress arrows
    line: `<path d="M8 6c-2 0-3 2-3 4s1 3 2 4 2 3 2 5"/><path d="M16 6c2 0 3 2 3 4s-1 3-2 4-2 3-2 5"/><path d="M8 6h8"/><path d="M9 19h6"/><path d="M12 14v-4"/><path d="M10 12l2-2 2 2"/>`,
    solid: `<path d="M8 6c-2 0-3 2-3 4s1 3 2 4 2 3 2 5h6c0-2 1-3 2-5s2-2 2-4-1-4-3-4H8z" fill="currentColor" opacity="0.2"/><path d="M12 14v-4M10 12l2-2 2 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6h8M9 19h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>`,
    duoBg: `<path d="M8 6c-2 0-3 2-3 4s1 3 2 4 2 3 2 5h6c0-2 1-3 2-5s2-2 2-4-1-4-3-4H8z"/>`,
  },
  {
    name: 'AbsorptionRate',
    category: 'sport-nutrition',
    tags: ['absorption', 'rate', 'uptake', 'gut', 'gram', 'hour', 'flow', 'transport'],
    // Funnel with flow/drip rate indicator
    line: `<path d="M4 4h16"/><path d="M6 4l3 8v8a2 2 0 004 0v-8l3-8"/><path d="M9 12h6"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>`,
    solid: `<path fillRule="evenodd" d="M4 3.25a.75.75 0 000 1.5h1.38l2.87 7.66V20a2.75 2.75 0 005.5 0v-7.59l2.87-7.66H20a.75.75 0 000-1.5H4zm4.9 1.5l2.35 6.25h1.5l2.35-6.25H8.9z"/>`,
    duoBg: `<path d="M6 4l3 8v8a2 2 0 004 0v-8l3-8H6z"/>`,
  },
  {
    name: 'FuelingWindow',
    category: 'sport-nutrition',
    tags: ['fueling', 'window', 'timing', 'post', 'workout', 'anabolic', 'golden', 'hour'],
    // Clock with highlighted sector (the golden 30-60min window)
    line: `<circle cx="12" cy="12" r="9"/><path d="M12 12V7"/><path d="M12 12l4 4"/><path d="M12 3a9 9 0 014.24 1.08" strokeWidth="2.5" opacity="0.3"/>`,
    solid: `<path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 6.25a.75.75 0 01.75.75v4.44l3.28 3.28a.75.75 0 01-1.06 1.06l-3.5-3.5A.75.75 0 0111.25 12V7a.75.75 0 01.75-.75z"/>`,
    duoBg: `<circle cx="12" cy="12" r="9"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MENTAL / COACHING (5)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'FlowState',
    category: 'sport-body',
    tags: ['flow', 'state', 'zone', 'focus', 'peak', 'performance', 'mindfulness'],
    // Brain with harmonious wave through it
    line: `<path d="M12 2c-3 0-5 2-6 4s-1 5 1 7c1 1.5 1.5 3 1.5 5h7c0-2 .5-3.5 1.5-5 2-2 2-5 1-7S15 2 12 2z"/><path d="M8.5 18h7"/><path d="M9 21h6"/><path d="M8 10c1-1 2-1 3 0s2 1 3 0 2-1 3 0"/>`,
    solid: `<path fillRule="evenodd" d="M12 1.25c-3.3 0-5.7 2.2-6.8 4.4-1.1 2.3-1.2 5.4.9 7.5.85.85 1.3 2 1.5 3.35h8.8c.2-1.35.65-2.5 1.5-3.35 2.1-2.1 2-5.2.9-7.5-1.1-2.2-3.5-4.4-6.8-4.4zm-3.5 16.5a.75.75 0 000 1.5h7a.75.75 0 000-1.5h-7zm.5 3a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z"/>`,
    duoBg: `<path d="M12 2c-3 0-5 2-6 4s-1 5 1 7c1 1.5 1.5 3 1.5 5h7c0-2 .5-3.5 1.5-5 2-2 2-5 1-7S15 2 12 2z"/>`,
  },
  {
    name: 'Whistle',
    category: 'user',
    tags: ['whistle', 'coach', 'referee', 'instructor', 'trainer', 'blow'],
    line: `<path d="M3 5h6l2 3h7a3 3 0 010 6H11l-2 3H3a1 1 0 01-1-1V6a1 1 0 011-1z"/><circle cx="15" cy="11" r="2"/><path d="M6 5v12"/>`,
    solid: `<path fillRule="evenodd" d="M3 4.25A1.75 1.75 0 001.25 6v10c0 .97.78 1.75 1.75 1.75h6l2 3h7a3.75 3.75 0 000-7.5H11.5l-2-3H3zm12 5a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z"/>`,
    duoBg: `<path d="M3 5h6l2 3h7a3 3 0 010 6H11l-2 3H3a1 1 0 01-1-1V6a1 1 0 011-1z"/>`,
  },
  {
    name: 'SeasonBest',
    category: 'achievement',
    tags: ['season', 'best', 'sb', 'personal', 'record', 'calendar', 'achievement'],
    // Calendar with star overlay
    line: `<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2v3"/><path d="M16 2v3"/><path d="M4 10h16"/><path d="M12 13l1.2 2.5 2.8.4-2 2 .5 2.8L12 19.5l-2.5 1.2.5-2.8-2-2 2.8-.4L12 13z"/>`,
    solid: `<path fillRule="evenodd" d="M8 1.25a.75.75 0 01.75.75v1.75h6.5V2a.75.75 0 011.5 0v1.75H18A2.75 2.75 0 0120.75 6.5v12.25A2.75 2.75 0 0118 21.5H6A2.75 2.75 0 013.25 18.75V6.5A2.75 2.75 0 016 3.75h.75V2A.75.75 0 018 1.25zM4.75 10.25v8.5c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-8.5H4.75zM12 12.25l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.2-2.5 1.2.5-2.8-2-2 2.8-.4L12 12.25z"/>`,
    duoBg: `<path d="M4 10h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z"/>`,
  },
  {
    name: 'TSB',
    category: 'sport-training',
    tags: ['tsb', 'training', 'stress', 'balance', 'form', 'fitness', 'fatigue', 'pmc'],
    // Plus/minus balance — line crossing zero axis
    line: `<path d="M2 12h20"/><path d="M3 12c2-3 4-5 6-5s4 2 5 3 3 2 5 0 3-3 3-4"/><path d="M2 8h2"/><path d="M2 16h2"/><path d="M20 6l2 2"/><path d="M20 8l2-2"/>`,
    solid: `<path d="M2 12h20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/><path d="M3 12c2-3 4-5 6-5s4 2 5 3 3 2 5 0 3-3 3-4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M2 8h2M2 16h2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>`,
    duoBg: `<rect x="1" y="6" width="22" height="12" rx="2"/>`,
  },
  {
    name: 'MentalToughness',
    category: 'sport-body',
    tags: ['mental', 'toughness', 'grit', 'resilience', 'mind', 'strong', 'fortitude'],
    // Brain with shield overlay — mental fortitude
    line: `<path d="M12 2c-3 0-5 2-6 4s-1 4 0 6"/><path d="M12 2c3 0 5 2 6 4s1 4 0 6"/><path d="M12 14l-4 2v3c0 2 1.5 3.5 4 4 2.5-.5 4-2 4-4v-3l-4-2z"/>`,
    solid: `<path d="M12 2c-3 0-5 2-6 4s-1 4 0 6c.5 1 1 1.5 1.5 2l4.5-2 4.5 2c.5-.5 1-1 1.5-2 1-2 1-4 0-6S15 2 12 2z" fill="currentColor" opacity="0.3"/><path d="M12 14l-4 2v3c0 2 1.5 3.5 4 4 2.5-.5 4-2 4-4v-3l-4-2z" fill="currentColor"/>`,
    duoBg: `<path d="M12 2c-3 0-5 2-6 4s-1 4 0 6c1 2 2 3 6 2s5 0 6-2c1-2 1-4 0-6S15 2 12 2z"/>`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FUN / EASTER EGGS / PERSONALITY (8)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    name: 'PizzaSlice',
    category: 'food',
    tags: ['pizza', 'cheat', 'meal', 'reward', 'rest', 'day', 'treat', 'fun'],
    // Pizza slice — the universal cheat meal icon
    line: `<path d="M12 2L3 20h18L12 2z"/><circle cx="10" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="17" r="1" fill="currentColor" stroke="none"/><path d="M6 14c2-1 4-1 6 0s4 1 6 0"/>`,
    solid: `<path d="M12.38 1.4a.75.75 0 00-.76 0l-9 11a.75.75 0 00.63 1.17L12 19.25l8.75-5.68a.75.75 0 00.63-1.17l-9-11z"/><circle cx="10" cy="11" r="1.25" fill="white"/><circle cx="14" cy="13" r="1.25" fill="white"/><circle cx="11" cy="15" r="1.25" fill="white"/>`,
    duoBg: `<path d="M12 2L3 20h18L12 2z"/>`,
  },
  {
    name: 'Beer',
    category: 'food',
    tags: ['beer', 'post-race', 'celebrate', 'reward', 'pint', 'cheers', 'fun'],
    // Pint glass with foam
    line: `<path d="M7 4h10l-1 16H8L7 4z"/><path d="M7 4c0-1 1.5-2 5-2s5 1 5 2"/><path d="M7 8h10"/><path d="M9.5 8c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5"/>`,
    solid: `<path fillRule="evenodd" d="M6.26 3.6C6.44 2.6 8.22 1.25 12 1.25s5.56 1.35 5.74 2.35l1 16a.75.75 0 01-.74.87H8L6.26 3.6zM7.75 8.25h8.5l-.25-4c-.4-.4-1.8-1.25-4-1.25s-3.6.85-4 1.25l-.25 4z"/>`,
    duoBg: `<path d="M7 4h10l-1 16H8L7 4z"/>`,
  },
  {
    name: 'Unicorn',
    category: 'achievement',
    tags: ['unicorn', 'rare', 'magical', 'impossible', 'legendary', 'pr', 'dream', 'fun'],
    // Unicorn head profile — for mythical PRs / dream performances
    line: `<path d="M16 3l-2 5"/><path d="M10 8c-3 0-5 2-5 5 0 2 1 4 3 5h5c2 0 4-1 5-3s1-4 0-6-3-3-5-3h-3z"/><circle cx="10" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M8 16c1 1 2 1.5 3.5 1.5"/>`,
    solid: `<path d="M16.53 2.47a.75.75 0 00-1.36.32l-1.71 4.27C13 7.04 12.5 7 12 7h-2c-3.3 0-5.75 2.3-5.75 5.5 0 2.2 1.1 4.3 3.25 5.4v.1h5.5c2.2 0 4.3-1.1 5.4-3.25s1.1-4.3 0-6.5a5.8 5.8 0 00-1.87-2.28z"/><circle cx="10" cy="12" r="1.25" fill="white"/>`,
    duoBg: `<path d="M10 8c-3 0-5 2-5 5 0 2 1 4 3 5h5c2 0 4-1 5-3s1-4 0-6-3-3-5-3h-3z"/>`,
  },
  {
    name: 'ChickenLeg',
    category: 'food',
    tags: ['chicken', 'protein', 'meat', 'meal', 'leg', 'drumstick', 'recovery', 'fun'],
    // Chicken drumstick — the protein icon with personality
    line: `<path d="M14 3c-3 0-5 2-5 5 0 1.5.5 2.5 1 3.5L6 16c-1.5 1.5-1 3.5.5 5s3.5 2 5 .5l4.5-4c1-.5 2-1 3.5-1 3 0 5-2 5-5s-2.5-5-5-5c-1.5 0-2.5.5-3.5 1-1-.5-2-1.5-2-3.5z"/><path d="M9 17l-1.5 1.5"/>`,
    solid: `<path d="M14 2.25c-3.45 0-5.75 2.25-5.75 5.75 0 1.1.3 2 .7 2.8L5.47 14.28c-1.76 1.76-1.26 4.2.7 5.55 1.7 1.17 4.1 1.47 5.55-.27l3.6-3.36c.7-.3 1.5-.45 2.68-.45 3.45 0 5.75-2.3 5.75-5.75S21.45 4.25 18 4.25c-1.18 0-2.08.2-2.88.57C14.52 3.72 13.4 2.25 14 2.25z"/>`,
    duoBg: `<path d="M14 3c-3 0-5 2-5 5 0 1.5.5 2.5 1 3.5L6 16c-1.5 1.5-1 3.5.5 5s3.5 2 5 .5l4.5-4c1-.5 2-1 3.5-1 3 0 5-2 5-5s-2.5-5-5-5c-1.5 0-2.5.5-3.5 1-1-.5-2-1.5-2-3.5z"/>`,
  },
  {
    name: 'SockTan',
    category: 'activity',
    tags: ['sock', 'tan', 'cycling', 'tanline', 'summer', 'rider', 'badge', 'fun'],
    // Leg with distinctive sock tanline — every cyclist knows this
    line: `<path d="M10 2v20"/><path d="M14 2v20"/><path d="M8 2h8"/><path d="M8 22c0-2 1-3 2-3h4c1 0 2 1 2 3"/><path d="M10 14h4" strokeWidth="2.5" opacity="0.3"/><path d="M8 14h8" strokeDasharray="1 2" opacity="0.4"/>`,
    solid: `<path d="M8 2h8v11.25H8V2z" fill="currentColor"/><path d="M8 13.25h8V19c0 1.1-.45 2-1.25 2.6-.6.45-1.35.65-2.25.65h-1c-.9 0-1.65-.2-2.25-.65-.8-.6-1.25-1.5-1.25-2.6v-5.75z" fill="currentColor" opacity="0.3"/>`,
    duoBg: `<rect x="8" y="2" width="8" height="20" rx="1"/>`,
  },
  {
    name: 'ShameFridge',
    category: 'food',
    tags: ['fridge', 'shame', 'midnight', 'snack', 'guilty', 'pleasure', 'cheat', 'fun'],
    // Fridge with guilty glow — the midnight snack icon
    line: `<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14"/><path d="M16 6v2"/><path d="M16 13v4"/><path d="M11 5l1 1 1-1" opacity="0.4"/><path d="M11 7l1 1 1-1" opacity="0.4"/>`,
    solid: `<path fillRule="evenodd" d="M7 1.25A2.75 2.75 0 004.25 4v16A2.75 2.75 0 007 22.75h10a2.75 2.75 0 002.75-2.75V4A2.75 2.75 0 0017 1.25H7zM5.75 10.75v9.25c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25v-9.25H5.75zM16 5.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm0 7a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75z"/>`,
    duoBg: `<rect x="5" y="2" width="14" height="20" rx="2"/>`,
  },
  {
    name: 'DNF',
    category: 'sport-race',
    tags: ['dnf', 'did-not-finish', 'abandon', 'quit', 'dropout', 'bail', 'walk'],
    // Broken finish line / torn tape
    line: `<path d="M4 4v16"/><path d="M20 4v16"/><path d="M4 8h6"/><path d="M14 10h6"/><path d="M10 8l2 1 2-1" strokeDasharray="1 1"/><path d="M9 12l1 .5"/><path d="M14 14l1-.5"/>`,
    solid: `<path d="M4 3.25a.75.75 0 01.75.75v16a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75zm16 0a.75.75 0 01.75.75v16a.75.75 0 01-1.5 0V4a.75.75 0 01.75-.75z"/><path d="M4.75 7.25h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm9 2h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5z"/><path d="M10.5 8.25l1.5.75 1.5-.75" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="2 2"/>`,
    duoBg: `<rect x="4" y="4" width="16" height="16"/>`,
  },
  {
    name: 'CouchPotato',
    category: 'activity',
    tags: ['couch', 'rest', 'lazy', 'off', 'day', 'potato', 'netflix', 'fun', 'recovery'],
    // Person sinking into a couch — the ultimate rest day
    line: `<path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z"/><path d="M5 14V10a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="12" cy="5" r="2"/><path d="M9 14c0-1.5 1-2 3-2s3 .5 3 2"/>`,
    solid: `<circle cx="12" cy="5" r="2.75"/><path d="M7 7.25A2.75 2.75 0 004.25 10v3.25H2.25a.75.75 0 00-.75.75v4A2.75 2.75 0 004.25 20.75h15.5A2.75 2.75 0 0022.5 18v-4a.75.75 0 00-.75-.75h-2V10A2.75 2.75 0 0017 7.25H7z"/>`,
    duoBg: `<path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z"/>`,
  },
]

// ─── File generators (same as Wave 10) ───────────────────────────────────────

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

console.log(`\n🔥 Generating Wave 11 icons: ${ICONS.length} icons × 4 variants = ${ICONS.length * 4} files\n`)

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
  console.log(`  ✓ Icon${icon.name} (${icon.category})`)
}

const divider = '\n// --- Wave 11: Training Science + Race Strategy + Fun ---\n'
appendFileSync(join(BASE, 'line', 'index.ts'), divider + lineExports.join('\n') + '\n')
appendFileSync(join(BASE, 'light', 'index.ts'), divider + lightExports.join('\n') + '\n')
appendFileSync(join(BASE, 'solid', 'index.ts'), divider + solidExports.join('\n') + '\n')
appendFileSync(join(BASE, 'duo', 'index.ts'), divider + duoExports.join('\n') + '\n')

console.log(`\n✓ Barrel exports updated`)

// Update catalog
const catalogPath = join(BASE, 'catalog.ts')
let catalogContent = readFileSync(catalogPath, 'utf-8')

const newEntriesBlock = `\n  // ─── Wave 11: Training Science + Race Strategy + Fun (${ICONS.length}) ──────\n${catalogEntries.join('\n')}\n`
catalogContent = catalogContent.replace(/\n\]\n$/, newEntriesBlock + ']\n')

const totalCount = (catalogContent.match(/name: 'Icon/g) || []).length
catalogContent = catalogContent.replace(/Icon catalog metadata \(\d+ icons/, `Icon catalog metadata (${totalCount} icons`)

writeFileSync(catalogPath, catalogContent)

console.log(`✓ Catalog updated — ${totalCount} total icons`)
console.log(`\n🎉 Wave 11 complete: ${ICONS.length} new icons (${ICONS.length * 4} files)`)
console.log(`   Training science: SuperCompensation, Taper, Periodization, Overreach, Deload, FatigueResistance`)
console.log(`   Race strategy: NegativeSplit, Drafting, Bonk, Pacing`)
console.log(`   Biomechanics: AeroDrag, Decoupling, PowerProfile, VerticalOscillation, GroundContact, CadenceOptimal`)
console.log(`   Recovery: IceBath, DOMS, Compression, ActiveRecovery, SleepScore`)
console.log(`   Nutrition: CarboLoading, GutTraining, AbsorptionRate, FuelingWindow`)
console.log(`   Mental: FlowState, Whistle, SeasonBest, TSB, MentalToughness`)
console.log(`   Fun: PizzaSlice, Beer, Unicorn, ChickenLeg, SockTan, ShameFridge, DNF, CouchPotato`)
