// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCoffee = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z"/><path d="M16 9h2a2 2 0 010 4h-2"/><path d="M6 1v2"/><path d="M10 1v2"/><path d="M14 1v2"/><path d="M2 20h16"/>
  </IconBaseLight>
))
IconCoffee.displayName = 'IconCoffee'
