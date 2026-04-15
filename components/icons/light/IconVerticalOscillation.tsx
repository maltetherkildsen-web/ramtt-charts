// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconVerticalOscillation = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M2 12c2-4 4-4 5 0s3 4 5 0 3-4 5 0 3 4 5 0"/><path d="M7 6v4" strokeDasharray="1 1.5"/><path d="M7 14v4" strokeDasharray="1 1.5"/><path d="M5.5 7l1.5-1.5L8.5 7"/><path d="M5.5 17l1.5 1.5L8.5 17"/>
  </IconBaseLight>
))
IconVerticalOscillation.displayName = 'IconVerticalOscillation'
