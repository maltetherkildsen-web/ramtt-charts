// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSortDescSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="4" y="5" width="10" height="2" rx="1"/>
    <rect x="4" y="9" width="8" height="2" rx="1"/>
    <rect x="4" y="13" width="6" height="2" rx="1"/>
    <rect x="4" y="17" width="4" height="2" rx="1"/>
    <path d="M18 4v13h2l-3 3-3-3h2V4h2Z"/>
  </IconBaseSolid>
))
IconSortDescSolid.displayName = 'IconSortDescSolid'
