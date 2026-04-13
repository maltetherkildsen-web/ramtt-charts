// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrendingDownSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M22 17L13.5 8.5L8.5 13.5L2 7" />
    <path fill="currentColor" d="M16 17H22V11" />
    </IconBaseSolid>
))
IconTrendingDownSolid.displayName = 'IconTrendingDownSolid'
