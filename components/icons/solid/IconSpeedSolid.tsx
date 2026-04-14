// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSpeedSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 18a9 9 0 0 1 16 0H4Z"/>
    <path d="M11.2 17.4l3.6-9.4 1.4.6-3.6 9.4Z"/>
    <circle cx="12" cy="18" r="2.5"/>
  </IconBaseSolid>
))
IconSpeedSolid.displayName = 'IconSpeedSolid'
