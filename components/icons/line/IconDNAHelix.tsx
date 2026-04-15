// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconDNAHelix = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    {/* Left strand */}
    <path d="M8 2c0 4 8 6 8 10s-8 6-8 10"/>
    {/* Right strand */}
    <path d="M16 2c0 4-8 6-8 10s8 6 8 10"/>
    {/* Base pair rungs */}
    <line x1="9" y1="5" x2="15" y2="5"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="9" y1="19" x2="15" y2="19"/>
  </IconBase>
))
IconDNAHelix.displayName = 'IconDNAHelix'
