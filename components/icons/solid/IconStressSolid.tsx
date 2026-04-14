// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStressSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="12" r="5"/>
    <path d="M10 2l2 3 2-3H10Z"/>
    <path d="M10 22l2-3 2 3H10Z"/>
    <path d="M2 14l3-2-3-2v4Z"/>
    <path d="M22 14l-3-2 3-2v4Z"/>
  </IconBaseSolid>
))
IconStressSolid.displayName = 'IconStressSolid'
