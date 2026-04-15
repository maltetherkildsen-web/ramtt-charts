// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconBowl = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z"/><path d="M2 10h20"/><circle cx="8" cy="13" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="13" r="1.5"/>
  </IconBaseLight>
))
IconBowl.displayName = 'IconBowl'
