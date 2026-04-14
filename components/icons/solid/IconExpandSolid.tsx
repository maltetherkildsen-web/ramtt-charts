// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconExpandSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M14 4h6v6h-2V6.83l-4.58 4.58-1.41-1.41L16.59 5.42 14 4Z"/>
    <path d="M10 20H4v-6h2v3.17l4.58-4.58 1.41 1.41-4.58 4.58L10 20Z"/>
  </IconBaseSolid>
))
IconExpandSolid.displayName = 'IconExpandSolid'
