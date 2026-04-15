// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconYogurtSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 5.25a.75.75 0 01.75-.75H19.25a.75.75 0 010 1.5h-.44l-1.43 13.38a.75.75 0 01-.75.67H7.37a.75.75 0 01-.75-.67L5.19 6H4.75A.75.75 0 014 5.25z"/><path d="M18 4c1 0 2 .5 2 1.5S19 7 18 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconYogurtSolid.displayName = 'IconYogurtSolid'
