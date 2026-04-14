// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconUndo = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 7l3-3"/>
    <path d="M4 7l3 3"/>
    <path d="M4 7h6a7 7 0 0 1 0 14H6"/>
  </IconBase>
))
IconUndo.displayName = 'IconUndo'
