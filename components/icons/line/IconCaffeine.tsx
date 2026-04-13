// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconCaffeine = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <ellipse cx="12" cy="12" rx="6" ry="8" />
    <path d="M12 4C10 7 10 17 12 20" />
  </IconBase>
))
IconCaffeine.displayName = 'IconCaffeine'
