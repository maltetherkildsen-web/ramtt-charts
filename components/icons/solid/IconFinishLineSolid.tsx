// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFinishLineSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="4" y="3" width="2" height="18" rx=".5"/>
    <rect x="18" y="3" width="2" height="18" rx=".5"/>
    <rect x="5" y="6" width="14" height="5"/>
  </IconBaseSolid>
))
IconFinishLineSolid.displayName = 'IconFinishLineSolid'
