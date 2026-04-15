// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLactateStripSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="9" y="2" width="6" height="20" rx="1"/>
    <rect x="10" y="14" width="4" height="5" rx=".5"/>
  </IconBaseSolid>
))
IconLactateStripSolid.displayName = 'IconLactateStripSolid'
