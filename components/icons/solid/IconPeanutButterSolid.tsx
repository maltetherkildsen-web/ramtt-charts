// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPeanutButterSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="6" y="8" width="12" height="12" rx="2" fill="currentColor"/><path d="M7 5h10l1 3H6l1-3z" fill="currentColor" opacity="0.6"/><path d="M8 5h8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M19 6l3-4M19 6l2.5-.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconPeanutButterSolid.displayName = 'IconPeanutButterSolid'
