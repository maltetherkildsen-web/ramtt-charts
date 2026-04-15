// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDashboardPanelSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 2.75A1.25 1.25 0 002.75 4v5A1.25 1.25 0 004 10.25h5A1.25 1.25 0 0010.25 9V4A1.25 1.25 0 009 2.75H4zm11 0A1.25 1.25 0 0013.75 4v1A1.25 1.25 0 0015 6.25h4A1.25 1.25 0 0020.25 5V4A1.25 1.25 0 0019 2.75h-4zM4 13.75A1.25 1.25 0 002.75 15v1A1.25 1.25 0 004 17.25h5A1.25 1.25 0 0010.25 16v-1A1.25 1.25 0 009 13.75H4zm11-4A1.25 1.25 0 0013.75 11v5A1.25 1.25 0 0015 17.25h4A1.25 1.25 0 0020.25 16v-5A1.25 1.25 0 0019 9.75h-4z"/>
  </IconBaseSolid>
))
IconDashboardPanelSolid.displayName = 'IconDashboardPanelSolid'
