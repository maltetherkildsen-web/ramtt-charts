// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useCallback, useState, useEffect, useId } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  FOCUS_RING_THIN,
  LABEL_STYLE,
} from '@/lib/ui'

// ─── Types ───

export interface TimePickerProps {
  /** "HH:MM" format, e.g. "14:30". null = empty */
  value: string | null
  onChange: (value: string) => void
  label?: string
  /** Default: '24h' */
  format?: '24h' | '12h'
  /** Minutes step. Default: 1 */
  step?: number
  /** "HH:MM" */
  min?: string
  /** "HH:MM" */
  max?: string
  disabled?: boolean
  className?: string
}

// ─── Helpers ───

function parseTime(s: string | null): { h: number; m: number } | null {
  if (!s) return null
  const [hStr, mStr] = s.split(':')
  const h = parseInt(hStr, 10)
  const m = parseInt(mStr, 10)
  if (isNaN(h) || isNaN(m)) return null
  return { h, m }
}

function formatTime(h: number, m: number): string {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function toMinutes(h: number, m: number): number {
  return h * 60 + m
}

function clampTime(
  h: number,
  m: number,
  minT: string | undefined,
  maxT: string | undefined,
): { h: number; m: number } {
  let total = toMinutes(h, m)
  if (minT) {
    const mn = parseTime(minT)
    if (mn) total = Math.max(total, toMinutes(mn.h, mn.m))
  }
  if (maxT) {
    const mx = parseTime(maxT)
    if (mx) total = Math.min(total, toMinutes(mx.h, mx.m))
  }
  return { h: Math.floor(total / 60), m: total % 60 }
}

function snapMinutes(m: number, step: number): number {
  if (step <= 1) return m
  return Math.round(m / step) * step
}

// ─── Field sub-component ───

function TimeField({
  value,
  onChange,
  onAdvance,
  maxVal,
  ariaLabel,
  disabled,
  id,
}: {
  value: string
  onChange: (v: string, raw: number) => void
  onAdvance?: () => void
  maxVal: number
  ariaLabel: string
  disabled: boolean
  id?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [buffer, setBuffer] = useState('')
  const bufferTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reset buffer when value changes externally
  useEffect(() => {
    setBuffer('')
  }, [value])

  const commitBuffer = useCallback(
    (buf: string) => {
      const num = parseInt(buf, 10)
      if (!isNaN(num)) {
        const clamped = Math.min(num, maxVal)
        onChange(String(clamped).padStart(2, '0'), clamped)
      }
      setBuffer('')
    },
    [maxVal, onChange],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const cur = parseInt(value, 10) || 0
        const next = cur >= maxVal ? 0 : cur + 1
        onChange(String(next).padStart(2, '0'), next)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const cur = parseInt(value, 10) || 0
        const next = cur <= 0 ? maxVal : cur - 1
        onChange(String(next).padStart(2, '0'), next)
      } else if (e.key === 'Tab') {
        // Normal tab behavior
      } else if (/^\d$/.test(e.key)) {
        e.preventDefault()
        const newBuf = buffer + e.key

        if (bufferTimerRef.current) clearTimeout(bufferTimerRef.current)

        if (newBuf.length >= 2) {
          commitBuffer(newBuf)
          onAdvance?.()
        } else {
          setBuffer(newBuf)
          // If first digit makes it impossible to reach 2 digits within range,
          // commit immediately (e.g., '3' for hours in 24h → 3 is fine, wait for second)
          const firstDigit = parseInt(newBuf, 10)
          if (firstDigit > Math.floor(maxVal / 10)) {
            commitBuffer(newBuf)
            onAdvance?.()
          } else {
            // Show preview
            const preview = String(firstDigit).padStart(2, '0')
            onChange(preview, firstDigit)
            bufferTimerRef.current = setTimeout(() => {
              commitBuffer(newBuf)
            }, 1000)
          }
        }
      }
    },
    [disabled, value, maxVal, onChange, buffer, commitBuffer, onAdvance],
  )

  const handleBlur = useCallback(() => {
    if (buffer) {
      commitBuffer(buffer)
    }
  }, [buffer, commitBuffer])

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="numeric"
      aria-label={ariaLabel}
      value={value}
      readOnly
      disabled={disabled}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={cn(
        'w-[48px] h-8 text-center bg-white outline-none',
        FONT.body,
        WEIGHT.strong,
        'text-[13px] text-[var(--n1150)] tabular-nums',
        RADIUS.md,
        BORDER.default,
        TRANSITION.colors,
        FOCUS_RING_THIN,
        'focus:border-[var(--n800)]',
        disabled && 'opacity-50',
      )}
    />
  )
}

// ─── AM/PM Toggle ───

function AmPmToggle({
  value,
  onChange,
  disabled,
}: {
  value: 'AM' | 'PM'
  onChange: (v: 'AM' | 'PM') => void
  disabled: boolean
}) {
  return (
    <div className={cn('inline-flex overflow-hidden ml-2', BORDER.default, RADIUS.md)}>
      {(['AM', 'PM'] as const).map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => onChange(period)}
          disabled={disabled}
          className={cn(
            FONT.body,
            'text-[11px] px-2 h-8',
            TRANSITION.background,
            value === period
              ? cn(WEIGHT.strong, 'text-[var(--n1150)] bg-[var(--n400)]')
              : cn(WEIGHT.normal, 'text-[var(--n800)] hover:bg-[var(--n200)]'),
            period === 'AM' && 'border-r-[0.5px] border-r-[var(--n400)]',
          )}
        >
          {period}
        </button>
      ))}
    </div>
  )
}

// ─── Component ───

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value, onChange, label, format = '24h', step = 1, min, max, disabled = false, className }, ref) => {
    const minuteRef = useRef<HTMLInputElement>(null)
    const autoId = useId()

    const parsed = parseTime(value)
    const h24 = parsed?.h ?? 0
    const m = parsed?.m ?? 0

    // 12h conversion
    const is12h = format === '12h'
    const period: 'AM' | 'PM' = h24 >= 12 ? 'PM' : 'AM'
    const h12 = is12h ? (h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24) : h24
    const displayH = is12h ? h12 : h24

    const maxHour = is12h ? 12 : 23
    const minHour = is12h ? 1 : 0

    const emit = useCallback(
      (newH: number, newM: number, newPeriod?: 'AM' | 'PM') => {
        let finalH = newH
        if (is12h) {
          const p = newPeriod ?? period
          if (p === 'AM') {
            finalH = newH === 12 ? 0 : newH
          } else {
            finalH = newH === 12 ? 12 : newH + 12
          }
        }
        const snapped = snapMinutes(newM, step)
        const clamped = clampTime(finalH, snapped, min, max)
        onChange(formatTime(clamped.h, clamped.m))
      },
      [is12h, period, step, min, max, onChange],
    )

    const handleHourChange = useCallback(
      (_display: string, raw: number) => {
        emit(raw, m)
      },
      [emit, m],
    )

    const handleMinuteChange = useCallback(
      (_display: string, raw: number) => {
        emit(displayH, raw)
      },
      [emit, displayH],
    )

    const handlePeriodChange = useCallback(
      (p: 'AM' | 'PM') => {
        emit(displayH, m, p)
      },
      [emit, displayH, m],
    )

    const advanceToMinute = useCallback(() => {
      // Focus the minute field (next sibling approach)
      const minInput = minuteRef.current?.parentElement?.querySelector<HTMLInputElement>(
        '[aria-label="Minutes"]',
      )
      minInput?.focus()
    }, [])

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {label && (
          <label htmlFor={autoId} className={cn(LABEL_STYLE, 'mb-1')}>
            {label}
          </label>
        )}
        <div ref={minuteRef} className="flex items-center">
          <TimeField
            id={autoId}
            value={String(displayH).padStart(2, '0')}
            onChange={handleHourChange}
            onAdvance={advanceToMinute}
            maxVal={maxHour}
            ariaLabel="Hours"
            disabled={disabled}
          />
          <span className={cn(FONT.body, WEIGHT.strong, 'text-[16px] text-[var(--n600)] mx-1')}>
            :
          </span>
          <TimeField
            value={String(m).padStart(2, '0')}
            onChange={handleMinuteChange}
            maxVal={59}
            ariaLabel="Minutes"
            disabled={disabled}
          />
          {is12h && (
            <AmPmToggle value={period} onChange={handlePeriodChange} disabled={disabled} />
          )}
        </div>
      </div>
    )
  },
)

TimePicker.displayName = 'TimePicker'
export { TimePicker }
