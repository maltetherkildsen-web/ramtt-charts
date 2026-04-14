// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGlycogenSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="8" width="16" height="8" rx="2"/>
    <rect x="19" y="11" width="2" height="2" rx=".5"/>
    <rect x="5" y="10.5" width="8" height="3" rx="1"/>
  </IconBaseSolid>
))
IconGlycogenSolid.displayName = 'IconGlycogenSolid'
