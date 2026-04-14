// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMoveVertical = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2v20"/>
    <path d="M8 5l4-3 4 3"/>
    <path d="M8 19l4 3 4-3"/>
  </IconBase>
))
IconMoveVertical.displayName = 'IconMoveVertical'
