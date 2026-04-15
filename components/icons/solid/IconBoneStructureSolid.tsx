// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBoneStructureSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <ellipse cx="12" cy="5" rx="4" ry="3"/>
    <rect x="10" y="5" width="4" height="14"/>
    <ellipse cx="12" cy="19" rx="4" ry="3"/>
  </IconBaseSolid>
))
IconBoneStructureSolid.displayName = 'IconBoneStructureSolid'
