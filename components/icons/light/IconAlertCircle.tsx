// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconAlertCircle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8V13" />
    <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
  </IconBaseLight>
))
IconAlertCircle.displayName = 'IconAlertCircle'
