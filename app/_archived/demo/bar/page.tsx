'use client'

import { useMemo, useState } from 'react'
import { WEIGHT, RADIUS } from '@/lib/ui'
import { Select } from '@/components/ui/Select'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartBar } from '@/components/charts/primitives/ChartBar'
import { ChartGrid } from '@/components/charts/primitives/ChartGrid'
import { ChartTooltip } from '@/components/charts/primitives/ChartTooltip'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'

// ─── Math utilities ───
import { stackSeries } from '@/lib/charts/utils/stack'

// ─── Data ───
import {
  MONTHLY_DATA, MONTH_LABELS, BROWSER_DATA, NEGATIVE_DATA,
  generateDailyData,
} from './generate-data'
import type { MonthlyPoint } from './generate-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart color tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHART_1 = 'var(--chart-1)'
const CHART_2 = 'var(--chart-2)'

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
  title, description, components, trend, context, children,
}: {
  title: string; description: string; components: string
  trend?: { text: string; direction: 'up' | 'down' | 'flat' }
  context?: string; children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 px-1">
        <span className="text-[11px] font-[400] text-[var(--n600)]">{components}</span>
      </div>
      <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
        <h2 className="text-[14px] font-[550] text-[var(--n1150)]">{title}</h2>
        <p className="mt-0.5 text-[12px] font-[450] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>{description}</p>
        <div className="mt-4">{children}</div>
        {(trend || context) && (
          <div className="mt-4 border-t border-[var(--n200)] pt-3">
            {trend && (
              <div className="flex items-center gap-1.5">
                <TrendIcon direction={trend.direction} />
                <span className="text-[12px] font-[450] text-[var(--n800)]" style={{ fontFamily: 'var(--font-sans)' }}>{trend.text}</span>
              </div>
            )}
            {context && (
              <div className="mt-0.5 text-[11px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>{context}</div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Bar Chart — Interactive (hero, daily thin bars like shadcn)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Period = '90d' | '180d' | '365d'
const PERIOD_OPTIONS = [
  { value: '90d', label: 'Last 3 months' },
  { value: '180d', label: 'Last 6 months' },
  { value: '365d', label: 'Last year' },
]
const PERIOD_DAYS: Record<Period, number> = { '90d': 90, '180d': 180, '365d': 365 }

function InteractiveBarChart() {
  const fullData = useMemo(() => generateDailyData(365), [])
  const [period, setPeriod] = useState<Period>('90d')

  const slicedData = useMemo(() => fullData.slice(-PERIOD_DAYS[period]), [fullData, period])

  // Daily values directly — thin bars like shadcn
  const desktopValues = useMemo(() => slicedData.map(d => d.desktop), [slicedData])
  const mobileValues = useMemo(() => slicedData.map(d => d.mobile), [slicedData])
  const desktopTotal = useMemo(() => desktopValues.reduce((a, b) => a + b, 0), [desktopValues])
  const mobileTotal = useMemo(() => mobileValues.reduce((a, b) => a + b, 0), [mobileValues])
  const allValues = useMemo(() => desktopValues.map((d, i) => d + mobileValues[i]), [desktopValues, mobileValues])
  const yMax = useMemo(() => Math.max(...allValues), [allValues])

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
        <span className="text-[11px] font-[400] text-[var(--n600)]">ChartBar + ChartTooltip + ChartGrid</span>
      </div>
      <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-[550] text-[var(--n1150)]">Bar Chart - Interactive</h2>
            <p className="mt-0.5 text-[12px] font-[450] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
              Showing total visitors for the selected period
            </p>
          </div>
          <Select
            options={PERIOD_OPTIONS}
            value={period}
            onChange={(v) => setPeriod(v as Period)}
            className="w-[160px]"
          />
        </div>

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

        <div className="mt-4">
          <ChartRoot
            data={desktopValues}
            height={280}
            yDomain={[0, yMax * 1.1]}
            padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
          >
            <ChartGrid horizontal tickCount={4} />
            <ChartBar
              className="fill-[var(--chart-1)]"
              gap={1}
              radius={1}
            />
            <ChartTooltip
              series={[
                { label: 'Page Views', color: CHART_1, values: desktopValues, format: (v: number) => v.toLocaleString() },
              ]}
              labelFn={(i: number) => {
                const d = slicedData[i]
                if (!d) return ''
                const date = new Date(d.date)
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              }}
              indicator="line"
            />
            <ChartAxisX format={xLabels} labelCount={8} />
          </ChartRoot>
        </div>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Bar Chart — Basic (vertical, single series)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BasicBarChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Bar Chart"
      description="January - June 2024"
      components="ChartBar + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Showing total visitors for the last 6 months"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartBar className="fill-[var(--chart-1)]" gap={24} radius={4} />
        <ChartTooltip
          series={[{ label: 'Desktop', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="line"
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * 5 / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Bar Chart — Horizontal (self-contained geometry, no scale hacks)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HorizontalBarChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  const labels = MONTH_LABELS
  return (
    <ChartCard
      title="Bar Chart - Horizontal"
      description="January - June 2024"
      components="ChartBar (orientation=horizontal)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Showing total visitors for the last 6 months"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 40, right: 12, top: 4, bottom: 4 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartBar
          className="fill-[var(--chart-1)]"
          orientation="horizontal"
          gap={8}
          radius={4}
        />
        <ChartTooltip
          series={[{ label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => labels[i] ?? ''}
          indicator="none"
        />
        {/* Category labels inside the SVG g transform */}
        {labels.map((label, i) => {
          const slotHeight = 192 / values.length // chartHeight ≈ 200 - 4 - 4
          const cy = (i + 0.5) * slotHeight
          return (
            <text
              key={label}
              x={-8}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fill="var(--n800)"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 450 }}
            >
              {label}
            </text>
          )
        })}
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Bar Chart — Multiple (Grouped)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GroupedBarChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)
  const yMax = Math.max(...desktopValues, ...mobileValues)

  return (
    <ChartCard
      title="Bar Chart - Multiple"
      description="January - June 2024"
      components="ChartBar (groupIndex + groupCount)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Showing total visitors for the last 6 months"
    >
      <ChartRoot
        data={desktopValues}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, yMax * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartBar
          data={desktopValues}
          className="fill-[var(--chart-1)]"
          gap={24}
          radius={3}
          groupIndex={0}
          groupCount={2}
        />
        <ChartBar
          data={mobileValues}
          className="fill-[var(--chart-2)]"
          gap={24}
          radius={3}
          groupIndex={1}
          groupCount={2}
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
          format={(i, total) => MONTH_LABELS[Math.round(i * 5 / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Bar Chart — Stacked + Legend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StackedBarChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)

  const stacked = useMemo(() => stackSeries(MONTHLY_DATA, [
    (d: MonthlyPoint) => d.desktop,
    (d: MonthlyPoint) => d.mobile,
  ]), [])

  const topValues = stacked[1].map(s => s.y1)
  const yMax = Math.max(...topValues)

  return (
    <ChartCard
      title="Bar Chart - Stacked + Legend"
      description="January - June 2024"
      components="ChartBar + stackSeries + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Showing total visitors for the last 6 months"
    >
      <ChartRoot
        data={topValues}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, yMax * 1.1]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartBar
          data={desktopValues}
          className="fill-[var(--chart-1)]"
          y0Accessor={(_, i) => stacked[0][i].y0}
          gap={24}
          radius={0}
        />
        <ChartBar
          data={mobileValues}
          className="fill-[var(--chart-2)]"
          y0Accessor={(_, i) => stacked[0][i].y1}
          gap={24}
          radius={3}
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
          format={(i, total) => MONTH_LABELS[Math.round(i * 5 / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
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
// 6. Bar Chart — Label (value labels above bars)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LabelBarChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Bar Chart - Label"
      description="January - June 2024"
      components="ChartBar (showLabels=outside)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Showing total visitors for the last 6 months"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 20, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.2]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartBar
          className="fill-[var(--chart-1)]"
          gap={24}
          radius={4}
          showLabels="outside"
        />
        <ChartTooltip
          series={[{ label: 'Desktop', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="dot"
          dotColor={CHART_1}
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * 5 / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. Bar Chart — Custom Label (horizontal with outside labels)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CustomLabelBarChart() {
  const values = BROWSER_DATA.map(d => d.visitors)
  const labels = BROWSER_DATA.map(d => d.browser)

  return (
    <ChartCard
      title="Bar Chart - Custom Label"
      description="January 2024"
      components="ChartBar (horizontal + showLabels)"
      trend={{ text: 'Chrome leads with 275 visitors', direction: 'up' }}
      context="Browser market share"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 56, right: 40, top: 4, bottom: 4 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartBar
          className="fill-[var(--chart-1)]"
          orientation="horizontal"
          gap={10}
          radius={4}
          showLabels="outside"
        />
        <ChartTooltip
          series={[{ label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => labels[i] ?? ''}
          indicator="none"
        />
        {labels.map((label, i) => {
          const slotHeight = 192 / values.length
          const cy = (i + 0.5) * slotHeight
          return (
            <text
              key={label}
              x={-8}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fill="var(--n800)"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 450 }}
            >
              {label}
            </text>
          )
        })}
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. Bar Chart — Mixed (horizontal, per-bar colors)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MixedBarChart() {
  const values = BROWSER_DATA.map(d => d.visitors)
  const labels = BROWSER_DATA.map(d => d.browser)
  const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

  return (
    <ChartCard
      title="Bar Chart - Mixed"
      description="January 2024"
      components="ChartBar (horizontal + colorFn)"
      trend={{ text: 'Chrome dominates with 275 visitors', direction: 'up' }}
      context="Browser market share with colored bars"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 56, right: 12, top: 4, bottom: 4 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartBar
          orientation="horizontal"
          gap={10}
          radius={4}
          colorFn={(_v, i) => COLORS[i] ?? COLORS[0]}
        />
        <ChartTooltip
          series={[{ label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => labels[i] ?? ''}
          indicator="none"
        />
        {labels.map((label, i) => {
          const slotHeight = 192 / values.length
          const cy = (i + 0.5) * slotHeight
          return (
            <text
              key={label}
              x={-8}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fill="var(--n800)"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 450 }}
            >
              {label}
            </text>
          )
        })}
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Bar Chart — Active (highlight one, others dimmed)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ActiveBarChart() {
  const values = BROWSER_DATA.map(d => d.visitors)
  const labels = BROWSER_DATA.map(d => d.browser)
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <ChartCard
      title="Bar Chart - Active"
      description="Click bars to highlight"
      components="ChartBar (activeIndex)"
      trend={{ text: `${labels[activeIdx]}: ${values[activeIdx]} visitors`, direction: 'flat' }}
      context="Click to change active bar"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartBar
          className="fill-[var(--chart-1)]"
          gap={24}
          radius={4}
          activeIndex={activeIdx}
        />
        <ChartTooltip
          series={[{ label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => labels[i] ?? ''}
          indicator="dot"
          dotColor={CHART_1}
        />
        <ChartAxisX
          format={(i, total) => labels[Math.round(i * (labels.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={5}
        />
        {/* Invisible click target rects — positioned relative to bar centers */}
        {values.map((_, i) => {
          const segWidth = 1 / values.length
          return (
            <rect
              key={i}
              x={`${(i / values.length) * 100}%`}
              y={0}
              width={`${segWidth * 100}%`}
              height="100%"
              fill="transparent"
              onClick={() => setActiveIdx(i)}
              style={{ cursor: 'pointer' }}
            />
          )
        })}
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. Bar Chart — Negative
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function NegativeBarChart() {
  const values = NEGATIVE_DATA.map(d => d.value)
  const labels = NEGATIVE_DATA.map(d => d.month.slice(0, 3))
  const absMax = Math.max(...values.map(Math.abs))

  return (
    <ChartCard
      title="Bar Chart - Negative"
      description="January - June 2024"
      components="ChartBar (colorFn + negative values)"
      trend={{ text: 'Some months with negative growth', direction: 'down' }}
      context="Values above and below zero"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
        yDomain={[-absMax * 1.15, absMax * 1.15]}
      >
        <ChartGrid horizontal tickCount={4} />
        <ChartBar
          gap={24}
          radius={4}
          colorFn={(v) => v >= 0 ? 'var(--chart-1)' : 'color-mix(in srgb, var(--chart-1) 50%, transparent)'}
        />
        <ChartTooltip
          series={[{ label: 'Value', color: CHART_1, values, format: (v: number) => v.toLocaleString() }]}
          labelFn={(i: number) => labels[i] ?? ''}
          indicator="line"
        />
        <ChartAxisX
          format={(i, total) => labels[Math.round(i * (labels.length - 1) / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. Bar Chart — Axes (complete config with Y-axis)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AxesBarChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)
  const yMax = Math.max(...desktopValues, ...mobileValues)

  return (
    <ChartCard
      title="Bar Chart - Axes"
      description="January - June 2024"
      components="ChartBar + ChartAxisX + ChartAxisY + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Grouped bars with full axes and tooltip"
    >
      <ChartRoot
        data={desktopValues}
        height={200}
        padding={{ left: 40, right: 0, top: 8, bottom: 24 }}
        yDomain={[0, yMax * 1.15]}
      >
        <ChartGrid horizontal tickCount={4} />
        <ChartAxisY tickCount={4} />
        <ChartBar
          data={desktopValues}
          className="fill-[var(--chart-1)]"
          gap={24}
          radius={3}
          groupIndex={0}
          groupCount={2}
        />
        <ChartBar
          data={mobileValues}
          className="fill-[var(--chart-2)]"
          gap={24}
          radius={3}
          groupIndex={1}
          groupCount={2}
        />
        <ChartTooltip
          series={[
            { label: 'Desktop', color: CHART_1, values: desktopValues, format: (v: number) => v.toLocaleString() },
            { label: 'Mobile', color: CHART_2, values: mobileValues, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
        />
        <ChartAxisX
          format={(i, total) => MONTH_LABELS[Math.round(i * 5 / Math.max(1, total - 1))] ?? ''}
          labelCount={6}
        />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. Bar Chart — Percentage (horizontal, % of total)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PercentageBarChart() {
  const total = BROWSER_DATA.reduce((s, d) => s + d.visitors, 0)
  const percentages = BROWSER_DATA.map(d => Math.round((d.visitors / total) * 100))
  const labels = BROWSER_DATA.map(d => d.browser)

  return (
    <ChartCard
      title="Bar Chart - Percentage"
      description="January 2024"
      components="ChartBar (horizontal + labelFormat)"
      trend={{ text: 'Chrome at 30% market share', direction: 'flat' }}
      context="Browser share as percentage of total"
    >
      <ChartRoot
        data={percentages}
        height={200}
        padding={{ left: 56, right: 40, top: 4, bottom: 4 }}
        yDomain={[0, 100]}
      >
        <ChartBar
          className="fill-[var(--chart-1)]"
          orientation="horizontal"
          gap={10}
          radius={4}
          showLabels="outside"
          labelFormat={(v) => `${v}%`}
        />
        <ChartTooltip
          series={[{ label: 'Share', color: CHART_1, values: percentages, format: (v: number) => `${v}%` }]}
          labelFn={(i: number) => labels[i] ?? ''}
          indicator="none"
        />
        {labels.map((label, i) => {
          const slotHeight = 192 / percentages.length
          const cy = (i + 0.5) * slotHeight
          return (
            <text
              key={label}
              x={-8}
              y={cy}
              textAnchor="end"
              dominantBaseline="central"
              fill="var(--n800)"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 450 }}
            >
              {label}
            </text>
          )
        })}
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function BarChartsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-[24px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Bar Charts
      </h1>
      <p className="mt-1 text-[14px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Bar chart variations built with @ramtt/charts primitives
      </p>

      <div className="mt-8">
        <InteractiveBarChart />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BasicBarChart />
        <HorizontalBarChart />
        <GroupedBarChart />
        <StackedBarChart />
        <LabelBarChart />
        <CustomLabelBarChart />
        <MixedBarChart />
        <ActiveBarChart />
        <NegativeBarChart />
        <AxesBarChart />
        <PercentageBarChart />
      </div>
    </div>
  )
}
