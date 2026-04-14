// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconWeatherConditionProps extends IconProps {
  condition?: 'sun' | 'cloud' | 'rain' | 'snow' | 'storm'
}

const TRANSITION = 'opacity 300ms var(--ease-out-expo), transform 300ms var(--ease-out-expo)'

function Layer({
  visible,
  children,
}: {
  visible: boolean
  children: React.ReactNode
}) {
  return (
    <g
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        transformOrigin: 'center',
        transition: TRANSITION,
      }}
    >
      {children}
    </g>
  )
}

export const IconWeatherCondition = forwardRef<SVGSVGElement, IconWeatherConditionProps>(
  ({ condition = 'sun', ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      {/* Sun */}
      <Layer visible={condition === 'sun'}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3V5" />
        <path d="M12 19V21" />
        <path d="M5.64 5.64L7.05 7.05" />
        <path d="M16.95 16.95L18.36 18.36" />
        <path d="M3 12H5" />
        <path d="M19 12H21" />
        <path d="M5.64 18.36L7.05 16.95" />
        <path d="M16.95 7.05L18.36 5.64" />
      </Layer>

      {/* Cloud */}
      <Layer visible={condition === 'cloud'}>
        <path d="M17 10C17 7.24 14.76 5 12 5C9.72 5 7.82 6.53 7.24 8.6C5.38 8.94 4 10.58 4 12.5C4 14.71 5.79 16.5 8 16.5H17C19.21 16.5 21 14.71 21 12.5C21 10.53 19.59 8.88 17.72 8.56" />
      </Layer>

      {/* Rain */}
      <Layer visible={condition === 'rain'}>
        <path d="M17 8C17 5.24 14.76 3 12 3C9.72 3 7.82 4.53 7.24 6.6C5.38 6.94 4 8.58 4 10.5C4 12.71 5.79 14.5 8 14.5H17C19.21 14.5 21 12.71 21 10.5C21 8.53 19.59 6.88 17.72 6.56" />
        <path d="M8 17V19" />
        <path d="M12 17V21" />
        <path d="M16 17V19" />
      </Layer>

      {/* Snow */}
      <Layer visible={condition === 'snow'}>
        <path d="M17 8C17 5.24 14.76 3 12 3C9.72 3 7.82 4.53 7.24 6.6C5.38 6.94 4 8.58 4 10.5C4 12.71 5.79 14.5 8 14.5H17C19.21 14.5 21 12.71 21 10.5C21 8.53 19.59 6.88 17.72 6.56" />
        <circle cx="8" cy="18" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="12" cy="17" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="16" cy="19" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="10" cy="20" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="14" cy="21" r="0.75" fill="currentColor" stroke="none" />
      </Layer>

      {/* Storm */}
      <Layer visible={condition === 'storm'}>
        <path d="M17 8C17 5.24 14.76 3 12 3C9.72 3 7.82 4.53 7.24 6.6C5.38 6.94 4 8.58 4 10.5C4 12.71 5.79 14.5 8 14.5H17C19.21 14.5 21 12.71 21 10.5C21 8.53 19.59 6.88 17.72 6.56" />
        <path d="M13 14.5L10 18.5H14L11 22.5" />
      </Layer>
    </IconBase>
  ),
)
IconWeatherCondition.displayName = 'IconWeatherCondition'
