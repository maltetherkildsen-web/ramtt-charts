// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCleatWalk = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="4" r="2"/><path d="M12 6v5"/><path d="M8 9l4 2 4-2"/><path d="M10 11l-1 5 2 1"/><path d="M14 11l1 5-2 1"/><path d="M9 17l-2 3.5"/><path d="M15 17l2 3.5"/><path d="M6 20l2 1.5"/><path d="M16 20l2 1.5"/>
  </IconBaseLight>
))
IconCleatWalk.displayName = 'IconCleatWalk'
