// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBeetrootSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M7 13a5 5 0 0 1 10 0c0 4-2.5 8-5 8s-5-4-5-8Z"/>
    <rect x="11.25" y="5" width="1.5" height="3.5"/>
    <circle cx="9" cy="3.5" r="1.5"/>
    <circle cx="15" cy="3.5" r="1.5"/>
  </IconBaseSolid>
))
IconBeetrootSolid.displayName = 'IconBeetrootSolid'
