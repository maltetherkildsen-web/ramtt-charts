// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFilterSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="4" y="6" width="16" height="2" rx="1"/>
    <rect x="7" y="11" width="10" height="2" rx="1"/>
    <rect x="10" y="16" width="4" height="2" rx="1"/>
  </IconBaseSolid>
))
IconFilterSolid.displayName = 'IconFilterSolid'
