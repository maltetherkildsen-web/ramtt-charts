// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSwimming = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M2 18c1-1 2-1.5 3.5-1.5S8 18 9 18s2-.5 3.5-1.5S15 15 16.5 16.5 20 18 22 18"/><path d="M2 22c1-1 2-1.5 3.5-1.5S8 22 9 22s2-.5 3.5-1.5S15 19 16.5 20.5 20 22 22 22"/><circle cx="12" cy="7" r="2"/><path d="M8 14l2-4h4l-1.5-3"/>
  </IconBase>
))
IconSwimming.displayName = 'IconSwimming'
