// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconO2Solid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Left oxygen atom */}
    <circle cx="8.5" cy="12" r="5.5"/>
    {/* Right oxygen atom */}
    <circle cx="15.5" cy="12" r="5.5"/>
    {/* Double bond highlights */}
    <rect x="10.5" y="10" width="3" height="1.2" rx=".4" fill="var(--icon-bg, #fff)"/>
    <rect x="10.5" y="12.8" width="3" height="1.2" rx=".4" fill="var(--icon-bg, #fff)"/>
  </IconBaseSolid>
))
IconO2Solid.displayName = 'IconO2Solid'
