// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconNPlus1Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="6" cy="16" r="3.75"/><circle cx="16" cy="16" r="3.75"/><path d="M6 16l3-6h4l2 6M9 10l5 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="4" r="3.5" fill="currentColor" opacity="0.15"/><path d="M18 4h4M20 2v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconNPlus1Solid.displayName = 'IconNPlus1Solid'
