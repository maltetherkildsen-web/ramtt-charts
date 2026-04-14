// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCalendarSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6Z"/>
    <rect x="7.25" y="1" width="1.5" height="4" rx=".75"/>
    <rect x="15.25" y="1" width="1.5" height="4" rx=".75"/>
  </IconBaseSolid>
))
IconCalendarSolid.displayName = 'IconCalendarSolid'
