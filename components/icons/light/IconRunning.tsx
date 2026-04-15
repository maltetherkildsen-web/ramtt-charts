// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRunning = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="15" cy="4" r="2"/><path d="M7 22l4-7"/><path d="M11 15l4-2 2 5"/><path d="M11 15l-3-4 4-3"/><path d="M4 17l4.5-2"/><path d="M16 9l-4 4"/>
  </IconBaseLight>
))
IconRunning.displayName = 'IconRunning'
