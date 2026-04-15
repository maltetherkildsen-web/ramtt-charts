// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSun = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2V4" />
    <path d="M12 20V22" />
    <path d="M4.93 4.93L6.34 6.34" />
    <path d="M17.66 17.66L19.07 19.07" />
    <path d="M2 12H4" />
    <path d="M20 12H22" />
    <path d="M4.93 19.07L6.34 17.66" />
    <path d="M17.66 6.34L19.07 4.93" />
  </IconBaseLight>
))
IconSun.displayName = 'IconSun'
