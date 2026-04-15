// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRaceVest = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M9 3h6l2 3v14H7V6l2-3z"/>
    <path d="M10 11h4M10 14h4"/>
  </IconBaseLight>
))
IconRaceVest.displayName = 'IconRaceVest'
