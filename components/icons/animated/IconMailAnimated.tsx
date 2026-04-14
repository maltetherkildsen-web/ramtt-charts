// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconMailAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-mail-open { 0% { transform: scaleY(1); } 30% { transform: scaleY(0.6); } 60% { transform: scaleY(1.05); } 100% { transform: scaleY(1); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-mail-flap { animation: none !important; } }
    `}</style>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path className="ramtt-mail-flap" d="M3 7l9 6 9-6" style={{ animation: 'ramtt-mail-open 0.8s ease-out', transformOrigin: '12px 5px' }} />
  </IconBase>
))
IconMailAnimated.displayName = 'IconMailAnimated'
