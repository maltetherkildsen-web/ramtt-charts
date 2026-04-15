// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStopwatchSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M9.25 2a.75.75 0 01.75-.75h4a.75.75 0 010 1.5h-1.25v1.58a8.75 8.75 0 015.56 2.24l.72-.72a.75.75 0 111.06 1.06l-1.1 1.1A8.75 8.75 0 0112 21.75 8.75 8.75 0 013.25 13 8.75 8.75 0 0111.25 4.33V2.75H10a.75.75 0 01-.75-.75zM12 8.25a.75.75 0 01.75.75v3.69l2.28 2.28a.75.75 0 01-1.06 1.06l-2.5-2.5A.75.75 0 0111.25 13V9a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconStopwatchSolid.displayName = 'IconStopwatchSolid'
