// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconThumbsDownSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="17" y="2" width="5" height="11" rx="2"/>
    <path d="M17 13v6a3 3 0 0 1-6 0v-3H7a2 2 0 0 1-2-2.2l1.5-7A2 2 0 0 1 8.5 5H17Z"/>
  </IconBaseSolid>
))
IconThumbsDownSolid.displayName = 'IconThumbsDownSolid'
