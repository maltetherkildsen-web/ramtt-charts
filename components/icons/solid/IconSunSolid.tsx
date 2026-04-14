// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSunSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="12" r="5"/>
    <rect x="11" y="1" width="2" height="4" rx="1"/>
    <rect x="11" y="19" width="2" height="4" rx="1"/>
    <rect x="1" y="11" width="4" height="2" rx="1"/>
    <rect x="19" y="11" width="4" height="2" rx="1"/>
    <rect x="4.22" y="3.22" width="2" height="4" rx="1" transform="rotate(45 5.22 5.22)"/>
    <rect x="17.78" y="16.78" width="2" height="4" rx="1" transform="rotate(45 18.78 18.78)"/>
    <rect x="4.22" y="16.78" width="2" height="4" rx="1" transform="rotate(-45 5.22 18.78)"/>
    <rect x="17.78" y="3.22" width="2" height="4" rx="1" transform="rotate(-45 18.78 5.22)"/>
  </IconBaseSolid>
))
IconSunSolid.displayName = 'IconSunSolid'
