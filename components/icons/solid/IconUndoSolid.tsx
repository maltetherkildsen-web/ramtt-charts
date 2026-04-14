// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconUndoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 7l3-3v2h3a8 8 0 0 1 0 16H6v-2h4a6 6 0 0 0 0-12H7v2l-3-3Z"/>
  </IconBaseSolid>
))
IconUndoSolid.displayName = 'IconUndoSolid'
