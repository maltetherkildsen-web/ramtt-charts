// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconIntervalSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="4" y="8" width="3.5" height="13" rx="1"/>
    <rect x="9.25" y="14" width="3.5" height="7" rx="1"/>
    <rect x="14.5" y="6" width="3.5" height="15" rx="1"/>
    <rect x="19.75" y="12" width="3.5" height="9" rx="1"/>
  </IconBaseSolid>
))
IconIntervalSolid.displayName = 'IconIntervalSolid'
