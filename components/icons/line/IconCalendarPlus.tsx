// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconCalendarPlus = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2v3"/><path d="M16 2v3"/><path d="M4 10h16"/><path d="M12 13v4"/><path d="M10 15h4"/>
  </IconBase>
))
IconCalendarPlus.displayName = 'IconCalendarPlus'
