// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUsersSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="9" cy="8" r="4"/>
    <path d="M17 21a8 8 0 1 0-16 0h16Z"/>
    <circle cx="17" cy="8" r="3"/>
    <path d="M17 15a6 6 0 0 1 6 6H17v-6Z"/>
  </IconBaseSolid>
))
IconUsersSolid.displayName = 'IconUsersSolid'
