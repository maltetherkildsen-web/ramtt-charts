// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWaterBottleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M8.25 2a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v2.25H17a.75.75 0 01.72.53l1 3a.75.75 0 01.03.22V19a2.75 2.75 0 01-2.75 2.75H8A2.75 2.75 0 015.25 19V7.75a.75.75 0 01.03-.22l1-3a.75.75 0 01.72-.53h1.25V2zm.75 4.75V3h6v1.5h-6z"/>
  </IconBaseSolid>
))
IconWaterBottleSolid.displayName = 'IconWaterBottleSolid'
