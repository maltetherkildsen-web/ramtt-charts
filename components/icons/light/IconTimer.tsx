// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTimer = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9V13L15 15" />
    <path d="M10 2H14" />
    <path d="M12 2V5" />
  </IconBaseLight>
))
IconTimer.displayName = 'IconTimer'
