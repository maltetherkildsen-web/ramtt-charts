// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBodyCompositionSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="4" r="2.5"/>
    <path d="M9 9h6v6l1 7H8l1-7V9Z"/>
  </IconBaseSolid>
))
IconBodyCompositionSolid.displayName = 'IconBodyCompositionSolid'
