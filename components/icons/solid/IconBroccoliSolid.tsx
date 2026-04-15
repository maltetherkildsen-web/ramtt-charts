// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBroccoliSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="8" cy="9" r="3.75"/><circle cx="12" cy="7" r="4.25"/><circle cx="16" cy="9" r="3.75"/><path d="M12 14v8M10 14l-2-2M14 14l2-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconBroccoliSolid.displayName = 'IconBroccoliSolid'
