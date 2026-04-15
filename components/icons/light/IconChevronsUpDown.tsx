// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconChevronsUpDown = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M7 15l5 5 5-5"/>
    <path d="M7 9l5-5 5 5"/>
  </IconBaseLight>
))
IconChevronsUpDown.displayName = 'IconChevronsUpDown'
