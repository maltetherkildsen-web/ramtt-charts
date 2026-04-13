// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPeakCurveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M3 18C3 18 4 4 6 4C8 4 9 12 11 14C13 16 15 17 18 17.5C20 17.8 21 18 21 18" />
    </IconBaseSolid>
))
IconPeakCurveSolid.displayName = 'IconPeakCurveSolid'
