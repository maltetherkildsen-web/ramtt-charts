// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUserCheckSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="10" cy="8" r="4.5"/>
    <path d="M18 21a8 8 0 1 0-16 0h16Z"/>
    <path d="M16.3 10.3a1 1 0 0 1 1.4 0l1.3 1.3 3.8-3.8a1 1 0 1 1 1.4 1.4l-4.5 4.5a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 0-1.4Z"/>
  </IconBaseSolid>
))
IconUserCheckSolid.displayName = 'IconUserCheckSolid'
