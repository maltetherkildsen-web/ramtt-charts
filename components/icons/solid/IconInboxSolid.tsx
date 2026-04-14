// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconInboxSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M5.45 5.11A2 2 0 0 1 7.24 4h9.52a2 2 0 0 1 1.79 1.11L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6l3.45-6.89Z"/>
  </IconBaseSolid>
))
IconInboxSolid.displayName = 'IconInboxSolid'
