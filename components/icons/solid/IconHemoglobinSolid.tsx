// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHemoglobinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Four-lobed protein structure with central knockout */}
    <path fillRule="evenodd" d="M9 4.5a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 0Zm6 0a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 0Zm-6 6a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 0Zm6 0a4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 0 0 0Z"/>
    <circle cx="9" cy="9" r="4.5"/>
    <circle cx="15" cy="9" r="4.5"/>
    <circle cx="9" cy="15" r="4.5"/>
    <circle cx="15" cy="15" r="4.5"/>
    <circle cx="12" cy="12" r="2" fill="none"/>
    {/* O2 binding */}
    <circle cx="18" cy="5" r="1.5"/>
    <circle cx="20.2" cy="5" r="1.5"/>
  </IconBaseSolid>
))
IconHemoglobinSolid.displayName = 'IconHemoglobinSolid'
