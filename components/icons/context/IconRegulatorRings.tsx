// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconRegulatorRingsProps extends IconProps {
  metabolic?: number  // 0-100
  neural?: number     // 0-100
  peripheral?: number // 0-100
}

const CX = 12
const CY = 12
const RINGS = [
  { r: 10, prop: 'metabolic' as const },
  { r: 7, prop: 'neural' as const },
  { r: 4, prop: 'peripheral' as const },
]
const SWEEP_DEG = 270
const START_DEG = 135

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(r: number): string {
  const start = polarToCartesian(CX, CY, r, START_DEG + SWEEP_DEG)
  const end = polarToCartesian(CX, CY, r, START_DEG)
  return `M ${start.x} ${start.y} A ${r} ${r} 0 1 0 ${end.x} ${end.y}`
}

function arcLength(r: number): number {
  return 2 * Math.PI * r * (SWEEP_DEG / 360)
}

export const IconRegulatorRings = forwardRef<SVGSVGElement, IconRegulatorRingsProps>(
  ({ metabolic, neural, peripheral, ...props }, ref) => {
    const values = { metabolic, neural, peripheral }
    const hasValues = metabolic != null || neural != null || peripheral != null

    return (
      <IconBase ref={ref} {...props}>
        {RINGS.map(({ r, prop }) => {
          const d = describeArc(r)
          const len = arcLength(r)
          const val = values[prop]
          const clamped = val != null ? Math.max(0, Math.min(100, val)) : 0
          const offset = len * (1 - clamped / 100)

          return (
            <g key={prop}>
              {/* Track */}
              <path
                d={d}
                fill="none"
                stroke="var(--n200)"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              {/* Value arc */}
              {hasValues && (
                <path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray={len}
                  strokeDashoffset={offset}
                  style={{ transition: 'stroke-dashoffset 400ms var(--ease-out-expo)' }}
                />
              )}
            </g>
          )
        })}
      </IconBase>
    )
  },
)
IconRegulatorRings.displayName = 'IconRegulatorRings'
