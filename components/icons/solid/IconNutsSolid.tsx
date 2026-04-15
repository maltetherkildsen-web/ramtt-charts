// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconNutsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <ellipse cx="8" cy="12" rx="4.5" ry="5.5" transform="rotate(-15 8 12)"/><ellipse cx="16" cy="11" rx="4" ry="5" transform="rotate(10 16 11)"/>
  </IconBaseSolid>
))
IconNutsSolid.displayName = 'IconNutsSolid'
