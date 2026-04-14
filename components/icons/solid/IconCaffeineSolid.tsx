// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCaffeineSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 8h12v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/>
    <path d="M16 11a3 3 0 0 1 0 5v-5Z"/>
    <circle cx="8.5" cy="4" r="1"/>
    <circle cx="11.5" cy="4" r="1"/>
  </IconBaseSolid>
))
IconCaffeineSolid.displayName = 'IconCaffeineSolid'
