// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPullUpBarSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="2" y="9" width="20" height="2" rx="1"/>
    <rect x="4" y="3" width="2" height="8" rx="1"/>
    <rect x="18" y="3" width="2" height="8" rx="1"/>
  </IconBaseSolid>
))
IconPullUpBarSolid.displayName = 'IconPullUpBarSolid'
