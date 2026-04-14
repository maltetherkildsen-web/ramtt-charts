// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconStarAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-star-pop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } 70% { transform: scale(0.95); } 100% { transform: scale(1); opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .ramtt-star-body { animation: none !important; transform: scale(1); opacity: 1; } }
    `}</style>
    <path className="ramtt-star-body" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" fill="currentColor" style={{ animation: 'ramtt-star-pop 0.5s ease-out forwards', transformOrigin: '12px 12px' }} />
  </IconBase>
))
IconStarAnimated.displayName = 'IconStarAnimated'
