// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconThumbsUp = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    <path d="M7 11V5a3 3 0 0 1 6 0v3h4a2 2 0 0 1 2 2.2l-1.5 7a2 2 0 0 1-2 1.8H7"/>
  </IconBase>
))
IconThumbsUp.displayName = 'IconThumbsUp'
