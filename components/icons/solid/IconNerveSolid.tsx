// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconNerveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="7" cy="12" r="3.5"/>
    <rect x="10" y="11" width="8" height="2" rx="1"/>
    <circle cx="19.5" cy="9.5" r="1.5"/>
    <circle cx="20" cy="12" r="1.5"/>
    <circle cx="19.5" cy="14.5" r="1.5"/>
  </IconBaseSolid>
))
IconNerveSolid.displayName = 'IconNerveSolid'
