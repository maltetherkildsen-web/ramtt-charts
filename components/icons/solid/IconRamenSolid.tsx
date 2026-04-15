// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRamenSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z" fill="currentColor"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><ellipse cx="16" cy="12" rx="2.25" ry="1.75" fill="white" opacity="0.5"/><path d="M9 7c0-1.5 1-2 2-2.5M13 6c0-1.5 1-2 2-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
  </IconBaseSolid>
))
IconRamenSolid.displayName = 'IconRamenSolid'
