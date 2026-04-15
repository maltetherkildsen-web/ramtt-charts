// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconHiking = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M3 21l5-8 4 3 4-10 5 15H3z"/><path d="M14 9l2-4"/><path d="M12 16l-4-3"/>
  </IconBaseLight>
))
IconHiking.displayName = 'IconHiking'
