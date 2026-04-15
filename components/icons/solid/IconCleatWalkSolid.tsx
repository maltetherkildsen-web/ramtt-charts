// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCleatWalkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="4" r="2.75"/><path d="M12 7v4M8 9l4 2 4-2M10 11l-1 5 2 1M14 11l1 5-2 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 17l-2 3.5M15 17l2 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M5.5 19.5l3 2M15.5 19.5l3 2" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconCleatWalkSolid.displayName = 'IconCleatWalkSolid'
