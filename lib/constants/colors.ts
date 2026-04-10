// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// ═══════════════════════════════════════════════════════════════════════════════
// RAMTT Color System v3 — Tailwind Data Colors
// Layer 1: RAMTT neutral base (LOCKED). Layer 2: Tailwind ramps (8 hues × 11 steps)
// All colors designed for #FAF9F5 sand canvas
// ═══════════════════════════════════════════════════════════════════════════════

// ── Power Zones (polychromatic — 6 Tailwind hues) ──────────────────────────
export const POWER_ZONES = [
  '#94A3B8', // Z1 Recovery — slate-400
  '#16A34A', // Z2 Endurance — green-600
  '#F59E0B', // Z3 Tempo — amber-500
  '#F97316', // Z4 Threshold — orange-500
  '#EF4444', // Z5 VO₂max — red-500
  '#A855F7', // Z6 Neuromuscular — purple-500
] as const

export const POWER_ZONES_VIVID = [
  '#64748B', // Z1v — slate-500
  '#15803D', // Z2v — green-700
  '#D97706', // Z3v — amber-600
  '#EA580C', // Z4v — orange-600
  '#DC2626', // Z5v — red-600
  '#9333EA', // Z6v — purple-600
] as const

export const POWER_ZONE_NAMES = [
  'Recovery',
  'Endurance',
  'Tempo',
  'Threshold',
  'VO₂max',
  'Neuromuscular',
] as const

// ── HR Zones (monochrome red ramp) ─────────────────────────────────────────
export const HR_ZONES = [
  '#FEE2E2', // HR1 Blush — red-100
  '#FCA5A5', // HR2 Salmon — red-300
  '#F87171', // HR3 Rose — red-400
  '#EF4444', // HR4 Red — red-500 (anchor)
  '#DC2626', // HR5 Crimson — red-600
  '#991B1B', // HR6 Blood — red-800
] as const

export const HR_ZONE_NAMES = [
  'Very light',
  'Light',
  'Moderate',
  'Hard',
  'Very hard',
  'Maximal',
] as const

// ── CHO Zones (monochrome amber ramp) ──────────────────────────────────────
export const CHO_ZONES = [
  '#FEF3C7', // C1 Cream — amber-100
  '#FCD34D', // C2 Butter — amber-300
  '#FBBF24', // C3 Gold — amber-400
  '#F59E0B', // C4 Amber — amber-500 (anchor)
  '#D97706', // C5 Dark amber — amber-600
  '#92400E', // C6 Deep amber — amber-800
] as const

export const CHO_ZONE_NAMES = [
  'Minimal',
  'Moderate',
  'Standard',
  'Aggressive',
  'Elite',
  'Explorer',
] as const

// ── kJ/Energy Zones (monochrome emerald ramp) ──────────────────────────────
export const KJ_ZONES = [
  '#D1FAE5', // E1 Pale mint — emerald-100
  '#6EE7B7', // E2 Light emerald — emerald-300
  '#34D399', // E3 Emerald — emerald-400
  '#10B981', // E4 Deep emerald — emerald-500 (anchor)
  '#059669', // E5 Dark emerald — emerald-600
  '#065F46', // E6 Forest — emerald-800
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
  power: '#16A34A',   // green-600
  hr: '#EF4444',      // red-500
  cadence: '#A855F7',  // purple-500
  speed: '#3B82F6',    // blue-500
  altitude: '#76726A', // --n600
  temperature: '#F97316', // orange-500
  cho: '#F97316',      // orange-500
  fluid: '#3B82F6',    // blue-500
} as const

// ── Nutrient Colors ─────────────────────────────────────────────────────────
export const NUTRIENT_COLORS = {
  cho: '#F97316',      // orange-500
  protein: '#A855F7',  // purple-500
  fat: '#F59E0B',      // amber-500
  fiber: '#10B981',    // emerald-500
  fluid: '#3B82F6',    // blue-500
  sodium: '#EC4899',   // pink-500
  caffeine: '#9333EA', // purple-600
  alcohol: '#EF4444',  // red-500
} as const

// ── Comparison Slots ────────────────────────────────────────────────────────
export const COMPARISON_COLORS = [
  '#0F0F0E', // A — Black
  '#3B82F6', // B — blue-500
  '#EF4444', // C — red-500
  '#F59E0B', // D — amber-500
  '#A855F7', // E — purple-500
  '#10B981', // F — emerald-500
] as const

// ── Settings Dot Palette ────────────────────────────────────────────────────
export const DOT_COLORS = {
  green: '#16A34A',
  lime: '#81B806',
  blue: '#3B82F6',
  cyan: '#0891B2',
  orange: '#F97316',
  lilac: '#7B4FB0',
  violet: '#A855F7',
  slate: '#64748B',
  accent: '#4A044E',
} as const

// ── UI Chrome ───────────────────────────────────────────────────────────────
export const ACCENT = '#4A044E'
export const DANGER = '#EF4444'  // red-500
export const WARNING = '#F59E0B' // amber-500
export const SUCCESS = '#16A34A' // green-600
export const INFO = '#3B82F6'    // blue-500

// ── Fill Opacity Scale (for zone backgrounds) ───────────────────────────────
export const ZONE_FILL_OPACITY = {
  band: 0.08,
  hover: 0.14,
  selected: 0.20,
  badge: 0.12,
} as const
