// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconInterval = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 20V8H7V20" />
    <path d="M9 20V14H12V20" />
    <path d="M14 20V6H17V20" />
    <path d="M19 20V12H22V20" />
  </IconBase>
))
IconInterval.displayName = 'IconInterval'
