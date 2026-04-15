// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAvocadoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2c-4 0-7 3-8 7s0 8 2 10c1.5 1.5 3.5 2 6 2s4.5-.5 6-2c2-2 3-6 2-10s-4-7-8-7z" fill="currentColor"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
  </IconBaseSolid>
))
IconAvocadoSolid.displayName = 'IconAvocadoSolid'
