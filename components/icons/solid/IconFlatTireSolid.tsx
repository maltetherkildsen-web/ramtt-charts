// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFlatTireSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <ellipse cx="12" cy="14" rx="8.75" ry="5.75" fill="currentColor" opacity="0.2"/><circle cx="12" cy="12" r="2.75" fill="currentColor"/><path d="M10 4l1 1-1 1M13 3l1 1-1 1M15 5l1 1-1 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
  </IconBaseSolid>
))
IconFlatTireSolid.displayName = 'IconFlatTireSolid'
