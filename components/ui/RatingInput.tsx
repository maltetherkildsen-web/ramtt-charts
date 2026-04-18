// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useCallback } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, FOCUS_RING, LABEL_STYLE, RATING_SEGMENT_SIZE } from '@/lib/ui'

// ─── Types ───

export interface RatingInputProps {
  value: number | null
  onChange: (value: number) => void
  label?: string
  /** Default: 5 */
  max?: number
  /** Per-level descriptions, e.g. ['Dead', 'Heavy', 'Normal', 'Good', 'Fresh'] */
  labels?: string[]
  /** Inline mode, no label, smaller segments */
  compact?: boolean
  disabled?: boolean
  className?: string
}

// ─── Component ───

const RatingInput = forwardRef<HTMLDivElement, RatingInputProps>(
  ({ value, onChange, label, max = 5, labels, compact = false, disabled = false, className }, ref) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

    const segSize = compact ? RATING_SEGMENT_SIZE.compact : RATING_SEGMENT_SIZE.default
    const displayValue = hoverIndex !== null ? hoverIndex + 1 : value

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        let next = index
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault()
            next = Math.min(index + 1, max - 1)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault()
            next = Math.max(index - 1, 0)
            break
          case 'Home':
            e.preventDefault()
            next = 0
            break
          case 'End':
            e.preventDefault()
            next = max - 1
            break
          default:
            return
        }
        itemRefs.current[next]?.focus()
        onChange(next + 1)
      },
      [max, onChange],
    )

    const activeIndex = value !== null ? value - 1 : -1
    const focusableIndex = activeIndex >= 0 ? activeIndex : 0

    // Determine the active label text
    const activeLabel = labels && displayValue !== null && displayValue >= 1
      ? labels[displayValue - 1]
      : null

    return (
      <div ref={ref} className={cn('flex flex-col', disabled && 'opacity-50 pointer-events-none', className)}>
        {/* Label above */}
        {label && !compact && (
          <div className={cn(LABEL_STYLE, 'mb-1.5')}>
            {label}
          </div>
        )}

        {/* Segment row + numeral */}
        <div className="flex items-center" onMouseLeave={() => setHoverIndex(null)}>
          <div
            role="radiogroup"
            aria-label={label || 'Rating'}
            className="flex items-center"
            style={{ gap: 3 }}
          >
            {Array.from({ length: max }, (_, i) => {
              const isSelected = value !== null && i < value
              const isHovered = hoverIndex !== null && i <= hoverIndex
              const isCurrent = value !== null && i === value - 1

              return (
                <button
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el }}
                  type="button"
                  role="radio"
                  aria-checked={isCurrent}
                  aria-label={labels?.[i] ? `${i + 1}: ${labels[i]}` : String(i + 1)}
                  tabIndex={i === focusableIndex ? 0 : -1}
                  onClick={() => onChange(i + 1)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={cn(
                    'inline-flex items-center justify-center shrink-0',
                    'rounded-[4px]',
                    'transition-[background-color] duration-100',
                    FOCUS_RING,
                    // Colors
                    isSelected || isHovered
                      ? 'bg-[var(--accent)] border-[0.5px] border-[var(--accent)]'
                      : 'bg-[var(--n200)] border-[0.5px] border-[var(--n400)]',
                    // Hover preview on unselected
                    !isSelected && !isHovered && 'hover:bg-[var(--accent-soft)]',
                  )}
                  style={{ width: segSize, height: segSize }}
                />
              )
            })}
          </div>
          <span
            aria-hidden="true"
            className={cn(
              FONT.body,
              'text-[12px] tabular-nums ml-1.5 text-right',
              WEIGHT.medium,
              displayValue !== null ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
            )}
            style={{ minWidth: 14 }}
          >
            {displayValue ?? '—'}
          </span>
        </div>

        {/* Null state placeholder */}
        {value === null && hoverIndex === null && !compact && (
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-1')}>
            Tap to rate
          </span>
        )}

        {/* Active label */}
        {activeLabel && !compact && (
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-1')}>
            {activeLabel}
          </span>
        )}
      </div>
    )
  },
)

RatingInput.displayName = 'RatingInput'
export { RatingInput }
