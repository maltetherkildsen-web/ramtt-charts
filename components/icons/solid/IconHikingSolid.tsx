// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHikingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M16.55 4.17a.75.75 0 00-1.37-.05L11.3 13.5l-3.37-2.53a.75.75 0 00-1.13.24l-5 8A.75.75 0 002.43 20.5h19.14a.75.75 0 00.68-1.06L16.55 4.17z"/>
  </IconBaseSolid>
))
IconHikingSolid.displayName = 'IconHikingSolid'
