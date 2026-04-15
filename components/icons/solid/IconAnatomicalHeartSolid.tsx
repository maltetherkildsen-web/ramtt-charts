// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAnatomicalHeartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 20c-4-4-8-7-8-11 0-3 2-5 4.5-5S12 6 12 6s1.5-2 3.5-2S20 6 20 9c0 4-4 7-8 11Z"/>
    <rect x="11" y="6" width="2" height="8" rx="1"/>
    <path d="M14.5 1.5c2 0 3.5.5 5 2l-1 1c-1.5-1-3-1.5-4-1V1.5Z"/>
    <path d="M9.5 1.5c-2 0-3.5.5-5 2l1 1c1.5-1 3-1.5 4-1V1.5Z"/>
  </IconBaseSolid>
))
IconAnatomicalHeartSolid.displayName = 'IconAnatomicalHeartSolid'
