// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRedoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M20 7l-3-3v2h-3a8 8 0 0 0 0 16h4v-2h-4a6 6 0 0 1 0-12h3v2l3-3Z"/>
  </IconBaseSolid>
))
IconRedoSolid.displayName = 'IconRedoSolid'
