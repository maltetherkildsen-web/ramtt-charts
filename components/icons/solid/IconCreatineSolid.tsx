// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCreatineSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="6" y="9" width="12" height="12" rx="2"/>
    <rect x="7" y="6" width="10" height="3" rx="1"/>
    <circle cx="12" cy="3.5" r="1"/>
  </IconBaseSolid>
))
IconCreatineSolid.displayName = 'IconCreatineSolid'
