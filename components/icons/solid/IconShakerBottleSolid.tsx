// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShakerBottleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M7 8h10l.5 12a2 2 0 01-2 2H8.5a2 2 0 01-2-2L7 8z" fill="currentColor"/><path d="M7 8l1-3h8l1 3" fill="currentColor" opacity="0.6"/><path d="M10 5V3h4v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconShakerBottleSolid.displayName = 'IconShakerBottleSolid'
