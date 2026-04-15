// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRaceBib = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="5" y="4" width="14" height="16" rx="1"/>
    <path d="M9 10h6M9 13h6"/>
    <circle cx="7" cy="6" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="17" cy="6" r=".75" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconRaceBib.displayName = 'IconRaceBib'
