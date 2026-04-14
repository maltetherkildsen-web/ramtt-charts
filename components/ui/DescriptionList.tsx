// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER } from '@/lib/ui'

// ─── Types ───

export interface DescriptionItem {
  label: string
  value: string | ReactNode
  action?: ReactNode
}

export interface DescriptionListProps {
  items: DescriptionItem[]
  /** Layout variant */
  variant?: 'default' | 'striped' | 'card'
  /** Number of columns on desktop */
  columns?: 1 | 2
  /** Title above the list */
  title?: string
  /** Description below title */
  description?: string
  className?: string
}

// ─── Component ───

const DescriptionList = forwardRef<HTMLDivElement, DescriptionListProps>(
  function DescriptionList(
    { items, variant = 'default', columns = 1, title, description, className },
    ref,
  ) {
    const isCard = variant === 'card'
    const isStriped = variant === 'striped'

    const rows = items.map((item, i) => {
      const isLast = i === items.length - 1
      const isOdd = i % 2 === 1

      return (
        <div
          key={`${item.label}-${i}`}
          className={cn(
            'grid items-start gap-2',
            item.action ? 'grid-cols-[1fr_2fr_auto]' : 'grid-cols-[1fr_2fr]',
            !isStriped && !isLast && 'border-b-[0.5px] border-b-[var(--n200)]',
            isStriped && isOdd && 'bg-[var(--n200)]/50',
          )}
          style={{
            padding: isStriped ? '12px 16px' : '12px 0',
          }}
        >
          {/* Label */}
          <dt className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n600)]')}>
            {item.label}
          </dt>

          {/* Value */}
          <dd className={cn(FONT.body, 'text-[14px]', WEIGHT.normal, 'text-[var(--n1150)]')}>
            {item.value}
          </dd>

          {/* Action */}
          {item.action && (
            <dd className="flex justify-end">{item.action}</dd>
          )}
        </div>
      )
    })

    // Two-column: split into pairs
    const content = columns === 2 ? (
      <div className="grid sm:grid-cols-2 gap-x-8">
        {rows}
      </div>
    ) : (
      <dl>{rows}</dl>
    )

    const inner = (
      <>
        {title && (
          <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)] mb-1')}>
            {title}
          </h3>
        )}
        {description && (
          <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mb-4')}>
            {description}
          </p>
        )}
        {content}
      </>
    )

    if (isCard) {
      return (
        <div
          ref={ref}
          className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, className)}
          style={{ padding: 20 }}
        >
          {inner}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(className)}>
        {inner}
      </div>
    )
  },
)

DescriptionList.displayName = 'DescriptionList'
export { DescriptionList }
