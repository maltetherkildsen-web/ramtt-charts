// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBarChartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="4.5" y="14" width="3" height="7" rx="1"/>
    <rect x="10.5" y="4" width="3" height="17" rx="1"/>
    <rect x="16.5" y="10" width="3" height="11" rx="1"/>
  </IconBaseSolid>
))
IconBarChartSolid.displayName = 'IconBarChartSolid'
