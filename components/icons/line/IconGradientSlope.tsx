// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconGradientSlope = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M2 20L22 6"/><path d="M22 6v14"/><path d="M2 20h20"/><path d="M8 17l1-2"/><path d="M14 13l1-2"/><path d="M17 10.5l1-1.5"/>
  </IconBase>
))
IconGradientSlope.displayName = 'IconGradientSlope'
