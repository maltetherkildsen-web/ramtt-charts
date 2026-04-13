// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconPulseHeart = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-pulse { 0%,100% { transform: scale(1); } 15% { transform: scale(1.12); } 30% { transform: scale(1); } 45% { transform: scale(1.08); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-heart { animation: none !important; } }
    `}</style>
    <g className="ramtt-heart" style={{ animation: 'ramtt-pulse 1s ease infinite', transformOrigin: '12px 12px' }}>
      <path d="M3 12H7L9 12L10 5L12 19L14 8L15 12H21" />
    </g>
  </IconBase>
))
IconPulseHeart.displayName = 'IconPulseHeart'
