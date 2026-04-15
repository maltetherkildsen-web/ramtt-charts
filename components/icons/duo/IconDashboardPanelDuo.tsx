// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDashboardPanelDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="9" width="9" height="9" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="5" rx="2"/><rect x="2" y="13" width="9" height="5" rx="2"/><rect x="13" y="9" width="9" height="9" rx="2"/>
  </IconBaseDuo>
))
IconDashboardPanelDuo.displayName = 'IconDashboardPanelDuo'
