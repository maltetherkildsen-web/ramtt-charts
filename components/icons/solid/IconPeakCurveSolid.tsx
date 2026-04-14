// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPeakCurveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 18s1-14 3-14 3 8 5 10 4 3 7 3.5l3 .5v2H3Z"/>
  </IconBaseSolid>
))
IconPeakCurveSolid.displayName = 'IconPeakCurveSolid'
