// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPainCaveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 3.25C8.5 3.25 4.25 9 3.35 18.25H2.25a.75.75 0 000 1.5h19.5a.75.75 0 000-1.5h-1.1C19.75 9 15.5 3.25 12 3.25z" fill="currentColor" opacity="0.15"/><path d="M9 17l1.5-3h3L15 17M10 15l3 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M11 8l-.5-.5.5-.5.5.5-.5.5M14 7l-.5-.5.5-.5.5.5-.5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </IconBaseSolid>
))
IconPainCaveSolid.displayName = 'IconPainCaveSolid'
