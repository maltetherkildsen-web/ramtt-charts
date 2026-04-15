// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFattyAcidSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Carboxyl head group */}
    <circle cx="4" cy="12" r="3"/>
    {/* Zigzag carbon chain — thick path */}
    <path d="M6.5 12l2-3 2 3 2-3 2 3 2-3 2 3 2-3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Terminal methyl */}
    <circle cx="20.5" cy="9" r="1.5"/>
  </IconBaseSolid>
))
IconFattyAcidSolid.displayName = 'IconFattyAcidSolid'
