// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconTypingDots = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-typing { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-typing-dot { animation: none !important; } }
    `}</style>
    <circle className="ramtt-typing-dot" cx="6" cy="12" r="2" fill="currentColor" stroke="none" style={{ animation: 'ramtt-typing 1.4s ease infinite' }} />
    <circle className="ramtt-typing-dot" cx="12" cy="12" r="2" fill="currentColor" stroke="none" style={{ animation: 'ramtt-typing 1.4s ease 0.2s infinite' }} />
    <circle className="ramtt-typing-dot" cx="18" cy="12" r="2" fill="currentColor" stroke="none" style={{ animation: 'ramtt-typing 1.4s ease 0.4s infinite' }} />
  </IconBase>
))
IconTypingDots.displayName = 'IconTypingDots'
