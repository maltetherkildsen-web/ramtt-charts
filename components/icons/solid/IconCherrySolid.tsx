// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCherrySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="8" cy="16" r="4.5"/><circle cx="16" cy="14" r="4"/><path d="M8 12c0-4 2-7 5-9M16 10.5c0-3 0-5-3-7.5M11 4c1-.5 2-.5 3 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconCherrySolid.displayName = 'IconCherrySolid'
