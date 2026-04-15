// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconRamen = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 10c0 5 4 9 9 9s9-4 9-9H3z"/><path d="M2 10h20"/><path d="M7 13c1 1 2 0 3 1s2 0 3 1 2 0 3 1"/><path d="M7 15c1 1 2 0 3 1s2 0 3 1"/><ellipse cx="16" cy="12" rx="2" ry="1.5"/><path d="M9 7c0-1.5 1-2 2-2.5" opacity="0.4"/><path d="M13 6c0-1.5 1-2 2-2" opacity="0.4"/>
  </IconBase>
))
IconRamen.displayName = 'IconRamen'
