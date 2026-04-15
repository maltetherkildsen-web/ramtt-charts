// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPetriDishSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <ellipse cx="12" cy="15" rx="8" ry="4"/>
    <path d="M4 13c0-2 3.6-3.5 8-3.5s8 1.5 8 3.5H4Z"/>
    <circle cx="10" cy="15.5" r="1"/>
    <circle cx="14" cy="16" r="1"/>
    <circle cx="12" cy="17" r="1"/>
  </IconBaseSolid>
))
IconPetriDishSolid.displayName = 'IconPetriDishSolid'
