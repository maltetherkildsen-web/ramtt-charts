// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMuscleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 16s2-4 4-6 4-4 6-4 3 2 3 4-1 4 1 6 4 2 4 2v2H4v-4Z"/>
    <path d="M4 16s-1 2 0 3 3 0 3 0v1H3v-4h1Z"/>
  </IconBaseSolid>
))
IconMuscleSolid.displayName = 'IconMuscleSolid'
