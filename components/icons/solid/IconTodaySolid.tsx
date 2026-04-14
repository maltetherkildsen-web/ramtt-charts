// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTodaySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="9" r="4"/>
    <rect x="4" y="16.25" width="16" height="1.5" rx=".75"/>
    <circle cx="12" cy="3.25" r="1"/>
    <circle cx="18.25" cy="9" r="1"/>
    <circle cx="5.75" cy="9" r="1"/>
    <circle cx="16.25" cy="5" r="1"/>
    <circle cx="7.75" cy="5" r="1"/>
  </IconBaseSolid>
))
IconTodaySolid.displayName = 'IconTodaySolid'
