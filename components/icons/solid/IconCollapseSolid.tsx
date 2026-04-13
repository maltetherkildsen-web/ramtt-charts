// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCollapseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 10H10V4" />
    <path fill="currentColor" d="M10 10L3 3" />
    <path fill="currentColor" d="M20 14H14V20" />
    <path fill="currentColor" d="M14 14L21 21" />
    </IconBaseSolid>
))
IconCollapseSolid.displayName = 'IconCollapseSolid'
