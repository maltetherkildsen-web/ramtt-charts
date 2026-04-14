// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMicSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="9" y="2" width="6" height="11" rx="3"/>
    <path d="M5 10a7 7 0 0 0 14 0v2a9 9 0 0 1-18 0v-2Z"/>
    <rect x="11" y="17" width="2" height="4" rx="1"/>
    <rect x="8" y="20" width="8" height="2" rx="1"/>
  </IconBaseSolid>
))
IconMicSolid.displayName = 'IconMicSolid'
