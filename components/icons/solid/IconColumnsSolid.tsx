// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconColumnsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="3" width="7.5" height="18" rx="2"/>
    <rect x="13.5" y="3" width="7.5" height="18" rx="2"/>
  </IconBaseSolid>
))
IconColumnsSolid.displayName = 'IconColumnsSolid'
