// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArrowDownAZSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 20V7h2l-3-3-3 3h2v13h2Z"/>
    <path d="M13 8h6v1.5h-4l4 4V15h-6v-1.5h4l-4-4V8Z"/>
    <path d="M16 14l-3 6h1.5l.75-1.5h3.5l.75 1.5H21l-3-6h-2Z"/>
  </IconBaseSolid>
))
IconArrowDownAZSolid.displayName = 'IconArrowDownAZSolid'
