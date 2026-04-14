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
  dimensions: string[]
  series: { label: string; values: number[]; className?: string; dashed?: boolean }[]
}

/**
 * Two radar series: current vs best-ever across 8 athlete dimensions.
 */
export function generateAthleteProfile(): AthleteProfile {
  return {
    dimensions: ['Explosive', 'Anaerobic', 'VO2max', 'Threshold', 'Endurance', 'Durability', 'Fuel Efficiency', 'Race Execution'],
    series: [
      { label: 'Current', values: [72, 85, 90, 88, 76, 65, 75, 68], className: 'stroke-[var(--n1150)] fill-[var(--n1150)]/15' },
      { label: 'Best ever', values: [80, 88, 92, 90, 82, 78, 80, 74], className: 'stroke-[var(--n600)] fill-[var(--n600)]/10', dashed: true },
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

// ─── 21. Activity Heatmap ───

export interface HeatmapCell {
  row: number
  col: number
  value: number
}

/**
 * 7 rows (Mon–Sun) × 24 columns (00:00–23:00) activity intensity.
 * Pattern: high during work hours on weekdays, moderate evenings, low nights.
 * Returns data[][] matrix format for the new ChartHeatmap API.
 */
export function generateActivityHeatmap(): {
  data: (number | null)[][]
  yLabels: string[]
  xLabels: string[]
} {
  const rng = createRng(900)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
  const data: (number | null)[][] = []

  for (let row = 0; row < 7; row++) {
    const isWeekend = row >= 5
    const rowData: (number | null)[] = []
    for (let col = 0; col < 24; col++) {
      let base: number
      if (col >= 0 && col < 6) {
        base = 5 + rng() * 10
      } else if (col >= 6 && col < 9) {
        base = isWeekend ? 10 + rng() * 20 : 20 + rng() * 30
      } else if (col >= 9 && col < 17) {
        base = isWeekend ? 15 + rng() * 25 : 50 + rng() * 50
      } else if (col >= 17 && col < 21) {
        base = isWeekend ? 30 + rng() * 40 : 30 + rng() * 35
      } else {
        base = isWeekend ? 20 + rng() * 30 : 15 + rng() * 20
      }
      rowData.push(Math.round(base))
    }
    data.push(rowData)
  }

  return { data, yLabels: days, xLabels: hours }
}

/**
 * Season map: 7 days × 52 weeks of training load (TSS-like).
 * Seasonal wave with rest days as null.
 */
export function generateSeasonMap(): {
  data: (number | null)[][]
  yLabels: string[]
  xLabels: string[]
} {
  const rng = createRng(950)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const xLabels = Array.from({ length: 52 }, (_, w) =>
    (w + 1) % 4 === 0 ? `W${w + 1}` : '',
  )
  const data: (number | null)[][] = []

  for (let day = 0; day < 7; day++) {
    const rowData: (number | null)[] = []
    for (let week = 0; week < 52; week++) {
      // Rest days on weekends
      if (day >= 5 && rng() > 0.3) {
        rowData.push(null)
        continue
      }
      // Seasonal wave: peak in summer, low in winter
      const seasonal = 1 + Math.sin((week / 52) * Math.PI * 2 - Math.PI / 2) * 0.5
      const base = Math.floor(rng() * 150 * seasonal)
      rowData.push(base)
    }
    data.push(rowData)
  }

  return { data, yLabels: days, xLabels }
}

// ─── 22. Contribution (Calendar Heatmap) ───

export interface CalendarDay {
  date: string
  value: number
}

/**
 * 365 days of "contribution" data.
 * Weekdays more active than weekends, with streaks and gaps.
 */
export function generateContributionData(days = 365, seed = 901): CalendarDay[] {
  const rng = createRng(seed)
  const data: CalendarDay[] = []
  const endDate = new Date(Date.UTC(2026, 3, 10)) // April 10, 2026
  const startDate = new Date(endDate)
  startDate.setUTCDate(startDate.getUTCDate() - days + 1)

  const cursor = new Date(startDate)
  for (let i = 0; i < days; i++) {
    const dow = cursor.getUTCDay()
    const isWeekend = dow === 0 || dow === 6

    // Base activity
    let base = isWeekend ? 1 + rng() * 4 : 3 + rng() * 8

    // Productive bursts (15% chance)
    if (rng() < 0.15) base += 5 + rng() * 10

    // Vacation gaps (5% chance of zero)
    if (rng() < 0.05) base = 0

    const y = cursor.getUTCFullYear()
    const m = String(cursor.getUTCMonth() + 1).padStart(2, '0')
    const d = String(cursor.getUTCDate()).padStart(2, '0')

    data.push({
      date: `${y}-${m}-${d}`,
      value: Math.round(Math.max(0, base)),
    })
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  return data
}

// ─── 23. Portfolio (Sparkline Table) ───

export interface PortfolioStock {
  ticker: string
  name: string
  price: number
  change: number
  volume: string
  sparkline: number[]
}

/**
 * 8 stocks with price, change, volume, and 30-point sparkline data.
 */
export function generatePortfolioData(): PortfolioStock[] {
  return [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 198.42, change: 1.2, volume: '52.3M', sparkline: generateSparklineData('up', 801) },
    { ticker: 'GOOGL', name: 'Alphabet', price: 178.15, change: -0.4, volume: '28.1M', sparkline: generateSparklineData('down', 802) },
    { ticker: 'TSLA', name: 'Tesla', price: 245.80, change: 3.1, volume: '89.7M', sparkline: generateSparklineData('volatile', 803) },
    { ticker: 'MSFT', name: 'Microsoft', price: 442.57, change: 0.8, volume: '31.2M', sparkline: generateSparklineData('up', 804) },
    { ticker: 'AMZN', name: 'Amazon', price: 192.30, change: -1.5, volume: '45.8M', sparkline: generateSparklineData('down', 805) },
    { ticker: 'NVDA', name: 'NVIDIA', price: 875.40, change: 2.4, volume: '67.4M', sparkline: generateSparklineData('up', 806) },
    { ticker: 'META', name: 'Meta', price: 512.18, change: -0.2, volume: '22.9M', sparkline: generateSparklineData('flat', 807) },
    { ticker: 'BRK.B', name: 'Berkshire', price: 428.90, change: 0.1, volume: '8.4M', sparkline: generateSparklineData('flat', 808) },
  ]
}

// ─── 24. Product Timeline (Annotation) ───

/**
 * 12 months of revenue data with an S-curve growth pattern.
 */
export function generateProductTimelineData(months = 12, seed = 940): number[] {
  const rng = createRng(seed)
  const data: number[] = []
  for (let i = 0; i < months; i++) {
    const t = i / Math.max(1, months - 1)
    // S-curve from 25K to 95K
    const base = 25000 + 70000 * (t * t * (3 - 2 * t))
    data.push(Math.round(base + (rng() - 0.5) * 5000))
  }
  return data
}

// ─── 25. Temperature Anomaly (Gradient Threshold Area) ───

/**
 * 24 months of temperature data fluctuating around a 15°C baseline.
 * Creates a nice wave crossing the threshold multiple times.
 */
export function generateTemperatureAnomalyData(months = 24, seed = 951): number[] {
  const rng = createRng(seed)
  const data: number[] = []
  for (let i = 0; i < months; i++) {
    const t = i / Math.max(1, months - 1)
    // Sinusoidal wave around 15°C with 2 full cycles
    const base = 15 + 6 * Math.sin(t * 4 * Math.PI)
    const noise = normalRandom(rng) * 1.5
    data.push(Math.round((base + noise) * 10) / 10)
  }
  return data
}

// ─── 26. Sankey — Energy Flow ───

export function generateSankeyData() {
  return {
    nodes: [
      { id: 'intake', label: 'kJ Intake' },
      { id: 'z2', label: 'Z2 Endurance' },
      { id: 'z3', label: 'Z3 Tempo' },
      { id: 'z4', label: 'Z4 Threshold' },
      { id: 'z5', label: 'Z5 VO2max' },
      { id: 'output', label: 'Total Output' },
    ],
    links: [
      { source: 'intake', target: 'z2', value: 820 },
      { source: 'intake', target: 'z3', value: 380 },
      { source: 'intake', target: 'z4', value: 210 },
      { source: 'intake', target: 'z5', value: 90 },
      { source: 'z2', target: 'output', value: 820 },
      { source: 'z3', target: 'output', value: 380 },
      { source: 'z4', target: 'output', value: 210 },
      { source: 'z5', target: 'output', value: 90 },
    ],
  }
}

// ─── 27. Sunburst — Training Breakdown ───

import type { SunburstNode } from '@/lib/charts/layouts/sunburst'

export function generateSunburstData(): SunburstNode {
  return {
    name: 'Training',
    children: [
      {
        name: 'Cycling',
        children: [
          { name: 'Z2 Endurance', value: 7 },
          { name: 'Z3 Tempo', value: 3 },
          { name: 'Z4 Threshold', value: 2 },
        ],
      },
      {
        name: 'Running',
        children: [
          { name: 'Easy', value: 3 },
          { name: 'Tempo', value: 1.5 },
          { name: 'Intervals', value: 0.5 },
        ],
      },
      {
        name: 'Strength',
        children: [
          { name: 'Upper', value: 1.5 },
          { name: 'Lower', value: 1.5 },
        ],
      },
    ],
  }
}

// ─── 28. Pyramid — Intensity Distribution ───

export function generatePyramidData() {
  return [
    { label: 'Z1 Recovery', value: 420, color: '#94a3b8' },
    { label: 'Z2 Endurance', value: 280, color: '#22c55e' },
    { label: 'Z3 Tempo', value: 120, color: '#eab308' },
    { label: 'Z4 Threshold', value: 60, color: '#f97316' },
    { label: 'Z5 VO2max', value: 30, color: '#ef4444' },
    { label: 'Z6 Anaerobic', value: 10, color: '#dc2626' },
  ]
}

// ─── 29. Waterfall — Energy Balance ───

import type { WaterfallItem } from '@/lib/charts/utils/waterfall'

export function generateEnergyBalanceData(): WaterfallItem[] {
  return [
    { label: 'Start', value: 2400, type: 'total' },
    { label: 'Breakfast', value: 600, type: 'increase' },
    { label: 'Snack', value: 200, type: 'increase' },
    { label: 'Z2 Ride', value: -1200, type: 'decrease' },
    { label: 'Lunch', value: 700, type: 'increase' },
    { label: 'Z4 Run', value: -450, type: 'decrease' },
    { label: 'Dinner', value: 550, type: 'increase' },
    { label: 'End', value: 0, type: 'total' },
  ]
}

// ─── 30. Bullet — Performance Metrics ───

export function generateBulletMetrics() {
  return [
    {
      label: 'Avg Power',
      unit: 'W',
      value: 238,
      target: 250,
      ranges: [
        { to: 200, color: '#fecaca' },
        { to: 240, color: '#fef3c7' },
        { to: 280, color: '#d1fae5' },
        { to: 320, color: '#ecfdf5' },
      ],
    },
    {
      label: 'Weekly TSS',
      unit: '',
      value: 580,
      target: 650,
      ranges: [
        { to: 400, color: '#fecaca' },
        { to: 550, color: '#fef3c7' },
        { to: 700, color: '#d1fae5' },
        { to: 800, color: '#ecfdf5' },
      ],
    },
    {
      label: 'Avg HR',
      unit: 'bpm',
      value: 142,
      target: 148,
      ranges: [
        { to: 120, color: '#ecfdf5' },
        { to: 145, color: '#d1fae5' },
        { to: 160, color: '#fef3c7' },
        { to: 180, color: '#fecaca' },
      ],
    },
    {
      label: 'CHO/hr',
      unit: 'g',
      value: 72,
      target: 80,
      ranges: [
        { to: 40, color: '#fecaca' },
        { to: 60, color: '#fef3c7' },
        { to: 80, color: '#d1fae5' },
        { to: 100, color: '#ecfdf5' },
      ],
    },
  ]
}

// ─── 31. Stock + Volume (Sub-Chart demo) ───

export function generateStockWithVolume(days = 180, seed = 3100) {
  const rng = createRng(seed)
  const prices: number[] = []
  const volumes: number[] = []

  let price = 150
  for (let i = 0; i < days; i++) {
    price *= 1 + (rng() - 0.48) * 0.03
    prices.push(Math.round(price * 100) / 100)

    // Volume: higher on volatile days
    const volatility = Math.abs(prices[i] - (prices[i - 1] ?? price)) / price
    const baseVol = 2000000 + rng() * 3000000
    volumes.push(Math.round(baseVol * (1 + volatility * 20)))
  }

  return { prices, volumes }
}
