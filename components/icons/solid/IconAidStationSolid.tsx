// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAidStationSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 8h8l-1 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L3 8Z"/>
    <rect x="16" y="3" width="2" height="18" rx=".5"/>
    <path d="M17 4h4v4h-4V4Z"/>
  </IconBaseSolid>
))
IconAidStationSolid.displayName = 'IconAidStationSolid'
