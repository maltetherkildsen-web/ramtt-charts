// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAeroDragSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8zm0 0c0 4 4 8 8 8 0-4-2-8-8-8z" fill="currentColor"/><path d="M2 9h4M2 12h5M2 15h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconAeroDragSolid.displayName = 'IconAeroDragSolid'
