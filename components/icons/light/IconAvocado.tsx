// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconAvocado = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 2c-4 0-7 3-8 7s0 8 2 10c1.5 1.5 3.5 2 6 2s4.5-.5 6-2c2-2 3-6 2-10s-4-7-8-7z"/><circle cx="12" cy="13" r="3.5"/>
  </IconBaseLight>
))
IconAvocado.displayName = 'IconAvocado'
