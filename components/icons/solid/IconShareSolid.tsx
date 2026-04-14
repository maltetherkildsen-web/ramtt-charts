// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShareSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <rect x="7.5" y="10.75" width="9" height="1.5" rx=".75" transform="rotate(-30 12 11.5)"/>
    <rect x="7.5" y="16.75" width="9" height="1.5" rx=".75" transform="rotate(30 12 17.5)"/>
  </IconBaseSolid>
))
IconShareSolid.displayName = 'IconShareSolid'
