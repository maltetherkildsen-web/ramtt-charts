// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWhistleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M3 4.25A1.75 1.75 0 001.25 6v10c0 .97.78 1.75 1.75 1.75h6l2 3h7a3.75 3.75 0 000-7.5H11.5l-2-3H3zm12 5a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z"/>
  </IconBaseSolid>
))
IconWhistleSolid.displayName = 'IconWhistleSolid'
