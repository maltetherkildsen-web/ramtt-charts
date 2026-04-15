// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useMemo, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

// ─── Types ───

export interface TimelineMarker {
  position: number
  label: string
  color: string
  span?: number
  icon?: ReactNode
}

export interface TimelineZone {
  start: number
  end: number
  color: string
  label?: string
}

export interface TimelineStripProps {
  startLabel?: string
  endLabel?: string
  duration: number
  unit?: string
  markers: TimelineMarker[]
  zones?: TimelineZone[]
  height?: number
  className?: string
}

// ─── Tick interval helper ───

function tickInterval(duration: number): number {
  if (duration <= 10) return 1
  if (duration <= 60) return 10
  if (duration <= 180) return 30
  if (duration <= 600) return 60
  return Math.ceil(duration / 10 / 60) * 60
}

// ─── Stagger labels: alternate above/below when markers are close ───

function staggerLabels(markers: TimelineMarker[], duration: number): ('above' | 'below')[] {
  const positions = markers
    .filter((m) => m.span === undefined)
    .map((m) => (m.position / duration) * 100)

  const result: ('above' | 'below')[] = []
  let lastPos = -Infinity
  let lastSide: 'above' | 'below' = 'above'

  for (let i = 0; i < positions.length; i++) {
    if (positions[i] - lastPos < 8) {
      // Too close — alternate
      const side: 'above' | 'below' = lastSide === 'below' ? 'above' : 'below'
      result.push(side)
      lastSide = side
    } else {
      result.push('below')
      lastSide = 'below'
    }
    lastPos = positions[i]
  }
  return result
}

// ─── Component ───

const TimelineStrip = forwardRef<HTMLDivElement, TimelineStripProps>(
  (
    {
      startLabel,
      endLabel,
      duration,
      markers,
      zones,
      height = 48,
      className,
    },
    ref,
  ) => {
    const ticks = useMemo(() => {
      const interval = tickInterval(duration)
      const result: number[] = []
      for (let t = interval; t < duration; t += interval) {
        result.push(t)
      }
      return result
    }, [duration])

    const pointMarkers = markers.filter((m) => m.span === undefined)
    const blockMarkers = markers.filter((m) => m.span !== undefined)
    const labelSides = useMemo(
      () => staggerLabels(pointMarkers, duration),
      [pointMarkers, duration],
    )

    const trackY = height / 2

    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        style={{ height: height + 24 }}
      >
        {/* Zones (background) */}
        {zones?.map((zone, i) => {
          const left = (zone.start / duration) * 100
          const width = ((zone.end - zone.start) / duration) * 100
          return (
            <div
              key={i}
              className="absolute top-0 flex items-center justify-center"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                height,
                backgroundColor: zone.color,
                borderRadius: 2,
              }}
            >
              {zone.label && (
                <span
                  className={cn(
                    FONT.body,
                    'text-[10px]',
                    WEIGHT.normal,
                    'text-[var(--n800)]',
                  )}
                >
                  {zone.label}
                </span>
              )}
            </div>
          )
        })}

        {/* Track */}
        <div
          className="absolute left-0 right-0 bg-[var(--n200)]"
          style={{
            top: trackY - 2,
            height: 4,
            borderRadius: 2,
          }}
        />

        {/* Ticks */}
        {ticks.map((t) => (
          <div
            key={t}
            className="absolute bg-[var(--n400)]"
            style={{
              left: `${(t / duration) * 100}%`,
              top: trackY - 3,
              width: 0.5,
              height: 6,
            }}
          />
        ))}

        {/* Block markers */}
        {blockMarkers.map((marker, i) => {
          const left = (marker.position / duration) * 100
          const width = ((marker.span! / duration) * 100)
          return (
            <div
              key={`block-${i}`}
              className="absolute"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                top: trackY - 4,
                height: 8,
                backgroundColor: marker.color,
                borderRadius: 2,
              }}
            />
          )
        })}

        {/* Point markers */}
        {pointMarkers.map((marker, i) => {
          const leftPct = (marker.position / duration) * 100
          const side = labelSides[i]

          return (
            <div
              key={`point-${i}`}
              className={cn('absolute group', TRANSITION.transform)}
              style={{
                left: `${leftPct}%`,
                top: trackY - 4,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Dot */}
              <div
                className="w-2 h-2 rounded-full transition-transform duration-100 group-hover:scale-[1.2]"
                style={{ backgroundColor: marker.color }}
              />
              {/* Label */}
              <span
                className={cn(
                  FONT.body,
                  'text-[10px]',
                  WEIGHT.book,
                  'text-[var(--n800)] absolute left-1/2 -translate-x-1/2 whitespace-nowrap',
                )}
                style={{
                  top: side === 'below' ? 12 : undefined,
                  bottom: side === 'above' ? 12 : undefined,
                }}
              >
                {marker.icon ?? null}
                {marker.label}
              </span>
            </div>
          )
        })}

        {/* Start / end labels */}
        {startLabel && (
          <span
            className={cn(
              FONT.body,
              'text-[11px]',
              WEIGHT.book,
              'text-[var(--n600)] absolute left-0',
            )}
            style={{ top: height + 4 }}
          >
            {startLabel}
          </span>
        )}
        {endLabel && (
          <span
            className={cn(
              FONT.body,
              'text-[11px]',
              WEIGHT.book,
              'text-[var(--n600)] absolute right-0',
            )}
            style={{ top: height + 4 }}
          >
            {endLabel}
          </span>
        )}
      </div>
    )
  },
)

TimelineStrip.displayName = 'TimelineStrip'
export { TimelineStrip }
