// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSunSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="12" r="4" />
    <path fill="currentColor" d="M12 2V4" />
    <path fill="currentColor" d="M12 20V22" />
    <path fill="currentColor" d="M4.93 4.93L6.34 6.34" />
    <path fill="currentColor" d="M17.66 17.66L19.07 19.07" />
    <path fill="currentColor" d="M2 12H4" />
    <path fill="currentColor" d="M20 12H22" />
    <path fill="currentColor" d="M4.93 19.07L6.34 17.66" />
    <path fill="currentColor" d="M17.66 6.34L19.07 4.93" />
    </IconBaseSolid>
))
IconSunSolid.displayName = 'IconSunSolid'
