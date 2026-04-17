// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT } from '@/lib/ui'
import { UI_COMPONENTS, CHART_TYPES } from '@/lib/docs/navigation'
import Link from 'next/link'
import { LandingPreview } from './LandingPreview'

const ICON_COUNT = 126 // base icons in @ramtt/icons

export default function DocsLandingPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div>
        <h1 className={cn(FONT.body, 'text-[28px] font-[550] text-[var(--n1150)]')}>
          RAMTT Design System
        </h1>
        <p className={cn(FONT.body, 'text-[15px] font-[400] text-[var(--n800)] mt-2 max-w-[480px]')}>
          A zero-dependency design system for React.
          Built for performance analytics with warm neutral tokens,
          carefully calibrated proportions, and 60fps chart rendering.
        </p>
        <p className={cn(FONT.body, 'text-[13px] font-[450] text-[var(--n600)] mt-3 tabular-nums')}>
          {UI_COMPONENTS.length} UI components · {CHART_TYPES.length} chart primitives · {ICON_COUNT} icons
        </p>
      </div>

      {/* Live preview */}
      <LandingPreview />

      {/* Quick start */}
      <div>
        <h2 className={cn(FONT.body, 'text-[14px] font-[550] text-[var(--n1150)] mb-3')}>
          Quick start
        </h2>
        <div className={cn(
          'bg-[var(--n1100)] text-[var(--n50)]',
          'rounded-[8px] p-4',
          FONT.body, 'text-[13px] font-[400] tabular-nums',
          'overflow-x-auto whitespace-pre',
        )}>
{`import { Button, Badge, Card } from '@ramtt/ui'
import { ChartRoot, ChartLine } from '@ramtt/charts'
import { IconHeart } from '@ramtt/icons/line'`}
        </div>
      </div>

      {/* Three packages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/components" className="group">
          <div className={cn(
            'bg-[var(--n50)]',
            'border-[0.5px] border-[var(--n400)]',
            'rounded-[12px] p-4',
            'transition-[background-color] duration-150',
            'group-hover:bg-white',
          )}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
              @ramtt/ui
            </div>
            <div className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mt-1')}>
              {UI_COMPONENTS.length} components
            </div>
          </div>
        </Link>

        <Link href="/charts" className="group">
          <div className={cn(
            'bg-[var(--n50)]',
            'border-[0.5px] border-[var(--n400)]',
            'rounded-[12px] p-4',
            'transition-[background-color] duration-150',
            'group-hover:bg-white',
          )}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
              @ramtt/charts
            </div>
            <div className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mt-1')}>
              {CHART_TYPES.length} SVG chart primitives
            </div>
          </div>
        </Link>

        <Link href="/icons" className="group">
          <div className={cn(
            'bg-[var(--n50)]',
            'border-[0.5px] border-[var(--n400)]',
            'rounded-[12px] p-4',
            'transition-[background-color] duration-150',
            'group-hover:bg-white',
          )}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
              @ramtt/icons
            </div>
            <div className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mt-1')}>
              {ICON_COUNT} icons × 3 variants
            </div>
          </div>
        </Link>
      </div>

      {/* Principles */}
      <div>
        <h2 className={cn(FONT.body, 'text-[14px] font-[550] text-[var(--n1150)] mb-3')}>
          Principles
        </h2>
        <div className="space-y-2">
          {[
            ['Monochrome UI', 'Color is reserved for data. UI chrome uses the warm neutral scale.'],
            ['Single font', 'Satoshi for everything — body, labels, numbers. Weight communicates hierarchy.'],
            ['0.5px borders', 'Hairline borders everywhere. No decorative shadows.'],
            ['Flat and calm', 'No gradients, no shadows, no visual noise. Cards separate by border only.'],
            ['cursor: default', 'The interface is calm, not clickbaity.'],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-3">
              <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] min-w-[120px]')}>
                {title}
              </div>
              <div className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)]')}>
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
