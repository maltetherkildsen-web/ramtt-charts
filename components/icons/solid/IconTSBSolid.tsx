// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTSBSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 12h20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/><path d="M3 12c2-3 4-5 6-5s4 2 5 3 3 2 5 0 3-3 3-4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M2 8h2M2 16h2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
  </IconBaseSolid>
))
IconTSBSolid.displayName = 'IconTSBSolid'
