// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrendingUpSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M22 7L13.5 15.5L8.5 10.5L2 17" />
    <path fill="currentColor" d="M16 7H22V13" />
    </IconBaseSolid>
))
IconTrendingUpSolid.displayName = 'IconTrendingUpSolid'
