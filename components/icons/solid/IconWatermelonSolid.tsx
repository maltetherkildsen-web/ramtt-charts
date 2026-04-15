// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWatermelonSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 14a9 9 0 0118 0H3z" fill="currentColor"/><circle cx="8" cy="11" r="1" fill="white"/><circle cx="12" cy="9" r="1" fill="white"/><circle cx="16" cy="11" r="1" fill="white"/><circle cx="10" cy="12.5" r="1" fill="white"/><circle cx="14" cy="12.5" r="1" fill="white"/>
  </IconBaseSolid>
))
IconWatermelonSolid.displayName = 'IconWatermelonSolid'
