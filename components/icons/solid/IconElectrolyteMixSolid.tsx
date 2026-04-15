// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconElectrolyteMixSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M7 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4Z"/>
    <rect x="5" y="3.25" width="14" height="1.5" rx=".5"/>
  </IconBaseSolid>
))
IconElectrolyteMixSolid.displayName = 'IconElectrolyteMixSolid'
