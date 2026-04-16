'use client'

import { useMemo, useState } from 'react'
import { RADIUS } from '@/lib/ui'
import { Select } from '@/components/ui/Select'
import { ChartDonut } from '@/components/charts/primitives/ChartDonut'
import { pieLayout } from '@/lib/charts/paths/arc'

// ─── Data ───
import {
  BROWSER_DATA, CHART_COLORS, MONO_BLUES,
  MONTHLY_VISITORS, MONTH_OPTIONS,
  type BrowserPoint,
} from './generate-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared helpers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const valueAccessor = (d: BrowserPoint) => d.visitors

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
        <div className="mt-4 flex items-center justify-center">{children}</div>
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
// Leader-line label component for pie charts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PieWithLabels({
  data,
  colors,
  innerRadius = 0,
  padAngle = 1.5,
  size = 220,
  labelMode,
}: {
  data: BrowserPoint[]
  colors: readonly string[]
  innerRadius?: number
  padAngle?: number
  size?: number
  labelMode: 'outside' | 'outside-far' | 'inside'
}) {
  const padRad = (padAngle * Math.PI) / 180
  const slices = useMemo(() => pieLayout(data, valueAccessor, padRad), [data, padRad])

  const outerR = size / 2 - 4
  const cx = size / 2
  const cy = size / 2

  // Label radius depends on mode
  const labelR = labelMode === 'outside-far' ? outerR + 32 : outerR + 18
  const lineStartR = outerR + 2
  const lineMidR = labelMode === 'outside-far' ? outerR + 18 : outerR + 10

  // SVG needs extra room for outside labels
  const svgSize = labelMode === 'inside' ? size : size + 80
  const offset = labelMode === 'inside' ? 0 : 40

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      shapeRendering="geometricPrecision"
    >
      <g transform={`translate(${offset},${offset})`}>
        {/* Pie segments via ChartDonut would require nesting SVGs, so render arcs directly */}
        {slices.map((slice, i) => {
          const innerR = outerR * innerRadius
          const sweep = slice.endAngle - slice.startAngle
          const largeArc = Math.abs(sweep) > Math.PI ? 1 : 0

          const ox1 = cx + outerR * Math.sin(slice.startAngle)
          const oy1 = cy - outerR * Math.cos(slice.startAngle)
          const ox2 = cx + outerR * Math.sin(slice.endAngle)
          const oy2 = cy - outerR * Math.cos(slice.endAngle)

          let d: string
          if (innerR <= 0) {
            d = `M${ox1.toFixed(2)},${oy1.toFixed(2)}A${outerR.toFixed(2)},${outerR.toFixed(2)},0,${largeArc},1,${ox2.toFixed(2)},${oy2.toFixed(2)}L${cx.toFixed(2)},${cy.toFixed(2)}Z`
          } else {
            const ix1 = cx + innerR * Math.sin(slice.endAngle)
            const iy1 = cy - innerR * Math.cos(slice.endAngle)
            const ix2 = cx + innerR * Math.sin(slice.startAngle)
            const iy2 = cy - innerR * Math.cos(slice.startAngle)
            d = `M${ox1.toFixed(2)},${oy1.toFixed(2)}A${outerR.toFixed(2)},${outerR.toFixed(2)},0,${largeArc},1,${ox2.toFixed(2)},${oy2.toFixed(2)}L${ix1.toFixed(2)},${iy1.toFixed(2)}A${innerR.toFixed(2)},${innerR.toFixed(2)},0,${largeArc},0,${ix2.toFixed(2)},${iy2.toFixed(2)}Z`
          }

          return <path key={i} d={d} fill={colors[i % colors.length]} />
        })}

        {/* Labels */}
        {slices.map((slice, i) => {
          const midAngle = (slice.startAngle + slice.endAngle) / 2
          const sinA = Math.sin(midAngle)
          const cosA = -Math.cos(midAngle)

          if (labelMode === 'inside') {
            // Inside label: positioned at ~65% of radius
            const r = outerR * 0.65
            const lx = cx + r * sinA
            const ly = cy + r * cosA
            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--n50)"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 550,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {slice.value}
              </text>
            )
          }

          // Outside labels with leader lines
          const startX = cx + lineStartR * sinA
          const startY = cy + lineStartR * cosA
          const midX = cx + lineMidR * sinA
          const midY = cy + lineMidR * cosA
          const endX = cx + labelR * sinA
          const endY = cy + labelR * cosA

          // For outside-far, add a horizontal tail
          const isRight = sinA > 0
          const tailX = labelMode === 'outside-far' ? endX + (isRight ? 12 : -12) : endX
          const textAnchor = isRight ? 'start' : 'end'
          const textX = labelMode === 'outside-far' ? tailX + (isRight ? 4 : -4) : endX + (isRight ? 4 : -4)

          return (
            <g key={i}>
              {/* Leader line */}
              <path
                d={labelMode === 'outside-far'
                  ? `M${startX.toFixed(1)},${startY.toFixed(1)}L${endX.toFixed(1)},${endY.toFixed(1)}L${tailX.toFixed(1)},${endY.toFixed(1)}`
                  : `M${startX.toFixed(1)},${startY.toFixed(1)}L${endX.toFixed(1)},${endY.toFixed(1)}`
                }
                stroke="var(--n400)"
                strokeWidth={0.5}
                fill="none"
              />
              {/* Small dot at line start */}
              <circle cx={startX} cy={startY} r={2} fill={colors[i % colors.length]} />
              {/* Label text */}
              <text
                x={textX}
                y={endY}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill="var(--n800)"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 450,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {slice.value}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Pie Chart (full pie, no hole)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BasicPieChart() {
  return (
    <ChartCard
      title="Pie Chart"
      description="January - June 2024"
      components="ChartDonut (innerRadius=0)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="Showing total visitors by browser"
    >
      <ChartDonut
        data={BROWSER_DATA}
        valueAccessor={valueAccessor}
        colors={CHART_COLORS}
        innerRadius={0}
        size={220}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Pie Chart — Separator None
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SeparatorNonePieChart() {
  return (
    <ChartCard
      title="Pie Chart - Separator None"
      description="Segments with no gap between them"
      components="ChartDonut (padAngle=0)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartDonut
        data={BROWSER_DATA}
        valueAccessor={valueAccessor}
        colors={MONO_BLUES}
        innerRadius={0}
        padAngle={0}
        size={220}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Pie Chart — Label (outside labels with leader lines)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LabelPieChart() {
  return (
    <ChartCard
      title="Pie Chart - Label"
      description="Value labels with leader lines"
      components="ChartDonut + pieLayout + leader lines"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <PieWithLabels
        data={BROWSER_DATA}
        colors={CHART_COLORS}
        labelMode="outside"
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Pie Chart — Custom Label (longer connector lines)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CustomLabelPieChart() {
  return (
    <ChartCard
      title="Pie Chart - Custom Label"
      description="Labels with extended connector lines"
      components="ChartDonut + pieLayout + far leader lines"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <PieWithLabels
        data={BROWSER_DATA}
        colors={CHART_COLORS}
        labelMode="outside-far"
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Pie Chart — Label List (inside labels)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LabelListPieChart() {
  return (
    <ChartCard
      title="Pie Chart - Label List"
      description="Value labels inside each segment"
      components="ChartDonut + pieLayout + inside labels"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <PieWithLabels
        data={BROWSER_DATA}
        colors={CHART_COLORS}
        labelMode="inside"
        size={240}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Pie Chart — Legend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LegendPieChart() {
  return (
    <ChartCard
      title="Pie Chart - Legend"
      description="Pie with legend below"
      components="ChartDonut + Legend"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <div className="flex flex-col items-center gap-4">
        <ChartDonut
          data={BROWSER_DATA}
          valueAccessor={valueAccessor}
          colors={CHART_COLORS}
          innerRadius={0}
          size={200}
        />
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
          {BROWSER_DATA.map((d, i) => (
            <div key={d.browser} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: CHART_COLORS[i] }}
              />
              <span
                className="text-[11px] font-[450] text-[var(--n700)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {d.browser}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. Pie Chart — Donut
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DonutChart() {
  return (
    <ChartCard
      title="Pie Chart - Donut"
      description="Standard donut with center hole"
      components="ChartDonut (innerRadius=0.6)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartDonut
        data={BROWSER_DATA}
        valueAccessor={valueAccessor}
        colors={CHART_COLORS}
        innerRadius={0.6}
        size={220}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. Pie Chart — Donut Active (click to select segment)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DonutActiveChart() {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = BROWSER_DATA[activeIdx]

  return (
    <ChartCard
      title="Pie Chart - Donut Active"
      description="Click a segment to highlight it"
      components="ChartDonut (activeIndex + onSegmentClick)"
      trend={{ text: `${active.browser}: ${active.visitors} visitors`, direction: 'flat' }}
      context="Click to change active segment"
    >
      <ChartDonut
        data={BROWSER_DATA}
        valueAccessor={valueAccessor}
        colors={CHART_COLORS}
        innerRadius={0.6}
        size={220}
        activeIndex={activeIdx}
        onSegmentClick={setActiveIdx}
        centerContent={
          <div className="flex flex-col items-center">
            <span
              className="text-[22px] font-[550] text-[var(--n1150)]"
              style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
            >
              {active.visitors}
            </span>
            <span
              className="text-[11px] font-[400] text-[var(--n600)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {active.browser}
            </span>
          </div>
        }
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Pie Chart — Donut with Text (interactive dropdown)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DonutWithTextChart() {
  const [month, setMonth] = useState('April')
  const monthData = MONTHLY_VISITORS.find(m => m.month === month) ?? MONTHLY_VISITORS[3]

  return (
    <div>
      <div className="mb-2 px-1">
        <span className="text-[11px] font-[400] text-[var(--n600)]">
          ChartDonut (centerContent) + Select
        </span>
      </div>
      <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-[550] text-[var(--n1150)]">
              Pie Chart - Donut with Text
            </h2>
            <p className="mt-0.5 text-[12px] font-[450] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
              Total visitors by browser for selected month
            </p>
          </div>
          <Select
            options={MONTH_OPTIONS}
            value={month}
            onChange={setMonth}
            className="w-[140px]"
          />
        </div>

        <div className="mt-4 flex items-center justify-center">
          <ChartDonut
            data={monthData.data}
            valueAccessor={valueAccessor}
            colors={CHART_COLORS}
            innerRadius={0.6}
            size={220}
            centerContent={
              <div className="flex flex-col items-center">
                <span
                  className="text-[24px] font-[550] text-[var(--n1150)]"
                  style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {monthData.total.toLocaleString()}
                </span>
                <span
                  className="text-[12px] font-[400] text-[var(--n600)]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Visitors
                </span>
              </div>
            }
          />
        </div>

        {/* Footer with legend */}
        <div className="mt-4 border-t border-[var(--n200)] pt-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {BROWSER_DATA.map((d, i) => (
              <div key={d.browser} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: CHART_COLORS[i] }}
                />
                <span
                  className="text-[11px] font-[450] text-[var(--n700)]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {d.browser}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function PieChartsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-[24px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Pie Charts
      </h1>
      <p className="mt-1 text-[14px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Pie and donut chart variations built with @ramtt/charts primitives
      </p>

      {/* 3-column grid, 3 rows = 9 variants */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BasicPieChart />
        <SeparatorNonePieChart />
        <LabelPieChart />
        <CustomLabelPieChart />
        <LabelListPieChart />
        <LegendPieChart />
        <DonutChart />
        <DonutActiveChart />
        <DonutWithTextChart />
      </div>
    </div>
  )
}
