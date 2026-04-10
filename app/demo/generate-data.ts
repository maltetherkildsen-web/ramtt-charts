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

// (new generators are below IoT section)

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

// ─── 5. Sparkline Data ───

/**
 * 30 data points simulating a KPI trend (one per day).
 * Trend: 'up' | 'down' | 'flat' | 'volatile'
 */
export function generateSparklineData(
  trend: 'up' | 'down' | 'flat' | 'volatile',
  seed: number,
  points = 30,
): number[] {
  const rng = createRng(seed)
  const data: number[] = [100]

  const drift =
    trend === 'up' ? 0.8 :
    trend === 'down' ? -0.6 :
    trend === 'flat' ? 0.05 :
    0

  const noise =
    trend === 'volatile' ? 5 : 1.5

  for (let i = 1; i < points; i++) {
    const change = drift + normalRandom(rng) * noise
    data.push(data[i - 1] + change)
  }

  return data
}

// ─── 6. Monthly Sales ───

export interface MonthlySale {
  month: string
  value: number
}

/**
 * 12 months of sales figures with a growth curve and seasonal dip.
 */
export function generateMonthlySales(): MonthlySale[] {
  const rng = createRng(456)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return months.map((month, i) => {
    const t = i / 11
    // Growth curve with summer dip (Jul/Aug)
    const base = 35000 + 30000 * t
    const seasonal = (i >= 5 && i <= 7) ? -8000 : (i >= 10 ? 12000 : 0)
    const noise = (rng() - 0.5) * 6000
    return { month, value: Math.round(base + seasonal + noise) }
  })
}

// ─── 7. Revenue & Growth Rate ───

export interface RevenueGrowth {
  month: string
  revenue: number
  growth: number
}

/**
 * 12 months of revenue with a corresponding growth rate percentage.
 */
export function generateRevenueGrowthData(): RevenueGrowth[] {
  const rng = createRng(789)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let prevRevenue = 38000
  return months.map((month, i) => {
    const growth = 3 + 8 * Math.sin((i / 11) * Math.PI) + normalRandom(rng) * 2
    const revenue = prevRevenue * (1 + Math.max(0.5, growth) / 100)
    prevRevenue = revenue
    return {
      month,
      revenue: Math.round(revenue),
      growth: Math.round(growth * 10) / 10,
    }
  })
}

// ─── 8. Market Share ───

export interface MarketShare {
  month: number
  companyA: number
  companyB: number
  companyC: number
  companyD: number
}

/**
 * 60 months (5 years) of market share data for 4 companies.
 * Each row is normalized to sum to 100%.
 */
export function generateMarketShareData(): MarketShare[] {
  const rng = createRng(321)

  return Array.from({ length: 60 }, (_, i) => {
    const rawA = 38 + normalRandom(rng) * 2 - i * 0.12
    const rawB = 24 + normalRandom(rng) * 1.5 + i * 0.15
    const rawC = 20 + normalRandom(rng) * 1.8
    const rawD = 18 + normalRandom(rng) * 1.2 + i * 0.05

    // Normalize to 100%
    const total = rawA + rawB + rawC + rawD
    return {
      month: i,
      companyA: (rawA / total) * 100,
      companyB: (rawB / total) * 100,
      companyC: (rawC / total) * 100,
      companyD: (rawD / total) * 100,
    }
  })
}

// ─── 9. Profit & Loss ───

export interface ProfitLoss {
  month: string
  value: number
}

/**
 * 12 months of P&L data crossing zero mid-year.
 */
export function generateProfitLossData(): ProfitLoss[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const values = [-12000, -8000, -3000, 2000, 8000, 15000, 12000, 18000, 22000, -5000, 4000, 28000]
  return months.map((month, i) => ({ month, value: values[i] }))
}

// ─── 10. Budget Allocation ───

export interface BudgetItem {
  category: string
  value: number
  color: string
}

/**
 * Budget allocation data for a donut chart.
 */
export function generateBudgetData(): BudgetItem[] {
  return [
    { category: 'Engineering', value: 450000, color: '#3b82f6' },
    { category: 'Marketing', value: 280000, color: '#22c55e' },
    { category: 'Sales', value: 190000, color: '#f59e0b' },
    { category: 'Operations', value: 120000, color: '#8b5cf6' },
    { category: 'Support', value: 85000, color: '#ef4444' },
    { category: 'Other', value: 45000, color: '#A8A49A' },
  ]
}
