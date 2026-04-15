// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDecouplingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 16c3-1 6-2 9-3s6-2 9-3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M3 16c3 0 6-1 9-3s6-4 9-6" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="3 2" strokeLinecap="round"/><circle cx="3" cy="16" r="2" fill="currentColor"/>
  </IconBaseSolid>
))
IconDecouplingSolid.displayName = 'IconDecouplingSolid'
