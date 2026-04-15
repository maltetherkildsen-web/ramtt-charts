// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconInterval = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M5 20V6"/>
    <path d="M9 20v-4"/>
    <path d="M13 20V6"/>
    <path d="M17 20v-4"/>
    <path d="M21 20V4"/>
  </IconBaseLight>
))
IconInterval.displayName = 'IconInterval'
