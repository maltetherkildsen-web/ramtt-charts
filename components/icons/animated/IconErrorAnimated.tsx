// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconErrorAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-error-circle { from { stroke-dashoffset: 56.5; } to { stroke-dashoffset: 0; } }
      @keyframes ramtt-error-x { from { stroke-dashoffset: 17; } to { stroke-dashoffset: 0; } }
      @keyframes ramtt-error-shake { 0% { transform: translateX(0); } 20% { transform: translateX(-2px); } 40% { transform: translateX(2px); } 60% { transform: translateX(-1px); } 80% { transform: translateX(1px); } 100% { transform: translateX(0); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-error-circle, .ramtt-error-x { animation: none !important; stroke-dashoffset: 0; } .ramtt-error-shake { animation: none !important; } }
    `}</style>
    <g className="ramtt-error-shake" style={{ animation: 'ramtt-error-shake 0.4s ease-out 0.6s' }}>
      <circle className="ramtt-error-circle" cx="12" cy="12" r="9" strokeDasharray={56.5} strokeDashoffset={56.5} style={{ animation: 'ramtt-error-circle 0.5s ease-out forwards' }} />
      <path className="ramtt-error-x" d="M15 9l-6 6" strokeDasharray={8.5} strokeDashoffset={8.5} style={{ animation: 'ramtt-error-x 0.2s ease-out 0.4s forwards' }} />
      <path className="ramtt-error-x" d="M9 9l6 6" strokeDasharray={8.5} strokeDashoffset={8.5} style={{ animation: 'ramtt-error-x 0.2s ease-out 0.5s forwards' }} />
    </g>
  </IconBase>
))
IconErrorAnimated.displayName = 'IconErrorAnimated'
