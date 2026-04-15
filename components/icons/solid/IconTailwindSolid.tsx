// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTailwindSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="8" cy="5" r="2.75"/><path d="M16 7.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zm1 4a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5zm1 4a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z"/><path d="M9.63 7.5a.75.75 0 011.18.12l3.68 4.6a.75.75 0 01-.11.98l-3.13 2.66V21a.75.75 0 01-1.5 0v-5.25a.75.75 0 01.3-.6l2.48-2.1-2.95-3.69a.75.75 0 01.05-1.06z"/>
  </IconBaseSolid>
))
IconTailwindSolid.displayName = 'IconTailwindSolid'
