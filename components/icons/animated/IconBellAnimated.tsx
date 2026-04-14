// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconBellAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-bell-ring { 0% { transform: rotate(0); } 10% { transform: rotate(14deg); } 20% { transform: rotate(-12deg); } 30% { transform: rotate(8deg); } 40% { transform: rotate(-5deg); } 50% { transform: rotate(2deg); } 60% { transform: rotate(0); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-bell-body { animation: none !important; } }
    `}</style>
    <g className="ramtt-bell-body" style={{ animation: 'ramtt-bell-ring 1s ease-out', transformOrigin: '12px 3px' }}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    </g>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </IconBase>
))
IconBellAnimated.displayName = 'IconBellAnimated'
