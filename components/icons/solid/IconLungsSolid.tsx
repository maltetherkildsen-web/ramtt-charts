// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLungsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="11" y="4" width="2" height="7" rx="1"/>
    <path d="M12 10C8 10 4 13 4 17c0 2 1 3 3 3s3-2 3-4v-6h2Z"/>
    <path d="M12 10c4 0 8 3 8 7 0 2-1 3-3 3s-3-2-3-4v-6h-2Z"/>
  </IconBaseSolid>
))
IconLungsSolid.displayName = 'IconLungsSolid'
