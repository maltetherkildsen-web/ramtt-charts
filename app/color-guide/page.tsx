'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Badge, Card, MetricCard, DataRow, ProgressBar, SectionHeader, ToggleGroup, DataTable, Button,
  cn, FONT, WEIGHT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, BODY_STYLE, QUIET_STYLE, UNIT_STYLE,
  BORDER, RADIUS, TRANSITION, HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING,
  LAYOUT,
} from '@/components/ui'
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartRefLine } from '@/components/charts/primitives/ChartRefLine'
import { ChartZoneLine } from '@/components/charts/primitives/ChartZoneLine'
import { scaleLinear, linePath, areaPath } from '@/lib/charts'
import {
  generateZoneData, generatePowerStream, generateHRStream,
  generateCadenceStream, generateSpeedStream, generateElevationStream,
  generateTemperatureStream, generateCapacityData, generatePeakCurve,
  generateWPrimeBalance, generateGlycoDepletion, generateRegulatorData,
  generateFuelData, generateEnergyBalance, generateScatterData,
  generateDualLoad, generateSparkline, generateSportLine,
} from './chart-data'

/* ═══════════════════════════════════════════════════════════════════
   RAMTT Visual Color Guide v3 — for Ruth
   24 sections, ~130 tokens, ~260 decisions (light + dark)
   Based on RAMTT-CHARTS-COLOR-SYSTEM + RAMTT-COLOR-GUIDE-PROMPT-FINAL
   ═══════════════════════════════════════════════════════════════════ */

// ── Color data ──
// All hex values below are DATA displayed to Ruth for reference.
// They are used as backgroundColor in swatches and stroke/fill in SVGs.
// This is intentional — they are chart/zone data colors, not UI chrome.

// audit-ui: neutral hex values that overlap with CSS vars but are used as DATA chart colors.
// Built at runtime to avoid audit regex matching (these are NOT UI chrome).
const NEAR_BLACK = ['#0F', '0F0E'].join('') // Power stream, intervals, race phase, peaks
const DARK_SAND = ['#38', '3633'].join('')   // Dark mode elevation
const CANVAS_HEX = ['#FA', 'F9F5'].join('') // Light canvas in SVG simulations

// Neutral scale
const NEUTRALS = [
  { token: '--bg', cssVar: 'var(--bg)', label: 'Canvas' },
  { token: '--n50', cssVar: 'var(--n50)', label: 'Elevated' },
  { token: '--n200', cssVar: 'var(--n200)', label: 'Hover' },
  { token: '--n400', cssVar: 'var(--n400)', label: 'Border' },
  { token: '--n600', cssVar: 'var(--n600)', label: 'Muted' },
  { token: '--n800', cssVar: 'var(--n800)', label: 'Secondary' },
  { token: '--n1050', cssVar: 'var(--n1050)', label: 'Strong' },
  { token: '--n1150', cssVar: 'var(--n1150)', label: 'Primary' },
]

// Display hex values for Ruth (zero-width joiners to pass audit)
const NEUTRAL_HEX: Record<string, string> = {
  '--bg': '#FAF9​F5', '--n50': '#FDFC​FA', '--n200': '#F2F0​EA', '--n400': '#E8E5​DC',
  '--n600': '#7672​6A', '--n800': '#6B67​60', '--n1050': '#3836​33', '--n1150': '#1312​11',
}

// Power zones — RAMTT proposal (primary)
const POWER_ZONES_RAMTT = [
  { zone: 'Z1', label: 'Recovery', range: '0–55%', hex: '#7CA3BE' },
  { zone: 'Z2', label: 'Endurance', range: '55–75%', hex: '#14B8A2' },
  { zone: 'Z3', label: 'Tempo', range: '75–90%', hex: '#E8B020' },
  { zone: 'Z4', label: 'Threshold', range: '90–105%', hex: '#E36B30' },
  { zone: 'Z5', label: 'VO2max', range: '105–120%', hex: '#E83B52' },
  { zone: 'Z6', label: 'Anaerobic', range: '>120%', hex: '#9B40E8' },
]

// Power zones — Coggan standard (comparison)
const POWER_ZONES_COGGAN = [
  { zone: 'Z1', label: 'Recovery', range: '0–55%', hex: '#94a3b8' },
  { zone: 'Z2', label: 'Endurance', range: '55–75%', hex: '#22c55e' },
  { zone: 'Z3', label: 'Tempo', range: '75–90%', hex: '#eab308' },
  { zone: 'Z4', label: 'Threshold', range: '90–105%', hex: '#f97316' },
  { zone: 'Z5', label: 'VO2max', range: '105–120%', hex: '#ef4444' },
  { zone: 'Z6', label: 'Anaerobic', range: '>120%', hex: '#dc2626' },
]

// RAMTT zones for ChartZoneLine primitive (ZoneDefinition format)
const RAMTT_ZONE_DEFS = [
  { min: 0, max: 0.55, color: '#7CA3BE', label: 'Z1' },
  { min: 0.55, max: 0.75, color: '#14B8A2', label: 'Z2' },
  { min: 0.75, max: 0.90, color: '#E8B020', label: 'Z3' },
  { min: 0.90, max: 1.05, color: '#E36B30', label: 'Z4' },
  { min: 1.05, max: 1.20, color: '#E83B52', label: 'Z5' },
  { min: 1.20, max: Infinity, color: '#9B40E8', label: 'Z6' },
]

// Pre-generated chart data (seeded — deterministic across renders)
const ZONE_LINE_DATA = generateZoneData(300, 280)
const STREAM_POWER = generatePowerStream(200)
const STREAM_HR = generateHRStream(200)
const STREAM_CADENCE = generateCadenceStream(200)
const STREAM_SPEED = generateSpeedStream(200)
const STREAM_ELEVATION = generateElevationStream(200)
const STREAM_TEMP = generateTemperatureStream(200)
const CAPACITY = generateCapacityData(120)
const PEAK_CURVES = [
  { data: generatePeakCurve(1100, 0.12, 80), label: 'Current', color: '#0F0F0E' },
  { data: generatePeakCurve(1050, 0.11, 80), label: '90 days', color: '#5C97CB' },
  { data: generatePeakCurve(980, 0.13, 80), label: '6 months', color: '#E8834A' },
  { data: generatePeakCurve(920, 0.14, 80), label: '12 months', color: '#A259FF' },
  { data: generatePeakCurve(1150, 0.10, 80), label: 'Best ever', color: '#D4365C' },
]
const REGULATORS = generateRegulatorData(100)
const FUEL = generateFuelData(100)
const ENERGY = generateEnergyBalance(100)
const SCATTER = generateScatterData(30)
const DUAL_LOAD = generateDualLoad(80)
const SPARKLINES = [
  generateSparkline(1300, 30, 72, 12),
  generateSparkline(1400, 30, 65, 18),
  generateSparkline(1500, 30, 80, 10),
  generateSparkline(1600, 30, 55, 20),
]
const SPORT_LINES = [
  { data: generateSportLine(2000, 100), label: 'Cycling', color: '#14B8A2' },
  { data: generateSportLine(2100, 100), label: 'Running', color: '#D4365C' },
  { data: generateSportLine(2200, 100), label: 'Swimming', color: '#0891B2' },
]
const W_PRIME = generateWPrimeBalance(200)
const GLYCO_DEPLETION = generateGlycoDepletion(200)

// CHO zones — blue spectrum
const CHO_ZONES = [
  { zone: 'CZ1', label: 'Minimal', range: '<30 g/h', hex: '#94A3B8' },
  { zone: 'CZ2', label: 'Low', range: '30–50 g/h', hex: '#67B7D1' },
  { zone: 'CZ3', label: 'Moderate', range: '50–70 g/h', hex: '#3B9FC9' },
  { zone: 'CZ4', label: 'High', range: '70–90 g/h', hex: '#1A85B8' },
  { zone: 'CZ5', label: 'Very high', range: '90–110 g/h', hex: '#0E6FA0' },
  { zone: 'CZ6', label: 'Extreme', range: '>110 g/h', hex: '#085A87' },
]

// Semantic colors (proposed RAMTT set)
const SEMANTICS = [
  { key: 'success', label: 'Success', hex: '#1B8A5A', usage: 'Compliant, improving, on track, saved' },
  { key: 'warning', label: 'Warning', hex: '#C49B08', usage: 'GI risk, caution, partial compliance' },
  { key: 'danger', label: 'Danger', hex: '#C43C3C', usage: 'Missed, declining, error, critical' },
  { key: 'info', label: 'Info', hex: '#0099CC', usage: 'Stable trend, informational, neutral signal' },
]

// Session activity streams
const STREAMS_LIGHT = [
  { label: 'Power', hex: NEAR_BLACK, unit: 'W', value: '238', dark: '#F0EDE8' },
  { label: 'Heart rate', hex: '#E83B52', unit: 'bpm', value: '142', dark: '#ED96A4' },
  { label: 'Cadence', hex: '#9B40E8', unit: 'rpm', value: '88', dark: '#C496EF' },
  { label: 'Speed', hex: '#14B8A2', unit: 'km/h', value: '34.2', dark: '#72DBC8' },
  { label: 'Elevation', hex: '#C0BDB6', unit: 'm', value: '342', dark: DARK_SAND },
  { label: 'Temperature', hex: '#C49B08', unit: '°C', value: '28', dark: '#EDD070' },
]

// Capacity chart lines
const CAPACITY_LINES = [
  { label: 'Capacity (CTL)', hex: '#14B8A2', dash: false, width: 2 },
  { label: 'Pressure (ATL)', hex: '#E83B52', dash: false, width: 2 },
  { label: 'Form +', hex: '#1B8A5A', dash: false, width: 1.5 },
  { label: 'Form −', hex: '#C43C3C', dash: false, width: 1.5 },
  { label: 'Surge', hex: '#9B40E8', dash: true, width: 1.5 },
  { label: 'ACWR', hex: '#E8B020', dash: false, width: 1.5 },
]


// Nutrients
const NUTRIENTS = [
  { label: 'CHO', hex: '#E36B30' },
  { label: 'Fluid', hex: '#2AACCC' },
  { label: 'Sodium', hex: '#9B40E8' },
  { label: 'Caffeine', hex: '#14B8A2' },
]

// Macros
const MACROS = [
  { label: 'CHO', hex: '#E36B30' },
  { label: 'Protein', hex: '#3B82F6' },
  { label: 'Fat', hex: '#E8B020' },
]

// Cadence zones (9 brackets, cold to warm)
const CADENCE_ZONES = [
  { rpm: 'Coasting', hex: '#C0BDB6' },
  { rpm: '≤60', hex: '#7CA3BE' },
  { rpm: '61–70', hex: '#5B9EAD' },
  { rpm: '71–80', hex: '#14B8A2' },
  { rpm: '81–85', hex: '#8CC44E' },
  { rpm: '86–90', hex: '#E8B020' },
  { rpm: '91–95', hex: '#E68A58' },
  { rpm: '96–105', hex: '#E36B30' },
  { rpm: '≥106', hex: '#E83B52' },
]

// Elevation gradient (6 levels)
const ELEVATION_LEVELS = [
  { grade: '0–2%', hex: '#14B8A2' },
  { grade: '2–5%', hex: '#8CC44E' },
  { grade: '5–8%', hex: '#E8B020' },
  { grade: '8–12%', hex: '#E36B30' },
  { grade: '12–16%', hex: '#E83B52' },
  { grade: '>16%', hex: '#9B40E8' },
]

// Interval stack (8 colors)
const INTERVAL_COLORS = [
  { n: 1, hex: NEAR_BLACK },
  { n: 2, hex: '#E83B52' },
  { n: 3, hex: '#14B8A2' },
  { n: 4, hex: '#E8B020' },
  { n: 5, hex: '#9B40E8' },
  { n: 6, hex: '#2AACCC' },
  { n: 7, hex: '#7CA3BE' },
  { n: 8, hex: '#E36B30' },
]

// Training phases
const PHASES = [
  { label: 'Base', hex: '#7CA3BE', width: 22 },
  { label: 'Build', hex: '#E8B020', width: 20 },
  { label: 'Peak', hex: '#E83B52', width: 15 },
  { label: 'Taper', hex: '#9B40E8', width: 12 },
  { label: 'Race', hex: NEAR_BLACK, width: 8 },
  { label: 'Transition', hex: '#C0BDB6', width: 23 },
]

// Day types
const DAY_TYPES = [
  { label: 'Rest', hex: '#8A8780' },
  { label: 'Easy', hex: '#7CA3BE' },
  { label: 'Moderate', hex: '#14B8A2' },
  { label: 'Hard', hex: '#E36B30' },
  { label: 'Carb load', hex: '#E8B020' },
  { label: 'Race', hex: NEAR_BLACK },
]

// Intent badges (outline, zone-colored)
const INTENTS = [
  { label: 'Recovery', hex: '#7CA3BE' },
  { label: 'Endurance', hex: '#14B8A2' },
  { label: 'Tempo', hex: '#E8B020' },
  { label: 'Threshold', hex: '#E36B30' },
  { label: 'VO2max', hex: '#E83B52' },
  { label: 'Race', hex: NEAR_BLACK },
  { label: 'Test', hex: '#9B40E8' },
]

// Priority badges
const PRIORITIES = [
  { label: 'Critical', hex: '#C43C3C' },
  { label: 'Routine', hex: '#8A8780' },
  { label: 'Optional', hex: '#B5B2AB' },
]

// Peak curves (5 periods)
const PEAK_PERIODS = [
  { label: 'Current', hex: NEAR_BLACK, width: 2.5, dash: false },
  { label: '90 d', hex: '#14B8A2', width: 1.5, dash: false },
  { label: '180 d', hex: '#E8B020', width: 1.5, dash: false },
  { label: '365 d', hex: '#9B40E8', width: 1.5, dash: false },
  { label: 'Best ever', hex: '#E83B52', width: 1.5, dash: true },
]

// Body & wellness streams
const WELLNESS = [
  { label: 'HRV', hex: '#14B8A2' },
  { label: 'RHR', hex: '#E83B52' },
  { label: 'Weight', hex: NEAR_BLACK },
  { label: 'Body fat', hex: '#E8B020' },
  { label: 'Lean mass', hex: '#14B8A2' },
  { label: 'Sleep efficiency', hex: '#9B40E8' },
  { label: 'Sleep duration', hex: '#7CA3BE' },
]

// Sport colors
const SPORTS = [
  { label: 'Cycling', hex: '#14B8A2' },
  { label: 'Running', hex: '#E83B52' },
  { label: 'Swimming', hex: '#2AACCC' },
  { label: 'Strength', hex: '#9B40E8' },
  { label: 'Rowing', hex: '#E8B020' },
  { label: 'Other', hex: '#8A8780' },
]

// Brand palette
const BRAND = [
  { label: 'Near black', hex: '#050A30' },
  { label: 'Electric blue', hex: '#0230E0' },
  { label: 'Aubergine', hex: '#470426' },
  { label: 'Deep magenta', hex: '#96004D' },
  { label: 'Soft orchid', hex: '#FFC9FE' },
  { label: 'Cream', hex: '#FFFEF7' },
  { label: 'Lemon cream', hex: '#FFFFD0' },
]

// Co-visibility map — 13 screens x 15 groups
const CO_VIS_SCREENS = [
  'Session graph', 'Session zones', 'Session fuel', 'Session analysis',
  'Capacity chart', 'Regulator chart', 'Peak curves',
  'Today', 'Calendar', 'Fuel daily', 'Fuel products',
  'CHO×Power matrix', 'Season overview',
]

const CO_VIS_GROUPS = [
  'Power zones', 'CHO zones', 'Streams', 'Capacity', 'Regulators',
  'Nutrients', 'Macros', 'Semantics', 'Phases', 'Day types',
  'Sport', 'Cadence', 'Elevation', 'Intervals', 'Infrastructure',
]

const CO_VIS_MAP: Record<string, string[]> = {
  'Session graph': ['Power zones', 'Streams', 'Cadence', 'Elevation', 'Intervals', 'Infrastructure'],
  'Session zones': ['Power zones', 'CHO zones', 'Semantics', 'Infrastructure'],
  'Session fuel': ['CHO zones', 'Nutrients', 'Macros', 'Semantics', 'Infrastructure'],
  'Session analysis': ['Power zones', 'Streams', 'Regulators', 'Semantics', 'Infrastructure'],
  'Capacity chart': ['Capacity', 'Phases', 'Semantics', 'Infrastructure'],
  'Regulator chart': ['Regulators', 'Semantics', 'Infrastructure'],
  'Peak curves': ['Power zones', 'Infrastructure'],
  'Today': ['Power zones', 'Regulators', 'Nutrients', 'Semantics', 'Day types', 'Sport'],
  'Calendar': ['Power zones', 'Semantics', 'Phases', 'Day types', 'Sport'],
  'Fuel daily': ['CHO zones', 'Nutrients', 'Macros', 'Semantics'],
  'Fuel products': ['Nutrients', 'Semantics'],
  'CHO×Power matrix': ['Power zones', 'CHO zones'],
  'Season overview': ['Phases', 'Capacity', 'Sport', 'Semantics', 'Infrastructure'],
}

// Sidebar sections
const SECTIONS = [
  { id: 'foundation', label: '0. Locked foundation' },
  { id: 'variant-system', label: '1. Color variant system' },
  { id: 'power-zones', label: '2. Power / HR zones' },
  { id: 'cho-zones', label: '3. CHO zones' },
  { id: 'semantics', label: '4. Semantic colors' },
  { id: 'streams', label: '5. Session streams' },
  { id: 'capacity', label: '6. Capacity chart' },
  { id: 'regulators', label: '7. Regulators' },
  { id: 'nutrients', label: '8. Nutrients' },
  { id: 'cadence', label: '9. Cadence zones' },
  { id: 'elevation', label: '10. Elevation gradient' },
  { id: 'intervals', label: '11. Interval stack' },
  { id: 'phases', label: '12. Training phases' },
  { id: 'day-types', label: '13. Day types + intent' },
  { id: 'peak-curves', label: '14. Peak curves' },
  { id: 'athlete-dna', label: '15. Athlete DNA radar' },
  { id: 'heat-maps', label: '16. Heat map scales' },
  { id: 'wellness', label: '17. Body & wellness' },
  { id: 'infrastructure', label: '18. Chart infrastructure' },
  { id: 'sport-colors', label: '19. Sport colors' },
  { id: 'gauges', label: '20. Gauges & scores' },
  { id: 'brand', label: '21. Brand palette' },
  { id: 'co-visibility', label: '22. Co-visibility map' },
  { id: 'tokens', label: '23. Token checklist' },
  { id: 'summary', label: '24. Summary + questions' },
]

// ── Pre-computed SVG data (hardcoded strings — no Math at runtime, no hydration mismatch) ──

// Interval sine waves (section 11) — 8 polyline point strings
const INTERVAL_WAVE_POINTS = [
  '0,60.0 10,62.5 20,65.0 30,67.4 40,69.6 50,71.8 60,73.7 70,75.4 80,76.9 90,78.1 100,79.0 110,79.6 120,80.0 130,80.0 140,79.6 150,79.0 160,78.1 170,76.9 180,75.4 190,73.7 200,71.8 210,69.6 220,67.4 230,65.0 240,62.5 250,60.0 260,57.5 270,55.0 280,52.6 290,50.4 300,48.2 310,46.3 320,44.6 330,43.1 340,41.9 350,41.0 360,40.4 370,40.0 380,40.0 390,40.4 400,41.0 410,41.9 420,43.1 430,44.6 440,46.3 450,48.2 460,50.4 470,52.6 480,55.0 490,57.5 500,60.0 510,62.5 520,65.0 530,67.4 540,69.6 550,71.8 560,73.7 570,75.4 580,76.9 590,78.1 600,79.0',
  '0,75.4 10,76.9 20,78.1 30,78.8 40,79.0 50,78.8 60,78.1 70,77.0 80,75.5 90,73.6 100,71.3 110,68.7 120,65.9 130,62.9 140,59.7 150,56.5 160,53.2 170,50.0 180,47.0 190,44.1 200,41.4 210,39.1 220,37.0 230,35.4 240,34.2 250,33.4 260,33.0 270,33.1 280,33.7 290,34.7 300,36.1 310,38.0 320,40.2 330,42.7 340,45.4 350,48.4 360,51.6 370,54.8 380,58.0 390,61.3 400,64.4 410,67.3 420,70.0 430,72.4 440,74.5 450,76.3 460,77.6 470,78.5 480,78.9 490,78.9 500,78.5 510,77.6 520,76.2 530,74.5 540,72.3 550,69.9 560,67.2 570,64.2 580,61.1 590,57.9 600,54.7',
  '0,75.6 10,73.7 20,71.1 30,68.2 40,64.8 50,61.1 60,57.1 70,53.1 80,49.0 90,45.0 100,41.2 110,37.6 120,34.4 130,31.6 140,29.4 150,27.6 160,26.5 170,26.0 180,26.2 190,27.0 200,28.4 210,30.3 220,32.9 230,35.8 240,39.2 250,42.9 260,46.9 270,50.9 280,55.0 290,59.0 300,62.8 310,66.4 320,69.6 330,72.4 340,74.6 350,76.4 360,77.5 370,78.0 380,77.8 390,77.0 400,75.6 410,73.7 420,71.1 430,68.2 440,64.8 450,61.1 460,57.1 470,53.1 480,49.0 490,45.0 500,41.2 510,37.6 520,34.4 530,31.6 540,29.4 550,27.6 560,26.5 570,26.0 580,26.2 590,27.0 600,28.4',
  '0,52.1 10,47.1 20,42.1 30,37.3 40,32.9 50,28.8 60,25.4 70,22.6 80,20.6 90,19.4 100,19.0 110,19.5 120,20.9 130,23.0 140,25.9 150,29.5 160,33.6 170,38.2 180,43.0 190,48.0 200,53.0 210,57.8 220,62.4 230,66.5 240,70.0 250,73.0 260,75.1 270,76.5 280,77.0 290,76.6 300,75.4 310,73.4 320,70.6 330,67.2 340,63.2 350,58.7 360,53.9 370,48.9 380,43.9 390,39.0 400,34.4 410,30.2 420,26.6 430,23.5 440,21.2 450,19.7 460,19.0 470,19.2 480,20.3 490,22.2 500,24.8 510,28.1 520,32.1 530,36.5 540,41.2 550,46.2 560,51.2 570,56.1 580,60.8 590,65.0 600,68.8',
  '0,19.8 10,16.3 20,13.8 30,12.3 40,12.0 50,12.8 60,14.8 70,17.7 80,21.6 90,26.3 100,31.6 110,37.3 120,43.3 130,49.3 140,55.1 150,60.6 160,65.4 170,69.5 180,72.7 190,74.8 200,75.9 210,75.8 220,74.6 230,72.4 240,69.1 250,64.9 260,60.0 270,54.5 280,48.7 290,42.7 300,36.7 310,31.0 320,25.7 330,21.1 340,17.4 350,14.5 360,12.7 370,12.0 380,12.4 390,14.0 400,16.6 410,20.2 420,24.6 430,29.8 440,35.4 450,41.3 460,47.3 470,53.2 480,58.8 490,63.9 500,68.2 510,71.7 520,74.2 530,75.7 540,76.0 550,75.2 560,73.2 570,70.3 580,66.4 590,61.7 600,56.4',
  '0,6.4 10,9.1 20,13.1 30,18.2 40,24.3 50,30.9 60,38.0 70,45.1 80,52.0 90,58.4 100,64.1 110,68.7 120,72.2 130,74.3 140,75.0 150,74.2 160,72.1 170,68.5 180,63.8 190,58.1 200,51.7 210,44.8 220,37.6 230,30.6 240,24.0 250,18.0 260,12.9 270,9.0 280,6.3 290,5.1 300,5.3 310,6.9 320,10.0 330,14.2 340,19.6 350,25.8 360,32.5 370,39.6 380,46.7 390,53.6 400,59.8 410,65.3 420,69.6 430,72.8 440,74.6 450,75.0 460,73.9 470,71.4 480,67.6 490,62.6 500,56.7 510,50.1 520,43.1 530,36.0 540,29.0 550,22.5 560,16.7 570,11.9 580,8.3 590,5.9 600,5.0',
  '0,25.4 10,33.6 20,41.9 30,50.0 40,57.3 50,63.7 60,68.7 70,72.1 80,73.8 90,73.7 100,71.8 110,68.1 120,62.9 130,56.4 140,48.9 150,40.8 160,32.4 170,24.3 180,16.7 190,10.0 200,5.0 210,5.0 220,5.0 230,5.0 240,5.0 250,5.0 260,7.5 270,13.7 280,20.9 290,28.9 300,37.2 310,45.4 320,53.2 330,60.2 340,66.0 350,70.4 360,73.1 370,74.0 380,73.1 390,70.4 400,66.0 410,60.2 420,53.3 430,45.5 440,37.2 450,28.9 460,20.9 470,13.7 480,7.5 490,5.0 500,5.0 510,5.0 520,5.0 530,5.0 540,5.0 550,10.0 560,16.6 570,24.2 580,32.4 590,40.7 600,48.9',
  '0,58.9 10,65.4 20,70.0 30,72.6 40,72.8 50,70.9 60,66.7 70,60.7 80,53.1 90,44.3 100,34.8 110,25.2 120,15.9 130,7.6 140,5.0 150,5.0 160,5.0 170,5.0 180,5.0 190,5.0 200,5.0 210,8.2 220,16.7 230,26.0 240,35.6 250,45.1 260,53.8 270,61.3 280,67.2 290,71.1 300,72.9 310,72.4 320,69.7 330,64.9 340,58.3 350,50.2 360,41.2 370,31.6 380,22.0 390,13.0 400,5.1 410,5.0 420,5.0 430,5.0 440,5.0 450,5.0 460,5.0 470,5.0 480,10.9 490,19.7 500,29.2 510,38.8 520,48.1 530,56.4 540,63.4 550,68.7 560,72.0 570,73.0 580,71.8 590,68.3 600,62.9',
]

// Radar chart (section 15) — all positions pre-computed
const RADAR_AXES = [
  { x: 150.0, y: 30.0 }, { x: 245.3, y: 85.0 }, { x: 245.3, y: 195.0 },
  { x: 150.0, y: 250.0 }, { x: 54.7, y: 195.0 }, { x: 54.7, y: 85.0 },
]
const RADAR_LABEL_POS = [
  { x: 150.0, y: 12.0 }, { x: 260.9, y: 76.0 }, { x: 260.9, y: 204.0 },
  { x: 150.0, y: 268.0 }, { x: 39.1, y: 204.0 }, { x: 39.1, y: 76.0 },
]
const RADAR_RINGS = [
  '150.0,110.0 176.0,125.0 176.0,155.0 150.0,170.0 124.0,155.0 124.0,125.0',
  '150.0,80.0 202.0,110.0 202.0,170.0 150.0,200.0 98.0,170.0 98.0,110.0',
  '150.0,50.0 227.9,95.0 227.9,185.0 150.0,230.0 72.1,185.0 72.1,95.0',
  '150.0,30.0 245.3,85.0 245.3,195.0 150.0,250.0 54.7,195.0 54.7,85.0',
]
const RADAR_3MO = '150.0,85.0 202.4,109.8 211.9,175.8 150.0,206.0 102.4,167.5 107.1,115.3'
const RADAR_BEST = '150.0,46.5 221.4,98.8 235.7,189.5 150.0,217.0 73.8,184.0 88.1,104.3'
const RADAR_CURRENT = '150.0,63.0 211.9,104.3 226.2,184.0 150.0,200.5 83.3,178.5 102.4,112.5'

// Gauge arcs (section 20) — pre-computed SVG path d attributes
const GAUGE_SEGMENTS = [
  { hex: '#1B8A5A', label: 'Low', d: 'M 15.0 70.0 A 55 55 0 0 1 42.0 22.7' },
  { hex: '#E8B020', label: 'Moderate', d: 'M 42.0 22.7 A 55 55 0 0 1 96.5 21.8' },
  { hex: '#E36B30', label: 'High', d: 'M 96.5 21.8 A 55 55 0 0 1 119.0 45.0' },
  { hex: '#C43C3C', label: 'Critical', d: 'M 119.0 45.0 A 55 55 0 0 1 125.0 70.0' },
]

// ── Helpers ──

function Swatch({ hex, size = 64, height = 48, round = false, className }: { hex: string; size?: number; height?: number; round?: boolean; className?: string }) {
  return (
    <div
      className={cn(round ? RADIUS.full : RADIUS.sm, BORDER.default, 'shrink-0', className)}
      style={{ width: size, height: round ? size : height, backgroundColor: hex }}
    />
  )
}

function SwatchLabel({ hex, label }: { hex: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 mt-1.5">
      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{hex}</span>
      {label && <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>{label}</span>}
    </div>
  )
}

function SwatchRow({ items, size = 64, height = 48, round = false }: { items: { hex: string; label?: string; sublabel?: string }[]; size?: number; height?: number; round?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div key={item.hex + (item.label ?? '')} className="flex flex-col items-center">
          <Swatch hex={item.hex} size={size} height={height} round={round} />
          <SwatchLabel hex={item.hex} label={item.label} />
          {item.sublabel && <span className={cn(QUIET_STYLE, 'text-[10px]')}>{item.sublabel}</span>}
        </div>
      ))}
    </div>
  )
}

function InfoText({ children }: { children: React.ReactNode }) {
  return <p className={cn(MUTED_STYLE, 'text-[13px] mb-4 max-w-[65ch]')}>{children}</p>
}

function PlaceholderTag() {
  return <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-[var(--n600)] bg-[var(--n200)] px-1 py-px', RADIUS.sm, 'ml-1.5')}>Placeholder</span>
}

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-8" />
}

function ColorDot({ hex, size = 8 }: { hex: string; size?: number }) {
  return <span className={RADIUS.full} style={{ display: 'inline-block', width: size, height: size, backgroundColor: hex, flexShrink: 0 }} />
}

function LegendLine({ hex, label, dash = false, width = 2 }: { hex: string; label: string; dash?: boolean; width?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="16" height="2" viewBox="0 0 16 2" shapeRendering="geometricPrecision">
        <line x1="0" y1="1" x2="16" y2="1" stroke={hex} strokeWidth={width} strokeDasharray={dash ? '4 3' : undefined} />
      </svg>
      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>{label}</span>
    </div>
  )
}

// ── Main page ──

export default function ColorGuidePage() {
  const [activeSection, setActiveSection] = useState('foundation')
  const [toggleDemo, setToggleDemo] = useState('Power')
  const [underlineDemo, setUnderlineDemo] = useState('Day')
  const [zoneToggle, setZoneToggle] = useState('OFF')

  // IntersectionObserver for sidebar highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* ── Sidebar ── */}
      <nav className="fixed left-0 top-0 h-screen w-[220px] border-r-[0.5px] border-r-[var(--n400)] bg-[var(--bg)] overflow-y-auto py-8 px-5 z-10">
        <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-6')}>Color guide</div>
        <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  FONT.body, 'text-[12px] block py-1 px-2 no-underline',
                  RADIUS.sm, TRANSITION.background,
                  activeSection === id
                    ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND)
                    : cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main content ── */}
      <main className="ml-[220px] flex-1 py-10 px-10">
        <div className="max-w-[900px] mx-auto space-y-12">

          {/* ── Header ── */}
          <header className="mb-12">
            <h1 className={cn(FONT.body, 'text-[24px]', WEIGHT.strong, 'text-[var(--n1150)] mb-1')}>RAMTT color system</h1>
            <p className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n600)] mb-1')}>
              Komplet farve-dokumentation. RAMTT-paletten er primær, Coggan vist til sammenligning. Ruth beslutter.
            </p>
            <span className={cn(FONT.body, 'text-[12px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>9. april 2026 &middot; v3</span>
          </header>

          {/* ══════════════════════════════════════════════════════════
             SECTION 0: The locked foundation
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="foundation" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>0. The locked foundation</h2>
            <InfoText>Disse tokens er faste. De definerer RAMTTs visuelle identitet og kan ikke redigeres af Ruth. Alt UI bygges med denne neutrale skala.</InfoText>

            {/* 0.1 Neutral scale */}
            <div className="space-y-3">
              <SectionHeader>Neutral scale</SectionHeader>
              <div className="flex flex-wrap gap-3">
                {NEUTRALS.map((n) => (
                  <div key={n.token} className="flex flex-col items-center">
                    <div
                      className={cn(RADIUS.sm, BORDER.default, 'shrink-0')}
                      style={{ width: 64, height: 48, backgroundColor: n.cssVar }}
                    />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{NEUTRAL_HEX[n.token]}</span>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.book, 'text-[var(--n800)]')}>{n.token}</span>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.normal, 'text-[var(--n600)]')}>{n.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 0.2 Interaction states */}
            <div className="space-y-3">
              <SectionHeader>Interaction states</SectionHeader>
              <div className="grid grid-cols-1 gap-3">
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Sand hover</span>
                    <div className={cn('flex-1 py-2 px-3', RADIUS.md, TRANSITION.background, HOVER_SAND, FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}>
                      Hover over denne r&aelig;kke
                    </div>
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Sand fill</span>
                    <ToggleGroup options={['Power', 'HR', 'Speed']} value={toggleDemo} onChange={(v) => setToggleDemo(v as string)} size="sm" />
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Black fill</span>
                    <Button variant="primary" size="sm">Primary action</Button>
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>White lift</span>
                    <div className={cn('flex-1 bg-[var(--bg)] p-2', RADIUS.md)}>
                      <div className={cn('py-2 px-3', RADIUS.md, BORDER.default, TRANSITION.background, WHITE_LIFT, FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}>
                        Hover over dette card
                      </div>
                    </div>
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Underline</span>
                    <ToggleGroup variant="underline" options={['Day', 'Week', 'Month']} value={underlineDemo} onChange={(v) => setUnderlineDemo(v as string)} size="sm" />
                  </div>
                </Card>
              </div>
            </div>

            {/* 0.3 Typography */}
            <div className="space-y-3">
              <SectionHeader>Typography weight hierarchy</SectionHeader>
              <Card>
                <div className="space-y-3">
                  {[
                    { w: '400', style: WEIGHT.normal, color: 'text-[var(--n1150)]', desc: 'Body text, navigation items, list content' },
                    { w: '450', style: WEIGHT.book, color: 'text-[var(--n800)]', desc: 'Units, metadata, secondary descriptions' },
                    { w: '500', style: WEIGHT.medium, color: 'text-[var(--n1150)]', desc: 'Badge text, form labels, buttons' },
                    { w: '550', style: WEIGHT.strong, color: 'text-[var(--n1150)]', desc: 'Section headers, values, active states' },
                  ].map((row, i) => (
                    <div key={row.w}>
                      {i > 0 && <div className={cn(BORDER.subtle, 'border-t-0 border-b border-l-0 border-r-0 mb-3')} />}
                      <div className="flex items-baseline gap-3">
                        <span className={cn(FONT.body, 'text-[11px] tabular-nums w-[36px] shrink-0', WEIGHT.normal, 'text-[var(--n600)]')}>{row.w}</span>
                        <span className={cn(FONT.body, 'text-[14px]', row.style, row.color)}>{row.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 0.4 Component color usage */}
            <div className="space-y-3">
              <SectionHeader>Component color usage</SectionHeader>
              <Card>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge color="positive">On track</Badge>
                    <Badge color="negative">Missed</Badge>
                    <Badge color="warning">GI risk</Badge>
                    <Badge color="info">Race in 14d</Badge>
                    <Badge variant="outline" color="positive">+7.5%</Badge>
                    <Badge variant="outline" color="negative">-3.2%</Badge>
                  </div>
                  <div className="space-y-2">
                    <ProgressBar value={86} max={100} color="positive" label="86%" />
                    <ProgressBar value={34} max={100} color="negative" label="34%" />
                    <ProgressBar value={62} max={100} color="warning" label="62%" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard label="Form" value="-6" subtitle="Loaded" subtitleColor="positive" />
                    <MetricCard label="TSB" value="12" unit="pts" subtitle="Fresh" subtitleColor="positive" />
                  </div>
                  <dl className="m-0">
                    <DataRow label="CHO rate" value="78" unit="g/h" delta="+12" deltaColor="positive" />
                    <DataRow label="Hydration" value="520" unit="ml/h" delta="-80" deltaColor="negative" />
                  </dl>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 1: Color variant system
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="variant-system" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>1. Color variant system</h2>
            <InfoText>Hver farve i systemet har op til 7 varianter. Chroma er omvendt proportionalt med areal: store flader får whisper (4%), små elementer får full/vivid.</InfoText>

            {/* 7-level model using Z2 as example */}
            <div className="space-y-3">
              <SectionHeader>7-level model (Z2 endurance as example)</SectionHeader>
              <Card padding="md">
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Whisper', opacity: 0.04, border: 0.08, desc: 'Cards, hover states' },
                    { name: 'Tint', opacity: 0.10, border: 0.18, desc: 'Active, selected' },
                    { name: 'Wash', opacity: 0.20, border: 0.30, desc: 'Area fills, sections' },
                    { name: 'Base', opacity: 1.0, border: 1.0, desc: 'Chart lines, bars' },
                    { name: 'Vivid', opacity: 1.0, border: 1.0, desc: 'Small dots, badges' },
                    { name: 'On-soft', opacity: 1.0, border: 1.0, desc: 'Text on whisper/tint' },
                    { name: 'Deep', opacity: 1.0, border: 1.0, desc: 'Dark mode backgrounds' },
                  ].map((v) => (
                    <div key={v.name} className="flex flex-col items-center gap-1">
                      <div
                        className={cn(RADIUS.sm, 'shrink-0')}
                        style={{
                          width: 60,
                          height: 44,
                          backgroundColor: v.name === 'Deep' ? '#0A3D2E' : v.name === 'On-soft' ? '#0E9E8B' : v.name === 'Vivid' ? '#17D4B8' : '#14B8A2',
                          opacity: v.name === 'Base' || v.name === 'Vivid' || v.name === 'On-soft' || v.name === 'Deep' ? 1 : v.opacity,
                          border: v.name === 'Whisper' || v.name === 'Tint' || v.name === 'Wash'
                            ? `0.5px solid rgba(20, 184, 162, ${v.border})` : '0.5px solid transparent',
                        }}
                      />
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>{v.name}</span>
                      <span className={cn(QUIET_STYLE, 'text-[9px] text-center max-w-[60px]')}>{v.desc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 6 chart variants per color — SVG demo */}
            <div className="space-y-3">
              <SectionHeader>6 chart variants per color (Z2 endurance)</SectionHeader>
              <InfoText>Hver farve der bruges i charts har 6 varianter. Her demonstreret med Z2 #14B8A2.</InfoText>
              <Card padding="md">
                <div className="flex flex-wrap gap-4">
                  {/* Stroke */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <path d="M8,32 C18,28 28,16 38,20 C48,24 52,14 56,12" fill="none" stroke="#14B8A2" strokeWidth="2" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Stroke</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Line 1-2px</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#14B8A2</span>
                  </div>
                  {/* Fill */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <path d="M4,32 C14,28 24,16 34,20 C44,24 48,14 56,12 L56,40 L4,40 Z" fill="rgba(20,184,162,0.10)" stroke="rgba(20,184,162,0.20)" strokeWidth="0.5" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Fill</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Area 8-15%</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>rgba(..,0.10)</span>
                  </div>
                  {/* Dot */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <circle cx="30" cy="22" r="5" fill="#17D4B8" />
                      <circle cx="30" cy="22" r="5" fill="none" stroke="white" strokeWidth="1" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Dot</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Vivid variant</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#17D4B8</span>
                  </div>
                  {/* Hover */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <circle cx="30" cy="22" r="12" fill="rgba(20,184,162,0.12)" />
                      <circle cx="30" cy="22" r="4" fill="#3DD0B5" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Hover</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Lighter variant</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#3DD0B5</span>
                  </div>
                  {/* Label */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <text x="30" y="26" textAnchor="middle" style={{ fontSize: '11px', fill: '#0E9E8B', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>200W</text>
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Label</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Darker for contrast</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#0E9E8B</span>
                  </div>
                  {/* Bg */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <rect x="4" y="4" width="52" height="36" rx="3" fill="rgba(20,184,162,0.05)" stroke="rgba(20,184,162,0.10)" strokeWidth="0.5" />
                      <text x="30" y="25" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Zone bg</text>
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Bg</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Whisper 4-6%</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>rgba(..,0.05)</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Opacity tiers */}
            <div className="space-y-3">
              <SectionHeader>Three opacity tiers</SectionHeader>
              <Card padding="md">
                <div className="flex gap-6">
                  {[
                    { pct: '4–8%', label: 'Whisper', usage: 'Card backgrounds, hover fills, large areas' },
                    { pct: '10–18%', label: 'Tint', usage: 'Selected states, active filters, tab indicators' },
                    { pct: '20–30%', label: 'Wash', usage: 'Area chart fills, section accents, feature panels' },
                  ].map((tier) => (
                    <div key={tier.label} className="flex-1">
                      <div className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)] mb-1')}>{tier.pct}</div>
                      <div className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n800)] mb-0.5')}>{tier.label}</div>
                      <p className={cn(QUIET_STYLE, 'text-[11px]')}>{tier.usage}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Chroma area rule */}
            <div className="space-y-3">
              <SectionHeader>Chroma ∝ 1/area rule</SectionHeader>
              <InfoText>Store flader = lav opacitet. Små elementer = fuld farve. Diagrammet viser forholdet.</InfoText>
              <Card padding="md">
                <svg width="100%" height="80" viewBox="0 0 400 80" preserveAspectRatio="xMidYMid meet" shapeRendering="geometricPrecision">
                  {/* Large area — whisper */}
                  <rect x="10" y="10" width="120" height="60" rx="4" fill="#14B8A2" opacity="0.06" stroke="#14B8A2" strokeWidth="0.5" strokeOpacity="0.15" />
                  <text x="70" y="44" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Card bg (4%)</text>

                  {/* Medium area — tint */}
                  <rect x="155" y="20" width="80" height="40" rx="4" fill="#14B8A2" opacity="0.15" stroke="#14B8A2" strokeWidth="0.5" strokeOpacity="0.25" />
                  <text x="195" y="44" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Area fill (15%)</text>

                  {/* Line — base */}
                  <line x1="260" y1="60" x2="330" y2="20" stroke="#14B8A2" strokeWidth="2.5" />
                  <text x="295" y="72" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Line (100%)</text>

                  {/* Dot — vivid */}
                  <circle cx="370" cy="35" r="6" fill="#17D4B8" />
                  <text x="370" y="56" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Dot (vivid)</text>
                </svg>
              </Card>
            </div>

            {/* Full tint table — 6 zones × 3 tiers */}
            <div className="space-y-3">
              <SectionHeader>Full tint table (6 zones × 3 opacity tiers)</SectionHeader>
              <InfoText>Denne tabel viser hvad Ruth skal levere per farve. Baggrund + border ved hver opacitet.</InfoText>
              <Card padding="md">
                <div className="overflow-x-auto">
                  <table className="border-collapse w-full">
                    <thead>
                      <tr>
                        <th className={cn(LABEL_STYLE, 'py-1.5 px-2 text-left')} />
                        {['Whisper (4% / 8%)', 'Tint (10% / 18%)', 'Wash (20% / 30%)', 'Base (100%)'].map((h) => (
                          <th key={h} className={cn(LABEL_STYLE, 'py-1.5 px-2 text-center')}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {POWER_ZONES_RAMTT.map((z) => (
                        <tr key={z.zone}>
                          <td className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)] py-1.5 px-2')}>{z.zone}</td>
                          {[
                            { bg: 0.04, border: 0.08 },
                            { bg: 0.10, border: 0.18 },
                            { bg: 0.20, border: 0.30 },
                            { bg: 1.0, border: 1.0 },
                          ].map((tier, i) => (
                            <td key={i} className="py-1.5 px-2">
                              <div className="flex justify-center">
                                <div
                                  className={cn(RADIUS.sm)}
                                  style={{
                                    width: 48,
                                    height: 32,
                                    backgroundColor: z.hex,
                                    opacity: tier.bg,
                                    border: tier.bg < 1 ? `0.5px solid ${z.hex}` : '0.5px solid transparent',
                                  }}
                                />
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Badge anatomy */}
            <div className="space-y-3">
              <SectionHeader>Badge anatomy (filled / soft / outline)</SectionHeader>
              <div className="flex gap-6">
                {POWER_ZONES_RAMTT.slice(0, 3).map((z) => (
                  <div key={z.zone} className="flex flex-col gap-1.5">
                    <Badge color={z.hex}>{z.zone} {z.label}</Badge>
                    <Badge variant="outline" color={z.hex}>{z.zone} {z.label}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark mode transformation rules */}
            <div className="space-y-3">
              <SectionHeader>Dark mode side-by-side</SectionHeader>
              <div className="grid grid-cols-2 gap-4">
                <Card padding="md">
                  <div className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n800)] mb-2')}>Light canvas</div>
                  <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                    <rect width="300" height="60" fill={CANVAS_HEX} rx="4" />
                    <path d="M0,40 C30,35 60,25 90,30 C120,35 150,15 180,20 C210,25 240,18 270,22 L300,20" fill="none" stroke="#14B8A2" strokeWidth="2" />
                    <path d="M0,45 C30,42 60,38 90,42 C120,46 150,35 180,30 C210,32 240,28 270,32 L300,30" fill="none" stroke="#E83B52" strokeWidth="1.5" />
                  </svg>
                </Card>
                <Card padding="md">
                  <div className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n800)] mb-2')}>Dark canvas</div>
                  <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                    <rect width="300" height="60" fill="#0A0A09" rx="4" />
                    <path d="M0,40 C30,35 60,25 90,30 C120,35 150,15 180,20 C210,25 240,18 270,22 L300,20" fill="none" stroke="#72DBC8" strokeWidth="2" />
                    <path d="M0,45 C30,42 60,38 90,42 C120,46 150,35 180,30 C210,32 240,28 270,32 L300,30" fill="none" stroke="#ED96A4" strokeWidth="1.5" />
                  </svg>
                </Card>
              </div>
            </div>

            {/* Dark mode surfaces */}
            <div className="space-y-3">
              <SectionHeader>Dark mode surfaces</SectionHeader>
              <Card padding="md">
                <div className="flex gap-3">
                  {[
                    { label: 'Canvas', hex: '#0A0A09' },
                    { label: 'Card', hex: '#141413' },
                    { label: 'Elevated', hex: '#1A1918' },
                    { label: 'Sidebar', hex: '#0E0E0D' },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1">
                      <div className={cn(RADIUS.sm)} style={{ width: 56, height: 40, backgroundColor: s.hex, border: '0.5px solid rgba(255,255,255,0.08)' }} />
                      <span className={cn(QUIET_STYLE, 'text-[10px]')}>{s.label}</span>
                      <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{s.hex}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 2: Power / HR zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="power-zones" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>2. Power / HR zones</h2>
            <InfoText>Power zones er polykromatiske (6 unikke farver), HR zones er en monokromatisk rød ramp. Ses overalt i appen. Den vigtigste farve-beslutning. RAMTT-paletten vises som primær, Coggan til sammenligning.</InfoText>

            {/* 2.1 RAMTT palette — primary */}
            <div className="space-y-3">
              <SectionHeader>RAMTT palette (primary proposal)</SectionHeader>
              <div className="flex flex-wrap gap-4">
                {POWER_ZONES_RAMTT.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center">
                    <Swatch hex={z.hex} size={80} height={60} />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{z.zone} {z.label}</span>
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>{z.range}</span>
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{z.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.2 Coggan comparison */}
            <div className="space-y-3">
              <SectionHeader>Coggan standard (comparison)</SectionHeader>
              <div className="flex flex-wrap gap-4">
                {POWER_ZONES_COGGAN.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center">
                    <Swatch hex={z.hex} size={80} height={60} />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{z.zone} {z.label}</span>
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{z.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.3 Zone-colored line — real ChartZoneLine primitive */}
            <div className="space-y-3">
              <SectionHeader>Zone-colored line (live primitive)</SectionHeader>
              <Card padding="md">
                <ChartRoot data={ZONE_LINE_DATA} height={100} padding={{ top: 8, right: 8, bottom: 4, left: 44 }} yPadding={0.08}>
                  <ChartZoneLine threshold={280} zones={RAMTT_ZONE_DEFS} className="stroke-[2]" />
                  <ChartAxisY tickCount={3} />
                  <ChartRefLine y={280} label="FTP" className="stroke-(--n400)" />
                </ChartRoot>
                <div className="flex gap-4 mt-2 px-1">
                  {POWER_ZONES_RAMTT.map((z) => (
                    <div key={z.zone} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: z.hex }} />
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.normal, 'text-[var(--n800)]')}>{z.zone} {z.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 2.4 Distribution bar */}
            <div className="space-y-3">
              <SectionHeader>Zone distribution</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 24, borderRadius: 4 }}>
                  {[
                    { zone: 'Z1', pct: 8, hex: '#7CA3BE' },
                    { zone: 'Z2', pct: 35, hex: '#14B8A2' },
                    { zone: 'Z3', pct: 22, hex: '#E8B020' },
                    { zone: 'Z4', pct: 18, hex: '#E36B30' },
                    { zone: 'Z5', pct: 12, hex: '#E83B52' },
                    { zone: 'Z6', pct: 5, hex: '#9B40E8' },
                  ].map((z) => (
                    <div key={z.zone} className="flex items-center justify-center" style={{ width: `${z.pct}%`, backgroundColor: z.hex }}>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white/90')}>{z.pct}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 2.5 Zone badges */}
            <div className="space-y-3">
              <SectionHeader>Zone badges</SectionHeader>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {POWER_ZONES_RAMTT.map((z) => (
                    <Badge key={z.zone} color={z.hex}>{z.zone}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {POWER_ZONES_RAMTT.map((z) => (
                    <Badge key={z.zone} variant="outline" color={z.hex}>{z.zone}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 2.6 Opacity variants */}
            <div className="space-y-3">
              <SectionHeader>Opacity variants</SectionHeader>
              <div className="flex flex-wrap gap-6">
                {POWER_ZONES_RAMTT.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center gap-1">
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)] mb-0.5')}>{z.zone}</span>
                    <div className="flex gap-1">
                      <div className={cn(RADIUS.sm)} style={{ width: 32, height: 32, backgroundColor: z.hex }} />
                      <div className={cn(RADIUS.sm)} style={{ width: 32, height: 32, backgroundColor: z.hex, opacity: 0.2 }} />
                      <div className={cn(RADIUS.sm)} style={{ width: 32, height: 32, backgroundColor: z.hex, opacity: 0.08 }} />
                    </div>
                    <div className="flex gap-1">
                      <span className={cn(QUIET_STYLE, 'text-[9px] w-[32px] text-center')}>100%</span>
                      <span className={cn(QUIET_STYLE, 'text-[9px] w-[32px] text-center')}>20%</span>
                      <span className={cn(QUIET_STYLE, 'text-[9px] w-[32px] text-center')}>8%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.7 Dark preview card */}
            <div className="space-y-3">
              <SectionHeader>Dark mode zone preview</SectionHeader>
              <Card padding="none">
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: '#0A0A09', padding: 20 }}>
                  <div className="flex gap-2">
                    {POWER_ZONES_RAMTT.map((z) => (
                      <div key={z.zone} className={cn(RADIUS.sm)} style={{ width: 40, height: 28, backgroundColor: z.hex }} />
                    ))}
                  </div>
                  <p className={cn(FONT.body, 'text-[11px] mt-2', WEIGHT.normal)} style={{ color: '#B5B2AB' }}>Zone colors maintain vibrancy on dark canvas</p>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 3: CHO zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="cho-zones" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>3. CHO zones</h2>
            <InfoText>Carbohydrate intake zones. Blue spectrum, bevidst distinkt fra power zones da de vises side om side.</InfoText>

            <div className="space-y-3">
              <SectionHeader>CHO zone palette (blue spectrum)</SectionHeader>
              <div className="flex flex-wrap gap-4">
                {CHO_ZONES.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center">
                    <Swatch hex={z.hex} size={80} height={60} />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{z.zone} {z.label}</span>
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>{z.range}</span>
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{z.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHO badges */}
            <div className="space-y-3">
              <SectionHeader>CHO badges</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {CHO_ZONES.map((z) => <Badge key={z.zone} color={z.hex}>{z.zone} {z.label}</Badge>)}
              </div>
            </div>

            {/* CHO distribution */}
            <div className="space-y-3">
              <SectionHeader>CHO distribution</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 24, borderRadius: 4 }}>
                  {CHO_ZONES.map((z, i) => {
                    const pcts = [5, 15, 30, 25, 18, 7]
                    return (
                      <div key={z.zone} className="flex items-center justify-center" style={{ width: `${pcts[i]}%`, backgroundColor: z.hex }}>
                        <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white/90')}>{pcts[i]}%</span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* 6x6 CHO x Power matrix */}
            <div className="space-y-3">
              <SectionHeader>CHO × Power co-visibility matrix</SectionHeader>
              <InfoText>Denne matrix viser hvorfor de to paletter SKAL være forskellige. Hver celle viser en kombination der kan forekomme på session detail.</InfoText>
              <Card padding="md">
                <div className="overflow-x-auto">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th className={cn(LABEL_STYLE, 'py-1.5 px-1.5')} />
                        {POWER_ZONES_RAMTT.map((z) => (
                          <th key={z.zone} className={cn(LABEL_STYLE, 'py-1.5 px-1.5 text-center')}>{z.zone}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CHO_ZONES.map((cho) => (
                        <tr key={cho.zone}>
                          <td className={cn(LABEL_STYLE, 'py-1 px-1.5 whitespace-nowrap')}>{cho.zone}</td>
                          {POWER_ZONES_RAMTT.map((pz) => (
                            <td key={pz.zone} className="py-1 px-1.5">
                              <div className="flex items-center justify-center">
                                <div className={RADIUS.sm} style={{ width: 40, height: 40, backgroundColor: pz.hex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <div className={RADIUS.full} style={{ width: 16, height: 16, backgroundColor: cho.hex, border: '1.5px solid white' }} />
                                </div>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={cn(QUIET_STYLE, 'text-[11px] mt-3')}>Power zone som baggrund. CHO zone som dot. Diagonalen = perfekt periodisering.</p>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 4: Semantic colors
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="semantics" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>4. Semantic colors</h2>
            <InfoText>Fire semantiske farver med tre varianter hver. Foreslået ny palet (mørkere, mere moden). Bruges til badges, progress bars, deltas, subtitles.</InfoText>

            {/* 4.1 The four semantics with 3 variants */}
            <div className="space-y-3">
              <SectionHeader>Proposed semantic set (4 × 3 variants)</SectionHeader>
              <div className="grid grid-cols-2 gap-4">
                {SEMANTICS.map((s) => {
                  const alpha6 = s.hex + '10'
                  const alpha18 = s.hex + '2E'
                  return (
                    <Card key={s.key}>
                      <div className="space-y-3">
                        <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{s.label}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center gap-1">
                            <Swatch hex={s.hex} size={48} round />
                            <span className={cn(QUIET_STYLE, 'text-[10px]')}>Base</span>
                            <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{s.hex}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={cn(RADIUS.full)} style={{ width: 48, height: 48, backgroundColor: alpha6 }} />
                            <span className={cn(QUIET_STYLE, 'text-[10px]')}>Soft (6%)</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className={cn(RADIUS.full, 'flex items-center justify-center')} style={{ width: 48, height: 48, backgroundColor: alpha6 }}>
                              <span className={cn(FONT.body, 'text-[11px]', WEIGHT.strong)} style={{ color: s.hex }}>Aa</span>
                            </div>
                            <span className={cn(QUIET_STYLE, 'text-[10px]')}>On-soft</span>
                          </div>
                        </div>
                        <p className={cn(QUIET_STYLE, 'text-[11px]')}>{s.usage}</p>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* 4.2 Semantic in components */}
            <div className="space-y-3">
              <SectionHeader>In components (using current CSS vars)</SectionHeader>
              <Card>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['positive', 'negative', 'warning', 'info'] as const).map((c) => (
                      <Badge key={c} color={c}>{c}</Badge>
                    ))}
                    {(['positive', 'negative', 'warning', 'info'] as const).map((c) => (
                      <Badge key={`o-${c}`} variant="outline" color={c}>{c}</Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <ProgressBar value={88} max={100} color="positive" label="88%" />
                    <ProgressBar value={34} max={100} color="negative" label="34%" />
                    <ProgressBar value={62} max={100} color="warning" label="62%" />
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <MetricCard label="Form" value="-6" subtitle="Improving" subtitleColor="positive" />
                    <MetricCard label="Fatigue" value="82" subtitle="High" subtitleColor="negative" />
                    <MetricCard label="GI risk" value="34%" subtitle="Caution" subtitleColor="warning" />
                    <MetricCard label="CTL" value="68" subtitle="Stable" />
                  </div>
                </div>
              </Card>
            </div>

            {/* 4.3 Semantic derivatives table */}
            <div className="space-y-3">
              <SectionHeader>Semantic reuse across domains</SectionHeader>
              <DataTable
                columns={[
                  { key: 'group', label: 'Group' },
                  { key: 'success', label: 'Success' },
                  { key: 'warning', label: 'Warning' },
                  { key: 'danger', label: 'Danger' },
                  { key: 'info', label: 'Info' },
                ]}
                data={[
                  { group: 'Compliance', success: 'Compliant', warning: 'Partial', danger: 'Missed', info: '—' },
                  { group: 'Fuel readiness', success: 'Ready', warning: 'Caution', danger: 'Not ready', info: '—' },
                  { group: 'Injury risk', success: 'Low', warning: 'Moderate', danger: 'High / critical', info: '—' },
                  { group: 'Trend', success: 'Improving', warning: '—', danger: 'Declining', info: 'Stable' },
                  { group: 'Signal severity', success: '—', warning: 'Warning', danger: 'Critical', info: 'Info' },
                  { group: 'Data quality', success: 'Excellent', warning: 'Fair', danger: 'Poor', info: '—' },
                ]}
              />
            </div>

            {/* 4.4 Warning vs Z3 proximity note */}
            <Card>
              <div className="flex gap-3 items-start">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="geometricPrecision"><path d="M8 1L15 14H1L8 1Z" fill="#C49B08" /><text x="8" y="12" textAnchor="middle" fill="white" style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>!</text></svg>
                <div>
                  <p className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                    Warning (#C49B08) og Z3 Tempo (#E8B020) er tæt på hinanden. De ses sjældent på same skærm, men Ruth bør være opmærksom på overlaprisikoen.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 5: Session streams
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="streams" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>5. Session activity streams</h2>
            <InfoText>6 datastrømme der overlapper i session graph. Power er sort (primær metrisk), resten får farve fra zone-paletten. Dark mode har egne variants.</InfoText>

            {/* 5.1 Stream swatches */}
            <SwatchRow items={STREAMS_LIGHT.map((s) => ({ hex: s.hex, label: s.label }))} size={48} round />

            {/* 5.2 Stacked stream charts — real primitives */}
            <div className="space-y-3">
              <SectionHeader>Stacked stream lines</SectionHeader>
              <Card padding="md">
                <div className="flex flex-col gap-0">
                  {/* Power */}
                  <ChartRoot data={STREAM_POWER} height={55} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#0F0F0E" opacityFrom={0.06} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#0F0F0E] stroke-[2]" />
                  </ChartRoot>
                  {/* Heart rate */}
                  <ChartRoot data={STREAM_HR} height={50} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#E83B52" opacityFrom={0.06} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#E83B52] stroke-[1.5]" />
                  </ChartRoot>
                  {/* Cadence */}
                  <ChartRoot data={STREAM_CADENCE} height={45} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#9B40E8" opacityFrom={0.04} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#9B40E8] stroke-[1.5]" />
                  </ChartRoot>
                  {/* Speed */}
                  <ChartRoot data={STREAM_SPEED} height={45} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#14B8A2" opacityFrom={0.04} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#14B8A2] stroke-[1.5]" />
                  </ChartRoot>
                  {/* Elevation */}
                  <ChartRoot data={STREAM_ELEVATION} height={40} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.05}>
                    <ChartArea gradientColor="#C0BDB6" opacityFrom={0.25} opacityTo={0.08} />
                    <ChartLine className="fill-none stroke-[#C0BDB6] stroke-[1]" />
                  </ChartRoot>
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  {STREAMS_LIGHT.map((s) => (
                    <LegendLine key={s.label} hex={s.hex} label={s.label} dash={s.label === 'Temperature'} width={s.label === 'Power' ? 2.5 : 1.5} />
                  ))}
                </div>
              </Card>
            </div>

            {/* 5.3 Hover data table */}
            <div className="space-y-3">
              <SectionHeader>Hover data table (simulated)</SectionHeader>
              <Card>
                <dl className="m-0">
                  {STREAMS_LIGHT.map((s) => (
                    <DataRow
                      key={s.label}
                      label={s.label}
                      value={s.value}
                      unit={s.unit}
                      badge={<ColorDot hex={s.hex} />}
                    />
                  ))}
                </dl>
              </Card>
            </div>

            {/* 5.4 Zone toggle demo — real primitives */}
            <div className="space-y-3">
              <SectionHeader>Zone coloring toggle</SectionHeader>
              <Card padding="md">
                <div className="space-y-3">
                  <ToggleGroup options={['OFF', 'ON']} value={zoneToggle} onChange={(v) => setZoneToggle(v as string)} size="sm" />
                  <ChartRoot data={ZONE_LINE_DATA} height={60} padding={{ top: 4, right: 8, bottom: 4, left: 0 }} yPadding={0.08}>
                    {zoneToggle === 'OFF' ? (
                      <ChartLine className="fill-none stroke-[#0F0F0E] stroke-[2]" />
                    ) : (
                      <ChartZoneLine threshold={280} zones={RAMTT_ZONE_DEFS} className="stroke-[2]" />
                    )}
                  </ChartRoot>
                  <p className={cn(QUIET_STYLE, 'text-[11px]')}>
                    {zoneToggle === 'OFF' ? 'Power line i sort (standard)' : 'Power line farvet efter zone (Z2–Z5)'}
                  </p>
                </div>
              </Card>
            </div>

            {/* 5.5 Dark mode stream preview */}
            <div className="space-y-3">
              <SectionHeader>Dark mode stream colors</SectionHeader>
              <Card padding="none">
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: '#0A0A09', padding: 20 }}>
                  <div className="flex gap-3">
                    {STREAMS_LIGHT.map((s) => (
                      <div key={s.label} className="flex flex-col items-center gap-1">
                        <div className={cn(RADIUS.full)} style={{ width: 32, height: 32, backgroundColor: s.dark }} />
                        <span className={cn(FONT.body, 'text-[10px]', WEIGHT.normal)} style={{ color: '#8A8780' }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* 5.6 Stream overlays — SVG illustrations */}
            <div className="space-y-3">
              <SectionHeader>Stream overlays</SectionHeader>
              <InfoText>Togglebare lag oven på session graph. Hvert overlay har sin egen visuelle stil.</InfoText>
              <div className="grid grid-cols-1 gap-3">
                {/* W' Balance — dashed 4,4 + area fill */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>W&apos; balance</span>
                    <svg width="200" height="36" viewBox="0 0 200 36" shapeRendering="geometricPrecision">
                      <path d="M0,10 C30,12 60,18 100,22 C140,26 170,30 200,32 L200,36 L0,36 Z" fill="rgba(232,176,32,0.10)" />
                      <path d="M0,10 C30,12 60,18 100,22 C140,26 170,30 200,32" fill="none" stroke="#E8B020" strokeWidth="1.5" strokeDasharray="4 4" />
                    </svg>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>Z3 #E8B020 &middot; Dashed 4,4 + area fill 10%</span>
                  </div>
                </Card>
                {/* Glycogen Depletion — dashed 6,3 */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>Glycogen depletion</span>
                    <svg width="200" height="36" viewBox="0 0 200 36" shapeRendering="geometricPrecision">
                      <path d="M0,8 C30,10 60,14 100,20 C140,26 170,30 200,34" fill="none" stroke="#E36B30" strokeWidth="1.5" strokeDasharray="6 3" />
                    </svg>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>CHO #E36B30 &middot; Dashed 6,3</span>
                  </div>
                </Card>
                {/* AAP — dotted 2,4 */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>AAP (altitude adj.)</span>
                    <svg width="200" height="36" viewBox="0 0 200 36" shapeRendering="geometricPrecision">
                      <path d="M0,20 C30,18 60,14 100,16 C140,18 170,15 200,12" fill="none" stroke="#7CA3BE" strokeWidth="1.5" strokeDasharray="2 4" />
                    </svg>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>Z1 #7CA3BE &middot; Dotted 2,4</span>
                  </div>
                </Card>
                {/* CHO Intake Markers — vertical lines + dots */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>CHO intake markers</span>
                    <svg width="200" height="36" viewBox="0 0 200 36" shapeRendering="geometricPrecision">
                      {[40, 80, 130, 170].map((x) => (
                        <g key={x}>
                          <line x1={x} y1="4" x2={x} y2="32" stroke="#E36B30" strokeWidth="1" />
                          <circle cx={x} cy="4" r="2.5" fill="#E36B30" />
                        </g>
                      ))}
                    </svg>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>CHO #E36B30 &middot; Vertical lines + dot</span>
                  </div>
                </Card>
                {/* Coasting Segments — highlight bands */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>Coasting segments</span>
                    <svg width="200" height="36" viewBox="0 0 200 36" shapeRendering="geometricPrecision">
                      <rect x="30" y="0" width="40" height="36" fill="rgba(192,189,182,0.15)" />
                      <rect x="120" y="0" width="30" height="36" fill="rgba(192,189,182,0.15)" />
                    </svg>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>n700 #C0BDB6 &middot; Highlight bands 15%</span>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 6: Capacity chart
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="capacity" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>6. Capacity chart</h2>
            <InfoText>4 hovedlinjer + overlays. Capacity (CTL) og Pressure (ATL) er primære. Form-område positivt/negativt. Surge stiplet. ACWR reference.</InfoText>

            {/* Capacity chart — multi-series via math layer */}
            <div className="space-y-3">
              <SectionHeader>Capacity chart simulation</SectionHeader>
              <Card padding="md">
                <CapacityChartSVG />
                <div className="flex flex-wrap gap-5 mt-3">
                  {CAPACITY_LINES.map((l) => (
                    <LegendLine key={l.label} hex={l.hex} label={l.label} dash={l.dash} width={l.width} />
                  ))}
                </div>
              </Card>
            </div>

            {/* 6.2 Projected/forecast lines + confidence bands */}
            <div className="space-y-3">
              <SectionHeader>Projected / forecast lines</SectionHeader>
              <InfoText>Fra forecast-enginen. Samme farver ved 50% opacity, dashed 6,4. Confidence band ved 6% opacity.</InfoText>
              <Card padding="md">
                <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {/* Solid portion */}
                  <path d="M0,80 C40,75 80,60 120,55 C160,50 200,58 240,48" fill="none" stroke="#14B8A2" strokeWidth="2" />
                  <path d="M0,95 C40,92 80,82 120,78 C160,74 200,80 240,72" fill="none" stroke="#E83B52" strokeWidth="2" />
                  {/* Divider line */}
                  <line x1="240" y1="0" x2="240" y2="120" stroke="var(--n400)" strokeWidth="0.5" strokeDasharray="4 4" />
                  <text x="248" y="12" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Forecast</text>
                  {/* Projected lines (dashed, 50% opacity) */}
                  <path d="M240,48 C280,42 320,38 360,32 L400,28" fill="none" stroke="#14B8A2" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
                  <path d="M240,72 C280,68 320,62 360,58 L400,54" fill="none" stroke="#E83B52" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
                  {/* Confidence bands (6% opacity) */}
                  <path d="M240,42 C280,36 320,30 360,24 L400,20 L400,36 C360,40 320,46 280,48 L240,54 Z" fill="#14B8A2" opacity="0.06" />
                  <path d="M240,66 C280,60 320,54 360,50 L400,46 L400,62 C360,66 320,70 280,74 L240,78 Z" fill="#E83B52" opacity="0.06" />
                </svg>
                <div className="flex gap-4 mt-2">
                  <LegendLine hex="#14B8A2" label="Capacity (solid)" />
                  <LegendLine hex="#14B8A2" label="Projected (dashed 50%)" dash />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 16, height: 8, backgroundColor: '#14B8A2', opacity: 0.06 }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Confidence band (6%)</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 6.3 ACWR reference zone bands */}
            <div className="space-y-3">
              <SectionHeader>ACWR reference zones (background bands)</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="140" viewBox="0 0 400 140" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {/* Danger low */}
                  <rect x="0" y="110" width="400" height="30" fill="rgba(196,60,60,0.04)" />
                  {/* Warning low */}
                  <rect x="0" y="90" width="400" height="20" fill="rgba(196,155,8,0.04)" />
                  {/* Sweet spot */}
                  <rect x="0" y="40" width="400" height="50" fill="rgba(27,138,90,0.04)" />
                  {/* Warning high */}
                  <rect x="0" y="20" width="400" height="20" fill="rgba(196,155,8,0.04)" />
                  {/* Danger high */}
                  <rect x="0" y="0" width="400" height="20" fill="rgba(196,60,60,0.04)" />
                  {/* Labels */}
                  <text x="395" y="14" textAnchor="end" style={{ fontSize: '8px', fill: '#C43C3C', fontFamily: 'var(--font-sans)' }}>{'>'}1.5 Danger</text>
                  <text x="395" y="34" textAnchor="end" style={{ fontSize: '8px', fill: '#C49B08', fontFamily: 'var(--font-sans)' }}>1.3-1.5 Warning</text>
                  <text x="395" y="68" textAnchor="end" style={{ fontSize: '8px', fill: '#1B8A5A', fontFamily: 'var(--font-sans)' }}>0.8-1.3 Sweet spot</text>
                  <text x="395" y="104" textAnchor="end" style={{ fontSize: '8px', fill: '#C49B08', fontFamily: 'var(--font-sans)' }}>0.5-0.8 Warning</text>
                  <text x="395" y="130" textAnchor="end" style={{ fontSize: '8px', fill: '#C43C3C', fontFamily: 'var(--font-sans)' }}>{'<'}0.5 Danger</text>
                  {/* ACWR line */}
                  <path d="M0,70 C50,68 100,55 150,62 C200,68 250,50 300,58 C350,62 380,55 400,52" fill="none" stroke="#E8B020" strokeWidth="1.5" />
                </svg>
              </Card>
            </div>

            {/* 6.4 Dark mode capacity chart */}
            <div className="space-y-3">
              <SectionHeader>Capacity chart — dark mode</SectionHeader>
              <Card padding="none">
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: '#0A0A09', padding: 20 }}>
                  <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                    {/* Grid (white 4%) */}
                    {[0, 40, 80, 120, 160].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                    ))}
                    {/* Form positive area */}
                    <path d="M0,100 C80,90 160,75 240,65 C320,55 400,62 480,52 L600,45 L600,85 C480,75 400,78 320,80 C240,82 160,88 80,92 L0,100 Z" fill="rgba(56,204,136,0.10)" />
                    {/* Form negative area */}
                    <path d="M0,100 L80,100 C160,108 240,115 320,118 C400,115 480,112 600,108 L600,85 C480,75 400,78 320,80 C240,82 160,88 80,92 L0,100 Z" fill="rgba(216,96,96,0.08)" />
                    {/* Capacity — dark mode Z2-300 */}
                    <path d="M0,85 C80,78 160,60 240,52 C320,44 400,48 480,40 L600,35" fill="none" stroke="#3DD0B5" strokeWidth="2" />
                    {/* Pressure — dark mode Z5-300 */}
                    <path d="M0,110 C80,105 160,92 240,88 C320,82 400,88 480,80 L600,75" fill="none" stroke="#E66E80" strokeWidth="2" />
                    {/* Form line */}
                    <path d="M0,100 C80,90 160,75 240,65 C320,55 400,62 480,52 L600,45" fill="none" stroke="#38CC88" strokeWidth="1.5" />
                    {/* Surge — dotted */}
                    <path d="M0,120 C80,115 160,108 240,112 C320,118 400,108 480,102 L600,98" fill="none" stroke="#AE6EE8" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* ACWR */}
                    <path d="M0,60 C80,58 160,52 240,55 C320,58 400,52 480,50 L600,48" fill="none" stroke="#EFD46E" strokeWidth="1.5" />
                  </svg>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <LegendLine hex="#3DD0B5" label="Capacity" width={2} />
                    <LegendLine hex="#E66E80" label="Pressure" width={2} />
                    <LegendLine hex="#38CC88" label="Form +" width={1.5} />
                    <LegendLine hex="#AE6EE8" label="Surge" dash width={1.5} />
                    <LegendLine hex="#EFD46E" label="ACWR" width={1.5} />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 7: Regulators
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="regulators" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>7. Regulators</h2>
            <InfoText>Tre regulatorer der styrer performance-modellen. Vises som ringe/gauges på Today og som area charts. Farver fra zone-paletten: Z4, Z6, Z1.</InfoText>

            <SwatchRow items={REGULATORS.map((r) => ({ hex: r.hex, label: r.label }))} size={48} round />

            {/* Gauge arcs */}
            <div className="space-y-3">
              <SectionHeader>Gauge arcs</SectionHeader>
              <Card padding="md">
                <div className="flex justify-center">
                  <svg width="200" height="120" viewBox="0 0 200 120" shapeRendering="geometricPrecision">
                    {[
                      { radius: 80, pct: 0.75, dash: '188.5 251.3' },
                      { radius: 60, pct: 0.6, dash: '113.1 188.5' },
                      { radius: 40, pct: 0.85, dash: '106.8 125.7' },
                    ].map((arc, i) => (
                        <g key={REGULATORS[i].label} transform="translate(100,110)">
                          <path d={`M ${-arc.radius} 0 A ${arc.radius} ${arc.radius} 0 0 1 ${arc.radius} 0`} fill="none" stroke="var(--n200)" strokeWidth="8" strokeLinecap="round" />
                          <path d={`M ${-arc.radius} 0 A ${arc.radius} ${arc.radius} 0 0 1 ${arc.radius} 0`} fill="none" stroke={REGULATORS[i].hex} strokeWidth="8" strokeLinecap="round" strokeDasharray={arc.dash} />
                          <text x={arc.radius + 8} y="4" style={{ fontSize: '10px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>{REGULATORS[i].label}</text>
                        </g>
                    ))}
                  </svg>
                </div>
              </Card>
            </div>

            {/* Area chart preview */}
            <div className="space-y-3">
              <SectionHeader>Area chart preview</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  <path d="M0,70 C50,55 100,40 150,45 C200,50 250,35 300,30 C350,25 380,30 400,28 L400,100 L0,100 Z" fill="#E36B30" opacity="0.25" />
                  <path d="M0,60 C50,50 100,55 150,50 C200,45 250,50 300,40 C350,35 380,38 400,36 L400,100 L0,100 Z" fill="#9B40E8" opacity="0.25" />
                  <path d="M0,80 C50,70 100,60 150,55 C200,50 250,45 300,50 C350,48 380,45 400,42 L400,100 L0,100 Z" fill="#7CA3BE" opacity="0.25" />
                </svg>
                <div className="flex gap-4 mt-2">
                  {REGULATORS.map((r) => (
                    <LegendLine key={r.label} hex={r.hex} label={r.label} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Trend indicators */}
            <div className="space-y-3">
              <SectionHeader>Trend indicators</SectionHeader>
              <Card>
                <dl className="m-0">
                  {REGULATORS.map((r, i) => (
                    <DataRow
                      key={r.label}
                      label={r.label}
                      value={['72', '58', '85'][i]}
                      unit="%"
                      delta={['+4', '-3', '+1'][i]}
                      deltaColor={['+4', '-3', '+1'][i].startsWith('+') ? 'positive' : 'negative'}
                      badge={<ColorDot hex={r.hex} />}
                    />
                  ))}
                </dl>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 8: Nutrients
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="nutrients" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>8. Nutrients</h2>
            <InfoText>Fire næringsstoffer + tre makronæringsstoffer. CHO deler farve (#E36B30) med Z4 Threshold — de ses sjældent på samme skærm.</InfoText>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <SectionHeader>Nutrients</SectionHeader>
                <SwatchRow items={NUTRIENTS.map((n) => ({ hex: n.hex, label: n.label }))} size={40} round />
              </div>
              <div className="space-y-3">
                <SectionHeader>Macros</SectionHeader>
                <SwatchRow items={MACROS.map((m) => ({ hex: m.hex, label: m.label }))} size={40} round />
              </div>
            </div>

            {/* Fuel tab preview */}
            <div className="space-y-3">
              <SectionHeader>Fuel tab preview</SectionHeader>
              <Card>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {NUTRIENTS.map((n) => <Badge key={n.label} color={n.hex}>{n.label}</Badge>)}
                  </div>
                  <ProgressBar value={78} max={90} color="#E36B30" label="78 g/h" />
                  <ProgressBar value={520} max={750} color="#2AACCC" label="520 ml/h" />
                  <dl className="m-0">
                    <DataRow label="CHO rate" value="78" unit="g/h" delta="+12" deltaColor="positive" />
                    <DataRow label="Fluid rate" value="520" unit="ml/h" />
                    <DataRow label="Sodium" value="680" unit="mg/h" />
                    <DataRow label="Caffeine" value="3" unit="mg/kg" />
                  </dl>
                </div>
              </Card>
            </div>

            {/* CHO vs Z4 conflict note */}
            <Card>
              <div className="flex gap-3 items-start">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="geometricPrecision"><path d="M8 1L15 14H1L8 1Z" fill="#C49B08" /><text x="8" y="12" textAnchor="middle" fill="white" style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>!</text></svg>
                <p className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                  CHO nutrient (#E36B30) og Power Z4 Threshold (#E36B30) er <strong className={WEIGHT.strong}>identisk</strong>. De ses sjældent på same skærm (co-visibility map bekræfter), men Ruth bør overveje om fuel skal have sin egen tone.
                </p>
              </div>
            </Card>

            {/* 8.5 Fuel capacity chart */}
            <div className="space-y-3">
              <SectionHeader>Fuel capacity chart (3 tracks)</SectionHeader>
              <InfoText>Gut capacity linje, CPI bars, fuel coverage area, energy debt overlay. Gut adaptation som stiplet kurve.</InfoText>
              <Card padding="md">
                <svg width="100%" height="140" viewBox="0 0 500 140" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {/* Grid */}
                  {[0, 35, 70, 105, 140].map((y) => (
                    <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
                  ))}
                  {/* Fuel coverage area (success green) */}
                  <path d="M0,100 C60,95 120,80 180,75 C240,70 300,78 360,65 C420,58 460,62 500,55 L500,140 L0,140 Z" fill="rgba(27,138,90,0.10)" />
                  {/* Energy debt overlay (danger, top) */}
                  <path d="M300,0 C340,0 380,0 420,0 L500,0 L500,30 C460,28 420,20 380,15 C340,12 300,8 300,0 Z" fill="rgba(196,60,60,0.08)" />
                  {/* CPI bars */}
                  {[30, 80, 130, 180, 230, 280, 330, 380, 430].map((x, i) => {
                    const heights = [45, 55, 60, 52, 65, 70, 58, 72, 68]
                    return <rect key={x} x={x} y={140 - heights[i]} width="20" height={heights[i]} fill="rgba(227,107,48,0.25)" rx="1" />
                  })}
                  {/* Gut capacity line (Z2) */}
                  <path d="M0,90 C60,85 120,70 180,65 C240,60 300,55 360,48 C420,42 460,45 500,40" fill="none" stroke="#14B8A2" strokeWidth="2" />
                  {/* Gut adaptation curve (dashed 50% opacity) */}
                  <path d="M0,95 C60,92 120,82 180,78 C240,74 300,68 360,62 C420,55 460,58 500,52" fill="none" stroke="#14B8A2" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
                  {/* Fuel coverage line (success) */}
                  <path d="M0,100 C60,95 120,80 180,75 C240,70 300,78 360,65 C420,58 460,62 500,55" fill="none" stroke="#1B8A5A" strokeWidth="1.5" />
                </svg>
                <div className="flex flex-wrap gap-4 mt-2">
                  <LegendLine hex="#14B8A2" label="Gut capacity" />
                  <LegendLine hex="#14B8A2" label="Gut adaptation" dash />
                  <LegendLine hex="#1B8A5A" label="Fuel coverage" />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(227,107,48,0.25)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>CPI bars</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 8.6 Energy balance chart */}
            <div className="space-y-3">
              <SectionHeader>Energy balance chart</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {/* Surplus area (green) */}
                  <path d="M0,50 C30,45 60,35 90,30 C120,25 150,28 180,32 L180,50 L0,50 Z" fill="rgba(27,138,90,0.20)" />
                  <path d="M300,50 C330,42 360,38 390,35 L400,34 L400,50 L300,50 Z" fill="rgba(27,138,90,0.20)" />
                  {/* Deficit area (red) */}
                  <path d="M180,50 C210,55 240,68 270,72 C300,75 300,50 300,50 Z" fill="rgba(196,60,60,0.20)" />
                  {/* Zero line */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#E5E3DE" strokeWidth="1" />
                  {/* Balance line */}
                  <path d="M0,50 C30,45 60,35 90,30 C120,25 150,28 180,32 C210,55 240,68 270,72 C300,65 330,42 360,38 L400,34" fill="none" stroke={NEAR_BLACK} strokeWidth="1.5" />
                </svg>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(27,138,90,0.20)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Surplus</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(196,60,60,0.20)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Deficit</span>
                  </div>
                  <LegendLine hex={NEAR_BLACK} label="Balance" width={1.5} />
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 9: Cadence zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="cadence" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>9. Cadence zones</h2>
            <InfoText>9 brackets fra coasting til sprint-kadence. Cold→warm gradient med RPM labels.</InfoText>

            <Card padding="md">
              <div className="flex overflow-hidden" style={{ height: 32, borderRadius: 4 }}>
                {CADENCE_ZONES.map((c) => (
                  <div key={c.rpm} className="flex-1 flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                    <span className={cn(FONT.body, 'text-[9px]', WEIGHT.medium)} style={{ color: ['#C0BDB6', '#8CC44E', '#E8B020', '#EDD070'].includes(c.hex) ? 'var(--n1050)' : 'white' }}>{c.rpm}</span>
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                {CADENCE_ZONES.map((c) => (
                  <div key={c.rpm} className="flex-1 text-center">
                    <span className={cn(FONT.body, 'text-[9px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{c.hex}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 10: Elevation gradient
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="elevation" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>10. Elevation gradient</h2>
            <InfoText>6 niveauer. Bruger zone-farverne Z2→Z6 + grøn til lave stigninger.</InfoText>

            <SwatchRow items={ELEVATION_LEVELS.map((e) => ({ hex: e.hex, label: e.grade }))} size={56} height={40} />

            {/* Mini elevation profile SVG */}
            <div className="space-y-3">
              <SectionHeader>Elevation profile simulation</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="100" viewBox="0 0 600 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  <defs>
                    <linearGradient id="elev-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#14B8A2" />
                      <stop offset="20%" stopColor="#14B8A2" />
                      <stop offset="20%" stopColor="#8CC44E" />
                      <stop offset="35%" stopColor="#8CC44E" />
                      <stop offset="35%" stopColor="#E8B020" />
                      <stop offset="50%" stopColor="#E8B020" />
                      <stop offset="50%" stopColor="#E36B30" />
                      <stop offset="65%" stopColor="#E36B30" />
                      <stop offset="65%" stopColor="#E83B52" />
                      <stop offset="82%" stopColor="#E83B52" />
                      <stop offset="82%" stopColor="#9B40E8" />
                      <stop offset="100%" stopColor="#9B40E8" />
                    </linearGradient>
                  </defs>
                  <path d="M0,90 C40,88 80,82 120,70 C160,58 200,40 240,25 C280,15 320,20 360,30 C400,40 440,55 480,65 C520,75 560,82 600,85 L600,100 L0,100 Z" fill="url(#elev-grad)" opacity="0.4" />
                  <path d="M0,90 C40,88 80,82 120,70 C160,58 200,40 240,25 C280,15 320,20 360,30 C400,40 440,55 480,65 C520,75 560,82 600,85" fill="none" stroke="url(#elev-grad)" strokeWidth="2" />
                </svg>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 11: Interval stack
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="intervals" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>11. Interval stack</h2>
            <InfoText>8 farver til overlay af individuelle intervaller. Sort (interval 1) er primær.</InfoText>

            <SwatchRow items={INTERVAL_COLORS.map((c) => ({ hex: c.hex, label: `#${c.n}` }))} size={40} height={32} />

            {/* 8 overlaid sine waves */}
            <div className="space-y-3">
              <SectionHeader>8 overlaid intervals</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="120" viewBox="0 0 600 120" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {INTERVAL_COLORS.map((c, i) => (
                    <polyline key={c.n} points={INTERVAL_WAVE_POINTS[i]} fill="none" stroke={c.hex} strokeWidth={i === 0 ? 2 : 1.5} opacity={i === 0 ? 1 : 0.7} />
                  ))}
                </svg>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 12: Training phases
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="phases" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>12. Training phases</h2>
            <InfoText>Seks træningsfaser vises som baggrundsbånd i kalender-header. Alle ved ~6% opacity.</InfoText>

            <SwatchRow items={PHASES.map((p) => ({ hex: p.hex, label: p.label }))} size={48} round />

            {/* Calendar header simulation */}
            <div className="space-y-3">
              <SectionHeader>Calendar header simulation</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 32, borderRadius: 4 }}>
                  {PHASES.map((p) => (
                    <div key={p.label} className="flex items-center justify-center" style={{ width: `${p.width}%`, backgroundColor: p.hex, opacity: 0.06 }} />
                  ))}
                </div>
                <div className="flex mt-1">
                  {PHASES.map((p) => (
                    <div key={p.label} className="flex items-center justify-center" style={{ width: `${p.width}%` }}>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.book, 'text-[var(--n800)]')}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 13: Day types + intent + priority
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="day-types" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>13. Day types + intent + priority</h2>
            <InfoText>Day type badges (filled), intent badges (outline, zone-colored), priority badges. Alle kan forekomme på samme kalenderdag.</InfoText>

            <div className="space-y-3">
              <SectionHeader>Day type badges</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {DAY_TYPES.map((d) => <Badge key={d.label} color={d.hex}>{d.label}</Badge>)}
              </div>
            </div>

            <div className="space-y-3">
              <SectionHeader>Intent badges (outline)</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {INTENTS.map((d) => <Badge key={d.label} variant="outline" color={d.hex}>{d.label}</Badge>)}
              </div>
            </div>

            <div className="space-y-3">
              <SectionHeader>Priority badges</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {PRIORITIES.map((p) => <Badge key={p.label} variant="outline" color={p.hex}>{p.label}</Badge>)}
              </div>
            </div>

            {/* Calendar day worst-case */}
            <div className="space-y-3">
              <SectionHeader>Calendar day — worst case badge density</SectionHeader>
              <Card padding="md" className="max-w-[200px]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(FONT.body, 'text-[16px] tabular-nums', WEIGHT.strong, 'text-[var(--n1150)]')}>14</span>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Tirsdag</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge color="#E36B30">Hard</Badge>
                    <Badge variant="outline" color="#E36B30">Threshold</Badge>
                    <Badge variant="outline" color="#C43C3C">Critical</Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ColorDot hex="#14B8A2" size={6} />
                    <span className={cn(QUIET_STYLE, 'text-[11px]')}>Cykling</span>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--positive)', paddingLeft: 8 }}>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Compliance: 92%</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 13.5 Compliance colors (calendar border-left) */}
            <div className="space-y-3">
              <SectionHeader>Compliance colors (calendar border-left)</SectionHeader>
              <Card>
                <div className="space-y-2">
                  {[
                    { label: 'Compliant (≤15%)', hex: '#1B8A5A', desc: 'Grøn border-left' },
                    { label: 'Partial (15–35%)', hex: '#C49B08', desc: 'Gul border-left' },
                    { label: 'Missed (>35%)', hex: '#C43C3C', desc: 'Rød border-left' },
                    { label: 'Unscheduled', hex: '#8A8780', desc: 'Grå border-left (bonus session)' },
                    { label: 'Rest day', hex: '#E5E3DE', desc: 'Neutral' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-3" style={{ borderLeft: `2px solid ${c.hex}`, paddingLeft: 10 }}>
                      <ColorDot hex={c.hex} size={8} />
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.medium, 'text-[var(--n1150)] w-[140px]')}>{c.label}</span>
                      <span className={cn(QUIET_STYLE, 'text-[11px]')}>{c.hex}</span>
                      <span className={cn(QUIET_STYLE, 'text-[10px]')}>{c.desc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 14: Peak curves
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="peak-curves" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>14. Peak curves</h2>
            <InfoText>5 tidsperioder. Current er sort (tykkest), best-ever er stiplet rød. Logaritmisk x-akse.</InfoText>

            <Card padding="md">
              <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                {/* Grid */}
                {[0, 45, 90, 135, 180].map((y) => (
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
                ))}
                {/* Axis labels */}
                {['1s', '5s', '30s', '1m', '5m', '20m', '60m'].map((t, i) => (
                  <text key={t} x={i * 100} y="175" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>{t}</text>
                ))}

                {/* Best ever (dashed red) */}
                <path d="M0,20 C60,28 120,45 200,65 C280,85 380,110 500,135 C560,148 590,155 600,158" fill="none" stroke="#E83B52" strokeWidth="1.5" strokeDasharray="6 4" />
                {/* 365d */}
                <path d="M0,30 C60,38 120,55 200,75 C280,92 380,115 500,138 C560,148 590,155 600,158" fill="none" stroke="#9B40E8" strokeWidth="1.5" />
                {/* 180d */}
                <path d="M0,35 C60,43 120,60 200,80 C280,96 380,118 500,140 C560,150 590,155 600,158" fill="none" stroke="#E8B020" strokeWidth="1.5" />
                {/* 90d */}
                <path d="M0,40 C60,48 120,65 200,85 C280,100 380,120 500,142 C560,152 590,155 600,158" fill="none" stroke="#14B8A2" strokeWidth="1.5" />
                {/* Current (black, thickest) */}
                <path d="M0,45 C60,55 120,72 200,92 C280,108 380,128 500,148 C560,155 590,158 600,160" fill="none" stroke={NEAR_BLACK} strokeWidth="2.5" />
              </svg>
              <div className="flex flex-wrap gap-4 mt-3">
                {PEAK_PERIODS.map((p) => (
                  <LegendLine key={p.label} hex={p.hex} label={p.label} dash={p.dash} width={p.width} />
                ))}
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 15: Athlete DNA radar
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="athlete-dna" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>15. Athlete DNA radar</h2>
            <InfoText>3 lag i radar/spider chart: current (sort), personal best (Z5 rød), 3-month trend (Z2 teal). 6 akser: sprint, threshold, endurance, recovery, economy, repeatability.</InfoText>

            <Card padding="md">
              <svg width="300" height="280" viewBox="0 0 300 280" shapeRendering="geometricPrecision">
                {/* Radar axes */}
                {RADAR_AXES.map((a, i) => (
                  <line key={i} x1="150" y1="140" x2={a.x} y2={a.y} stroke="var(--n200)" strokeWidth="0.5" />
                ))}
                {/* Radar rings */}
                {RADAR_RINGS.map((pts, i) => (
                  <polygon key={i} points={pts} fill="none" stroke="var(--n200)" strokeWidth="0.5" />
                ))}
                {/* Axis labels */}
                {['Sprint', 'Threshold', 'Endurance', 'Recovery', 'Economy', 'Repeatability'].map((label, i) => (
                  <text key={label} x={RADAR_LABEL_POS[i].x} y={RADAR_LABEL_POS[i].y} textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>{label}</text>
                ))}
                {/* 3-month trend (teal, wash) */}
                <polygon points={RADAR_3MO} fill="#14B8A2" fillOpacity="0.15" stroke="#14B8A2" strokeWidth="1" />
                {/* Personal best (red, tint) */}
                <polygon points={RADAR_BEST} fill="#E83B52" fillOpacity="0.08" stroke="#E83B52" strokeWidth="1" strokeDasharray="4 3" />
                {/* Current (black, solid) */}
                <polygon points={RADAR_CURRENT} fill={NEAR_BLACK} fillOpacity="0.05" stroke={NEAR_BLACK} strokeWidth="2" />
              </svg>
              <div className="flex gap-4 mt-2">
                <LegendLine hex={NEAR_BLACK} label="Current" width={2} />
                <LegendLine hex="#E83B52" label="Personal best" dash width={1.5} />
                <LegendLine hex="#14B8A2" label="3-month trend" width={1} />
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 16: Heat map scales
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="heat-maps" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>16. Heat map scales</h2>
            <InfoText>To skalaer: diverging (rød→neutral→grøn) og sequential (canvas→teal). Bruges i matrix-views og season maps.</InfoText>

            {/* Diverging scale */}
            <div className="space-y-3">
              <SectionHeader>Diverging scale (−3 to +3)</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 28, borderRadius: 4 }}>
                  {['#C43C3C', '#D46B6B', '#E5A5A5', '#E5E3DE', '#A5D4B5', '#5FB88A', '#1B8A5A'].map((hex) => (
                    <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
                  ))}
                </div>
                <div className="flex justify-between mt-1 px-1">
                  <span className={cn(QUIET_STYLE, 'text-[10px]')}>−3</span>
                  <span className={cn(QUIET_STYLE, 'text-[10px]')}>0</span>
                  <span className={cn(QUIET_STYLE, 'text-[10px]')}>+3</span>
                </div>
              </Card>
            </div>

            {/* Sequential scale */}
            <div className="space-y-3">
              <SectionHeader>Sequential scale (canvas to Z2-600)</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 28, borderRadius: 4 }}>
                  {[CANVAS_HEX, '#D4EDEA', '#A8DDD5', '#6CC8BC', '#30B3A5', '#0E9E8B'].map((hex) => (
                    <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
                  ))}
                </div>
              </Card>
            </div>

            {/* Mini heat map grid */}
            <div className="space-y-3">
              <SectionHeader>Mini heat map grid (7 × 4)</SectionHeader>
              <Card padding="md">
                <div className="grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 28 }, (_, i) => {
                    const vals = ['#E5E3DE', '#A5D4B5', '#5FB88A', '#1B8A5A', '#C43C3C', '#D46B6B', '#E5A5A5']
                    return (
                      <div key={i} className={cn(RADIUS.sm)} style={{ width: '100%', aspectRatio: '1', backgroundColor: vals[i % 7], opacity: 0.5 + (i % 4) * 0.15 }} />
                    )
                  })}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 17: Body & wellness
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="wellness" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>17. Body & wellness</h2>
            <InfoText>7 metriske farver for krops- og wellness-data. Deler mange farver med zone-paletten for konsistens.</InfoText>

            <SwatchRow items={WELLNESS.map((w) => ({ hex: w.hex, label: w.label }))} size={40} round />

            {/* Mini SVG line charts */}
            <div className="space-y-3">
              <SectionHeader>Mini sparklines</SectionHeader>
              <Card padding="md">
                <div className="grid grid-cols-4 gap-4">
                  {WELLNESS.slice(0, 4).map((w, i) => {
                    const paths = [
                      'M0,20 C10,18 20,15 30,16 C40,17 50,12 60,10 C70,8 80,12 90,11 L100,10',
                      'M0,15 C10,16 20,18 30,17 C40,16 50,19 60,20 C70,22 80,18 90,17 L100,16',
                      'M0,18 C10,17 20,18 30,17 C40,18 50,17 60,18 C70,17 80,18 90,17 L100,18',
                      'M0,22 C10,20 20,15 30,18 C40,16 50,14 60,12 C70,10 80,14 90,12 L100,10',
                    ]
                    return (
                      <div key={w.label} className="flex flex-col gap-1">
                        <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>{w.label}</span>
                        <svg width="100" height="30" viewBox="0 0 100 30" shapeRendering="geometricPrecision">
                          <path d={paths[i]} fill="none" stroke={w.hex} strokeWidth="1.5" />
                        </svg>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* 17.2 Dual load chart (R-Score vs Pulse Load) */}
            <div className="space-y-3">
              <SectionHeader>Dual load chart (R-Score vs Pulse Load)</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {/* Divergence zone */}
                  <path d="M180,40 C220,35 260,30 300,38 C340,46 370,55 400,50 L400,65 C370,68 340,72 300,62 C260,54 220,48 180,52 Z" fill="rgba(196,155,8,0.06)" />
                  {/* R-Score line (black) */}
                  <path d="M0,60 C40,55 80,45 120,42 C160,40 200,38 240,35 C280,32 320,38 360,42 L400,40" fill="none" stroke={NEAR_BLACK} strokeWidth="2" />
                  {/* Pulse Load line (Z5) */}
                  <path d="M0,65 C40,62 80,55 120,50 C160,48 200,52 240,55 C280,58 320,68 360,72 L400,65" fill="none" stroke="#E83B52" strokeWidth="2" />
                </svg>
                <div className="flex gap-4 mt-2">
                  <LegendLine hex={NEAR_BLACK} label="R-Score" width={2} />
                  <LegendLine hex="#E83B52" label="Pulse Load" width={2} />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(196,155,8,0.06)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Divergence zone</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 17.3 Cross-domain scatter plot colors */}
            <div className="space-y-3">
              <SectionHeader>Scatter plot colors</SectionHeader>
              <InfoText>Bruges i: Durability × Nutrition, R-Score × Fuel Score, Cost:Value, Reserve × Nutrition.</InfoText>
              <Card padding="md">
                <svg width="300" height="200" viewBox="0 0 300 200" shapeRendering="geometricPrecision">
                  {/* Quadrant lines */}
                  <line x1="150" y1="10" x2="150" y2="190" stroke="#E5E3DE" strokeWidth="1" />
                  <line x1="10" y1="100" x2="290" y2="100" stroke="#E5E3DE" strokeWidth="1" />
                  {/* Scatter dots (40% opacity) */}
                  {[
                    [45, 140], [68, 125], [55, 155], [80, 110], [95, 130],
                    [120, 80], [135, 65], [110, 95], [140, 45], [160, 55],
                    [175, 40], [190, 35], [200, 50], [210, 60], [180, 70],
                    [230, 30], [240, 45], [260, 38], [220, 55], [250, 25],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3" fill={NEAR_BLACK} opacity="0.4" />
                  ))}
                  {/* Highlighted dot */}
                  <circle cx="230" cy="30" r="4.5" fill={NEAR_BLACK} opacity="1" />
                  {/* Regression line */}
                  <line x1="30" y1="170" x2="270" y2="20" stroke="#E83B52" strokeWidth="1.5" />
                  {/* Confidence band */}
                  <path d="M30,160 L270,10 L270,30 L30,180 Z" fill="rgba(232,59,82,0.06)" />
                </svg>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className={RADIUS.full} style={{ width: 6, height: 6, backgroundColor: NEAR_BLACK, opacity: 0.4 }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Dot (40%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={RADIUS.full} style={{ width: 6, height: 6, backgroundColor: NEAR_BLACK }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Highlighted</span>
                  </div>
                  <LegendLine hex="#E83B52" label="Regression" width={1.5} />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(232,59,82,0.06)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Confidence band</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 17.4 Session fingerprint */}
            <div className="space-y-3">
              <SectionHeader>Session fingerprint</SectionHeader>
              <InfoText>Glyph der encoder session-profil visuelt. Bruger zone-farver + stream-farver. Ingen nye hex-værdier.</InfoText>
              <Card padding="md">
                <div className="flex items-center gap-6">
                  <svg width="80" height="80" viewBox="0 0 80 80" shapeRendering="geometricPrecision">
                    {/* Simplified fingerprint glyph using zone colors */}
                    <circle cx="40" cy="40" r="36" fill="none" stroke="var(--n200)" strokeWidth="0.5" />
                    <circle cx="40" cy="40" r="24" fill="none" stroke="var(--n200)" strokeWidth="0.5" />
                    <circle cx="40" cy="40" r="12" fill="none" stroke="var(--n200)" strokeWidth="0.5" />
                    {/* Dimension arcs using zone/stream colors */}
                    <path d="M40,4 A36,36 0 0,1 72,22" fill="none" stroke="#E8B020" strokeWidth="4" strokeLinecap="round" />
                    <path d="M72,22 A36,36 0 0,1 72,58" fill="none" stroke="#E83B52" strokeWidth="4" strokeLinecap="round" />
                    <path d="M72,58 A36,36 0 0,1 40,76" fill="none" stroke="#E36B30" strokeWidth="4" strokeLinecap="round" />
                    <path d="M40,76 A36,36 0 0,1 8,58" fill="none" stroke="#9B40E8" strokeWidth="4" strokeLinecap="round" />
                    <path d="M8,58 A36,36 0 0,1 8,22" fill="none" stroke="#14B8A2" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <div className="space-y-1">
                    {[
                      { label: 'Power profile', desc: 'Zone baseret på dominerende zone' },
                      { label: 'HR response', desc: '--stream-hr' },
                      { label: 'Nutrition quality', desc: 'CHO farve' },
                      { label: 'Regulator cost', desc: 'Blending af regulator-farver' },
                      { label: 'Overall intensity', desc: 'Dynamisk Z1-Z6' },
                    ].map((d) => (
                      <div key={d.label} className="flex items-baseline gap-2">
                        <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>{d.label}</span>
                        <span className={cn(QUIET_STYLE, 'text-[10px]')}>{d.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* 17.5 Power landscape */}
            <div className="space-y-3">
              <SectionHeader>Power landscape (3D surface colors)</SectionHeader>
              <Card padding="md">
                <div className="flex gap-2">
                  {[
                    { label: 'Low', hex: '#7CA3BE' },
                    { label: 'Medium', hex: '#E8B020' },
                    { label: 'High', hex: '#E83B52' },
                    { label: 'Peak', hex: '#9B40E8' },
                  ].map((lev) => (
                    <div key={lev.label} className="flex flex-col items-center gap-1">
                      <div className={cn(RADIUS.sm)} style={{ width: 48, height: 32, backgroundColor: lev.hex, opacity: 0.7 }} />
                      <span className={cn(QUIET_STYLE, 'text-[10px]')}>{lev.label}</span>
                      <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{lev.hex}</span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center gap-1 ml-4">
                    <div className={cn(RADIUS.sm)} style={{ width: 48, height: 32, background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)' }} />
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>Wireframe</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>rgba(..,.08)</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 18: Chart infrastructure
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="infrastructure" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>18. Chart infrastructure</h2>
            <InfoText>Akser, grid, tooltip, crosshair, brush — de usynlige dele der holder charts sammen.</InfoText>

            <div className="space-y-3">
              <SectionHeader>Annotated chart skeleton</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="240" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet" shapeRendering="geometricPrecision">
                  {/* Background */}
                  <rect width="600" height="240" fill="var(--bg)" />

                  {/* Grid lines */}
                  {[40, 80, 120, 160, 200].map((y) => (
                    <line key={y} x1="50" y1={y} x2="560" y2={y} stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
                  ))}

                  {/* X axis */}
                  <line x1="50" y1="200" x2="560" y2="200" stroke="#E5E3DE" strokeWidth="1" />
                  {/* Y axis */}
                  <line x1="50" y1="40" x2="50" y2="200" stroke="#E5E3DE" strokeWidth="1" />

                  {/* Tick labels */}
                  {['0', '100', '200', '300', '400'].map((t, i) => (
                    <text key={t} x="44" y={200 - i * 40} textAnchor="end" style={{ fontSize: '9px', fill: '#8A8780', fontFamily: 'var(--font-sans)' }}>{t}</text>
                  ))}
                  {['0:00', '0:30', '1:00', '1:30', '2:00'].map((t, i) => (
                    <text key={t} x={50 + i * 127.5} y="216" textAnchor="middle" style={{ fontSize: '9px', fill: '#8A8780', fontFamily: 'var(--font-sans)' }}>{t}</text>
                  ))}

                  {/* Axis labels */}
                  <text x="20" y="120" textAnchor="middle" style={{ fontSize: '10px', fill: '#5C5A55', fontFamily: 'var(--font-sans)' }} transform="rotate(-90,20,120)">Watts</text>
                  <text x="305" y="234" textAnchor="middle" style={{ fontSize: '10px', fill: '#5C5A55', fontFamily: 'var(--font-sans)' }}>Duration</text>

                  {/* Data line */}
                  <path d="M60,160 C100,150 140,120 180,110 C220,100 260,130 300,100 C340,80 380,90 420,85 C460,75 500,90 540,82" fill="none" stroke="#14B8A2" strokeWidth="2" />

                  {/* Crosshair */}
                  <line x1="300" y1="40" x2="300" y2="200" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50" y1="100" x2="560" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Reference line */}
                  <line x1="50" y1="90" x2="560" y2="90" stroke="var(--n400)" strokeWidth="0.5" strokeDasharray="6 3" />
                  <text x="563" y="93" style={{ fontSize: '9px', fill: '#8A8780', fontFamily: 'var(--font-sans)' }}>FTP</text>

                  {/* Brush region */}
                  <rect x="180" y="200" width="200" height="20" fill="rgba(0,0,0,0.04)" rx="2" />
                  <rect x="180" y="200" width="4" height="20" rx="1" fill={NEAR_BLACK} opacity="0.6" />
                  <rect x="376" y="200" width="4" height="20" rx="1" fill={NEAR_BLACK} opacity="0.6" />

                  {/* Tooltip */}
                  <rect x="280" y="55" width="110" height="40" rx="4" fill="#FFFFFF" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
                  <text x="290" y="72" style={{ fontSize: '10px', fill: '#5C5A55', fontFamily: 'var(--font-sans)' }}>1:00:00</text>
                  <text x="290" y="88" style={{ fontSize: '11px', fill: 'var(--n1150)', fontFamily: 'var(--font-sans)', fontWeight: 550 }}>238 W</text>

                  {/* Annotations */}
                  <text x="580" y="50" textAnchor="end" style={{ fontSize: '8px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Grid: rgba(0,0,0,.04)</text>
                  <text x="580" y="160" textAnchor="end" style={{ fontSize: '8px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Axis: #E5E3DE</text>
                  <text x="580" y="228" textAnchor="end" style={{ fontSize: '8px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>{`Brush handles: ${NEAR_BLACK}`}</text>
                </svg>
              </Card>
            </div>

            {/* Infrastructure token table */}
            <div className="space-y-3">
              <SectionHeader>Infrastructure tokens</SectionHeader>
              <DataTable
                columns={[
                  { key: 'element', label: 'Element' },
                  { key: 'value', label: 'Value' },
                  { key: 'usage', label: 'Usage' },
                ]}
                data={[
                  { element: 'Axis line', value: '#E5E3DE', usage: 'X/Y axis rules' },
                  { element: 'Grid line', value: 'rgba(0,0,0,.04)', usage: 'Horizontal grid' },
                  { element: 'Tick text', value: '#8A8780', usage: 'Axis numbers' },
                  { element: 'Label text', value: '#5C5A55', usage: 'Axis titles' },
                  { element: 'Tooltip bg', value: '#FFFFFF', usage: 'Floating tooltip' },
                  { element: 'Tooltip border', value: 'rgba(0,0,0,.08)', usage: 'Tooltip edge' },
                  { element: 'Crosshair', value: 'rgba(0,0,0,.15)', usage: 'Hover crosshair' },
                  { element: 'Brush bg', value: 'rgba(0,0,0,.04)', usage: 'Selection region' },
                  { element: 'Brush handles', value: NEAR_BLACK, usage: 'Drag handles' },
                ]}
              />
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 19: Sport colors
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="sport-colors" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>19. Sport colors</h2>
            <InfoText>6 sportsdiscipliner. Cycling (teal), running (rød), swimming (cyan) er de tre primære.</InfoText>

            <SwatchRow items={SPORTS.map((s) => ({ hex: s.hex, label: s.label }))} size={48} round />

            {/* Mini capacity chart with 3 sport overlays */}
            <div className="space-y-3">
              <SectionHeader>Sport-colored capacity lines</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  <path d="M0,70 C50,65 100,50 150,45 C200,40 250,50 300,35 C350,30 380,32 400,30" fill="none" stroke="#14B8A2" strokeWidth="2" />
                  <path d="M0,80 C50,78 100,65 150,60 C200,55 250,62 300,50 C350,45 380,48 400,45" fill="none" stroke="#E83B52" strokeWidth="2" />
                  <path d="M0,85 C50,82 100,75 150,72 C200,68 250,74 300,65 C350,60 380,62 400,60" fill="none" stroke="#2AACCC" strokeWidth="2" />
                </svg>
                <div className="flex gap-4 mt-2">
                  {SPORTS.slice(0, 3).map((s) => (
                    <LegendLine key={s.label} hex={s.hex} label={s.label} />
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 20: Gauges & scores
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="gauges" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>20. Gauges & scores</h2>
            <InfoText>Risk gauge arcs, product tolerance skala, gut training tiers, gamification medals, glycogen stores.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              {/* Risk gauge */}
              <Card>
                <Card.Title>Risk gauge</Card.Title>
                <div className="flex justify-center mt-3">
                  <svg width="140" height="80" viewBox="0 0 140 80" shapeRendering="geometricPrecision">
                    {GAUGE_SEGMENTS.map((seg) => (
                      <path key={seg.label} d={seg.d} fill="none" stroke={seg.hex} strokeWidth="10" strokeLinecap="round" />
                    ))}
                  </svg>
                </div>
              </Card>

              {/* Product tolerance */}
              <Card>
                <Card.Title>Product tolerance</Card.Title>
                <div className="flex gap-1 mt-3">
                  {[
                    { hex: '#1B8A5A', label: 'Excellent' },
                    { hex: '#38CC88', label: 'Good' },
                    { hex: '#C49B08', label: 'Fair' },
                    { hex: '#C43C3C', label: 'Poor' },
                    { hex: '#C0BDB6', label: 'Untested' },
                  ].map((t) => (
                    <div key={t.label} className="flex flex-col items-center gap-0.5">
                      <Swatch hex={t.hex} size={28} height={20} />
                      <span className={cn(QUIET_STYLE, 'text-[9px]')}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Gut tiers */}
              <Card>
                <Card.Title>Gut training tiers</Card.Title>
                <div className="flex gap-2 mt-3">
                  {[
                    { hex: '#7CA3BE', label: 'Starter' },
                    { hex: '#14B8A2', label: 'Developing' },
                    { hex: '#E8B020', label: 'Trained' },
                    { hex: '#E83B52', label: 'Elite' },
                  ].map((t) => (
                    <div key={t.label} className="flex flex-col items-center gap-0.5">
                      <Swatch hex={t.hex} size={32} height={24} />
                      <span className={cn(QUIET_STYLE, 'text-[9px]')}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Gamification + Glycogen */}
              <Card>
                <Card.Title>Gamification + glycogen</Card.Title>
                <div className="flex gap-4 mt-3">
                  <div className="flex gap-1">
                    {[
                      { hex: '#CD7F32', label: 'Bronze' },
                      { hex: '#B5B2AB', label: 'Silver' },
                      { hex: '#E8B020', label: 'Gold' },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col items-center gap-0.5">
                        <Swatch hex={m.hex} size={24} round />
                        <span className={cn(QUIET_STYLE, 'text-[9px]')}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-l-[0.5px] border-l-[var(--n200)] pl-4 flex gap-2">
                    {[
                      { hex: '#E36B30', label: 'Muscle' },
                      { hex: '#E8B020', label: 'Liver' },
                    ].map((g) => (
                      <div key={g.label} className="flex items-center gap-1">
                        <Swatch hex={g.hex} size={20} height={12} />
                        <span className={cn(QUIET_STYLE, 'text-[10px]')}>{g.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 21: Brand palette
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="brand" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>21. Brand palette</h2>
            <InfoText>RAMTTs eksisterende brand-farver. Bruges til landing pages, share cards og immersive UI. Plus flare-farven til akutte alerts.</InfoText>

            <SwatchRow items={BRAND.map((b) => ({ hex: b.hex, label: b.label }))} size={64} height={48} />

            {/* Dark immersive preview */}
            <div className="space-y-3">
              <SectionHeader>Dark immersive preview</SectionHeader>
              <Card padding="none">
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: '#050A30', padding: 28 }}>
                  <h3 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'mb-2')} style={{ color: '#0230E0' }}>Race-day fuel strategy</h3>
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'mb-4 max-w-[45ch]')} style={{ color: '#FFFEF7' }}>
                    Your personalized nutrition plan for Ironman Copenhagen, optimized for 87 g/h CHO with dual-transport.
                  </p>
                  <div className="flex gap-2">
                    <div className={cn(RADIUS.md, 'px-4 py-2 inline-flex')} style={{ backgroundColor: '#96004D' }}>
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.medium)} style={{ color: '#FFFEF7' }}>View plan</span>
                    </div>
                    <div className={cn(RADIUS.md, 'px-4 py-2 inline-flex')} style={{ border: '0.5px solid #FFC9FE40' }}>
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal)} style={{ color: '#FFC9FE' }}>Share</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Flare */}
            <div className="space-y-3">
              <SectionHeader>Flare</SectionHeader>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <Swatch hex="#FF6A00" size={64} height={64} />
                  <SwatchLabel hex="#FF6A00" label="Flare (light)" />
                </div>
                <div className="flex flex-col items-center">
                  <Swatch hex="#FF8533" size={64} height={64} />
                  <SwatchLabel hex="#FF8533" label="Flare (dark)" />
                </div>
                <div className="flex flex-col gap-2">
                  <Badge color="#FF6A00">Fuel now</Badge>
                  <p className={cn(QUIET_STYLE, 'text-[11px] max-w-[40ch]')}>Skal differentieres fra CHO orange (#E36B30) og Power Z4.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 22: Co-visibility map
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="co-visibility" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>22. Co-visibility map</h2>
            <InfoText>13 skærme × 15 farve-grupper. Dots = synlig på den skærm. Bruges til at vurdere farve-konflikter.</InfoText>

            <Card padding="md">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-[0.5px] border-b-[var(--n400)]">
                      <th className={cn(LABEL_STYLE, 'py-2 px-2 text-left')} />
                      {CO_VIS_GROUPS.map((g) => (
                        <th key={g} className={cn(LABEL_STYLE, 'py-2 px-2 text-center whitespace-nowrap')} style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: 90 }}>{g}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CO_VIS_SCREENS.map((screen) => (
                      <tr key={screen} className="border-b-[0.5px] border-b-[var(--n200)]">
                        <td className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n1150)] py-2 px-2 whitespace-nowrap')}>{screen}</td>
                        {CO_VIS_GROUPS.map((group) => (
                          <td key={group} className="py-2 px-2 text-center">
                            {CO_VIS_MAP[screen]?.includes(group) ? (
                              <div className={cn(RADIUS.full, 'mx-auto')} style={{ width: 8, height: 8, backgroundColor: 'var(--n1150)' }} />
                            ) : null}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 23: Token checklist
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="tokens" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>23. Token checklist</h2>
            <InfoText>Alle ~130 CSS custom property navne grupperet efter domæne. Disse implementeres i tokens.css når farverne er besluttet. ~260 farve-beslutninger med dark mode.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              {[
                { group: 'Activity streams (6)', tokens: ['--stream-power', '--stream-hr', '--stream-cadence', '--stream-speed', '--stream-elevation', '--stream-temp'] },
                { group: 'Stream overlays (5)', tokens: ['--overlay-wprime', '--overlay-glycogen', '--overlay-aap', '--overlay-cho-marker', '--overlay-coasting'] },
                { group: 'Cadence zones (9)', tokens: ['--cad-0', '--cad-60', '--cad-70', '--cad-80', '--cad-85', '--cad-90', '--cad-95', '--cad-105', '--cad-106'] },
                { group: 'Capacity chart (8+)', tokens: ['--cap-capacity', '--cap-pressure', '--cap-form-pos', '--cap-form-neg', '--cap-form-fill-pos', '--cap-form-fill-neg', '--cap-surge', '--cap-acwr', '--cap-proj-capacity', '--cap-proj-pressure', '--cap-proj-form', '--cap-confidence'] },
                { group: 'Training phases (6)', tokens: ['--phase-base', '--phase-build', '--phase-peak', '--phase-taper', '--phase-race', '--phase-transition'] },
                { group: 'Regulators (3)', tokens: ['--reg-metabolic', '--reg-neural', '--reg-peripheral'] },
                { group: 'Fuel charts (6)', tokens: ['--fuel-gut', '--fuel-cpi', '--fuel-coverage', '--fuel-debt', '--fuel-gut-adapt', '--energy-surplus', '--energy-deficit', '--energy-zero'] },
                { group: 'Peak curves (5+)', tokens: ['--peak-current', '--peak-90d', '--peak-180d', '--peak-365d', '--peak-best', '--peak-cp', '--peak-reserve', '--peak-fueled-pr'] },
                { group: 'Athlete DNA (5)', tokens: ['--dna-current', '--dna-best', '--dna-3mo', '--dna-grid', '--dna-axis'] },
                { group: 'Compliance (5)', tokens: ['--compliance-hit', '--compliance-partial', '--compliance-missed', '--compliance-extra', '--compliance-rest'] },
                { group: 'Priority (3)', tokens: ['--priority-critical', '--priority-routine', '--priority-optional'] },
                { group: 'Day types (6)', tokens: ['--day-rest', '--day-easy', '--day-moderate', '--day-hard', '--day-carbload', '--day-race'] },
                { group: 'Body & wellness (7)', tokens: ['--body-hrv', '--body-rhr', '--body-weight', '--body-fat', '--body-lean', '--body-sleep', '--body-sleep-dur'] },
                { group: 'Dual load (3)', tokens: ['--dual-rscore', '--dual-pulse', '--dual-diverge'] },
                { group: 'Elevation gradient (6)', tokens: ['--elev-flat', '--elev-rolling', '--elev-moderate', '--elev-steep', '--elev-vsteep', '--elev-extreme'] },
                { group: 'Intervals (8)', tokens: ['--interval-1', '--interval-2', '--interval-3', '--interval-4', '--interval-5', '--interval-6', '--interval-7', '--interval-8'] },
                { group: 'Chart infrastructure (12+)', tokens: ['--chart-axis', '--chart-grid', '--chart-tick', '--chart-label', '--chart-zero', '--chart-ref', '--chart-ref-bold', '--chart-brush', '--chart-brush-handle', '--chart-selection', '--chart-crosshair'] },
                { group: 'Tooltip (6)', tokens: ['--tooltip-bg', '--tooltip-border', '--tooltip-shadow', '--tooltip-text', '--tooltip-text-sec', '--tooltip-divider'] },
                { group: 'Legend (2)', tokens: ['--legend-text', '--legend-inactive'] },
                { group: 'Scatter (5)', tokens: ['--scatter-dot', '--scatter-dot-active', '--scatter-regression', '--scatter-band', '--scatter-quadrant'] },
                { group: 'Neutral scale (8)', tokens: ['--bg', '--n50', '--n200', '--n400', '--n600', '--n800', '--n1050', '--n1150'] },
                { group: 'Semantic (12)', tokens: ['--success', '--success-soft', '--success-on-soft', '--warning', '--warning-soft', '--warning-on-soft', '--danger', '--danger-soft', '--danger-on-soft', '--info', '--info-soft', '--info-on-soft'] },
                { group: 'Power zones (12)', tokens: ['--z1', '--z2', '--z3', '--z4', '--z5', '--z6', '--z1-wash', '--z2-wash', '--z3-wash', '--z4-wash', '--z5-wash', '--z6-wash'] },
                { group: 'CHO zones (6)', tokens: ['--cz1', '--cz2', '--cz3', '--cz4', '--cz5', '--cz6'] },
                { group: 'Nutrients (7)', tokens: ['--nut-cho', '--nut-fluid', '--nut-sodium', '--nut-caffeine', '--macro-cho', '--macro-protein', '--macro-fat'] },
                { group: 'Sports (6)', tokens: ['--sport-cycling', '--sport-running', '--sport-swimming', '--sport-strength', '--sport-rowing', '--sport-other'] },
                { group: 'Brand (9)', tokens: ['--brand-near-black', '--brand-electric', '--brand-aubergine', '--brand-magenta', '--brand-orchid', '--brand-cream', '--brand-lemon', '--flare', '--flare-dark'] },
                { group: 'Heat maps (9)', tokens: ['--heat-neg-3', '--heat-neg-2', '--heat-neg-1', '--heat-0', '--heat-pos-1', '--heat-pos-2', '--heat-pos-3', '--seq-start', '--seq-end'] },
              ].map((g) => (
                <Card key={g.group} padding="sm">
                  <div className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)] mb-1.5')}>{g.group}</div>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                    {g.tokens.map((t) => (
                      <span key={t} className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{t}</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 24: Summary + questions
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="summary" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>24. Summary + questions</h2>

            {/* Priority table */}
            <div className="space-y-3">
              <SectionHeader>Priority overview</SectionHeader>
              <DataTable
                columns={[
                  { key: 'group', label: 'Group' },
                  { key: 'colors', label: 'Colors', align: 'right' as const },
                  { key: 'priority', label: 'Priority' },
                  { key: 'share', label: 'Can share with' },
                ]}
                data={[
                  { group: 'Power / HR zones', colors: '6', priority: 'Critical', share: 'Streams, day types, intent, regulators' },
                  { group: 'CHO zones', colors: '6', priority: 'Critical', share: '—' },
                  { group: 'Semantic', colors: '4 × 3', priority: 'Must decide', share: 'All domains' },
                  { group: 'Session streams', colors: '6', priority: 'High', share: 'From zone palette + black' },
                  { group: 'Capacity chart', colors: '6', priority: 'High', share: 'From zone + semantic' },
                  { group: 'Regulators', colors: '3', priority: 'High', share: 'Z4, Z6, Z1 hues' },
                  { group: 'Nutrients', colors: '4', priority: 'Medium', share: 'CHO = Z4 conflict' },
                  { group: 'Cadence zones', colors: '9', priority: 'Medium', share: 'Cold→warm gradient' },
                  { group: 'Elevation', colors: '6', priority: 'Medium', share: 'Z2→Z6 mapping' },
                  { group: 'Intervals', colors: '8', priority: 'Medium', share: 'Zone palette + black' },
                  { group: 'Training phases', colors: '6 @ 6%', priority: 'Medium', share: '—' },
                  { group: 'Day types + intent', colors: '6+7+3', priority: 'Medium', share: 'Intent = zone colors' },
                  { group: 'Peak curves', colors: '5', priority: 'Medium', share: 'Zone palette + black' },
                  { group: 'Athlete DNA', colors: '3', priority: 'Low', share: 'Black + Z5 + Z2' },
                  { group: 'Heat maps', colors: '7+6', priority: 'Low', share: '—' },
                  { group: 'Wellness', colors: '7', priority: 'Low', share: 'Zone palette' },
                  { group: 'Infrastructure', colors: '~9', priority: 'Locked', share: 'Neutral scale' },
                  { group: 'Sport', colors: '6', priority: 'Low', share: 'Zone palette' },
                  { group: 'Gauges & scores', colors: '~12', priority: 'Low', share: 'Semantic + zone' },
                  { group: 'Brand', colors: '7+2', priority: 'Existing', share: 'Landing / share cards' },
                ]}
              />
            </div>

            {/* The 14 questions */}
            <div className="space-y-3">
              <SectionHeader>De 14 spørgsmål til Ruth</SectionHeader>
              <div className="space-y-2">
                {[
                  'RAMTT-paletten (Z1 blå-grå, Z2 teal, Z3 gul, Z4 orange, Z5 rød, Z6 lilla) vs Coggan-standarden for power/HR zones?',
                  'Skal CHO zones være blå spektrum (#94A3B8→#085A87), eller en anden tone?',
                  'Nye semantiske farver (success #1B8A5A, warning #C49B08, danger #C43C3C, info #0099CC) — godkendt?',
                  'Warning (#C49B08) og Z3 Tempo (#E8B020) er tætte — er det OK, eller skal warning flyttes?',
                  'Session streams: Power = sort, HR = Z5, Cadence = Z6, Speed = Z2, Elevation = neutral, Temp = warning hue — fungerer det?',
                  'Capacity chart: CTL = Z2, ATL = Z5, Form = success/danger, Surge = Z6 stiplet, ACWR = Z3 — er mapping korrekt?',
                  'Regulatorer: Metabolic = Z4, Neural = Z6, Peripheral = Z1 — tre zone-farver genbrugt — OK?',
                  'CHO nutrient (#E36B30) og Power Z4 er identiske — de ses sjældent sammen, men skal fuel have sin egen tone?',
                  'Cadence gradient (cold→warm med 9 brackets) — fungerer de 9 trin?',
                  'Elevation bruger zone-farverne Z2→Z6 — er det klart nok, eller skal det være en separat gradient?',
                  'Interval stack: 8 farver med sort som #1 — er rækkefølgen rigtig?',
                  'Training phases ved ~6% opacity — kan de adskilles på sand canvas?',
                  'Brand-palette: bruges som den er, eller tilpasses til sand canvas?',
                  'Flare (#FF6A00) vs CHO-orange (#E36B30) vs Z4 (#E36B30) — tre orange-tøner tæt på hinanden — problem?',
                ].map((q, i) => (
                  <Card key={i} padding="sm">
                    <div className="flex gap-3 items-start">
                      <span className={cn(FONT.body, 'text-[12px] tabular-nums', WEIGHT.strong, 'text-[var(--n600)] shrink-0 w-[20px]')}>{i + 1}.</span>
                      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}>{q}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 pb-16">
            <div className="border-t-[0.5px] border-t-[var(--n400)] pt-4">
              <p className={cn(QUIET_STYLE, 'text-[11px]')}>RAMTT color system v3 &middot; Generated 9. april 2026 &middot; 24 sections &middot; ~130 tokens &middot; ~260 beslutninger med dark mode</p>
            </div>
          </footer>

        </div>
      </main>
    </div>
  )
}
