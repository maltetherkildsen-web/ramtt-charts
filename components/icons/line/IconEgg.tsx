// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconEgg = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 3c-3 0-6 4-6 9s2.5 9 6 9 6-4 6-9-3-9-6-9z"/>
  </IconBase>
))
IconEgg.displayName = 'IconEgg'
