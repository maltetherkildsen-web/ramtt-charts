// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUserMinusSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="10" cy="8" r="4" />
    <path fill="currentColor" d="M18 21C18 16.6 14.4 13 10 13C5.6 13 2 16.6 2 21" />
    <path fill="currentColor" d="M17 11H23" />
    </IconBaseSolid>
))
IconUserMinusSolid.displayName = 'IconUserMinusSolid'
