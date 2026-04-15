// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTendonSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="2" width="7" height="2.5" rx="1"/>
    <rect x="14" y="19.5" width="7" height="2.5" rx="1"/>
    <path d="M4 4.5c2 4 5 8 7 11s5.5 5 8.5 7l-1.5 1c-3-2-6-4-8-7s-5-7-7-11Z"/>
  </IconBaseSolid>
))
IconTendonSolid.displayName = 'IconTendonSolid'
