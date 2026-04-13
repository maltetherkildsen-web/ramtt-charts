// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconLoadingDots = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-dot-bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.5); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-dot { animation: none !important; } }
    `}</style>
    <circle className="ramtt-dot" cx="6" cy="12" r="2" fill="currentColor" stroke="none" style={{ animation: 'ramtt-dot-bounce 1.2s ease infinite' }} />
    <circle className="ramtt-dot" cx="12" cy="12" r="2" fill="currentColor" stroke="none" style={{ animation: 'ramtt-dot-bounce 1.2s ease 0.2s infinite' }} />
    <circle className="ramtt-dot" cx="18" cy="12" r="2" fill="currentColor" stroke="none" style={{ animation: 'ramtt-dot-bounce 1.2s ease 0.4s infinite' }} />
  </IconBase>
))
IconLoadingDots.displayName = 'IconLoadingDots'
