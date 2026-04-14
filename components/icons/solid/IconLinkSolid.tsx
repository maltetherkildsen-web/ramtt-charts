// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLinkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M15 2a5 5 0 0 0-3.54 1.46l-1.72 1.72 1.42 1.41 1.72-1.71a3.5 3.5 0 0 1 4.95 4.95l-3 3A3.5 3.5 0 0 1 10 13l-1.42 1.42A5 5 0 0 0 15.9 15.9l3-3A5 5 0 0 0 15 2Z"/>
    <path d="M9 22a5 5 0 0 0 3.54-1.46l1.71-1.71-1.41-1.42-1.72 1.72a3.5 3.5 0 0 1-4.95-4.96l3-3A3.5 3.5 0 0 1 14 11l1.42-1.42A5 5 0 0 0 8.1 8.1l-3 3A5 5 0 0 0 9 22Z"/>
  </IconBaseSolid>
))
IconLinkSolid.displayName = 'IconLinkSolid'
