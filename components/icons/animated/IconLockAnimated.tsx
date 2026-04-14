// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconLockAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-lock-drop { 0% { transform: translateY(-4px) rotate(-5deg); } 40% { transform: translateY(0) rotate(0); } 55% { transform: translateY(-1px); } 70% { transform: translateY(0); } 100% { transform: translateY(0); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-lock-shackle { animation: none !important; } }
    `}</style>
    <rect x="5" y="11" width="14" height="11" rx="2" />
    <path className="ramtt-lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4" style={{ animation: 'ramtt-lock-drop 0.6s ease-out', transformOrigin: '12px 11px' }} />
  </IconBase>
))
IconLockAnimated.displayName = 'IconLockAnimated'
