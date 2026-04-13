// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLineChartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M3 20H21" />
    <path fill="currentColor" d="M3 20V4" />
    <path fill="currentColor" d="M6 16L10 10L14 14L20 6" />
    </IconBaseSolid>
))
IconLineChartSolid.displayName = 'IconLineChartSolid'
