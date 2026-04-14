// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCollapseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 10h6V4H8v3.17L3.41 2.59 2 4l4.58 4.58L4 10Z"/>
    <path d="M20 14h-6v6h2v-3.17l4.58 4.58L22 20l-4.58-4.58L20 14Z"/>
  </IconBaseSolid>
))
IconCollapseSolid.displayName = 'IconCollapseSolid'
