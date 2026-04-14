// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRefreshSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M21 2v6h-6l2.29-2.29A8 8 0 0 0 4.34 8.67l-1.42-.93A9.5 9.5 0 0 1 18.7 4.3L21 2Z"/>
    <path d="M3 22v-6h6l-2.29 2.29A8 8 0 0 0 19.66 15.33l1.42.93A9.5 9.5 0 0 1 5.3 19.7L3 22Z"/>
  </IconBaseSolid>
))
IconRefreshSolid.displayName = 'IconRefreshSolid'
