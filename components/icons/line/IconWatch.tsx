// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconWatch = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="12" r="6" />
    <path d="M12 9V12L14 14" />
    <path d="M9 2H15V5" />
    <path d="M9 22H15V19" />
  </IconBase>
))
IconWatch.displayName = 'IconWatch'
