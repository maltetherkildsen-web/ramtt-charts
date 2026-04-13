// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSearchSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="10.5" cy="10.5" r="6.5" />
    <path fill="currentColor" d="M15.5 15.5L20 20" />
    </IconBaseSolid>
))
IconSearchSolid.displayName = 'IconSearchSolid'
