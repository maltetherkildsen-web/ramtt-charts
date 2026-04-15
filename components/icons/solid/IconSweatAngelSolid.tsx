// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSweatAngelSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <ellipse cx="12" cy="16" rx="9.75" ry="4.75" fill="currentColor" opacity="0.3"/><circle cx="12" cy="8" r="2.75" fill="currentColor"/><path d="M12 11v2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M8 14c-2-1-3-3-2-5M16 14c2-1 3-3 2-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconSweatAngelSolid.displayName = 'IconSweatAngelSolid'
