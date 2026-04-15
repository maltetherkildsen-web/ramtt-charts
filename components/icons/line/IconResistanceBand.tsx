// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconResistanceBand = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <rect x="5" y="3" width="14" height="18" rx="7"/>
    <path d="M8 8h8"/>
    <path d="M8 16h8"/>
  </IconBase>
))
IconResistanceBand.displayName = 'IconResistanceBand'
