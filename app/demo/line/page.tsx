'use client'

import { useMemo, useState } from 'react'
import { WEIGHT, RADIUS } from '@/lib/ui'
import { Select } from '@/components/ui/Select'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartGrid } from '@/components/charts/primitives/ChartGrid'
import { ChartTooltip } from '@/components/charts/primitives/ChartTooltip'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'

// ─── Data ───
import { MONTHLY_DATA, MONTH_LABELS, generateDailyData } from './generate-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart color tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHART_1 = 'var(--chart-1)' // blue
const CHART_2 = 'var(--chart-2)' // green
const CHART_COLORS = [
  'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
  'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)',
]

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
// 1. Line Chart — Interactive (hero, full-width)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type Period = '90d' | '180d' | '365d'
const PERIOD_OPTIONS = [
  { value: '90d', label: 'Last 3 months' },
  { value: '180d', label: 'Last 6 months' },
  { value: '365d', label: 'Last year' },
]
const PERIOD_DAYS: Record<Period, number> = { '90d': 90, '180d': 180, '365d': 365 }

function InteractiveLineChart() {
  const fullData = useMemo(() => generateDailyData(365), [])
  const [period, setPeriod] = useState<Period>('90d')

  const slicedData = useMemo(() => fullData.slice(-PERIOD_DAYS[period]), [fullData, period])

  const desktopValues = useMemo(() => slicedData.map(d => d.desktop), [slicedData])
  const mobileValues = useMemo(() => slicedData.map(d => d.mobile), [slicedData])
  const desktopTotal = useMemo(() => desktopValues.reduce((a, b) => a + b, 0), [desktopValues])
  const mobileTotal = useMemo(() => mobileValues.reduce((a, b) => a + b, 0), [mobileValues])

  const allValues = useMemo(() => [...desktopValues, ...mobileValues], [desktopValues, mobileValues])
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
        <span className="text-[11px] font-[400] text-[var(--n600)]">
          ChartLine + ChartTooltip + ChartGrid
        </span>
      </div>
      <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-[550] text-[var(--n1150)]">
              Line Chart - Interactive
            </h2>
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
            <ChartGrid horizontal vertical={false} tickCount={4} />
            <ChartLine
              data={mobileValues}
              className="stroke-[var(--chart-2)] stroke-[1.5]"
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
            <ChartAxisX format={xLabels} labelCount={6} />
          </ChartRoot>
        </div>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Line Chart — Basic (single series, natural curve, no dots)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BasicLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart"
      description="Showing total visitors for the last 6 months"
      components="ChartLine + ChartTooltip"
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
// 3. Line Chart — Linear (straight lines between points)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LinearLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart - Linear"
      description="Showing total visitors for the last 6 months"
      components="ChartLine (curve=linear) + ChartTooltip"
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
// 4. Line Chart — Step (step function interpolation)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StepLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart - Step"
      description="Showing total visitors for the last 6 months"
      components="ChartLine (curve=step) + ChartTooltip"
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
// 5. Line Chart — Multiple (two series, legend)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MultipleLineChart() {
  const desktopValues = MONTHLY_DATA.map(d => d.desktop)
  const mobileValues = MONTHLY_DATA.map(d => d.mobile)
  const allValues = [...desktopValues, ...mobileValues]
  const yMax = Math.max(...allValues)

  return (
    <ChartCard
      title="Line Chart - Multiple"
      description="Showing total visitors for the last 6 months"
      components="ChartLine (x2) + Legend"
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
        <ChartLine
          data={mobileValues}
          className="stroke-[var(--chart-2)] stroke-[1.5]"
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
// 6. Line Chart — Dots (dots at every data point)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DotsLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart - Dots"
      description="Showing total visitors for the last 6 months"
      components="ChartLine (showDots) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 12, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
          showDots
          dotRadius={4}
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
// 7. Line Chart — Custom Dots (larger dots with subtle shadow)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CustomDotsLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart - Custom Dots"
      description="Showing total visitors for the last 6 months"
      components="ChartLine (renderDot) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 14, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
          showDots
          renderDot={({ cx, cy, value }) => (
            <g>
              {/* Shadow ring */}
              <circle
                cx={cx}
                cy={cy}
                r={7}
                fill="none"
                stroke="var(--chart-1)"
                strokeWidth={1}
                opacity={0.2}
              />
              {/* Main dot — larger, filled with line color */}
              <circle
                cx={cx}
                cy={cy}
                r={5}
                fill={value > 200 ? 'var(--chart-1)' : 'var(--n50)'}
                stroke="var(--chart-1)"
                strokeWidth={2}
              />
            </g>
          )}
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="none"
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
// 8. Line Chart — Label (value labels above each data point)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LabelLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart - Label"
      description="Showing total visitors for the last 6 months"
      components="ChartLine (renderDot + labels) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 24, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.2]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
          showDots
          renderDot={({ cx, cy, value }) => (
            <g>
              <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="var(--chart-1)"
                stroke="var(--n50)"
                strokeWidth={2}
              />
              <text
                x={cx}
                y={cy - 12}
                textAnchor="middle"
                dominantBaseline="auto"
                fill="var(--n1150)"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 550,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {value}
              </text>
            </g>
          )}
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="none"
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
// 9. Line Chart — Dots Colors (each dot a different color)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DotsColorsLineChart() {
  const values = MONTHLY_DATA.map(d => d.desktop)
  return (
    <ChartCard
      title="Line Chart - Dots Colors"
      description="Each dot uses a different chart color"
      components="ChartLine (renderDot + CHART_COLORS) + ChartTooltip"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRoot
        data={values}
        height={200}
        padding={{ left: 0, right: 0, top: 12, bottom: 24 }}
        yDomain={[0, Math.max(...values) * 1.15]}
      >
        <ChartGrid horizontal tickCount={3} />
        <ChartLine
          className="stroke-[var(--chart-1)] stroke-[1.5]"
          curve="natural"
          showDots
          renderDot={({ cx, cy, index }) => (
            <circle
              cx={cx}
              cy={cy}
              r={5}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
              stroke="var(--n50)"
              strokeWidth={2}
            />
          )}
        />
        <ChartTooltip
          series={[
            { label: 'Visitors', color: CHART_1, values, format: (v: number) => v.toLocaleString() },
          ]}
          labelFn={(i: number) => MONTH_LABELS[i] ?? ''}
          indicator="none"
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

export default function LineChartsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-[24px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Line Charts
      </h1>
      <p className="mt-1 text-[14px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Line chart variations built with @ramtt/charts primitives
      </p>

      {/* Hero: Interactive line chart */}
      <div className="mt-8">
        <InteractiveLineChart />
      </div>

      {/* Grid: 8 smaller variants */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BasicLineChart />
        <LinearLineChart />
        <StepLineChart />
        <MultipleLineChart />
        <DotsLineChart />
        <CustomDotsLineChart />
        <LabelLineChart />
        <DotsColorsLineChart />
      </div>
    </div>
  )
}
