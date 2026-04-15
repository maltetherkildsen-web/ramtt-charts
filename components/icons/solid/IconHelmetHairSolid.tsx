// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHelmetHairSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="13" r="7.75" fill="currentColor"/><path d="M8 7l1.5 3M11 5.5V9M14 6l-1 3M16 7.5l-1.5 2.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="10" cy="12" r="1" fill="none" stroke="currentColor" strokeWidth="1"/><circle cx="14" cy="12" r="1" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconHelmetHairSolid.displayName = 'IconHelmetHairSolid'
