// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { cn, FONT } from '@/lib/ui'
import { getChartDoc } from '@/lib/docs/chart-registry'
import { DocPreview } from '@/components/docs/DocPreview'
import { DocCode } from '@/components/docs/DocCode'
import { DocSection } from '@/components/docs/DocSection'
import { DocPropTable } from '@/components/docs/DocPropTable'
import Link from 'next/link'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartBar } from '@/components/charts/primitives/ChartBar'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartDonut } from '@/components/charts/primitives/ChartDonut'
import { ChartRadar } from '@/components/charts/primitives/ChartRadar'
import { ChartRadialBar } from '@/components/charts/primitives/ChartRadialBar'
import { ChartTreemap } from '@/components/charts/primitives/ChartTreemap'
import { ChartFunnel } from '@/components/charts/primitives/ChartFunnel'

// ─── Sample data generators ───

function generateSine(n: number, amp: number, offset: number): number[] {
  return Array.from({ length: n }, (_, i) => offset + amp * Math.sin(i * 0.15) + Math.random() * amp * 0.2)
}

function generateBars(n: number, max: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max) + max * 0.2)
}

// ─── Chart previews ───

function LinePreview() {
  const data = useMemo(() => generateSine(80, 50, 200), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartLine className="stroke-[var(--n1150)] stroke-[1.5]" />
      <ChartAxisY />
    </ChartRoot>
  )
}

function AreaPreview() {
  const data = useMemo(() => generateSine(80, 40, 150), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartArea gradientColor="#16a34a" />
      <ChartLine className="stroke-green-600 stroke-[1.5]" />
      <ChartAxisY />
    </ChartRoot>
  )
}

function BarPreview() {
  const data = useMemo(() => generateBars(12, 80), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartBar className="fill-[var(--n1150)]" radius={3} gap={2} />
      <ChartAxisY />
    </ChartRoot>
  )
}

function DonutPreview() {
  return (
    <ChartDonut
      data={[
        { label: 'Z2', value: 55 },
        { label: 'Z3', value: 25 },
        { label: 'Z4', value: 12 },
        { label: 'Z5', value: 8 },
      ]}
      valueAccessor={(d: { value: number }) => d.value}
      labelAccessor={(d: { label: string }) => d.label}
      colors={['#16A34A', '#F59E0B', '#F97316', '#EF4444']}
      centerLabel="Zone split"
      centerValue="100%"
      size={200}
    />
  )
}

function RadarPreview() {
  return (
    <ChartRadar
      dimensions={['Power', 'Endurance', 'Sprint', 'Recovery', 'Technique']}
      series={[
        { label: 'Current', values: [80, 65, 90, 70, 85], className: 'stroke-blue-500 fill-blue-500/10' },
        { label: 'Target', values: [85, 80, 85, 80, 90], className: 'stroke-[var(--n400)] fill-[var(--n400)]/5', dashed: true },
      ]}
      size={240}
    />
  )
}

function RadialBarPreview() {
  return (
    <ChartRadialBar
      items={[
        { label: 'TSS', value: 85, max: 100, color: '#3b82f6' },
        { label: 'kJ', value: 2400, max: 3000, color: '#f59e0b' },
        { label: 'CHO', value: 45, max: 60, color: '#22c55e' },
      ]}
      size={200}
    />
  )
}

function TreemapPreview() {
  return (
    <ChartTreemap
      data={[
        { label: 'Z2 Endurance', value: 55, color: '#16A34A' },
        { label: 'Z3 Tempo', value: 25, color: '#F59E0B' },
        { label: 'Z4 Threshold', value: 12, color: '#F97316' },
        { label: 'Z5 VO2max', value: 8, color: '#EF4444' },
      ]}
      width={700}
      height={200}
    />
  )
}

function FunnelPreview() {
  return (
    <ChartFunnel
      data={[
        { label: 'Sessions', value: 120, color: '#3b82f6' },
        { label: 'Completed', value: 95, color: '#22c55e' },
        { label: 'With nutrition', value: 60, color: '#f59e0b' },
        { label: 'Compliant', value: 35, color: '#ef4444' },
      ]}
      width={500}
      height={220}
    />
  )
}

const CHART_PREVIEWS: Record<string, React.ComponentType> = {
  'line': LinePreview,
  'area': AreaPreview,
  'bar': BarPreview,
  'donut': DonutPreview,
  'radar': RadarPreview,
  'radial-bar': RadialBarPreview,
  'treemap': TreemapPreview,
  'funnel': FunnelPreview,
}

// ─── Page ───

export default function ChartPage() {
  const params = useParams()
  const slug = params.slug as string
  const doc = getChartDoc(slug)

  if (!doc) {
    return (
      <div className="space-y-4">
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Chart not found
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)]')}>
          No documentation for "{slug}".
        </p>
        <Link href="/charts" className={cn(FONT.body, 'text-[13px] font-[450] text-[var(--n800)] hover:text-[var(--n1150)]')}>
          ← Back to charts
        </Link>
      </div>
    )
  }

  const Preview = CHART_PREVIEWS[slug]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          {doc.name}
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-1')}>
          {doc.description}
        </p>
        <div className={cn(FONT.body, 'text-[12px] font-[450] text-[var(--n600)] mt-2')}>
          Primitive: <code className="text-[12px] bg-[var(--n200)] px-1 py-0.5 rounded-[4px]">{doc.primitive}</code>
          {doc.standalone && <span className="ml-2">· Standalone (no ChartRoot needed)</span>}
        </div>
      </div>

      {/* Live preview */}
      {Preview && (
        <DocSection title="Interactive demo">
          <DocPreview className="justify-start items-start">
            <div className="w-full">
              <Preview />
            </div>
          </DocPreview>
        </DocSection>
      )}

      {/* Usage */}
      <DocSection title="Usage">
        <DocCode>{doc.usage}</DocCode>
      </DocSection>

      {/* Props */}
      {doc.props.length > 0 && (
        <DocSection title="Props">
          <DocPropTable props={doc.props} />
        </DocSection>
      )}
    </div>
  )
}
