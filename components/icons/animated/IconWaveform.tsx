// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconWaveform = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-wave { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-bar { animation: none !important; transform: scaleY(0.7); } }
    `}</style>
    <line className="ramtt-bar" x1="4" y1="6" x2="4" y2="18" style={{ animation: 'ramtt-wave 1.2s ease infinite', transformOrigin: '4px 12px' }} />
    <line className="ramtt-bar" x1="8" y1="4" x2="8" y2="20" style={{ animation: 'ramtt-wave 1.2s ease 0.15s infinite', transformOrigin: '8px 12px' }} />
    <line className="ramtt-bar" x1="12" y1="7" x2="12" y2="17" style={{ animation: 'ramtt-wave 1.2s ease 0.3s infinite', transformOrigin: '12px 12px' }} />
    <line className="ramtt-bar" x1="16" y1="3" x2="16" y2="21" style={{ animation: 'ramtt-wave 1.2s ease 0.45s infinite', transformOrigin: '16px 12px' }} />
    <line className="ramtt-bar" x1="20" y1="8" x2="20" y2="16" style={{ animation: 'ramtt-wave 1.2s ease 0.6s infinite', transformOrigin: '20px 12px' }} />
  </IconBase>
))
IconWaveform.displayName = 'IconWaveform'
