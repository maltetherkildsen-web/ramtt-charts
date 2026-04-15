// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconOatsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 10c0 5 3.5 8 8 8s8-3 8-8H4z" fill="currentColor"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M9 4l-1 3M12 3v4M15 4l1 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconOatsSolid.displayName = 'IconOatsSolid'
