// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconSuccessAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-success-circle { from { stroke-dashoffset: 56.5; } to { stroke-dashoffset: 0; } }
      @keyframes ramtt-success-check { from { stroke-dashoffset: 14; } to { stroke-dashoffset: 0; } }
      @media (prefers-reduced-motion: reduce) { .ramtt-success-circle, .ramtt-success-check { animation: none !important; stroke-dashoffset: 0; } }
    `}</style>
    <circle className="ramtt-success-circle" cx="12" cy="12" r="9" strokeDasharray={56.5} strokeDashoffset={56.5} style={{ animation: 'ramtt-success-circle 0.5s ease-out forwards' }} />
    <path className="ramtt-success-check" d="M8 12l3 3 5-5" strokeDasharray={14} strokeDashoffset={14} style={{ animation: 'ramtt-success-check 0.3s ease-out 0.4s forwards' }} />
  </IconBase>
))
IconSuccessAnimated.displayName = 'IconSuccessAnimated'
