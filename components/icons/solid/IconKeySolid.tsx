// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconKeySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M8 3.75a4.25 4.25 0 00-1.18 8.33L6.5 12.4a.75.75 0 00.22.53l.5.5a.75.75 0 001.06 0l.72-.72.72.72a.75.75 0 001.06 0l.72-.72 1.22 1.22a.75.75 0 001.06 0l1-1a.75.75 0 000-1.06L8.85 5.94A4.25 4.25 0 008 3.75zM8 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>
  </IconBaseSolid>
))
IconKeySolid.displayName = 'IconKeySolid'
