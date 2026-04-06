/**
 * Deterministic fake-data generators for the @ramtt/charts demo page.
 *
 * Every generator uses a seeded LCG (Linear Congruential Generator)
 * so charts render identically on every page load.
 */

// ─── Seeded PRNG (LCG) ───

function createRng(seed: number) {
  let s = seed | 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0
    return (s >>> 0) / 0xffffffff
  }
}

/** Box-Muller normal distribution from uniform samples. */
function normalRandom(rng: () => number): number {
  const u1 = Math.max(1e-10, rng()) // avoid log(0)
  const u2 = rng()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

// ─── 1. Stock Price ───

/**
 * Geometric random walk simulating a year of daily stock prices.
 * Slight upward drift (bull market) with realistic daily volatility.
 */
export function generateStockData(days = 365): number[] {
  const rng = createRng(42)
  const prices: number[] = [100]
  for (let i = 1; i < days; i++) {
    const dailyReturn = 0.0004 + 0.014 * normalRandom(rng)
    prices.push(Math.max(40, prices[i - 1] * (1 + dailyReturn)))
  }
  return prices
}

// ─── 2. Revenue & Costs ───

/**
 * Monthly revenue (growing) and costs (flatter) with a crossover
 * around month 4-5 — the "break-even" point.
 */
export function generateRevenueData(months = 12): {
  revenue: number[]
  costs: number[]
} {
  const rng = createRng(123)
  const revenue: number[] = []
  const costs: number[] = []
  for (let i = 0; i < months; i++) {
    const t = i / Math.max(1, months - 1)
    // Revenue: S-curve growth from ~38K to ~130K
    const revBase = 38 + 92 * (t * t * (3 - 2 * t))
    revenue.push(revBase + (rng() - 0.5) * 8)
    // Costs: gentle linear growth from ~58K to ~74K
    const costBase = 58 + 16 * t
    costs.push(costBase + (rng() - 0.5) * 5)
  }
  return { revenue, costs }
}

// ─── 3. Server Temperature ───

/**
 * 24 hours of CPU temperature data with a daily cycle,
 * noise, and occasional thermal spikes into the "hot" zone.
 */
export function generateTemperatureData(
  hours = 24,
  pointsPerHour = 20,
): number[] {
  const rng = createRng(77)
  const total = hours * pointsPerHour
  const temps: number[] = []
  for (let i = 0; i < total; i++) {
    const h = i / pointsPerHour // hour as float
    // Sinusoidal base: cool at 4am (~38 C), peak at 14:00 (~68 C)
    const base = 53 + 15 * Math.sin(((h - 4) / 12) * Math.PI)
    // Moderate noise
    const noise = normalRandom(rng) * 4
    // 6% chance of a thermal spike (+12-22 C)
    const spike = rng() < 0.06 ? 12 + rng() * 10 : 0
    temps.push(Math.max(28, Math.min(90, base + noise + spike)))
  }
  return temps
}

// ─── 4. IoT Sensors ───

/**
 * 1000 points over 24 hours — temperature, humidity, and barometric
 * pressure with realistic cross-correlations.
 */
export function generateSensorData(points = 1000): {
  temperature: number[]
  humidity: number[]
  pressure: number[]
} {
  const rng = createRng(999)
  const temperature: number[] = []
  const humidity: number[] = []
  const pressure: number[] = []

  for (let i = 0; i < points; i++) {
    const t = i / points // fraction of 24h

    // Temperature: 18-28 C with daily cycle peaking at ~14:00
    const tBase = 22 + 5 * Math.sin((t - 0.25) * 2 * Math.PI)
    const tNoise = normalRandom(rng) * 0.6
    temperature.push(tBase + tNoise)

    // Humidity: inversely correlated with temperature
    const hBase = 62 - 14 * Math.sin((t - 0.25) * 2 * Math.PI)
    const hNoise = normalRandom(rng) * 1.8
    humidity.push(Math.max(30, Math.min(90, hBase + hNoise)))

    // Pressure: slow drift with weather-front-style dip at ~16:00
    const pBase =
      1013.2 + 3.5 * Math.sin(t * Math.PI) - 2 * Math.exp(-200 * (t - 0.67) ** 2)
    const pNoise = normalRandom(rng) * 0.4
    pressure.push(pBase + pNoise)
  }

  return { temperature, humidity, pressure }
}
