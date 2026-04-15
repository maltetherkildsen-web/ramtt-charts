// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconKneeJointSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="10" y="2" width="4" height="3" rx=".5"/>
    <ellipse cx="12" cy="7.5" rx="4" ry="2.5"/>
    <rect x="7" y="11.5" width="10" height="1" rx=".5"/>
    <ellipse cx="12" cy="16.5" rx="4" ry="2.5"/>
    <rect x="10" y="19" width="4" height="3" rx=".5"/>
  </IconBaseSolid>
))
IconKneeJointSolid.displayName = 'IconKneeJointSolid'
