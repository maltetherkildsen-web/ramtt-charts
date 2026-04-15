// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTrendingUp = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
    <path d="M16 7H22V13" />
  </IconBaseLight>
))
IconTrendingUp.displayName = 'IconTrendingUp'
