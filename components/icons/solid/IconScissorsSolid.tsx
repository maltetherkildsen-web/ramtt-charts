// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconScissorsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="6" cy="6" r="3.5"/><circle cx="6" cy="18" r="3.5"/><path d="M8.5 8l12 8M8.5 16l12-8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconScissorsSolid.displayName = 'IconScissorsSolid'
