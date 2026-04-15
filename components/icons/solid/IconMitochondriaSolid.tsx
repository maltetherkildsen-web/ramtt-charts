// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMitochondriaSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Outer membrane filled */}
    <ellipse cx="12" cy="12" rx="9" ry="6"/>
    {/* Cristae cutouts */}
    <path d="M6 10c2 1 2 3 0 4" stroke="var(--icon-bg, #fff)" strokeWidth="1.5" fill="none"/>
    <path d="M10 9c2 2 2 4 0 6" stroke="var(--icon-bg, #fff)" strokeWidth="1.5" fill="none"/>
    <path d="M14 9c2 2 2 4 0 6" stroke="var(--icon-bg, #fff)" strokeWidth="1.5" fill="none"/>
    <path d="M18 10c-2 1-2 3 0 4" stroke="var(--icon-bg, #fff)" strokeWidth="1.5" fill="none"/>
  </IconBaseSolid>
))
IconMitochondriaSolid.displayName = 'IconMitochondriaSolid'
