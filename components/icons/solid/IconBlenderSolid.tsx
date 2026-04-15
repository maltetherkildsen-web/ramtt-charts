// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBlenderSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M5.28 3.5a.75.75 0 01.72-.5h10a.75.75 0 01.75.67V3.75h1.25a1.75 1.75 0 011.75 1.75v2a1.75 1.75 0 01-1.75 1.75h-1.43l-.57 6.5h-8l-.95-12.25zm.75 12.75l-.04-.5H15.8l.04.5v2.25a2.75 2.75 0 01-2.75 2.75h-4.5A2.75 2.75 0 015.84 18.5v-2.25z"/>
  </IconBaseSolid>
))
IconBlenderSolid.displayName = 'IconBlenderSolid'
