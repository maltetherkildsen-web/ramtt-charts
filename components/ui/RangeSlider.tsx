// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useCallback, useRef } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  FOCUS_RING,
  SLIDER_TRACK_HEIGHT,
  SLIDER_THUMB_SIZE,
} from '@/lib/ui'

// ─── Types ───

export interface RangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  step?: number
  label?: string
  unit?: string
  marks?: { value: number; label: string }[]
  disabled?: boolean
  className?: string
}

// ─── Helpers ───

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v))
}

function snap(v: number, step: number, min: number): number {
  return Math.round((v - min) / step) * step + min
}

// ─── Component ───

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      min,
      max,
      value,
      onChange,
      step = 1,
      label,
      unit,
      marks,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const draggingRef = useRef<'low' | 'high' | null>(null)

    const range = max - min
    const lowPct = ((value[0] - min) / range) * 100
    const highPct = ((value[1] - min) / range) * 100

    // Convert pointer X to value
    const pointerToValue = useCallback(
      (clientX: number): number => {
        const track = trackRef.current
        if (!track) return min
        const rect = track.getBoundingClientRect()
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1)
        return snap(min + ratio * range, step, min)
      },
      [min, range, step],
    )

    // Start dragging a thumb
    const startDrag = useCallback(
      (thumb: 'low' | 'high') => (e: React.PointerEvent) => {
        if (disabled) return
        e.preventDefault()
        draggingRef.current = thumb
        const el = e.currentTarget as HTMLElement
        el.setPointerCapture(e.pointerId)
      },
      [disabled],
    )

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!draggingRef.current) return
        const v = pointerToValue(e.clientX)
        if (draggingRef.current === 'low') {
          if (v <= value[1]) {
            onChange([v, value[1]])
          } else {
            // Swap
            draggingRef.current = 'high'
            onChange([value[1], v])
          }
        } else {
          if (v >= value[0]) {
            onChange([value[0], v])
          } else {
            // Swap
            draggingRef.current = 'low'
            onChange([v, value[0]])
          }
        }
      },
      [value, onChange, pointerToValue],
    )

    const onPointerUp = useCallback(() => {
      draggingRef.current = null
    }, [])

    // Click on track → move nearest thumb
    const onTrackClick = useCallback(
      (e: React.PointerEvent) => {
        if (disabled || draggingRef.current) return
        const v = pointerToValue(e.clientX)
        const distLow = Math.abs(v - value[0])
        const distHigh = Math.abs(v - value[1])
        if (distLow <= distHigh) {
          onChange([clamp(v, min, value[1]), value[1]])
        } else {
          onChange([value[0], clamp(v, value[0], max)])
        }
      },
      [disabled, value, onChange, pointerToValue, min, max],
    )

    // Keyboard
    const onKeyDown = useCallback(
      (thumb: 'low' | 'high') => (e: React.KeyboardEvent) => {
        let delta = 0
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step
        else return
        e.preventDefault()

        if (thumb === 'low') {
          const next = clamp(value[0] + delta, min, value[1])
          onChange([next, value[1]])
        } else {
          const next = clamp(value[1] + delta, value[0], max)
          onChange([value[0], next])
        }
      },
      [value, onChange, step, min, max],
    )

    const trackBg = `linear-gradient(to right, var(--n200) 0%, var(--n200) ${lowPct}%, var(--n1150) ${lowPct}%, var(--n1150) ${highPct}%, var(--n200) ${highPct}%, var(--n200) 100%)`

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
      >
        {/* Label row */}
        {label && (
          <div className="flex items-baseline justify-between mb-2">
            <span
              className={cn(
                FONT.body,
                'text-[12px]',
                WEIGHT.strong,
                'text-[var(--n600)]',
              )}
            >
              {label}
            </span>
            <span className="flex items-baseline gap-0.5">
              <span
                className={cn(
                  FONT.body,
                  'text-[13px]',
                  WEIGHT.strong,
                  'tabular-nums text-[var(--n1150)]',
                )}
              >
                {value[0]} — {value[1]}
              </span>
              {unit && (
                <span
                  className={cn(
                    FONT.body,
                    'text-[12px]',
                    WEIGHT.book,
                    'text-[var(--n800)]',
                  )}
                >
                  {unit}
                </span>
              )}
            </span>
          </div>
        )}

        {/* Track + thumbs */}
        <div
          className="relative"
          style={{ height: SLIDER_THUMB_SIZE * 2 }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* Track bar */}
          <div
            ref={trackRef}
            className="absolute left-0 right-0"
            style={{
              top: SLIDER_THUMB_SIZE - SLIDER_TRACK_HEIGHT / 2,
              height: SLIDER_TRACK_HEIGHT,
              borderRadius: SLIDER_TRACK_HEIGHT / 2,
              background: trackBg,
            }}
            onPointerDown={onTrackClick}
          />

          {/* Low thumb */}
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={value[0]}
            aria-valuemin={min}
            aria-valuemax={value[1]}
            aria-label="Minimum value"
            className={cn(
              'absolute rounded-full bg-[var(--n1150)] transition-transform duration-100 hover:scale-[1.15]',
              FOCUS_RING,
            )}
            style={{
              width: SLIDER_THUMB_SIZE,
              height: SLIDER_THUMB_SIZE,
              top: SLIDER_THUMB_SIZE - SLIDER_THUMB_SIZE / 2,
              left: `calc(${lowPct}% - ${SLIDER_THUMB_SIZE / 2}px)`,
              border: '2px solid white',
              zIndex: 2,
            }}
            onPointerDown={startDrag('low')}
            onKeyDown={onKeyDown('low')}
          />

          {/* High thumb */}
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={value[1]}
            aria-valuemin={value[0]}
            aria-valuemax={max}
            aria-label="Maximum value"
            className={cn(
              'absolute rounded-full bg-[var(--n1150)] transition-transform duration-100 hover:scale-[1.15]',
              FOCUS_RING,
            )}
            style={{
              width: SLIDER_THUMB_SIZE,
              height: SLIDER_THUMB_SIZE,
              top: SLIDER_THUMB_SIZE - SLIDER_THUMB_SIZE / 2,
              left: `calc(${highPct}% - ${SLIDER_THUMB_SIZE / 2}px)`,
              border: '2px solid white',
              zIndex: 2,
            }}
            onPointerDown={startDrag('high')}
            onKeyDown={onKeyDown('high')}
          />
        </div>

        {/* Marks */}
        {marks && marks.length > 0 && (
          <div className="relative mt-1" style={{ height: 16 }}>
            {marks.map((mark) => {
              const pos = ((mark.value - min) / range) * 100
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

RangeSlider.displayName = 'RangeSlider'
export { RangeSlider }
