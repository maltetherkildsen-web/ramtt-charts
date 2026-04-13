// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUserSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="8" r="4" />
    <path fill="currentColor" d="M20 21C20 16.6 16.4 13 12 13C7.6 13 4 16.6 4 21" />
    </IconBaseSolid>
))
IconUserSolid.displayName = 'IconUserSolid'
