'use client'

import { useMemo } from 'react'
import { RADIUS } from '@/lib/ui'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartBar } from '@/components/charts/primitives/ChartBar'
import { ChartGrid } from '@/components/charts/primitives/ChartGrid'
import { ChartTooltip } from '@/components/charts/primitives/ChartTooltip'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'

// ─── Math utilities ───
import { stackSeries } from '@/lib/charts/utils/stack'

// ─── Data ───
import { WEEKLY_DATA, DAY_LABELS, type ExercisePoint } from './generate-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Chart color tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHART_1 = 'var(--chart-1)'
const CHART_2 = 'var(--chart-2)'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared: stacked data computed once
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const runningValues = WEEKLY_DATA.map(d => d.running)
const swimmingValues = WEEKLY_DATA.map(d => d.swimming)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartCard({
  title, description, components, children,
}: {
  title: string; description: string; components: string
  children: React.ReactNode
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
        {/* Footer — legend */}
        <div className="mt-4 border-t border-[var(--n200)] pt-3 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-[2px]" style={{ backgroundColor: CHART_1 }} />
            <span className="text-[11px] font-[450] text-[var(--n700)]" style={{ fontFamily: 'var(--font-sans)' }}>Running</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-[2px]" style={{ backgroundColor: CHART_2 }} />
            <span className="text-[11px] font-[450] text-[var(--n700)]" style={{ fontFamily: 'var(--font-sans)' }}>Swimming</span>
          </div>
        </div>
      </section>
    </div>
  )
}

/** Shared base chart — stacked bar, only tooltip props differ */
function BaseStackedChart({
  tooltipProps,
}: {
  tooltipProps: React.ComponentProps<typeof ChartTooltip>
}) {
  const stacked = useMemo(() => stackSeries(WEEKLY_DATA, [
    (d: ExercisePoint) => d.running,
    (d: ExercisePoint) => d.swimming,
  ]), [])

  const topValues = stacked[1].map(s => s.y1)
  const yMax = Math.max(...topValues)

  return (
    <ChartRoot
      data={topValues}
      height={200}
      padding={{ left: 0, right: 0, top: 8, bottom: 24 }}
      yDomain={[0, yMax * 1.1]}
    >
      <ChartGrid horizontal tickCount={3} />
      <ChartBar
        data={runningValues}
        className="fill-[var(--chart-1)]"
        y0Accessor={(_, i) => stacked[0][i].y0}
        gap={24}
        radius={0}
      />
      <ChartBar
        data={swimmingValues}
        className="fill-[var(--chart-2)]"
        y0Accessor={(_, i) => stacked[0][i].y1}
        gap={24}
        radius={3}
      />
      <ChartTooltip {...tooltipProps} />
      <ChartAxisX
        format={(i, total) => DAY_LABELS[Math.round(i * (DAY_LABELS.length - 1) / Math.max(1, total - 1))] ?? ''}
        labelCount={6}
      />
    </ChartRoot>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Tooltip — Default (dot indicator)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DefaultTooltipChart() {
  return (
    <ChartCard
      title="Tooltip - Default"
      description="Dot indicators next to each series"
      components="ChartTooltip (tooltipIndicator=dot)"
    >
      <BaseStackedChart
        tooltipProps={{
          series: [
            { label: 'Running', color: CHART_1, values: runningValues },
            { label: 'Swimming', color: CHART_2, values: swimmingValues },
          ],
          labelFn: (i: number) => DAY_LABELS[i] ?? '',
          indicator: 'line',
          tooltipIndicator: 'dot',
        }}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Tooltip — Indicator Line
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LineIndicatorTooltipChart() {
  return (
    <ChartCard
      title="Tooltip - Indicator Line"
      description="Small colored lines instead of dots"
      components="ChartTooltip (tooltipIndicator=line)"
    >
      <BaseStackedChart
        tooltipProps={{
          series: [
            { label: 'Running', color: CHART_1, values: runningValues },
            { label: 'Swimming', color: CHART_2, values: swimmingValues },
          ],
          labelFn: (i: number) => DAY_LABELS[i] ?? '',
          indicator: 'line',
          tooltipIndicator: 'line',
        }}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Tooltip — Indicator Dashed
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DashedIndicatorTooltipChart() {
  return (
    <ChartCard
      title="Tooltip - Indicator Dashed"
      description="Small dashed colored lines"
      components="ChartTooltip (tooltipIndicator=dashed)"
    >
      <BaseStackedChart
        tooltipProps={{
          series: [
            { label: 'Running', color: CHART_1, values: runningValues },
            { label: 'Swimming', color: CHART_2, values: swimmingValues },
          ],
          labelFn: (i: number) => DAY_LABELS[i] ?? '',
          indicator: 'line',
          tooltipIndicator: 'dashed',
        }}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Tooltip — Formatter (kcal suffix)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FormatterTooltipChart() {
  const kcalFormat = (v: number) => `${v} kcal`
  return (
    <ChartCard
      title="Tooltip - Formatter"
      description="Custom value formatting with kcal suffix"
      components="ChartTooltip (series.format)"
    >
      <BaseStackedChart
        tooltipProps={{
          series: [
            { label: 'Running', color: CHART_1, values: runningValues, format: kcalFormat },
            { label: 'Swimming', color: CHART_2, values: swimmingValues, format: kcalFormat },
          ],
          labelFn: (i: number) => DAY_LABELS[i] ?? '',
          indicator: 'line',
          tooltipIndicator: 'dot',
        }}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Tooltip — Icons (emoji next to series names)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function IconsTooltipChart() {
  return (
    <ChartCard
      title="Tooltip - Icons"
      description="Icons next to each series name"
      components="ChartTooltip (series.icon)"
    >
      <BaseStackedChart
        tooltipProps={{
          series: [
            { label: 'Running', color: CHART_1, values: runningValues, icon: '\u{1F3C3}' },
            { label: 'Swimming', color: CHART_2, values: swimmingValues, icon: '\u{1F3CA}' },
          ],
          labelFn: (i: number) => DAY_LABELS[i] ?? '',
          indicator: 'line',
          tooltipIndicator: 'dot',
        }}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Tooltip — Advanced (total row + formatter)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AdvancedTooltipChart() {
  const kcalFormat = (v: number) => `${v} kcal`
  return (
    <ChartCard
      title="Tooltip - Advanced"
      description="Total row with custom formatting"
      components="ChartTooltip (showTotal + format)"
    >
      <BaseStackedChart
        tooltipProps={{
          series: [
            { label: 'Running', color: CHART_1, values: runningValues, format: kcalFormat },
            { label: 'Swimming', color: CHART_2, values: swimmingValues, format: kcalFormat },
          ],
          labelFn: (i: number) => DAY_LABELS[i] ?? '',
          indicator: 'line',
          tooltipIndicator: 'line',
          showTotal: true,
        }}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function TooltipChartsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-[24px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Tooltips
      </h1>
      <p className="mt-1 text-[14px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Tooltip configuration options for chart data display
      </p>

      {/* 3-column grid, 2 rows = 6 variants */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DefaultTooltipChart />
        <LineIndicatorTooltipChart />
        <DashedIndicatorTooltipChart />
        <FormatterTooltipChart />
        <IconsTooltipChart />
        <AdvancedTooltipChart />
      </div>
    </div>
  )
}
