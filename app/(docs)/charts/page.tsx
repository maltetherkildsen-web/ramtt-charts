// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT } from '@/lib/ui'
import { CHART_DOCS } from '@/lib/docs/chart-registry'
import Link from 'next/link'

export default function ChartsIndexPage() {
  const charts = Object.values(CHART_DOCS)

  return (
    <div className="space-y-8">
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Charts
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-2')}>
          {charts.length} SVG chart primitives. Zero dependencies — pure React + SVG.
          Every chart uses the same composable pattern: data in, SVG out.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {charts.map((chart) => (
          <Link
            key={chart.slug}
            href={`/charts/${chart.slug}`}
            className="group"
            // CSS perf hint — skip paint/layout for offscreen cards, no Tailwind equivalent
            style={{ contentVisibility: 'auto', containIntrinsicSize: '0 88px' }}
          >
            <div className={cn(
              'bg-[var(--n50)]',
              'border-[0.5px] border-[var(--n400)]',
              'rounded-[12px] p-4',
              'transition-[background-color] duration-150',
              'group-hover:bg-white',
            )}>
              <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
                {chart.name}
              </div>
              <div className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mt-1')}>
                {chart.standalone ? 'Standalone' : 'ChartRoot child'} · {chart.primitive}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
