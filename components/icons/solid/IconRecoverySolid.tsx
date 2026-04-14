// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRecoverySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M16 3s-2 3-2 6a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4c0-2.5 1.5-5 2-6h-2Z"/>
    <path d="M12 3s2 3 2 6h-2c0-2.5-1-4.5-2-6h2Z"/>
    <rect x="16.5" y="6.4" width="2" height="3.5" rx="1" transform="rotate(-45 17.5 8.15)"/>
    <rect x="14.5" y="4.4" width="2" height="3.5" rx="1" transform="rotate(-45 15.5 6.15)"/>
  </IconBaseSolid>
))
IconRecoverySolid.displayName = 'IconRecoverySolid'
