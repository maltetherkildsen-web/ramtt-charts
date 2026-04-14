// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPieChartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M21 12A9 9 0 1 1 12 3v9h9Z"/>
    <path d="M21.2 10.2A9 9 0 0 0 13.8 2.8v7.4h7.4Z"/>
  </IconBaseSolid>
))
IconPieChartSolid.displayName = 'IconPieChartSolid'
