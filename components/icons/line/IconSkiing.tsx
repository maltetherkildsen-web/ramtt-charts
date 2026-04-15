// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSkiing = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="14" cy="4" r="2"/><path d="M8 22L18 6"/><path d="M6 16l5-3 3 4"/><path d="M3 20l18-8"/><path d="M16 10l2-1"/>
  </IconBase>
))
IconSkiing.displayName = 'IconSkiing'
