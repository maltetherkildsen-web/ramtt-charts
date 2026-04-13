// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCalendarSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="4" y="5" width="16" height="16" rx="2" />
    <path fill="currentColor" d="M8 2V5" />
    <path fill="currentColor" d="M16 2V5" />
    <path fill="currentColor" d="M4 10H20" />
    {/* Day dots */}
    <circle fill="currentColor" cx="8.5" cy="14" r="1" />
    <circle fill="currentColor" cx="12" cy="14" r="1" />
    <circle fill="currentColor" cx="15.5" cy="14" r="1" />
    <circle fill="currentColor" cx="8.5" cy="17.5" r="1" />
    <circle fill="currentColor" cx="12" cy="17.5" r="1" />
    </IconBaseSolid>
))
IconCalendarSolid.displayName = 'IconCalendarSolid'
