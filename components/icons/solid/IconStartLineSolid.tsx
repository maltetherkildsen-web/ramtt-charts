// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStartLineSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 8a8 8 0 0 1 16 0v13h-3V13H7v8H4V8Z"/>
    <rect x="4" y="11" width="16" height="2"/>
  </IconBaseSolid>
))
IconStartLineSolid.displayName = 'IconStartLineSolid'
