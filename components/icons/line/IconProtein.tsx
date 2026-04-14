// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconProtein = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <rect x="7" y="9" width="10" height="13" rx="2"/>
    <path d="M8 5h8v4H8V5Z"/>
    <path d="M9 13h6"/>
    <path d="M9 16h4"/>
  </IconBase>
))
IconProtein.displayName = 'IconProtein'
