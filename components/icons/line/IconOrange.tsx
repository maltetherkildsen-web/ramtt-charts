// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconOrange = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M5.75 7.75l12.5 8.5"/><path d="M5.75 16.25l12.5-8.5"/><circle cx="12" cy="12" r="2"/>
  </IconBase>
))
IconOrange.displayName = 'IconOrange'
