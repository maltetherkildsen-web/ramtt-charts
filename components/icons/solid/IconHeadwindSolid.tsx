// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHeadwindSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="16" cy="5" r="2.75"/><path d="M2 7.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H2zm0 4a.75.75 0 000 1.5h5a.75.75 0 000-1.5H2zm0 4a.75.75 0 000 1.5h4a.75.75 0 000-1.5H2z"/><path d="M14.37 7.5a.75.75 0 00-1.18.12l-3.68 4.6a.75.75 0 00.11.98l3.13 2.66V21a.75.75 0 001.5 0v-5.25a.75.75 0 00-.3-.6l-2.48-2.1 2.95-3.69a.75.75 0 00-.05-1.06z"/>
  </IconBaseSolid>
))
IconHeadwindSolid.displayName = 'IconHeadwindSolid'
