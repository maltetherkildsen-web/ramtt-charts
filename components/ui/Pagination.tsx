// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND, FOCUS_RING, PAGE_BUTTON_SIZE, PAGE_BUTTON_ACTIVE } from '@/lib/ui'

export interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
  siblingCount?: number
  className?: string
}

function getPageRange(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  if (total <= 1) return [1]
  const range: (number | 'ellipsis')[] = []
  const start = Math.max(2, current - siblings)
  const end = Math.min(total - 1, current + siblings)

  range.push(1)
  if (start > 2) range.push('ellipsis')
  for (let i = start; i <= end; i++) range.push(i)
  if (end < total - 1) range.push('ellipsis')
  if (total > 1) range.push(total)
  return range
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onChange, siblingCount = 1, className }, ref) => {
    const range = getPageRange(page, totalPages, siblingCount)

    return (
      <nav ref={ref} aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
        {/* Previous */}
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={cn(
            'inline-flex items-center justify-center rounded-[6px]',
            PAGE_BUTTON_SIZE,
            FONT.body,
            'text-[13px]',
            WEIGHT.normal,
            TRANSITION.background,
            FOCUS_RING,
            page <= 1 ? 'text-[var(--n400)] pointer-events-none' : 'text-[var(--n800)]',
            HOVER_SAND,
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {range.map((item, i) =>
          item === 'ellipsis' ? (
            <span
              key={`e${i}`}
              className={cn(
                'inline-flex items-center justify-center',
                PAGE_BUTTON_SIZE,
                FONT.body,
                'text-[13px] text-[var(--n600)]',
              )}
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-current={item === page ? 'page' : undefined}
              className={cn(
                'inline-flex items-center justify-center rounded-[6px]',
                PAGE_BUTTON_SIZE,
                FONT.body,
                'text-[13px]',
                TRANSITION.background,
                FOCUS_RING,
                item === page
                  ? PAGE_BUTTON_ACTIVE
                  : cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
              )}
            >
              {item}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className={cn(
            'inline-flex items-center justify-center rounded-[6px]',
            PAGE_BUTTON_SIZE,
            FONT.body,
            'text-[13px]',
            WEIGHT.normal,
            TRANSITION.background,
            FOCUS_RING,
            page >= totalPages ? 'text-[var(--n400)] pointer-events-none' : 'text-[var(--n800)]',
            HOVER_SAND,
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
export { Pagination }
