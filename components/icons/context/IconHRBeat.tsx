// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconHRBeatProps extends IconProps {
  bpm?: number
}

export const IconHRBeat = forwardRef<SVGSVGElement, IconHRBeatProps>(
  ({ bpm, ...props }, ref) => {
    // Clamp animation speed: 30-240 bpm => 2s to 0.25s
    const duration = bpm != null
      ? 60 / Math.max(30, Math.min(240, bpm))
      : undefined

    return (
      <IconBase ref={ref} {...props}>
        <g
          className={bpm != null ? 'ramtt-heartbeat' : undefined}
          style={duration != null ? { '--beat-duration': `${duration}s` } as React.CSSProperties : undefined}
        >
          {/* ECG trace — same as IconHeartRate Line */}
          <path d="M3 12H7L9 12L10 5L12 19L14 8L15 12H21" />
        </g>
      </IconBase>
    )
  },
)
IconHRBeat.displayName = 'IconHRBeat'
