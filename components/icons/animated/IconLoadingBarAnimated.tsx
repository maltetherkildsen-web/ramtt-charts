// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconLoadingBarAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-loadbar { 0% { transform: translateX(-14px); } 100% { transform: translateX(14px); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-loadbar-fill { animation: none !important; transform: translateX(0); } }
    `}</style>
    <rect x="3" y="10" width="18" height="4" rx="2" fill="none" />
    <clipPath id="ramtt-loadbar-clip"><rect x="4" y="10.75" width="16" height="2.5" rx="1.25" /></clipPath>
    <rect className="ramtt-loadbar-fill" x="4" y="10.75" width="8" height="2.5" rx="1.25" fill="currentColor" clipPath="url(#ramtt-loadbar-clip)" style={{ animation: 'ramtt-loadbar 1s ease-in-out infinite alternate' }} />
  </IconBase>
))
IconLoadingBarAnimated.displayName = 'IconLoadingBarAnimated'
