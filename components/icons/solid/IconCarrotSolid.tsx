// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCarrotSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 22L8 8c2-1 4-1 8 0l-4 14z" fill="currentColor"/><path d="M10 6c-1-2 0-4 2-5M14 6c1-2 0-4-2-5M12 6c0-2 1-4 2-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconCarrotSolid.displayName = 'IconCarrotSolid'
