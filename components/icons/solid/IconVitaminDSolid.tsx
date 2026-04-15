// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconVitaminDSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="7" y="8" width="10" height="14" rx="5"/>
    <circle cx="12" cy="4" r="2"/>
  </IconBaseSolid>
))
IconVitaminDSolid.displayName = 'IconVitaminDSolid'
