// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUnicornSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M16.53 2.47a.75.75 0 00-1.36.32l-1.71 4.27C13 7.04 12.5 7 12 7h-2c-3.3 0-5.75 2.3-5.75 5.5 0 2.2 1.1 4.3 3.25 5.4v.1h5.5c2.2 0 4.3-1.1 5.4-3.25s1.1-4.3 0-6.5a5.8 5.8 0 00-1.87-2.28z"/><circle cx="10" cy="12" r="1.25" fill="none" stroke="currentColor" strokeWidth="1"/>
  </IconBaseSolid>
))
IconUnicornSolid.displayName = 'IconUnicornSolid'
