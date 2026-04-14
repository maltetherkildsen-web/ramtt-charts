// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLoaderSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="11" y="2" width="2" height="4" rx="1"/>
    <rect x="11" y="18" width="2" height="4" rx="1"/>
    <rect x="2" y="11" width="4" height="2" rx="1"/>
    <rect x="18" y="11" width="4" height="2" rx="1"/>
    <rect x="5.64" y="4.22" width="2" height="4" rx="1" transform="rotate(45 6.64 6.22)"/>
    <rect x="16.36" y="15.78" width="2" height="4" rx="1" transform="rotate(45 17.36 17.78)"/>
    <rect x="5.64" y="15.78" width="2" height="4" rx="1" transform="rotate(-45 6.64 17.78)"/>
    <rect x="16.36" y="4.22" width="2" height="4" rx="1" transform="rotate(-45 17.36 6.22)"/>
  </IconBaseSolid>
))
IconLoaderSolid.displayName = 'IconLoaderSolid'
