// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconCheckAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-check-draw { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
      @media (prefers-reduced-motion: reduce) { .ramtt-check-path { animation: none !important; stroke-dashoffset: 0; } }
    `}</style>
    <path
      className="ramtt-check-path"
      d="M5 12L10 17L19 7"
      strokeDasharray={24}
      strokeDashoffset={24}
      style={{ animation: 'ramtt-check-draw 0.4s ease-out forwards' }}
    />
  </IconBase>
))
IconCheckAnimated.displayName = 'IconCheckAnimated'
