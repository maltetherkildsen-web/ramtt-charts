// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrainingLoadSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="11" y="4" width="2" height="16" rx="1"/>
    <ellipse cx="12" cy="8" rx="5.5" ry="2"/>
    <ellipse cx="12" cy="13" rx="6.5" ry="2.5"/>
    <ellipse cx="12" cy="18" rx="7.5" ry="2.5"/>
  </IconBaseSolid>
))
IconTrainingLoadSolid.displayName = 'IconTrainingLoadSolid'
