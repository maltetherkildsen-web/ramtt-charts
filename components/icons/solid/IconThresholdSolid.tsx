// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconThresholdSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="13" width="18" height="2" rx="1"/>
    <rect x="11" y="6" width="2" height="16" rx="1"/>
    <path d="M8 10l4-4 4 4H8Z"/>
  </IconBaseSolid>
))
IconThresholdSolid.displayName = 'IconThresholdSolid'
