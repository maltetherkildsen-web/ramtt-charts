// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRunningSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="15" cy="4" r="2.75"/><path d="M7.4 21.7a.75.75 0 01.3-1.02l3.6-2.03 3.63-1.82 1.6 4.02a.75.75 0 001.4-.56l-2-5a.75.75 0 00-.36-.4L11.84 13l3.46-3.19a.75.75 0 00-.13-1.2l-3-2a.75.75 0 00-.88.08l-4 3.5a.75.75 0 00.42 1.31l2.8.4L6.7 16.78l-3.8 1.52a.75.75 0 10.56 1.4l3.5-1.4.44 3.1a.75.75 0 001.02.3z"/>
  </IconBaseSolid>
))
IconRunningSolid.displayName = 'IconRunningSolid'
