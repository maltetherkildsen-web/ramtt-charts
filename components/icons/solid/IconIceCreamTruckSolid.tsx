// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconIceCreamTruckSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="7" r="4.75" fill="currentColor"/><path d="M8 11l4 11 4-11" fill="currentColor" opacity="0.6"/><path d="M8.5 8c-.5 1.5-1.5 2-3 2M15.5 8c.5 1.5 1.5 2 3 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconIceCreamTruckSolid.displayName = 'IconIceCreamTruckSolid'
