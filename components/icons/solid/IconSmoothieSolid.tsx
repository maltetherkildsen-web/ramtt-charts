// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSmoothieSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M5 3.25a.75.75 0 01.75-.75H18.25a.75.75 0 010 1.5h-1.06l-1.44 15.38a.75.75 0 01-.75.67H9a.75.75 0 01-.75-.67L6.81 4H5.75A.75.75 0 015 3.25z"/><circle cx="14" cy="4" r="1.75" fill="currentColor"/><path d="M15 4l2-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconSmoothieSolid.displayName = 'IconSmoothieSolid'
