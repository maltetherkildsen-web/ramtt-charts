// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHemoglobinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Four-lobed protein structure */}
    <circle cx="9" cy="9" r="4.5"/>
    <circle cx="15" cy="9" r="4.5"/>
    <circle cx="9" cy="15" r="4.5"/>
    <circle cx="15" cy="15" r="4.5"/>
    {/* Central iron dot — knockout */}
    <circle cx="12" cy="12" r="2" fill="var(--icon-bg, #fff)"/>
    {/* O2 binding */}
    <circle cx="18" cy="5" r="1.5"/>
    <circle cx="20.2" cy="5" r="1.5"/>
  </IconBaseSolid>
))
IconHemoglobinSolid.displayName = 'IconHemoglobinSolid'
