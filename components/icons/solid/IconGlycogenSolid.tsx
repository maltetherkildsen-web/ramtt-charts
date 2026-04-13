// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGlycogenSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Battery body */}
    <rect fill="currentColor" x="3" y="8" width="16" height="8" rx="2" />
    {/* Terminal nub */}
    <path fill="currentColor" d="M19 11H21V13H19" />
    {/* Fill level (~60%) */}
    <path fill="currentColor" d="M6 11H12V13H6Z" />
    </IconBaseSolid>
))
IconGlycogenSolid.displayName = 'IconGlycogenSolid'
