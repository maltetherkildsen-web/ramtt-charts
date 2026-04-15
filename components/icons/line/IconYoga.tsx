// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconYoga = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="4" r="2"/><path d="M12 6v6"/><path d="M8 10l4 2 4-2"/><path d="M10 22l2-8 2 14"/><path d="M8 18h8"/>
  </IconBase>
))
IconYoga.displayName = 'IconYoga'
