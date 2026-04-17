// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT } from '@/lib/ui'
import { getChartDoc, CHART_DOCS } from '@/lib/docs/chart-registry'
import { DocPreview } from '@/components/docs/DocPreview'
import { DocCode } from '@/components/docs/DocCode'
import { DocSection } from '@/components/docs/DocSection'
import { DocPropTable } from '@/components/docs/DocPropTable'
import Link from 'next/link'
import { ChartPreviewLoader } from './ChartPreviewLoader'

export function generateStaticParams() {
  return Object.keys(CHART_DOCS).map((slug) => ({ slug }))
}

export default async function ChartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getChartDoc(slug)

  if (!doc) {
    return (
      <div className="space-y-4">
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Chart not found
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)]')}>
          No documentation for &quot;{slug}&quot;.
        </p>
        <Link href="/charts" className={cn(FONT.body, 'text-[13px] font-[450] text-[var(--n800)] hover:text-[var(--n1150)]')}>
          ← Back to charts
        </Link>
      </div>
    )
  }

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
      <DocSection title="Interactive demo">
        <DocPreview className="justify-start items-start">
          <div className="w-full">
            <ChartPreviewLoader slug={slug} />
          </div>
        </DocPreview>
      </DocSection>

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
