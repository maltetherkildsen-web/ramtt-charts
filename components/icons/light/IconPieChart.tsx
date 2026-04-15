// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPieChart = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M21 12A9 9 0 1 1 12 3V12H21Z" />
    <path d="M21.2 10.2A9 9 0 0 0 13.8 2.8V10.2H21.2Z" />
  </IconBaseLight>
))
IconPieChart.displayName = 'IconPieChart'
