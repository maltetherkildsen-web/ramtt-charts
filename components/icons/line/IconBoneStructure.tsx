// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconBoneStructure = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <ellipse cx="12" cy="5" rx="4" ry="3"/>
    <rect x="10" y="7" width="4" height="10" rx="1"/>
    <ellipse cx="12" cy="19" rx="4" ry="3"/>
  </IconBase>
))
IconBoneStructure.displayName = 'IconBoneStructure'
