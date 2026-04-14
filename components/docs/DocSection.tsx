// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT, WEIGHT } from '@/lib/ui'
import type { ReactNode } from 'react'

interface DocSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function DocSection({ title, description, children, className }: DocSectionProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <div>
        <h2 className={cn(FONT.body, 'text-[14px] font-[550] text-[var(--n1150)]')}>
          {title}
        </h2>
        {description && (
          <p className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)] mt-1')}>
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}
