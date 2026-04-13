// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBarChartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M6 20V14" />
    <path fill="currentColor" d="M12 20V4" />
    <path fill="currentColor" d="M18 20V10" />
    </IconBaseSolid>
))
IconBarChartSolid.displayName = 'IconBarChartSolid'
