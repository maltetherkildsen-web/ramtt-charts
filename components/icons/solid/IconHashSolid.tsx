// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHashSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="9" y="2.5" width="2" height="19" rx="1" transform="rotate(10 10 12)"/>
    <rect x="14" y="2.5" width="2" height="19" rx="1" transform="rotate(10 15 12)"/>
    <rect x="3" y="8" width="18" height="2" rx="1"/>
    <rect x="3" y="14" width="18" height="2" rx="1"/>
  </IconBaseSolid>
))
IconHashSolid.displayName = 'IconHashSolid'
