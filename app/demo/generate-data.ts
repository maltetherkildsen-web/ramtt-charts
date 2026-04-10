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

// (11. Scatter and 12. Quarterly Revenue are below Budget)


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

// ─── 11. Scatter Data ───

export interface ScatterPoint {
  x: number
  y: number
  size: number
  group: 'A' | 'B' | 'C'
}

/**
 * Correlated x/y scatter data with 3 clusters for bubble chart.
 */
export function generateScatterData(n = 80, seed = 601): ScatterPoint[] {
  const rng = createRng(seed)
  const points: ScatterPoint[] = []

  // Cluster A: strong positive correlation, top-right
  const clusterACount = Math.floor(n * 0.4)
  for (let i = 0; i < clusterACount; i++) {
    const x = 50 + normalRandom(rng) * 15
    const y = 0.8 * x + 10 + normalRandom(rng) * 8
    const size = 10 + rng() * 40
    points.push({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      size,
      group: 'A',
    })
  }

  // Cluster B: moderate correlation, middle
  const clusterBCount = Math.floor(n * 0.35)
  for (let i = 0; i < clusterBCount; i++) {
    const x = 30 + normalRandom(rng) * 12
    const y = 0.5 * x + 20 + normalRandom(rng) * 10
    const size = 10 + rng() * 40
    points.push({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      size,
      group: 'B',
    })
  }

  // Cluster C: weak/negative correlation, bottom-right
  const clusterCCount = n - clusterACount - clusterBCount
  for (let i = 0; i < clusterCCount; i++) {
    const x = 65 + normalRandom(rng) * 14
    const y = -0.3 * x + 50 + normalRandom(rng) * 12
    const size = 10 + rng() * 40
    points.push({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
      size,
      group: 'C',
    })
  }

  return points
}

// ─── 12. Quarterly Revenue by Region ───

export interface QuarterlyRevenue {
  quarter: string
  north: number
  south: number
  east: number
  west: number
}

/**
 * 4 quarters × 4 regions for stacked bar chart.
 */
export function generateQuarterlyRevenueData(): QuarterlyRevenue[] {
  return [
    { quarter: 'Q1', north: 45, south: 32, east: 28, west: 19 },
    { quarter: 'Q2', north: 52, south: 38, east: 31, west: 22 },
    { quarter: 'Q3', north: 48, south: 41, east: 35, west: 25 },
    { quarter: 'Q4', north: 61, south: 44, east: 38, west: 28 },
  ]
}

// ─── 13. OHLC Candlestick Data ───

export interface OHLCPoint {
  open: number
  high: number
  low: number
  close: number
  day: number
}

/**
 * 60 trading days of OHLC data starting at ~$100.
 */
export function generateOHLCData(days = 60, seed = 701): OHLCPoint[] {
  const rng = createRng(seed)
  const data: OHLCPoint[] = []
  let prevClose = 100

  for (let i = 0; i < days; i++) {
    // Gap open: prev close ± small amount
    const open = prevClose + (rng() - 0.5) * 2
    // Intraday range
    const range = 1.5 + rng() * 4
    const mid = open + (rng() - 0.48) * 3 // slight upward bias
    const high = mid + range * (0.3 + rng() * 0.7)
    const low = mid - range * (0.3 + rng() * 0.7)
    // Close within high/low range
    const close = low + rng() * (high - low)

    data.push({
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      day: i,
    })
    prevClose = close
  }

  return data
}

// ─── 14. Cash Flow Waterfall Data ───

export interface CashFlowItem {
  label: string
  value: number
  type: 'increase' | 'decrease' | 'total'
}

/**
 * Cash flow waterfall data with increases, decreases, and a net total.
 */
export function generateCashFlowData(): CashFlowItem[] {
  return [
    { label: 'Revenue', value: 420, type: 'increase' },
    { label: 'Services', value: 180, type: 'increase' },
    { label: 'COGS', value: -280, type: 'decrease' },
    { label: 'Salaries', value: -150, type: 'decrease' },
    { label: 'Marketing', value: -60, type: 'decrease' },
    { label: 'Rent', value: -35, type: 'decrease' },
    { label: 'Net', value: 0, type: 'total' },
  ]
}

// ─── 15. Athlete Profile (Radar) ───

export interface AthleteProfile {
  axes: { label: string; max: number }[]
  series: { values: number[]; color: string; label: string }[]
}

/**
 * Two radar series: current vs 6 months ago across 6 athlete dimensions.
 */
export function generateAthleteProfile(): AthleteProfile {
  return {
    axes: [
      { label: 'Power', max: 100 },
      { label: 'Endurance', max: 100 },
      { label: 'Speed', max: 100 },
      { label: 'Recovery', max: 100 },
      { label: 'Technique', max: 100 },
      { label: 'Mental', max: 100 },
    ],
    series: [
      { values: [85, 72, 68, 55, 78, 82], color: '#3b82f6', label: 'Current' },
      { values: [70, 65, 75, 60, 70, 70], color: '#a8a49a', label: '6 months ago' },
    ],
  }
}

// ─── 16. Goal Progress (Radial Bar) ───

export interface GoalProgress {
  label: string
  value: number
  max: number
  color: string
}

/**
 * Apple Watch-style ring data: Move, Exercise, Stand.
 */
export function generateGoalProgress(): GoalProgress[] {
  return [
    { label: 'Move', value: 420, max: 500, color: '#ef4444' },
    { label: 'Exercise', value: 28, max: 30, color: '#22c55e' },
    { label: 'Stand', value: 10, max: 12, color: '#3b82f6' },
  ]
}

// ─── 17. Browser Market Share (Percent Area) ───

export interface BrowserShare {
  month: number
  chrome: number
  safari: number
  firefox: number
  edge: number
  other: number
}

/**
 * 36 months of browser market share, normalized to 100%.
 */
export function generateBrowserShareData(months = 36): BrowserShare[] {
  const rng = createRng(888)
  const data: BrowserShare[] = []

  for (let i = 0; i < months; i++) {
    const t = i / Math.max(1, months - 1)
    // Chrome: dominant but slowly declining
    const rawChrome = 62 - 6 * t + normalRandom(rng) * 1.5
    // Safari: growing
    const rawSafari = 18 + 5 * t + normalRandom(rng) * 1.2
    // Firefox: declining
    const rawFirefox = 8 - 2 * t + normalRandom(rng) * 0.8
    // Edge: growing slowly
    const rawEdge = 5 + 3 * t + normalRandom(rng) * 0.6
    // Other: small
    const rawOther = 7 + normalRandom(rng) * 0.5

    // Normalize to 100%
    const total = rawChrome + rawSafari + rawFirefox + rawEdge + rawOther
    data.push({
      month: i,
      chrome: (rawChrome / total) * 100,
      safari: (rawSafari / total) * 100,
      firefox: (rawFirefox / total) * 100,
      edge: (rawEdge / total) * 100,
      other: (rawOther / total) * 100,
    })
  }

  return data
}

// ─── 18. Disk Usage (Treemap) ───

export interface DiskUsageItem {
  label: string
  value: number
  color: string
}

/**
 * Disk usage breakdown for treemap.
 */
export function generateDiskUsageData(): DiskUsageItem[] {
  return [
    { label: 'Photos', value: 42, color: '#3b82f6' },
    { label: 'Videos', value: 28, color: '#ef4444' },
    { label: 'Apps', value: 18, color: '#22c55e' },
    { label: 'System', value: 12, color: '#6b7280' },
    { label: 'Documents', value: 8, color: '#f59e0b' },
    { label: 'Music', value: 6, color: '#8b5cf6' },
    { label: 'Other', value: 4, color: '#64748b' },
  ]
}

// ─── 19. Sales Pipeline (Funnel) ───

export interface SalesPipelineItem {
  label: string
  value: number
  color: string
}

/**
 * Sales funnel stages from leads to closed deals.
 */
export function generateSalesPipeline(): SalesPipelineItem[] {
  return [
    { label: 'Leads', value: 1000, color: '#3b82f6' },
    { label: 'Qualified', value: 720, color: '#22c55e' },
    { label: 'Proposal', value: 410, color: '#f59e0b' },
    { label: 'Negotiation', value: 230, color: '#8b5cf6' },
    { label: 'Closed', value: 120, color: '#ef4444' },
  ]
}

// ─── 20. Response Time Distribution (Box Plot) ───

export interface ResponseTimeBox {
  label: string
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers?: number[]
}

/**
 * Response time box-and-whisker data for 5 services.
 */
export function generateResponseTimeData(): ResponseTimeBox[] {
  return [
    { label: 'API', min: 12, q1: 45, median: 72, q3: 120, max: 250, outliers: [380, 420] },
    { label: 'DB', min: 5, q1: 18, median: 35, q3: 68, max: 150, outliers: [210] },
    { label: 'Cache', min: 1, q1: 3, median: 5, q3: 8, max: 15 },
    { label: 'CDN', min: 8, q1: 22, median: 38, q3: 55, max: 95 },
    { label: 'Auth', min: 20, q1: 65, median: 95, q3: 140, max: 280, outliers: [350] },
  ]
}
