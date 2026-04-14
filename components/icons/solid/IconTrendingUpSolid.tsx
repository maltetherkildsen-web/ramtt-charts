// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrendingUpSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M22 7l-8.5 8.5-5-5L2 17v-2.83l6.5-6.5 5 5L20 6.17V10h2V7Z"/>
  </IconBaseSolid>
))
IconTrendingUpSolid.displayName = 'IconTrendingUpSolid'
