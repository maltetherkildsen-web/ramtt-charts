// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconSearchAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-search-zoom { 0% { transform: scale(1); } 40% { transform: scale(1.15); } 100% { transform: scale(1); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-search-glass { animation: none !important; } }
    `}</style>
    <g className="ramtt-search-glass" style={{ animation: 'ramtt-search-zoom 0.6s ease-out', transformOrigin: '10.5px 10.5px' }}>
      <circle cx="10.5" cy="10.5" r="6.5" />
    </g>
    <path d="M15.5 15.5L20 20" />
  </IconBase>
))
IconSearchAnimated.displayName = 'IconSearchAnimated'
