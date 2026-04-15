// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWaterBottleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M9 8h6a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1Z"/>
    <rect x="10" y="5" width="4" height="3" rx="1"/>
    <rect x="11" y="2" width="2" height="3.5" rx="1"/>
  </IconBaseSolid>
))
IconWaterBottleSolid.displayName = 'IconWaterBottleSolid'
