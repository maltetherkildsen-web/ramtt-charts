// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPeanutButter = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="6" y="8" width="12" height="12" rx="2"/><path d="M6 8l1-3h10l1 3"/><path d="M8 5h8"/><path d="M19 6l3-4"/><path d="M19 6l2.5-.5"/>
  </IconBaseLight>
))
IconPeanutButter.displayName = 'IconPeanutButter'
