// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSkiingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="14" cy="4" r="2.75"/><path d="M3.34 19.45a.75.75 0 01.94-.48L18.08 6.21a.75.75 0 011.3.7l-3.62 6.7 2.52-1.1a.75.75 0 01.6 1.37l-16 7a.75.75 0 01-.6-1.37l3.84-1.68-3.3-.98a.75.75 0 01-.48-.94zM7.02 15.47l3.46-2.08 2.3 3.06L7.02 15.47z"/>
  </IconBaseSolid>
))
IconSkiingSolid.displayName = 'IconSkiingSolid'
