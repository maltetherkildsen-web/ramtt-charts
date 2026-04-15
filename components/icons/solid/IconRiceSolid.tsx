// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRiceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z" fill="currentColor"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M15 3l-3 9M17 3l-3 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconRiceSolid.displayName = 'IconRiceSolid'
