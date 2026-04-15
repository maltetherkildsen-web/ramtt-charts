// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAbsorptionRateSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M4 3.25a.75.75 0 000 1.5h1.38l2.87 7.66V20a2.75 2.75 0 005.5 0v-7.59l2.87-7.66H20a.75.75 0 000-1.5H4zm4.9 1.5l2.35 6.25h1.5l2.35-6.25H8.9z"/>
  </IconBaseSolid>
))
IconAbsorptionRateSolid.displayName = 'IconAbsorptionRateSolid'
