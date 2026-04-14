// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStomachSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M16 4s4 0 4 4-4 4-4 8-4 6-8 6-4-4-4-6 2-4 4-4h4Z"/>
    <path d="M16 4c-2 0-4 1-4 3v-3h4Z"/>
  </IconBaseSolid>
))
IconStomachSolid.displayName = 'IconStomachSolid'
