// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconBerries = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="9" cy="12" r="3"/><circle cx="15" cy="12" r="3"/><circle cx="12" cy="8" r="3"/><path d="M12 5V2"/><path d="M10 3h4"/>
  </IconBase>
))
IconBerries.displayName = 'IconBerries'
