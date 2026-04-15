// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSplitTimeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="14" r="7"/>
    <rect x="10" y="2" width="4" height="2" rx="1"/>
    <rect x="11" y="3" width="2" height="4"/>
  </IconBaseSolid>
))
IconSplitTimeSolid.displayName = 'IconSplitTimeSolid'
