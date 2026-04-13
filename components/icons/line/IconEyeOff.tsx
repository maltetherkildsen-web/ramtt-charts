// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconEyeOff = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M17.9 17.9C16.2 19.2 14.2 20 12 20C5 20 1 12 1 12C2.2 9.7 4 7.8 6.1 6.4" />
    <path d="M9.9 4.2C10.6 4.1 11.3 4 12 4C19 4 23 12 23 12C22.4 13.1 21.6 14.2 20.7 15.1" />
    <path d="M14.1 14.1A3 3 0 1 1 9.9 9.9" />
    <path d="M1 1L23 23" />
  </IconBase>
))
IconEyeOff.displayName = 'IconEyeOff'
