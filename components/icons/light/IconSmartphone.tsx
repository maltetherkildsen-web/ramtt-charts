// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSmartphone = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <path d="M12 18H12.01" />
  </IconBaseLight>
))
IconSmartphone.displayName = 'IconSmartphone'
