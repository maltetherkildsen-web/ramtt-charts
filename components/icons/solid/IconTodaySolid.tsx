// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTodaySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="9" r="3.5" />
    <path fill="currentColor" d="M4 17H20" />
    {/* Rays */}
    <path fill="currentColor" d="M12 3V4" />
    <path fill="currentColor" d="M17.5 9H18.5" />
    <path fill="currentColor" d="M5.5 9H6.5" />
    <path fill="currentColor" d="M15.5 5.5L16.2 4.8" />
    <path fill="currentColor" d="M7.8 4.8L8.5 5.5" />
    </IconBaseSolid>
))
IconTodaySolid.displayName = 'IconTodaySolid'
