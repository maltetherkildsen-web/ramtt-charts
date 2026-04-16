'use client'

import { useMemo } from 'react'
import { WEIGHT, RADIUS } from '@/lib/ui'
import { ChartTreemapPro } from '@/components/charts/primitives/ChartTreemapPro'
import type { TreemapNode, TreemapGroup } from '@/lib/charts/utils/treemap'
import { generateSP500Data } from './generate-data'

// ─── Custom Hover Content ───

function MarketHoverContent({ node, group }: { node: TreemapNode; group: TreemapGroup }) {
  const meta = node.meta as { name: string; ticker: string; marketCap: number; change: number } | undefined
  if (!meta) return null

  const pct = meta.change * 100
  const pctColor = Math.abs(pct) < 0.1 ? 'var(--n600)' : pct > 0 ? '#3BAC88' : '#E96850' // audit-ignore-hex

  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[11px] text-[var(--n600)]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
      >
        {group.label}
      </span>
      <div className="flex items-baseline gap-2">
        <span
          className="text-[15px] text-[var(--n1150)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550 }}
        >
          {meta.ticker}
        </span>
        <span
          className="text-[12px] text-[var(--n600)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          {meta.name}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-0.5">
        <span
          className="text-[13px] text-[var(--n800)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }}
        >
          ${meta.marketCap.toLocaleString()}B
        </span>
        <span
          className="text-[13px]"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 550,
            fontVariantNumeric: 'tabular-nums',
            color: pctColor,
          }}
        >
          {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}

// ─── Page ───

export default function TreemapDemoPage() {
  const sp500Data = useMemo(() => generateSP500Data(), [])

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto max-w-[920px] px-6 py-12">
        <div className="mb-2 px-1">
          <span className="text-[11px] font-[400] text-[var(--n600)]">
            ChartTreemapPro
          </span>
        </div>

        <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2
                className="text-[14px] text-[var(--n1150)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 550 }}
              >
                S&P 500 Heatmap
              </h2>
              <p
                className="mt-0.5 text-[12px] text-[var(--n600)]"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
              >
                Size = market capitalization. Color = daily % change.
              </p>
            </div>
          </div>

          <div className="h-[420px]">
            <ChartTreemapPro
              data={sp500Data}
              hoverContent={(node, group) => <MarketHoverContent node={node} group={group} />}
              legendLabels={['-3%', '0%', '+3%']}
              enableZoom
              enableFullscreen
              showLegend
              animate
            />
          </div>
        </section>
      </div>
    </main>
  )
}
