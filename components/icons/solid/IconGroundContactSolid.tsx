// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGroundContactSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M7 14c0-2 1-4 3-5s4-1 5.5 0 2 3 2 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M5 15.25a.75.75 0 000 1.5h14a.75.75 0 000-1.5H5z"/><path d="M8 16v2a.75.75 0 01-1.5 0v-2zm8.5 0v2a.75.75 0 001.5 0v-2z"/>
  </IconBaseSolid>
))
IconGroundContactSolid.displayName = 'IconGroundContactSolid'
