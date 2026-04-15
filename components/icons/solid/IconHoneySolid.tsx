// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHoneySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 5.25c-3.5 0-6.75 1.75-6.75 4.75H4a.75.75 0 000 1.5h.25V18a3.75 3.75 0 003.75 3.75h8A3.75 3.75 0 0019.75 18v-6.5H20a.75.75 0 000-1.5h-1.25c0-3-3.25-4.75-6.75-4.75z"/><path d="M12 6V3M10 3.5h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconHoneySolid.displayName = 'IconHoneySolid'
