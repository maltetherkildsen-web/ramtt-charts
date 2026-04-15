// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDNAHelixSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Left strand */}
    <path d="M8 2c0 4 8 6 8 10s-8 6-8 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Right strand */}
    <path d="M16 2c0 4-8 6-8 10s8 6 8 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* Base pair rungs */}
    <rect x="9" y="4" width="6" height="2" rx=".5"/>
    <rect x="8" y="11" width="8" height="2" rx=".5"/>
    <rect x="9" y="18" width="6" height="2" rx=".5"/>
  </IconBaseSolid>
))
IconDNAHelixSolid.displayName = 'IconDNAHelixSolid'
