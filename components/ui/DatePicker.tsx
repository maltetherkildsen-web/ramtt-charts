// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, FOCUS_RING_THIN, LABEL_STYLE, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X } from '@/lib/ui'
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
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

    // Ensure client-only rendering for portal
    useEffect(() => { setMounted(true) }, [])

    const displayText = (() => {
      if (!value) return ''
      if (value instanceof Date) return formatDate(value)
      return `${formatDate(value.from)} — ${formatDate(value.to)}`
    })()

    // Position popover below button
    useEffect(() => {
      if (!open || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setPopoverPos({
        top: rect.bottom + 4 + window.scrollY,
        left: rect.left + window.scrollX,
      })
    }, [open])

    // Close on outside click
    useEffect(() => {
      if (!open) return
      function handlePointerDown(e: PointerEvent) {
        const target = e.target as Node
        // Check if click is inside the container OR the portal popover
        if (containerRef.current?.contains(target)) return
        const popover = document.getElementById('ramtt-datepicker-popover')
        if (popover?.contains(target)) return
        setOpen(false)
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
        if (mode === 'range' && val && !(val instanceof Date)) {
          const range = val as DateRange
          if (range.from.getTime() !== range.to.getTime()) setOpen(false)
        }
      },
      [mode, onChange],
    )

    const handleToggle = useCallback(() => {
      if (!disabled) setOpen(prev => !prev)
    }, [disabled])

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
          onClick={handleToggle}
          className={cn(
            'flex items-center justify-between gap-2 w-full bg-white outline-none',
            FONT.body,
            SIZE_HEIGHTS.md,
            SIZE_TEXT.md,
            RADIUS.md,
            BORDER.default,
            TRANSITION.colors,
            FOCUS_RING_THIN,
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

        {open && mounted && createPortal(
          <div
            id="ramtt-datepicker-popover"
            className={cn(
              'fixed z-50',
              'bg-[var(--n50)]',
              BORDER.default,
              'rounded-[8px]',
              'p-3',
              'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            )}
            style={{ top: popoverPos.top, left: popoverPos.left }}
          >
            <Calendar
              mode={mode}
              selected={value}
              onSelect={handleSelect as (value: Date | { from: Date; to: Date } | null) => void}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>,
          document.body,
        )}
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'
export { DatePicker }
