// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconLineChart = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 20H21" />
    <path d="M3 20V4" />
    <path d="M6 16L10 10L14 14L20 6" />
  </IconBase>
))
IconLineChart.displayName = 'IconLineChart'
