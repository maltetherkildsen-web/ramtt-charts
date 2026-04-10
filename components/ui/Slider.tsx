// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useId } from 'react'
import { cn, FONT, WEIGHT, FOCUS_RING, SLIDER_TRACK_HEIGHT, SLIDER_THUMB_SIZE } from '@/lib/ui'

export interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label?: string
  unit?: string
  marks?: { value: number; label: string }[]
  disabled?: boolean
  className?: string
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onChange, min, max, step = 1, label, unit, marks, disabled = false, className }, ref) => {
    const id = useId()
    const fillPercent = ((value - min) / (max - min)) * 100

    return (
      <div className={cn('flex flex-col', disabled && 'opacity-50 pointer-events-none', className)}>
        {label && (
          <div className="flex items-baseline justify-between mb-2">
            <label
              htmlFor={id}
              className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n600)]')}
            >
              {label}
            </label>
            <span className="flex items-baseline gap-0.5">
              <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'tabular-nums text-[var(--n1150)]')}>
                {value}
              </span>
              {unit && (
                <span className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                  {unit}
                </span>
              )}
            </span>
          </div>
        )}

        <div className="relative" style={{ height: 32 }}>
          <input
            ref={ref}
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))}
            className={cn(
              'ramtt-slider w-full absolute top-1/2 -translate-y-1/2',
              FOCUS_RING,
            )}
            style={{
              '--fill-percent': `${fillPercent}%`,
              height: SLIDER_TRACK_HEIGHT,
            } as React.CSSProperties}
          />
        </div>

        {marks && marks.length > 0 && (
          <div className="relative mt-1" style={{ height: 16 }}>
            {marks.map((mark) => {
              const pos = ((mark.value - min) / (max - min)) * 100
              return (
                <span
                  key={mark.value}
                  className={cn(
                    FONT.body,
                    'text-[10px]',
                    WEIGHT.normal,
                    'text-[var(--n600)] absolute -translate-x-1/2',
                  )}
                  style={{ left: `${pos}%` }}
                >
                  {mark.label}
                </span>
              )
            })}
          </div>
        )}
      </div>
    )
  },
)

Slider.displayName = 'Slider'
export { Slider }
