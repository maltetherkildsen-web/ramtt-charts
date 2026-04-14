// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStressSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 13l2-4 2 8 2-10 2 12 2-16 2 16 2-10 2 4 2-2v2l-2 2-2-4-2 10-2-16-2 16-2-12-2 10-2-8-2 4H3v-2Z"/>
  </IconBaseSolid>
))
IconStressSolid.displayName = 'IconStressSolid'
