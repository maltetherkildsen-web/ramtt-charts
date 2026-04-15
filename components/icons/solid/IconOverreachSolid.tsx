// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconOverreachSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 8h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/><path d="M3 18c2-1 4-3 6-6s4-6 6-7 4-1 6 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M14 6l2.5-2.5M17 6l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconOverreachSolid.displayName = 'IconOverreachSolid'
