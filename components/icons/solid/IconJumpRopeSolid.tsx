// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconJumpRopeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="4.5" y="2.5" width="3" height="6" rx="1.5"/>
    <rect x="16.5" y="2.5" width="3" height="6" rx="1.5"/>
    <path d="M6 8c0 12 12 12 12 0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/>
  </IconBaseSolid>
))
IconJumpRopeSolid.displayName = 'IconJumpRopeSolid'
