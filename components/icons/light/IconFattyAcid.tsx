// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconFattyAcid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    {/* Carboxyl head group */}
    <circle cx="4" cy="12" r="2.5"/>
    <circle cx="4" cy="12" r=".8" fill="currentColor" stroke="none"/>
    {/* Zigzag carbon chain */}
    <path d="M6.5 12l2-3 2 3 2-3 2 3 2-3 2 3 2-3"/>
    {/* Terminal methyl */}
    <circle cx="20.5" cy="9" r=".7" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconFattyAcid.displayName = 'IconFattyAcid'
