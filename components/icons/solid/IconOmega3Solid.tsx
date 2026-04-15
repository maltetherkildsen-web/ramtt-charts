// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconOmega3Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <ellipse cx="12" cy="14" rx="7" ry="4.5"/>
    <path d="M12 2l2 3a2.2 2.2 0 0 1-4 0Z"/>
  </IconBaseSolid>
))
IconOmega3Solid.displayName = 'IconOmega3Solid'
