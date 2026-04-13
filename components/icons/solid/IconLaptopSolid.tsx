// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLaptopSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="3" y="4" width="18" height="12" rx="2" />
    <path fill="currentColor" d="M2 20H22" />
    </IconBaseSolid>
))
IconLaptopSolid.displayName = 'IconLaptopSolid'
