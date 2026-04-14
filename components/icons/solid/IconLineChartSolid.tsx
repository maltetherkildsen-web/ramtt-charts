// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLineChartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="3" width="1.5" height="18" rx=".75"/>
    <rect x="3" y="19.5" width="18" height="1.5" rx=".75"/>
    <path d="M6 16l4-6 4 4 6-8v12H6Z"/>
  </IconBaseSolid>
))
IconLineChartSolid.displayName = 'IconLineChartSolid'
