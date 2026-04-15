// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCellMembraneSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Upper phospholipid heads */}
    <circle cx="5" cy="7" r="2"/>
    <circle cx="9" cy="7" r="2"/>
    <circle cx="13" cy="7" r="2"/>
    <circle cx="17" cy="7" r="2"/>
    {/* Upper tails */}
    <rect x="4.3" y="9" width="1.4" height="3" rx=".5"/>
    <rect x="8.3" y="9" width="1.4" height="3" rx=".5"/>
    <rect x="12.3" y="9" width="1.4" height="3" rx=".5"/>
    <rect x="16.3" y="9" width="1.4" height="3" rx=".5"/>
    {/* Lower tails */}
    <rect x="6.3" y="12" width="1.4" height="3" rx=".5"/>
    <rect x="10.3" y="12" width="1.4" height="3" rx=".5"/>
    <rect x="14.3" y="12" width="1.4" height="3" rx=".5"/>
    <rect x="18.3" y="12" width="1.4" height="3" rx=".5"/>
    {/* Lower phospholipid heads */}
    <circle cx="7" cy="17" r="2"/>
    <circle cx="11" cy="17" r="2"/>
    <circle cx="15" cy="17" r="2"/>
    <circle cx="19" cy="17" r="2"/>
  </IconBaseSolid>
))
IconCellMembraneSolid.displayName = 'IconCellMembraneSolid'
