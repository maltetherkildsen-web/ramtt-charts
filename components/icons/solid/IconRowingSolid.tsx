// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRowingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="20" cy="5" r="2.25"/><path d="M20.67 7.66a.75.75 0 00-1.34.68l-4 8a.75.75 0 00.34 1l-4.2 3.36c-3.6.05-7.25.5-10.82 1.34a.75.75 0 10.35 1.46c3.8-.9 7.6-1.32 11.35-1.32 3.75 0 7.55.42 11.35 1.32a.75.75 0 10.35-1.46c-2.77-.66-5.55-1.08-8.33-1.23l5.13-4.1a.75.75 0 00.25-.81l-1.43-5z"/>
  </IconBaseSolid>
))
IconRowingSolid.displayName = 'IconRowingSolid'
