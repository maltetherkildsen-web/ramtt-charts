// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconSpinnerRAMTT = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-spinner { animation: none !important; } }
    `}</style>
    <g className="ramtt-spinner" style={{ animation: 'ramtt-spin 0.8s linear infinite', transformOrigin: '12px 12px' }}>
      <path d="M12 3A9 9 0 0 1 21 12" />
    </g>
  </IconBase>
))
IconSpinnerRAMTT.displayName = 'IconSpinnerRAMTT'
