// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconThumbsDown = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/>
    <path d="M17 13v6a3 3 0 0 1-6 0v-3H7a2 2 0 0 1-2-2.2l1.5-7A2 2 0 0 1 8.5 5H17"/>
  </IconBase>
))
IconThumbsDown.displayName = 'IconThumbsDown'
