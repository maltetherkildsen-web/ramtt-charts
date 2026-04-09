/**
 * Deterministic chart data for color-guide illustrations.
 * Seeded LCG ensures identical rendering on every page load (no hydration mismatch).
 */

// ─── Seeded PRNG (LCG) ───────────────────────────────────────────────────────

function createRng(seed: number) {
  let s = seed | 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0
    return (s >>> 0) / 0xffffffff
  }
}

// ─── Zone-colored power data (warmup → intervals → cooldown) ─────────────────

export function generateZoneData(points: number, ftp: number): number[] {
  const rng = createRng(314)
  const data: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    let power: number
    if (t < 0.1) power = ftp * 0.45 + rng() * 20
    else if (t < 0.3) power = ftp * 0.65 + rng() * 15
    else if (t < 0.35) power = ftp * 0.82 + rng() * 10
    else if (t < 0.4) power = ftp * 1.0 + rng() * 15
    else if (t < 0.42) power = ftp * 1.12 + rng() * 15
    else if (t < 0.45) power = ftp * 0.55 + rng() * 10
    else if (t < 0.55) power = ftp * 0.65 + rng() * 15
    else if (t < 0.6) power = ftp * 0.85 + rng() * 10
    else if (t < 0.65) power = ftp * 1.02 + rng() * 15
    else if (t < 0.68) power = ftp * 1.15 + rng() * 20
    else if (t < 0.7) power = ftp * 1.25 + rng() * 25
    else if (t < 0.8) power = ftp * 0.55 + rng() * 10
    else if (t < 0.9) power = ftp * 0.65 + rng() * 10
    else power = ftp * 0.4 + rng() * 15
    data.push(power)
  }
  return data
}

// ─── Session streams ─────────────────────────────────────────────────────────

export function generatePowerStream(points: number): number[] {
  const rng = createRng(100)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    const base = 180 + Math.sin(t * 8) * 40 + Math.sin(t * 22) * 20
    return Math.max(60, base + (rng() - 0.5) * 30)
  })
}

export function generateHRStream(points: number): number[] {
  const rng = createRng(200)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 145 + Math.sin(t * 6) * 25 + Math.sin(t * 18) * 8 + (rng() - 0.5) * 8
  })
}

export function generateCadenceStream(points: number): number[] {
  const rng = createRng(300)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 82 + Math.sin(t * 10) * 12 + (rng() - 0.5) * 6
  })
}

export function generateSpeedStream(points: number): number[] {
  const rng = createRng(400)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 32 + Math.sin(t * 5) * 6 + (rng() - 0.5) * 3
  })
}

export function generateElevationStream(points: number): number[] {
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 200 + Math.sin(t * 3) * 80 + Math.sin(t * 7) * 30
  })
}

export function generateTemperatureStream(points: number): number[] {
  const rng = createRng(500)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 22 + Math.sin(t * 2) * 4 + (rng() - 0.5) * 1.5
  })
}

// ─── Capacity chart lines ────────────────────────────────────────────────────

export function generateCapacityData(points: number): {
  ctl: number[]
  atl: number[]
  formPos: number[]
  formNeg: number[]
  surge: number[]
} {
  const rng = createRng(600)
  const ctl: number[] = []
  const atl: number[] = []
  const formPos: number[] = []
  const formNeg: number[] = []
  const surge: number[] = []

  for (let i = 0; i < points; i++) {
    const t = i / points
    // CTL: rising fitness with seasonal dip
    const c = 55 + t * 35 - Math.sin(t * 4) * 8 + (rng() - 0.5) * 3
    // ATL: more volatile, tracks training load
    const a = 50 + t * 25 + Math.sin(t * 12) * 15 + (rng() - 0.5) * 5
    ctl.push(c)
    atl.push(a)
    const diff = c - a
    formPos.push(diff > 0 ? diff : 0)
    formNeg.push(diff < 0 ? -diff : 0)
    // Surge: periodic sharp spikes
    surge.push(a + (Math.sin(t * 20) > 0.7 ? 12 + rng() * 8 : 0))
  }
  return { ctl, atl, formPos, formNeg, surge }
}

// ─── Peak power curves ──────────────────────────────────────────────────────

export function generatePeakCurve(maxPower: number, decay: number, points = 80): number[] {
  return Array.from({ length: points }, (_, i) => {
    const duration = Math.pow(10, (i / points) * 3.5) // 1s → ~3000s
    return maxPower * Math.pow(duration, -decay) + maxPower * 0.3
  })
}

// ─── Overlay data (W' balance, glycogen, etc.) ──────────────────────────────

export function generateWPrimeBalance(points: number): number[] {
  const rng = createRng(700)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    // Depletes during intervals, recovers between
    const base = 20 - t * 8 + Math.sin(t * 15) * 5
    return Math.max(2, Math.min(25, base + (rng() - 0.5) * 2))
  })
}

export function generateGlycoDepletion(points: number): number[] {
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    // Steady depletion with slight recovery bumps (fueling)
    return 100 - t * 55 + Math.sin(t * 8) * 4
  })
}

// ─── Regulator area data ────────────────────────────────────────────────────

export function generateRegulatorData(points: number): {
  fatigue: number[]
  fitness: number[]
  form: number[]
} {
  const rng = createRng(800)
  const fatigue: number[] = []
  const fitness: number[] = []
  const form: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    fatigue.push(40 + Math.sin(t * 10) * 20 + (rng() - 0.5) * 5)
    fitness.push(50 + t * 30 + Math.sin(t * 4) * 8 + (rng() - 0.5) * 3)
    form.push(10 + t * 15 + Math.sin(t * 6) * 10 + (rng() - 0.5) * 4)
  }
  return { fatigue, fitness, form }
}

// ─── Fuel charts ────────────────────────────────────────────────────────────

export function generateFuelData(points: number): {
  gutCapacity: number[]
  gutAdaptation: number[]
  choIntake: number[] // sparse markers
} {
  const rng = createRng(900)
  const gutCapacity: number[] = []
  const gutAdaptation: number[] = []
  const choIntake: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    gutCapacity.push(60 + Math.sin(t * 6) * 15 + (rng() - 0.5) * 4)
    gutAdaptation.push(50 + t * 25 + (rng() - 0.5) * 3)
    // CHO intake markers every ~15 points
    choIntake.push(i % 15 === 7 ? 40 + rng() * 30 : 0)
  }
  return { gutCapacity, gutAdaptation, choIntake }
}

export function generateEnergyBalance(points: number): {
  surplus: number[]
  deficit: number[]
  balance: number[]
} {
  const rng = createRng(950)
  const surplus: number[] = []
  const deficit: number[] = []
  const balance: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    const b = Math.sin(t * 8) * 300 + Math.sin(t * 3) * 150 + (rng() - 0.5) * 80
    balance.push(b)
    surplus.push(b > 0 ? b : 0)
    deficit.push(b < 0 ? b : 0)
  }
  return { surplus, deficit, balance }
}

// ─── Scatter plot ───────────────────────────────────────────────────────────

export function generateScatterData(count: number): { x: number; y: number; zone: number }[] {
  const rng = createRng(1100)
  return Array.from({ length: count }, () => {
    const x = rng() * 100
    const y = x * 0.6 + (rng() - 0.5) * 40 + 20
    const zone = Math.min(5, Math.floor(rng() * 6))
    return { x, y, zone }
  })
}

// ─── Dual load chart ────────────────────────────────────────────────────────

export function generateDualLoad(points: number): {
  rScore: number[]
  pulseLoad: number[]
} {
  const rng = createRng(1200)
  const rScore: number[] = []
  const pulseLoad: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    rScore.push(65 + Math.sin(t * 8) * 15 + (rng() - 0.5) * 5)
    pulseLoad.push(55 + Math.sin(t * 6) * 20 + (rng() - 0.5) * 8)
  }
  return { rScore, pulseLoad }
}

// ─── Wellness sparklines ────────────────────────────────────────────────────

export function generateSparkline(seed: number, points = 30, base = 70, amp = 15): number[] {
  const rng = createRng(seed)
  return Array.from({ length: points }, (_, i) => {
    return base + Math.sin(i * 0.4) * amp + (rng() - 0.5) * amp * 0.5
  })
}

// ─── Sport capacity lines ───────────────────────────────────────────────────

export function generateSportLine(seed: number, points: number): number[] {
  const rng = createRng(seed)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 50 + t * 30 + Math.sin(t * 6) * 10 + (rng() - 0.5) * 4
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUPPLEMENT — Chart catalog data generators
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Bars (training load, season, CHO compliance, macro periodization) ───────

export function generateTrainingLoadBars(days = 14): number[] {
  const rng = createRng(3000)
  return Array.from({ length: days }, () => {
    const isRest = rng() < 0.15
    return isRest ? 0 : 40 + rng() * 80
  })
}

export function generateSeasonBars(weeks = 52): number[] {
  const rng = createRng(3100)
  return Array.from({ length: weeks }, (_, i) => {
    const t = i / weeks
    // Periodization: base → build → peak → taper → race → transition
    const phase = Math.sin(t * Math.PI * 2) * 0.3 + 0.7
    return (50 + t * 30 + rng() * 20) * phase
  })
}

export function generateCHOComplianceBars(days = 7): { actual: number; target: number }[] {
  const rng = createRng(3200)
  return Array.from({ length: days }, () => {
    const target = 60 + rng() * 30
    const actual = target * (0.6 + rng() * 0.5)
    return { actual: Math.min(actual, target * 1.1), target }
  })
}

export function generateMacroPeriodization(days = 7): { cho: number; protein: number; fat: number }[] {
  const rng = createRng(3300)
  return Array.from({ length: days }, () => {
    const cho = 45 + rng() * 25
    const protein = 20 + rng() * 10
    const fat = 100 - cho - protein
    return { cho, protein, fat: Math.max(10, fat) }
  })
}

// ─── Stacked area (CHO zone distribution) ───────────────────────────────────

export function generateCHOZoneStacked(weeks = 12): number[][] {
  const rng = createRng(3400)
  // 6 zones, each week
  return Array.from({ length: weeks }, () => {
    const raw = Array.from({ length: 6 }, () => rng() * 20 + 5)
    const sum = raw.reduce((a, b) => a + b, 0)
    return raw.map((v) => (v / sum) * 100) // normalize to 100%
  })
}

// ─── Coverage trend ─────────────────────────────────────────────────────────

export function generateCoverageTrend(points = 60): number[] {
  const rng = createRng(3500)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 65 + t * 20 + Math.sin(t * 8) * 8 + (rng() - 0.5) * 5
  })
}

// ─── Gut trajectory (logarithmic growth) ────────────────────────────────────

export function generateGutTrajectory(points = 60): number[] {
  const rng = createRng(3600)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    // Log growth: fast initial, diminishing returns
    return 30 + 55 * Math.log(1 + t * 5) / Math.log(6) + (rng() - 0.5) * 3
  })
}

// ─── Depletion curves (muscle + liver glycogen) ─────────────────────────────

export function generateDepletionCurves(points = 80): { muscle: number[]; liver: number[] } {
  const rng = createRng(3700)
  const muscle: number[] = []
  const liver: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    // Muscle depletes faster during high intensity sections
    muscle.push(Math.max(5, 100 - t * 70 - Math.sin(t * 12) * 8 + (rng() - 0.5) * 3))
    liver.push(Math.max(10, 100 - t * 45 - Math.sin(t * 8) * 5 + (rng() - 0.5) * 2))
  }
  return { muscle, liver }
}

// ─── CP progression ─────────────────────────────────────────────────────────

export function generateCPProgression(months = 12): number[] {
  const rng = createRng(3800)
  return Array.from({ length: months }, (_, i) => {
    const t = i / months
    return 240 + t * 30 + Math.sin(t * 4) * 8 + (rng() - 0.5) * 5
  })
}

// ─── Durability (CP fresh vs CP fatigued) ───────────────────────────────────

export function generateDurabilityData(points = 60): { fresh: number[]; fatigued: number[] } {
  const rng = createRng(3900)
  const fresh: number[] = []
  const fatigued: number[] = []
  for (let i = 0; i < points; i++) {
    const t = i / points
    fresh.push(280 - t * 5 + (rng() - 0.5) * 3)
    fatigued.push(280 - t * 35 - Math.sin(t * 4) * 8 + (rng() - 0.5) * 4)
  }
  return { fresh, fatigued }
}

// ─── Resilience trend ───────────────────────────────────────────────────────

export function generateResilienceTrend(points = 40): number[] {
  const rng = createRng(4000)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 4.2 - t * 1.5 + Math.sin(t * 6) * 0.3 + (rng() - 0.5) * 0.2
  })
}

// ─── Peak freshness bars ────────────────────────────────────────────────────

export function generatePeakFreshness(): { value: number; staleDays: number; zone: number }[] {
  const rng = createRng(4100)
  const labels = ['3s', '5s', '10s', '30s', '1min', '3min', '5min', '10min', '20min', '40min']
  return labels.map((_, i) => ({
    value: 60 + rng() * 40,
    staleDays: Math.floor(rng() * 30),
    zone: i < 3 ? 5 : i < 6 ? 4 : i < 8 ? 3 : 2,
  }))
}

// ─── Polarization donut ─────────────────────────────────────────────────────

export function generatePolarization(): { z12: number; z3: number; z46: number } {
  return { z12: 78, z3: 7, z46: 15 }
}

// ─── Heatmap grids ──────────────────────────────────────────────────────────

export function generateMorningCheckin(weeks = 4): number[][] {
  const rng = createRng(4200)
  // 4 metrics × 7 days × weeks
  return Array.from({ length: 4 }, () =>
    Array.from({ length: 7 * weeks }, () => rng() * 100)
  )
}

export function generateSeasonMap(weeks = 52): number[][] {
  const rng = createRng(4300)
  return Array.from({ length: 5 }, () =>
    Array.from({ length: weeks }, () => rng() < 0.2 ? 0 : rng() * 100)
  )
}

export function generateKPIGrid(metrics = 4, weeks = 8): number[][] {
  const rng = createRng(4400)
  return Array.from({ length: metrics }, () =>
    Array.from({ length: weeks }, () => (rng() - 0.5) * 100) // -50 to +50 change
  )
}

export function generateToleranceHeatmap(products = 6, sessions = 8): number[][] {
  const rng = createRng(4500)
  // 0=untested, 1=poor, 2=fair, 3=good, 4=excellent
  return Array.from({ length: products }, () =>
    Array.from({ length: sessions }, () => Math.floor(rng() * 5))
  )
}

// ─── Lactate curve ──────────────────────────────────────────────────────────

export function generateLactateCurve(points = 40): { old: number[]; current: number[] } {
  return {
    old: Array.from({ length: points }, (_, i) => {
      const t = i / points
      return 1 + Math.exp(t * 3.5 - 2) * 0.8
    }),
    current: Array.from({ length: points }, (_, i) => {
      const t = i / points
      return 1 + Math.exp(t * 3.5 - 2.3) * 0.7 // shifted right = improvement
    }),
  }
}

// ─── Course progression (THE selling chart) ─────────────────────────────────

export function generateCourseProgression(races = 8): { duration: number[]; cho: number[] } {
  const rng = createRng(4600)
  const duration: number[] = []
  const cho: number[] = []
  for (let i = 0; i < races; i++) {
    const t = i / races
    duration.push(240 - t * 35 + (rng() - 0.5) * 8) // getting faster
    cho.push(45 + t * 35 + (rng() - 0.5) * 5)        // fueling more
  }
  return { duration, cho }
}

// ─── Energy balance bars (surplus/deficit) ──────────────────────────────────

export function generateEnergyBalanceBars(days = 14): number[] {
  const rng = createRng(4700)
  return Array.from({ length: days }, () => (rng() - 0.4) * 800) // mostly surplus, some deficit
}

// ─── HR drift trend ─────────────────────────────────────────────────────────

export function generateHRDrift(points = 30): number[] {
  const rng = createRng(4800)
  return Array.from({ length: points }, (_, i) => {
    const t = i / points
    return 8 - t * 4 + Math.sin(t * 6) * 1.5 + (rng() - 0.5) * 1
  })
}

// ─── Calendar week data ─────────────────────────────────────────────────────

export function generateCalendarWeek(): {
  day: string; type: string; intent?: string; sport?: string; compliance?: string; rScore?: number
}[] {
  return [
    { day: 'Mon', type: 'Hard', intent: 'Threshold', sport: 'Cycling', compliance: 'hit', rScore: 95 },
    { day: 'Tue', type: 'Easy', intent: 'Recovery', sport: 'Running', compliance: 'hit', rScore: 42 },
    { day: 'Wed', type: 'Moderate', intent: 'Endurance', sport: 'Cycling', compliance: 'partial', rScore: 68 },
    { day: 'Thu', type: 'Rest' },
    { day: 'Fri', type: 'Hard', intent: 'VO2max', sport: 'Cycling', compliance: 'hit', rScore: 110 },
    { day: 'Sat', type: 'Moderate', intent: 'Tempo', sport: 'Running', compliance: 'missed', rScore: 55 },
    { day: 'Sun', type: 'Easy', intent: 'Endurance', sport: 'Cycling', compliance: 'hit', rScore: 72 },
  ]
}
