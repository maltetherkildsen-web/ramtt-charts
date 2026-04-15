// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSweetPotato = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <ellipse cx="12" cy="12" rx="8" ry="5"/><path d="M6 10c2 1 4 .5 5-1" opacity="0.3"/><path d="M13 14c2-.5 3-2 4-3" opacity="0.3"/><path d="M14 7c1-2 2-3 4-3"/>
  </IconBase>
))
IconSweetPotato.displayName = 'IconSweetPotato'
