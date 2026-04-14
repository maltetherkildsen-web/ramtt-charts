// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRowsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="3" width="18" height="7.5" rx="2"/>
    <rect x="3" y="13.5" width="18" height="7.5" rx="2"/>
  </IconBaseSolid>
))
IconRowsSolid.displayName = 'IconRowsSolid'
