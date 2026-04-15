// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMegaphoneSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M18 2.25a.75.75 0 01.75.75v18a.75.75 0 01-1.2.6L10 16H4A1.75 1.75 0 012.25 14.25v-4.5A1.75 1.75 0 014 8h6l7.55-5.65a.75.75 0 011.2.6z"/><path d="M18 9a4 4 0 010 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconMegaphoneSolid.displayName = 'IconMegaphoneSolid'
