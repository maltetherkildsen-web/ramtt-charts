'use client'

import { useMemo, useState } from 'react'
import { WEIGHT, RADIUS } from '@/lib/ui'
import { Select } from '@/components/ui/Select'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartGrid } from '@/components/charts/primitives/ChartGrid'
import { ChartTooltip } from '@/components/charts/primitives/ChartTooltip'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'

// ─── Math utilities ───
import { stackSeries } from '@/lib/charts/utils/stack'

// ─── Data ───
import { MONTHLY_DATA, MONTH_LABELS, generateDailyData } from './generate-data'
import type { MonthlyPoint, DailyPoint } from './generate-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart color tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHART_1 = 'var(--chart-1)' // #4C7FF7 — blue
const CHART_2 = 'var(--chart-2)' // #34C77B — green

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TrendIcon({ direction }: { direction: 'up' | 'down' | 'flat' }) {
  if (direction === 'up') return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 8L6 4L10 8" stroke="var(--chart-positive)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  if (direction === 'down') return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 4L6 8L10 4" stroke="var(--chart-negative)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6H10" stroke="var(--n600)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChartCard({
  title,
  description,
  components,
  trend,
  context,
  children,
}: {
  title: string
  description: string
  components: string
  trend?: { text: string; direction: 'up' | 'down' | 'flat' }
  context?: string
  children: React.ReactNode
}) {
  return (
    <div>
      {/* Component tag above card */}
      <div className="mb-2 px-1">
        <span className="text-[11px] font-[400] text-[var(--n600)]">
          {components}
        </span>
      </div>
      {/* Card */}
      <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
        <h2 className="text-[14px] font-[550] text-[var(--n1150)]">
          {title}
        </h2>
        <p className="mt-0.5 text-[12px] font-[450] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
          {description}
        </p>
        <div className="mt-4">{children}</div>
        {/* Footer */}
        {(trend || context) && (
          <div className="mt-4 border-t border-[var(--n200)] pt-3">
            {trend && (
              <div className="flex items-center gap-1.5">
                <TrendIcon direction={trend.direction} />
                <span className="text-[12px] font-[450] text-[var(--n800)]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {trend.text}
                </span>
              </div>
            )}
            {context && (
              <div className="mt-0.5 text-[11px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
                {context}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Area Chart — Interactive (hero, full-width)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Period = '90d' | '180d' | '365d'
const PERIOD_OPTIONS = [
  { value: '90d', label: 'Last 3 months' },
  { value: '180d', label: 'Last 6 months' },
  { value: '365d', label: 'Last year' },
]
const PERIOD_DAYS: Record<Period, number> = {
  '90d': 90,
  '180d': 180,
  '365d': 365,
}

function InteractiveAreaChart() {
  const fullData = useMemo(() => generateDailyData(365), [])
  const [period, setPeriod] = useState<Period>('90d')

  const slicedData = useMemo(() => {
    const days = PERIOD_DAYS[period]
    return fullData.slice(-days)
  }, [fullData, period])

  const desktopValues = useMemo(() => slicedData.map(d => d.desktop), [slicedData])
  const mobileValues = useMemo(() => slicedData.map(d => d.mobile), [slicedData])

  const desktopTotal = useMemo(() => desktopValues.reduce((a, b) => a + b, 0), [desktopValues])
  const mobileTotal = useMemo(() => mobileValues.reduce((a, b) => a + b, 0), [mobileValues])

  // Combined Y domain
  const allValues = useMemo(() => [...desktopValues, ...mobileValues], [desktopValues, mobileValues])
  const yMax = useMemo(() => Math.max(...allValues), [allValues])

  // X-axis: show month labels
  const xLabels = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (_index: number, _total: number) => {
      const i = Math.round(_index * (slicedData.length - 1) / Math.max(1, _total - 1))
      const d = slicedData[i]
      if (!d) return ''
      const date = new Date(d.date)
      return `${months[date.getMonth()]} ${date.getDate()}`
    }
  }, [slicedData])

  return (
    <div>
      <div className="mb-2 px-1">
        <span className="text-[11px] font-[400] text-[var(--n600)]">
          ChartArea + ChartLine + ChartTooltip + ChartGrid
        </span>
      </div>
      <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
        {/* Header with metrics + dropdown */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-[550] text-[var(--n1150)]">
              Area Chart - Interactive
            </h2>
            <p className="mt-0.5 text-[12px] font-[450] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
              Showing total visitors for the selected period
            </p>
          </div>
          {/* Period selector */}
          <Select
            options={PERIOD_OPTIONS}
            value={period}
            onChange={(v) => setPeriod(v as Period)}
            className="w-[160px]"
          />
        </div>

        {/* Metric cards */}
        <div className="mt-4 flex gap-6">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: CHART_1 }} />
              <span className="text-[11px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>Desktop</span>
            </div>
            <p className="mt-0.5 text-[20px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {desktopTotal.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: CHART_2 }} />
              <span className="text-[11px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>Mobile</span>
            </div>
            <p className="mt-0.5 text-[20px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {mobileTotal.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-4">
          <ChartRoot
            data={desktopValues}
            height={280}
            yDomain={[0, yMax * 1.1]}
            padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
          >
            <ChartGrid horizontal vertical={false} tickCount={4} />
            <ChartArea
              data={mobileValues}
              gradientColor={CHART_2}
              opacityFrom={0.15}
              opacityTo={0.0}
              curve="natural"
            />
            <ChartLine
              data={mobileValues}
              className="stroke-[var(--chart-2)] stroke-[1.5]"
              curve="natural"
            />
            <ChartArea
              gradientColor={CHART_1}
              opacityFrom={0.15}
              opacityTo={0.0}
              curve="natural"
            />
            <ChartLine
              className="stroke-[var(--chart-1)] stroke-[1.5]"
              curve="natural"
            />
            <ChartTooltip
              series={[
                { label: 'Desktop', color: CHART_1, values: desktopValues, format: (v: number) => v.toLocaleString() },
                { label: 'Mobile', color: CHART_2, values: mobileValues, format: (v: number) => v.toLocaleString() },
              ]}
              labelFn={(i: number) => {
                const d = slicedData[i]
                if (!d) return ''
                const date = new Date(d.date)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              }}
            />
            <ChartAxisX
              format={xLabels}
              labelCount={6}
            />
          </ChartRoot>
        </div>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Area Chart — Basic (single series, natural curve, gradient fill)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BasicAreaChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Area Chart"
      description="Showing total visitors for the last 6 months"
      components="ChartArea + ChartLine + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartArea
          gradientColor={CHART_1}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="natural"
        />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="dot"
          dotColor={CHART_1}
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Area Chart — Linear (straight lines)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LinearAreaChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Area Chart - Linear"
      description="Showing total visitors for the last 6 months"
      components="ChartArea + ChartLine (curve=linear) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartArea
          gradientColor={CHART_1}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="linear"
        />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="linear"
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="line"
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Area Chart — Step
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StepAreaChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Area Chart - Step"
      description="Showing total visitors for the last 6 months"
      components="ChartArea + ChartLine (curve=step) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartArea
          gradientColor={CHART_1}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="step"
        />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="step"
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="dot"
          dotColor={CHART_1}
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Area Chart — Legend (two series with legend)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LegendAreaChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)
  const allValues = [...desktopValues, ...mobileValues]
  const yMax = Math.max(...allValues)

  return (
    <ChartCard
      title="Area Chart - Legend"
      description="Showing total visitors for the last 6 months"
      components="ChartArea + ChartLine + Legend"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={desktopValues}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, yMax * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartArea
          data={mobileValues}
          gradientColor={CHART_2}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="natural"
        />
        <ChartLine
          data={mobileValues}
          className="stroke-[var(--chart-2)] stroke-[1.5]"
          curve="natural"
        />
        <ChartArea
          gradientColor={CHART_1}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="natural"
        />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
        />
        <ChartTooltip
          series={[
            { label: 'Desktop', color: CHART_1, values: desktopValues, format: (v: number) => v.toLocaleString() },
            { label: 'Mobile', color: CHART_2, values: mobileValues, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="dot"
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-[2px]" style={{ backgroundColor: CHART_1 }} />
          <span className="text-[11px] font-[450] text-[var(--n700)]" style={{ fontFamily: 'var(--font-sans)' }}>Desktop</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-[2px]" style={{ backgroundColor: CHART_2 }} />
          <span className="text-[11px] font-[450] text-[var(--n700)]" style={{ fontFamily: 'var(--font-sans)' }}>Mobile</span>
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Area Chart — Stacked
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StackedAreaChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)
  const stacked = useMemo(() => {
    return stackSeries(MONTHLY_DATA, [
      (d: MonthlyPoint) => d.desktop,
      (d: MonthlyPoint) => d.mobile,
    ])
  }, [])

  const yMax = useMemo(() => {
    return Math.max(...stacked[stacked.length - 1].map(s => s.y1))
  }, [stacked])

  // We need dummy data for ChartRoot — use the y1 of the top series as context data
  const topValues = stacked[1].map(s => s.y1)

  return (
    <ChartCard
      title="Area Chart - Stacked"
      description="Showing total visitors for the last 6 months"
      components="ChartArea + stackSeries + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={topValues}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, yMax * 1.1]}
      >
        <ChartGrid horizontal tickCount={3} />
        {/* Series 2 (Mobile) on top */}
        <ChartArea
          data={Array.from({ length: MONTHLY_DATA.length }, (_, i) => i) as any}
          gradientColor={CHART_2}
          opacityFrom={0.4}
          opacityTo={0.1}
          y0Accessor={(_d: any, i: number) => stacked[1][i].y0}
          yAccessor={(_d: any, i: number) => stacked[1][i].y1}
          curve="natural"
        />
        {/* Series 1 (Desktop) on bottom */}
        <ChartArea
          data={Array.from({ length: MONTHLY_DATA.length }, (_, i) => i) as any}
          gradientColor={CHART_1}
          opacityFrom={0.4}
          opacityTo={0.1}
          y0Accessor={(_d: any, i: number) => stacked[0][i].y0}
          yAccessor={(_d: any, i: number) => stacked[0][i].y1}
          curve="natural"
        />
        <ChartTooltip
          series={[
            { label: 'Desktop', color: CHART_1, values: desktopValues, format: (v: number) => v.toLocaleString() },
            { label: 'Mobile', color: CHART_2, values: mobileValues, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="line"
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. Area Chart — Stacked Expanded (100%)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StackedExpandedAreaChart() {
  const desktopPcts = MONTHLY_DATA.map(d => {
    const total = d.desktop + d.mobile
    return Math.round((d.desktop / total) * 100)
  })
  const mobilePcts = MONTHLY_DATA.map(d => {
    const total = d.desktop + d.mobile
    return Math.round((d.mobile / total) * 100)
  })

  // Normalize to percentages
  const normalizedData = useMemo(() => {
    return MONTHLY_DATA.map(d => {
      const total = d.desktop + d.mobile
      return {
        month: d.month,
        desktop: (d.desktop / total) * 100,
        mobile: (d.mobile / total) * 100,
      }
    })
  }, [])

  const stacked = useMemo(() => {
    return stackSeries(normalizedData, [
      (d) => d.desktop,
      (d) => d.mobile,
    ])
  }, [normalizedData])

  const dummyData = stacked[1].map(s => s.y1)

  return (
    <ChartCard
      title="Area Chart - Stacked Expanded"
      description="Showing percentage of visitors by device"
      components="ChartArea + stackSeries (normalized) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={dummyData}
        height={200}
        padding={{ left: 40, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, 100]}
      >
        <ChartGrid horizontal tickCount={4} />
        <ChartAxisY
          tickCount={4}
          format={(v: number) => `${Math.round(v)}%`}
        />
        {/* Series 2 (Mobile) on top */}
        <ChartArea
          data={Array.from({ length: normalizedData.length }, (_, i) => i) as any}
          gradientColor={CHART_2}
          opacityFrom={0.4}
          opacityTo={0.15}
          y0Accessor={(_d: any, i: number) => stacked[1][i].y0}
          yAccessor={(_d: any, i: number) => stacked[1][i].y1}
          curve="natural"
        />
        {/* Series 1 (Desktop) on bottom */}
        <ChartArea
          data={Array.from({ length: normalizedData.length }, (_, i) => i) as any}
          gradientColor={CHART_1}
          opacityFrom={0.4}
          opacityTo={0.15}
          y0Accessor={(_d: any, i: number) => stacked[0][i].y0}
          yAccessor={(_d: any, i: number) => stacked[0][i].y1}
          curve="natural"
        />
        <ChartTooltip
          series={[
            { label: 'Desktop', color: CHART_1, values: desktopPcts, format: (v: number) => `${v}%` },
            { label: 'Mobile', color: CHART_2, values: mobilePcts, format: (v: number) => `${v}%` },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="line"
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. Area Chart — Gradient (dramatic gradient fill)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GradientAreaChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Area Chart - Gradient"
      description="Showing total visitors for the last 6 months"
      components="ChartArea (opacityFrom=0.3) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartArea
          gradientColor={CHART_1}
          opacityFrom={0.3}
          opacityTo={0.0}
          curve="natural"
        />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="dot"
          dotColor={CHART_1}
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Area Chart — Axes (full axes + tooltip)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AxesAreaChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)
  const allValues = [...desktopValues, ...mobileValues]
  const yMax = Math.max(...allValues)

  return (
    <ChartCard
      title="Area Chart - Axes"
      description="Showing total visitors with Y-axis and tooltip"
      components="ChartArea + ChartAxisX + ChartAxisY + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={desktopValues}
        height={200}
        padding={{ left: 40, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, yMax * 1.15]}
      >
        <ChartGrid horizontal tickCount={4} />
        <ChartAxisY tickCount={4} />
        <ChartArea
          data={mobileValues}
          gradientColor={CHART_2}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="natural"
        />
        <ChartLine
          data={mobileValues}
          className="stroke-[var(--chart-2)] stroke-[1.5]"
          curve="natural"
        />
        <ChartArea
          gradientColor={CHART_1}
          opacityFrom={0.15}
          opacityTo={0.0}
          curve="natural"
        />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
        />
        <ChartTooltip
          series={[
            { label: 'Desktop', color: CHART_1, values: desktopValues, format: (v: number) => v.toLocaleString() },
            { label: 'Mobile', color: CHART_2, values: mobileValues, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * (MONTH_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function AreaChartsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Page header */}
      <h1 className="text-[24px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Area Charts
      </h1>
      <p className="mt-1 text-[14px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Area chart variations built with @ramtt/charts primitives
      </p>

      {/* Hero: Interactive area chart */}
      <div className="mt-8">
        <InteractiveAreaChart />
      </div>

      {/* Grid: 8 smaller variants */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BasicAreaChart />
        <LinearAreaChart />
        <StepAreaChart />
        <LegendAreaChart />
        <StackedAreaChart />
        <StackedExpandedAreaChart />
        <GradientAreaChart />
        <AxesAreaChart />
      </div>
    </div>
  )
}
