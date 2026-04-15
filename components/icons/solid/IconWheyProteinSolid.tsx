// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWheyProteinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="5" y="9" width="14" height="12" rx="2"/>
    <path d="M6 5h12v4H6V5Z"/>
    <path d="M10 2.5a2 2 0 0 1 4 0H10Z"/>
  </IconBaseSolid>
))
IconWheyProteinSolid.displayName = 'IconWheyProteinSolid'
