// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPeakCurveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 20l3-16 3 6 3 3 3 2 3 1 3 1v3H3Z"/>
  </IconBaseSolid>
))
IconPeakCurveSolid.displayName = 'IconPeakCurveSolid'
