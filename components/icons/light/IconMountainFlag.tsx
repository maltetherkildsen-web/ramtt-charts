// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMountainFlag = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 21l5-7 3 4 4-9 4 12H4z"/><path d="M15 5v8"/><path d="M15 5l5 3-5 3"/>
  </IconBaseLight>
))
IconMountainFlag.displayName = 'IconMountainFlag'
