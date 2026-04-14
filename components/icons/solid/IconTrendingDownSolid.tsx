// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrendingDownSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M22 17l-8.5-8.5-5 5L2 7v2.83l6.5 6.5 5-5L20 17.83V14h2v3Z"/>
  </IconBaseSolid>
))
IconTrendingDownSolid.displayName = 'IconTrendingDownSolid'
