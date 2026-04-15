// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRiceCake = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="5" y="7" width="14" height="10" rx="1"/><path d="M3 7l2-2h14l2 2"/><path d="M3 17l2 2h14l2 2"/><path d="M8 10h8" opacity="0.3"/><path d="M9 13h6" opacity="0.3"/>
  </IconBaseLight>
))
IconRiceCake.displayName = 'IconRiceCake'
