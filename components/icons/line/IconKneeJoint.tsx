// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconKneeJoint = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M10 2v3h4V2"/>
    <ellipse cx="12" cy="7.5" rx="4" ry="2.5"/>
    <path d="M7 12h10"/>
    <ellipse cx="12" cy="16.5" rx="4" ry="2.5"/>
    <path d="M10 19v3h4v-3"/>
  </IconBase>
))
IconKneeJoint.displayName = 'IconKneeJoint'
