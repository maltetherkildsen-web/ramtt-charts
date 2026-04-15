// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFatigueResistanceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 10h20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M2 10c4 0 8 2 12 5s6 4 8 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity="0.4" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconFatigueResistanceSolid.displayName = 'IconFatigueResistanceSolid'
