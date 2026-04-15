// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconDateFruit = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <ellipse cx="12" cy="12" rx="5" ry="8"/><path d="M9 8c2 3 2 5 0 8" opacity="0.4"/><path d="M12 4v-2"/>
  </IconBaseLight>
))
IconDateFruit.displayName = 'IconDateFruit'
