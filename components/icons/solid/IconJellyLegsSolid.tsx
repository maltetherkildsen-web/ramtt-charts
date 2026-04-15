// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconJellyLegsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="4" r="2.75"/><path d="M10 7h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M12 7v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M9 11c0 2 1 3 0 5s-1 3 0 5M15 11c0 2-1 3 0 5s1 3 0 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M7 21h4M13 21h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconJellyLegsSolid.displayName = 'IconJellyLegsSolid'
