// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, FOCUS_RING_THICK, LABEL_STYLE, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X } from '@/lib/ui'
import { formatDate } from '@/lib/calendar-utils'
import { Calendar } from './Calendar'

interface DateRange {
  from: Date
  to: Date
}

export interface DatePickerProps {
  mode?: 'single' | 'range'
  value?: Date | DateRange | null
  onChange?: (value: Date | DateRange | null) => void
  label?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  className?: string
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ mode = 'single', value, onChange, label, placeholder = 'Pick a date', minDate, maxDate, disabled = false, className }, ref) => {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const displayText = (() => {
      if (!value) return ''
      if (value instanceof Date) return formatDate(value)
      return `${formatDate(value.from)} — ${formatDate(value.to)}`
    })()

    // Close on outside click
    useEffect(() => {
      if (!open) return
      function handlePointerDown(e: PointerEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [open])

    // Close on Escape
    useEffect(() => {
      if (!open) return
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') setOpen(false)
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    const handleSelect = useCallback(
      (val: Date | DateRange | null) => {
        onChange?.(val)
        if (mode === 'single') setOpen(false)
        // For range mode, close after both dates are selected
        if (mode === 'range' && val && !(val instanceof Date)) {
          const range = val as DateRange
          if (range.from.getTime() !== range.to.getTime()) setOpen(false)
        }
      },
      [mode, onChange],
    )

    return (
      <div ref={containerRef} className={cn('relative inline-block', disabled && 'opacity-50 pointer-events-none', className)}>
        {label && (
          <div className={cn(LABEL_STYLE, 'mb-1')}>
            {label}
          </div>
        )}
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'flex items-center justify-between gap-2 w-full bg-white outline-none',
            FONT.body,
            SIZE_HEIGHTS.md,
            SIZE_TEXT.md,
            RADIUS.md,
            BORDER.default,
            TRANSITION.colors,
            FOCUS_RING_THICK,
            SIZE_PADDING_X.sm,
            displayText ? cn(WEIGHT.normal, 'text-[var(--n1150)]') : cn(WEIGHT.normal, 'text-[var(--n600)]'),
            'tabular-nums',
          )}
        >
          <span className="truncate">{displayText || placeholder}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[var(--n600)]">
            <rect x="2.5" y="3" width="11" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
            <path d="M2.5 6.5h11M5.5 2v2M10.5 2v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>

        {open && (
          <div
            className={cn(
              'absolute z-50 top-full mt-1 left-0',
              'bg-[var(--n50)]',
              BORDER.default,
              'rounded-[8px]',
              'p-3',
              'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            )}
          >
            <Calendar
              mode={mode}
              selected={value}
              onSelect={handleSelect as (value: Date | { from: Date; to: Date } | null) => void}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        )}
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'
export { DatePicker }
