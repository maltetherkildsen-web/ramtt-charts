// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUsersSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="9" cy="8" r="3.5" />
    <path fill="currentColor" d="M17 21C17 17.1 13.4 14 9 14C4.6 14 1 17.1 1 21" />
    <circle fill="currentColor" cx="17" cy="8" r="2.5" />
    <path fill="currentColor" d="M23 21C23 18.2 20.8 16 18 16C17 16 16.1 16.3 15.3 16.8" />
    </IconBaseSolid>
))
IconUsersSolid.displayName = 'IconUsersSolid'
