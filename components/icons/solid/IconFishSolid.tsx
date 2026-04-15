// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFishSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 12c3-4 7-6 11-6s5 2 7 6c-2 4-3 6-7 6s-8-2-11-6z" fill="currentColor"/><circle cx="17" cy="12" r="1.25" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M22 8l-3 4 3 4" fill="currentColor"/>
  </IconBaseSolid>
))
IconFishSolid.displayName = 'IconFishSolid'
