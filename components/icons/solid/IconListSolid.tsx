// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconListSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="4.5" cy="6" r="2"/>
    <circle cx="4.5" cy="12" r="2"/>
    <circle cx="4.5" cy="18" r="2"/>
    <rect x="9" y="5" width="12" height="2" rx="1"/>
    <rect x="9" y="11" width="12" height="2" rx="1"/>
    <rect x="9" y="17" width="12" height="2" rx="1"/>
  </IconBaseSolid>
))
IconListSolid.displayName = 'IconListSolid'
