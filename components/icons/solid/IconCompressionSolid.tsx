// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCompressionSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="7" y="3" width="10" height="18" rx="2" fill="currentColor"/><path d="M3 8l3 1.5L3 11M3 13l3 1.5L3 16M21 8l-3 1.5L21 11M21 13l-3 1.5L21 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </IconBaseSolid>
))
IconCompressionSolid.displayName = 'IconCompressionSolid'
