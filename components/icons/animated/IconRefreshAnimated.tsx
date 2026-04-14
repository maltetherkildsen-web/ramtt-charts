// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconRefreshAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-refresh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-refresh-body { animation: none !important; } }
    `}</style>
    <g className="ramtt-refresh-body" style={{ animation: 'ramtt-refresh-spin 1s linear infinite', transformOrigin: '12px 12px' }}>
      <path d="M21 2v6h-6" />
      <path d="M3 22v-6h6" />
      <path d="M21 8a9 9 0 0 0-15-5l-3 3" />
      <path d="M3 16a9 9 0 0 0 15 5l3-3" />
    </g>
  </IconBase>
))
IconRefreshAnimated.displayName = 'IconRefreshAnimated'
