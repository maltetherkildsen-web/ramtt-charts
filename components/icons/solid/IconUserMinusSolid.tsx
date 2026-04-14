// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUserMinusSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="10" cy="8" r="4.5"/>
    <path d="M18 21a8 8 0 1 0-16 0h16Z"/>
    <rect x="16.5" y="10" width="7" height="2" rx="1"/>
  </IconBaseSolid>
))
IconUserMinusSolid.displayName = 'IconUserMinusSolid'
