// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconEnergyBar = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="3" y="8" width="18" height="8" rx="1.5"/><path d="M6 8V6l3-1"/><path d="M6 16v2l3 1"/><path d="M7 11h10" opacity="0.3"/><path d="M7 13h8" opacity="0.3"/>
  </IconBase>
))
IconEnergyBar.displayName = 'IconEnergyBar'
