// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBerriesSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="9" cy="12" r="3.5"/><circle cx="15" cy="12" r="3.5"/><circle cx="12" cy="8" r="3.5"/><path d="M12 5V2M10 3h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconBerriesSolid.displayName = 'IconBerriesSolid'
