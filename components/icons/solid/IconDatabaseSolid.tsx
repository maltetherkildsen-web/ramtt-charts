// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDatabaseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <ellipse cx="12" cy="5.5" rx="8" ry="3.5"/>
    <path d="M4 5.5v13c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-13"/>
    <path d="M4 11.25c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v1.5c0 1.9-3.6 3.5-8 3.5s-8-1.6-8-3.5v-1.5Z"/>
  </IconBaseSolid>
))
IconDatabaseSolid.displayName = 'IconDatabaseSolid'
