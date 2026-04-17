'use client'

import { RADIUS } from '@/lib/ui'
import { ChartRadar } from '@/components/charts/primitives/ChartRadar'
import { ChartRadialBar } from '@/components/charts/primitives/ChartRadialBar'

// ─── Data ───
import {
  MONTHLY_DATA, MONTH_LABELS, DATA_MAX,
  RADIAL_BROWSERS, MONO_BLUES,
} from './generate-data'

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
// Radar data — normalized to 0-100 scale for ChartRadar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const desktopNorm = MONTHLY_DATA.map(d => Math.round((d.desktop / DATA_MAX) * 100))
const mobileNorm = MONTHLY_DATA.map(d => Math.round((d.mobile / DATA_MAX) * 100))

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Radar Chart — Basic (polygon grid, filled)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BasicRadarChart() {
  return (
    <ChartCard
      title="Radar Chart"
      description="Showing desktop visitors for the last 6 months"
      components="ChartRadar (gridType=polygon)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadar
        dimensions={MONTH_LABELS}
        series={[{
          label: 'Desktop',
          values: desktopNorm,
          className: 'stroke-[var(--chart-1)] fill-[var(--chart-1)]',
        }]}
        gridType="polygon"
        showDots={false}
        fillOpacity={0.12}
        size={260}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Radar Chart — Dots
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DotsRadarChart() {
  return (
    <ChartCard
      title="Radar Chart - Dots"
      description="With dots at each vertex"
      components="ChartRadar (showDots)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadar
        dimensions={MONTH_LABELS}
        series={[{
          label: 'Desktop',
          values: desktopNorm,
          className: 'stroke-[var(--chart-1)] fill-[var(--chart-1)]',
        }]}
        gridType="polygon"
        showDots
        fillOpacity={0.12}
        size={260}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Radar Chart — Lines Only (two series, no fill)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LinesOnlyRadarChart() {
  return (
    <ChartCard
      title="Radar Chart - Lines Only"
      description="Two series without fill"
      components="ChartRadar (fillOpacity=0, 2 series)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadar
        dimensions={MONTH_LABELS}
        series={[
          {
            label: 'Desktop',
            values: desktopNorm,
            className: 'stroke-[var(--chart-1)] fill-none',
          },
          {
            label: 'Mobile',
            values: mobileNorm,
            className: 'stroke-[var(--chart-2)] fill-none',
          },
        ]}
        gridType="polygon"
        showDots={false}
        strokeWidth={2}
        size={260}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Radar Chart — Custom Label
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CustomLabelRadarChart() {
  return (
    <ChartCard
      title="Radar Chart - Custom Label"
      description="Labels with value / max format"
      components="ChartRadar (renderLabel)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadar
        dimensions={MONTH_LABELS}
        series={[{
          label: 'Desktop',
          values: desktopNorm,
          className: 'stroke-[var(--chart-1)] fill-[var(--chart-1)]',
        }]}
        gridType="polygon"
        showDots
        fillOpacity={0.12}
        size={280}
        renderLabel={(dim, i) => (
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 450,
            color: 'var(--n800)',
            whiteSpace: 'nowrap',
          }}>
            {dim.slice(0, 3)}{' '}
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 550 }}>
              {MONTHLY_DATA[i].desktop}
            </span>
            <span style={{ color: 'var(--n600)' }}>/{DATA_MAX}</span>
          </span>
        )}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Radar Chart — Grid Custom (circle grid)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GridCircleRadarChart() {
  return (
    <ChartCard
      title="Radar Chart - Grid Custom"
      description="Concentric circles instead of polygon grid"
      components="ChartRadar (gridType=circle)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadar
        dimensions={MONTH_LABELS}
        series={[{
          label: 'Desktop',
          values: desktopNorm,
          className: 'stroke-[var(--chart-1)] fill-[var(--chart-1)]',
        }]}
        gridType="circle"
        showDots={false}
        fillOpacity={0.12}
        size={260}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Radar Chart — Grid None
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GridNoneRadarChart() {
  return (
    <ChartCard
      title="Radar Chart - Grid None"
      description="No background grid, minimal look"
      components="ChartRadar (showGrid=false)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadar
        dimensions={MONTH_LABELS}
        series={[{
          label: 'Desktop',
          values: desktopNorm,
          className: 'stroke-[var(--chart-1)] fill-[var(--chart-1)]',
        }]}
        showGrid={false}
        showDots
        fillOpacity={0.12}
        size={260}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. Radial Chart — Basic (single value)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BasicRadialChart() {
  return (
    <ChartCard
      title="Radial Chart"
      description="75% progress on a circular track"
      components="ChartRadialBar (single item)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadialBar
        items={[
          { label: 'Progress', value: 75, max: 100, color: 'var(--chart-1)' },
        ]}
        size={200}
        trackWidth={16}
        showCaps={false}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. Radial Chart — Label (concentric rings with browser labels)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LabelRadialChart() {
  const items = RADIAL_BROWSERS.map((b, i) => ({
    label: b.label,
    value: b.value,
    max: b.max,
    color: MONO_BLUES[i],
  }))

  return (
    <ChartCard
      title="Radial Chart - Label"
      description="Concentric rings with browser labels"
      components="ChartRadialBar (5 items, monochrome)"
      trend={{ text: 'Chrome leads with 1,260 visitors', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadialBar
        items={items}
        size={220}
        trackWidth={14}
        gap={4}
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Radial Chart — Grid (reference circles at 25/50/75/100%)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GridRadialChart() {
  return (
    <ChartCard
      title="Radial Chart - Grid"
      description="With grid reference circles"
      components="ChartRadialBar + grid overlay"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <div className="relative">
        <svg width={200} height={200} viewBox="0 0 200 200" className="absolute inset-0" shapeRendering="geometricPrecision">
          {/* Grid circles at 25%, 50%, 75%, 100% */}
          {[0.25, 0.5, 0.75, 1.0].map((pct) => (
            <circle
              key={pct}
              cx={100}
              cy={100}
              r={80 * pct}
              fill="none"
              stroke="var(--n300)"
              strokeWidth={0.5}
              strokeDasharray="2 3"
            />
          ))}
        </svg>
        <ChartRadialBar
          items={[
            { label: 'Visitors', value: 68, max: 100, color: 'var(--chart-1)' },
          ]}
          size={200}
          trackWidth={16}
          showCaps={false}
        />
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. Radial Chart — Text (large center value)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TextRadialChart() {
  return (
    <ChartCard
      title="Radial Chart - Text"
      description="Large center value display"
      components="ChartRadialBar (centerContent)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadialBar
        items={[
          { label: 'Visitors', value: 200, max: 300, color: 'var(--chart-1)' },
        ]}
        size={220}
        trackWidth={18}
        showCaps={false}
        centerContent={
          <div className="flex flex-col items-center">
            <span
              className="text-[32px] font-[550] text-[var(--n1150)]"
              style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
            >
              200
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
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. Radial Chart — Shape (rounded end caps)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ShapeRadialChart() {
  return (
    <ChartCard
      title="Radial Chart - Shape"
      description="Rounded end caps like Apple Watch rings"
      components="ChartRadialBar (showCaps)"
      trend={{ text: 'Trending up by 5.2% this month', direction: 'up' }}
      context="January - June 2024"
    >
      <ChartRadialBar
        items={[
          { label: 'Progress', value: 80, max: 100, color: 'var(--chart-1)' },
        ]}
        size={220}
        trackWidth={20}
        showCaps
        centerContent={
          <div className="flex flex-col items-center">
            <span
              className="text-[28px] font-[550] text-[var(--n1150)]"
              style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
            >
              80%
            </span>
          </div>
        }
      />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. Radial Chart — Stacked (multiple concentric rings)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StackedRadialChart() {
  const total = 1260 + 570 + 790

  return (
    <ChartCard
      title="Radial Chart - Stacked"
      description="Multiple concentric rings"
      components="ChartRadialBar (3 items + centerContent)"
      trend={{ text: `Total: ${total.toLocaleString()} visitors`, direction: 'up' }}
      context="January - June 2024"
    >
      <div className="flex flex-col items-center gap-4">
        <ChartRadialBar
          items={[
            { label: 'Chrome', value: 1260, max: 2000, color: 'var(--chart-1)' },
            { label: 'Safari', value: 570, max: 2000, color: 'var(--chart-2)' },
            { label: 'Firefox', value: 790, max: 2000, color: 'var(--chart-3)' },
          ]}
          size={220}
          trackWidth={14}
          gap={5}
          showCaps
          centerContent={
            <div className="flex flex-col items-center">
              <span
                className="text-[22px] font-[550] text-[var(--n1150)]"
                style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
              >
                {total.toLocaleString()}
              </span>
              <span
                className="text-[11px] font-[400] text-[var(--n600)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Total visitors
              </span>
            </div>
          }
        />
        {/* Legend */}
        <div className="flex items-center gap-4">
          {[
            { label: 'Chrome', color: 'var(--chart-1)' },
            { label: 'Safari', color: 'var(--chart-2)' },
            { label: 'Firefox', color: 'var(--chart-3)' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
              <span
                className="text-[11px] font-[450] text-[var(--n700)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function RadarChartsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="text-[24px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Radar Charts
      </h1>
      <p className="mt-1 text-[14px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Radar and radial chart variations built with @ramtt/charts primitives
      </p>

      {/* Section: Radar */}
      <h2 className="mt-10 text-[18px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Radar
      </h2>
      <p className="mt-0.5 text-[13px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Multi-axis polygon comparisons
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BasicRadarChart />
        <DotsRadarChart />
        <LinesOnlyRadarChart />
        <CustomLabelRadarChart />
        <GridCircleRadarChart />
        <GridNoneRadarChart />
      </div>

      {/* Section: Radial */}
      <h2 className="mt-12 text-[18px] font-[550] text-[var(--n1150)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Radial
      </h2>
      <p className="mt-0.5 text-[13px] font-[400] text-[var(--n600)]" style={{ fontFamily: 'var(--font-sans)' }}>
        Circular progress and gauge indicators
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BasicRadialChart />
        <LabelRadialChart />
        <GridRadialChart />
        <TextRadialChart />
        <ShapeRadialChart />
        <StackedRadialChart />
      </div>
    </div>
  )
}
