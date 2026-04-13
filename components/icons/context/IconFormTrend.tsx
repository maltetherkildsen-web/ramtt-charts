// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, useMemo } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconFormTrendProps extends IconProps {
  values?: number[]
}

function buildSparkline(values: number[]): string {
  if (values.length === 0) return ''
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const xMin = 3
  const xMax = 21
  const yMin = 6  // top padding
  const yMax = 18 // bottom padding

  const points = values.map((v, i) => {
    const x = values.length === 1 ? 12 : xMin + (i / (values.length - 1)) * (xMax - xMin)
    const y = yMax - ((v - min) / range) * (yMax - yMin)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  return `M${points.join(' L')}`
}

// Default ascending path when no data
const DEFAULT_PATH = 'M3 17L7 14L11 15L15 10L19 7L21 6'

export const IconFormTrend = forwardRef<SVGSVGElement, IconFormTrendProps>(
  ({ values, ...props }, ref) => {
    const path = useMemo(
      () => (values && values.length > 0 ? buildSparkline(values) : DEFAULT_PATH),
      [values],
    )

    return (
      <IconBase ref={ref} {...props}>
        <path d={path} fill="none" />
        {/* Area fill under sparkline */}
        {values && values.length > 0 && (
          <path
            d={`${path} L21,18 L3,18 Z`}
            fill="currentColor"
            stroke="none"
            opacity={0.1}
          />
        )}
      </IconBase>
    )
  },
)
IconFormTrend.displayName = 'IconFormTrend'
