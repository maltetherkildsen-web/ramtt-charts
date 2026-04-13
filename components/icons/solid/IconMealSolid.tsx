// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMealSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="14" r="7" />
    <path fill="currentColor" d="M5 14H19" />
    <path fill="currentColor" d="M8 6C8 6 9 4 12 4C15 4 16 6 16 6" />
    </IconBaseSolid>
))
IconMealSolid.displayName = 'IconMealSolid'
