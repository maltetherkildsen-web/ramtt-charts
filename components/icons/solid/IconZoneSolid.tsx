// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconZoneSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="20" width="18" height="2" rx="1"/>
    <rect x="5" y="16" width="14" height="2" rx="1"/>
    <rect x="7" y="12" width="10" height="2" rx="1"/>
    <rect x="9" y="8" width="6" height="2" rx="1"/>
    <rect x="11" y="4" width="2" height="2" rx="1"/>
  </IconBaseSolid>
))
IconZoneSolid.displayName = 'IconZoneSolid'
