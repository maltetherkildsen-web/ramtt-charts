// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useCallback, useEffect, useId } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  TRANSITION,
  FOCUS_RING,
  LABEL_STYLE,
  STEPPER_REPEAT_DELAY,
  STEPPER_REPEAT_INTERVAL,
} from '@/lib/ui'

// ─── Types ───

export interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  /** Default: 1 */
  step?: number
  label?: string
  unit?: string
  disabled?: boolean
  className?: string
}

// ─── Helpers ───

function clamp(v: number, min?: number, max?: number): number {
  if (min !== undefined && v < min) return min
  if (max !== undefined && v > max) return max
  return v
}

// ─── Component ───

const NumberStepper = forwardRef<HTMLDivElement, NumberStepperProps>(
  ({ value, onChange, min, max, step = 1, label, unit, disabled = false, className }, ref) => {
    const [editing, setEditing] = useState(false)
    const [editValue, setEditValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const repeatRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const accelRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const valueRef = useRef(value)
    const autoId = useId()

    // Keep ref in sync with prop
    valueRef.current = value

    const atMin = min !== undefined && value <= min
    const atMax = max !== undefined && value >= max

    const doStep = useCallback(
      (delta: number) => {
        const next = clamp(valueRef.current + delta, min, max)
        valueRef.current = next
        onChange(next)
      },
      [onChange, min, max],
    )

    // ── Hold-to-repeat logic ──
    const stopRepeat = useCallback(() => {
      if (repeatRef.current) { clearTimeout(repeatRef.current); repeatRef.current = null }
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
      if (accelRef.current) { clearInterval(accelRef.current); accelRef.current = null }
    }, [])

    const startRepeat = useCallback(
      (delta: number) => {
        const t0 = Date.now()

        repeatRef.current = setTimeout(() => {
          // Start at normal interval
          intervalRef.current = setInterval(() => doStep(delta), STEPPER_REPEAT_INTERVAL)

          // After 2 seconds, accelerate to 50ms
          accelRef.current = setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            intervalRef.current = setInterval(() => doStep(delta), 50)
          }, Math.max(0, 2000 - (Date.now() - t0))) as unknown as ReturnType<typeof setInterval>
        }, STEPPER_REPEAT_DELAY)
      },
      [doStep],
    )

    // Cleanup on unmount
    useEffect(() => stopRepeat, [stopRepeat])

    // ── Inline editing ──
    const startEdit = useCallback(() => {
      if (disabled) return
      setEditValue(String(value))
      setEditing(true)
      requestAnimationFrame(() => inputRef.current?.select())
    }, [value, disabled])

    const commitEdit = useCallback(() => {
      setEditing(false)
      const parsed = parseFloat(editValue)
      if (!isNaN(parsed)) {
        onChange(clamp(parsed, min, max))
      }
    }, [editValue, onChange, min, max])

    const handleEditKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          commitEdit()
        } else if (e.key === 'Escape') {
          setEditing(false)
        }
      },
      [commitEdit],
    )

    // ── Keyboard navigation on the container ──
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || editing) return
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          doStep(step)
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          doStep(-step)
        } else if (e.key === 'PageUp') {
          e.preventDefault()
          doStep(step * 10)
        } else if (e.key === 'PageDown') {
          e.preventDefault()
          doStep(-step * 10)
        }
      },
      [disabled, editing, doStep, step],
    )

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        {label && (
          <label htmlFor={autoId} className={cn(LABEL_STYLE, 'mb-1')}>
            {label}
          </label>
        )}
        <div
          id={autoId}
          role="spinbutton"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label || 'Number stepper'}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex items-stretch',
            'border-[0.5px] border-[var(--n400)]',
            'rounded-[5px]',
            'h-8',
            'bg-[var(--n50)]',
            FOCUS_RING,
            disabled && 'opacity-50',
          )}
        >
          {/* Decrement button — ghost style, no border, no bg */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrease"
            disabled={disabled || atMin}
            className={cn(
              'flex items-center justify-center shrink-0',
              'rounded-l-[4px]',
              'text-[var(--n600)]',
              'text-[15px]',
              WEIGHT.normal,
              TRANSITION.background,
              'select-none',
              !disabled && !atMin && 'hover:bg-[var(--n200)] hover:text-[var(--n1150)]',
              (disabled || atMin) && 'text-[var(--n400)] pointer-events-none',
            )}
            style={{ width: 28, height: '100%' }}
            onClick={() => !atMin && doStep(-step)}
            onMouseDown={() => !atMin && !disabled && startRepeat(-step)}
            onMouseUp={stopRepeat}
            onMouseLeave={stopRepeat}
          >
            &minus;
          </button>

          {/* Value display / edit */}
          <div
            className="flex-1 flex items-center justify-center min-w-0"
            onClick={startEdit}
          >
            {editing ? (
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={handleEditKeyDown}
                className={cn(
                  FONT.body,
                  WEIGHT.strong,
                  'text-[13px] text-[var(--n1150)] tabular-nums',
                  'w-full h-full text-center bg-transparent outline-none',
                )}
                autoFocus
              />
            ) : (
              <span
                className={cn(
                  FONT.body,
                  WEIGHT.strong,
                  'text-[13px] text-[var(--n1150)] tabular-nums',
                  'select-none',
                )}
              >
                {value}
                {unit && (
                  <span className={cn(WEIGHT.book, 'text-[var(--n800)]')}>
                    {unit}
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Increment button — ghost style, no border, no bg */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Increase"
            disabled={disabled || atMax}
            className={cn(
              'flex items-center justify-center shrink-0',
              'rounded-r-[4px]',
              'text-[var(--n600)]',
              'text-[15px]',
              WEIGHT.normal,
              TRANSITION.background,
              'select-none',
              !disabled && !atMax && 'hover:bg-[var(--n200)] hover:text-[var(--n1150)]',
              (disabled || atMax) && 'text-[var(--n400)] pointer-events-none',
            )}
            style={{ width: 28, height: '100%' }}
            onClick={() => !atMax && doStep(step)}
            onMouseDown={() => !atMax && !disabled && startRepeat(step)}
            onMouseUp={stopRepeat}
            onMouseLeave={stopRepeat}
          >
            +
          </button>
        </div>
      </div>
    )
  },
)

NumberStepper.displayName = 'NumberStepper'
export { NumberStepper }
