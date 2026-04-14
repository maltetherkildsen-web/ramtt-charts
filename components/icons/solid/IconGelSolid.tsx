// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGelSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M9 6l-2 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l-2-14H9Z"/>
    <rect x="8.5" y="5" width="7" height="2" rx="1"/>
    <rect x="12.5" y="2.6" width="1.5" height="3.8" rx=".75" transform="rotate(-63 13.25 4.5)"/>
  </IconBaseSolid>
))
IconGelSolid.displayName = 'IconGelSolid'
