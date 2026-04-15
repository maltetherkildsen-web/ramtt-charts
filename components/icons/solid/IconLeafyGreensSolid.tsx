// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLeafyGreensSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 12c-4 0-7-3-7-7 3 0 6 2 7 5V12z" fill="currentColor"/><path d="M12 14c4 0 7-3 7-7-3 0-6 2-7 5v2z" fill="currentColor" opacity="0.7"/><path d="M12 14v8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconLeafyGreensSolid.displayName = 'IconLeafyGreensSolid'
