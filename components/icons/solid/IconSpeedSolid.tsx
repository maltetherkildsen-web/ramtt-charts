// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSpeedSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Speedometer arc */}
    <path fill="currentColor" d="M4 18A9 9 0 0 1 20 18" />
    {/* Needle pointing upper-right */}
    <path fill="currentColor" d="M12 18L16 8" />
    {/* Center pivot dot */}
    <circle fill="currentColor" cx="12" cy="18" r="1.5" />
    </IconBaseSolid>
))
IconSpeedSolid.displayName = 'IconSpeedSolid'
