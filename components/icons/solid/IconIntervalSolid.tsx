// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconIntervalSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3.5" y="6" width="3" height="14" rx="1.5"/>
    <rect x="7.5" y="16" width="3" height="4" rx="1.5"/>
    <rect x="11.5" y="6" width="3" height="14" rx="1.5"/>
    <rect x="15.5" y="16" width="3" height="4" rx="1.5"/>
    <rect x="19.5" y="4" width="3" height="16" rx="1.5"/>
  </IconBaseSolid>
))
IconIntervalSolid.displayName = 'IconIntervalSolid'
