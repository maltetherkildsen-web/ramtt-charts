// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHydrationSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M7 10c0-1 .5-2 2-2h6c1.5 0 2 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10Z"/>
    <rect x="10" y="5" width="4" height="3" rx="1"/>
    <rect x="11" y="2" width="2" height="3" rx="1"/>
  </IconBaseSolid>
))
IconHydrationSolid.displayName = 'IconHydrationSolid'
