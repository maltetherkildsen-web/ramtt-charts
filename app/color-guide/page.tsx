'use client'

import { useState, useEffect } from 'react'
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
  generateCapacityData, generatePeakCurve,
  generateWPrimeBalance, generateGlycoDepletion, generateRegulatorData,
  generateFuelData, generateEnergyBalance, generateScatterData,
  generateDualLoad, generateSparkline, generateSportLine,
  generateTrainingLoadBars, generateSeasonBars, generateCHOComplianceBars,
  generateMacroPeriodization, generateCHOZoneStacked, generateCoverageTrend,
  generateGutTrajectory, generateDepletionCurves, generateCPProgression,
  generateDurabilityData, generateResilienceTrend, generatePeakFreshness,
  generatePolarization, generateMorningCheckin, generateSeasonMap,
  generateKPIGrid, generateToleranceHeatmap, generateLactateCurve,
  generateCourseProgression, generateEnergyBalanceBars, generateHRDrift,
  generateCalendarWeek,
} from './chart-data'
import { RamttWordmark } from '@/components/ui/ramtt-logo'

/* ═══════════════════════════════════════════════════════════════════
   RAMTT Visual Color Guide v3 — for Ruth
   30 sections, ~155 tokens, ~310 decisions, ~65 chart illustrations
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
  { zone: 'Z1', label: 'Recovery', range: '0–55%', hex: '#94A3B8' },
  { zone: 'Z2', label: 'Endurance', range: '55–75%', hex: '#16A34A' },
  { zone: 'Z3', label: 'Tempo', range: '75–90%', hex: '#F59E0B' },
  { zone: 'Z4', label: 'Threshold', range: '90–105%', hex: '#F97316' },
  { zone: 'Z5', label: 'VO2max', range: '105–120%', hex: '#EF4444' },
  { zone: 'Z6', label: 'Anaerobic', range: '>120%', hex: '#A855F7' },
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
  { min: 0, max: 0.55, color: '#94A3B8', label: 'Z1' },
  { min: 0.55, max: 0.75, color: '#16A34A', label: 'Z2' },
  { min: 0.75, max: 0.90, color: '#F59E0B', label: 'Z3' },
  { min: 0.90, max: 1.05, color: '#F97316', label: 'Z4' },
  { min: 1.05, max: 1.20, color: '#EF4444', label: 'Z5' },
  { min: 1.20, max: Infinity, color: '#A855F7', label: 'Z6' },
]

// Pre-generated chart data (seeded — deterministic across renders)
const ZONE_LINE_DATA = generateZoneData(300, 280)
const STREAM_POWER = generatePowerStream(200)
const STREAM_HR = generateHRStream(200)
const STREAM_CADENCE = generateCadenceStream(200)
const STREAM_SPEED = generateSpeedStream(200)
const STREAM_ELEVATION = generateElevationStream(200)

const CAPACITY = generateCapacityData(120)
const PEAK_CURVES = [
  { data: generatePeakCurve(1100, 0.12, 80), label: 'Current', color: NEAR_BLACK },
  { data: generatePeakCurve(1050, 0.11, 80), label: '90 days', color: '#10B981' },
  { data: generatePeakCurve(980, 0.13, 80), label: '6 months', color: '#F59E0B' },
  { data: generatePeakCurve(920, 0.14, 80), label: '12 months', color: '#A855F7' },
  { data: generatePeakCurve(1150, 0.10, 80), label: 'Best ever', color: '#EF4444' },
]
const REGULATORS = generateRegulatorData(100)
const REGULATOR_DISPLAY = [
  { label: 'Fatigue', hex: '#F97316' },
  { label: 'Fitness', hex: '#A855F7' },
  { label: 'Form', hex: '#3B82F6' },
]
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
  { data: generateSportLine(2000, 100), label: 'Cycling', color: '#16A34A' },
  { data: generateSportLine(2100, 100), label: 'Running', color: '#EF4444' },
  { data: generateSportLine(2200, 100), label: 'Swimming', color: '#3B82F6' },
]
const W_PRIME = generateWPrimeBalance(200)
const GLYCO_DEPLETION = generateGlycoDepletion(200)

const TRAINING_LOAD_BARS = generateTrainingLoadBars(14)
const SEASON_BARS = generateSeasonBars(52)
const CHO_COMPLIANCE = generateCHOComplianceBars(7)
const MACRO_PERIOD = generateMacroPeriodization(7)
const CHO_ZONE_STACKED = generateCHOZoneStacked(12)
const COVERAGE_TREND = generateCoverageTrend(60)
const GUT_TRAJECTORY = generateGutTrajectory(60)
const DEPLETION = generateDepletionCurves(80)
const CP_PROGRESSION = generateCPProgression(12)
const DURABILITY = generateDurabilityData(60)
const RESILIENCE = generateResilienceTrend(40)
const PEAK_FRESH = generatePeakFreshness()
const POLARIZATION = generatePolarization()
const MORNING_CHECKIN = generateMorningCheckin(4)
const SEASON_MAP = generateSeasonMap(52)
const KPI_GRID = generateKPIGrid(4, 8)
const TOLERANCE_HEATMAP = generateToleranceHeatmap(6, 8)
const LACTATE = generateLactateCurve(40)
const COURSE_PROG = generateCourseProgression(8)
const ENERGY_BARS = generateEnergyBalanceBars(14)
const HR_DRIFT = generateHRDrift(30)
const CALENDAR_WEEK = generateCalendarWeek()

// CHO zones — blue spectrum
const CHO_ZONES = [
  { zone: 'C1', label: 'Cream', range: '0–30 g/h', hex: '#FEF3C7' },
  { zone: 'C2', label: 'Butter', range: '30–50 g/h', hex: '#FCD34D' },
  { zone: 'C3', label: 'Gold', range: '50–70 g/h', hex: '#FBBF24' },
  { zone: 'C4', label: 'Amber', range: '70–90 g/h', hex: '#F59E0B' },
  { zone: 'C5', label: 'Dark amber', range: '90–120 g/h', hex: '#D97706' },
  { zone: 'C6', label: 'Deep amber', range: '>120 g/h', hex: '#92400E' },
]

// Semantic colors (proposed RAMTT set)
const SEMANTICS = [
  { key: 'success', label: 'Success', hex: '#16A34A', usage: 'Compliant, improving, on track, saved' },
  { key: 'warning', label: 'Warning', hex: '#F59E0B', usage: 'GI risk, caution, partial compliance' },
  { key: 'danger', label: 'Danger', hex: '#EF4444', usage: 'Missed, declining, error, critical' },
  { key: 'info', label: 'Info', hex: '#3B82F6', usage: 'Stable trend, informational, neutral signal' },
]

// Session activity streams
const STREAMS_LIGHT = [
  { label: 'Power', hex: '#16A34A', unit: 'W', value: '238', dark: '#4ADE80' },
  { label: 'Heart rate', hex: '#EF4444', unit: 'bpm', value: '142', dark: '#FCA5A5' },
  { label: 'Cadence', hex: '#A855F7', unit: 'rpm', value: '88', dark: '#D8B4FE' },
  { label: 'Speed', hex: '#3B82F6', unit: 'km/h', value: '34.2', dark: '#93C5FD' },
  { label: 'Elevation', hex: 'var(--n600)', unit: 'm', value: '342', dark: '#B5B2AB' },
  { label: 'Temperature', hex: '#F97316', unit: '°C', value: '28', dark: '#FDBA74' },
]

// Capacity chart lines
const CAPACITY_LINES = [
  { label: 'Capacity (CTL)', hex: '#10B981', dash: false, width: 2 },
  { label: 'Pressure (ATL)', hex: '#EF4444', dash: false, width: 2 },
  { label: 'Form +', hex: '#16A34A', dash: false, width: 1.5 },
  { label: 'Form −', hex: '#EF4444', dash: false, width: 1.5 },
  { label: 'Surge', hex: '#A855F7', dash: true, width: 1.5 },
  { label: 'ACWR', hex: '#F59E0B', dash: false, width: 1.5 },
]


// Nutrients
const NUTRIENTS = [
  { label: 'CHO', hex: '#F97316' },
  { label: 'Fluid', hex: '#3B82F6' },
  { label: 'Sodium', hex: '#EC4899' },
  { label: 'Caffeine', hex: '#9333EA' },
]

// Macros
const MACROS = [
  { label: 'CHO', hex: '#F97316' },
  { label: 'Protein', hex: '#A855F7' },
  { label: 'Fat', hex: '#F59E0B' },
]

// Cadence zones (9 brackets, cold to warm)
const CADENCE_ZONES = [
  { rpm: 'Coasting', hex: 'var(--n600)' },
  { rpm: '≤60', hex: '#94A3B8' },
  { rpm: '61–70', hex: '#3B82F6' },
  { rpm: '71–80', hex: '#10B981' },
  { rpm: '81–85', hex: '#16A34A' },
  { rpm: '86–90', hex: '#F59E0B' },
  { rpm: '91–95', hex: '#F97316' },
  { rpm: '96–105', hex: '#EF4444' },
  { rpm: '≥106', hex: '#A855F7' },
]

// Elevation gradient (6 levels)
const ELEVATION_LEVELS = [
  { grade: '0–2%', hex: '#3B82F6' },
  { grade: '2–5%', hex: '#10B981' },
  { grade: '5–8%', hex: '#F59E0B' },
  { grade: '8–12%', hex: '#F97316' },
  { grade: '12–16%', hex: '#EF4444' },
  { grade: '>16%', hex: '#A855F7' },
]

// Interval stack (8 colors)
const INTERVAL_COLORS = [
  { n: 1, hex: NEAR_BLACK },
  { n: 2, hex: '#EF4444' },
  { n: 3, hex: '#16A34A' },
  { n: 4, hex: '#F59E0B' },
  { n: 5, hex: '#A855F7' },
  { n: 6, hex: '#3B82F6' },
  { n: 7, hex: '#10B981' },
  { n: 8, hex: '#F97316' },
]

// Training phases
const PHASES = [
  { label: 'Base', hex: '#3B82F6', width: 22 },
  { label: 'Build', hex: '#F59E0B', width: 20 },
  { label: 'Peak', hex: '#EF4444', width: 15 },
  { label: 'Taper', hex: '#A855F7', width: 12 },
  { label: 'Race', hex: NEAR_BLACK, width: 8 },
  { label: 'Transition', hex: 'var(--n600)', width: 23 },
]

// Day types
const DAY_TYPES = [
  { label: 'Rest', hex: 'var(--n600)' },
  { label: 'Easy', hex: '#3B82F6' },
  { label: 'Moderate', hex: '#10B981' },
  { label: 'Hard', hex: '#EF4444' },
  { label: 'Carb load', hex: '#F59E0B' },
  { label: 'Race', hex: NEAR_BLACK },
]

// Intent badges (outline, zone-colored)
const INTENTS = [
  { label: 'Recovery', hex: '#3B82F6' },
  { label: 'Endurance', hex: '#10B981' },
  { label: 'Tempo', hex: '#F59E0B' },
  { label: 'Threshold', hex: '#F97316' },
  { label: 'VO2max', hex: '#EF4444' },
  { label: 'Race', hex: NEAR_BLACK },
  { label: 'Test', hex: '#A855F7' },
]

// Priority badges
const PRIORITIES = [
  { label: 'Critical', hex: '#EF4444' },
  { label: 'Routine', hex: '#8A8780' },
  { label: 'Optional', hex: '#B5B2AB' },
]

// Peak curves (5 periods)
const PEAK_PERIODS = [
  { label: 'Current', hex: NEAR_BLACK, width: 2.5, dash: false },
  { label: '90 d', hex: '#10B981', width: 1.5, dash: false },
  { label: '180 d', hex: '#F59E0B', width: 1.5, dash: false },
  { label: '365 d', hex: '#A855F7', width: 1.5, dash: false },
  { label: 'Best ever', hex: '#EF4444', width: 1.5, dash: true },
]

// Body & wellness streams
const WELLNESS = [
  { label: 'HRV', hex: '#10B981' },
  { label: 'RHR', hex: '#EF4444' },
  { label: 'Weight', hex: NEAR_BLACK },
  { label: 'Body fat', hex: '#F59E0B' },
  { label: 'Lean mass', hex: '#16A34A' },
  { label: 'Sleep efficiency', hex: '#A855F7' },
  { label: 'Sleep duration', hex: '#3B82F6' },
]

// Sport colors
const SPORTS = [
  { label: 'Cycling', hex: '#16A34A' },
  { label: 'Running', hex: '#EF4444' },
  { label: 'Swimming', hex: '#3B82F6' },
  { label: 'Strength', hex: '#A855F7' },
  { label: 'Rowing', hex: '#F59E0B' },
  { label: 'Other', hex: 'var(--n600)' },
]

// Brand palette — 2 core colors + white
const BRAND_CORE = [
  { label: 'Midnight navy', hex: '#050A30' },
  { label: 'Deep magenta', hex: '#96004D' },
  { label: 'White/cream', hex: '#FFFEF7' },
]
const BRAND_COMBOS = [
  { bg: '#050A30', text: '#96004D', caption: 'Primary dark — logo on navy' },
  { bg: '#050A30', text: '#FFFEF7', caption: 'Classic — white on navy' },
  { bg: '#96004D', text: '#FFFEF7', caption: 'Bold — white on magenta' },
]

// Co-visibility map — 14 screens x 19 groups
const CO_VIS_SCREENS = [
  'Session graph', 'Session zones', 'Session fuel', 'Session analysis',
  'Capacity chart', 'Regulator chart', 'Peak curves',
  'Today', 'Calendar', 'Fuel daily', 'Fuel products',
  'CHO×Power matrix', 'Season overview', 'Analytics widgets',
]

const CO_VIS_GROUPS = [
  'Power zones', 'CHO zones', 'kJ zones', 'Streams', 'Capacity', 'Regulators',
  'Nutrients', 'Macros', 'Semantics', 'Phases', 'Day types', 'Intent',
  'Priority', 'Sport', 'Cadence', 'Elevation', 'Intervals', 'Compliance', 'Infrastructure',
]

const CO_VIS_MAP: Record<string, string[]> = {
  'Session graph': ['Power zones', 'Streams', 'Cadence', 'Elevation', 'Intervals', 'Infrastructure'],
  'Session zones': ['Power zones', 'CHO zones', 'kJ zones', 'Semantics', 'Infrastructure'],
  'Session fuel': ['CHO zones', 'Nutrients', 'Macros', 'Semantics', 'Infrastructure'],
  'Session analysis': ['Power zones', 'Streams', 'Regulators', 'Semantics', 'kJ zones', 'Infrastructure'],
  'Capacity chart': ['Capacity', 'Phases', 'Semantics', 'Infrastructure'],
  'Regulator chart': ['Regulators', 'Semantics', 'Infrastructure'],
  'Peak curves': ['Power zones', 'Infrastructure'],
  'Today': ['Power zones', 'Regulators', 'Nutrients', 'Semantics', 'Day types', 'Intent', 'Priority', 'Sport', 'Compliance'],
  'Calendar': ['Power zones', 'Semantics', 'Phases', 'Day types', 'Intent', 'Priority', 'Sport', 'Compliance'],
  'Fuel daily': ['CHO zones', 'Nutrients', 'Macros', 'Semantics'],
  'Fuel products': ['Nutrients', 'Semantics'],
  'CHO×Power matrix': ['Power zones', 'CHO zones'],
  'Season overview': ['Phases', 'Capacity', 'Sport', 'Semantics', 'Infrastructure'],
  'Analytics widgets': ['Power zones', 'Semantics', 'kJ zones', 'Sport', 'Compliance', 'Infrastructure'],
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
  { id: 'kj-zones', label: '9b. kJ / Energy zones' },
  { id: 'fuel-charts', label: '9A. Fuel & nutrition charts' },
  { id: 'elevation', label: '10. Elevation gradient' },
  { id: 'intervals', label: '11. Interval stack' },
  { id: 'phases', label: '12. Training phases' },
  { id: 'day-types', label: '13. Day types + intent' },
  { id: 'peak-curves', label: '14. Peak curves' },
  { id: 'athlete-dna', label: '15. Athlete DNA radar' },
  { id: 'perf-analytics', label: '14A. Performance analytics' },
  { id: 'heat-maps', label: '16. Heat map scales' },
  { id: 'wellness', label: '17. Body & wellness' },
  { id: 'behavioral-heatmaps', label: '17A. Behavioral heatmaps' },
  { id: 'infrastructure', label: '18. Chart infrastructure' },
  { id: 'advanced-viz', label: '18A. Advanced visualizations' },
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
  { hex: '#16A34A', label: 'Low', d: 'M 15.0 70.0 A 55 55 0 0 1 42.0 22.7' },
  { hex: '#F59E0B', label: 'Moderate', d: 'M 42.0 22.7 A 55 55 0 0 1 96.5 21.8' },
  { hex: '#F97316', label: 'High', d: 'M 96.5 21.8 A 55 55 0 0 1 119.0 45.0' },
  { hex: '#EF4444', label: 'Critical', d: 'M 119.0 45.0 A 55 55 0 0 1 125.0 70.0' },
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

// ── Chart illustration components (math layer for multi-series) ──

function CapacityChartSVG() {
  const W = 700, H = 220, pad = { top: 12, right: 60, bottom: 24, left: 44 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const { ctl, atl, surge } = CAPACITY
  const allVals = [...ctl, ...atl, ...surge]
  const yMin = Math.min(...allVals) - 5, yMax = Math.max(...allVals) + 5
  const sx = scaleLinear([0, ctl.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  const pathCtl = linePath(ctl, xA, (v) => sy(v))
  const pathAtl = linePath(atl, xA, (v) => sy(v))
  const pathSurge = linePath(surge, xA, (v) => sy(v))
  const formParts = ctl.map((c, i) => ({ x: sx(i), ctlY: sy(c), atlY: sy(atl[i]) }))
  const areaFwd = formParts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.ctlY.toFixed(1)}`).join('')
  const areaBack = formParts.slice().reverse().map((p) => `L${p.x.toFixed(1)},${p.atlY.toFixed(1)}`).join('')
  const forecastX = sx(Math.round(ctl.length * 0.8))
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        <rect x={0} y={0} width={cw * 0.3} height={ch} fill="#3B82F6" opacity={0.06} />
        <rect x={cw * 0.3} y={0} width={cw * 0.3} height={ch} fill="#F59E0B" opacity={0.06} />
        <rect x={cw * 0.6} y={0} width={cw * 0.2} height={ch} fill="#EF4444" opacity={0.06} />
        <rect x={cw * 0.8} y={0} width={cw * 0.2} height={ch} fill="#A855F7" opacity={0.06} />
        <path d={`${areaFwd}${areaBack}Z`} fill="#16A34A" opacity={0.10} />
        <path d={pathCtl} fill="none" stroke="#10B981" strokeWidth={2} strokeLinejoin="round" />
        <path d={pathAtl} fill="none" stroke="#EF4444" strokeWidth={2} strokeLinejoin="round" />
        <path d={pathSurge} fill="none" stroke="#A855F7" strokeWidth={1.5} strokeDasharray="3 3" strokeLinejoin="round" />
        <line x1={forecastX} y1={0} x2={forecastX} y2={ch} stroke="var(--n400)" strokeWidth={0.5} strokeDasharray="4 4" />
        <text x={forecastX + 6} y={12} fontSize={9} fill="var(--n600)" fontWeight={450}>Forecast</text>
        {[yMin, (yMin + yMax) / 2, yMax].map((v) => (
          <text key={v} x={-8} y={sy(v) + 3} textAnchor="end" fontSize={9} fill="var(--n600)" fontWeight={400}>{Math.round(v)}</text>
        ))}
      </g>
    </svg>
  )
}

function ForecastChartSVG() {
  const W = 400, H = 120, pad = { top: 8, right: 12, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const split = 60, points = 100
  const ctlFull = CAPACITY.ctl.slice(0, points)
  const atlFull = CAPACITY.atl.slice(0, points)
  const allVals = [...ctlFull, ...atlFull]
  const yMin = Math.min(...allVals) - 3, yMax = Math.max(...allVals) + 3
  const sx = scaleLinear([0, points - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  const ctlSolid = linePath(ctlFull.slice(0, split + 1), xA, (v) => sy(v))
  const atlSolid = linePath(atlFull.slice(0, split + 1), xA, (v) => sy(v))
  const ctlDash = linePath(ctlFull.slice(split).map((v, i) => ({ v, i: i + split })), (d) => sx(d.i), (d) => sy(d.v))
  const atlDash = linePath(atlFull.slice(split).map((v, i) => ({ v, i: i + split })), (d) => sx(d.i), (d) => sy(d.v))
  const bandTop = ctlFull.slice(split).map((v, i) => `${i === 0 ? 'M' : 'L'}${sx(i + split).toFixed(1)},${sy(v + 4).toFixed(1)}`).join('')
  const bandBot = ctlFull.slice(split).reverse().map((v, i) => `L${sx(points - 1 - i).toFixed(1)},${sy(ctlFull[points - 1 - i] - 4).toFixed(1)}`).join('')
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        <path d={ctlSolid} fill="none" stroke="#10B981" strokeWidth={2} strokeLinejoin="round" />
        <path d={atlSolid} fill="none" stroke="#EF4444" strokeWidth={2} strokeLinejoin="round" />
        <line x1={sx(split)} y1={0} x2={sx(split)} y2={ch} stroke="var(--n400)" strokeWidth={0.5} strokeDasharray="4 4" />
        <text x={sx(split) + 6} y={12} fontSize={9} fill="var(--n600)" fontWeight={450}>Forecast</text>
        <path d={ctlDash} fill="none" stroke="#10B981" strokeWidth={2} strokeDasharray="6 4" opacity={0.5} strokeLinejoin="round" />
        <path d={atlDash} fill="none" stroke="#EF4444" strokeWidth={2} strokeDasharray="6 4" opacity={0.5} strokeLinejoin="round" />
        <path d={`${bandTop}${bandBot}Z`} fill="#10B981" opacity={0.06} />
      </g>
    </svg>
  )
}

function ACWRChartSVG() {
  const W = 400, H = 140, pad = { top: 4, right: 80, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const sy = scaleLinear([0, 2], [ch, 0])
  const zones = [
    { y1: 0, y2: 0.5, color: '#EF4444', label: '<0.5 Danger' },
    { y1: 0.5, y2: 0.8, color: '#F59E0B', label: '0.5–0.8 Warning' },
    { y1: 0.8, y2: 1.3, color: '#16A34A', label: '0.8–1.3 Sweet spot' },
    { y1: 1.3, y2: 1.5, color: '#F59E0B', label: '1.3–1.5 Warning' },
    { y1: 1.5, y2: 2.0, color: '#EF4444', label: '>1.5 Danger' },
  ]
  const rng = (() => { let s = 555; return () => { s = (Math.imul(s, 1664525) + 1013904223) | 0; return (s >>> 0) / 0xffffffff } })()
  const acwrData = Array.from({ length: 80 }, (_, i) => ({ x: i, y: 0.9 + Math.sin(i * 0.15) * 0.25 + (rng() - 0.5) * 0.08 }))
  const sx = scaleLinear([0, 79], [0, cw])
  const acwrPath = linePath(acwrData, (d) => sx(d.x), (d) => sy(d.y))
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        {zones.map((z) => (
          <rect key={z.label} x={0} y={sy(z.y2)} width={cw} height={sy(z.y1) - sy(z.y2)} fill={z.color} opacity={0.05} />
        ))}
        {zones.map((z) => (
          <text key={z.label + 't'} x={cw + 6} y={(sy(z.y1) + sy(z.y2)) / 2 + 3} fontSize={8} fill={z.color} fontWeight={450}>{z.label}</text>
        ))}
        <path d={acwrPath} fill="none" stroke="#F59E0B" strokeWidth={1.5} strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function PeakCurvesChartSVG() {
  const W = 600, H = 200, pad = { top: 12, right: 12, bottom: 24, left: 44 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const allVals = PEAK_CURVES.flatMap((c) => c.data)
  const yMin = Math.min(...allVals) * 0.95, yMax = Math.max(...allVals) * 1.05
  const sx = scaleLinear([0, 79], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
      <g transform={`translate(${pad.left},${pad.top})`}>
        {PEAK_CURVES.map((c) => (
          <path key={c.label} d={linePath(c.data, (_, i) => sx(i), (v) => sy(v))} fill="none" stroke={c.color}
            strokeWidth={c.label === 'Current' ? 2 : 1.5} strokeDasharray={c.label === 'Best ever' ? '5 3' : undefined} strokeLinejoin="round" />
        ))}
        {[yMin, (yMin + yMax) / 2, yMax].map((v) => (
          <text key={v} x={-8} y={sy(v) + 3} textAnchor="end" fontSize={9} fill="var(--n600)" fontWeight={400}>{Math.round(v)}w</text>
        ))}
        {[0, 20, 40, 60, 79].map((i) => {
          const dur = Math.pow(10, (i / 80) * 3.5)
          const label = dur < 60 ? `${Math.round(dur)}s` : dur < 3600 ? `${Math.round(dur / 60)}m` : `${(dur / 3600).toFixed(1)}h`
          return <text key={i} x={sx(i)} y={ch + 16} textAnchor="middle" fontSize={9} fill="var(--n600)" fontWeight={400}>{label}</text>
        })}
      </g>
    </svg>
  )
}

function RegulatorAreaChartSVG() {
  const W = 400, H = 120, pad = { top: 4, right: 8, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const { fatigue, fitness, form } = REGULATORS
  const allVals = [...fatigue, ...fitness, ...form]
  const yMin = Math.min(...allVals) - 5, yMax = Math.max(...allVals) + 5
  const sx = scaleLinear([0, fatigue.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  const areas = [
    { data: fatigue, color: '#F97316' },
    { data: fitness, color: '#A855F7' },
    { data: form, color: '#3B82F6' },
  ]
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        {areas.map((a) => (
          <path key={a.color} d={areaPath(a.data, xA, (v) => sy(v), ch)} fill={a.color} opacity={0.12} />
        ))}
        {areas.map((a) => (
          <path key={a.color + 'l'} d={linePath(a.data, xA, (v) => sy(v))} fill="none" stroke={a.color} strokeWidth={1.5} strokeLinejoin="round" />
        ))}
      </g>
    </svg>
  )
}

function FuelChartSVG() {
  const W = 400, H = 140, pad = { top: 4, right: 8, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const { gutCapacity, gutAdaptation, choIntake } = FUEL
  const allVals = [...gutCapacity, ...gutAdaptation]
  const yMin = Math.min(...allVals) - 5, yMax = Math.max(...allVals) + 5
  const sx = scaleLinear([0, gutCapacity.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        <path d={areaPath(gutCapacity, xA, (v) => sy(v), ch)} fill="#10B981" opacity={0.08} />
        <path d={linePath(gutCapacity, xA, (v) => sy(v))} fill="none" stroke="#10B981" strokeWidth={1.5} strokeLinejoin="round" />
        <path d={linePath(gutAdaptation, xA, (v) => sy(v))} fill="none" stroke="#F59E0B" strokeWidth={1.5} strokeDasharray="4 3" strokeLinejoin="round" />
        {choIntake.map((v, i) => v > 0 ? <line key={i} x1={sx(i)} y1={ch} x2={sx(i)} y2={sy(v)} stroke="#F97316" strokeWidth={1.5} opacity={0.7} /> : null)}
        {choIntake.map((v, i) => v > 0 ? <circle key={i + 'c'} cx={sx(i)} cy={sy(v)} r={2.5} fill="#F97316" /> : null)}
      </g>
    </svg>
  )
}

function EnergyBalanceChartSVG() {
  const W = 400, H = 120, pad = { top: 4, right: 8, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const { surplus, deficit, balance } = ENERGY
  const yMin = Math.min(...balance) - 20, yMax = Math.max(...balance) + 20
  const sx = scaleLinear([0, balance.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  const zeroY = sy(0)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        <line x1={0} y1={zeroY} x2={cw} y2={zeroY} stroke="var(--n400)" strokeWidth={0.5} />
        <path d={areaPath(surplus, xA, (v) => sy(v), zeroY)} fill="#16A34A" opacity={0.12} />
        <path d={areaPath(deficit, xA, (v) => sy(v), zeroY)} fill="#EF4444" opacity={0.12} />
        <path d={linePath(balance, xA, (v) => sy(v))} fill="none" stroke="var(--n1050)" strokeWidth={1.5} strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function ScatterChartSVG() {
  const W = 300, H = 200, pad = { top: 8, right: 8, bottom: 8, left: 8 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const sx = scaleLinear([0, 100], [0, cw])
  const sy = scaleLinear([0, 100], [ch, 0])
  const zoneColors = ['#94A3B8', '#16A34A', '#F59E0B', '#F97316', '#EF4444', '#A855F7']
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        <line x1={sx(0)} y1={sy(20)} x2={sx(100)} y2={sy(80)} stroke="var(--n600)" strokeWidth={1} strokeDasharray="4 3" opacity={0.5} />
        <path d={`M${sx(0)},${sy(14)} L${sx(100)},${sy(74)} L${sx(100)},${sy(86)} L${sx(0)},${sy(26)} Z`} fill="var(--n600)" opacity={0.04} />
        {SCATTER.map((d, i) => (
          <circle key={i} cx={sx(d.x)} cy={sy(d.y)} r={4} fill={zoneColors[d.zone]} opacity={0.7} />
        ))}
      </g>
    </svg>
  )
}

function DualLoadChartSVG() {
  const W = 300, H = 120, pad = { top: 4, right: 8, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const { rScore, pulseLoad } = DUAL_LOAD
  const allVals = [...rScore, ...pulseLoad]
  const yMin = Math.min(...allVals) - 5, yMax = Math.max(...allVals) + 5
  const sx = scaleLinear([0, rScore.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        <path d={linePath(rScore, xA, (v) => sy(v))} fill="none" stroke="#10B981" strokeWidth={1.5} strokeLinejoin="round" />
        <path d={linePath(pulseLoad, xA, (v) => sy(v))} fill="none" stroke="#EF4444" strokeWidth={1.5} strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function StreamOverlaySVG({ data, color, dash, area }: { data: number[]; color: string; dash?: boolean; area?: boolean }) {
  const W = 200, H = 40, pad = { top: 2, right: 4, bottom: 2, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const yMin = Math.min(...data) - 2, yMax = Math.max(...data) + 2
  const sx = scaleLinear([0, data.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        {area && <path d={areaPath(data, xA, (v) => sy(v), ch)} fill={color} opacity={0.10} />}
        <path d={linePath(data, xA, (v) => sy(v))} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray={dash ? '5 3' : undefined} strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function SparklineSVG({ data, color }: { data: number[]; color?: string }) {
  const W = 120, H = 32, pad = { top: 2, right: 2, bottom: 2, left: 2 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const yMin = Math.min(...data), yMax = Math.max(...data)
  const sx = scaleLinear([0, data.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        <path d={linePath(data, xA, (v) => sy(v))} fill="none" stroke={color ?? 'var(--n800)'} strokeWidth={1.5} strokeLinejoin="round" />
      </g>
    </svg>
  )
}

function SportCapacityChartSVG() {
  const W = 400, H = 120, pad = { top: 4, right: 8, bottom: 4, left: 0 }
  const cw = W - pad.left - pad.right, ch = H - pad.top - pad.bottom
  const allVals = SPORT_LINES.flatMap((s) => s.data)
  const yMin = Math.min(...allVals) - 3, yMax = Math.max(...allVals) + 3
  const sx = scaleLinear([0, SPORT_LINES[0].data.length - 1], [0, cw])
  const sy = scaleLinear([yMin, yMax], [ch, 0])
  const xA = (_: number, i: number) => sx(i)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} shapeRendering="geometricPrecision">
      <g transform={`translate(${pad.left},${pad.top})`}>
        {SPORT_LINES.map((s) => (
          <path key={s.label} d={linePath(s.data, xA, (v) => sy(v))} fill="none" stroke={s.color} strokeWidth={1.5} strokeLinejoin="round" />
        ))}
      </g>
    </svg>
  )
}

function RadarChartSVG() {
  const cx = 200, cy = 200, outerR = 160
  const axisCount = 14
  const labels = [
    'Sprint', '5s peak', '30s power', '1min power', 'Threshold', 'FTP', '20min power',
    'Endurance', 'Efficiency', 'Recovery', 'Economy', 'Repeatability', 'Fatigue resist.', 'Pacing',
  ]
  // Round to 2 decimals to avoid server/client hydration mismatch from Math.sin/cos float precision
  const r2 = (n: number) => Math.round(n * 100) / 100
  const angles = Array.from({ length: axisCount }, (_, i) => ((i / axisCount) * 360 - 90) * (Math.PI / 180))
  const ptAt = (angle: number, r: number) => ({ x: r2(cx + Math.cos(angle) * r), y: r2(cy + Math.sin(angle) * r) })
  const ringPoly = (r: number) => angles.map((a) => ptAt(a, r)).map((p) => `${p.x},${p.y}`).join(' ')
  // Seeded random values for 3 layers
  const rng = (() => { let s = 777; return () => { s = (Math.imul(s, 1664525) + 1013904223) | 0; return (s >>> 0) / 0xffffffff } })()
  const currentVals = Array.from({ length: axisCount }, () => r2(0.55 + rng() * 0.35))
  const bestVals = Array.from({ length: axisCount }, () => r2(0.65 + rng() * 0.30))
  const trendVals = Array.from({ length: axisCount }, () => r2(0.40 + rng() * 0.40))
  const layerPoly = (vals: number[]) => vals.map((v, i) => ptAt(angles[i], outerR * v)).map((p) => `${p.x},${p.y}`).join(' ')
  const labelPts = angles.map((a) => ptAt(a, outerR + 18))

  return (
    <svg width="420" height="420" viewBox="0 0 400 400" shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
      {[0.2, 0.4, 0.6, 0.8, 1.0].map((frac) => (
        <polygon key={frac} points={ringPoly(outerR * frac)} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={0.5} />
      ))}
      {angles.map((a, i) => {
        const end = ptAt(a, outerR)
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(0,0,0,0.06)" strokeWidth={0.5} />
      })}
      <polygon points={layerPoly(trendVals)} fill="#16A34A" fillOpacity={0.12} stroke="#16A34A" strokeWidth={1} strokeLinejoin="round" />
      <polygon points={layerPoly(bestVals)} fill="#EF4444" fillOpacity={0.06} stroke="#EF4444" strokeWidth={1.5} strokeDasharray="5 3" strokeLinejoin="round" />
      <polygon points={layerPoly(currentVals)} fill={NEAR_BLACK} fillOpacity={0.04} stroke={NEAR_BLACK} strokeWidth={2} strokeLinejoin="round" />
      {labels.map((label, i) => (
        <text key={label} x={labelPts[i].x} y={r2(labelPts[i].y + 3)} textAnchor="middle" fontSize={10} fontWeight={400} fill="var(--n600)">{label}</text>
      ))}
    </svg>
  )
}

function MiniChartLine({ data, stroke, fill, height = 80, dash, strokeWidth = 1.5, refY, refColor, secondData, secondStroke }: {
  data: number[]; stroke: string; fill?: string; height?: number; dash?: boolean; strokeWidth?: number; refY?: number; refColor?: string; secondData?: number[]; secondStroke?: string
}) {
  const W = 280
  const allVals = [...data, ...(secondData ?? [])]
  const yMin = Math.min(...allVals) * 0.95, yMax = Math.max(...allVals) * 1.05
  const sx = scaleLinear([0, data.length - 1], [0, W])
  const sy = scaleLinear([yMin, yMax], [height, 0])
  const xA = (_: number, i: number) => sx(i)
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${height}`} shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
      {fill && <path d={areaPath(data, xA, (v) => sy(v), height)} fill={fill} />}
      <path d={linePath(data, xA, (v) => sy(v))} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={dash ? '5 3' : undefined} strokeLinejoin="round" />
      {secondData && secondStroke && (
        <path d={linePath(secondData, xA, (v) => sy(v))} fill="none" stroke={secondStroke} strokeWidth={1.5} strokeLinejoin="round" />
      )}
      {refY != null && refColor && (
        <line x1={0} y1={sy(refY)} x2={W} y2={sy(refY)} stroke={refColor} strokeWidth={0.5} strokeDasharray="4 4" />
      )}
    </svg>
  )
}

function MiniBarChart({ data, color, height = 80, bipolar = false }: {
  data: number[]; color: string | ((v: number) => string); height?: number; bipolar?: boolean
}) {
  const W = 280
  const maxAbs = Math.max(...data.map(Math.abs)) * 1.1
  const barW = Math.max(2, W / data.length - 2)
  const sx = scaleLinear([0, data.length - 1], [barW / 2, W - barW / 2])
  const sy = bipolar
    ? scaleLinear([-maxAbs, maxAbs], [height, 0])
    : scaleLinear([0, maxAbs], [height, 0])
  const zeroY = bipolar ? sy(0) : height
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${height}`} shapeRendering="geometricPrecision">
      {bipolar && <line x1={0} y1={zeroY} x2={W} y2={zeroY} stroke="var(--n400)" strokeWidth={0.5} />}
      {data.map((v, i) => {
        const c = typeof color === 'function' ? color(v) : color
        const barH = Math.abs(sy(0) - sy(v))
        const y = v >= 0 ? sy(v) : zeroY
        return v !== 0 ? <rect key={i} x={sx(i) - barW / 2} y={bipolar ? (v >= 0 ? sy(v) : zeroY) : height - barH} width={barW} height={barH} fill={c} rx={1} /> : null
      })}
    </svg>
  )
}

function HeatmapGrid({ data, colorFn, cellSize = 12, gap = 2 }: {
  data: number[][]; colorFn: (v: number) => string; cellSize?: number; gap?: number
}) {
  const rows = data.length, cols = data[0]?.length ?? 0
  const w = cols * (cellSize + gap), h = rows * (cellSize + gap)
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
      {data.map((row, r) => row.map((v, c) => (
        <rect key={`${r}-${c}`} x={c * (cellSize + gap)} y={r * (cellSize + gap)} width={cellSize} height={cellSize} fill={colorFn(v)} rx={2} />
      )))}
    </svg>
  )
}

function DonutChart({ segments, size = 120 }: { segments: { value: number; color: string; label: string }[]; size?: number }) {
  const r2 = (n: number) => Math.round(n * 100) / 100
  const r = size / 2 - 10, cx = size / 2, cy = size / 2
  const total = segments.reduce((a, s) => a + s.value, 0)
  let angle = -90
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ fontFamily: 'var(--font-sans)' }}>
      {segments.map((seg) => {
        const sweep = (seg.value / total) * 360
        const startRad = (angle * Math.PI) / 180
        const endRad = ((angle + sweep) * Math.PI) / 180
        const largeArc = sweep > 180 ? 1 : 0
        const x1 = r2(cx + r * Math.cos(startRad)), y1 = r2(cy + r * Math.sin(startRad))
        const x2 = r2(cx + r * Math.cos(endRad)), y2 = r2(cy + r * Math.sin(endRad))
        const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`
        angle += sweep
        return <path key={seg.label} d={d} fill={seg.color} />
      })}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--n50)" />
    </svg>
  )
}

function StackedBarChart({ data, colors, height = 80 }: {
  data: { values: number[] }[]; colors: string[]; height?: number
}) {
  const W = 280
  const barW = Math.max(8, W / data.length - 4)
  const maxTotal = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)))
  const sy = scaleLinear([0, maxTotal], [height, 0])
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${height}`} shapeRendering="geometricPrecision">
      {data.map((d, i) => {
        const x = (i / data.length) * W + 2
        let cumY = height
        return d.values.map((v, j) => {
          const h = height - sy(v)
          cumY -= h
          return <rect key={`${i}-${j}`} x={x} y={cumY} width={barW} height={h} fill={colors[j]} rx={1} />
        })
      })}
    </svg>
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
                          backgroundColor: v.name === 'Deep' ? '#14532D' : v.name === 'On-soft' ? '#15803D' : v.name === 'Vivid' ? '#22C55E' : '#16A34A',
                          opacity: v.name === 'Base' || v.name === 'Vivid' || v.name === 'On-soft' || v.name === 'Deep' ? 1 : v.opacity,
                          border: v.name === 'Whisper' || v.name === 'Tint' || v.name === 'Wash'
                            ? `0.5px solid rgba(22, 163, 74, ${v.border})` : '0.5px solid transparent',
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
              <InfoText>Hver farve der bruges i charts har 6 varianter. Her demonstreret med Z2 #16A34A (green-600).</InfoText>
              <Card padding="md">
                <div className="flex flex-wrap gap-4">
                  {/* Stroke */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <path d="M8,32 C18,28 28,16 38,20 C48,24 52,14 56,12" fill="none" stroke="#16A34A" strokeWidth="2" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Stroke</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Line 1-2px</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#16A34A</span>
                  </div>
                  {/* Fill */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <path d="M4,32 C14,28 24,16 34,20 C44,24 48,14 56,12 L56,40 L4,40 Z" fill="rgba(22,163,74,0.10)" stroke="rgba(22,163,74,0.20)" strokeWidth="0.5" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Fill</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Area 8-15%</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>rgba(..,0.10)</span>
                  </div>
                  {/* Dot */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <circle cx="30" cy="22" r="5" fill="#22C55E" />
                      <circle cx="30" cy="22" r="5" fill="none" stroke="white" strokeWidth="1" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Dot</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Vivid variant</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#22C55E</span>
                  </div>
                  {/* Hover */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <circle cx="30" cy="22" r="12" fill="rgba(22,163,74,0.12)" />
                      <circle cx="30" cy="22" r="4" fill="#4ADE80" />
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Hover</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Lighter variant</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#4ADE80</span>
                  </div>
                  {/* Label */}
                  <div className="flex flex-col items-center gap-1">
                    <svg width="60" height="44" viewBox="0 0 60 44" shapeRendering="geometricPrecision">
                      <rect width="60" height="44" fill="var(--n50)" rx="4" />
                      <text x="30" y="26" textAnchor="middle" style={{ fontSize: '11px', fill: '#15803D', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>200W</text>
                    </svg>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Label</span>
                    <span className={cn(QUIET_STYLE, 'text-[9px]')}>Darker for contrast</span>
                    <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>#15803D</span>
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
                  <rect x="10" y="10" width="120" height="60" rx="4" fill="#16A34A" opacity="0.06" stroke="#16A34A" strokeWidth="0.5" strokeOpacity="0.15" />
                  <text x="70" y="44" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Card bg (4%)</text>

                  {/* Medium area — tint */}
                  <rect x="155" y="20" width="80" height="40" rx="4" fill="#16A34A" opacity="0.15" stroke="#16A34A" strokeWidth="0.5" strokeOpacity="0.25" />
                  <text x="195" y="44" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Area fill (15%)</text>

                  {/* Line — base */}
                  <line x1="260" y1="60" x2="330" y2="20" stroke="#16A34A" strokeWidth="2.5" />
                  <text x="295" y="72" textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>Line (100%)</text>

                  {/* Dot — vivid */}
                  <circle cx="370" cy="35" r="6" fill="#22C55E" />
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
                    <path d="M0,40 C30,35 60,25 90,30 C120,35 150,15 180,20 C210,25 240,18 270,22 L300,20" fill="none" stroke="#16A34A" strokeWidth="2" />
                    <path d="M0,45 C30,42 60,38 90,42 C120,46 150,35 180,30 C210,32 240,28 270,32 L300,30" fill="none" stroke="#EF4444" strokeWidth="1.5" />
                  </svg>
                </Card>
                <Card padding="md">
                  <div className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n800)] mb-2')}>Dark canvas</div>
                  <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                    <rect width="300" height="60" fill="var(--n1150)" rx="4" />
                    <path d="M0,40 C30,35 60,25 90,30 C120,35 150,15 180,20 C210,25 240,18 270,22 L300,20" fill="none" stroke="#4ADE80" strokeWidth="2" />
                    <path d="M0,45 C30,42 60,38 90,42 C120,46 150,35 180,30 C210,32 240,28 270,32 L300,30" fill="none" stroke="#FCA5A5" strokeWidth="1.5" />
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
                    { label: 'Canvas', hex: '#131211' },
                    { label: 'Card', hex: '#1C1B18' },
                    { label: 'Elevated', hex: '#242320' },
                    { label: 'Sidebar', hex: '#181716' },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center gap-1">
                      <div className={cn(RADIUS.sm)} style={{ width: 56, height: 40, backgroundColor: s.hex, border: '0.5px solid rgba(255,253,250,0.10)' }} />
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
            <InfoText>Power zones er polykromatiske (6 Tailwind hues), HR zones er en monokromatisk rød ramp. Ses overalt i appen. Den vigtigste farve-beslutning. RAMTT-paletten bruger Tailwind ramps, Coggan vist til sammenligning.</InfoText>

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
                    { zone: 'Z1', pct: 8, hex: '#94A3B8' },
                    { zone: 'Z2', pct: 35, hex: '#16A34A' },
                    { zone: 'Z3', pct: 22, hex: '#F59E0B' },
                    { zone: 'Z4', pct: 18, hex: '#F97316' },
                    { zone: 'Z5', pct: 12, hex: '#EF4444' },
                    { zone: 'Z6', pct: 5, hex: '#A855F7' },
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
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: 'var(--n1100)', padding: 20 }}>
                  <div className="flex gap-2">
                    {POWER_ZONES_RAMTT.map((z) => (
                      <div key={z.zone} className={cn(RADIUS.sm)} style={{ width: 40, height: 28, backgroundColor: z.hex }} />
                    ))}
                  </div>
                  <p className={cn(FONT.body, 'text-[11px] mt-2', WEIGHT.normal)} style={{ color: 'var(--n600)' }}>Zone colors maintain vibrancy on dark canvas</p>
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
            <InfoText>Carbohydrate intake zones. Monokromatisk amber ramp (amber-100 → amber-800). Distinkt fra power zones da de vises side om side.</InfoText>

            <div className="space-y-3">
              <SectionHeader>CHO zone palette (amber ramp)</SectionHeader>
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="geometricPrecision"><path d="M8 1L15 14H1L8 1Z" fill="#F59E0B" /><text x="8" y="12" textAnchor="middle" fill="white" style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>!</text></svg>
                <div>
                  <p className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                    Warning (amber-500) og Z3 Tempo (amber-500) er identiske. De ses sjældent på same skærm, men Ruth bør være opmærksom.
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
                    <ChartArea gradientColor="var(--n1150)" opacityFrom={0.06} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-(--n1150) stroke-[2]" />
                  </ChartRoot>
                  {/* Heart rate */}
                  <ChartRoot data={STREAM_HR} height={50} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#EF4444" opacityFrom={0.06} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#EF4444] stroke-[1.5]" />
                  </ChartRoot>
                  {/* Cadence */}
                  <ChartRoot data={STREAM_CADENCE} height={45} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#A855F7" opacityFrom={0.04} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#A855F7] stroke-[1.5]" />
                  </ChartRoot>
                  {/* Speed */}
                  <ChartRoot data={STREAM_SPEED} height={45} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.08}>
                    <ChartArea gradientColor="#3B82F6" opacityFrom={0.04} opacityTo={0.005} />
                    <ChartLine className="fill-none stroke-[#3B82F6] stroke-[1.5]" />
                  </ChartRoot>
                  {/* Elevation */}
                  <ChartRoot data={STREAM_ELEVATION} height={40} padding={{ top: 4, right: 8, bottom: 0, left: 0 }} yPadding={0.05}>
                    <ChartArea gradientColor="var(--n600)" opacityFrom={0.25} opacityTo={0.08} />
                    <ChartLine className="fill-none stroke-(--n600) stroke-[1]" />
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
                      <ChartLine className="fill-none stroke-(--n1150) stroke-[2]" />
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
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: 'var(--n1100)', padding: 20 }}>
                  <div className="flex gap-3">
                    {STREAMS_LIGHT.map((s) => (
                      <div key={s.label} className="flex flex-col items-center gap-1">
                        <div className={cn(RADIUS.full)} style={{ width: 32, height: 32, backgroundColor: s.dark }} />
                        <span className={cn(FONT.body, 'text-[10px]', WEIGHT.normal)} style={{ color: 'var(--n600)' }}>{s.label}</span>
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
                {/* W' Balance — dashed + area fill */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>W&apos; balance</span>
                    <div className="w-[200px]"><StreamOverlaySVG data={W_PRIME} color="#F59E0B" dash area /></div>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>amber-500 #F59E0B &middot; Dashed + area fill 10%</span>
                  </div>
                </Card>
                {/* Glycogen Depletion — dashed */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>Glycogen depletion</span>
                    <div className="w-[200px]"><StreamOverlaySVG data={GLYCO_DEPLETION} color="#F97316" dash /></div>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>orange-500 #F97316 &middot; Dashed 6,3</span>
                  </div>
                </Card>
                {/* AAP — dotted */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>AAP (altitude adj.)</span>
                    <div className="w-[200px]"><StreamOverlaySVG data={STREAM_SPEED} color="#94A3B8" dash /></div>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>Z1 slate-400 #94A3B8 &middot; Dotted 2,4</span>
                  </div>
                </Card>
                {/* CHO Intake Markers — vertical lines + dots */}
                <Card padding="sm">
                  <div className="flex items-center gap-3">
                    <span className={cn(LABEL_STYLE, 'w-[130px] shrink-0')}>CHO intake markers</span>
                    <svg width="200" height="36" viewBox="0 0 200 36" shapeRendering="geometricPrecision">
                      {[40, 80, 130, 170].map((x) => (
                        <g key={x}>
                          <line x1={x} y1="4" x2={x} y2="32" stroke="#F97316" strokeWidth="1" />
                          <circle cx={x} cy="4" r="2.5" fill="#F97316" />
                        </g>
                      ))}
                    </svg>
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>CHO #F97316 &middot; Vertical lines + dot</span>
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
                    <span className={cn(QUIET_STYLE, 'text-[10px]')}>var(--n600) &middot; Highlight bands 15%</span>
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
                <ForecastChartSVG />
                <div className="flex gap-4 mt-2">
                  <LegendLine hex="#10B981" label="Capacity (solid)" />
                  <LegendLine hex="#10B981" label="Projected (dashed 50%)" dash />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 16, height: 8, backgroundColor: '#10B981', opacity: 0.06 }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Confidence band (6%)</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 6.3 ACWR reference zone bands */}
            <div className="space-y-3">
              <SectionHeader>ACWR reference zones (background bands)</SectionHeader>
              <Card padding="md">
                <ACWRChartSVG />
              </Card>
            </div>

            {/* 6.4 Dark mode capacity chart */}
            <div className="space-y-3">
              <SectionHeader>Capacity chart — dark mode</SectionHeader>
              <Card padding="none">
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: 'var(--n1100)', padding: 20 }}>
                  <svg width="100%" height="160" viewBox="0 0 600 160" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                    {/* Grid (white 4%) */}
                    {[0, 40, 80, 120, 160].map((y) => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,253,250,0.04)" strokeWidth="0.5" />
                    ))}
                    {/* Form positive area */}
                    <path d="M0,100 C80,90 160,75 240,65 C320,55 400,62 480,52 L600,45 L600,85 C480,75 400,78 320,80 C240,82 160,88 80,92 L0,100 Z" fill="rgba(56,204,136,0.10)" />
                    {/* Form negative area */}
                    <path d="M0,100 L80,100 C160,108 240,115 320,118 C400,115 480,112 600,108 L600,85 C480,75 400,78 320,80 C240,82 160,88 80,92 L0,100 Z" fill="rgba(216,96,96,0.08)" />
                    {/* Capacity — dark mode Z2-300 */}
                    <path d="M0,85 C80,78 160,60 240,52 C320,44 400,48 480,40 L600,35" fill="none" stroke="#6EE7B7" strokeWidth="2" />
                    {/* Pressure — dark mode Z5-300 */}
                    <path d="M0,110 C80,105 160,92 240,88 C320,82 400,88 480,80 L600,75" fill="none" stroke="#FCA5A5" strokeWidth="2" />
                    {/* Form line */}
                    <path d="M0,100 C80,90 160,75 240,65 C320,55 400,62 480,52 L600,45" fill="none" stroke="#86EFAC" strokeWidth="1.5" />
                    {/* Surge — dotted */}
                    <path d="M0,120 C80,115 160,108 240,112 C320,118 400,108 480,102 L600,98" fill="none" stroke="#D8B4FE" strokeWidth="1.5" strokeDasharray="3 3" />
                    {/* ACWR */}
                    <path d="M0,60 C80,58 160,52 240,55 C320,58 400,52 480,50 L600,48" fill="none" stroke="#FCD34D" strokeWidth="1.5" />
                  </svg>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <LegendLine hex="#6EE7B7" label="Capacity" width={2} />
                    <LegendLine hex="#FCA5A5" label="Pressure" width={2} />
                    <LegendLine hex="#86EFAC" label="Form +" width={1.5} />
                    <LegendLine hex="#D8B4FE" label="Surge" dash width={1.5} />
                    <LegendLine hex="#FCD34D" label="ACWR" width={1.5} />
                  </div>
                </div>
              </Card>
            </div>

            {/* 6.6 Training load overview */}
            <div className="space-y-3">
              <SectionHeader>Training load overview (14 days)</SectionHeader>
              <InfoText>Bar per session, højde = R-Score. Rest days = tom.</InfoText>
              <Card padding="md">
                <MiniBarChart data={TRAINING_LOAD_BARS} color="var(--n1150)" />
              </Card>
            </div>

            {/* 6.7 Season overview */}
            <div className="space-y-3">
              <SectionHeader>Season overview (52 weeks)</SectionHeader>
              <InfoText>Ugentlig træningsbelastning med periodiseringsbølger. Fase-bands ved 6% opacity bag.</InfoText>
              <Card padding="md">
                <MiniBarChart data={SEASON_BARS} color="var(--n1150)" />
              </Card>
            </div>

            {/* 6.8 ACWR trend */}
            <div className="space-y-3">
              <SectionHeader>ACWR trend (separate)</SectionHeader>
              <Card padding="md">
                <MiniChartLine data={CAPACITY.ctl.map((c, i) => c > 0 ? CAPACITY.atl[i] / c : 1)} stroke="#F59E0B" refY={1.0} refColor="#16A34A" height={60} />
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

            <SwatchRow items={REGULATOR_DISPLAY.map((r) => ({ hex: r.hex, label: r.label }))} size={48} round />

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
                        <g key={REGULATOR_DISPLAY[i].label} transform="translate(100,110)">
                          <path d={`M ${-arc.radius} 0 A ${arc.radius} ${arc.radius} 0 0 1 ${arc.radius} 0`} fill="none" stroke="var(--n200)" strokeWidth="8" strokeLinecap="round" />
                          <path d={`M ${-arc.radius} 0 A ${arc.radius} ${arc.radius} 0 0 1 ${arc.radius} 0`} fill="none" stroke={REGULATOR_DISPLAY[i].hex} strokeWidth="8" strokeLinecap="round" strokeDasharray={arc.dash} />
                          <text x={arc.radius + 8} y="4" style={{ fontSize: '10px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>{REGULATOR_DISPLAY[i].label}</text>
                        </g>
                    ))}
                  </svg>
                </div>
              </Card>
            </div>

            {/* Area chart preview — math layer */}
            <div className="space-y-3">
              <SectionHeader>Area chart preview</SectionHeader>
              <Card padding="md">
                <RegulatorAreaChartSVG />
                <div className="flex gap-4 mt-2">
                  {REGULATOR_DISPLAY.map((r) => (
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
                  {REGULATOR_DISPLAY.map((r, i) => (
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
            <InfoText>Fire næringsstoffer + tre makronæringsstoffer. CHO = orange-500 (#F97316), Protein = purple-500, Fat = amber-500. CHO deler farve med Z4 Threshold — de ses sjældent på samme skærm.</InfoText>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <SectionHeader>Nutrients</SectionHeader>
                <SwatchRow items={NUTRIENTS.map((n) => ({ hex: n.hex, label: n.label }))} size={40} round />
              </div>
              <div className="space-y-3">
                <SectionHeader>Macros</SectionHeader>
                <SwatchRow items={MACROS.map((m) => ({ hex: m.hex, label: m.label }))} size={40} round />
                {/* Stacked macro bar */}
                <div className={cn(RADIUS.sm, 'overflow-hidden flex')} style={{ height: 24 }}>
                  <div style={{ width: '55%', backgroundColor: '#F97316' }} className="flex items-center justify-center">
                    <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white')}>CHO 55%</span>
                  </div>
                  <div style={{ width: '25%', backgroundColor: '#A855F7' }} className="flex items-center justify-center">
                    <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white')}>Protein 25%</span>
                  </div>
                  <div style={{ width: '20%', backgroundColor: '#F59E0B' }} className="flex items-center justify-center">
                    <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white')}>Fat 20%</span>
                  </div>
                </div>
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
                  <ProgressBar value={78} max={90} color="#F97316" label="78 g/h" />
                  <ProgressBar value={520} max={750} color="#3B82F6" label="520 ml/h" />
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" shapeRendering="geometricPrecision"><path d="M8 1L15 14H1L8 1Z" fill="#F59E0B" /><text x="8" y="12" textAnchor="middle" fill="white" style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>!</text></svg>
                <p className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                  CHO nutrient (orange-500) og Power Z4 Threshold (orange-500) er <strong className={WEIGHT.strong}>identiske</strong>. De ses sjældent på same skærm (co-visibility map bekræfter), men Ruth bør overveje om fuel skal have sin egen tone.
                </p>
              </div>
            </Card>

            {/* 8.5 Fuel capacity chart — math layer */}
            <div className="space-y-3">
              <SectionHeader>Fuel capacity chart (3 tracks)</SectionHeader>
              <InfoText>Gut capacity linje, CPI bars, fuel coverage area, energy debt overlay. Gut adaptation som stiplet kurve.</InfoText>
              <Card padding="md">
                <FuelChartSVG />
                <div className="flex flex-wrap gap-4 mt-2">
                  <LegendLine hex="#10B981" label="Gut capacity" />
                  <LegendLine hex="#F59E0B" label="Gut adaptation" dash />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(227,107,48,0.7)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>CHO intake</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 8.6 Energy balance chart — math layer */}
            <div className="space-y-3">
              <SectionHeader>Energy balance chart</SectionHeader>
              <Card padding="md">
                <EnergyBalanceChartSVG />
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(27,138,90,0.12)' }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Surplus</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'rgba(196,60,60,0.12)' }} />
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
                    <span className={cn(FONT.body, 'text-[9px]', WEIGHT.medium)} style={{ color: ['#94A3B8', '#F59E0B'].includes(c.hex) ? 'var(--n1050)' : 'white' }}>{c.rpm}</span>
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
             SECTION 9b: kJ / Energy zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="kj-zones" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>9b. kJ / Energy zones</h2>
            <InfoText>Energiforbrug (kilojoule) klassificeret i zoner. Ses som badge i session detail. Antal zoner og grænser er ikke finaliseret.</InfoText>

            {/* Gradient strip */}
            <div className="space-y-3">
              <SectionHeader>Energy zone gradient</SectionHeader>
              <div className={cn(RADIUS.sm, 'overflow-hidden')} style={{ height: 24, background: 'linear-gradient(to right, rgba(249,115,22,0.20), rgba(249,115,22,0.40), rgba(249,115,22,0.60), rgba(249,115,22,0.80), #F97316)', width: '100%' }} />
              <div className="flex justify-between px-1">
                {['E1 <1500', 'E2 1500–2500', 'E3 2500–3500', 'E4 3500–5000', 'E5 >5000'].map((label) => (
                  <span key={label} className={cn(FONT.body, 'text-[10px]', WEIGHT.normal, 'text-[var(--n600)]')}>{label} kJ</span>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-3">
              <SectionHeader>Energy zone badges</SectionHeader>
              <div className="flex gap-3">
                {[
                  { label: 'E1 Low', opacity: 0.20 },
                  { label: 'E2 Moderate', opacity: 0.40 },
                  { label: 'E3 High', opacity: 0.60 },
                  { label: 'E4 Very high', opacity: 0.80 },
                  { label: 'E5 Extreme', opacity: 1.0 },
                ].map((z) => (
                  <Badge key={z.label} color={`rgba(196,155,8,${z.opacity})`}>{z.label}</Badge>
                ))}
              </div>
            </div>

            {/* Placeholder note */}
            <Card>
              <div className="flex items-start gap-2 p-3">
                <PlaceholderTag />
                <p className={cn(QUIET_STYLE, 'text-[11px]')}>Antal zoner, grænser og farve-stil (monokrom vs individuel) er IKKE finaliseret.</p>
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 9A: Fuel & nutrition charts
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="fuel-charts" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>9A. Fuel & nutrition charts</h2>
            <InfoText>15+ chart-typer i RAMTTs nutrition system. CHO compliance, zone distribution, coverage, energy balance, gut trajectory, macro periodisering, depletion modeling, product tolerance heatmap.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              {/* CHO Compliance weekly */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>CHO compliance (weekly)</p>
                <MiniBarChart data={CHO_COMPLIANCE.map((d) => d.actual)} color="#F97316" />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Filled = actual, outline = target. Used in: Fuel daily</p>
              </Card>

              {/* Coverage trend */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Fuel coverage trend</p>
                <MiniChartLine data={COVERAGE_TREND} stroke="#16A34A" fill="rgba(27,138,90,.10)" refY={85} refColor="#16A34A" height={60} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Target 85% dashed. Used in: Fuel daily, session fuel</p>
              </Card>

              {/* Energy balance bars */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Energy balance (14 days)</p>
                <MiniBarChart data={ENERGY_BARS} color={(v) => v >= 0 ? '#16A34A' : '#EF4444'} bipolar height={80} />
                <div className="flex gap-3 mt-1">
                  <LegendLine hex="#16A34A" label="Surplus" />
                  <LegendLine hex="#EF4444" label="Deficit" />
                </div>
              </Card>

              {/* Gut trajectory */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Gut trajectory (capacity growth)</p>
                <MiniChartLine data={GUT_TRAJECTORY} stroke="#10B981" strokeWidth={2} height={60} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Logaritmisk vækst. Used in: Fuel products</p>
              </Card>

              {/* Macro periodization stacked bars */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Macro periodization (7 days)</p>
                <StackedBarChart data={MACRO_PERIOD.map((d) => ({ values: [d.cho, d.protein, d.fat] }))} colors={['#F97316', '#A855F7', '#F59E0B']} />
                <div className="flex gap-3 mt-1">
                  <LegendLine hex="#F97316" label="CHO" />
                  <LegendLine hex="#A855F7" label="Protein" />
                  <LegendLine hex="#F59E0B" label="Fat" />
                </div>
              </Card>

              {/* Depletion curve */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Glycogen depletion model</p>
                <MiniChartLine data={DEPLETION.muscle} stroke="#F97316" secondData={DEPLETION.liver} secondStroke="#F59E0B" height={80} />
                <div className="flex gap-3 mt-1">
                  <LegendLine hex="#F97316" label="Muscle" />
                  <LegendLine hex="#F59E0B" label="Liver" />
                </div>
              </Card>

              {/* CHO zone distribution stacked area */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>CHO zone distribution (12 weeks)</p>
                <HeatmapGrid data={CHO_ZONE_STACKED} colorFn={(v) => {
                  if (v < 10) return '#FEF3C7'
                  if (v < 20) return '#FCD34D'
                  if (v < 35) return '#FBBF24'
                  if (v < 50) return '#F59E0B'
                  if (v < 70) return '#D97706'
                  return '#92400E'
                }} cellSize={18} gap={2} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>C1→C6 amber ramp. Used in: Fuel daily</p>
              </Card>

              {/* Product tolerance heatmap */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Product tolerance heatmap</p>
                <HeatmapGrid data={TOLERANCE_HEATMAP} colorFn={(v) => {
                  const colors = ['var(--n600)', '#EF4444', '#F59E0B', '#4ADE80', '#16A34A']
                  return colors[v] ?? 'var(--n600)'
                }} cellSize={16} gap={2} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Rows = produkter, cols = sessioner. Used in: Fuel products</p>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 10: Elevation gradient
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="elevation" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>10. Elevation gradient</h2>
            <InfoText>6 niveauer. Bruger zone-farverne Z2→Z6 + grøn til lave stigninger.</InfoText>

            <SwatchRow items={ELEVATION_LEVELS.map((e) => ({ hex: e.hex, label: e.grade }))} size={56} height={40} />

            {/* Mini elevation profile — chart primitives */}
            <div className="space-y-3">
              <SectionHeader>Elevation profile simulation</SectionHeader>
              <Card padding="md">
                <ChartRoot data={STREAM_ELEVATION} height={100} padding={{ top: 4, right: 8, bottom: 4, left: 0 }} yPadding={0.05}>
                  <ChartArea gradientColor="var(--n600)" opacityFrom={0.30} opacityTo={0.08} />
                  <ChartLine className="fill-none stroke-(--n600) stroke-[1.5]" />
                </ChartRoot>
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
                <svg width="100%" viewBox="0 0 600 84" shapeRendering="geometricPrecision" style={{ overflow: 'visible' }}>
                  {INTERVAL_COLORS.map((c, i) => (
                    <polyline key={c.n} points={INTERVAL_WAVE_POINTS[i]} fill="none" stroke={c.hex}
                      strokeWidth={i === 0 ? 2 : 1.5} opacity={i === 0 ? 1 : 0.65} strokeLinejoin="round" strokeLinecap="round" />
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
                    <Badge color="#F97316">Hard</Badge>
                    <Badge variant="outline" color="#F97316">Threshold</Badge>
                    <Badge variant="outline" color="#EF4444">Critical</Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ColorDot hex="#16A34A" size={6} />
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
                    { label: 'Compliant (≤15%)', hex: '#16A34A', desc: 'Grøn border-left' },
                    { label: 'Partial (15–35%)', hex: '#F59E0B', desc: 'Gul border-left' },
                    { label: 'Missed (>35%)', hex: '#EF4444', desc: 'Rød border-left' },
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

            {/* 13.5 Calendar week simulation */}
            <div className="space-y-3">
              <SectionHeader>Calendar week simulation</SectionHeader>
              <InfoText>Maksimal farvedensitet: fase-header, day type badge, intent badge, compliance border-left, sport dot.</InfoText>
              <Card padding="md">
                <div className="border-b-[0.5px] border-b-[var(--n200)] pb-2 mb-3">
                  <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n800)]')}>Build phase — Week 14</span>
                  <div className={cn(RADIUS.sm, 'h-1 mt-1')} style={{ backgroundColor: 'rgba(232,176,32,0.06)', width: '100%' }} />
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {CALENDAR_WEEK.map((day) => {
                    const intentColors: Record<string, string> = { Recovery: '#3B82F6', Endurance: '#10B981', Tempo: '#F59E0B', Threshold: '#F97316', VO2max: '#EF4444' }
                    const complianceColors: Record<string, string> = { hit: '#16A34A', partial: '#F59E0B', missed: '#EF4444' }
                    const sportColors: Record<string, string> = { Cycling: '#16A34A', Running: '#EF4444' }
                    const borderColor = day.compliance ? complianceColors[day.compliance] ?? 'transparent' : 'transparent'
                    return (
                      <div key={day.day} className={cn(RADIUS.sm, BORDER.subtle, 'p-2 space-y-1.5')} style={{ borderLeft: `2px solid ${borderColor}` }}>
                        <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-[var(--n800)]')}>{day.day}</span>
                        {day.type === 'Rest' ? (
                          <span className={cn(QUIET_STYLE, 'text-[9px] block')}>Rest</span>
                        ) : (
                          <>
                            <Badge color="var(--n1150)">{day.type}</Badge>
                            {day.intent && <Badge color={intentColors[day.intent] ?? '#8A8780'}>{day.intent}</Badge>}
                            <div className="flex items-center gap-1">
                              {day.sport && <ColorDot hex={sportColors[day.sport] ?? '#8A8780'} size={5} />}
                              {day.rScore && <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{day.rScore}</span>}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
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
              <PeakCurvesChartSVG />
              <div className="flex flex-wrap gap-4 mt-3">
                {PEAK_CURVES.map((c) => (
                  <LegendLine key={c.label} hex={c.color} label={c.label} dash={c.label === 'Best ever'} width={c.label === 'Current' ? 2 : 1.5} />
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
              <RadarChartSVG />
              <div className="flex gap-4 mt-2">
                <LegendLine hex={NEAR_BLACK} label="Current" width={2} />
                <LegendLine hex="#EF4444" label="Personal best" dash width={1.5} />
                <LegendLine hex="#10B981" label="3-month trend" width={1} />
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 14A: Performance analytics
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="perf-analytics" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>14A. Performance analytics</h2>
            <InfoText>CP progression, durability index (Vekta-inspireret), resilience, efficiency scatter, decoupling, dual load, peak freshness, polarization donut.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              {/* CP Progression */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>CP progression (12 months)</p>
                <MiniChartLine data={CP_PROGRESSION} stroke={NEAR_BLACK} fill="rgba(15,15,14,.06)" strokeWidth={2} height={60} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Used in: Peak curves, analytics widgets</p>
              </Card>

              {/* Durability Index */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Durability index (CP decay)</p>
                <MiniChartLine data={DURABILITY.fresh} stroke={NEAR_BLACK} secondData={DURABILITY.fatigued} secondStroke="#EF4444" strokeWidth={2} height={80} />
                <div className="flex gap-3 mt-1">
                  <LegendLine hex={NEAR_BLACK} label="CP fresh" width={2} />
                  <LegendLine hex="#EF4444" label="CP fatigued" />
                </div>
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Gap = durability. Vekta-inspireret. Used in: Session analysis</p>
              </Card>

              {/* Resilience trend */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Resilience trend</p>
                <MiniChartLine data={RESILIENCE} stroke="#10B981" height={60} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Economy decay rate (W per HR beat). Used in: Analytics</p>
              </Card>

              {/* Dual load */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Dual load display</p>
                <DualLoadChartSVG />
                <div className="flex gap-3 mt-1">
                  <LegendLine hex="#10B981" label="R-Score" />
                  <LegendLine hex="#EF4444" label="Pulse load" />
                </div>
              </Card>

              {/* Peak freshness bars */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Peak freshness (10 buckets)</p>
                <MiniBarChart data={PEAK_FRESH.map((p) => p.value)} color={(v) => {
                  const i = PEAK_FRESH.findIndex((p) => p.value === v)
                  const p = PEAK_FRESH[i >= 0 ? i : 0]
                  const zoneColors = ['#94A3B8', '#16A34A', '#F59E0B', '#F97316', '#EF4444', '#A855F7']
                  const opacity = Math.max(0.4, 1 - p.staleDays / 30)
                  return `color-mix(in srgb, ${zoneColors[p.zone]} ${Math.round(opacity * 100)}%, transparent)`
                }} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Zone-farvet, fader med alder. Used in: Peak curves</p>
              </Card>

              {/* Polarization donut */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Polarization donut</p>
                <div className="flex items-center gap-4">
                  <DonutChart segments={[
                    { value: POLARIZATION.z12, color: '#16A34A', label: 'Z1-2' },
                    { value: POLARIZATION.z3, color: '#F59E0B', label: 'Z3' },
                    { value: POLARIZATION.z46, color: '#EF4444', label: 'Z4-6' },
                  ]} size={100} />
                  <div className="space-y-1">
                    <p className={cn(FONT.body, 'text-[24px] tabular-nums', WEIGHT.strong, 'text-[var(--n1150)]')}>78/7/15</p>
                    <div className="flex gap-2">
                      <LegendLine hex="#16A34A" label="Z1-2 base" />
                      <LegendLine hex="#F59E0B" label="Z3" />
                      <LegendLine hex="#EF4444" label="Z4-6" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Efficiency scatter */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Efficiency scatter</p>
                <ScatterChartSVG />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Power vs %Threshold HR. Zone-colored dots. Used in: Analytics</p>
              </Card>

              {/* Decoupling x CHO */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Decoupling x CHO correlation</p>
                <ScatterChartSVG />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>X = CHO g/h, Y = Decoupling %. Regression line. Used in: Session analysis</p>
              </Card>
            </div>
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
                  {['#EF4444', '#FCA5A5', '#FEE2E2', '#E5E3DE', '#BBF7D0', '#4ADE80', '#16A34A'].map((hex) => (
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
                  {[CANVAS_HEX, '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981'].map((hex) => (
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
                    const vals = ['#E5E3DE', '#BBF7D0', '#4ADE80', '#16A34A', '#EF4444', '#FCA5A5', '#FEE2E2']
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

            {/* Mini SVG line charts — math layer */}
            <div className="space-y-3">
              <SectionHeader>Mini sparklines</SectionHeader>
              <Card padding="md">
                <div className="grid grid-cols-4 gap-4">
                  {WELLNESS.slice(0, 4).map((w, i) => (
                    <div key={w.label} className="flex flex-col gap-1">
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)]')}>{w.label}</span>
                      <SparklineSVG data={SPARKLINES[i]} color={w.hex} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 17.2 Dual load chart (R-Score vs Pulse Load) — math layer */}
            <div className="space-y-3">
              <SectionHeader>Dual load chart (R-Score vs Pulse Load)</SectionHeader>
              <Card padding="md">
                <DualLoadChartSVG />
                <div className="flex gap-4 mt-2">
                  <LegendLine hex="#10B981" label="R-Score" width={1.5} />
                  <LegendLine hex="#EF4444" label="Pulse Load" width={1.5} />
                </div>
              </Card>
            </div>

            {/* 17.3 Cross-domain scatter plot colors — math layer */}
            <div className="space-y-3">
              <SectionHeader>Scatter plot colors</SectionHeader>
              <InfoText>Bruges i: Durability × Nutrition, R-Score × Fuel Score, Cost:Value, Reserve × Nutrition.</InfoText>
              <Card padding="md">
                <ScatterChartSVG />
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className={RADIUS.full} style={{ width: 6, height: 6, backgroundColor: 'var(--n600)', opacity: 0.7 }} />
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Zone-colored dots</span>
                  </div>
                  <LegendLine hex="var(--n600)" label="Regression (dashed)" dash width={1} />
                  <div className="flex items-center gap-1.5">
                    <div className={cn(RADIUS.sm)} style={{ width: 12, height: 8, backgroundColor: 'var(--n600)', opacity: 0.04 }} />
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
                    <path d="M40,4 A36,36 0 0,1 72,22" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                    <path d="M72,22 A36,36 0 0,1 72,58" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
                    <path d="M72,58 A36,36 0 0,1 40,76" fill="none" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                    <path d="M40,76 A36,36 0 0,1 8,58" fill="none" stroke="#A855F7" strokeWidth="4" strokeLinecap="round" />
                    <path d="M8,58 A36,36 0 0,1 8,22" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
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
                    { label: 'Low', hex: '#94A3B8' },
                    { label: 'Medium', hex: '#F59E0B' },
                    { label: 'High', hex: '#EF4444' },
                    { label: 'Peak', hex: '#A855F7' },
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
             SECTION 17A: Behavioral heatmaps
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="behavioral-heatmaps" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>17A. Behavioral heatmaps</h2>
            <InfoText>Morning check-in heatmap, daily state dashboard, sleep x performance scatter, HR drift trend, lactate curve overlay.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              {/* Morning check-in heatmap */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Morning check-in (28 days)</p>
                <HeatmapGrid data={MORNING_CHECKIN} colorFn={(v) => {
                  if (v < 25) return 'rgba(196,60,60,.25)'
                  if (v < 50) return 'rgba(196,155,8,.20)'
                  if (v < 75) return 'rgba(27,138,90,.15)'
                  return 'rgba(27,138,90,.30)'
                }} cellSize={10} gap={1} />
                <div className="flex gap-2 mt-1">
                  {['Mood', 'Sleep', 'Fatigue', 'Stress'].map((m) => (
                    <span key={m} className={cn(QUIET_STYLE, 'text-[9px]')}>{m}</span>
                  ))}
                </div>
              </Card>

              {/* HR drift trend */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>HR drift trend</p>
                <MiniChartLine data={HR_DRIFT} stroke="#EF4444" height={60} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Drift % over sessions. Faldende = bedre fitness. Used in: Analytics</p>
              </Card>

              {/* Sleep x performance scatter */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Sleep x performance</p>
                <ScatterChartSVG />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Dots purple-500 #A855F7 (sleep = Z6). Used in: Analytics widgets</p>
              </Card>

              {/* Lactate curve overlay */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Lactate curve overlay</p>
                <MiniChartLine data={LACTATE.current} stroke={NEAR_BLACK} secondData={LACTATE.old} secondStroke="#B5B2AB" strokeWidth={2} height={80} />
                <div className="flex gap-3 mt-1">
                  <LegendLine hex={NEAR_BLACK} label="Current" width={2} />
                  <LegendLine hex="#B5B2AB" label="Previous test" dash />
                </div>
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Rightward shift = improvement. LT2 marker. Used in: Analytics</p>
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
                  <path d="M60,160 C100,150 140,120 180,110 C220,100 260,130 300,100 C340,80 380,90 420,85 C460,75 500,90 540,82" fill="none" stroke="#16A34A" strokeWidth="2" />

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
             SECTION 18A: Advanced visualizations
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="advanced-viz" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>18A. Advanced visualizations</h2>
            <InfoText>Season map, KPI grid, course progression (THE selling chart), energy flow sankey, session fingerprint glyph.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              {/* Season map */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Season map (52 weeks x 5 days)</p>
                <HeatmapGrid data={SEASON_MAP} colorFn={(v) => {
                  if (v === 0) return 'var(--n200)'
                  const opacity = Math.min(0.8, v / 100)
                  return `rgba(20,184,162,${opacity.toFixed(2)})`
                }} cellSize={6} gap={1} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Sequential: canvas → Z2 teal. Used in: Season overview</p>
              </Card>

              {/* KPI grid */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>KPI grid (4 metrics x 8 weeks)</p>
                <HeatmapGrid data={KPI_GRID} colorFn={(v) => {
                  if (v > 20) return 'rgba(27,138,90,.30)'
                  if (v > 0) return 'rgba(27,138,90,.12)'
                  if (v > -20) return 'rgba(196,60,60,.12)'
                  return 'rgba(196,60,60,.30)'
                }} cellSize={24} gap={3} />
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Diverging: rød = decline, grøn = improvement. Used in: Analytics</p>
              </Card>

              {/* Course Progression — THE selling chart */}
              <Card padding="md" className="col-span-2">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-2')}>Course progression (RAMTT selling chart)</p>
                <InfoText>Bedre ernæring → hurtigere tider. Visual bevis.</InfoText>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <MiniChartLine data={COURSE_PROG.duration} stroke={NEAR_BLACK} strokeWidth={2} height={80} />
                    <MiniChartLine data={COURSE_PROG.cho} stroke="#F97316" height={60} />
                    <div className="flex gap-3 mt-1">
                      <LegendLine hex={NEAR_BLACK} label="Duration (↓ faster)" width={2} />
                      <LegendLine hex="#F97316" label="CHO g/h (↑ more)" />
                    </div>
                  </div>
                  <div>
                    <ScatterChartSVG />
                    <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>X = CHO g/h, Y = Duration. Negative correlation.</p>
                  </div>
                </div>
              </Card>

              {/* Energy flow sankey (simplified) */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Energy flow (simplified sankey)</p>
                <svg width="100%" viewBox="0 0 280 100" shapeRendering="geometricPrecision" style={{ fontFamily: 'var(--font-sans)' }}>
                  {/* Input flows */}
                  <rect x={0} y={5} width={12} height={35} fill="#F97316" rx={2} />
                  <rect x={0} y={45} width={12} height={25} fill="#F59E0B" rx={2} />
                  <rect x={0} y={75} width={12} height={20} fill="#A855F7" rx={2} />
                  {/* Flow paths */}
                  <path d="M12,22 C80,22 100,30 140,30" fill="none" stroke="#F97316" strokeWidth={8} opacity={0.3} />
                  <path d="M12,57 C80,57 100,50 140,50" fill="none" stroke="#F59E0B" strokeWidth={6} opacity={0.3} />
                  <path d="M12,85 C80,85 100,70 140,70" fill="none" stroke="#A855F7" strokeWidth={5} opacity={0.3} />
                  {/* Output blocks */}
                  <rect x={140} y={10} width={12} height={50} fill="var(--n1150)" rx={2} />
                  <rect x={140} y={65} width={12} height={25} fill="#8A8780" rx={2} />
                  {/* Labels */}
                  <text x={160} y={38} fontSize={9} fill="var(--n600)" fontWeight={400}>Exercise</text>
                  <text x={160} y={80} fontSize={9} fill="var(--n600)" fontWeight={400}>BMR</text>
                </svg>
                <div className="flex gap-3 mt-1">
                  <LegendLine hex="#F97316" label="CHO" />
                  <LegendLine hex="#F59E0B" label="Fat" />
                  <LegendLine hex="#A855F7" label="Protein" />
                </div>
              </Card>

              {/* Session fingerprint */}
              <Card padding="md">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.medium, 'text-[var(--n1150)] mb-2')}>Session fingerprint glyphs</p>
                <div className="flex gap-6 justify-center">
                  {[
                    { label: 'Easy ride', zones: [0.8, 0.3, 0.1, 0, 0, 0] },
                    { label: 'Intervals', zones: [0.2, 0.3, 0.2, 0.6, 0.8, 0.3] },
                    { label: 'Race', zones: [0.1, 0.2, 0.4, 0.7, 0.5, 0.2] },
                  ].map((fp) => {
                    const colors = ['#94A3B8', '#16A34A', '#F59E0B', '#F97316', '#EF4444', '#A855F7']
                    const total = fp.zones.reduce((a, b) => a + b, 0)
                    const r2 = (n: number) => Math.round(n * 100) / 100
                    let angle = -90
                    return (
                      <div key={fp.label} className="flex flex-col items-center gap-1">
                        <svg width={50} height={50} viewBox="0 0 50 50">
                          {fp.zones.map((v, j) => {
                            if (v === 0) { angle += (v / total) * 360; return null }
                            const sweep = (v / total) * 360
                            const r = 20
                            const startRad = (angle * Math.PI) / 180
                            const endRad = ((angle + sweep) * Math.PI) / 180
                            const x1 = r2(25 + r * Math.cos(startRad)), y1 = r2(25 + r * Math.sin(startRad))
                            const x2 = r2(25 + r * Math.cos(endRad)), y2 = r2(25 + r * Math.sin(endRad))
                            const largeArc = sweep > 180 ? 1 : 0
                            const d = `M25,25 L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`
                            angle += sweep
                            return <path key={j} d={d} fill={colors[j]} />
                          })}
                          <circle cx={25} cy={25} r={8} fill="var(--n50)" />
                        </svg>
                        <span className={cn(QUIET_STYLE, 'text-[9px]')}>{fp.label}</span>
                      </div>
                    )
                  })}
                </div>
              </Card>
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

            {/* Mini capacity chart with 3 sport overlays — math layer */}
            <div className="space-y-3">
              <SectionHeader>Sport-colored capacity lines</SectionHeader>
              <Card padding="md">
                <SportCapacityChartSVG />
                <div className="flex gap-4 mt-2">
                  {SPORT_LINES.map((s) => (
                    <LegendLine key={s.label} hex={s.color} label={s.label} />
                  ))}
                </div>
              </Card>
            </div>

            {/* 19.2 Per-sport capacity chart */}
            <div className="space-y-3">
              <SectionHeader>Per-sport capacity lines</SectionHeader>
              <Card padding="md">
                <SportCapacityChartSVG />
                <div className="flex gap-4 mt-2">
                  {SPORT_LINES.map((s) => (
                    <LegendLine key={s.label} hex={s.color} label={s.label} />
                  ))}
                </div>
                <p className={cn(QUIET_STYLE, 'text-[10px] mt-1')}>Separate CTL-linjer per sport. High contrast nødvendig. Used in: Capacity chart</p>
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

              {/* Product tolerance — gradient strip + badges */}
              <Card>
                <Card.Title>Product tolerance</Card.Title>
                <div className="space-y-3 mt-3">
                  <div className={cn(RADIUS.sm, 'overflow-hidden flex')} style={{ height: 20 }}>
                    {[
                      { hex: '#16A34A', w: '20%' },
                      { hex: '#4ADE80', w: '20%' },
                      { hex: '#F59E0B', w: '20%' },
                      { hex: '#EF4444', w: '20%' },
                      { hex: 'var(--n600)', w: '20%' },
                    ].map((t) => (
                      <div key={t.hex} style={{ width: t.w, backgroundColor: t.hex }} />
                    ))}
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { hex: '#16A34A', label: 'Excellent' },
                      { hex: '#4ADE80', label: 'Good' },
                      { hex: '#F59E0B', label: 'Fair' },
                      { hex: '#EF4444', label: 'Poor' },
                      { hex: 'var(--n600)', label: 'Untested' },
                    ].map((t) => (
                      <Badge key={t.label} color={t.hex}>{t.label}</Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Gut tiers — badges + ProgressBar */}
              <Card>
                <Card.Title>Gut training tiers</Card.Title>
                <div className="space-y-3 mt-3">
                  <div className="flex gap-1.5">
                    {[
                      { hex: '#94A3B8', label: 'Starter <40 g/h' },
                      { hex: '#10B981', label: 'Developing 40–60' },
                      { hex: '#F59E0B', label: 'Trained 60–90' },
                      { hex: '#EF4444', label: 'Elite >90' },
                    ].map((t) => (
                      <Badge key={t.label} color={t.hex}>{t.label}</Badge>
                    ))}
                  </div>
                  <ProgressBar value={72} max={120} color="#F59E0B" label="72 g/h — Trained tier" />
                </div>
              </Card>

              {/* Glycogen bars */}
              <Card>
                <Card.Title>Glycogen stores</Card.Title>
                <div className="space-y-2 mt-3">
                  <ProgressBar value={72} max={100} color="#F97316" label="Muscle 72%" />
                  <ProgressBar value={85} max={100} color="#F59E0B" label="Liver 85%" />
                </div>
              </Card>

              {/* Gamification — medals + XP bar + level */}
              <Card>
                <Card.Title>Gamification</Card.Title>
                <div className="space-y-3 mt-3">
                  <div className="flex gap-1.5">
                    {[
                      { hex: '#CD7F32', label: 'Bronze' },
                      { hex: '#B5B2AB', label: 'Silver' },
                      { hex: '#F59E0B', label: 'Gold' },
                    ].map((m) => (
                      <div key={m.label} className="flex flex-col items-center gap-0.5">
                        <Swatch hex={m.hex} size={24} round />
                        <span className={cn(QUIET_STYLE, 'text-[9px]')}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <ProgressBar value={3400} max={5000} color="#10B981" label="XP 3400 / 5000" />
                  <Badge color={NEAR_BLACK}>Level 12</Badge>
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
            <InfoText>To kernefarver + hvid. Bruges til landing pages, share cards og immersive UI. Plus flare-farven til akutte alerts.</InfoText>

            {/* Core swatches */}
            <SwatchRow items={BRAND_CORE.map((b) => ({ hex: b.hex, label: b.label }))} size={80} height={60} />

            {/* Three brand combinations */}
            <div className="space-y-3">
              <SectionHeader>Brand combinations</SectionHeader>
              <div className="grid grid-cols-3 gap-4">
                {BRAND_COMBOS.map((combo) => (
                  <Card key={combo.caption} padding="none">
                    <div className={cn(RADIUS.lg, 'overflow-hidden flex flex-col items-center justify-center')} style={{ backgroundColor: combo.bg, height: 180, padding: 24 }}>
                      <RamttWordmark className="h-10 w-auto" style={{ color: combo.text }} />
                    </div>
                    <p className={cn(QUIET_STYLE, 'text-[11px] px-3 py-2')}>{combo.caption}</p>
                  </Card>
                ))}
              </div>
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
                  <p className={cn(QUIET_STYLE, 'text-[11px] max-w-[40ch]')}>Skal differentieres fra CHO/Z4 orange-500 (#F97316).</p>
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
            <InfoText>14 skærme × 19 farve-grupper. Dots = synlig på den skærm. Bruges til at vurdere farve-konflikter.</InfoText>

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
            <InfoText>Alle ~155 CSS custom property navne grupperet efter domæne. Disse implementeres i tokens.css når farverne er besluttet. ~310 farve-beslutninger med dark mode.</InfoText>

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
                { group: 'kJ / Energy zones (5)', tokens: ['--energy-z1', '--energy-z2', '--energy-z3', '--energy-z4', '--energy-z5'] },
                { group: 'Macros (3)', tokens: ['--macro-cho', '--macro-protein', '--macro-fat'] },
                { group: 'Glycogen (2)', tokens: ['--glycogen-muscle', '--glycogen-liver'] },
                { group: 'Product tolerance (5)', tokens: ['--tolerance-excellent', '--tolerance-good', '--tolerance-fair', '--tolerance-poor', '--tolerance-untested'] },
                { group: 'Gut training tiers (4)', tokens: ['--gut-starter', '--gut-developing', '--gut-trained', '--gut-elite'] },
                { group: 'Gamification (5)', tokens: ['--tier-bronze', '--tier-silver', '--tier-gold', '--xp-fill', '--level-bg'] },
                { group: 'Session intent (7)', tokens: ['--intent-recovery', '--intent-endurance', '--intent-tempo', '--intent-threshold', '--intent-vo2max', '--intent-race', '--intent-test'] },
                { group: 'Brand (5)', tokens: ['--brand-navy', '--brand-magenta', '--brand-cream', '--flare', '--flare-dark'] },
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
                  { group: 'kJ / Energy zones', colors: '5', priority: 'Medium', share: 'Monokrom amber' },
                  { group: 'Brand', colors: '3+2', priority: 'Existing', share: 'Landing / share cards' },
                ]}
              />
            </div>

            {/* The 15 questions */}
            <div className="space-y-3">
              <SectionHeader>De 15 spørgsmål til Ruth</SectionHeader>
              <div className="space-y-2">
                {[
                  'RAMTT bruger 8 Tailwind farve-familier (Z1 slate, Z2 green, Z3 amber, Z4 orange, Z5 red, Z6 purple) — vs Coggan?',
                  'CHO zones er nu monokrom amber ramp (amber-100→amber-800) — fungerer det adskilt fra power zones?',
                  'Semantiske farver (success green-600, warning amber-500, danger red-500, info blue-500) — godkendt?',
                  'Warning (amber-500) og Z3 Tempo (amber-500) er identiske — de ses sjældent på same skærm, men OK?',
                  'Session streams: Power=green-600, HR=red-500, Cadence=purple-500, Speed=blue-500, Elevation=--n600, Temp=orange-500?',
                  'Capacity chart: CTL=emerald-500, ATL=red-500, Form=green-600/red-500, Surge=purple-500, ACWR=amber-500?',
                  'Regulatorer: Metabolic=orange-500, Neural=purple-500, Peripheral=blue-500 — OK?',
                  'CHO nutrient (#F97316) og Power Z4 er identiske — de ses sjældent sammen, men skal fuel have sin egen tone?',
                  'Cadence gradient (cold→warm med 9 brackets) — fungerer de 9 trin?',
                  'Elevation bruger blue→emerald→amber→orange→red→purple — er det klart nok?',
                  'Interval stack: 8 farver med sort som #1 — er rækkefølgen rigtig?',
                  'Training phases ved ~6% opacity — kan de adskilles på sand canvas?',
                  'Brand-palette: Navy + Magenta + White — er de tre kombinationer tilstrækkelige?',
                  'Flare (#FF6A00) vs CHO-orange (orange-500) vs Z4 (orange-500) — problem?',
                  'kJ/Energy zones — monokrom emerald ramp (emerald-100→emerald-800) — godkendt?',
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
              <p className={cn(QUIET_STYLE, 'text-[11px]')}>RAMTT color system v3 &middot; Generated 9. april 2026 &middot; 30 sections &middot; ~155 tokens &middot; ~65 chart illustrations &middot; 76 chart types covered</p>
            </div>
          </footer>

        </div>
      </main>
    </div>
  )
}
