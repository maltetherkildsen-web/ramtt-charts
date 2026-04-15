// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconDashboardPanel = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="5" rx="2"/><rect x="2" y="13" width="9" height="5" rx="2"/><rect x="13" y="9" width="9" height="9" rx="2"/>
  </IconBase>
))
IconDashboardPanel.displayName = 'IconDashboardPanel'
