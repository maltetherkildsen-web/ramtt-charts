// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHRVSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 12c2 0 2-6 4-6s2 12 4 12 2-10 4-10 2 2 4 2c1 0 2-2 2-2v2c-1 0-2 2-4 2s-2-2-4-2-2 10-4 10-2-12-4-12-2 6-4 6H3v-2Z"/>
  </IconBaseSolid>
))
IconHRVSolid.displayName = 'IconHRVSolid'
