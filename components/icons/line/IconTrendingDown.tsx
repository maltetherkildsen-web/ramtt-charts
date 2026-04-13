// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTrendingDown = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M22 17L13.5 8.5L8.5 13.5L2 7" />
    <path d="M16 17H22V11" />
  </IconBase>
))
IconTrendingDown.displayName = 'IconTrendingDown'
