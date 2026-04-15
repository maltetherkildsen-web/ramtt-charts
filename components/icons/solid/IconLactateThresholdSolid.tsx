// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLactateThresholdSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 20C6 18 9 12 12 8c2-3 4-3 6-2V6H3Z"/>
    <rect x="3" y="5" width="18" height="2" rx="1"/>
    <circle cx="12" cy="8" r="2"/>
  </IconBaseSolid>
))
IconLactateThresholdSolid.displayName = 'IconLactateThresholdSolid'
