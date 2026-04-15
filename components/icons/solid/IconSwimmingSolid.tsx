// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSwimmingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="7" r="2.75"/><path d="M8.23 13.6a.75.75 0 01.37-.44L10.2 12h3.15l-1.2-2.4a.75.75 0 011.34-.68l1.5 3a.75.75 0 01-.67 1.08H10.6l-1.6 3.2a.75.75 0 01-.77.38z"/><path d="M1.47 17.47a.75.75 0 011.06 0C3.47 18.41 4.5 18.75 5.5 18.75S7.53 18.41 8.47 17.47a.75.75 0 011.06 0c.94.94 1.97 1.28 2.97 1.28s2.03-.34 2.97-1.28a.75.75 0 011.06 0c.94.94 1.97 1.28 2.97 1.28s2.03-.34 2.97-1.28a.75.75 0 011.06 1.06c-1.19 1.19-2.72 1.72-4.03 1.72s-2.84-.53-4.03-1.72c-1.19 1.19-2.72 1.72-4.03 1.72S8.6 20.72 7.41 19.53c-1.19 1.19-2.72 1.72-4.03 1.72-1.31 0-2.84-.53-4.03-1.72a.75.75 0 010-1.06z"/>
  </IconBaseSolid>
))
IconSwimmingSolid.displayName = 'IconSwimmingSolid'
