// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconFat = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2.7C12 2.7 5 10.7 5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15C19 10.7 12 2.7 12 2.7Z" />
    <path d="M7 15C9 13 15 13 17 15" />
  </IconBase>
))
IconFat.displayName = 'IconFat'
