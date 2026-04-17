// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT } from '@/lib/ui'
import { getComponentDoc, COMPONENT_DOCS } from '@/lib/docs/registry'
import { DocPreview } from '@/components/docs/DocPreview'
import { DocCode } from '@/components/docs/DocCode'
import { DocSection } from '@/components/docs/DocSection'
import { DocPropTable } from '@/components/docs/DocPropTable'
import Link from 'next/link'
import { PreviewLoader } from './PreviewLoader'

export function generateStaticParams() {
  return Object.keys(COMPONENT_DOCS).map((slug) => ({ slug }))
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getComponentDoc(slug)

  if (!doc) {
    return (
      <div className="space-y-4">
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Component not found
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)]')}>
          No documentation for &quot;{slug}&quot;.
        </p>
        <Link href="/components" className={cn(FONT.body, 'text-[13px] font-[450] text-[var(--n800)] hover:text-[var(--n1150)]')}>
          ← Back to components
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
      </div>

      {/* Live preview */}
      <DocSection title="Preview">
        <DocPreview>
          <PreviewLoader slug={slug} />
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
