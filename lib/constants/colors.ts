// ═══════════════════════════════════════════════════════════════════════════════
// RAMTT Color System v2 — TypeScript Constants
// All colors designed for #FAF9F5 sand canvas
// ═══════════════════════════════════════════════════════════════════════════════

// ── Power Zones (polychromatic) ─────────────────────────────────────────────
export const POWER_ZONES = [
  '#5C97CB', // Z1 Recovery — Steel blue
  '#14B8A2', // Z2 Endurance — Teal
  '#E8B020', // Z3 Tempo — Golden amber
  '#E36B30', // Z4 Threshold — Burnt orange
  '#D4365C', // Z5 VO₂max — Deep rose
  '#8B5CF6', // Z6 Neuromuscular — Violet
] as const

export const POWER_ZONES_VIVID = [
  '#4A8AB8', // Z1v
  '#0DA68E', // Z2v
  '#D4A010', // Z3v
  '#CC5520', // Z4v
  '#C02848', // Z5v
  '#7C4AE0', // Z6v
] as const

export const POWER_ZONE_NAMES = [
  'Recovery',
  'Endurance',
  'Tempo',
  'Threshold',
  'VO₂max',
  'Neuromuscular',
] as const

// ── HR Zones (monochrome red) ───────────────────────────────────────────────
export const HR_ZONES = [
  '#F5C4C4', // HR1 Blush — 50-60% HRmax
  '#E8908A', // HR2 Salmon — 60-70%
  '#D4606A', // HR3 Rose — 70-80%
  '#B83A4A', // HR4 Crimson — 80-90%
  '#942030', // HR5 Dark crimson — 90-95%
  '#6E1020', // HR6 Blood — 95-100%
] as const

export const HR_ZONE_NAMES = [
  'Very light',
  'Light',
  'Moderate',
  'Hard',
  'Very hard',
  'Maximal',
] as const

// ── CHO Zones (monochrome orange/amber) ─────────────────────────────────────
export const CHO_ZONES = [
  '#F5DCC0', // C1 Cream — 0-30 g/h
  '#E8C08A', // C2 Wheat — 30-50
  '#D4A050', // C3 Gold — 50-70
  '#C47830', // C4 Copper — 70-90
  '#A85820', // C5 Rust — 90-120
  '#8A3810', // C6 Mahogany — 120+
] as const

export const CHO_ZONE_NAMES = [
  'Minimal',
  'Moderate',
  'Standard',
  'Aggressive',
  'Elite',
  'Explorer',
] as const

// ── kJ/Energy Zones (monochrome green) ──────────────────────────────────────
export const KJ_ZONES = [
  '#D4E8D0', // E1 Sage mist
  '#A8D4A0', // E2 Light sage
  '#70B868', // E3 Leaf green
  '#48943C', // E4 Forest
  '#2A7028', // E5 Deep forest
  '#185018', // E6 Dark pine
] as const

export const KJ_ZONE_NAMES = [
  'Very low',
  'Low',
  'Moderate',
  'High',
  'Very high',
  'Extreme',
] as const

// ── Signal Line Colors ──────────────────────────────────────────────────────
export const SIGNAL_COLORS = {
  power: '#5C97CB',
  hr: '#D4365C',
  cadence: '#A259FF',
  speed: '#0891B2',
  altitude: '#64748B',
  temperature: '#E8834A',
  cho: '#E36B30',
  fluid: '#2AACCC',
} as const

// ── Nutrient Colors ─────────────────────────────────────────────────────────
export const NUTRIENT_COLORS = {
  cho: '#E36B30',
  protein: '#4A044E',
  fat: '#D4A050',
  fiber: '#70B868',
  fluid: '#2AACCC',
  sodium: '#9B40E8',
  caffeine: '#14B8A2',
  alcohol: '#CA054D',
} as const

// ── Comparison Slots ────────────────────────────────────────────────────────
export const COMPARISON_COLORS = [
  '#0F0F0E', // A — Current / primary (black)
  '#5C97CB', // B — Steel blue
  '#E8834A', // C — Warm orange
  '#A259FF', // D — Violet
  '#14B8A2', // E — Teal
  '#CA054D', // F — Rosewood
] as const

// ── Settings Dot Palette ────────────────────────────────────────────────────
export const DOT_COLORS = {
  green: '#16A34A',
  lime: '#81B806',
  blue: '#86B6EF',
  cyan: '#0891B2',
  orange: '#E8834A',
  lilac: '#7B4FB0',
  violet: '#A259FF',
  slate: '#64748B',
  accent: '#4A044E',
} as const

// ── UI Chrome ───────────────────────────────────────────────────────────────
export const ACCENT = '#4A044E'
export const DANGER = '#CA054D'
export const WARNING = '#D97706'
export const SUCCESS = '#16A34A'
export const INFO = '#0891B2'

// ── Fill Opacity Scale (for zone backgrounds) ───────────────────────────────
export const ZONE_FILL_OPACITY = {
  band: 0.08,
  hover: 0.14,
  selected: 0.20,
  badge: 0.12,
} as const
