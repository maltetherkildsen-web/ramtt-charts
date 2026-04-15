// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGradientSlopeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M22.4 5.2a.75.75 0 01.35.63v14.42a.75.75 0 01-.75.75H2a.75.75 0 01-.45-1.35l20-15a.75.75 0 01.85-.07z"/>
  </IconBaseSolid>
))
IconGradientSlopeSolid.displayName = 'IconGradientSlopeSolid'
