// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDateFruitSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <ellipse cx="12" cy="12" rx="5.75" ry="8.75"/><path d="M12 4v-2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconDateFruitSolid.displayName = 'IconDateFruitSolid'
