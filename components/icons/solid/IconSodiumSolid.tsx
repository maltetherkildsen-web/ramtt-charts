// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSodiumSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M8 10l-1 10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l-1-10H8Z"/>
    <rect x="7" y="7" width="10" height="3" rx="1"/>
    <circle cx="10" cy="4.5" r="1"/>
    <circle cx="14" cy="4.5" r="1"/>
    <circle cx="12" cy="3" r="1"/>
  </IconBaseSolid>
))
IconSodiumSolid.displayName = 'IconSodiumSolid'
